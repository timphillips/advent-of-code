const fs = require("fs");

interface Entry {
  signalPatterns: string[];
  outputValues: string[];
}

function part1(): number {
  return parseInput()
    .map((entry) => entry.outputValues)
    .flat()
    .filter(
      (signal) =>
        signal.length === 2 ||
        signal.length === 3 ||
        signal.length === 4 ||
        signal.length === 7
    ).length;
}

function parseInput(): Entry[] {
  const input: string = fs.readFileSync("8-input.txt", "utf8");
  return input.split("\n").map((line) => {
    const [signalPatterns, outputValues] = line.split(" | ");
    return {
      signalPatterns: signalPatterns.split(" "),
      outputValues: outputValues.split(" "),
    };
  });
}

console.log(part1());
// console.log(part2());
