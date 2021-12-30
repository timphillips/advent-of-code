type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

function part1(): number {
  const lines = parseInput();

  const overlaps: { [key: string]: number } = {};

  for (const line of lines) {
    if (line.start.x === line.end.x) {
      const x = line.start.x;
      const min = Math.min(line.start.y, line.end.y);
      const max = Math.max(line.start.y, line.end.y);
      for (let y = min; y <= max; y++) {
        const key = `${x}|${y}`;
        overlaps[key] = (overlaps[key] ?? 0) + 1;
      }
      continue;
    }

    if (line.start.y === line.end.y) {
      const y = line.start.y;
      const min = Math.min(line.start.x, line.end.x);
      const max = Math.max(line.start.x, line.end.x);
      for (let x = min; x <= max; x++) {
        const key = `${x}|${y}`;
        overlaps[key] = (overlaps[key] ?? 0) + 1;
      }
    }
  }

  return Object.values(overlaps).filter((count) => count >= 2).length;
}

function part2(): number {
  const lines = parseInput();

  const points: Point[] = [];

  for (const line of lines) {
    let x = line.start.x;
    let y = line.start.y;
    while (true) {
      points.push({ x, y });

      if (x === line.end.x && y === line.end.y) {
        break;
      }

      if (x < line.end.x) {
        x++;
      } else if (x > line.end.x) {
        x--;
      }

      if (y < line.end.y) {
        y++;
      } else if (y > line.end.y) {
        y--;
      }
    }
  }

  const overlaps: { [key: string]: number } = {};
  for (const point of points) {
    const key = `${point.x}|${point.y}`;
    overlaps[key] = (overlaps[key] ?? 0) + 1;
  }

  return Object.values(overlaps).filter((count) => count >= 2).length;
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

console.log("Part 1:", part1());
console.log("Part 2:", part2());
