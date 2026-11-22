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
 forge:{
  key:'forge',buildingId:'townForge',buildingName:'鐵火冶煉廠',icon:'🔥',name:'龍焰大鍛爐',max:3,costs:[1200,3200,6800],
  tierNames:['精工鍛造擴建','龍焰雙爐改建','傳奇神匠殿堂'],
  effects:['冶煉武器售價 +8% · 過熱縮短 2 步','冶煉武器售價 +16% · 過熱縮短 4 步','冶煉武器售價 +25% · 過熱縮短 6 步 · 鍛造狂熱充能 +20%']
 },
 kitchen:{
  key:'kitchen',buildingId:'townKitchen',buildingName:'暖爐餐廳',icon:'🍲',name:'皇家星廚廳',max:3,costs:[1200,3200,6800],
  tierNames:['暖燈露台擴建','星廚金頂改建','皇家饗宴殿堂'],
  effects:['餐廳料理售價 +8% · 料理保鮮 +4 步','餐廳料理售價 +16% · 料理保鮮 +8 步','餐廳料理售價 +25% · 料理保鮮 +12 步 · 料理狂熱充能 +20%']
 },
 expedition:{
  key:'expedition',buildingId:'townExpedition',buildingName:'遠征城堡',icon:'🏰',name:'英雄凱旋堡',max:3,costs:[1500,3800,7800],
  tierNames:['金紋城垛擴建','皇家尖塔要塞','傳奇凱旋聖堡'],
  effects:['遠征全隊攻防 +8% · 每日凱旋觀光 +100💰','遠征全隊攻防 +16% · 每日凱旋觀光 +220💰','遠征全隊攻防 +26% · 每日凱旋觀光 +380💰']
 },
 training:{
  key:'training',buildingId:'townTraining',buildingName:'星盾訓練所',icon:'🔔',name:'星盾榮耀塔',max:3,costs:[1100,2800,6000],
  tierNames:['金盾校場擴建','星輝鐘樓高塔','聖盾榮耀殿堂'],
  effects:['每日雙工坊初始狂熱 +15% · 頭條津貼 +80💰','每日雙工坊初始狂熱 +30% · 頭條津貼 +180💰','每日雙工坊初始狂熱 +50% · 頭條津貼 +320💰']
 },
 greenhouse:{
  key:'greenhouse',buildingId:'townGreenhouse',buildingName:'晨露溫室',icon:'🌿',name:'水晶魔導溫室',max:3,costs:[1000,2600,5600],
  tierNames:['鎏金花脊擴建','翡翠水晶穹頂','精靈魔導聖園'],
  effects:['花種 -15% · 收成 +20% 額外精華','花種 -25% · 收成 +35% 額外精華','花種 -35% · 收成 +55% 額外精華 · 收成 +100💰']
 },
 archive:{
  key:'archive',buildingId:'townArchive',buildingName:'星頁圖鑑館',icon:'📚',name:'星穹大圖書館',max:3,costs:[1100,2800,6000],
  tierNames:['典藏書閣擴建','黃銅觀星圓頂','星穹典籍聖殿'],
  effects:['指定訂單與藍圖成品 +6% · 每日研究贊助 +80💰','指定訂單與藍圖成品 +12% · 每日研究贊助 +180💰','指定訂單與藍圖成品 +20% · 每日研究贊助 +320💰']
 },
 decor:{
  key:'decor',buildingId:'townDecorShop',buildingName:'彩匠裝飾行',icon:'🎨',name:'皇家工藝行',max:3,costs:[1000,2600,5600],
  tierNames:['慶典彩旗擴建','彩繪玻璃藝廊','皇家工藝殿堂'],
  effects:['城鎮裝飾購買 -12% · 每日繁榮分紅 +100💰','城鎮裝飾購買 -22% · 每日繁榮分紅 +220💰','城鎮裝飾購買 -35% · 每日繁榮分紅 +380💰']
 },
 fountain:{
  key:'fountain',buildingId:'townFountain',buildingName:'中央噴水池',icon:'⛲',name:'星輝許願噴泉',max:3,costs:[1400,3600,7500],
  tierNames:['精雕花泉擴建','鎏金雙層噴泉','星輝聖泉奇觀'],
  effects:['雙工坊客人耐心 +6 步 · 每日許願硬幣 +120💰','雙工坊客人耐心 +12 步 · 全工坊售價 +6% · 許願 +260💰','雙工坊客人耐心 +18 步 · 全工坊售價 +12% · 許願 +450💰']
 },
 west_camp:{
  key:'west_camp',buildingId:'townWingWest',buildingName:'西側溪畔營地',icon:'🎣',name:'星露棧橋與博物館',max:3,costs:[1200,3000,6400],
  tierNames:['堅固木棧橋','星露探險營地','皇家自然博物館'],
  effects:['每日西側探索體力 +1（共 4 次）· 稀有漁獲／古物 +15%','每日西側探索體力 +2（共 5 次）· 漁獲與古物收益 +35%','每日西側探索體力 +3（共 6 次）· 傳說機率大增 · 每日博物津貼 +280💰']
 },
 east_post:{
  key:'east_post',buildingId:'townWingEast',buildingName:'東側旅商驛站',icon:'🛒',name:'皇家旅商驛站',max:3,costs:[1200,3000,6400],
  tierNames:['旅商遮陽棚','繁榮商隊驛站','皇家跨國貿易港'],
  effects:['旅商馬車商品 +1 格且享 9 折 · 商隊回報 +15%','旅商享 8 折 · 商隊回報 +30% · 常客好感雙倍提升','旅商享 7 折 · 黃金商隊回報 +50% · 每日關稅分紅 +320💰']
 }
};
const TOWN_LANDMARK_KEYS=Object.keys(TOWN_LANDMARKS);

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

