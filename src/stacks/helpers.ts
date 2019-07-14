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

export function createStack(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  flip: boolean,
  color: string
) {
  const STACK_WIDTH = 20;
  const STACK_HEIGHT = 30;
  const xPadding = random(0, 2);

  let points: number[][] = [];

  const region = new Path2D();
  if (flip) {
    points = [
      [x + xPadding, y + STACK_HEIGHT / 2],
      [x + STACK_WIDTH, y],
      [x + STACK_WIDTH, y + STACK_HEIGHT / 2],
      [x + xPadding, y + STACK_HEIGHT],
      [x + xPadding, y + STACK_HEIGHT / 2],
    ] as number[][];
  } else {
    points = [
      [x + xPadding, y],
      [x + STACK_WIDTH, y + STACK_HEIGHT / 2],
      [x + STACK_WIDTH, y + STACK_HEIGHT],
      [x + xPadding, y + STACK_HEIGHT / 2],
      [x + xPadding, y + STACK_HEIGHT],
    ] as number[][];
  }

  if (random(0, 100) > 50) {
    points = distort(points, 1, 1);
  }

  region.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length - 1; i++) {
    region.lineTo(points[i][0], points[i][1]);
  }
  region.closePath();

  ctx.fillStyle = color;
  region.closePath();
  ctx.fill(region);
}
