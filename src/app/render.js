const renderBoard = (board, target) =>  {
    for (const i in board) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        board[i] === 0 ? cell.textContent = '1' : cell.textContent = 'S'
        target.appendChild(cell)
    }
}


export { renderBoard }