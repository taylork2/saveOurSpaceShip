import { state } from './state';

const dialog = document.querySelector('dialog');
const button = dialog.querySelector('button');
const input = dialog.querySelector('input');
const changeRoomButton = document.getElementById('change-room');

changeRoomButton.addEventListener('click', () => {
    state.setRoom(null);
    dialog.open = true;
});

const room = state.getRoom();
if (!room) {
    dialog.open = true;
    
    button.addEventListener('click', () => {
        state.setRoom(input.value);
        document.title = `Room: ${input.value}`;
        dialog.open = false;
    });
} else {
    document.title = `Room: ${room}`;
}
