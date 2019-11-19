const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    host: '0.0.0.0',
    port: 3000,
    hotOnly: true,
    open: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

