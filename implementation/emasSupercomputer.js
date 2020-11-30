
function twoPluses(grid) {

    const tees = [];

    for(let j = 0; j < grid.length - 1; j++) {
        for(let i = 0; i < grid[j].length - 1; i++) {
            if(grid[j][i] === 'G') {
                let currMax = getMaxFrom(j, i, grid);
                while(currMax > 0) {
                    tees.push(new Tee(i, j, currMax));
                    currMax -= 4;
                }
            }
        }
    }

    tees.sort(tSort);    // sort descending

    let maxValue = 0;
    for(let j = 0; j < tees.length - 1; j++) {
        const currTLeft = tees[j];
        for(let i = j + 1; i < tees.length; i++) {
            const currTRight = tees[i];
            if(!currTLeft.overlaps(currTRight)) {
                maxValue = Math.max(maxValue, currTLeft.value * currTRight.value);
            }
        }
    }

    return maxValue;
}

function tSort(a, b) {
    if(a.value < b.value) return 1;
    else if(a.value === b.value) return 0;
    else return -1;
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

class Tee {
    constructor(i, j, value) {
        this.value = value;
        this.length = Math.floor(value / 4);
        this.iIndex = i;
        this.jIndex = j;        
    }

    overlaps(otherTee) {
        for(let x = 0; x < this.length + 1; x++) {
            const thisLeft = this.iIndex - x;
            const thisRight = this.iIndex + x;
           if(otherTee.containsPoint(thisLeft, this.jIndex) || otherTee.containsPoint(thisRight, this.jIndex)) {
               return true;
           }
        }
        for(let y = 0; y < this.length + 1; y++) {
            const thisTop = this.jIndex - y;
            const thisBottom = this.jIndex + y;
           if(otherTee.containsPoint(this.iIndex, thisTop) || otherTee.containsPoint(this.iIndex, thisBottom)) {
               return true;
           }
        }
        return false;
    }

    containsPoint(x, y) {
        if(this.iIndex === x) {
            for(let j = 0; j < this.length + 1; j++) {
                const currJTop = this.jIndex - j;
                const currJBottom = this.jIndex + j;
                if(currJTop === y || currJBottom === y) {
                    return true;
                }
            }
        }
        else if(this.jIndex === y) {
            for(let i = 0; i < this.length + 1; i++) {
                const currILeft = this.iIndex - i;
                const currIRight = this.iIndex + i;
                if(currILeft === x || currIRight === x) {
                    return true;
                }
            }
        }
        return false;
    }
}

console.log(twoPluses([
    ['G','G','G','G','G','G','G'], 
    ['B','G','B','B','B','B','G'], 
    ['B','G','B','B','B','B','G'], 
    ['G','G','G','G','G','G','G'], 
    ['G','G','G','G','G','G','G'], 
    ['B','G','B','B','B','B','G'], 
]));

console.log(twoPluses([
    ['G','G','G','G','G','G','G', 'G'], 
    ['G','B','G','B','G','G','B', 'G'], 
    ['G','B','G','B','G','G','B', 'G'], 
    ['G','G','G','G','G','G','G', 'G'], 
    ['G','B','G','B','G','G','B', 'G'], 
    ['G','G','G','G','G','G','G', 'G'], 
    ['G','B','G','B','G','G','B', 'G'], 
    ['G','G','G','G','G','G','G', 'G'], 
]));


console.log(twoPluses([
    ['G','G','G','G','G','G','G','G','G','G','G','G'], 
    ['G','B','G','G','B','B','B','B','B','B','B','G'], 
    ['G','B','G','G','B','B','B','B','B','B','B','G'], 
    ['G','G','G','G','G','G','G','G','G','G','G','G'], 
    ['G','G','G','G','G','G','G','G','G','G','G','G'], 
    ['G','G','G','G','G','G','G','G','G','G','G','G'], 
    ['G','G','G','G','G','G','G','G','G','G','G','G'], 
    ['G','B','G','G','B','B','B','B','B','B','B','G'], 
    ['G','B','G','G','B','B','B','B','B','B','B','G'], 
    ['G','B','G','G','B','B','B','B','B','B','B','G'], 
    ['G','G','G','G','G','G','G','G','G','G','G','G'], 
    ['G','B','G','G','B','B','B','B','B','B','B','G'], 

]));