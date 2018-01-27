import { state } from './state';

const dialog = document.querySelector('dialog');
const button = dialog.querySelector('button');
const input = dialog.querySelector('input');
const controller = document.getElementById('controller');
const changeRoomButton = document.getElementById('change-room');

changeRoomButton.addEventListener('click', () => {
    state.setRoom(null);
    dialog.open = true;
});

const room = state.getRoom();
if (!room) {
    dialog.open = true;
} else {
    document.title = `Room: ${room}`;
    controller.style.display = 'flex';
}

button.addEventListener('click', () => {
    state.setRoom(input.value);
    document.title = `Room: ${input.value}`;
    controller.style.display = 'flex';
    dialog.open = false;
});
