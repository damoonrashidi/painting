import {
  CanvasGlobalCompositionOperation,
  Shape,
  drawShape,
  randomFloat,
  randomHue,
  randomInt,
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
  while (i <= 1) {
    const height = randomFloat(0.1, 0.3);
    const yellow = randomHue(50, 70, 1, 80, 70);
    const red = randomHue(320, 360, 1, 80, 70);
    const isWhite = randomFloat() > 0.8;
    const white = '#fff';
    const color = isWhite ? white : randomFloat() > 0.8 ? yellow : red;
    gradient.addColorStop(i, color);
    gradient.addColorStop(Math.min(1, i + height), color);
    i += height;
  }

  return gradient;
}

export function hill(
  ctx: CanvasRenderingContext2D,
  maxX: number,
  minY: number,
  maxY: number
): void {
  const point = [randomFloat(0, maxX), minY];

  ctx.fillStyle = '#444';
  let x = point[0];
  for (let y = point[1]; y < maxY; y += 10) {
    ctx.moveTo(x, y);
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
    const count = randomInt(5, 20);
    for (let a = 1; a < count; a += 0.5) {
      const aX = x + a ** 2;
      ctx.beginPath();
      ctx.arc(aX, y + randomFloat(-2, 2), randomFloat(1, 3), 0, Math.PI * 2);
      ctx.fill();
    }
    for (let a = 1; a < count; a++) {
      const aX = x - a ** 2;
      ctx.beginPath();
      ctx.arc(aX, y + randomFloat(-2, 2), randomFloat(1, 3), 0, Math.PI * 2);
      ctx.fill();
    }
    x += randomFloat(-20, 20);
  }
}
