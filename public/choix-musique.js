(function(){
 const inp=document.createElement('input');
 inp.type='file';inp.accept='audio/*';inp.style.display='none';
 document.body.appendChild(inp);
 const audio=new Audio();audio.loop=true;audio.volume=.6;
 function mk(txt,top){
  const b=document.createElement('button');b.textContent=txt;
  b.style.cssText='position:fixed;top:'+top+'px;right:10px;font-size:24px;border:0;border-radius:50%;width:48px;height:48px;opacity:.85;z-index:5';
  document.body.appendChild(b);return b}
 const pick=mk('🎵',134),pp=mk('⏯',190);
 pick.onclick=()=>inp.click();
 inp.onchange=()=>{
  const f=inp.files[0];if(!f)return;
  audio.src=URL.createObjectURL(f);
  window.ownMusic=true;
  audio.play().catch(()=>{})};
 pp.onclick=()=>{
  if(!audio.src)return;
  if(audio.paused)audio.play();else audio.pause()};
})();
