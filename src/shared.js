import createCache from '@emotion/cache'

export const IS_BROWSER = typeof window !== 'undefined'

let cache = IS_BROWSER ? createCache() : null

export const getCache = () => {
  if (IS_BROWSER) {
    cache = cache || createCache()
    return cache
  }
  return createCache()
}

