function xorAndSum(a, b) {
    let sum = 0;
    for(let i = 0; i < 314160; i++) {
        // let bVal = b;

        sum += (a^(b << i));

    }

    return sum % 1000000007;
}

console.log(xorAndSum(10, 1010));
