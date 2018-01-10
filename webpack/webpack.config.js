const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  devtool: "eval-source-map",
  entry: {
    app1: "./app/app.js",
    app2: "./app/app2.js"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
  },
  resolve:{
    alias:{
      com: './app/components/'
    }
  }
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader"
        },
        noParse: content => {
          // content 代表一个模块的文件路径
          // 返回 true or false
          return /jquery|chartjs/.test(content);
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
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
    }),
    new ExtractTextPlugin("style.css")
  ],
  externals: {
    jquery: "$"
  }
};
