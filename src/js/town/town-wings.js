/* ==========================================================================
   West & East Town Outskirts Wings:
   - West: Interactive Timing-Bar Fishing, 3x3 Ruin Dig Grid & 3-Tab Museum
   - East: Traveling Caravan + Barter, Regulars' Affinity + Daily Quests & Trade Depot
   - Navigation: Road Arrow Buttons, Zone Pill Bar, & Left/Right Swipe Gesture
   ========================================================================== */

const TOWN_WING_ART={"west_0":"assets/town/west_0.0ae9465d4e62.jpg","west_1":"assets/town/west_1.88521da6c69c.jpg","west_2":"assets/town/west_2.380e2a2157ae.jpg","west_3":"assets/town/west_3.e1b896303b80.jpg","west_4":"assets/town/west_4.8ac8eac803bd.jpg","west_5":"assets/town/west_5.ddde06675336.jpg","west_6":"assets/town/west_6.eacc401f7d25.jpg","west_7":"assets/town/west_7.6dffbec24930.jpg","east_0":"assets/town/east_0.6140f77eabf7.jpg","east_1":"assets/town/east_1.362c74d1efac.jpg","east_2":"assets/town/east_2.096f09a54b6c.jpg","east_3":"assets/town/east_3.0a46f761098d.jpg","east_4":"assets/town/east_4.9b2a308c7028.jpg","east_5":"assets/town/east_5.4a903d4c1ca0.jpg","east_6":"assets/town/east_6.2b4909b284ef.jpg","east_7":"assets/town/east_7.2c4bad31e44a.jpg","east_windmill_sails":"assets/town/east_windmill_sails.ca9d356a4f8b.png"};
const TOWN_WING_BUILDING_ART={"west_camp_0":"assets/town/b_west_camp_0.93e31d1901f4.png","west_camp_1":"assets/town/b_west_camp_1.9f7b527e352d.png","west_camp_2":"assets/town/b_west_camp_2.02e8ef46a09f.png","west_camp_3":"assets/town/b_west_camp_3.e38aeb0b5887.png","east_post_0":"assets/town/b_east_post_0.5bac6a60278b.png","east_post_1":"assets/town/b_east_post_1.e1db9a2a4ae3.png","east_post_2":"assets/town/b_east_post_2.f14815eed865.png","east_post_3":"assets/town/b_east_post_3.6cdddcb27135.png"};

const FISH_CATALOG=[
 {id:'spring_trout',icon:'🐟',name:'晨露溪鱒',season:0,night:false,rarity:0,gold:55,desc:'棲息在春季清澈溪流的銀青溪鱒，肉質細嫩甘甜，是暖爐餐廳春季招牌湯品的上選。'},
 {id:'sakura_carp',icon:'🎏',name:'櫻花錦鯉',season:0,night:false,rarity:1,gold:110,desc:'背脊帶著粉嫩櫻花斑紋的稀有錦鯉，常在花瓣飄落水面時躍出溪潭。'},
 {id:'spring_eel',icon:'🐍',name:'星光鰻魚',season:0,night:true,rarity:1,gold:125,desc:'只在春夜出沒的微光青藍長鰻，蒲燒後散發令人回味無窮的焦香。'},
 {id:'moon_koi',icon:'✨',name:'月光神鯉',season:0,night:true,rarity:2,gold:220,desc:'傳說中額頭印有金月紋章的靈魚，在滿月春夜現身，象徵餐廳來年大吉。'},
 {id:'sun_perch',icon:'🐠',name:'珊瑚鱸魚',season:1,night:false,rarity:0,gold:60,desc:'夏日陽光下閃耀橘紅條紋的肥美溪鱸，清蒸或香煎皆風味絕佳。'},
 {id:'summer_crab',icon:'🦀',name:'金殼溪蟹',season:1,night:false,rarity:1,gold:115,desc:'藏身瀑布岩縫的黃金甲殼河蟹，蟹膏飽滿濃郁，深受饕客追捧。'},
 {id:'tide_squid',icon:'🦑',name:'螢光夜魷',season:1,night:true,rarity:1,gold:130,desc:'夏夜裡散發紫藍螢光的神祕溪魷，彈性十足，適合搭配辛香快炒。'},
 {id:'sun_marlin',icon:'🐬',name:'碧海旗魚王',season:1,night:false,rarity:2,gold:230,desc:'沿著盛夏暖流逆游而上的王者旗魚，生魚片與炙燒料理皆為王國頂級饗宴。'},
 {id:'maple_salmon',icon:'🐟',name:'楓紅鮭魚',season:2,night:false,rarity:0,gold:65,desc:'秋季洄游的緋紅鮭魚，油脂豐厚，烤過後香氣四溢。'},
 {id:'amber_catfish',icon:'🐡',name:'琥珀鬍鯰',season:2,night:false,rarity:1,gold:120,desc:'棲息在秋溪深潭底部的金色大鯰魚，燉煮濃湯時能釋放極致鮮味。'},
 {id:'harvest_shrimp',icon:'🦐',name:'秋月金蝦',season:2,night:true,rarity:1,gold:135,desc:'秋夜水面泛金光時現身的晶瑩金蝦，甜脆多汁。'},
 {id:'golden_sturgeon',icon:'👑',name:'黃金皇鱘',season:2,night:true,rarity:2,gold:240,desc:'頭戴天然金冠紋的傳說皇鱘，其魚子醬被譽為王室晚宴的夢幻極品。'},
 {id:'frost_smelt',icon:'🐟',name:'寒冰香魚',season:3,night:false,rarity:0,gold:70,desc:'冬日冰溪中通體剔透的小型香魚，酥炸後外酥內嫩、清香不膩。'},
 {id:'snow_pike',icon:'🦈',name:'雪紋冰梭',season:3,night:false,rarity:1,gold:125,desc:'身披銀白雪紋的敏捷冬魚，肉質緊實彈牙，適合冬季熱鍋料理。'},
 {id:'crystal_jelly',icon:'🪼',name:'星晶水母',season:3,night:true,rarity:1,gold:140,desc:'冬夜冰潭中漂浮的藍晶水母，冰涼爽脆，是罕見的宮廷冷盤珍饈。'},
 {id:'aurora_dragonfish',icon:'🐉',name:'極光冰龍魚',season:3,night:true,rarity:2,gold:260,desc:'只有在寒冬星夜瀑布下才會現身的幻獸級魚王，鱗片折射著極光色彩。'}
];

