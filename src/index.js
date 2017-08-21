import { css } from 'emotion'
import { map, reduce, assign } from 'emotion-utils'

export { default as theme } from './theme'

const push = (obj, items) => Array.prototype.push.apply(obj, items)

// eslint-disable-next-line max-params
export default function(tag, cls, objs, vars = [], content) {
  if (!tag) {
    throw new Error(
      'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
    )
  }

  const componentTag = tag.name || 'Component'

  const Styled = {
    name: `styled-${componentTag}`,

    functional: true,

    inject: ['theme'],

    render(h, ctx) {
      const { props } = ctx

      const getValue = v => {
        if (v && typeof v === 'function') {
          if (v.__emotion_class) {
            return `& .${v.__emotion_class}`
          }
          return v(props, ctx)
        }

        return v
      }
      let localTag = tag

      const finalObjs = []

      if (tag.__emotion_spec) {
        push(
          finalObjs,
          reduce(
            tag.__emotion_spec,
            (accum, spec) => {
              push(accum, spec.objs)
              if (spec.content) {
                push(accum, spec.content.apply(null, map(spec.vars, getValue)))
              }
              accum.push(spec.cls)
              return accum
            },
            []
          )
        )
        localTag = tag.__emotion_spec[0].tag
      }

      push(finalObjs, objs)

      finalObjs.push(cls)

      if (content) {
        push(finalObjs, content.apply(null, map(vars, getValue)))
      }

      const className = css(map(finalObjs, getValue))

      return h(
        localTag,
        assign({}, ctx.data, {
          class: [ctx.data.class, className]
        }),
        ctx.children
      )
    }
  }

  const spec = {
    vars,
    content,
    objs,
    tag,
    cls
  }
  Styled.__emotion_spec = tag.__emotion_spec
    ? tag.__emotion_spec.concat(spec)
    : [spec]
  Styled.__emotion_class = cls
  return Styled
}
