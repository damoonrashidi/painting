import { CanvasGlobalCompositionOperation, Shape, drawShape } from '../lib';

export function paintArea(
  ctx: CanvasRenderingContext2D,
  shape: Shape,
  color: string
) {
  ctx.save();
  ctx.globalCompositeOperation = CanvasGlobalCompositionOperation.COLOR;
  ctx.filter = 'blur(140px)';
  drawShape(ctx, shape, { color, outline: false });
  ctx.fill();
  ctx.restore();
}
