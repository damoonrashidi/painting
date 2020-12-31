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

const [WIDTH, HEIGHT] = [2160, 3860];
// const [WIDTH, HEIGHT] = [11811, 17717];
const TOP = HEIGHT * 0.05;
const BOTTOM = HEIGHT * 0.95;
const DISTORT_OPTION = 0.5;

enum Colors {
  STRIPE = '#f2e8ae',
  SKY = '#4fa8e8',
  CLOUD = '#ffffff',
  SAND = '#ffc685',
  DARK_SAND = '#e6a050',
  WATER = '#aae9f0',
  BLACK = '#222',
}

const paint = (ctx: CanvasRenderingContext2D) => {
  /**
   * Setup
   */
  const stripeWidth = WIDTH / 120;
  const stripePadding = stripeWidth / 2;
  const stripesCount = stripeWidth + (stripePadding * 2) / WIDTH;

  const stripes: Shape[] = [];
  const skies: Shape[] = [];
  const clouds: Shape[] = [];
  const sands: Shape[] = [];
  const ticks: Shape[] = [];
  const ocean: Shape[] = [];
  const blacks: Shape[] = [];
  const darkSands: Shape[] = [];

  for (let x = WIDTH * 0.1; x < WIDTH * 0.9; x += stripePadding + stripeWidth) {
    const stripe: Shape = distort2(
      [
        [x, TOP],
        [x + stripeWidth, TOP],
        [x + stripeWidth, BOTTOM],
        [x, BOTTOM],
      ],
      DISTORT_OPTION / 2
    );

    const skyHeight = randomFloat(HEIGHT * 0.002, HEIGHT * 0.005);

    const sky = distort2(
      [
        [x, TOP],
        [x + stripeWidth, TOP],
        [x + stripeWidth, TOP + skyHeight],
        [x, TOP + skyHeight],
      ],
      DISTORT_OPTION / 2
    );

    const cloudHeight = randomFloat(HEIGHT * 0.002, HEIGHT * 0.004);
    const cloud: Shape = distort2(
      [
        [x, TOP + skyHeight - 2],
        [x + stripeWidth, TOP + skyHeight - 2],
        [x + stripeWidth, TOP + skyHeight + cloudHeight],
        [x, TOP + skyHeight + cloudHeight],
      ],
      DISTORT_OPTION
    );

    const sandStart = HEIGHT * 0.7 + randomFloat(0, HEIGHT * 0.01);
    const sand: Shape = distort2(
      [
        [x, sandStart],
        [x + stripeWidth, sandStart],
        [x + stripeWidth, BOTTOM],
        [x, BOTTOM],
      ],
      DISTORT_OPTION
    );

    const darkSandHeight = randomFloat(HEIGHT * 0.01, HEIGHT * 0.03);
    const darkSand: Shape = distort2(
      [
        [x, sandStart],
        [x + stripeWidth, sandStart],
        [x + stripeWidth, sandStart + darkSandHeight],
        [x, sandStart + darkSandHeight],
      ],
      DISTORT_OPTION
    );

    const oceanStart =
      HEIGHT * 0.6 + randomFloat(HEIGHT * 0.002, HEIGHT * 0.006);
    const water = distort2(
      [
        [x, oceanStart],
        [x + stripeWidth, oceanStart],
        [x + stripeWidth, sandStart - 5],
        [x, sandStart - 5],
      ],
      DISTORT_OPTION / 5
    );

    const darkWaterHeight = randomFloat(HEIGHT * 0.01, HEIGHT * 0.02);
    const darkWater = distort2(
      [
        [x, oceanStart],
        [x + stripeWidth, oceanStart],
        [x + stripeWidth, oceanStart + darkWaterHeight],
        [x, oceanStart + darkWaterHeight],
      ],
      DISTORT_OPTION
    );

    const foamHeight = cloudHeight;
    const foam = distort2(
      [
        [x, oceanStart + darkWaterHeight],
        [x + stripeWidth, oceanStart + darkWaterHeight],
        [x + stripeWidth, oceanStart + darkWaterHeight + foamHeight],
        [x, oceanStart + darkWaterHeight + foamHeight],
      ],
      DISTORT_OPTION
    );

    const blackHeight = randomFloat(HEIGHT * 0.001, HEIGHT * 0.004);
    const black = distort2(
      [
        [x, BOTTOM - blackHeight],
        [x + stripeWidth, BOTTOM - blackHeight],
        [x + stripeWidth, BOTTOM],
        [x, BOTTOM],
      ],
      DISTORT_OPTION
    );

    skies.push(sky);
    skies.push(darkWater);
    blacks.push(black);
    stripes.push(stripe);
    clouds.push(cloud);
    clouds.push(foam);
    sands.push(sand);
    ocean.push(water);
    darkSands.push(darkSand);
  }

  /**
   * Composite the layers, start at base to not overpaint
   */
  stripes.forEach(stripe => drawPath(ctx, stripe, Colors.STRIPE));
  sands.forEach(sand => drawPath(ctx, sand, Colors.SAND));
  ocean.forEach(water => drawPath(ctx, water, Colors.WATER));
  clouds.forEach(cloud => drawPath(ctx, cloud, Colors.CLOUD));
  skies.forEach(sky => drawPath(ctx, sky, randomHue(190, 230, 100, 100, 65)));
  blacks.forEach(black => drawPath(ctx, black, Colors.BLACK));
  darkSands.forEach(sand => drawPath(ctx, sand, Colors.DARK_SAND));

  for (let i = 0; i < sands.length; i++) {
    const x = sands[i][0][0];

    /**
     * TICKS to simluate clouds
     */

    if (randomFloat() > 0.7) {
      continue;
    }

    for (let p = 0; p < randomInt(2, 6); p++) {
      const y = randomFloat(TOP, HEIGHT * 0.3);
      const height = randomFloat(HEIGHT * 0.002, HEIGHT * 0.007);

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
