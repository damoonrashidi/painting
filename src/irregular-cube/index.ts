import {
  CanvasGlobalCompositionOperation,
  distort2,
  drawShape,
  init,
  randomInt,
  Shape,
} from '../lib';

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

const [P_X, P_Y] = [WIDTH / 3, HEIGHT / 3];

function paint(ctx: CanvasRenderingContext2D) {
  const startX = P_X;
  const endX = WIDTH - P_X;
  const startY = P_Y;
  const endY = HEIGHT - P_Y;

  ctx.globalCompositeOperation = CanvasGlobalCompositionOperation.DARKEN;

  for (let i = 0; i < 50; i++) {
    const shape: Shape = [
      [startX, startY],
      [endX, startY],
      [endX, endY],
      [startX, endY],
    ];

    ctx.save();
    ctx.filter = `blur(${randomInt(BLUR[0], BLUR[1])}px)`;
    drawShape(ctx, distort2(shape, DISTORT), {
      color: `rgba(255,0,0,0.1)`,
    });
    ctx.restore();
  }
}

setTimeout(() => {
  console.clear();
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
