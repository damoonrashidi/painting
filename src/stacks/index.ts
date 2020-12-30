import { init, createStack, random } from './helpers';
import { randomHue } from './colors';
const [WIDTH, HEIGHT] = [11811, 17717];

export function randomColor() {
  const palette = Array(40)
    .fill(null)
    .map(() => randomHue(0, 60, 90, random(40, 80)));
  return palette[random(0, palette.length)];
}

const paint = (ctx: CanvasRenderingContext2D) => {
  const STACK_WIDTH = 60;
  const STACK_HEIGHT = 100;

  let x = 0;
  let y = 0;
  let row = 1;
  let streak = 0;
  let streakColor = randomColor();

  ctx.rotate(0.35);
  ctx.translate(0, -4000);

  for (let i = 0; i < 150000; i++) {
    let color = randomColor();
    if (y >= HEIGHT + 3000) {
      x += STACK_WIDTH;
      y = 0;
      row++;
    }
    if (streak >= 0) {
      streak--;
      color = streakColor;
    } else {
      if (random(0, 100) > 95) {
        streak = random(2, 30);
        streakColor = randomColor();
      }
    }
    createStack(ctx, x, y, row % 2 === 0, color, STACK_WIDTH, STACK_HEIGHT);
    y += STACK_HEIGHT / 2 + 1;
  }

  ctx.rotate(-0.35);
  ctx.translate(-270, 1100);

  // ctx.globalCompositeOperation = 'color';
  // const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  // gradient.addColorStop(0, '#ff0000');
  // gradient.addColorStop(1, '#0000ff');
  // ctx.fillStyle = gradient;
  // ctx.fillRect(0, 0, WIDTH, HEIGHT);
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
