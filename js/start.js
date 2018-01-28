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

function start(game, map) {
    const {
        player,
        blocks,
        goal
    } = drawMap(map);

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
    game.onTick(() => {
        jump(player, grounds[game.orientation], blocks);
        moveLeft(player);
        moveRight(player);
    });
    const dialog = document.getElementById('victory');
    dialog.querySelector('button').addEventListener('click', () => {
        nextLevel();
        dialog.open = false;
    });

    game.onTick(() => {
        const victory = isVictorious(player, goal);
        if (victory) {
            dialog.open = true;
        }
    })
}

function nextLevel() {
    game.removeAll();
    start(game, maps[++level]);
}

function drawMap(map) {
    const player = Bodies.rectangle(map.start.x, map.start.y, 50, 50, {
        render: {
            fillStyle: 'red'
        }
    });
    game.addPlayer(player);

    const blocks = map.blocks.map(block => {
        return Bodies.rectangle(block.x, block.y, block.width, block.height, {
            isStatic: true
        });
    });

    blocks.forEach((block) => {
        game.add(block);
    });

    const goal = Bodies.rectangle(map.goal.x, map.goal.y, map.goal.width, map.goal.height, {
        isStatic: true,
        render: {
            fillStyle: 'green'
        }
    });
    game.add(goal);

    return {
        player,
        blocks,
        goal
    }
}

function jump(player, ground, blocks) {

    if (isPressed(Keys.SPACE) || isPressed(Keys.UP)) {
        // up arrow or space
        if (!isJumping(player, ground, blocks)) {
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

function isJumping(player, ground, blocks) {
    return Query.region([ground, ...blocks], player.bounds).length === 0;
}

function isVictorious(player, goal) {
    return Query.region([player], goal.bounds).length === 1;
}

let level = 0;
export function begin(game) {
    start(game, maps[level]);
}