const cheerio = require('cheerio');
const url = require('url');
const fs = require('fs');
const host = 'http://www.html5dw.com';
const request = require('request');

var options = {
  url: 'http://www.juxiangwan.com',
  headers: {
'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
'Accept-Encoding': 'gzip, deflate',
'Accept-Language':'zh-CN,zh;q=0.8',
'Cache-Control' : 'max-age=0',
'Connection': 'keep-alive',
'Host': 'www.juxiangwan.com',
'Upgrade-Insecure-Requests': '1',
'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
  }
}

const getPage = new Promise(
  (resolve, reject) => {
    request(host, (err, response) => {
      let $ = cheerio.load(response.body);
      resolve($);
    });
  }
);

var css = [];
var js = [];
var img = [];
var cssText = {};

const getJs = function ($) {

  $('script').each(function (idx, element) {
    let src;
    let $element = $(element);
    if ($element.attr('src')) {
      src = url.resolve(host, $element.attr('src'));
      js.push(src);
    }
  });
  return Promise.resolve($);
};

const getHtmlImg = function ($) {

  $('img').each(function (index, item) {
    let src = url.resolve(host, $(item).attr('src'));
    img.push(src);
  });
  return Promise.resolve($);
};

// 要取出?后面的版本号
const getCss = function ($) {
  $('link').each(function (idx, element) {
    let $element = $(element);
    let href = url.resolve(host, $element.attr('href'));
    if (href.endsWith('.css')) {
      css.push(href);
    }
  });
  return Promise.resolve(css); // 传cssurl准备获取里面的img
};

const getCssImg = function (css) {
  let cssimgurl = [];
  let reg = function(data) {
    let pattern = /url\((.*?)\)/gi;
    let urls = [];
    let m = data.match(pattern);
    if (!m) return true;
    m.forEach((item) => {
      let url = item.slice(4, -1);
      console.log(url);
      if (url.startsWith('//', 0)) {
        url = 'http://' + url;
      } else {
        url = host + url;
      }
      urls.push(url);
    });
    return urls;
  }
  css.forEach((cssurl, index) => {
    console.log(cssurl,"请求css");
    cssimgurl.push(new Promise(
      (resolve, reject) => {
        request(cssurl, (err, response) => {
          let name = url.parse(cssurl).pathname.slice(1); //得到带路径的文件名
          let urls = reg(response.body);
          console.log('在这个文件下', name);
          cssText[name] = response.body;
          resolve(urls);
        });
      }
    ));
  });

  return Promise.resolve(Promise.all(cssimgurl));
};

const mkdir = function (allUrl) {
  // 递归生成目录函数
  let help = function (i, d, path) {
    if (i >= path.length) {
      return false;
    } else {
      let tmp  = d + '/' + path[i];
      if (!d) {tmp = path[i];} // 生成第一个路径
      try {
        fs.mkdirSync(tmp);
        i++;
        console.log('生成目录',i, tmp);
        return help(i, tmp, path);
      } catch (error) {
        console.log('这个目录已经有了', tmp);
        i++;
        return help(i, tmp, path);
      }
    }
  }
  allUrl.forEach((it) => {
    let i = 0;
    let path = url.parse(it).pathname.slice(1).split('/');
    path.pop(); // 去掉文件名
    console.log('要生成的路径', path);
    help(i, '', path);
  });

  return Promise.resolve(allUrl);
};

const writeFile = function (allUrl) {
  console.log('准备请求这些链接', allUrl);
  allUrl.forEach((uri) => {
    let name = url.parse(uri).pathname.slice(1); //获取文件名
    if (name in cssText) {
      console.log('直接保存', name);
      fs.writeFileSync(name, cssText[name]);
    } else {
      request(uri).pipe(fs.createWriteStream(name)).on('close', function(){
        console.log('请求了并且保存', name);
      });
    }
  });
  return Promise.resolve();
};



const start = function () {
  getPage
    .then(getJs)
    .then(getHtmlImg)
    .then(getCss)
    .then(getCssImg)
    .then((fullfill) => {
      console.log('cssimg', fullfill);
    })
    .catch(error => console.log(error));
};

start();
