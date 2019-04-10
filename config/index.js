'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
module.exports = {
  dev: {
    // 新加的一行
    env: require('./dev.env'),
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {//自定义名字，代表的是以下target中的内容
        // target: 'http://23e74b3832.wicp.vip/',//本地地址
        target: 'http://192.168.1.111:8889/', // 测试环境地址
        changeOrigin: true,//是否允许跨域
        pathRewrite: {
          '^/api': ''
        }
      },
      '/php': {//自定义名字，代表的是以下target中的内容
        target: 'http://beta.cookhome.club/',
        changeOrigin: true,//是否允许跨域
        pathRewrite: {
          '^/php': ''
        }
      },
      '/service': {//自定义名字，代表的是以下target中的内容
        target: 'http://cookhome.t/api/',//微信
        changeOrigin: true,//是否允许跨域
        pathRewrite: {
          '^/service': ''
        }
      },

    },

    // Various Dev Server settings
    host: '192.168.1.30', // can be overwritten by process.env.HOST
    // host: '192.168.1.30', // can be overwritten by process.env.HOST
    // host: '192.168.3.170', // can be overwritten by process.env.HOST
    // host: '192.168.31.32', // can be overwritten by process.env.HOST
    // host: '192.168.31.32', // can be overwritten by process.env.HOST
    // host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // 住了的4行
    autoOpenBrowser: true,
    // errorOverlay: true,
    // notifyOnErrors: true,
    // poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    // 住了一行
    // devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    // 住了的
    // cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
