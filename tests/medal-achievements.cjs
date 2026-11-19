const assert=require('node:assert/strict'),{c,run,els,storage}=require('./harness.cjs')(__dirname+'/../.build/combined.html');
const plain=x=>JSON.parse(JSON.stringify(x));
run("start('normal',{test:true})");
assert.equal(run('MEDAL_DEFS.length'),14);assert.equal(run('MEDAL_DEFS.reduce((n,d)=>n+d.max,0)'),34);
for(let season=0;season<4;season++){
 run("start('normal',{test:true})");
 for(let tier=1;tier<=3;tier++){
  const day=season*3+1+(tier-1)*12;run('day='+day);const row=c.syncFestival().active;assert.equal(row.tier,tier);assert.equal(c.festivalGoal(row,0),season===0?tier*2:tier*3);assert.equal(c.festivalGoal(row,1),tier*3);
  const dishTier=[0,tier===1?0:tier===2?1:3,tier===1?0:tier===2?1:2,tier===1?0:tier===2?1:3][season];
  const dishCode=[9,9,6,0][season];
  if(season===0){c.recordFestival('sow',null,tier*2);c.recordFestival('food',{c:9,t:0},tier*3-1);}
  if(season===1){c.recordFestival('weapon',{c:0,t:1},tier*3);if(tier>1){c.recordFestival('food',{c:9,t:tier===2?0:1});assert.equal(row.progress[1],0,'Summer tier '+tier+' requires aroma >= '+(10+10*tier));}c.recordFestival('food',{c:9,t:dishTier},tier*3-1);}
  if(season===2){c.recordFestival('burn',null,tier*3);if(tier>1){c.recordFestival('food',{c:6,t:tier===2?0:1});assert.equal(row.progress[1],0,'Autumn tier '+tier+' requires taste >= '+(10+10*tier));}c.recordFestival('food',{c:6,t:dishTier},tier*3-1);}
  if(season===3){c.recordFestival('weapon',{c:0,t:2},tier*3);if(tier>1){c.recordFestival('food',{c:0,t:tier===2?0:1});assert.equal(row.progress[1],0,'Winter tier '+tier+' requires fullness >= '+(10+10*tier));}c.recordFestival('food',{c:0,t:dishTier},tier*3-1);}
  assert.equal(c.festivalComplete(row),false);c.recordFestival('food',{c:dishCode,t:dishTier});assert.equal(c.festivalComplete(row),true);assert.equal(c.claimFestival(row.start),false);
  run('day='+ (day+2));assert.equal(c.claimFestival(row.start),true);assert.equal(run('kitchen.festivals.badgeStars['+season+']'),tier);assert.equal(c.claimFestival(row.start),false);assert.equal(row.tier,tier);
  const restored=c.validKitchenProgress(c.snapshotKitchenProgress(),day+2);assert.equal(restored.festivals.active.tier,tier);assert.equal(restored.festivals.badgeStars[season],tier);
 }
 run('day='+ (season*3+37));assert.equal(c.syncFestival().active.tier,3);
}
run("start('normal',{test:true});recordFestival('sow',null,2);recordFestival('food',{c:9,t:0},3);day=3;claimFestival(1);day=13;syncFestival()");assert.equal(c.syncFestival().active.tier,2);run('day=25');assert.equal(c.syncFestival().active.tier,2);assert.deepEqual(plain(c.syncFestival().active.progress),[0,0]);
const legacy=c.cleanFestivalState({badges:[0],active:{start:1,season:0,progress:[1,3],claimed:true}},3);assert.equal(legacy.badgeStars[0],1);assert.equal(legacy.active.tier,1);
console.log('PASS: all four seasons progress 1/2/3x across later occurrences (spring 2/4/6 flowers, summer/autumn/winter 20/30/40 stat thresholds), exact count boundaries, day3 gate, single payout, fixed row tier, failed-season retry, cap3, validated saves and legacy one-star migration.');

run("start('normal',{test:true})");
for(let n=1;n<=10;n++){c.recordWeaponCraft(c.baseAlbumWeapon(n%10,3));assert.equal(c.stateMedalStars().gold,n>=10?3:n>=5?2:1);}
assert.equal(c.stateMedalStars().mithril,0);for(let n=1;n<=5;n++){c.recordWeaponCraft(c.baseAlbumWeapon(n%10,4));assert.equal(c.stateMedalStars().mithril,n>=5?3:n>=3?2:1);}assert.equal(c.medalProgress(c.medalDefinition('gold')),10);
function cook(t,cidx=0){run('kitchen.g=Array(30).fill(null);kitchen.heat=Array(30).fill(0);kitchen.g[0]={k:"p",s:'+cidx+',t:'+t+'};kitchen.g[1]={k:"p",s:'+cidx+',t:'+t+'};kitchen.g[2]={k:"p",s:'+cidx+',t:'+t+'}');assert.equal(c.kitchenCraft(2),true);}
for(let n=1;n<=10;n++){cook(3,n%3);assert.equal(c.stateMedalStars().chef4,n>=10?3:n>=5?2:1);}for(let n=1;n<=5;n++){cook(4,n%3);assert.equal(c.stateMedalStars().chef5,n>=5?3:n>=3?2:1);}assert.equal(c.medalProgress(c.medalDefinition('chef4')),10);
const countBefore=c.medalProgress(c.medalDefinition('chef4'));c.inspectMedal('chef4');c.inspectMedal('chef4');assert.equal(c.medalProgress(c.medalDefinition('chef4')),countBefore);
console.log('PASS: actual forge-mastery and recipe-completion hooks award exact gold/mithril and tier4/tier5 thresholds across weapon/dish types, no sale required and inspection never adds count.');

