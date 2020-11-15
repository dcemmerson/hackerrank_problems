// 1. sum up each ball type, call ballSums
// 2. for each row - need to sum currSwapSum = ballSums[i] - row[i] - sum of other types of balls this row has
// 3. place currSwap sum in tallies array
// 4. iterate through tally array, summing values
// 5. if sum of tally arr === 0, possible, else impossible
function organizingContainers(container) {
    const rowSums = new Array(container.length).fill(0);
    const columnSums = new Array(container.length).fill(0);

    for(let j = 0; j < container.length; j++) {
        const row = container[j];
        
        for(let i = 0; i < row.length; i++) {
            columnSums[i] += row[i];
            rowSums[j] += row[i];
        }
    }

    columnSums.sort();
    rowSums.sort();

    let possible = true;
    
    for(let i = 0; i < columnSums.length; i++) {
        possible = possible && (columnSums[i] === rowSums[i]);
    }

    return possible ? 'Possible' : 'Impossible';
}

console.log(organizingContainers([[0, 2, 1], [1, 1, 1], [2, 0, 0]]));
console.log(organizingContainers([[1, 3, 1], [2, 1, 2], [3, 3, 3]]));
