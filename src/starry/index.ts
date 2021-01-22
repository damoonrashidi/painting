import { Circle, init } from '../lib';
import { drawMoon, drawSea, drawStars, drawWind } from './helpers';

const [WIDTH, HEIGHT] = [8e3, 4e3];

function paint(ctx: CanvasRenderingContext2D) {
  const moons: Circle[] = [
    [WIDTH * 0.6, HEIGHT * 0.33, WIDTH * 0.05],
    [WIDTH * 0.4, HEIGHT * 0.2, WIDTH * 0.03],
    [WIDTH * 0.8, HEIGHT * 0.15, WIDTH * 0.06],
    [WIDTH * 0.2, HEIGHT * 0.25, WIDTH * 0.02],
  ].map(([centerX, centerY, radius]) => ({ centerX, centerY, radius }));

  drawWind(ctx, moons, [0, WIDTH], [0, HEIGHT * 0.6]);
  moons.forEach(moon => drawMoon(ctx, moon));
  drawStars(ctx, [0, WIDTH], [0, HEIGHT * 0.6], '#ffffff99');
  drawSea(ctx, [-100, WIDTH], [HEIGHT * 0.7, HEIGHT]);
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
