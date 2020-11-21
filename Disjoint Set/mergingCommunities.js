function processData(input) {
    const n = input[0][0];
    const queryCount = input[0][1];

    const community = [];
    for(let i = 0; i < n; i++) {
        community.push(new Person(i));
    }

    for(let i = 1; i < queryCount + 1; i++) {
        const queryType = input[i][0];

        if(queryType === 'Q') {
            console.log(getCommunitySizeOf(community[input[i][1] - 1]));
        }
        else {
            // queryType === 'M'
            mergeCommunities(community[input[i][1] - 1], community[input[i][2] - 1]);
        }
    }

} 

function mergeCommunities(personA, personB) {
    const personARoot = getRootPerson(personA);
    const personBRoot = getRootPerson(personB);

    if(personARoot.index !== personBRoot.index) {
        // Then these people are of separate communities and we need to merge the two.
        personARoot.prev = personBRoot;
        personBRoot.communitySize += personARoot.communitySize;
    }
}

function getRootPerson(person) {
    while(person.prev !== null) {
        person = person.prev;
    }

    return person;
}

function getCommunitySizeOf(person) {
    while(person.prev !== null) {
        person = person.prev;
    }

    return person.communitySize;
}

class Person {
    constructor(index) {
        this.index = index;
        this.prev = null;
        this.communitySize = 1;
    }
}

processData([[3, 6], ['Q', 1], ['M', 1, 2], ['Q', 2], ['M', 2, 3], ['Q', 3], ['Q', 2]]);
