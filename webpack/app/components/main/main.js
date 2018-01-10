// const HTML = require("./main.html");

function show(content) {
  $("body").text("Hello  " + content);
}
// show();
// 通过 CommonJS 规范导出 show 函数
module.exports = show;
