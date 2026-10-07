(function(){
const fond=document.createElement('div');
fond.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:100;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;font-family:Arial,sans-serif';
fond.innerHTML='<div style="color:#fff;font-size:26px;font-weight:bold">Ton nom de joueur</div><input id="nomin" maxlength="15" placeholder="Écris ton nom" style="font-size:20px;padding:10px;border-radius:10px;border:0;text-align:center"><button id="nomok" style="font-size:20px;padding:10px 28px;border:0;border-radius:10px;background:#ffd400;font-weight:bold">Entrer</button><div id="nomerr" style="color:#ff6b6b;font-size:16px"></div>';
document.body.appendChild(fond);
window.monNom='';window.nomAdv='';
function ok(){
const v=document.getElementById('nomin').value.trim();
if(!v){document.getElementById('nomerr').textContent='Le nom est obligatoire';return}
window.monNom=v.slice(0,15);fond.remove();
window.dispatchEvent(new Event('noms'));
}
document.getElementById('nomok').onclick=ok;
document.getElementById('nomin').onkeydown=function(e){if(e.key==='Enter')ok()};
socket.on('nom',function(n){window.nomAdv=n;window.dispatchEvent(new Event('noms'))});
socket.on('round',function(){socket.emit('nom',window.monNom)});
})();
