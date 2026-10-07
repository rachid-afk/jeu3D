(function(){
const css=document.createElement('style');
css.textContent='#tirs{position:fixed;top:140px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.7);border-radius:14px;padding:6px 10px;color:#fff;font:bold 15px Arial,sans-serif;z-index:5}#tirs div{display:flex;align-items:center;gap:5px;margin:3px 0}#tirs b{width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block}#tirs i{font-style:normal;width:22px;height:22px;border-radius:50%;background:#444;display:inline-flex;align-items:center;justify-content:center;font-size:14px}#tirs i.ok{background:#1fa83a}#tirs i.no{background:#d62828}';
document.head.appendChild(css);
const box=document.createElement('div');box.id='tirs';box.style.display='none';
const rows=[document.createElement('div'),document.createElement('div')];
box.appendChild(rows[0]);box.appendChild(rows[1]);
document.body.appendChild(box);
let you=0,total=10,res=[[],[]];
function esc(t){return String(t).replace(/[&<>"']/g,function(c){return '&#'+c.charCodeAt(0)+';'})}
function dessiner(){
const n=Math.max(Math.ceil(total/2),res[0].length,res[1].length);
[0,1].forEach(function(k){
let h='<b>'+esc(k?(window.nomAdv||'Adv.'):(window.monNom||'Toi'))+'</b>';
for(let i=0;i<n;i++){const r=res[k][i];
h+='<i class="'+(r===undefined?'':r?'ok':'no')+'">'+(r===undefined?'':r?'✔':'✖')+'</i>'}
rows[k].innerHTML=h});
}
window.addEventListener('noms',dessiner);
socket.on('round',function(d){you=d.you;total=d.total;if(d.r===0)res=[[],[]];box.style.display='block';dessiner()});
socket.on('result',function(d){const k=d.shooter==you?0:1;const g=!!d.goal;
setTimeout(function(){res[k].push(g);dessiner()},1500)});
})();
