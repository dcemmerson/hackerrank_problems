// Complete the countLuck function below.
function countLuck(matrix, k) {

    const vertexMatrix = toVertexMatrix(matrix);

    const [startJ, startI] = findStartLocation(matrix);
    const startVertex = vertexMatrix[startJ][startI];
    startVertex.found = true;
    const wandCount = [0];
    dfsCount(vertexMatrix, startVertex, wandCount);

    if(wandCount[0] === k) {
        return 'Impressed';
    }
    else {
        return 'Oops!';
    }
}

function findStartLocation(matrix) {
    for(let j = 0; j < matrix.length; j++) {
        for(let i = 0; i < matrix[j].length; i++) {
            if(matrix[j][i] === 'M') {
                return [j, i];
            }
        }
    }
    return [-1, -1];
}

function dfsCount(vertexMatrix, currVertex, wandCount) {
    currVertex.visited = true;
    if(vertexMatrix[currVertex.j][currVertex.i].value === '*') {
        return true;
    }
    let currVertexIsDecisionPoint = false;
    let currDecisionPointLeadsToPortKey = false;
    const nodesToVisit = [];

    if(currVertex.i - 1 >= 0 && vertexMatrix[currVertex.j][currVertex.i - 1].value !== 'X' 
        && !vertexMatrix[currVertex.j][currVertex.i - 1].found) {
        vertexMatrix[currVertex.j][currVertex.i - 1].found = true;
        nodesToVisit.push(vertexMatrix[currVertex.j][currVertex.i - 1]);
    }
    if(currVertex.i + 1 < vertexMatrix[0].length  && vertexMatrix[currVertex.j][currVertex.i + 1].value !== 'X'
        && !vertexMatrix[currVertex.j][currVertex.i + 1].found) {
        vertexMatrix[currVertex.j][currVertex.i + 1].found = true;
        nodesToVisit.push(vertexMatrix[currVertex.j][currVertex.i + 1]);
    }
    if(currVertex.j - 1 >= 0  && vertexMatrix[currVertex.j - 1][currVertex.i].value !== 'X'
        && !vertexMatrix[currVertex.j - 1][currVertex.i].found) {
        vertexMatrix[currVertex.j - 1][currVertex.i].found = true;
        nodesToVisit.push(vertexMatrix[currVertex.j - 1][currVertex.i]);
    }
    if(currVertex.j + 1 < vertexMatrix.length && vertexMatrix[currVertex.j + 1][currVertex.i].value !== 'X'
        && !vertexMatrix[currVertex.j + 1][currVertex.i].found) {
        vertexMatrix[currVertex.j + 1][currVertex.i].found = true;
        nodesToVisit.push(vertexMatrix[currVertex.j + 1][currVertex.i]);
    }

    if(nodesToVisit.length > 1) {
        currVertexIsDecisionPoint = true;
    }

    nodesToVisit.forEach(vertex => {
        currDecisionPointLeadsToPortKey = currDecisionPointLeadsToPortKey || dfsCount(vertexMatrix, vertex, wandCount);
    });

    if(currVertexIsDecisionPoint && currDecisionPointLeadsToPortKey) {
        wandCount[0]++;
    }

    return currDecisionPointLeadsToPortKey;

}

function toVertexMatrix(matrix) {
    const vertexMatrix = [];

    for(let j = 0; j < matrix.length; j++) {
        vertexMatrix.push(new Array(matrix[j].length))
        for(let i = 0; i < matrix[j].length; i++) {
            vertexMatrix[j][i] = new Vertex(i, j, matrix[j][i]);
        }
    }

    return vertexMatrix;
}

class Vertex {
    constructor(i, j, value) {
        this.i = i;
        this.j = j;
        this.value = value;

        this.found = false;
        this.visited = false;
    }
}

console.log(countLuck([['*', '.', 'M'], ['.', 'X', '.']], 1));
