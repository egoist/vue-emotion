import createCache from '@emotion/cache'

export { styled } from "./styled"
export { createGlobalStyle } from "./global"
export { createCache };


export function VueEmotion(app, opts= {}) {
  const cache = opts.emotionCache || createCache({key: 'css'})
  cache.compat = true
  app.provide('$emotionCache', cache)
}
