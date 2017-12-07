let http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs"),
  zlib = require("zlib");
let staticPath = "./public/";

let MIME = {
  "txt": "text/plain",
  "xml": "text/xml",
  "html": "text/html",
  "css": "text/css",
  "js": "text/javascript",
  "json": "application/json",
  "gif": "image/gif",
  "png": "image/png",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "svg": "image/svg+xml",
  "ico": "image/x-icon",
  "pdf": "application/pdf",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv"
};

let Expires = {
  fileMatch: /.*/ig,
  maxAge: 60*60*24 
};

let app = http.createServer((request, response) => {
  let pathName = url.parse(request.url).pathname || "",
    realPath = path.join(staticPath, path.normalize(pathName.replace(/\.\./g, "")));; // 请求文件的在磁盘中的真实地址

  fs.exists(realPath, (exists) => {
    if (!exists) {
      // 当文件不存在时
      response.writeHead(404, {
        "Content-Type": "text/plain"
      });

      response.write("This request URL ' " + realPath + " ' was not found on this server.");
      response.end();
    } else {
      let extName = path.extname(realPath);
      extName = extName ? extName.slice(1) : "";
      let contentType = MIME[extName] || "text/plain";
      let expires = new Date();
      expires.setTime(expires.getTime() + Expires.maxAge * 1000);

      
      const headers = {
        'Content-type': `${contentType}; charset=utf-8`,
        'Expires': expires.toUTCString(),
        'Cache-Control': 'public, max-age=86400',

      }

      let stat = fs.statSync(realPath);
      let lastModified = stat.mtime.toUTCString();
      response.setHeader("Last-Modified", lastModified);
      
      console.log('modify?');
      response.writeHead(304, "from disk cache");
      response.end();
      return;
      // if (request.headers["if-modified-since"] && lastModified == request.headers["if-modified-since"]) {
      //   response.writeHead(304, "from disk cache");
      //   response.end();
      //   return;
      // }

      console.log('modify');
      let raw = fs.createReadStream(realPath);
      let acceptEncoding = request.headers['accept-encoding'] || '';
      if (acceptEncoding.match(/\bdeflate\b/)) {
        // response.writeHead(200, {
        //   'Content-Encoding': 'deflate'
        // });
        // raw.pipe(zlib.createDeflate()).pipe(response);
        response.writeHead(200, 'ok');
        raw.pipe(response);
      } else if (acceptEncoding.match(/\bgzip\b/)) {
        console.log(2);
        response.writeHead(200, {
          'Content-Encoding': 'gzip'
        });
        raw.pipe(zlib.createGzip()).pipe(response);
      } else {
        console.log(3);
        response.writeHead(200, {});
        raw.pipe(response);
      }
    }
  });
});

app.listen(3000);