function freshTownLandmarks(){
 const out={};
 TOWN_LANDMARK_KEYS.forEach(k=>{out[k]=0;});
 return out;
}

function freshTownWings(){
 return {
  westDay:0,westUsed:0,westExtra:0,westFished:0,fishStreak:0,crossUsed:false,fishSupplyDay:0,
  digBoard:null,
  eastDay:0,eastBought:[],barterDone:false,haggleDone:false,haggleDisc:0,
  shipment:null,
  regularDay:0,regularGifted:[],regularQuestDone:[],
  regulars:{}
 };
}

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
  landmarks:freshTownLandmarks(),
  wings:freshTownWings(),
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
 const srcL=raw.landmarks||{};
 TOWN_LANDMARK_KEYS.forEach(k=>{
  let v=Number(srcL[k])||0;
  if(k==='training')v=Math.max(v,Number(srcL.belltower)||0);
  if(k==='expedition')v=Math.max(v,Number(srcL.monument)||0);
  base.landmarks[k]=Math.max(0,Math.min(3,Math.floor(v)));
 });
 if(raw.wings&&typeof raw.wings==='object'){
  const w=raw.wings;
  base.wings.westDay=Math.max(0,Math.floor(Number(w.westDay)||0));
  base.wings.westUsed=Math.max(0,Math.min(12,Math.floor(Number(w.westUsed)||0)));
  base.wings.westExtra=Math.max(0,Math.min(4,Math.floor(Number(w.westExtra)||0)));
  base.wings.westFished=Math.max(0,Math.min(20,Math.floor(Number(w.westFished)||0)));
  if(Array.isArray(w.digBoard)&&w.digBoard.length===9){
   base.wings.digBoard=w.digBoard.map(cell=>cell&&typeof cell==='object'?{t:String(cell.t||'gold'),open:!!cell.open,v:cell.v||null}:null);
  }
  base.wings.eastDay=Math.max(0,Math.floor(Number(w.eastDay)||0));
  base.wings.eastBought=Array.isArray(w.eastBought)?w.eastBought.filter(x=>typeof x==='string').slice(0,20):[];
  base.wings.barterDone=!!w.barterDone;base.wings.haggleDone=!!w.haggleDone;base.wings.haggleDisc=Math.max(0,Math.min(.25,Number(w.haggleDisc)||0));base.wings.fishStreak=Math.max(0,Math.min(5,Math.floor(Number(w.fishStreak)||0)));base.wings.crossUsed=!!w.crossUsed;base.wings.fishSupplyDay=Math.max(0,Math.floor(Number(w.fishSupplyDay)||0));
  base.wings.regularDay=Math.max(0,Math.floor(Number(w.regularDay)||0));
  base.wings.regularGifted=Array.isArray(w.regularGifted)?w.regularGifted.filter(x=>typeof x==='string').slice(0,20):[];
  base.wings.regularQuestDone=Array.isArray(w.regularQuestDone)?w.regularQuestDone.filter(x=>typeof x==='string').slice(0,20):[];
  if(w.shipment&&typeof w.shipment==='object'&&Number(w.shipment.returnDay)>0){
   base.wings.shipment={id:String(w.shipment.id||'local'),cost:Math.max(0,Math.floor(Number(w.shipment.cost)||0)),returnDay:Math.floor(Number(w.shipment.returnDay))};
  }
  if(w.regulars&&typeof w.regulars==='object'){
   Object.entries(w.regulars).forEach(([k,v])=>{base.wings.regulars[k]=Math.max(0,Math.min(5,Math.floor(Number(v)||0)));});
  }
 }
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
  const bell=landmarkBonuses().startFever;
  if(bell>0){
   m.forgeFever=Math.max(m.forgeFever,Math.min(100,bell));
   m.kitchenFever=Math.max(m.kitchenFever,Math.min(100,bell));
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

function buildingLandmarkTier(kind){
 if(day<1)return 0;
 return ensureWorkshopMomentum().landmarks[kind]||0;
}

function landmarkBonuses(){
 const l=day>0?ensureWorkshopMomentum().landmarks:freshTownLandmarks();
 return {
  forgeSale:[0,.08,.16,.25][l.forge]||0,
  forgeHeatReduce:[0,2,4,6][l.forge]||0,
  forgeFeverMult:l.forge>=3?1.2:1,
  kitchenSale:[0,.08,.16,.25][l.kitchen]||0,
  kitchenFreshBonus:[0,4,8,12][l.kitchen]||0,
  kitchenFeverMult:l.kitchen>=3?1.2:1,
  battleAtk:[0,.08,.16,.26][l.expedition]||0,
  battleDef:[0,.08,.16,.26][l.expedition]||0,
  startFever:[0,15,30,50][l.training]||0,
  headlineGold:[0,80,180,320][l.training]||0,
  seedDiscount:[0,.15,.25,.35][l.greenhouse]||0,
  extraEssence:[0,.2,.35,.55][l.greenhouse]||0,
  harvestGold:l.greenhouse>=3?100:0,
  archiveSpecifiedSale:[0,.06,.12,.2][l.archive]||0,
  decorDiscount:[0,.12,.22,.35][l.decor]||0,
  fountainPatience:[0,6,12,18][l.fountain]||0,
  fountainSale:[0,0,.06,.12][l.fountain]||0,
  westStaminaBonus:l.west_camp||0,
  westRareBonus:[0,.15,.28,.45][l.west_camp]||0,
  westRewardMult:[1,1.15,1.35,1.6][l.west_camp]||1,
  eastDiscount:[0,.1,.2,.3][l.east_post]||0,
  eastExtraSlots:l.east_post>=1?1:0,
  eastTradeMult:[1,1.15,1.3,1.5][l.east_post]||1,
  eastHeartStep:l.east_post>=2?2:1,
  tourismGold:([0,100,220,380][l.expedition]||0)+([0,80,180,320][l.archive]||0)+([0,100,220,380][l.decor]||0)+([0,120,260,450][l.fountain]||0)+(l.west_camp>=3?280:0)+(l.east_post>=3?320:0)
 };
}

function contractBonuses(){
 const m=ensureWorkshopMomentum(),hl=day>0&&m.dailyDay===day?m.headlineId:null,dc=day>0&&m.dailyDay===day?m.dailyChoice:null,lm=landmarkBonuses();
 const wb=typeof townWingBonuses==='function'?townWingBonuses():{forgeSale:0,kitchenSale:0,battleAtk:0,battleDef:0};
 const winterSale=activeRunMode()==='eternal_winter'?.35:0;
 return {
  emberTemper:hasContract('ember_temper'),
  twinCraft:hasContract('twin_craft'),
  specifiedSale:hasContract('artisan_gild')?.20:0,
  saleFever:hasContract('artisan_gild')?10:0,
  forgeHeatDelta:(hasContract('cool_breeze')?8:0)+(hl==='leyline_heat'&&dc==='a'?8:0)+lm.forgeHeatReduce,
  kitchenHeatDelta:hasContract('cool_breeze')?2:0,
  kitchenFreshBonus:(hasContract('cool_breeze')?8:0)+lm.kitchenFreshBonus,
  battleAtk:(hasContract('war_forge')?.18:0)+(hl==='guild_bounty'&&dc==='a'?.15:0)+lm.battleAtk+wb.battleAtk,
  battleDef:(hasContract('war_forge')?.15:0)+lm.battleDef+wb.battleDef,
  expeditionGold:hl==='guild_bounty'&&dc==='a'?.20:0,
  forgeCraftGold:hasContract('war_forge')?15:0,
  shopExtra:hasContract('bountiful_hearth')?1:0,
  feverDuration:hasContract('bountiful_hearth')?7:5,
  dailyForgeSale:(hl==='gem_caravan'&&dc==='a'?.12:0)+(hl==='harvest_fair'&&dc==='a'?.15:0)+winterSale+lm.forgeSale+lm.fountainSale+wb.forgeSale,
  dailyKitchenSale:(hl==='food_critic'&&dc==='a'?.22:0)+(hl==='harvest_fair'&&dc==='a'?.15:0)+winterSale+lm.kitchenSale+lm.fountainSale+wb.kitchenSale
 };
}

function isWorkshopFever(kind){
 const m=ensureWorkshopMomentum();
 return day>0&&(kind==='kitchen'?m.kitchenFeverTurns>0:m.forgeFeverTurns>0);
}

function forgeSaleMomentumBonus(w,o){
 if(day<1)return 0;
 const cb=contractBonuses(),lm=landmarkBonuses();
 let bonus=cb.dailyForgeSale;
 if(o&&o.c!==null)bonus+=cb.specifiedSale+lm.archiveSpecifiedSale;
 else if(w?.blueprint)bonus+=lm.archiveSpecifiedSale;
 if(w?.chainBonus&&cb.twinCraft)bonus+=.22;
 if(isWorkshopFever('forge'))bonus+=.25;
 return bonus;
}

function kitchenSaleMomentumBonus(w,o){
 if(day<1)return 0;
 const cb=contractBonuses(),lm=landmarkBonuses();
 let bonus=cb.dailyKitchenSale;
 if(o&&o.c!==null)bonus+=cb.specifiedSale+lm.archiveSpecifiedSale;
 if(w?.emberDish&&cb.emberTemper)bonus+=.15;
 if(w?.chainBonus&&cb.twinCraft)bonus+=.22;
 if(isWorkshopFever('kitchen'))bonus+=.25;
 return bonus;
}

function addWorkshopFever(kind,amount){
 if(day<1||amount<=0)return;
 const m=ensureWorkshopMomentum(),lm=landmarkBonuses(),modeMult=m.mode==='sprint9'?1.35:1,lmMult=kind==='kitchen'?lm.kitchenFeverMult:lm.forgeFeverMult,delta=Math.round(amount*modeMult*lmMult);
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
 if(key==='training'){
  const startF=landmarkBonuses().startFever;
  m.forgeFever=Math.max(m.forgeFever,Math.min(100,startF));
  m.kitchenFever=Math.max(m.kitchenFever,Math.min(100,startF));
 }
 workshopToolSound('upgrade');
 const tierName=lm.tierNames?.[lv]||('Lv '+(lv+1));
 toast('🏛 '+lm.buildingName+'進階「'+lm.name+' · '+tierName+'」(Lv '+(lv+1)+')！');
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
  const totalLv=TOWN_LANDMARK_KEYS.reduce((sum,k)=>sum+(m.landmarks[k]||0),0),maxLv=TOWN_LANDMARK_KEYS.length*3,pct=Math.round((totalLv/maxLv)*100);
  const cards=Object.values(TOWN_LANDMARKS).map(lm=>{
   const lv=m.landmarks[lm.key]||0,maxed=lv>=lm.max,cost=maxed?0:lm.costs[lv],canAfford=sandboxSession||coins>=cost;
   const stars=[0,1,2].map(i=>'<span class="lm-star'+(i<lv?' is-on':'')+'">★</span>').join('');
   const heroPreview=lm.key==='expedition'&&heroW?'<div class="lm-hero-showcase"><span class="lm-hero-art">'+hex(heroW.c,bands(heroW),'',heroW.t,heroW)+'</span><span><small>本局城門陳列代表作</small><b>'+esc(itemName(heroW))+'</b></span></div>':'';
   const curTier=lv>0?lm.tierNames[lv-1]:'初始建築';
   return '<div class="lm-card'+(maxed?' is-max':lv>0?' is-built':'')+'" data-lm-kind="'+lm.key+'" data-lm-lv="'+lv+'">'
    +'<div class="lm-head"><span class="lm-emblem">'+lm.icon+'</span><div class="lm-title"><div class="lm-title-row"><b>'+lm.name+'</b><span class="lm-building-tag">'+lm.buildingName+'</span></div><div class="lm-sub-row"><span class="lm-stars">'+stars+'</span><span class="lm-tier-label">'+curTier+'</span></div></div></div>'
    +heroPreview
    +'<div class="lm-tiers">'+lm.effects.map((txt,i)=>'<div class="lm-tier'+(i<lv?' is-done':i===lv?' is-next':'')+'"><b>'+(i<lv?'✓':'Lv'+(i+1))+'</b><span>'+txt+'</span></div>').join('')+'</div>'
    +'<button type="button" class="lm-btn'+(canAfford&&!maxed?' is-ready':'')+'" data-upgrade-landmark="'+lm.key+'"'+(!canAfford||maxed?' disabled':'')+'>'+(maxed?'✦ 傳奇殿堂已竣工（滿級）':'🏛 擴建至 Lv '+(lv+1)+' · '+lm.tierNames[lv]+'（💰'+cost.toLocaleString()+'）')+'</button>'
    +'</div>';
  }).join('');
  body.innerHTML=tabs
   +'<div class="lm-summary"><div class="lm-summary-top"><span>🏛 城鎮建築進階 <b>'+totalLv+' / '+maxLv+'</b></span><span class="lm-wallet">💰 '+(sandboxSession?'∞':coins.toLocaleString())+'</span></div><div class="lm-progress"><i style="width:'+pct+'%"></i></div><small>每階段擴建皆會永久強化工坊，並同步升級城鎮地圖上的建築樣式與招牌！</small></div>'
   +'<div class="lm-list">'+cards+'</div>';
  return;
 }

 let html=tabs;
 if(m.mode!=='normal'){
  html+='<div class="tc-mode-banner"><span>'+modeInfo.icon+'</span><div><b>試煉模式：'+modeInfo.name+(m.mode==='sprint9'?'（第 '+day+' / 9 天）':'')+'</b><small>'+modeInfo.desc+'</small></div></div>';
 }
 html+='<section class="tc-section"><div class="tc-sec-head"><h3>📜 本季工坊契約（'+s.icon+' '+s.name+' · 剩 '+remDays+' 天）</h3><span class="tc-pill">'+(contracts.length>=limit?'已簽 '+contracts.length+'/'+limit:'可選 '+contracts.length+'/'+limit)+'</span></div>';
 if(contracts.length){
  html+='<div class="tc-active-list">'+contracts.map(c=>'<div class="tc-active-card"><div class="tc-card-top"><span class="tc-icon is-px">'+(typeof pixelEmblemArt==='function'?pixelEmblemArt(c.id,c.name+c.tag):c.icon)+'</span><div><b>'+c.name+'</b><span class="tc-tag">'+c.tag+'</span></div></div><p>'+c.desc+'</p></div>').join('')+'</div>';
 }
 if(contracts.length<limit){
  html+='<p class="tc-intro">每季可從隨機契約中挑選 '+limit+' 張生效，換季重抽，為這一季打造專屬策略！</p><div class="tc-offer-grid">'
   +m.seasonOffers.filter(id=>!m.contractIds.includes(id)).map(id=>{const c=SEASON_CONTRACTS.find(x=>x.id===id);return c?'<button type="button" class="tc-offer-card" data-pick-contract="'+c.id+'"><div class="tc-card-top"><span class="tc-icon is-px">'+(typeof pixelEmblemArt==='function'?pixelEmblemArt(c.id,c.name+c.tag):c.icon)+'</span><div><b>'+c.name+'</b><span class="tc-tag">'+c.tag+'</span></div></div><small>'+c.desc+'</small><span class="tc-choose">簽署此契約 ✦</span></button>':'';}).join('')
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
 const wg=m.wings;
 if(wg?.shipment){
  if(day>=wg.shipment.returnDay)hooks.push('📦 東側跨城商隊已滿載返航，回城鎮右滑即可領取豐厚收益！');
  else if(phase==='kitchen'&&day+1>=wg.shipment.returnDay)hooks.push('📦 東側跨城商隊明天早上返航，記得去領取收益！');
 }
 const westMax=3+(landmarkBonuses().westStaminaBonus||0),westRem=Math.max(0,westMax-(wg?.westDay===day?(wg.westUsed||0):0));
 if(phase==='forge'&&westRem>0)hooks.push('🎣 西側溪畔還有 '+westRem+' 次免費釣魚／挖寶體力，夜晚限定魚種即將出沒！');
 if(!hooks.length)hooks.push(phase==='forge'?'🍲 晚餐時段即將開啟，準備好料理與主打菜大賺一筆！':'🌅 明天將刷新全新「今日城鎮頭條」與新一批客人！');
 return '<div class="settle-hooks"><b>✨ 下一步預告</b>'+hooks.slice(0,2).map(h=>'<p>'+h+'</p>').join('')+'</div>';
}

function openRunModes(){
 const body=$('runModeBody');if(!body)return;
 body.innerHTML='<p class="tc-intro">選擇一種規則開始新局（皆會保留你的角色外觀與永久圖鑑／紀念章紀錄）：</p><div class="mode-list">'
  +Object.values(RUN_MODES).map(md=>'<button type="button" class="mode-card" data-start-mode="'+md.id+'"><div class="tc-card-top"><span class="tc-icon is-px">'+(typeof pixelEmblemArt==='function'?pixelEmblemArt(md.id,md.name):md.icon)+'</span><div><b>'+md.name+'</b><span class="tc-tag">'+md.tag+'</span></div></div><small>'+md.desc+'</small><span class="tc-choose">以此模式開局 ▶</span></button>').join('')
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
