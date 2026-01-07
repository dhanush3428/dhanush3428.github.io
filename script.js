const input=document.getElementById("imageInput");
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const dl=document.getElementById("download");

let img=null;

input.onchange=()=>{
  const f=input.files[0];
  if(!f)return;
  img=new Image();
  img.onload=()=>{
    canvas.width=img.width;
    canvas.height=img.height;
    ctx.drawImage(img,0,0);
    update();
  };
  img.src=URL.createObjectURL(f);
};

function update(type="image/jpeg",q=0.9){
  dl.href=canvas.toDataURL(type,q);
}

/* -------- RESIZE FIT (NO CROP) -------- */
function resizeFit(){
  if(!img)return alert("Upload image");
  const W=parseInt(document.getElementById("resizeW").value);
  const H=parseInt(document.getElementById("resizeH").value);
  if(!W||!H)return alert("Enter width & height");

  const r=Math.min(W/img.width,H/img.height);
  const nw=img.width*r;
  const nh=img.height*r;

  canvas.width=W;
  canvas.height=H;
  ctx.fillStyle="#fff";
  ctx.fillRect(0,0,W,H);
  ctx.drawImage(img,(W-nw)/2,(H-nh)/2,nw,nh);
  update();
}

/* -------- COMPRESS CONTROL -------- */
function compress(){
  if(!img)return alert("Upload image");
  const q=document.getElementById("quality").value/100;
  update("image/jpeg",q);
}

/* -------- FORMAT -------- */
function toPNG(){update("image/png",1)}
function toJPG(){update("image/jpeg",0.9)}
function toWEBP(){update("image/webp",0.9)}

/* -------- ASPECT (NO CUT) -------- */
function makeSquare(){
  if(!img)return;
  const s=Math.max(img.width,img.height);
  canvas.width=s;canvas.height=s;
  ctx.fillStyle="#fff";
  ctx.fillRect(0,0,s,s);
  ctx.drawImage(img,(s-img.width)/2,(s-img.height)/2);
  update();
}

function makeLandscape(){
  if(!img)return;
  const W=1280,H=720;
  const r=Math.min(W/img.width,H/img.height);
  const nw=img.width*r,nh=img.height*r;
  canvas.width=W;canvas.height=H;
  ctx.fillStyle="#fff";
  ctx.fillRect(0,0,W,H);
  ctx.drawImage(img,(W-nw)/2,(H-nh)/2,nw,nh);
  update();
}

/* -------- EDIT -------- */
function grayscale(){
  const d=ctx.getImageData(0,0,canvas.width,canvas.height);
  for(let i=0;i<d.data.length;i+=4){
    const a=(d.data[i]+d.data[i+1]+d.data[i+2])/3;
    d.data[i]=d.data[i+1]=d.data[i+2]=a;
  }
  ctx.putImageData(d,0,0);
  update();
}

function rotate(){
  const t=document.createElement("canvas");
  t.width=canvas.height;t.height=canvas.width;
  const c=t.getContext("2d");
  c.rotate(Math.PI/2);
  c.drawImage(canvas,0,-canvas.height);
  canvas.width=t.width;canvas.height=t.height;
  ctx.drawImage(t,0,0);
  update();
}

function flip(){
  ctx.scale(-1,1);
  ctx.drawImage(canvas,-canvas.width,0);
  ctx.scale(-1,1);
  update();
}
