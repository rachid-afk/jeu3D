(function(){
 const bodyG=new THREE.BoxGeometry(.5,.7,.3),headG=new THREE.SphereGeometry(.17,12,12);
 const cols=[0xe53935,0x1e88e5,0xfdd835,0xffffff,0x43a047,0xfb8c00];
 const mats=cols.map(c=>new THREE.MeshLambertMaterial({color:c}));
 const skins=[0xf0c8a0,0xd9a273,0x8d5a3b].map(c=>new THREE.MeshLambertMaterial({color:c}));
 const grey=new THREE.MeshLambertMaterial({color:0x888888});
 function add(geo,mat,x,y,z){const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);scene.add(o);return o}
 const fans=[];
 for(let r=0;r<3;r++){
  const h=.8*(r+1);
  add(new THREE.BoxGeometry(28,h,1.4),grey,0,h/2,-15-r*1.4);
  for(let i=0;i<20;i++){
   const g=new THREE.Group();
   g.position.set(-12.5+i*1.32+(r%2)*.4,h,-15-r*1.4);
   const b=new THREE.Mesh(bodyG,mats[(i*3+r*2)%6]);b.position.y=.35;
   const hd=new THREE.Mesh(headG,skins[(i+r)%3]);hd.position.y=.87;
   g.add(b,hd);scene.add(g);
   fans.push({g,y:h,p:Math.random()*6.28});
  }
 }
 add(new THREE.BoxGeometry(30,.9,.2),new THREE.MeshLambertMaterial({color:0x1e3a8a}),0,.45,-13.8);
 let cheer=0;
 socket.on('result',d=>{if(d.goal)setTimeout(()=>{cheer=2.5},1500)});
 let last=performance.now();
 (function tick(now){requestAnimationFrame(tick);
  const dt=Math.min((now-last)/1000,.1);last=now;
  if(cheer>0)cheer-=dt;
  fans.forEach(f=>{f.g.position.y=f.y+(cheer>0?Math.abs(Math.sin(now/110+f.p))*.4:Math.sin(now/500+f.p)*.03)});
 })(performance.now());
})();
