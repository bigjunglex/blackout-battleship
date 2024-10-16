import { Ship } from "./gamelogic.js";

class BoardController {
    constructor(player, view, state){
        this.player = player;
        this.view = view;
        this.state = state
        this.board = this.player.board.grid
        
        this.addListeners()
    }
    
    addListeners(){
        const cells = this.view.getCells();
        cells.forEach((cell, i) => {
            cell.addEventListener('click', () => this.clickHandler(i));
        });
    }

    clickHandler(index){
        const cell = this.board[index]
        if (this.player.turn && this.isValidClick(index)) {
            const result = this.clickResolve(cell, index)
            this.sendUpdates(result)
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
        if (cell === 0){
            this.board[i] = 1
            return false
        } 
    }
    
    isValidClick(index){
        const cell = this.board[index]
        const [isShip, notHit] = [Ship.prototype.isPrototypeOf(cell), cell === 0]
        
        return isShip || notHit
    }
    
    sinkResolve(ship){
        this.player.board.shipSunked()
        if (!this.player.board.status) this.view.showResult()

        const cells = ship.surrounding()
        cells.forEach(cell => this.board[cell] = 1)
    }

    sendUpdates(wasHit){
        this.view.updateBoard()
        this.addListeners()
        if (!wasHit){
            this.state.updateTurns()
            this.status = this.player.turn
        }
    }
}



export { BoardController }