import RuleSet from "./RuleSet";

// eslint-disable-next-line
const r = new RuleSet()

it("makes grid", () => {
    expect(r.makeGrid(2, 2)).toEqual([[0, 0], [0, 0]])
    expect(r.makeGrid(3, 2)).toEqual([[0, 0], [0, 0], [0, 0]])
    expect(r.makeGrid(0, 0)).toEqual([])
})

it('validates entries', () => {
    expect(r.validateEntry(1)).toBe(true)
    expect(r.validateEntry(0)).toBe(true)
    expect(r.validateEntry(null)).toBe(true)

    expect(() => {r.validateEntry('foo')}).toThrow()
    expect(() => {r.validateEntry(-1)}).toThrow()
    expect(() => {r.validateEntry(true)}).toThrow()
})

it('validates grids', () => {
    expect(r.validateGrid([[]])).toBe(true)
    expect(r.validateGrid([[0, 0], [0, 0]])).toBe(true)
    expect(r.validateGrid([[0], [1]])).toBe(true)

    expect(() => {r.validateGrid([])}).toThrow()
    expect(() => {r.validateGrid([[0], [0, 0]])}).toThrow()
    expect(() => {r.validateGrid([[], [0, 0]])}).toThrow()
    expect(() => {r.validateGrid([[0], ['foo']])}).toThrow()
})

let g = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 0]
]

it('counts neighbors', () => {
    expect(r.countNeighbors(1, 1, g)).toBe(2)
    expect(r.countNeighbors(0, 1, g)).toBe(2)
    expect(r.countNeighbors(2, 2, g)).toBe(1)
    expect(r.countNeighbors(2, 0, g)).toBe(2)

    // wrap input validation
    expect(() => {r.countNeighbors(1, 1, g, 'nowrap')}).toThrow()
})

// correctly stepped version of g above
let g_step = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 0, 0]
]

it('steps correctly', () => {
    expect(JSON.stringify(r.step(r.makeGrid(2, 2)))).toEqual(JSON.stringify(r.makeGrid(2, 2)))
    expect(JSON.stringify(r.step(g))).toEqual(JSON.stringify(g_step))
})
