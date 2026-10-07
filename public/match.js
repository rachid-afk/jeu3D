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
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  var soleil = new THREE.DirectionalLight(0xffffff, 0.6);
  soleil.position.set(10, 30, 10);
  scene.add(soleil);

  // Pelouse
  var pelouse = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 70),
    new THREE.MeshLambertMaterial({ color: 0x2eaa3a })
  );
  pelouse.rotation.x = -Math.PI / 2;
  scene.add(pelouse);

  // Lignes blanches
  function ligne(w, d, x, z) {
    var m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, d),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.02, z);
    scene.add(m);
  }
  ligne(40, 0.3, 0, 0);
  ligne(40, 0.3, 0, -34.8);
  ligne(40, 0.3, 0, 34.8);
  ligne(0.3, 70, -19.8, 0);
  ligne(0.3, 70, 19.8, 0);

  // Buts
  function but(z) {
    var mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var g = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), mat);
    g.position.set(-4, 1.25, z);
    scene.add(g);
    var d = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), mat);
    d.position.set(4, 1.25, z);
    scene.add(d);
    var barre = new THREE.Mesh(new THREE.BoxGeometry(8.3, 0.3, 0.3), mat);
    barre.position.set(0, 2.5, z);
    scene.add(barre);
  }
  but(-34.8);
  but(34.8);

  // Joueur
  var joueur = new THREE.Group();
  var jambes = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 0.5), new THREE.MeshLambertMaterial({ color: 0xf0c8a0 }));
  jambes.position.y = 0.45;
  var corps = new THREE.Mesh(new THREE.BoxGeometry(1, 1.1, 0.6), new THREE.MeshLambertMaterial({ color: 0x1e5af0 }));
  corps.position.y = 1.45;
  var tete = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), new THREE.MeshLambertMaterial({ color: 0xf0c8a0 }));
  tete.position.y = 2.4;
  joueur.add(jambes, corps, tete);
  joueur.position.set(0, 0, 20);
  scene.add(joueur);

  // Joystick
  var base = document.createElement('div');
  base.style.cssText = 'position:absolute;left:25px;bottom:40px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,0.25);';
  var bouton = document.createElement('div');
  bouton.style.cssText = 'position:absolute;left:40px;top:40px;width:50px;height:50px;border-radius:50%;background:rgba(255,255,255,0.7);';
  base.appendChild(bouton);
  cont.appendChild(base);

  var jx = 0, jy = 0;
  function bouger(e) {
    e.preventDefault();
    var t = e.touches[0];
    var r = base.getBoundingClientRect();
    var dx = t.clientX - (r.left + 65);
    var dy = t.clientY - (r.top + 65);
    var len = Math.sqrt(dx * dx + dy * dy);
    if (len > 50) { dx = dx * 50 / len; dy = dy * 50 / len; }
    jx = dx / 50;
    jy = dy / 50;
    bouton.style.left = (40 + dx) + 'px';
    bouton.style.top = (40 + dy) + 'px';
  }
  function lacher() {
    jx = 0; jy = 0;
    bouton.style.left = '40px';
    bouton.style.top = '40px';
  }
  base.addEventListener('touchstart', bouger);
  base.addEventListener('touchmove', bouger);
  base.addEventListener('touchend', lacher);

  // Bouton quitter
  var quitter = document.createElement('button');
  quitter.textContent = 'Quitter';
  quitter.style.cssText = 'position:absolute;top:15px;right:15px;padding:10px 16px;font-size:16px;border:none;border-radius:10px;background:#fff;color:#111;';
  quitter.onclick = function () { window.location.reload(); };
  cont.appendChild(quitter);

  // Boucle du jeu
  var dernier = performance.now();
  function boucle(maintenant) {
    var dt = (maintenant - dernier) / 1000;
    dernier = maintenant;
    joueur.position.x += jx * 9 * dt;
    joueur.position.z += jy * 9 * dt;
    joueur.position.x = Math.max(-18, Math.min(18, joueur.position.x));
    joueur.position.z = Math.max(-33, Math.min(33, joueur.position.z));
    camera.position.set(joueur.position.x * 0.5, 14, joueur.position.z + 16);
    camera.lookAt(joueur.position.x * 0.5, 0, joueur.position.z - 6);
    renderer.render(scene, camera);
    requestAnimationFrame(boucle);
  }
  requestAnimationFrame(boucle);
};
