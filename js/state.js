
class State {
    
    constructor() {
        if (!localStorage.getItem('state')) {
            localStorage.setItem('state', '{}');
        }
        this.state = JSON.parse(localStorage.getItem('state')) || {};
        
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

    update() {
        localStorage.setItem('state', JSON.stringify(this.state));
    }
}

export const state = new State();