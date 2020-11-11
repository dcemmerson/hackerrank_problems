
// dp[i] = 0, if i < minCoin denom
// dp[i] = 1, if 1 == minCoin denom
//  dp[i] = sum(max(forEach c[j] where i - c[j] > 0... dp[i - c[j]] + 1))


// (1)

// (1, 1)
// (2)

// (1, 1, 1)
// (1, 2)
// (3)

// (1, 1, 1, 1)
// (1, 1, 2)
// (1, 3)
// (2, 2)

function getWays(n, c) { // n = 4, c = [1, 2, 3]
    const dp = [];

    for(let j = 0; j < c.length + 1; j++) {
        dp.push(new Array(n + 1));
        dp[j][0] = 1;
    }

    for(let i = 1; i < n + 1; i++) {
        dp[0][i] = 0;
    }

    for(let j = 1; j < c.length + 1; j++) {
        for(let i = 1; i < n + 1; i++) {
            if(i - c[j - 1] >= 0) {
                dp[j][i] = dp[j - 1][i] + dp[j][i - c[j - 1]];
            }
            else {
                dp[j][i] = dp[j - 1][i];
            }
        }
    }

    return dp[c.length][n];
}


// console.log(getWays(4, [1, 2, 3]));
console.log(getWays(10, [2, 5, 3, 6]));
// console.log(getWays(23, [5, 37, 8, 39, 33, 17, 22, 32, 13, 7, 10, 35, 40, 2, 43, 49, 46, 19, 41, 1, 12, 11, 28]));


// n = 1
// {}

// n = 2
// {(2)}

// n = 3
// {(3)}

// n = 4
// {(2, 2)}

// n = 5
// {(2, 3), (5)}

// n = 6
// {(2, 2, 2), (3, 3), (6)}

// 