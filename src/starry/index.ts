import { makeNoise2D } from 'open-simplex-noise';
import {
  Circle,
  distance,
  init,
  randomFloat,
  randomHue,
  randomInt,
} from '../lib';
import { drawMoon, drawSea, drawStars } from './helpers';

// const [WIDTH, HEIGHT] = [3890, 2160];
const [WIDTH, HEIGHT] = [8e3, 4e3];

function paint(ctx: CanvasRenderingContext2D) {
  const moons: Circle[] = [
    [WIDTH * 0.6, HEIGHT * 0.33, WIDTH * 0.05],
    [WIDTH * 0.4, HEIGHT * 0.2, WIDTH * 0.03],
    [WIDTH * 0.8, HEIGHT * 0.15, WIDTH * 0.06],
    [WIDTH * 0.2, HEIGHT * 0.25, WIDTH * 0.02],
  ].map(([centerX, centerY, radius]) => ({ centerX, centerY, radius }));

  const seed = 1611342057928;
  // const seed = Date.now();
  const skyNoise = makeNoise2D(seed);
  console.log(seed);

  for (let i = 0; i < 5e3; i++) {
    let [x, y] = [randomFloat(0, WIDTH), randomFloat(0, HEIGHT * 0.6)];

    let draw = true;
    for (let i = 0; i < moons.length; i++) {
      const moon = moons[i];
      if (
        distance([x, y], [moon.centerX, moon.centerY]) <
        moon.radius + moon.radius / 2
      ) {
        draw = false;
      }
    }

    if (!draw) {
      continue;
    }

    const length = randomFloat(200, WIDTH - x);
    let traveled = 0;
    ctx.fillStyle = randomHue(
      200,
      240,
      randomFloat(0.3, 0.8),
      randomInt(30, 100),
      randomInt(20, 100)
    );

    while (traveled < length) {
      const n = skyNoise(x / 600, y / 600);

      moons.forEach(moon => {
        const tooClose =
          distance([x, y], [moon.centerX, moon.centerY]) <
          moon.radius + moon.radius / 2;
        const isOnUpperHalf = y < moon.centerY;

        if (tooClose) {
          y = isOnUpperHalf ? y - 5 : y + 5;
        } else {
          y += Math.sin(n);
          x += Math.cos(n);
        }
      });
      ctx.fillRect(x, y, 1, 1);

      traveled++;
    }
  }

  moons.forEach(moon => drawMoon(ctx, moon.centerX, moon.centerY, moon.radius));
  drawStars(ctx, [0, WIDTH], [0, HEIGHT * 0.6], '#ffffff99');
  drawSea(ctx, [0, WIDTH], [HEIGHT * 0.7, HEIGHT]);
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
