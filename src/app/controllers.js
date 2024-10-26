import { Ship } from "./gamelogic.js";
import { allignCells } from "./utility.js";

class BoardController {
    constructor(player, view, state, set = false){
        this.player = player;
        this.view = view;
        this.state = state
        this.board = this.player.board.grid
        this.mode = 'placement'

        this.savedShip = null

        this.addListeners()
        this.setButtons()
    }
    
    addListeners(){
        const cells = this.view.getCells();
        cells.forEach((cell, i) => {
            cell.addEventListener('click', () => this.clickHandler(i));
        });
    }

    // clickHandler(index){
    //     const cell = this.board[index]
    //     if (this.player.turn && this.isValidAttack(index)) {
    //         const result = this.clickResolve(cell, index)
    //         this.sendUpdates(result)
    //     }
    // }
    


    clickHandler(index){
        const cell = this.board[index]
        if (cell instanceof Ship && !this.savedShip){
            this.savedShip = cell
            this.player.board.remove(cell.cells)
            this.sendUpdates()
            console.log(this.savedShip.cells)
        }else if (this.savedShip) {
            const newCells = allignCells(index, this.savedShip.length, this.savedShip.dir)
            const validPlace = this.isValidPlacement(newCells)
            const ship = this.savedShip
            if (newCells && validPlace) {
                this.savedShip.cells = newCells
                this.player.board.place(ship.length, newCells, ship.dir)
                this.savedShip = null
                this.sendUpdates()
            }
            console.log(this.board[index].cells)
        }
    }

    clickResolve(cell, i){
        if (cell instanceof Ship) {
            const ship = cell
            cell.hit()
            this.board[i] = 2
            if (!ship.status){
                this.sinkResolve(ship)
            }
            return true
        }
        if (cell === 0 || cell === 3){
            this.board[i] = 1
            return false
        } 
    }
    
    isValidAttack(index){
        const cell = this.board[index]
        const [isShip, notHit] = [Ship.prototype.isPrototypeOf(cell), (cell === 0 || cell === 3)]
        
        return isShip || notHit
    }
    
    isValidPlacement(cells){
        return cells.every(i => {
            const cell = this.board[i]
            if (Ship.prototype.isPrototypeOf(cell) || cell === 3){
                return false
            }else {
                return true
            }
        })
    }

    sinkResolve(ship){
        this.player.board.shipSunked()
        if (!this.player.board.status) this.view.showResult()

        const cells = ship.surrounding()
        this.player.board.sink(cells)
    }

    sendUpdates(wasHit = false){
        this.view.updateBoard()
        this.addListeners()
        if (!wasHit){
            this.state.updateTurns()
            this.status = this.player.turn
        }
    } 

    changeDir(){
        if (this.savedShip) this.savedShip.turn()
    }

    setButtons(){
        document.getElementById('turn').addEventListener('click', () => {
            this.changeDir()
        })
        document.getElementById('place').addEventListener('click', () => {
            this.changeMode()
        })
    }

    changeMode(){
        if (this.mode = 'placement') this.mode = 'ready'
        console.log(this.mode)
    }
}




export { BoardController }