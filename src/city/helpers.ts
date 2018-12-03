import * as THREE from 'three';
import { randomHex } from './colors';

export function init(width: number, height: number) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(95, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setClearColor(0xeeeeee);
  renderer.setSize(width, height);

  camera.position.set(0, 250, 0);
  camera.lookAt(0, 0, 0);

  addLightsTo(scene);

  document.body.appendChild(renderer.domElement);
  return { scene, camera, renderer };
}

function addLightsTo(scene: THREE.Scene) {
  const red = new THREE.PointLight(0xff0000, 1);
  red.position.set(-50, 100, 100);

  const green = new THREE.PointLight(0x00ff00, 1);
  green.position.set(50, 100, 100);

  const blue = new THREE.PointLight(0x0000ff, 1);
  blue.position.set(0, 100, -100);

  scene.add(red, green, blue);
}

export function random(min: number = 0, max: number = 100, rounded = true) {
  return rounded
    ? Math.floor(Math.random() * (max - min) + min)
    : Math.random() * (max - min) + min;
}

export const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2));

export const between = (a: number, b: number, c: number) => a >= b && a <= c;