const RELIC_CATALOG=[
 {id:'old_tongs',icon:'🔧',name:'古代鍛造火鉗',rarity:0,gold:65,desc:'遠古鐵匠留下的青銅火鉗。',perk:'冶煉售價 +2% · 釣魚與挖掘金幣 +4%',fx:{forge:.02,westGold:.04}},
 {id:'clay_pot',icon:'🏺',name:'彩紋陶罐碎片',rarity:0,gold:70,desc:'繪有四季稻穗的古老陶片。',perk:'冶煉售價 +2% · 餐廳售價額外 +2%',fx:{forge:.02,kitchen:.02}},
 {id:'bronze_coin',icon:'🪙',name:'星盾古銀幣',rarity:0,gold:80,desc:'建鎮初期流通的銀質紀念幣。',perk:'冶煉售價 +2% · 東側跨城商隊收益 +6%',fx:{forge:.02,trade:.06}},
 {id:'ember_fossil',icon:'🪨',name:'熔火琥珀化石',rarity:0,gold:85,desc:'封存著微弱地脈火花的礦石。',perk:'冶煉售價 +2% · 遠征攻擊 +3%',fx:{forge:.02,atk:.03}},
 {id:'spice_mortar',icon:'🥣',name:'御廚石臼',rarity:1,gold:130,desc:'散發著百年香料氣息的研磨臼。',perk:'冶煉售價 +2% · 餐廳售價額外 +3%',fx:{forge:.02,kitchen:.03}},
 {id:'rune_tablet',icon:'📜',name:'失落符文石板',rarity:1,gold:145,desc:'刻著遠古鍛造口訣的石碑殘頁。',perk:'冶煉售價 +3.5%（遠古符文共鳴）',fx:{forge:.035}},
 {id:'star_compass',icon:'🧭',name:'星辰航海羅盤',rarity:1,gold:155,desc:'指針永遠指向星輝噴泉的奇物。',perk:'冶煉售價 +2% · 東側跨城商隊收益 +8%',fx:{forge:.02,trade:.08}},
 {id:'crystal_lens',icon:'🔮',name:'觀星水晶鏡片',rarity:1,gold:165,desc:'能映出四季星象的打磨水晶。',perk:'冶煉售價 +2% · 西側稀有魚與古物率 +8%',fx:{forge:.02,rare:.08}},
 {id:'dwarf_hammer',icon:'🔨',name:'矮人秘銀聖錘',rarity:2,gold:250,desc:'傳說中打造神兵的矮人王族鍛錘。',perk:'冶煉售價 +4%（神匠鍛錘加持）',fx:{forge:.04}},
 {id:'royal_cookbook',icon:'📖',name:'失落皇家食譜',rarity:2,gold:260,desc:'記載夢幻料理秘訣的金裝古籍。',perk:'冶煉售價 +2% · 餐廳售價額外 +4%',fx:{forge:.02,kitchen:.04}},
 {id:'dragon_scale',icon:'🐲',name:'赤龍淬火鱗片',rarity:2,gold:280,desc:'觸感溫熱、永不熄滅的龍鱗古物。',perk:'冶煉售價 +2.5% · 遠征攻防 +4%',fx:{forge:.025,atk:.04,def:.04}},
 {id:'crown_seal',icon:'👑',name:'星露古王印璽',rarity:2,gold:320,desc:'象徵城鎮黃金年代的傳奇王印。',perk:'冶煉售價 +3% · 東側旅商全品項 -5% 折扣',fx:{forge:.03,disc:.05}}
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
 {id:'renn',guestId:0,icon:'⚔',name:'雷恩團長',role:'遠征軍先鋒',giftCost:110,stat:'atk',
  quotes:['先來一杯麥酒暖身，明天還得巡守城門呢。','你的武器讓我這支小隊所向披靡！','只要有你在這座小鎮，魔物根本不足為懼！'],
  perk:'Lv3：遠征攻擊 +4% · Lv5：遠征攻擊 +8%',
  quest:{text:'今日在冶煉廠成交至少 1 筆訂單',check:()=>dEarn>0||all>0,rewardGold:90}},
 {id:'freya',guestId:1,icon:'🗡',name:'芙蕾雅騎士',role:'銀翼劍士',giftCost:110,stat:'atk',
  quotes:['出征前總習慣來酒館擦亮長劍。','這把星露鍛造的刃口真是無可挑剔！','能與你並肩守護小鎮，是銀翼騎士團的榮耀！'],
  perk:'Lv3：遠征攻擊 +4% · Lv5：遠征攻擊 +8%',
  quest:{text:'今日進行至少 1 次西側探索',check:()=>ensureTownWings().westUsed>=1,rewardGold:90}},
 {id:'austin',guestId:2,icon:'✨',name:'奧斯汀導師',role:'符文魔導師',giftCost:105,stat:'forge',
  quotes:['你的鍛爐火候裡藏著迷人的魔力流動。','這件附魔武器的共鳴度簡直像藝術品！','你對元素鍛造的領悟已超越王立學院！'],
  perk:'Lv3：冶煉售價 +4% · Lv5：冶煉售價 +8%',
  quest:{text:'本季已簽署至少 1 張工坊契約',check:()=>activeContracts().length>=1,rewardGold:90}},
 {id:'luna',guestId:3,icon:'🔮',name:'露娜占星師',role:'星頁館常客',giftCost:100,stat:'dual',
  quotes:['今晚的星象很平靜，適合去溪畔散步。','星軌交會於你的工坊，財運正在上升喔！','我從沒見過如此耀眼的星運，你注定名留青史！'],
  perk:'Lv3：雙工坊售價 +3% · Lv5：雙工坊售價 +6%',
  quest:{text:'今日已完成城鎮頭條抉擇',check:()=>!!ensureWorkshopMomentum().dailyChoice,rewardGold:85}},
 {id:'parker',guestId:4,icon:'🌿',name:'帕克花藝師',role:'溫室愛好者',giftCost:100,stat:'def',
  quotes:['晨露溫室的土質真棒，記得多看看花盆喔！','你照料的花朵比王室花園還香甜！','精靈們都在傳頌你的溫室與溪畔聖園呢！'],
  perk:'Lv3：遠征防禦 +4% · Lv5：遠征防禦 +8%',
  quest:{text:'今日在西側進行至少 1 次探索',check:()=>ensureTownWings().westUsed>=1,rewardGold:85}},
 {id:'lia',guestId:5,icon:'🏹',name:'莉亞獵手',role:'溪畔巡林客',giftCost:100,stat:'def',
  quotes:['西側瀑布那邊今天水色特別清澈呢。','你釣魚的架勢越來越有老手的風範了！','整片森林的精靈都把你當成最信任的朋友！'],
  perk:'Lv3：遠征防禦 +4% · Lv5：遠征防禦 +8%',
  quest:{text:'今日在西側溪畔釣起 1 條鮮魚',check:()=>ensureTownWings().westFished>=1,rewardGold:95}},
 {id:'marcus',guestId:6,icon:'🛡',name:'馬庫斯修士',role:'聖堂守護者',giftCost:105,stat:'def',
  quotes:['願星輝保佑這座安寧的鍛造小鎮。','你的堅盾與熱湯救了無數冒險者的性命！','這座城鎮因你的善意而閃耀著聖光！'],
  perk:'Lv3：遠征防禦 +4% · Lv5：遠征防禦 +8%',
  quest:{text:'今日累積獲得金幣達 150💰',check:()=>dEarn>=150||coins>=300,rewardGold:90}},
 {id:'claire',guestId:7,icon:'💐',name:'克萊兒修女',role:'晨露治癒師',giftCost:100,stat:'kitchen',
  quotes:['剛出爐的熱湯香氣總是能撫慰人心。','你端出的料理讓旅人們都露出了笑容！','願暖爐餐廳的燈火永遠溫暖每一位旅人！'],
  perk:'Lv3：餐廳售價 +4% · Lv5：餐廳售價 +8%',
  quest:{text:'今日已完成城鎮頭條抉擇',check:()=>!!ensureWorkshopMomentum().dailyChoice,rewardGold:85}},
 {id:'kevin',guestId:8,icon:'🗝',name:'凱文影客',role:'遺跡尋寶人',giftCost:105,stat:'forge',
  quotes:['西側古物遺跡底下可藏著不少好貨色喔。','眼光不錯嘛！那件古物的成色我一眼就看出來了！','以後有什麼秘寶情報，我一定第一個告訴你！'],
  perk:'Lv3：冶煉售價 +4% · Lv5：冶煉售價 +8%',
  quest:{text:'今日在西側進行至少 1 次探索',check:()=>ensureTownWings().westUsed>=1,rewardGold:95}},
 {id:'vivian',guestId:9,icon:'💎',name:'薇薇安怪盜',role:'夜行鑑賞家',giftCost:110,stat:'dual',
  quotes:['真正稀有的珍品，只會落在懂行的人手裡。','這座小鎮的藏品連王宮寶庫都相形見絀呢！','算我輸了，你的傑作我只願堂堂正正買下！'],
  perk:'Lv3：雙工坊售價 +3% · Lv5：雙工坊售價 +6%',
  quest:{text:'今日在冶煉廠成交至少 1 筆訂單',check:()=>dEarn>0||all>0,rewardGold:95}},
 {id:'bard',guestId:10,icon:'🎸',name:'巴德吟遊詩人',role:'酒館駐唱',giftCost:95,stat:'bard',
  quotes:['請我喝一杯麥酒，我就幫你唱首小調！','你的名聲已經傳到隔壁城鎮啦！','這首《星露神匠之歌》將永遠在酒館流傳！'],
  perk:'Lv3：每日贈送 +15% 雙狂熱 · Lv5：全工坊 +6%',
  quest:{text:'今日已完成城鎮頭條抉擇',check:()=>!!ensureWorkshopMomentum().dailyChoice,rewardGold:85}},
 {id:'serena',guestId:11,icon:'🎵',name:'賽琳娜歌姬',role:'星夜豎琴手',giftCost:100,stat:'kitchen',
  quotes:['夜晚的酒館最適合配上輕柔的豎琴聲。','伴著美食與星光歌唱，真是最幸福的時刻！','我要為你的暖爐餐廳譜寫一首專屬夜曲！'],
  perk:'Lv3：餐廳售價 +4% · Lv5：餐廳售價 +8%',
  quest:{text:'本季已簽署至少 1 張工坊契約',check:()=>activeContracts().length>=1,rewardGold:90}},
 {id:'thorin',guestId:12,icon:'⚒',name:'托爾老鐵匠',role:'退隱神匠',giftCost:110,stat:'forge',
  quotes:['年輕人，打鐵要聽火聲，別急著收錘。','好手藝！這鍛爐的節奏讓我想起當年！','你已經超越老頭子我了，這座小鎮以你為榮！'],
  perk:'Lv3：冶煉售價 +5% · Lv5：冶煉售價 +10%',
  quest:{text:'今日累積獲得金幣達 150💰',check:()=>dEarn>=150||coins>=300,rewardGold:95}},
 {id:'martha',guestId:13,icon:'📦',name:'瑪莎掌櫃',role:'遠洋商會會長',giftCost:110,stat:'dual',
  quotes:['東側碼頭的貨船剛靠岸，今天就該大賺一筆！','你的經營頭腦連商會長老都讚不絕口！','只要你點頭，整個王國的商路都為你敞開！'],
  perk:'Lv3：雙工坊售價 +3% · Lv5：雙工坊售價 +6%',
  quest:{text:'今日累積獲得金幣達 150💰',check:()=>dEarn>=150||coins>=300,rewardGold:100}},
 {id:'bruno',guestId:14,icon:'🍖',name:'布魯諾美食家',role:'環球老饕',giftCost:105,stat:'kitchen',
  quotes:['我走遍七大王國，就為了尋找極致的香氣！','哇啊！這口鮮甜差點讓我把盤子也吞下去！','這裡就是我夢寐以求的美食聖地，我定居了！'],
  perk:'Lv3：餐廳售價 +4% · Lv5：餐廳售價 +8%',
  quest:{text:'今日在西側溪畔釣起 1 條鮮魚',check:()=>ensureTownWings().westFished>=1,rewardGold:95}},
 {id:'elena',guestId:15,icon:'👑',name:'艾琳食評家',role:'皇家美食評論',giftCost:110,stat:'kitchen',
  quotes:['聽說暖爐餐廳的晚間料理頗有口碑，我會仔細品嚐的。','火候與調味恰到好處，我已把你寫進推薦名錄！','這絕對是王國數一數二的夢幻星級餐桌！'],
  perk:'Lv3：餐廳售價 +5% · Lv5：餐廳售價 +10%',
  quest:{text:'今日在西側溪畔釣起 1 條鮮魚',check:()=>ensureTownWings().westFished>=1,rewardGold:100}}
];

const TRADE_ROUTES=[
 {id:'local',icon:'🐴',name:'鄰鎮商隊線',cost:200,days:1,baseMult:1.45,minLv:0,desc:'隔天返航，穩定賺取約 1.45 倍金幣＋隨機工坊物資。'},
 {id:'harbor',icon:'⛵',name:'海港遠洋線',cost:500,days:1,baseMult:1.58,minLv:1,desc:'隔天返航，賺取約 1.58 倍金幣＋元素花種或升級道具。'},
 {id:'imperial',icon:'👑',name:'皇都黃金商隊',cost:1000,days:2,baseMult:1.85,minLv:2,desc:'2 天後返航，賺取約 1.85 倍暴利＋稀有元素精華與寶箱！'}
];

