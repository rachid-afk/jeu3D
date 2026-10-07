window.demarrerMatch = function () {
  var W = window.innerWidth, H = window.innerHeight;
  var cont = document.createElement('div');
  cont.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99998;background:#000;touch-action:none;';
  document.body.appendChild(cont);

  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(W, H);
  cont.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a2a5a);
  var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
  camera.position.set(0, 20, 40);
  camera.lookAt(0, 0, 8);
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  var soleil = new THREE.DirectionalLight(0xffffff, 0.6);
  soleil.position.set(10, 30, 10);
  scene.add(soleil);

  var pelouse = new THREE.Mesh(new THREE.PlaneGeometry(40, 70), new THREE.MeshLambertMaterial({ color: 0x2eaa3a }));
var c=document.createElement("canvas");c.width=c.height=128;var x=c.getContext("2d");x.fillStyle="#3f8f2f";x.fillRect(0,0,128,128);x.fillStyle="#4aa338";x.fillRect(0,0,64,64);x.fillRect(64,64,64,64);var tx=new THREE.CanvasTexture(c);tx.wrapS=tx.wrapT=THREE.RepeatWrapping;tx.repeat.set(5,9);pelouse.material=new THREE.MeshLambertMaterial({map:tx});
  pelouse.rotation.x = -Math.PI / 2;
  scene.add(pelouse);

  function ligne(w, d, x, z) {
    var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.02, z);
    scene.add(m);
  }
  ligne(40, 0.3, 0, 0); ligne(40, 0.3, 0, -34.8); ligne(40, 0.3, 0, 34.8);
  ligne(0.3, 70, -19.8, 0); ligne(0.3, 70, 19.8, 0);
function pan(w,x,z,r){var k=document.createElement("canvas");k.width=512;k.height=64;var g=k.getContext("2d");g.fillStyle="#0a1a5a";g.fillRect(0,0,512,64);g.fillStyle="#f5c400";g.font="bold 40px sans-serif";g.textAlign="center";g.fillText("PENALTY CUP",256,46);var t=new THREE.CanvasTexture(k);t.wrapS=THREE.RepeatWrapping;t.repeat.set(w/8,1);var m=new THREE.Mesh(new THREE.PlaneGeometry(w,1.4),new THREE.MeshBasicMaterial({map:t}));m.position.set(x,0.7,z);m.rotation.y=r;scene.add(m);} pan(70,-20.5,0,Math.PI/2);pan(70,20.5,0,-Math.PI/2);pan(41,0,-35.5,0);

  function but(z) {
    var mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var g = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), mat); g.position.set(-4, 1.25, z);
    var d = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), mat); d.position.set(4, 1.25, z);
    var b = new THREE.Mesh(new THREE.BoxGeometry(8.3, 0.3, 0.3), mat); b.position.set(0, 2.5, z);
    scene.add(g, d, b);
  }
  but(-34.8); but(34.8);

  function creerJoueur(couleur, x, z) {
    var j = new THREE.Group();
    var peau = new THREE.MeshLambertMaterial({ color: 0xf0c8a0 });
    var jambes = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 0.5), peau); jambes.position.y = 0.45;
    var corps = new THREE.Mesh(new THREE.BoxGeometry(1, 1.1, 0.6), new THREE.MeshLambertMaterial({ color: couleur })); corps.position.y = 1.45;
    var tete = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), peau); tete.position.y = 2.4;
    var zone = new THREE.Mesh(new THREE.BoxGeometry(3, 3.5, 3), new THREE.MeshBasicMaterial({ visible: false })); zone.position.y = 1.7;
    j.add(jambes, corps, tete, zone);
    j.position.set(x, 0, z);
    scene.add(j);
    return j;
  }

  var bleus = [creerJoueur(0x1e5af0, -4.5, 18), creerJoueur(0x1e5af0, 0, 24), creerJoueur(0x1e5af0, 4.5, 18)];
  var rouges = [creerJoueur(0xe02020, -8, -22), creerJoueur(0xe02020, 0, -26), creerJoueur(0xe02020, 8, -22)];
  rouges.forEach(function (r) { r.rotation.y = Math.PI; });

  var ballon = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), new THREE.MeshLambertMaterial({ color: 0xffffff }));
  scene.add(ballon);

  var porteur = 1;
  var occupe = false;
