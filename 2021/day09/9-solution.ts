const fs = require("fs");

function part1(): number {
  const grid = parseInput();
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  let riskSum = 0;

  for (let row = 0; row < gridHeight; row++) {
    for (let column = 0; column < gridWidth; column++) {
      const height = grid[row][column];
      const isLowPoint =
        (row === 0 || grid[row - 1][column] > height) &&
        (column === 0 || grid[row][column - 1] > height) &&
        (row === gridHeight - 1 || grid[row + 1][column] > height) &&
        (column === gridWidth - 1 || grid[row][column + 1] > height);

      if (isLowPoint) {
        riskSum += height + 1;
      }
    }
  }

  return riskSum;
}

function part2(): number {
  const grid = parseInput();

  let basins: number[] = [];
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[0].length; column++) {
      const basin = exploreBasin(row, column, grid);
      basins.push(basin);
    }
  }

  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, value) => sum * value, 1);
}

function exploreBasin(
  row: number,
  column: number,
  grid: number[][]
): number | undefined {
  // Out of range
  if (row < 0 || column < 0 || row >= grid.length || column >= grid[0].length) {
    return 0;
  }

  // Already visited or not applicable
  if (grid[row][column] === -1 || grid[row][column] === 9) {
    return 0;
  }

  grid[row][column] = -1;

  return (
    1 +
    exploreBasin(row - 1, column, grid) +
    exploreBasin(row + 1, column, grid) +
    exploreBasin(row, column - 1, grid) +
    exploreBasin(row, column + 1, grid)
  );
}

function parseInput(): number[][] {
  const input: string = fs.readFileSync("9-input.txt", "utf8");
  return input.split("\n").map((line) => line.split("").map(Number));
}

console.log(part1());
console.log(part2());
