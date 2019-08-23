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

export function middle([x1, y1]: number[], [x2, y2]: number[]): number[] {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

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
  return iteration > 5 ? points : distort(newPoints, jitter, iteration + 1);
}

export function rotateRandomlyAroundCenter(
  ctx: CanvasRenderingContext2D,
  model: number[][]
) {
  const point = middle(model[0], model[Math.round(model.length / 2)]);
  ctx.translate(point[0] + random(-100, 100), point[1] + random(-100, 100));
  ctx.rotate((random(-180, 180) * Math.PI) / 180);
  ctx.translate(-point[0] + random(-100, 100), -point[1] + random(-100, 100));
  ctx.moveTo(model[0][0], model[0][1]);
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
