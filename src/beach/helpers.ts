import { Vector2D } from '../lib';

export function drawPath(
  ctx: CanvasRenderingContext2D,
  path: Vector2D[],
  color: string
): void {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(...path[0]);
  path.forEach(point => {
    ctx.lineTo(...point);
  });
  ctx.lineTo(...path[0]);
  ctx.closePath();
  ctx.fill();
}
