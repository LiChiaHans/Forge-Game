/* ==========================================================================
   West & East Town Outskirts Wings:
   - West: Interactive Timing-Bar Fishing, 3x3 Ruin Dig Grid & 3-Tab Museum
   - East: Traveling Caravan + Barter, Regulars' Affinity + Daily Quests & Trade Depot
   - Navigation: Road Arrow Buttons, Zone Pill Bar, & Left/Right Swipe Gesture
   ========================================================================== */

const TOWN_WING_ART={"west_0":"assets/town/west_0.e8f9bd50c935.jpg","west_1":"assets/town/west_1.2367ad9d0d8c.jpg","west_2":"assets/town/west_2.50a17eb52210.jpg","west_3":"assets/town/west_3.6fc70687a8a8.jpg","west_4":"assets/town/west_4.eb580b097f0a.jpg","west_5":"assets/town/west_5.06707389c570.jpg","west_6":"assets/town/west_6.2e6f3b06e3ad.jpg","west_7":"assets/town/west_7.b80182ca90e7.jpg","east_0":"assets/town/east_0.480a66adb479.jpg","east_1":"assets/town/east_1.6c11b3e58bca.jpg","east_2":"assets/town/east_2.5ebf1e4eaae8.jpg","east_3":"assets/town/east_3.a9e7ff711013.jpg","east_4":"assets/town/east_4.0c1c97fa36de.jpg","east_5":"assets/town/east_5.b830d777c365.jpg","east_6":"assets/town/east_6.903d44c0e43b.jpg","east_7":"assets/town/east_7.5ec3bb9556ce.jpg"};

const FISH_CATALOG=[
 {id:'spring_trout',icon:'🐟',name:'晨露溪鱒',season:0,night:false,rarity:0,gold:55},
 {id:'sakura_carp',icon:'🎏',name:'櫻花錦鯉',season:0,night:false,rarity:1,gold:110},
 {id:'spring_eel',icon:'🐍',name:'星光鰻魚',season:0,night:true,rarity:1,gold:125},
 {id:'moon_koi',icon:'✨',name:'月光神鯉',season:0,night:true,rarity:2,gold:220},
 {id:'sun_perch',icon:'🐠',name:'珊瑚鱸魚',season:1,night:false,rarity:0,gold:60},
 {id:'summer_crab',icon:'🦀',name:'金殼溪蟹',season:1,night:false,rarity:1,gold:115},
 {id:'tide_squid',icon:'🦑',name:'螢光夜魷',season:1,night:true,rarity:1,gold:130},
 {id:'sun_marlin',icon:'🐬',name:'碧海旗魚王',season:1,night:false,rarity:2,gold:230},
 {id:'maple_salmon',icon:'🐟',name:'楓紅鮭魚',season:2,night:false,rarity:0,gold:65},
 {id:'amber_catfish',icon:'🐡',name:'琥珀鬍鯰',season:2,night:false,rarity:1,gold:120},
 {id:'harvest_shrimp',icon:'🦐',name:'秋月金蝦',season:2,night:true,rarity:1,gold:135},
 {id:'golden_sturgeon',icon:'👑',name:'黃金皇鱘',season:2,night:true,rarity:2,gold:240},
 {id:'frost_smelt',icon:'🐟',name:'寒冰香魚',season:3,night:false,rarity:0,gold:70},
 {id:'snow_pike',icon:'🦈',name:'雪紋冰梭',season:3,night:false,rarity:1,gold:125},
 {id:'crystal_jelly',icon:'🪼',name:'星晶水母',season:3,night:true,rarity:1,gold:140},
 {id:'aurora_dragonfish',icon:'🐉',name:'極光冰龍魚',season:3,night:true,rarity:2,gold:260}
];

const RELIC_CATALOG=[
 {id:'old_tongs',icon:'🔧',name:'古代鍛造火鉗',rarity:0,gold:65,desc:'遠古鐵匠留下的青銅火鉗。'},
 {id:'clay_pot',icon:'🏺',name:'彩紋陶罐碎片',rarity:0,gold:70,desc:'繪有四季稻穗的古老陶片。'},
 {id:'bronze_coin',icon:'🪙',name:'星盾古銀幣',rarity:0,gold:80,desc:'建鎮初期流通的銀質紀念幣。'},
 {id:'ember_fossil',icon:'🪨',name:'熔火琥珀化石',rarity:0,gold:85,desc:'封存著微弱地脈火花的礦石。'},
 {id:'spice_mortar',icon:'🥣',name:'御廚石臼',rarity:1,gold:130,desc:'散發著百年香料氣息的研磨臼。'},
 {id:'rune_tablet',icon:'📜',name:'失落符文石板',rarity:1,gold:145,desc:'刻著遠古鍛造口訣的石碑殘頁。'},
 {id:'star_compass',icon:'🧭',name:'星辰航海羅盤',rarity:1,gold:155,desc:'指針永遠指向星輝噴泉的奇物。'},
 {id:'crystal_lens',icon:'🔮',name:'觀星水晶鏡片',rarity:1,gold:165,desc:'能映出四季星象的打磨水晶。'},
 {id:'dwarf_hammer',icon:'🔨',name:'矮人秘銀聖錘',rarity:2,gold:250,desc:'傳說中打造神兵的矮人王族鍛錘。'},
 {id:'royal_cookbook',icon:'📖',name:'失落皇家食譜',rarity:2,gold:260,desc:'記載夢幻料理秘訣的金裝古籍。'},
 {id:'dragon_scale',icon:'🐲',name:'赤龍淬火鱗片',rarity:2,gold:280,desc:'觸感溫熱、永不熄滅的龍鱗古物。'},
 {id:'crown_seal',icon:'👑',name:'星露古王印璽',rarity:2,gold:320,desc:'象徵城鎮黃金年代的傳奇王印。'}
];

