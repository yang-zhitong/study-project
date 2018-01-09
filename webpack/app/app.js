import header from "./components/header/header.js";
import main from "./components/main/main.js";

import "./app.css"; //使用require导入css文件

function routers() {
  const path = window.location.pathname;
  const routeMap = {
    "/": header + main,
    main: main
  };
  return routeMap[path];
}


// 进行路由匹配
$(document).ready(function() {
  console.log(routers());
  $("body").html(routers());

  $("body").on("click", "h1", function() {
    $(this).css({
      backgroundColor: "red"
    });
  });

  $("body").on("click", ".main", function() {
    $(this)
      .siblings()
      .show();
  });
});
