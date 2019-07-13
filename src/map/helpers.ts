import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

export function init(width: number, height: number) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(95, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setClearColor(0xeeeeee);
  renderer.setSize(width, height);

  camera.position.set(0, 250, 0);
  camera.position.set(-150, 300, -250);
  camera.lookAt(0, 0, 0);
  addLightsTo(scene);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  document.body.appendChild(renderer.domElement);
  return { scene, camera, renderer, controls };
}

function addLightsTo(scene: THREE.Scene) {
  const light = new THREE.SpotLight(0xffffff, 1);
  light.castShadow = true;
  light.position.set(0, 200, 0);

  light.lookAt(0, 0, 0);
  const helper = new THREE.SpotLightHelper(light, 30);
  scene.add(helper);

  scene.add(light);
}

export function random(min: number = 0, max: number = 100, rounded = true) {
  return rounded
    ? Math.floor(Math.random() * (max - min) + min)
    : Math.random() * (max - min) + min;
}
