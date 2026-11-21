/* ==========================================================================
   West & East Town Outskirts Wings:
   - West: Star-Dew Creek Fishing, Ancient Relic Excavation & Permanent Museum
   - East: Traveling Merchant Caravan, Regulars' Tavern Affinity & Trade Depot
   - Navigation: Road Arrow Buttons, Zone Pill Bar, & Left/Right Swipe Gesture
   ========================================================================== */

const TOWN_WING_ART={"west_0":"assets/town/west_0.e8f9bd50c935.jpg","west_1":"assets/town/west_1.2367ad9d0d8c.jpg","west_2":"assets/town/west_2.50a17eb52210.jpg","west_3":"assets/town/west_3.6fc70687a8a8.jpg","west_4":"assets/town/west_4.eb580b097f0a.jpg","west_5":"assets/town/west_5.06707389c570.jpg","west_6":"assets/town/west_6.2e6f3b06e3ad.jpg","west_7":"assets/town/west_7.b80182ca90e7.jpg","east_0":"assets/town/east_0.842d522abe83.jpg","east_1":"assets/town/east_1.ca65481bc645.jpg","east_2":"assets/town/east_2.0dbb9e420a1d.jpg","east_3":"assets/town/east_3.ca3a7fdf7196.jpg","east_4":"assets/town/east_4.97d746089428.jpg","east_5":"assets/town/east_5.dc2fe0b90505.jpg","east_6":"assets/town/east_6.cd4c103cb4bb.jpg","east_7":"assets/town/east_7.2893eca13779.jpg"};

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
 {id:'renn',icon:'⚔',name:'雷恩團長',role:'遠征軍先鋒',giftCost:110,quote:'好刀配好菜，今晚又能再推進一關！',perk:'Lv3：遠征攻擊 +6% · Lv5：遠征攻防 +12%'},
 {id:'elena',icon:'👑',name:'艾琳食評家',role:'皇家美食評論',giftCost:110,quote:'這家暖爐餐廳的火候，連王城大廚都讚嘆。',perk:'Lv3：餐廳售價 +6% · Lv5：餐廳售價 +12%'},
 {id:'thorin',icon:'⚒',name:'托爾老鐵匠',role:'退隱神匠',giftCost:110,quote:'聽這打鐵聲，我就知道你的手藝又精進了！',perk:'Lv3：冶煉售價 +6% · Lv5：冶煉售價 +12%'},
 {id:'luna',icon:'🔮',name:'露娜占星師',role:'星頁館常客',giftCost:100,quote:'星象顯示，今天會迎來一場大豐收呢。',perk:'Lv3：雙工坊售價 +4% · Lv5：雙工坊售價 +8%'},
 {id:'parker',icon:'🌿',name:'帕克花藝師',role:'溫室愛好者',giftCost:100,quote:'有空去西邊溪畔走走，說不定會撿到古物喔！',perk:'Lv3：遠征防禦 +6% · Lv5：遠征防禦 +12%'},
 {id:'bard',icon:'🎸',name:'巴德吟遊詩人',role:'酒館駐唱',giftCost:95,quote:'請我喝一杯麥酒，我就把你的工坊寫進史詩！',perk:'Lv3：每日贈送 +15% 雙狂熱 · Lv5：全工坊 +6%'}
];

const TRADE_ROUTES=[
 {id:'local',icon:'🐴',name:'鄰鎮商隊線',cost:200,days:1,baseMult:1.45,minLv:0,desc:'隔天返航，穩定賺取約 1.45 倍金幣＋隨機工坊物資。'},
 {id:'harbor',icon:'⛵',name:'海港遠洋線',cost:500,days:1,baseMult:1.58,minLv:1,desc:'隔天返航，賺取約 1.58 倍金幣＋元素花種或升級道具。'},
 {id:'imperial',icon:'👑',name:'皇都黃金商隊',cost:1000,days:2,baseMult:1.85,minLv:2,desc:'2 天後返航，賺取約 1.85 倍暴利＋稀有元素精華與寶箱！'}
];

const TOWN_MUSEUM_KEY='forgeTownMuseumV1';
let townZone='center',townWingModalMode=null;

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

