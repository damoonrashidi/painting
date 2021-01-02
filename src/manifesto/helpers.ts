import {
  Shape,
  Vector2D,
  randomFloat,
  randomHue,
  randomInt,
  drawShape,
} from '../lib';
import * as Graphemes from './graphemes';

export enum GraphemeFill {
  STROKE,
  FILL,
}

export enum GraphemeType {
  BAR,
  BAR_FAT,
  CIRCLE,
  CIRCLE_FULL,
  EMPTY,
  FAN,
  SQUARE,
  SQUARE_FAT,
  SQUARE_FULL,
  LINK,
  TRIANGLE,
  TRIANGLE_FULL,
}

export type GraphemeFunction = (
  x: number,
  y: number,
  width: number,
  height: number
) => Grapheme;

function randomGraphemeType() {
  const phemes = [
    GraphemeType.BAR,
    GraphemeType.BAR_FAT,
    GraphemeType.CIRCLE,
    GraphemeType.CIRCLE_FULL,
    GraphemeType.FAN,
    GraphemeType.SQUARE,
    GraphemeType.SQUARE_FAT,
    GraphemeType.SQUARE_FULL,
    GraphemeType.TRIANGLE,
    GraphemeType.TRIANGLE_FULL,
    GraphemeType.LINK,
  ];

  const i = randomInt(0, phemes.length);

  return phemes[i];
}

export interface Grapheme {
  fill: GraphemeFill;
  type: GraphemeType;
  path: Shape;
}

export type Glyph = Grapheme[];

export function generateGlyph(
  x: number,
  y: number,
  width: number,
  height: number
): Glyph {
  const count = randomInt(2, 4);
  const glyph: Glyph = [];
  for (let i = 0; i < count; i++) {
    const grapheme = generateGrapheme(x, y, width, height);
    glyph.push(grapheme);
  }

  return glyph;
}

export function renderGlyph(ctx: CanvasRenderingContext2D, glyph: Glyph): void {
  ctx.lineWidth = 4;
  glyph.forEach(grapheme => {
    ctx.save();
    ctx.translate(...grapheme.path[0]);
    ctx.rotate((randomInt(-20, 20) * Math.PI) / 180);
    ctx.translate(-grapheme.path[0][0], -grapheme.path[0][1]);
    ctx.lineWidth = randomFloat(2, 6);

    if (grapheme.type === GraphemeType.CIRCLE) {
      ctx.lineWidth = randomFloat(1, 20);
      ctx.beginPath();
      ctx.arc(
        grapheme.path[0][0],
        grapheme.path[0][1],
        grapheme.path[1][0],
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.stroke();
    } else {
      drawShape(ctx, grapheme.path, {
        color: '#222',
        outline: grapheme.fill === GraphemeFill.STROKE,
      });
    }

    ctx.restore();
  });
}

export function generateGrapheme(
  x: number,
  y: number,
  width: number,
  height: number
): Grapheme {
  const padding = width / 6;

  const type = randomGraphemeType();
  const graphemeMap: Map<GraphemeType, GraphemeFunction> = new Map<
    GraphemeType,
    GraphemeFunction
  >([
    [GraphemeType.SQUARE_FULL, Graphemes.squareFull],
    [GraphemeType.SQUARE, Graphemes.square],
    [GraphemeType.BAR, Graphemes.bar],
    [GraphemeType.TRIANGLE, Graphemes.triangle],
    [GraphemeType.TRIANGLE_FULL, Graphemes.triangleFull],
    [GraphemeType.CIRCLE, Graphemes.circle],
  ]);

  const generator = graphemeMap.get(type);

  if (generator === undefined) {
    return Graphemes.empty(x, y, width, height);
  }
  return generator(x, y, width, height);
}
