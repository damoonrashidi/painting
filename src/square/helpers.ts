import { randomHue } from './colors';

export function init(
  width: number,
  height: number
): [HTMLCanvasElement, CanvasRenderingContext2D] {
  document.body.innerHTML = '';
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = true;
  return [canvas, ctx];
}

export function random(min: number = 0, max: number = 100, rounded = true) {
  return rounded
    ? Math.floor(Math.random() * (max - min) + min)
    : Math.random() * (max - min) + min;
}

export const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2));
