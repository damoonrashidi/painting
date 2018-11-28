import { init, random, middle, paintGrid, distort, fib } from './helpers';
import { randomHue } from './colors';
const [WIDTH, HEIGHT] = [1200, 1600];
let ctx: CanvasRenderingContext2D;

interface MountainOptions {
  height: number;
  color: number;
}

interface CircleOptions {
  fill: boolean;
  color: string[];
  x: number;
  y: number;
  r: number;
  stroke: number;
}

const paint = () => {
  // draw background
  drawBackground('#fff', '#f0f0f0');

  drawCircle({
    color: ['#7dbdf2', '#7dbdf2'],
    fill: false,
    stroke: 10,
    r: WIDTH / 3.3,
    x: WIDTH / 2,
    y: HEIGHT / 2,
  });

  ctx.globalCompositeOperation = 'destination-in';
  drawCircle({
    color: ['#fff', 'transparent'],
    fill: true,
    stroke: 10,
    r: WIDTH / 3.25,
    x: WIDTH / 2,
    y: HEIGHT / 2 + 5,
  });

  //draw mountains
  ctx.globalCompositeOperation = 'darken';
  const heights = [...Array(5).keys()].map(i => fib(i + 11));
  heights.forEach((height, i) => {
    mountain({ height, color: 70 + i * 60 });
  });
};

function drawBackground(from: string, to: string) {
  const background = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  background.addColorStop(0, from);
  background.addColorStop(1, to);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawCircle(options: CircleOptions) {
  const { fill, x, y, r, color, stroke } = options;
  ctx.beginPath();
  const gradient = ctx.createLinearGradient(0, y - r / 2, 0, y + r / 2);
  gradient.addColorStop(0, color[0]);
  gradient.addColorStop(1, color[1]);
  ctx.lineWidth = stroke;
  ctx.strokeStyle = gradient;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  if (fill) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
  ctx.closePath();
}

const mountain = ({ height, color }: MountainOptions) => {
  ctx.beginPath();
  let coords = [[0, HEIGHT - height], [WIDTH, HEIGHT - height - 100]];
  coords = distort({
    coords,
    jitter: 15,
    segments: WIDTH / 10,
    height: HEIGHT,
  });
  ctx.moveTo(coords[0][0], coords[0][1]);

  /**
   * create a gradient from the top of the mountain to the bottom
   */
  const gradient = ctx.createLinearGradient(0, HEIGHT / 2, 0, HEIGHT);
  gradient.addColorStop(0, randomHue(color, color));
  gradient.addColorStop(1, randomHue(color, color + 80));
  ctx.fillStyle = gradient;

  coords.forEach(([x, y]) => {
    ctx.lineTo(x, y);
  });
  ctx.fill();
  ctx.closePath();
};

setTimeout(() => {
  ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint();
}, 0);