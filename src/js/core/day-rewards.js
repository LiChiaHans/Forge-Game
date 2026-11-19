

function newDay(){discardCityEdit();
  $("forgeSettlementP").style.display="none";if(kitchen)kitchen.forgeSettlement=null;
  phase="play";
  const previousDay=day;
  const skillExchange=previousDay>=1?convertWorkshopSurplus('forge')+convertWorkshopSurplus('kitchen'):0;
  forgeGuestSerial22=0;day++;syncFestival();elementTiles.clear();heat=heat.map(()=>0);dMagic=0;syncExpeditionDay();ensureBlueprintInventory();
  shopBought={m:0,tool:0,o:0};prepareSeasonDay(previousDay);
  const nMagic=sk('mg'),st=new Set();
  const magicCandidates=Array.from({length:W*H},(_,i)=>i).filter(i=>!blueprintSlotAt(i)),magicCount=Math.min(nMagic,magicCandidates.length);
  while(st.size<magicCount){const j=rnd(magicCandidates.length);st.add(magicCandidates.splice(j,1)[0]);}
  magicSet=st;
  dTot=day===0?2:day<=3?day+2:5+rnd(4);
  dServed=0;dSold=0;dEarn=0;
  dLv=lives;stepSales=0;justHeated.clear();
  quests.forEach(q=>{if(q&&q.s==='a'&&QD[q.t].day){q.p=0;delete q.failed;}});
  ensureQuests();
  const n=Math.min(3,dTot),gen=new Set();
  while(gen.size<Math.min(2,dTot))gen.add(rnd(dTot));
  dq=capDailyOrders(Array.from({length:dTot},(_,k)=>mkOrder(gen.has(k))));
  orders=dq.splice(0,n);dLeft=dq.length;
  if(day===0){
    const G=()=>({c:null,t:0,max:9999,wait:9999});
    orders=[G()];dq=[G()];dLeft=1;MQ=[0,1,2];
  }
  orders.forEach((_,k)=>enter.set(k,Date.now()+k*250));
  bell();
  shopD=Array.from({length:3},()=>rnd(Math.min(5,day+1))).sort();
  say((day>0?SEASONS[seasonIndex()].icon+" "+SEASONS[seasonIndex()].name+" · ":"")+"第 "+day+" 天開始！"+(sk("mg")?"紫色發光的格子放東西有魔法加成":""));
  render();
  if(day>0&&!booting&&!testRun)showTown();
  showPendingSeasonNotice();
  if(skillExchange){say('🌟 全技能已滿！多餘技能點轉換為 '+skillExchange+' 金幣。');toast('技能點已轉換為 '+skillExchange+' 金幣');saveNow();}
}
function endDay(){
 if(day===0){
  tutDoneSet();
  ov("教學完成！","你已經學會放礦石、做胚、過熱、魔法格與鑽石加成了。","回到首頁",goHome);
  return;
 }
 return productionEndForgeDay();
}
function forgeSettlementPending(){return day>0&&!sandboxNight&&lastCompletedDay===day&&kitchen?.forgeSettlement?.day===day;}
function renderForgeSettlement(){
 if(!forgeSettlementPending())return;const r=kitchen.forgeSettlement;
 $('forgeSettlementTitle').textContent='第 '+day+' 天 · 白天營業完成';
 $('forgeSettlementBody').innerHTML='<p>服務 '+r.served+' / '+r.total+' 位客人 · 未完成訂單 '+r.unfulfilled+' 位</p><p>售出武器 '+r.served+' 把 · 白天收入 '+r.earned+' 金幣</p><p>'+(r.skillGold?'技能已滿轉換 '+r.skillGold+' 金幣':'冶煉技能點 '+r.points+' 點')+' · 營業寶箱 '+r.chests+' 個</p><p class="exp-note">技能點可在城鎮訓練所使用，寶箱會留在噴水池旁等候開啟。</p>';
 $('forgeSettlementP').style.display='flex';
}
function finishForgeDay(){
 if(!forgeSettlementPending()||lives<=0)return;
 return performSceneTransition('城鎮',()=>{if(!forgeSettlementPending()||lives<=0)return;$('forgeSettlementP').style.display='none';setSandboxNight(true);showTown();saveNow();});
}

