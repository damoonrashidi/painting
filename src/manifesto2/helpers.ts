import { Vector2D, randomInt, randomFloat } from '../lib';
import * as Graphemes from './graphemes';

export type GraphemeFunction = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => void;

type Grapheme =
  | 'KO'
  | 'TA'
  | 'NE'
  | 'BI'
  | 'RE'
  | 'DO'
  | 'VE'
  | 'OC'
  | 'LI'
  | 'SO'
  | 'OB';

export function makeGlyph(): Grapheme[] {
  const top: Grapheme[] = ['KO', 'BI', 'DO'];
  const main: Grapheme[] = ['TA', 'NE', 'RE', 'LI', 'SO', 'OB'];
  const base: Grapheme[] = ['OC', 'VE'];

  const topPhemes = Array(randomInt(0, 2))
    .fill(false)
    .map(() => top[randomInt(0, top.length)]);

  const mainPhemes = Array(randomInt(1, 3))
    .fill(false)
    .map(() => main[randomInt(0, main.length - 1)]);

  const basePhemes = Array(randomInt(0, 1))
    .fill(false)
    .map(() => base[randomInt(0, base.length)]);

  return topPhemes.concat(mainPhemes).concat(basePhemes);
}

export function renderGlyph(
  ctx: CanvasRenderingContext2D,
  glyph: Grapheme[],
  x: number,
  y: number,
  width: number,
  height: number
): void {
  // ctx.fillStyle = 'rgba(0,0,0,0.2)';
  // ctx.fillRect(x, y, width, height);

  const map: Map<Grapheme, GraphemeFunction> = new Map([
    ['KO', Graphemes.KO],
    ['TA', Graphemes.TA],
    ['DO', Graphemes.DO],
    ['NE', Graphemes.NE],
    ['OB', Graphemes.OB],
    ['OC', Graphemes.OC],
  ]);

  ctx.lineWidth = randomFloat(2, 4);
  ctx.fillStyle = '#222';
  ctx.strokeStyle = '#222';
  ctx.lineCap = 'round';
  glyph.forEach(pheme => {
    const render = map.get(pheme);

    if (!render) {
      return;
    }

    render(ctx, x, y, width, height);
  });
}
