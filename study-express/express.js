const http = require('http');
const merge = require('./tool/merge.js');
const Layer = require('./layer.js');

const methods = ['get', 'post', 'put'];
const slice = Array.prototype.slice;

module.exports = function () {
  const app = function (req, res) {
    app.handle(req, res);
  }
  merge(app, proto, false);
  app.init();
  return app;
}

const proto = Object.create(null);

proto.listen = function (port) {
  const server = http.createServer(this);
  return server.listen.apply(server, arguments);
}

proto.init = function () {
  this.route = new Route();
}

proto.handle = function (req, res) {
  this.route.dispatch.apply(this.route, slice.call(arguments));
}

methods.forEach(method => {
  proto[method] = function (fn) {
    this.route[method].apply(this.route, slice.call(arguments));
  }
});