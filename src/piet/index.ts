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
  rootColor: number;
}

interface Vector2D {
  x: number;
  y: number;
}

function splitSquare(parent: Square): Square {
  const randomXInParent = random(parent.x, parent.x + parent.width);
  const randomYInParent = random(parent.y, parent.y + parent.height);

  const point = {
    x: randomXInParent,
    y: randomYInParent,
  };

  const color = parent.rootColor + random(-50, 50);
  const children: Square[] = [
    {
      depth: parent.depth + 1,
      x: parent.x,
      y: parent.y,
      width: Math.abs(point.x - parent.x),
      height: Math.abs(parent.y - point.y),
      children: [],
      rootColor: parent.rootColor + random(-50, 50, true),
      color: randomHue(color - 20, color + 20, 1, 80, 60),
    },
    {
      depth: parent.depth + 1,
      x: point.x,
      y: parent.y,
      width: Math.abs(parent.width - point.x),
      height: Math.abs(point.y - parent.y),
      children: [],
      rootColor: parent.rootColor + random(-50, 50, true),
      color: randomHue(color - 20, color + 20, 1, 80, 60),
    },
    {
      depth: parent.depth + 1,
      x: parent.x,
      y: point.y,
      width: Math.abs(point.x - parent.x),
      height: Math.abs(parent.height - point.y),
      children: [],
      rootColor: parent.rootColor + random(-50, 50, true),
      color: randomHue(color - 20, color + 20, 1, 80, 60),
    },
    {
      depth: parent.depth + 1,
      x: point.x,
      y: point.y,
      width: Math.abs(parent.width - point.x),
      height: Math.abs(parent.height - point.y),
      children: [],
      rootColor: parent.rootColor + random(-50, 50, true),
      color: randomHue(color - 20, color + 20, 1, 80, 60),
    },
  ];

  return {
    ...parent,
    children,
  };
}

function drawSquare(ctx: CanvasRenderingContext2D, square: Square): void {
  ctx.fillStyle = square.color;
  ctx.beginPath();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = (1 / (square.depth + 1)) * 10;
  ctx.rect(square.x, square.y, square.width, square.height);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  for (let child of square.children) {
    if (square.depth < 7 && random(0, 1, false) > 0.5) {
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
    rootColor: 300,
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
