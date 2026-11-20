/* ==========================================================================
   Seasonal Workshop Contracts (3-pick-1 / Double-Contract),
   Daily 2-Choice Town Headlines, Town Landmarks (Gold Sink),
   Trial Run Modes, Board Chain Combos, Manual Fever & Settlement Hooks
   ========================================================================== */

const RUN_MODES={
 normal:{id:'normal',icon:'🏘',name:'標準經營',tag:'經典無盡',desc:'自由推進四季、遠征 20 關、蒐集 14 枚紀念章與城鎮造景。'},
 sprint9:{id:'sprint9',icon:'⚡',name:'9 天極速衝分賽',tag:'快節奏 · 15 分鐘',desc:'固定 9 天（完整 3 季）結算總分！開局贈送 150 金幣，雙工坊狂熱充能速度 ×1.35。'},
 double_contract:{id:'double_contract',icon:'🎲',name:'雙契約狂歡',tag:'構築流派',desc:'每季從 4 張策略契約中任選 2 張同時生效！自由疊加浮誇 Combo 與高收益流派。'},
 eternal_winter:{id:'eternal_winter',icon:'❄️',name:'永冬極限試煉',tag:'高風險高報酬',desc:'全程鎖定寒冬、棋盤額外多 1 格冰凍、遠征怪物攻防 +15%，但所有成交金額 +35%！'}
};

const TOWN_LANDMARKS={
 greenhouse:{
  key:'greenhouse',icon:'🌿',name:'溫室魔導灌溉',max:3,costs:[500,1200,2400],
  effects:['花種 -10% · 收成 +15% 額外精華','花種 -20% · 收成 +30% 額外精華','花種 -30% · 收成 +50% 額外精華，每次收成 +50💰']
 },
 belltower:{
  key:'belltower',icon:'🔔',name:'星盾鐘樓',max:3,costs:[500,1200,2400],
  effects:['每日開場雙工坊狂熱 +15% · 頭條額外 +40💰','每日開場雙工坊狂熱 +30% · 頭條額外 +80💰','每日開場雙工坊狂熱 +45% · 頭條額外 +120💰']
 },
 monument:{
  key:'monument',icon:'🏆',name:'英雄武器展台',max:3,costs:[700,1600,3000],
  effects:['遠征全隊攻防 +8% · 每日觀光收益 +60💰','遠征全隊攻防 +16% · 每日觀光收益 +120💰','遠征全隊攻防 +24% · 每日觀光收益 +200💰']
 }
};

const SEASON_CONTRACTS=[
 {id:'ember_temper',icon:'🔥',name:'餘熱淬火',tag:'位置策略',desc:'貼著過熱格鍛造的武器自動 +2 層附魔（+10💰）；貼著爐火餘熱完成的料理售價 +15%。'},
 {id:'twin_craft',icon:'⚡',name:'雙響流水線',tag:'連鎖爆發',desc:'單步連鎖鍛造／料理 2 件以上時，該批成品售價 +22%，並立刻為狂熱條 +20% 充能。'},
 {id:'artisan_gild',icon:'💎',name:'精工溢價',tag:'高價訂製',desc:'指定武器與指定料理訂單成交額外 +20%，且每次售出／出餐額外 +10% 狂熱充能。'},
 {id:'cool_breeze',icon:'❄️',name:'疾風散熱',tag:'流暢節奏',desc:'冶煉廠過熱 -8 步、餐廳餘熱 -2 步、料理保鮮額外 +8 步。'},
 {id:'war_forge',icon:'⚔',name:'遠征軍備令',tag:'遠征專精',desc:'本季遠征我方攻擊 +18%、防禦 +15%，且每鍛造 1 把武器返還 +15 金幣軍備津貼。'},
 {id:'bountiful_hearth',icon:'🌿',name:'豐收雙工坊',tag:'資源狂熱',desc:'冶煉廠與餐廳商店每日各項庫存 +1，且開啟黃金狂熱時額外多持續 +2 步（共 7 步）。'}
];

