var co = require('./co');


function sleep(ms) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('wake');
    }, ms)
  });
}

co(function* run() {
  console.log('start');
  yield sleep(500);
  console.log('sleep again');
  yield sleep(1500);
  console.log('end');
}).then(value => {
  console.log(value);
})