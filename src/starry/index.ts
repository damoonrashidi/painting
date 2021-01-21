import { init, randomInt } from '../lib';
import { drawMoon, drawSea, drawStars, drawHill } from './helpers';

// const [WIDTH, HEIGHT] = [3890, 2160];
const [WIDTH, HEIGHT] = [8e3, 4e3];

function paint(ctx: CanvasRenderingContext2D) {
  if (randomInt(0, 0) === 1) {
    drawStars(ctx, [0, WIDTH], [0, HEIGHT * 0.6], '#ffffff99');
    drawMoon(ctx, WIDTH * 0.85, HEIGHT * 0.15, WIDTH * 0.05);
    drawSea(ctx, [0, WIDTH], [HEIGHT * 0.7, HEIGHT]);
  }
  drawHill(ctx, [0, WIDTH * 0.3], [HEIGHT * 0.9, HEIGHT]);
}

setTimeout(() => {
  console.clear();
  const ctx = init(WIDTH, HEIGHT);
  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  gradient.addColorStop(0, '#05053b');
  gradient.addColorStop(1, '#03031c');
  ctx.fillStyle = gradient;
  document.body.style.height = `${HEIGHT}px`;
  document.body.style.width = `${WIDTH}px`;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
