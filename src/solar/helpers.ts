import {
  CanvasGlobalCompositionOperation,
  Shape,
  drawShape,
  randomFloat,
  randomHue,
} from '../lib';

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

export function generateQuadraticLineGradient(
  ctx: CanvasRenderingContext2D,
  height: number
): CanvasGradient {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  let i = 0;
  gradient.addColorStop(0, '#f00');
  while (i <= 1) {
    const yellow = randomHue(50, 70, 1, 80, 70);
    const red = randomHue(320, 360, 1, 80, 70);
    const isWhite = randomFloat() > 0.8;
    const white = '#fff';
    const color = isWhite ? white : randomFloat() > 0.8 ? yellow : red;
    gradient.addColorStop(i, color);
    console.log(i, color);
    i += randomFloat(0.05, 0.1);
  }

  return gradient;
}
