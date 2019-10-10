import createEmotionServer from 'create-emotion-server'

export const renderStyle = (cache, html) => {
  const emotionServer = createEmotionServer(cache)
  const { css, ids } = emotionServer.extractCritical(html)
  return `<style data-emotion-${cache.key}="${ids.join(' ')}">${css}</style>`
}
