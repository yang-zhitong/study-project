import "./login.css";

const show = require("../../components/header/header.js");

$("body").html(show);
console.log('1111');
$("body").on("click", "h1", function () {
  $(this).css({
    backgroundColor: "yellow"
  });
});