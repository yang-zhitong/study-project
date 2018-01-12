const path = require("path");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");

const autoWebPlugin = require("./config/webpack.entry.js");

module.exports = {
  context: path.resolve(__dirname, "app"),
  entry: autoWebPlugin.entry({}),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]_[chunkhash:8].js"
  },
  resolve: require("./config/webpack.resolve.js"),
  module: require("./config/webpack.module.js")(),
  plugins: [
    autoWebPlugin,
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css` // 给输出的 CSS 文件名称加上 hash 值
    }),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production 去除 react 代码中的开发时才需要的部分
      ENV: JSON.stringify("production")
    }),
    // 压缩输出的 JS 代码
    new UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    })
  ],
  externals: {
    jquery: "$"
  }
};
