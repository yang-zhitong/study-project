require("./index.css");
const header = require("../../components/header/header.js");

const mainCss = require("com/main/main.css");
const main = require("com/main/main.ejs");

// 进行路由匹配
$(document).ready(function() {
  $("body").html(header);
  new Promise((res, rej) => {
    setTimeout(() => res(), 2000);
  }).then(() => {
    $("body").append(main({ css: mainCss, data: "ajax data" }));
  });
  // $("body").on("click", "h1", function() {
  //   $(this).css({ backgroundColor: "yellow" });
  // });
  console.log("test", ENV);
});
