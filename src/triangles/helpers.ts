import {
  Vector2D,
  pointAlong,
  randomFloat,
  randomHue,
  randomInt,
} from '../lib';

export interface Triangle {
  coords: [Vector2D, Vector2D, Vector2D];
  depth: number;
  color: string;
}

export const splitTriangle = (triangle: Triangle): Triangle[] => {
  const a = randomInt(1, 3) % 3;
  const b = (a + 1) % 3;
  const c = (b + 1) % 3;

  const d = pointAlong(triangle.coords[b], triangle.coords[c]);

  const color = randomHue(
    0,
    360,
    randomFloat(0.5, 1),
    randomInt(60, 80),
    randomInt(50, 70)
  );

  return [
    {
      coords: [triangle.coords[a], [d[0], d[1]], triangle.coords[b]],
      depth: triangle.depth - randomInt(1, 3),
      color,
    },
    {
      coords: [triangle.coords[a], triangle.coords[c], [d[0], d[1]]],
      depth: triangle.depth - randomInt(1, 3),
      color,
    },
  ];
};

export function drawTriangle(
  ctx: CanvasRenderingContext2D,
  triangle: Triangle
): void {
  ctx.fillStyle = triangle.color;
  const r = randomFloat(0.5, 1.5);
  const dotCount = area(triangle) / 10;

  for (let i = 0; i < dotCount; i++) {
    const [x, y] = randomPointInTriangle(triangle.coords);
    ctx.fillRect(x, y, r, r);
  }
}

export function drawTriangle2(
  ctx: CanvasRenderingContext2D,
  { coords }: Triangle
): void {
  ctx.lineCap = 'square';
  ctx.strokeStyle = '#000';
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.moveTo(...coords[0]);
  for (const line of coords) {
    ctx.lineTo(...line);
  }
  ctx.closePath();
  ctx.stroke();
  // ctx.fill();
}

function randomPointInTriangle(coords: Triangle['coords']): Vector2D {
  let a = randomFloat();
  let b = randomFloat();

  if (a + b > 1) {
    a = 1 - a;
    b = 1 - b;
  }

  let c = 1 - a - b;

  const x = a * coords[0][0] + b * coords[1][0] + c * coords[2][0];
  const y = a * coords[0][1] + b * coords[1][1] + c * coords[2][1];

  return [x, y];
}

function area(triangle: Triangle): number {
  const xs = triangle.coords.map(([x]) => x);
  const ys = triangle.coords.map(([, y]) => y);

  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);

  const width = Math.abs(maxX - minX);
  const height = Math.abs(maxY - minY);

  return (width * height) / 2;
}
