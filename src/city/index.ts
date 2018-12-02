import * as THREE from 'three';
import { init, random, between } from './helpers';
import { vertexShader, fragmentShader } from './shader';
const [WIDTH, HEIGHT] = [1200, 1600];

interface Box {
  x: number;
  z: number;
  size: number;
  averageHeight: number;
  child: Box | THREE.Mesh[];
}

const paint = () => {
  const { scene, camera, renderer } = init(WIDTH, HEIGHT);

  buildCity().forEach(building => {
    scene.add(building);
  });

  // scene.add(createField());
  renderer.render(scene, camera);
};

function buildCity(): THREE.Mesh[] {
  const buildings: THREE.Mesh[] = [];
  for (let x = -30; x < 30; x++) {
    for (let z = -50; z < 50; z++) {
      const width = random(1.5, 3);
      const depth = random(2, 4);
      const height = random(1, width * depth * 4);
      if (shouldDraw(x, z) && height > 0) {
        const building = new THREE.Mesh(
          new THREE.BoxGeometry(width, height, depth),
          new THREE.MeshPhysicalMaterial({})
        );
        building.position.set(x * 5, 0, z * 5);
        // building.castShadow = true;
        // building.receiveShadow = true;
        buildings.push(building);
      }
    }
  }
  return buildings;
}

function shouldDraw(x: number, z: number): boolean {
  return (
    //park
    street(x, z, -10, 20, -30, 60) &&
    !between(z, -30, -29) &&
    !between(x, -25, -24.5) &&
    street(x, z, 20, 0.5, -50, 20) &&
    street(x, z, 10, 20, 20, 0.5) &&
    street(x, z, -40, 30, -20, 0.5) &&
    street(x, z, 20, 50, -40, 0.5) &&
    street(x, z, -40, 80, 0, 0.5) &&
    street(x, z, 20, 0.5, 0, 20)
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
  return new THREE.Mesh(
    new THREE.BoxGeometry(100, 1, 290),
    new THREE.ShaderMaterial({ vertexShader, fragmentShader })
  );
}

setTimeout(() => {
  document.body.innerHTML = '';
  paint();
}, 0);
