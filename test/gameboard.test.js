import { test, expect } from "@jest/globals"
import { Gameboard } from "../src/gameboard"
import { Ship } from "../src/ship";

describe('Gameboard unit test', () => {
    let board;
    let ship;

    beforeEach(() => board = new Gameboard())

    test('creation of empty board', () => {
        expect(Object.keys(board.grid).length).toBe(100)
    })

    test('placing a 1 square ship', () => {
        ship = new Ship(1);
        board.place(ship, [1])

        expect(board.grid['1'].status).toBe(true)
        expect(board.grid['1'].length).toBe(1)
        expect(board.grid['1'].hits).toBe(0)
    })
    
    test('placing a 2 square ship', () => {
        ship = new Ship(2);
        board.place(ship, [1, 11])

        expect(board.grid['1'].status).toBe(true)
        expect(board.grid['1'].length).toBe(2)
        expect(board.grid['1'].hits).toBe(0)
        expect(board.grid['11'].status).toBe(true)
        expect(board.grid['11'].length).toBe(2)
        expect(board.grid['11'].hits).toBe(0)

        
    })



})