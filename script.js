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

function update(type="image/png",q=1){
  dl.href=canvas.toDataURL(type,q);
}

/* ---------- BACKGROUND REMOVE (COLOR BASED) ---------- */
function removeBackground(){
  if(!img)return alert("Upload image first");

  const color=document.getElementById("removeColor").value;
  const r=parseInt(color.substr(1,2),16);
  const g=parseInt(color.substr(3,2),16);
  const b=parseInt(color.substr(5,2),16);

  const imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
  const d=imgData.data;

  for(let i=0;i<d.length;i+=4){
    if(
      Math.abs(d[i]-r)<30 &&
      Math.abs(d[i+1]-g)<30 &&
      Math.abs(d[i+2]-b)<30
    ){
      d[i+3]=0; // transparent
    }
  }
  ctx.putImageData(imgData,0,0);
  update("image/png");
}

/* ---------- ADD BACKGROUND COLOR ---------- */
function addBackgroundColor(){
  const color=document.getElementById("bgColor").value;
  const temp=document.createElement("canvas");
  temp.width=canvas.width;
  temp.height=canvas.height;
  const tctx=temp.getContext("2d");

  tctx.fillStyle=color;
  tctx.fillRect(0,0,temp.width,temp.height);
  tctx.drawImage(canvas,0,0);

  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(temp,0,0);
  update("image/png");
}

/* ---------- ADD BACKGROUND IMAGE ---------- */
function addBackgroundImage(){
  const bgInput=document.getElementById("bgImage").files[0];
  if(!bgInput)return alert("Select background image");

  const bg=new Image();
  bg.onload=()=>{
    const temp=document.createElement("canvas");
    temp.width=canvas.width;
    temp.height=canvas.height;
    const tctx=temp.getContext("2d");

    tctx.drawImage(bg,0,0,temp.width,temp.height);
    tctx.drawImage(canvas,0,0);

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(temp,0,0);
    update("image/png");
  };
  bg.src=URL.createObjectURL(bgInput);
}

/* ---------- BACKGROUND BLUR ---------- */
function backgroundBlur(){
  if(!img)return;
  const blur=parseInt(blurRange.value);
  ctx.filter=`blur(${blur}px)`;
  ctx.drawImage(img,0,0,canvas.width,canvas.height);
  ctx.filter="none";
  update();
}

/* ---------- RESIZE FIT (NO CROP) ---------- */
function resizeFit(){
  if(!img)return;
  const W=parseInt(resizeW.value),H=parseInt(resizeH.value);
  if(!W||!H)return alert("Enter width & height");

  const r=Math.min(W/img.width,H/img.height);
  const nw=img.width*r,nh=img.height*r;

  canvas.width=W;
  canvas.height=H;
  ctx.fillStyle="#fff";
  ctx.fillRect(0,0,W,H);
  ctx.drawImage(img,(W-nw)/2,(H-nh)/2,nw,nh);
  update();
}

/* ---------- COMPRESS ---------- */
function compress(){
  const q=quality.value/100;
  dl.href=canvas.toDataURL("image/jpeg",q);
}
