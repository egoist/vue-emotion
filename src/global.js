import { StyleSheet } from '@emotion/sheet'
import { serializeStyles } from '@emotion/serialize'
import { insertStyles } from '@emotion/utils'
import { cache, IS_BROWSER } from './shared'

export const Global = {
  props: {
    styles: {
      type: null
    },
    watchStyles: {
      type: Boolean,
      default: true
    }
  },

  created() {
    this.init()

    if (this.watchStyles) {
      this.$watch(
        'styles',
        () => {
          const oldName = this.serialized.name
          this.init()
          if (oldName !== this.serialized.name) {
            this.insertStyles()
          }
        },
        {
          deep: true
        }
      )
    }
  },

  mounted() {
    this.sheet = new StyleSheet({
      key: `${cache.key}-global`,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container
    })
    const node = document.querySelector(
      `style[data-emotion-${cache.key}="${this.serialized.name}"]`
    )
    if (node !== null) {
      this.sheet.tags.push(node)
    }

    if (cache.sheet.tags.length > 0) {
      this.sheet.before = cache.sheet.tags[0]
    }

    this.insertStyles()
  },

  beforeDestroy() {
    this.sheet.flush()
  },

  methods: {
    init() {
      const { styles } = this.$props

      if (typeof styles === 'function') {
        this.serialized = serializeStyles([styles(this.$evergarden)])
      } else {
        this.serialized = serializeStyles([styles])
      }
    },

    insertStyles() {
      if (this.serialized.next !== undefined) {
        // insert keyframes
        insertStyles(cache, this.serialized.next, true)
      }

      if (this.sheet.tags.length > 0) {
        // if this doesn't exist then it will be null so the style element will be appended
        const element = this.sheet.tags[this.sheet.tags.length - 1].nextElementSibling
        this.sheet.before = element
        this.sheet.flush()
      }

      cache.insert('', this.serialized, this.sheet, false)
    }
  },

  render(h) {
    if (!IS_BROWSER) {
      const { serialized } = this

      let serializedNames = serialized.name
      let serializedStyles = serialized.styles
      let { next } = serialized
      while (next !== undefined) {
        serializedNames += ' ' + next.name
        serializedStyles += next.styles
        next = next.next
      }

      const shouldCache = cache.compat === true

      const rules = cache.insert(
        '',
        { name: serializedNames, styles: serializedStyles },
        this.sheet,
        shouldCache
      )

      if (!shouldCache) {
        return h('style', {
          domProps: {
            [`data-emotion-${cache.key}`]: serializedNames,
            innerHTML: rules,
            nonce: cache.sheet.nonce
          }
        })
      }
    }

    return null
  }
}