const TOWN_MUSEUM_KEY='forgeTownMuseumV1';
const FISH_BAITS=[
 {id:'worm',icon:'🪱',name:'免費蚯蚓',cost:0,desc:'標準範圍'},
 {id:'star',icon:'✨',name:'星露香餌',cost:30,desc:'完美區加大＋高稀有率'},
 {id:'magnet',icon:'🧲',name:'磁力誘餌',cost:45,desc:'軌道出現🎁漂流寶箱區'}
];
let townZone='center',townWingModalMode=null,museumTab='fish',tavernTab='today',lastFishBanner=null,fishBait='worm',digTool='pick';
let fishGame={active:false,pos:50,dir:1,raf:0,lastTs:0,chestPos:74,speed:0.135};

let relicPuzzle={active:false,id:null,tiles:[],selected:-1,moves:0};

function fishStarLevel(count){return count>=9?3:count>=6?2:count>=3?1:0;}

function loadTownMuseum(){
 try{
  const raw=JSON.parse(gameStorage.getItem(TOWN_MUSEUM_KEY)||'{}');
  const fish=Array.isArray(raw.fish)?raw.fish.filter(id=>FISH_CATALOG.some(f=>f.id===id)):[];
  const relics=Array.isArray(raw.relics)?raw.relics.filter(id=>RELIC_CATALOG.some(r=>r.id===id)):[];
  const fishCounts=raw.fishCounts&&typeof raw.fishCounts==='object'?{...raw.fishCounts}:{};
  fish.forEach(id=>{if(!fishCounts[id])fishCounts[id]=1;});
  const relicShards=raw.relicShards&&typeof raw.relicShards==='object'?{...raw.relicShards}:{};
  relics.forEach(id=>{if((relicShards[id]||0)<9)relicShards[id]=9;});
  return {
   fish,relics,fishCounts,relicShards,
   fishMax:raw.fishMax&&typeof raw.fishMax==='object'?raw.fishMax:{}
  };
 }catch(e){return {fish:[],relics:[],fishCounts:{},relicShards:{},fishMax:{}};}
}
function saveTownMuseum(m){
 // gameStorage automatically isolates sandboxStorage during backend testing and localStorage during formal play.
 try{gameStorage.setItem(TOWN_MUSEUM_KEY,JSON.stringify(m));}catch(e){}
}
function registerMuseumItem(kind,id,cm=0){
 const m=loadTownMuseum(),arr=kind==='fish'?m.fish:m.relics;
 const isNew=!arr.includes(id);
 let isRecord=false,starUp=0;
 if(isNew)arr.push(id);
 if(kind==='fish'){
  const prevC=Number(m.fishCounts[id]||0),nextC=prevC+1;
  m.fishCounts[id]=nextC;
  if(fishStarLevel(nextC)>fishStarLevel(prevC))starUp=fishStarLevel(nextC);
  if(cm>0){
   const prev=Number(m.fishMax[id]||0);
   if(cm>prev){m.fishMax[id]=cm;if(!isNew)isRecord=true;}
  }
 }
 saveTownMuseum(m);
 return {isNew,isRecord,starUp,count:kind==='fish'?m.fishCounts[id]:1,total:m.fish.length+m.relics.length};
}
function registerRelicShard(id,gain=1){
 const m=loadTownMuseum();
 const prev=Math.min(9,Number(m.relicShards[id]||0));
 const next=Math.min(9,prev+gain);
 m.relicShards[id]=next;
 saveTownMuseum(m);
 return {prev,next,readyToAssemble:next>=9&&!m.relics.includes(id),completed:m.relics.includes(id)};
}
function museumFishKitchenBonus(mus){
 const m=mus||loadTownMuseum();
 let stars=0;
 for(const f of FISH_CATALOG)stars+=fishStarLevel(m.fishCounts?.[f.id]||0);
 return {stars,bonus:Math.min(.42,stars*.015)};
}
function relicPassiveBonuses(mus){
 const m=mus||loadTownMuseum();
 const out={forge:0,kitchen:0,atk:0,def:0,trade:0,rare:0,disc:0,westGold:0};
 for(const id of m.relics){
  const r=RELIC_CATALOG.find(x=>x.id===id);
  if(!r||!r.fx)continue;
  for(const [k,v] of Object.entries(r.fx))out[k]=(out[k]||0)+v;
 }
 return out;
}
function museumRelicForgeBonus(mus){
 const m=mus||loadTownMuseum();
 const fx=relicPassiveBonuses(m);
 return {count:m.relics.length,bonus:Math.min(.40,fx.forge),fx};
}
function checkNightlyFishKitchenSupply(){
 if(day<1||!kitchen)return;
 const w=ensureTownWings();
 if(w.fishSupplyDay===day)return;
 const mus=loadTownMuseum(),si=townVisualSeason();
 const seasonStars=FISH_CATALOG.filter(f=>f.season===si).reduce((mx,f)=>Math.max(mx,fishStarLevel(mus.fishCounts?.[f.id]||0)),0);
 const totalStars=museumFishKitchenBonus(mus).stars;
 if(seasonStars<2&&totalStars<4)return;
 w.fishSupplyDay=day;
 const tier=seasonStars>=3||totalStars>=8?3:2;
 kitchen.bag.push({k:'o',t:tier});
 addWorkshopFever('kitchen',20);
 toast('🐟 博物鮮魚直送（'+SEASONS[si].name+'魚圖鑑 2★+）！獲贈高階食材入廚房道具箱＋餐廳狂熱 +20%！');
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
 if(day>0&&w.westDay!==day){w.westDay=day;w.westUsed=0;w.westExtra=0;w.westFished=0;w.fishStreak=0;w.crossUsed=false;w.digBoard=createDailyDigBoard();}
 if(!Array.isArray(w.digBoard)||w.digBoard.length!==9)w.digBoard=createDailyDigBoard();
 if(day>0&&w.eastDay!==day){w.eastDay=day;w.eastBought=[];w.barterDone=false;w.haggleDone=false;w.haggleDisc=0;}
 if(day>0&&w.regularDay!==day){
  w.regularDay=day;w.regularGifted=[];w.regularQuestDone=[];
  if((w.regulars?.bard||0)>=3){addWorkshopFever('forge',15);addWorkshopFever('kitchen',15);}
 }
 return w;
}

function todayTavernRegulars(){
 const n=TOWN_REGULARS.length,count=5;
 const start=((Math.max(1,day)-1)*count+(Math.floor((runId||0)/1000)%n))%n;
 const list=[];
 for(let i=0;i<count;i++)list.push(TOWN_REGULARS[(start+i*3)%n]);
 // Ensure unique entries
 const seen=new Set();
 return list.filter(r=>{if(seen.has(r.id))return false;seen.add(r.id);return true;});
}

function setTavernTab(t){tavernTab=t;renderTownWingModal();}

function townWingBonuses(){
 if(day<1)return {forgeSale:0,kitchenSale:0,battleAtk:0,battleDef:0};
 const w=ensureTownWings(),reg=w.regulars||{},mus=loadTownMuseum();
 const fishK=museumFishKitchenBonus(mus).bonus;
 const rFx=relicPassiveBonuses(mus);
 let forgeSale=rFx.forge,kitchenSale=fishK+rFx.kitchen,battleAtk=rFx.atk,battleDef=rFx.def;
 for(const r of TOWN_REGULARS){
  const lv=reg[r.id]||0;
  if(lv<3)continue;
  const hi=lv>=5;
  if(r.stat==='forge')forgeSale+=(r.id==='thorin'?(hi?.10:.05):(hi?.08:.04));
  else if(r.stat==='kitchen')kitchenSale+=(r.id==='elena'?(hi?.10:.05):(hi?.08:.04));
  else if(r.stat==='dual'){const v=hi?.06:.03;forgeSale+=v;kitchenSale+=v;}
  else if(r.stat==='bard'&&hi){forgeSale+=.06;kitchenSale+=.06;}
  else if(r.stat==='atk')battleAtk+=(hi?.08:.04);
  else if(r.stat==='def')battleDef+=(hi?.08:.04);
 }
 return {forgeSale:Math.min(.60,forgeSale),kitchenSale:Math.min(.60,kitchenSale),battleAtk:Math.min(.32,battleAtk),battleDef:Math.min(.32,battleDef)};
}

function setTownZone(zone){
 if(!['west','center','east'].includes(zone))return;
 if(architect?.active&&zone!=='center'){toast('請先結束城鎮佈置模式，再前往左右道路區域。');return;}
 townZone=zone;
 renderTownWing();
 if(typeof syncAmbientSound==='function')syncAmbientSound();
}

