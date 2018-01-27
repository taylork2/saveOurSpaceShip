
const left = document.getElementById('rotate-left');
const right = document.getElementById('rotate-right');

import { state } from './state';

export function initializeNavigator(state) {

    state.onBoardRotate(console.log);
    
    left.addEventListener('click', () => {
        state.rotateBoard('left');
    });
    right.addEventListener('click', () => {
        state.rotateBoard('right');
    });

}
