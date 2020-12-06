
function kruskals(gNodes, gFrom, gTo, gWeight) {
    const graph = new Graph(gNodes, gFrom, gTo, gWeight);

    const mstWeight = graph.calcMst();

    return mstWeight;
}

class Graph {
    constructor(gNodes, gFrom, gTo, gWeight) {
        this.edges = [];
        this.vertices = [];

        for(let i = 0; i < gNodes; i++) {
            this.vertices.push(new Vertex(i));
        }

        for(let i = 0; i < gFrom.length; i++) {
            const vertexA = this.vertices[gFrom[i] - 1];
            const vertexB = this.vertices[gTo[i] - 1];
            const currEdge = new Edge(vertexA, vertexB, gWeight[i]);

            this.edges.push(currEdge);
        }
    }

    calcMst() {
        this.edges.sort(edgeCompare);
        // while number vertices in our mst < this.verices.length
        // Remove first edge in this.edges
        // if edge.vertexA has different root than edge.vertexB
        //      then add this to our mst
        // else ignore this edge
        const mst = new Set(); // Keep track of edges rather than vertices
        let sum = 0;

        while(mst.size < this.vertices.length - 1) {
            const currEdge = this.edges.shift();
            const vertexARoot = this.getRoot(currEdge.vertexA);
            const vertexBRoot = this.getRoot(currEdge.vertexB);
            if(vertexARoot.index !== vertexBRoot.index) {
                // mst.add(currEdge.vertexA);
                // mst.add(currEdge.vertexB);
                mst.add(currEdge);
                currEdge.vertexA.prev = vertexBRoot;
                sum += currEdge.weight;
            }
        }
        return sum;
    }

    getRoot(v) {
        while(v.prev) {
            v = v.prev;
        }
        
        return v;
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
        this.prev = null;
    }
}

function edgeCompare(a, b) {
    if(a.weight < b.weight) {
        return -1;
    }
    else if(a.weight === b.weight) {
        return 0;
    }
    else {
        return 1;
    }
}

console.log(kruskals(5, [1, 1, 1, 1, 2, 3, 4], [2, 3, 4, 5, 3, 4, 5], [20, 50, 70, 90, 30, 40, 60]));
