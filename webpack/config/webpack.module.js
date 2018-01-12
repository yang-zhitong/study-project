const ExtractTextPlugin = require("extract-text-webpack-plugin");

const rules = [
  {
    test: /(\.jsx|\.js)$/,
    use: {
      loader: "babel-loader"
    },
    exclude: /node_modules/
  },
  {
    test: /\.html$/,
    loader: "html-loader"
  },
  {
    test: /\.ejs$/,
    loader: "ejs-loader"
  },
  {
    test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
    use: ["file-loader"]
  }
];
const proRule = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
        options: {
          minimize: true
          // sourceMap: true
        }
      },
      {
        loader: "postcss-loader"
      }
    ]
  })
};
const devRule = {
  test: /\.css$/,
  use: [
    {
      loader: "style-loader"
    },
    {
      loader: "css-loader",
      options: {
        minimize: true,
        modules: true // 指定启用css modules
      }
    },
    {
      loader: "postcss-loader"
    }
  ]
};

module.exports = function(isDev) {
  isDev ? rules.push(devRule) : rules.push(proRule);
  return { rules };
};
