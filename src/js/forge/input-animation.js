

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
      qFlip=qRects();flyIn(i,Q[0]);thud(.2);flyI=i;lead=210;
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
  say(forgeMessageText()+" ✨魔法 +5💰（賣出時結算）");
}
