/* ===================== TABS ===================== */
function openTab(id) {
  document.querySelectorAll(".tabContent").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  event.target.classList.add("active");
}

/* ===================== CANVAS SETUP ===================== */
const imgInput = document.getElementById("imageInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const download = document.getElementById("download");

let currentImage = null;
let brightness = 0;
let contrast = 0;
let blur = 0;

imgInput.addEventListener("change", () => {
  const file = imgInput.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    currentImage = img;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    updateDownload();
  };
  img.src = URL.createObjectURL(file);
});

function updateDownload(type = "image/png", quality = 1) {
  download.href = canvas.toDataURL(type, quality);
}

/* ===================== BASIC CONVERT ===================== */
function convertPNG() {
  if (!currentImage) return alert("Select image");
  drawImage();
  updateDownload("image/png");
}

function convertJPG() {
  if (!currentImage) return alert("Select image");
  drawImage();
  updateDownload("image/jpeg", 0.9);
}

function toWebP() {
  if (!currentImage) return alert("Select image");
  drawImage();
  updateDownload("image/webp", 0.9);
}

/* ===================== IMAGE DRAW ===================== */
function drawImage() {
  canvas.width = currentImage.width;
  canvas.height = currentImage.height;
  ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%) blur(${blur}px)`;
  ctx.drawImage(currentImage, 0, 0);
  ctx.filter = "none";
}

/* ===================== RESIZE / COMPRESS ===================== */
function resizeImage() {
  if (!currentImage) return alert("Select image");
  canvas.width = Math.floor(currentImage.width / 2);
  canvas.height = Math.floor(currentImage.height / 2);
  ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
  updateDownload();
}

function compressImage() {
  if (!currentImage) return alert("Select image");
  drawImage();
  updateDownload("image/jpeg", 0.5);
}

/* ===================== CROP / ROTATE / FLIP ===================== */
function cropSquare() {
  if (!currentImage) return alert("Select image");
  const size = Math.min(currentImage.width, currentImage.height);
  canvas.width = size;
  canvas.height = size;
  ctx.drawImage(currentImage, 0, 0, size, size, 0, 0, size, size);
  updateDownload();
}

function rotateImage() {
  if (!currentImage) return alert("Select image");
  canvas.width = currentImage.height;
  canvas.height = currentImage.width;
  ctx.rotate(Math.PI / 2);
  ctx.drawImage(currentImage, 0, -currentImage.height);
  ctx.rotate(-Math.PI / 2);
  updateDownload();
}

function flipImage() {
  if (!currentImage) return alert("Select image");
  canvas.width = currentImage.width;
  canvas.height = currentImage.height;
  ctx.scale(-1, 1);
  ctx.drawImage(currentImage, -currentImage.width, 0);
  ctx.scale(-1, 1);
  updateDownload();
}

/* ===================== FILTERS ===================== */
function grayscale() {
  if (!currentImage) return alert("Select image");
  drawImage();
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < data.data.length; i += 4) {
    const avg = (data.data[i] + data.data[i+1] + data.data[i+2]) / 3;
    data.data[i] = data.data[i+1] = data.data[i+2] = avg;
  }
  ctx.putImageData(data, 0, 0);
  updateDownload();
}

/* ===================== SLIDERS ===================== */
function setBrightness(v) { brightness = parseInt(v); }
function setContrast(v) { contrast = parseInt(v); }
function setBlur(v) { blur = parseInt(v); }

function applyAdjustments() {
  if (!currentImage) return alert("Select image");
  drawImage();
  updateDownload();
}

/* ===================== BORDER & WATERMARK ===================== */
function addBorder() {
  if (!currentImage) return alert("Select image");
  const pad = 20;
  const w = canvas.width + pad * 2;
  const h = canvas.height + pad * 2;
  const temp = document.createElement("canvas");
  temp.width = w;
  temp.height = h;
  const tctx = temp.getContext("2d");
  tctx.fillStyle = "#ffffff";
  tctx.fillRect(0, 0, w, h);
  tctx.drawImage(canvas, pad, pad);
  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(temp, 0, 0);
  updateDownload();
}

function addWatermark() {
  if (!currentImage) return alert("Select image");
  drawImage();
  ctx.font = "20px Arial";
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillText("AllConvert Tools", 20, canvas.height - 20);
  updateDownload();
}

/* ===================== COLOR PICK ===================== */
function pickColor() {
  canvas.addEventListener("click", function handler(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    const p = ctx.getImageData(x, y, 1, 1).data;
    alert(`RGB(${p[0]}, ${p[1]}, ${p[2]})`);
    canvas.removeEventListener("click", handler);
  });
}

/* ===================== SOCIAL RESIZE ===================== */
function socialResize(w, h) {
  if (!currentImage) return alert("Select image");
  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(currentImage, 0, 0, w, h);
  updateDownload();
}

/* ===================== UTILITIES ===================== */
function calcRatio() {
  const w = document.getElementById("w").value;
  const h = document.getElementById("h").value;
  if (!w || !h) return;
  document.getElementById("ratioResult").innerText = "Aspect Ratio: " + (w / h).toFixed(2);
}

function convertColor() {
  const val = document.getElementById("colorInput").value.trim();
  const out = document.getElementById("colorResult");

  if (val.startsWith("#")) {
    const r = parseInt(val.substr(1,2),16);
    const g = parseInt(val.substr(3,2),16);
    const b = parseInt(val.substr(5,2),16);
    out.innerText = `RGB(${r}, ${g}, ${b})`;
  } else if (val.startsWith("rgb")) {
    const nums = val.match(/\d+/g);
    const hex = "#" + nums.map(n => (+n).toString(16).padStart(2,"0")).join("");
    out.innerText = hex;
  } else {
    out.innerText = "Invalid color";
  }
}

function generatePalette() {
  const p = document.getElementById("palette");
  p.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const c = "#" + Math.floor(Math.random()*16777215).toString(16);
    const d = document.createElement("div");
    d.style.background = c;
    d.style.height = "40px";
    d.style.margin = "4px";
    d.innerText = c;
    p.appendChild(d);
  }
}
