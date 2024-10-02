import { GameRender } from "./render.js";
import { Player } from "./gamelogic.js";

const x = new Player('real')
const y = new Player('not')

const green = new GameRender(x.board.grid, document.getElementById('green'))
const red = new GameRender(y.board.grid, document.getElementById('red'))


const ships = [
    [1, [0]],
    [5, [95, 96, 97, 98, 99]],
    [4, [22, 32, 42, 52]],
    [3, [7, 8, 9]],
    [2, [48, 49]]
]

ships.forEach(ship => {
    x.board.place(ship[0], ship[1])
})


green.renderBoard()
red.renderBoard()