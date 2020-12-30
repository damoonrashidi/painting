import { distort, drawPath } from './helpers';
import { init, paintGrid, Vector2D, randomHue, randomFloat } from '../lib';
const [WIDTH, HEIGHT] = [2000, 2000];

const paint = (ctx: CanvasRenderingContext2D) => {
  // paintGrid(ctx, WIDTH, HEIGHT, { showNumbers: true });

  const shape: Vector2D[] = [
    [600, 600],
    [1200, 600],
    [1400, 800],
    [1400, 1300],
    [1200, 1600],
    [600, 1600],
    [400, 1300],
    [400, 800],
    [600, 600],
  ];

  const layers = Array(30)
    .fill(shape)
    .map(layer => {
      for (let i = 0; i < 10; i++) {
        layer = distort(ctx, layer);
      }
      return layer;
    });

  ctx.globalCompositeOperation = 'multiply';

  for (let i = 0; i < layers.length; i++) {
    const shape = layers[i];
    const color = randomHue(200, 360, randomFloat(0.1, 0.2));
    ctx.save();
    ctx.filter = `blur(${randomFloat(5, 15)}px)`;
    drawPath(ctx, shape, color);
    ctx.restore();
  }

  // drawPath(ctx, shape);
  // drawPath(ctx, distorted2);
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
}, 0);
