(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

import { maps } from './map';

import 'matter-js';

const {
    Bodies,
    World,
    Render,
    Engine,
    Body,
    Query,
    Bounds,
    Vertices
} = Matter;

const engine = Engine.create();
const render = Matter.Render.create({
    element: document.getElementById('controller'),
    engine,
    options: {
        width: 1000,
        height: 1000
    }
});
const player = Bodies.rectangle(300, 100, 50, 50, {
    render: {
        fillStyle: 'red',
        strokeStyle: 'blue',
        lineWidth: 3
    }
});
const ground = Bodies.rectangle(30, 500, 60, 1000, {
    isStatic: true
});

engine.world.gravity = {
    x: -1,
    y: 0
}

World.add(engine.world, [player, ground]);
Engine.run(engine);
Render.run(render);

const keys = [];
const UP = 38;
const LEFT = 37;
const SPACE = 32;
const RIGHT = 39;

var mapnum = 1;

var orientation = 3*Math.PI/2;

function isJumping(player) {
    return Query.region([player], ground.bounds).length === 0;
}

function isVictorious(player) {
    Query.region([player], Bounds.create(Vertices.create([
        {
            x: 60,
            y: 950
        },
        {
            x: 160,
            y: 950
        },
        {
            x: 60,
            y: 1000
        },
        {
            x: 160,
            y: 1000
        }
    ]))).includes(player)
}

function update() {

    const jumping = isJumping(player);

    const victory = isVictorious(player);
  // check keys
    if (keys[SPACE] || keys[UP]) {
        // up arrow or space
        if (!jumping) {
            Body.setVelocity(player, {
                x: 10,
                y: player.velocity.y
            });
        }
    }
    if (keys[RIGHT]) {
        Body.setVelocity(player, {
            x: player.velocity.x,
            y: 10,
        });
    }
    if (keys[LEFT]) {
        Body.setVelocity(player, {
            x: player.velocity.x,
            y: -10,
        });
    }
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

// function drawMap(level, ctx) {
//     ctx.fillStyle = "black";
//     level.blocks.forEach(part => {
//         ctx.fillRect(part.x, part.y, part.width, part.height);
//     });
//     const goal = level.goal;
//     ctx.fillStyle = 'green';
//     ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
// }
 
window.addEventListener("load",function(){
    update();
});