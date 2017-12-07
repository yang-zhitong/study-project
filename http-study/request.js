const http = require('http');
const querystring = require('querystring');
const url = require('url');

var isJ = 1;
var cPath = '/ajaxPostNormal';

// path少了 / 会报错
// path： `formGet${postData}`,  
// path： `ajaxGet?${postData}`,
// path： 'formPostNormal',
// path： 'ajaxPostJSON',
// path： 'ajaxPostNormal',

// querystring 不支持嵌套对象
var postData = querystring.stringify({
  msg : 'Hello World!',
  name : '你好世界!',
});
var postDataOptions = {
  host: 'localhost',
  port: 3000,
  path: cPath,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length,
    'X-Requested-With' : 'XMLHttpRequest',
  }
};

// 提前编码好， 不然jsonData.length 不对
// var jsonData = '{"name":"%E9%98%BF%E4%BB%80%E9%A1%BF%E9%A3%9E","number":"%E6%92%92%E7%82%B9%E7%B2%89"}';
var jsonData = '{"name":"哈哈哈","number":"哈world"}';
var jsonOption = {
  host: 'localhost',
  port: 3000,
  path: cPath,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Length': jsonData.length,
    'Content-Length': Buffer.byteLength(jsonData, 'utf-8'),
    'X-Requested-With' : 'XMLHttpRequest',
  }
}



var options = isJ === 1 ? jsonOption : postDataOptions;
var data = isJ === 1 ? jsonData : postData;

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
req.write(data);
req.end();