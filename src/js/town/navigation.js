
function seasonalCompassHTML(si,night){
 const deg=45+(Math.max(0,Math.min(3,Number(si)||0))*90);
 return '<span class="hud-compass" data-season="'+si+'" data-time="'+(night?'night':'day')+'" aria-hidden="true"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14.5" fill="#2a1d12" stroke="#e4bc62" stroke-width="2"/><path d="M16 16L16 2A14 14 0 0 1 30 16Z" fill="#e984a8" opacity=".78"/><path d="M16 16L30 16A14 14 0 0 1 16 30Z" fill="#59b36b" opacity=".78"/><path d="M16 16L16 30A14 14 0 0 1 2 16Z" fill="#df8838" opacity=".78"/><path d="M16 16L2 16A14 14 0 0 1 16 2Z" fill="#69bfe6" opacity=".78"/><circle cx="16" cy="16" r="10.5" fill="none" stroke="#fff2bf55" stroke-width="1"/><g transform="rotate('+deg+' 16 16)"><polygon points="16,4 18.6,16 16,14 13.4,16" fill="#fff6d1" stroke="#3b230f" stroke-width=".8"/><polygon points="16,28 18,16 16,18 14,16" fill="#8b6232"/></g><circle cx="16" cy="16" r="4.6" fill="'+(night?'#2f4d86':'#ffd85c')+'" stroke="#f6d57a" stroke-width="1.2"/>'+(night?'<circle cx="17.3" cy="15.2" r="2.1" fill="#2a1d12"/>':'')+'</svg></span>';
}

function renderTown(){
 const si=townVisualSeason(),p=nightTownPalette(TOWN_SEASONS[si]),s=SEASONS[si],night=isSandboxNight(),remaining=night?(kitchen?.orders.length||0)+(kitchen?.queue.length||0):orders.length+dq.length;
 $('sandboxNextDay').hidden=!sandboxSession;$('sandboxTag').textContent=sandboxSession?'🧪 後台獨立進度':'';$('townP').dataset.season=s.id;$('townStats').textContent='💰 '+(sandboxSession?'∞':coins)+(sandboxSession?'　🌟 ∞':'　⭐ '+score())+'　'+'❤️'.repeat(Math.max(0,lives));
 $('townSeason').innerHTML=seasonalCompassHTML(si,night)+'<span>'+s.icon+' '+s.name+' · 第 '+day+' 天 · '+remaining+' 位客人等候</span>';
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
