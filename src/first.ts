import { init } from "./lib/helpers";
const [WIDTH, HEIGHT] = [600, 800];
let ctx: CanvasRenderingContext2D;
import COLORS, { randomHue } from "./lib/colors";

const paint = () => {
  drawBg();
  circle("rgba(100,100,100,.9)");
  pyramid("rgba(100,100,100,.9)");
  drawWater();
};

const drawShape = (points: number[][]) => {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  points.forEach(([x, y]) => {
    ctx.lineTo(x, y);
  });
  ctx.fillStyle = randomHue();
  ctx.fill();
  ctx.closePath();
};

const pyramid = (color: string) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(WIDTH / 2 - 300, HEIGHT);
  ctx.lineTo(WIDTH / 2, HEIGHT / 2);
  ctx.lineTo(WIDTH / 2 + 300, HEIGHT);
  ctx.stroke();
  ctx.translate(WIDTH / 2, HEIGHT / 2);
};

const drawWater = () => {
  for (let i = 0; i < 40; i++) {
    ctx.filter = `blur(${Math.random() * 20 + 10}px) opacity(${Math.random() *
      0.4})`;
    ctx.rotate(Math.PI * Math.random() * 10);
    drawShape([[0, 0], [0, 100], [0, 21]]);
    ctx.filter = "";
  }
};

const circle = (color: string) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(WIDTH / 2, HEIGHT / 2, 200, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
};

const drawBg = () => {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
};

setTimeout(() => {
  ctx = init(WIDTH, HEIGHT);
  paint();
}, 0);
