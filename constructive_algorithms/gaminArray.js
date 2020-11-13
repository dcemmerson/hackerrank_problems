// Complete the gamingArray function below.
function gamingArray(arr) {
    let flipCount = 0;
    let max = -1;

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] > max) {
            flipCount++;
            max = arr[i];
        }
    }

    return flipCount % 2 === 0 ? 'ANDY' : 'BOB';
}

console.log(gamingArray([2, 3, 5, 4, 1]));
