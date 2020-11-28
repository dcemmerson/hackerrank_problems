// Complete the biggerIsGreater function below.
function biggerIsGreater(w) {
    const wArr = w.split('');

    const leftIndex = findLargestIndexNonIncreasing(wArr);

    if(leftIndex === 0) {
        return 'no answer';
    }
    else {
        // const indexToSwap = findSubseqElementLargerThanPivot(w, leftIndex, rightIndex, leftIndex - 1);
        const swapIndex = findSmallestGreaterThanAfterPivot(wArr, leftIndex);

        const temp = wArr[swapIndex];
        wArr[swapIndex] = wArr[leftIndex - 1];
        wArr[leftIndex - 1] = temp;

        const arrLeft = wArr.slice(0, leftIndex);
        const arrRight = wArr.slice(leftIndex, wArr.length).sort(strComp);
        // const arrRight = wArr.slice(rightIndex, wArr.length);
    
        return [...arrLeft, ...arrRight].reduce((curr, acc) => curr + acc, '');
    }

}

function strComp(a, b) {
    if(a < b) {
        return -1;
    }
    else if (a === b) {
        return 0;
    }
    else {
        return 1;
    }
}

function findLargestIndexNonIncreasing(w) {
    let index = w.length - 1;

    while(index > 0 && w[index - 1] >= w[index]) {
        index--;
    }

    return index;
}

function findSmallestGreaterThanAfterPivot(w, leftIndex){
// function largestIndexAfterPivot(w, leftIndex) {
    const pivot = leftIndex - 1;
    console.assert(pivot >= 0);

    let i = w.length - 1;
    while(w[i] <= w[pivot]) {
        i--;
    }
    return i;
}


// console.log(biggerIsGreater('abdadc'));
// console.log(biggerIsGreater('hefg'));
console.log(biggerIsGreater('dkhc'));

