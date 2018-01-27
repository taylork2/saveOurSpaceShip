(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

import { maps } from './map';

const UP = 38;
const LEFT = 37;
const SPACE = 32;
const RIGHT = 39;

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 1000,
    height = 1000,
    player = {    
      height: 50,
      x : width/2,
      y : height - 5,
      width : 50,
      speed: 10,
      velX: 0,
      velY: 0,
      jumping: false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.7;
 
canvas.width = width;
canvas.height = height;
 
function update(){
  // check keys
    if (keys[SPACE] || keys[UP]) {
        // up arrow or space
      if(!player.jumping){
       player.jumping = true;
       player.velY = -player.speed*2;
      }
    }
    if (keys[RIGHT]) {
        // right arrow
        if (player.velX < player.speed) {             
            player.velX++;         
         }     
    }     
    if (keys[LEFT]) {         
        // left arrow         
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
 
    player.velX *= friction;
 
    player.velY += gravity;
 
    player.x += player.velX;
    player.y += player.velY;
 
    if (player.x >= width-player.width) {
        player.x = width-player.width;
    } else if (player.x <= 0) {         
        player.x = 0;     
    }    
  
    if(player.y >= height-player.height){
        player.y = height - player.height;
        player.jumping = false;
    }
 
    ctx.clearRect(0, 0, width, height);
    drawMap(maps[0], ctx);  
    ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);
 
  requestAnimationFrame(update);
}
 
document.body.addEventListener("keydown", function (e) {
    if (
        e.keyCode === UP ||
        e.keyCode === SPACE ||
        e.keyCode === LEFT ||
        e.keyCode === RIGHT
    ) {
        e.preventDefault();
    }
    keys[e.keyCode] = true;
});
 
document.body.addEventListener("keyup", function (e) {
    if (
        e.keyCode === UP ||
        e.keyCode === SPACE ||
        e.keyCode === LEFT ||
        e.keyCode === RIGHT
    ) {
        e.preventDefault();
    }
    keys[e.keyCode] = false;
});

function drawMap(level, ctx) {
    ctx.fillStyle = "black";
    level.blocks.forEach(part => {
        ctx.fillRect(part.x, part.y, part.width, part.height);
    });
    const goal = level.goal;
    ctx.fillStyle = 'green';
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
}
 
window.addEventListener("load",function(){
    update();
});