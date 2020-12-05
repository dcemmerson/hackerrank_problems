// 1. init empty stack
//
// Complete the almostSorted function below.
function almostSorted(arr) {
    if(arr.length === 0 || arr.length === 1) {
        console.log('yes');
        return;
    }

    const dips = [];
    const bumps = [];

    if(arr[0] > arr[1]) {
        bumps.push(new Element(0, arr[0]));
    }

    for(let i = 1; i < arr.length - 1; i++) {
        if(arr[i - 1] < arr[i] && arr[i + 1] < arr[i]) {
            bumps.push(new Element(i, arr[i]));
        }
        else if(arr[i - 1] > arr[i] && arr[i + 1] > arr[i]) {
            dips.push(new Element(i, arr[i]));
        }
    }

    if(arr[arr.length - 1] < arr[arr.length - 2]) {
        dips.push(new Element(arr.length - 1, arr[arr.length - 1]));
    }

    if(dips.length === 0 && bumps.length === 0) {
        console.log('yes');
    }
    else if(dips.length === 2 && bumps.length === 2) {
        console.log('yes');
        console.log(`swap ${bumps[0].index + 1} ${dips[1].index + 1}`);
    }
    else if(dips.length === 1 && bumps.length === 1) {
        if(dips[0].index - bumps[0].index === 1) {
            if((bumps[0].index === 0 || dips[0].value > arr[bumps[0].index - 1])
                && (dips[0].index === arr.length - 1 || bumps[0].value < arr[dips[0].index + 1])) {
                console.log('yes');
                console.log(`swap ${bumps[0].index + 1} ${dips[0].index + 1}`);
            }
            else {
                console.log('no');
            }
        }
        else {
            console.log('yes');
            console.log(`reverse ${bumps[0].index + 1} ${dips[0].index + 1}`);
        }
    }
    else {
        console.log('no');
    }
    
}

class Element {
    constructor(i, val) {
        this.value = val;
        this.index = i;
    }
}

almostSorted([5, 2, 3, 4, 1]);

// almostSorted([43, 65, 1, 98, 99, 101]);
// almostSorted([3, 1, 2]);
// almostSorted([4, 2]);

// almostSorted([2, 3, 5, 4]);
// almostSorted([5, 3, 4, 2]);
// almostSorted([2, 4, 6]);
// almostSorted([3, 5, 2]);
// almostSorted([4104, 8529, 49984, 54956, 63034, 82534, 84473, 86411, 92941, 95929, 108831, 894947, 125082, 137123, 137276, 142534, 149840, 154703, 851728, 857147 ,860454, 861956, 864994, 868755, 116375, 911042, 912634, 914500, 920825, 979477]);