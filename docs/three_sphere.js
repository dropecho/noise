import * as THREE from 'three';
import * as noise from './dropecho.noise/index.js';

let camera;
let scene;
let renderer;
let texture;
let light;
let curve;

const tileSize = 2048;

let xTiles = 2;
let yTiles = 2;

const worldWidth = 128;
const worldDepth = 128;

const water_level = 32;

const points = [
  new THREE.Vector3(tileSize * 2, tileSize * 1.5, tileSize * 2),
  new THREE.Vector3(0, tileSize * 1.5, tileSize * 2),
  new THREE.Vector3(tileSize * 2, tileSize * 1.5, 0),
  new THREE.Vector3(-tileSize * 2, tileSize * 1.5, -tileSize * 2),
];

const baseFreq = 0.5;

const noiseMap = {
  perlin: new noise.Perlin(6, baseFreq, 2.5, 0.35),
};

init();

function buildTerrainTile() {
  const data = generateHeight(worldWidth, worldDepth);
  const geometry = new THREE.SphereGeometry(2048, worldWidth, worldDepth);

  const vertices = geometry.attributes.position.array;

  for (let i = 0, j = 0, l = vertices.length; j < l; i++, j += 3) {
    const vec = new THREE.Vector2(vertices[j], vertices[j + 1]);
    vec.normalize();
    const xy = noise.Coords.MercatorLatLongToXY(vec.x, vec.y, 2048);
    const val = noiseMap.perlin.value(xy.x, xy.y) * 64;

    const vec3 = new THREE.Vector3(vertices[j], vertices[j + 1], vertices[j + 2]);
    vec3.normalize();
    vec3.multiplyScalar(val);

    //     vertices[j] += vec3.x;
    //     vertices[j + 1] += vec3.y;
    //     vertices[j + 2] += vec3.z;
  }

  geometry.computeVertexNormals();
  geometry.computeTangents();

  texture = new THREE.CanvasTexture(generateTexture(data, worldWidth, worldDepth));
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 0,
      displacementMap: texture,
      displacementScale: 256,
    }),
  );

  return mesh;
}

function init() {
  curve = new THREE.CatmullRomCurve3(points);
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xefd1b5);

  const tile = buildTerrainTile();
  tile.castShadow = true;
  tile.receiveShadow = true;
  scene.add(tile);

  light = new THREE.DirectionalLight(0xffffff, 5);
  light.position.set(1000, 5000, -2500);
  light.castShadow = true;
  light.shadow.camera.visible = true;

  //Set up shadow properties for the light
  light.shadow.mapSize.width = 512;
  light.shadow.mapSize.height = 512;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 50000;
  light.shadow.camera.left = -50000;
  light.shadow.camera.right = 50000;
  light.shadow.camera.top = 50000;
  light.shadow.camera.bottom = -50000;
  light.shadow.intensity = 0.1;
  scene.add(light);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.autoUpdate = true;

  window.addEventListener('resize', onWindowResize);
  document.body.appendChild(renderer.domElement);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * @param {number} width
 * @param {number} height
 * @param {number} x
 * @param {number} y
 */
function generateHeight(width, height, x = 0, y = 0) {
  const size = width * height;
  const data = new Uint32Array(size);

  for (let i = 0; i < size; i++) {
    const x1 = i % width;
    const y1 = ~~(i / width);
    const val = THREE.MathUtils.clamp((noiseMap.perlin.value(x1 + x, y + y1) + 1) / 2, 0, 1);
    data[i] += val * 255 * 255 * 255;
  }

  return data;
}

/**
 * @param {Uint8Array} data
 * @param {number} width
 * @param {number} height
 */
function generateTexture(data, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }
  context.fillStyle = '#000';
  context.fillRect(0, 0, width, height);

  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const imageData = image.data;

  for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
    const val = data[j] / 255 / 255;

    imageData[i] = val;
    imageData[i + 1] = val;
    imageData[i + 2] = val;

    //     if (val <= water_level) {
    //       imageData[i] = 30;
    //       imageData[i + 1] = 30;
    //       imageData[i + 2] = 200;
    //     } else {
    //       imageData[i] = val - 32;
    //       imageData[i + 1] = val - 32;
    //       imageData[i + 2] = 64;
    //       //       var v = val / 1.5;
    //       //       imageData[i] = Math.max(v, 255 - val);
    //       //       imageData[i + 1] = Math.max(v, 255 - val);
    //       //       imageData[i + 2] = Math.max(v, 64);
    //       //       var v = val / 1.5;
    //       //       imageData[i] = Math.max(v, 192 - val);
    //       //       imageData[i + 1] = Math.max(v, 128);
    //       //       imageData[i + 2] = Math.max(v, 64);
    //     }
  }

  context.putImageData(image, 0, 0);
  return canvas;
}

let t = 0;

function animate() {
  t += 0.0005;
  //   mesh.rotateY(0.001);
  const position = curve.getPoint(t);
  camera.position.copy(position);

  camera.lookAt(new THREE.Vector3(100, 0, 0));
  render();
}

function render() {
  renderer.render(scene, camera);
}
