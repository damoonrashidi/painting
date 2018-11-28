import { randomHue } from './colors';

interface DistortOptions {
  coords: number[][];
  jitter: number;
  segments: number;
  height: number;
}

export function init(width: number, height: number): CanvasRenderingContext2D {
  document.body.innerHTML = '';
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = true;
  return ctx;
}

export function random(min: number = 0, max: number = 100, rounded = true) {
  return rounded
    ? Math.floor(Math.random() * (max - min) + min)
    : Math.random() * (max - min) + min;
}

export function middle([x1, y1]: number[], [x2, y2]: number[]): number[] {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

export const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2));

export function distort({
  coords,
  jitter,
  segments,
  height,
}: DistortOptions): number[][] {
  const distorted: number[][] = [];
  const WIDTH = coords[1][0];
  distorted.push(coords[0]);
  for (let i = 1; i <= segments; i++) {
    const x = (i * WIDTH) / segments;
    const y = distorted[i - 1][1] + random(-jitter, jitter) * Math.sin(i);
    distorted.push([x, y]);
  }
  distorted.push([WIDTH, height]);
  distorted.push([0, height]);
  return distorted;
}

export function paintGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  n: number
) {
  for (let i = 0; i < n; i++) {
    ctx.strokeStyle = randomHue(310, 350, 0.05);
    const x = (i * width) / n;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let i = 0; i < n * 1.5; i++) {
    ctx.strokeStyle = randomHue(310, 350, 0.05);
    const y = (i * height) / (n * 1.5);
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
}
