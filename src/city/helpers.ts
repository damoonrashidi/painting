import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { randomHex } from './colors';

export function init(width: number, height: number) {
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

function addLightsTo(scene: THREE.Scene) {
  // const hemi = new THREE.HemisphereLight(0xfefefe, 1);
  // hemi.castShadow = true;
  // hemi.position.set(-100, 0, -150);
  // hemi.lookAt(0, 0, 0);
  // scene.add(hemi);

  // const hemiHelper = new THREE.HemisphereLightHelper(hemi, 100, 0xff0000);
  // scene.add(hemiHelper);

  const directional = new THREE.DirectionalLight(0xeeeeee, 2);
  directional.name = 'light';
  directional.castShadow = true;
  directional.position.set(100, 50, 300);
  directional.lookAt(0, 0, 0);
  scene.add(directional);

  // const directionalHelper = new THREE.SpotLightHelper(directional, 100);
  // scene.add(directionalHelper);

  // const point = new THREE.PointLight(0x78eb7f, 1);
  // point.castShadow = true;
  // point.position.set(0, 100, 40);
  // point.lookAt(0, 0, 0);
  // scene.add(point);

  // const pointHelper = new THREE.PointLightHelper(point, 100, 0xff0000);
  // scene.add(pointHelper);
}

export function random(min: number = 0, max: number = 100, rounded = true) {
  return rounded
    ? Math.floor(Math.random() * (max - min) + min)
    : Math.random() * (max - min) + min;
}

export const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2));

export const between = (a: number, b: number, c: number) => a >= b && a <= c;
