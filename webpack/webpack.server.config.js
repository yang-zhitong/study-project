const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  context: path.resolve(__dirname, "server"),  
  // JS 执行入口文件
  entry: "./server.js",
  // 为了不把 Node.js 内置的模块打包进输出文件中，例如 fs net 模块等
  target: "node",
  // 为了不把 node_modules 目录下的第三方模块打包进输出文件中
  externals: [nodeExternals()],
  output: {
    // 为了以 CommonJS2 规范导出渲染函数，以给采用 Node.js 编写的 HTTP 服务调用
    libraryTarget: "commonjs2",
    // 把最终可在 Node.js 中运行的代码输出到一个 bundle_server.js 文件
    filename: "bundle_server.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./public")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        // CSS 代码不能被打包进用于服务端的代码中去，忽略掉 CSS 文件
        test: /\.css/,
        use: ["ignore-loader"]
      }
    ]
  },
  devtool: "source-map" // 输出 source-map 方便直接调试 ES6 源码
};
