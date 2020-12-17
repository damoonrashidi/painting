import { init, random, Line, randomHue } from '../lib';
const WIDTH = 2500;
const HEIGHT = 3000;

const paint = (ctx: CanvasRenderingContext2D) => {};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
