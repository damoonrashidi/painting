import { init, random, Line } from "./helpers";
import { randomHue } from "./colors";
import { randomHex } from "../city/colors";
const WIDTH = 3000;
const HEIGHT = 4000;

const paint = (ctx: CanvasRenderingContext2D) => {
  const lines: Line[] = Array(250)
    .fill(0)
    .map(() => {
      const height = random(20, HEIGHT / 2);

      return {
        x: random(0, WIDTH),
        y: random(-HEIGHT, HEIGHT),
        color: randomHue(),
        width: random(2, 60),
        height,
      };
    });

  lines.forEach(({ x, y, width, height, color }) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x + width / 2, y, width / 2, width / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(
      x + width / 2,
      y + height,
      width / 2,
      width / 2,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.fillRect(x, y, width, height);
    ctx.closePath();
  });
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = "#061729";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
