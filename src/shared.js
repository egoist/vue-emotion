import createCache from '@emotion/cache'

export const cache = createCache()

export const IS_BROWSER = typeof window !== 'undefined'
