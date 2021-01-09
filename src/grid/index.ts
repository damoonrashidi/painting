import {
  init,
  random,
  paintGrid,
  Vector2D,
  randomHue,
  randomInt,
} from '../lib';

const [WIDTH, HEIGHT] = [11811, 17717];
// const [WIDTH, HEIGHT] = [2160, 3890];
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
  let count = (HEIGHT - y) * random(15, 18);
  count += normalizedArea;
  const cappedCount = Math.min(5000, count);

  return cappedCount;
}

function generateColumns(width: number, height: number): Column[] {
  let x = PADDING;
  const columns: Column[] = [];
  while (x < WIDTH) {
    let y = PADDING;
    const columnWidth = random(10, 500, true);
    const segments: Segment[] = [];
    const columnHeight = HEIGHT - PADDING;

    while (y < columnHeight) {
      let segmentHeight = random(30, 250);
      const isTall = random(0, 1, false) > 0.8;
      if (isTall) {
        segmentHeight = random(200, 400);
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

  ctx.fillStyle = randomHue(0, 0, 100, 0, randomInt(85, 95));
  for (let i = 0; i < dotCount; i++) {
    const dotX = random(x, x + width, false);
    const dotY = random(y, y + height, false);
    const r = random(0.1, 2, false);
    ctx.beginPath();
    ctx.arc(dotX, dotY, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

const paint = (ctx: CanvasRenderingContext2D) => {
  const columns: Column[] = generateColumns(WIDTH, HEIGHT);

  columns.forEach(({ segments }) => {
    segments.forEach(segment => drawSegment(ctx, segment));
  });

  ctx.fillStyle = '#111';
  ctx.fillRect(WIDTH - PADDING, 0, PADDING, HEIGHT);
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
}, 0);
