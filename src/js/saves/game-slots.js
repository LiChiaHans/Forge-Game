

function persistSaves(){
  try{gameStorage.setItem("forgeSaves",JSON.stringify(saves))}catch(e){}
}
function removeSave(id){
  saves=saves.filter(x=>x.id!==id);
  if(id===runId)active=false;
  persistSaves();
}
function saveNow(){
 if(sandboxSession){queueReviewSave();return;}
 if(formalRestoring)return;
 if(formalSaveTimer!==null){clearTimeout(formalSaveTimer);formalSaveTimer=null;}
 if(!active||testRun||day<1||lives<=0||!runId)return;
 const st={restaurant:snapshotRestaurant(),
  g,coins,earned,all,day,dTot,dServed,dEarn,dLeft,orders,dq,best,Q,MQ,
  heat,hand,shopD,magic,magicSet:[...magicSet],dMagic,dSold,lives,
  skills,pack,sp,bag,gachaUsed,skillDone,spentToday,phase,quests,qDone,dLv,pendingChests,lastCompletedDay,expedition:expeditionState,legendProjects,blueprintGoalId,collections:snapshotRunCollections(),ecology:snapshotEcology(),orderCapVersion:1,city:snapshotCity(),avatar:normalizeAvatar(playerAvatar),
  shopBought,leaves:[...leaves],frozen:[...frozen],seasonVersion:1,seasonNoticePending,seasonCraft:{day,charges:autumnForgeCharges},weaponMastery:snapshotWeaponMastery(),momentum:snapshotWorkshopMomentum()
 };
 const e={
  id:runId,name:playerName||"玩家",date:runDate,time:runTime,avatar:normalizeAvatar(playerAvatar),
  coins,score:score(),day,updated:Date.now(),
  state:JSON.parse(JSON.stringify(st))
 };
 const i=saves.findIndex(x=>x.id===runId);
 if(i>=0)saves[i]=e;
 else if(saves.length<3)saves.push(e);
 else return;
 persistSaves();
}
/* 舊版末排與超出容量的武器箱物品，完整轉入道具箱。 */
function resizeSaveBoard(t){const size=W*H,oldG=t.g||[],oldPack=t.pack||[];const cap=[0,2,4,6][(t.skills&&t.skills.wb)||0];return {...t,g:Array.from({length:size},(_,i)=>oldG[i]||null),heat:Array.from({length:size},(_,i)=>(t.heat||[])[i]||0),magicSet:(t.magicSet||[]).filter(i=>i>=0&&i<size),pack:oldPack.slice(0,cap),bag:[...(t.bag||[]),...oldG.slice(size).filter(Boolean),...oldPack.slice(cap).filter(Boolean)]};}
function loadGame(id){
  if(sandboxSession)finishSandbox();const e=saves.find(x=>x.id===id);if(!e)return;try{if(e.state.restaurant)validateRestaurant(e.state.restaurant,e.state.day);}catch(err){toast(err.message);return;}if(formalSaveTimer!==null){clearTimeout(formalSaveTimer);formalSaveTimer=null;}formalRestoring=true;try{
  clearForgeFeedback();
  const t=resizeSaveBoard(e.state);
  runId=e.id;playerName=e.name;runDate=e.date;runTime=e.time;
  playerAvatar=normalizeAvatar(t.avatar||e.avatar);pendingNewAvatar=null;avatarCreatorMode="";avatarComplete=null;
  finishSandbox();testRun=false;cheat.m=false;cheat.s=false;
  day=t.day;restoreCity(t.city);
  g=t.g;coins=t.coins;earned=t.earned;all=t.all;day=t.day;
  dTot=t.dTot;dServed=t.dServed;dEarn=t.dEarn;dLeft=t.dLeft;
  orders=t.orders;dq=t.dq;if(!t.orderCapVersion)capDailyOrders([...orders,...dq]);best=t.best;Q=t.Q;MQ=t.MQ;
  heat=t.heat;hand=t.hand;shopD=t.shopD;magic=t.magic;
  magicSet=new Set(t.magicSet);dMagic=t.dMagic;dSold=t.dSold;
  lives=t.lives;skills={mm:0,gc:0,mg:0,wb:0,mc:0,mn:0,cd:0,...t.skills};pack=t.pack;sp=t.sp;bag=t.bag;
  blueprintGoalId=validLegendId(t.blueprintGoalId)?t.blueprintGoalId:null;inspectedLiveWeapon=null;restoreEcology(t.ecology);restoreBlueprintProjects(t.legendProjects);
  stopExpeditionPlayback();expeditionState=restoreExpeditionState(t.expedition);syncExpeditionDay();expeditionSelected="";expeditionStage=expeditionState.unlocked;restoreRunCollections(t);importLegendProgress();ensureBlueprintInventory();
  gachaUsed=t.gachaUsed;skillDone=t.skillDone;spentToday=t.spentToday;
  shopBought={m:0,tool:0,o:0,...t.shopBought};
  leaves=new Set((t.leaves||[]).filter(i=>i>=0&&i<W*H&&!g[i]));
  frozen=new Set((t.frozen||[]).filter(i=>i>=0&&i<W*H&&!g[i]));
  seasonEffects=new Map();seasonNoticePending=!!t.seasonNoticePending;
  legendProjects.forEach(p=>p.cells.forEach(i=>{leaves.delete(i);frozen.delete(i)}));
  if(!t.seasonVersion){
    if(seasonIndex()===2)addSeasonCells(leaves,3,'leaf',false);

    seasonNoticePending=day>0;
  }
  normalizeWinterCells(false);restoreSeasonBenefits(t.seasonCraft);
  phase=t.phase||"play";
  quests=t.quests||[];qDone=t.qDone||0;dLv=t.dLv!=null?t.dLv:lives;
  stepSales=0;justHeated.clear();ensureQuests();
  tool=-1;fresh=-1;fx=[];hold=new Set();pop=new Set();shown=new Map();
  restoreRestaurant(t.restaurant);enter.clear();busy=false;tutP2=false;lead=0;flyI=-1;exitMs=0;active=true;
  ["forgeSettlementP","ov","cf","sk","rw","gcP","svP","recP","help","seasonP","townLootP","townSkillP","townContractP","expeditionP","weaponStatsP","legendBlueprintP","blueprintProjectP","avatarCreatorP","greenhouseP","seedP"].forEach(x=>$(x).style.display="none");
  $("title").style.display="none";clearPrediction();restoreWorkshopMomentum(t.momentum,{recoverLegacyMuseum:true});render();
  restoreWeaponMastery(t.weaponMastery);render();
  restoreTownProgress(t);
  showPendingSeasonNotice();
}finally{formalRestoring=false;}saveNow();
}
let svMode="load";
function openSaves(mode){
  svMode=mode;
  $("svT").textContent=mode==="over"?"存檔已滿：選擇要覆蓋的存檔":"📁 繼續遊戲";
  $("svS").textContent=mode==="over"
    ?"最多 3 個存檔，請選一個覆蓋後開始新遊戲。":"選擇存檔繼續。遊戲會自動存檔。";
  const list=[...saves].sort((a,b)=>b.updated-a.updated);
  $("svC").innerHTML=list.map(e=>
    `<div class="rcard"><div class="rh"><span class="save-player-heading"><span class="player-avatar">${avatarSVG(e.avatar||e.state?.avatar)}</span><b>${esc(e.name)}</b></span><span>第 ${e.day} 天</span></div>
    <div class="rd">🕒 開始：${esc(e.date)} ${esc(e.time||"")}</div>
    <div>💰 ${e.coins}　⭐ ${e.score} 分</div>
    <div>🙋 服務 ${(e.state&&e.state.all)||0} 位　✅ 任務 ${(e.state&&e.state.qDone)||0} 個</div>
    <div style="display:flex;gap:8px;margin-top:8px">
    <button class="pri" style="flex:1" data-id="${e.id}" data-a="${mode==="over"?"over":"load"}">${mode==="over"?"覆蓋這個存檔":"繼續"}</button>
    ${mode==="over"?"":`<button data-id="${e.id}" data-a="del">🗑</button>`}
    </div></div>`
  ).join("")||"<p>沒有存檔</p>";
  $("svP").style.display="flex";
}
$("svC").onclick=e=>{
  const b=e.target.closest("button");if(!b)return;
  const id=+b.dataset.id,a=b.dataset.a,ent=saves.find(x=>x.id===id);
  if(!ent)return;
  if(a==="load")loadGame(id);
  else if(a==="del"){
    confirmBox("刪除這個存檔？","「"+ent.name+"」第 "+ent.day+" 天的存檔會被刪除。","刪除",()=>{
      removeSave(id);openSaves(svMode);render();
    });
  }else{
    confirmBox("覆蓋這個存檔？","「"+ent.name+"」的存檔會被刪除，並開始新遊戲。","覆蓋",()=>{
      removeSave(id);$("svP").style.display="none";
      $("title").style.display="none";start("normal");
    });
  }
};
function newGameFlow(){
  if(!pendingNewAvatar){openAvatarCreator("new",newGameFlow);return;}
  if(saves.length>=3){openSaves("over");return}
  $("title").style.display="none";start("normal");
}
