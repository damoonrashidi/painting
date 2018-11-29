import * as THREE from 'three';
import { random } from './helpers';
import map from './map';
const [WIDTH, HEIGHT] = [1200, 1600];

interface GridOptions {
  x: number;
  y: number;
  w: number;
  h: number;
  density: number;
  averageHeight: number;
}

const paint = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xffffff);
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);

  camera.position.set(0, 200, 0);
  camera.lookAt(0, 0, 0);

  const light = new THREE.SpotLight(0xffffff, 1);
  light.castShadow = true;
  light.position.set(50, 50, 30);
  light.lookAt(-150, 0, 300);
  scene.add(light);

  const buildings = createGrid({
    x: 0,
    y: 0,
    w: 5,
    h: 5,
    averageHeight: 20,
    density: 50,
  });

  buildings.forEach(building => scene.add(building));

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300, 32),
    new THREE.MeshPhysicalMaterial({ color: 0xeeeeee, side: THREE.DoubleSide })
  );
  plane.rotateX(2);
  plane.receiveShadow = true;
  scene.add(plane);

  renderer.render(scene, camera);
};

const createGrid = (options: GridOptions): THREE.Mesh[] => {
  const { x, y, w, h, averageHeight, density } = options;
  const side = Math.round(Math.sqrt(density));
  const cubes: THREE.Mesh[] = [];
  for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(w, averageHeight + random(0, 10), w),
        new THREE.MeshPhongMaterial({ color: 0x000000, wireframe: false })
      );
      cube.castShadow = true;
      cube.position.set(40 - i * 9, 0, 40 - j * 9);
      cubes.push(cube);
    }
  }
  return cubes;
};

setTimeout(() => {
  document.body.innerHTML = '';
  paint();
}, 0);
