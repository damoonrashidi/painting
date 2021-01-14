import * as THREE from 'three';
// import { OrbitControls } from 'three-orbitcontrols-ts';
import { init } from '../lib';
import { getIntensity } from './helpers';

const [WIDTH, HEIGHT] = [2160, 3890];
const IMAGE_SIZE = 512;
const SAMPLE_SIZE = 50;

function paint(
  ref: CanvasRenderingContext2D,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(-IMAGE_SIZE / 3, 100, -IMAGE_SIZE / 3);
  light.lookAt(IMAGE_SIZE, 10, IMAGE_SIZE);
  scene.add(light);

  const planeBuffer = new THREE.PlaneBufferGeometry(
    IMAGE_SIZE,
    IMAGE_SIZE,
    SAMPLE_SIZE,
    SAMPLE_SIZE
  );

  const loader = new THREE.TextureLoader(new THREE.LoadingManager());
  const texture = loader.load('/static/map.png');
  const planeMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    color: 0xffffff,
    wireframe: false,
    side: THREE.DoubleSide,
  });

  const positions = planeBuffer.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = Math.floor(positions.getX(i) + IMAGE_SIZE / 2);
    const z = Math.floor(positions.getZ(i) + IMAGE_SIZE / 2);

    const height =
      getIntensity(
        ref,
        Math.floor(x + IMAGE_SIZE / 2),
        Math.floor(z + IMAGE_SIZE / 2),
        IMAGE_SIZE / SAMPLE_SIZE
      ) / 2;

    positions.setZ(i, height);
  }

  const plane = new THREE.Mesh(planeBuffer, planeMaterial);
  plane.rotation.x = -Math.PI / 2;

  scene.add(plane);

  camera.position.set(-IMAGE_SIZE / 2, 1500, -IMAGE_SIZE / 2);
  camera.lookAt(0, 200, 0);

  // const controls = new OrbitControls(camera, renderer.domElement);

  animate(scene, renderer, camera, plane);

  renderer.render(scene, camera);
}

function animate(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  plane: THREE.Mesh
): void {
  // plane.rotation.x = plane.rotation.x + 0.01;

  renderer.render(scene, camera);

  requestAnimationFrame(() => animate(scene, renderer, camera, plane));
}

setTimeout(() => {
  const old = Array.from(document.getElementsByTagName('canvas'));
  old.forEach(canvas => document.body.removeChild(canvas));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 10000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xfdffe0);
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  const ref = init(IMAGE_SIZE, IMAGE_SIZE, false, 'reference-canvas');
  (document.getElementById(
    'reference-canvas'
  ) as HTMLCanvasElement).style.display = 'none';
  const referenceImage = new Image();
  referenceImage.onload = () => {
    ref.drawImage(referenceImage, 0, 0, IMAGE_SIZE, IMAGE_SIZE);
    paint(ref, scene, camera, renderer);
  };
  referenceImage.src = '/static/map.png';
});
