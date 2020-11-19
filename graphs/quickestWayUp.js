
function quickestWayUp(ladders, snakes) {
    const graph = new Graph(10, ladders, snakes);

    return graph.quickestWayUp();

}

class Graph {
    constructor(n, ladders, snakes) {
        this.vertices = [];
        for(let i = 0; i < n * n; i++) {
            this.vertices.push(new Vertex(i))
        }

        ladders.forEach(edge => {
            const startVertex = this.vertices[edge[0] - 1];
            const endVertex = this.vertices[edge[1] - 1];
            startVertex.addEdge(endVertex);
        });

        snakes.forEach(edge => {
            const startVertex = this.vertices[edge[0] - 1];
            const endVertex = this.vertices[edge[1] - 1];
            startVertex.addEdge(endVertex);
        });
    }

    quickestWayUp() {
        const queue = []; // Use shift and push to simulate queue.
        const startVertex = this.vertices[0];
        startVertex.found = true;
        startVertex.distance = 0;
        queue.push(startVertex);

        while(queue.length > 0) {
            const currVertex = queue.shift();
            currVertex.visited = true;

            const currIndex = currVertex.index;
            for(let i = 0; i < 6; i++) {
                if(currIndex + i + 1 < 100) {
                    const nextVertex = this.vertices[currIndex + i + 1];
                    // const nextVertexHasSnake = nextVertex.edges.reduce((acc, toV) => toV.index < nextVertex.index ? true : acc , false)

                    if(!nextVertex.visited && !nextVertex.found) {
                        nextVertex.found = true;
                        nextVertex.distance = currVertex.distance + 1;
                        if(nextVertex.edges.length > 0) {
                            nextVertex.edges.forEach(v => {
                                if(!v.found && !v.visited) {
                                    v.found = true;
                                    v.distance = currVertex.distance + 1;
                                    queue.push(v);
                                }
                            });
                        }
                        else {
                            queue.push(nextVertex);
                        }
                    }
                }
            }
            // currVertex.edges.forEach(v => {
            //     if(!v.visited && !v.found) {
            //         v.found = true;
            //         v.distance = currVertex.distance;
            //         queue.push(v);
            //     }
            // });

        }

        return this.vertices[this.vertices.length - 1].distance;
    }
}

class Vertex {
    constructor(index) {
        this.index = index;
        this.distance = -1;
        this.edges = [];
        this.found = false;
        this.visited = false;
    }
    addEdge(toVertex) {
        this.edges.push(toVertex);
    }
}

console.log(quickestWayUp([[32, 62], [42, 68], [12, 98]], [[95, 13], [97, 25], [93, 37], [79, 27], [75, 19], [49, 47], [67, 17]]));
console.log(quickestWayUp([[3, 90]], [[99, 10], [97, 20], [98, 30], [96, 40], [95, 50], [94, 60], [93, 70]]));

// 2
// 3
// 32 62
// 42 68
// 12 98
// 7
// 95 13
// 97 25
// 93 37
// 79 27
// 75 19
// 49 47
// 67 17
// 4
// 8 52
// 6 80
// 26 42
// 2 72
// 9
// 51 19
// 39 11
// 37 29
// 81 3
// 59 5
// 79 23
// 53 7
// 43 33
// 77 21