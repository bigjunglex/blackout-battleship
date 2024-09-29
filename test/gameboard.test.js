import { test, expect } from "@jest/globals"
import { Gameboard } from "../src/app/gameboard"

describe('Gameboard unit test', () => {
    let board;
    let ship;

    beforeEach(() => board = new Gameboard())

    test('creation of empty board', () => {
        expect(Object.keys(board.grid).length).toBe(100)
    })

    test('placing a 1 square ship', () => {
        board.place(1, [1])

        expect(board.grid['1'].status).toBe(true)
        expect(board.grid['1'].length).toBe(1)
        expect(board.grid['1'].hits).toBe(0)
    })
    
    test('placing a 2 square ship', () => {
        board.place(2, [1, 11])

        expect(board.grid['1'].status).toBe(true)
        expect(board.grid['1'].length).toBe(2)
        expect(board.grid['1'].hits).toBe(0)
        expect(board.grid['11'].status).toBe(true)
        expect(board.grid['11'].length).toBe(2)
        expect(board.grid['11'].hits).toBe(0)
    })

    test('placing 5 ships together', () => {
        board.place(1, [1])
        board.place(2, [49, 50])
        board.place(3, [7, 8, 9])
        board.place(4, [22, 32, 42, 52])
        board.place(5, [95, 96, 97, 98, 99])

        expect(board.grid['1'].length).toBe(1)
        expect(board.grid['49'].length).toBe(2)
        expect(board.grid['50'].length).toBe(2)
        expect(board.grid['7'].length).toBe(3)
        expect(board.grid['8'].length).toBe(3)
        expect(board.grid['9'].length).toBe(3)
        expect(board.grid['22'].length).toBe(4)
        expect(board.grid['99'].length).toBe(5)
    })

    test('placing and hiting ship and adjastent squares ', () => {
        board.place(1, [1])
        board.place(3, [7, 8, 9])
        board.receiveAttack(1)
        board.receiveAttack(8)

        expect(board.grid['1']).toBe(2)
        expect(board.grid['8']).toBe(2)
        expect(board.grid['7'].hits).toBe(1)
        expect(board.status).toBe(true)
    })

})