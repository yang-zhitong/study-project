// import fs from "fs"; // 先引入fs再引入babel, 才不会报错 
// var ejs = require("ejs");

var urls = {
  estate: "http://106.15.94.31/fantistic/index.php/Home/index/wisdom",
  techs: "http://106.15.94.31/fantistic/index.php/Home/index/technology",
  communities: "http://106.15.94.31/fantistic/index.php/Home/index/cases",
  // partner: "http://106.15.94.31/fantistic/index.php/Home/index/enterprise",
  news: "http://106.15.94.31/fantistic/index.php/Home/index/news"
  // profile: "http://106.15.94.31/fantistic/index.php/Home/index/companys"
};

// var templates = {
//   estate: fs.readFileSync(__dirname + "/src/estate.ejs", "utf-8"),
//   techs: fs.readFileSync(__dirname + "/src/techs.ejs", "utf-8"),
//   communities: fs.readFileSync(__dirname + "/src/communities.ejs", "utf-8"),
//   partner: fs.readFileSync(__dirname + "/src/partner.ejs", "utf-8"),
//   news: fs.readFileSync(__dirname + "/src/news.ejs", "utf-8"),
//   profile: fs.readFileSync(__dirname + "/src/profile.ejs", "utf-8")
// };
var templates = {
  estate: "<% data.forEach(function (it, index) { %>\n  <li class=\"video v<%= index + 1 %>\">\n    <img class=\"img\" src=\"<%= it.picone %>\" alt=\"<% it.seotitle %>\">\n    <p class=\"text\">\n      <%= it.title %>\n    </p>\n    <p class=\"sub-text\">\n      <%= it.english %>\n    </p>\n  </li>\n<% }) %>",
  techs: "<ul class=\"ul-techs\">\n  <% data.forEach(function(it, index){ %>\n    <% if (index % 2 === 0) { %>\n    <li class=\"one-page\">\n      <div class=\"one-tech\">\n        <a href=\"./vr.html\" target=\"_blank\">\n          <img src=\"<%= it.pic %>\" alt=\"\" class=\"img-bg\">\n        </a>\n        <p class=\"intro\"><%= it.title %></p>\n        <p class=\"sub-intro pf\"><%= it.content %></p>\n      </div>\n      <% if (data[index+1]) { %>      \n      <div class=\"one-tech\">\n        <a href=\"./robot.html\" target=\"_blank\">\n          <img src=\"<%= data[index+1].pic %>\" alt=\"\" class=\"img-bg\">\n        </a>\n        <p class=\"intro\"><%= data[index+1].title%></p>\n        <p class=\"sub-intro pf\"><%= data[index+1].content %></p>\n      </div>\n      <% }%>    \n    </li>\n    <% }%>    \n  <% }) %>\n</ul>",
  communities: "<ul class=\"thumbnails\">\n  <% data.forEach(function(parent){ %>\n  <li class=\"one-page\">\n    <% parent.forEach(function (it, index){ %>\n      <div class=\"figure f<%= index+1 %>\">\n        <a class=\"figure-img\">\n          <img src=\"<%= it.imageF.image %>\" alt=\"\">\n        </a>\n        <p class=\"caption\">\n          <%= it.name %>\n        </p>\n        <p class=\"en-caption\">XXXXXX</p>\n      </div>\n      <% }) %>\n    </li>\n    <% }) %>\n</ul>",
  partner: "<% data.forEach(function(it, index) { %>\n  <a class=\"partner-logo logo<%= index+1 %>\"  href=<%= String(it.url) || \"javasciprt:;\" %>>\n    <img src=\"<%= it.logo %>\" alt=\"<%= it.title %>\">\n  </a>\n<% }); %>",
  news: "<div class=\"new-left\">\n  <a href=\"news.html?index=0\" target=\"_blank\">\n    <img src=\"<%= data[0].thumbnail %>\" alt=\"\" class=\"img\">\n  </a>\n  <div class=\"new-summary\">\n    <p class=\"time\"><%= timeFormat(data[0].t) %></p>\n    <p class=\"line\"></p>\n    <p class=\"new-title\"><%= data[0].title %></p>\n    <p class=\"preview\">\n      <%= data[0].description.slice(0, 50) + '...' %>\n    </p>\n  </div>\n</div>\n<div class=\"new-right\">\n  <a href=\"news.html?index=1\" target=\"_blank\">\n    <img src=\"<%= data[1].thumbnail %>\" alt=\"\" class=\"img\">\n  </a>\n  <div class=\"new-summary\">\n    <p class=\"time\"><%= timeFormat(data[1].t) %></p>\n    <p class=\"line\"></p>\n    <p class=\"new-title\"><%= data[1].title %></p>\n    <p class=\"preview\">\n       <%= data[1].description.slice(0, 50) + '...' %>\n    </p>\n  </div>\n</div>",
  profile: " <%= data.name %>\n<p class=\"line line1\">\n  <span class=\"line-left\">\n    \u7535\u8BDD\uFF1A<%= data.tele %>\n  </span>\n  \u5730\u5740\uFF1A<%= data.address %>\n</p>\n<p class=\"line line2\">\n  <span class=\"line-left\">\n    \u624B\u673A\uFF1A<%= data.iphone %>\n  </span>\n  \u90AE\u7F16\uFF1A<%= data.zip %>\n</p>\n<p class=\"line line3\">\n  <span class=\"line-left\">\n    \u90AE\u7BB1\uFF1A<%= data.mail %>\n  </span>\n  \u4F20\u771F\uFF1A<%= data.fax %>\n</p>"
};

