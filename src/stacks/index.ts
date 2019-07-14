import { init, createStack, random } from './helpers';
import { randomHue } from './colors';
const WIDTH = 1200;
const HEIGHT = 1600;

export function randomColor() {
  const palette = [
    '#471474',
    '#000000',
    '#00264B',
    '#E00034',
    '#eeeeee',
    '#48af0a',
    '#83878A',
    '#445257',
    '#A3A1A8',
  ];
  return palette[random(0, palette.length - 1)];
}

const paint = (ctx: CanvasRenderingContext2D) => {
  const STACK_WIDTH = 20;
  const STACK_HEIGHT = 30;

  let x = 0;
  let y = 0;
  let row = 1;
  let streak = 0;
  let streakColor = randomColor();

  ctx.rotate(0.35);
  ctx.translate(-100, -500);

  for (let i = 0; i < 12000; i++) {
    let color = randomColor();
    if (y >= STACK_HEIGHT * 70) {
      x += STACK_WIDTH;
      y = 0;
      row++;
    }
    if (streak >= 0) {
      streak--;
      color = streakColor;
    } else {
      if (random(0, 100) > 95) {
        streak = random(2, 5);
        streakColor = randomColor();
      }
    }
    createStack(ctx, x, y, row % 2 === 0, color);
    y += STACK_HEIGHT / 2 + 1;
  }
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
}, 0);
