
const left = document.getElementById('rotate-left');
const right = document.getElementById('rotate-right');

import { state } from './state';

export function initializeNavigator(state, game) {

    state.onBoardRotate(pos => {
        const canvas = document.querySelector('canvas');
        let angle = pos * 90;
        canvas.style.transform = `rotate(${angle}deg)`;
        while (pos > 3 || pos < 0) {
            pos -= 4;
        }
        if (pos === 0) {
            game.world.gravity = {
                x: 0,
                y: 1
            }
        } else if (pos === 1) {
            game.world.gravity = {
                x: 1,
                y: 0
            }
        } else if (pos === 2) {
            game.world.gravity = {
                x: 0,
                y: -1
            }
        } else if (pos === 3) {
            game.world.gravity = {
                x: -1,
                y: 0
            }
        }
    });
    
    left.addEventListener('click', () => {
        state.rotateBoard('left');
    });
    right.addEventListener('click', () => {
        state.rotateBoard('right');
    });

}
