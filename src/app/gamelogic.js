import { findAdjacentCells } from "./utility.js";

class Ship {
    constructor(length, cells, dir = 'vertical'){
        this.length = length;
        this.hits = 0;
        this.status = true;
        this.cells = cells

        this.dir = dir
    }

    hit(){
        if (this.hits < this.length) ++this.hits
        if (this.hits === this.length) this.status = false
    }

    surrounding(){
        return findAdjacentCells(this.cells)
    }

    turn(){
        const save = this.dir
        const dirs = ['horizontal', 'vertical']
        const isVert = this.dir ===  dirs[1]

        isVert ? this.dir = dirs[0] : this.dir = dirs[1]

        console.log(`${save} ----> ${this.dir}`)
    }
}

/**
 * board codes = {
 * 0 : 'unknown cell'
 * 1 : 'empty hit cell'
 * 2 : 'ship hit'
 * 3 : 'blocked for ship placement (near another ship)'
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

    place(shipSize, cells, dir) {
        const ship = new Ship(shipSize, cells, dir);
        
        cells.forEach(cell => {
            this.grid[cell] = ship
        });

        this.setSurrounding(cells)
    }

    remove(cells) {
        [cells, findAdjacentCells(cells)].forEach(arr => this.resetCells(arr))
        this.updateSurroundings()
    }

    resetCells(arr){
        arr.forEach(cell => this.grid[cell] = 0)
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

    shipSunked(){
        this.shipSunk++
    }

    sink(cells){
        cells.forEach(cell => this.grid[cell] = 1)
    }

    setSurrounding(cells){
        const surround = findAdjacentCells(cells)
        surround.forEach(cell => this.grid[cell] = 3)
    }

    getAllShips(){
        const ships = new Set();
        for (let i = 0; i < 100; i++) { 
            const cell = this.grid[i]
            if (cell instanceof Ship) ships.add(cell)
        }
        
        return Array.from(ships)
    }

    updateSurroundings(){
        const shipsRemaining = this.getAllShips()
        shipsRemaining.forEach(ship => this.setSurrounding(ship.cells))
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
    }
}

/**
 * constructor - array of 2 players
 * */ 

class State {
    constructor(players, isSet = false){
        this.players = players
        this.isSet = isSet
    }

    updateTurns(){
        this.players.forEach(player => player.swap());
    }

    startGame() {
        this.isSet = true
    }

}



export { Gameboard , Player, Ship, State}