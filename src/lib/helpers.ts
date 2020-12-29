import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

export function random(min: number = 0, max: number = 100, rounded = true) {
  return rounded
    ? Math.floor(Math.random() * (max - min) + min)
    : Math.random() * (max - min) + min;
}

export function randomInt(min: number = 0, max: number = 100) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomFloat(min: number = 0, max: number = 1) {
  return Math.random() * (max - min) + min;
}

export type Vector2D = [number, number];

interface DistortOptions {
  coords: number[][];
  jitter: number;
  segments: number;
  height: number;
}

export interface Line {
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
}

export const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2));

export const between = (a: number, b: number, c: number) => a >= b && a <= c;

export const average = (a: number, b: number) => (a + b) / 2;

export function paintGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  { showNumbers }: { showNumbers: boolean }
): void {
  const stepsX = width / 10;
  const stepsY = height / 20;
  ctx.font = `20px sans-serif`;

  for (let y = 0; y < height; y += stepsY) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
    ctx.closePath();

    for (let x = 0; x < width; x += stepsX) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.strokeStyle = '#ddd';
      ctx.stroke();
      ctx.closePath();

      if (showNumbers) {
        ctx.fillStyle = '#f00';
        ctx.fillText(`${Math.round(x)} : ${Math.round(y)}`, x, y);
      }
    }
  }
}

export function init(
  width: number,
  height: number,
  clear = true,
  id = 'canvas'
): CanvasRenderingContext2D {
  if (clear) {
    document.body.innerHTML = '';
  }
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.setAttribute('id', id);
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = true;
  return ctx;
}

export function initTHREE(width: number, height: number) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(95, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setClearColor(0xeeeeee);
  renderer.setSize(width, height);

  camera.position.set(150, 50, -150);
  camera.position.set(0, 250, 0);
  camera.lookAt(0, 0, 0);

  addLightsTo(scene);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  document.body.appendChild(renderer.domElement);
  return { scene, camera, renderer, controls };
}

export function middle([x1, y1]: number[], [x2, y2]: number[]): number[] {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

export function pointAlong(
  [x1, y1]: [number, number],
  [x2, y2]: [number, number]
): [number, number] {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

export function distort({
  coords,
  jitter,
  segments,
  height,
}: DistortOptions): number[][] {
  const distorted: number[][] = [];
  const WIDTH = coords[1][0];
  distorted.push(coords[0]);
  for (let i = 1; i <= segments; i++) {
    const x = (i * WIDTH) / segments;
    const y = distorted[i - 1][1] + random(-jitter, jitter) * Math.sin(i);
    distorted.push([x, y]);
  }
  distorted.push([WIDTH, height]);
  distorted.push([0, height]);
  return distorted;
}

export function distort2(
  points: number[][],
  jitter = 5,
  iteration = 0
): number[][] {
  let newPoints: number[][] = [];
  points.forEach((point, i) => {
    newPoints.push(point);
    const [x, y] = middle(points[i], points[i + 1] || points[0]);
    newPoints.push([x + random(-jitter, jitter), y + random(-jitter, jitter)]);
  });
  return iteration > 5 ? points : distort2(newPoints, jitter, iteration + 1);
}

function addLightsTo(scene: THREE.Scene) {
  const directional = new THREE.DirectionalLight(0xeeeeee, 2);
  directional.name = 'light';
  directional.castShadow = true;
  directional.position.set(100, 50, 300);
  directional.lookAt(0, 0, 0);
  scene.add(directional);
}
