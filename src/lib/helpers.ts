export function randomInt(min: number = 0, max: number = 100) {
  return Math.round(Math.random() * (max - min) + min);
}

export function randomFloat(min: number = 0, max: number = 1) {
  return Math.random() * (max - min) + min;
}

export type Vector2D = [number, number];
export type Shape = Vector2D[];

interface DistortOptions {
  coords: number[][];
  jitter: number;
  segments: number;
  height: number;
}

export interface Line {
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
}

export const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2));
export const between = (a: number, b: number, c: number) => a >= b && a <= c;
export const average = (a: number, b: number) => (a + b) / 2;
export const map = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export enum CanvasGlobalCompositionOperation {
  SOURCE_IN = 'source-in',
  SOURCE_OUT = 'source-out',
  SOURCE_ATOP = 'source-atop',
  DESTINATION_OVER = 'destination-over',
  DESTINATION_IN = 'destination-in',
  DESTINATION_OUT = 'destination-out',
  DESTINATION_ATOP = 'destination-atop',
  LIGHTER = 'lighter',
  COPY = 'COPY',
  XOR = 'xor',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color-dodge',
  COLOR_BURN = 'color-burn',
  HARD_LIGHT = 'hard-light',
  SOFT_LIGHT = 'soft-light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
  HUE = 'hue',
  SATURATION = 'saturation',
  COLOR = 'color',
  LUMINOSITY = 'luminosity',
}

export function paintGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  { showNumbers }: { showNumbers: boolean }
): void {
  const stepsX = width / 10;
  const stepsY = height / 20;
  ctx.font = `20px sans-serif`;

  for (let y = 0; y < height; y += stepsY) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
    ctx.closePath();

    for (let x = 0; x < width; x += stepsX) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.strokeStyle = '#ddd';
      ctx.stroke();
      ctx.closePath();

      if (showNumbers) {
        ctx.fillStyle = '#f00';
        ctx.fillText(`${Math.round(x)} : ${Math.round(y)}`, x, y);
      }
    }
  }
}

export function init(
  width: number,
  height: number,
  clear = true,
  id = 'canvas'
): CanvasRenderingContext2D {
  if (clear) {
    document.body.innerHTML = '';
  }
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.setAttribute('id', id);
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = true;
  return ctx;
}

export function middle([x1, y1]: number[], [x2, y2]: number[]): number[] {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

export function pointAlong([x1, y1]: Vector2D, [x2, y2]: Vector2D): Vector2D {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

export function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: Vector2D[],
  { color, outline }: { color: string; outline?: boolean }
) {
  ctx.beginPath();
  ctx.moveTo(...shape[0]);
  shape.forEach(point => ctx.lineTo(...point));
  // ctx.closePath();
  if (outline) {
    ctx.strokeStyle = color;
    ctx.stroke();
  } else {
    ctx.fillStyle = color;
    ctx.fill();
  }
}

export function distort({
  coords,
  jitter,
  segments,
  height,
}: DistortOptions): Vector2D[] {
  const distorted: Vector2D[] = [];
  const WIDTH = coords[1][0];
  for (let i = 1; i < segments; i++) {
    const x = (i * WIDTH) / segments;
    const y = distorted[i - 1][1] + randomFloat(-jitter, jitter) * Math.sin(i);
    distorted.push([x, y]);
  }
  distorted.push([WIDTH, height]);
  distorted.push([0, height]);
  return distorted;
}

export function distort2(
  points: Vector2D[],
  jitter = 5,
  iteration = 0
): Vector2D[] {
  let newPoints: Vector2D[] = [];
  points.forEach((point, i) => {
    newPoints.push(point);
    const [x, y] = middle(points[i], points[i + 1] || points[0]);
    newPoints.push([
      x + randomFloat(-jitter, jitter),
      y + randomFloat(-jitter, jitter),
    ]);
  });
  return iteration > 5
    ? points
    : distort2(newPoints, jitter + 1, iteration + 1);
}
