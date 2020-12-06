// Complete the surfaceArea function below.
function surfaceArea(arr) {

    let sa = 0;

    for(let j = 0; j < arr.length; j++) {
        for(let i = 0; i < arr[j].length; i++) {
            if(i === 0) {
                sa += arr[j][i];
            } 

            if(i === arr[j].length - 1) {
                sa += arr[j][i];
            }

            if(j === 0) {
                sa += arr[j][i];
            }

            if(j === arr.length - 1) {
                sa += arr[j][i];  
            }

            if(i > 0) {
                sa += Math.abs(arr[j][i] - arr[j][i - 1]);
            }

            if(j > 0) {
                sa += Math.abs(arr[j][i] - arr[j - 1][i]);
            }

            // Add 2, one for top and one for bottom face.
            sa += 2;
        }
    }

    return sa;
}

console.log(surfaceArea([[1]]));