const CARAVAN_THEMES=[
 {id:'spice',icon:'🌶',name:'東方香料馬車',desc:'帶來異國辛香調味與高階食材補給！',items:[
  {id:'spice_pack',icon:'🌶',name:'異國辛香包',cost:140,desc:'加入廚房道具箱（辛香調味格）',grant:()=>{if(!kitchen)kitchen=freshKitchen();kitchen.bag.push({k:'spice',spice:'spicy'});}},
  {id:'fresh_ice',icon:'🧊',name:'雪山冰水桶',cost:160,desc:'加入廚房道具箱（消除廚房餘熱）',grant:()=>{if(!kitchen)kitchen=freshKitchen();kitchen.bag.push({k:'z'});}},
  {id:'kitchen_fever',icon:'🔥',name:'秘製提神茶',cost:150,desc:'立即為餐廳狂熱充能 +50%',grant:()=>{addWorkshopFever('kitchen',50);}},
  {id:'spice_rare',icon:'✨',name:'星露秘傳香料組',cost:240,desc:'獲贈 2 包隨機調味包入廚房道具箱',rare:true,grant:()=>{if(!kitchen)kitchen=freshKitchen();const sp=['spicy','herb','honey','truffle'];kitchen.bag.push({k:'spice',spice:sp[rnd(sp.length)]},{k:'spice',spice:sp[rnd(sp.length)]});}}
 ]},
 {id:'dwarf',icon:'⚒',name:'矮人符文馬車',desc:'專賣鍛造神具、礦石升級與降溫暴雪！',items:[
  {id:'forge_upg',icon:'⬆️',name:'矮人淬鍊石',cost:160,desc:'加入冶煉廠道具箱（礦石升級）',grant:()=>{bag.push({k:'u'});}},
  {id:'forge_blizz',icon:'❄️',name:'極地暴風雪卷軸',cost:480,desc:'特價暴風雪道具入冶煉廠道具箱',grant:()=>{bag.push({k:'z'});}},
  {id:'forge_fever',icon:'🔥',name:'矮人烈酒桶',cost:150,desc:'立即為冶煉廠狂熱充能 +50%',grant:()=>{addWorkshopFever('forge',50);}},
  {id:'dwarf_diamond',icon:'💎',name:'地脈高階原鑽',cost:290,desc:'直接獲得高階鑽石入冶煉廠道具箱',rare:true,grant:()=>{bag.push({k:'d',t:day>=6?2:1});}}
 ]},
 {id:'elf',icon:'🌸',name:'精靈花藝馬車',desc:'攜帶珍稀元素花種與純粹元素精華！',items:[
  {id:'seed_pack',icon:'🌱',name:'精靈花種袋',cost:220,desc:'隨機獲得 2 顆元素花種入溫室庫存',grant:()=>{const e1=ELEMENT_IDS[rnd(ELEMENT_IDS.length)],e2=ELEMENT_IDS[rnd(ELEMENT_IDS.length)];seedStock[e1]=(seedStock[e1]||0)+1;seedStock[e2]=(seedStock[e2]||0)+1;}},
  {id:'ess_bottle',icon:'✨',name:'純淨元素精華',cost:260,desc:'隨機獲得 1 份元素精華入冶煉廠道具箱',grant:()=>{bag.push({k:'ess',element:ELEMENT_IDS[rnd(ELEMENT_IDS.length)]});}},
  {id:'dual_fever',icon:'⚡',name:'晨露共鳴瓶',cost:190,desc:'雙工坊狂熱同時 +35% 充能',grant:()=>{addWorkshopFever('forge',35);addWorkshopFever('kitchen',35);}},
  {id:'elf_bundle',icon:'🌿',name:'精靈雙精華禮盒',cost:420,desc:'隨機獲得 2 份元素精華入道具箱',rare:true,grant:()=>{bag.push({k:'ess',element:ELEMENT_IDS[rnd(ELEMENT_IDS.length)]},{k:'ess',element:ELEMENT_IDS[rnd(ELEMENT_IDS.length)]});}}
 ]},
 {id:'royal',icon:'💎',name:'皇家珍寶商隊',desc:'高階工坊補給與罕見稀有寶物限時特賣！',items:[
  {id:'royal_burn',icon:'🔥',name:'煉金淨化火鉗',cost:130,desc:'獲得 1 個焚燒工具入冶煉廠道具箱',grant:()=>{bag.push({k:'f'});}},
  {id:'royal_upg',icon:'⬆️',name:'皇家精鍛升級',cost:165,desc:'獲得 1 個礦石升級入冶煉廠道具箱',grant:()=>{bag.push({k:'u'});}},
  {id:'royal_prep',icon:'🥣',name:'宮廷工序組',cost:150,desc:'獲得 2 張隨機工序入廚房道具箱',grant:()=>{if(!kitchen)kitchen=freshKitchen();kitchen.bag.push({k:'m',s:rnd(3)},{k:'m',s:rnd(3)});}},
  {id:'royal_chest',icon:'🎁',name:'皇家秘寶箱',cost:340,desc:'立刻多獲得 1 次營業寶箱抽獎機會！',rare:true,grant:()=>{pendingChests++;}}
 ]}
];

const TOWN_REGULARS=[
 {id:'renn',icon:'⚔',name:'雷恩團長',role:'遠征軍先鋒',giftCost:110,
  quotes:['先來一杯麥酒暖身，明天還得巡守城門呢。','你的武器讓我這支小隊所向披靡！','只要有你在這座小鎮，魔物根本不足為懼！'],
  perk:'Lv3：遠征攻擊 +6% · Lv5：遠征攻防 +12%',
  quest:{text:'今日在冶煉廠成交至少 1 筆訂單',check:()=>dEarn>0||all>0,rewardGold:90}},
 {id:'elena',icon:'👑',name:'艾琳食評家',role:'皇家美食評論',giftCost:110,
  quotes:['聽說暖爐餐廳的晚間料理頗有口碑，我會仔細品嚐的。','火候與調味恰到好處，我已把你寫進推薦名錄！','這絕對是王國數一數二的夢幻星級餐桌！'],
  perk:'Lv3：餐廳售價 +6% · Lv5：餐廳售價 +12%',
  quest:{text:'今日在西側溪畔釣起 1 條鮮魚',check:()=>ensureTownWings().westFished>=1,rewardGold:100}},
 {id:'thorin',icon:'⚒',name:'托爾老鐵匠',role:'退隱神匠',giftCost:110,
  quotes:['年輕人，打鐵要聽火聲，別急著收錘。','好手藝！這鍛爐的節奏讓我想起當年！','你已經超越老頭子我了，這座小鎮以你為榮！'],
  perk:'Lv3：冶煉售價 +6% · Lv5：冶煉售價 +12%',
  quest:{text:'今日累積獲得金幣達 150💰',check:()=>dEarn>=150||coins>=300,rewardGold:95}},
 {id:'luna',icon:'🔮',name:'露娜占星師',role:'星頁館常客',giftCost:100,
  quotes:['今晚的星象很平靜，適合去溪畔散步。','星軌交會於你的工坊，財運正在上升喔！','我從沒見過如此耀眼的星運，你注定名留青史！'],
  perk:'Lv3：雙工坊售價 +4% · Lv5：雙工坊售價 +8%',
  quest:{text:'本季已簽署至少 1 張工坊契約',check:()=>activeContracts().length>=1,rewardGold:90}},
 {id:'parker',icon:'🌿',name:'帕克花藝師',role:'溫室愛好者',giftCost:100,
  quotes:['晨露溫室的土質真棒，記得多看看花盆喔！','你照料的花朵比王室花園還香甜！','精靈們都在傳頌你的溫室與溪畔聖園呢！'],
  perk:'Lv3：遠征防禦 +6% · Lv5：遠征防禦 +12%',
  quest:{text:'今日在西側進行至少 1 次探索',check:()=>ensureTownWings().westUsed>=1,rewardGold:85}},
 {id:'bard',icon:'🎸',name:'巴德吟遊詩人',role:'酒館駐唱',giftCost:95,
  quotes:['請我喝一杯麥酒，我就幫你唱首小調！','你的名聲已經傳到隔壁城鎮啦！','這首《星露神匠之歌》將永遠在酒館流傳！'],
  perk:'Lv3：每日贈送 +15% 雙狂熱 · Lv5：全工坊 +6%',
  quest:{text:'今日已完成城鎮頭條抉擇',check:()=>!!ensureWorkshopMomentum().dailyChoice,rewardGold:85}}
];

const TRADE_ROUTES=[
 {id:'local',icon:'🐴',name:'鄰鎮商隊線',cost:200,days:1,baseMult:1.45,minLv:0,desc:'隔天返航，穩定賺取約 1.45 倍金幣＋隨機工坊物資。'},
 {id:'harbor',icon:'⛵',name:'海港遠洋線',cost:500,days:1,baseMult:1.58,minLv:1,desc:'隔天返航，賺取約 1.58 倍金幣＋元素花種或升級道具。'},
 {id:'imperial',icon:'👑',name:'皇都黃金商隊',cost:1000,days:2,baseMult:1.85,minLv:2,desc:'2 天後返航，賺取約 1.85 倍暴利＋稀有元素精華與寶箱！'}
];

const TOWN_MUSEUM_KEY='forgeTownMuseumV1';
let townZone='center',townWingModalMode=null,museumTab='fish',lastFishBanner=null;
let fishGame={active:false,pos:50,dir:1,raf:0,lastTs:0};

