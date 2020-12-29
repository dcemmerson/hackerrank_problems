class StringElement {
  constructor(index, character) {
    this.index = index;
    this.character = character;
  }
}

function balancedParenthesis(str) {
  const strArr = str.split('');
  let stack = [];

  for (let i = 0; i < strArr.length; i++) {
    stack.push(new StringElement(i, str[i]));
    if (stack[stack.length - 1].character === ')') {
      const endingParen = stack.pop();
      while(stack.length > 0 && stack[stack.length - 1].character !== '(') {
        stack.pop();
      }
      if(stack.length > 0 && stack[stack.length - 1].character === '(') {
        // Then we found valid parenthesis set and no need to do anything special
        // other than pop the opening paren off the top of the stack.
        stack.pop();
      }
      else {
        // Then the ')' is invalid and we need to delete it
        strArr[endingParen.index] = '';
      }
    }
  }

  // Reset the stack as the remaining char on the stack are not of interest
  // to us.
  stack = [];
  for (let i = strArr.length - 1; i >= 0; i--) {
    stack.push(new StringElement(i, str[i]));
    if (stack[stack.length - 1].character === '(') {
      const openingParen = stack.pop();
      while(stack.length > 0 && stack[stack.length - 1].character !== ')') {
        stack.pop();
      }
      if(stack.length > 0 && stack[stack.length - 1].character === ')') {
        // Then we found valid parenthesis set and no need to do anything special
        // other than pop the closing paren off the top of the stack.
        stack.pop();      }
      else {
        // Then the '(' is invalid and we need to delete it
        strArr[openingParen.index] = '';
      }
    }
  }

  return strArr.reduce((acc, curr) => acc + curr, '');
}

console.log(balancedParenthesis('()()(()'));
console.log(balancedParenthesis('(((()))'));
