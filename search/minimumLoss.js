// Complete the minimumLoss function below.
function minimumLoss(price) {
    const priceList = price.map((p, index) => new Price(index, p));
    priceList.sort(priceComp);

    let minLoss = Number.MIN_SAFE_INTEGER;

    for(let i = 1; i < priceList.length; i++) {
        if(priceList[i].originalIndex > priceList[i - 1].originalIndex 
            && priceList[i].value - priceList[i - 1].value < 0
            && priceList[i].value - priceList[i - 1].value > minLoss) {
                minLoss = priceList[i].value - priceList[i - 1].value;
        }
        else if(priceList[i - 1].originalIndex > priceList[i].originalIndex 
            && priceList[i - 1].value - priceList[i].value < 0
            && priceList[i - 1].value - priceList[i].value > minLoss) {
                minLoss = priceList[i - 1].value - priceList[i].value;
            }
    }

    return -minLoss;
}

function priceComp(a, b) {
    if(a.value < b.value) {
        return -1;
    }
    else if(a.value === b.value) {
        return 0;
    }
    else {
        return 1;
    }
}

class Price {
    constructor(originalIndex, value) {
        this.originalIndex = originalIndex;
        this.value = value;
    }
}

console.log(minimumLoss([20, 15, 8, 2, 12]));
