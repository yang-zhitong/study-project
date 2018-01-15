require("./index.css");
const header = require("../../components/header/header.js");

const mainCss = require("com/main/main.css");
const main = require("com/main/main.ejs");
const html = require('./index.html');

// 进行路由匹配
  $("#app").html(header);
  new Promise((res, rej) => {
    setTimeout(() => res(), 2000);
  }).then(() => {
    $("#app").append(main({ css: mainCss, data: "ajax data" }));
  });
  $('#app').append(html);
  // $("body").on("click", "h1", function() {
  //   $(this).css({ backgroundColor: "yellow" });
  // });
  console.log("test", ENV);
