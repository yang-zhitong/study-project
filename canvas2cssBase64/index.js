var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");

// 路由方法
var handle = {};
handle['/'] = function (response, postData) {
  start(response, postData);
};
handle['/upload'] = function (response, postData) {
  createCss(response, postData);
};

handle['/assets'] = function (response, postData) {
  assets(response, postData);
};

function start(response, postData) {
  response.writeHead(200, { "Content-Type": "text/html" });
  console.log('__dirname', __dirname);
  response.end(fs.readFileSync(__dirname + '/index.html'));
}

function assets(response, postData) {

}

function createCss(response, postData) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  var arr = JSON.parse(postData);
  var css = '';
  arr.forEach(function (element, index) {
    css += `.elem${index} {\nbackground-image: url(${element});\n}\n`;
  }, this);
  fs.writeFileSync('1.css', css);
  var res = {
    code: 10000,
    msg: "ok"
  };
  response.end(JSON.stringify(res));
}

// 开始
var server = http.createServer(function (request, response) {
  var postData = "";
  var pathname = url.parse(request.url).pathname;
  request.setEncoding("utf8");
  request.addListener("data", function (postDataChunk) {
    postData += postDataChunk;
  });
  request.addListener("end", function () {
    if (typeof handle[pathname] === 'function') {
      console.log('normal path', pathname);
      handle[pathname](response, postData);
    } else if (/\.css/g.test(pathname)) {
      console.log('request a css', __dirname + pathname);
      response.writeHead(200, { "Content-Type": "text/css" });
      response.end(fs.readFileSync(__dirname + pathname));
    }
  });
});

console.log('http://localhost:3002/');
server.listen(3002);
