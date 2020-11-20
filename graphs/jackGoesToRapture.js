function getCost(gNodes, gFrom, gTo, gWeight) {
    // Print your answer within the function and return nothing
    const graph = new Graph(gNodes, gFrom, gTo, gWeight);

    const distance = graph.getCost();

    return distance === Number.MAX_SAFE_INTEGER ? 'NO PATH EXISTS' : distance;
}

class Graph {
    constructor(gNodes, gFrom, gTo, gWeight) {
        this.vertices = [];

        for(let i = 0; i < gNodes; i++) {
            this.vertices.push(new Vertex(i));
        }

        for(let i = 0; i < gWeight.length; i++) {
            const vertexA = this.vertices[gFrom[i] - 1];
            const vertexB = this.vertices[gTo[i] - 1];
            const currEdge = new Edge(vertexA, vertexB, gWeight[i]);
            // this.edges.push(currEdge);
            vertexA.addEdge(currEdge);
            vertexB.addEdge(currEdge);
        }
    }

    getCost() {
        const queue = []; // Use shift and push here

        const startVertex = this.vertices[0];
        startVertex.distance = 0;
        startVertex.found = true;

        queue.push(startVertex);

        while(queue.length > 0) {
            queue.sort(compareVertices); // Sort every iteration to mock a priority queue here.
            const currVertex = queue.shift();
            currVertex.visited = true;

            currVertex.edges.forEach(e => {
                if(!e.vertexA.visited) {
                    e.vertexA.distance = Math.min(e.vertexA.distance, 
                        (e.weight - currVertex.distance) > 0 ? e.weight : currVertex.distance);
                    if(!e.vertexA.found) {
                        e.vertexA.found = true;
                        queue.push(e.vertexA);
                    }
                }
                else if(!e.vertexB.visited) {
                    e.vertexB.distance = Math.min(e.vertexB.distance, 
                        (e.weight - currVertex.distance) > 0 ? e.weight : currVertex.distance);
                    if(!e.vertexB.found) {
                        e.vertexB.found = true;
                        queue.push(e.vertexB);
                    }
                }
            }); // forEach
        }

        return this.vertices[this.vertices.length - 1].distance;
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
        this.distance = Number.MAX_SAFE_INTEGER;
        this.found = false;
        this.visited = false;
        this.edges = [];
    }
    
    addEdge(edge) {
        this.edges.push(edge);
    }
}

function compareVertices(a, b) {
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

// console.log(getCost(5, [1, 2, 3, 4, 1, 3], [2, 3, 4, 5, 3, 5], [30, 50, 70, 90, 70, 80]));

// console.log(getCost(5, [1, 3, 1, 4, 2], [2, 5, 4, 5, 3], [60, 70, 120, 150, 80]));

console.log(getCost(10, [1, 1, 1, 1, 1, 1, 1, 1], ))