const DAILY_HEADLINES=[
 {
  id:'gem_caravan',icon:'💎',title:'寶石商隊過境小鎮',
  lead:'一隊來自遠方的寶石商旅在城門歇腳，願意與工坊進行一日特約合作。',
  choices:[
   {id:'a',label:'💎 商隊特約（-120💰）',desc:'立即獲贈 1 顆鐵鑽入道具箱，且今日武器出售 +12% 金幣。'},
   {id:'b',label:'💰 收取過路市集禮',desc:'免費獲得 80 金幣，且今日冶煉廠初始狂熱 +35%。'}
  ]
 },
 {
  id:'food_critic',icon:'👑',title:'皇家食評家微服造訪',
  lead:'據說今晚會有挑剔的食評家光臨餐廳，做好準備就能大賺一筆！',
  choices:[
   {id:'a',label:'🌶 迎戰食評饗宴',desc:'免費獲贈 1 包辛香調味包，今晚餐廳所有出餐額外 +22% 金幣。'},
   {id:'b',label:'🥣 提前備料保底',desc:'免費獲贈 1 張隨機工序卡入廚房道具箱，今晚餐廳初始狂熱 +40%。'}
  ]
 },
 {
  id:'leyline_heat',icon:'🔥',title:'城鎮地脈火靈湧動',
  lead:'地底爐脈今天格外活躍，鐵匠與廚師都在討論該借火勢還是準備降溫。',
  choices:[
   {id:'a',label:'🔥 順勢借火淬鍊',desc:'今日冶煉廠過熱縮短 8 步，並獲贈 1 個焚燒工具入道具箱。'},
   {id:'b',label:'❄️ 領取冰霜儲備',desc:'免費獲贈 1 個暴風雪入道具箱，隨時清空全盤過熱。'}
  ]
 },
 {
  id:'wandering_florist',icon:'🌸',title:'流浪花藝師的謝禮',
  lead:'旅途中的花藝師欣賞小鎮的氛圍，帶來珍貴的植物精華與種子。',
  choices:[
   {id:'a',label:'✨ 收下元素精華',desc:'免費獲贈 1 份隨機元素精華入道具箱，今日立刻可用於附魔格！'},
   {id:'b',label:'🌱 收下 2 顆元素花種',desc:'免費獲得 2 顆隨機元素花種送入溫室庫存。'}
  ]
 },
 {
  id:'guild_bounty',icon:'⚔',title:'冒險者公會緊急徵召',
  lead:'城外魔物今日蠢蠢欲動，公會懸賞額外軍餉鼓舞出征的工匠。',
  choices:[
   {id:'a',label:'⚔ 承接遠征軍令',desc:'今日遠征我方攻擊 +15%、勝利金幣 +20%！'},
   {id:'b',label:'⬆️ 領取後勤補助',desc:'免費獲得 120 金幣＋1 個礦石升級道具入道具箱。'}
  ]
 },
 {
  id:'harvest_fair',icon:'🎉',title:'小鎮豐收市集日',
  lead:'鎮上張燈結綵舉辦一日市集，白天與夜晚的客人出手都格外闊綽！',
  choices:[
   {id:'a',label:'🎊 全城市集加碼',desc:'今日冶煉廠與餐廳所有成交金額一律 +15%！'},
   {id:'b',label:'🎒 領取雙工坊物資',desc:'冶煉廠獲贈 1 個礦石升級，餐廳獲贈 1 個冰水桶！'}
  ]
 }
];

let workshopMomentum=null,chronicleTab='daily',pendingRunMode='normal';

function freshWorkshopMomentum(mode='normal'){
 return {
  mode:RUN_MODES[mode]?mode:'normal',
  seasonIndex:-1,
  seasonOffers:[],
  contractIds:[],
  dailyDay:0,
  headlineId:null,
  dailyChoice:null,
  forgeFever:0,
  forgeFeverTurns:0,
  kitchenFever:0,
  kitchenFeverTurns:0,
  landmarks:{greenhouse:0,belltower:0,monument:0},
  sprintDone:false
 };
}

function cleanWorkshopMomentum(raw){
 const base=freshWorkshopMomentum(raw?.mode);
 if(!raw||typeof raw!=='object')return base;
 const validContract=id=>SEASON_CONTRACTS.some(c=>c.id===id);
 const validHeadline=id=>DAILY_HEADLINES.some(h=>h.id===id);
 base.seasonIndex=Number.isInteger(raw.seasonIndex)?raw.seasonIndex:-1;
 base.seasonOffers=Array.isArray(raw.seasonOffers)?raw.seasonOffers.filter(validContract).slice(0,4):[];
 const legacyIds=Array.isArray(raw.contractIds)?raw.contractIds:(raw.contractId?[raw.contractId]:[]);
 base.contractIds=[...new Set(legacyIds.filter(validContract))].slice(0,base.mode==='double_contract'?2:1);
 base.dailyDay=Math.max(0,Math.floor(Number(raw.dailyDay)||0));
 base.headlineId=validHeadline(raw.headlineId)?raw.headlineId:null;
 base.dailyChoice=['a','b'].includes(raw.dailyChoice)?raw.dailyChoice:null;
 base.forgeFever=Math.max(0,Math.min(100,Math.round(Number(raw.forgeFever)||0)));
 base.forgeFeverTurns=Math.max(0,Math.min(12,Math.floor(Number(raw.forgeFeverTurns)||0)));
 base.kitchenFever=Math.max(0,Math.min(100,Math.round(Number(raw.kitchenFever)||0)));
 base.kitchenFeverTurns=Math.max(0,Math.min(12,Math.floor(Number(raw.kitchenFeverTurns)||0)));
 base.landmarks={
  greenhouse:Math.max(0,Math.min(3,Math.floor(Number(raw.landmarks?.greenhouse)||0))),
  belltower:Math.max(0,Math.min(3,Math.floor(Number(raw.landmarks?.belltower)||0))),
  monument:Math.max(0,Math.min(3,Math.floor(Number(raw.landmarks?.monument)||0)))
 };
 base.sprintDone=!!raw.sprintDone;
 return base;
}

