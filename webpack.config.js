const webpack = require("webpack");

var config = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: './public/[name]-bundle.js'
  }
}

module.exports = config;