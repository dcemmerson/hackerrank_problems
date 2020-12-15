function compareTriplets(a, b) {
    const points = Array(2).fill(0);

    for(let i = 0; i < a.length; i++) {
        if(a[i] < b[i]) {
            points[1]++;
        }
        else if(a[i] > b[i]) {
            points[0]++;
        }
    }

    return points;
}
