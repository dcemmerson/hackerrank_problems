// Complete the cost function below.
function cost(b) {
    const dp = new Array(b.length);
    dp[0] = [0, 0];

    for(let i = 1; i < b.length; i++) {
        dp[i] = [0, 0];
        // dp.push(new Array(2));
        dp[i][1] = Math.max(dp[i - 1][1] + Math.abs(b[i] - b[i - 1]), dp[i - 1][0] + Math.abs(b[i] - 1));
        dp[i][0] = Math.max(dp[i - 1][1] + Math.abs(b[i - 1] - 1), dp[i - 1][0] + Math.abs(1 - 1));
    }

    return Math.max(dp[dp.length - 1][0], dp[dp.length - 1][1]);
}

// console.log(cost([1, 2, 3]));
// console.log(cost([52, 60, 50, 90, 84, 35, 56, 64, 52, 20, 43, 19, 12, 73, 48, 93, 43, 78, 22, 53, 60, 100, 26, 54, 84]));