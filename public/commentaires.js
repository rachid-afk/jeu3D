(function(){
const tir=["Le tireur se place devant le ballon... il va tirer !","Silence dans le stade... le tireur prend son élan !","Le tireur est prêt, quelle tension !"];
const garde=["Le gardien est prêt, il va falloir être solide !","Le gardien se concentre, attention au tir !"];
const but=["Buuuut ! Quel tir magnifique !","Goooal ! Le gardien n'a rien pu faire !","Et c'est au fond des filets !"];
const arret=["Quel arrêt du gardien !","Arrêt ! Le gardien a eu le bon réflexe !","Le gardien repousse le tir, incroyable !"];
function hasard(l){return l[Math.floor(Math.random()*l.length)]}
function dire(t){
if(!window.speechSynthesis)return;
speechSynthesis.cancel();
const u=new SpeechSynthesisUtterance(t);
u.lang='fr-FR';u.rate=1.05;
speechSynthesis.speak(u);
}
socket.on('round',function(d){dire(hasard(d.shooter==d.you?tir:garde))});
socket.on('result',function(d){setTimeout(function(){dire(hasard(d.goal?but:arret))},1200)});
})();
