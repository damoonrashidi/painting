import {
  CanvasGlobalCompositionOperation,
  Shape,
  Vector2D,
  init,
  randomFloat,
  randomHue,
} from '../lib';
import { paintArea } from './helpers';

// const [WIDTH, HEIGHT] = [10000, 10000];
const [WIDTH, HEIGHT] = [6000, 3000];

function paint(ctx: CanvasRenderingContext2D) {
  let [x, y]: Vector2D = [WIDTH * 0.3, HEIGHT * 0.4];

  ctx.save();
  ctx.scale(1.15, 1);
  for (let r = 10; r < WIDTH * 0.7; r += 1) {
    let a = randomFloat(0, 2);
    let w = randomFloat(1, 6);
    while (a < 2) {
      const yellow = randomHue(50, 70, 1, 80, 70);
      const red = randomHue(320, 360, 1, 80, 70);

      const color = randomFloat() > 0.8 ? yellow : red;
      ctx.strokeStyle = color;
      ctx.lineWidth = w;
      const c = randomFloat(0.1, 0.2);
      ctx.beginPath();
      ctx.arc(x, y, r, a * Math.PI * 2, (a + c) * Math.PI * 2);
      ctx.stroke();
      a += c + randomFloat(0.2, 0.5);
    }
    x -= 0.5;
  }
  ctx.restore();

  [x, y] = [WIDTH * 1.15, HEIGHT * 0.6];
  ctx.save();
  ctx.scale(1.15, 1);
  for (let r = 10; r < WIDTH * 0.7; r += 1) {
    let a = randomFloat(0, 2);
    let lineWidth = randomFloat(1, 2);
    while (a < 2) {
      const yellow = randomHue(50, 70, 1, 100, 70);
      const red = randomHue(320, 360, 1, 100, 70);

      const color = randomFloat() > 0.8 ? yellow : red;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      const c = randomFloat(0.1, 0.2);
      ctx.beginPath();
      ctx.arc(x, y, r, a * Math.PI * 2, (a + c) * Math.PI * 2);
      ctx.stroke();
      a += c + randomFloat(0.2, 0.5);
    }
    x += 0.5;
  }
  ctx.restore();

  for (let i = 0.712; i < 1.02; i += 0.005) {
    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(WIDTH * i, 0);
    ctx.lineWidth = 4;
    ctx.quadraticCurveTo(
      WIDTH * 0.785 + i * 180,
      HEIGHT * 0.54,
      WIDTH * (i - 0.05),
      HEIGHT
    );
    ctx.stroke();
  }

  const shape: Shape = [
    [WIDTH * 0.2, HEIGHT * 0.45],
    [WIDTH * 0.3, HEIGHT * 0.45],
    [WIDTH * 0.3, HEIGHT * 0.65],
    [WIDTH * 0.2, HEIGHT * 0.65],
  ];

  paintArea(ctx, shape, '#0000ff');

  const shape2: Shape = [
    [WIDTH * 0.75, 0],
    [WIDTH * 0.8, 0],
    [WIDTH * 0.8, HEIGHT],
    [WIDTH * 0.75, HEIGHT],
  ];
  paintArea(ctx, shape2, '#0000ff');
}

setTimeout(() => {
  console.clear();
  const ctx = init(WIDTH, HEIGHT);
  // const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  // gradient.addColorStop(0, '#360302');
  // gradient.addColorStop(1, '#1c0c0b');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
