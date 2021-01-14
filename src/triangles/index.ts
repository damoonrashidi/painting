import { Triangle, drawTriangle, splitTriangle } from './helpers';
import { init } from '../lib';

// const [WIDTH, HEIGHT] = [4.5e3, 8e3];
const [WIDTH, HEIGHT] = [2160, 3860];

const paint = (ctx: CanvasRenderingContext2D) => {
  const roots: Triangle[] = [
    {
      coords: [
        [WIDTH * 0.1, HEIGHT * 0.65],
        [WIDTH * 0.73, HEIGHT * 0.2],
        [WIDTH * 0.85, HEIGHT * 0.75],
      ],
      depth: 40,
      color: '#f00',
    },
  ];

  console.time('Triangle');
  roots.forEach(rootTriangle => {
    const triangles = [rootTriangle];

    for (let depth = 0; depth < triangles[0].depth; depth++) {
      for (let i = triangles.length - 1; i >= 0; i--) {
        const triangle = triangles[i];
        if (triangle.depth <= 0) {
          continue;
        }
        triangles.splice(i, 1);
        const [a, b] = splitTriangle(triangle);
        triangles.push(a);
        triangles.push(b);
      }
    }

    console.log(`generated ${triangles.length} triangles`);
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
