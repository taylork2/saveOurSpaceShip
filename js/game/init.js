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

export function createWorld() {

    const engine = Engine.create();
    const render = Render.create({
        element: document.getElementById('controller'),
        engine,
        options: {
            width: 1000,
            height: 1000,
            wireframes: false
        }
    });
    Engine.run(engine);
    Render.run(render);

    return engine.world;
}