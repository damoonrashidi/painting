import { random, distort2, middle } from '../lib';

interface PaintConfig {
  points: number[][];
  color: string;
  blur: [number, number];
  opacity: [number, number];
  distortion: number;
  layers: number;
}

export function rotateRandomlyAroundCenter(
  ctx: CanvasRenderingContext2D,
  model: number[][]
) {
  const point = middle(model[0], model[Math.round(model.length / 2)]);
  ctx.translate(point[0] + random(-100, 100), point[1] + random(-100, 100));
  ctx.rotate((random(-180, 180) * Math.PI) / 180);
  ctx.translate(-point[0] + random(-100, 100), -point[1] + random(-100, 100));
  ctx.moveTo(model[0][0], model[0][1]);
}

function paintModel(
  ctx: CanvasRenderingContext2D,
  model: number[][],
  blur: [number, number],
  opacity: [number, number],
  color: string
) {
  for (let i = 0; i < model.length - 1; i++) {
    const [x, y] = model[i];
    const [eX, eY] = model[i + 1];
    ctx.bezierCurveTo(x, y, x + random(-10, 10), y + random(-10, 10), eX, eY);
  }

  ctx.save();
  ctx.filter = `blur(${random(blur[0], blur[1])}px)`;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

const paintDistortion = (
  ctx: CanvasRenderingContext2D,
  config: PaintConfig,
  i = 0
) => {
  const { points, color, blur, opacity, distortion, layers } = config;
  let distorted = distort2(points, distortion);

  ctx.globalCompositeOperation = 'darken';

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.beginPath();
  rotateRandomlyAroundCenter(ctx, distorted);
  paintModel(ctx, distorted, blur, opacity, color);
  ctx.closePath();

  ctx.restore();

  if (layers > 0) {
    paintDistortion(ctx, {
      points,
      color,
      blur,
      opacity,
      distortion,
      layers: layers - 1,
    });
  }
};

export function createStack(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  stack_width: number,
  stack_height: number
) {
  const points = [
    [x, y],
    [x + stack_width, y],
    [x + stack_width, y + stack_height],
    [x, y + stack_height],
  ];

  paintDistortion(ctx, {
    points,
    color,
    blur: [2, 30],
    opacity: [0.05, 0.1],
    distortion: 5,
    layers: 4,
  });

  /*
  const [toX, toY] = [x + random(-500, 500), y + random(-500, 500)];
  const cp1 = { x: toX - random(-500, 500), y: y - random(-500, 500) };
  const cp2 = { x: x - random(-500, 500), y: toY - random(500, 500) };

  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, toX, toY);
  ctx.strokeStyle = color;
  ctx.lineWidth = random(2, 8);
  ctx.stroke();
  ctx.closePath();

  const region = new Path2D();
  region.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length - 1; i++) {
    region.lineTo(points[i][0], points[i][1]);
  }
  region.closePath();

  ctx.fillStyle = color;
  region.closePath();
  ctx.fill(region);
 /**/
}
