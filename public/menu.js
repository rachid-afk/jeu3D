(function () {
  var fond = document.createElement('div');
  fond.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(5,15,40,0.95);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;font-family:sans-serif;';

  var titre = document.createElement('div');
  titre.textContent = 'Choisis ton mode';
  titre.style.cssText = 'color:white;font-size:28px;font-weight:bold;margin-bottom:10px;';
  fond.appendChild(titre);

  function bouton(texte, action) {
    var b = document.createElement('button');
    b.textContent = texte;
    b.style.cssText = 'width:80%;max-width:320px;padding:18px;font-size:22px;font-weight:bold;border:none;border-radius:14px;background:#f5c400;color:#111;';
    b.onclick = action;
    fond.appendChild(b);
  }

  bouton('Penalty', function () {
    fond.remove();
  });

  bouton('Attaquer / Défendre', function () {
    fond.remove(); demarrerMatch();
  });

  bouton('Attaquer / Défendre en ligne', function () { fond.remove(); ouvrirSalle3v3(); });
  document.body.appendChild(fond);
})();
