$(function () {
  var $html = $(".J_htmlReplace");
  var template = '<h1 class="head-title">{{title}}</h1><p class="time-left">{{time}}</p><p class="topic">{{topic}}</p><p class="time-right">{{time}}</p><article class="article">{{article}}</article>';

  $(".J_pageBox").on("click", ".next", function () {
    var res = template
      .replace("{{title}}", `模拟标题${Math.random() * 9}`)
      .replace(/{{time}}/g, new Date().toLocaleDateString())
      .replace("{{topic}}", `模拟副标题${Math.random() * 9}`)
      .replace("{{article}}", `模拟内容${Math.random() * 9}`);
    console.log(res);
    $html.html(res);
  });

  $(".J_pageBox").on("click", ".last", function () {
    var res = template
      .replace("{{title}}", `模拟标题${Math.random() * 9}`)
      .replace(/{{time}}/g, new Date().toLocaleDateString())
      .replace("{{topic}}", `模拟副标题${Math.random() * 9}`)
      .replace("{{article}}", `模拟内容${Math.random() * 9}`);
    $html.html(res);
  });
});