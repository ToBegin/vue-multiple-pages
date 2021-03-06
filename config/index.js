'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

// 静态目录
const STATIC_PATH = 'static'
// 版本文件夹
const VERSION_PATH = ''

module.exports = {
  // 相对路径
  PAGES_PATH: './src/pages/**/*.html',
  ENTRIES_PATH: './src/pages/**/*.js',
  
  STATIC_PATH,
  VERSION_PATH,

  dev: {
    // Paths
    assetsSubDirectory: STATIC_PATH + VERSION_PATH,
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: '',
        changeOrigin: true
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    disableHostCheck: true,
    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: STATIC_PATH + VERSION_PATH,
    assetsPublicPath: '/',
    commonSourcePath: '/assets',

    /**
     * Source Maps
     */

    productionSourceMap: false,
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
    bundleAnalyzerReport: process.env.npm_config_report,
    // 打包是执行多次 需要每次给bundleAnalyzer设定一个port 此处的设置的是开始port
    bundleAnalyzerPort: 8888
  }
}
