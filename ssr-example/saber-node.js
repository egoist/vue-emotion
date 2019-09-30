const path = require('path')

exports.chainWebpack = config => {
  config.resolve.alias.set('@egoist/vue-emotion', path.join(__dirname, '../src'))
}
