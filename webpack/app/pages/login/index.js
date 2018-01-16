import "./login.css";

const show = require("../../components/header/header.js");

$(function() {
  $("body").html(show);
  $("body").on("click", "h1", function() {
    $(this).css({ backgroundColor: "yellow" });
  });
});
