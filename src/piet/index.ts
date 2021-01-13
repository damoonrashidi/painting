import { init, randomHue, randomFloat, randomInt, Vector2D } from '../lib';
import { Square, drawSquare, fillSquare, splitSquares, Split } from './helpers';

const [WIDTH, HEIGHT] = [10000, 10000];
// const [WIDTH, HEIGHT] = [3000, 3000];
const PADDING_X = -WIDTH / 2;
const PADDING_Y = -HEIGHT / 2;

function paint(ctx: CanvasRenderingContext2D): void {
  let squares: Square[] = [
    {
      x: PADDING_X,
      y: PADDING_Y,
      width: WIDTH - PADDING_X * 2,
      height: HEIGHT - PADDING_Y * 2,
    },
  ];

  /**
   * Set the inside of the Piet to white
   */
  ctx.fillStyle = '#fff';
  ctx.fillRect(150, 150, WIDTH - 300, HEIGHT - 300);

  ctx.translate(WIDTH / 2, HEIGHT / 2);
  ctx.rotate((45 * Math.PI) / 180);
  ctx.translate(-WIDTH / 2, -HEIGHT / 2);

  /**
   * Create all the squares
   */

  const points: Vector2D[] = [];

  for (let i = 0; i < 30; i++) {
    const point: Vector2D = [
      randomFloat(150, WIDTH - PADDING_X / 2),
      randomFloat(150, HEIGHT - PADDING_Y / 2),
    ];

    squares = splitSquares(squares, point);
  }

  squares.forEach(square => drawSquare(ctx, square));
  const randomSquares = squares.filter(() => randomFloat(0, 1) > 0.85);
  randomSquares.forEach(square => fillSquare(ctx, square));
}

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);

  ctx.fillStyle = '#fff';

  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
