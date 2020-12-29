class Pair {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.xor = i ^ j;
  }
}

function beautifulQuadruples(a, b, c, d) {
  const sortedAbcd = [a, b, c, d].sort(numberComp);
  const aXorB = [];
  const cXorD = [];

  for (let j = 0; j < b; j++) {
    for (let i = 0; i < a; i++) {
      aXorB.push(new Pair((i + 1), (j + 1)));
    }
  }

  for (let j = 0; j < d; j++) {
    for (let i = 0; i < c; i++) {
      cXorD.push(new Pair((i + 1), (j + 1)));
    }
  }

  const quadruples = {};

  for (let j = 0; j < cXorD.length; j++) {
    for (let i = 0; i < aXorB.length; i++) {
      if (aXorB[i].xor !== cXorD[j].xor) {
        const sortedQuadruple = [aXorB[i].i, aXorB[i].j, cXorD[j].i, cXorD[j].j].sort(numberComp);
        quadruples[`${sortedQuadruple[0]}${sortedQuadruple[1]}${sortedQuadruple[2]}${sortedQuadruple[3]}`] = true;
      }
    }
  }

  return Object.keys(quadruples).length;
}

function numberComp(a, b) {
  if (a < b) {
    return -1;
  }
  else if (a === b) {
    return 0;
  }
  else {
    return 1;
  }
}

console.log(beautifulQuadruples(1, 2, 3, 4));


