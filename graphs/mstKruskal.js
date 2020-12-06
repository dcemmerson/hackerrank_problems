function kruskals(gNodes, gFrom, gTo, gWeight) {
    const graph = new Graph(gNodes, gFrom, gTo, gWeight);
    const mstEdges = graph.findMst();

    return mstEdges.reduce((acc, currEdge) => acc + currEdge.weight, 0);
}

class Graph {
    constructor(gNodes, gFrom, gTo, gWeight) {
        this.vertices = [];
        this.edges = [];

        for(let i = 0; i < gNodes; i++) {
            this.vertices.push(new Vertex(i));
        }

        for(let i = 0; i < gFrom.length; i++) {
            const vertexA = this.vertices[gFrom[i] - 1];
            const vertexB = this.vertices[gTo[i] - 1];
            const weight = gWeight[i];

            const edge = new Edge(vertexA, vertexB, weight);
            this.edges.push(edge);
        }

    }

    findMst() {
        this.edges.sort(edgeSorter);
        const mstEdges = [];

        let i = 0;
        while(mstEdges.length < this.vertices.length - 1) {
            const currEdge = this.edges[i];
            const vertexA = currEdge.vertexA;
            const vertexB = currEdge.vertexB;

            const vertexASet = this.findSet(vertexA);
            const vertexBSet = this.findSet(vertexB);

            if(vertexASet !== vertexBSet) {
                mstEdges.push(currEdge);
                this.union(vertexASet, vertexBSet)
            }
            i++;
        }
        return mstEdges;
    }

    findSet(vertex) {
        if(vertex.parent === vertex) {
            return vertex;
        }

        vertex.parent = this.findSet(vertex.parent);

        return vertex.parent;
    }

    union(vertexASet, vertexBSet) {
        if(vertexASet.rank > vertexBSet.rank) {
            vertexBSet.parent = vertexASet
        }
        else if(vertexASet.rank < vertexBSet.rank) {
            vertexASet.parent = vertexBSet;
        }
        else {
            vertexASet.rank++;
            vertexBSet.parent = vertexASet;
        }
    }
}

function edgeSorter(e1, e2) {
    if(e1.weight < e2.weight) {
        return -1;
    }
    else if(e1.weight === e2.weight) {
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
        this.rank = 0;
        this.parent = this;
    }
}

console.log(kruskals(4, [1, 1, 4, 2, 3, 3], [2, 3, 1, 4, 2, 4], [5, 3, 6, 7, 4, 5]));
