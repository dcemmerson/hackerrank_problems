function bfs(n, m, edges, s) {
    const graph = new Graph(n, edges);

    graph.bfs(s);

    return graph.listDistancesToVerticesInNodeOrder();

}

class Graph {
    constructor(n, edges) {
        this.vertices = [];
        for(let i = 0; i < n; i++) {
            this.vertices.push(new Vertex(i));
        }

        edges.forEach(e => {
            const vertexA = this.vertices[e[0]- 1];
            const vertexB = this.vertices[e[1] - 1];
            vertexA.addEdge(vertexB);
            vertexB.addEdge(vertexA);
        });
    }

    listDistancesToVerticesInNodeOrder() {
        const output = []

        this.vertices.forEach(v => {
            if(v.distance !== 0) {
                output.push(v.distance);
            }
        });
        return output;
    }

    bfs(startIndex) {
        const queue = []; // use shift() and push() operations
        const startVertex = this.vertices[startIndex - 1];
        startVertex.found = true;
        startVertex.distance = 0;
        queue.push(startVertex);

        while(queue.length > 0) {
            const currVertex = queue.shift();

            currVertex.edges.forEach(e => {
                if(!e.found) {
                    e.found = true;
                    e.distance = currVertex.distance + 6;
                    queue.push(e);
                }
            });
        }

    }

}

class Vertex {
    constructor(index) {
        this.index = index;
        this.distance = -1;
        this.found = false;
        this.edges = [];
    }

    addEdge(v) {
        this.edges.push(v);
    }
}