function ensureWorkshopMomentum(){
 if(!workshopMomentum)workshopMomentum=freshWorkshopMomentum();
 return workshopMomentum;
}
function activeRunMode(){return day>0?ensureWorkshopMomentum().mode:'normal';}
function contractLimit(){return activeRunMode()==='double_contract'?2:1;}
function resetWorkshopMomentum(mode){
 const chosen=mode||pendingRunMode||'normal';
 pendingRunMode='normal';
 workshopMomentum=freshWorkshopMomentum(chosen);
 chronicleTab='daily';
}
function snapshotWorkshopMomentum(){return JSON.parse(JSON.stringify(ensureWorkshopMomentum()));}
function restoreWorkshopMomentum(raw){workshopMomentum=cleanWorkshopMomentum(raw);syncWorkshopMomentumDay(false);}

function rollSeasonContractOffers(count=3){
 const pool=SEASON_CONTRACTS.map(c=>c.id);
 for(let i=pool.length-1;i>0;i--){const j=rnd(i+1);[pool[i],pool[j]]=[pool[j],pool[i]];}
 return pool.slice(0,count);
}

function syncWorkshopMomentumDay(seasonChanged=false){
 const m=ensureWorkshopMomentum();
 if(day<1){workshopMomentum=freshWorkshopMomentum('normal');return;}
 const offerCount=m.mode==='double_contract'?4:3;
 const cycleKey=Math.floor((day-1)/3);
 if(seasonChanged||m.seasonIndex!==cycleKey||m.seasonOffers.length<offerCount){
  m.seasonIndex=cycleKey;
  m.seasonOffers=rollSeasonContractOffers(offerCount);
  m.contractIds=[];
 }
 if(m.dailyDay!==day||!m.headlineId){
  const firstDay=m.dailyDay===0&&day===1;
  m.dailyDay=day;
  const idx=(day+rnd(DAILY_HEADLINES.length))%DAILY_HEADLINES.length;
  m.headlineId=DAILY_HEADLINES[idx].id;
  m.dailyChoice=null;
  m.forgeFeverTurns=0;
  m.kitchenFeverTurns=0;
  if(firstDay&&m.mode==='sprint9'&&coins<150)coins+=150;
  const bell=m.landmarks.belltower||0;
  if(bell>0){
   m.forgeFever=Math.max(m.forgeFever,Math.min(100,bell*15));
   m.kitchenFever=Math.max(m.kitchenFever,Math.min(100,bell*15));
  }
 }
}

function activeContracts(){
 const m=ensureWorkshopMomentum();
 return day>0?m.contractIds.map(id=>SEASON_CONTRACTS.find(c=>c.id===id)).filter(Boolean):[];
}
function activeContract(){return activeContracts()[0]||null;}
function hasContract(id){return day>0&&ensureWorkshopMomentum().contractIds.includes(id);}
function activeDailyHeadline(){
 const m=ensureWorkshopMomentum();
 return day>0&&m.headlineId?DAILY_HEADLINES.find(h=>h.id===m.headlineId)||null:null;
}

function landmarkBonuses(){
 const l=day>0?ensureWorkshopMomentum().landmarks:{greenhouse:0,belltower:0,monument:0};
 return {
  seedDiscount:[0,.1,.2,.3][l.greenhouse]||0,
  extraEssence:[0,.15,.3,.5][l.greenhouse]||0,
  harvestGold:l.greenhouse>=3?50:0,
  startFever:l.belltower*15,
  headlineGold:l.belltower*40,
  battleAtk:l.monument*.08,
  battleDef:l.monument*.08,
  tourismGold:[0,60,120,200][l.monument]||0
 };
}

function contractBonuses(){
 const m=ensureWorkshopMomentum(),hl=day>0&&m.dailyDay===day?m.headlineId:null,dc=day>0&&m.dailyDay===day?m.dailyChoice:null,lm=landmarkBonuses();
 const winterSale=activeRunMode()==='eternal_winter'?.35:0;
 return {
  emberTemper:hasContract('ember_temper'),
  twinCraft:hasContract('twin_craft'),
  specifiedSale:hasContract('artisan_gild')?.20:0,
  saleFever:hasContract('artisan_gild')?10:0,
  forgeHeatDelta:(hasContract('cool_breeze')?8:0)+(hl==='leyline_heat'&&dc==='a'?8:0),
  kitchenHeatDelta:hasContract('cool_breeze')?2:0,
  kitchenFreshBonus:hasContract('cool_breeze')?8:0,
  battleAtk:(hasContract('war_forge')?.18:0)+(hl==='guild_bounty'&&dc==='a'?.15:0)+lm.battleAtk,
  battleDef:(hasContract('war_forge')?.15:0)+lm.battleDef,
  expeditionGold:hl==='guild_bounty'&&dc==='a'?.20:0,
  forgeCraftGold:hasContract('war_forge')?15:0,
  shopExtra:hasContract('bountiful_hearth')?1:0,
  feverDuration:hasContract('bountiful_hearth')?7:5,
  dailyForgeSale:(hl==='gem_caravan'&&dc==='a'?.12:0)+(hl==='harvest_fair'&&dc==='a'?.15:0)+winterSale,
  dailyKitchenSale:(hl==='food_critic'&&dc==='a'?.22:0)+(hl==='harvest_fair'&&dc==='a'?.15:0)+winterSale
 };
}

