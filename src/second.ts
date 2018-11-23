import { init, random, distort, middle } from './lib/helpers';
import { randomHue } from './lib/colors';
const [WIDTH, HEIGHT] = [1200, 1600];
let ctx: CanvasRenderingContext2D;

interface PaintConfig {
  points: number[][];
  colors: [number, number];
  blur: [number, number];
  opacity: [number, number];
  distortion: number;
}

const paint = (config: PaintConfig, i = 0) => {
  const { points, colors, blur, opacity, distortion } = config;
  const distorted = distort(points, distortion);
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.beginPath();
  const point = middle(points[0], points[Math.round(points.length / 2)]);
  ctx.translate(point[0] + 400, point[1] + 300);
  ctx.rotate((random(-180, 180) * Math.PI) / 180);
  ctx.translate(-point[0], -point[1]);
  ctx.moveTo(distorted[0][0], distorted[0][1]);
  for (let i = 0; i < distorted.length; i++) {
    const [x, y] = distorted[i];
    ctx.lineTo(x, y);
  }
  ctx.filter = `blur(${random(blur[0], blur[1])}px)`;
  ctx.fillStyle = randomHue(
    colors[0],
    colors[1],
    random(opacity[0], opacity[1], false)
  );
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  if (i < 100) {
    requestAnimationFrame(() =>
      paint({ points, colors, blur, opacity, distortion }, i + 1)
    );
  }
};

setTimeout(() => {
  ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fffee5';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.globalCompositeOperation = 'darken';
  const [w, h] = [WIDTH / 4, HEIGHT / 4];
  const [x, y] = [200, 300];
  paint({
    points: [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]],
    colors: [290, 360],
    blur: [10, 40],
    opacity: [0.01, 0.04],
    distortion: 90,
  });
}, 0);
