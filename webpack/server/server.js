import React from "react";
import { render } from "react-dom";
import { hello } from "./hello";

export function render() {
  // 把根组件渲染成 HTML 字符串
  return renderToString(<hello />);
}
