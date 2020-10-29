
class RuleSet {
    makeGrid(x, y){
        const grid = []
        for (let i=0; i < x; i++){
            grid.push([])
            for (let j=0; j<y; j++){
                grid[i].push(0)
            }
        }
        return grid
    }

    validateEntry = (entry=1) => {
        if (![0, 1, null].includes(entry)){
            throw new Error(`invalid grid entry ${entry} of type ${typeof entry}`)
        }
        return true
    }

    validateGrid = (grid) => {

        const rowLen = grid[0].length
        for (let i = 0; i < grid.length; i++){
            let row = grid[i]

            if (!(row.length===rowLen)){
                throw new Error(`rows of differing lengths  ${grid}`)
            }

            for (let e = 0; e < row.length; e++){
                let entry = row[e]
                this.validateEntry(entry)
            }
        }
        return true
    }

    countNeighbors(x, y, grid, wrap=true){

        let checkIndex = (value, max) => {throw new Error(`Unknown rule: ${wrap}`)}

        if (['wrap', true].includes(wrap)){
            checkIndex = (value, max) => ((value + max + 1) % (max + 1))
        }

        const maxX = grid.length - 1
        const maxY = grid[0].length - 1

        return [
            grid[checkIndex(x + 1, maxX)][checkIndex(y, maxY)],
            grid[checkIndex(x - 1, maxX)][checkIndex(y, maxY)],
            grid[checkIndex(x, maxX)][checkIndex(y + 1, maxY)],
            grid[checkIndex(x, maxX)][checkIndex(y - 1, maxY)],

            // diagonals
            grid[checkIndex(x + 1, maxX)][checkIndex(y + 1, maxY)],
            grid[checkIndex(x + 1, maxX)][checkIndex(y - 1, maxY)],
            grid[checkIndex(x - 1, maxX)][checkIndex(y + 1, maxY)],
            grid[checkIndex(x - 1, maxX)][checkIndex(y - 1, maxY)],
        ].reduce((a, b) => a + b, 0)
    }

    step(grid) {
        this.validateGrid(grid)
        const lenX = grid.length
        const lenY = grid[0].length
        const newGrid = this.makeGrid(lenX, lenY)

        for (let x = 0; x < lenX; x++){
            for (let y = 0; y < lenY; y++){
                // eslint-disable-next-line default-case
                switch(this.countNeighbors(x, y, grid)){
                    case 3:
                        newGrid[x][y] = 1
                        break
                    case 2:
                        newGrid[x][y] = grid[x][y]
                        break
                }
            }
        }
        return newGrid
    }

}

export default RuleSet