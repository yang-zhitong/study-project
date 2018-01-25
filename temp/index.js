// 引入第二个域名加载图片资源, 同时控制的加载顺序
require("./css/common.css");
require("./css/index.css");
require("./css/estate.css");
require("./css/tech.css");
require("./css/communities.css");
require("./css/partner.css");

const $ = require("jquery");

const ajaxLoad = [{
    name: 'estate',
    template: require("./src/estate.ejs"),
    url: "http://106.15.94.31/fantistic/index.php/Home/index/wisdom",
  },
  {
    name: 'techs',
    template: require("./src/techs.ejs"),
    url: "http://106.15.94.31/fantistic/index.php/Home/index/technology",
  },
  {
    name: 'communities',
    template: require("./src/communities.ejs"),
    url: "http://106.15.94.31/fantistic/index.php/Home/index/cases",
  },
  {
    name: 'partner',
    template: require("./src/partner.ejs"),
    url: "http://106.15.94.31/fantistic/index.php/Home/index/enterprise",
  },
  {
    name: 'news',
    template: require("./src/news.ejs"),
    url: "http://106.15.94.31/fantistic/index.php/Home/index/news"
  }
];


const hookClass = {
  estate: function (temp, data) {
    $(".J_videosPlay").html(temp(data));
    estateEvent();
  },
  techs: function (temp, data) {
    $(".J_slideTechs").html(temp(data));
    $(".J_slideTechs").unslider({
      arrows: {
        prev: '<a class="unslider-arrow prev">&lt;</a>',
        next: '<a class="unslider-arrow next">&gt;</a>'
      }
    });
  },
  communities: function (temp, data) {
    window.commuData = data.data;
    $(".J_slideThumbnails").html(temp(data));
    commuEvent();
  },
  partner: function (temp, data) {
    $(".J_partner").html(temp(data));
    $(".J_logo").hover(
      function () {
        $(this).addClass("rotateIn");
      },
      function () {
        $(this).removeClass("rotateIn");
      }
    );
  },
  news: function (temp, data) {
    $(".J_showNews").html(temp(data));
  },
  profile: function (temp, data) {
    $(".J_footerInfo").html(temp(data));
    $(".J_profileContent").text(data.content); // 公司简介单独拿出来的
  }
};

function renderInOrder(index) {
  if (!ajaxLoad[index]) return false;
  const {
    url,
    template,
    name
  } = ajaxLoad[index];
  index++;
  $.get(url)
    .done(function (data) {
      if (data.code == 10000) {
        hookClass[name](template, data);
        renderInOrder(index);
      }
    })
    .fail(function (err) {
      if (err.code == 10000) {
        hookClass[name](template, data);
        renderInOrder(index);
      }
    });
}

renderInOrder(0);


function estateEvent() {
  // 视频播放
  $(".J_videosPlay").on("click", ".video", function () {
    var $this = $(this),
      $videoBox = $(".J_videoBox"),
      $parent = $this.parents(".black-ipad");
    var tmp =
      "http://player.video.qiyi.com/4179962cd710dae014f468e0585d404f/0/0/v_19rrewjxew.swf-albumId=902484100-tvId=902484100-isPurchase=0-cnId=6";
    var data = {
      src: $this.find("img").attr("src"),
      cn: $this.find(".text").text(),
      en: $this.find(".sub-text").text()
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
        $videoBox
          .find(".preload")
          .html(
            '<img src="' +
            data.src +
            '" class="preload-img"><p class="preload-cn">' +
            data.cn +
            '</p><p class="preload-en">' +
            data.en +
            "</p>"
          );
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
  });
}

function commuEvent() {
  var $thumbnails = $(".J_slideThumbnails");
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
      parentIndex = $this.data("parentindex"),
      childIndex = $this.data("childindex"),
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
              picSlide(parentIndex, childIndex);
            }
          );
      }
    );
  });

  // 触发
  $(".J_slideThumbnails .figure-img")
    .eq(0)
    .trigger("click");
}

const imgsArr = [
  [{
      selector: "J_whiteIpad",
      url: require("./images/white_ipad.png")
    },
    {
      selector: "J_profilePic",
      url: require("./images/company_intro.png")
    },
    {
      selector: "bg1",
      url: require("./images/index_bg1.jpg")
    }
  ],
  [{
      selector: "bg4",
      url: require("./images/index_bg4.jpg")
    },
    {
      selector: "bg5",
      url: require("./images/index_bg5.jpg")
    },
    {
      selector: "bg6",
      url: require("./images/index_bg6.jpg")
    },
    {
      selector: "bg7",
      url: require("./images/index_bg7.jpg")
    }
  ]
];

function imgsArrLoop(parentIndex) {
  if (!imgsArr[parentIndex]) return false;
  imgsArr[parentIndex].forEach(function (oneImg, childIndex) {
    var img = new Image(),
      selector = imgObj.selector,
      url = imgObj.url;
    img.onload = function () {
      $("." + selector).css("background-image", 'url("' + img.src + '")');
      if (childIndex === imgsArr[parentIndex].length - 1) {
        parentIndex++;
        imgsArrLoop(index);
      }
    };
    img.src = url;
  });
}

imgsArrLoop(0);

// 飞之前替换文字
function fadeText(pi, ci) {
  var $texts = $(".J_whiteIpad"),
    cData = window.commuData[pi][ci];
  $texts.find(".area-title").text(cData.title);
  $texts
    .find(".area-name")
    .fadeOut(function () {
      $(this).text(cData.name);
    })
    .delay(500)
    .fadeIn();
  $texts
    .find(".area-intro")
    .fadeOut(function () {
      $(this).text(cData.content);
    })
    .delay(500)
    .fadeIn();
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