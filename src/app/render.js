import { Ship } from "./gamelogic.js"

class GameRender {
    constructor(board, target){
        this.resultModal = document.getElementById('reset_modal')
        this.board = board
        this.target = target
        this.cells = []
        
    }

    checkCell(cell, target, isVisible = true) {
        if (cell instanceof Ship && isVisible) target.classList.add('ship')
        if (cell === 1) target.classList.add('miss')
        if (cell === 2) target.classList.add('hit')

    }
    
    renderBoard(isVisible = true) {
        for (const i in this.board) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            this.checkCell(this.board[i], cell, isVisible)
            this.target.appendChild(cell)
            this.cells.push(cell)
        }
    }

    updateBoard(isVisible = true){
        this.target.innerHTML = '';
        this.cells = [];
        this.renderBoard(isVisible);
    }

    getCells() {
        return this.cells
    }

    showResult() {
        this.resultModal.classList.remove('hide')
    }

}



export { GameRender }