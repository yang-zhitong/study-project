import fs from "fs"; // 先引入fs再引入babel, 才不会报错
import "babel-polyfill";

const ejs = require("ejs");

const html = {
  header: ejs.render(
    fs.readFileSync(__dirname + "/src/header/header.ejs", "utf8"),
    { text: "123" }
  ),
  footer: fs.readFileSync(__dirname + "/src/footer/footer.ejs")
};

$(function() {
  $(".app").html(html.header + html.footer);

  $(".header").on("click", "h1", function() {
    $(this).css({ color: "red" });
  });

  async function name(num) {
    await new Promise((res, rej) => setTimeout(() => res(), 1500));
    $("footer").css({ top: "50%" });
  }
  // async await测试IE9+支持
  name();
});
