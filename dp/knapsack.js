// j is associated with weight
// i is associated with knapsack capacity
// dp[j][0] = 0
// dp[0][i] = 0
// dp[j][i] = max(dp[j][i - 1], w_x + dp[j - w_x][i]), if w_x <= j
// dp[j][i] = dp[j][i - 1], if w_x > j
function unboundedKnapsack(k, arr) {
    arr = squashWeightArr(arr);

    const dp = new Array(k + 1);

    for(let j = 0; j < k + 1; j++) {
        dp[j] = new Array(arr.length + 1).fill(0);
    }

    for(let j = 1; j < k + 1; j++) {
        for(let i = 1; i < arr.length + 1; i++) {
            if(j - arr[i - 1] >= 0) {
                dp[j][i] = Math.max(dp[j][i - 1], arr[i - 1] + dp[j - arr[i - 1]][i]);
            }
            else {
                dp[j][i] = dp[j][i - 1];
            }
        }
    }

    return dp[dp.length - 1][dp[0].length - 1];

}

function squashWeightArr(arr) {
    const set = new Set(arr);
    return Array.from(set);
}

console.log(unboundedKnapsack(12, [1, 6, 9]));
console.log(unboundedKnapsack(9, [3, 4, 4, 4, 8]));
