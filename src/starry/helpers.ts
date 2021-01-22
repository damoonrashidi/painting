import { makeNoise2D, Noise2D } from 'open-simplex-noise';
import { insideCircle, randomFloat, randomHue, randomInt, Shape } from '../lib';

function drawLine(
  ctx: CanvasRenderingContext2D,
  [minX, maxX]: [number, number],
  [minY, maxY]: [number, number],
  noise: Noise2D,
  color: string,
  noiseAttribute: number = 160,
  [minLength, maxLength] = [100, 350]
) {
  let [x, y] = [randomFloat(minX, maxX), randomFloat(minY, maxY)];

  const length = randomFloat(minLength, maxLength);
  let r = randomInt(0.5, 1);

  let traveled = 0;
  while (traveled < length) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, r, r);
    const n = noise(x / noiseAttribute, y / noiseAttribute);

    x += Math.cos(n);
    y += Math.sin(n);
    // r += Math.sin(r);

    traveled++;
  }
}

function makeConstellation(
  [minX, maxX]: [number, number],
  [minY, maxY]: [number, number]
): Shape {
  const [centerX, centerY] = [randomFloat(minX, maxX), randomFloat(minY, maxY)];

  return Array(randomInt(3, 6))
    .fill(0)
    .map(() => {
      const x = centerX + randomFloat(-100, 100);
      const y = centerY + randomFloat(-100, 100);

      return [x, y];
    });
}

export function drawStars(
  ctx: CanvasRenderingContext2D,
  x: [number, number],
  y: [number, number],
  color: string
) {
  ctx.fillStyle = color;

  const constellations = Array(3e2)
    .fill(false)
    .map(() => makeConstellation(x, y));

  constellations.forEach(constellation => {
    ctx.moveTo(...constellation[0]);
    constellation.forEach(vector => {
      const r = randomFloat(0.1, 2);
      ctx.beginPath();
      ctx.arc(vector[0], vector[1], r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#dddddd99';
    ctx.moveTo(...constellation[0]);
    ctx.beginPath();
    constellation.forEach(vector => {
      ctx.lineTo(...vector);
    });
    if (randomFloat() > 0.85) {
      ctx.stroke();
    }
  });
}

export function drawSea(
  ctx: CanvasRenderingContext2D,
  [startX, stopX]: [number, number],
  [startY, stopY]: [number, number]
) {
  const seaNoise = makeNoise2D(Date.now());
  //water
  for (let i = 0; i < 9e3; i++) {
    drawLine(ctx, [startX, stopX], [startY, stopY], seaNoise, '#4f51e8');
  }
  for (let i = 0; i < 3e3; i++) {
    drawLine(
      ctx,
      [startX, stopX],
      [startY - 200, stopY],
      seaNoise,
      '#262894',
      80
    );
  }

  //highlights
  for (let i = 0; i < 2e3; i++) {
    drawLine(
      ctx,
      [startX, stopX],
      [startY, stopY],
      seaNoise,
      'hsla(239, 83%, 76%, 0.8)'
    );
  }
  for (let i = 0; i < 2e3; i++) {
    drawLine(
      ctx,
      [startX, stopX],
      [startY, stopY],
      seaNoise,
      'hsla(281, 84%, 76%, 0.8)'
    );
  }

  //foam
  for (let i = 0; i < 1e3; i++) {
    drawLine(ctx, [startX, stopX], [startY, stopY], seaNoise, '#ffffff33');
  }
}

export function drawMoon2(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  r: number
): void {
  const noise = makeNoise2D(Date.now());

  const density = r ** 2 / 2;
  for (let i = 0; i < density; i++) {
    const x = randomFloat(centerX - r, centerX + r);
    const y = randomFloat(centerY - r, centerY + r);

    if (insideCircle(x, y, centerX, centerY, r)) {
      ctx.fillStyle = randomHue(0, 70 * noise(x / 400, y / 400), 70, 70);
      ctx.fillRect(x, y, 3, 3);
    }
  }
}

export function drawMoon(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  r: number
): void {
  const noise = makeNoise2D(Date.now());

  for (let startY = centerY - r; startY < centerY + r * 2; startY += 1) {
    let x = centerX - r;
    let y = startY - r;

    ctx.fillStyle = randomHue(0, 50, 70, 70);
    while (x < centerX + r) {
      if (insideCircle(x, y, centerX, centerY, r)) {
        ctx.fillRect(x, y, 4, 4);
      }
      const n = noise(x / 300, y / 300);
      x += Math.cos(n);
      y += Math.sin(n);
    }
  }
}