function renderTownWing(){
 const layer=$('townWingLayer'),goW=$('townGoWest'),goE=$('townGoEast'),dots=$('townZoneDots');
 if(!layer||!goW||!goE||!dots)return;
 const enabled=expandedGameEnabled()&&day>0;
 const archBtn=$('townArchitectBtn');
 if(!enabled){layer.hidden=true;goW.hidden=true;goE.hidden=true;dots.hidden=true;townZone='center';if(archBtn)archBtn.disabled=false;return;}
 if(archBtn){archBtn.disabled=townZone!=='center';archBtn.title=townZone==='center'?'建築師':'建築師僅限中央主城鎮使用';}
 const si=townVisualSeason(),night=isSandboxNight(),mapIdx=si+(night?4:0);
 const w=ensureTownWings(),lm=landmarkBonuses(),mus=loadTownMuseum();
 const westMax=3+(lm.westStaminaBonus||0),westRem=Math.max(0,westMax-w.westUsed);
 const puzzleReady=RELIC_CATALOG.some(r=>(mus.relicShards?.[r.id]||0)>=9&&!mus.relics.includes(r.id));
 const shipReady=!!(w.shipment&&day>=w.shipment.returnDay);
 const visitors=todayTavernRegulars(),qIds=[visitors[0]?.id,visitors[2]?.id].filter(Boolean);
 const questReady=visitors.some(r=>qIds.includes(r.id)&&!w.regularQuestDone.includes(r.id)&&r.quest.check());
 const westDotBadge=puzzleReady?'<em>🧩拼圖</em>':westRem>0?'<em>'+westRem+'</em>':'';
 const eastDotBadge=shipReady?'<em>領取</em>':questReady?'<em>✦委託</em>':'';
 goW.hidden=townZone!=='center';
 goE.hidden=townZone!=='center';
 goW.innerHTML='◀<span>溪畔營地</span>';
 goE.innerHTML='<span>旅商驛站</span>▶';
 dots.hidden=false;
 dots.innerHTML=[['west','🎣 西側營地'+westDotBadge],['center','🏘 主城鎮'],['east','🛒 東側驛站'+eastDotBadge]].map(([z,lbl])=>'<button type="button" class="'+(townZone===z?'is-active':'')+'" onclick="setTownZone(\''+z+'\')">'+lbl+'</button>').join('');
 if(townZone==='center'){layer.hidden=true;layer.dataset.zone='center';return;}
 layer.hidden=false;
 layer.dataset.zone=townZone;
 layer.dataset.time=night?'night':'day';
 const bgUrl=TOWN_WING_ART[townZone+'_'+mapIdx]||TOWN_WING_ART[townZone+'_'+si]||'';
 const westLv=Math.min(3,Math.max(0,buildingLandmarkTier('west_camp')));
 const eastLv=Math.min(3,Math.max(0,buildingLandmarkTier('east_post')));
 if(townZone==='west'){
  const tierBadge=westLv>0?'<div class="tw-tier-banner">🎣 '+TOWN_LANDMARKS.west_camp.tierNames[westLv-1]+' '+'★'.repeat(westLv)+'</div>':'';
  const museumSprite=TOWN_WING_BUILDING_ART['west_camp_'+westLv]||TOWN_WING_BUILDING_ART.west_camp_0;
  layer.innerHTML='<img class="town-wing-bg" src="'+bgUrl+'" alt="西側星露溪畔營地" decoding="async">'
   +tierBadge
   +'<div class="town-wing-fx is-west" aria-hidden="true">'
   +'<span class="tw-sunbeam b1"></span><span class="tw-sunbeam b2"></span>'
   +'<div class="wf-campfire"><span class="cf-flame"></span><span class="cf-flame f2"></span><i class="cf-smoke s1"></i><i class="cf-smoke s2"></i></div>'
   +'<div class="wf-leap-fish"><span class="lf-fish">🐟</span><span class="lf-ring"></span></div>'
   +'<span class="tw-night-halo is-pier"></span><span class="tw-night-halo is-camp"></span>'
   +'</div>'
   +'<button type="button" class="town-wing-spot" style="left:44%;top:17%;width:48%;height:23%" onclick="openTownWingModal(\'excavate\')"><span class="tw-plaque">⛏ 古物遺跡營地<small>3×3 探勘 · 體力 '+westRem+'/'+westMax+'</small></span></button>'
   +'<button type="button" class="town-wing-spot" style="left:20%;top:43%;width:32%;height:16%" onclick="openTownWingModal(\'fishing\')"><span class="tw-plaque">🎣 星露釣魚棧橋<small>'+(night?'🌙 夜間限定魚群':'☀ 白天溪畔魚群')+'</small></span></button>'
   +'<button type="button" class="town-wing-spot is-building" data-landmark-tier="'+westLv+'" style="left:45%;top:59%;width:48%;height:29%" onclick="openTownWingModal(\'museum\')"><img class="tw-building-sprite" src="'+museumSprite+'" alt="星露博物小屋" decoding="async"><span class="tw-plaque">🏛 星露博物小屋<small>大工程 Lv '+westLv+'/3</small></span></button>'
   +'<button type="button" class="town-road-arrow is-east is-return" onclick="setTownZone(\'center\')" aria-label="返回主城鎮"><span>返回城鎮</span>▶</button>';
 }else{
  const theme=CARAVAN_THEMES[(day-1)%CARAVAN_THEMES.length];
  const tierBadge=eastLv>0?'<div class="tw-tier-banner">🛒 '+TOWN_LANDMARKS.east_post.tierNames[eastLv-1]+' '+'★'.repeat(eastLv)+'</div>':'';
  const postSprite=TOWN_WING_BUILDING_ART['east_post_'+eastLv]||TOWN_WING_BUILDING_ART.east_post_0;
  const bubbles=['🍻','🎵','💰'];
  const npcsHtml=visitors.slice(0,3).map((g,idx)=>g&&typeof TOWN_GUEST_ART!=='undefined'&&TOWN_GUEST_ART[g.guestId]?'<button type="button" class="es-guest-npc is-n'+(idx+1)+'" onclick="openTownWingModal(\'tavern\')" title="'+g.name+'（今日在店）"><span class="npc-bubble">'+bubbles[idx%bubbles.length]+'</span><span class="npc-body"><img src="'+TOWN_GUEST_ART[g.guestId]+'" alt="'+g.name+'" decoding="async"></span></button>':'').join('');
  layer.innerHTML='<img class="town-wing-bg" src="'+bgUrl+'" alt="東側旅商大道" decoding="async">'
   +tierBadge
   +'<div class="town-wing-fx is-east" aria-hidden="true">'
   +'<span class="tw-sunbeam b1"></span>'
   +'<div class="es-windmill"><img class="wm-sails-img" src="'+TOWN_WING_ART.east_windmill_sails+'" alt="" decoding="async"></div>'
   +'<span class="es-stream-glint g1"></span><span class="es-stream-glint g2"></span>'
   +'<span class="tw-night-halo is-tavern"></span><span class="tw-night-halo is-dock"></span>'
   +'</div>'
   +npcsHtml
   +'<button type="button" class="town-wing-spot is-building" data-landmark-tier="'+eastLv+'" style="left:52%;top:13%;width:46%;height:29%" onclick="openTownWingModal(\'caravan\')"><img class="tw-building-sprite" src="'+postSprite+'" alt="皇家旅商驛站" decoding="async"><span class="tw-plaque">'+theme.icon+' '+theme.name+'<small>特賣＋以物易物 · Lv '+eastLv+'/3</small></span></button>'
   +'<button type="button" class="town-wing-spot" style="left:54%;top:43%;width:38%;height:20%" onclick="openTownWingModal(\'depot\')"><span class="tw-plaque">📦 跨城商隊碼頭<small>'+(shipReady?'✨ 商隊已返航！':w.shipment?'🚢 航行中':'投資賺翻倍')+'</small></span></button>'
   +'<button type="button" class="town-wing-spot" style="left:6%;top:61%;width:48%;height:27%" onclick="openTownWingModal(\'tavern\')"><span class="tw-plaque">🍺 旅人常客酒館<small>常客委託與好感度</small></span></button>'
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
 if(typeof syncAmbientSound==='function')syncAmbientSound();
}
function closeTownWingModal(){
 stopFishGame();
 $('townWingP').style.display='none';
 townWingModalMode=null;
 if(typeof syncAmbientSound==='function')syncAmbientSound();
}

function setFishBait(id){fishBait=id;renderTownWingModal();}
function setDigTool(id){digTool=id;renderTownWingModal();}

function startFishingCast(){
 const w=ensureTownWings(),lm=landmarkBonuses(),maxStam=3+(lm.westStaminaBonus||0);
 if(!sandboxSession&&w.westUsed>=maxStam){toast('今日西側探索體力已用完（可升級「星露棧橋與博物館」增加體力）。');return;}
 const bait=FISH_BAITS.find(b=>b.id===fishBait)||FISH_BAITS[0];
 if(!sandboxSession&&bait.cost>0&&coins<bait.cost){toast('金幣不足 '+bait.cost+'，無法使用「'+bait.name+'」。');return;}
 stopFishGame();
 fishGame.active=true;fishGame.pos=10;fishGame.dir=1;fishGame.lastTs=0;
 fishGame.chestPos=Math.random()<.5?24:76;
 fishGame.speed=0.125+Math.min(0.045,(w.fishStreak||0)*0.008);
 renderTownWingModal();
 if(typeof requestAnimationFrame==='function'){
  const step=ts=>{
   if(!fishGame.active)return;
   const dt=fishGame.lastTs?Math.min(48,ts-fishGame.lastTs):16;
   fishGame.lastTs=ts;
   fishGame.pos+=fishGame.dir*dt*fishGame.speed;
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
 const p=fishGame.pos,chestPos=fishGame.chestPos;
 stopFishGame();
 const perfW=fishBait==='star'?12:8.5,goodW=fishBait==='star'?27:22;
 const hitChest=fishBait==='magnet'&&Math.abs(p-chestPos)<=9;
 const quality=Math.abs(p-50)<=perfW?'perfect':Math.abs(p-50)<=goodW?'good':'normal';
 doWestFish(quality,hitChest);
}

function doWestFish(quality='normal',hitChest=false){
 const w=ensureTownWings(),lm=landmarkBonuses(),maxStam=3+(lm.westStaminaBonus||0);
 if(!sandboxSession&&w.westUsed>=maxStam){toast('今日西側探索體力已用完（可升級「星露棧橋與博物館」增加體力）。');return;}
 const bait=FISH_BAITS.find(b=>b.id===fishBait)||FISH_BAITS[0];
 if(!sandboxSession&&bait.cost>0){
  if(coins<bait.cost){toast('金幣不足 '+bait.cost+'，已改用免費蚯蚓。');fishBait='worm';}
  else coins-=bait.cost;
 }
 if(!sandboxSession)w.westUsed++;
 w.westFished=(w.westFished||0)+1;
 if(quality==='perfect'||quality==='good')w.fishStreak=Math.min(5,(w.fishStreak||0)+1);
 else w.fishStreak=0;
 const streakMult=1+(w.fishStreak||0)*0.1;
 const si=townVisualSeason(),night=isSandboxNight();
 const pool=FISH_CATALOG.filter(f=>f.season===si&&(f.night===night||Math.random()<.28));
 const baitBonus=fishBait==='star'?.28:0;
 const qBonus=quality==='perfect'?.35:quality==='good'?.12:0;
 const qMult=quality==='perfect'?1.4:quality==='good'?1.15:1;
 const rFx=relicPassiveBonuses();
 const roll=Math.random()+lm.westRareBonus*.35+qBonus+baitBonus+(w.fishStreak||0)*.04+(rFx.rare||0);
 const targetR=roll>.92?2:roll>.56?1:0;
 const cands=pool.filter(f=>f.rarity===targetR);
 const fish=(cands.length?cands:pool)[rnd((cands.length?cands:pool).length)]||FISH_CATALOG[0];
 const baseCm=22+fish.rarity*28;
 const cm=Math.round(baseCm+rnd(26)+(quality==='perfect'?18:quality==='good'?8:0));
 const reward=Math.round(fish.gold*lm.westRewardMult*(1+(rFx.westGold||0))*qMult*streakMult);
 coins+=reward;
 const reg=registerMuseumItem('fish',fish.id,cm);
 let extra='';
 if(hitChest){
  const cg=110+rnd(60);coins+=cg;bag.push({k:'u'});
  extra='🎁 磁力撈獲漂流寶箱（💰'+cg+'＋礦石升級）';
 }else if(quality==='perfect'||fish.rarity>=2||Math.random()<.22){
  if(Math.random()<.5){const e=ELEMENT_IDS[rnd(ELEMENT_IDS.length)];seedStock[e]=(seedStock[e]||0)+1;extra='＋1 顆'+ELEMENTS[e].name+'花種';}
  else{if(!kitchen)kitchen=freshKitchen();kitchen.bag.push({k:'o',t:Math.min(3,1+fish.rarity)});extra='＋高階鮮魚食材入廚房';}
 }
 const qTag=quality==='perfect'?'🌟 完美起竿！':quality==='good'?'✨ 漂亮起竿！':'🎣 成功起竿！';
 lastFishBanner={id:fish.id,icon:fish.icon,name:fish.name,cm,qTag,reward,isNew:reg.isNew,isRecord:reg.isRecord,extra,rarity:fish.rarity,streak:w.fishStreak||0};
 workshopToolSound('upgrade');
 toast(qTag+'「'+fish.name+'」'+cm+'cm · 💰'+reward+(reg.isNew?'（✨ 博物館新登錄！）':reg.isRecord?'（👑 刷新最長紀錄！）':'')+(extra?' · '+extra:''));
 renderTownWingModal();renderTownWing();render();if($('townP').style.display==='flex')renderTown();saveNow();
}

function ruinNeighborRelics(board,idx){
 const r=Math.floor(idx/3),c=idx%3,dirs=[[-1,0],[1,0],[0,-1],[0,1]];
 let count=0;
 for(const [dr,dc] of dirs){
  const nr=r+dr,nc=c+dc;
  if(nr>=0&&nr<3&&nc>=0&&nc<3){
   const cell=board[nr*3+nc];
   if(cell&&!cell.open&&(cell.t==='relic'||cell.t==='chest'))count++;
  }
 }
 return count;
}

function openOneRuinCell(w,lm,idx,silent=false){
 const cell=w.digBoard?.[idx];
 if(!cell||cell.open)return null;
 cell.open=true;
 if(cell.t==='relic'){
  const mNow=loadTownMuseum();
  const unfinished=RELIC_CATALOG.filter(r=>(mNow.relicShards?.[r.id]||0)<9);
  const pool=unfinished.length?unfinished:RELIC_CATALOG;
  const roll=Math.random()+lm.westRareBonus*.38;
  const targetR=roll>.90?2:roll>.52?1:0;
  const cands=pool.filter(r=>r.rarity===targetR);
  const relic=(cands.length?cands:pool)[rnd((cands.length?cands:pool).length)];
  const reward=Math.round(relic.gold*lm.westRewardMult);
  coins+=reward;
  const shardGain=sandboxSession?3:(Math.random()<.35?2:1);
  const sh=registerRelicShard(relic.id,shardGain);
  cell.v={relicId:relic.id,icon:relic.icon,label:relic.name,sub:sh.readyToAssemble?'🧩 9/9 可拼圖！':'碎片 '+sh.next+'/9 · 💰'+reward};
  if(!silent)toast('🏺 挖出「'+relic.name+'」碎片 +'+shardGain+'（'+sh.next+'/9）· 💰'+reward+(sh.readyToAssemble?' · ✨ 碎片齊全！快到博物小屋拼圖修復！':''));
  return {kind:'relic',name:relic.name,reward};
 }else if(cell.t==='seed'){
  const e=ELEMENT_IDS[rnd(ELEMENT_IDS.length)];
  seedStock[e]=(seedStock[e]||0)+1;
  cell.v={icon:'🌱',label:ELEMENTS[e].name+'花種',sub:'入溫室庫存'};
  if(!silent)toast('🌱 遺跡石縫裡找到 1 顆「'+ELEMENTS[e].name+'花種」！');
  return {kind:'seed',name:ELEMENTS[e].name+'花種',reward:0};
 }else if(cell.t==='chest'){
  const g=Math.round((110+rnd(60))*lm.westRewardMult);
  coins+=g;bag.push({k:'u'});
  cell.v={icon:'🎁',label:'古代寶匣',sub:'💰'+g+'＋升級'};
  if(!silent)toast('🎁 挖到古代寶匣！獲得 💰'+g+'＋礦石升級道具！');
  return {kind:'chest',name:'古代寶匣',reward:g};
 }else{
  const g=Math.round((45+rnd(45))*lm.westRewardMult);
  coins+=g;
  cell.v={icon:'🪙',label:'古幣堆',sub:'💰'+g};
  if(!silent)toast('🪙 挖出埋藏古幣 💰'+g+'！');
  return {kind:'gold',name:'古幣堆',reward:g};
 }
}

function digRuinCell(idx){
 const w=ensureTownWings(),lm=landmarkBonuses(),maxStam=3+(lm.westStaminaBonus||0);
 const cell=w.digBoard?.[idx];
 if(!cell||cell.open)return;
 if(digTool==='cross'){
  if(!sandboxSession&&w.crossUsed){toast('今日震波十字鏟已使用過，請改用精準小鋤。');digTool='pick';renderTownWingModal();return;}
  if(!sandboxSession&&coins<60){toast('金幣不足 60，無法啟動震波十字鏟。');return;}
  if(!sandboxSession){coins-=60;w.crossUsed=true;}
  const r=Math.floor(idx/3),c=idx%3,targets=[[r,c],[r-1,c],[r+1,c],[r,c-1],[r,c+1]];
  const hits=[];
  for(const [nr,nc] of targets){
   if(nr>=0&&nr<3&&nc>=0&&nc<3){
    const res=openOneRuinCell(w,lm,nr*3+nc,true);
    if(res)hits.push(res);
   }
  }
  digTool='pick';
  const totG=hits.reduce((s,h)=>s+h.reward,0),relN=hits.filter(h=>h.kind==='relic').length;
  toast('💣 震波十字鏟發掘 '+hits.length+' 格！出土 '+relN+' 件古物 · 獲得 💰'+totG+'！');
 }else{
  const freeAvail=sandboxSession||w.westUsed<maxStam;
  if(freeAvail){
   if(!sandboxSession)w.westUsed++;
  }else{
   if(w.westExtra>=2){toast('今日免費體力與加場挖掘次數皆已用完！');return;}
   if(coins<80){toast('金幣不足 80，無法加場挖掘。');return;}
   coins-=80;w.westExtra++;
  }
  openOneRuinCell(w,lm,idx,false);
 }
 if(w.digBoard.every(c=>c.open)){coins+=180;toast('🏆 今日 3×3 遺跡全數發掘完畢！獲得考古清場獎勵 +180💰！');}
 workshopToolSound('upgrade');
 renderTownWingModal();renderTownWing();render();if($('townP').style.display==='flex')renderTown();saveNow();
}

// Keep backward-compatible doWestExcavate for tests & quick-dig
function doWestExcavate(paid=false){
 const w=ensureTownWings();
 const idx=w.digBoard.findIndex(c=>!c.open);
 if(idx>=0){digTool='pick';digRuinCell(idx);return;}
 toast('今日 3×3 遺跡已全數發掘完畢，明天會發現全新遺跡！');
}

function doCaravanHaggle(){
 const w=ensureTownWings();
 if(!sandboxSession&&w.haggleDone){toast('今日已經和旅商議價過了！');return;}
 w.haggleDone=true;
 if(Math.random()<.68){
  w.haggleDisc=.15;
  workshopToolSound('upgrade');
  toast('🤝 殺價成功！旅商爽快給予今日全場額外 -15% 折扣！');
 }else{
  w.haggleDisc=0;
  toast('😅 旅商笑著搖頭：「這已經是成本價啦！」（明天再試試手氣）');
 }
 renderTownWingModal();saveNow();
}

function buyCaravanItem(itemId){
 const w=ensureTownWings(),lm=landmarkBonuses(),theme=CARAVAN_THEMES[(day-1)%CARAVAN_THEMES.length];
 const items=theme.items.slice(0,3+(lm.eastExtraSlots||0));
 const it=items.find(x=>x.id===itemId);
 if(!it||w.eastBought.includes(itemId))return;
 const totalDisc=Math.min(.50,(lm.eastDiscount||0)+(w.haggleDisc||0)+(relicPassiveBonuses().disc||0));
 const price=Math.max(10,Math.round(it.cost*(1-totalDisc)));
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

function regularGiftCost(r,lv){
 const base=(r?.giftCost||100)+70;
 return Math.round(base*(1+Math.max(0,lv||0)*0.55)/10)*10;
}

function giftTownRegular(regId){
 const w=ensureTownWings(),lm=landmarkBonuses(),r=TOWN_REGULARS.find(x=>x.id===regId);
 if(!r)return;
 const visiting=todayTavernRegulars().some(x=>x.id===regId);
 if(!visiting){toast(r.name+' 今日不在酒館，改天再來招待吧！');return;}
 const cur=w.regulars[regId]||0;
 if(cur>=5){toast(r.name+' 好感度已達滿心！');return;}
 if(w.regularGifted.includes(regId)){toast('今天已經招待過 '+r.name+' 了，明天再來吧！');return;}
 const cost=regularGiftCost(r,cur);
 if(!sandboxSession&&coins<cost){toast('金幣不足 '+cost+'，無法招待 '+r.name+'。');return;}
 if(!sandboxSession)coins-=cost;
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
 const w=ensureTownWings(),lm=landmarkBonuses(),rFx=relicPassiveBonuses();
 if(!w.shipment||day<w.shipment.returnDay)return;
 const rt=TRADE_ROUTES.find(x=>x.id===w.shipment.id)||TRADE_ROUTES[0];
 const payout=Math.round(w.shipment.cost*rt.baseMult*(lm.eastTradeMult||1)*(1+(rFx.trade||0)));
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

function closeMuseumInspect(){
 relicPuzzle.active=false;relicPuzzle.selected=-1;
 const el=$('museumInspectP');if(el)el.style.display='none';
}

function openRelicPuzzle(relicId){
 const r=RELIC_CATALOG.find(x=>x.id===relicId),mus=loadTownMuseum();
 if(!r)return;
 const shards=mus.relicShards?.[relicId]||0;
 if(shards<9&&!mus.relics.includes(relicId)){toast('需要集齊 9 片「'+r.name+'」碎片才能進入拼圖修復（目前 '+shards+'/9）。');return;}
 const tiles=[0,1,2,3,4,5,6,7,8];
 // Deterministic non-trivial shuffle
 for(let i=tiles.length-1;i>0;i--){const j=rnd(i+1);[tiles[i],tiles[j]]=[tiles[j],tiles[i]];}
 if(tiles.every((v,i)=>v===i)){[tiles[0],tiles[4]]=[tiles[4],tiles[0]];}
 relicPuzzle={active:true,id:relicId,tiles,selected:-1,moves:0};
 renderMuseumInspect('relic',relicId);
}

function clickPuzzleTile(pos){
 if(!relicPuzzle.active)return;
 if(relicPuzzle.selected<0){
  relicPuzzle.selected=pos;
  renderMuseumInspect('relic',relicPuzzle.id);
  return;
 }
 if(relicPuzzle.selected===pos){
  relicPuzzle.selected=-1;
  renderMuseumInspect('relic',relicPuzzle.id);
  return;
 }
 const a=relicPuzzle.selected,b=pos;
 [relicPuzzle.tiles[a],relicPuzzle.tiles[b]]=[relicPuzzle.tiles[b],relicPuzzle.tiles[a]];
 relicPuzzle.selected=-1;relicPuzzle.moves++;
 const solved=relicPuzzle.tiles.every((v,i)=>v===i);
 if(solved){
  const rid=relicPuzzle.id,r=RELIC_CATALOG.find(x=>x.id===rid);
  relicPuzzle.active=false;
  const mus=loadTownMuseum();
  const firstTime=!mus.relics.includes(rid);
  if(firstTime){
   mus.relics.push(rid);
   mus.relicShards[rid]=9;
   saveTownMuseum(mus);
   coins+=200;
   toast('🎉 成功拼圖修復古物「'+(r?.name||rid)+'」！獲得修復賞金 💰200，永久啟動冶煉廠售價 +2.5%！');
  }else{
   toast('✨ 再次完成「'+(r?.name||rid)+'」拼圖修復（共 '+relicPuzzle.moves+' 步）！');
  }
  workshopToolSound('upgrade');
  renderTownWingModal();
  if($('weaponAlbumP')?.style.display==='flex'&&archiveCategory==='museum')renderWeaponAlbum();
  render();saveNow();
 }
 renderMuseumInspect('relic',relicPuzzle.id);
}

function openMuseumInspect(kind,id){
 relicPuzzle.active=false;relicPuzzle.selected=-1;
 renderMuseumInspect(kind,id);
 const el=$('museumInspectP');if(el)el.style.display='flex';
}

function renderMuseumInspect(kind,id){
 const title=$('museumInspectTitle'),body=$('museumInspectBody');
 if(!title||!body)return;
 const mus=loadTownMuseum();
 if(kind==='fish'){
  const f=FISH_CATALOG.find(x=>x.id===id);if(!f)return;
  const count=mus.fishCounts?.[id]||0,got=count>0||mus.fish.includes(id),stars=fishStarLevel(count),maxCm=mus.fishMax?.[id]||0;
  const kBonus=(stars*1.5).toFixed(1);
  title.textContent=got?(f.icon+' '+f.name):'❔ 未知魚種';
  body.innerHTML='<div class="mi-showcase is-fish"><div class="mi-art-stage">'+museumShowcaseArt('fish',id,!got)+'</div>'
   +'<div class="mi-badges"><span>'+SEASONS[f.season].icon+' '+SEASONS[f.season].name+'</span><span>'+(f.night?'🌙 夜晚出沒':'☀ 白天出沒')+'</span><span>稀有度 '+'★'.repeat(f.rarity+1)+'</span></div></div>'
   +'<p class="mi-desc">'+(got?f.desc:'尚未在西側溪畔釣起過此魚種。請依季節與日夜時段前往星露釣魚棧橋探索！')+'</p>'
   +'<div class="mi-stat-box"><div><b>🍲 廚房餐廳星級加成</b><span>'+'★'.repeat(stars)+'☆'.repeat(3-stars)+'（目前 +'+(stars>0?kBonus:'0')+'% 餐廳售價）</span></div>'
   +'<div class="mi-progress"><i style="width:'+Math.min(100,Math.round(count/9*100))+'%"></i></div>'
   +'<small>累計釣起 <b>'+count+'</b> 隻'+(maxCm?' · 最長紀錄 <b>'+maxCm+' cm</b>':'')+' · 達成 3 隻 1★ (+1.5%) / 6 隻 2★ (+3.0%) / 9 隻 3★ (+4.5%)</small></div>';
 }else{
  const r=RELIC_CATALOG.find(x=>x.id===id);if(!r)return;
  const shards=Math.min(9,mus.relicShards?.[id]||0),completed=mus.relics.includes(id),seen=completed||shards>0;
  title.textContent=seen?(r.icon+' '+r.name):'❔ 未出土古物';
  if(relicPuzzle.active&&relicPuzzle.id===id){
   const rightCount=relicPuzzle.tiles.filter((v,i)=>v===i).length;
   body.innerHTML='<p class="tc-intro">點擊兩塊碎片交換位置，將 9 片古物還原為完整圖案！（已歸位 <b>'+rightCount+'/9</b> · 步數 '+relicPuzzle.moves+'）</p>'
    +'<div class="mi-puzzle-grid">'
    +relicPuzzle.tiles.map((pieceIdx,pos)=>{
     const isSel=relicPuzzle.selected===pos,isRight=pieceIdx===pos;
     return '<button type="button" class="mi-puzzle-tile'+(isSel?' is-sel':'')+(isRight?' is-right':'')+'" style="'+relicPuzzleTileStyle(id,pieceIdx)+'" onclick="clickPuzzleTile('+pos+')" aria-label="拼圖格 '+(pos+1)+'"></button>';
    }).join('')
    +'</div>'
    +'<button type="button" class="tw-link-btn" style="margin-top:10px" onclick="relicPuzzle.active=false;renderMuseumInspect(\'relic\',\''+id+'\')">返回文物介紹</button>';
   return;
  }
  const actionBtn=completed
   ?'<button type="button" class="tw-link-btn" onclick="openRelicPuzzle(\''+id+'\')">🧩 重玩 3×3 古物拼圖</button>'
   :shards>=9
    ?'<button type="button" class="tw-big-btn is-gold" onclick="openRelicPuzzle(\''+id+'\')">🧩 碎片齊全（9/9）！進入 3×3 拼圖修復</button>'
    :'<button type="button" class="tw-big-btn" disabled>⛏ 還差 '+(9-shards)+' 片碎片（於西側遺跡探勘獲得）</button>';
  const relicArtHtml=completed?museumShowcaseArt('relic',id,false):pixelRelicArt(id,!seen);
  body.innerHTML='<div class="mi-showcase is-relic"><div class="mi-art-stage">'+relicArtHtml+'</div>'
   +'<div class="mi-badges"><span>稀有度 '+'★'.repeat(r.rarity+1)+'</span><span>'+(completed?'✓ 已修復完成（高清典藏已解鎖）':'碎片 '+shards+' / 9（修復後解鎖高清圖案）')+'</span></div></div>'
   +'<p class="mi-desc">'+(seen?r.desc:'尚未在西側古物遺跡營地發掘過此古物碎片。')+'</p>'
   +'<div class="mi-stat-box"><div><b>⚒ 冶煉廠與古物專屬加成</b><span>'+(completed?'✓ 已生效':'拼圖修復後啟動')+'</span></div>'
   +'<div class="mi-progress"><i style="width:'+Math.round(shards/9*100)+'%"></i></div>'
   +'<small>專屬效果：<b>'+(r.perk||'冶煉廠成交售價 +2.5%')+'</b><br>碎片進度：<b>'+shards+' / 9 片</b>（集齊 9 片即可拼圖修復並獲得 💰200 賞金）</small></div>'
   +actionBtn;
 }
}

function setMuseumTab(t){museumTab=t;renderTownWingModal();}

function renderTownWingModal(){
 const modal=$('townWingP'),title=$('townWingTitle'),body=$('townWingBody');
 if(!title||!body||!townWingModalMode)return;
 if(modal)modal.dataset.mode=townWingModalMode;
 const w=ensureTownWings(),lm=landmarkBonuses(),mus=loadTownMuseum();
 const westMax=3+(lm.westStaminaBonus||0),westRem=Math.max(0,westMax-w.westUsed);
 const si=townVisualSeason(),night=isSandboxNight();
 const sceneHdr=typeof wingModalSceneArt==='function'?wingModalSceneArt(townWingModalMode,night):'';

 if(townWingModalMode==='fishing'){
  title.textContent='🎣 星露釣魚棧橋';
  const curFish=FISH_CATALOG.filter(f=>f.season===si);
  const streakBadge=(w.fishStreak||0)>0?' · 🔥 連釣 ×'+w.fishStreak+' (+'+(w.fishStreak*10)+'%金幣)':'';
  const baitBar='<div class="tw-bait-row">'+FISH_BAITS.map(b=>'<button type="button" class="tw-bait-btn'+(fishBait===b.id?' is-on':'')+'" onclick="setFishBait(\''+b.id+'\')" '+(fishGame.active?'disabled':'')+'><span class="tw-mini-px">'+pixelWingItemArt(b.id)+'</span><b>'+b.name+(b.cost?' 💰'+b.cost:'')+'</b><small>'+b.desc+'</small></button>').join('')+'</div>';
  const banner=lastFishBanner?'<div class="tw-catch-banner"><div class="tw-px-badge">'+pixelFishArt(lastFishBanner.id)+'</div><div><b>'+lastFishBanner.qTag+' '+lastFishBanner.name+' ('+lastFishBanner.cm+'cm) '+'★'.repeat(lastFishBanner.rarity+1)+'</b><small>獲得 💰'+lastFishBanner.reward+(lastFishBanner.isNew?' · ✨ 博物館新登錄！':lastFishBanner.isRecord?' · 👑 刷新最長紀錄！':'')+(lastFishBanner.extra?' · '+lastFishBanner.extra:'')+'</small></div></div>':'';
  const perfCls=fishBait==='star'?' is-wide':'';
  const chestEl=fishBait==='magnet'?'<span class="fish-zone-chest" style="left:'+(fishGame.active?fishGame.chestPos:74)+'%">🎁</span>':'';
  const bobLeft=fishGame.active?fishGame.pos:50;
  const meterHint=fishGame.active
   ?'趁浮標滑進 <b>金色中心</b> 起竿觸發「🌟 完美起竿」（×1.4 金幣＋連釣加成）'+(fishBait==='magnet'?'，或瞄準 <b>🎁 漂流寶箱</b>！':'！')
   :'點擊下方「🎣 精準拋竿」啟動浮標軌道，瞄準 <b>金色中心</b> 起竿拿高倍率獎勵！';
  const meterBtns=fishGame.active
   ?'<button type="button" class="tw-big-btn is-gold" onclick="pullFishingLine()">⚡ 立即拉竿起魚！</button>'
   :'<div class="tw-btn-row"><button type="button" class="tw-big-btn" onclick="startFishingCast()" '+(!sandboxSession&&westRem<=0?'disabled':'')+'>🎣 精準拋竿（開始）</button><button type="button" class="tw-big-btn is-gold" onclick="doWestFish(\'normal\')" '+(!sandboxSession&&westRem<=0?'disabled':'')+'>⚡ 快速拋竿（-1 體力）</button></div>';
  const miniGame='<div class="fish-meter-box'+(fishGame.active?' is-live':' is-idle')+'"><p class="fish-hint">'+meterHint+'</p><div class="fish-track"><span class="fish-zone-good'+perfCls+'"></span><span class="fish-zone-perfect'+perfCls+'"></span>'+chestEl+'<span class="fish-bobber" style="left:'+bobLeft+'%">🎣</span></div>'+meterBtns+'</div>';
  body.innerHTML=sceneHdr
   +'<p class="tc-intro">今日體力 <b>'+westRem+' / '+westMax+'</b> · '+SEASONS[si].icon+' '+SEASONS[si].name+(night?' 🌙夜晚':' ☀白天')+' · 💰'+(sandboxSession?'∞':coins)+streakBadge+'</p>'
   +baitBar+banner+miniGame
   +'<h4 class="tw-sub">本季出沒魚種</h4><div class="tw-grid">'
   +curFish.map(f=>{const got=mus.fish.includes(f.id),maxCm=mus.fishMax?.[f.id];return '<div class="tw-item'+(got?' is-got':'')+'"><div class="tw-px-frame">'+pixelFishArt(f.id,!got)+'</div><b>'+(got?f.name:'未知魚種')+'</b><small>'+(f.night?'🌙 夜晚':'☀ 白天')+' · '+'★'.repeat(f.rarity+1)+(got&&maxCm?' · '+maxCm+'cm':'')+'</small></div>';}).join('')
   +'</div>';
 }else if(townWingModalMode==='excavate'){
  title.textContent='⛏ 古物遺跡探勘（3×3）';
  const opened=w.digBoard.filter(c=>c.open).length;
  const toolBar='<div class="tw-bait-row">'
   +'<button type="button" class="tw-bait-btn'+(digTool==='pick'?' is-on':'')+'" onclick="setDigTool(\'pick\')"><span class="tw-mini-px">'+pixelWingItemArt('rock')+'</span><b>精準小鋤</b><small>消耗 1 體力，精準探勘 1 格</small></button>'
   +'<button type="button" class="tw-bait-btn'+(digTool==='cross'?' is-on':'')+'" onclick="setDigTool(\'cross\')" '+(!sandboxSession&&w.crossUsed?'disabled':'')+'><span class="tw-mini-px">'+pixelWingItemArt('cross')+'</span><b>震波十字鏟 💰60</b><small>'+(w.crossUsed&&!sandboxSession?'今日已使用':'一次震開十字 5 格（每日 1 次）')+'</small></button>'
   +'</div>';
  body.innerHTML=sceneHdr
   +'<p class="tc-intro">免費體力 <b>'+westRem+' / '+westMax+'</b> · 加場 <b>'+(2-w.westExtra)+'/2</b>（80💰）· 進度 <b>'+opened+'/9</b>（全清 +180💰）<br>🧭 已開地格會感應周圍未挖掘的<b>古物／寶匣數量</b>，推理再下鏟！</p>'
   +toolBar
   +'<div class="dig-grid">'
   +w.digBoard.map((c,i)=>{
    if(c.open){
     const near=ruinNeighborRelics(w.digBoard,i);
     const art=c.v?.relicId?'<div class="dig-px">'+pixelRelicArt(c.v.relicId)+'</div>':'<div class="dig-px">'+pixelWingItemArt(c.t==='seed'?'seed':c.t==='chest'?'chest':'gold')+'</div>';
     return '<div class="dig-cell is-open">'+art+'<b>'+(c.v?.label||'已發掘')+'</b><small>'+(c.v?.sub||'')+'</small>'+(near>0?'<em class="dig-radar">🧭 周圍 '+near+' 寶</em>':'<em class="dig-radar is-clear">✓ 周圍空</em>')+'</div>';
    }
    const disabled=digTool==='cross'?(!sandboxSession&&(w.crossUsed||coins<60)):(!sandboxSession&&westRem<=0&&(w.westExtra>=2||coins<80));
    return '<button type="button" class="dig-cell'+(digTool==='cross'?' is-cross':'')+'" onclick="digRuinCell('+i+')" '+(disabled?'disabled':'')+'><div class="dig-px">'+pixelWingItemArt(digTool==='cross'?'cross':'rock')+'</div><b>'+(digTool==='cross'?'十字震波':'點擊探勘')+'</b><small>'+(digTool==='cross'?'💰60 開5格':westRem>0||sandboxSession?'免費體力':'💰80 加場')+'</small><em class="dig-radar is-unopened">🧭 待探測</em></button>';
   }).join('')
   +'</div>'
   +'<p class="tc-intro" style="margin-top:8px">博物館古物進度：<b>'+mus.relics.length+' / '+RELIC_CATALOG.length+'</b></p>';
  }else if(townWingModalMode==='museum'){
  const fishB=museumFishKitchenBonus(mus),relicB=museumRelicForgeBonus(mus);
  const tot=mus.fish.length+mus.relics.length,maxTot=FISH_CATALOG.length+RELIC_CATALOG.length;
  const readyRelics=RELIC_CATALOG.filter(r=>(mus.relicShards?.[r.id]||0)>=9&&!mus.relics.includes(r.id)).length;
  title.textContent='🏛 星露博物小屋';
  const tabs='<div class="tc-tabs"><button type="button" aria-pressed="'+(museumTab==='fish')+'" onclick="setMuseumTab(\'fish\')">🐟 魚類 ('+mus.fish.length+'/'+FISH_CATALOG.length+')</button><button type="button" aria-pressed="'+(museumTab==='relic')+'" onclick="setMuseumTab(\'relic\')">🏺 古物 ('+mus.relics.length+'/'+RELIC_CATALOG.length+(readyRelics?' 🧩':'')+')</button><button type="button" aria-pressed="'+(museumTab==='milestone')+'" onclick="setMuseumTab(\'milestone\')">🏆 加成總覽</button></div>';
  let content='';
  if(museumTab==='fish'){
   content='<div class="tw-grid">'+FISH_CATALOG.map(f=>{const cnt=mus.fishCounts?.[f.id]||0,got=cnt>0||mus.fish.includes(f.id),st=fishStarLevel(cnt);return '<button type="button" class="tw-item is-click'+(got?' is-got':'')+'" data-stars="'+st+'" onclick="openMuseumInspect(\'fish\',\''+f.id+'\')"><div class="tw-px-frame">'+pixelFishArt(f.id,!got)+'</div><b>'+(got?f.name:'？？？')+'</b><small>'+(got?'★'.repeat(st)+'☆'.repeat(3-st)+' · '+cnt+'隻':SEASONS[f.season].icon+(f.night?'🌙 夜':'☀ 日'))+'</small></button>';}).join('')+'</div>';
  }else if(museumTab==='relic'){
   content='<div class="tw-list">'+RELIC_CATALOG.map(r=>{const sh=Math.min(9,mus.relicShards?.[r.id]||0),done=mus.relics.includes(r.id),seen=done||sh>0,canPuz=!done&&sh>=9;return '<button type="button" class="tw-row is-click'+(done?' is-got-row':canPuz?' is-ready-row':'')+'" onclick="openMuseumInspect(\'relic\',\''+r.id+'\')"><div class="tw-px-badge">'+pixelRelicArt(r.id,!seen)+'</div><div class="tw-info"><b>'+(seen?r.name:'未出土古物')+' <small class="tw-role">'+(done?'✓ 已修復':canPuz?'🧩 可拼圖！':'碎片 '+sh+'/9')+'</small></b><small>'+(done?'⚒ '+(r.perk||'冶煉售價 +2.5%'):canPuz?'✨ 9 片碎片已集齊！點擊立即進入 3×3 拼圖修復':seen?r.desc:'在西側古物遺跡營地探勘收集 9 片碎片。')+'</small></div></button>';}).join('')+'</div>';
  }else{
   content='<div class="tw-list">'
    +'<div class="tw-row is-got-row"><span class="tw-ico">🍲</span><div class="tw-info"><b>魚類星級 · 廚房餐廳加成</b><small>目前累計 <b>'+fishB.stars+' ★</b>（每種魚 3/6/9 隻升 1/2/3★）→ 餐廳成交售價 <b>+'+(fishB.bonus*100).toFixed(1)+'%</b></small></div></div>'
    +'<div class="tw-row is-got-row"><span class="tw-ico">⚒</span><div class="tw-info"><b>古物修復 · 冶煉廠加成</b><small>已拼圖修復 <b>'+relicB.count+' / '+RELIC_CATALOG.length+'</b> 件古物 → 冶煉廠成交售價 <b>+'+(relicB.bonus*100).toFixed(1)+'%</b></small></div></div>'
    +'</div>';
  }
  body.innerHTML=sceneHdr
   +'<div class="lm-summary"><div class="lm-summary-top"><span>🏛 博物典藏 <b>'+tot+' / '+maxTot+'</b></span><span class="lm-wallet">⚒+'+(relicB.bonus*100).toFixed(1)+'% · 🍲+'+(fishB.bonus*100).toFixed(1)+'%</span></div><div class="lm-progress"><i style="width:'+Math.round(tot/maxTot*100)+'%"></i></div><small>點擊任意魚類或文物查看詳細介紹；古物集齊 9 碎片可拼圖修復！</small></div>'
   +'<button type="button" class="tw-big-btn is-gold" onclick="closeTownWingModal();openTownChronicle(\'landmarks\')">🏛 升級「星露棧橋與博物館」大工程（目前 Lv '+buildingLandmarkTier('west_camp')+'/3）</button>'
   +tabs+content;
 }else if(townWingModalMode==='caravan'){
  const theme=CARAVAN_THEMES[(day-1)%CARAVAN_THEMES.length],items=theme.items.slice(0,3+(lm.eastExtraSlots||0));
  const totalDisc=Math.min(.45,(lm.eastDiscount||0)+(w.haggleDisc||0)),disc=Math.round(totalDisc*100);
  const barterCount=bag.length+(kitchen?kitchen.bag.length:0)+ELEMENT_IDS.reduce((s,e)=>s+(seedStock[e]||0),0);
  title.textContent=theme.icon+' '+theme.name;
  body.innerHTML=sceneHdr
   +'<p class="tc-intro">'+theme.desc+(disc?' · 🏷 總折扣 -'+disc+'%':'')+' · 持有 💰'+(sandboxSession?'∞':coins)+'</p>'
   +'<div class="tw-barter-box" style="margin-bottom:8px"><div><b>🎲 旅商殺價交涉（每日 1 次）</b><small>'+(w.haggleDone?(w.haggleDisc>0?'✨ 今日殺價成功！全場額外 -15% 折扣生效中！':'今日已交涉過，明天再試手氣。'):'試著與商隊掌櫃議價，68% 機率獲得今日全場額外 -15% 折扣！')+'</small></div><button type="button" class="tw-act" onclick="doCaravanHaggle()" '+(w.haggleDone&&!sandboxSession?'disabled':'')+'>'+(w.haggleDone&&!sandboxSession?(w.haggleDisc>0?'已折 15%':'已交涉'):'🎲 試著殺價')+'</button></div>'
   +'<div class="tw-list">'
   +items.map(it=>{const sold=w.eastBought.includes(it.id),price=Math.max(10,Math.round(it.cost*(1-totalDisc)));return '<div class="tw-row"><div class="tw-px-badge is-sm">'+pixelWingItemArt(it.id==='royal_chest'?'royal_chest_item':it.id)+'</div><div class="tw-info"><b>'+it.name+(it.rare?' ✦':'')+'</b><small>'+it.desc+'</small></div><button type="button" class="tw-act" onclick="buyCaravanItem(\''+it.id+'\')" '+(sold||(!sandboxSession&&coins<price)?'disabled':'')+'>'+(sold?'已售出':'💰'+price)+'</button></div>';}).join('')
   +'</div>'
   +'<div class="tw-barter-box"><div><b>🤝 旅商以物易物（每日 1 次）</b><small>交付 1 件多餘道具箱物資或花種（目前可用：'+barterCount+' 件），換取 💰140～200＋隨機元素精華＋雙狂熱 +30%！</small></div><button type="button" class="tw-act" onclick="doCaravanBarter()" '+(w.barterDone||barterCount<=0?'disabled':'')+'>'+(w.barterDone?'今日已換':'立即交換')+'</button></div>'
   +'<button type="button" class="tw-link-btn" onclick="closeTownWingModal();openTownChronicle(\'landmarks\')">🏛 升級「皇家旅商驛站」解鎖稀有格與折扣（Lv '+buildingLandmarkTier('east_post')+'/3）</button>';
 }else if(townWingModalMode==='tavern'){
  title.textContent='🍺 旅人酒館與常客名冊';
  const visitors=todayTavernRegulars(),visitorIds=new Set(visitors.map(v=>v.id));
  const qIds=[visitors[0]?.id,visitors[2]?.id].filter(Boolean);
  const tabs='<div class="tc-tabs"><button type="button" aria-pressed="'+(tavernTab==='today')+'" onclick="setTavernTab(\'today\')">🍺 今日到訪 ('+visitors.length+'位)</button><button type="button" aria-pressed="'+(tavernTab==='all')+'" onclick="setTavernTab(\'all\')">📖 全部常客 ('+TOWN_REGULARS.length+'位)</button></div>';
  const list=tavernTab==='today'?visitors:TOWN_REGULARS;
  body.innerHTML=sceneHdr
   +'<p class="tc-intro">每日輪替 <b>5 位常客</b>光臨酒館（共 16 位角色輪流出場），每位常客每日限招待 1 次！'+(lm.eastHeartStep>1?' · 🏛 驛站雙倍好感生效中！':'')+'</p>'
   +tabs+'<div class="tw-list">'
   +list.map(r=>{
    const inToday=visitorIds.has(r.id),lv=w.regulars[r.id]||0,gifted=w.regularGifted.includes(r.id),qIdx=lv>=5?2:lv>=3?1:0;
    const cost=regularGiftCost(r,lv);
    const hasQ=inToday&&qIds.includes(r.id),qDone=w.regularQuestDone.includes(r.id),qReady=hasQ&&!qDone&&r.quest.check();
    const portraitUrl=typeof TOWN_GUEST_ART!=='undefined'?TOWN_GUEST_ART[r.guestId]:'';
    const portraitHtml=portraitUrl?'<div class="tw-portrait"><img src="'+portraitUrl+'" alt="'+r.name+'" decoding="async"></div>':'<span class="tw-ico">'+r.icon+'</span>';
    const qBlock=hasQ?'<div class="tw-quest-bar"><span>📜 今日委託：'+r.quest.text+'（免費升心＋💰'+r.quest.rewardGold+'）</span><button type="button" class="tw-qbtn" onclick="claimRegularQuest(\''+r.id+'\')" '+(qDone||!qReady?'disabled':'')+'>'+(qDone?'已領取 ✓':qReady?'領取謝禮 ✦':'進行中')+'</button></div>':'';
    const actBtn=!inToday
     ?'<button type="button" class="tw-act" disabled>🚶 今日未到</button>'
     :'<button type="button" class="tw-act" onclick="giftTownRegular(\''+r.id+'\')" '+(lv>=5||gifted||(!sandboxSession&&coins<cost)?'disabled':'')+'>'+(lv>=5?'滿心':gifted?'✓ 已招待':'🍻 💰'+cost)+'</button>';
    return '<div class="tw-reg-card"><div class="tw-row is-dialogue">'+portraitHtml+'<div class="tw-info"><div class="tw-reg-top"><div><b>'+r.name+' <small class="tw-role">'+r.role+(tavernTab==='all'&&inToday?' · 🍺在店':'')+'</small></b><div class="tw-hearts">'+'❤️'.repeat(lv)+'🤍'.repeat(5-lv)+'</div></div>'+actBtn+'</div><div class="tw-speech">「'+r.quotes[qIdx]+'」</div><small class="tw-perk">'+r.perk+'</small></div></div>'+qBlock+'</div>';
   }).join('')
   +'</div>';
 }else if(townWingModalMode==='depot'){
  const eastLv=buildingLandmarkTier('east_post');
  title.textContent='📦 跨城貿易商隊站';
  if(w.shipment){
   const rt=TRADE_ROUTES.find(x=>x.id===w.shipment.id)||TRADE_ROUTES[0],ready=day>=w.shipment.returnDay;
   body.innerHTML=sceneHdr
    +'<div class="lm-summary"><div class="lm-summary-top"><span>'+rt.icon+' '+rt.name+'（投入 💰'+w.shipment.cost+'）</span><span class="lm-wallet">'+(ready?'✨ 已返航':'第 '+w.shipment.returnDay+' 天返航')+'</span></div><small>'+(ready?'商隊已滿載珍寶與收益回到東側驛站，快來領取！':'商隊正在跨國貿易途中，隔日即可回來領取高倍數回報！')+'</small></div>'
    +'<button type="button" class="tw-big-btn is-gold" onclick="claimTradeShipment()" '+(ready?'':'disabled')+'>'+(ready?'🎉 領取商隊收益與物資':'⏳ 航行中（還剩 '+(w.shipment.returnDay-day)+' 天）')+'</button>';
  }else{
   body.innerHTML=sceneHdr
    +'<p class="tc-intro">投資跨城貿易航線，隔天獲得高倍率金幣與稀有工坊物資！持有 💰'+(sandboxSession?'∞':coins)+'</p><div class="tw-list">'
    +TRADE_ROUTES.map(rt=>{const locked=eastLv<rt.minLv;return '<div class="tw-row"><div class="tw-px-badge is-sm">'+pixelWingItemArt(rt.id)+'</div><div class="tw-info"><b>'+rt.name+'</b><small>'+rt.desc+(locked?'（需驛站 Lv '+rt.minLv+'）':'')+'</small></div><button type="button" class="tw-act" onclick="dispatchTradeShipment(\''+rt.id+'\')" '+(locked||(!sandboxSession&&coins<rt.cost)?'disabled':'')+'>'+(locked?'🔒 Lv'+rt.minLv:'派遣 💰'+rt.cost)+'</button></div>';}).join('')
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
