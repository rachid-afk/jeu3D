(function(){
const kits={"Bleu":[0x1e6fff,0xffffff],"Real Madrid":[0xffffff,0xffffff],"Barcelone":[0xa50044,0x004d98],"PSG":[0x004170,0xda291c],"Bresil":[0xffdf00,0x009c3b]};
const sel=document.createElement('select');
sel.style.cssText='position:fixed;top:10px;right:10px;z-index:10;font-size:16px;padding:6px';
for(const n in kits){const o=document.createElement('option');o.textContent=n;sel.appendChild(o)}
sel.onchange=function(){const k=kits[sel.value];
shooter.traverse(function(o){if(o.isMesh&&o.geometry.parameters){const w=o.geometry.parameters.width;
if(w==.5||w==.16)o.material.color.setHex(k[0]);else if(w==.48)o.material.color.setHex(k[1])}})};
document.body.appendChild(sel);
})();
