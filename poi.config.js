const path = require('path')

module.exports = {
  entry: 'example/index.js',
  outDir: 'example/dist',
  extendWebpack(config) {
    config.resolve.alias.set('@sky-foundry/vue-emotion$', path.resolve('src/index.js'))
  }
}
