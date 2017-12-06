let http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs");

let staticPath = "./public/";

let types = {
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

let app = http.createServer((request, response) => {
  let pathName = url.parse(request.url).pathname,
    realPath = path.join(staticPath, pathName); // 请求文件的在磁盘中的真实地址
  if (pathName === '/favicon.ico') return;

  let extName = path.extname(realPath);
  extName = extName ? extName.slice(1) : "";
  const type = types[extName];
  fs.exists(realPath, (exists) => {
    if (!exists) {
      // 当文件不存在时
      response.writeHead(404, {
        "Content-Type": "text/plain"
      });

      response.write("This request URL ' " + realPath + " ' was not found on this server.");
      response.end();
    } else {
      // 当文件存在时
      fs.readFile(realPath, "binary", (err, file) => {
        if (err) {
          // 文件读取出错
          response.writeHead(500, {
            "Content-Type": "text/plain"
          });

          response.end(err);
        } else {
          // 当文件可被读取时，输出文本流
          response.writeHead(200, {
            "Content-Type": "images/jpeg"
          });
          response.write(file, "binary");
          response.end();
        }
      });
    }

  });
});

app.listen(3000);