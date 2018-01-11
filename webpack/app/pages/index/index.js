import "./index.css";

const header = require("../../components/header/header.js");

const show = require("../../components/main/main.js");

// 进行路由匹配
$(document).ready(function() {
  // $("body").html(header);
  $("body").on("click", "h1", function() {
    $(this).css({ backgroundColor: "yellow" });
  });
});
