export function init(width: number, height: number): CanvasRenderingContext2D {
  document.body.innerHTML = '';
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = true;
  return ctx;
}

export const random = (min: number = 0, max: number = 100, rounded = true) =>
  rounded
    ? Math.floor(Math.random() * (max - min) + min)
    : Math.random() * (max - min) + min;

export const middle = ([x1, y1]: number[], [x2, y2]: number[]): number[] => [
  (x1 + x2) / 2,
  (y1 + y2) / 2,
];

export function distort(
  points: number[][],
  jitter = 5,
  iteration = 0
): number[][] {
  let newPoints: number[][] = [];
  points.forEach((point, i) => {
    newPoints.push(point);
    const [x, y] = middle(points[i], points[i + 1] || points[0]);
    newPoints.push([x + random(-jitter, jitter), y + random(-jitter, jitter)]);
  });
  return iteration > 3 ? points : distort(newPoints, jitter, iteration + 1);
}

export function randomlyRotateAroundCenter(
  ctx: CanvasRenderingContext2D,
  model: number[][]
) {
  const point = middle(model[0], model[Math.round(model.length / 2)]);
  ctx.translate(point[0], point[1] - 100);
  ctx.rotate((random(-100, 100) * Math.PI) / 180);
  ctx.translate(-point[0], -point[1]);
  ctx.moveTo(model[0][0], model[0][1]);
}
