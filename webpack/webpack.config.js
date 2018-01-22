const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// const autoWebPlugin = require("./config/webpack.entry.js");
// const { WebPlugin } = require("web-webpack-plugin");

// const entry = new WebPlugin({
//   template: './app/template.html',
//   filename:
// })

module.exports = {
  // devtool: "eval-source-map",
  context: path.resolve(__dirname, "app"),
  entry: {
    index: "./pages/index/index.js",
    login: "./pages/login/index.js"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    chunkFilename: "[name]_[chunkhash:8].js",
    filename: "[name]_[chunkhash:8].js"
  },
  resolve: require("./config/webpack.resolve.js"),
  module: require("./config/webpack.module.js")("dev"),
  devServer: {
    port: "2017",
    contentBase: "./public", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true //实时刷新
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   options: {
    //     title: "index1212",
    //     // chunks: ["common", "index"],
    //     template: "./index.html",
    //     filename: "../public/index.html"
    //   }
    // }),
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css` // 给输出的 CSS 文件名称加上 hash 值
    }),
    // new DefinePlugin({
    //   ENV: JSON.stringify("dev")
    // }),
    // // new webpack.HashedModuleIdsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ["common", "runtime"],
    //   minChunks: Infinity
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    })
  ],
  externals: {
    jquery: "$"
  }
};