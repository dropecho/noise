import * as noise from './dropecho.noise/index.js';

/** @type {HTMLCanvasElement} */
const leftPanel = document.querySelector('.left-panel');
/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas');
/** @type {HTMLElement} */
let kFps = document.getElementById('kFps');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

const canvasWidth = 512;
canvas.width = canvasWidth;
canvas.height = canvasWidth;
const myImageData = ctx.createImageData(canvasWidth, canvasWidth);

const select = document.createElement('select');
const noiseMap = {
  simplex: new noise.Simplex(3, 0.015, 2.5),
  perlin: new noise.Perlin(3, 0.015, 2.5),
  cones: new noise.Cones(0.01),
  ridged: new noise.Ridged(0.01),
  checker: new noise.CheckerBoard(0.01),
  worley: new noise.Worley(0.02),
  voronoi: new noise.Voronoi(0.02),
};

let currentNoise = noiseMap.simplex;
for (let k of Object.keys(noiseMap)) {
  const option = document.createElement('option');
  option.value = k;
  option.text = k;
  select.appendChild(option);
}
select.onchange = (ev) => {
  currentNoise = noiseMap[ev.target.value];
};

const freqLabel = document.createElement('label');
freqLabel.textContent = 'Frequency: ' + currentNoise.frequency;

const slider = document.createElement('input');
slider.type = 'range';
slider.min = '0.005';
slider.max = '0.2';
slider.value = '0.01';
slider.step = '0.0005';

slider.oninput = (ev) => {
  freqLabel.textContent = 'Frequency: ' + ev.target.value;
  currentNoise.frequency = Number(ev.target.value);
};
slider.onchange = (ev) => {
  currentNoise.frequency = Number(ev.target.value);
};

leftPanel.appendChild(select);

const sliderlabelholder = document.createElement('div');
sliderlabelholder.appendChild(freqLabel);
sliderlabelholder.appendChild(slider);
leftPanel.appendChild(sliderlabelholder);

/**
 * @param {number} x
 * @param {number} y
 * @param {number} value
 * @param {ImageData} imageData
 */
const setPixel = (x, y, value, imageData) => {
  const pixel = (x + y * canvasWidth) * 4;
  imageData.data[pixel] = value;
  imageData.data[pixel + 1] = value;
  imageData.data[pixel + 2] = value;
  imageData.data[pixel + 3] = 255;
};

/** @param {number} offset */
const drawNoise = (offset) => {
  let xOff = offset;
  let yOff = 0;

  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasWidth; y++) {
      let value = (currentNoise.value(x + xOff, y + yOff) + 1) / 2;
      setPixel(x, y, value * 255, myImageData);
    }
  }

  ctx.putImageData(myImageData, 0, 0);
};

let offset = 0;

let prev = Date.now(),
  time = 0,
  fps = 0;
var filterStrength = 10;

function step() {
  drawNoise((offset += 1));
  let now = Date.now();
  time += (now - prev - time) / filterStrength;
  prev = now;
  window.requestAnimationFrame(step);
  fps = 1000 / time;

  if (fps < 35) {
    kFps.style.color = 'red';
    kFps.textContent = fps.toFixed(2);
  } else if (fps >= 35 && fps <= 41) {
    kFps.style.color = 'deepskyblue';
    kFps.textContent = fps.toFixed(2) + ' FPS';
  } else if (fps > 42) {
    kFps.style.color = 'black';
    kFps.textContent = fps.toFixed(2) + ' FPS';
  }
  kFps.textContent = fps.toFixed(2);
}
window.requestAnimationFrame(step);

drawNoise(offset);
