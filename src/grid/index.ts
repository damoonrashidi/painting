import { init, randomFloat, randomHue, randomInt } from '../lib';

// const [WIDTH, HEIGHT] = [11811, 17717];
const [WIDTH, HEIGHT] = [2160, 3890];
const PADDING = WIDTH / 6;

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
  const normalizedArea = parseInt(area.toString().substr(0, 4));
  let count = (HEIGHT - y) * randomFloat(15, 18);
  count += normalizedArea;
  const cappedCount = Math.min(4000, count);
  return cappedCount;
}

function generateColumns(width: number, height: number): Column[] {
  let x = PADDING;
  const columns: Column[] = [];
  while (x < WIDTH) {
    let y = PADDING;
    const columnWidth = randomFloat(WIDTH * 0.005, WIDTH * 0.1);
    const segments: Segment[] = [];
    const columnHeight = HEIGHT - PADDING;

    while (y < columnHeight - PADDING) {
      let segmentHeight = randomFloat(30, 250);
      const isTall = randomFloat(0, 1) > 0.8;
      if (isTall) {
        segmentHeight = randomFloat(200, 400);
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
    // ctx.beginPath();
    // ctx.arc(dotX, dotY, r, 0, Math.PI * 2);
    // ctx.closePath();
    ctx.fillRect(dotX, dotY, r, r);
  }
}

const paint = (ctx: CanvasRenderingContext2D) => {
  const columns: Column[] = generateColumns(WIDTH, HEIGHT);

  columns.forEach(({ segments }) => {
    segments.forEach(segment => drawSegment(ctx, segment));
  });

  ctx.fillStyle = '#fff';
  ctx.fillRect(WIDTH - PADDING, 0, PADDING, HEIGHT);
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
}, 0);
