
// '981189'

// Complete the highestValuePalindrome function below.
function highestValuePalindrome(s, n, k) {
    const memo = new Map();
    [s, k] = convertToPalindrome(s, k, memo);

    let startIndex = 0;
    const endIndex = Math.floor(s.length / 2);
    while(k > 0 && startIndex < endIndex) {
        if(s[startIndex] < '9' && (k > 1 || memo.get(startIndex) || memo.get(s.length - startIndex - 1))) {
            const sLeft = s.substring(0, startIndex).concat('9');
            const sMiddle = s.substring(startIndex + 1, s.length - startIndex - 1).concat('9');
            const sRight = s.substring(s.length - startIndex, s.length);

            s = sLeft + sMiddle + sRight;
            
            // if either s[startIndex] or s[s.length - startIndex - 1] has already been
            // changed when converting s to a palindrome, no need to decrement k again.
            if(!memo.get(startIndex)) {
                k--;
            }
            if(!memo.get(s.length - startIndex - 1)) {
                k--;
            }
        }
        startIndex++;
    }

    // One more case to consider, if s.length % 2 === 1, and if k > 0, then we
    // case possibly change s[s.length / 2] to a '9'
    // '99299'
    if(s.length % 2 === 1 && k > 0) {
        const sLeft = s.substring(0, endIndex).concat('9'); // '999'
        const sRight = s.substring(endIndex + 1, s.length); // '99'
        s = sLeft + sRight;
    }

    if(k >= 0) {
        return parseInt(s);
    }
    else {
        return -1;
    }
}

// 1. create empty stack
// 2. iterate through s from 0 to s.length
//      a. if i < s.length / 2 (integer division), then push s[i] onto stack
//      b. else pop top of stack and if s[i] and top of stack are not equal,
//          then choose higher value and alter s. Decrement k. Update memo.
// 3. return s made into palindrome and updated k value
function convertToPalindrome(s, k, memo) {
    const stack = [];

    const midPoint = Math.floor(s.length / 2);

    for(let i = 0; i < s.length; i++) {
        if(i < midPoint) {
            stack.push(new StringElement(i, s[i]));
        }
        else if(s.length % 2 === 0 || i > midPoint) {
            const leftElement = stack.pop();
            const updateToValue = Math.max(leftElement.value, s[i]);

            if(parseInt(leftElement.value) !== parseInt(updateToValue)) {
                memo.set(leftElement.index, true);
                const sLeft = s.substring(0, leftElement.index).concat(updateToValue);
                const sRight = s.substring(leftElement.index + 1, s.length);
                s = sLeft + sRight;
                k--;
            }

            if(parseInt(s[i]) !== parseInt(updateToValue)) {
                memo.set(i, true);
                const sLeft = s.substring(0, i).concat(updateToValue);
                const sRight = s.substring(i + 1, s.length);
                s = sLeft + sRight;
                k--;
            }
        }
    }

    return [s, k];
}

class StringElement {
    constructor(index, value) {
        this.index = index;
        this.value = value;
    }
}

// console.log(convertToPalindrome('34621', 10, new Map()));

console.log(highestValuePalindrome('12321', 5, 1));
