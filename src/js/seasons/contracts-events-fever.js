/* ==========================================================================
   Seasonal 3-Pick-1 Workshop Contracts, Daily 2-Choice Town Headlines,
   Board Chain Combos, and Manual Workshop Fever Burst
   ========================================================================== */

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

let workshopMomentum=null;

function freshWorkshopMomentum(){
 return {
  seasonIndex:-1,
  seasonOffers:[],
  contractId:null,
  dailyDay:0,
  headlineId:null,
  dailyChoice:null,
  forgeFever:0,
  forgeFeverTurns:0,
  kitchenFever:0,
  kitchenFeverTurns:0
 };
}

function cleanWorkshopMomentum(raw){
 const base=freshWorkshopMomentum();
 if(!raw||typeof raw!=='object')return base;
 const validContract=id=>SEASON_CONTRACTS.some(c=>c.id===id);
 const validHeadline=id=>DAILY_HEADLINES.some(h=>h.id===id);
 base.seasonIndex=Number.isInteger(raw.seasonIndex)?raw.seasonIndex:-1;
 base.seasonOffers=Array.isArray(raw.seasonOffers)?raw.seasonOffers.filter(validContract).slice(0,3):[];
 base.contractId=validContract(raw.contractId)?raw.contractId:null;
 base.dailyDay=Math.max(0,Math.floor(Number(raw.dailyDay)||0));
 base.headlineId=validHeadline(raw.headlineId)?raw.headlineId:null;
 base.dailyChoice=['a','b'].includes(raw.dailyChoice)?raw.dailyChoice:null;
 base.forgeFever=Math.max(0,Math.min(100,Math.round(Number(raw.forgeFever)||0)));
 base.forgeFeverTurns=Math.max(0,Math.min(12,Math.floor(Number(raw.forgeFeverTurns)||0)));
 base.kitchenFever=Math.max(0,Math.min(100,Math.round(Number(raw.kitchenFever)||0)));
 base.kitchenFeverTurns=Math.max(0,Math.min(12,Math.floor(Number(raw.kitchenFeverTurns)||0)));
 return base;
}

function ensureWorkshopMomentum(){
 if(!workshopMomentum)workshopMomentum=freshWorkshopMomentum();
 return workshopMomentum;
}
function resetWorkshopMomentum(){workshopMomentum=freshWorkshopMomentum();}
function snapshotWorkshopMomentum(){return JSON.parse(JSON.stringify(ensureWorkshopMomentum()));}
function restoreWorkshopMomentum(raw){workshopMomentum=cleanWorkshopMomentum(raw);syncWorkshopMomentumDay(false);}

function rollSeasonContractOffers(){
 const pool=SEASON_CONTRACTS.map(c=>c.id);
 for(let i=pool.length-1;i>0;i--){const j=rnd(i+1);[pool[i],pool[j]]=[pool[j],pool[i]];}
 return pool.slice(0,3);
}

function syncWorkshopMomentumDay(seasonChanged=false){
 const m=ensureWorkshopMomentum();
 if(day<1){resetWorkshopMomentum();return;}
 const cycleKey=Math.floor((day-1)/3);
 if(seasonChanged||m.seasonIndex!==cycleKey||m.seasonOffers.length<3){
  m.seasonIndex=cycleKey;
  m.seasonOffers=rollSeasonContractOffers();
  m.contractId=null;
 }
 if(m.dailyDay!==day||!m.headlineId){
  m.dailyDay=day;
  const idx=(day+rnd(DAILY_HEADLINES.length))%DAILY_HEADLINES.length;
  m.headlineId=DAILY_HEADLINES[idx].id;
  m.dailyChoice=null;
  m.forgeFeverTurns=0;
  m.kitchenFeverTurns=0;
 }
}

function activeContract(){
 const m=ensureWorkshopMomentum();
 return day>0&&m.contractId?SEASON_CONTRACTS.find(c=>c.id===m.contractId)||null:null;
}
function activeDailyHeadline(){
 const m=ensureWorkshopMomentum();
 return day>0&&m.headlineId?DAILY_HEADLINES.find(h=>h.id===m.headlineId)||null:null;
}

