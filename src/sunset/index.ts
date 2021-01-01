import { init } from '../lib';

const [WIDTH, HEIGHT] = [2160, 3890];

function paint(ctx: CanvasRenderingContext2D): void {}

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#f1f4d4';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
