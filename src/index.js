import { getRegisteredStyles, insertStyles } from '@emotion/utils'
import createCache from '@emotion/cache'
import { serializeStyles } from '@emotion/serialize'
import { getDefaultShouldForwardProp } from './utils'

const cache = createCache()

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function stringifyClass(klass) {
  if (Array.isArray(klass)) {
    return klass.join(' ')
  }
  if (typeof klass === 'object') {
    return Object.keys(klass)
      .filter(key => Boolean(klass[key]))
      .join(' ')
  }
  return klass
}

export default function createStyled(tag, options) {
  let identifierName
  let shouldForwardProp
  let targetClassName
  if (options !== undefined) {
    identifierName = options.label
    targetClassName = options.target
    shouldForwardProp =
      tag.__emotion_forwardProp && options.shouldForwardProp
        ? propName =>
            tag.__emotion_forwardProp(propName) &&
            options.shouldForwardProp(propName)
        : options.shouldForwardProp
  }

  const isReal = tag.__emotion_real === tag
  const baseTag = (isReal && tag.__emotion_base) || tag

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp
  }

  let defaultShouldForwardProp =
    shouldForwardProp || getDefaultShouldForwardProp(baseTag)
  const shouldUseAs = !defaultShouldForwardProp('as')

  return (...args) => {
    let styles =
      isReal && tag.__emotion_styles !== undefined
        ? tag.__emotion_styles.slice(0)
        : []

    if (identifierName !== undefined) {
      styles.push(`label:${identifierName};`)
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args)
    } else {
      styles.push(args[0][0])
      let len = args.length
      let i = 1
      for (; i < len; i++) {
        styles.push(args[i], args[0][i])
      }
    }

    const displayName = `Styled${tag.name ||
      identifierName ||
      capitalizeFirstLetter(tag) ||
      'Component'}`

    const Styled = {
      name: displayName,
      inject: { theme: { default: null } },
      props: options.props || {},
      inheritAttrs: false,
      render(createElement) {
        const props = { ...this.$attrs, ...this.$props }
        const finalTag = (shouldUseAs && props.as) || baseTag

        let className = ''
        let classInterpolations = []

        let mergedProps = props
        for (let key in props) {
          mergedProps[key] = this[key] || this.$attrs[key]
        }

        const existingClasses = stringifyClass(props.class)

        if (existingClasses) {
          className += getRegisteredStyles(
            cache.registered,
            classInterpolations,
            existingClasses
          )
        }

        const serialized = serializeStyles(
          styles.concat(classInterpolations),
          cache.registered,
          mergedProps
        )

        const rules = insertStyles(
          cache,
          serialized,
          typeof finalTag === 'string'
        )

        className += `${cache.key}-${serialized.name}`

        if (targetClassName !== undefined) {
          className += ` ${targetClassName}`
        }

        const finalShouldForwardProp =
          shouldUseAs && shouldForwardProp === undefined
            ? getDefaultShouldForwardProp(finalTag)
            : defaultShouldForwardProp

        let newProps = {}

        for (let key in props) {
          if (shouldUseAs && key === 'as') continue

          if (finalShouldForwardProp(key)) {
            newProps[key] = props[key]
          }
        }

        // https://vuejs.org/v2/guide/render-function.html#createElement-Arguments
        const newData = {
          props: newProps,
          class: className,
          on: this.$listeners
        }

        return createElement(finalTag, newData, this.$scopedSlots.default)
      }
    }

    Styled.__emotion_real = Styled
    Styled.__emotion_base = baseTag
    Styled.__emotion_styles = styles
    Styled.__emotion_forwardProp = shouldForwardProp

    Object.defineProperty(Styled, 'toString', {
      value() {
        if (
          targetClassName === undefined &&
          process.env.NODE_ENV !== 'production'
        ) {
          return 'NO_COMPONENT_SELECTOR'
        }
        return `.${targetClassName}`
      }
    })

    Styled.withComponent = (nextTag, nextOptions) => {
      return createStyled(
        nextTag,
        nextOptions !== undefined
          ? { ...(options || {}), ...nextOptions }
          : options
      )(...styles)
    }

    return Styled
  }
}

export * from 'emotion'
