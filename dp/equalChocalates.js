// Assumptions:
// 1. array is contains integers between 0 and Number.MAX_SAFE_INTEGER

// Algorithm
// 1. find min of input array
// 2. init minNumSteps = Number.MAX_SAFE_INTEGER
// 3. iterate from 0 to -5, setting currMin = min - i
//      a. Init numSteps = 0
//      b. iterate through array, calculating number of "steps" it takes to 
//      reduce each element to currMin, keeping track of numSteps as the
//      most steps required for any element
//      c. After inner loop, step minNumSteps = Math.min(minNumSteps, numSteps)
function equal(arr) {
    const min = arr.reduce((acc, curr) => Math.min(acc, curr), Number.MAX_SAFE_INTEGER);
    let minSteps = Number.MAX_SAFE_INTEGER;

    for(let j = 0; j > -5; j--) {
        let numSteps = 0;
        const targetChocolates = min + j;

        for(let i = 0; i < arr.length; i++) {
            let numChocolatesDiff = arr[i] - targetChocolates;

            numSteps += Math.floor(numChocolatesDiff / 5);
            numChocolatesDiff %= 5;
            numSteps += Math.floor(numChocolatesDiff / 2);
            numChocolatesDiff %= 2;
            numSteps += Math.floor(numChocolatesDiff / 1);
            numChocolatesDiff %= 1;
        }

        minSteps = Math.min(minSteps, numSteps);
    }

    return minSteps;
}

console.log(equal([1, 1, 5]));
