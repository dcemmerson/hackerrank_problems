// Complete the queensAttack function below.
function queensAttack(n, k, rQ, cQ, obstacles) {

    const obstaclesMap = toObstaclesMap(obstacles);

    let attackCount = 0;

    attackCount += goLeft(n, rQ - 1, cQ - 1, obstaclesMap);
    attackCount += goRight(n, rQ - 1, cQ - 1, obstaclesMap);
    attackCount += goUp(n, rQ - 1, cQ - 1, obstaclesMap);
    attackCount += goDown(n, rQ - 1, cQ - 1, obstaclesMap);
    attackCount += goUpLeft(n, rQ - 1, cQ - 1, obstaclesMap);
    attackCount += goUpRight(n, rQ - 1, cQ - 1, obstaclesMap);
    attackCount += goDownLeft(n, rQ - 1, cQ - 1, obstaclesMap);
    attackCount += goDownRight(n, rQ - 1, cQ - 1, obstaclesMap);

    return attackCount;
}

function toObstaclesMap(obstacles) {
    const map = new Map();
    obstacles.forEach((obs) => {
        const obsStrY = toObsStr(obs[0] - 1);
        const obsStrX = toObsStr(obs[1] - 1);
        map.set(`${obsStrY}${obsStrX}`, true);
    });

    return map;
}

function toObsStr(val) {
    let str = val.toString();
    while(str.length < 3) {
        str = '0'.concat(str);
    }

    return str;
}

function goDownRight(n, rQ, cQ, obstaclesMap) {
    let count = 0;

    rQ--;
    cQ++;

    while(rQ >= 0 && cQ < n) {
        if(obstaclesMap.get(`${toObsStr(rQ)}${toObsStr(cQ)}`)) {
            return count;
        }
        
        count++;
        rQ--;
        cQ++;
    }

    return count;
}

function goDownLeft(n, rQ, cQ, obstaclesMap) {
    let count = 0;

    rQ--;
    cQ--;

    while(rQ >= 0 && cQ >= 0) {
        if(obstaclesMap.get(`${toObsStr(rQ)}${toObsStr(cQ)}`)) {
            return count;
        }
        
        count++;
        rQ--;
        cQ--;
    }

    return count;
}

function goUpLeft(n, rQ, cQ, obstaclesMap) {
    let count = 0;

    rQ++;
    cQ--;

    while(rQ < n && cQ >= 0) {
        if(obstaclesMap.get(`${toObsStr(rQ)}${toObsStr(cQ)}`)) {
            return count;
        }
        
        count++;
        rQ++;
        cQ--;
    }

    return count;
}

function goUpRight(n, rQ, cQ, obstaclesMap) {
    let count = 0;

    rQ++;
    cQ++;

    while(rQ < n && cQ < n) {
        if(obstaclesMap.get(`${toObsStr(rQ)}${toObsStr(cQ)}`)) {
            return count;
        }
        
        count++;
        rQ++;
        cQ++;
    }

    return count;
}


function goDown(n, rQ, cQ, obstaclesMap) {
    let count = 0;

    const cQStr = toObsStr(cQ);
    rQ--;

    while(rQ >= 0) {
        if(obstaclesMap.get(`${toObsStr(rQ)}${cQStr}`)) {
            return count;
        }
        
        count++;
        rQ--;
    }

    return count;
}

function goUp(n, rQ, cQ, obstaclesMap) {
    let count = 0;

    const cQStr = toObsStr(cQ);
    rQ++;

    while(rQ < n) {
        if(obstaclesMap.get(`${toObsStr(rQ)}${cQStr}`)) {
            return count;
        }
        
        count++;
        rQ++;
    }

    return count;
}


function goRight(n, rQ, cQ, obstaclesMap) {
    let count = 0;

    const rQStr = toObsStr(rQ);
    cQ++;

    while(cQ < n) {
        if(obstaclesMap.get(`${rQStr}${toObsStr(cQ)}`)) {
            return count;
        }
        
        count++;
        cQ++;
    }

    return count;
}

function goLeft(n, rQ, cQ, obstaclesMap) {
    let count = 0;

    const rQStr = toObsStr(rQ);
    cQ--;

    while(cQ >= 0) {
        if(obstaclesMap.get(`${rQStr}${toObsStr(cQ)}`)) {
            return count;
        }

        count++;
        cQ--;
    }

    return count;
}

console.log(queensAttack(5, 3, 4, 3, [[5, 5], [4, 2], [2, 3]]));