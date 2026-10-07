(function () {
  var cadre = document.createElement('div');
  cadre.style.cssText = 'display:none;position:fixed;bottom:170px;left:50%;transform:translateX(-50%);width:70%;max-width:320px;height:22px;border:3px solid white;border-radius:12px;background:rgba(0,0,0,0.5);z-index:900;overflow:hidden;pointer-events:none;';
  var barre = document.createElement('div');
  barre.style.cssText = 'height:100%;width:0%;';
  cadre.appendChild(barre);
  document.body.appendChild(cadre);

  var gele = false;
  window.puissance = 0;

  function bouger(t) {
    if (!gele) {
      var p = (Math.sin(t / 400) + 1) / 2;
      window.puissance = p;
      barre.style.width = (p * 100) + '%';
      barre.style.background = p < 0.5 ? '#2ecc71' : (p < 0.8 ? '#f1c40f' : '#e74c3c');
    }
    requestAnimationFrame(bouger);
  }
  requestAnimationFrame(bouger);

  var ancien = socket.emit;
  socket.emit = function (nom) {
    if (nom === 'choice') gele = true;
    if (nom === 'choice') return ancien.call(this, nom, arguments[1], window.puissance);
    return ancien.apply(this, arguments);
  };

  socket.on('round', function (d) {
    gele = false;
    cadre.style.display = (d.shooter == d.you) ? 'block' : 'none';
  });
})();