// Ciel
var ck = document.createElement('canvas'); ck.width = 2; ck.height = 256;
var gk = ck.getContext('2d');
var dg = gk.createLinearGradient(0, 0, 0, 256);
dg.addColorStop(0, '#2f7fe0'); dg.addColorStop(1, '#cfe9ff');
gk.fillStyle = dg; gk.fillRect(0, 0, 2, 256);
scene.background = new THREE.CanvasTexture(ck);

// Sol autour du stade
var beton = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshLambertMaterial({ color: 0x6a6a6a }));
beton.rotation.x = -Math.PI / 2; beton.position.y = -0.05;
scene.add(beton);

// Soleil et ombres
renderer.shadowMap.enabled = true;
soleil.position.set(15, 40, 25);
soleil.castShadow = true;
soleil.shadow.mapSize.set(1024, 1024);
soleil.shadow.camera.left = -50; soleil.shadow.camera.right = 50;
soleil.shadow.camera.top = 50; soleil.shadow.camera.bottom = -50;
soleil.shadow.camera.near = 1; soleil.shadow.camera.far = 150;
soleil.shadow.bias = -0.001;
soleil.shadow.camera.updateProjectionMatrix();
pelouse.receiveShadow = true;
bleus.concat(rouges).forEach(function (g) {
  g.traverse(function (o) { if (o.isMesh) o.castShadow = true; });
});
ballon.castShadow = true;

// Tribunes avec spectateurs
function foule(w) {
  var k = document.createElement('canvas'); k.width = 512; k.height = 256;
  var g = k.getContext('2d');
  g.fillStyle = '#2a2a3a'; g.fillRect(0, 0, 512, 256);
  var cols = ['#e02020', '#1e5af0', '#ffffff', '#f5c400', '#ff7a00', '#2eaa3a', '#222222'];
  for (var i = 0; i < 900; i++) {
    var px = Math.random() * 512, py = Math.random() * 256;
    g.fillStyle = cols[Math.floor(Math.random() * cols.length)];
    g.fillRect(px - 5, py, 10, 12);
    g.fillStyle = '#f0c8a0';
    g.beginPath(); g.arc(px, py - 4, 4.5, 0, 6.3); g.fill();
  }
  var t = new THREE.CanvasTexture(k);
  t.wrapS = THREE.RepeatWrapping;
  t.repeat.set(w / 28, 1);
  return t;
}
function tribune(w, x, z, r) {
  var g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = r;
  var p = new THREE.Mesh(new THREE.PlaneGeometry(w, 14), new THREE.MeshBasicMaterial({ map: foule(w) }));
  p.position.set(0, 6.5, 0); p.rotation.x = -0.6;
  g.add(p); scene.add(g);
}
tribune(70, -28, 0, Math.PI / 2);
tribune(70, 28, 0, -Math.PI / 2);
tribune(60, 0, -43, 0);

// Ballon noir et blanc
var bk = document.createElement('canvas'); bk.width = 128; bk.height = 128;
var bg = bk.getContext('2d');
bg.fillStyle = '#ffffff'; bg.fillRect(0, 0, 128, 128);
bg.fillStyle = '#111111';
[[32, 32], [96, 32], [64, 64], [32, 96], [96, 96], [0, 64], [128, 64], [64, 0], [64, 128]].forEach(function (c) {
  bg.beginPath(); bg.arc(c[0], c[1], 14, 0, 6.3); bg.fill();
});
ballon.material = new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(bk) });
ballon.scale.set(1.2, 1.2, 1.2);

