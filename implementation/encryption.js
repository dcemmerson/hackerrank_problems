function encryption(s) {
    const minN = Math.floor(Math.sqrt(s.length));
    const maxN = Math.ceil(Math.sqrt(s.length));

    let numRows;
    let numCols;
    if(minN * maxN >= s.length) {
        numRows = minN;
        numCols = maxN;
    }
    else {
        numRows = maxN;
        numCols = maxN;  
    }
    
    const encryptedArr = new Array(numRows);
    for(let i = 0; i < encryptedArr.length; i++) {
        encryptedArr[i] = new Array(numCols);
    }

    for(let i = 0; i < s.length; i++) {
        const currRow = Math.floor(i / numCols);
        const currCol = i - currRow * numCols;

        encryptedArr[currRow][currCol] = s[i];
    }

    let encryptedStr = '';

    for(let i = 0; i < numCols; i++) {
        for(let j = 0; j < numRows; j++) {
            if(encryptedArr[j][i]){
                encryptedStr = encryptedStr.concat(encryptedArr[j][i]);
            }
        }
        encryptedStr = encryptedStr.concat(' ');
    }

    return encryptedStr;
}

// console.log(encryption('feedthedog'));
console.log(encryption('chillout'));
