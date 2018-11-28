import {
  init,
  random,
  distort,
  middle,
  randomlyRotateAroundCenter,
} from './helpers';
import { randomHue } from './colors';
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

const paintDistortion = (config: PaintConfig, i = 0) => {
  ctx.globalCompositeOperation = 'darken';
  const { points, colors, blur, opacity, distortion, layers } = config;
  let distorted = distort(points, distortion);

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.beginPath();

  randomlyRotateAroundCenter(ctx, distorted);
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

const paintBalls = (n: number) => {
  ctx.globalCompositeOperation = 'screen';
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = randomHue(290, 350);
    const x = random(0, WIDTH);
    const y = random(0, HEIGHT);
    const r = random(1, 5);
    ctx.filter = `blur(${random(10, 20)}px) opacity(0.2)`;
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
};

const paint = () => {
  // paintBalls(30);

  const [w, h] = [WIDTH / 3.5, HEIGHT / 3.5];
  const [x, y] = [WIDTH / 2 - w / 2, HEIGHT / 2 - h / 4];
  paintDistortion({
    blur: [3, 10],
    colors: [290, 360],
    distortion: 20,
    layers: 100,
    opacity: [0.1, 0.4],
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
  });
};

function paintModel(
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
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint();
}, 0);
