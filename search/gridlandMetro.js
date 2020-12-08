function gridlandMetro(n, m, k, track) {
    const trackMap = arrToSquashedMap(track);
    let count = BigInt(m * n);
    let subtract = 0;
    trackMap.forEach((tracks/*, key*/) => {
        // let currCount = m;
        for(let i = 0; i < tracks.length; i++) {
            const currTrack = tracks[i];
            subtract += (currTrack[2] - currTrack[1] + 1);
        }
    });

    return Number(count - BigInt(subtract));
}


function arrToSquashedMap(tracks) {
    const map = new Map();

    tracks.forEach(addTrack => {
        if(!map.get(addTrack[0])) {
            map.set(addTrack[0], []);
            map.get(addTrack[0]).push(addTrack);
        }
        else {
            const tracks = map.get(addTrack[0]);
            const squashedTracks = [];
            let leftIndex = Number.MAX_SAFE_INTEGER;
            let rightIndex = -1;
            let ignoreAddTrack = false;
            for(let i = 0; i < tracks.length; i++) {
                const currTrack = tracks[i];
                if(addTrack[1] <= currTrack[1] && addTrack[2] >= currTrack[1]) {
                    leftIndex = Math.min(leftIndex, addTrack[1]);
                    rightIndex = Math.max(rightIndex, addTrack[2], currTrack[2]);
                }
                else if(addTrack[1] <= currTrack[2] && addTrack[2] >= currTrack[2]) {
                    rightIndex = Math.max(rightIndex, addTrack[2]);
                    leftIndex = Math.min(leftIndex, addTrack[1], currTrack[1]);
                }
                else if(addTrack[1] >= currTrack[1] && addTrack[2] <= currTrack[2]) {
                    // ignore addTrack, but keep currTrack - add track is inside currTrack
                    squashedTracks.push(currTrack);
                    ignoreAddTrack = true;
                }
                else {
                    squashedTracks.push(currTrack);
                }
            }

            if(rightIndex !== -1) {
                squashedTracks.push([addTrack[0], leftIndex, rightIndex]);
            }
            else if(!ignoreAddTrack) {
                squashedTracks.push(addTrack);
            }
            map.set(addTrack[0], squashedTracks);

        }

    });

    return map;
}

console.log(gridlandMetro(4, 4, 3, [[2, 2, 3], [3, 1, 4], [4, 4, 4],[4, 4, 4]]));
console.log(gridlandMetro(1, 5, 3, [[1, 1, 2], [1, 2, 4], [1, 3, 5]]));
// console.log(gridlandMetro(3, 7, 4, [[1, 1, 3], [2, 2, 2], [3, 1, 6], [3, 6, 6]]));
console.log(gridlandMetro(2, 9, 3, [[2, 1, 5], [2, 2, 4], [2, 8, 8]]));
console.log(gridlandMetro(2, 9, 3, [[2, 2, 4], [2, 1, 5], [2, 8, 8]]));


