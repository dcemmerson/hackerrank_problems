// abs(pos[i] - i) = k
// pos[i] = i + k, or pos[i] = i - k 
// if(pos[i] > k || pos[i] <= 0) return -1
function absolutePermutation(n, k) {
    const perms = [];
    let pos = false;

    for(let i = 0; i < n; i++) {
        if(i % k === 0) pos = !pos;

        if(pos) {
            const nextVal = i + k + 1;
            perms.push(nextVal);
            if(nextVal > n || nextVal <= 0) {
                return -1;
            }
        }
        else {
            const nextVal = i - k + 1;
            perms.push(nextVal);
            if(nextVal > n || nextVal <= 0) {
                return -1;
            }
        }
    }

    return perms;
}

console.log(absolutePermutation(4, 2))
