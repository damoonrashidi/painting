import { init, random, randomHue } from '../lib';

const WIDTH = 1600;
const HEIGHT = 2800;

type Vector2d = [number, number];

interface Star {
  coordinates: Vector2d;
  color: string;
  size: number;
}

function paint(ctx: CanvasRenderingContext2D) {
  const stars: Star[] = Array(1000)
    .fill(false)
    .map(() => ({
      coordinates: [random(0, WIDTH), random(0, HEIGHT)],
      color: randomHue(0, 100, 1, 0, random(0, 100)),
      size: random(0.5, 2, false),
    }));

  stars.forEach(star => {
    console.log(star);
    ctx.moveTo(star.coordinates[0], star.coordinates[1]);
    ctx.beginPath();
    ctx.arc(
      star.coordinates[0],
      star.coordinates[1],
      star.size,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = star.color;
    ctx.fill();
    ctx.closePath();
  });
}

setTimeout(() => {
  const ctx = init(WIDTH, HEIGHT);
  const gradient = ctx.createLinearGradient(0, 0, WIDTH * 0.75, HEIGHT);
  gradient.addColorStop(0, '#141535');
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