function isWorkshopFever(kind){
 const m=ensureWorkshopMomentum();
 return day>0&&(kind==='kitchen'?m.kitchenFeverTurns>0:m.forgeFeverTurns>0);
}

function forgeSaleMomentumBonus(w,o){
 if(day<1)return 0;
 const cb=contractBonuses();
 let bonus=cb.dailyForgeSale;
 if(o&&o.c!==null)bonus+=cb.specifiedSale;
 if(w?.chainBonus&&cb.twinCraft)bonus+=.22;
 if(isWorkshopFever('forge'))bonus+=.25;
 return bonus;
}

function kitchenSaleMomentumBonus(w,o){
 if(day<1)return 0;
 const cb=contractBonuses();
 let bonus=cb.dailyKitchenSale;
 if(o&&o.c!==null)bonus+=cb.specifiedSale;
 if(w?.emberDish&&cb.emberTemper)bonus+=.15;
 if(w?.chainBonus&&cb.twinCraft)bonus+=.22;
 if(isWorkshopFever('kitchen'))bonus+=.25;
 return bonus;
}

function addWorkshopFever(kind,amount){
 if(day<1||amount<=0)return;
 const m=ensureWorkshopMomentum(),mult=m.mode==='sprint9'?1.35:1,delta=Math.round(amount*mult);
 if(kind==='kitchen'){
  if(m.kitchenFeverTurns>0)return;
  const before=m.kitchenFever;
  m.kitchenFever=Math.min(100,m.kitchenFever+delta);
  if(before<100&&m.kitchenFever>=100)toast('🔥 餐廳黃金狂熱就緒！隨時點擊開啟爆發！');
 }else{
  if(m.forgeFeverTurns>0)return;
  const before=m.forgeFever;
  m.forgeFever=Math.min(100,m.forgeFever+delta);
  if(before<100&&m.forgeFever>=100)toast('🔥 冶煉廠黃金狂熱就緒！隨時點擊開啟爆發！');
 }
}

function activateWorkshopFever(kind){
 if(day<1)return false;
 const m=ensureWorkshopMomentum(),dur=contractBonuses().feverDuration;
 if(kind==='kitchen'){
  if(!kitchen||kitchen.done||m.kitchenFever<100||m.kitchenFeverTurns>0)return false;
  m.kitchenFever=0;m.kitchenFeverTurns=dur;
  workshopToolSound('fever');
  triggerChainComboFX('kitchenGrid',dur,'🔥 黃金狂熱！'+dur+' 步');
  kitchen.message='🔥 餐廳黃金狂熱開啟（'+dur+' 步）：客人耐心與保鮮暫停、餘熱減半、出餐 +25%！';
  renderKitchen();saveNow();return true;
 }
 if(busy||m.forgeFever<100||m.forgeFeverTurns>0)return false;
 m.forgeFever=0;m.forgeFeverTurns=dur;
 workshopToolSound('fever');
 triggerChainComboFX('grid',dur,'🔥 黃金狂熱！'+dur+' 步');
 say('🔥 冶煉廠黃金狂熱開啟（'+dur+' 步）：客人耐心暫停、過熱減半、出售 +25%！');
 render();saveNow();return true;
}

function tickWorkshopFever(kind){
 const m=ensureWorkshopMomentum();
 if(kind==='kitchen'){if(m.kitchenFeverTurns>0)m.kitchenFeverTurns--;}
 else{if(m.forgeFeverTurns>0)m.forgeFeverTurns--;}
}

function triggerChainComboFX(boardId,count,label){
 workshopToolSound('combo');
 const board=$(boardId);
 if(!board||typeof board.getBoundingClientRect!=='function')return;
 const rect=board.getBoundingClientRect();
 if(!rect||rect.width<=0||rect.height<=0)return;
 const reduced=!!lowEffects||!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const el=document.createElement('div');
 el.className='wfx-combo-banner'+(reduced?' is-reduced':'');
 el.setAttribute('aria-hidden','true');
 el.style.left=(rect.left+rect.width/2)+'px';
 el.style.top=(rect.top+rect.height*.34)+'px';
 el.innerHTML='<strong>'+esc(label||'⚡ CHAIN ×'+count)+'</strong>';
 document.body.appendChild(el);
 setTimeout(()=>el.remove(),reduced?350:960);
}

