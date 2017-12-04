const http = require('http');
const querystring = require('querystring');
const url = require('url');

// querystring 不支持嵌套对象
var postData = querystring.stringify({
  msg : 'Hello World!',
  name : '你好世界!',
  // name : {
  //   one: '哈哈哈',
  //   two: '哈哈'
  // }
});

// 提前编码好， 不然jsonData.length 不对
var jsonData = '{"name":"%E9%98%BF%E4%BB%80%E9%A1%BF%E9%A3%9E","number":"%E6%92%92%E7%82%B9%E7%B2%89"}';

// path少了 / 会报错
// path： `formGet${postData}`,  
// path： `ajaxGet?${postData}`,
// path： 'formPostNormal',
// path： 'ajaxPostJSON',
// path： 'ajaxPostNormal',

var options = {
  host: 'localhost',
  port: 3000,
  path: '/ajaxPostNormal',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json',
    'Content-Length': postData.length,
    // 'Content-Length': jsonData.length,
    'X-Requested-With' : 'XMLHttpRequest',
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
// console.log(jsonData);
req.write(postData);
req.end();