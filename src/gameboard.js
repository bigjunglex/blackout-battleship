class Gameboard {
    constructor(){
        this.grid = this.reset()
    }

    reset(){
        const board = {};
        for (let i = 0; i < 100; i++){
            board[i] = 0;
        }
        
        return board
    }
}

export { Gameboard }