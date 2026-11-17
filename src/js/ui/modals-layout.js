

function showHelp(){$("help").style.display="flex"}
const townModalIds=['architectConfirmP','friendsP','forgeSettlementP','backupP','blueprintGoalP','leaderboardP','leaderboardDetailP','ultimateArtP','chestP','townLootP','townSkillP','weaponStatsP','expeditionP','legendBlueprintP','blueprintProjectP','avatarCreatorP','weaponAlbumP','weaponInspectP','seasonP','help','shopP','qP','colP','sk','bagP','rw','gcP','recP','nm','svP','pw','decorShopP','decorInventoryP','cityLayoutsP','cityLayoutPreviewP','cf','ov','greenhouseP','seedP'];
function dismissModal(id){
 if(id==='forgeSettlementP'){closeP(id);showTown();}
 else if(id==='avatarCreatorP')cancelAvatar();
 else if(id==='expeditionP')closeExpedition();
 else if(id==='townLootP'){if(chestOpening)return;closeP(id);}
 else if(id==='greenhouseP'){closeP('seedP');closeP(id);}
 else if(id==='nm')$('nmq').click();
 else if(id==='pw')$('pwc').click();

 else if(id==='cityLayoutPreviewP'){cityPreviewRequest++;closeP(id);}
 else if(id==='sk')$('skb').click();
 else if(id==='cf')$('cfn').click();
 else if(id==='ov'){closeP(id);goHome();}
 else closeP(id);
 syncTownMotion();
}
function syncTownMotion(){
 const paused=!$('portraitGuard').hidden||$('townP').style.display!=='flex'||!!document.hidden||townModalIds.some(id=>{const d=$(id).style.display;return d==='flex'||d==='block'});
 townMotionPaused=paused;$('townP').classList.toggle('town-motion-paused',paused);
 townVisitorAnimations.forEach(a=>paused?a.pause?.():a.play?.());townPetAnimations.forEach(a=>paused||lowEffects?a.pause?.():a.play?.());townDecorAnimations.forEach(a=>paused||lowEffects?a.pause?.():a.play?.());if(!paused&&!lowEffects)ensureCityPetsMoving();
 if(!paused)scheduleTownBirds();
}
function installTownMotionObserver(){
 if(typeof MutationObserver==='undefined')return;
 const observer=new MutationObserver(syncTownMotion);['townP',...townModalIds].forEach(id=>observer.observe($(id),{attributes:true,attributeFilter:['style','hidden']}));document.addEventListener('visibilitychange',syncTownMotion);syncTownMotion();
}

function openP(id){$(id).style.display="flex";render();if(id==='greenhouseP')renderGreenhousePanel();}
function closeP(id){$(id).style.display="none"}