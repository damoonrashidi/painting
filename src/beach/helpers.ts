import { Vector2D, distort2, Shape } from '../lib';

export interface Segment {
  shape: Shape;
  color: string;
}

export interface Stripe {
  segments: Segment[];
}

export function createPath(
  x: number,
  y: number,
  width: number,
  height: number,
  distort: number = 1
): Shape {
  return distort2(
    [
      [x, y],
      [x + width, y],
      [x + width, y + height],
      [x, y + height],
    ],
    distort
  );
}
