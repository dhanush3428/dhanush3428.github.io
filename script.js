function openTab(evt,id){
  document.querySelectorAll(".tabContent").forEach(t=>t.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  evt.target.classList.add("active");
}

const imgInput=document.getElementById("imageInput");
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const download=document.getElementById("download");

let img=null,brightness=0,contrast=0,blur=0;

imgInput.onchange=()=>{
  const f=imgInput.files[0];
  if(!f) return;
  img=new Image();
  img.onload=()=>{
    canvas.width=img.width;
    canvas.height=img.height;
    ctx.drawImage(img,0,0);
    updateDownload();
  };
  img.src=URL.createObjectURL(f);
};

function updateDownload(type="image/jpeg",q=0.9){
  download.href=canvas.toDataURL(type,q);
}

function resizeImage(){
  if(!img) return alert("Select image");
  const w=parseInt(document.getElementById("newWidth").value);
  const h=parseInt(document.getElementById("newHeight").value);
  if(!w||!h) return alert("Enter width & height");
  canvas.width=w;
  canvas.height=h;
  ctx.drawImage(img,0,0,w,h);
  updateDownload();
}

function compressImage(){
  if(!img) return alert("Select image");
  updateDownload("image/jpeg",0.4);
}

function convertPNG(){updateDownload("image/png");}
function convertJPG(){updateDownload("image/jpeg",0.9);}
function toWebP(){updateDownload("image/webp",0.9);}

function cropSquare(){
  if(!img) return;
  const s=Math.min(img.width,img.height);
  canvas.width=s;canvas.height=s;
  ctx.drawImage(img,0,0,s,s,0,0,s,s);
  updateDownload();
}

function rotateImage(){
  if(!img) return;
  canvas.width=img.height;canvas.height=img.width;
  ctx.rotate(Math.PI/2);
  ctx.drawImage(img,0,-img.height);
  ctx.rotate(-Math.PI/2);
  updateDownload();
}

function flipImage(){
  if(!img) return;
  canvas.width=img.width;canvas.height=img.height;
  ctx.scale(-1,1);
  ctx.drawImage(img,-img.width,0);
  ctx.scale(-1,1);
  updateDownload();
}

function grayscale(){
  const d=ctx.getImageData(0,0,canvas.width,canvas.height);
  for(let i=0;i<d.data.length;i+=4){
    const a=(d.data[i]+d.data[i+1]+d.data[i+2])/3;
    d.data[i]=d.data[i+1]=d.data[i+2]=a;
  }
  ctx.putImageData(d,0,0);
  updateDownload();
}

function setBrightness(v){brightness=v;}
function setContrast(v){contrast=v;}
function setBlur(v){blur=v;}

function applyAdjustments(){
  ctx.filter=`brightness(${100+brightness}%) contrast(${100+contrast}%) blur(${blur}px)`;
  ctx.drawImage(img,0,0,canvas.width,canvas.height);
  ctx.filter="none";
  updateDownload();
}

function addBorder(){
  const p=20;
  const t=document.createElement("canvas");
  t.width=canvas.width+p*2;
  t.height=canvas.height+p*2;
  const tc=t.getContext("2d");
  tc.fillStyle="#fff";
  tc.fillRect(0,0,t.width,t.height);
  tc.drawImage(canvas,p,p);
  canvas.width=t.width;canvas.height=t.height;
  ctx.drawImage(t,0,0);
  updateDownload();
}

function addWatermark(){
  ctx.font="20px Arial";
  ctx.fillStyle="rgba(0,0,0,0.5)";
  ctx.fillText("AllConvert Tools",20,canvas.height-20);
  updateDownload();
}

function socialResize(w,h){
  canvas.width=w;canvas.height=h;
  ctx.drawImage(img,0,0,w,h);
  updateDownload();
}

function calcRatio(){
  const w=document.getElementById("w").value;
  const h=document.getElementById("h").value;
  document.getElementById("ratioResult").innerText=w&&h?`Ratio: ${(w/h).toFixed(2)}`:"";
}

function convertColor(){
  const v=document.getElementById("colorInput").value;
  const o=document.getElementById("colorResult");
  if(v.startsWith("#")){
    const r=parseInt(v.substr(1,2),16);
    const g=parseInt(v.substr(3,2),16);
    const b=parseInt(v.substr(5,2),16);
    o.innerText=`RGB(${r},${g},${b})`;
  }else{
    o.innerText="Invalid";
  }
}

function generatePalette(){
  const p=document.getElementById("palette");
  p.innerHTML="";
  for(let i=0;i<5;i++){
    const c="#"+Math.floor(Math.random()*16777215).toString(16);
    const d=document.createElement("div");
    d.style.background=c;
    d.style.height="40px";
    d.innerText=c;
    p.appendChild(d);
  }
}
