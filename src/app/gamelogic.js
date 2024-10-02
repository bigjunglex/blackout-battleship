class Ship {
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.status = true
    }

    hit(){
        if (this.hits < this.length) ++this.hits
        if (this.hits === this.length) this.status = false
    }
}

/**
 * board codes = {
 * 1 : 'empty hit cell'
 * 0 : 'unknown cell'
 * 2 : 'ship not hit'
 * 3 : 'ship hit'
 * }
 */

class Gameboard {
    constructor(){
        this.grid = this.reset();
        this.shipSunk = 0;
    }
    
    get status() {
        return this.shipSunk < 5 
    }
    
    // TODO: mb dobavit' save layota dlya korablei v reset 👺 ⚓
    reset(){
        const board = {};
        for (let i = 0; i < 100; i++){
            board[i] = 0;
        }
        return board
    }

    place(shipSize, cells) {
        const ship = new Ship(shipSize);
        
        cells.forEach(cell => {
            this.grid[cell] = ship
        });
    }

    receiveAttack(target) {
        const cell = this.grid[target]
        if (cell instanceof Ship) {
            cell.hit()
            this.grid[target] = 2
        } else {
            this.grid[target] = 1
        }
    }
}


class Player {
    constructor(type){
        this.type = type
        this.board = new Gameboard();
        this.turn = true;
    }

    swap() {
        this.turn = this.turn ? false : true
        console.log(`turn changed to ${this.turn}`)
    }
}




export { Gameboard , Player, Ship}