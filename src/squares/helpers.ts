import { randomHue } from './colors';

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

export const middle = ([x1, y1]: number[], [x2, y2]: number[]): number[] => [
  (x1 + x2) / 2,
  (y1 + y2) / 2,
];

export function distort(
  points: number[][],
  jitter = 5,
  iteration = 0
): number[][] {
  let newPoints: number[][] = [];
  points.forEach((point, i) => {
    newPoints.push(point);
    const [x, y] = middle(points[i], points[i + 1] || points[0]);
    newPoints.push([x + random(-jitter, jitter), y + random(-jitter, jitter)]);
  });
  return iteration > 3 ? points : distort(newPoints, jitter, iteration + 1);
}

export function createPyramid(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  depth: number = 5,
  color: number = 210
) {
  if (depth === 0) {
    return;
  }
  const size = depth * 10;
  const path = new Path2D();
  let points = [
    [x, y],
    [x + size, y],
    [x + size, y + size],
    [x, y + size],
  ] as number[][];

  points = distort(points, 1, 1);

  points.forEach(point => {
    path.lineTo(point[0], point[1]);
  });

  path.closePath();
  ctx.strokeStyle = randomHue(color, color + 50, 70, 40);
  ctx.stroke(path);
  createPyramid(ctx, x + 5, y + 5, depth - 1, color + 20);
}
