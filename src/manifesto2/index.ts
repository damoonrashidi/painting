import { init } from '../lib';
import { makeGlyph, renderGlyph } from './helpers';

// const [WIDTH, HEIGHT] = [11811, 17717];
const [WIDTH, HEIGHT] = [2160, 3890];
const [PADDING_X, PADDING_Y] = [WIDTH * 0.1, HEIGHT * 0.05];
const CELL_SIZE = WIDTH / 64;
const CELL_PADDING = CELL_SIZE * 2;

function paint(ctx: CanvasRenderingContext2D) {
  for (
    let y = PADDING_X;
    y < HEIGHT - CELL_SIZE - PADDING_Y;
    y += CELL_SIZE + CELL_PADDING
  ) {
    for (
      let x = PADDING_Y;
      x < WIDTH - PADDING_X - 70;
      x += CELL_SIZE + CELL_PADDING
    ) {
      const glyph = makeGlyph();

      renderGlyph(ctx, glyph, x, y, CELL_SIZE, CELL_SIZE);
    }
  }
}

setTimeout(() => {
  console.clear();
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
