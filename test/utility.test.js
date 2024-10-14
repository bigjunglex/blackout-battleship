import { test, expect } from "@jest/globals"
import { findAdjacentCells } from "../src/app/utility";


describe('adjacentcells unit test', () => {
    const x = (cells) => {
        return findAdjacentCells(cells).sort((a,b) => a - b)
    }
    const ship1 = [95, 96, 97, 98, 99]

    test('basic cases', () => {
        expect(x([0])).toEqual([1,10,11])
        expect(x([45])).toEqual([34,35,36,44,46,54,55,56])
        expect(x(ship1)).toEqual([84,85, 86, 87, 88, 89, 94])
    })
})