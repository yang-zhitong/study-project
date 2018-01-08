import header from "./components/header/header.js";
import main from "./components/main/main.js";

import "./app.css"; //使用require导入css文件

const path = window.location.pathname;

const routers = {
  "/": header + main,
  main: main
};

console.log(header);

// 进行路由匹配
$(document).ready(function () {
  $("body").html(routers(path));
});