let skMode="",skillDone=false,spentToday=0;
const itemPool=full=>{
  const p=[];
  ELEMENT_IDS.forEach(e=>p.push([{k:'seed',element:e},ELEMENTS[e].price]));
  [0,1,2].forEach(m=>p.push([{k:'m',s:m},MPR]));
  p.push([{k:'f'},FIREP]);p.push([{k:'u'},UPGP]);p.push([{k:'z'},BLIZZP]);p.push([{k:'l'},LIFEP]);
  [0,1,2,3,4].forEach(t=>p.push([{k:'o',t},OP[t]]));
  if(full||sk('gc'))[0,1,2,3,4].forEach(t=>p.push([{k:'d',t},DP[t]]));
  return p;
};
function drawItem(){
  const p=itemPool();
  const w=p.map(x=>{
    const k=itemKey(x[0]);
    return gw&&gw[k]!==undefined?gw[k]:1/x[1];
  });
  const tot=w.reduce((a,b)=>a+b,0);
  let r=Math.random()*tot;
  for(let k=0;k<p.length;k++){r-=w[k];if(r<0)return {...p[k][0]}}
  return {...p[0][0]};
}
function openReward(keep){
  if(!keep){gachaUsed=false;skillDone=false;spentToday=0}
  renderRw();$("rw").style.display="flex";
}
const canUp=()=>{
  const tot=Object.values(skills).reduce((a,b)=>a+b,0);
  return sp>0&&Object.keys(SK).some(k=>skills[k]<3&&(tot>0||k==='mm'));
};
function renderRw(){
  $('rwp').textContent='獲得 1 點技能點（目前 ⭐ '+sp+'），可到城鎮的訓練所使用。領取道具後迎接新的一天。';
  $('rwk').style.display='none';$('rwg').textContent='🎴 道具';$('rwg').disabled=gachaUsed;
  $('rwn').textContent=gachaUsed?'迎接第 '+(day+1)+' 天，回到城鎮':'請先領取今日道具';$('rwn').disabled=!gachaUsed;
}
$("rwk").onclick=()=>openSkills(false);
$("rwg").onclick=()=>{
  if(gachaUsed)return;
  gcItems=[drawItem(),drawItem(),drawItem()];
  $("gcc").innerHTML=gcItems.map((it,k)=>
    `<div class="gwrap" data-k="${k}"><div class="gin"><button class="gcard gf" data-k="${k}">🎴<small>點我翻牌</small></button><div class="gcard gb">${itemH(it)}<small>${itemName(it)}</small></div></div></div>`
  ).join("");
  $("gcb").style.display="block";
  $("gcb").disabled=true;
  $("gcp").textContent="選一張道具卡！（價格越便宜的道具越容易抽到）";
  $("gcP").style.display="flex";
};
$("gcc").onclick=e=>{
  const b=e.target.closest("button.gcard");
  if(!b||gachaUsed)return;
  const k=+b.dataset.k,ws=[...$("gcc").children];
  gachaUsed=true;grantGardenLoot(gcItems[k]);
  ws[k].classList.add("flip","sel");
  ws[k].querySelector(".gb small").textContent=itemName(gcItems[k]);
  ws.forEach((w,j)=>{if(j!==k)gameTimeout(()=>w.classList.add("flip","dim"),650+j*140)});
  gameTimeout(()=>{
    $("gcp").textContent="你抽到了「"+itemName(gcItems[k])+"」！";
    $("gcb").disabled=false;
  },1800);
  render();
};
$("gcb").onclick=()=>{if($("gcb").disabled)return;$("gcP").style.display="none";renderRw()};
$("rwn").onclick=()=>{if(!gachaUsed)return;$("rw").style.display="none";newDay()};
