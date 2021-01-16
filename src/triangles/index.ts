import { init, randomFloat, Vector2D, randomInt } from '../lib';
import { drawTriangle2, splitTriangle, Triangle } from './helpers';

// const [WIDTH, HEIGHT] = [4.5e3, 8e3];
const [WIDTH, HEIGHT] = [2000, 2000];

const paint = (ctx: CanvasRenderingContext2D) => {
  const roots: Triangle[] = [];

  const PADDING = WIDTH * 0.1;
  const w = WIDTH * 0.2;
  const h = HEIGHT * 0.2;

  for (let y = PADDING; y < HEIGHT - PADDING; y += h + PADDING) {
    for (let x = PADDING; x < WIDTH - PADDING; x += w + PADDING) {
      const triangle1 = {
        coords: [
          [x, y],
          [x + w, y],
          [x, y + h],
        ] as [Vector2D, Vector2D, Vector2D],
        depth: randomInt(10, 20),
        color: '#fff',
      };

      const triangle2 = {
        coords: [
          [x + w, y],
          [x, y + h],
          [x + w, y + h],
        ] as [Vector2D, Vector2D, Vector2D],
        depth: randomInt(10, 20),
        color: '#fff',
      };
      roots.push(triangle1, triangle2);
    }
  }

  roots.forEach(rootTriangle => {
    const triangles = [rootTriangle];

    for (let depth = 0; depth < triangles[0].depth; depth++) {
      for (let i = triangles.length - 1; i >= 0; i--) {
        const triangle = triangles[i];
        if (triangle.depth > 0 && randomFloat() > 0.6) {
          triangles.splice(i, 1);
          const [a, b] = splitTriangle(triangle);
          triangles.push(a, b);
        }
      }
    }
    triangles.forEach(triangle => drawTriangle2(ctx, triangle));
  });
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
