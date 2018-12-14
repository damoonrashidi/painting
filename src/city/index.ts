import * as THREE from 'three';
import { init, random, between } from './helpers';
const [WIDTH, HEIGHT] = [1200, 1600];
let buildings: THREE.Mesh[] = [];
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

const paint = () => {
  buildings = buildCity();
  buildings.forEach((building, i) => {
    building.name = `b_${i}`;
    scene.add(building);
  });

  // scene.add(createField());
  renderer.render(scene, camera);
};

function buildCity(): THREE.Mesh[] {
  const buildings: THREE.Mesh[] = [];
  for (let i = 0; i < 6000; i++) {
    const x = (i % 60) - 30;
    const z = Math.round(i / 60) - 50;
    const [w, d, h] = [random(1.5, 3), random(1.5, 3), random(1, 2)];
    if (shouldDraw(x, z)) {
      const building = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshPhysicalMaterial({})
      );
      building.position.set(x * 5, 0, z * 5);
      building.castShadow = true;
      building.receiveShadow = true;
      buildings.push(building);
    }
  }
  return buildings;
}

function shouldDraw(x: number, z: number): boolean {
  return (
    //park
    street(x, z, -10, 20, -30, 60) &&
    //main streets
    !between(z, -30, -29) &&
    !between(x, -25, -24.5) &&
    //other streets
    street(x, z, 20, 0.5, -50, 20) &&
    street(x, z, 10, 20, 20, 0.5) &&
    street(x, z, -40, 30, -20, 0.5) &&
    street(x, z, 20, 50, -40, 0.5) &&
    street(x, z, -40, 80, 0, 0.5) &&
    street(x, z, 20, 0.5, 0, 20) &&
    street(x, z, 10, 20, 35, 0.5) &&
    street(x, z, 0, 0.5, -50, 20) &&
    street(x, z, -30, 5, 5, 0.5) &&
    street(x, z, -30, 5, 5, 0.5) &&
    street(x, z, 20, 30, -40, 0.5) &&
    street(x, z, 10, 0.5, 30, 30) &&
    street(x, z, -30, 30, -51, 1) &&
    street(x, z, -30, 60, 50, 0.5)
  );
}

function street(
  pX: number,
  pZ: number,
  x: number,
  w: number,
  z: number,
  h: number
) {
  return !between(pX, x, x + w) || !between(pZ, z, z + h);
}

function buildingHeight(x: number, z: number) {
  return Math.sqrt(Math.abs(x) ** 2 + Math.abs(z) ** 2);
}

function createField(): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(95, 285, 12, 12),
    new THREE.MeshPhysicalMaterial({})
  );
  mesh.rotation.set(4.73, 0, 0);
  mesh.receiveShadow = true;
  return mesh;
}

setTimeout(() => {
  document.body.innerHTML = '';
  const options = init(WIDTH, HEIGHT);
  scene = options.scene;
  camera = options.camera;
  renderer = options.renderer;
  paint();
}, 0);
