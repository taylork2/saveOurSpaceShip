const dialog = document.querySelector('dialog');
const button = dialog.querySelector('button');
const input = dialog.querySelector('input');

dialog.open = true;


button.addEventListener('click', () => {
    console.log(input.value);
});