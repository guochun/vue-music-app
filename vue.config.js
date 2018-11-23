const path = require('path')
const express = require('express')
const axios = require('axios')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const appRouter = express.Router()

appRouter.get('/getDescList', (req, res) => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})


module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? './' : '/',
  productionSourceMap: true,
  devServer: {
    port: 8080,
    before: function (app, server) {
      app.use('/api', appRouter)
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('base', resolve('src/base'))
  }
}
