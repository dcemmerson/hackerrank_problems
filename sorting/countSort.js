function countSort(arr) {
    const map = new Map();

    arr.forEach((curr, i) => {
        const index = parseInt(curr[0]);
        const val = curr[1];
        if(!map.get(index)) {
            map.set(index, []);
        }
        if(i < Math.floor(arr.length / 2)) {
            map.get(index).push('-');
        }
        else {
            map.get(index).push(val);
        }
    });

    let str = '';
    let hasPrinted = false;
    for(let i = 0; i < 100; i++) {
        if(hasPrinted) {
            str = str.concat(' ');
        }

        const currArr = map.get(i);
        if(currArr) {
            for(let arrI = 0; arrI < currArr.length; arrI++) {
                hasPrinted = true;
                if(arrI > 0) {
                    str = str.concat(' ');
                }
                str = str.concat(currArr[arrI]);
            }
        }
    }

    console.log(str);
}

countSort([
    [1, 'e'],

    [2, 'a'],
    
    [1, 'b'],
    
    [3, 'a'],
    
    [4, 'f'],
    
    [1, 'f'],
    
    [2, 'a'],
    
    [1, 'e'],
    
    [1, 'b'],
    
    [1, 'c']]);
// countSort([[0, 'ab'],
//     [0, 'ef'],
//     [0, 'ab'],
//     [0, 'ef'],
//     [0, 'ij'],
//     [0, 'to'],
//     [1, 'be'],
//     [1, 'or'],
//     [2, 'not'],
//     [2, 'to'],
//     [3, 'be'],
//     [4, 'ij'],
//     [4, 'that'],
//     [4, 'is'],
//     [4, 'the'],
//     [5, 'question'],
//     [6, 'cd'],
//     [6, 'gh'],
//     [6, 'cd'],
//     [6, 'gh']]);
