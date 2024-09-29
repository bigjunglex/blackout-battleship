const renderBoard = (board, target) =>  {
    for (const i in board) {
        const cell = document.createElement('div')
        board[i] === 0 ? cell.textContent = '' : cell.textContent = 'S'
        target.appendChild(cell)
    }
}


export { renderBoard }