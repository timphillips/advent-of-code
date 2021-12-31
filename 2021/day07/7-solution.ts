const fs = require("fs");

function part1(): number {
  const crabs = parseInput();
  const maxPosition = Math.max(...crabs);

  let min = Infinity;
  for (let position = 0; position <= maxPosition; position++) {
    const fuel = crabs.reduce(
      (sum, crab) => sum + Math.abs(crab - position),
      0
    );

    if (fuel < min) {
      min = fuel;
    }
  }

  return min;
}

function part2(): number {
  const crabs = parseInput();
  const maxPosition = Math.max(...crabs);

  let min = Infinity;
  for (let position = 0; position <= maxPosition; position++) {
    const fuel = crabs.reduce((sum, crab) => {
      const distance = Math.abs(crab - position);
      for (let i = 1; i <= distance; i++) {
        sum += i;
      }
      return sum;
    }, 0);

    if (fuel < min) {
      min = fuel;
    }
  }

  return min;
}

function parseInput(): number[] {
  const input: string = fs.readFileSync("7-input.txt", "utf8");
  return input.split(",").map(Number);
}

console.log(part1());
console.log(part2());
