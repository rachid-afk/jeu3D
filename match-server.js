module.exports = function (io) {
  var salles = {};
  var ordre = [0, 3, 1, 4, 2, 5];
  var nsp = io.of('/match');

  function infos(salle) {
    return {
      code: salle.code,
      demarree: salle.demarree,
      joueurs: salle.joueurs.map(function (j) {
        return { nom: j.nom, slot: j.slot, equipe: j.slot < 3 ? 'bleu' : 'rouge' };
      })
    };
  }

  nsp.on('connection', function (s) {
    var codeSalle = null;
    var monSlot = null;

    function entrer(code, nom, cb) {
      var salle = salles[code];
      if (salle.joueurs.length >= 6) return cb && cb({ erreur: 'Salle pleine' });
      var pris = salle.joueurs.map(function (j) { return j.slot; });
      var slot = ordre.find(function (n) { return pris.indexOf(n) === -1; });
      salle.joueurs.push({ id: s.id, nom: String(nom || 'Joueur').slice(0, 12), slot: slot });
      codeSalle = code;
      monSlot = slot;
      s.join(code);
      cb && cb({ code: code, slot: slot, equipe: slot < 3 ? 'bleu' : 'rouge' });
      nsp.to(code).emit('salle', infos(salle));
    }

    s.on('creer', function (nom, cb) {
      var code;
      do { code = String(1000 + Math.floor(Math.random() * 9000)); } while (salles[code]);
      salles[code] = { code: code, joueurs: [], demarree: false };
      entrer(code, nom, cb);
    });

    s.on('rejoindre', function (data, cb) {
      var salle = salles[data && data.code];
      if (!salle) return cb && cb({ erreur: 'Salle introuvable' });
      if (salle.demarree) return cb && cb({ erreur: 'Match déjà commencé' });
      entrer(data.code, data.nom, cb);
    });

    s.on('demarrer', function () {
      var salle = salles[codeSalle];
      if (!salle || salle.joueurs[0].id !== s.id) return;
      salle.demarree = true;
      nsp.to(codeSalle).emit('demarrage', infos(salle));
    });

    s.on('action', function (data) {
      if (!codeSalle) return;
      s.to(codeSalle).emit('action', Object.assign({ slot: monSlot }, data));
    });

    s.on('disconnect', function () {
      var salle = salles[codeSalle];
      if (!salle) return;
      salle.joueurs = salle.joueurs.filter(function (j) { return j.id !== s.id; });
      if (salle.joueurs.length === 0) delete salles[codeSalle];
      else nsp.to(codeSalle).emit('salle', infos(salle));
    });
  });
};