function loadTownMuseum(){
 try{
  const raw=JSON.parse(gameStorage.getItem(TOWN_MUSEUM_KEY)||'{}');
  return {
   fish:Array.isArray(raw.fish)?raw.fish.filter(id=>FISH_CATALOG.some(f=>f.id===id)):[],
   relics:Array.isArray(raw.relics)?raw.relics.filter(id=>RELIC_CATALOG.some(r=>r.id===id)):[]
  };
 }catch(e){return {fish:[],relics:[]};}
}
function saveTownMuseum(m){
 if(sandboxSession)return;
 try{gameStorage.setItem(TOWN_MUSEUM_KEY,JSON.stringify(m));}catch(e){}
}
function registerMuseumItem(kind,id){
 const m=loadTownMuseum(),arr=kind==='fish'?m.fish:m.relics;
 const isNew=!arr.includes(id);
 if(isNew){arr.push(id);saveTownMuseum(m);}
 return {isNew,total:m.fish.length+m.relics.length};
}

function createDailyDigBoard(){
 const pool=['relic','relic','relic','relic','gold','gold','seed','chest','gold'];
 for(let i=pool.length-1;i>0;i--){const j=rnd(i+1);[pool[i],pool[j]]=[pool[j],pool[i]];}
 return pool.map(t=>({t,open:false,v:null}));
}

function ensureTownWings(){
 const m=ensureWorkshopMomentum();
 if(!m.wings)m.wings=freshTownWings();
 const w=m.wings;
 if(day>0&&w.westDay!==day){w.westDay=day;w.westUsed=0;w.westExtra=0;w.westFished=0;w.digBoard=createDailyDigBoard();}
 if(!Array.isArray(w.digBoard)||w.digBoard.length!==9)w.digBoard=createDailyDigBoard();
 if(day>0&&w.eastDay!==day){w.eastDay=day;w.eastBought=[];w.barterDone=false;}
 if(day>0&&w.regularDay!==day){
  w.regularDay=day;w.regularGifted=[];w.regularQuestDone=[];
  if((w.regulars?.bard||0)>=3){addWorkshopFever('forge',15);addWorkshopFever('kitchen',15);}
 }
 return w;
}

function townWingBonuses(){
 if(day<1)return {forgeSale:0,kitchenSale:0,battleAtk:0,battleDef:0};
 const w=ensureTownWings(),reg=w.regulars||{},mus=loadTownMuseum();
 const musCount=mus.fish.length+mus.relics.length;
 const musSale=Math.min(.14,Math.floor(musCount/4)*.02);
 const lunaSale=(reg.luna||0)>=5?.08:(reg.luna||0)>=3?.04:0;
 const bardSale=(reg.bard||0)>=5?.06:0;
 const forgeSale=musSale+lunaSale+bardSale+((reg.thorin||0)>=5?.12:(reg.thorin||0)>=3?.06:0);
 const kitchenSale=musSale+lunaSale+bardSale+((reg.elena||0)>=5?.12:(reg.elena||0)>=3?.06:0);
 const battleAtk=(reg.renn||0)>=5?.12:(reg.renn||0)>=3?.06:0;
 const battleDef=((reg.renn||0)>=5?.12:0)+((reg.parker||0)>=5?.12:(reg.parker||0)>=3?.06:0);
 return {forgeSale,kitchenSale,battleAtk,battleDef};
}

function setTownZone(zone){
 if(!['west','center','east'].includes(zone))return;
 if(architect?.active&&zone!=='center'){toast('請先結束城鎮佈置模式，再前往左右道路區域。');return;}
 townZone=zone;
 renderTownWing();
}

function wingUpgradeArtSVG(zone,lv){
 if(!lv||lv<1)return '';
 const t2=lv>=2,t3=lv>=3;
 let arch='',glow='';
 if(zone==='west'){
  // Lv1: explorer guild pennant at tent + warm pier lantern post
  arch+='<g><path fill="#2a211b" d="M276 220h4v44h-4zM280 222h28l-6 8 6 8h-28z"/><path fill="#2d7a64" d="M280 224h24l-5 6 5 6h-24z"/><path fill="#f5d16b" d="M280 224h24v2h-24zM284 228h6v4h-6z"/>'
   +'<path fill="#2a211b" d="M242 544h6v36h-6zM236 544h18v12h-18z"/><rect x="239" y="547" width="12" height="7" fill="#ffe180"/></g>';
  glow+='<circle cx="245" cy="550" r="22" fill="url(#tw-gold)"/>';
  // Lv2: gilded museum cupola on lower-right cabin + glowing ruin crystal pedestal
  if(t2){
   arch+='<g><path fill="#1b171455" d="M430 618h54v6h-54z"/><path fill="#2a211b" d="M434 596h46v24h-46zM430 596l27-20 27 20v4h-54z"/>'
    +'<path fill="#38856d" d="M437 598h40v20h-40z"/><path fill="#8ef2cb" d="M441 601h10v14h-10zM455 601h10v14h-10zM469 601h6v14h-6z"/>'
    +'<path fill="#52aa8c" d="M435 596l22-16 22 16z"/><path fill="#f2ca63" d="M434 596h46v3h-46zM456 568h3v10h-3z"/><rect x="455" y="566" width="5" height="4" fill="#fff2b5"/>'
    +'<path fill="#2a211b" d="M122 260h22v22h-22z"/><path fill="#7c8791" d="M124 268h18v12h-18z"/><path fill="#6ef7d2" stroke="#1f2e2b" stroke-width="1.8" d="M133 242l9 14-9 12-9-12z"/></g>';
   glow+='<circle cx="133" cy="254" r="26" fill="url(#tw-mana)"/><circle cx="457" cy="592" r="24" fill="url(#tw-mana)"/>';
  }
  // Lv3: radiant starlight aura + floating crystal motes
  if(t3){
   glow+='<circle class="tw-pulse" cx="457" cy="586" r="40" fill="url(#tw-gold)"/><circle class="tw-pulse" cx="133" cy="254" r="38" fill="url(#tw-mana)"/>'
    +'<rect class="tw-spark" x="112" y="232" width="4" height="4" fill="#b8ffe8"/><rect class="tw-spark" x="154" y="236" width="4" height="4" fill="#ffe994"/><rect class="tw-spark" x="442" y="562" width="4" height="4" fill="#fff3bc"/><rect class="tw-spark" x="478" y="572" width="4" height="4" fill="#a8ffe0"/>';
  }
 }else{
  // East Boulevard Lv1: festive caravan bunting pennants + brass plaza lanterns
  arch+='<g><path fill="none" stroke="#2a211b" stroke-width="2.5" d="M210 382q120 34 260-48"/>'
   +'<path fill="#d84658" d="M236 388h10l-5 11z"/><path fill="#f0c44d" d="M276 394h10l-5 11z"/><path fill="#45b58a" d="M318 392h10l-5 11z"/><path fill="#4b8bd4" d="M360 382h10l-5 11z"/><path fill="#d84658" d="M402 366h10l-5 11z"/><path fill="#f0c44d" d="M442 346h10l-5 11z"/>'
   +'<path fill="#2a211b" d="M204 374h6v30h-6zM468 326h6v30h-6z"/><rect x="205" y="376" width="4" height="6" fill="#ffe180"/><rect x="469" y="328" width="4" height="6" fill="#ffe180"/></g>';
  glow+='<circle cx="207" cy="379" r="20" fill="url(#tw-gold)"/><circle cx="471" cy="331" r="20" fill="url(#tw-gold)"/>';
  // Lv2: royal guild banner on dock crane + gilded tavern gable crest & bistro string lights
  if(t2){
   arch+='<g><path fill="#2a211b" d="M424 494h18v34l-9-6-9 6z"/><path fill="#b82e38" d="M426 496h14v28l-7-5-7 5z"/><path fill="#f5cf67" d="M426 496h14v3h-14zM431 503h4v12h-4z"/>'
    +'<path fill="#2a211b" d="M214 630h28v16h-28z"/><path fill="#9c2c34" d="M216 632h24v12h-24z"/><path fill="#ffe892" d="M220 635h4v6h-4zM226 635h4v6h-4zM232 635h4v6h-4z"/>'
    +'<path fill="none" stroke="#ffe592" stroke-width="2" stroke-dasharray="4 6" d="M126 742q74 28 176-18"/></g>';
   glow+='<ellipse cx="228" cy="638" rx="28" ry="20" fill="url(#tw-gold)"/>';
  }
  // Lv3: golden starlight beacon on windmill + shimmering trade motes
  if(t3){
   arch+='<path fill="#2a211b" d="M466 56h4v14h-4zM461 61h14v4h-14z"/><path fill="#fff3b8" d="M467 57h2v12h-2zM462 62h12v2h-12z"/>';
   glow+='<circle class="tw-pulse" cx="468" cy="63" r="30" fill="url(#tw-gold)"/><circle class="tw-pulse" cx="350" cy="316" r="42" fill="url(#tw-gold)"/>'
    +'<rect class="tw-spark" x="282" y="290" width="4" height="4" fill="#fff2b8"/><rect class="tw-spark" x="418" y="256" width="4" height="4" fill="#ffe482"/><rect class="tw-spark" x="232" y="612" width="4" height="4" fill="#fff3c0"/><rect class="tw-spark" x="438" y="476" width="4" height="4" fill="#ffe68c"/>';
  }
 }
 return '<svg class="tw-upgrade-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 572 1024" preserveAspectRatio="none" aria-hidden="true" shape-rendering="crispEdges">'
  +'<defs><radialGradient id="tw-gold"><stop stop-color="#ffe99e" stop-opacity=".75"/><stop offset=".5" stop-color="#f5bc4f" stop-opacity=".24"/><stop offset="1" stop-color="#f5bc4f" stop-opacity="0"/></radialGradient>'
  +'<radialGradient id="tw-mana"><stop stop-color="#9effd6" stop-opacity=".75"/><stop offset=".5" stop-color="#44c490" stop-opacity=".24"/><stop offset="1" stop-color="#44c490" stop-opacity="0"/></radialGradient></defs>'
  +'<g class="tw-up-arch">'+arch+'</g><g class="tw-up-glow" shape-rendering="auto">'+glow+'</g></svg>';
}

