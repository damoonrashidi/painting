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
      color: randomHue(200, 360, 1, random(40, 70), random(50, 100, false)),
    }),
  ];
};

function drawTriangle(ctx: CanvasRenderingContext2D, triangle: Triangle): void {
  ctx.beginPath();
  ctx.moveTo(...triangle.coords[0]);
  for (const line of triangle.coords) {
    ctx.lineTo(...line);
  }
  ctx.lineTo(...triangle.coords[0]);
  ctx.fillStyle = triangle.color;
  ctx.fill();
  // ctx.stroke();
  ctx.closePath();
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
        [WIDTH * 0.5, HEIGHT * 0.25],
        [WIDTH * 0.85, HEIGHT * 0.75],
        [WIDTH * 0.15, HEIGHT * 0.75],
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
