

/* 後台設定 */
const ADM_PW="0000";
function askPwd(){
  if($("title").style.display==="none")return;
  $("pwi").value="";$("pwe").textContent="";
  $("pw").style.display="flex";
  gameTimeout(()=>$("pwi").focus(),60);
}
$("pwb").onclick=()=>{
  if($("pwi").value===ADM_PW){$("pw").style.display="none";openAdmin(true)}
  else $("pwe").textContent="密碼錯誤";
};
$("pwi").onkeydown=e=>{if(e.key==="Enter")$("pwb").click()};
$("pwc").onclick=()=>{$("pw").style.display="none"};
function restartSandboxFromScratch(){
 saveReviewProgress();
 const old=localStorage.getItem(REVIEW_SAVE_KEY);if(old)localStorage.setItem(REVIEW_PREVIOUS_KEY,old);
 reviewRestoring=true;
 try{
  enterSandboxSession();
  if(sandboxSession){
   resetRunState('normal',{test:true});
   skills.mm=1;coins=1e12;sp=9999;
   reviewMetrics={activeMs:0,lastActive:Date.now(),crafted:0,served:0,spoiled:0,supplies:0,supplyTypes:{},battles:[],nights:0,nightTurns:0};
   showTown();
   toast('🔄 已為後台模式重新開始全新一局（第 1 天）！');
  }
 }finally{reviewRestoring=false;}
 saveReviewProgress();
}
function enterSandboxSession(){
 if(sandboxSession){showTown();return;}
 sandboxProfile={playerName,avatar:normalizeAvatar(playerAvatar),muted,hi,recs:JSON.parse(JSON.stringify(recs)),saves:JSON.parse(JSON.stringify(saves)),weapons:[...weaponAlbum],blueprints:[...legendBlueprints],legends:[...legendCollection]};sandboxEpoch++;sandboxStorage.clear();sandboxSession=true;
 $('title').style.display='none';cheat.m=true;cheat.s=true;start('normal',{test:true});
 skills.mm=1;coins=1e12;sp=9999;cityRevision++;seasonNoticePending=false;closeP('seasonP');render();showTown();toast('🧪 後台測試 · 無限金錢與冶煉技能點 · 測試進度獨立保存');
}
function openAdmin(promptRestart=false){
 installKitchenPreviewCatalog(true);
 if(sandboxSession)return enterSandboxSession();
 const saved=readReviewProgress();reviewRestoring=true;
 try{enterSandboxSession();if(saved)restoreReviewProgress(saved,false);}finally{reviewRestoring=false;}
 saveReviewProgress();
 if(promptRestart&&typeof confirmBox==='function'){
  confirmBox('🧪 進入後台測試模式','是否要「重新開始遊戲」，從第 1 天全新開始測試？（按「取消」則繼續保留目前後台進度，正式存檔不受影響）','重新開始遊戲',restartSandboxFromScratch);
 }
}
function nextSandboxDay(){
 if(!sandboxSession)return;setSandboxNight(false);$("kitchenP").hidden=true;$("kitchenModal").hidden=true;stopExpeditionPlayback();closeCityPanels();architect.active=false;architect.selected=null;architect.placing=null;pendingChests++;newDay();seasonNoticePending=false;closeP('seasonP');coins=1e12;sp=9999;lives=3;render();showTown();
}
function finishSandbox(){
 expeditionLabFood=null;if(sandboxSession)saveReviewProgress();
 if(reviewSaveTimer!==null){clearTimeout(reviewSaveTimer);reviewSaveTimer=null;}
 $('reviewProgressP').style.display='none';clearKitchenPreview(false);
 if(!sandboxSession)return;
 sandboxNight=false;kitchen=null;cancelKitchenDrag();$("kitchenP").hidden=true;$("kitchenModal").hidden=true;weaponMastery=new Map();stopCityAnimals();cancelCityPresetSave();sandboxEpoch++;sandboxStorage.clear();cityThumbnailCache.clear();cityPreviewCache.clear();cityPreviewRequest++;sandboxSession=false;
 if(sandboxProfile){playerName=sandboxProfile.playerName;playerAvatar=normalizeAvatar(sandboxProfile.avatar);muted=sandboxProfile.muted;hi=sandboxProfile.hi;recs=sandboxProfile.recs;saves=sandboxProfile.saves;weaponAlbum.clear();sandboxProfile.weapons.forEach(k=>weaponAlbum.add(k));legendBlueprints.clear();sandboxProfile.blueprints.forEach(k=>legendBlueprints.add(k));legendCollection.clear();sandboxProfile.legends.forEach(k=>legendCollection.add(k));}sandboxProfile=null;
 cheat.m=false;cheat.s=false;testRun=false;active=false;runId=0;day=0;phase='play';coins=0;earned=0;magic=0;all=0;qDone=0;
 best=Array(10).fill(null);g=Array(W*H).fill(null);pack=[];bag=[];hand=null;resetRunCollections();legendDemoBlueprints.clear();legendDemoCollection.clear();legendProjects=[];architect.active=false;architect.placing=null;architect.selected=null;closeCityPanels();
 lowEffects=localStorage.getItem("forgeLowEffectsV1")==="1";document.body.classList.toggle("low-effects",lowEffects);
 installKitchenPreviewCatalog(false);clearKitchenPreviewScene();clearGeminiTown();cityState=freshCity();cityRevision++;
}