function renderTownWing(){
 const layer=$('townWingLayer'),goW=$('townGoWest'),goE=$('townGoEast'),dots=$('townZoneDots');
 if(!layer||!goW||!goE||!dots)return;
 const enabled=expandedGameEnabled()&&day>0;
 if(!enabled){layer.hidden=true;goW.hidden=true;goE.hidden=true;dots.hidden=true;townZone='center';return;}
 const si=townVisualSeason(),night=isSandboxNight(),mapIdx=si+(night?4:0);
 const w=ensureTownWings(),lm=landmarkBonuses();
 const westMax=3+(lm.westStaminaBonus||0),westRem=Math.max(0,westMax-w.westUsed);
 const shipReady=!!(w.shipment&&day>=w.shipment.returnDay);
 goW.hidden=townZone!=='center';
 goE.hidden=townZone!=='center';
 goW.innerHTML='◀<span>溪畔營地'+(westRem>0?' <em>'+westRem+'</em>':'')+'</span>';
 goE.innerHTML='<span>旅商驛站'+(shipReady?' <em>領取</em>':'')+'</span>▶';
 dots.hidden=false;
 dots.innerHTML=[['west','🎣 西側營地'],['center','🏘 主城鎮'],['east','🛒 東側驛站']].map(([z,lbl])=>'<button type="button" class="'+(townZone===z?'is-active':'')+'" onclick="setTownZone(\''+z+'\')">'+lbl+'</button>').join('');
 if(townZone==='center'){layer.hidden=true;layer.dataset.zone='center';return;}
 layer.hidden=false;
 layer.dataset.zone=townZone;
 layer.dataset.time=night?'night':'day';
 const bgUrl=TOWN_WING_ART[townZone+'_'+mapIdx]||TOWN_WING_ART[townZone+'_'+si]||'';
 const westLv=buildingLandmarkTier('west_camp'),eastLv=buildingLandmarkTier('east_post');
 if(townZone==='west'){
  const tierBadge=westLv>0?'<div class="tw-tier-banner">🎣 '+TOWN_LANDMARKS.west_camp.tierNames[westLv-1]+' '+'★'.repeat(westLv)+'</div>':'';
  layer.innerHTML='<img class="town-wing-bg" src="'+bgUrl+'" alt="西側星露溪畔營地" decoding="async">'
   +wingUpgradeArtSVG('west',westLv)
   +tierBadge
   +'<div class="town-wing-fx is-west" aria-hidden="true">'
   +'<div class="wf-waterfall"><span class="wf-stream s1"></span><span class="wf-stream s2"></span><span class="wf-stream s3"></span></div>'
   +'<div class="wf-plunge"><span class="wf-foam"></span><span class="wf-foam f2"></span><span class="wf-ripple"></span><span class="wf-ripple r2"></span><i class="wf-drop d1"></i><i class="wf-drop d2"></i><i class="wf-drop d3"></i><i class="wf-drop d4"></i><i class="wf-drop d5"></i></div>'
   +'</div>'
   +'<button type="button" class="town-wing-spot" style="left:6%;top:17%;width:52%;height:24%" onclick="openTownWingModal(\'excavate\')"><span class="tw-plaque">⛏ 古物遺跡營地<small>3×3 探勘 · 體力 '+westRem+'/'+westMax+'</small></span></button>'
   +'<button type="button" class="town-wing-spot" style="left:16%;top:50%;width:42%;height:22%" onclick="openTownWingModal(\'fishing\')"><span class="tw-plaque">🎣 星露釣魚棧橋<small>'+(night?'🌙 夜間限定魚群':'☀ 白天溪畔魚群')+'</small></span></button>'
   +'<button type="button" class="town-wing-spot" style="left:55%;top:55%;width:41%;height:22%" onclick="openTownWingModal(\'museum\')"><span class="tw-plaque">🏛 星露博物小屋<small>大工程 Lv '+westLv+'/3</small></span></button>'
   +'<button type="button" class="town-road-arrow is-east is-return" onclick="setTownZone(\'center\')" aria-label="返回主城鎮"><span>返回城鎮</span>▶</button>';
 }else{
  const theme=CARAVAN_THEMES[(day-1)%CARAVAN_THEMES.length];
  const tierBadge=eastLv>0?'<div class="tw-tier-banner">🛒 '+TOWN_LANDMARKS.east_post.tierNames[eastLv-1]+' '+'★'.repeat(eastLv)+'</div>':'';
  layer.innerHTML='<img class="town-wing-bg" src="'+bgUrl+'" alt="東側旅商大道" decoding="async">'
   +wingUpgradeArtSVG('east',eastLv)
   +tierBadge
   +'<div class="town-wing-fx is-east" aria-hidden="true"><span class="es-stream-glint g1"></span><span class="es-stream-glint g2"></span></div>'
   +'<button type="button" class="town-wing-spot" style="left:36%;top:21%;width:58%;height:22%" onclick="openTownWingModal(\'caravan\')"><span class="tw-plaque">'+theme.icon+' '+theme.name+'<small>特賣＋以物易物 · Lv '+eastLv+'/3</small></span></button>'
   +'<button type="button" class="town-wing-spot" style="left:58%;top:45%;width:39%;height:21%" onclick="openTownWingModal(\'depot\')"><span class="tw-plaque">📦 跨城商隊碼頭<small>'+(shipReady?'✨ 商隊已返航！':w.shipment?'🚢 航行中':'投資賺翻倍')+'</small></span></button>'
   +'<button type="button" class="town-wing-spot" style="left:6%;top:56%;width:52%;height:32%" onclick="openTownWingModal(\'tavern\')"><span class="tw-plaque">🍺 旅人常客酒館<small>常客委託與好感度</small></span></button>'
   +'<button type="button" class="town-road-arrow is-west is-return" onclick="setTownZone(\'center\')" aria-label="返回主城鎮">◀<span>返回城鎮</span></button>';
 }
}

