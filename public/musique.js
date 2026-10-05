(function(){
 let ctx=null,on=false,master,crowd,step=0;
 const btn=document.createElement('button');
 btn.textContent='🔇';
 btn.style.cssText='position:fixed;top:78px;right:10px;font-size:26px;border:0;border-radius:50%;width:48px;height:48px;opacity:.85;z-index:5';
 document.body.appendChild(btn);
 const mel=[262,330,392,330,262,330,392,523,440,349,440,523,392,330,294,392];
 function tone(type,freq,vol,dur){
  const t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();
  o.type=type;o.frequency.value=freq;
  g.gain.setValueAtTime(.0001,t);
  g.gain.exponentialRampToValueAtTime(vol,t+.02);
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.05)}
 function start(){
  ctx=new (window.AudioContext||window.webkitAudioContext)();
  master=ctx.createGain();master.gain.value=.5;master.connect(ctx.destination);
  const len=ctx.sampleRate*2,buf=ctx.createBuffer(1,len,ctx.sampleRate),d=buf.getChannelData(0);
  for(let i=0;i<len;i++)d[i]=Math.random()*2-1;
  const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
  const f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=700;f.Q.value=.6;
  crowd=ctx.createGain();crowd.gain.value=.12;
  src.connect(f);f.connect(crowd);crowd.connect(master);src.start();
  setInterval(()=>{
   if(!on||window.ownMusic)return;
   tone('square',mel[step%16],.07,.28);
   if(step%4===0)tone('triangle',mel[step%16]/2,.18,.5);
   step++},300)}
 btn.onclick=()=>{
  if(!ctx)start();
  on=!on;
  if(on)ctx.resume();else ctx.suspend();
  btn.textContent=on?'🔊':'🔇'};
 socket.on('result',d=>{
  if(d.goal&&ctx&&on)setTimeout(()=>{
   crowd.gain.setTargetAtTime(.5,ctx.currentTime,.05);
   setTimeout(()=>crowd.gain.setTargetAtTime(.12,ctx.currentTime,.5),1500)},1500)});
})();
