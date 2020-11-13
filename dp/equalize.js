// Complete the equal function below.
function equal(arr) {
    let equalToVal = arr.reduce((acc, curr) => Math.min(acc, curr), Number.MAX_SAFE_INTEGER);
    let min = Number.MAX_SAFE_INTEGER;

    while(equalToVal >= 0) {
        const currMin = calcEqual(equalToVal, arr);

        min = Math.min(min, currMin);
        equalToVal--;
    }
    return min;
}

function calcEqual(min, arr) {
    let numOps = 0;

    arr.forEach(element => {
        const currDiff = element - min;
        const numFives = Math.floor(currDiff / 5);
        const fivesRemainder = currDiff % 5;

        const numTwos = Math.floor(fivesRemainder / 2);
        const twosRemainder = fivesRemainder % 2;

        numOps += numFives + numTwos + twosRemainder;
    });

    return numOps;

}

console.log(equal([1, 5, 5]));
// 11, 11, 11