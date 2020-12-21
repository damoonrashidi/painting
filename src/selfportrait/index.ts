import { init, random, randomHue } from '../lib';
import { createStack } from './helpers';

const WIDTH = 2464;
const HEIGHT = 3280;
const STACK_WIDTH = 30;
const STACK_HEIGHT = 50;

const getColor = (
  ref: CanvasRenderingContext2D,
  x: number,
  y: number
): string => {
  const { data } = ref.getImageData(x, y, STACK_WIDTH, STACK_HEIGHT);
  let [aR, aG, aB, aA] = [0, 0, 0, 0];
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = data;
    aR += r;
    aG += g;
    aB += b;
    aA += a;
  }

  const n = data.length / 4;

  return `rgba(${aR / n}, ${aG / n}, ${aB / n}, ${aA / n})`;
};

const paint = (
  ctx: CanvasRenderingContext2D,
  ref: CanvasRenderingContext2D
) => {
  let x = 0;
  let y = 0;
  let column = 1;

  // ctx.rotate(0.35);
  // ctx.translate(-100, -1100);

  for (let i = 0; i < 120000; i++) {
    if (y >= STACK_HEIGHT * 200) {
      x += STACK_WIDTH;
      y = 0;
      column++;
    }
    const color = getColor(ref, x, y);

    createStack(ctx, x, y, column % 2 === 0, color, STACK_WIDTH, STACK_HEIGHT);
    y += STACK_HEIGHT / 2 + 1;
  }

  // ctx.rotate(-0.35);
  // ctx.translate(-270, 1100);
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  const ref = init(WIDTH, HEIGHT, false, 'reference-canvas');
  (document.getElementById(
    'reference-canvas'
  ) as HTMLCanvasElement).style.display = 'none';
  ctx.fillStyle = '#fff';
  const referenceImage = new Image();
  referenceImage.onload = () => {
    ref.drawImage(referenceImage, 0, 0, WIDTH, HEIGHT);
    paint(ctx, ref);
  };
  referenceImage.src = '/static/5a8472c3-ref.jpg';
});
