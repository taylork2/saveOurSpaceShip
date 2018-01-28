(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

import { maps } from './map';

const UP = 38;
const LEFT = 37;
const SPACE = 32;
const RIGHT = 39;

var mapnum = 1;

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
          jumping: false,
          grounded: false,
    },
    keys = [],
    friction = 0.8,
      collision = 0.5, //"bounce back" from hitting top side speed
    gravity = 1.2;
 
canvas.width = width;
canvas.height = height;

function update(){
  // check keys
    if (keys[SPACE] || keys[UP]) {
        // up arrow or space
        if(!player.jumping){
                player.grounded = false;
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

    
    //Stop player from jumping 
    if(orientation==0 && player.y >= height-player.height){
            player.jumping = false;
    } else if (orientation==Math.PI && player.y <= 0){
            player.jumping = false; 
    } else if (orientation==Math.PI/2 && player.x >= width-player.height){
            player.jumping = false; 
    } else if (orientation==3*Math.PI/2 && player.x <= 0) {
            player.jumping = false;
    }

    player.grounded = false;
    // Checking collision with boxes 
    for (var i = 0; i < maps[mapnum].blocks.length; i++) {
        ctx.rect(maps[mapnum].blocks[i].x, maps[mapnum].blocks[i].y, maps[mapnum].blocks[i].width, maps[mapnum].blocks[i].height);
                
        var dir = colCheck(player, maps[mapnum].blocks[i]);
                
        dir ? console.log(dir) : dir = dir;

        if (dir === "l" || dir === "r") {
                if (orientation%Math.PI == 0){
                player.velX = 0;
                } else {
                    player.velY = 0;
                }
            // player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
                if (orientation%Math.PI == 0){
                    player.velY *= -collision;
                } else {
                    player.velX *= -collision;
                }
        }
    }

    if(player.grounded){
         orientation%Math.PI/2 ==0 ? player.velY = 0 : player.velX=0;
    }

    player.x += player.velX;
    player.y += player.velY;
 
        // Check if player is outside bounds of board, and put them back in 
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


    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
        drawMap(maps[mapnum], ctx);  
 
    requestAnimationFrame(update);
}


// This function will check if the player is colliding with other stage objects 
function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         
                // figures out on which side we are colliding (top, bottom, left, or right)         
            var oX = hWidths - Math.abs(vX),             
                    oY = hHeights - Math.abs(vY);       
            if (orientation%Math.PI == 0){
                    if (oX >= oY) {
                    if (vY > 0) {
                        orientation==0 ? colDir = "t" : colDir = "b";
                        shapeA.y += oY;
                    } else {
                        orientation==0 ? colDir = "b" : colDir = "t";
                        shapeA.y -= oY;
                    }
                } else {
                    if (vX > 0) {
                        colDir = "l";
                        shapeA.x += oX;
                    } else {
                        colDir = "r";
                        shapeA.x -= oX;
                    }
                }
            } else {
                        if (oX >= oY) {
                    if (vY > 0) {
                        colDir = "l";
                        shapeA.y += oY;
                    } else {
                        colDir = "r";
                        shapeA.y -= oY;
                    }
                } else {
                    if (vX > 0) {
                        orientation==Math.PI/2 ? colDir = "t" : colDir = "b";
                        shapeA.x += oX;
                    } else {
                        orientation==Math.PI/2 ? colDir = "b" : colDir = "t";
                        shapeA.x -= oX;
                    }
                }
            }
    }
    return colDir;
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