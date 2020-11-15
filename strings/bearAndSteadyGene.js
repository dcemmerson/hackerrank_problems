// Complete the steadyGene function below.
function steadyGene(gene) {
    const occurrenceCount = Math.floor(gene.length / 4);
    const letterMap = stringToMapCount(gene);

    const replaceMap = new Map();
    replaceMap.set('A', letterMap.get('A') - occurrenceCount > 0 ? letterMap.get('A') - occurrenceCount : 0);
    replaceMap.set('C', letterMap.get('C') - occurrenceCount > 0 ? letterMap.get('C') - occurrenceCount : 0);
    replaceMap.set('G', letterMap.get('G') - occurrenceCount > 0 ? letterMap.get('G') - occurrenceCount : 0);
    replaceMap.set('T', letterMap.get('T') - occurrenceCount > 0 ? letterMap.get('T') - occurrenceCount : 0);

    let bestWindow = Number.MAX_SAFE_INTEGER;

    let leftIndex = 0;
    let rightIndex = replaceMap.get('A') + replaceMap.get('C') + replaceMap.get('G') + replaceMap.get('T');
    if(rightIndex === 0) {
        return 0;
    }

    //Init map that keeps track of letter count in our current window.
    const currLetterMap = new Map();
    currLetterMap.set('A', 0);
    currLetterMap.set('C', 0);
    currLetterMap.set('G', 0);
    currLetterMap.set('T', 0);

    for(let i = 0; i < rightIndex; i++) {
        currLetterMap.set(gene[i], currLetterMap.get(gene[i]) + 1);
    }

    while(rightIndex < gene.length && leftIndex < rightIndex) {
        if(mapsContainEquivalentEntries(currLetterMap, replaceMap)) {
            if(rightIndex - leftIndex < bestWindow) {
                bestWindow = rightIndex - leftIndex;
            }
            currLetterMap.set(gene[leftIndex], currLetterMap.get(gene[leftIndex]) - 1);
            leftIndex++;
        }
        else {
            currLetterMap.set(gene[rightIndex], currLetterMap.get(gene[rightIndex]) + 1);
            rightIndex++;
        }
    }

    return bestWindow;

}

function mapsContainEquivalentEntries(currWindowMap, replaceMap) {
    let isEqual = true;
    replaceMap.forEach((value, key) => {
        if(currWindowMap.get(key) < value) {
            isEqual = false;
        }
    });

    return isEqual;
}

function stringToMapCount(str) {
    const map = new Map();

    for(let i = 0; i < str.length; i++) {
        if(!map.get(str[i])) {
            map.set(str[i], 0);
        }
        map.set(str[i], map.get(str[i]) + 1);
    }

    return map;
}

console.log(steadyGene('GAAATAAA'));
