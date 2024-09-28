import { Ship } from "./ship";


class Gameboard {
    constructor(){
        this.grid = this.reset();
        this.ships = []
    }

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

    }
}

export { Gameboard }