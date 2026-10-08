window.ouvrirSalle3v3 = function () {
  function charger(cb) {
    if (window.io) return cb();
    var sc = document.createElement('script');
    sc.src = '/socket.io/socket.io.js';
    sc.onload = cb;
    document.head.appendChild(sc);
  }
  function el(tag, css, texte, parent) {
    var e = document.createElement(tag);
    e.style.cssText = css;
    if (texte) e.textContent = texte;
    if (parent) parent.appendChild(e);
    return e;
  }
  var btnCss = 'width:80%;max-width:320px;padding:16px;font-size:20px;font-weight:bold;border:none;border-radius:14px;background:#f5c400;color:#111;';
  var inCss = 'width:80%;max-width:320px;padding:14px;font-size:20px;border:none;border-radius:12px;text-align:center;box-sizing:border-box;';
  var fond = el('div', 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(5,15,40,0.97);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;font-family:sans-serif;color:#fff;', '', document.body);
  el('div', 'font-size:26px;font-weight:bold;', 'Match 3 contre 3', fond);
  var nom = el('input', inCss, '', fond);
  nom.placeholder = 'Ton nom';
  var bCreer = el('button', btnCss, 'Créer une salle', fond);
  var code = el('input', inCss, '', fond);
  code.placeholder = 'Code de la salle';
  code.inputMode = 'numeric';
  var bRej = el('button', btnCss, 'Rejoindre', fond);
  var info = el('div', 'font-size:18px;text-align:center;min-height:24px;', '', fond);
  var liste = el('div', 'font-size:20px;text-align:center;line-height:1.6;', '', fond);
  var bLancer = el('button', btnCss + 'background:#2eaa3a;color:#fff;display:none;', 'Lancer le match', fond);

  charger(function () {
    var sock = io('/match');
    function nomOk() { return nom.value.trim() || 'Joueur'; }
    function afficher(d) {
      var b = [], r = [];
      d.joueurs.forEach(function (j) { (j.equipe === 'bleu' ? b : r).push(j.nom); });
      liste.innerHTML = '';
      el('div', 'color:#6fa8ff;', 'Bleus : ' + (b.join(', ') || '-'), liste);
      el('div', 'color:#ff7070;', 'Rouges : ' + (r.join(', ') || '-'), liste);
    }
    function entre(rep) {
      if (rep.erreur) { info.textContent = rep.erreur; return; }
      window.matchEnLigne = { sock: sock, code: rep.code, slot: rep.slot, equipe: rep.equipe };
      info.textContent = 'Code de la salle : ' + rep.code + ' (tu es ' + rep.equipe + ')';
      bCreer.style.display = 'none';
      bRej.style.display = 'none';
      code.style.display = 'none';
      nom.style.display = 'none';
      if (rep.slot === 0) bLancer.style.display = 'block';
    }
    bCreer.onclick = function () { sock.emit('creer', nomOk(), entre); };
    bRej.onclick = function () { sock.emit('rejoindre', { code: code.value.trim(), nom: nomOk() }, entre); };
    bLancer.onclick = function () { sock.emit('demarrer'); };
    sock.on('salle', afficher);
    sock.on('demarrage', function (d) {
      window.matchEnLigne.joueurs = d.joueurs;
      fond.remove();
      demarrerMatch();
    });
  });
};
