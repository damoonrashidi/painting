import { init, randomFloat, randomHue, randomInt } from '../lib';

const [WIDTH, HEIGHT] = [4e3, 8e3];
const PADDING = WIDTH / 7;

interface Column {
  x: number;
  width: number;
  segments: Segment[];
}

interface Segment {
  x: number;
  y: number;
  height: number;
  width: number;
  dotCount: number;
}

function getDotCount(y: number, area: number): number {
  return area / randomInt(1e4, 3e4);
}

function generateColumns(width: number, height: number): Column[] {
  let x = PADDING;
  const columns: Column[] = [];
  while (x < WIDTH) {
    let y = PADDING;
    const columnWidth = randomFloat(WIDTH * 0.003, WIDTH * 0.04);
    const segments: Segment[] = [];
    const columnHeight = HEIGHT - PADDING;

    while (y < columnHeight - PADDING) {
      let segmentHeight = HEIGHT * randomFloat(0.005, 0.01);
      const isTall = randomFloat(0, 1) > 0.8;
      if (isTall) {
        segmentHeight = HEIGHT * randomFloat(0.01, 0.03);
      }
      const dotCount = getDotCount(y, width * height);
      const segment: Segment = {
        x,
        y,
        height: segmentHeight,
        width: columnWidth,
        dotCount,
      };
      y += segmentHeight;

      segments.push(segment);
    }

    const column: Column = {
      x,
      width: columnWidth,
      segments,
    };
    columns.push(column);
    x += columnWidth;
  }

  return columns;
}

function drawSegment(ctx: CanvasRenderingContext2D, segment: Segment): void {
  const { x, y, width, height, dotCount } = segment;

  ctx.fillStyle = randomHue(0, 0, 100, 0, randomInt(0, 10));
  for (let i = 0; i < dotCount; i++) {
    const dotX = randomFloat(x, x + width);
    const dotY = randomFloat(y, y + height);
    const r = randomFloat(0.1, 2);
    ctx.fillRect(dotX, dotY, r, r);
  }
}

const paint = (ctx: CanvasRenderingContext2D) => {
  const columns: Column[] = generateColumns(WIDTH, HEIGHT);

  columns.forEach(({ segments }) => {
    segments.forEach(segment => drawSegment(ctx, segment));
  });

  ctx.fillStyle = '#f5fffa';
  ctx.fillRect(WIDTH - PADDING, 0, PADDING, HEIGHT);
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  document.body.style.height = `${HEIGHT}px`;
  document.body.style.width = `${WIDTH}px`;

  ctx.fillStyle = '#f5fffa';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
}, 0);
