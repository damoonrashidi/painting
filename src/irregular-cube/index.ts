import {
  CanvasGlobalCompositionOperation,
  Shape,
  distort2,
  drawShape,
  init,
  randomFloat,
  randomInt,
} from '../lib';

const [WIDTH, HEIGHT] = [2e3, 2e3];
// const [WIDTH, HEIGHT] = [1e4, 1e4];
const [P_X, P_Y] = [WIDTH / 3, HEIGHT / 3];

function paint(ctx: CanvasRenderingContext2D) {
  const startX = P_X;
  const endX = WIDTH - P_X;
  const startY = P_Y;
  const endY = HEIGHT - P_Y;

  ctx.globalCompositeOperation = CanvasGlobalCompositionOperation.DARKEN;

  for (let i = 0; i < 40; i++) {
    const shape: Shape = [
      [startX, startY],
      [endX, startY],
      [endX, endY],
      [startX, endY],
    ];

    ctx.save();
    ctx.filter = `blur(${randomInt(1, 4)}px)`;
    drawShape(ctx, distort2(shape, 10), {
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
