const imgInput = document.getElementById("imageInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const link = document.getElementById("downloadLink");

function loadImage(callback) {
  const file = imgInput.files[0];
  if (!file) return alert("Select an image");
  const img = new Image();
  img.onload = () => callback(img);
  img.src = URL.createObjectURL(file);
}

function convertToPNG() {
  loadImage(img => draw(img, "image/png"));
}

function convertToJPG() {
  loadImage(img => draw(img, "image/jpeg"));
}

function resizeImage() {
  loadImage(img => {
    canvas.width = img.width / 2;
    canvas.height = img.height / 2;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    link.href = canvas.toDataURL("image/png");
  });
}

function compressImage() {
  loadImage(img => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    link.href = canvas.toDataURL("image/jpeg", 0.5);
  });
}

function grayscale() {
  loadImage(img => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < data.data.length; i += 4) {
      const avg = (data.data[i] + data.data[i+1] + data.data[i+2]) / 3;
      data.data[i] = data.data[i+1] = data.data[i+2] = avg;
    }
    ctx.putImageData(data, 0, 0);
    link.href = canvas.toDataURL();
  });
}

function rotateImage() {
  loadImage(img => {
    canvas.width = img.height;
    canvas.height = img.width;
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(img, 0, -img.height);
    ctx.rotate(-Math.PI / 2);
    link.href = canvas.toDataURL();
  });
}

function flipImage() {
  loadImage(img => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.scale(-1, 1);
    ctx.drawImage(img, -img.width, 0);
    ctx.scale(-1, 1);
    link.href = canvas.toDataURL();
  });
}

function toWebP() {
  loadImage(img => draw(img, "image/webp"));
}

function cropSquare() {
  loadImage(img => {
    const size = Math.min(img.width, img.height);
    canvas.width = size;
    canvas.height = size;
    ctx.drawImage(img, 0, 0, size, size, 0, 0, size, size);
    link.href = canvas.toDataURL();
  });
}

function draw(img, type) {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  link.href = canvas.toDataURL(type);
}

/* TEXT TOOLS */

function wordCount() {
  const t = textInput.value.trim();
  textResult.innerText = "Words: " + (t ? t.split(/\s+/).length : 0);
}

function charCount() {
  textResult.innerText = "Characters: " + textInput.value.length;
}

function toUpper() {
  textInput.value = textInput.value.toUpperCase();
}

function toLower() {
  textInput.value = textInput.value.toLowerCase();
}

function reverseText() {
  textInput.value = textInput.value.split("").reverse().join("");
}

function removeSpaces() {
  textInput.value = textInput.value.replace(/\s+/g, " ").trim();
}

function passwordGen() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
  let pass = "";
  for (let i = 0; i < 12; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }
  textResult.innerText = "Password: " + pass;
}

function textToImage() {
  const text = textInput.value;
  canvas.width = 600;
  canvas.height = 200;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(text, 20, 100);
  link.href = canvas.toDataURL();
}
