(function(){
const c=document.createElement('canvas');c.width=256;c.height=128;
const x=c.getContext('2d');
x.fillStyle='#fafafa';x.fillRect(0,0,256,128);
x.fillStyle='#111';
for(let j=0;j<3;j++)for(let i=0;i<6;i++){
const cx=i*43+(j%2)*21,cy=22+j*42;
x.beginPath();
for(let k=0;k<5;k++){const a=k*Math.PI*2/5-Math.PI/2;
x[k?'lineTo':'moveTo'](cx+Math.cos(a)*13,cy+Math.sin(a)*13)}
x.closePath();x.fill()}
ball.material.map=new THREE.CanvasTexture(c);
ball.material.needsUpdate=true;
})();
