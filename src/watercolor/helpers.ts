import { randomFloat, Vector2D, randomHue, randomInt } from '../lib';

export function middle([x1, y1]: Vector2D, [x2, y2]: Vector2D): Vector2D {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

function distortPoint(
  ctx: CanvasRenderingContext2D,
  [x1, y1]: Vector2D,
  [x2, y2]: Vector2D
): Vector2D {
  const [cx, cy] = middle([x1, y1], [x2, y2]);
  let radians = (randomInt(-100, 100) * Math.PI) / 180;

  // if (y2 > y1) {
  //   radians = (randomFloat(40, 50) * Math.PI) / 180;
  // }

  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = cos * (x1 - cx) + sin * (y1 - cy) + cx;
  const ny = cos * (y1 - cy) - sin * (x1 - cx) + cy;
  return [nx, ny];
}

export function distort(
  ctx: CanvasRenderingContext2D,
  shape: Vector2D[]
): Vector2D[] {
  const distorted: Vector2D[] = [];
  for (let i = 0; i < shape.length; i++) {
    const point = shape[i];
    const next = shape[i + 1] ? shape[i + 1] : shape[0];

    const [x, y] = distortPoint(ctx, point, next);

    distorted.push(point);
    distorted.push([x, y]);
  }

  return distorted;
}

export function drawPath(
  ctx: CanvasRenderingContext2D,
  path: Vector2D[],
  color: string
): void {
  ctx.beginPath();
  ctx.moveTo(...path[0]);
  ctx.fillStyle = '#f00';
  path.forEach(point => {
    ctx.lineTo(...point);
  });
  ctx.lineTo(...path[0]);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.closePath();
}
