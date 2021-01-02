import {
  init,
  Vector2D,
  distort2,
  Shape,
  randomFloat,
  randomInt,
  randomHue,
  drawShape,
  CanvasGlobalCompositionOperation,
} from '../lib';

import { Stripe, Segment, createPath } from './helpers';

// const [WIDTH, HEIGHT] = [11811, 17717];
const [WIDTH, HEIGHT] = [2160, 3860];
const Padding = {
  X: WIDTH * 0.1,
  Y: HEIGHT * 0.05,
};
const TOP = Padding.Y;
const BOTTOM = HEIGHT - Padding.Y;
const DISTORT_OPTION = 0.5;

enum Colors {
  STRIPE = '#f2e8ae',
  SKY = '#1a54e8',
  CLOUD = '#ffffff',
  SAND = '#ffc685',
  DARK_SAND = '#e6a050',
  WATER = '#aae9f0',
  BLACK = '#222',
}

const paint = (ctx: CanvasRenderingContext2D) => {
  const stripeWidth = WIDTH / 80;
  const stripePadding = stripeWidth / 2;
  const stripesCount = stripeWidth + (stripePadding * 2) / WIDTH;

  for (
    let x = Padding.X;
    x <= WIDTH - Padding.X;
    x += stripeWidth + stripePadding
  ) {
    const base: Shape = createPath(x, TOP, stripeWidth, BOTTOM - TOP);
    drawShape(ctx, base, { color: Colors.STRIPE, outline: false });

    /**
     * SKY
     */
    const skyHeight = randomFloat(HEIGHT * 0.002, HEIGHT * 0.01);
    const sky: Shape = createPath(x, TOP, stripeWidth, skyHeight);
    const skyWhite: Shape = createPath(
      x,
      TOP + skyHeight,
      stripeWidth,
      randomFloat(2, 8)
    );
    drawShape(ctx, sky, { color: randomHue(190, 240, 80, 70), outline: false });
    drawShape(ctx, skyWhite, { color: '#ffffff', outline: false });

    /**
     * CLOUDS
     */
    if (randomFloat() > 0.75) {
      for (let i = 0; i < randomInt(1, 20); i++) {
        const height = randomFloat(1, 20);
        const y = randomFloat(TOP + 50, BOTTOM * 0.5);
        const cloud = createPath(x, y, stripeWidth, height, 2);
        drawShape(ctx, cloud, { color: randomHue(0, 0, 0.6, 100, 100) });
      }
    }

    /**
     * WATER
     */
    const oceanStart = BOTTOM * 0.6 + Math.sin(x) * 100;
    const oceanHeight = randomFloat(HEIGHT * 0.06, HEIGHT * 0.09);
    const ocean: Shape = createPath(x, oceanStart, stripeWidth, oceanHeight);
    const peakWaveHeight = randomFloat(20, 90);
    const foamStart = oceanStart + peakWaveHeight;
    const foam = createPath(x, foamStart, stripeWidth, randomFloat(10, 20));
    const peakWave: Shape = createPath(
      x,
      oceanStart,
      stripeWidth,
      peakWaveHeight
    );
    drawShape(ctx, ocean, { color: Colors.WATER });
    drawShape(ctx, peakWave, { color: randomHue(190, 240, 0.5, 70, 70) });
    drawShape(ctx, foam, { color: randomHue(0, 10, 0.5, 100, 100) });

    /**
     * BEACH
     */
    const sandStart = oceanStart + oceanHeight;
    const sandHeight = HEIGHT * 0.04 * randomFloat(1, 1.05);
    const sand: Shape = createPath(x, sandStart, stripeWidth, sandHeight);
    const darkSandEnd = HEIGHT * 0.7 * randomFloat(1, 1.05);
    const darkSandHeight = darkSandEnd - sandStart;
    const darkSand: Shape = createPath(
      x,
      sandStart,
      stripeWidth,
      darkSandHeight
    );
    drawShape(ctx, sand, { color: Colors.SAND });
    drawShape(ctx, darkSand, { color: randomHue(0, 80, 0.5, 70, 70) });

    /**
     * BLACK
     */
    const blackHeight = randomFloat(HEIGHT * 0.002, HEIGHT * 0.01);
    const blackStart = BOTTOM - blackHeight;
    const black: Shape = createPath(x, blackStart, stripeWidth, blackHeight);
    drawShape(ctx, black, { color: Colors.BLACK });
  }
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fdffe0';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
