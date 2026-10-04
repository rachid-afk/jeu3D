const express=require('express');
const app=express();
const http=require('http').createServer(app);
const io=require('socket.io')(http);
app.use(express.static('public'));
let waiting=null;
const TOTAL=10;
function startRound(R){
  R.ch=[null,null];
  const shooter=R.r%2;
  R.p.forEach((s,i)=>s.emit('round',{r:R.r,total:TOTAL,shooter,you:i,score:R.score}));
}
io.on('connection',s=>{
  if(waiting&&waiting.connected){
    const R={p:[waiting,s],score:[0,0],r:0,ch:[null,null]};
    waiting.room=R;s.room=R;waiting=null;
    startRound(R);
  }else{waiting=s;s.emit('wait');}
  s.on('choice',z=>{
    const R=s.room;if(!R||R.over)return;
    const i=R.p.indexOf(s);
    if(R.ch[i]!==null||!(z>=0&&z<=5))return;
    R.ch[i]=z;
    if(R.ch[0]!==null&&R.ch[1]!==null){
      const sh=R.r%2,sz=R.ch[sh],kz=R.ch[1-sh];
      const goal=sz!==kz;
      if(goal)R.score[sh]++;
      R.p.forEach(p=>p.emit('result',{shooter:sh,sz,kz,goal,score:R.score}));
      R.r++;
      setTimeout(()=>{
        if(R.over)return;
        if(R.r>=TOTAL){R.over=true;R.p.forEach(p=>p.emit('end',{score:R.score}));}
        else startRound(R);
      },3500);
    }
  });
  s.on('disconnect',()=>{
    if(waiting===s)waiting=null;
    const R=s.room;
    if(R&&!R.over){R.over=true;R.p.forEach(p=>{if(p!==s)p.emit('left')});}
  });
});
http.listen(process.env.PORT||3000,()=>console.log('Penalty sur http://localhost:3000'));
