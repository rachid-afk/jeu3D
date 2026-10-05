(function(){
 let code=null,waiting=false;
 const box=document.createElement('div');
 box.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:#000d;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:#fff;font-family:sans-serif';
 box.innerHTML='<div style="font-size:26px;font-weight:bold">Penalty en ligne</div>'
  +'<input id="lcode" placeholder="Code de la partie" maxlength="8" style="font-size:24px;padding:12px;width:230px;text-align:center;border-radius:12px;border:0">'
  +'<button id="ljoin" style="font-size:22px;padding:12px 28px;border:0;border-radius:12px">Rejoindre</button>'
  +'<button id="lnew" style="font-size:18px;padding:10px 20px;border:0;border-radius:12px;background:#ddd">Créer un code</button>'
  +'<div id="lerr" style="color:#ffb4b4;height:24px"></div>';
 document.body.appendChild(box);
 const q=id=>box.querySelector('#'+id);
 const lab=document.createElement('div');
 lab.style.cssText='position:fixed;top:112px;left:10px;font:bold 16px sans-serif;color:#fff;text-shadow:0 0 4px #000;z-index:5';
 document.body.appendChild(lab);
 function join(c){c=c.trim().toUpperCase();if(!c){q('lerr').textContent='Écris un code';return}code=c;socket.emit('join',c)}
 q('ljoin').onclick=()=>join(q('lcode').value);
 q('lnew').onclick=()=>{const c=String(Math.floor(1000+Math.random()*9000));q('lcode').value=c;join(c)};
 socket.on('joined',c=>{box.style.display='none';lab.textContent='Code : '+c});
 socket.on('full',()=>{q('lerr').textContent='Ce code a déjà 2 joueurs';code=null});
 socket.on('wait',()=>{waiting=true});
 socket.on('round',()=>{waiting=false});
 socket.on('connect',()=>{if(code&&waiting)socket.emit('join',code)});
 const cb=document.createElement('button');cb.textContent='💬';
 cb.style.cssText='position:fixed;top:246px;right:10px;font-size:24px;border:0;border-radius:50%;width:48px;height:48px;opacity:.85;z-index:5';
 document.body.appendChild(cb);
 const panel=document.createElement('div');
 panel.style.cssText='position:fixed;top:150px;left:10px;right:70px;display:none;flex-direction:column;background:#000a;border-radius:12px;padding:8px;z-index:6;color:#fff;font-family:sans-serif';
 const log=document.createElement('div');log.style.cssText='overflow-y:auto;max-height:200px;font-size:16px;margin-bottom:6px';
 const row=document.createElement('div');row.style.cssText='display:flex;gap:6px';
 const inp=document.createElement('input');inp.placeholder='Message...';inp.maxLength=200;
 inp.style.cssText='flex:1;font-size:16px;padding:8px;border:0;border-radius:8px;min-width:0';
 const send=document.createElement('button');send.textContent='➤';
 send.style.cssText='border:0;border-radius:8px;font-size:18px;padding:0 12px';
 row.append(inp,send);panel.append(log,row);document.body.appendChild(panel);
 function addMsg(who,text){const d=document.createElement('div');d.textContent=who+' : '+text;log.appendChild(d);log.scrollTop=log.scrollHeight}
 function sendMsg(){const t=inp.value.trim();if(!t)return;socket.emit('chat',t);addMsg('Moi',t);inp.value=''}
 send.onclick=sendMsg;
 inp.onkeydown=e=>{if(e.key==='Enter')sendMsg()};
 cb.onclick=()=>{const open=panel.style.display==='none';panel.style.display=open?'flex':'none';cb.style.background='';if(open)inp.focus()};
 socket.on('chat',t=>{addMsg('Ami',t);if(panel.style.display==='none')cb.style.background='#ff5252'});
})();
