function kangaroo(x1, v1, x2, v2) {
  const numJumps = (x2 - x1) / (v1 - v2);
  const exactJumps = (x2 - x1) % (v1 - v2);

  if (numJumps < 0 || exactJumps !== 0) {
    return 'NO';
  }
  else {
    return 'YES';
  }

}

console.log(kangaroo(0, 2, 5, 3));
console.log(kangaroo(0, 3, 4, 2));
