function getCost(gNodes, gFrom, gTo, gWeight) {
    // Print your answer within the function and return nothing
    const graph = new Graph(gNodes, gFrom, gTo, gWeight);

    const distance = graph.getCost();

    console.log(distance === Number.MAX_SAFE_INTEGER ? 'NO PATH EXISTS' : distance);
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
        const heap = new Heap();

        const startVertex = this.vertices[0];
        startVertex.distance = 0;
        startVertex.found = true;

        heap.add(startVertex);

        while(heap.length > 0) {
            // queue.sort(compareVertices); // Sort every iteration to mock a priority queue here.
            const currVertex = heap.getMin();
            currVertex.visited = true;

            currVertex.edges.forEach(e => {
                if(!e.vertexA.visited) {
                    e.vertexA.distance = Math.min(e.vertexA.distance, 
                        (e.weight - currVertex.distance) > 0 ? e.weight : currVertex.distance);
                    if(!e.vertexA.found) {
                        e.vertexA.found = true;
                        heap.add(e.vertexA);
                    }
                    else {
                        heap.bubbleUp(e.vertexA.index);
                    }
                }
                else if(!e.vertexB.visited) {
                    e.vertexB.distance = Math.min(e.vertexB.distance, 
                        (e.weight - currVertex.distance) > 0 ? e.weight : currVertex.distance);
                    if(!e.vertexB.found) {
                        e.vertexB.found = true;
                        heap.add(e.vertexB);
                    }
                    else {
                        heap.bubbleUp(e.vertexA.index);
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

class Heap {
    constructor() {
        this.vertices = [];
        this.count = 0;
        this.capacity = 0;
    }

    get length() {
        return this.count;
    }

    add(v) {
        if(this.count >= this.capacity) {
            const realloced = new Array(2 * this.capacity + 1);
            this.capacity = 2 * this.capacity + 1;
            this.vertices.forEach((v, index) => realloced[index] = v);
            this.vertices = realloced;
        }
        v.index = this.count;
        this.vertices[this.count] = v;
        this.count++;
        this.bubbleUp(this.count - 1);

    }

    getMin() {
        if(this.count <= 0) {
            return null;
        }

        const minVertex = this.vertices[0];
        this.vertices[0] = this.vertices[this.count - 1];
        this.vertices[0].index = 0;
        this.vertices[this.count - 1] = null;
        this.count--;
        if(this.count > 0) {
            this.trickleDown();
        }

        return minVertex;
    }

    trickleDown() {
        let currIndex = 0;
        let currVertex = this.vertices[currIndex];

        let lChildIndex = 2 * currIndex + 1;
        let rChildIndex = 2 * currIndex + 2;

        while(lChildIndex < this.count - 1) {
            const minChildIndex = this.vertices[lChildIndex].distance < this.vertices[rChildIndex].distance 
                                    ? lChildIndex : rChildIndex;
            const minChildVertex = this.vertices[minChildIndex];

            if(minChildVertex.distance < currVertex.distance) {
                this.swap(currIndex, minChildIndex);

            }

            currIndex = minChildIndex;
            lChildIndex = 2 * currIndex + 1;
            rChildIndex = 2 * currIndex + 2;
        }
    }

    bubbleUp(startIndex) {
        let currIndex = startIndex;
        let parentIndex = Math.floor((currIndex - 1) / 2);

        let currVertex = this.vertices[currIndex];
        let parentVertex = this.vertices[parentIndex];

        while(parentIndex >= 0 && currVertex.distance < parentVertex.distance) {
            this.swap(currIndex, parentIndex);
            currIndex = parentIndex;
            currVertex = this.vertices[currIndex];
            parentIndex = Math.floor((currIndex - 1) / 2);
            if(parentIndex >= 0) {
                parentVertex = this.vertices[parentIndex];
            }
        }
    }

    swap(indexA, indexB) {
        const vertexA = this.vertices[indexA];
        const vertexB = this.vertices[indexB];

        this.vertices[indexA] = vertexB;
        vertexB.index = indexA;

        this.vertices[indexB] = vertexA;
        vertexA.index = indexB;
    }
}

// function compareVertices(a, b) {
//     if(a.distance < b.distance) {
//         return -1;
//     }
//     else if(a.distance === b.distance) {
//         return 0;
//     }
//     else {
//         return 1;
//     }
// }


// console.log(getCost(5, [1, 2, 3, 4, 1, 3], [2, 3, 4, 5, 3, 5], [30, 50, 70, 90, 70, 80]));

getCost(5, [1, 3, 1, 4, 2], [2, 5, 4, 5, 3], [60, 70, 120, 150, 80]);

// console.log(getCost(10, [1, 1, 1, 1, 1, 1, 1, 1], ))
