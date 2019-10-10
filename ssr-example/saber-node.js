const path = require('path')
const { renderStyle } = require('../server')

exports.chainWebpack = config => {
  config.resolve.alias.set('@egoist/vue-emotion', path.join(__dirname, '../src'))
}

exports.getDocumentData = (documentData, { app, markup }) => {
  const style = renderStyle(app.$emotionCache, markup)
  documentData.style = `${style}${documentData.style}`
  return documentData
}
