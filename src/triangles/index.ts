import { init, randomHue, random, middle } from '../lib';
const WIDTH = 3000;
const HEIGHT = 3000;

type Vector2D = [number, number];
type Triangle = [Vector2D, Vector2D, Vector2D];

const splitTriangle = (triangle: Triangle): Triangle[] => {
  const a = random(0, 2, true);
  const b = (a + 1) % 3;
  const c = (b + 1) % 3;

  const d = middle(triangle[b], triangle[c]);

  return [
    [triangle[a], [d[0], d[1]], triangle[b]],
    [triangle[a], triangle[c], [d[0], d[1]]],
  ];
};

function drawTriangle(ctx: CanvasRenderingContext2D, triangle: Triangle): void {
  ctx.beginPath();
  ctx.moveTo(...triangle[0]);
  for (const line of triangle) {
    ctx.lineTo(...line);
  }
  ctx.lineTo(...triangle[0]);
  ctx.stroke();
  ctx.closePath();
}

const paint = (ctx: CanvasRenderingContext2D) => {
  const rootTriangle: Triangle = [
    [WIDTH / 2, 0],
    [WIDTH, HEIGHT],
    [0, HEIGHT],
  ];

  let triangles = [rootTriangle];

  for (let i = 0; i < 20; i++) {
    if (random(0, 1, false) > 0.5) {
      triangles = triangles
        .map(splitTriangle)
        .reduce((list, sublist) => list.concat(sublist));
    }
  }

  triangles.forEach(triangle => drawTriangle(ctx, triangle));
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fdfff5';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
