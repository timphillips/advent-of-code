type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

function part1(): number {
  const lines = parseInput();

  const matrix: number[][] = [];

  for (const line of lines) {
    if (line.start.x === line.end.x) {
      const x = line.start.x;
      const min = Math.min(line.start.y, line.end.y);
      const max = Math.max(line.start.y, line.end.y);
      for (let y = min; y <= max; y++) {
        if (!matrix[x]) {
          matrix[x] = [];
        }
        matrix[x][y] = (matrix[x][y] ?? 0) + 1;
      }
      continue;
    }

    if (line.start.y === line.end.y) {
      const y = line.start.y;
      const min = Math.min(line.start.x, line.end.x);
      const max = Math.max(line.start.x, line.end.x);
      for (let x = min; x <= max; x++) {
        if (!matrix[x]) {
          matrix[x] = [];
        }
        matrix[x][y] = (matrix[x][y] ?? 0) + 1;
      }
    }
  }

  return matrix.flat().filter((overlaps) => overlaps >= 2).length;
}

function parseInput(): Line[] {
  const fs = require("fs");

  const input: string = fs.readFileSync("5-input.txt", "utf8");

  return input.split("\n").map<Line>((line) => {
    const points = line.split(" -> ");

    const [ax, ay] = points[0].split(",");
    const [bx, by] = points[1].split(",");

    const start = { x: Number(ax), y: Number(ay) };
    const end = { x: Number(bx), y: Number(by) };

    return { start, end };
  });
}

console.log(part1());
