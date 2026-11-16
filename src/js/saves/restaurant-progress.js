
let formalSaveTimer=null,formalRestoring=false;
function expandedGameEnabled(){return true;}
function freshPlayMetrics(){return {activeMs:0,lastActive:Date.now(),crafted:0,served:0,spoiled:0,supplies:0,supplyTypes:{},battles:[],nights:0,nightTurns:0};}
function readDishAlbum(){try{return new Set(JSON.parse(localStorage.getItem('forgeDishAlbumV1')||'[]').filter(validAlbumKey));}catch{return new Set();}}
let dishAlbum=readDishAlbum();
function rememberDish(w){if(sandboxSession||testRun||booting||!w||w.k!=='w')return;dishAlbum.add(w.c+':'+w.t);try{localStorage.setItem('forgeDishAlbumV1',JSON.stringify([...dishAlbum].sort()));}catch{}}
function restoreRestaurant(raw){
 kitchen=freshKitchen();sandboxNight=false;reviewMetrics=freshPlayMetrics();fridgeFilter='all';fridgeSort='quality';supplyFilter='all';supplySort='heal';battleUserPaused=false;battleLastAdvance=0;expeditionFoodOpen=false;expeditionFoodSelected=null;
 if(raw){kitchen=validKitchenProgress(raw.kitchen,day);kitchen.justHeated=new Set(kitchen.justHeated);sandboxNight=raw.night;const m=raw.metrics||{},number=v=>Number.isFinite(v)&&v>=0?Math.min(1e15,v):0;for(const key of ['activeMs','crafted','served','spoiled','supplies','nights','nightTurns'])reviewMetrics[key]=number(m[key]);reviewMetrics.supplyTypes=Object.fromEntries(Object.entries(m.supplyTypes||{}).filter(([k,n])=>validAlbumKey(k)&&Number.isSafeInteger(n)&&n>=0));reviewMetrics.battles=Array.isArray(m.battles)?m.battles.slice(-50).filter(b=>b&&Number.isSafeInteger(b.stage)&&b.stage>=1&&b.stage<=1000000&&['勝利','生命歸零','回合上限或撤退'].includes(b.result)&&Number.isSafeInteger(b.supplies)&&b.supplies>=0&&b.supplies<=2):[];}
 ensureOrderGuests22();for(const [key,n]of Object.entries(kitchen.xp))if(n>0&&!sandboxSession&&!testRun)dishAlbum.add(key);if(!sandboxSession&&!testRun)try{localStorage.setItem('forgeDishAlbumV1',JSON.stringify([...dishAlbum].sort()));}catch{}
}
function snapshotRestaurant(){const now=Date.now();if(!document.hidden)reviewMetrics.activeMs+=Math.max(0,Math.min(30000,now-reviewMetrics.lastActive));reviewMetrics.lastActive=now;return {version:1,night:sandboxNight,kitchen:snapshotKitchenProgress(),metrics:JSON.parse(JSON.stringify(reviewMetrics))};}
function validateRestaurant(raw,day){if(!raw||raw.version!==1||typeof raw.night!=='boolean')throw new Error('餐廳與日夜進度格式錯誤');validKitchenProgress(raw.kitchen,day);if(raw.night&&raw.kitchen.day!==day)throw new Error('餐廳日期與存檔不符');return true;}
function queueFormalSave(){if(sandboxSession||testRun||booting||formalRestoring||!active||day<1)return;if(formalSaveTimer!==null)clearTimeout(formalSaveTimer);formalSaveTimer=setTimeout(()=>{formalSaveTimer=null;saveNow();},220);}
function openFormalProgress(){
 $('reviewProgressP').querySelector('.modal-x').setAttribute('aria-label','關閉遊戲進度');
 if(sandboxSession){openReviewProgress();return;}saveNow();const m=reviewMetrics,last=m.battles.at(-1);$('reviewProgressBody').innerHTML='<p>遊戲會自動保存。備份包含冶煉廠、餐廳、冰箱、料理經驗、技能與日夜城鎮，可在其他裝置還原。</p><button class="exp-wide" onclick="saveNow();toast(\'遊戲進度已保存\')">立即保存</button><button class="exp-wide" onclick="closeP(\'reviewProgressP\');openBackup()">匯出／還原完整遊戲備份</button><hr><h3>本局遊玩紀錄</h3><p>製作 '+m.crafted+' 道 · 出餐 '+m.served+' 道 · 腐壞 '+m.spoiled+' 份 · 遠征補給 '+m.supplies+' 份</p><p>冰箱留存 '+(kitchen?.pack.length||0)+' 份 · 完成晚餐 '+m.nights+' 次，平均 '+(m.nights?Math.round(m.nightTurns/m.nights):0)+' 步。</p><p>'+(last?'最近遠征：第 '+last.stage+' 關，'+esc(last.result)+'，使用 '+last.supplies+' 份料理。':'尚無遠征結算。')+'</p><p>遊玩紀錄留在本機；排行榜沿用玩家的個人最高紀錄。</p>';$('reviewProgressP').querySelector('h2').textContent='💾 遊戲進度';$('reviewProgressP').style.display='flex';
}
function kitchenStockRemaining(kind){return sandboxSession?99:Math.max(0,({m:3,tool:1,o:3}[kind]||0)-(kitchen.stock[kind]||0));}
function productionEndForgeDay(){
 if(lastCompletedDay>=day||orders.length||dq.length)return;qEach('safe',q=>{if(lives>=dLv)qProg(q,q.n)});lastCompletedDay=day;const reward=grantDailyWorkshopSkill('forge');pendingChests++;gachaUsed=false;skillDone=false;spentToday=0;saveHi();setSandboxNight(true);showTown();saveNow();toast('白天營業結束！'+(reward.gold?'技能已滿，獲得 1000 金幣。':'獲得冶煉技能點 1 點。')+'寶箱已出現，可前往暖爐餐廳營業。');
}