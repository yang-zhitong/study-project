const path = require("path");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const autoWebPlugin = require("./config/webpack.entry.js");

module.exports = {
  devtool: "eval-source-map",
  context: path.resolve(__dirname, "app"),
  entry: autoWebPlugin.entry({}),
  output: {
    path: path.resolve(__dirname, "public"),
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
    autoWebPlugin,
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css` // 给输出的 CSS 文件名称加上 hash 值
    }),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production 去除 react 代码中的开发时才需要的部分
      ENV: JSON.stringify("dev")
    })
  ],
  externals: {
    jquery: "$"
  }
};
