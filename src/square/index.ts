import * as THREE from 'three';
import { init, random, between } from './helpers';
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
      const height = random(1, width * depth) * 3;
      if (shouldDraw(x, z) && height > 0) {
        const building = new THREE.Mesh(
          new THREE.BoxGeometry(width, height, depth),
          new THREE.MeshPhysicalMaterial({
            wireframe: false,
          })
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
    (!between(x, -10, 10) || !between(z, -30, 30)) &&
    !between(z, -30, -29) &&
    !between(x, -25, -24.5) &&
    (!between(x, 20, 20.5) || !between(z, -50, -30)) &&
    (!between(x, 10, 30) || !between(z, 20, 20.5))
  );
}

function buildingHeight(x: number, z: number) {
  return Math.sqrt(Math.abs(x) ** 2 + Math.abs(z) ** 2);
}

function createField(): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(100, 1, 290),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff })
  );
}

setTimeout(() => {
  document.body.innerHTML = '';
  paint();
}, 0);
