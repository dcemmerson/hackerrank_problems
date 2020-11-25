function journeyToMoon(n, astronaut) {
    const people = [];
    for(let i = 0; i < n; i++) {
        people.push(new Person(i));
    }

    astronaut.forEach(pair => {
        const astroA = people[pair[0]];
        const astroB = people[pair[1]];
        const rootA = getRoot(astroA);
        const rootB = getRoot(astroB);
        
        if(rootA !== rootB) {
            rootA.prev = rootB;
            rootB.groupSize += rootA.groupSize;
        }
    });

    let combos = 0;
    let counter = 0;

    people.forEach(p => {
        if(p.prev === null) {
            combos += counter * p.groupSize;
            counter += p.groupSize;

        }
    });

    return combos;
}

function getRoot(astro) {
    while(astro.prev) {
        astro = astro.prev;
    }
    return astro;
}

class Person {
    constructor(index) {
        this.index = index;
        this.groupSize = 1;
        this.prev = null;
    }
}

console.log(journeyToMoon(5, [[0, 1], [2, 3], [0, 4]]));
console.log(journeyToMoon(4, [[0, 2]]));
