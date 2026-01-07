const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const download = document.getElementById("download");

let originalImage = null;

/* LOAD IMAGE */
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    originalImage = img;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    updateDownload();
  };
  img.src = URL.createObjectURL(file);
});

/* UPDATE DOWNLOAD */
function updateDownload(type="image/jpeg", quality=0.9){
  download.href = canvas.toDataURL(type, quality);
}

/* RESIZE – 100% WORKING */
function resizeImage(){
  if(!originalImage){
    alert("Please upload an image first");
    return;
  }

  const w = document.getElementById("resizeWidth").value;
  const h = document.getElementById("resizeHeight").value;

  if(w === "" || h === ""){
    alert("Enter both width and height");
    return;
  }

  const newW = parseInt(w);
  const newH = parseInt(h);

  canvas.width = newW;
  canvas.height = newH;
  ctx.clearRect(0,0,newW,newH);
  ctx.drawImage(originalImage, 0, 0, newW, newH);

  updateDownload();
}

/* COMPRESS */
function compressImage(){
  if(!originalImage) return alert("Upload image first");
  updateDownload("image/jpeg", 0.4);
}

/* CONVERT PNG */
function convertPNG(){
  if(!originalImage) return alert("Upload image first");
  updateDownload("image/png");
}

/* CONVERT JPG */
function convertJPG(){
  if(!originalImage) return alert("Upload image first");
  updateDownload("image/jpeg", 0.9);
}

/* GRAYSCALE */
function grayscale(){
  if(!originalImage) return alert("Upload image first");
  const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  for(let i=0;i<imgData.data.length;i+=4){
    const avg = (imgData.data[i]+imgData.data[i+1]+imgData.data[i+2])/3;
    imgData.data[i]=avg;
    imgData.data[i+1]=avg;
    imgData.data[i+2]=avg;
  }
  ctx.putImageData(imgData,0,0);
  updateDownload();
}

/* ROTATE */
function rotateImage(){
  if(!originalImage) return alert("Upload image first");
  canvas.width = originalImage.height;
  canvas.height = originalImage.width;
  ctx.rotate(Math.PI/2);
  ctx.drawImage(originalImage,0,-originalImage.height);
  ctx.rotate(-Math.PI/2);
  updateDownload();
}
