// Complete the flippingMatrix function below.

// For each matrix[j][i], find max of matrix[j][i], matrix[2n - j - 1][i],
//                  matrix[j][2n - i - 1], matrix[2n - j - 1][2n - i - 1]
function flippingMatrix(matrix) {
    let sum = 0;
    const n = Math.floor(matrix.length / 2);

    for(let j = 0; j < n; j++) {
        for(let i = 0; i < n; i++) {
            sum += Math.max(matrix[j][i], matrix[2 * n - j - 1][i],
                            matrix[j][2 * n - i - 1], matrix[2 * n - j - 1][2 * n - i - 1]);
        }
    }
    return sum;
}