function stopFishGame(){
 if(fishGame.raf&&typeof cancelAnimationFrame==='function')cancelAnimationFrame(fishGame.raf);
 fishGame.active=false;fishGame.raf=0;
}

function openTownWingModal(mode){
 if(day<1)return;
 stopFishGame();
 townWingModalMode=mode;
 renderTownWingModal();
 $('townWingP').style.display='flex';
}
function closeTownWingModal(){
 stopFishGame();
 $('townWingP').style.display='none';
 townWingModalMode=null;
}

function startFishingCast(){
 const w=ensureTownWings(),lm=landmarkBonuses(),maxStam=3+(lm.westStaminaBonus||0);
 if(!sandboxSession&&w.westUsed>=maxStam){toast('今日西側探索體力已用完（可升級「星露棧橋與博物館」增加體力）。');return;}
 stopFishGame();
 fishGame.active=true;fishGame.pos=12;fishGame.dir=1;fishGame.lastTs=0;
 renderTownWingModal();
 if(typeof requestAnimationFrame==='function'){
  const step=ts=>{
   if(!fishGame.active)return;
   const dt=fishGame.lastTs?Math.min(48,ts-fishGame.lastTs):16;
   fishGame.lastTs=ts;
   fishGame.pos+=fishGame.dir*dt*0.135;
   if(fishGame.pos>=96){fishGame.pos=96;fishGame.dir=-1;}
   if(fishGame.pos<=4){fishGame.pos=4;fishGame.dir=1;}
   const bob=document.querySelector('#townWingBody .fish-bobber');
   if(bob)bob.style.left=fishGame.pos.toFixed(1)+'%';
   fishGame.raf=requestAnimationFrame(step);
  };
  fishGame.raf=requestAnimationFrame(step);
 }
}

function pullFishingLine(){
 if(!fishGame.active)return;
 const p=fishGame.pos;
 stopFishGame();
 const quality=Math.abs(p-50)<=8?'perfect':Math.abs(p-50)<=22?'good':'normal';
 doWestFish(quality);
}

function doWestFish(quality='normal'){
 const w=ensureTownWings(),lm=landmarkBonuses(),maxStam=3+(lm.westStaminaBonus||0);
 if(!sandboxSession&&w.westUsed>=maxStam){toast('今日西側探索體力已用完（可升級「星露棧橋與博物館」增加體力）。');return;}
 if(!sandboxSession)w.westUsed++;
 w.westFished=(w.westFished||0)+1;
 const si=townVisualSeason(),night=isSandboxNight();
 const pool=FISH_CATALOG.filter(f=>f.season===si&&(f.night===night||Math.random()<.28));
 const qBonus=quality==='perfect'?.35:quality==='good'?.12:0;
 const qMult=quality==='perfect'?1.4:quality==='good'?1.15:1;
 const roll=Math.random()+lm.westRareBonus*.35+qBonus;
 const targetR=roll>.94?2:roll>.58?1:0;
 const cands=pool.filter(f=>f.rarity===targetR);
 const fish=(cands.length?cands:pool)[rnd((cands.length?cands:pool).length)]||FISH_CATALOG[0];
 const reward=Math.round(fish.gold*lm.westRewardMult*qMult);
 coins+=reward;
 const reg=registerMuseumItem('fish',fish.id);
 let extra='';
 if(quality==='perfect'||fish.rarity>=2||Math.random()<.22){
  if(Math.random()<.5){const e=ELEMENT_IDS[rnd(ELEMENT_IDS.length)];seedStock[e]=(seedStock[e]||0)+1;extra='＋1 顆'+ELEMENTS[e].name+'花種';}
  else{if(!kitchen)kitchen=freshKitchen();kitchen.bag.push({k:'o',t:Math.min(3,1+fish.rarity)});extra='＋高階鮮魚食材入廚房';}
 }
 const qTag=quality==='perfect'?'🌟 完美起竿！':quality==='good'?'✨ 漂亮起竿！':'🎣 成功起竿！';
 lastFishBanner={icon:fish.icon,name:fish.name,qTag,reward,isNew:reg.isNew,extra,rarity:fish.rarity};
 workshopToolSound('upgrade');
 toast(qTag+' '+fish.icon+'「'+fish.name+'」💰'+reward+(reg.isNew?'（✨ 博物館新登錄！）':'')+(extra?' · '+extra:''));
 renderTownWingModal();renderTownWing();render();if($('townP').style.display==='flex')renderTown();saveNow();
}

function digRuinCell(idx){
 const w=ensureTownWings(),lm=landmarkBonuses(),maxStam=3+(lm.westStaminaBonus||0);
 const cell=w.digBoard?.[idx];
 if(!cell||cell.open)return;
 const freeAvail=sandboxSession||w.westUsed<maxStam;
 if(freeAvail){
  if(!sandboxSession)w.westUsed++;
 }else{
  if(w.westExtra>=2){toast('今日免費體力與加場挖掘次數皆已用完！');return;}
  if(coins<80){toast('金幣不足 80，無法加場挖掘。');return;}
  coins-=80;w.westExtra++;
 }
 cell.open=true;
 if(cell.t==='relic'){
  const roll=Math.random()+lm.westRareBonus*.38;
  const targetR=roll>.90?2:roll>.52?1:0;
  const cands=RELIC_CATALOG.filter(r=>r.rarity===targetR);
  const relic=(cands.length?cands:RELIC_CATALOG)[rnd((cands.length?cands:RELIC_CATALOG).length)];
  const reward=Math.round(relic.gold*lm.westRewardMult);
  coins+=reward;
  const reg=registerMuseumItem('relic',relic.id);
  cell.v={icon:relic.icon,label:relic.name,sub:'💰'+reward+(reg.isNew?' NEW':'')};
  toast(relic.icon+' 挖出古物「'+relic.name+'」！鑑定獎金 💰'+reward+(reg.isNew?'（✨ 博物館新收藏！）':''));
 }else if(cell.t==='seed'){
  const e=ELEMENT_IDS[rnd(ELEMENT_IDS.length)];
  seedStock[e]=(seedStock[e]||0)+1;
  cell.v={icon:'🌱',label:ELEMENTS[e].name+'花種',sub:'入溫室庫存'};
  toast('🌱 遺跡石縫裡找到 1 顆「'+ELEMENTS[e].name+'花種」！');
 }else if(cell.t==='chest'){
  const g=Math.round((110+rnd(60))*lm.westRewardMult);
  coins+=g;bag.push({k:'u'});
  cell.v={icon:'🎁',label:'古代寶匣',sub:'💰'+g+'＋升級'};
  toast('🎁 挖到古代寶匣！獲得 💰'+g+'＋礦石升級道具！');
 }else{
  const g=Math.round((45+rnd(45))*lm.westRewardMult);
  coins+=g;
  cell.v={icon:'🪙',label:'古幣堆',sub:'💰'+g};
  toast('🪙 挖出埋藏古幣 💰'+g+'！');
 }
 if(w.digBoard.every(c=>c.open)){coins+=180;toast('🏆 今日 3×3 遺跡全數發掘完畢！獲得考古清場獎勵 +180💰！');}
 workshopToolSound('upgrade');
 renderTownWingModal();renderTownWing();render();if($('townP').style.display==='flex')renderTown();saveNow();
}

