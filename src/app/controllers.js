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
        console.log('clicked', index , cell)
        if (this.player.turn) {
            this.clickResolve(cell, index)
            this.sendUpdates()
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
        }
        if (cell === 0) this.board[i] = 1
    }
    
    sinkResolve(ship){
        const cells = ship.surrounding()
        cells.forEach(cell => this.board[cell] = 1)
    }

    sendUpdates(){
        this.view.updateBoard()
        this.addListeners()
        this.state.updateTurns()
        this.status = this.player.turn
    }
}



export { BoardController }