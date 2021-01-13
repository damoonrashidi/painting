import { between, init, paintGrid, randomFloat } from '../lib';
import { getColor, createDepthMap } from './helpers';
const Simplex = require('perlin-simplex');

const WIDTH = 2464;
const HEIGHT = 3280;

const paint = (
  ctx: CanvasRenderingContext2D,
  ref: CanvasRenderingContext2D,
  depth: CanvasRenderingContext2D
) => {
  const simplex = new Simplex();
  const w = 0.5;

  console.time('depthMap');
  const depthMap = createDepthMap(depth, WIDTH, HEIGHT);
  console.timeEnd('depthMap');

  ctx.fillStyle = getColor(ref, x, y);

  console.time('paint');
  for (let i = 0; i < 5000; i++) {
    let [x, y] = [randomFloat(0, WIDTH), randomFloat(0, HEIGHT)];

    while (
      between(x, 0, WIDTH) &&
      between(y, 0, HEIGHT) &&
      randomFloat() > 0.001
    ) {
      const blackness = depthMap.get(`${x}:${y}`) || 0;
      const coefficient = 100 + blackness * 20;
      const n = simplex.noise(x / coefficient, y / coefficient);
      x += Math.cos(n * Math.PI * 2);
      y += Math.tan(n * Math.PI * 2);
      ctx.fillRect(x, y, w, w);
    }
  }
  console.timeEnd('paint');
};

setTimeout(() => {
  console.clear();
  let refLoaded = false;
  let depthLoaded = false;

  const ctx = init(WIDTH, HEIGHT, true);
  const ref = init(WIDTH, HEIGHT, false, 'reference-canvas');
  const depth = init(WIDTH, HEIGHT, false, 'depth-canvas');

  (document.getElementById(
    'reference-canvas'
  ) as HTMLCanvasElement).style.display = 'none';
  const referenceImage = new Image();
  referenceImage.onload = () => {
    ref.drawImage(referenceImage, 0, 0, WIDTH, HEIGHT);
    refLoaded = true;

    if (depthLoaded) {
      paint(ctx, ref, depth);
    }
  };
  referenceImage.src = '/static/ref.jpg';

  (document.getElementById('depth-canvas') as HTMLCanvasElement).style.display =
    'none';
  const depthImage = new Image();
  depthImage.onload = () => {
    depthLoaded = true;

    depth.drawImage(depthImage, 0, 0, WIDTH, HEIGHT);
    if (refLoaded) {
      paint(ctx, ref, depth);
    }
  };
  depthImage.src = '/static/depth.jpg';
});
