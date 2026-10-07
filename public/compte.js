(function () {
  var boite = document.createElement('div');
  boite.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);color:white;font-size:90px;font-weight:bold;font-family:sans-serif;z-index:9999;';
  document.body.appendChild(boite);

  var etapes = ['3', '2', '1', "C'est parti !"];
  var i = 0;

  function suivant() {
    if (i >= etapes.length) {
      boite.remove();
      return;
    }
    boite.textContent = etapes[i];
    i++;
    setTimeout(suivant, 1000);
  }

  suivant();
})();
