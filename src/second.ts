import {
  init,
  random,
  distort,
  middle,
  randomlyRotateAroundCenter,
} from './lib/helpers';
import { randomHue } from './lib/colors';
const [WIDTH, HEIGHT] = [600, 800];
let ctx: CanvasRenderingContext2D;

interface PaintConfig {
  points: number[][];
  colors: [number, number];
  blur: [number, number];
  opacity: [number, number];
  distortion: number;
  layers: number;
}

const paint = (config: PaintConfig, i = 0) => {
  const { points, colors, blur, opacity, distortion, layers } = config;
  let distorted = distort(points, distortion);

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.beginPath();

  randomlyRotateAroundCenter(ctx, distorted);
  paintDistortion(distorted, blur, opacity, colors);

  ctx.closePath();
  ctx.restore();

  if (i < layers - 1) {
    requestAnimationFrame(() =>
      paint({ points, colors, blur, opacity, distortion, layers }, i + 1)
    );
  }
};

function paintDistortion(
  model: number[][],
  blur: [number, number],
  opacity: [number, number],
  colors: [number, number]
) {
  for (let i = 0; i < model.length; i++) {
    const [x, y] = model[i];
    ctx.lineTo(x, y);
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
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.globalCompositeOperation = 'lighten';
  const [w, h] = [WIDTH / 2.5, HEIGHT / 2.5];
  const [x, y] = [180, 330];
  paint({
    layers: 15,
    points: [
      [x + w / 3, y],
      [x + (w / 3) * 2, y],
      [x + w, y + h / 3],
      [x + w, y + (h / 3) * 2],
      [x + (w / 3) * 2, y + h],
      [x + w / 3, y + h],
      [x, y + (h / 3) * 2],
      [x, y + h / 3],
      [x + w / 3, y],
    ],
    colors: [280, 360],
    blur: [3, 8],
    opacity: [0.1, 0.4],
    distortion: 10,
  });
}, 0);
