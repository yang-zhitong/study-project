'use strict'
console.log('b start')
exports.done = false
let a = require('./a')
a.done = 1;
console.log(`in b, a.done=${a.done}`)
exports.done = true
console.log('b done')