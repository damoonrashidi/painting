import { init, random } from './lib/helpers';
import { randomHue } from './lib/colors';
const [WIDTH, HEIGHT] = [600, 800];
let ctx: CanvasRenderingContext2D;

const middle = ([x1, y1]: number[], [x2, y2]: number[]): number[] => [
  (x1 + x2) / 2,
  (y1 + y2) / 2,
];

const distort = (points: number[][], iteration = 0): number[][] => {
  let newPoints = [];
  for (let i = 0; i < points.length; i++) {
    newPoints.push(points[i]);
    const [x, y] = middle(points[i], points[i + 1] || points[0]);
    newPoints.push([
      x + random(-1.3 * i, 1.3 * i),
      y + random(-1.3 * i, 1.3 * i),
    ]);
  }
  return iteration > 5 ? points : distort(newPoints, iteration + 1);
};

const points = distort([
  [200, 300],
  [400, 300],
  [400, 600],
  [200, 600],
  [200, 300],
]);
const paint = (i = 0) => {
  ctx.beginPath();
  ctx.fillStyle = randomHue(290, 310);
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.filter = `blur(${random(5, 40)}px)`;
};

setTimeout(() => {
  ctx = init(WIDTH, HEIGHT);
  paint();
}, 0);
