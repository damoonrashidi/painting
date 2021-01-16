import { makeNoise2D } from 'open-simplex-noise';

import { init } from '../lib';
import { HeatMap, nextGeneration, paintMap } from './helpers';

const noise2d = makeNoise2D(111);
const [WIDTH, HEIGHT] = [2000, 2000];
const PIXEL = WIDTH * 0.01;
const GRID = WIDTH / PIXEL;
// const [WIDTH, HEIGHT] = [11811, 17717];

function paint(ctx: CanvasRenderingContext2D) {
  const heatMap: HeatMap = [];
  for (let y = 0; y < GRID; y++) {
    heatMap[y] = [];
    for (let x = 0; x < GRID; x++) {
      const n = Math.abs(noise2d(x + PIXEL / 2, y + PIXEL / 2));
      heatMap[y][x] = n;
    }
  }
  paintMap(ctx, heatMap, PIXEL);

  animate(ctx, heatMap);
}

function animate(
  ctx: CanvasRenderingContext2D,
  map: HeatMap,
  stop: number = 100
): void {
  paintMap(ctx, map, PIXEL);

  if (stop > 0) {
    requestAnimationFrame(() => {
      animate(ctx, nextGeneration(map), stop - 1);
    });
  }
}

setTimeout(() => {
  console.clear();
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
