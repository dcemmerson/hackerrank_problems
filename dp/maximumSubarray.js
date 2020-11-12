
// Complete the maxSubarray function below.
function maxSubarray(arr) {

    const subsequenceArrayIndices = calcMaxSubsequenceArray(arr);
    const dpElement = calcMaxSubarray(arr, 0, arr.length);
    // const maxSubArr = calcMaxSubarrayDp(arr);

    return [dpElement.val, sumArrayUsingIndices(subsequenceArrayIndices, arr)];

}

function sumArrayUsingIndices(indexArr, arr) {
    let sum = 0;

    indexArr.forEach(element => {
            sum+= arr[element];
    });

    return sum;
}

function calcMaxSubsequenceArray(arr) {
    const subsequenceArrayIndices = []
    let maxIndex = 0;

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] > arr[maxIndex]) {
            // Keep track of max index in case arr contains all negative numbers.
            maxIndex = i;
        }
        if(arr[i] > 0) {
            subsequenceArrayIndices.push(i);
        }
    }

    if(subsequenceArrayIndices.length === 0) {
        // then arr contains all negative numbers
        subsequenceArrayIndices.push(maxIndex);
    }

    return subsequenceArrayIndices;
}

class DpElement {
    constructor(i, j, val) {
        this.i = i;
        this.j = j;
        this.val = val;
    }
}

// dp[0][i] = arr[i]
// 
function calcMaxSubarrayDp(arr) {
    let dp = new Array(arr.length + 1);
    dp[0] = 0;
    let maxSum = 0;

    for(let i = 1; i < dp.length; i++) {
        dp[i] = Math.max(dp[i - 1] + arr[i - 1], arr[i - 1]);
        if(dp[i] > maxSum) maxSum = dp[i];
    }

    return maxSum;
}

function calcMaxSubarray(arr, i, j) {
    if(j - i > 1) {
        const mid = Math.floor((i + j) / 2);
        let maxLeft = calcMaxSubarray(arr, i, mid);
        let maxRight = calcMaxSubarray(arr, mid, j);
        
        let maxAcross = 0;
        for(let x = maxLeft.i; x < maxRight.j; x++) {
            maxAcross += arr[x];
        }
        if(maxAcross > maxLeft.val && maxAcross > maxRight.val) {
            return new DpElement(maxLeft.i, maxRight.j, maxAcross);
        }
        else if(maxLeft.val > maxRight.val) {
            return maxLeft;
        }
        else return maxRight;
    }
    
    // if(i < arr.length)
    return new DpElement(i, j, arr[i]);
    // else return new DpElement(i, j, Number.MIN_SAFE_INTEGER);
}

const arr = [1, -2, 4, 5, -6];
console.log(maxSubarray(arr, 0, arr.length));

console.log(calcMaxSubarrayDp([1, -2, 4, 7, -12, 13]));
