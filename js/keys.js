
const keys = [];
const UP = 38;
const LEFT = 37;
const SPACE = 32;
const RIGHT = 39;

export const Keys = {
    UP: 38,
    LEFT: 37,
    SPACE: 32,
    RIGHT: 39
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

export function isPressed(code) {
    return keys[code];
}