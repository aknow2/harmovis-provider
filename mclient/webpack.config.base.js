const webpack = require("webpack");
const dotenv = require('dotenv');
dotenv.config()

new webpack.DefinePlugin({
  "process.env.MAPBOX_ACCESS_TOKEN": process.env.MAPBOX_ACCESS_TOKEN,
})

module.exports = {
  name: "base",
  entry: "./src/index.tsx",
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.ts(x?)$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
};
