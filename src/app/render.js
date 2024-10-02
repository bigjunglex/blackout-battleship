import { Ship } from "./gamelogic.js"

class GameRender {
    constructor(board, target){
        this.board = board
        this.target = target
        this.cells = []
    }


    checkCell(cell, target) {
        if (cell instanceof Ship) target.classList.add('ship')
        if (cell === 1) target.classList.add('miss')
        if (cell === 2) target.classList.add('hit')
    }
    
    renderBoard() {
        for (const i in this.board) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            this.checkCell(this.board[i], cell)
            this.target.appendChild(cell)
            this.cells.push(cell)
        }
    }

    updateBoard(){
        this.target.innerHTML = '';
        this.cells = [];
        this.renderBoard();
    }

    getCells() {
        return this.cells
    }
}



export { GameRender }