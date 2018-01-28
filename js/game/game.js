import { createWorld } from './init';

const {
    Bodies,
    World,
    Render,
    Engine,
    Body,
    Query,
    Bounds,
    Vertices,
    Composite
} = Matter;
export class Game {
    constructor(state) {
        window['game'] = this;
        this.state = state;
        this.callbacks = [];
        this.bodies = [];
        this.world = createWorld();
        console.log('world created');
        window.addEventListener("load", () => {
            this.tick();
        });
    }

    add(body, isPlayer) {
        this.bodies.push(body);
        World.add(this.world, [body]);
    }

    removeAll() {
        this.bodies.forEach(body => {
            Composite.remove(this.world, body);
        });
    }

    setOrientation(orientation) {
        this.orientation = orientation;
    }

    addPlayer(player) {
        this.player = player;
        this.add(player, true);
    }

    tick() {
        this.callbacks.forEach(cb => {
            cb();
        });
        requestAnimationFrame(() => {
            this.tick();
        });
    }

    onTick(cb) {
        this.callbacks.push(cb);
    }
}