function renderWorkshopMomentumBars(){
 const m=ensureWorkshopMomentum(),contracts=activeContracts(),limit=contractLimit();
 const chipLabel=contracts.length?contracts.map(c=>c.icon+(contracts.length===1?' '+c.name:'')).join(' '):'📜 選契約';
 const chipClass=contracts.length?'ws-contract-chip':'ws-contract-chip is-empty';
 const fBar=$('forgeFeverBar');
 if(fBar){
  const showForge=day>0;
  fBar.hidden=!showForge;
  if(showForge){
   const active=m.forgeFeverTurns>0,ready=!active&&m.forgeFever>=100,pct=active?Math.round((m.forgeFeverTurns/contractBonuses().feverDuration)*100):m.forgeFever;
   const badge='<button type="button" class="'+chipClass+'" onclick="openTownChronicle()" title="查看本季契約與城鎮大工程">'+chipLabel+(contracts.length<limit?' +':'')+'</button>';
   const btn=active?'<span class="ws-fever-state is-active">🔥 狂熱剩 '+m.forgeFeverTurns+' 步</span>'
    :ready?'<button type="button" class="ws-fever-btn is-ready" onclick="activateWorkshopFever(\'forge\')">🔥 開啟狂熱！</button>'
    :'<span class="ws-fever-state">🔥 狂熱 '+m.forgeFever+'%</span>';
   fBar.classList.toggle('is-fever',active);
   fBar.classList.toggle('is-ready',ready);
   fBar.innerHTML=badge+'<div class="ws-fever-track"><i style="width:'+pct+'%"></i></div>'+btn;
   $('grid')?.classList.toggle('is-fever',active);
  }
 }
 const kBar=$('kitchenFeverBar');
 if(kBar){
  const showKitchen=day>0&&!!kitchen;
  kBar.hidden=!showKitchen;
  if(showKitchen){
   const active=m.kitchenFeverTurns>0,ready=!active&&m.kitchenFever>=100,pct=active?Math.round((m.kitchenFeverTurns/contractBonuses().feverDuration)*100):m.kitchenFever;
   const badge='<button type="button" class="'+chipClass+'" onclick="openTownChronicle()" title="查看本季契約與城鎮大工程">'+chipLabel+(contracts.length<limit?' +':'')+'</button>';
   const btn=active?'<span class="ws-fever-state is-active">🔥 狂熱剩 '+m.kitchenFeverTurns+' 步</span>'
    :ready?'<button type="button" class="ws-fever-btn is-ready" onclick="activateWorkshopFever(\'kitchen\')">🔥 開啟狂熱！</button>'
    :'<span class="ws-fever-state">🔥 狂熱 '+m.kitchenFever+'%</span>';
   kBar.classList.toggle('is-fever',active);
   kBar.classList.toggle('is-ready',ready);
   kBar.innerHTML=badge+'<div class="ws-fever-track"><i style="width:'+pct+'%"></i></div>'+btn;
   $('kitchenGrid')?.classList.toggle('is-fever',active);
  }
 }
}

function updateTownDailyBadge(){
 const btn=$('townDailyBtn');
 if(!btn)return;
 if(day<1){btn.hidden=true;return;}
 syncWorkshopMomentumDay(false);
 const m=ensureWorkshopMomentum(),contracts=activeContracts(),limit=contractLimit(),hl=activeDailyHeadline();
 const unreadContract=contracts.length<limit,unreadHeadline=!m.dailyChoice;
 const modeInfo=m.mode!=='normal'?RUN_MODES[m.mode]:null;
 const canLandmark=Object.values(TOWN_LANDMARKS).some(lm=>{const lv=m.landmarks[lm.key]||0;return lv<lm.max&&(sandboxSession||coins>=lm.costs[lv]);});
 btn.hidden=false;
 btn.classList.toggle('has-unread',unreadContract||unreadHeadline);
 btn.innerHTML=(modeInfo?'<span class="town-mode-tag">'+modeInfo.icon+(m.mode==='sprint9'?' '+day+'/9天':'')+'</span> ':'')
  +(unreadContract?'📜 選契約('+(contracts.length)+'/'+limit+')':contracts.map(c=>c.icon+c.name).join('＋'))
  +' · '+(unreadHeadline?'📰 今日頭條！':canLandmark?'🏛 可建工程':hl?hl.icon+' 頭條':'📰 頭條')
  +((unreadContract||unreadHeadline)?'<i class="town-daily-dot" aria-hidden="true"></i>':'');
}

function pickSeasonContract(id){
 if(day<1)return false;
 const m=ensureWorkshopMomentum(),limit=contractLimit();
 if(m.contractIds.length>=limit||m.contractIds.includes(id)||!m.seasonOffers.includes(id))return false;
 const c=SEASON_CONTRACTS.find(x=>x.id===id);
 if(!c)return false;
 m.contractIds.push(id);
 toast('📜 已簽署本季契約：「'+c.name+'」'+(m.contractIds.length<limit?'（還可再選 1 張！）':''));
 renderTownChronicle();updateTownDailyBadge();renderWorkshopMomentumBars();saveNow();
 return true;
}

