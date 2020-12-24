import { init, random, distort, rotateRandomlyAroundCenter } from './helpers';
import { randomHue } from './colors';
const [WIDTH, HEIGHT] = [800 * 4, 800 * 4];
let ctx: CanvasRenderingContext2D;

interface PaintConfig {
  points: number[][];
  colors: [number, number];
  blur: [number, number];
  opacity: [number, number];
  distortion: number;
  layers: number;
}

const paintDistortion = (config: PaintConfig, i = 0) => {
  const { points, colors, blur, opacity, distortion, layers } = config;
  let distorted = distort(points, distortion);

  ctx.globalCompositeOperation = 'darken';

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.beginPath();

  rotateRandomlyAroundCenter(ctx, distorted);
  paintModel(distorted, blur, opacity, colors);

  ctx.closePath();
  ctx.restore();

  if (i < layers - 1) {
    requestAnimationFrame(() =>
      paintDistortion(
        { points, colors, blur, opacity, distortion, layers },
        i + 1
      )
    );
  }
};

const paint = () => {
  // paintGrid(ctx, WIDTH, HEIGHT, 25);

  let [w, h] = [WIDTH / 2, HEIGHT / 4.5];
  let [x, y] = [WIDTH / 2 - w / 2, HEIGHT / 2 - h / 4];
  paintDistortion({
    blur: [2, 30],
    colors: [310, 360],
    distortion: 30,
    layers: 80,
    opacity: [0.0, 0.1],
    points: [
      [x * 1.25, y * 0.5],
      [x * 1.5, y * 0.75],
      [x * 1.5, y * 1.25],
      [x * 1.25, y * 1.5],
      [x * 0.75, y * 1.5],
      [x * 0.5, y * 1.25],
      [x * 0.5, y * 0.75],
      [x * 0.55, y * 0.75],
      [x * 0.75, y * 0.5],
      [x * 1.25, y * 0.5],
    ],
  });
};

function paintModel(
  model: number[][],
  blur: [number, number],
  opacity: [number, number],
  colors: [number, number]
) {
  for (let i = 0; i < model.length - 1; i++) {
    const [x, y] = model[i];
    const [eX, eY] = model[i + 1];
    ctx.bezierCurveTo(x, y, x + random(-10, 10), y + random(-10, 10), eX, eY);
  }

  ctx.filter = `blur(${random(blur[0], blur[1])}px)`;
  ctx.fillStyle = randomHue(
    colors[0],
    colors[1],
    random(opacity[0], opacity[1], false)
  );
  ctx.fill();
}

setTimeout(() => {
  ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint();
}, 0);
