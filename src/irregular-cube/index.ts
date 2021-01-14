import { init } from '../lib';

/**
 * LARGE
 const [WIDTH, HEIGHT] = [1e4, 1e4];
 const BLUR = [4,7];
 const DIRSTORT = 15;
 */

/**
 * SMALL
 */
const [WIDTH, HEIGHT] = [2e3, 2e3];
const BLUR = [1, 2];
const DISTORT = 7;

function paint(ctx: CanvasRenderingContext2D) {
  console.log(ctx, BLUR, DISTORT);
}

setTimeout(() => {
  console.clear();
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