function pickDailyHeadline(choice){
 if(day<1||!['a','b'].includes(choice))return false;
 syncWorkshopMomentumDay(false);
 const m=ensureWorkshopMomentum(),hl=activeDailyHeadline(),bellBonus=landmarkBonuses().headlineGold;
 if(!hl||m.dailyChoice)return false;
 if(hl.id==='gem_caravan'&&choice==='a'){
  if(!sandboxSession&&coins<120){toast('金幣不足 120，無法簽訂商隊特約。');return false;}
  if(!sandboxSession)coins-=120;
  bag.push({k:'d',t:day>=6?2:1});
  toast('💎 商隊特約成立！獲得鑽石入道具箱，今日武器 +12%！');
 }else if(hl.id==='gem_caravan'&&choice==='b'){
  coins+=80;addWorkshopFever('forge',35);
  toast('💰 收到商隊過路禮 +80 金幣，冶煉狂熱 +35%！');
 }else if(hl.id==='food_critic'&&choice==='a'){
  if(!kitchen)kitchen=freshKitchen();
  kitchen.bag.push({k:'spice',spice:'spicy'});
  toast('🌶 迎戰食評！獲贈辛香調味包，今晚出餐 +22%！');
 }else if(hl.id==='food_critic'&&choice==='b'){
  if(!kitchen)kitchen=freshKitchen();
  kitchen.bag.push({k:'m',s:rnd(3)});addWorkshopFever('kitchen',40);
  toast('🥣 提前備料！獲贈工序卡，今晚餐廳狂熱 +40%！');
 }else if(hl.id==='leyline_heat'&&choice==='a'){
  bag.push({k:'f'});
  toast('🔥 順勢借火！今日冶煉過熱 -8 步，獲贈焚燒工具！');
 }else if(hl.id==='leyline_heat'&&choice==='b'){
  bag.push({k:'z'});
  toast('❄️ 冰霜儲備！免費獲贈暴風雪入道具箱！');
 }else if(hl.id==='wandering_florist'&&choice==='a'){
  const e=ELEMENT_IDS[rnd(ELEMENT_IDS.length)];
  bag.push({k:'ess',element:e});
  toast('✨ 獲得「'+ELEMENTS[e].name+'之精華」入道具箱！');
 }else if(hl.id==='wandering_florist'&&choice==='b'){
  const e1=ELEMENT_IDS[rnd(ELEMENT_IDS.length)],e2=ELEMENT_IDS[rnd(ELEMENT_IDS.length)];
  seedStock[e1]=(seedStock[e1]||0)+1;seedStock[e2]=(seedStock[e2]||0)+1;
  toast('🌱 獲得 2 顆元素花種送入溫室！');
 }else if(hl.id==='guild_bounty'&&choice==='a'){
  toast('⚔ 承接遠征軍令！今日遠征攻擊 +15%、金幣 +20%！');
 }else if(hl.id==='guild_bounty'&&choice==='b'){
  coins+=120;bag.push({k:'u'});
  toast('⬆️ 獲得後勤補助 +120 金幣與礦石升級道具！');
 }else if(hl.id==='harvest_fair'&&choice==='a'){
  toast('🎊 全城豐收市集！今日冶煉與餐廳成交一律 +15%！');
 }else if(hl.id==='harvest_fair'&&choice==='b'){
  bag.push({k:'u'});if(!kitchen)kitchen=freshKitchen();kitchen.bag.push({k:'z'});
  toast('🎒 雙工坊補給送達：冶煉廠獲礦石升級、餐廳獲冰水桶！');
 }
 if(bellBonus){coins+=bellBonus;toast('🔔 星盾鐘樓繁榮津貼 +'+bellBonus+' 金幣！');}
 m.dailyChoice=choice;
 renderTownChronicle();updateTownDailyBadge();render();if(kitchen&&!$('kitchenP').hidden)renderKitchen();if($('townP').style.display==='flex')renderTown();saveNow();
 return true;
}

function upgradeLandmark(key){
 const lm=TOWN_LANDMARKS[key];
 if(day<1||!lm)return false;
 const m=ensureWorkshopMomentum(),lv=m.landmarks[key]||0;
 if(lv>=lm.max)return false;
 const cost=lm.costs[lv];
 if(!sandboxSession&&coins<cost){toast('金幣不足，升級需要 '+cost+' 金幣。');return false;}
 if(!sandboxSession)coins-=cost;
 m.landmarks[key]=lv+1;
 if(key==='belltower'){
  m.forgeFever=Math.max(m.forgeFever,Math.min(100,(lv+1)*15));
  m.kitchenFever=Math.max(m.kitchenFever,Math.min(100,(lv+1)*15));
 }
 workshopToolSound('upgrade');
 toast('🏛 城鎮大工程「'+lm.name+'」升至 Lv '+(lv+1)+'！');
 renderTownChronicle();updateTownDailyBadge();render();if(kitchen&&!$('kitchenP').hidden)renderKitchen();if($('townP').style.display==='flex')renderTown();saveNow();
 return true;
}

function bestMonumentWeapon(){
 let top=null,bestRank=-1;
 (best||[]).forEach((w,c)=>{if(!w)return;const r=rankOf({...w,c});if(r>bestRank){bestRank=r;top={...w,k:'w',c};}});
 return top;
}

