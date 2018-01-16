const { WebPlugin } = require("web-webpack-plugin");

// 自动寻找 pages 目录下的所有目录，把每一个目录看成一个单页应用
const autoWebPlugin = new WebPlugin("./app/pages", {
  template: "./app/template.html", // HTML 模版文件所在的文件路径
  // 提取出所有页面公共的代码
  commonsChunk: {
    name: "common" // 提取出公共代码 Chunk 的名称
  }
});

module.exports = autoWebPlugin;
