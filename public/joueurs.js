(function(){
function details(p){
const noir=new THREE.MeshLambertMaterial({color:0x111111});
const cheveux=new THREE.MeshLambertMaterial({color:0x2b1a0e});
[p.legL,p.legR].forEach(function(l){
const s=new THREE.Mesh(new THREE.BoxGeometry(.24,.12,.36),noir);
s.position.set(0,-.65,0);l.add(s)});
const h=new THREE.Mesh(new THREE.SphereGeometry(.16,16,16,0,Math.PI*2,0,Math.PI/2),cheveux);
h.position.set(0,1.67,0);p.add(h);
}
details(shooter);details(kp);
})();
