import clsx from 'clsx'
import { getRegisteredStyles, insertStyles } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'

const ILLEGAL_ESCAPE_SEQUENCE_ERROR =
  process.env.NODE_ENV === 'production' ?
    '' :
    `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`

const createStyled = (tag, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (tag === undefined) {
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
      )
    }
  }

  const identifierName = options.label
  const targetClassName = options.target

  const isReal = tag.__emotion_real === tag
  const baseTag = (isReal && tag.__emotion_base) || tag

  return function (...args) {
    const styles =
      isReal && tag.__emotion_styles !== undefined ?
        tag.__emotion_styles.slice(0) :
        []

    if (identifierName !== undefined) {
      styles.push(`label:${identifierName};`)
    }

    if (args[0] === null || args[0].raw === undefined) {
      styles.push(...args)
    } else {
      if (process.env.NODE_ENV !== 'production' && args[0][0] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR)
      }

      styles.push(args[0][0])
      const len = args.length
      let i = 1
      for (; i < len; i++) {
        if (process.env.NODE_ENV !== 'production' && args[0][i] === undefined) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR)
        }

        styles.push(args[i], args[0][i])
      }
    }

    const Styled = {
      functional: true,

      inject: {
        theme: {
          default: undefined
        }
      },

      render(h, { data, children, parent, injections }) {
        const cache = parent.$emotionCache
        const { as, value, ...restAttrs } = data.attrs || {}

        let className = data.staticClass ? `${data.staticClass} ` : ''
        const finalTag = as || baseTag
        const classInterpolations = []
        const mergedProps = {
          ...data.attrs,
          theme: injections.theme,
          ...parent.$evergarden
        }
        const domProps = { value }

        if (data.class) {
          className += getRegisteredStyles(
            cache.registered,
            classInterpolations,
            clsx(data.class)
          )
        }

        const serialized = serializeStyles(
          styles.concat(classInterpolations),
          cache.registered,
          mergedProps
        )

        insertStyles(
          cache,
          serialized,
          typeof finalTag === 'string'
        )

        className += `${cache.key}-${serialized.name}`
        if (targetClassName !== undefined) {
          className += ` ${targetClassName}`
        }

        return h(
          finalTag,
          {
            ...data,
            attrs: options.getAttrs ? options.getAttrs(restAttrs) : restAttrs,
            staticClass: undefined,
            class: className,
            domProps
          },
          children
        )
      }
    }

    Styled.name =
      identifierName === undefined ?
        `Styled${
          typeof baseTag === 'string' ? baseTag : baseTag.name || 'Component'
        }` :
        identifierName

    Styled.__emotion_real = Styled
    Styled.__emotion_base = baseTag
    Styled.__emotion_styles = styles

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
        nextOptions === undefined ?
          options :
          { ...(options || {}), ...nextOptions }
      )(...styles)
    }

    return Styled
  }
}

export const styled = createStyled
