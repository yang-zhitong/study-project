const express = require('./express.js');
const app = express();

// app.get(function (req, res, next) {
//   console.log('haha');
//   next();
// })

// app.get(function (req, res, next) {
//   req.body = 'hello wrold';
// }, function (req, res) {
//   res.writeHead(200, {
//     'Content-Type': 'text/html; charset=UTF-8'
//   });
//   res.end(`<h1>${req.body}</h1>`);
// })

// 处理POST请求
app.get(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=UTF-8'
  });
  res.end('You send POST request')
})

app.listen(3000);
