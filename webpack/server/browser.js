import React from "react";
import { render } from "react-dom";
import { hello } from "./hello";

// 把根组件渲染到 DOM 树上
render(<hello />, window.document.getElementById("app"));
