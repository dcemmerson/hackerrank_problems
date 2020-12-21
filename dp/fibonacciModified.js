function fibonacciModified(t1, t2, n) {
  const dp = new Array(n);
  dp[0] = BigInt(t1);
  dp[1] = BigInt(t2);

  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1] * dp[i - 1];
  }

  return dp[n - 1].toString();
}

console.log(fibonacciModified(0, 1, 6));
console.log(fibonacciModified(0, 1, 10));
