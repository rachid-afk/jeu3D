const express=require('express');
const app=express();
const http=require('http').createServer(app);
const io=require('socket.io')(http);
app.use(express.static('public'));
const TOTAL=10;
const rooms={};
function startRound(R){
  R.ch=[null,null];
  const shooter=R.r%2;
  R.p.forEach((s,i)=>s.emit('round',{r:R.r,total:TOTAL,shooter,you:i,score:R.score}));
}
function drop(R){if(rooms[R.code]===R)delete rooms[R.code]}
function leave(s){
  const R=s.room;if(!R)return;
  s.room=null;
  if(!R.started){R.p=R.p.filter(p=>p!==s);if(!R.p.length)drop(R);return}
  if(!R.over){R.over=true;R.p.forEach(p=>{if(p!==s)p.emit('left')})}
  drop(R);
}
io.on('connection',s=>{
  s.on('join',raw=>{
    const code=String(raw).trim().toUpperCase().slice(0,8);
    if(!code)return;
    leave(s);
    let R=rooms[code];
    if(!R)R=rooms[code]={code,p:[],score:[0,0],r:0,ch:[null,null],started:false};
    if(R.p.length>=2){s.emit('full');return}
    R.p.push(s);s.room=R;
    s.emit('joined',code);
    if(R.p.length===2){R.started=true;startRound(R)}
    else s.emit('wait');
  });
  s.on('choice',(z,pw)=>{
    const R=s.room;if(!R||!R.started||R.over)return;
    const i=R.p.indexOf(s);
    if(R.ch[i]!==null||!(z>=0&&z<=5))return;
    R.ch[i]=z;if(!R.pw)R.pw=[0.5,0.5];const qq=Number(pw);R.pw[i]=isNaN(qq)?0.5:Math.max(0,Math.min(1,qq));
    if(R.ch[0]!==null&&R.ch[1]!==null){
      const sh=R.r%2,sz=R.ch[sh],kz=R.ch[1-sh];
      const pwr=R.pw[sh];const goal=sz!==kz&&pwr>=0.15&&pwr<=0.85;
      if(goal)R.score[sh]++;
      R.p.forEach(p=>p.emit('result',{shooter:sh,sz,kz,goal,score:R.score,pw:pwr}));
      R.r++;
      setTimeout(()=>{
        if(R.over)return;
        if(R.r>=TOTAL&&R.r%2===0&&R.score[0]!==R.score[1]){R.over=true;R.p.forEach(p=>p.emit('end',{score:R.score}))}
        else startRound(R);
      },3500);
    }
  });
  s.on('chat',t=>{
    const R=s.room;if(!R)return;
    R.p.forEach(p=>{if(p!==s)p.emit('chat',String(t).slice(0,200))});
  });
  s.on('kit',k=>{const R=s.room;if(R)R.p.forEach(p=>{p===s?0:p.emit('kit',String(k).slice(0,20))})});
  s.on('nom',n=>{const R=s.room;if(R)R.p.forEach(p=>{p===s?0:p.emit('nom',String(n).slice(0,15))})});
  s.on('disconnect',()=>leave(s));
});
http.listen(process.env.PORT||3000,()=>console.log('Penalty sur http://localhost:3000'));
