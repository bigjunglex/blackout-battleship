import { renderBoard } from "./render.js";
import { Player } from "./player.js";

const x = new Player('real')
const y = new Player('not')

const green = document.getElementById('green')
const red = document.getElementById('red')

renderBoard(x.board.grid, green)
renderBoard(y.board.grid, red)