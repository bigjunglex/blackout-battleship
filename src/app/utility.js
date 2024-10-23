export function findAdjacentCells(shipCells) {
    const adjacentCells = new Set();
    
    shipCells.forEach(cell => {
        const surroundingCells = [
            cell - 10, cell + 10,  
            cell - 1, cell + 1,
            cell - 9, cell + 9,
            cell - 11, cell + 11
        ]

        surroundingCells.forEach(inQuestion => {
            if (isValidCell(inQuestion, cell)) {
                adjacentCells.add(inQuestion);
            }
        })
    });

    shipCells.forEach(cell => adjacentCells.delete(cell));

    return Array.from(adjacentCells);
}

function isValidCell(cell, shipCell) {
    const [cRow, sRow] = [Math.floor(cell / 10), Math.floor(shipCell / 10)]
    const [cCol, sCol] = [cell % 10, shipCell % 10]
    
    const grid = cell >= 0 && cell < 100;
    const row = Math.abs(cRow - sRow) <= 1;
    const column = Math.abs(cCol - sCol) <= 1;

    return grid && row && column;
}


function isInLine(start, cell, dir){
    if (cell > 99) return false
    
    const rows = [Math.floor(start / 10), Math.floor(cell / 10)]
    const cols = [start % 10, cell % 10]

    if (dir === 'vertical') return cols[0] === cols[1]
    if (dir === 'horizontal') return rows[0] === rows[1]

    return true
}

export function allignCells(start, length, dir){
    const step = {
        'vertical': 10,
        'horizontal': 1
    }
    const alligned = []

    for (let [i,k] = [start, 1]; k < length; k++){
        const current = i + step[dir]

        if (!isInLine(start, current, dir)) return false

        i = current
        alligned.push(current)

    }

    return [start, ...alligned]
}

