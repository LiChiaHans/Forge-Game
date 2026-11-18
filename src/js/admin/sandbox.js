

/* 後台設定 */
const ADM_PW="09070220";
function askPwd(){
  if($("title").style.display==="none")return;
  $("pwi").value="";$("pwe").textContent="";
  $("pw").style.display="flex";
  gameTimeout(()=>$("pwi").focus(),60);
}
$("pwb").onclick=()=>{
  if($("pwi").value===ADM_PW){$("pw").style.display="none";openAdmin()}
  else $("pwe").textContent="密碼錯誤";
};
$("pwi").onkeydown=e=>{if(e.key==="Enter")$("pwb").click()};
$("pwc").onclick=()=>{$("pw").style.display="none"};
function openAdmin(){installKitchenPreviewCatalog(true);return preview_openAdmin(...arguments);}
function stable_openAdmin(){
 if(sandboxSession){showTown();return;}
 sandboxProfile={playerName,avatar:normalizeAvatar(playerAvatar),muted,hi,recs:JSON.parse(JSON.stringify(recs)),saves:JSON.parse(JSON.stringify(saves)),weapons:[...weaponAlbum],blueprints:[...legendBlueprints],legends:[...legendCollection]};sandboxEpoch++;sandboxStorage.clear();sandboxSession=true;
 $('title').style.display='none';cheat.m=true;cheat.s=true;start('normal',{test:true});
 coins=1e12;sp=9999;DECOR_CATALOG.forEach(d=>cityState.owned[d.id]=50);cityRevision++;seasonNoticePending=false;closeP('seasonP');render();showTown();toast('🧪 後台測試 · 無限金錢與冶煉技能點 · 測試進度獨立保存');
}
function preview_openAdmin(){if(sandboxSession)return stage21_preview_openAdmin();const saved=readReviewProgress();reviewRestoring=true;try{stage21_preview_openAdmin();if(saved)restoreReviewProgress(saved,false);}finally{reviewRestoring=false;}saveReviewProgress();}
function nextSandboxDay(){return sandboxSession?preview_nextSandboxDay(...arguments):stable_nextSandboxDay(...arguments);}
function stable_nextSandboxDay(){
 if(!sandboxSession)return;stopExpeditionPlayback();closeCityPanels();architect.active=false;architect.selected=null;architect.placing=null;pendingChests++;newDay();seasonNoticePending=false;closeP('seasonP');coins=1e12;sp=9999;lives=3;render();showTown();
}
function preview_nextSandboxDay(){
 if(!sandboxSession)return;setSandboxNight(false);$("kitchenP").hidden=true;$("kitchenModal").hidden=true;stopExpeditionPlayback();closeCityPanels();architect.active=false;architect.selected=null;architect.placing=null;pendingChests++;newDay();seasonNoticePending=false;closeP('seasonP');coins=1e12;sp=9999;lives=3;render();showTown();
}
function finishSandbox(){expeditionLabFood=null;if(sandboxSession)saveReviewProgress();if(reviewSaveTimer!==null){clearTimeout(reviewSaveTimer);reviewSaveTimer=null;}$('reviewProgressP').style.display='none';clearKitchenPreview(false);return stage21_finishSandbox();}
function stable_finishSandbox(){
 if(!sandboxSession)return;weaponMastery=new Map();stopCityAnimals();cancelCityPresetSave();sandboxEpoch++;sandboxStorage.clear();cityThumbnailCache.clear();cityPreviewCache.clear();cityPreviewRequest++;sandboxSession=false;
 if(sandboxProfile){playerName=sandboxProfile.playerName;playerAvatar=normalizeAvatar(sandboxProfile.avatar);muted=sandboxProfile.muted;hi=sandboxProfile.hi;recs=sandboxProfile.recs;saves=sandboxProfile.saves;weaponAlbum.clear();sandboxProfile.weapons.forEach(k=>weaponAlbum.add(k));legendBlueprints.clear();sandboxProfile.blueprints.forEach(k=>legendBlueprints.add(k));legendCollection.clear();sandboxProfile.legends.forEach(k=>legendCollection.add(k));}sandboxProfile=null;
 cheat.m=false;cheat.s=false;testRun=false;active=false;runId=0;day=0;phase='play';coins=0;earned=0;magic=0;all=0;qDone=0;
 best=Array(10).fill(null);g=Array(W*H).fill(null);pack=[];bag=[];hand=null;resetRunCollections();legendDemoBlueprints.clear();legendDemoCollection.clear();legendProjects=[];architect.active=false;architect.placing=null;architect.selected=null;closeCityPanels();cityState=freshCity();cityRevision++;
lowEffects=localStorage.getItem("forgeLowEffectsV1")==="1";document.body.classList.toggle("low-effects",lowEffects);
}
function preview_finishSandbox(){
 if(!sandboxSession)return;sandboxNight=false;kitchen=null;cancelKitchenDrag();$("kitchenP").hidden=true;$("kitchenModal").hidden=true;weaponMastery=new Map();stopCityAnimals();cancelCityPresetSave();sandboxEpoch++;sandboxStorage.clear();cityThumbnailCache.clear();cityPreviewCache.clear();cityPreviewRequest++;sandboxSession=false;
 if(sandboxProfile){playerName=sandboxProfile.playerName;playerAvatar=normalizeAvatar(sandboxProfile.avatar);muted=sandboxProfile.muted;hi=sandboxProfile.hi;recs=sandboxProfile.recs;saves=sandboxProfile.saves;weaponAlbum.clear();sandboxProfile.weapons.forEach(k=>weaponAlbum.add(k));legendBlueprints.clear();sandboxProfile.blueprints.forEach(k=>legendBlueprints.add(k));legendCollection.clear();sandboxProfile.legends.forEach(k=>legendCollection.add(k));}sandboxProfile=null;
 cheat.m=false;cheat.s=false;testRun=false;active=false;runId=0;day=0;phase='play';coins=0;earned=0;magic=0;all=0;qDone=0;
 best=Array(10).fill(null);g=Array(W*H).fill(null);pack=[];bag=[];hand=null;resetRunCollections();legendDemoBlueprints.clear();legendDemoCollection.clear();legendProjects=[];architect.active=false;architect.placing=null;architect.selected=null;closeCityPanels();cityState=freshCity();cityRevision++;
lowEffects=localStorage.getItem("forgeLowEffectsV1")==="1";document.body.classList.toggle("low-effects",lowEffects);
}