import { findAdjacentCells } from "./utility.js";

class Ship {
    constructor(length, cells){
        this.length = length;
        this.hits = 0;
        this.status = true;
        this.cells = cells
    }

    hit(){
        if (this.hits < this.length) ++this.hits
        if (this.hits === this.length) this.status = false
    }

    surrounding(){
        return findAdjacentCells(this.cells)
    }
}

/**
 * board codes = {
 * 0 : 'unknown cell'
 * 1 : 'empty hit cell'
 * 2 : 'ship hit'
 * 
 * }
 * status, reset, place(number, [...numbers])
 * receiveAttack(number)
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
        const ship = new Ship(shipSize, cells);
        
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

/**
 * constructor(turn = boolean)
 * type: todo for npc / player start
 * */ 

class Player {
    constructor(type, turn){
        this.type = type
        this.board = new Gameboard();
        this.turn = turn;
    }

    swap() {
        this.turn = this.turn ? false : true
        console.log(`turn changed to ${this.turn} on ${this.type}`)
    }
}

/**
 * constructor - array of 2 players
 * */ 

class State {
    constructor(players){
        this.players = players
    }

    updateTurns(){
        this.players.forEach(player => player.swap());
    }
}



export { Gameboard , Player, Ship, State}