var hookClass = {
  estate: function(content) {
    $(".J_videosPlay").html(content);
    // 视频播放
    $(".J_videosPlay").on("click", ".video", function() {
      var $this = $(this),
        $videoBox = $(".J_videoBox"),
        $parent = $this.parents(".black-ipad");
      var tmp =
        "http://player.video.qiyi.com/4179962cd710dae014f468e0585d404f/0/0/v_19rrewjxew.swf-albumId=902484100-tvId=902484100-isPurchase=0-cnId=6";
      var queue = [
        function(next) {
          $parent.siblings(".left-hand").animate({
            left: "-200px",
            opacity: 0
          });
          $parent.siblings(".right-hand").animate({
            right: "-200px",
            opacity: 0
          });
          next();
        },
        function(next) {
          $parent.fadeOut(1000, function() {
            next();
          });
        },
        function(next) {
          $videoBox.find("img").attr("src", $this.find("img").attr("src"));
          $videoBox.fadeIn(1000, function() {
            $videoBox
              .find(".preload")
              .hide()
              .siblings(".embed")
              .attr("src", tmp)
              .css({ display: "block" });
          });
        }
      ];
      $(document).queue("videoAni", queue);
      $(document).dequeue("videoAni");
      $(".nav-a")
        .eq(0)
        .text("返回首页")
        .one("click", function() {
          window.location.href = window.location.href;
        });
    });
  },
  techs: function(content) {
    $(".J_slideTechs").html(content);
    $(".J_slideTechs").unslider({
      arrows: {
        prev: '<a class="unslider-arrow prev">&lt;</a>',
        next: '<a class="unslider-arrow next">&gt;</a>'
      }
    });
  },
  communities: function(content) {
    $(".J_slideThumbnails").html(content);
    $(".J_slideThumbnails").unslider({
      animation: "fade",
      arrows: {
        prev: '<a class="sprite arrow-left prev">&lt;</a>',
        next: '<a class="sprite arrow-right next">&gt;</a>'
      }
    });
    $(".J_slideThumbnails").css({ overflow: "visible" });

    $(".J_slideThumbnails").on("click", ".figure-img", function() {
      $(".J_slidePics").html(
        '<div class="slide-pics "><ul class="pics-wrap"></ul></div>'
      );
      var $this = $(this),
        src = $this.find("img").attr("src"),
        $figure = $this.parent(),
        $clone = $figure.clone().addClass("flying");

      $clone.appendTo($figure.parent()).animate(
        {
          top: "-340px",
          left: "-80px",
          opcatity: 0.4
        },
        function() {
          $clone.remove();
          picScale(src);
        }
      );
    });
    $(".J_slideThumbnails .figure-img")
      .eq(0)
      .trigger("click");
  },
  partner: function(content) {
    $(".J_partner").html(content);
  },
  news: function(content) {
    $(".J_showNews").html(content);
  },
  profile: function(content) {
    $(".J_footerInfo").html(content);
  }
};

Object.keys(urls).forEach(function(it, index) {
  $.get(urls[it])
    .done(function(data) {
      if (data.code == 10000) {
        hookClass[it](ejs.render(templates[it], data));
        if (it === "profile") $(".J_profileContent").text(data.content); // 公司简介单独拿出来的
      }
    })
    .fail(function(err) {
      if (err.code == 10000) {
        hookClass[it](ejs.render(templates[it], data));
      }
    });
});

// 点击小球飞的动画
function picScale(src) {
  $(".pics-wrap")
    .html('<img src="' + src + '">')
    .css({
      display: "block",
      borderRadius: 0
    })
    .animate(
      {
        width: "100%",
        height: "100%"
      },
      1000,
      function() {
        picSlide();
      }
    );
}

// ipad看房轮播
function picSlide() {
  var srcs = [
    "http://placehold.it/500x500/09f/fff.png",
    "http://placehold.it/500x500/da8637/fff.png",
    "http://placehold.it/500x500/396d86/fff.png",
    "http://placehold.it/500x500/b5ac34/fff.png"
  ];
  var tmpHtml = "",
    $pics = $(".J_slidePics");
  $.each(srcs, function(index, item) {
    tmpHtml += '<li><img src="' + item + '"</li>';
  });

  $pics.find(".pics-wrap").html(tmpHtml);
  $pics.find(".slide-pics").unslider({
    animation: "fade",
    autoplay: true,
    arrows: false
  });
}

$(".J_logo").hover(
  function() {
    $(this).addClass("rotateIn");
  },
  function() {
    $(this).removeClass("rotateIn");
  }
);
