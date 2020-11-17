function printShortestPath(n, jStart, iStart, jEnd, iEnd) {
    // Print the distance along with the sequence of moves.
    const board = initBoard(n);

    let queue = [];         // Use shift and pop
    const startVertex = board[jStart][iStart];
    startVertex.found = true;
    queue.push(startVertex);

    while(queue.length > 0) {
        const currVertex = queue.shift();
        currVertex.visited = true;

        if(currVertex.i === iEnd && currVertex.j === jEnd) {
            return concatShortestPathToVertex(currVertex);
        }
        addUnfoundVerticesToQueue(currVertex, queue, board);
    }

    console.log('Impossible');
}

function concatShortestPathToVertex(currVertex) {
    let s = '';
    let moveCount = 0;

    while(currVertex.prevVertex) {
        moveCount++;
        s = (currVertex.prevMove).concat(' ').concat(s);
        currVertex = currVertex.prevVertex;
    }

    console.log(moveCount);
    console.log(s);
}

function addUnfoundVerticesToQueue(currVertex, queue, board) {
    const i = currVertex.i;
    const j = currVertex.j;
    const n = board.length;

    // UL
    if(i - 1 >= 0 && j - 2 >= 0 && !board[j - 2][i - 1].found) {
        board[j - 2][i - 1].found = true;
        board[j - 2][i - 1].prevMove = 'UL';
        board[j - 2][i - 1].prevVertex = currVertex;
        queue.push(board[j - 2][i - 1]);
    }
    // UR
    if(i + 1 < n && j - 2 >= 0 && !board[j - 2][i + 1].found) {
        board[j - 2][i + 1].found = true;
        board[j - 2][i + 1].prevMove = 'UR';
        board[j - 2][i + 1].prevVertex = currVertex;
        queue.push(board[j - 2][i + 1]);
    }
    // R move
    if(i + 2 < n && !board[j][i + 2].found) {
        board[j][i + 2].found = true;
        board[j][i + 2].prevMove = 'R';
        board[j][i + 2].prevVertex = currVertex;
        queue.push(board[j][i + 2]);
    }
    // LR
    if(i + 1 < n && j + 2 < n && !board[j + 2][i + 1].found) {
        board[j + 2][i + 1].found = true;
        board[j + 2][i + 1].prevMove = 'LR';
        board[j + 2][i + 1].prevVertex = currVertex;
        queue.push(board[j + 2][i + 1]);
    }
    // LL
    if(i - 1 >= 0 && j + 2 < n && !board[j + 2][i - 1].found) {
        board[j + 2][i - 1].found = true;
        board[j + 2][i - 1].prevMove = 'LL';
        board[j + 2][i - 1].prevVertex = currVertex;
        queue.push(board[j + 2][i - 1]);
    }
    // L move
    if(i - 2 >= 0 && !board[j][i - 2].found) {
        board[j][i - 2].found = true;
        board[j][i - 2].prevMove = 'L';
        board[j][i - 2].prevVertex = currVertex;
        queue.push(board[j][i - 2]);
    }
}

function initBoard(n) {
    const board = new Array(n);
    for(let j = 0; j < n; j++) {
        board[j] = new Array(n);
        for(let i = 0; i < n; i++) {
            board[j][i] = new Vertex(i, j);
        }
    }

    return board;
}

class Vertex {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.found = false;
        this.visited = false;
        this.prevMove = null;
        this.prevVertex = null;
    }
}

console.log(printShortestPath(7, 0, 3, 4, 3));
