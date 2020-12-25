function circularArrayRotation(a, k, queries) {
  k = k % a.length;

  return queries.map(queryIndex => {
    let aIndex = queryIndex - k;
    if (aIndex < 0) {
      aIndex += a.length;
    }
    return a[aIndex];
  });
}

console.log(circularArrayRotation([3, 4, 5], 2, [1, 2]))
