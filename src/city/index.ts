import * as THREE from 'three';
import { init, random, between } from './helpers';
const [WIDTH, HEIGHT] = [700 * 4, 1200 * 4];
let buildings: THREE.Mesh[] = [];
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: THREE.OrbitControls;

const paint = () => {
  buildings = buildCity();
  buildings.forEach((building, i) => {
    building.name = `b_${i}`;
    scene.add(building);
  });

  scene.add(createField());
  scene.add(createFloor());
  animate();
};

function animate() {
  const light = scene.getObjectByName('light') as THREE.DirectionalLight;
  const { x, y, z } = light.position;
  light.position.set(x - 1, y + 1, z);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function buildCity(): THREE.Mesh[] {
  const buildings: THREE.Mesh[] = [];
  for (let i = 0; i < 6000; i++) {
    const x = (i % 60) - 30;
    const z = Math.round(i / 60) - 50;
    const [w, d, h] = [random(1.5, 3), random(1.5, 3), random(1, 10)];
    if (shouldDraw(x, z)) {
      const building = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshPhysicalMaterial({
          color: 0xfefefe,
        })
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

function createFloor(): THREE.Mesh {
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(310, 1, 500),
    new THREE.MeshPhongMaterial({})
  );
  floor.position.set(0, -5, 0);
  floor.receiveShadow = true;
  return floor;
}

function createField(): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(95, 1, 285),
    new THREE.MeshPhysicalMaterial({
      reflectivity: 0.05,
    })
  );
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  return mesh;
}

setTimeout(() => {
  document.body.innerHTML = '';
  const options = init(WIDTH, HEIGHT);
  scene = options.scene;
  camera = options.camera;
  renderer = options.renderer;
  controls = options.controls;
  paint();
}, 0);
