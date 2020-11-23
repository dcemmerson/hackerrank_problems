// Complete the hackerlandRadioTransmitters function below.
function hackerlandRadioTransmitters(x, k) {
    x.sort(comp);
    const stack = []; // Store house numbers in here.

    for(let i = 0; i < x.length; i++) {
        if(stack.length === 0 || Math.abs(stack[stack.length - 1] - x[i]) > k) {
            // Then we need to find farthest position to right to place radio tower.
            let houseToPlaceTransmitter = i;

            while(x[houseToPlaceTransmitter] - x[i] <= k) {
                houseToPlaceTransmitter++;
            }
            stack.push(x[houseToPlaceTransmitter - 1]);
        }
    }

    return stack.length;
}

function comp(a, b) {
    if(a < b) {
        return -1;
    }
    else if(a === b) {
        return 0;
    }
    else {
        return 1;
    }
}

console.log(hackerlandRadioTransmitters([1, 2, 3, 5, 9], 1));
console.log(hackerlandRadioTransmitters([7, 2, 4, 6, 5, 9, 12, 11], 2));

console.log(hackerlandRadioTransmitters([2, 4, 5, 6, 7, 9, 11, 12], 2));