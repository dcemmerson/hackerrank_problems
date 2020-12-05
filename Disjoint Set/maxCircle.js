function maxCircle(queries) {
    const dj = new DisjointSet();
    const maxes = [];
    let currMax = 0;

    queries.forEach(q => {
        dj.makeSetIfNotExists(q[0]);
        dj.makeSetIfNotExists(q[1]);

        dj.union(q[0], q[1]);
        currMax = Math.max(currMax, dj.getCount(q[0]));
        maxes.push(currMax);
    });

    return maxes;
}

class DisjointSet {
    constructor() {
        this.map = new Map();
    }

    getCount(index) {
        return this.findSet(this.map.get(index)).count;
    }

    makeSetIfNotExists(index) {
        if(!this.map.get(index)) {
            this.map.set(index, new Node());
        }
    }

    findSet(node) {
        if(node.parent === node) {
            return node;
        }

        node.parent = this.findSet(node.parent);

        return node.parent;
    }

    union(index1, index2) {
        const node1 = this.map.get(index1);
        const node2 = this.map.get(index2);

        const parent1 = this.findSet(node1);
        const parent2 = this.findSet(node2);

        if(parent1 !== parent2) {
            if(parent1.rank > parent2.rank) {
                parent1.count += parent2.count;
                parent2.parent = parent1;
            } else if(parent1.rank < parent2.rank) {
                parent2.count += parent1.count;
                parent1.parent = parent2;
            }
            else {
                // Equal ranks
                parent2.count += parent1.count;
                parent1.parent = parent2;

                parent2.rank++;
            }
        }
    }
}

class Node {
    constructor() {
        this.rank = 0;
        this.parent = this;
        this.count = 1;
    }
}

// console.log(maxCircle([[1, 2], [3, 4], [2, 3]]));
console.log(maxCircle([[6, 4], [5, 9], [8, 5], [4, 1], [1, 5], [7, 2], [4, 2], [7, 6]]));
