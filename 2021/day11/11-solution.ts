const fs = require("fs");

type Coordinate = { row: number; column: number };

function part1(): number {
  const grid = parseInput();

  const height = grid.length;
  const width = grid[0].length;

  let flashes = 0;

  for (let step = 0; step < 100; step++) {
    let increments: Coordinate[] = [];
    for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
        grid[row][column] = grid[row][column] + 1;
        if (grid[row][column] > 9) {
          increments.push({ row, column });
        }
      }
    }

    while (increments.length) {
      const newIncrements: Coordinate[] = [];
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

function part2(): number {
  const grid = parseInput();

  const height = grid.length;
  const width = grid[0].length;

  let step = 0;

  while (true) {
    step++;

    let increments: Coordinate[] = [];
    for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
        grid[row][column] = grid[row][column] + 1;
        if (grid[row][column] > 9) {
          increments.push({ row, column });
        }
      }
    }

    while (increments.length) {
      const newIncrements: Coordinate[] = [];
      for (const { row, column } of increments) {
        if (grid[row][column] === -1) {
          continue;
        }

        grid[row][column] = grid[row][column] + 1;
        if (grid[row][column] > 9) {
          grid[row][column] = -1;
          newIncrements.push(...getNeighbours(row, column, width, height));
        }
      }

      increments = newIncrements;
    }

    let flashes = 0;
    for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
        if (grid[row][column] === -1) {
          flashes++;
          grid[row][column] = 0;
        }
      }
    }

    if (flashes === width * height) {
      return step;
    }
  }
}

function getNeighbours(
  row: number,
  column: number,
  width: number,
  height: number
): { row: number; column: number }[] {
  const neighbours = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return neighbours
    .map(([rowAdjustment, columnAdjustment]) => {
      return {
        row: row + rowAdjustment,
        column: column + columnAdjustment,
      };
    })
    .filter(({ row, column }) => {
      return row >= 0 && row < height && column >= 0 && column < width;
    });
}

function parseInput(): number[][] {
  const input: string = fs.readFileSync("11-input.txt", "utf8");
  return input.split("\n").map((line) => line.split("").map(Number));
}

console.log(part1());
console.log(part2());
