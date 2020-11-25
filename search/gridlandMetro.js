function gridlandMetro(n, m, k, track) {
    const trackMap = arrToMap(track);
    let count = 0;
    for(let j = 0; j < m; j++) {
        
        if(!track[0]) {
            // If there are no more tracks, take shortcut to sum
            // upremaining rows.
            count += (m - j) * n;
            j = m;
        }
        else if(trackMap.get(j + 1)) {
            const currTracks = trackMap.get(j + 1);
            const countFilled = countWithSquashedTracks(currTracks, n);
            // const countFilled = squashedTracks.reduce((acc, curr) => acc + (curr[2] - curr[1]), 0);
            count += n - countFilled;
        }
        else {
            count += n;
        }
    }

    return count;
}

function countWithSquashedTracks(tracks, n) {
    let count = 0;

    for(let j = 0; j < tracks.length; j++) {
        const currTrack = tracks[j];
        let left = currTrack[1];
        let right = currTrack[2];

        for(let i = 0; i < j - 1; i++) {
            if(left > tracks[i][1] && left < tracks[i][2]) {
                left = tracks[i][2];
            }
            if(right > tracks[i][1] && right < tracks[i][2]) {
                left = tracks[i][2];
            }
        }
    }

    return count;
}

function arrToMap(tracks) {
    const map = new Map();

    tracks.forEach(tr => {
        if(!map.get(tr[0])) {
            map.set(tr[0], []);
        }

        map.get(tr[0]).push(tr);
    });

    return map;
}

console.log(gridlandMetro(4, 4, 3, [[2, 2, 3], [3, 1, 4], [4, 4, 4]]));
console.log(gridlandMetro(1, 5, 3, [[1, 1, 2], [1, 2, 4], [1, 3, 5]]));

