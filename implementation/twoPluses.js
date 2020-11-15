function twoPluses(grid) {
    let max = 0;
    let maxCount = 0;

    for(let j = 0; j < grid.length - 1; j++) {
        for(let i = 0; i < grid[j].length - 1; i++) {
            if(grid[j][i] === 'G') { 
                const currMax = getMaxFrom(j, i, grid);
                if(currMax > max) {
                    max = currMax;
                    maxCount = 1;
                }
                else if(currMax !== 0 && currMax === max) {
                    maxCount++;
                }
            }
        }
    }

    if(maxCount > 1) {
        return max * max;
    }
    else if(max > 4) {
        return max * (max - 4);
    }
    else {
        return 0;
    }

}

function getMaxFrom(j, i, grid) { // : int
    let len = 0; // length of an arm of the T

    while(i - (len + 1) >= 0 && i + len + 1 < grid[j].length && j - (len + 1) >= 0 && j + len + 1 < grid.length
        && grid[j + len + 1][i] === 'G' && grid[j - (len + 1)][i] === 'G'
        && grid[j][i + len + 1] === 'G' && grid[j][i - (len + 1)] === 'G'
        ) {
            len++;
    }

    return 4 * len + 1;
}

console.log(twoPluses([['G','G','G','G','G','G','G'], 
                        ['B','G','B','B','B','B','G'],
                        ['B','G','B','B','B','B','G'],
                        ['G','G','G','G','G','G','G'],
                        ['G','G','G','G','G','G','G'],
                        ['B','G','B','B','B','B','G']]))
