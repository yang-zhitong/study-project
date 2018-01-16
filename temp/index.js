$(function () {
  $(".left-hand").animate({
    // left: "17px",
    opacity: 1
  }, 2000);
  $(".right-hand").animate({
    // right: "-4px",
    opacity: 1
  }, 2000);

  $("nav").on("click", ".nav-a", function () {
    var offset = $("." + $(this).data("target")).offset().top || 0;
    $("body,html")
      .stop()
      .animate({
        scrollTop: offset
      }, 1000);
  });

  $(".J_slideTechs").slide({
    titCell: ".circles",
    mainCell: ".ul-techs",
    autoPage: true,
    effect: "left",
    autoPlay: false,
    scroll: 2,
    vis: 2,
    trigger: "click"
  });

  $(".J_slideThumbnails").slide({
    mainCell: ".thumbnails",
    autoPage: true,
    trigger: "click",
    delayTime: 700
  });

  $(".J_slideThumbnails").on("click", ".figure-img", function () {
    var $this = $(this),
      src = $this.find("img").attr("src"),
      $figure = $this.parent(),
      $clone = $figure.clone().addClass("flying");

    $clone.appendTo($figure.parent()).animate({
        top: "-340px",
        left: "-150px",
        opcatity: 0.4
      },
      function () {
        $clone.remove();
        picScale(src);
      }
    );
  });

  function picScale(src) {
    $(".pics-wrap")
      .attr("style", "")
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
          picSlide();
        }
      );
  }

  function picSlide() {
    var srcs = [
      "http://placehold.it/500x500/09f/fff.png",
      "http://placehold.it/500x500/da8637/fff.png",
      "http://placehold.it/500x500/396d86/fff.png",
      "http://placehold.it/500x500/b5ac34/fff.png"
    ];
    var $pics = $(".J_slidePics");
    $pics.find(".pics-wrap").html("");
    $.each(srcs, function (index, item) {
      $pics.find(".pics-wrap").append($("<img>").attr("src", item));
    });
    // $(".J_slidePics").slide({ mainCell: ".pics-wrap", autoPlay: true });
    if (picSlide.repeat) clearTimeout(picSlide.repeat);
    helpPicSlide(0, $pics.find("img"));
  }

  function helpPicSlide(index, $pics) {
    if ($pics.length === 0) return false;
    if (index >= $pics.length) {
      index = 0;
    }
    $pics
      .eq(index)
      .fadeIn(1000)
      .siblings()
      .fadeOut();
    index++;
    picSlide.repeat = setTimeout(function () {
      helpPicSlide(index, $pics);
    }, 3000);
  }

  $(".J_slideThumbnails .figure-img")
    .eq(0)
    .trigger("click");

  $(".J_videosPlay").on("click", ".video", function () {
    var $this = $(this),
      $videoBox = $(".J_videoBox"),
      $parent = $this.parents(".black-ipad");
    var tmp = `http://player.video.qiyi.com/4179962cd710dae014f468e0585d404f/0/0/v_19rrewjxew.swf-albumId=902484100-tvId=902484100-isPurchase=0-cnId=6`;
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
        $videoBox.find("img").attr("src", $this.find("img").attr("src"));
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
  });

  // $('.J_robot').show();
  // $('.J_robotDot').animate({
  //   width: '1920px',
  //   left: '-360px'
  // })
});