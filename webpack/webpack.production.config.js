const path = require("path");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const { AutoWebPlugin } = require("web-webpack-plugin");

// 自动寻找 pages 目录下的所有目录，把每一个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin("./app/pages", {
  template: "./app/template.html", // HTML 模版文件所在的文件路径
  // postEntrys: ["./app/common.css"], // 所有页面都依赖这份通用的 CSS 样式文件
  // 提取出所有页面公共的代码
  commonsChunk: {
    name: "common" // 提取出公共代码 Chunk 的名称
  }
});

module.exports = {
  devtool: "eval-source-map",
  context: path.resolve(__dirname, "app"),
  entry: autoWebPlugin.entry({
    // 这里可以加入你额外需要的 Chunk 入口
  }),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]_[chunkhash:8].js"
  },
  resolve: {
    alias: {
      com: "./components/"
    }
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              minimize: true
              // modules: true, // 指定启用css modules
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        use: ["file-loader"]
      }
    ]
  },
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
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
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
