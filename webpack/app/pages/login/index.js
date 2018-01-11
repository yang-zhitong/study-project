import "./login.css";

const show = require("../../components/header/header.js");

console.log("123123123", show);
$(function() {
  $("body").html(show);
  $("body").on("click", "h1", function() {
    $(this).css({ backgroundColor: "yellow" });
  });
});
