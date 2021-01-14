import { Triangle, drawTriangle, splitTriangle } from './helpers';
import { init, randomFloat } from '../lib';

const [WIDTH, HEIGHT] = [4.5e3, 8e3];
// const [WIDTH, HEIGHT] = [2160, 3860];

const paint = (ctx: CanvasRenderingContext2D) => {
  const roots: Triangle[] = [
    {
      color: '#f00',
      coords: [
        [WIDTH * 0.1, HEIGHT * 0.65],
        [WIDTH * 0.73, HEIGHT * 0.2],
        [WIDTH * 0.85, HEIGHT * 0.75],
      ],
      depth: 50,
    },
  ];

  console.time('Triangle');
  roots.forEach(rootTriangle => {
    let triangles = [rootTriangle];
    for (let i = 0; i < triangles[0].depth; i++) {
      if (triangles[i].depth > 0 || randomFloat(0, 1) > 0.5) {
        const subTriangles = splitTriangle(triangles[i]);
        triangles.push(...subTriangles);
      }
    }
    triangles.forEach(triangle => drawTriangle(ctx, triangle));
  });
  console.timeEnd('Triangle');
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
