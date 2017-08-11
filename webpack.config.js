const webpack = require("webpack");
const path = require("path");

let config = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: './public/[name]-bundle.js'
  },
  module: {
    rules: [ // loader rules
      {
        test: /\.js$/, // files ending with .js
        exclude: /node_modules/, // exclude the node_modules directory
        loader: 'babel-loader' // use this (babel-core) loader
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'), // A directory or URL to serve HTML content from.
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    inline: true, // inline mode (set to false to disable including client scripts (like livereload)
    open: true, // open default browser while launching
    compress: true, // Enable gzip compression for everything served:
    hot: true // Enable webpack's Hot Module Replacement feature
  },
  devtool: 'eval-source-map', // enable devtool for better debugging experience
}

module.exports = config;