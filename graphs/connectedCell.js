function connectedCell(matrix) {
    const vertexMatrix = toMatrixOfVertices(matrix);

    let max = 0;

    for(let j = 0; j < matrix.length; j++) {
        const row = vertexMatrix[j];
        for(let i = 0; i < row.length; i++) {
            if(!row[i].visited && row[i].value === 1) {
                const currMax = dfs(vertexMatrix, row[i]);
                if(currMax > max) max = currMax;
            }
        }
    }

    return max;
}

// return int representing number connected vertices.
function dfs(matrix, vertex) {
    let count = 0;
    const stack = [];

    vertex.found = true;
    stack.push(vertex);

    while(stack.length > 0) {
        const currVertex = stack.pop();
        currVertex.visited = true;
        count++;

        addAdjacentVerticesToStack(currVertex, stack, matrix);
    }

    return count;
}

function addAdjacentVerticesToStack(v, stack, matrix) {
    // Adjacent vertices can be +1 or -1 in any direction, including diagonals.
    const i = v.i;
    const j = v.j;

    if(i - 1 >= 0 && matrix[j][i - 1].value === 1 && !matrix[j][i - 1].found) {
        matrix[j][i - 1].found = true;
        stack.push(matrix[j][i - 1]);
    }
    if(i + 1 < matrix[0].length && matrix[j][i + 1].value === 1 && !matrix[j][i + 1].found) {
        matrix[j][i + 1].found = true;
        stack.push(matrix[j][i + 1]);
    }
    if(j - 1 >= 0&& matrix[j - 1][i].value === 1 && !matrix[j - 1][i].found) {
        matrix[j - 1][i].found = true;
        stack.push(matrix[j - 1][i]);
    }
    if(j + 1 < matrix.length && matrix[j + 1][i].value === 1 && !matrix[j + 1][i].found) {
        matrix[j + 1][i].found = true;
        stack.push(matrix[j + 1][i]);
    }

    if(i - 1 >= 0 && j - 1 >= 0 && matrix[j - 1][i - 1].value === 1 && !matrix[j - 1][i - 1].found) {
        matrix[j - 1][i - 1].found = true;
        stack.push(matrix[j - 1][i - 1]);
    }
    if(i - 1 >= 0 && j + 1 < matrix.length && matrix[j + 1][i - 1].value === 1 && !matrix[j + 1][i - 1].found) {
        matrix[j + 1][i - 1].found = true;
        stack.push(matrix[j + 1][i - 1]);
    }
    if(i + 1 < matrix[0].length && j - 1 >= 0 && matrix[j - 1][i + 1].value === 1 && !matrix[j - 1][i + 1].found) {
        matrix[j - 1][i + 1].found = true;
        stack.push(matrix[j - 1][i + 1]);
    }
    if(i + 1 < matrix[0].length && j + 1 < matrix.length && matrix[j + 1][i + 1].value === 1 && !matrix[j + 1][i + 1].found) {
        matrix[j + 1][i + 1].found = true;
        stack.push(matrix[j + 1][i + 1]);
    }
}

function toMatrixOfVertices(matrix) {
    const arr = new Array(matrix.length);

    for(let j = 0; j < arr.length; j++) {
        arr[j] = new Array(matrix[j].length);
        for(let i = 0; i < arr[j].length; i++) {
            arr[j][i] = new Vertex(i, j, matrix[j][i]);
        }
    }

    return arr;
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

console.log(connectedCell([[0, 0, 1, 1], [0, 0, 1, 0], [0, 1, 1,0], [0,1,0,0], [1, 1, 0, 0]]));
