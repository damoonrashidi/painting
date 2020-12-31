import {
  init,
  Vector2D,
  distort2,
  Shape,
  randomFloat,
  randomInt,
  randomHue,
} from '../lib';
import { drawPath } from './helpers';

// const [WIDTH, HEIGHT] = [2160, 3860];
const [WIDTH, HEIGHT] = [11811, 17717];
const TOP = 200;
const BOTTOM = HEIGHT - 200;

enum Colors {
  STRIPE = '#f2e8ae',
  SKY = '#4fa8e8',
  CLOUD = '#ffffff',
  SAND = '#ffc685',
  WATER = '#aae9f0',
}

const paint = (ctx: CanvasRenderingContext2D) => {
  /**
   * Setup
   */
  const stripeWidth = 30;
  const stripePadding = 10;
  const stripesCount = stripeWidth + (stripePadding * 2) / WIDTH;

  const stripes: Shape[] = [];
  const skies: Shape[] = [];
  const clouds: Shape[] = [];
  const sands: Shape[] = [];
  const ticks: Shape[] = [];
  const ocean: Shape[] = [];

  for (let x = 100; x < WIDTH - 100; x += stripePadding + stripeWidth) {
    const stripe: Shape = distort2(
      [
        [x, TOP],
        [x + stripeWidth, TOP],
        [x + stripeWidth, BOTTOM],
        [x, BOTTOM],
      ],
      2
    );

    const skyHeight = randomFloat(5, 15);

    const sky = distort2(
      [
        [x, TOP],
        [x + stripeWidth, TOP],
        [x + stripeWidth, TOP + skyHeight],
        [x, TOP + skyHeight],
      ],
      0.5
    );

    const cloudHeight = randomFloat(2, 10);
    const cloud: Shape = distort2(
      [
        [x, TOP + skyHeight - 2],
        [x + stripeWidth, TOP + skyHeight - 2],
        [x + stripeWidth, TOP + skyHeight + cloudHeight],
        [x, TOP + skyHeight + cloudHeight],
      ],
      1
    );

    const sandStart = HEIGHT * 0.7 + randomFloat(-50, 50);
    const sand: Shape = distort2(
      [
        [x, sandStart],
        [x + stripeWidth, sandStart],
        [x + stripeWidth, BOTTOM],
        [x, BOTTOM],
      ],
      1
    );

    const oceanStart = HEIGHT * 0.6 + randomFloat(-20, 20);
    const water = distort2(
      [
        [x, oceanStart],
        [x + stripeWidth, oceanStart],
        [x + stripeWidth, sandStart - 5],
        [x, sandStart - 5],
      ],
      1
    );

    const darkWaterHeight = randomFloat(10, 40);
    const darkWater = distort2(
      [
        [x, oceanStart],
        [x + stripeWidth, oceanStart],
        [x + stripeWidth, oceanStart + darkWaterHeight],
        [x, oceanStart + darkWaterHeight],
      ],
      1
    );

    const foamHeight = randomFloat(2, 5);
    const foam = distort2(
      [
        [x, oceanStart + darkWaterHeight],
        [x + stripeWidth, oceanStart + darkWaterHeight],
        [x + stripeWidth, oceanStart + darkWaterHeight + foamHeight],
        [x, oceanStart + darkWaterHeight + foamHeight],
      ],
      1
    );

    const bottomWaterHeight = randomFloat(10, 20);
    const bottomWater = distort2(
      [
        [x, BOTTOM - bottomWaterHeight],
        [x + stripeWidth, BOTTOM - bottomWaterHeight],
        [x + stripeWidth, BOTTOM],
        [x, BOTTOM],
      ],
      1
    );

    skies.push(sky);
    skies.push(darkWater);
    skies.push(bottomWater);
    stripes.push(stripe);
    clouds.push(cloud);
    clouds.push(foam);
    sands.push(sand);
    ocean.push(water);
  }

  /**
   * Composite the layers, start at base to not overpaint
   */
  stripes.forEach(stripe => drawPath(ctx, stripe, Colors.STRIPE));
  sands.forEach(sand => drawPath(ctx, sand, Colors.SAND));
  ocean.forEach(water => drawPath(ctx, water, Colors.WATER));
  clouds.forEach(cloud => drawPath(ctx, cloud, Colors.CLOUD));
  skies.forEach(sky => drawPath(ctx, sky, randomHue(190, 230, 100, 100, 75)));

  for (let i = 0; i < sands.length; i++) {
    const x = sands[i][0][0];

    if (randomFloat() > 0.7) {
      continue;
    }

    for (let p = 0; p < randomInt(2, 6); p++) {
      const y = randomFloat(TOP, HEIGHT * 0.3);
      const height = randomFloat(2, 20);

      const tick: Shape = distort2(
        [
          [x, y],
          [x + stripeWidth, y],
          [x + stripeWidth, y + height],
          [x, y + height],
        ],
        1
      );
      ticks.push(tick);
    }
  }

  ctx.globalCompositeOperation = 'overlay';
  ticks.forEach(tick => drawPath(ctx, tick, 'rgba(255,255,255,0.5)'));
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fdffe0';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
