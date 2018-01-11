import './index.css';

const show = require("../../components/main/main.js");

// 进行路由匹配
$(document).ready(function() {
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
