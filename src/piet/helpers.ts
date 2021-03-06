import { randomInt, Vector2D } from '../lib';

export interface Square {
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum Split {
  X,
  Y,
}

export function splitSquares(squares: Square[], [x, y]: Vector2D) {
  const copy = [...squares];

  for (let i = squares.length - 1; i >= 0; i--) {
    const square = copy[i];

    if (isInside([x, y], square)) {
      const split = square.width > square.height ? Split.X : Split.Y;
      const splits = split === Split.X ? splitX(square, x) : splitY(square, y);
      copy.splice(i, 1);
      copy.push(...splits);
    }
  }
  return copy;
}

const LINE_WIDTH = 15;

export function drawSquare(
  ctx: CanvasRenderingContext2D,
  { x, y, width, height }: Square
): void {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = LINE_WIDTH;
  ctx.stroke();
}

export function fillSquare(
  ctx: CanvasRenderingContext2D,
  square: Square
): void {
  const colors = [
    '#26547c',
    '#ef476f',
    '#ffd166',
    '#06d6a0',
    '#fffcf9',
    '#000000',
  ];
  const i = randomInt(0, colors.length);
  const color = colors[i];

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(
    square.x + LINE_WIDTH / 2,
    square.y + LINE_WIDTH / 2,
    square.width - LINE_WIDTH,
    square.height - LINE_WIDTH
  );
  ctx.closePath();
}

function splitX(square: Square, x: number): Square[] {
  return [
    {
      x: square.x,
      y: square.y,
      width: square.width - (square.width - x + square.x),
      height: square.height,
    },
    {
      x,
      y: square.y,
      width: square.width - x + square.x,
      height: square.height,
    },
  ];
}

function splitY(square: Square, y: number): Square[] {
  return [
    {
      x: square.x,
      y: square.y,
      width: square.width,
      height: square.height - (square.height - y + square.y),
    },
    {
      x: square.x,
      y,
      width: square.width,
      height: square.height - y + square.y,
    },
  ];
}

function isInside([x, y]: Vector2D, square: Square): boolean {
  const insideX = x >= square.x && x <= square.x + square.width;
  const insideY = y >= square.y && y <= square.y + square.height;

  return insideX && insideY;
}
