import { Vector2D, randomFloat } from '../lib';
import { GraphemeFunction } from './helpers';

function getToplineRect(
  x: number,
  y: number,
  width: number,
  height: number
): [number, number, number, number] {
  return [x, y, width, height * 0.2];
}

function getMainRect(
  x: number,
  y: number,
  width: number,
  height: number
): [number, number, number, number] {
  const paddingTop = height * 0.2;

  return [x, y + paddingTop, width, height * 0.6];
}

function getBaselineRect(
  x: number,
  y: number,
  width: number,
  height: number
): [number, number, number, number] {
  const paddingTop = height * 0.2 + height * 0.6;
  return [x, y + paddingTop, width, height * 0.2];
}

function getMidPoints(
  x: number,
  y: number,
  width: number,
  height: number
): Vector2D {
  const midX = x + width / 2;
  const midY = y + height / 2;

  return [midX, midY];
}

/**
 * @GRAPHEME FUNCTIONS
 * ==========================================
 * The supported @Graphemes are
 * @KO TOP
 * @BI TOP ~
 * @DO TOP .
 * @TA MID ∫
 * @NE MID /\
 * @OB MID O
 * @SO MID ◊
 * @LI MID λ
 * @RE MID
 * @VE BASE |---|
 * @OC BASE  ---
 */

/**
 * @TOPLINE
 * |_____|
 */
export const KO: GraphemeFunction = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  const [_x, _y, w, h] = getToplineRect(x, y, width, height);

  ctx.beginPath();
  ctx.moveTo(_x, _y);
  ctx.lineTo(_x, _y + h);
  ctx.lineTo(_x + w, _y + h);
  ctx.lineTo(_x + w, _y);
  ctx.stroke();
};

export const DO: GraphemeFunction = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  const [_x, _y, w, h] = getToplineRect(x, y, width, height);

  const [midX, midY] = getMidPoints(_x, _y, w, h);

  ctx.beginPath();
  ctx.moveTo(midX, _y);
  ctx.arc(midX, _y, 2, 0, Math.PI * 2);
  ctx.fill();
};

/**
 * @MAINLINE
 */
export const TA: GraphemeFunction = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  const [_x, _y, w, h] = getMainRect(x, y, width, height);
  const midX = _x + w / 2;
  const r = w * 0.1;

  ctx.beginPath();
  ctx.moveTo(midX, _y);
  ctx.lineTo(midX, _y + h);
  ctx.lineTo(midX + r, _y + h - r);
  ctx.stroke();
};

export const NE: GraphemeFunction = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  const [_x, _y, w, h] = getMainRect(x, y, width, height);
  const midX = _x + w / 2;
  const r = w * 0.4;

  ctx.beginPath();
  ctx.moveTo(midX, _y);
  ctx.lineTo(midX - r, _y + h);
  ctx.lineTo(midX + r, _y + h);
  ctx.closePath();
  ctx.stroke();
};

export const OB: GraphemeFunction = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  const [_x, _y, w, h] = getMainRect(x, y, width, height);

  ctx.beginPath();
  ctx.rect(_x, _y, w, h);
  ctx.stroke();
  ctx.closePath();
};

/**
 * @BASELINE
 */

export const OC: GraphemeFunction = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  const [_x, _y, w, h] = getBaselineRect(x, y, width, height);

  ctx.beginPath();
  ctx.fillRect(_x, _y, w, h);
  ctx.closePath();
};
