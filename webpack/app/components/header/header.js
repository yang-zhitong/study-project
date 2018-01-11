import "./header.css";

const html = require("./header.html");

$("body").on("click", "h1", function() {
  $(this).css({ color: "red" });
});

module.exports = html;