function openTownChronicle(tab){
 if(day<1)return;
 syncWorkshopMomentumDay(false);
 if(tab==='daily'||tab==='landmarks')chronicleTab=tab;
 renderTownChronicle();
 $('townContractP').style.display='flex';
}

function renderTownChronicle(){
 const body=$('townContractBody');if(!body)return;
 const m=ensureWorkshopMomentum(),s=SEASONS[seasonIndex()],remDays=4-seasonDay();
 const contracts=activeContracts(),limit=contractLimit(),hl=activeDailyHeadline();
 const modeInfo=RUN_MODES[m.mode]||RUN_MODES.normal;
 const tabs='<div class="tc-tabs" role="tablist">'
  +'<button type="button" data-tc-tab="daily" aria-pressed="'+(chronicleTab==='daily')+'">📜 契約與頭條</button>'
  +'<button type="button" data-tc-tab="landmarks" aria-pressed="'+(chronicleTab==='landmarks')+'">🏛 城鎮大工程</button>'
  +'</div>';

 if(chronicleTab==='landmarks'){
  const heroW=bestMonumentWeapon();
  const cards=Object.values(TOWN_LANDMARKS).map(lm=>{
   const lv=m.landmarks[lm.key]||0,maxed=lv>=lm.max,cost=maxed?0:lm.costs[lv],canAfford=sandboxSession||coins>=cost;
   const pips=[0,1,2].map(i=>'<i class="lm-pip'+(i<lv?' is-on':'')+'"></i>').join('');
   const heroPreview=lm.key==='monument'&&heroW?'<div class="lm-hero-showcase"><span class="lm-hero-art">'+hex(heroW.c,bands(heroW),'',heroW.t,heroW)+'</span><span><small>本局陳列代表作</small><b>'+esc(itemName(heroW))+'</b></span></div>':'';
   return '<div class="lm-card'+(maxed?' is-max':'')+'">'
    +'<div class="lm-head"><span class="tc-icon">'+lm.icon+'</span><div class="lm-title"><b>'+lm.name+'</b><span class="lm-pips">'+pips+' Lv '+lv+'/'+lm.max+'</span></div></div>'
    +heroPreview
    +'<div class="lm-tiers">'+lm.effects.map((txt,i)=>'<div class="lm-tier'+(i<lv?' is-done':i===lv?' is-next':'')+'"><b>Lv'+(i+1)+'</b><span>'+txt+'</span></div>').join('')+'</div>'
    +'<button type="button" class="lm-btn'+(canAfford&&!maxed?' is-ready':'')+'" data-upgrade-landmark="'+lm.key+'"'+(!canAfford||maxed?' disabled':'')+'>'+(maxed?'✦ 已竣工（滿級）':'🏛 花費 💰'+cost+' 升級至 Lv '+(lv+1))+'</button>'
    +'</div>';
  }).join('');
  body.innerHTML=tabs+'<p class="tc-intro">持有 💰 '+(sandboxSession?'∞':coins)+' 金幣 · 投資城鎮地標獲得本局永久強力增益！</p><div class="lm-list">'+cards+'</div>';
  return;
 }

 let html=tabs;
 if(m.mode!=='normal'){
  html+='<div class="tc-mode-banner"><span>'+modeInfo.icon+'</span><div><b>試煉模式：'+modeInfo.name+(m.mode==='sprint9'?'（第 '+day+' / 9 天）':'')+'</b><small>'+modeInfo.desc+'</small></div></div>';
 }
 html+='<section class="tc-section"><div class="tc-sec-head"><h3>📜 本季工坊契約（'+s.icon+' '+s.name+' · 剩 '+remDays+' 天）</h3><span class="tc-pill">'+(contracts.length>=limit?'已簽 '+contracts.length+'/'+limit:'可選 '+contracts.length+'/'+limit)+'</span></div>';
 if(contracts.length){
  html+='<div class="tc-active-list">'+contracts.map(c=>'<div class="tc-active-card"><div class="tc-card-top"><span class="tc-icon">'+c.icon+'</span><div><b>'+c.name+'</b><span class="tc-tag">'+c.tag+'</span></div></div><p>'+c.desc+'</p></div>').join('')+'</div>';
 }
 if(contracts.length<limit){
  html+='<p class="tc-intro">每季可從隨機契約中挑選 '+limit+' 張生效，換季重抽，為這一季打造專屬策略！</p><div class="tc-offer-grid">'
   +m.seasonOffers.filter(id=>!m.contractIds.includes(id)).map(id=>{const c=SEASON_CONTRACTS.find(x=>x.id===id);return c?'<button type="button" class="tc-offer-card" data-pick-contract="'+c.id+'"><div class="tc-card-top"><span class="tc-icon">'+c.icon+'</span><div><b>'+c.name+'</b><span class="tc-tag">'+c.tag+'</span></div></div><small>'+c.desc+'</small><span class="tc-choose">簽署此契約 ✦</span></button>':'';}).join('')
   +'</div>';
 }
 html+='</section>';

 html+='<section class="tc-section"><div class="tc-sec-head"><h3>📰 今日城鎮頭條（第 '+day+' 天）</h3><span class="tc-pill">'+(m.dailyChoice?'今日已抉擇':'二選一')+'</span></div>';
 if(hl){
  html+='<div class="tc-headline-box"><div class="tc-hl-title"><span>'+hl.icon+'</span><b>'+hl.title+'</b></div><p class="tc-hl-lead">'+hl.lead+'</p><div class="tc-choices">'
   +hl.choices.map(ch=>{
    const picked=m.dailyChoice===ch.id,disabled=!!m.dailyChoice;
    return '<button type="button" class="tc-choice-btn'+(picked?' is-picked':'')+'" data-pick-headline="'+ch.id+'"'+(disabled?' disabled':'')+'><b>'+ch.label+(picked?' ✓':'')+'</b><small>'+ch.desc+'</small></button>';
   }).join('')+'</div></div>';
 }
 html+='</section>';
 body.innerHTML=html;
}

