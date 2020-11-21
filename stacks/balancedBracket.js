// Complete the isBalanced function below.
// return 'YES' or 'NO'
function isBalanced(s) {
    const stack = [];

    for(let i = 0; i < s.length; i++) {
        if(s[i] === '(' || s[i] === '{' || s[i] === '[') {
            stack.push(s[i]);
        }
        else if(s[i] === ')') {
            const matchedParen = stack.pop();
            if(matchedParen !== '(') {
                return 'NO';
            }
        }
        else if(s[i] === ']') {
            const matchedParen = stack.pop();
            if(matchedParen !== '[') {
                return 'NO';
            }
        }
        else {
            const matchedParen = stack.pop();
            if(matchedParen !== '{') {
                return 'NO';
            }
        }
    }

    return stack.length === 0 ? 'YES' : 'NO';

}

console.log(isBalanced('{[{[[[(())]]]}]}'));
console.log(isBalanced('{[{[[[((())]]]}]}'));