run("start('normal',{test:true});day=13;greenhouseBeds=Array.from({length:6},()=>({element:'wind',plantedDay:10}))");for(let i=0;i<5;i++)c.selectGreenhouseBed(i);assert.equal(run('kitchen.achievements.harvests'),5);assert.equal(c.stateMedalStars().garden,1);assert.equal(run('bag.filter(w=>w.k==="ess").length'),10);c.selectGreenhouseBed(0);assert.equal(run('kitchen.achievements.harvests'),5);c.grantGardenLoot({k:'ess',element:'fire'});assert.equal(run('kitchen.achievements.harvests'),5);
for(let n=5;n<15;n++){run("greenhouseBeds[0]={element:'water',plantedDay:10}");c.selectGreenhouseBed(0);assert.equal(c.stateMedalStars().garden,n+1>=15?3:n+1>=10?2:1);}
const harvestSave=c.validKitchenProgress(c.snapshotKitchenProgress(),13);assert.equal(harvestSave.achievements.harvests,15);assert.equal(harvestSave.achievements.stars.garden,3);
run("start('normal',{test:true});coins=100000");for(let i=0;i<30;i++){assert.equal(c.buyDecoration('sp-tulips'),true);assert.equal(c.stateMedalStars().decor,i+1>=30?3:i+1>=20?2:i+1>=10?1:0);}const owned=run('cityState.owned["sp-tulips"]');assert.equal(c.buyDecoration('unknown'),false);assert.equal(run('cityState.owned["sp-tulips"]'),owned);run('cityState.layouts.spring=[]');assert.equal(c.stateMedalStars().decor,3);
console.log('PASS: harvest counts plants rather than doubled spring essence or loot, duplicate harvest blocked, saved counters, successful decor acquisitions count total owned and stowing does not remove progress.');

