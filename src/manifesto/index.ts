import { init, drawShape } from '../lib';
import { generateGlyph, renderGlyph } from './helpers';

// const [WIDTH, HEIGHT] = [2160, 3890];
const [WIDTH, HEIGHT] = [11811, 17717];
const Padding = {
  X: WIDTH / 10,
  Y: HEIGHT / 12,
};
const CELL_SIZE = WIDTH / 64;
const CELL_PADDING = CELL_SIZE / 2;

const manifesto = `i was born at a very young age i dont know when i started building but i do know that it sustains me`;

function paint(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'rgba(0,0,0,0.02)';

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
      ctx.lineWidth = 1;
      // drawShape(
      //   ctx,
      //   [
      //     [x, y],
      //     [x + CELL_SIZE, y],
      //     [x + CELL_SIZE, y + CELL_SIZE],
      //     [x, y + CELL_SIZE],
      //   ],
      //   { color: '#111', outline: true }
      // );

      const glyph = generateGlyph(x, y, CELL_SIZE, CELL_SIZE);
      renderGlyph(ctx, glyph);
    }
  }
}

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
