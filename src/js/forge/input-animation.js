

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
 if(busy||hand?.k!=='z')return false;
 const hotCells=heat.map((h,i)=>h>0?i:-1).filter(i=>i>=0);
 hand=null;busy=true;render();say('❄️ 暴風雪正在席捲棋盤…');
 playWorkshopToolFX('grid','blizzard',{cells:hotCells});
 const reduced=lowEffects||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,grid=$('grid'),node=document.createElement('div');
 node.className='forge-blizzard';node.setAttribute('aria-hidden','true');
 node.innerHTML='<svg viewBox="0 0 100 120" preserveAspectRatio="none"><defs><radialGradient id="bliz-vortex"><stop offset="0%" stop-color="#e8fbff" stop-opacity=".75"/><stop offset="45%" stop-color="#76d3f7" stop-opacity=".38"/><stop offset="100%" stop-color="#3c8cc2" stop-opacity="0"/></radialGradient></defs><circle cx="50" cy="60" r="56" fill="url(#bliz-vortex)"/><g fill="#f2fcff">'+Array.from({length:64},(_,i)=>{const a=i*2.39996,r=6+Math.sqrt(i/64)*52,x=(50+Math.cos(a)*r).toFixed(2),y=(60+Math.sin(a)*r).toFixed(2),op=(.5+i%5*.12).toFixed(2);return i%5===0?'<path d="M'+x+' '+(+y-2.4)+'v4.8M'+(+x-2.4)+' '+y+'h4.8" stroke="#ffffff" stroke-width="1" opacity="'+op+'"/>':'<rect x="'+x+'" y="'+y+'" width="'+(i%3===0?2.1:1.1)+'" height="'+(i%3===0?2.6:1.3)+'" opacity="'+op+'"/>';}).join('')+'</g></svg>';grid.appendChild(node);
 const job={node,animation:null,timer:null,finish:null};forgeBlizzardJob=job;
 job.finish=(continuePlay=true)=>{if(forgeBlizzardJob!==job)return;forgeBlizzardJob=null;clearTimeout(job.timer);job.animation?.cancel?.();node.remove();heat=heat.map(()=>0);justHeated.clear();busy=false;if(continuePlay){say('❄️ 暴風雪！全盤過熱已歸零，棋盤物品保留。');settle();}};
 job.timer=setTimeout(()=>job.finish(),reduced?80:880);
 if(!reduced&&typeof node.animate==='function'){job.animation=node.animate([{transform:'scale(.12) rotate(0deg)',opacity:0},{transform:'scale(.55) rotate(130deg)',opacity:1,offset:.22},{transform:'scale(1.06) rotate(330deg)',opacity:1,offset:.76},{transform:'scale(1.52) rotate(520deg)',opacity:0}],{duration:840,easing:'cubic-bezier(.22,.8,.36,1)',fill:'forwards'});job.animation.onfinish=()=>job.finish();}
 return true;
}
