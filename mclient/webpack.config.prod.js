const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig,  {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: ".",
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname, 'prod', 'index.html'),
        filename: "./index.html"
      }
    )
  ]
});
