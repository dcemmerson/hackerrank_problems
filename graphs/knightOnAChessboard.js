
function knightlOnAChessboard(n) {
    const vertexBoard = new Array(n - 1);
    const distanceBoard = new Array(n - 1);

    // Create our own n x n board, placing empty Vertexes at each location.
    for(let j = 0; j < n - 1; j++) {
        vertexBoard[j] = new Array(n - 1);
        distanceBoard[j] = new Array(n - 1);
        for(let i = 0; i < n - 1; i++) {
            vertexBoard[j][i] = new Vertex(j, i);
            distanceBoard[j][i] = -1;
        }
    }

    let queue = [];     // Use push and shift to simulate queue.

    const unfoundVertex = vertexBoard[0][0];
    unfoundVertex.found = true;
    queue.push(unfoundVertex);
    
    while(queue.length > 0) {
        const curr = queue.shift();
        distanceBoard[curr.j][curr.i] = curr.minDistance;

        addAllUnfoundTouchingVertices(curr, vertexBoard, queue);
    }

    return distanceBoard;
}

function addAllUnfoundTouchingVertices(curr, vertexBoard, queue) {
    const i = curr.i;
    const j = curr.j;
    const n = vertexBoard.length;

    if(j - 2 >= 0 && i - 1 >= 0 && !vertexBoard[j - 2][i - 1].found) {
        queue.push(vertexBoard[j - 2][i - 1]);
        vertexBoard[j - 2][i - 1].found = true;
        vertexBoard[j - 2][i - 1].minDistance = curr.minDistance + 1;
    }
    if(j - 2 >= 0 && i + 1 < n && !vertexBoard[j - 2][i + 1].found) {
        queue.push(vertexBoard[j - 2][i + 1]);
        vertexBoard[j - 2][i + 1].found = true;
        vertexBoard[j - 2][i + 1].minDistance = curr.minDistance + 1;
    }
    if(j + 2 < n && i - 1 >= 0 && !vertexBoard[j + 2][i - 1].found) {
        queue.push(vertexBoard[j + 2][i - 1]);
        vertexBoard[j + 2][i - 1].found = true;
        vertexBoard[j + 2][i - 1].minDistance = curr.minDistance + 1;
    }
    if(j + 2 < n && i + 1 < n && !vertexBoard[j + 2][i + 1].found) {
        queue.push(vertexBoard[j + 2][i + 1]);
        vertexBoard[j + 2][i + 1].found = true;
        vertexBoard[j + 2][i + 1].minDistance = curr.minDistance + 1;
    }

    if(j - 1 >= 0 && i - 2 >= 0 && !vertexBoard[j - 1][i - 2].found) {
        queue.push(vertexBoard[j - 1][i - 2]);
        vertexBoard[j - 1][i - 2].found = true;
        vertexBoard[j - 1][i - 2].minDistance = curr.minDistance + 1;
    }
    if(j - 1 >= 0 && i + 2 < n && !vertexBoard[j - 1][i + 2].found) {
        queue.push(vertexBoard[j - 1][i + 2]);
        vertexBoard[j - 1][i + 2].found = true;
        vertexBoard[j - 1][i + 2].minDistance = curr.minDistance + 1;
    }
    if(j + 1 < n && i - 2 >= 0 && !vertexBoard[j + 1][i - 2].found) {
        queue.push(vertexBoard[j + 1][i - 2]);
        vertexBoard[j + 1][i - 2].found = true;
        vertexBoard[j + 1][i - 2].minDistance = curr.minDistance + 1;
    }
    if(j + 1 < n && i + 2 < n && !vertexBoard[j + 1][i + 2].found) {
        queue.push(vertexBoard[j + 1][i + 2]);
        vertexBoard[j + 1][i + 2].found = true;
        vertexBoard[j + 1][i + 2].minDistance = curr.minDistance + 1;
    }
}

class Vertex {
    constructor(j, i) {
        this.j = j;
        this.i = i;
        this.isFound = false;
        this.isVisited = false;

        if(i === 0 && j === 0) {
            this.minDistance = 0;
        }
        else {
            this.minDistance = -1;
        }

    }
}

const a = knightlOnAChessboard(5);
console.log(a);
