const http = require('http');
const fs = require('fs');
const url = require('url');
const queryString = require('querystring');

const router = require('./router');

const getState = () => Math.random() > 0 ? 200 : 404;

const server = new http.Server();
server.listen(3000);

server.on('request', function (req, res) {
  const state = getState();
  const type = req.headers.accept ? req.headers.accept.split[0] : 'text/json';  
  res.writeHead(state, {
    'Content-Type': `${type}; charset=UTF-8`
  });

  const pathObj = url.parse(req.url);
  const pathname = pathObj.pathname;
  const params = queryString.parse(pathObj.query) || null;
  const handler = router.route(pathname);
  if (!handler) return;
  handler.process(req, res);
});

