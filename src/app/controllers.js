import { Ship } from "./gamelogic.js";

class BoardController {
    constructor(player, view){
        this.player = player;
        this.view = view;
        this.board = this.player.board.grid
        this.status = this.player.turn
        
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
        if (this.status) {
            this.clickResolve(cell, index)
            this.sendUpdates()
        }
    }
    
    sendUpdates(){
        this.view.updateBoard()
        this.addListeners()
        this.player.swap()
        this.status = this.player.turn
    }

    clickResolve(cell, i){
        if (cell instanceof Ship) {
            cell.hit()
            this.board[i] = 2
        }
        if (cell === 0) this.board = 1
        if (cell > 0) null
    }
}


export { BoardController }