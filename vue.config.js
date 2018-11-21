const path = require('path')

function resolve(dir) {
  return  path.join(__dirname, dir)
}

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? './' : '/',
  productionSourceMap: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
  }
}
