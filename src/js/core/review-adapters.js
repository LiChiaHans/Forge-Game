
function stage21_monsterArt(m){
 const base='<ellipse cx="32" cy="57" rx="26" ry="5" fill="#102330" opacity=".4"/>';
 let shape='';
 if(m.kind==='slime')shape='<path fill="#29483d" d="M6 49V33h5V23h8v-7h26v7h8v10h5v18H6z"/><path fill="'+m.color+'" d="M10 47V34h5V24h9v-5h17v7h9v10h5v11z"/><path fill="#b9d98a" d="M17 29v-6h10v-3h10v5H25v7H17z"/><path fill="#21403e" d="M20 35h5v8h-5zM40 35h5v8h-5zM27 44h11v3H27z"/><path fill="#f2f5cc" d="M21 35h2v3h-2zM41 35h2v3h-2z"/>';
 else if(m.kind==='wolf')shape='<path fill="#273a45" d="M4 33l10-5 7-17 9 10 15-7 7 16 8 4-5 16H42v8h-8v-9H21v9h-8V43l-9-4z"/><path fill="'+m.color+'" d="M10 34l9-2 5-14 7 8 12-6 5 14 8 2-5 10H20l-4-8z"/><path fill="#d5ded0" d="M14 36h13v9h-8zM34 30h12v12H34z"/><path fill="#ce9a64" d="M25 17l3 6h-5zM42 23h4v7h-4z"/><path fill="#263741" d="M42 33h5v4h-5zM52 37h4v4h-4z"/><path fill="#e8c967" d="M43 33h2v2h-2z"/>';
 else if(m.kind==='golem')shape='<path fill="#344b50" d="M21 6h24v5h5v17h8v26H45v6H21v-6H8V28h8V11h5z"/><path fill="'+m.color+'" d="M23 10h19v16H23zM18 29h29v23H18zM10 32h7v17h-7zM49 32h7v17h-7zM23 52h8v6h-8zM36 52h8v6h-8z"/><path fill="#d5dfcd" d="M24 11h16v3H24zM19 30h25v4H19zM11 33h4v10h-4z"/><path fill="#4a5e5a" d="M31 28v8h8v6h-7v9M22 18h7v5h-7zM36 18h7v5h-7z"/><path fill="#f3cd6d" d="M23 18h5v3h-5zM37 18h5v3h-5zM27 37h6v6h-6z"/>';
 else if(m.kind==='dragon')shape='<path fill="#41364c" d="M3 15l20 10 6-16 10 6 6-5 7 13 9 2-5 13-12 3 6 13H34v7H22v-8H10l6-12L3 35z"/><path fill="'+m.color+'" d="M7 21l16 9 7-15 8 5 7-4 4 12 8 1-5 6-13 3 7 13H33v7h-8v-8H15l7-13-15-5z"/><path fill="#f1c488" d="M26 29h8v19h-8zM43 25h5v4h-5z"/><path fill="#60465c" d="M7 23l11 9-9-1zM33 12l3 6h-5z"/><path fill="#f5e5ae" d="M45 25h2v2h-2zM52 32h3v3h-3z"/>';
 else shape='<path fill="#344352" d="M24 5h19v5h5v18h9v28H42v6H21v-6H7V28h12V10h5z"/><path fill="'+m.color+'" d="M25 9h16v5h4v13H22V14h3zM21 31h24v22H21zM10 32h9v20h-9zM47 32h7v20h-7zM23 54h7v6h-7zM36 54h7v6h-7z"/><path fill="#e4d7aa" d="M26 10h13v4H26zM22 32h21v4H22zM29 15h5v13h-5z"/><path fill="#263744" d="M23 19h21v5H23zM27 39h11v11H27z"/><path fill="#f1b760" d="M25 20h5v2h-5zM37 20h5v2h-5zM31 40h3v8h-3z"/>';
 return '<svg viewBox="0 0 64 64" shape-rendering="crispEdges" aria-label="'+m.name+'">'+base+shape+'</svg>';
}
function stage21_advanceExpeditionBattle(){
 const b=expeditionState.lastBattle;if(!b||b.outcome!=='ongoing'){stopExpeditionPlayback();return;}
 battleTick(b);expeditionBattleStep=b.log.length;combatSound(b.log.at(-1).actor);
 if(b.outcome!=='ongoing')settleExpeditionBattle(b);renderExpeditionBattle();
}
function stage21_kitchenCraft(at,silent=false){
 const triples=kitchenTriples(at);if(!triples.length){if(!silent)kitchen.message='三份備料需要排成直線或彎線。';return false;}
 const batches=triples.map(t=>({...t,parts:t.cells.map(i=>({...kitchen.g[i]}))})),made=[],paths=new Map();
 for(const batch of batches){const key=batch.path.join(',');if(!paths.has(key))paths.set(key,{cells:batch.path,parts:batch.path.map(i=>({...kitchen.g[i]}))});}
 const consumed=new Set(batches.flatMap(batch=>batch.cells));for(const i of consumed){kitchen.g[i]=null;kitchen.heat[i]=Math.max(2,8-2*kitchenLevel('cool'));kitchen.justHeated.add(i);}
 for(const batch of batches){const trio=batch.parts,c=COMBO.indexOf(trio.map(p=>p.s).sort().join('')),t=Math.floor(trio.reduce((sum,p)=>sum+p.t,0)/3);if(c<0)continue;
  const target=batch.target,w=kitchenFreshen({k:'w',c,t,cs:trio.map(p=>p.t),spice:kitchen.tiles[target]||null});kitchen.g[target]=w;
  const key=c+':'+t,old=kitchen.xp[key]||0;kitchen.xp[key]=old+1;kitchen.crafted++;rememberDish(w);(kitchen.forgedAt||(kitchen.forgedAt={}))[target]=Date.now();made.push(KITCHEN_NAMES[c]);
  if(Math.floor((old+1)/3)>Math.floor(old/3)&&old<9)toast(KITCHEN_NAMES[c]+' 升星！');kitchenRecordMerge(batch.cells,trio,[target],target);
 }
 // Return one ingredient per consumed chain, as in embryo forging; never overwrite a dish.
 for(const path of paths.values()){const free=path.cells.filter(i=>!kitchen.g[i]);if(!free.length)continue;const target=free[rnd(free.length)],chance=[0,0,.25,.5][kitchenLevel('merge')],tier=Math.random()<chance?path.parts[rnd(path.parts.length)].t:0;kitchen.g[target]=kitchenFood(tier);kitchenAuto(target);}
 kitchen.message='料理完成：'+made.join('、')+'！拖曳到客人即可出餐。';return true;
}
function stage21_completeKitchenNight(){
 if(kitchen.done)return;kitchen.done=true;const c=KITCHEN_CHALLENGES[kitchen.challenge],passed=c.kind==='rush'?kitchen.served>=kitchen.total&&kitchen.missed===0:kitchen.progress>=c.goal,paid=kitchen.lastRewarded!==day;
 const bonus=paid?120+kitchen.served*20+(passed?150:0):0;let pointReward={points:0,gold:0};if(paid){kitchen.lastRewarded=day;coins+=bonus;earned+=bonus;dEarn+=bonus;pointReward=grantDailyWorkshopSkill('kitchen');pendingChests++;kitchen.bag.push({k:'spice',spice:passed?'milk':'herb'});}
 kitchen.settlement={served:kitchen.served,missed:kitchen.missed,cancelled:kitchen.cancelled||0,earned:kitchen.earned,challenge:kitchen.challenge,passed,bonus,points:pointReward.points,skillGold:pointReward.gold,spice:paid?1:0};renderKitchenSettlement();
}
function stage21_kitchenSell(w,index,clear){
 if(!sandboxSession||!kitchen||kitchen.done)return false;const order=kitchen.orders[index];if(!order||w?.k!=='w')return false;if(order.c!==null&&order.c!==w.c){kitchen.message='這位客人需要'+KITCHEN_NAMES[order.c]+'。';return false;}if(w.t<order.t){kitchen.message='品質需要'+KITCHEN_GRADES[order.t]+'級以上。';return false;}
 const price=kitchenPrice(w);coins+=price;kitchen.earned+=price;kitchen.served++;if(kitchen.challenge===1&&COMBO[w.c].split('').filter(s=>s==='2').length>=2)kitchen.progress++;if(kitchen.challenge===2&&(w.t>=2||kitchenStars(w)>=1))kitchen.progress++;
 clear();kitchenRemoveOrder(index);kitchen.message='出餐成功！'+KITCHEN_NAMES[w.c]+' +'+price+' 金幣';if(!kitchen.orders.length&&!kitchen.queue.length)completeKitchenNight();else kitchenStep();renderKitchen();return true;
}
function stage21_useExpeditionFood(index){
 const b=expeditionState.lastBattle;if(!expandedGameEnabled()||!expeditionFoodReady(b))return false;const option=expeditionFoodOptions().find(x=>x.index===index);if(!option||option.w!==b.foodChoice)return false;const w=option.w,e=dishSupplyEffect(w);
 if(b.hp>=b.hpMax&&!e.attack&&!e.shield){toast('生命已滿，這份回血料理先留在冰箱。');return false;}
 const restored=Math.min(b.hpMax-b.hp,Math.round(b.hpMax*e.heal)),shield=Math.round(b.hpMax*e.shield);kitchen.pack.splice(index,1);b.hp=Math.min(b.hpMax,b.hp+restored);b.foodRecovered=Math.min(b.hp,(b.foodRecovered||0)+restored);b.shield+=shield;
 if(e.attack){b.foodAttack=Math.max(b.foodAttack||0,e.attack);b.foodAttackTurns=2;}b.foodUsed=(b.foodUsed||0)+1;b.foodCooldown=0;
 b.log.push({actor:'hero',supply:true,healed:restored,addedShield:shield,hp:b.hp,shield:b.shield,enemyHp:b.enemyHp,text:'🍱 使用'+kitchenItemName(w)+'：恢復 '+restored+' 生命'+(shield?'、護盾 +'+shield:'')+(e.attack?'、下兩次普通攻擊 +'+Math.round(e.attack*100)+'%':'')+'（料理已消耗）'});
 renderExpeditionBattle();return true;
}
function stage21_settleExpeditionBattle(b){
 if(b.resolved||b.outcome==='ongoing')return;stopExpeditionPlayback();b.resolved=true;b.guarding=false;b.guardRemainingMs=0;b.chargeName=null;b.chargeRemainingMs=0;
 if(b.outcome==='win'&&!expeditionCleared(b.stage)){
  b.gold=b.monster.gold;b.loot=b.stage<20?{k:'bp',id:b.stage}:null;coins+=b.gold;earned+=b.gold;dEarn+=b.gold;expeditionState.victories++;expeditionState.wonToday.push(b.stage);if(b.stage<20){expeditionState.cleared.push(b.stage);grantBlueprintItem(b.stage);}else expeditionState.endless=Math.max(expeditionState.endless||0,b.stage-19);expeditionState.unlocked=b.stage+1;
 }else if(b.outcome==='lose'&&!sandboxSession)lives=Math.max(0,lives-1);
 if(lives<=0)removeSave(runId);saveHi();render();saveNow();
}
function stage21_saveNow(){
  if(!active||testRun||day<1||lives<=0||!runId)return;
  const st={restaurant:snapshotRestaurant(),
    g,coins,earned,all,day,dTot,dServed,dEarn,dLeft,orders,dq,best,Q,MQ,
    heat,hand,shopD,magic,magicSet:[...magicSet],dMagic,dSold,lives,
    skills,pack,sp,bag,gachaUsed,skillDone,spentToday,phase,quests,qDone,dLv,pendingChests,lastCompletedDay,expedition:expeditionState,legendProjects,blueprintGoalId,collections:snapshotRunCollections(),ecology:snapshotEcology(),orderCapVersion:1,city:snapshotCity(),avatar:normalizeAvatar(playerAvatar),
    shopBought,leaves:[...leaves],frozen:[...frozen],seasonVersion:1,seasonNoticePending,seasonCraft:{day,charges:autumnForgeCharges},weaponMastery:snapshotWeaponMastery()
  };
  const e={
    id:runId,name:playerName||"玩家",date:runDate,time:runTime,avatar:normalizeAvatar(playerAvatar),
    coins,score:score(),day,updated:Date.now(),
    state:JSON.parse(JSON.stringify(st))
  };
  const i=saves.findIndex(x=>x.id===runId);
  if(i>=0)saves[i]=e;
  else if(saves.length<3)saves.push(e);
  else return;
  persistSaves();
}
function stage21_preview_openAdmin(){
 if(sandboxSession){showTown();return;}
 sandboxProfile={playerName,avatar:normalizeAvatar(playerAvatar),muted,hi,recs:JSON.parse(JSON.stringify(recs)),saves:JSON.parse(JSON.stringify(saves)),weapons:[...weaponAlbum],blueprints:[...legendBlueprints],legends:[...legendCollection]};sandboxEpoch++;sandboxStorage.clear();sandboxSession=true;
 $('title').style.display='none';cheat.m=true;cheat.s=true;start('normal',{test:true});
 skills.mm=1;coins=1e12;sp=9999;cityRevision++;seasonNoticePending=false;closeP('seasonP');render();showTown();toast('🧪 後台測試 · 無限金錢與冶煉技能點 · 測試進度獨立保存');
}
function stage21_finishSandbox(){if(!sandboxSession)return;const result=preview_finishSandbox(...arguments);installKitchenPreviewCatalog(false);clearKitchenPreviewScene();clearGeminiTown();cityState=freshCity();return result;}
