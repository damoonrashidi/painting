import { random, distort } from '../lib';

export function createStack(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  flip: boolean,
  color: string,
  stack_width: number,
  stack_height: number
) {
  const xPadding = random(0, 2);

  let points: [number, number][] = [];

  if (flip) {
    points = [
      [x + xPadding, y + stack_height / 2],
      [x + stack_width, y],
      [x + stack_width, y + stack_height / 2],
      [x + xPadding, y + stack_height],
      [x + xPadding, y + stack_height / 2],
    ];
  } else {
    points = [
      [x + xPadding, y],
      [x + stack_width, y + stack_height / 2],
      [x + stack_width, y + stack_height],
      [x + xPadding, y + stack_height / 2],
      [x + xPadding, y + stack_height],
    ];
  }

  const [toX, toY] = [x + random(-500, 500), y + random(-500, 500)];
  const cp1 = { x: toX - random(-500, 500), y: y - random(-500, 500) };
  const cp2 = { x: x - random(-500, 500), y: toY - random(500, 500) };

  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, toX, toY);
  ctx.strokeStyle = color;
  ctx.lineWidth = random(2, 8);
  ctx.stroke();
  ctx.closePath();

  const region = new Path2D();
  region.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length - 1; i++) {
    region.lineTo(points[i][0], points[i][1]);
  }
  region.closePath();

  ctx.fillStyle = color;
  region.closePath();
  ctx.fill(region);
}
