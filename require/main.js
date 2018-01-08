'use strict'
console.log('main start')
let a = require('./a')
let b = require('./b')
console.log(`in main, a.done=${a.done}, b.done=${b.done}`)