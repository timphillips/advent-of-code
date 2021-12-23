function part1(depths) {
    let count = 0;
    for (let i = 1; i < depths.length; i++) {
        if (depths[i - 1] < depths[i]) {
            count++;
        }
    }
    return count;
}

function part2(depths) {
    let count = 0;
    let previousSum;
    for (let i = 0; i < depths.length - 2; i++) {
        const newSum = depths[i] + depths[i + 1] + depths[i + 2];
        if (previousSum !== undefined && previousSum < newSum) {
            count++;
        }
        previousSum = newSum;
    }
    return count;
}

const fs = require('fs')
const input = fs.readFileSync('1-input.txt', 'utf8')
const parsedInput = input.split("\n").map(Number);

console.log(part1(parsedInput));
console.log(part2(parsedInput));
