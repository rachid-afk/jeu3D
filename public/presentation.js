(function () {
  var dejaMontre = false;

  function montrer() {
    if (dejaMontre) return;
    if (!window.monNom || !window.nomAdv) return;
    dejaMontre = true;

    var fond = document.createElement('div');
    fond.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,20,0.9);color:white;font-family:sans-serif;font-weight:bold;z-index:9998;text-align:center;';

    var a = document.createElement('div');
    a.style.cssText = 'font-size:42px;color:#2ecc71;';
    a.textContent = window.monNom;

    var vs = document.createElement('div');
    vs.style.cssText = 'font-size:70px;color:#f1c40f;margin:20px 0;';
    vs.textContent = 'VS';

    var b = document.createElement('div');
    b.style.cssText = 'font-size:42px;color:#e74c3c;';
    b.textContent = window.nomAdv;

    fond.appendChild(a);
    fond.appendChild(vs);
    fond.appendChild(b);
    document.body.appendChild(fond);

    setTimeout(function () { fond.remove(); }, 3000);
  }

  window.addEventListener('noms', montrer);
})();
