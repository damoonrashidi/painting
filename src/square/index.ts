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

function buildCity(): THREE.Mesh[] {
  const buildings: THREE.Mesh[] = [];
  for (let x = -40; x < 40; x++) {
    for (let z = -50; z < 50; z++) {
      if (shouldDraw(x, z)) {
        const building = new THREE.Mesh(
          new THREE.BoxGeometry(2, 10 + random(-5, 10), 2),
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
  return !between(x, -10, 10) || !between(z, -15, 15);
}

const paint = () => {
  const { scene, camera, renderer } = init(WIDTH, HEIGHT);

  buildCity().forEach(building => {
    scene.add(building);
  });

  scene.add(createField());

  requestAnimationFrame(() => {
    camera.position.z += Math.sin(new Date().getTime()) * 2;
    renderer.render(scene, camera);
  });
};

function createField(): THREE.Mesh {
  const shape = new THREE.Shape();
  shape.moveTo(-100, -100);
  shape.lineTo(-100, 100);
  shape.lineTo(100, 100);
  shape.lineTo(100, -100);
  shape.lineTo(-100, -100);
  return new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );
}

setTimeout(() => {
  document.body.innerHTML = '';
  paint();
}, 0);
