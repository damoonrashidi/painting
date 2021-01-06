import { CanvasGlobalCompositionOperation, Shape, drawShape } from '../lib';

export function paintArea(
  ctx: CanvasRenderingContext2D,
  shape: Shape,
  color: string
) {
  ctx.save();
  ctx.globalCompositeOperation = CanvasGlobalCompositionOperation.COLOR_BURN;
  ctx.filter = 'blur(200px)';
  drawShape(ctx, shape, { color, outline: false });
  ctx.fill();
  ctx.restore();
}
