const fs = require("fs");

type Graph = { [node: string]: string[] };

function part1(): number {
  const input = parseInput();
  const graph = buildGraph(input);
  return explorePathSimple(graph, {}, "start");
}

function part2(): number {
  const input = parseInput();
  const graph = buildGraph(input);
  return explorePathAdvanced(graph, {}, "start", false);
}

function explorePathSimple(
  graph: Graph,
  visited: { [node: string]: boolean },
  start: string
): number {
  visited[start] = true;
  let result = 0;
  for (const neighbour of graph[start]) {
    if (neighbour === "end") {
      result++;
      continue;
    }
    if (neighbour.toUpperCase() === neighbour || !visited[neighbour]) {
      result += explorePathSimple(graph, { ...visited }, neighbour);
    }
  }
  return result;
}

function explorePathAdvanced(
  graph: Graph,
  visited: { [node: string]: boolean },
  start: string,
  visitedSmallCaveTwice: boolean
): number {
  if (start.toUpperCase() !== start) {
    visited[start] = true;
  }

  let result = 0;
  for (const neighbour of graph[start]) {
    if (neighbour === "start") {
      continue;
    }
    if (neighbour === "end") {
      result++;
      continue;
    }

    if (
      neighbour.toUpperCase() === neighbour ||
      !visited[neighbour] ||
      !visitedSmallCaveTwice
    ) {
      result += explorePathAdvanced(
        graph,
        { ...visited },
        neighbour,
        visitedSmallCaveTwice || visited[neighbour]
      );
    }
  }

  return result;
}

function buildGraph(input: string[][]): Graph {
  const graph = {};
  for (const edge of input) {
    const from = edge[0];
    const to = edge[1];
    graph[from] = [...(graph[from] || []), to];
    graph[to] = [...(graph[to] || []), from];
  }
  return graph;
}

function parseInput(): string[][] {
  const input: string = fs.readFileSync("12-input.txt", "utf8");
  return input.split("\n").map((line) => line.split("-"));
}

console.log(part1());
console.log(part2());
