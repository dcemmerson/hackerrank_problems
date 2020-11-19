// Complete the beautifulPath function below.
function beautifulPath(n, edges, a, b) {
    const graph = new Graph(n, edges);
    const pathDistance = graph.calcBeatifulPath(a, b);
    return pathDistance === Number.MAX_SAFE_INTEGER ? -1 : pathDistance;
}

class Graph {
    constructor(n, edges) {
        this.vertices = [];
        // this.edges = [];

        for(let i = 0; i < n; i++) {
            this.vertices.push(new Vertex(i));
        }

        edges.forEach(e => {
            const vertexA = this.vertices[e[0] - 1];
            const vertexB = this.vertices[e[1] - 1];
            const weight = e[2];
            const edge = new Edge(vertexA, vertexB, weight)
            vertexA.addEdge(edge);
            vertexB.addEdge(edge);

            // this.edges.push(new Edge(vertexA, vertexB, e[2]));
        });
    }

    calcBeatifulPath(startIndex, endIndex) {
        const startVertex = this.vertices[startIndex - 1];
        const endVertex = this.vertices[endIndex - 1];
        const queue = [];
        startVertex.found = true;
        startVertex.possibleDistances.push(0);
        queue.push(startVertex);

        while(queue.length > 0) {
            // Mock having a priority queue here.
            queue.sort(comp);
            const currVertex = queue.shift();
            currVertex.visited = true;

            // const oredWeight = this.oredAllEdges(currVertex);
            currVertex.edges.forEach(edge => {
                if(!edge.vertexA.visited) {
                    edge.vertexA.found = true;
                    currVertex.possibleDistances.forEach(dist => {
                        edge.vertexA.possibleDistances.push(dist | edge.weight);
                    });           
                    if(queue.indexOf(edge.vertexA) === -1) {
                        queue.push(edge.vertexA);
                    }
                }
                else if(!edge.vertexB.visited) {
                    edge.vertexB.found = true;
                    currVertex.possibleDistances.forEach(dist => {
                        edge.vertexB.possibleDistances.push(dist | edge.weight);
                    });           
                    if(queue.indexOf(edge.vertexB) === -1) {
                        queue.push(edge.vertexB);
                    }
                }
            });
        }

        return endVertex.possibleDistances.reduce((acc, curr) => curr < acc ? curr : acc, Number.MAX_SAFE_INTEGER);   
    }

}

function comp(a, b) {
    if(a.distance < b.distance) {
        return -1;
    }
    else if(a.distance === b.distance) {
        return 0;
    }
    else {
        return 1;
    }
}

class Edge {
    constructor(vertexA, vertexB, weight) {
        this.vertexA = vertexA;
        this.vertexB = vertexB;
        this.weight = weight;
    }
}

class Vertex {
    constructor(index) {
        this.index = index;
        this.found = false;
        this.visited = false;
        // this.distance = Number.MAX_SAFE_INTEGER;
        this.possibleDistances = [];
        this.edges = [];
    }

    addEdge(v) {
        this.edges.push(v);
    }
}

console.log(beautifulPath(3, [[1,2,1], [1,2,1000], [2, 3, 3], [1, 3, 100]], 1, 3));

console.log(beautifulPath(3, [[1, 2, 1,], [2, 3, 2], [1, 2, 2]], 1, 3));
