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
function avancer(){ bleus.forEach(function(b){ b.position.z=Math.max(-20,b.position.z-10); }); placerBallon(); }
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
