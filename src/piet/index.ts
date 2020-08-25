import { init, randomHue, random } from '../lib';
const WIDTH = 3000;
const HEIGHT = 3000;

interface Square {
  children: Square[];
  depth: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface Vector2D {
  x: number;
  y: number;
}

function splitSquare(parent: Square): Square {
  const pointPos = random(parent.x, parent.x + parent.width);

  const point = {
    x: pointPos,
    y: pointPos,
  };
  const children: Square[] = [
    {
      depth: parent.depth + 1,
      x: parent.x,
      y: parent.y,
      width: point.x - parent.x,
      height: point.y - parent.y,
      children: [],
      color: randomHue(300, 350, 0.5, 80, 70),
    },
    {
      depth: parent.depth + 1,
      x: point.x,
      y: parent.y,
      width: parent.width - point.x,
      height: point.y - parent.y,
      children: [],
      color: randomHue(300, 350, 0.5, 80, 70),
    },
    {
      depth: parent.depth + 1,
      x: parent.x,
      y: point.y,
      width: point.x - parent.x,
      height: parent.height - point.y,
      children: [],
      color: randomHue(300, 350, 0.5, 80, 70),
    },
    {
      depth: parent.depth + 1,
      x: point.x,
      y: point.y,
      width: parent.width - point.x,
      height: parent.height - point.y,
      children: [],
      color: randomHue(300, 350, 0.5, 80, 70),
    },
  ];

  return {
    ...parent,
    children,
  };
}

function drawSquare(ctx: CanvasRenderingContext2D, square: Square): void {
  ctx.lineWidth = 10;
  ctx.fillStyle = square.color;
  ctx.beginPath();
  ctx.rect(square.x, square.y, square.width, square.height);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

  for (let child of square.children) {
    if (square.depth < 2) {
      child = splitSquare(child);
    }
    drawSquare(ctx, child);
  }
}

const paint = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const rootSquare: Square = {
    children: [],
    depth: 0,
    x: 0,
    y: 0,
    width: WIDTH,
    height: HEIGHT,
    color: '#333',
  };

  drawSquare(ctx, splitSquare(rootSquare));
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fdfff5';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
