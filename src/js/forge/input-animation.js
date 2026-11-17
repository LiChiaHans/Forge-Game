

function playFx(evs){
 const job=startWorkshopMerge('forge',evs,lead,e=>{if(e.forged)presentForgeResults(e.forged,false);});
 if(!job){workshopMergeSound('forge','complete');for(const ev of evs)if(ev.forged)presentForgeResults(ev.forged,false);}return job;
}
$("grid").onclick=e=>{
  const d=e.target.closest(".c");
  if(!d||busy)return;if(forgeSettlementPending()){renderForgeSettlement();return;}
  const i=+d.dataset.i,c=g[i];
  if(isOff(i))return;
  const bp=blueprintSlotAt(i);if(bp){openBlueprintProject(bp.project.uid);return;}
  if(cellBlock(i)){say(cellBlock(i));return;}
  if(!c){
    if(heat[i]>0)say("過熱中，還要 "+heat[i]+" 步才能放置");
    else{
      qFlip=qRects();flyIn(i,Q[0]);thud(.2);flyI=i;lead=150;
      g[i]={k:'o',t:Q.shift(),m:0};Q.push(rollOre());
      fresh=i;say("");magicAt(i);auto(i);cool();
    }
  }else if(c.k==='w'){openCraftedWeapon(c,"棋盤上的武器");return;}
  else if(c.k==='d')say("鑽石會在鍛造時自動加裝到旁邊的武器");
  else merge(i);
  settle();
};
function settle(){
 burnLeaves();justHeated.clear();checkWait();const evs=fx;fx=[];hold=new Set();shown=new Map();render();
 const playback=evs.length?playFx(evs):null,exit=exitMs,epoch=forgeFeedbackEpoch;exitMs=0;lead=0;busy=!!(playback||exit);
 const finish=()=>{if(epoch!==forgeFeedbackEpoch)return;busy=false;saveNow();if(hold.size||shown.size){hold=new Set();shown=new Map();render();}if(lives<=0)gameOver('生命用完了。');else if(!orders.length)endDay();else if(over())gameOver('棋盤已無法操作。');};
 if(playback)playback.promise.then(finish);else gameTimeout(finish,exit);
}
function magicAt(i){
  if(!magicSet.has(i)||!g[i])return;
  g[i].m=(g[i].m||0)+5;
  say(forgeMessageText()+" ✨附魔 +1 層（額外售價 +5 金幣，賣出時結算）");
}
let forgeBlizzardJob=null;
function cancelForgeBlizzard(){forgeBlizzardJob?.finish(false);}
function castForgeBlizzard(){
 if(busy||hand?.k!=='z')return false;hand=null;busy=true;render();say('❄️ 暴風雪正在席捲棋盤…');
 const reduced=lowEffects||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,grid=$('grid'),node=document.createElement('div');
 node.className='forge-blizzard';node.setAttribute('aria-hidden','true');
 node.innerHTML='<svg viewBox="0 0 100 120" preserveAspectRatio="none"><g fill="#f2fcff">'+Array.from({length:56},(_,i)=>{const a=i*2.39996,r=8+Math.sqrt(i/56)*49;return '<rect x="'+(50+Math.cos(a)*r).toFixed(2)+'" y="'+(60+Math.sin(a)*r).toFixed(2)+'" width="'+(i%3===0?1.8:.9)+'" height="'+(i%3===0?2.4:1.2)+'" opacity="'+(.45+i%5*.11)+'"/>';}).join('')+'</g></svg>';grid.appendChild(node);
 const job={node,animation:null,timer:null,finish:null};forgeBlizzardJob=job;
 job.finish=(continuePlay=true)=>{if(forgeBlizzardJob!==job)return;forgeBlizzardJob=null;clearTimeout(job.timer);job.animation?.cancel?.();node.remove();heat=heat.map(()=>0);justHeated.clear();busy=false;if(continuePlay){say('❄️ 暴風雪！全盤過熱已歸零，棋盤物品保留。');settle();}};
 job.timer=setTimeout(()=>job.finish(),reduced?80:820);
 if(!reduced&&typeof node.animate==='function'){job.animation=node.animate([{transform:'scale(.08) rotate(0deg)',opacity:0},{transform:'scale(.42) rotate(110deg)',opacity:1,offset:.25},{transform:'scale(.95) rotate(300deg)',opacity:1,offset:.75},{transform:'scale(1.45) rotate(480deg)',opacity:0}],{duration:780,easing:'ease-in',fill:'forwards'});job.animation.onfinish=()=>job.finish();}
 return true;
}
