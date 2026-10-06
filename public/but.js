(function(){
const blanc=new THREE.MeshLambertMaterial({color:0xffffff});
function tube(len,x,y,z,rz){
const m=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,len,16),blanc);
m.position.set(x,y,z);m.rotation.z=rz;scene.add(m);
}
tube(2.5,-3.66,1.25,-11,0);
tube(2.5,3.66,1.25,-11,0);
tube(7.62,0,2.44,-11,Math.PI/2);
const c=document.createElement('canvas');c.width=c.height=64;
const x=c.getContext('2d');
x.strokeStyle='#ffffff';x.lineWidth=4;
x.beginPath();x.moveTo(0,0);x.lineTo(64,0);x.moveTo(0,0);x.lineTo(0,64);x.stroke();
function filet(w,h){
const t=new THREE.CanvasTexture(c);
t.wrapS=t.wrapT=THREE.RepeatWrapping;
t.repeat.set(w/.18,h/.18);
return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,transparent:true,opacity:.9,side:THREE.DoubleSide}));
}
const gauche=filet(1.5,2.44);
gauche.rotation.y=Math.PI/2;gauche.position.set(-3.66,1.22,-11.75);scene.add(gauche);
const droite=filet(1.5,2.44);
droite.rotation.y=Math.PI/2;droite.position.set(3.66,1.22,-11.75);scene.add(droite);
const toit=filet(7.32,1.5);
toit.rotation.x=Math.PI/2;toit.position.set(0,2.44,-11.75);scene.add(toit);
})();
