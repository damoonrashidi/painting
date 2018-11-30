import * as THREE from 'three';

export function init(width: number, height: number) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(95, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(0x222222);
  renderer.setSize(width, height);

  camera.position.set(0, 200, -140);
  camera.lookAt(0, 0, 0);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(0, 30, 100);
  scene.add(light);

  // const plane = new THREE.Mesh(
  //   new THREE.BoxGeometry(300, 1, 300),
  //   new THREE.MeshPhongMaterial({ color: 0xffffff })
  // );
  // plane.position.set(0, -10, 0);
  // plane.receiveShadow = true;
  // scene.add(plane);

  document.body.appendChild(renderer.domElement);
  return { scene, camera, renderer };
}

export function random(min: number = 0, max: number = 100, rounded = true) {
  return rounded
    ? Math.floor(Math.random() * (max - min) + min)
    : Math.random() * (max - min) + min;
}

export const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2));

export const between = (a: number, b: number, c: number) => a >= b && a <= c;
