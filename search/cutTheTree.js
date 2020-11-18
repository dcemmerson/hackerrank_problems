function cutTheTree(data, edges) {
    // Write your code here
    const graph = new Graph(data, edges);
    graph.calcTotalWeight();
    graph.resetGraph();
    return graph.findOptimalCutDifference();

}

class Graph {
    constructor(v, e) {
        this.vertices = [];
        this.edges = [];

        for(let i = 0; i < v.length; i++) {
            this.vertices.push(new Vertex(v[i], i));
        }

        e.forEach(edge => {
            const v1 = edge[0];
            const v2 = edge[1];
            const vertex1 = this.vertices[v1 - 1];
            const vertex2 = this.vertices[v2 - 1];
            vertex1.addEdge(vertex2);
            vertex2.addEdge(vertex1);
        });
    }

    findOptimalCutDifference() {
        this.minCut = Number.MAX_SAFE_INTEGER;
        const startVertex = this.vertices[0];
        startVertex.found = true;
        this.dfs(startVertex);
        // this.dfs();
        return this.minCut;
    }

    dfs(startVertex) {
        const stack = [];

        stack.push(startVertex);

        while(stack.length) {
            if(stack[stack.length - 1].hasNext()) {
                // const currNode = stack[stack.length - 1];
                const nextNode = stack[stack.length - 1].next();
                // nextNode.prevNode = currNode;
                nextNode.found = true;
                stack.push(nextNode);
            }
            else {
                const curr = stack.pop();
                curr.visited = true;
                const subTreeSum = curr.edges.reduce((acc, v) => {
                    if(v.visited) {
                        return acc + v.below;
                    }
                    else {
                        return acc;
                    }
                }, 0);
                curr.below = subTreeSum + curr.value;
                const parentTreeSum = this.totalWeight - curr.below;
                if(Math.abs(curr.below - parentTreeSum) < this.minCut) {
                    this.minCut = Math.abs(curr.below - parentTreeSum);
                }
            }
        }
    }

    // Recursive solution works correctly, but on deep graphs, we get a recursion depth error.
    // dfs(currVertex) {

    //     const subTreeSums = [];
    //     currVertex.edges.forEach(v => {
    //         if(!v.found) {
    //             v.found = true;
    //             subTreeSums.push(this.dfs(v));
    //         }
    //     });
        
    //     currVertex.visited = true;
        
    //     // Check if any of the subtrees are the optimal cut locations.
    //     subTreeSums.forEach(sum => {
    //         const parentTreeSum = this.totalWeight - sum;
    //         const currDiff = Math.abs(parentTreeSum - sum);
    //         if(currDiff < this.minCut) {
    //             this.minCut = currDiff;
    //         }
    //     });
        
    //     // Sum up weight of subtrees and return that value.
    //     return subTreeSums.reduce((acc, curr) => acc + curr, 0) + currVertex.value;
    // }

    resetGraph() {
        this.vertices.forEach(v => {
            v.found = false;
            v.visited = false;
        });
    }

    calcTotalWeight() {
        const queue = [];
        const firstVertex = this.vertices[0];
        firstVertex.found = true;
        queue.push(firstVertex);

        let sum = 0;
        while(queue.length > 0) {
            const curr = queue.shift();
            curr.visited = true;
            sum += curr.value;

            curr.edges.forEach(v => {
                if(!v.found) {
                    v.found = true;
                    queue.push(v);
                }
            });
        }

        this.totalWeight = sum;
    }
}

class Vertex {
    constructor(value, index) {
        this.index = index;
        this.value = value;
        this.found = false;
        this.visited = false;
        this.below = 0;
        this.visitedCount = 0;
        this.prevNode = null;
        this.edges = [];
    }

    addEdge(v) {
        this.edges.push(v);
    }

    hasNext() {
        let remainingEdges = 0;
        this.edges.forEach(e => {
            if(!e.found) {
                remainingEdges++;
            }
        });
        return remainingEdges > 0 ? true : false;
    }

    next() {
        for(let i = 0; i < this.edges.length; i++) {
            if(!this.edges[i].found) {
                return this.edges[i];
            }
        }

        return null;
    }
}

console.log(cutTheTree([100, 200, 100, 500, 100, 600], [[1, 2], [2, 3], [2, 5], [4, 5], [5, 6]]));