// Keep backward-compatible doWestExcavate for tests & quick-dig
function doWestExcavate(paid=false){
 const w=ensureTownWings();
 const idx=w.digBoard.findIndex(c=>!c.open);
 if(idx>=0){digRuinCell(idx);return;}
 toast('今日 3×3 遺跡已全數發掘完畢，明天會發現全新遺跡！');
}

function buyCaravanItem(itemId){
 const w=ensureTownWings(),lm=landmarkBonuses(),theme=CARAVAN_THEMES[(day-1)%CARAVAN_THEMES.length];
 const items=theme.items.slice(0,3+(lm.eastExtraSlots||0));
 const it=items.find(x=>x.id===itemId);
 if(!it||w.eastBought.includes(itemId))return;
 const price=Math.max(10,Math.round(it.cost*(1-(lm.eastDiscount||0))));
 if(!sandboxSession&&coins<price){toast('金幣不足 '+price+'。');return;}
 if(!sandboxSession)coins-=price;
 w.eastBought.push(itemId);
 it.grant();
 workshopToolSound('upgrade');
 toast(it.icon+' 已購入旅商特產「'+it.name+'」！');
 renderTownWingModal();render();if($('townP').style.display==='flex')renderTown();saveNow();
}

function doCaravanBarter(){
 const w=ensureTownWings();
 if(!sandboxSession&&w.barterDone){toast('今日已經完成以物易物，明天商隊會帶來新貨！');return;}
 let sourceLabel='';
 if(bag.length>0){const removed=bag.pop();sourceLabel='冶煉道具箱物資';}
 else if(kitchen&&kitchen.bag.length>0){kitchen.bag.pop();sourceLabel='廚房道具箱物資';}
 else{
  const seedKey=ELEMENT_IDS.find(e=>(seedStock[e]||0)>0);
  if(seedKey){seedStock[seedKey]--;sourceLabel=ELEMENTS[seedKey].name+'花種';}
 }
 if(!sourceLabel){toast('道具箱與溫室種子目前為空，沒有可交換的多餘物資。');return;}
 w.barterDone=true;
 const goldGain=140+rnd(60);
 coins+=goldGain;
 const e=ELEMENT_IDS[rnd(ELEMENT_IDS.length)];
 bag.push({k:'ess',element:e});
 addWorkshopFever('forge',30);addWorkshopFever('kitchen',30);
 workshopToolSound('upgrade');
 toast('🤝 以「'+sourceLabel+'」完成旅商交換！獲得 💰'+goldGain+'＋'+ELEMENTS[e].name+'精華＋雙狂熱 +30%！');
 renderTownWingModal();render();if($('townP').style.display==='flex')renderTown();saveNow();
}

function giftTownRegular(regId){
 const w=ensureTownWings(),lm=landmarkBonuses(),r=TOWN_REGULARS.find(x=>x.id===regId);
 if(!r)return;
 const cur=w.regulars[regId]||0;
 if(cur>=5){toast(r.name+' 好感度已達滿心！');return;}
 if(!sandboxSession&&w.regularGifted.includes(regId)){toast('今天已經招待過 '+r.name+' 了，明天再來吧！');return;}
 if(!sandboxSession&&coins<r.giftCost){toast('金幣不足 '+r.giftCost+'，無法招待 '+r.name+'。');return;}
 if(!sandboxSession)coins-=r.giftCost;
 w.regularGifted.push(regId);
 w.regulars[regId]=Math.min(5,cur+(lm.eastHeartStep||1));
 const qIdx=w.regulars[regId]>=5?2:w.regulars[regId]>=3?1:0;
 workshopToolSound('upgrade');
 toast(r.icon+' '+r.name+' 好感度升至 ❤️'+w.regulars[regId]+'/5：「'+r.quotes[qIdx]+'」');
 renderTownWingModal();render();if($('townP').style.display==='flex')renderTown();saveNow();
}

function claimRegularQuest(regId){
 const w=ensureTownWings(),lm=landmarkBonuses(),r=TOWN_REGULARS.find(x=>x.id===regId);
 if(!r||!r.quest||w.regularQuestDone.includes(regId))return;
 if(!r.quest.check()){toast('尚未達成「'+r.name+'」的今日委託條件！');return;}
 w.regularQuestDone.push(regId);
 const cur=w.regulars[regId]||0;
 w.regulars[regId]=Math.min(5,cur+(lm.eastHeartStep||1));
 coins+=r.quest.rewardGold;
 workshopToolSound('upgrade');
 toast('🌟 完成 '+r.name+' 今日委託！免費提升好感至 ❤️'+w.regulars[regId]+'/5 並獲得謝禮 💰'+r.quest.rewardGold+'！');
 renderTownWingModal();render();if($('townP').style.display==='flex')renderTown();saveNow();
}

function dispatchTradeShipment(routeId){
 const w=ensureTownWings(),eastLv=buildingLandmarkTier('east_post'),rt=TRADE_ROUTES.find(x=>x.id===routeId);
 if(!rt||w.shipment)return;
 if(eastLv<rt.minLv){toast('需要東側「皇家旅商驛站」達 Lv '+rt.minLv+' 才能開啟此航線。');return;}
 if(!sandboxSession&&coins<rt.cost){toast('金幣不足 '+rt.cost+'。');return;}
 if(!sandboxSession)coins-=rt.cost;
 w.shipment={id:rt.id,cost:rt.cost,returnDay:day+rt.days};
 workshopToolSound('upgrade');
 toast(rt.icon+' 已派遣「'+rt.name+'」出發！第 '+w.shipment.returnDay+' 天可回東側驛站領取暴利回報！');
 renderTownWingModal();renderTownWing();render();if($('townP').style.display==='flex')renderTown();saveNow();
}

function claimTradeShipment(){
 const w=ensureTownWings(),lm=landmarkBonuses();
 if(!w.shipment||day<w.shipment.returnDay)return;
 const rt=TRADE_ROUTES.find(x=>x.id===w.shipment.id)||TRADE_ROUTES[0];
 const payout=Math.round(w.shipment.cost*rt.baseMult*(lm.eastTradeMult||1));
 coins+=payout;
 let bonusTxt='';
 if(rt.id==='local'){bag.push({k:'u'});bonusTxt='＋礦石升級道具';}
 else if(rt.id==='harbor'){const e=ELEMENT_IDS[rnd(ELEMENT_IDS.length)];seedStock[e]=(seedStock[e]||0)+2;bonusTxt='＋2 顆'+ELEMENTS[e].name+'花種';}
 else{bag.push({k:'ess',element:ELEMENT_IDS[rnd(ELEMENT_IDS.length)]});pendingChests++;bonusTxt='＋元素精華＋營業寶箱 ×1';}
 w.shipment=null;
 workshopToolSound('upgrade');
 toast('🎉 跨城商隊滿載而歸！獲得 💰'+payout+bonusTxt+'！');
 renderTownWingModal();renderTownWing();render();if($('townP').style.display==='flex')renderTown();saveNow();
}

