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

    const grounds = [
        {
            x: 500,
            y: 975,
            w: 1000,
            h: 50
        },
        {
            x: 975,
            y: 500,
            w: 50,
            h: 1000
        },
        {
            x: 500,
            y: 25,
            w: 1000,
            h: 50
        },
        {
            x: 25,
            y: 500,
            w: 50,
            h: 1000
        },
    ].map(({ x, y, w, h }) => {
        return Bodies.rectangle(x, y, w, h, {
            isStatic: true
        });
    });

    grounds.forEach(ground => {
        game.add(ground);
    });
    const victory = isVictorious(player);

    game.onTick(() => {
        jump(player, grounds[game.orientation]);
        moveLeft(player);
        moveRight(player);
    });
}

function jump(player, ground) {

    if (isPressed(Keys.SPACE) || isPressed(Keys.UP)) {
        // up arrow or space
        if (!isJumping(player, ground)) {
            let velocity;
            if (game.orientation === 0) {
                velocity = {
                    x: player.velocity.x,
                    y: -10,
                };
            } else if (game.orientation === 1) {
                velocity = {
                    x: -10,
                    y: player.velocity.y,
                };
            } else if (game.orientation === 2) {
                velocity = {
                    x: player.velocity.x,
                    y: 10,
                };
            } else if (game.orientation === 3) {
                velocity = {
                    x: 10,
                    y: player.velocity.y,
                };
            }
            Body.setVelocity(player, velocity);
        }
    }
}

function moveLeft(player) {
    if (isPressed(Keys.LEFT)) {
        let velocity;
        if (game.orientation === 0) {
            velocity = {
                x: -10,
                y: player.velocity.y,
            };
        } else if (game.orientation === 1) {
            velocity = {
                x: player.velocity.x,
                y: 10,
            };
        } else if (game.orientation === 2) {
            velocity = {
                x: 10,
                y: player.velocity.y,
            };
        } else if (game.orientation === 3) {
            velocity = {
                x: player.velocity.x,
                y: -10,
            };
        }
        Body.setVelocity(player, velocity);
    }
}

function moveRight(player) {
    if (isPressed(Keys.RIGHT)) {
        let velocity;
        if (game.orientation === 0) {
            velocity = {
                x: 10,
                y: player.velocity.y,
            };
        } else if (game.orientation === 1) {
            velocity = {
                x: player.velocity.x,
                y: -10,
            };
        } else if (game.orientation === 2) {
            velocity = {
                x: -10,
                y: player.velocity.y,
            };
        } else if (game.orientation === 3) {
            velocity = {
                x: player.velocity.x,
                y: 10,
            };
        }
        Body.setVelocity(player, velocity);
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