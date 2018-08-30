// Require the webpack-chain module. This module exports a single
// constructor function for creating a configuration API.
const Config = require('webpack-chain')

const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// Instantiate the configuration with a new API
const config = new Config()

// Detect is dev
const isAnalyze = !!process.env.ANALYZE
const dev = process.env.NODE_ENV !== 'production' && !isAnalyze

// Interact with entry points
config
  .entry('main')
  .add(path.resolve(__dirname, 'src/index.js'))
  .end()
  .context(path.resolve(__dirname, 'src'))
  .stats(false)
  .target('web')
  .mode(dev ? 'development' : 'production')
  .devtool(dev ? 'cheap-module-source-map' : false)
  // Modify output settings
  .output
  .path(path.resolve(__dirname, 'dist'))
  .publicPath('/')
  .filename('[name].bundle.js')

// Add babel-loader for JS.
config.module
  .rule('compile')
  .test(/\.jsx?$/)
  .exclude
  .add(/node_modules/)
  .end()
  .use('babel')
  .loader('babel-loader')
  .options()

config.devServer
  .contentBase(path.resolve(__dirname, 'dist'))
  .quiet(true)

// Enable better caching for webpack compilation.
config
  .plugin('hard-source')
  .use(HardSourceWebpackPlugin)

// Show progress-bar while compile.
config
  .plugin('progress')
  .use(WebpackBar, [{
    name: 'client',
    // Is show profile(Time taken while compile at each loader)
    profile: true
  }])

// Clean directory before compile.
config
  .plugin('clean')
  .use(CleanWebpackPlugin, [['dist'], {
    exclude: ['index.html'],
    beforeEmit: true
  }])

// Set webpack optimization option.
config.optimization
  .noEmitOnErrors(true)

// Dev-only setting
config
  .when(dev, devConfig => {
    devConfig
      .plugin('friendly-errors')
      .use(FriendlyErrorsWebpackPlugin, [{
        // Whether clear console after compile or not.
        clearConsole: !isAnalyze
      }])

    // Append webpack-hot-middleware/client.js to main.
    devConfig.entry('main')
      .add('webpack-hot-middleware/client')

    devConfig
      .plugin('hot-module-replacement')
      .use(webpack.HotModuleReplacementPlugin)

    devConfig
      .plugin('named-modules')
      .use(webpack.NamedModulesPlugin)
  })

// Analyze-only setting
config
  .when(isAnalyze, analyzeConfig => {
    analyzeConfig
      .plugin('named-modules')
      .use(BundleAnalyzerPlugin)

    // Disable some plugins for analyze correctly.
    analyzeConfig.plugins.delete('hard-source')
    analyzeConfig.plugins.delete('progress')
  })

// For debug print.
// console.log(config.toString())

// Export the completed configuration object to be consumed by webpack
module.exports = config.toConfig()
