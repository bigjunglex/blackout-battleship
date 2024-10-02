import { Ship } from "./gamelogic.js"

class GameRender {
    constructor(board, target){
        this.board = board
        this.target = target
    }


    checkCell(cell, target) {
        if (cell instanceof Ship) target.classList.add('ship')
        if (cell === 1) target.classList.add('miss')
    }
    
    renderBoard() {
        for (const i in this.board) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            this.checkCell(this.board[i], cell)
            this.target.appendChild(cell)
        }
    }
}



export { GameRender }