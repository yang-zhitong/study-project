const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { WebPlugin } = require("web-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  devtool: "eval-source-map",
  context: path.resolve(__dirname, "app"),
  entry: {
    app: "./pages/index/index.js",
    app2: "./pages/login/login.js"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
  },
  resolve: {
    alias: {
      com: "./components/"
    }
  },
  module: {
    rules: [
      {
        test: /(.jxs)|(.js)$/,
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
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery"
    // }),

    // 一个 WebPlugin 对应一个 HTML 文件
    new WebPlugin({
      template: "./app/template.html", // HTML 模版文件所在的文件路径
      filename: "index.html" // 输出的 HTML 的文件名称
    }),
    new ExtractTextPlugin("style.css")
  ],
  externals: {
    jquery: "$"
  }
};
