import { css, cache } from 'emotion'
import { getRegisteredStyles } from '@emotion/utils'
import { getDefaultShouldForwardProp } from './utils'

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
  let props
  if (options !== undefined) {
    identifierName = options.label
    targetClassName = options.target
    props = options.props
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
      functional: true,
      props,
      render(createElement, { props, data, children, injections }) {
        const { attrs = {} } = data
        const finalTag = attrs.as || baseTag

        let className = ''
        let classInterpolations = []

        let mergedProps = props
        for (let key in props) {
          mergedProps[key] = props[key]
        }

        mergedProps.theme = attrs.theme || injections.theme

        const existingClasses = stringifyClass(data.class)

        if (existingClasses) {
          className += getRegisteredStyles(
            cache.registered,
            classInterpolations,
            existingClasses
          )
        }

        const context = { mergedProps }
        className += css.apply(context, styles.concat(classInterpolations))

        if (targetClassName !== undefined) {
          className += ` ${targetClassName}`
        }

        const finalShouldForwardProp =
          shouldUseAs && shouldForwardProp === undefined
            ? getDefaultShouldForwardProp(finalTag)
            : defaultShouldForwardProp

        let newProps = {}

        for (let key in props) {
          if (key === 'as') continue

          if (finalShouldForwardProp(key)) {
            newProps[key] = props[key]
          }
        }

        let newAttrs = {}

        for (let key in attrs) {
          if (key === 'as' || key === 'theme') continue
          newAttrs[key] = attrs[key]
        }

        // https://vuejs.org/v2/guide/render-function.html#createElement-Arguments
        const newData = {
          ...data,
          attrs: newAttrs,
          props: newProps,
          class: className
        }

        return createElement(finalTag, newData, children)
      }
    }

    Styled.__emotion_real = Styled
    Styled.__emotion_base = baseTag
    Styled.__emotion_styles = styles
    Styled.__emotion_forwardProp = shouldForwardProp

    Object.defineProperty(Styled, 'toString', {
      enumerable: false,
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
