(function(){
function numero(p,n,dos){
const c=document.createElement('canvas');c.width=c.height=128;
const x=c.getContext('2d');
x.font='bold 100px Arial';x.textAlign='center';x.textBaseline='middle';
x.lineWidth=8;x.strokeStyle='#000';x.strokeText(n,64,70);
x.fillStyle='#fff';x.fillText(n,64,70);
const m=new THREE.Mesh(new THREE.PlaneGeometry(.3,.3),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),transparent:true}));
m.position.set(0,1.2,dos*.15);
if(dos<0)m.rotation.y=Math.PI;
p.add(m);
}
numero(shooter,"9",1);numero(kp,"1",-1);
})();