function ensureTownWings(){
 const m=ensureWorkshopMomentum();
 if(!m.wings)m.wings=freshTownWings();
 const w=m.wings;
 if(day>0&&w.westDay!==day){w.westDay=day;w.westUsed=0;w.westExtra=0;}
 if(day>0&&w.eastDay!==day){w.eastDay=day;w.eastBought=[];}
 if(day>0&&w.regularDay!==day){
  w.regularDay=day;w.regularGifted=[];
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
  layer.innerHTML='<img class="town-wing-bg" src="'+bgUrl+'" alt="西側星露溪畔營地" decoding="async">'
   +'<div class="town-wing-fx is-west" aria-hidden="true"><span class="wf-foam"></span><span class="wf-foam f2"></span></div>'
   +'<button type="button" class="town-wing-spot" style="left:6%;top:17%;width:52%;height:24%" onclick="openTownWingModal(\'excavate\')"><span class="tw-plaque">⛏ 古物遺跡營地<small>體力 '+westRem+'/'+westMax+'</small></span></button>'
   +'<button type="button" class="town-wing-spot" style="left:16%;top:50%;width:42%;height:22%" onclick="openTownWingModal(\'fishing\')"><span class="tw-plaque">🎣 星露釣魚棧橋<small>'+(night?'🌙 夜間限定魚群':'☀ 白天溪畔魚群')+'</small></span></button>'
   +'<button type="button" class="town-wing-spot" style="left:55%;top:55%;width:41%;height:22%" onclick="openTownWingModal(\'museum\')"><span class="tw-plaque">🏛 星露博物小屋<small>大工程 Lv '+westLv+'/3</small></span></button>'
   +'<button type="button" class="town-road-arrow is-east is-return" onclick="setTownZone(\'center\')" aria-label="返回主城鎮"><span>返回城鎮</span>▶</button>';
 }else{
  const theme=CARAVAN_THEMES[(day-1)%CARAVAN_THEMES.length];
  layer.innerHTML='<img class="town-wing-bg" src="'+bgUrl+'" alt="東側旅商驛站" decoding="async">'
   +'<div class="town-wing-fx is-east" aria-hidden="true"></div>'
   +'<button type="button" class="town-wing-spot" style="left:50%;top:19%;width:44%;height:22%" onclick="openTownWingModal(\'caravan\')"><span class="tw-plaque">'+theme.icon+' '+theme.name+'<small>大工程 Lv '+eastLv+'/3</small></span></button>'
   +'<button type="button" class="town-wing-spot" style="left:6%;top:27%;width:35%;height:19%" onclick="openTownWingModal(\'depot\')"><span class="tw-plaque">📦 跨城商隊站<small>'+(shipReady?'✨ 商隊已返航！':w.shipment?'🚢 航行中':'投資賺翻倍')+'</small></span></button>'
   +'<button type="button" class="town-wing-spot" style="left:56%;top:55%;width:42%;height:26%" onclick="openTownWingModal(\'tavern\')"><span class="tw-plaque">🍺 旅人常客酒館<small>提升好感度與祝福</small></span></button>'
   +'<button type="button" class="town-road-arrow is-west is-return" onclick="setTownZone(\'center\')" aria-label="返回主城鎮">◀<span>返回城鎮</span></button>';
 }
}

function openTownWingModal(mode){
 if(day<1)return;
 townWingModalMode=mode;
 renderTownWingModal();
 $('townWingP').style.display='flex';
}
function closeTownWingModal(){
 $('townWingP').style.display='none';
 townWingModalMode=null;
}

function doWestFish(){
 const w=ensureTownWings(),lm=landmarkBonuses(),maxStam=3+(lm.westStaminaBonus||0);
 if(!sandboxSession&&w.westUsed>=maxStam){toast('今日西側探索體力已用完（可升級「星露棧橋與博物館」增加體力）。');return;}
 if(!sandboxSession)w.westUsed++;
 const si=townVisualSeason(),night=isSandboxNight();
 const pool=FISH_CATALOG.filter(f=>f.season===si&&(f.night===night||Math.random()<.28));
 const roll=Math.random()+lm.westRareBonus*.35;
 const targetR=roll>.94?2:roll>.58?1:0;
 const cands=pool.filter(f=>f.rarity===targetR);
 const fish=(cands.length?cands:pool)[rnd((cands.length?cands:pool).length)]||FISH_CATALOG[0];
 const reward=Math.round(fish.gold*lm.westRewardMult);
 coins+=reward;
 const reg=registerMuseumItem('fish',fish.id);
 let extra='';
 if(fish.rarity>=2||Math.random()<.22){
  if(Math.random()<.5){const e=ELEMENT_IDS[rnd(ELEMENT_IDS.length)];seedStock[e]=(seedStock[e]||0)+1;extra='，還撈起 1 顆'+ELEMENTS[e].name+'花種！';}
  else{if(!kitchen)kitchen=freshKitchen();kitchen.bag.push({k:'o',t:Math.min(3,1+fish.rarity)});extra='，獲贈高階鮮魚食材入廚房！';}
 }
 workshopToolSound('upgrade');
 toast(fish.icon+' 釣到「'+fish.name+'」！獲得 💰'+reward+(reg.isNew?'（✨ 博物館新登錄！）':'')+extra);
 renderTownWingModal();renderTownWing();render();if($('townP').style.display==='flex')renderTown();saveNow();
}

