import {
  init,
  random,
  middle,
  pointAlong,
  between,
  Vector2D,
  paintGrid,
} from '../lib';
const WIDTH = 2160;
const HEIGHT = 3860;

function makeTree([startX, startY]: Vector2D, treeHeight: number): Vector2D[] {
  const trunkWidth: number = 50;
  const branches: Vector2D[][] = [];
  const tree: Vector2D[] = Array(1200)
    .fill(false)
    .map(() => {
      const y = random(startY, startY + treeHeight);
      const topRatio = 1 - y / startY;
      const minX = startX - topRatio * trunkWidth;
      const maxX = startX + topRatio * trunkWidth;
      const x = random(minX, maxX);
      return [x, y];
    });

  for (
    let branchY = startY;
    branchY < startY + treeHeight;
    branchY += treeHeight / 16
  ) {
    for (let b = 0; b < 1000; b++) {
      const topRatio = 1 - branchY / startY;
      const branchWidth = (topRatio * branchY) / 4;
      const minX = startX - topRatio * branchWidth;
      const maxX = startX + topRatio * branchWidth;
      const y = random(branchY - 10, branchY + 10);
      const x = random(minX, maxX);
      const point: Vector2D = [x, y];
      tree.push(point);
    }
  }

  return tree;
}

function paintTree(ctx: CanvasRenderingContext2D, tree: Vector2D[]) {
  tree.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, random(0.5, 1.5, false), 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = '#222';
    ctx.fill();
  });
}

function createSnow(ctx: CanvasRenderingContext2D): void {
  const w = random(200, 800);
  const h = random(200, 500);
  const x = random(0, WIDTH - w);
  const y = random(3088, HEIGHT);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.filter = `blur(128px)`;
  ctx.fill();
  ctx.restore();
}

const paint = (ctx: CanvasRenderingContext2D) => {
  // paintGrid(ctx, WIDTH, HEIGHT, { showNumbers: true });

  for (let i = 0; i < 50; i++) {
    const [x, y] = [random(0, WIDTH), random(HEIGHT - 1300, HEIGHT - 1100)];

    const tree = makeTree([x, y], 1000);
    paintTree(ctx, tree);
  }

  for (let i = 0; i < 60; i++) {
    createSnow(ctx);
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
 *           ^ <------ [x, y]
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
