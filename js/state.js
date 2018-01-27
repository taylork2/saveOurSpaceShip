

const app = firebase.initializeApp({
    apiKey: "AIzaSyA8O6XgtG0uZXmqGNgl-uD0q2OvGOyqZRg",
    authDomain: "save-our-spaceship.firebaseapp.com",
    databaseURL: "https://save-our-spaceship.firebaseio.com",
    projectId: "save-our-spaceship",
    storageBucket: "",
    messagingSenderId: "370741478453"
});
const firestore = firebase.firestore();

class State {
    
    constructor() {
        if (!localStorage.getItem('state')) {
            localStorage.setItem('state', '{}');
        }
        this.state = JSON.parse(localStorage.getItem('state')) || {};
        this.ref = firestore.collection('rooms').doc('test-room');
        this.callbacks = [];
        this.handleChanges();
        this.boardPosition;
    }

    handleChanges() {
        this.ref.onSnapshot(snap => {
            // console.log(snap.data());
        });
    }

    onBoardRotate(callback) {
        this.callbacks.push(callback);
    }

    async rotateBoard(direction) {
        const snapshot = await this.ref.get();
        const currentPosition = snapshot.data().boardPosition;
        const offset = direction === 'left' ? 1 : -1;
        let newPosition = currentPosition + offset;
        if (newPosition === -1) {
            newPosition = 3
        }
        if (newPosition === 4) {
            newPosition = 0;
        }
        await this.ref.update({
            boardPosition: newPosition
        });

        this.callbacks.forEach(callback => {
            callback(newPosition);
        });
    }

    getRoom() {
        console.log('room is', this.state.room);
        return this.state.room;
    }

    setRoom(room) {
        this.state.room = room;
        console.log('room set to', room);
        this.update();
    }

    getRole() {
        console.log('your role is', this.state.role);
        return this.state.role;
    }

    setRole(role){
        this.state.role = role;
        console.log('role set to', role);
        this.update();
    }

    update() {
        localStorage.setItem('state', JSON.stringify(this.state));
    }
}

export const state = new State();
