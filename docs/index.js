const leftEl = document.querySelector('#left-panel');
const rightEl = document.querySelector('#right-panel');
const canvas = document.querySelector('#canvas');

const ctx = canvas.getContext('2d');
const canvasWidth = 384;
canvas.width = canvasWidth;
canvas.height = canvasWidth;
const myImageData = ctx.createImageData(canvasWidth, canvasWidth);

const setPixel = (x, y, value, imageData) => {
  const pixel = (x + y * canvasWidth) * 4;
  imageData.data[pixel] = value;
  imageData.data[pixel + 1] = value;
  imageData.data[pixel + 2] = value;
  imageData.data[pixel + 3] = 255;
};

let simplex = new dropecho.noise.Simplex(1, 0.005);
let perlin = new dropecho.noise.Perlin(1, 0.01, 1.5);
let cones = new dropecho.noise.Cones(0.01);
let displaced = new dropecho.noise.Displace(cones, simplex);
let worley = new dropecho.noise.Worley(0.01);

let noise = displaced;

const drawNoise = (offset) => {
  let xOff = offset;
  let yOff = 0;

  //   let xOff = Math.random() * 100;
  //   let yOff = Math.random() * 100;
  //   let worley = new dropecho.noise.Worley(offset / 100);
  //   var cones = new dropecho.noise.Cones(0.01);
  //   var noise = new dropecho.noise.Displace(cones, worley);

  //   noise = new dropecho.noise.Scale(noise, 0.005);
  //   let noise = new dropecho.noise.Perlin(0.001);

  //   let disp = new dropecho.noise.Simplex(1, 0.01);
  //   noise = new dropecho.noise.Displace(noise, disp);

  //   noise = new dropecho.noise.Add(noise, new dropecho.noise.Constant(1));
  //   noise = new dropecho.noise.Multiply(noise, new dropecho.noise.Constant(128));

  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasWidth; y++) {
      let value = (noise.value(x + xOff, y + yOff) + 1) / 2;
      setPixel(x, y, value * 255, myImageData);
    }
  }

  ctx.putImageData(myImageData, 0, 0);
};

let offset = 0;
let grow = true;

let prev = Date.now(),
  time = 0,
  fps = 0;
var filterStrength = 10;

let kFps = document.getElementById('kFps');

function step() {
  drawNoise((offset += 1));
  //   drawNoise(grow ? (offset += 0.1) : (offset -= 0.1));
  //
  //   if (offset > 5) {
  //     grow = false;
  //   }
  //
  //   if (offset <= 1) {
  //     grow = true;
  //   }
  //
  let now = Date.now();
  time += (now - prev - time) / filterStrength;
  prev = now;
  window.requestAnimationFrame(step);
  fps = (1000 / time).toFixed(2);

  if (fps < 35) {
    kFps.style.color = 'red';
    kFps.textContent = fps;
  }
  if (fps >= 35 && fps <= 41) {
    kFps.style.color = 'deepskyblue';
    kFps.textContent = fps + ' FPS';
  } else {
    kFps.style.color = 'black';
    kFps.textContent = fps + ' FPS';
  }
  kpFps.value = fps;
}
window.requestAnimationFrame(step);

drawNoise();
