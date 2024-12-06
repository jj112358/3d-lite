import Scene from './core/Scene';
import PerspectiveCamera from './camera/PerspectiveCamera';

import Renderer from './core/Renderer';
import Mesh from './core/Mesh';

// import BufferAttribute from './core/BufferAttribute';
// import Geometry from './geometry/Geometry';
import BoxGeometry from './geometry/BoxGeometry';
import SphereGeometry from './geometry/SphereGeometry';

import BasicMaterial from './materials/BasicMaterial';
import NormalMaterial from './materials/NormalMaterial';
import PhongMaterial from './materials/PhongMaterial';

import AmbientLight from './lights/AmbientLight';
import PointLight from './lights/PointLight';

import OrbitControls from './utils/OrbitControls';


const scene = new Scene();

// 创建摄像机并设置视角
const camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight
);

camera.position.set(0, 0, 20);
// 必须调用lookAt设置相机的视图的矩阵
camera.lookAt(0, 0, 0);

const renderer = new Renderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 创建几何体、材质和物体
const cube = new Mesh(
  new BoxGeometry(1, 1, 1),
  new BasicMaterial({ color: 0xff0000 })
);
cube.position.x = -4;
scene.add(cube);

const sphere = new Mesh(
  new SphereGeometry(1, 32, 32),
  new PhongMaterial({ color: 0xff0000, specular: 0x0000ff })
);
scene.add(sphere);

const sphere1 = new Mesh(
  new SphereGeometry(1, 32, 32),
  new NormalMaterial()
);
sphere1.position.x = 4;
scene.add(sphere1);

// 添加光源
const ambientLight = new AmbientLight();
scene.add(ambientLight);

// const directionalLight = new DirectionalLight(0x0000ff, 1);
// scene.add(directionalLight);
const pointLight = new PointLight();
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
