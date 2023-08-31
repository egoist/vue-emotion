import { h } from 'vue'
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
      inheritAttrs: false,
      inject: {
        theme: {
          default: undefined
        },
        $emotionCache: {
          default: null,
        }
      },

      render(renderContext) {
        const { theme } = renderContext
        const { $attrs, $options, $slots, $props, $parent } = renderContext

        const cache = this.$emotionCache
        const { as, ...restAttrs } = $attrs || {}

        let className = ''
        const finalTag = as || baseTag
        const classInterpolations = []
        const mergedProps = {
          ...$attrs,
          theme: theme || this.theme || {},
        }

        if ($attrs.class) {
          className += getRegisteredStyles(
            cache.registered,
            classInterpolations,
            $attrs.class
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

        const renderProps = {
          ...$props,
          ...(options.getAttrs ? options.getAttrs(restAttrs) : restAttrs),
          class: className,
        }

        return h(
          finalTag,
          renderProps,
          $slots
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
