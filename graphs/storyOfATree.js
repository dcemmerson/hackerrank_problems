function storyOfATree(n, edges, k, guesses) {
    const graph = new Graph(n, edges, k, guesses);
    graph.correctGuessCount;

    if(graph.winCount === n){
        return 1;
    } else if(graph.winCount === 0) {
        return 0;
    }
    else {
        const [num, denom] = reduceFraction(graph.winCount, n)
        return `${num}/${denom}`;
    }
}

function reduceFraction(num, denom) {
    let isGcdFound = false;
    let gcd = num + 1;
    while(!isGcdFound) {
        gcd--;
        if(num % gcd === 0 && denom % gcd === 0) {
            isGcdFound = true;
        }
    }
    return [Math.round(num / gcd), Math.round(denom / gcd)];
}

class Graph {
    constructor(n, edges, k, guesses) {
        this.correctGuessesRequired = k;
        this.winCount = 0;
        this.vertices = [];
        for(let i = 0; i < n; i++) {
            this.vertices.push(new Vertex(i));
        }
    
        edges.forEach(edge => {
            if(edge[0] - 1 < this.vertices.length && edge[1] - 1 < this.vertices.length) {
                const vertexA = this.vertices[edge[0] - 1];
                const vertexB = this.vertices[edge[1] - 1];
                vertexA.addEdge(vertexB);
                vertexB.addEdge(vertexA);
            }
        });

        guesses.forEach(guess => {
            if(guess[0] - 1 < this.vertices.length && guess[1] - 1 < this.vertices.length) {
                const parentVertex = this.vertices[guess[0] - 1];
                const childVertex = this.vertices[guess[1] - 1];
                parentVertex.addChildGuess(childVertex);
                childVertex.addParentGuess(parentVertex);
            }
        });

        this.vertices[0].correctGuesses = this._initCorrectGuesses(this.vertices[0]);
        this.vertices[0].hasCalculatedGuesses = true;
        if(this.vertices[0].correctGuesses >= this.correctGuessesRequired) {
            this.winCount++;
        }
        this._calculateWinCount(this.vertices[0]);
    }

    _calculateWinCount(currVertex) {
        currVertex.edges.forEach(nextVertex => {
            if(!nextVertex.hasCalculatedGuesses) {
                if(currVertex.isParentOf(nextVertex)) {
                    nextVertex.correctGuesses = currVertex.correctGuesses - 1;

                }
                else if(nextVertex.isParentOf(currVertex)) {
                    nextVertex.correctGuesses = currVertex.correctGuesses + 1;
                }
                else {
                    nextVertex.correctGuesses = currVertex.correctGuesses;
                }
                if(nextVertex.correctGuesses >= this.correctGuessesRequired) {
                    this.winCount++;
                }
                nextVertex.hasCalculatedGuesses = true;
                this._calculateWinCount(nextVertex);
            }
        });
    }

    _initCorrectGuesses(startVertex) {
        let correctGuessCount = 0;
        startVertex.found = true;
        const stack = [];
        stack.push(startVertex);

        while(stack.length > 0) {
            const currVertex = stack[stack.length - 1];
            const nextVertex = currVertex.nextUnvisited;

            if(nextVertex) {
                if(currVertex.isParentOf(nextVertex)) {
                    correctGuessCount++;
                }
                nextVertex.found = true;
                stack.push(nextVertex);
            }
            else {
                const currVertex = stack.pop();
                currVertex.visited = true;
            }
        }
        return correctGuessCount;
    }
}

class Vertex {
    constructor(index) {
        this.index = index;
        this.found = false;
        this.visited = false;
        this.hasCalculatedGuesses = false;
        this.edges = [];
        this.parentGuesses = {};
        this.childGuesses = {};
        this.correctGuesses = 0;
    }

    isParentOf(v) {
        return this.childGuesses[v.index] !== undefined;
    }

    get nextUnvisited() {
        return this.edges.find(v => v.found === false);
    }
    /**
     * @param {!Vertex} v 
     */
    addChildGuess(v) {
        this.childGuesses[v.index] = v;
    }

    /**
     * @param {!Vertex} v 
     */
    addParentGuess(v) {
        this.parentGuesses[v.index] = v;
    }

    /**
     * @param {!Vertex} v 
     */
    addEdge(v) {
        this.edges.push(v);
    }
}

console.log(storyOfATree(4, [[1, 2], [1,3], [3, 4]], 2, [[1, 2], [3, 4]]));
