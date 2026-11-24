
function seasonalCompassHTML(){return '';}

function renderTown(){
 const si=townVisualSeason(),p=nightTownPalette(TOWN_SEASONS[si]),s=SEASONS[si],night=isSandboxNight(),remaining=night?(kitchen?.orders.length||0)+(kitchen?.queue.length||0):orders.length+dq.length;
 $('sandboxNextDay').hidden=!sandboxSession;$('sandboxTag').innerHTML=sandboxSession?pxIcon('test')+' 後台獨立進度':'';$('townP').dataset.season=s.id;$('townStats').innerHTML=pxIcon('coin')+' '+(sandboxSession?'∞':coins)+(sandboxSession?'　'+pxIcon('skill')+' ∞':'　'+pxIcon('star')+' '+score())+'　'+pxHearts(lives,3,false);
 $('townSeason').innerHTML=pxSeasonIcon(si)+' '+s.name+' · 第 '+day+' 天 · '+remaining+' 位客人等候';
 $('townSeason').title=seasonBenefitText();
 $('townP').dataset.previewKitchen='true';
 const scenery=$('townScenery'),mapRect=$('townMap').getBoundingClientRect(),sceneKey=s.id+':master:'+Math.round(mapRect.width)+'x'+Math.round(mapRect.height);if(scenery.dataset.season!==sceneKey){scenery.innerHTML=townScene(p);scenery.dataset.season=sceneKey;}
 [['townArchive','archive','圖鑑館'],['townForge','forge','冶煉廠'],['townTraining','training','訓練所'],['townDecorShop','decor','裝飾行']].forEach(([id,kind,label])=>{
   renderCachedTownHouse(id,kind,label,p,s.id);
 });
 $('townForge').setAttribute('aria-label','冶煉廠，進入棋盤');
 renderTownVisitors(remaining);
 if(!$('townFountain').innerHTML)$('townFountain').innerHTML=townFountainArt();
 if(!$('townExpedition').dataset.built){$('townExpedition').innerHTML=townExpeditionSign();$('townExpedition').dataset.built='1';}
 renderGreenhouse(p,s.id);
 renderTownPlaza(p,s.id);renderCityDecor();renderArchitect();renderHarvestAlert();scheduleTownBirds();renderTownChest();renderTownWeather(si);renderTownNight();renderGeminiTown();if(typeof renderTownWing==='function')renderTownWing();renderFestivalBoard();if(typeof updateTownDailyBadge==='function')updateTownDailyBadge();
}
function showTown(){
 if(day<=0)return;return performSceneTransition('城鎮',()=>{clearKitchenIngredientFlights();clearForgeFeedback();phase='town';$('townP').style.display='flex';renderTown();syncTownMotion();showTownDayBanner();saveNow();});
}
function returnToTown(){if(busy){say('請等這次合成完成，再返回城鎮。');return;}if(day<=0){goHome();return;}showTown();}
function enterTownForge(){
 startTownForge();
}
function townNextAction(){enterTownForge();}
function visitTrainingFromGame(){if(day===0){openSkills(false);return;}openLearnedForgeSkills();}
