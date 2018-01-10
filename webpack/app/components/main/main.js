// const HTML = require("./main.html");

// function show(content) {
//   $("body").text("Hello  " + content);
// }
// // show();
// // 通过 CommonJS 规范导出 show 函数
// module.exports = show;

import React, { Component } from "react";
import { render } from "react-dom";

class Button extends Component {
  render() {
    return <h1>Hello,Webpack</h1>;
  }
}

render(<Button />, window.document.getElementById("app"));
