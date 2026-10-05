(function(){
 const c=document.createElement('canvas');c.width=64;c.height=384;
 const x=c.getContext('2d');
 for(let i=0;i<12;i++){x.fillStyle=i%2?'#256b2e':'#2c7d37';x.fillRect(0,i*32,64,32)}
 pitch.material=new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(c)});
 const wm=new THREE.MeshBasicMaterial({color:0xffffff});
 function line(cx,cz,w,d){const o=new THREE.Mesh(new THREE.BoxGeometry(w,.02,d),wm);o.position.set(cx,.012,cz);scene.add(o)}
 line(0,5.5,40.32,.12);line(-20.16,-2.75,.12,16.5);line(20.16,-2.75,.12,16.5);
 line(0,-5.5,18.32,.12);line(-9.16,-8.25,.12,5.5);line(9.16,-8.25,.12,5.5);
 const bc=document.createElement('canvas');bc.width=256;bc.height=128;
 const b=bc.getContext('2d');b.fillStyle='#fafafa';b.fillRect(0,0,256,128);b.fillStyle='#222';
 [[30,30],[90,40],[150,25],[210,45],[60,95],[120,90],[180,100],[240,85],[0,64],[255,64]].forEach(p=>{b.beginPath();b.arc(p[0],p[1],13,0,6.3);b.fill()});
 ball.material=new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(bc)});
 let lz=ball.position.z;
 (function tick(){requestAnimationFrame(tick);
  const dz=ball.position.z-lz;lz=ball.position.z;
  if(Math.abs(dz)<1)ball.rotation.x+=dz/.11;
  if(ball.position.z===0)ball.rotation.x=0;
 })();
})();
