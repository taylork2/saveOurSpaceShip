
const left = document.getElementById('rotate-left');
const right = document.getElementById('rotate-right');
const canvas = document.querySelector('canvas');

import { state } from './state';

export function initializeNavigator(state) {

    state.onBoardRotate(pos => {
        let angle = pos * 90;
        canvas.style.transform = `rotate(${angle}deg)`;
    });
    
    left.addEventListener('click', () => {
        state.rotateBoard('left');
    });
    right.addEventListener('click', () => {
        state.rotateBoard('right');
    });

}