function setMuseumTab(t){museumTab=t;renderTownWingModal();}

function renderTownWingModal(){
 const title=$('townWingTitle'),body=$('townWingBody');
 if(!title||!body||!townWingModalMode)return;
 const w=ensureTownWings(),lm=landmarkBonuses(),mus=loadTownMuseum();
 const westMax=3+(lm.westStaminaBonus||0),westRem=Math.max(0,westMax-w.westUsed);
 const si=townVisualSeason(),night=isSandboxNight();

 if(townWingModalMode==='fishing'){
  title.textContent='🎣 星露釣魚棧橋';
  const curFish=FISH_CATALOG.filter(f=>f.season===si);
  const banner=lastFishBanner?'<div class="tw-catch-banner"><span>'+lastFishBanner.icon+'</span><div><b>'+lastFishBanner.qTag+' '+lastFishBanner.name+' '+'★'.repeat(lastFishBanner.rarity+1)+'</b><small>獲得 💰'+lastFishBanner.reward+(lastFishBanner.isNew?' · ✨ 博物館新登錄！':'')+(lastFishBanner.extra?' · '+lastFishBanner.extra:'')+'</small></div></div>':'';
  const miniGame=fishGame.active
   ?'<div class="fish-meter-box"><p class="fish-hint">趁浮標滑進 <b>金色中心</b> 時點擊起竿，可觸發「🌟 完美起竿」（金幣 ×1.4＋高機率稀有魚）！</p><div class="fish-track"><span class="fish-zone-good"></span><span class="fish-zone-perfect"></span><span class="fish-bobber" style="left:'+fishGame.pos+'%">🎣</span></div><button type="button" class="tw-big-btn is-gold" onclick="pullFishingLine()">⚡ 立即拉竿起魚！</button></div>'
   :'<div class="tw-btn-row"><button type="button" class="tw-big-btn" onclick="startFishingCast()" '+(!sandboxSession&&westRem<=0?'disabled':'')+'>🎣 精準拋竿（小遊戲）</button><button type="button" class="tw-big-btn is-gold" onclick="doWestFish(\'normal\')" '+(!sandboxSession&&westRem<=0?'disabled':'')+'>⚡ 快速拋竿（-1 體力）</button></div>';
  body.innerHTML='<p class="tc-intro">今日探索體力 <b>'+westRem+' / '+westMax+'</b> · 目前環境：'+SEASONS[si].icon+' '+SEASONS[si].name+(night?' 🌙夜晚':' ☀白天')+' · 持有 💰'+(sandboxSession?'∞':coins)+'</p>'
   +banner+miniGame
   +'<h4 class="tw-sub">本季出沒魚種</h4><div class="tw-grid">'
   +curFish.map(f=>{const got=mus.fish.includes(f.id);return '<div class="tw-item'+(got?' is-got':'')+'"><span>'+(got?f.icon:'❔')+'</span><b>'+(got?f.name:'未知魚種')+'</b><small>'+(f.night?'🌙 夜晚':'☀ 白天')+' · '+'★'.repeat(f.rarity+1)+'</small></div>';}).join('')
   +'</div>';
 }else if(townWingModalMode==='excavate'){
  title.textContent='⛏ 古物遺跡探勘（3×3）';
  const opened=w.digBoard.filter(c=>c.open).length;
  body.innerHTML='<p class="tc-intro">今日免費體力 <b>'+westRem+' / '+westMax+'</b> · 加場挖掘 <b>'+(2-w.westExtra)+'/2</b>（80💰）· 今日進度 <b>'+opened+'/9</b>（全清 +180💰）</p>'
   +'<div class="dig-grid">'
   +w.digBoard.map((c,i)=>c.open
    ?'<div class="dig-cell is-open"><span>'+(c.v?.icon||'✨')+'</span><b>'+(c.v?.label||'已發掘')+'</b><small>'+(c.v?.sub||'')+'</small></div>'
    :'<button type="button" class="dig-cell" onclick="digRuinCell('+i+')" '+(!sandboxSession&&westRem<=0&&(w.westExtra>=2||coins<80)?'disabled':'')+'><span>🪨</span><b>點擊探勘</b><small>'+(westRem>0||sandboxSession?'免費體力':'💰80 加場')+'</small></button>'
   ).join('')
   +'</div>'
   +'<p class="tc-intro" style="margin-top:8px">博物館古物進度：<b>'+mus.relics.length+' / '+RELIC_CATALOG.length+'</b></p>';
 }else if(townWingModalMode==='museum'){
  const tot=mus.fish.length+mus.relics.length,maxTot=FISH_CATALOG.length+RELIC_CATALOG.length,bonusPct=Math.min(14,Math.floor(tot/4)*2);
  title.textContent='🏛 星露博物小屋';
  const tabs='<div class="tc-tabs"><button type="button" aria-pressed="'+(museumTab==='fish')+'" onclick="setMuseumTab(\'fish\')">🐟 魚類 ('+mus.fish.length+'/'+FISH_CATALOG.length+')</button><button type="button" aria-pressed="'+(museumTab==='relic')+'" onclick="setMuseumTab(\'relic\')">🏺 古物 ('+mus.relics.length+'/'+RELIC_CATALOG.length+')</button><button type="button" aria-pressed="'+(museumTab==='milestone')+'" onclick="setMuseumTab(\'milestone\')">🏆 里程碑</button></div>';
  let content='';
  if(museumTab==='fish'){
   content='<div class="tw-grid">'+FISH_CATALOG.map(f=>{const got=mus.fish.includes(f.id);return '<div class="tw-item'+(got?' is-got':'')+'"><span>'+(got?f.icon:'❔')+'</span><b>'+(got?f.name:'？？？')+'</b><small>'+SEASONS[f.season].icon+(f.night?'🌙 夜晚':'☀ 白天')+' · '+'★'.repeat(f.rarity+1)+'</small></div>';}).join('')+'</div>';
  }else if(museumTab==='relic'){
   content='<div class="tw-list">'+RELIC_CATALOG.map(r=>{const got=mus.relics.includes(r.id);return '<div class="tw-row'+(got?' is-got-row':'')+'"><span class="tw-ico">'+(got?r.icon:'❔')+'</span><div class="tw-info"><b>'+(got?r.name:'未出土古物')+' <small class="tw-role">'+'★'.repeat(r.rarity+1)+'</small></b><small>'+(got?r.desc:'在西側古物遺跡營地探勘有機會出土。')+'</small></div></div>';}).join('')+'</div>';
  }else{
   content='<div class="tw-list">'+[4,8,12,16,20,24,28].map(n=>{const done=tot>=n;return '<div class="tw-row'+(done?' is-got-row':'')+'"><span class="tw-ico">'+(done?'🏆':'🔒')+'</span><div class="tw-info"><b>館藏達 '+n+' 件</b><small>跨局永久效果：冶煉廠與餐廳全成交售價 +'+(n/2)+'%</small></div></div>';}).join('')+'</div>';
  }
  body.innerHTML='<div class="lm-summary"><div class="lm-summary-top"><span>🏛 跨局永久館藏 <b>'+tot+' / '+maxTot+'</b></span><span class="lm-wallet">全工坊 +'+bonusPct+'% 售價</span></div><div class="lm-progress"><i style="width:'+Math.round(tot/maxTot*100)+'%"></i></div><small>魚類與古物皆會跨局永久保存，收集越多永久收益越高！</small></div>'
   +'<button type="button" class="tw-big-btn is-gold" onclick="closeTownWingModal();openTownChronicle(\'landmarks\')">🏛 升級「星露棧橋與博物館」大工程（目前 Lv '+buildingLandmarkTier('west_camp')+'/3）</button>'
   +tabs+content;
 }else if(townWingModalMode==='caravan'){
  const theme=CARAVAN_THEMES[(day-1)%CARAVAN_THEMES.length],items=theme.items.slice(0,3+(lm.eastExtraSlots||0)),disc=Math.round((lm.eastDiscount||0)*100);
  const barterCount=bag.length+(kitchen?kitchen.bag.length:0)+ELEMENT_IDS.reduce((s,e)=>s+(seedStock[e]||0),0);
  title.textContent=theme.icon+' '+theme.name;
  body.innerHTML='<p class="tc-intro">'+theme.desc+(disc?' · 🏛 驛站折扣 -'+disc+'%':'')+' · 持有 💰'+(sandboxSession?'∞':coins)+'</p><div class="tw-list">'
   +items.map(it=>{const sold=w.eastBought.includes(it.id),price=Math.max(10,Math.round(it.cost*(1-(lm.eastDiscount||0))));return '<div class="tw-row"><span class="tw-ico">'+it.icon+'</span><div class="tw-info"><b>'+it.name+(it.rare?' ✦':'')+'</b><small>'+it.desc+'</small></div><button type="button" class="tw-act" onclick="buyCaravanItem(\''+it.id+'\')" '+(sold||(!sandboxSession&&coins<price)?'disabled':'')+'>'+(sold?'已售出':'💰'+price)+'</button></div>';}).join('')
   +'</div>'
   +'<div class="tw-barter-box"><div><b>🤝 旅商以物易物（每日 1 次）</b><small>交付 1 件多餘道具箱物資或花種（目前可用：'+barterCount+' 件），換取 💰140～200＋隨機元素精華＋雙狂熱 +30%！</small></div><button type="button" class="tw-act" onclick="doCaravanBarter()" '+(w.barterDone||barterCount<=0?'disabled':'')+'>'+(w.barterDone?'今日已換':'立即交換')+'</button></div>'
   +'<button type="button" class="tw-link-btn" onclick="closeTownWingModal();openTownChronicle(\'landmarks\')">🏛 升級「皇家旅商驛站」解鎖稀有格與折扣（Lv '+buildingLandmarkTier('east_post')+'/3）</button>';
 }else if(townWingModalMode==='tavern'){
  title.textContent='🍺 旅人酒館與常客名冊';
  const qIds=[TOWN_REGULARS[(day-1)%TOWN_REGULARS.length].id,TOWN_REGULARS[(day+2)%TOWN_REGULARS.length].id];
  body.innerHTML='<p class="tc-intro">招待常客或完成「今日常客委託」免費升好感（達 ❤️3 與 ❤️5 解鎖本局常駐祝福）'+(lm.eastHeartStep>1?' · 🏛 驛站雙倍好感生效中！':'')+'</p><div class="tw-list">'
   +TOWN_REGULARS.map(r=>{
    const lv=w.regulars[r.id]||0,gifted=w.regularGifted.includes(r.id),qIdx=lv>=5?2:lv>=3?1:0;
    const hasQ=qIds.includes(r.id),qDone=w.regularQuestDone.includes(r.id),qReady=hasQ&&!qDone&&r.quest.check();
    const qBlock=hasQ?'<div class="tw-quest-bar"><span>📜 今日委託：'+r.quest.text+'（免費升心＋💰'+r.quest.rewardGold+'）</span><button type="button" class="tw-qbtn" onclick="claimRegularQuest(\''+r.id+'\')" '+(qDone||!qReady?'disabled':'')+'>'+(qDone?'已領取 ✓':qReady?'領取謝禮 ✦':'進行中')+'</button></div>':'';
    return '<div class="tw-reg-card"><div class="tw-row"><span class="tw-ico">'+r.icon+'</span><div class="tw-info"><b>'+r.name+' <small class="tw-role">'+r.role+'</small></b><div class="tw-hearts">'+'❤️'.repeat(lv)+'🤍'.repeat(5-lv)+'</div><small class="tw-quote">「'+r.quotes[qIdx]+'」</small><small>'+r.perk+'</small></div><button type="button" class="tw-act" onclick="giftTownRegular(\''+r.id+'\')" '+(lv>=5||(!sandboxSession&&(gifted||coins<r.giftCost))?'disabled':'')+'>'+(lv>=5?'滿心':gifted?'今日已招待':'🍻 💰'+r.giftCost)+'</button></div>'+qBlock+'</div>';
   }).join('')
   +'</div>';
 }else if(townWingModalMode==='depot'){
  const eastLv=buildingLandmarkTier('east_post');
  title.textContent='📦 跨城貿易商隊站';
  if(w.shipment){
   const rt=TRADE_ROUTES.find(x=>x.id===w.shipment.id)||TRADE_ROUTES[0],ready=day>=w.shipment.returnDay;
   body.innerHTML='<div class="lm-summary"><div class="lm-summary-top"><span>'+rt.icon+' '+rt.name+'（投入 💰'+w.shipment.cost+'）</span><span class="lm-wallet">'+(ready?'✨ 已返航':'第 '+w.shipment.returnDay+' 天返航')+'</span></div><small>'+(ready?'商隊已滿載珍寶與收益回到東側驛站，快來領取！':'商隊正在跨國貿易途中，隔日即可回來領取高倍數回報！')+'</small></div>'
    +'<button type="button" class="tw-big-btn is-gold" onclick="claimTradeShipment()" '+(ready?'':'disabled')+'>'+(ready?'🎉 領取商隊收益與物資':'⏳ 航行中（還剩 '+(w.shipment.returnDay-day)+' 天）')+'</button>';
  }else{
   body.innerHTML='<p class="tc-intro">投資跨城貿易航線，隔天獲得高倍率金幣與稀有工坊物資！持有 💰'+(sandboxSession?'∞':coins)+'</p><div class="tw-list">'
    +TRADE_ROUTES.map(rt=>{const locked=eastLv<rt.minLv;return '<div class="tw-row"><span class="tw-ico">'+rt.icon+'</span><div class="tw-info"><b>'+rt.name+'</b><small>'+rt.desc+(locked?'（需驛站 Lv '+rt.minLv+'）':'')+'</small></div><button type="button" class="tw-act" onclick="dispatchTradeShipment(\''+rt.id+'\')" '+(locked||(!sandboxSession&&coins<rt.cost)?'disabled':'')+'>'+(locked?'🔒 Lv'+rt.minLv:'派遣 💰'+rt.cost)+'</button></div>';}).join('')
    +'</div>';
  }
 }
}

// Horizontal swipe gesture on #townMap (ignored during Architect decoration editing)
(function installTownSwipe(){
 const map=$('townMap');
 if(!map||typeof map.addEventListener!=='function')return;
 let sx=0,sy=0,tracking=false;
 map.addEventListener('pointerdown',e=>{
  if(day<1||!expandedGameEnabled()||architect?.active)return;
  if(e.target.closest('button,input,select'))return;
  sx=e.clientX;sy=e.clientY;tracking=true;
 });
 map.addEventListener('pointerup',e=>{
  if(!tracking)return;tracking=false;
  if(architect?.active)return;
  const dx=e.clientX-sx,dy=e.clientY-sy;
  if(Math.abs(dx)<48||Math.abs(dx)<Math.abs(dy)*1.3)return;
  if(dx>0){if(townZone==='east')setTownZone('center');else if(townZone==='center')setTownZone('west');}
  else{if(townZone==='west')setTownZone('center');else if(townZone==='center')setTownZone('east');}
 });
 map.addEventListener('pointercancel',()=>{tracking=false;});
})();
