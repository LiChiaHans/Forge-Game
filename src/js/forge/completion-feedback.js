

let forgeFeedbackTimer=null,forgeFeedbackEpoch=0;
const forgeFlashes=new Map();
function clearForgeFeedback(){
 forgeFeedbackEpoch++;if(forgeFeedbackTimer!==null)clearTimeout(forgeFeedbackTimer);forgeFeedbackTimer=null;
 forgeFlashes.clear();$('forgeCelebration').hidden=true;$('forgeCelebration').innerHTML='';
}
function weaponKindLabel(w){return w?.c!=null?WN[w.c]:'';}
function weaponTierLabel(w){return isLegend(w)?legendKind(w.legendId):NM[w.t]+'級';}
function forgeCellLabel(w){return w?.k==='w'?'<span class="weapon-kind-label">'+esc(weaponKindLabel(w))+'</span><span class="weapon-tier-label">'+esc(weaponTierLabel(w))+'</span>':'';}
function forgeSound(rank){
 if(muted)return;const a=actx();if(!a||a.state!=='running')return;const now=a.currentTime;
 const notes=rank===2?[523.25,659.25,783.99,1046.5,1567.98]:rank===1?[659.25,880,1318.5]:[880];
 notes.forEach((hz,i)=>{const t=now+i*.085,o=a.createOscillator(),gain=a.createGain();o.type='triangle';o.frequency.setValueAtTime(hz,t);gain.gain.setValueAtTime(.0001,t);gain.gain.linearRampToValueAtTime(rank?.065:.035,t+.009);gain.gain.exponentialRampToValueAtTime(.0001,t+(rank?.46:.16));o.connect(gain);gain.connect(a.destination);o.start(t);o.stop(t+(rank?.5:.2));});
 const hammer=a.createOscillator(),hit=a.createGain();hammer.type='sine';hammer.frequency.setValueAtTime(1900,now);hammer.frequency.exponentialRampToValueAtTime(230,now+.065);hit.gain.setValueAtTime(.06,now);hit.gain.exponentialRampToValueAtTime(.0001,now+.11);hammer.connect(hit);hit.connect(a.destination);hammer.start(now);hammer.stop(now+.12);
}
function presentForgeResults(results){
 const live=(results||[]).filter(x=>x.w&&g[x.i]===x.w);
 if(!live.length||$('title').style.display!=='none'||$('townP').style.display==='flex')return;
 const epoch=forgeFeedbackEpoch;live.forEach(({w,i})=>{
  forgeFlashes.set(i,w);const cell=$('grid').children[i];if(!cell)return;
  cell.classList.add('forge-complete');const spark=document.createElement('span');spark.className='forge-sparks';spark.setAttribute('aria-hidden','true');cell.appendChild(spark);
  gameTimeout(()=>{if(epoch!==forgeFeedbackEpoch||forgeFlashes.get(i)!==w)return;forgeFlashes.delete(i);const current=$('grid').children[i];current?.classList.remove('forge-complete');current?.querySelector('.forge-sparks')?.remove();},700);
 });
 const chosen=live.find(x=>forgeLevelUps.has(x.w))||live.reduce((best,x)=>rankOf(x.w)>rankOf(best.w)?x:best,live[0]),w=chosen.w,rank=isUltimate(w)?2:isLegend(w)?1:0;
 const leveled=forgeLevelUps.has(w);forgeSound(rank||(leveled?1:0));if(!rank&&!leveled)return;forgeLevelUps.delete(w);
 const color=isLegend(w)?LEGENDS[w.legendId].color:C[w.t],stats=weaponStats(w),box=$('forgeCelebration');
 if(forgeFeedbackTimer!==null)clearTimeout(forgeFeedbackTimer);
 box.dataset.rank=String(rank);box.style.setProperty('--forge-color',color);box.innerHTML='<div class="forge-reveal"><span class="forge-rarity">'+(rank===2?'終極鍛造':rank===1?'傳說鍛造':'工藝升星')+' · 完成</span><div class="forge-trophy">'+hex(w.c,bands(w),'',w.t,w)+'</div><strong>'+esc(itemName(w))+'</strong><span class="forge-kind">'+esc(weaponKindLabel(w))+(validElement(w.element)?' · '+esc(elementName(w.element))+'屬性':'')+'</span>'+weaponStarsHTML(w,true)+'<span class="forge-values">⚔ '+stats.atk+'　🛡 '+stats.def+'　💨 '+stats.spd+'</span><small>已加入本局收藏</small></div>';
 box.hidden=false;forgeFeedbackTimer=gameTimeout(()=>{if(epoch===forgeFeedbackEpoch){box.hidden=true;forgeFeedbackTimer=null;}},lowEffects?1200:rank===2?1800:1450);
}