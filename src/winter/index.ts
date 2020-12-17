import { init, random, middle, pointAlong, between } from '../lib';
const WIDTH = 2890;
const HEIGHT = 3860;
type Vector2D = [number, number];

/**
 * The X and Y here are the starting posistion for the crown of the Tree
 */
const tree = ([x, y]: Vector2D) => {};

const paint = (ctx: CanvasRenderingContext2D) => {
  /**
   * this is assuming gaussian distrubtion for dots, but we can probably do better
   * if we segment the tree at this point and the do branches and trunk at the same time.. or maybe
   * its a nicer effect to do the trunk first, and then branches
   */

  for (let a = 0; a < 30; a++) {
    const adjustX = random(-50, 500);
    const adjustY = random(-500, 500);
    for (let i = 0; i < 1000; i++) {
      const trunk = [
        WIDTH / 2 - adjustX,
        HEIGHT / 2 + adjustY,
        WIDTH / 2 + adjustX + 10,
        HEIGHT / 3 + adjustY,
      ];
      const x = random(trunk[0], trunk[2], false);
      const y = random(trunk[1], trunk[3], false);

      ctx.beginPath();
      ctx.fillStyle = '#555';
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }
};

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});

/**
 *
 *  Attributes for a tree
 *   * X and Y for crown
 *   * Height
 *   * Dot Density
 *   * Width
 *
 * -- Future attributes for a tree
 *   * Distortion / tipping
 *   * Branch distortion
 *   * unevenness
 *
 *           ^
 *          ~|~
 *       ~~~~|~~~~
 *        ~~~|~~~
 *     ~~~~~~|~~~~~~
 *       ~~~~|~~~~
 *  ~~~~~~~~~|~~~~~~~~~
 *     ~~~~~~|~~~~~
 *           |
 *
 *
 *
 *
 *  Transform each branch into a Rect, and fill that rect with DOTS
 *  The dot density determines how many dots there should be
 */
