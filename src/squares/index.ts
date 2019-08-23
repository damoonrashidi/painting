import { init, createPyramid, random } from './helpers';
import { randomHue } from './colors';
const WIDTH = 1200;
const HEIGHT = 1600;

const paint = (ctx: CanvasRenderingContext2D) => {
  for (let x = 30; x < 1200; x += 90) {
    for (let y = 30; y < 1600; y += 90) {
      createPyramid(ctx, x, y, 7, random(0, 360));
    }
  }
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
}, 0);
