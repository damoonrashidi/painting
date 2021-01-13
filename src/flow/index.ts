import { between, init, randomFloat, randomHue } from '../lib';
const Simplex = require('perlin-simplex');

// const [WIDTH, HEIGHT] = [2160, 3890];
const [WIDTH, HEIGHT] = [9e3, 16e3];
const startX = WIDTH * 0.1;
const stopX = WIDTH - startX;
const startY = HEIGHT * 0.1;
const stopY = HEIGHT - startY;

function paint(ctx: CanvasRenderingContext2D) {
  const simplex = new Simplex();

  for (let i = 0; i < 3e4; i++) {
    let [x, y] = [randomFloat(startX, stopX), randomFloat(startY, stopY)];
    const w = 0.5;

    while (
      between(x, startX, stopX) &&
      between(y, startY, stopY) &&
      randomFloat() > 0.001
    ) {
      ctx.fillStyle = randomHue(x, y, 0.5, 80, 70);
      const n = simplex.noise(x / 5e3, y / 5e3);
      x += Math.cos(n * Math.PI * 2);
      y += Math.tan(n * Math.PI * 2);
      ctx.fillRect(x, y, w, w);
    }
  }
}

setTimeout(() => {
  console.clear();
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