// Filets des buts
var nk = document.createElement('canvas'); nk.width = 32; nk.height = 32;
var ng = nk.getContext('2d');
ng.strokeStyle = 'rgba(255,255,255,0.8)'; ng.lineWidth = 2; ng.strokeRect(0, 0, 32, 32);
var nt = new THREE.CanvasTexture(nk);
nt.wrapS = nt.wrapT = THREE.RepeatWrapping; nt.repeat.set(16, 5);
function filet(z) {
  var f = new THREE.Mesh(new THREE.PlaneGeometry(8, 2.5), new THREE.MeshBasicMaterial({ map: nt, transparent: true, side: THREE.DoubleSide }));
  f.position.set(0, 1.25, z);
  scene.add(f);
}
filet(-35.3); filet(35.3);
function creerJoueur(couleur, x, z) {
  var j = new THREE.Group();
  function bloc(w, h, d, c, px, py, pz) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshLambertMaterial({ color: c }));
    m.position.set(px, py, pz);
    j.add(m);
  }
  var peau = 0xf0c8a0;
  var cheveux = [0x2b1b0e, 0xe8c46a, 0x111111, 0x6b3d1a][Math.floor(Math.abs(x * 3 + z)) % 4];
  bloc(0.34, 0.2, 0.55, 0x111111, -0.25, 0.1, -0.05);
  bloc(0.34, 0.2, 0.55, 0x111111, 0.25, 0.1, -0.05);
  bloc(0.3, 0.5, 0.3, 0xffffff, -0.25, 0.45, 0);
  bloc(0.3, 0.5, 0.3, 0xffffff, 0.25, 0.45, 0);
  bloc(0.3, 0.3, 0.3, peau, -0.25, 0.85, 0);
  bloc(0.3, 0.3, 0.3, peau, 0.25, 0.85, 0);
  bloc(0.9, 0.4, 0.5, 0xffffff, 0, 1.2, 0);
  bloc(0.95, 0.9, 0.55, couleur, 0, 1.85, 0);
  bloc(0.3, 0.4, 0.4, couleur, -0.65, 2.05, 0);
  bloc(0.3, 0.4, 0.4, couleur, 0.65, 2.05, 0);
  bloc(0.26, 0.5, 0.26, peau, -0.65, 1.6, 0);
  bloc(0.26, 0.5, 0.26, peau, 0.65, 1.6, 0);
  bloc(0.65, 0.65, 0.65, peau, 0, 2.65, 0);
  bloc(0.72, 0.28, 0.72, cheveux, 0, 3.0, 0);
  bloc(0.72, 0.5, 0.15, cheveux, 0, 2.75, 0.35);
  var zone = new THREE.Mesh(new THREE.BoxGeometry(3, 3.5, 3), new THREE.MeshBasicMaterial({ visible: false }));
  zone.position.y = 1.7;
  j.add(zone);
  j.scale.set(0.9, 0.9, 0.9);
  j.position.set(x, 0, z);
  scene.add(j);
  return j;
}
function avancer(){ bleus.forEach(function(b,i){ if(i!==porteur){ b.position.z=Math.max(-20,b.position.z-(5+Math.random()*8)); var m=Math.min(14,6+(24-b.position.z)*0.25); b.position.x=(Math.random()*2-1)*m; } }); placerBallon(); }
  var scoreBleu = 0;

  function placerBallon() {
    ballon.position.set(bleus[porteur].position.x + 0.7, 0.4, bleus[porteur].position.z - 0.7);
  }
  placerBallon();

  // Flèche de tir
  var fleche = new THREE.Group();
  var tige = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 4), new THREE.MeshBasicMaterial({ color: 0xff7a00 }));
  tige.position.z = -2.5;
  var pointe = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.5, 12), new THREE.MeshBasicMaterial({ color: 0xff7a00 }));
  pointe.rotation.x = -Math.PI / 2;
  pointe.position.z = -5.2;
  var zoneFleche = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 8), new THREE.MeshBasicMaterial({ visible: false }));
  zoneFleche.position.z = -3;
  fleche.add(tige, pointe, zoneFleche);
  scene.add(fleche);
  var angle = 0;

  // Messages
  var msg = document.createElement('div');
  msg.style.cssText = 'position:absolute;top:30%;width:100%;text-align:center;color:#fff;font:bold 44px sans-serif;text-shadow:0 0 8px #000;pointer-events:none;';
  cont.appendChild(msg);
  var score = document.createElement('div');
  score.style.cssText = 'position:absolute;top:15px;left:15px;color:#fff;font:bold 22px sans-serif;text-shadow:0 0 6px #000;';
  score.textContent = 'Toi 0 : 0 Adv.';
  cont.appendChild(score);
  var quitter = document.createElement('button');
  quitter.textContent = 'Quitter';
  quitter.style.cssText = 'position:absolute;top:15px;right:15px;padding:10px 16px;font-size:16px;border:none;border-radius:10px;background:#fff;color:#111;';
  quitter.onclick = function () { window.location.reload(); };
  cont.appendChild(quitter);

  // Animation du ballon
  var anim = null;
  function envoyerBallon(x, z, duree, apres) {
    anim = { dx: ballon.position.x, dz: ballon.position.z, ax: x, az: z, t: 0, d: duree, apres: apres };
  }

  // Touches
  var ray = new THREE.Raycaster();
  function toucher(e) {
    e.preventDefault();
    if (occupe) return;
    var t = e.touches ? e.touches[0] : e;
    var m = new THREE.Vector2((t.clientX / W) * 2 - 1, -(t.clientY / H) * 2 + 1);
    ray.setFromCamera(m, camera);

    // Tir
    if (fleche.visible && ray.intersectObject(fleche, true).length > 0) {
      occupe = true;
      var dx = Math.sin(angle), dz = -Math.cos(angle);
      var z0 = ballon.position.z, x0 = ballon.position.x;
      var s = (-34.8 - z0) / dz;
      var xb = x0 + dx * s;
      var but = Math.abs(xb) < 4;
      envoyerBallon(xb, -34.8, 0.7, function () {
        msg.textContent = but ? 'BUT !' : 'Raté !';
        if (but) { scoreBleu++; score.textContent = 'Toi ' + scoreBleu + ' : 0 Adv.'; }
        setTimeout(function () {
          msg.textContent = '';
          porteur = 1; bleus[0].position.set(-4.5,0,18); bleus[1].position.set(0,0,24); bleus[2].position.set(4.5,0,18);
          placerBallon();
          occupe = false;
        }, 1500);
      });
      return;
    }
    // Passe
    for (var i = 0; i < bleus.length; i++) {
      if (i !== porteur && ray.intersectObject(bleus[i], true).length > 0) {
        occupe = true;
        var cible = i;
        envoyerBallon(bleus[i].position.x + 0.7, bleus[i].position.z - 0.7, 0.4, function () {
          porteur = cible; avancer();
          occupe = false;
        });
        return;
      }
    }
  }
  cont.addEventListener('touchstart', toucher, { passive: false });
  cont.addEventListener('mousedown', toucher);

  // Boucle
  var dernier = performance.now();
  function boucle(maintenant) {
    var dt = (maintenant - dernier) / 1000;
    dernier = maintenant;
    if (anim) {
      anim.t += dt;
      var p = Math.min(anim.t / anim.d, 1);
      ballon.position.x = anim.dx + (anim.ax - anim.dx) * p;
      ballon.position.z = anim.dz + (anim.az - anim.dz) * p;
      ballon.position.y = 0.4 + Math.sin(p * Math.PI) * 0.8;
      if (p >= 1) { var f = anim.apres; anim = null; if (f) f(); }
    }
    angle = Math.sin(maintenant / 600) * 0.8;
    fleche.visible = !occupe && bleus[porteur].position.z <= -6;
    fleche.position.set(ballon.position.x, 0.3, ballon.position.z);
    fleche.rotation.y = -angle;
    renderer.render(scene, camera);
    requestAnimationFrame(boucle);
  }
  requestAnimationFrame(boucle);
};
