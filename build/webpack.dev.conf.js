'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const IP = utils.getLocalIP()

/* 
  PAGES_PATH ---- 多页面 Html模板
  ENTRIES_PATH -- 多页面入口文件
*/
const { PAGES_PATH, ENTRIES_PATH } = config

const generateRewrites = () => {
  let arr = []
  Object.keys(pages).forEach(name => {
    arr.push({
      from: /.*/,
      to: path.posix.join(config.dev.assetsPublicPath, `${name}.html`)
    })
  })

  return arr
}

let pages = utils.getPages(PAGES_PATH)
let entries = utils.getEntries(ENTRIES_PATH)
let rewrites = generateRewrites()
let messages = []

// dev环境为多入口
const devWebpackConfig = merge(baseWebpackConfig, {
  entry: entries,
  module: {
    rules: [
      ...utils.baseLoaders(),
      ...utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    ]
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      // 多个
      rewrites,
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    disableHostCheck: config.dev.disableHostCheck
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../' + config.dev.assetsSubDirectory),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // 生成多个HtmlWebpackPlugin
      Object.keys(pages).forEach(name => {
        let page = pages[name]
        // https://github.com/ampedandwired/html-webpack-plugin
        let config = {
          filename: `${name}.html`,
          template: page,
          inject: true,
          chunks: [name]
        }

        devWebpackConfig.plugins.push(new HtmlWebpackPlugin(config))
        messages.push(`${name} is running here: \n http://${devWebpackConfig.devServer.host}:${port}/${name}.html \n http://${IP}:${port}/${name}.html \n`)
      })

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          // 多个message
          messages,
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
