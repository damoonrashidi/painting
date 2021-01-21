import { map } from '../lib';

export type HeatMap = number[][];

export function paintMap(
  ctx: CanvasRenderingContext2D,
  map: HeatMap,
  pixelSize: number
): void {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      ctx.fillStyle = getColor(map[y][x]);
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
}

function getColor(value: number): string {
  const colors = ['#000', '#fff000', '#f00', '#00aaff', '#00f', '#fff'];

  const index = Math.round(map(value, 0, 1, 0, 5));

  return colors[index];
}

export function getAdjacent(x: number, y: number, map: HeatMap): number[] {
  const nodes: number[] = [];

  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      const isInbound = i >= 0 && i < map.length && j >= 0 && j < map[i].length;
      const isNode = i === y && j === x;
      if (isInbound && !isNode) {
        nodes.push(map[i][j]);
      }
    }
  }
  return nodes;
}

export function nextGeneration(map: HeatMap): HeatMap {
  const next: HeatMap = [];

  for (let y = 0; y < map.length; y++) {
    next[y] = map[y];
    for (let x = 0; x < map[y].length; x++) {
      // const neighbours = getAdjacent(x, y, map);

      // const average = neighbours.reduce((a, b) => a + b, 0) / 9;

      next[y][x] -= 0.01;
    }
  }

  return next;
}
