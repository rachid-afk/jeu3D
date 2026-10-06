socket.on('end',()=>{
  const b=document.createElement('button');
  b.textContent='Rejouer';
  b.style.cssText='position:fixed;top:45%;left:50%;transform:translateX(-50%);padding:16px 32px;font-size:24px;border:0;border-radius:12px;background:#fff;z-index:99';
  b.onclick=()=>location.reload();
  document.body.appendChild(b);
});
