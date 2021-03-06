import { makeNoise2D, Noise2D } from 'open-simplex-noise';
import {
  Circle,
  distance,
  distort,
  isInsideCircle,
  randomFloat,
  randomHue,
  randomInt,
  Shape,
  Vector2D,
} from '../lib';

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

export function drawMoon(
  ctx: CanvasRenderingContext2D,
  { centerX, centerY, radius }: Circle,
  seed: number
): void {
  const noise = makeNoise2D(seed);

  for (
    let startY = centerY - radius;
    startY < centerY + radius * 2;
    startY += 1
  ) {
    let x = centerX - radius;
    let y = startY - radius;

    ctx.fillStyle = randomHue(40, 80, 70, 70);
    while (x < centerX + radius) {
      if (isInsideCircle([x, y], { centerX, centerY, radius })) {
        ctx.fillRect(x, y, 4, 4);
      }
      const n = noise(x / 150, y / 150);
      x += Math.cos(n);
      y += Math.sin(n);
    }
  }
}

export function drawMountain(
  ctx: CanvasRenderingContext2D,
  [minX, maxX]: Vector2D,
  [minY, maxY]: Vector2D
): void {
  let coords: Shape = [
    [minX, minY],
    [maxX, maxY],
  ];
  coords = distort({
    coords,
    jitter: 5,
    segments: maxX - minX / 10,
    height: maxY - minY,
  });

  const mountainPeak: number = Math.min(...coords.map(([, y]) => y));
  const gradient = ctx.createLinearGradient(0, mountainPeak, 0, maxY);
  gradient.addColorStop(0, randomHue(40, 80, 1, 70, 70));
  gradient.addColorStop(0.8, 'transparent');
  ctx.fillStyle = gradient;

  ctx.moveTo(coords[0][0], coords[0][1]);
  ctx.beginPath();
  coords.forEach(([x, y]) => {
    ctx.lineTo(x, y);
  });
  ctx.fill();
  ctx.closePath();
}

export function drawWind(
  ctx: CanvasRenderingContext2D,
  moons: Circle[],
  [minX, maxX]: Vector2D,
  [minY, maxY]: Vector2D
): void {
  // const seed = 1611342057928;
  const seed = Date.now();
  const skyNoise = makeNoise2D(seed);

  for (let i = 0; i < 8e3; i++) {
    let [x, y] = [randomFloat(minX, maxX), randomFloat(minY, maxY)];

    let isInsideAnyMoonRadius = true;

    while (isInsideAnyMoonRadius) {
      const isInside = moons.some(
        moon =>
          distance([x, y], [moon.centerX, moon.centerY]) <
          moon.radius + moon.radius / 2
      );

      if (isInside) {
        [x, y] = [randomFloat(minX, maxX), randomFloat(minY, maxY)];
      } else {
        isInsideAnyMoonRadius = false;
      }
    }

    const length = randomFloat(200, maxX - x);
    let traveled = 0;
    ctx.fillStyle = randomHue(
      190,
      240,
      randomFloat(0.1, 0.4),
      randomInt(30, 100),
      randomInt(20, 100)
    );

    while (traveled < length) {
      const n = skyNoise(x / 600, y / 600);

      moons.forEach(moon => {
        const tooClose =
          distance([x, y], [moon.centerX, moon.centerY]) <
          moon.radius + moon.radius / 2;
        const isOnUpperHalf = y < moon.centerY;

        if (tooClose) {
          y = isOnUpperHalf ? y - 5 : y + 5;
          x -= 3;
        } else {
          y += Math.sin(n);
          x += Math.cos(n);
        }
      });
      ctx.fillRect(x, y, 1, 1);

      traveled++;
    }
  }
}
