"use strict";
console.log("a starting");
exports.done = false;
let b = require("./b");
let a = require("./a");
console.log(`in a, b.done=${b.done}`);
console.log(`in a, a.done=${a.done}`);
// exports.done = true;
console.log("a done");
