//  1. Set counter = 0
//  2. Iterate from through string
//  3. Set curr letter equal to str[i]
//  4. for char in a to z
//      a. if subsequence exists, such that (s[i], char, char, s[i])
//          add one to count
// To find subsequence:
//  1. Use variation of longest common subsequence
function shortPalindrome(s) {
    let count = 0;
    for(let j = 0; j < s.length; j++) {
        const currSubstring = s.substring(j, s.length);
        for(let i = 0; i < 26; i++) {
            const currChar = String.fromCharCode(i + 97);
            count += subsequenceCount(`${currChar}${currChar}${currSubstring[0]}`, currSubstring.substring(1, s.length));
            // if(subsequenceExists(`${currChar}${currChar}${currSubstring[0]}`, currSubstring.substring(1, s.length))) {
            //     count++;
            // }
        }
    }
    return count;
}

// function subsequenceCount(seq, str) {
//     const tally = [];

//     for(let i = 0; i < str.length; i++) {
//         for(let n = 0; n < tally.length; n++) {
//             if(seq[tally[n]] === str[i]) {
//                 tally[n]++;
//             }
//             // if(str[i] === seq[tally[n][tally[n].length - 1].length]) {
//             //     tally[n] = tally[n] + str[i];
//             // }
//         }

//         if(str[i] === seq[0]) {
//             tally.push(1);
//         }
//     }

//     return tally.reduce((acc, curr) => curr >= 3 ? acc + 1 : acc, 0);
// }

// lcs:
// lcs[0][i] = 0
// lcs[j][0] = 0
// lcs[j][i] = lcs[j - 1][i - 1] + 1, if s1[i] === s2[j]
// lcs[j][i] = Math.max(lcs[j][i - 1], lcs[j - 1][i]), if s1[i] !== s2[j]
function subsequenceExists(seq, str) {
    const dp = new Array(seq.length + 1);
    for(let j = 0; j < dp.length; j++) {
        dp[j] = new Array(str.length + 1);
        dp[j][0] = 0;
    }
    for(let i = 0; i < dp[0].length; i++) {
        dp[0][i] = 0;
    }

    for(let j = 1; j < dp.length; j++) {
        for(let i = 1; i < dp[0].length; i++) {
            if(seq[j - 1] === str[i - 1]) {
                dp[j][i] = dp[j - 1][i - 1] + 1;
            }
            else {
                dp[j][i] = Math.max(dp[j - 1][i], dp[j][i - 1]);
            }
        }
    }

    // seq.length should always be 3 for this problem, swith we are 
    // finding subsequence of the last three letters of the four letter
    // sets.
    return dp[seq.length][str.length] === seq.length;
}

console.log(shortPalindrome('aabbaa'));
