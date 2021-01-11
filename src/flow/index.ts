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

  const visited = new Set<string>();

  // ctx.filter = 'blur(1px)';
  for (let i = 0; i < 4.5e4; i++) {
    let [x, y] = [randomFloat(startX, stopX), randomFloat(startY, stopY)];
    ctx.fillStyle = randomHue(x, y, 0.3, 90, 70);

    while (
      between(x, startX, stopX) &&
      between(y, startY, stopY) &&
      randomFloat() > 0.001
    ) {
      const n = simplex.noise(x / 3000, y / 3000);
      x += Math.cos(n * Math.PI * 2);
      y += Math.tan(n * Math.PI * 2);
      // const key = `${x}:${y}`;
      // if (visited.has(key)) {
      //   break;
      // }
      // visited.add(key);
      ctx.fillRect(x, y, 1, 1);
      // ctx.beginPath();
      // ctx.arc(x, y, 1, 0, Math.PI * 2);
      // ctx.fill();
      // ctx.closePath();
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
