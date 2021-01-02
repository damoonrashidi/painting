import { init, drawShape, randomFloat, randomHue, randomInt } from '../lib';
import { generateGlyph, renderGlyph } from './helpers';

// const [WIDTH, HEIGHT] = [2160, 3890];
const [WIDTH, HEIGHT] = [11811, 17717];
const Padding = {
  X: WIDTH / 10,
  Y: HEIGHT / 12,
};
const CELL_SIZE = WIDTH / 128;
let CELL_PADDING = CELL_SIZE;

const manifesto = `i was born at a very young age i dont know when i started building but i do know that it sustains me`;

function paint(ctx: CanvasRenderingContext2D) {
  for (
    let y = Padding.Y;
    y < HEIGHT - Padding.Y - CELL_SIZE;
    y += CELL_SIZE + CELL_PADDING
  ) {
    for (
      let x = Padding.X;
      x < WIDTH - Padding.X - CELL_SIZE;
      x += CELL_SIZE + CELL_PADDING
    ) {
      const glyph = generateGlyph(x, y, CELL_SIZE, CELL_SIZE);
      renderGlyph(ctx, glyph);
    }
  }

  for (let i = 0; i < 12e5; i++) {
    ctx.fillStyle = randomHue(30, 70, randomFloat(0.05, 0.15), 30, 20);
    const [x, y] = [randomFloat(0, WIDTH), randomFloat(0, HEIGHT)];
    ctx.beginPath();
    ctx.arc(x, y, randomFloat(1.5, 2.5), 0, Math.PI * 2);
    ctx.fill();
  }
}

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  // ctx.fillStyle = '#fff';
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
