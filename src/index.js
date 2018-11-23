import { css, getRegisteredStyles } from 'emotion'
import assign from 'nano-assign'
import { STYLES_KEY } from 'emotion-utils'

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
  let staticClassName
  let identifierName
  let stableClassName
  let propsDefinitions
  if (options !== undefined) {
    staticClassName = options.e
    identifierName = options.label || tag.name
    stableClassName = options.target
    propsDefinitions = options.props || {}
  }

  propsDefinitions = assign(tag.props || {}, propsDefinitions)

  const isReal = tag.__emotion_real === tag
  const baseTag =
    staticClassName === undefined ? (isReal && tag.__emotion_base) || tag : tag

  return (...args) => {
    const styles =
      isReal && tag[STYLES_KEY] !== undefined ? tag[STYLES_KEY].slice(0) : []

    if (identifierName !== undefined) {
      styles.push(`label:${identifierName};`)
    }

    if (staticClassName === undefined) {
      if (args[0] === null || args[0].raw === undefined) {
        styles.push.apply(styles, args)
      } else {
        styles.push(args[0][0])
        const len = args.length
        let i = 1
        for (; i < len; i++) {
          styles.push(args[i], args[0][i])
        }
      }
    }

    const Styled = {
      name: `Styled${tag.name || identifierName || tag || 'Component'}`,
      inject: {
        theme: {
          default: null
        }
      },
      props: propsDefinitions,
      render(h) {
        let className = ''
        const classInterpolations = []
        const exisingClassName = stringifyClass(this.$data.class)
        const attrs = {}
        const domProps = {}

        for (const key in this.$attrs) {
          if (key[0] !== '$') {
            if (key === 'value') {
              domProps[key] = this.$attrs[key]
            } else {
              attrs[key] = this.$attrs[key]
            }
          }
        }

        const mergedProps = assign({ theme: this.$attrs.theme }, this.$props)

        if (exisingClassName) {
          if (staticClassName === undefined) {
            className += getRegisteredStyles(
              classInterpolations,
              exisingClassName
            )
          } else {
            className += `${exisingClassName} `
          }
        }

        if (staticClassName === undefined) {
          const context = {
            mergedProps
          }
          className += css.apply(context, styles.concat(classInterpolations))
        } else {
          className += staticClassName
        }
        if (stableClassName !== undefined) {
          className += ` ${stableClassName}`
        }

        return h(
          tag,
          assign({}, this.$data, {
            attrs: this.$attrs,
            props: mergedProps,
            domProps,
            class: className
          }),
          this.$children
        )
      }
    }

    Styled.__emotion_real = Styled
    Styled.__emotion_base = baseTag
    Styled.__emotion_styles = styles

    Object.defineProperty(Styled, 'toString', {
      enumerable: false,
      value() {
        if (
          process.env.NODE_ENV !== 'production' &&
          stableClassName === undefined
        ) {
          return 'NO_COMPONENT_SELECTOR'
        }
        return `.${stableClassName}`
      }
    })

    Styled.withComponent = (nextTag, nextOptions) => {
      nextOptions.props = assign(tag.props || {}, nextOptions.props || {})
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
