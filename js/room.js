const dialog = document.querySelector('dialog');
const button = dialog.querySelector('button');
const input = dialog.querySelector('input');
const navigator = document.getElementById('navigator');
const controller = document.getElementById('controller');
const changeRoomButton = document.getElementById('change-room');

export function initializeRoom(state) {

    changeRoomButton.addEventListener('click', () => {
        state.setRoom(null);
        state.setRole(null);
        dialog.open = true;
    });

    const room = state.getRoom();
    if (!room) {
        dialog.open = true;
    } else {
        document.title = `Room: ${room}`;
        const role = state.getRole();
        if (role === 'control') {
            navigator.style.display = 'flex';
            controller.style.display = 'none';
        } else if (role === 'deck') {
            controller.style.display = 'flex';
            navigator.style.display = 'none';
        }
    }

    button.addEventListener('click', () => {
        state.setRoom(input.value);
        var player_role = document.getElementById("roles");
        state.setRole(player_role.value);
        document.title = `Room: ${input.value}`;
        const role = state.getRole();
        if (role === 'control') {
            navigator.style.display = 'flex';
            controller.style.display = 'none';
        } else if (role === 'deck') {
            controller.style.display = 'flex';
            navigator.style.display = 'none';
        }
        dialog.open = false;
    });
}