function doWestExcavate(paid=false){
 const w=ensureTownWings(),lm=landmarkBonuses(),maxStam=3+(lm.westStaminaBonus||0);
 if(paid){
  if(!sandboxSession&&w.westExtra>=2){toast('今日加場挖掘次數已達上限。');return;}
  if(!sandboxSession&&coins<80){toast('金幣不足 80，無法租借額外挖礦工具。');return;}
  if(!sandboxSession){coins-=80;w.westExtra++;}
 }else{
  if(!sandboxSession&&w.westUsed>=maxStam){toast('今日免費探索體力已用完，可花 80💰 加場挖掘！');return;}
  if(!sandboxSession)w.westUsed++;
 }
 const roll=Math.random()+lm.westRareBonus*.38;
 const targetR=roll>.92?2:roll>.54?1:0;
 const cands=RELIC_CATALOG.filter(r=>r.rarity===targetR);
 const relic=(cands.length?cands:RELIC_CATALOG)[rnd((cands.length?cands:RELIC_CATALOG).length)];
 const reward=Math.round(relic.gold*lm.westRewardMult);
 coins+=reward;
 const reg=registerMuseumItem('relic',relic.id);
 workshopToolSound('upgrade');
 toast(relic.icon+' 挖出古物「'+relic.name+'」！鑑定獎金 💰'+reward+(reg.isNew?'（✨ 博物館新收藏！）':''));
 renderTownWingModal();renderTownWing();render();if($('townP').style.display==='flex')renderTown();saveNow();
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
 workshopToolSound('upgrade');
 toast(r.icon+' '+r.name+' 好感度升至 ❤️'+w.regulars[regId]+'/5：「'+r.quote+'」');
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

function renderTownWingModal(){
 const title=$('townWingTitle'),body=$('townWingBody');
 if(!title||!body||!townWingModalMode)return;
 const w=ensureTownWings(),lm=landmarkBonuses(),mus=loadTownMuseum();
 const westMax=3+(lm.westStaminaBonus||0),westRem=Math.max(0,westMax-w.westUsed);
 const si=townVisualSeason(),night=isSandboxNight();

 if(townWingModalMode==='fishing'){
  title.textContent='🎣 星露釣魚棧橋';
  const curFish=FISH_CATALOG.filter(f=>f.season===si);
  body.innerHTML='<p class="tc-intro">今日探索體力 <b>'+westRem+' / '+westMax+'</b> · 目前環境：'+SEASONS[si].icon+' '+SEASONS[si].name+(night?' 🌙夜晚':' ☀白天')+' · 持有 💰'+(sandboxSession?'∞':coins)+'</p>'
   +'<button type="button" class="tw-big-btn" onclick="doWestFish()" '+(!sandboxSession&&westRem<=0?'disabled':'')+'>🎣 拋竿釣魚（消耗 1 體力）</button>'
   +'<h4 class="tw-sub">本季出沒魚種</h4><div class="tw-grid">'
   +curFish.map(f=>{const got=mus.fish.includes(f.id);return '<div class="tw-item'+(got?' is-got':'')+'"><span>'+(got?f.icon:'❔')+'</span><b>'+(got?f.name:'未知魚種')+'</b><small>'+(f.night?'🌙 夜晚':'☀ 白天')+' · '+'★'.repeat(f.rarity+1)+'</small></div>';}).join('')
   +'</div>';
 }else if(townWingModalMode==='excavate'){
  title.textContent='⛏ 古物遺跡營地';
  body.innerHTML='<p class="tc-intro">今日免費探索體力 <b>'+westRem+' / '+westMax+'</b> · 加場挖掘 <b>'+(2-w.westExtra)+'/2</b> · 博物館古物 <b>'+mus.relics.length+'/'+RELIC_CATALOG.length+'</b></p>'
   +'<div class="tw-btn-row"><button type="button" class="tw-big-btn" onclick="doWestExcavate(false)" '+(!sandboxSession&&westRem<=0?'disabled':'')+'>⛏ 免費挖掘（體力 -1）</button>'
   +'<button type="button" class="tw-big-btn is-gold" onclick="doWestExcavate(true)" '+(!sandboxSession&&(w.westExtra>=2||coins<80)?'disabled':'')+'>💰80 加場挖掘</button></div>'
   +'<h4 class="tw-sub">已出土古物收藏</h4><div class="tw-grid">'
   +RELIC_CATALOG.map(r=>{const got=mus.relics.includes(r.id);return '<div class="tw-item'+(got?' is-got':'')+'"><span>'+(got?r.icon:'❔')+'</span><b>'+(got?r.name:'未出土古物')+'</b><small>'+'★'.repeat(r.rarity+1)+'</small></div>';}).join('')
   +'</div>';
 }else if(townWingModalMode==='museum'){
  const tot=mus.fish.length+mus.relics.length,maxTot=FISH_CATALOG.length+RELIC_CATALOG.length,bonusPct=Math.min(14,Math.floor(tot/4)*2);
  title.textContent='🏛 星露博物小屋';
  body.innerHTML='<div class="lm-summary"><div class="lm-summary-top"><span>🏛 跨局永久館藏 <b>'+tot+' / '+maxTot+'</b></span><span class="lm-wallet">全工坊 +'+bonusPct+'% 售價</span></div><div class="lm-progress"><i style="width:'+Math.round(tot/maxTot*100)+'%"></i></div><small>每登錄 4 件魚類或古物，永久獲得全工坊售價 +2%（最高 +14%）！</small></div>'
   +'<button type="button" class="tw-big-btn is-gold" onclick="closeTownWingModal();openTownChronicle(\'landmarks\')">🏛 升級「星露棧橋與博物館」大工程（目前 Lv '+buildingLandmarkTier('west_camp')+'/3）</button>'
   +'<h4 class="tw-sub">🐟 魚類館藏（'+mus.fish.length+'/'+FISH_CATALOG.length+'）</h4><div class="tw-grid">'
   +FISH_CATALOG.map(f=>{const got=mus.fish.includes(f.id);return '<div class="tw-item'+(got?' is-got':'')+'"><span>'+(got?f.icon:'❔')+'</span><b>'+(got?f.name:'？？？')+'</b><small>'+SEASONS[f.season].icon+(f.night?'🌙':'☀')+'</small></div>';}).join('')
   +'</div>';
 }else if(townWingModalMode==='caravan'){
  const theme=CARAVAN_THEMES[(day-1)%CARAVAN_THEMES.length],items=theme.items.slice(0,3+(lm.eastExtraSlots||0)),disc=Math.round((lm.eastDiscount||0)*100);
  title.textContent=theme.icon+' '+theme.name;
  body.innerHTML='<p class="tc-intro">'+theme.desc+(disc?' · 🏛 驛站折扣 -'+disc+'%':'')+' · 持有 💰'+(sandboxSession?'∞':coins)+'</p><div class="tw-list">'
   +items.map(it=>{const sold=w.eastBought.includes(it.id),price=Math.max(10,Math.round(it.cost*(1-(lm.eastDiscount||0))));return '<div class="tw-row"><span class="tw-ico">'+it.icon+'</span><div class="tw-info"><b>'+it.name+(it.rare?' ✦':'')+'</b><small>'+it.desc+'</small></div><button type="button" class="tw-act" onclick="buyCaravanItem(\''+it.id+'\')" '+(sold||(!sandboxSession&&coins<price)?'disabled':'')+'>'+(sold?'已售出':'💰'+price)+'</button></div>';}).join('')
   +'</div><button type="button" class="tw-link-btn" onclick="closeTownWingModal();openTownChronicle(\'landmarks\')">🏛 升級「皇家旅商驛站」解鎖稀有格與折扣（Lv '+buildingLandmarkTier('east_post')+'/3）</button>';
 }else if(townWingModalMode==='tavern'){
  title.textContent='🍺 旅人酒館與常客名冊';
  body.innerHTML='<p class="tc-intro">招待城鎮常客提升好感度（達到 ❤️3 與 ❤️5 解鎖本局強力常駐祝福）'+(lm.eastHeartStep>1?' · 🏛 驛站雙倍好感生效中！':'')+'</p><div class="tw-list">'
   +TOWN_REGULARS.map(r=>{const lv=w.regulars[r.id]||0,gifted=w.regularGifted.includes(r.id);return '<div class="tw-row"><span class="tw-ico">'+r.icon+'</span><div class="tw-info"><b>'+r.name+' <small class="tw-role">'+r.role+'</small></b><div class="tw-hearts">'+'❤️'.repeat(lv)+'🤍'.repeat(5-lv)+'</div><small>'+r.perk+'</small></div><button type="button" class="tw-act" onclick="giftTownRegular(\''+r.id+'\')" '+(lv>=5||(!sandboxSession&&(gifted||coins<r.giftCost))?'disabled':'')+'>'+(lv>=5?'滿心':gifted?'今日已招待':'🍻 💰'+r.giftCost)+'</button></div>';}).join('')
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
