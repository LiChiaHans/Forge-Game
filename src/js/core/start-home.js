

function start(){$('forgeSettlementP').style.display='none';if(formalSaveTimer!==null){clearTimeout(formalSaveTimer);formalSaveTimer=null;}cancelKitchenDrag();clearKitchenIngredientFlights();clearKitchenDepartures();reviewMetrics=freshPlayMetrics();forgeGuestSerial22=0;kitchenGuestSerial22=0;expeditionFoodSelected=null;const args=[...arguments];if(!booting&&args[0]==='tut')return performSceneTransition('冶煉廠',()=>preview_start(...args));return preview_start(...args);}
function stable_start(mode,opt){
  if(sandboxSession)opt={...opt,test:true};
  clearForgeFeedback();autumnForgeCharges=0;weaponMastery=new Map();
  $("townP").style.display="none";
  mode=mode||(day===0?"tut":"normal");
  runId=Date.now();runDate=todayStr();runTime=timeStr();
  testRun=!!(opt&&opt.test);
  if(mode==="normal"&&!booting&&!testRun){playerAvatar=normalizeAvatar(pendingNewAvatar||AVATAR_DEFAULT);pendingNewAvatar=null;}
  if(!testRun){cheat.m=false;cheat.s=false}
  active=!booting&&mode!=="tut"&&!testRun;
  skills={mm:0,gc:0,mg:0,wb:0,mc:0,mn:0,cd:0};
  pack=[];bag=[];gachaUsed=false;pendingChests=0;lastCompletedDay=0;chestOpening=false;
  resetCity();resetEcology();resetRunCollections();legendProjects=[];blueprintSequence=0;blueprintGoalId=null;inspectedLiveWeapon=null;
  legendDemoBlueprints.clear();legendDemoCollection.clear();
  $("legendBlueprintP").style.display="none";$("blueprintProjectP").style.display="none";
  stopExpeditionPlayback();expeditionState=freshExpeditionState();expeditionSelected="";expeditionStage=0;
  $("expeditionP").style.display="none";$("weaponStatsP").style.display="none";
  leaves=new Set();frozen=new Set();seasonEffects=new Map();seasonNoticePending=false;shopBought={m:0,tool:0,o:0};
  $("seasonP").style.display="none";
  $("sk").style.display="none";$("rw").style.display="none";$("gcP").style.display="none";$("townLootP").style.display="none";$("townSkillP").style.display="none";
  g=Array(W*H).fill(null);best=Array(10).fill(null);
  Q=Array(5).fill(0);MQ=Array.from({length:3},rollM);
  fx=[];hold=new Set();pop=new Set();shown=new Map();busy=false;
  heat=Array(W*H).fill(0);coins=0;earned=0;magic=0;
  magicSet=new Set();lives=3;all=0;day=mode==="tut"?-1:0;sp=0;
  quests=[];qDone=0;stepSales=0;justHeated.clear();
  tutP2=false;tutStage=1;hand=null;tool=-1;fresh=-1;
  clearPrediction();$("ov").style.display="none";newDay();
}
function preview_start(mode,opt){
 sandboxNight=false;kitchen=freshKitchen();
  if(sandboxSession)opt={...opt,test:true};
  clearForgeFeedback();autumnForgeCharges=0;weaponMastery=new Map();
  $("townP").style.display="none";
  mode=mode||(day===0?"tut":"normal");
  runId=Date.now();runDate=todayStr();runTime=timeStr();
  testRun=!!(opt&&opt.test);
  if(mode==="normal"&&!booting&&!testRun){playerAvatar=normalizeAvatar(pendingNewAvatar||AVATAR_DEFAULT);pendingNewAvatar=null;}
  if(!testRun){cheat.m=false;cheat.s=false}
  active=!booting&&mode!=="tut"&&!testRun;
  skills={mm:0,gc:0,mg:0,wb:0,mc:0,mn:0,cd:0};
  pack=[];bag=[];gachaUsed=false;pendingChests=0;lastCompletedDay=0;chestOpening=false;
  resetCity();resetEcology();resetRunCollections();legendProjects=[];blueprintSequence=0;blueprintGoalId=null;inspectedLiveWeapon=null;
  legendDemoBlueprints.clear();legendDemoCollection.clear();
  $("legendBlueprintP").style.display="none";$("blueprintProjectP").style.display="none";
  stopExpeditionPlayback();expeditionState=freshExpeditionState();expeditionSelected="";expeditionStage=0;
  $("expeditionP").style.display="none";$("weaponStatsP").style.display="none";
  leaves=new Set();frozen=new Set();seasonEffects=new Map();seasonNoticePending=false;shopBought={m:0,tool:0,o:0};
  $("seasonP").style.display="none";
  $("sk").style.display="none";$("rw").style.display="none";$("gcP").style.display="none";$("townLootP").style.display="none";$("townSkillP").style.display="none";
  g=Array(W*H).fill(null);best=Array(10).fill(null);
  Q=Array(5).fill(0);MQ=Array.from({length:3},rollM);
  fx=[];hold=new Set();pop=new Set();shown=new Map();busy=false;
  heat=Array(W*H).fill(0);coins=0;earned=0;magic=0;
  magicSet=new Set();lives=3;all=0;day=mode==="tut"?-1:0;sp=0;
  quests=[];qDone=0;stepSales=0;justHeated.clear();
  tutP2=false;tutStage=1;hand=null;tool=-1;fresh=-1;
  clearPrediction();$("ov").style.display="none";newDay();
}
$("orders").onclick=e=>{
  const c=e.target.closest(".od");if(!c||c.classList.contains("odg")||busy||day===0)return;
  const k=+c.dataset.k;
  confirmBox("取消這位客人的訂單？",guestPreferenceText(orders[k],false)+" 取消訂單會扣 1 點生命（目前 "+lives+" 條）。","取消訂單",()=>cancelOrder(k));
};
function toggleMute(){
  muted=!muted;
  try{gameStorage.setItem("forgeMute",muted?"1":"0")}catch(e){}
  render();
}
function goHome(){return performSceneTransition('遊戲首頁',()=>preview_goHome());}
function stable_goHome(){clearForgeFeedback();if(architect.active){architect.active=false;closeCityPanels();}stopExpeditionPlayback();$("expeditionP").style.display="none";$("weaponStatsP").style.display="none";saveNow();finishSandbox();$("townP").style.display="none";render();$("title").style.display="flex"}
function preview_goHome(){$('forgeSettlementP').style.display='none';clearKitchenIngredientFlights();cancelKitchenDrag();$("kitchenP").hidden=true;$("kitchenModal").hidden=true;clearForgeFeedback();if(architect.active){architect.active=false;closeCityPanels();}stopExpeditionPlayback();$("expeditionP").style.display="none";$("weaponStatsP").style.display="none";saveNow();finishSandbox();$("townP").style.display="none";render();$("title").style.display="flex"}
function openRec(){
  $("recS").textContent=recs.length
    ?"最多保留 5 筆，依分數由高到低排列。":"還沒有紀錄，快去玩一局吧！";
  $("recC").innerHTML=recs.map((r,k)=>
    `<div class="rcard" data-record-index="${k}"><div class="rh"><b>#${k+1} ${esc(r.name)}</b><span>⭐ ${r.score} 分</span></div><div class="rd">📅 ${esc(r.date||"")}${r.served!=null?" · 🙋 服務 "+r.served+" 位 · ✅ 任務 "+(r.quests||0)+" 個":""}</div><div class="rg">${colHTML(r.best)}</div></div>`
  ).join("");
  $("recClr").style.display=recs.length?"block":"none";
  $("recP").style.display="flex";
}
$("recClr").onclick=()=>confirmBox(
  "清除所有歷史紀錄？","清除後無法復原。","清除",()=>{
    recs=[];hi=0;
    try{gameStorage.removeItem("forgeHi");gameStorage.removeItem("forgeRecs")}catch(e){}
    openRec();render();
  }
);
function confirmBox(t,p,yes,fn){
  $("cfn").textContent=yes==="取消訂單"?"保留":yes==="仍要挑戰"?"先不挑戰":"取消";
  $("cft").textContent=t;$("cfp").textContent=p;$("cfy").textContent=yes;
  if(yes==="取消訂單")$("cfy").before($("cfn"));
  else $("cfn").before($("cfy"));
  $("cf").style.display="flex";
  $("cfy").onclick=()=>{$("cf").style.display="none";fn()};
  $("cfn").onclick=()=>{$("cf").style.display="none"};
}
$("nmq").onclick=()=>{$("nm").style.display="none";$("title").style.display="flex"};
function askName(cb){
 const requestVersion=++onlineNameRequestVersion;
 $('nmi').value=onlinePlayer?.name||playerName;$('nmi').readOnly=false;$('nm').style.display='flex';$('onlineNameOffline').hidden=true;
 $('onlineNameStatus').textContent=onlinePlayer?'使用已保留的排行榜名稱。若要換另一位玩家，請到排行榜切換身份。':'名稱會在網路上檢查是否重複；名字、頭像與最高紀錄將公開在排行榜。';
 gameTimeout(()=>$('nmi').focus(),60);let busy=false;
 const finish=name=>{playerName=name;try{gameStorage.setItem('forgeName',name)}catch(e){}$('nm').style.display='none';cb();};
 const go=async()=>{
  if(busy)return;const v=$('nmi').value.trim();if(!v){$('nmi').focus();return;}
  if(v.toLowerCase()==='test'){$('nm').style.display='none';askPwd();return;}
  busy=true;$('nmb').disabled=true;$('onlineNameStatus').textContent='確認玩家名稱中…';
  try{const p=await claimOnlineName(v);if(requestVersion===onlineNameRequestVersion&&$('nm').style.display==='flex')finish(p.name);}catch(e){if(requestVersion===onlineNameRequestVersion){$('onlineNameStatus').textContent=e.message;$('onlineNameOffline').hidden=!!e.status||String(e.message).includes('已被使用')||String(e.message).includes('目前使用');}}finally{busy=false;if(requestVersion===onlineNameRequestVersion)$('nmb').disabled=false;}
 };
 $('nmb').disabled=false;$('nmb').onclick=go;$('nmi').onkeydown=e=>{if(e.key==='Enter')go();};
 $('onlineNameOffline').onclick=()=>{if(!busy)finish($('nmi').value.trim().slice(0,16));};
}

function beginNormal(){beginNewCharacter();}
