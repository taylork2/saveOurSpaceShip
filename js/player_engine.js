(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

import { maps } from './map';

const UP = 38;
const LEFT = 37;
const SPACE = 32;
const RIGHT = 39;

var orientation = 3*Math.PI/2;
    
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 1000,
    height = 1000,
    player = {    
	      height: width/50,
	      x : 5,
	      y : height - 5,
	      width : width/50,
	      speed: 10,
	      velX: 0,
	      velY: 0,
	      jumping: false
    },
    keys = [],
    friction = 0.8,
    gravity = 1;
 
canvas.width = width;
canvas.height = height;

function update(){
  // check keys
    if (keys[SPACE] || keys[UP]) {
        // up arrow or space
        if(!player.jumping){
				    player.jumping = true;
				    player.velY = -player.speed*2*Math.cos(orientation); 
				    player.velX = -player.speed*2*Math.sin(orientation);
				}
    }
    if (keys[RIGHT]) {
        // right arrow
        if (orientation==0 && player.velX < player.speed) {             
            player.velX++;         
        } else if (orientation == Math.PI && player.velX > -player.speed){
        		player.velX--;
        } else if (orientation == Math.PI/2 && player.velY > -player.speed){
        		player.velY--;
        } else if (orientation == 3*Math.PI/2 && player.velY < player.speed) {
        		player.velY++;
        }      
    }     
    if (keys[LEFT]) {         
        // left arrow         
        if (orientation==0 && player.velX > -player.speed) {
            player.velX--;
        } else if (orientation==Math.PI && player.velX < player.speed){
        		 player.velX++;
        } else if (orientation == Math.PI/2 && player.velY > -player.speed){
        		player.velY++;
        } else if (orientation == 3*Math.PI/2 && player.velY < player.speed) {
        		player.velY--;
        }   
    }
 		
    if (orientation%Math.PI == 0) {
    		player.velX *= friction;
    } else {
    		player.velY *= friction;
    }

    player.velX += gravity*Math.sin(orientation);
    player.velY += gravity*Math.cos(orientation);

    player.x += player.velX;
    player.y += player.velY;
 
  	// Check if player is outside bounds of board 
    if (player.x >= width-player.width) {
        player.x = width-player.width;
    } else if (player.x <= 0) {         
        player.x = 0;     
    }    
  	
    if(player.y >= height-player.height){
        player.y = height - player.height;
    } else if (player.y <= 0) {
    		player.y = 0;
    }

    //Stop player from jumping 
    if(orientation==0 && player.y >= height-player.height){
    		console.log("Stop jumping");
    		player.jumping = false;
    } else if (orientation==Math.PI && player.y <= 0){
    	console.log("STOP JUMP");
    		player.jumping = false; 
    } else if (orientation==Math.PI/2 && player.x >= width-player.height){
    		player.jumping = false; 
    } else if (orientation==3*Math.PI/2 && player.x <= 0) {
    		player.jumping = false;
    }
 
    ctx.clearRect(0, 0, width, height);
    drawMap(maps[3], ctx);  
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