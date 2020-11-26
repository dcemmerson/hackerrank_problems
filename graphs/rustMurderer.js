function rustMurderer(n, roads, s) {
    const graph = new Graph(n, roads);
    return graph.bfs(s);
}

class Graph {
    constructor(n, roads) {
        // const villageRoads = this.complementRoads(n, roads);

        this.vertices = [];

        for(let i = 0; i < n; i++) {
            this.vertices.push(new Vertex(i, n));
        }

        roads.forEach((road) => {
            const vertexA = this.vertices[road[0] - 1];
            const vertexB = this.vertices[road[1] - 1];
            vertexA.removeEdge(road[1] - 1);
            vertexB.removeEdge(road[0] - 1);
        });
    }

    bfs(startIndex) {
        const queue = [];

        const startVertex = this.vertices[startIndex - 1];
        startVertex.found = true;
        startVertex.distance = 0;

        queue.push(startVertex);
        while(queue.length > 0) {
            const currVertex = queue.shift();

            currVertex.edges.forEach(index => {
                const v = this.vertices[index];
                if(!v.found) {
                    v.found = true;
                    v.distance = currVertex.distance + 1;
                    queue.push(v);
                }
            });
        }

        return this.vertices.map(v => v.distance).filter(d => d !== 0);
    }

    complementRoads(n, roads) {
        const complementRoads = [];

        for(let j = 0; j < n; j++) {
            for(let i = 0; i < n; i++) {
                const thisEdge = [i + 1, j + 1];
                if(i !== j && !this.roadContainsEdge(thisEdge, roads)) {
                    complementRoads.push(thisEdge);
                }
            }
        }
        return complementRoads;
    }

    roadContainsEdge(edge, roads) {
        for(let i = 0; i < roads.length; i++) {
            const currRoad = roads[i];
            if((currRoad[0] === edge[0] && currRoad[1] === edge[1]) 
                || (currRoad[1] === edge[0] && currRoad[0] === edge[1])) {
                    return true;
                }
        }

        return false;
    }
}

class Vertex {
    constructor(index, n) {
        this.index = index;
        this.found = false;
        this.distance = -1;
        this.edges = []; // 0 indexed ints

        for(let i = 0; i < n; i++) {
            if(i !== this.index) {
                this.edges.push(i);
            }
        }
    }

    removeEdge(vertexNum) { // index should be 0 indexed
        const indexToRemove = this.edges.indexOf(vertexNum);
        this.edges.splice(indexToRemove, 1);
    }
}

console.log(rustMurderer(4, [[1, 2], [2, 3], [1, 4]], 1));
