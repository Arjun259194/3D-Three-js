import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const loader = new GLTFLoader();

loader.load(
  "../3dModels/Car/scene.gltf",
  (gltf) => {
    scene.add(gltf.scene);
  },
  undefined,
  (err) => {
    console.error(err);
  },
);

//sizes
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const light = new THREE.PointLight(0xffffff, 200, 50);
light.position.set(0, 5, 5);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  45,
  size.width / size.height,
  0.1,
  100,
);
camera.position.z = 8;
scene.add(camera);

// <render>
const canvas = document.querySelector(".webgl-car");
const render = new THREE.WebGLRenderer({ canvas });
render.setSize(size.width, size.height);
render.setPixelRatio(2);
render.render(scene, camera);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  render.setSize(size.width, size.height);
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  render.render(scene, camera);
});

const loop = () => {
  controls.update();
  requestAnimationFrame(loop);
  render.render(scene, camera);
};

loop();