function settlementNextHookHTML(phase){
 if(day<1)return '';
 const m=ensureWorkshopMomentum(),hooks=[];
 if(m.mode==='sprint9'&&phase==='kitchen'){
  if(day>=9)hooks.push('🏆 第 9 天完成！點擊下方按鈕即可進行「9 天極速衝分」總結算！');
  else hooks.push('⚡ 9 天衝分賽倒數：還剩 '+(9-day)+' 天衝刺最高分！');
 }
 const ripe=greenhouseBeds.filter(p=>p&&plantAge(p)>=3).length;
 const tomorrowRipe=greenhouseBeds.filter(p=>p&&plantAge(p)===2).length;
 if(ripe)hooks.push('🌱 溫室已有 '+ripe+' 盆屬性花成熟，回城鎮即可收成精華！');
 else if(tomorrowRipe&&phase==='kitchen')hooks.push('🌱 溫室有 '+tomorrowRipe+' 盆屬性花明天開花，記得收成！');
 if(m.contractIds.length<contractLimit())hooks.push('📜 本季工坊契約尚未選滿，回城鎮可免費簽署強力增益！');
 const readyWeapons=(typeof expeditionWeapons==='function'?expeditionWeapons().filter(x=>!x.w.protected&&x.w.t>=Math.min(3,Math.floor(expeditionState.unlocked/3))).length:0);
 if(readyWeapons&&expeditionState.unlocked<20)hooks.push('⚔ 已備妥高階武器，可前往城門挑戰第 '+(expeditionState.unlocked+1)+' 關遠征 Boss！');
 const affordLandmark=Object.values(TOWN_LANDMARKS).find(lm=>{const lv=m.landmarks[lm.key]||0;return lv<lm.max&&coins>=lm.costs[lv];});
 if(affordLandmark)hooks.push('🏛 金幣已足夠升級城鎮大工程「'+affordLandmark.name+'」！');
 if(!hooks.length)hooks.push(phase==='forge'?'🍲 晚餐時段即將開啟，準備好料理與主打菜大賺一筆！':'🌅 明天將刷新全新「今日城鎮頭條」與新一批客人！');
 return '<div class="settle-hooks"><b>✨ 下一步預告</b>'+hooks.slice(0,2).map(h=>'<p>'+h+'</p>').join('')+'</div>';
}

function openRunModes(){
 const body=$('runModeBody');if(!body)return;
 body.innerHTML='<p class="tc-intro">選擇一種規則開始新局（皆會保留你的角色外觀與永久圖鑑／紀念章紀錄）：</p><div class="mode-list">'
  +Object.values(RUN_MODES).map(md=>'<button type="button" class="mode-card" data-start-mode="'+md.id+'"><div class="tc-card-top"><span class="tc-icon">'+md.icon+'</span><div><b>'+md.name+'</b><span class="tc-tag">'+md.tag+'</span></div></div><small>'+md.desc+'</small><span class="tc-choose">以此模式開局 ▶</span></button>').join('')
  +'</div>';
 $('runModeP').style.display='flex';
}

function startTrialRun(mode){
 pendingRunMode=RUN_MODES[mode]?mode:'normal';
 $('runModeP').style.display='none';
 beginNewCharacter();
}

$('townContractBody')?.addEventListener('click',e=>{
 const tabBtn=e.target.closest('[data-tc-tab]');
 if(tabBtn){chronicleTab=tabBtn.dataset.tcTab;renderTownChronicle();return;}
 const cBtn=e.target.closest('[data-pick-contract]');
 if(cBtn){pickSeasonContract(cBtn.dataset.pickContract);return;}
 const hBtn=e.target.closest('[data-pick-headline]');
 if(hBtn&&!hBtn.disabled){pickDailyHeadline(hBtn.dataset.pickHeadline);return;}
 const lBtn=e.target.closest('[data-upgrade-landmark]');
 if(lBtn&&!lBtn.disabled){upgradeLandmark(lBtn.dataset.upgradeLandmark);}
});

$('runModeBody')?.addEventListener('click',e=>{
 const mBtn=e.target.closest('[data-start-mode]');
 if(mBtn)startTrialRun(mBtn.dataset.startMode);
});