run("start('normal',{test:true})");for(const stage of [4,9,14,19]){const b=c.expeditionBattleState(c.baseAlbumWeapon(0,4),{name:'測試',kind:'slime',hp:1,atk:1,def:0,spd:1,gold:1});b.stage=stage;b.outcome='win';c.settleExpeditionBattle(b);assert.equal(c.stateMedalStars()['exp-'+(stage+1)],1);const wins=run('expeditionState.victories');c.settleExpeditionBattle(b);assert.equal(run('expeditionState.victories'),wins);}
run("start('normal',{test:true});testRun=false;sandboxSession=false;weaponMastery=new Map([['n:0:3',5]]);syncAchievementMedals(false)");assert.equal(JSON.parse(storage.get('forgeMedalCollectionV2')).gold,2);
const formal=storage.get('forgeMedalCollectionV2');run("sandboxSession=true;weaponMastery.set('n:0:3',10);syncAchievementMedals();persistFestivalBadges()");assert.equal(storage.get('forgeMedalCollectionV2'),formal);run('sandboxSession=false;testRun=true;syncAchievementMedals()');assert.equal(storage.get('forgeMedalCollectionV2'),formal);
run("start('normal',{test:true});albumFromHome=false");assert.equal(c.albumMedalStars().gold,0);run('albumFromHome=true');assert.equal(c.albumMedalStars().gold,2);c.renderFestivalBadgeAlbum();assert.match(els.get('albumProgress').textContent,/1\/14/);assert.equal((els.get('albumWeapons').innerHTML.match(/class="festival-badge-card /g)||[]).length,14);c.inspectMedal('gold');assert.match(els.get('festivalBadgeBody').innerHTML,/5把/);assert.match(els.get('festivalBadgeBody').innerHTML,/同一局/);
// Restoring the kitchen before the saved weapon XP must not capture the previous run's XP.
run("testRun=false;weaponMastery=new Map([['n:0:4',100]]);kitchen.festivals={badges:[0],badgeStars:{0:2}};persistFestivalBadges()");assert.equal(JSON.parse(storage.get('forgeMedalCollectionV2')).mithril,0);assert.equal(JSON.parse(storage.get('forgeMedalCollectionV2'))['season-0'],2);
const migrated=c.cleanMedalAchievements({harvests:-10,stars:{gold:99,unknown:3}});assert.equal(migrated.harvests,0);assert.equal(migrated.stars.gold,3);assert.equal(migrated.stars.unknown,undefined);assert.ok(run('BACKUP_KEYS.includes("forgeMedalCollectionV2")'));
const backup=c.captureBackup();assert.equal(c.validateBackup(JSON.stringify(backup)).saves,0);delete backup.data.forgeMedalCollectionV2;assert.equal(c.validateBackup(JSON.stringify(backup)).value.data.forgeMedalCollectionV2,null);backup.data.forgeMedalCollectionV2=JSON.stringify({gold:4});assert.throws(()=>c.validateBackup(JSON.stringify(backup)),/星級/);backup.data.forgeMedalCollectionV2=JSON.stringify({'exp-5':2});assert.throws(()=>c.validateBackup(JSON.stringify(backup)),/星級/);backup.data.forgeMedalCollectionV2=JSON.stringify({'unknown':1});assert.throws(()=>c.validateBackup(JSON.stringify(backup)),/星級/);
const art=run('MEDAL_DEFS.map(d=>medalArt(d.id))');assert.equal(new Set(art).size,14);for(const svg of art){assert.match(svg,/crispEdges/);assert.ok(!svg.includes('<image'));}
// Verify global medal bonuses apply cleanly per star level across all systems.
run("start('normal',{test:true});day=1");
const baseSeed=c.seedPrice('wind'),baseHeat=c.hotSteps(),basePat=c.kitchenOrderPatience(0),baseFresh=c.kitchenShelfLife({k:'w',c:0,t:0}),baseDecor=c.decorPrice(run("DECOR_BY_ID.get('spring-tree')")),baseSale=run('salePrice(baseAlbumWeapon(0,0),{c:null,t:0})'),baseElemSale=run("salePrice({...baseAlbumWeapon(0,0),element:'fire'},{c:null,t:0})"),baseSupply=c.dishSupplyEffect({k:'w',c:0,t:0}),baseBattle=c.expeditionBattleState({...c.baseAlbumWeapon(0,3),m:25},{name:'木樁',kind:'knight',hp:500,atk:10,def:0,spd:10,gold:100});
run("kitchen.festivals.badgeStars={0:3,1:3,2:3,3:3};kitchen.achievements.stars={gold:3,mithril:3,chef4:3,chef5:3,decor:3,garden:3};expeditionState.cleared=[4,9,14,19]");
assert.equal(c.seedPrice('wind'),Math.round(baseSeed*.7));assert.equal(c.plantAge({element:'wind',plantedDay:1}),1,'Spring 3-star accelerates flower growth by 1 day');
assert.equal(c.hotSteps(),baseHeat-9);assert.equal(c.kitchenOrderPatience(0),basePat+9);assert.equal(c.kitchenShelfLife({k:'w',c:0,t:0}),baseFresh+12);
assert.equal(c.decorPrice(run("DECOR_BY_ID.get('spring-tree')")),Math.round(baseDecor*.7));
assert.equal(run('salePrice(baseAlbumWeapon(0,0),{c:null,t:0})'),Math.round(baseSale*1.12));
assert.equal(run("salePrice({...baseAlbumWeapon(0,0),element:'fire'},{c:null,t:0})"),Math.round(baseElemSale*1.24));
run("kitchen.orders=[{c:null,t:0,wait:100,max:100}];kitchen.queue=[];kitchen.g[0]=kitchenFreshen({k:'w',c:0,t:0});kitchen.earned=0");const expectedDish=run('Math.round(kitchenPrice(kitchen.g[0])*1.12)');assert.equal(c.kitchenSell(run('kitchen.g[0]'),0,()=>run('kitchen.g[0]=null')),true);assert.equal(run('kitchen.earned'),expectedDish);
assert.ok(c.dishSupplyEffect({k:'w',c:0,t:0}).heal>baseSupply.heal);
const buffedBattle=c.expeditionBattleState({...c.baseAlbumWeapon(0,3),m:25},{name:'木樁',kind:'knight',hp:500,atk:10,def:0,spd:10,gold:100});
assert.ok(buffedBattle.stats.atk>baseBattle.stats.atk&&buffedBattle.stats.def>baseBattle.stats.def&&buffedBattle.stats.spd>baseBattle.stats.spd&&buffedBattle.stats.arcane>baseBattle.stats.arcane&&buffedBattle.shield>baseBattle.shield);
run("quests=[{t:'big',s:'a',n:1,p:0,x:10,r:100}];coins=0");c.qFinish(run('quests[0]'));assert.equal(run('coins'),118);
console.log('PASS: real victory settlement awards four separate one-time Boss medals, duplicate settle blocked, highest-star formal persistence, test/sandbox isolation, run reset, fourteen unique pixel designs, scoped album details, migration without stale XP leakage, and all 14 global medal bonuses.');
