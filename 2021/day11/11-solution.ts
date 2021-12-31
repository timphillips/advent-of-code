const fs = require("fs");

function part1(): number {
  const grid = parseInput();

  const height = grid.length;
  const width = grid[0].length;

  let flashes = 0;

  for (let step = 0; step < 100; step++) {
    let increments: { row: number; column: number }[] = [];
    for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
        grid[row][column] = grid[row][column] + 1;
        if (grid[row][column] > 9) {
          increments.push({ row, column });
        }
      }
    }

    while (increments.length) {
      const newIncrements: { row: number; column: number }[] = [];
      for (const { row, column } of increments) {
        if (grid[row][column] === -1) {
          continue;
        }

        grid[row][column] = grid[row][column] + 1;
        if (grid[row][column] > 9) {
          flashes++;
          grid[row][column] = -1;
          newIncrements.push(...getNeighbours(row, column, width, height));
        }
      }
      increments = newIncrements;
    }

    for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
        if (grid[row][column] === -1) {
          grid[row][column] = 0;
        }
      }
    }
  }

  return flashes;
}

function getNeighbours(
  row: number,
  column: number,
  width: number,
  height: number
): { row: number; column: number }[] {
  const neighbours = [];
  const leftEdge = column <= 0;
  const topEdge = row <= 0;
  const rightEdge = column >= width - 1;
  const bottomEdge = row >= height - 1;

  if (!leftEdge && !topEdge) {
    neighbours.push({ row: row - 1, column: column - 1 });
  }
  if (!topEdge) {
    neighbours.push({ row: row - 1, column });
  }
  if (!rightEdge && !topEdge) {
    neighbours.push({ row: row - 1, column: column + 1 });
  }
  if (!rightEdge) {
    neighbours.push({ row, column: column + 1 });
  }
  if (!rightEdge && !bottomEdge) {
    neighbours.push({ row: row + 1, column: column + 1 });
  }
  if (!bottomEdge) {
    neighbours.push({ row: row + 1, column });
  }
  if (!leftEdge && !bottomEdge) {
    neighbours.push({ row: row + 1, column: column - 1 });
  }
  if (!leftEdge) {
    neighbours.push({ row, column: column - 1 });
  }
  return neighbours;
}

function parseInput(): number[][] {
  const input: string = fs.readFileSync("11-input.txt", "utf8");
  return input.split("\n").map((line) => line.split("").map(Number));
}

console.log(part1());
