// 引入第二个域名加载图片资源, 同时控制的加载顺序
require('./css/common.css')
require('./css/index.css')
const $ = require('jquery');

const templates = {
  estate: require('./src/estate.ejs'),
  techs: require('./src/techs.ejs'),
  communities: require('./src/communities.ejs'),
  partner: require('./src/partner.ejs'),
  news: require('./src/news.ejs'),
}

const urls = {
  estate: "http://106.15.94.31/fantistic/index.php/Home/index/wisdom",
  techs: "http://106.15.94.31/fantistic/index.php/Home/index/technology",
  communities: "http://106.15.94.31/fantistic/index.php/Home/index/cases",
  partner: "http://106.15.94.31/fantistic/index.php/Home/index/enterprise",
  news: "http://106.15.94.31/fantistic/index.php/Home/index/news"
}

const urlsKeys = Object.keys(urls)

const hookClass = {
  estate: function (keyName, data) {
    $(".J_videosPlay").html(templates[keyName](data));
    estateEvent();
  },
  techs: function (keyName, data) {
    $(".J_slideTechs").html(templates[keyName](data));
    $(".J_slideTechs").unslider({
      arrows: {
        prev: '<a class="unslider-arrow prev">&lt;</a>',
        next: '<a class="unslider-arrow next">&gt;</a>'
      }
    });
  },
  communities: function (keyName, data) {
    window.commuData = data.data;
    var $thumbnails = $(".J_slideThumbnails");
    $thumbnails.html(templates[keyName](data));
    $thumbnails.unslider({
      animation: "fade",
      arrows: {
        prev: '<a class="sprite arrow-left prev">&lt;</a>',
        next: '<a class="sprite arrow-right next">&gt;</a>'
      }
    });
    $thumbnails.css({
      overflow: "visible"
    });

    $thumbnails.on("click", ".figure-img", function () {
      $(".J_slidePics").html(
        '<div class="slide-pics "><ul class="pics-wrap"></ul></div>'
      );
      var $this = $(this),
        parentIndex = $this.data('parentindex'),
        childIndex = $this.data('childindex'),
        src = $this.find("img").attr("src"),
        $figure = $this.parent(),
        $clone = $figure.clone().addClass("flying");

      $clone.appendTo($figure.parent()).animate({
          top: "-340px",
          left: "-80px",
          opcatity: 0.4
        },
        function () {
          $clone.remove();
          fadeText(parentIndex, childIndex);
          $(".pics-wrap")
            .html('<img src="' + src + '">')
            .css({
              display: "block",
              borderRadius: 0
            })
            .animate({
                width: "100%",
                height: "100%"
              },
              1000,
              function () {
                picSlide(parentIndex, childIndex)
              },
            );
        }
      );
    });

    // 触发
    $(".J_slideThumbnails .figure-img")
      .eq(0)
      .trigger("click");
  },
  partner: function (keyName, data) {
    $(".J_partner").html(templates[keyName](data));
    $(".J_logo").hover(
      function () {
        $(this).addClass("rotateIn");
      },
      function () {
        $(this).removeClass("rotateIn");
      }
    );
  },
  news: function (keyName, data) {
    $(".J_showNews").html(templates[keyName](data));    
  },
  profile: function (content) {
    $(".J_footerInfo").html(content);
    $(".J_profileContent").text(data.content); // 公司简介单独拿出来的
  }
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
  if (!keyName) return false;
  index++;
  $.get(urls[keyName])
    .done(function (data) {
      if (data.code == 10000) {
        hookClass[keyName](keyName, data);
        renderInOrder(index);
      }
    })
    .fail(function (err) {
      if (err.code == 10000) {
        hookClass[keyName](keyname, data);
        renderInOrder(index);
      }
    })
}

renderInOrder(0);

const imgs = {
  bg1: require('./images/index_bg1.jpg'),
  bg4: require('./images/index_bg4.jpg'),
  J_whiteIpad: require('./images/white_ipad.png'),
  bg5: require('./images/index_bg5.jpg'),
  bg6: require('./images/index_bg6.jpg'),
  J_partner: require('./images/friend_com.png'),
  J_profilePic: require('./images/company_intro.png'),
  bg7: require('./images/index_bg7.jpg'),
}
Object.keys(imgs).forEach(function (it) {
  loadImg(it, imgs[it]);
});

function loadImg(selector, url) {
  var img = new Image();
  console.log(selector, url);
  img.onload = function () {
    $('.' + selector).css('background-image', 'url("' + img.src + '")');
  };
  img.src = url;
}

// 飞之前替换文字 
function fadeText(pi, ci) {
  var $texts = $('.J_whiteIpad'),
    cData = window.commuData[pi][ci];
  $texts.find('.area-title').text(cData.title);
  $texts.find('.area-name').fadeOut(function () {
    $(this).text(cData.name);
  }).delay(500).fadeIn()
  $texts.find('.area-intro').fadeOut(function () {
    $(this).text(cData.content);
  }).delay(500).fadeIn();
}
// 点击小球飞的动画
function picScale(src, cb) {

}

// ipad看房轮播
function picSlide(pi, ci) {
  var srcs = [
    "http://placehold.it/500x500/09f/fff.png",
    "http://placehold.it/500x500/da8637/fff.png",
    "http://placehold.it/500x500/396d86/fff.png",
    "http://placehold.it/500x500/b5ac34/fff.png"
  ];
  var tmpHtml = "",
    $pics = $(".J_slidePics");
  $.each(srcs, function (index, item) {
    tmpHtml += '<li><img src="' + item + '"</li>';
  });

  $pics.find(".pics-wrap").html(tmpHtml);
  $pics.find(".slide-pics").unslider({
    animation: "fade",
    autoplay: true,
    arrows: false
  });
}