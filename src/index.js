import { css, getRegisteredStyles } from 'emotion'
import assign from 'nano-assign'

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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function createStyled(tag, options) {
  let identifierName
  let targetClassName
  let propsDefinitions
  if (options !== undefined) {
    identifierName = options.label || tag.name
    targetClassName = options.target
    propsDefinitions = options.props || {}
  }

  propsDefinitions = assign(tag.props || {}, propsDefinitions)

  const isReal = tag.__emotion_real === tag
  const baseTag = (isReal && tag.__emotion_base) || tag

  return (...args) => {
    const styles =
      isReal && tag.__emotion_styles !== undefined
        ? tag.__emotion_styles.slice(0)
        : []

    if (identifierName !== undefined) {
      styles.push(`label:${identifierName};`)
    }

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

    const Styled = {
      name: `Styled${tag.name ||
        identifierName ||
        capitalizeFirstLetter(tag) ||
        'Component'}`,
      inject: { theme: { default: null } },
      props: propsDefinitions,
      render(createElement) {
        const finalTag = this.$attrs.as || baseTag
        const classInterpolations = []

        let className = ''
        let attrs = {}
        let domProps = {}

        for (const key in this.$attrs) {
          if (key[0] !== '$') {
            if (key === 'value') {
              domProps[key] = this.$attrs[key]
            } else {
              attrs[key] = this.$attrs[key]
            }
          }
        }

        let mergedProps = this.$props

        if (attrs.theme == null) {
          mergedProps = {}
          for (let key in this.$props) {
            mergedProps[key] = this.$props[key]
          }
          mergedProps.theme = this.theme
        }

        const existingClassName = stringifyClass(attrs.class)

        // Delete any no longer needed attributes
        delete attrs.class
        delete attrs.as

        if (existingClassName) {
          className += getRegisteredStyles(
            classInterpolations,
            existingClassName
          )
        }

        const context = { mergedProps }
        className += css.apply(context, styles.concat(classInterpolations))

        if (targetClassName !== undefined) {
          className += ` ${targetClassName}`
        }
        //https://vuejs.org/v2/guide/render-function.html#createElement-Arguments
        return createElement(
          finalTag,
          assign({}, this.$options, {
            attrs,
            props: mergedProps,
            domProps,
            class: className
          }),
          this.$slots.default
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
          targetClassName === undefined
        ) {
          return 'NO_COMPONENT_SELECTOR'
        }
        return `.${targetClassName}`
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
