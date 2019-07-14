import { init, createStack, random } from './helpers';
import { randomHue } from './colors';
const WIDTH = 800;
const HEIGHT = 1200;

const paint = (ctx: CanvasRenderingContext2D) => {
  for (let x = 0; x < WIDTH; x += 23) {
    for (let y = 0; y < HEIGHT; y += 18) {
      createStack(ctx, x, y, x % 2 === 0);
    }
  }
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
}, 0);
