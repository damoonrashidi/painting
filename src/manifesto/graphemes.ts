import { Shape, Vector2D, randomFloat, randomInt, drawShape } from '../lib';
import {
  Grapheme,
  GraphemeFunction,
  GraphemeFill,
  GraphemeType,
} from './helpers';

export const triangle: GraphemeFunction = (
  x: number,
  y: number,
  width: number,
  height: number
): Grapheme => {
  const path: Shape = Array(3)
    .fill(false)
    .map(() => [
      randomFloat(x + width * 0.2, x + width * 0.8),
      randomFloat(y + height * 0.2, y + height * 0.8),
    ]);

  return {
    fill: GraphemeFill.STROKE,
    type: GraphemeType.TRIANGLE,
    path,
  };
};

export const triangleFull: GraphemeFunction = (
  x: number,
  y: number,
  width: number,
  height: number
): Grapheme => {
  const { path } = triangle(x, y, width, height);

  return {
    fill: GraphemeFill.FILL,
    type: GraphemeType.TRIANGLE_FULL,
    path,
  };
};

export const circle: GraphemeFunction = (
  x: number,
  y: number,
  width: number,
  height: number
): Grapheme => {
  const [oX, oY] = [
    randomFloat(x + width * 0.2, x + width * 0.8),
    randomFloat(y + height * 0.2, y + height * 0.8),
  ];

  const r = randomFloat(width * 0.1, width * 0.3);

  return {
    fill: GraphemeFill.STROKE,
    type: GraphemeType.CIRCLE,
    path: [
      [oX, oY],
      [r, r],
    ],
  };
};

export const square: GraphemeFunction = (
  x: number,
  y: number,
  width: number,
  height: number
): Grapheme => {
  const box = {
    x: 0,
    y: 0,
    size: 0,
  };

  box.size = randomFloat(width * 0.1, width * 0.2);
  box.x = randomFloat(x, x + width - box.size);
  box.y = randomFloat(y, y + height - box.size);

  return {
    fill: GraphemeFill.STROKE,
    type: GraphemeType.SQUARE,
    path: [
      [box.x, box.y],
      [box.x + box.size, box.y],
      [box.x + box.size, box.y + box.size],
      [box.x, box.y + box.size],
    ],
  };
};

export const squareFull: GraphemeFunction = (
  x: number,
  y: number,
  width: number,
  height: number
): Grapheme => {
  const { path } = square(x, y, width, height);

  return {
    fill: GraphemeFill.FILL,
    type: GraphemeType.SQUARE_FULL,
    path,
  };
};

export const bar: GraphemeFunction = (
  x: number,
  y: number,
  width: number,
  height: number
): Grapheme => {
  const bar = {
    x: 0,
    y: 0,
    length: randomFloat(width * 0.1, width * 0.2),
    thickness: randomFloat(5, 15),
  };

  bar.x = randomFloat(x, x + width - bar.length);
  bar.y = randomFloat(y, y + height - bar.thickness);

  return {
    fill: GraphemeFill.FILL,
    type: GraphemeType.BAR,
    path: [
      [bar.x, bar.y],
      [bar.x + bar.length, bar.y],
      [bar.x + bar.length, bar.y + bar.thickness],
      [bar.x, bar.y + bar.thickness],
    ],
  };
};

export const empty: GraphemeFunction = (
  x: number,
  y: number,
  width: number,
  height: number
): Grapheme => {
  return {
    fill: GraphemeFill.STROKE,
    type: GraphemeType.EMPTY,
    path: [
      [x, y],
      [x, y],
    ],
  };
};
