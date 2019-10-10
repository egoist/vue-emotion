import createCache from '@emotion/cache'

export { styled } from './styled'
export { createGlobalStyle } from './global'

export function VueEmotion(Vue) {
  Vue.mixin({
    beforeCreate() {
      this.$emotionCache = this.$parent && this.$parent.$emotionCache || createCache()
      this.$emotionCache.compat = true
    }
  })
}
