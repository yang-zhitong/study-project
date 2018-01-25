const path = require("path");
const webpack = require("webpack");

const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
  },
  module: require("./config/webpack.module.js")("dev"),
  plugins: [
    new ExtractTextPlugin({
      filename: `[name].css` // 给输出的 CSS 文件名称加上 hash 值
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
    new UglifyJsPlugin(),
  ],
  externals: {
    jquery: "window.$"
  }
};