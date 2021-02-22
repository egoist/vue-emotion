import createCache from '@emotion/cache'

export { styled } from './styled'
export { createGlobalStyle } from './global'

export const VueEmotion = {
  beforeCreate() {
    this.$emotionCache = (this.$parent && this.$parent.$emotionCache) || createCache({ key: 'css' })
  },
}
