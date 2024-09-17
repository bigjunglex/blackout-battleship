import { test, expect } from "@jest/globals"
import { Ship } from "../src/ship"

describe('Ship unit test', () => {
    let ship;

    beforeEach(() => ship = new Ship(4))

    test('ship creaction', () => {
        expect(ship.length).toBe(4)
        expect(ship.hits).toBe(4)
        expect(ship.status).toBe(true)
    })
})