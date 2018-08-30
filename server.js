const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()

// detect is dev
const dev = process.env.NODE_ENV !== 'production'

if (dev) {
  const config = require('./webpack.config.js')
  const compiler = webpack(config)

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    logLevel: 'silent',
    publicPath: config.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    log: false
  }))
}

// Serve dist directory.
app.use(express.static('dist'))

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n')
})
