function pickingNumbers(arr) {
  const countElements = {};

  arr.forEach(element => {
    if (!countElements[element]) {
      countElements[element] = 0;
    }

    countElements[element]++;
  });

  let maxCount = 0;
  [...Array(100).keys()].forEach(num => {
    if (countElements[num] && countElements[num + 1]
      && (countElements[num] + countElements[num + 1]) > maxCount) {
      maxCount = countElements[num] + countElements[num + 1]
    }
    else if(countElements[num] && countElements[num] > maxCount) {
      maxCount = countElements[num];
    }
  });

  return maxCount;
}

console.log(pickingNumbers([1, 2, 2, 3, 1, 2]))
