(function(){
const g=document.createElement('canvas');g.width=2;g.height=256;
const gx=g.getContext('2d');
const gr=gx.createLinearGradient(0,0,0,256);
gr.addColorStop(0,'#0b1d4a');gr.addColorStop(.6,'#2e5fa8');gr.addColorStop(1,'#87ceeb');
gx.fillStyle=gr;gx.fillRect(0,0,2,256);
scene.background=new THREE.CanvasTexture(g);
const gris=new THREE.MeshLambertMaterial({color:0x888888});
const lampe=new THREE.MeshBasicMaterial({color:0xfff6c8});
[-25,-9,9,25].forEach(function(x){
const p=new THREE.Mesh(new THREE.CylinderGeometry(.25,.35,14,10),gris);
p.position.set(x,7,-26);scene.add(p);
const l=new THREE.Mesh(new THREE.BoxGeometry(4,2.5,.3),lampe);
l.position.set(x,14.5,-25.7);scene.add(l);
});
const c=document.createElement('canvas');c.width=2048;c.height=56;
const x=c.getContext('2d');
x.fillStyle='#0a1f5c';x.fillRect(0,0,2048,56);
x.fillStyle='#ffd400';x.font='bold 44px Arial';
for(let i=0;i<4;i++)x.fillText('PENALTY CUP',i*512+60,44);
const pub=new THREE.Mesh(new THREE.PlaneGeometry(29.6,.8),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}));
pub.position.set(0,.45,-13.69);scene.add(pub);
})();
