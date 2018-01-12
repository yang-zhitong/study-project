const css = require("./header.css");

const template = require("./header.ejs");

const h1s = [{ h1: "first" }, { h1: "sec" }, { h1: "third" }, { h1: "fourth" }];

module.exports = template({ css, h1s });
