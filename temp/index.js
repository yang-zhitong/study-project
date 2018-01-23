require('./css/common.css')
require('./css/index.css')
const $ = require('jquery');

const templates = {
  estate: require('./src/estate.ejs'),
}

const urls = {
  estate: "http://106.15.94.31/fantistic/index.php/Home/index/wisdom",
}

const urlsKeys = Object.keys(urls)

const hookClass = {
  estate: function (content) {
    $(".J_videosPlay").html(content);
    estateEvent();
  },
}

function estateEvent() {
  // 视频播放
  $(".J_videosPlay").on("click", ".video", function () {
    var $this = $(this),
      $videoBox = $(".J_videoBox"),
      $parent = $this.parents(".black-ipad");
    var tmp =
      "http://player.video.qiyi.com/4179962cd710dae014f468e0585d404f/0/0/v_19rrewjxew.swf-albumId=902484100-tvId=902484100-isPurchase=0-cnId=6";
    var data = {
      src: $this.find('img').attr('src'),
      cn: $this.find('.text').text(),
      en: $this.find('.sub-text').text(),
    };
    var queue = [
      function (next) {
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
      function (next) {
        $parent.fadeOut(1000, function () {
          next();
        });
      },
      function (next) {
        $videoBox.find('.preload').html('<img src="' + data.src + '" class="preload-img"><p class="preload-cn">' + data.cn + '</p><p class="preload-en">' + data.en + '</p>');
        $videoBox.fadeIn(1000, function () {
          $videoBox
            .find(".preload")
            .hide()
            .siblings(".embed")
            .attr("src", tmp)
            .css({
              display: "block"
            });
        });
      }
    ];
    $(document).queue("videoAni", queue);
    $(document).dequeue("videoAni");
    $(".nav-a")
      .eq(0)
      .text("返回首页")
      .one("click", function () {
        window.location.href = window.location.href;
      });
  })
}

function renderInOrder(index) {
  const keyName = urlsKeys[index];
  index++;
  $.get(urls[keyName])
    .done(function (data) {
      if (data.code == 10000) {
        hookClass[keyName](templates[keyName](data))
        if (keyName === "profile") $(".J_profileContent").text(data.content); // 公司简介单独拿出来的
        renderInOrder(index);
      }
    })
    .fail(function (err) {
      if (err.code == 10000) {
        hookClass[it](ejs.render(templates[it], data));
        renderInOrder(index);
      }
    })
}

renderInOrder(0);

function loadImg(url) {
  var img = new Image();
  img.onload = function () {
    $('.bg1').css('background-image', 'url("'+img.src+'")');
  };
  img.src = url;
}
loadImg(require('./images/index_bg1.jpg'));
loadImg(require('./images/index_bg4.jpg'));