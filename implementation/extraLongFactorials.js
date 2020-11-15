// Complete the extraLongFactorials function below.
function extraLongFactorials(n) {
    let factorial = 1;
    for(let i = n; i > 0; i--) {
        factorial *= i;
    }

    console.log(factorial);
    return factorial;
}


console.log(extraLongFactorials(25));
