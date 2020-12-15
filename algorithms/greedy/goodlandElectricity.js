function pylons(k, arr) {
    let pylonCount = 0;
    let lastPylonIndex = -1;
    let nextPylonCandidate = -1;

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === 1) {
            nextPylonCandidate = i;
        }

        if(lastPylonIndex < 0) {
            if(i - lastPylonIndex === k 
                && nextPylonCandidate > 0 && nextPylonCandidate !== lastPylonIndex) {
                    pylonCount++;
                    lastPylonIndex = nextPylonCandidate;
                }
            else if(i - lastPylonIndex >= k) {
                return -1;
            }
        }
        else {
            if(i - lastPylonIndex === 2 * k - 1 && nextPylonCandidate !== lastPylonIndex) {
                pylonCount++;
                lastPylonIndex = nextPylonCandidate;
            }
            else if(i - lastPylonIndex >= 2 * k - 1) {
                return -1;
            }
        }
    }
    if(arr.length - lastPylonIndex >= k + 1) {
        pylonCount++;
    }
    return pylonCount;
}

console.log(pylons(2, [0, 1, 1, 1, 1, 0]));
console.log(pylons(3, [0,1,0,0,0,1,1,1,1,1]));
