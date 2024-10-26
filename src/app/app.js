import { GameRender } from "./render.js";
import { Player, State } from "./gamelogic.js";
import { BoardController } from "./controllers.js";

const x = new Player('real', true)
const y = new Player('not', false)

const green = new GameRender(x.board.grid, document.getElementById('green'))
const red = new GameRender(y.board.grid, document.getElementById('red'))


const ships = [
    [1, [0]],
    [5, [95, 96, 97, 98, 99], 'horizontal'],
    [4, [22, 32, 42, 52]],
    [3, [7, 8, 9], 'horizontal'],
    [2, [48, 49], 'horizontal']
]

ships.forEach(ship => {
    x.board.place(ship[0], ship[1], ship[2])
    y.board.place(ship[0], ship[1], ship[2])
})

green.renderBoard()
red.renderBoard()

const game = new State([x, y])
const controller1 = new BoardController(x, green, game)
const controller2 = new BoardController(y, red, game)


/*d
 * dobavit': 
 * !nachalo igri
 * !bota
 * 
 */
