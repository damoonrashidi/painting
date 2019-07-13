import * as THREE from 'three';
import { init, random } from './helpers';
const [WIDTH, HEIGHT] = [400, 400];
let buildings: THREE.Mesh[] = [];
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: THREE.OrbitControls;

const paint = () => {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshPhysicalMaterial({})
  );

  box.position.set(0, 100, 0);
  box.castShadow = true;
  box.receiveShadow = true;

  const plane = new THREE.Mesh(
    new THREE.BoxGeometry(500, 1, 500),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      reflectivity: 0.1,
    })
  );

  plane.position.set(0, 0, 0);
  plane.receiveShadow = true;
  plane.castShadow = true;

  scene.add(box, plane);
  animate();
};

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

setTimeout(() => {
  document.body.innerHTML = '';
  const options = init(WIDTH, HEIGHT);
  scene = options.scene;
  camera = options.camera;
  controls = options.controls;
  renderer = options.renderer;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  paint();
}, 0);
