function saveThePrisoner(n, m, s) {
  const finalChair = ((m + s) - 1) % n;
  return finalChair === 0 ? n : finalChair;
}

console.log(saveThePrisoner(5, 2, 1));
console.log(saveThePrisoner(5, 2, 2));
console.log(saveThePrisoner(3, 7, 3))
