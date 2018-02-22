require("./css/common.css");
require("./css/vr-robot.css");

if (!window.console) {
  window.console = {
    log: "",
    dir: "",
    warn: ""
  };
}

const $ = require("jquery");

$(".nav").on("click", ".nav-a", function(e) {
  $(this)
    .addClass("current")
    .siblings()
    .removeClass("current");
  var target = $(this).data("target");
  if (target) {
    e.preventDefault();
    var offset = $("." + target).offset().top || 0;
    $("body,html")
      .stop()
      .animate(
        {
          scrollTop: offset
        },
        1000
      );
  }
});

let url,
  queryId = getParameterByName("id");

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

if (queryId) {
  url =
    "http://106.15.94.31/fantistic/index.php/Home/index/technology_details/id/" +
    queryId;
} else {
  url = "http://106.15.94.31/fantistic/index.php/Home/index/technology_details";
}

$.get(url)
  .done(function(data) {
    if (data.code == 10000) {
      var embedHtml =
        '<embed  src="' +
        data.data.view +
        '" allowFullScreen="true" quality="high" width="100%" height="479px" align="middle" allowScriptAccess="always"type="application/x-shockwave-flash" />';
      $(".J_video").append($(embedHtml));
    }
  })
  .fail(function(err) {
    if (err.code == 10000) {
      var embedHtml =
        '<embed  src="' +
        data.data.view +
        '" allowFullScreen="true" quality="high" width="100%" height="479px" align="middle" allowScriptAccess="always"type="application/x-shockwave-flash" />';
      $(".J_video").append($(embedHtml));
    }
  });

const $robot = $(".J_robot");
if ($robot.length > 0) {
  const img = new Image();
  img.onload = function() {
    $(".J_robot")
      .attr("src", img.src)
      .fadeIn(2000);
  };
  img.src = require("./images/shine_robot_min.png");
}

const ajaxLoad = [
  {
    name: "footer",
    template: require("./src/footer.ejs"),
    url: "http://106.15.94.31/fantistic/index.php/Home/index/companys"
  }
];

const hookClass = {
  footer: function(temp, data) {
    $(".J_footerInfo").html(temp(data));
    $(".J_profileContent").text(data.data[0].content); // 公司简介单独拿出来的
  }
};

function renderInOrder(index) {
  if (!ajaxLoad[index]) return false;
  const { url, template, name } = ajaxLoad[index];
  index++;
  $.get(url)
    .done(function(data) {
      if (data.code == 10000) {
        hookClass[name](template, data);
        renderInOrder(index);
      }
    })
    .fail(function(err) {
      if (err.code == 10000) {
        hookClass[name](template, data);
        renderInOrder(index);
      }
    });
}

renderInOrder(0);