function contractBonuses(){
 const m=ensureWorkshopMomentum(),cid=day>0?m.contractId:null,hl=day>0&&m.dailyDay===day?m.headlineId:null,dc=day>0&&m.dailyDay===day?m.dailyChoice:null;
 return {
  emberTemper:cid==='ember_temper',
  twinCraft:cid==='twin_craft',
  specifiedSale:cid==='artisan_gild'?.20:0,
  saleFever:cid==='artisan_gild'?10:0,
  forgeHeatDelta:(cid==='cool_breeze'?8:0)+(hl==='leyline_heat'&&dc==='a'?8:0),
  kitchenHeatDelta:cid==='cool_breeze'?2:0,
  kitchenFreshBonus:cid==='cool_breeze'?8:0,
  battleAtk:(cid==='war_forge'?.18:0)+(hl==='guild_bounty'&&dc==='a'?.15:0),
  battleDef:cid==='war_forge'?.15:0,
  expeditionGold:hl==='guild_bounty'&&dc==='a'?.20:0,
  forgeCraftGold:cid==='war_forge'?15:0,
  shopExtra:cid==='bountiful_hearth'?1:0,
  feverDuration:cid==='bountiful_hearth'?7:5,
  dailyForgeSale:(hl==='gem_caravan'&&dc==='a'?.12:0)+(hl==='harvest_fair'&&dc==='a'?.15:0),
  dailyKitchenSale:(hl==='food_critic'&&dc==='a'?.22:0)+(hl==='harvest_fair'&&dc==='a'?.15:0)
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
 const m=ensureWorkshopMomentum();
 if(kind==='kitchen'){
  if(m.kitchenFeverTurns>0)return;
  const before=m.kitchenFever;
  m.kitchenFever=Math.min(100,m.kitchenFever+Math.round(amount));
  if(before<100&&m.kitchenFever>=100)toast('🔥 餐廳黃金狂熱就緒！隨時點擊開啟 5 步爆發！');
 }else{
  if(m.forgeFeverTurns>0)return;
  const before=m.forgeFever;
  m.forgeFever=Math.min(100,m.forgeFever+Math.round(amount));
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
 const m=ensureWorkshopMomentum(),contract=activeContract();
 const fBar=$('forgeFeverBar');
 if(fBar){
  const showForge=day>0;
  fBar.hidden=!showForge;
  if(showForge){
   const active=m.forgeFeverTurns>0,ready=!active&&m.forgeFever>=100,pct=active?Math.round((m.forgeFeverTurns/contractBonuses().feverDuration)*100):m.forgeFever;
   const badge=contract?'<button type="button" class="ws-contract-chip" onclick="openTownChronicle()">'+contract.icon+' '+contract.name+'</button>':'<button type="button" class="ws-contract-chip is-empty" onclick="openTownChronicle()">📜 本季契約</button>';
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
   const badge=contract?'<span class="ws-contract-chip">'+contract.icon+' '+contract.name+'</span>':'<span class="ws-contract-chip is-empty">📜 尚無契約</span>';
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
 const m=ensureWorkshopMomentum(),contract=activeContract(),hl=activeDailyHeadline();
 const unreadContract=!m.contractId,unreadHeadline=!m.dailyChoice;
 btn.hidden=false;
 btn.classList.toggle('has-unread',unreadContract||unreadHeadline);
 btn.innerHTML=(unreadContract?'📜 選本季契約':contract?contract.icon+' '+contract.name:'📜 本季契約')
  +' · '+(unreadHeadline?'📰 今日頭條！':hl?hl.icon+' 已抉擇':'📰 頭條')
  +((unreadContract||unreadHeadline)?'<i class="town-daily-dot" aria-hidden="true"></i>':'');
}

function pickSeasonContract(id){
 if(day<1)return false;
 const m=ensureWorkshopMomentum();
 if(m.contractId||!m.seasonOffers.includes(id))return false;
 const c=SEASON_CONTRACTS.find(x=>x.id===id);
 if(!c)return false;
 m.contractId=id;
 toast('📜 已簽署本季契約：「'+c.name+'」');
 renderTownChronicle();updateTownDailyBadge();renderWorkshopMomentumBars();saveNow();
 return true;
}

function pickDailyHeadline(choice){
 if(day<1||!['a','b'].includes(choice))return false;
 syncWorkshopMomentumDay(false);
 const m=ensureWorkshopMomentum(),hl=activeDailyHeadline();
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
  const e=ELEMENT_KEYS[rnd(ELEMENT_KEYS.length)];
  bag.push({k:'ess',element:e});
  toast('✨ 獲得「'+ELEMENTS[e].name+'之精華」入道具箱！');
 }else if(hl.id==='wandering_florist'&&choice==='b'){
  const e1=ELEMENT_KEYS[rnd(ELEMENT_KEYS.length)],e2=ELEMENT_KEYS[rnd(ELEMENT_KEYS.length)];
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
 m.dailyChoice=choice;
 renderTownChronicle();updateTownDailyBadge();render();if(kitchen&&!$('kitchenP').hidden)renderKitchen();if($('townP').style.display==='flex')renderTown();saveNow();
 return true;
}

function openTownChronicle(){
 if(day<1)return;
 syncWorkshopMomentumDay(false);
 renderTownChronicle();
 $('townContractP').style.display='flex';
}

function renderTownChronicle(){
 const body=$('townContractBody');if(!body)return;
 const m=ensureWorkshopMomentum(),s=SEASONS[seasonIndex()],remDays=4-seasonDay();
 const contract=activeContract(),hl=activeDailyHeadline();
 let html='<section class="tc-section"><div class="tc-sec-head"><h3>📜 本季工坊契約（'+s.icon+' '+s.name+' · 剩 '+remDays+' 天）</h3><span class="tc-pill">'+(contract?'生效中':'三選一')+'</span></div>';
 if(contract){
  html+='<div class="tc-active-card"><div class="tc-card-top"><span class="tc-icon">'+contract.icon+'</span><div><b>'+contract.name+'</b><span class="tc-tag">'+contract.tag+'</span></div></div><p>'+contract.desc+'</p></div>';
 }else{
  html+='<p class="tc-intro">每一季可從三張策略契約中挑選一張生效，換季時重新抽選，為這一季打造不同玩法！</p><div class="tc-offer-grid">'
   +m.seasonOffers.map(id=>{const c=SEASON_CONTRACTS.find(x=>x.id===id);return c?'<button type="button" class="tc-offer-card" data-pick-contract="'+c.id+'"><div class="tc-card-top"><span class="tc-icon">'+c.icon+'</span><div><b>'+c.name+'</b><span class="tc-tag">'+c.tag+'</span></div></div><small>'+c.desc+'</small><span class="tc-choose">簽署此契約 ✦</span></button>':'';}).join('')
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

$('townContractBody')?.addEventListener('click',e=>{
 const cBtn=e.target.closest('[data-pick-contract]');
 if(cBtn){pickSeasonContract(cBtn.dataset.pickContract);return;}
 const hBtn=e.target.closest('[data-pick-headline]');
 if(hBtn&&!hBtn.disabled){pickDailyHeadline(hBtn.dataset.pickHeadline);}
});
