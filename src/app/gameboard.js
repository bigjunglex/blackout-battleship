import { Ship } from "./ship.js";

// board codes {0: empty , 1: empty hit 💧, 2: ship hit ⚓} 

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

export { Gameboard }