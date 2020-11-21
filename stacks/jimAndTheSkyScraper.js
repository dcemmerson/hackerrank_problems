// Complete the solve function below.
function solve(arr) {
    const stack = [];
    let flightCount = 0;

    for(let i = 0; i < arr.length; i++) {
        arr[i] = new Building(i, arr[i]);
    }

    stack.push(arr[0]);
    for(let i = 1; i < arr.length; i++) {
        if(arr[i].height < arr[i - 1].height) {
            stack.push(arr[i]);
        }
        else {
            const curr = arr[i];

            while(stack.length > 0 && curr.height > stack[stack.length - 1].height) {
                stack.pop();
            }

            if(stack.length > 0 && stack[stack.length - 1].height === curr.height) {
                const popped = stack[stack.length - 1];
                curr.reachableBuildingCount = popped.reachableBuildingCount + 1;
                flightCount += 2 * curr.reachableBuildingCount;
            }

            stack.push(curr);
        }
    }

    return flightCount;
}

class Building {
    constructor(index, height) {
        this.height = height;
        this.index = index;
        this.reachableBuildingCount = 0;
    }
}

console.log(solve([3, 2, 1, 2, 3, 3]));
