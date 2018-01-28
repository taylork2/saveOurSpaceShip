import { maps } from './map';
import 'matter-js';

const {
    Bodies,
    Body,
    Query,
    Bounds,
    Vertices
} = Matter;
import { Keys, isPressed } from './keys';
var mapnum = 1;

var orientation = 3 * Math.PI / 2;

export function start(game) {

    const player = Bodies.rectangle(300, 100, 50, 50, {
        render: {
            fillStyle: 'red',
            strokeStyle: 'blue',
            lineWidth: 3
        }
    });
    game.addPlayer(player);

    const ground = Bodies.rectangle(500, 975, 1000, 50, {
        isStatic: true
    });
    game.add(ground);
    const victory = isVictorious(player);

    game.onTick(() => {
        jump(player, ground);
        moveLeft(player);
        moveRight(player);
    });
}

function jump(player, ground) {

    if (isPressed(Keys.SPACE) || isPressed(Keys.UP)) {
        // up arrow or space
        if (!isJumping(player, ground)) {
            Body.setVelocity(player, {
                y: -10,
                x: player.velocity.x
            });
        }
    }
}

function moveLeft(player) {
    if (isPressed(Keys.LEFT)) {
        Body.setVelocity(player, {
            x: -10,
            y: player.velocity.y,
        });
    }
}

function moveRight(player) {
    if (isPressed(Keys.RIGHT)) {
        Body.setVelocity(player, {
            x: 10,
            y: player.velocity.y,
        });
    }
}

function isJumping(player, ground) {
    return Query.region([player], ground.bounds).length === 0;
}

function isVictorious(player) {
    return Query.region([player], Bounds.create(Vertices.create([
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
    ]))).length === 1;
}