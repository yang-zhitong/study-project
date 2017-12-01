const canvas = document.getElementById("ctx");
const gap = 40;
canvas.height = Math.floor(window.innerHeight / gap) * gap + 1;
canvas.width = Math.floor(window.innerWidth / gap) * gap + 1;
const ctx = canvas.getContext("2d");

const hero = document.querySelector(".s");
const monster = document.querySelector(".circle");
hero.spead = 40;
let caught = 0;
let then = Date.now();

const keysDown = {};
document.addEventListener(
  "keydown",
  function(e) {
    test1 = Date.now();
    keysDown[e.keyCode] = true;
  },
  false
);
document.addEventListener(
  "keyup",
  function(e) {
    delete keysDown[e.keyCode];
  },
  false
);

const reset = function() {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;

  monster.x = Math.random() * (canvas.width - 40);
  monster.y = Math.random() * (canvas.height - 40);
};

const update = function(m) {
  if (38 in keysDown) { // up
    hero.y -= hero.spead * m;
  }
  if (37 in keysDown) { //left    
    hero.x -= hero.spead * m;    
  }
  if (39 in keysDown) { //right
    hero.x += hero.spead * m;        
  }
  if (40 in keysDown) { //down
    hero.y += hero.spead * m;        
  }
  // console.log(hero.x, hero.y);
};
const move = function () {
  if (hero.x !== parseFloat(hero.style.left)) {
    hero.style.left = hero.x + "px";
    hero.style.top = hero.y + "px";
  }
};
const render = function() {
  let i;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000";
  for (i = 0.5; i <= canvas.height; i += gap) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
  for (i = 0.5; i <= canvas.width; i += gap) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  ctx.restore();
  hero.style.left = hero.x + "px";
  hero.style.top = hero.y + "px";
  monster.style.left = monster.x + "px";
  monster.style.top = monster.y + "px";
};

const main = function () {
  const now = Date.now();
  const delta = now - then;
  update(delta/1000);
  move();
  then = now;
  requestAnimationFrame(main);
};

const init = function() {
  reset();
  render();
  main();
};
init();
