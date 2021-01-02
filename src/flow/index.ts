import { Vector2D, init, randomFloat } from '../lib';
const Simplex = require('perlin-simplex');

const [WIDTH, HEIGHT] = [2160, 3890];
// const [WIDTH, HEIGHT] = [11811, 17717];
const startX = WIDTH * 0.1;
const stopX = WIDTH - startX;
const startY = HEIGHT * 0.05;
const stopY = HEIGHT - startY;

function paint(ctx: CanvasRenderingContext2D) {
  const grid: number[][] = [];

  const ROWS = 176;
  const COLUMNS = 87;

  // ctx.fillStyle = 'rgba(0,0,0,0.05)';
  // ctx.fillRect(startX, startY, stopX - startX, stopY - startY);

  const simplex = new Simplex();
  console.log(simplex);

  for (let y = 0; y < ROWS; y++) {
    grid.push([]);
    for (let x = 0; x < COLUMNS; x++) {
      const noise = simplex.noise(x, y) + 0.5;
      console.log(noise);
      const angle = map(noise + Math.abs(noise), 0, 2, 0, Math.PI * 2);
      grid[y][x] = angle;

      const xPos = startX + x * 20;
      const yPos = startY + y * 20;

      ctx.beginPath();
      ctx.moveTo(xPos, yPos);
      ctx.lineTo(xPos + 20 * Math.cos(angle), yPos + 20 * Math.sin(angle));
      ctx.stroke();
    }
  }

  // const x = randomFloat(startX, stopX - startX);
  // const y = randomFloat(startY, stopY - startY);

  // const x = randomFloat(startX, stopX - startX);
  // const y = randomFloat(startY, stopY - startY);

  // const angle = positionToGrid(x, y, grid);
}

function map(
  value: number,
  min1: number,
  max1: number,
  min2: number,
  max2: number
): number {
  const percentOfMin = value / (max1 - min1);
  return percentOfMin * (max2 - min1);
}

function positionToGrid(x: number, y: number, grid: number[][]): number {
  const iX = Math.floor(x / 20);
  const iY = Math.floor(y / 20);
  return 0;
}

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
