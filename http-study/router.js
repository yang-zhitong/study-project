const Busboy = require('busboy');
const { inspect } = require('util');
const path = require('path');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// 手动解析
function parseFile(req, res) {
  let fileName = '',
    postData = [];
  req.setEncoding('binary');
  const boundary = req.headers['content-type'].split('boundary=')[1];
  req.on('data', function (chunk) {
    postData.push(chunk);
  });
  req.on('end', function () {
    const fileObj = queryString.parse(postData[0], '\r\n', ':')
    const mime = fileObj['Content-Type'];
    res.end(JSON.stringify(fileObj));
    // if (/image/.test(mime)) {
    //   const fileInfo = fileObj['Content-Disposition'].join('');
    //   const fileName = fileInfo.replace(/(.*?)filename="(.*?)"/ig, '$2');
    //   let image = postData[0].toString().replace(/[\s\S]*content-type:\s/i, '').slice(mime.length);
    //   console.log('1', image);
    //   image = image.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    //   // console.log('2', image);
    //   // image = image.substring(0, image.indexOf('--' + boundary + '--'));
    //   fs.writeFile(fileName, image, 'binary', function (err) {
    //     res.end(image);
    //   });
    // }
  });
}
function parseText(req, res, isJson) {
  let postData = '';
  req.addListener('data', function (postDataChunk) {
    postData += postDataChunk;
  });
  req.addListener('end', function () {
    let params; // 进行decode
    // const params = querystring.unescape(postData); // unescape decode 也可以
    if (isJson) {
      params = decodeURIComponent(postData);
    } else {
      params = JSON.stringify(querystring.parse(postData));
    }
    console.log(params);
    res.end(params);
  });
}

function busboyParse(req, res) {
  const busboy = new Busboy({
    headers: req.headers
  });
  let fileObj = {}, fieldObj = {};;
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    file.on('data', function (data) {
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
    });

    file.on('end', function () {
      console.log('File [' + fieldname + '] Finished');
    });
    Object.assign(fileObj, {fieldname, filename, encoding, mimetype});
    const saveTo = path.join(__dirname, filename);
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    fieldObj[fieldname] = Object.assign({}, {fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype}); 
    console.log('Field [' + fieldname + ']: value: ' + inspect(val));
  });
  busboy.on('finish', function () {
    console.log('Done parsing form!');
    res.end(JSON.stringify(Object.assign({}, { fileObj }, { fieldObj })));
  });
  req.pipe(busboy);
}

const handlers = {};

function Handler(method) {
  this.process = function (req, res, params) {
    return method.apply(this, [req, res, params]);
  }
}

const register = (url, method) => {
  handlers[url] = new Handler(method);
};

const route = (url) => {
  return handlers[url];
}

register('/', (req, res) => {
  res.end(fs.readFileSync('./index.html'));
});

register('/formGet', (req, res) => {
  const query = querystring.parse(url.parse(req.url).query);
  res.end(JSON.stringify(query));
});

register('/ajaxGet', (req, res) => {
  const query = querystring.parse(url.parse(req.url).query);
  console.log(query);
  res.end(JSON.stringify(query));
});

register('/formPostNormal', (req, res) => {
  parseText(req, res);
});

register('/ajaxPostJSON', (req, res) => {
  parseText(req, res, 1);
});

register('/ajaxPostNormal', (req, res) => {
  parseText(req, res);
});

register('/formPostFile', (req, res) => {
  busboyParse(req, res);
});

register('/ajaxPostFile', (req, res) => {
  busboyParse(req, res);
});

register('/ajaxBase64', (req, res) => {
  let postData = '';
  req.addListener('data', function (postDataChunk) {
    postData += postDataChunk;
  });
  req.addListener('end', function () {
    const img = JSON.parse(postData).img;
    fs.writeFile('base64.png', img.replace(/^data:image\/png;base64,/, ''), 'base64', (err) => {
      if (err) console.log(err);
    });
    res.end('ok');
  });
});

module.exports = {
  register,
  route,
}
