function jeanisRoute(k, roads) {
    const graph = new Graph(roads);

    graph.calcMstContainingSubset(k);
    const width = graph.calcWidth();
    const mstWeight = graph.calcMstWeight();

    return 2 * mstWeight - width;


}

class Graph {
    constructor(roads) {
        this.vertices = [];

        for(let i = 0; i < roads.length + 1; i++) {
            this.vertices.push(new Vertex(i));
        }

        roads.forEach(e => {
            const vertexA = this.vertices[e[0] - 1];
            const vertexB = this.vertices[e[1] - 1];
            const weight = e[2];

            const edge = new Edge(vertexA, vertexB, weight);
            vertexA.addEdge(edge);
            vertexB.addEdge(edge);
        });
    }

    calcMstWeight() {
        // Do a bfs on this.vertices, which should be the minimum spanning sub-tree,
        // keeping track of weight of tree, return this weight.
        let subtreeWeight = 0;

        this.resetFoundVisitedDistance();
        
        const queue = [];

        const startVertex = this.vertices[0];
        startVertex.found = true;

        queue.push(startVertex);

        while(queue.length > 0) {
            const curr = queue.shift();
            curr.edges.forEach(e => {
                if(!e.vertexA.found) { 
                    e.vertexA.found = true;
                    subtreeWeight += e.weight;
                    queue.push(e.vertexA);

                }
                else if(!e.vertexB.found) {
                    e.vertexB.found = true;
                    subtreeWeight += e.weight;
                    queue.push(e.vertexB);
                }
            });
        }

        return subtreeWeight;
    }

    resetFoundVisitedDistance() {
        this.vertices.forEach(v => {
            v.found = false; 
            v.visited = false;
            v.distance = 0;
        });
    }

    calcWidth() {
        const leafVertex = this.bfsWidth(this.vertices[0]);
        this.resetFoundVisitedDistance();
        return this.bfsWidth(leafVertex).distance;
    }

    bfsWidth(startVertex) {
        const queue = [];
        startVertex.found = true;

        queue.push(startVertex);
        let lastNodeFound = startVertex;
        while(queue.length > 0) {
            const curr = queue.shift();
            lastNodeFound = curr;

            curr.edges.forEach(e => {
                const vertexA = e.vertexA;
                const vertexB = e.vertexB;

                if(!vertexA.found) {
                    vertexA.found = true;
                    vertexA.distance = curr.distance + e.weight;
                    queue.push(vertexA);
                }
                else if(!vertexB.found) {
                    vertexB.found = true;
                    vertexB.distance = curr.distance + e.weight;
                    queue.push(vertexB);
                }
            });
        }

        return lastNodeFound;
    }

    // Note this is not the conventional Kruskal's or Prims' MST.
    calcMstContainingSubset(letterCities) {
        const nonLetterCities = [];

        // Load up nonLetterCities with each city that doesnt have a letter
        // needing to be delivered.
        this.vertices.forEach(v => {
            if(letterCities.indexOf(v.index + 1) === -1) {
                nonLetterCities.push(v);
            }
        });

        let additionalCitiesToRemove = true;
        while(additionalCitiesToRemove) {
            additionalCitiesToRemove = false;
            let i = 0;
            const endI = nonLetterCities.length;
            while(i < endI) {
                const currCity = nonLetterCities.shift();

                if(currCity.edges.length > 1) {
                    nonLetterCities.push(currCity);
                }
                else { // This city has one edge.
                    // Then get rid of currCity and update the one adjacent city's edge list.
                    additionalCitiesToRemove = true;

                    const currEdge = currCity.edges[0];
                    if(currEdge.vertexA !== currCity) {
                        const indexToRemove = currEdge.vertexA.edges.indexOf(currEdge);
                        currEdge.vertexA.edges.splice(indexToRemove, 1);
                    }
                    else {
                        const indexToRemove = currEdge.vertexB.edges.indexOf(currEdge);
                        currEdge.vertexB.edges.splice(indexToRemove, 1);
                    }
                }
                i++;
            }
        }

        // Now return list of vertices with all cities in this minimum spanning subtree.
        const mst = [];

        for(let i = 0; i < letterCities.length; i++) {
            mst.push(this.vertices[letterCities[i] - 1]);
        }
        for(let i = 0; i < nonLetterCities.length; i++) {
            mst.push(this.vertices[nonLetterCities[i].index]);
        }

        this.vertices = mst;
        return mst;
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
        this.edges = [];
        this.found = false;
        this.visited = false;
        this.distance = 0;
    }

    addEdge(edge) {
        this.edges.push(edge);
    }
}

console.log(jeanisRoute([1, 3, 4], [[1, 2, 1], [2, 3, 2], [2, 4, 2], [3, 5, 3]]));
