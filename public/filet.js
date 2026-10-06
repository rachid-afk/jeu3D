(function(){
const c=document.createElement('canvas');c.width=c.height=64;
const x=c.getContext('2d');
x.strokeStyle='#ffffff';x.lineWidth=4;
x.beginPath();
x.moveTo(0,0);x.lineTo(64,0);
x.moveTo(0,0);x.lineTo(0,64);
x.stroke();
const t=new THREE.CanvasTexture(c);
t.wrapS=t.wrapT=THREE.RepeatWrapping;
t.repeat.set(40,14);
net.material.map=t;
net.material.opacity=.9;
net.material.needsUpdate=true;
})();
