import { css, getRegisteredStyles } from 'emotion'
import assign from 'nano-assign'
import { STYLES_KEY } from 'emotion-utils'

function stringifyClass(klass) {
  if (Array.isArray(klass)) {
    return klass.join(' ')
  }
  if (typeof klass === 'object') {
    return Object.keys(klass).filter(key => Boolean(klass[key])).join(' ')
  }
  return klass
}

export default (tag, options) => {
  let staticClassName
  let identifierName
  let stableClassName
  let propsDefinitions
  if (options !== undefined) {
    staticClassName = options.e
    identifierName = options.label
    stableClassName = options.target
    propsDefinitions = options.props
  }
  const isReal = tag.__emotion_real === tag
  const baseTag =
    staticClassName === undefined ? (isReal && tag.__emotion_base) || tag : tag

  return (...args) => {
    let styles =
      isReal && tag[STYLES_KEY] !== undefined ? tag[STYLES_KEY].slice(0) : []
    if (identifierName !== undefined) {
      styles.push(`label:${identifierName};`)
    }
    if (staticClassName === undefined) {
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
    }

    const Styled = {
      name: 'Styled',
      functional: true,
      inject: {
        theme: {
          default: null
        }
      },
      props: propsDefinitions,
      render(h, { data, children, props, injections }) {
        let className = ''
        let classInterpolations = []
        const exisingClassName = stringifyClass(data.class)
        const attrs = {}
        for (const key in data.attrs) {
          if (key[0] !== '$') {
            attrs[key] = data.attrs[key]
          }
        }

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
          const ctx = {
            mergedProps: assign({ theme: injections.theme }, props)
          }
          className += css.apply(ctx, styles.concat(classInterpolations))
        } else {
          className += staticClassName
        }
        if (stableClassName !== undefined) {
          className += ` ${stableClassName}`
        }

        return h(tag, assign({}, data, { attrs, class: className }), children)
      }
    }

    Styled[STYLES_KEY] = styles
    Styled.__emotion_base = baseTag
    Styled.__emotion_real = Styled
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

    return Styled
  }
}
