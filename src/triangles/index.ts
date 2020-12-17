import { init, randomHue, random, middle, pointAlong } from '../lib';
const WIDTH = 2160;
const HEIGHT = 3840;

type Vector2D = [number, number];
interface Triangle {
  coords: [Vector2D, Vector2D, Vector2D];
  depth: number;
  color: string;
  hue: number;
}

const randomPointInTriangle = (coords: Triangle['coords']): Vector2D => {
  let a = random(0, 1, false);
  let b = random(0, 1, false);

  if (a + b > 1) {
    a = 1 - a;
    b = 1 - b;
  }

  let c = 1 - a - b;

  const x = a * coords[0][0] + b * coords[1][0] + c * coords[2][0];
  const y = a * coords[0][1] + b * coords[1][1] + c * coords[2][1];

  return [x, y];
};

const makeTriangle = (baseTriangle?: Partial<Triangle>): Triangle => ({
  coords: [
    [0, 0],
    [WIDTH, 0],
    [WIDTH, HEIGHT],
  ],
  hue: 150,
  depth: 0,
  color: '#f00',
  ...baseTriangle,
});

const splitTriangle = (triangle: Triangle): Triangle[] => {
  const a = random(1, 3, true) % 3;
  const b = (a + 1) % 3;
  const c = (b + 1) % 3;

  const d = pointAlong(triangle.coords[b], triangle.coords[c]);

  return [
    makeTriangle({
      hue: triangle.hue + random(-10, 10, true),
      coords: [triangle.coords[a], [d[0], d[1]], triangle.coords[b]],
      depth: triangle.depth - 1 - random(0, 1, true),
      color: randomHue(200, 360, 1, random(40, 70), random(50, 100, false)),
    }),
    makeTriangle({
      hue: triangle.hue + random(-10, 10, true),
      coords: [triangle.coords[a], triangle.coords[c], [d[0], d[1]]],
      depth: triangle.depth - 1 - random(0, 1, true),
      color: randomHue(0, 360, 1, random(40, 70), random(50, 100, false)),
    }),
  ];
};

function drawTriangle(ctx: CanvasRenderingContext2D, triangle: Triangle): void {
  ctx.moveTo(...triangle.coords[0]);
  for (const line of triangle.coords) {
    ctx.lineTo(...line);
  }
  ctx.lineTo(...triangle.coords[0]);
  ctx.closePath();

  const density = random(20, 1000);
  ctx.fillStyle = randomHue(0, 40, 1, 0, random(0, 100, true));
  const r = random(0, 1, false);

  // let count = 0;
  for (let i = 0; i < density; i++) {
    const [x, y] = randomPointInTriangle(triangle.coords);
    ctx.moveTo(x, y);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

const makeRandom = (coords: [Vector2D, Vector2D, Vector2D], depth?: number) =>
  makeTriangle({
    coords,
    depth: depth || random(50, 2000, true),
  });

const paint = (ctx: CanvasRenderingContext2D) => {
  const roots: Triangle[] = [
    makeRandom(
      [
        [WIDTH * 0.5, HEIGHT * 0.2],
        [WIDTH * 0.95, HEIGHT * 0.85],
        [WIDTH * 0.05, HEIGHT * 0.85],
      ],
      1000
    ),
  ];

  roots.forEach(rootTriangle => {
    let triangles = [rootTriangle];
    for (let i = 0; i < triangles[0].depth; i++) {
      if (triangles[i].depth > 0 || random(0, 1, false) > 0.5) {
        const subTriangles = splitTriangle(triangles[i]);
        triangles.push(...subTriangles);
      }
    }
    triangles.forEach(triangle => drawTriangle(ctx, triangle));
  });
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fdfff5';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
