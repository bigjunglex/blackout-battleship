import { test, expect } from "@jest/globals"
import { findAdjacentCells, allignCells } from "../src/app/utility";


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


describe('allign cells test', () => {
    const x = (x,y,z) => allignCells(x,y,z)
    test('basic cases', () => {
        expect(x(45,4,'vertical')).toEqual([45, 55, 65, 75])
        expect(x(0,4,'vertical')).toEqual([0, 10, 20, 30])
        expect(x(10, 4,'horizontal')).toEqual([10, 11, 12, 13])
        expect(x(91, 4,'horizontal')).toEqual([91, 92, 93, 94])
        expect(x(25, 4, 'vertical')).toEqual([25, 35, 45, 55])
    })

    test('invalid cases', () => {
        expect(x(98, 4, 'vertical')).toBe(false)
        expect(x(98, 4, 'horizontal')).toBe(false)
        // breaking the rows on horizontal
        expect(x(98, 4, 'horizontal')).toBe(false)
        expect(x(6, 5, 'horizontal')).toBe(false)
    })
})