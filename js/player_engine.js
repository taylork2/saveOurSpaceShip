(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

const UP = 38;
const LEFT = 37;
const SPACE = 32;
const RIGHT = 39;

console.log('hi');
 
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = window.innerHeight - 100,
    height = window.innerWidth - 100,
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
 
  ctx.clearRect(0,0,width,height);
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
 
window.addEventListener("load",function(){
    update();
});