import * as THREE from 'three';
import { init, random, between } from './helpers';
const [WIDTH, HEIGHT] = [1200, 1600];

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
        building.castShadow = true;
        building.receiveShadow = true;
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
    street(x, z, 10, 0.5, 30, 30)
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
  const geometry = new THREE.PlaneGeometry(95, 285, 20, 20);
  const material = new THREE.MeshPhysicalMaterial({ color: 0x00ff00 });
  material.reflectivity = 0.1;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.set(4.73, 0, 0);
  mesh.position.z += 5;
  mesh.receiveShadow = true;
  return mesh;
}

setTimeout(() => {
  document.body.innerHTML = '';
  paint();
}, 0);
