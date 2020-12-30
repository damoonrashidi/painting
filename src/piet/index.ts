import { init, randomHue, randomFloat, randomInt, Vector2D } from '../lib';
import { Square, drawSquare, fillSquare, splitSquares, Split } from './helpers';

// const [WIDTH, HEIGHT] = [11811, 17717];
const [WIDTH, HEIGHT] = [2160, 3890];

function paint(ctx: CanvasRenderingContext2D): void {
  let squares: Square[] = [
    {
      x: 150,
      y: 150,
      width: WIDTH - 300,
      height: HEIGHT - 300,
    },
  ];

  /**
   * Set the inside of the Piet to white
   */
  ctx.fillStyle = '#fff';
  ctx.fillRect(150, 150, WIDTH - 300, HEIGHT - 300);

  /**
   * Create all the squares
   */

  const points: Vector2D[] = [];
  let [x, y] = [WIDTH / 2, HEIGHT / 2];

  for (let i = 0; i < 500; i++) {
    x -= randomInt(100, 200);
    y -= randomInt(150, 250);

    if (x <= 0) {
      x = WIDTH;
    }
    if (y <= 0) {
      y = HEIGHT;
    }

    points.push([x, y]);
  }

  points.forEach(point => {
    squares = splitSquares(squares, point);
  });

  squares.forEach(square => drawSquare(ctx, square));
  const randomSquares = squares.filter(() => randomFloat() > 0.9);
  randomSquares.forEach(square => fillSquare(ctx, square));
}

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);

  ctx.fillStyle = '#fff';

  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
