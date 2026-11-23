

const EXPEDITIONS=[
 {name:'苔原史萊姆',area:'林間小徑',kind:'slime',color:'#81ad67',hp:65,atk:12,def:3,spd:8,gold:120,loot:{k:'o',t:1}},
 {name:'疾風灰狼',area:'風嘯森林',kind:'wolf',color:'#a3b9bc',hp:115,atk:18,def:6,spd:18,gold:200,loot:{k:'m',s:0}},
 {name:'岩甲魔像',area:'廢棄礦坑',kind:'golem',color:'#99a397',hp:180,atk:22,def:22,spd:8,gold:300,loot:{k:'d',t:0}},
 {name:'盜賊隊長',area:'舊城商道',kind:'knight',color:'#af7773',hp:220,atk:31,def:16,spd:25,gold:450,loot:{k:'o',t:2}},
 {name:'冰霜守衛',area:'霜封哨站',kind:'golem',color:'#a5dbe8',hp:280,atk:35,def:26,spd:17,gold:650,loot:{k:'d',t:1}},
 {name:'熔火魔獸',area:'赤焰山谷',kind:'dragon',color:'#dc9470',hp:340,atk:42,def:20,spd:27,gold:900,loot:{k:'o',t:3}},
 {name:'夜影獵豹',area:'月影古林',kind:'wolf',color:'#a593c7',hp:400,atk:46,def:25,spd:42,gold:1200,loot:{k:'d',t:2}},
 {name:'遺跡巨兵',area:'沉睡王陵',kind:'golem',color:'#c3b17b',hp:480,atk:58,def:38,spd:20,gold:1500,loot:{k:'o',t:4}},
 {name:'暮色飛龍',area:'龍脊山巔',kind:'dragon',color:'#a587b5',hp:580,atk:65,def:36,spd:32,gold:2000,loot:{k:'d',t:3}},
 {name:'古王之鎧',area:'星隕王座',kind:'knight',color:'#e0c57a',hp:700,atk:75,def:45,spd:34,gold:2600,loot:{k:'d',t:4}}
];
const SECOND_BOSSES=[
 ['深淵苔皇','潮汐深林','slime','#4f9f8b',1100,99,66,47,3400],
 ['雷嵐獵王','碎雷海岸','wolf','#81c7e5',1400,123,84,61,4100],
 ['玄晶巨像','玄晶礦脈','golem','#a39ed5',1800,147,108,55,4900],
 ['永夜劍侯','暗影王道','knight','#b38ebf',2250,173,121,75,5800],
 ['極寒霜后','冰海王庭','knight','#b5e7ef',2750,198,140,79,6800],
 ['熔日龍王','赤日熔城','dragon','#ef9d72',3400,225,160,84,7900],
 ['虛空追獵者','斷星天梯','wolf','#aa8fe2',4200,258,180,106,9100],
 ['界門鎮守者','世界裂隙','golem','#d9b67c',5050,298,213,93,10500],
 ['星噬古龍','終夜星海','dragon','#b6a0eb',6000,339,234,116,12200],
 ['終焉星冕王','終焉王座','knight','#f0d7a2',7250,388,275,127,15000]
];
SECOND_BOSSES.forEach(([name,area,kind,color,hp,atk,def,spd,gold])=>EXPEDITIONS.push({name,area,kind,color,hp,atk,def,spd,gold,cycle:2}));
function freshExpeditionState(){return {day:0,attempts:0,unlocked:0,cleared:[],wonToday:[],victories:0,endless:0,lastBattle:null};}
let expeditionState=freshExpeditionState(),expeditionSelected='',expeditionStage=0,expeditionBattleStep=0,expeditionTimer=null;

function restoreExpeditionState(raw){
 const r=raw&&typeof raw==='object'?raw:{},s=freshExpeditionState();
 s.day=Math.max(0,Number(r.day)||0);s.attempts=Math.max(0,Math.floor(Number(r.attempts)||0));
 s.cleared=[...new Set((Array.isArray(r.cleared)?r.cleared:[]).filter(x=>Number.isInteger(x)&&x>=0&&x<EXPEDITIONS.length))];
 s.wonToday=[...new Set((Array.isArray(r.wonToday)?r.wonToday:[]).filter(x=>Number.isInteger(x)&&x>=0&&x<EXPEDITIONS.length))];
 s.endless=Math.max(0,Math.min(999980,Math.floor(Number(r.endless)||0)));
 s.unlocked=s.cleared.includes(19)?20+s.endless:Math.max(0,Math.min(EXPEDITIONS.length-1,s.cleared.length?Math.max(...s.cleared)+1:0));
 s.victories=Math.max(s.cleared.length,Math.floor(Number(r.victories)||0));
 s.lastBattle=r.lastBattle&&Number.isInteger(r.lastBattle.stage)&&r.lastBattle.stage>=0&&r.lastBattle.stage<1000000&&r.lastBattle.weapon&&r.lastBattle.stats&&Array.isArray(r.lastBattle.log)?r.lastBattle:null;
 if(s.lastBattle){if(s.lastBattle.outcome==='ongoing')s.lastBattle.outcome='draw';s.lastBattle.resolved=true;}
 return s;
}
function syncExpeditionDay(){
 syncMonsterElements();
 if(day>0&&expeditionState.day!==day){expeditionState.day=day;expeditionState.attempts=0;expeditionState.wonToday=[];}
}
function expeditionWeapons(){
 const a=[];[['g',g],['pack',pack],['bag',bag]].forEach(([where,list])=>(list||[]).forEach((w,i)=>{if(w&&w.k==='w')a.push({key:where+':'+i,w,source:{g:'棋盤',pack:'武器箱',bag:'道具箱'}[where]});}));
 if(hand&&hand.k==='w')a.push({key:'hand',w:hand,source:'手持'});if(sandboxSession)a.unshift({key:'lab',w:labWeapon(),source:'後台測試武器'});return a;
}

function monsterArt(m){const id=monsterSpriteIndex(m);return '<svg viewBox="0 0 64 64" role="img" aria-label="'+esc(m.name)+'" data-monster-art="'+id+'"><image href="'+REVIEW_MONSTER_ART[id]+'" width="64" height="64" preserveAspectRatio="xMidYMid meet" style="image-rendering:pixelated"/></svg>';}
function baseBossRule(m){return m.kind==='dragon'?'巨龍循環：蓄力 → 雙倍重擊 → 普通攻擊。蓄力時不造成傷害，可準備防禦或延緩技能。':m.kind==='golem'?'魔像每第三次行動後硬化，下一次受到的物理傷害減少 60%；奧術與主動技能不受影響。':m.kind==='wolf'?'狼王每第三次行動使用兩段連擊，每段為 60% 攻擊；防禦分別抵擋兩段傷害。':'以普通攻擊交戰，速度決定出手頻率。';}
function bossIntent(b){const next=(b.enemyTurns||0)+1,m=b.monster;if(m.kind==='dragon')return ['蓄力（本次不攻擊）','蓄力重擊 ×2','普通攻擊'][(next-1)%3];if(m.kind==='wolf'&&next%3===0)return '雙段連擊（各 60%）';if(m.kind==='golem'&&next%3===0)return '攻擊後硬化';return '普通攻擊';}
function guardBattle(b){if(!b||b.resolved||b.outcome!=='ongoing'||b.guardUsed)return false;b.guardUsed=true;b.guarding=true;b.guardRemainingMs=EXPEDITION_GUARD_MS;b.effectStamp=Date.now();return true;}
function useExpeditionGuard(){syncExpeditionEffects();if(guardBattle(expeditionState.lastBattle))renderExpeditionBattle();}
function expeditionBattleState(w,monster){
 const base=weaponStats(w),mb=medalBonuses(),cb=typeof contractBonuses==='function'?contractBonuses():{battleAtk:0,battleDef:0},effective=Math.min(20,base.stacks||0);
 const stats={...base,atk:Math.round(base.atk*(1+mb.battleAtk+(cb.battleAtk||0))),def:Math.round(base.def*(1+mb.battleDef+(cb.battleDef||0))),spd:Math.round(base.spd*(1+mb.battleSpd)),arcane:base.arcane+effective*mb.enchantExtra,ward:base.ward+effective*mb.enchantExtra};
 const hpMax=100+stats.def*2,shield=stats.ward+Math.round(hpMax*mb.battleStartShield);
 return initCombatTraits({weapon:JSON.parse(JSON.stringify(w)),monster:JSON.parse(JSON.stringify(monster)),stats,hpMax,hp:hpMax,shield,enemyHp:monster.hp,heroClock:1000/Math.max(1,stats.spd),enemyClock:1000/Math.max(1,monster.spd),enemyDef:monster.def,skillUsed:false,guardUsed:false,guarding:false,guardRemainingMs:0,foodRecovered:0,enemyTurns:0,bossHardened:false,outcome:'ongoing',resolved:false,log:[]});
}
function runBattleTurn(b){
 if(b.outcome!=='ongoing')return;const s=b.stats,m=b.monster,heroElement=elementOf(b.weapon),enemyElement=elementOf(m);let row;
 if(b.heroClock<=b.enemyClock){
  // Time still passes while guarding, but a missed attack is never banked for later.
  if(b.guarding){b.heroClock+=1000/Math.max(1,s.spd);return;}
  const profile=weaponAttackProfile(b),mult=elementMultiplier(heroElement,enemyElement),base=Math.max(1,Math.round(s.atk*mult*profile.power)-Math.floor(b.enemyDef*(1-profile.ignore)*.6)),physical=Math.max(1,Math.round(base*(b.bossHardened?.4:1)*bossPhysicalFactor(b))),hardened=!!b.bossHardened,raw=physical+s.arcane+profile.arcane+profile.counter,absorbed=Math.min(b.enemyWard||0,raw),damage=Math.min(b.enemyHp,raw-absorbed);b.enemyWard=Math.max(0,(b.enemyWard||0)-absorbed);b.bossHardened=false;b.enemyHp-=damage;b.heroClock+=1000/Math.max(1,s.spd);
  row={actor:'hero',damage,effect:profile.text,element:heroElement,multiplier:mult,text:elementName(heroElement)+'屬性命中 '+damage+' 傷害（×'+mult.toFixed(2)+'）'+(hardened?' · 硬化抵擋部分物理傷害':'')+(profile.text?' · '+profile.text:'')+(absorbed?' · 敵盾吸收 '+absorbed:'')};applyHeroExtra(b,row);
 }else{
  b.enemyTurns=(b.enemyTurns||0)+1;const turn=b.enemyTurns,phase=(turn-1)%3,mult=elementMultiplier(enemyElement,heroElement),charge=m.kind==='dragon'&&phase===0,heavy=m.kind==='dragon'&&phase===1,hits=m.kind==='wolf'&&turn%3===0?2:1,power=heavy?2:hits===2?.6:1;
  let damage=0,absorbed=0;const traitPower=charge?1:bossAttackPower(b);
  if(!charge){for(let k=0;k<hits;k++){let raw=Math.max(1,Math.round(m.atk*mult*power*traitPower)-Math.floor(s.def*.6));raw=weaponIncoming(b,raw);if(b.guarding)raw=Math.max(1,Math.ceil(raw*.4));const block=Math.min(b.shield,raw);b.shield-=block;absorbed+=block;const hit=Math.min(b.hp,raw-block);b.hp-=hit;damage+=hit;}b.enemyAttacks=(b.enemyAttacks||0)+1;const defended=b.guarding;b.foodRecovered=Math.max(0,(b.foodRecovered||0)-damage);row={actor:'enemy',damage,absorbed,element:enemyElement,multiplier:mult,text:m.name+(heavy?' 蓄力重擊':hits===2?' 雙段連擊':'攻擊')+'造成 '+damage+' 傷害'+(defended?' · 防禦架勢減傷 60%':'')+(absorbed?' · 護盾吸收 '+absorbed:'')};}
  else row={actor:'enemy',damage:0,absorbed:0,charge:true,text:m.name+' 正在蓄力，下一次將使用雙倍重擊！'};
  if(m.kind==='golem'&&turn%3===0){b.bossHardened=true;row.text+=' · 進入硬化';}
  b.enemyClock+=1000/Math.max(1,m.spd);applyBossAfterAction(b,row);
 }
 b.log.push({...row,hp:b.hp,shield:b.shield,enemyHp:b.enemyHp});checkBattleOutcome(b);
}
function battleTick(b){
 const start=b.log.length,attack=b.stats.atk,boost=b.foodAttackTurns>0?b.foodAttack||0:0;
 try{if(boost)b.stats.atk=Math.round(attack*(1+boost));runBattleTurn(b);}finally{b.stats.atk=attack;}
 const row=b.log.length>start?b.log.at(-1):null;if(row?.actor==='hero'){if(b.foodCooldown>0)b.foodCooldown--;if(b.foodAttackTurns>0){b.foodAttackTurns--;row.foodBoost=boost;if(boost)row.text+=' · 料理增幅';if(!b.foodAttackTurns)b.foodAttack=0;}}
}

function checkBattleOutcome(b){b.outcome=b.enemyHp<=0?'win':b.hp<=0?'lose':b.log.length>=120?'draw':'ongoing';return b.outcome;}
function castBattleSkill(b){
 const skill=ultimateSkill(b.weapon);if(!skill||b.skillUsed||b.guarding||b.outcome!=='ongoing')return false;
 b.skillUsed=true;const mult=elementMultiplier(elementOf(b.weapon),elementOf(b.monster)),raw=Math.max(1,Math.round(b.stats.atk*skill.power*mult)+b.stats.arcane),absorbed=Math.min(b.enemyWard||0,raw),damage=Math.min(b.enemyHp,raw-absorbed);b.enemyWard=Math.max(0,(b.enemyWard||0)-absorbed);b.enemyHp-=damage;
 const healed=Math.min(b.hpMax-b.hp,Math.round(b.hpMax*(skill.heal||0)));b.hp+=healed;
 const addedShield=Math.round(b.stats.def*(skill.shield||0));b.shield+=addedShield;
 b.enemyDef=Math.round(b.enemyDef*(1-(skill.break||0)));if(skill.break&&bossTraitIndex(b.monster)===2)b.enemyDef=Math.max(0,b.enemyDef-Math.round(b.monster.def*.03));b.enemyClock+=(skill.delay||0)*1000/Math.max(1,b.monster.spd);
 b.log.push({actor:'hero',skill:true,damage,hp:b.hp,shield:b.shield,enemyHp:b.enemyHp,text:'✦ '+skill.name+'！'+damage+' 傷害'+(absorbed?' · 敵盾吸收 '+absorbed:'')+(healed?' · 回復 '+healed:'')+(addedShield?' · 護盾 +'+addedShield:'')+(skill.break?' · 破甲':'')+(skill.delay?' · 延緩敵方':'')});checkBattleOutcome(b);return true;
}
// Kept pure for balance checks; the actual battle advances one action at a time.
function simulateExpedition(w,monster,useSkill=false){const b=expeditionBattleState(w,monster);if(useSkill)castBattleSkill(b);while(b.outcome==='ongoing')battleTick(b);return b;}
let expeditionAdvanceTimer=null;
function consumeExpeditionWeapon(chosen){
 if(chosen.key==='lab')return !!sandboxSession;
 if(chosen.key==='hand'){if(hand!==chosen.w)return false;hand=null;}
 else{const [where,index]=chosen.key.split(':'),list=where==='g'?g:where==='pack'?pack:where==='bag'?bag:null,i=Number(index);if(!list||list[i]!==chosen.w)return false;if(where==='bag')list.splice(i,1);else list[i]=null;}
 return true;
}
function beginExpedition(confirmed=false){
 syncExpeditionDay();if((!sandboxSession&&(lives<=0||expeditionStage>expeditionState.unlocked||expeditionCleared(expeditionStage)))||$('expeditionSetup').hidden)return;
 if(!sandboxSession&&lives===1&&!confirmed){confirmBox('只剩最後一顆愛心','這次遠征若落敗，會失去最後一顆愛心並結束遊戲。出戰武器也會消耗。確定要挑戰嗎？','仍要挑戰',()=>beginExpedition(true));return;}
 const chosen=expeditionWeapons().find(x=>x.key===expeditionSelected);if(!chosen)return;if(chosen.w.protected){toast('請先取消武器保護才能出戰');return;}
 if(expeditionFoodSelected&&!expeditionFoodOptions().some(x=>x.w===expeditionFoodSelected)){expeditionFoodSelected=null;renderExpeditionFoodSetup();toast('選定料理已不可用，請重新選擇。');return;}
 const b=expeditionBattleState(chosen.w,expeditionMonster(expeditionStage));b.foodChoice=expeditionFoodSelected;if(!consumeExpeditionWeapon(chosen))return;
 battleUserPaused=false;battleLastAdvance=0;expeditionFoodOpen=false;stopExpeditionPlayback();expeditionState.attempts++;expeditionState.lastBattle={...b,stage:expeditionStage,gold:0,loot:null,first:true,day};expeditionSelected='';expeditionBattleStep=0;
 // Save the consumed weapon before the first action. Reload/exit never refunds it or grants an unearned reward.
 saveNow();if(sandboxSession)saveReviewProgress();render();$('expeditionSetup').hidden=true;$('expeditionBattle').hidden=false;renderExpeditionBattle();
 expeditionTimer=setInterval(advanceExpeditionBattle,420);startExpeditionFeedbackClock();
}
function stepExpeditionBattle(){
 const b=expeditionState.lastBattle;if(!b||b.outcome!=='ongoing'){stopExpeditionPlayback();return;}
 const rows=b.log.length;battleTick(b);expeditionBattleStep=b.log.length;if(b.log.length>rows)combatSound(b.log.at(-1).actor);
 if(b.outcome!=='ongoing')settleExpeditionBattle(b);renderExpeditionBattle();
}
function advanceExpeditionBattle(){
 const b=expeditionState.lastBattle;if(!b||b.resolved||b.outcome!=='ongoing')return stepExpeditionBattle();const now=Date.now();syncExpeditionEffects(now);
 if(battleUserPaused||document.hidden||battleLastAdvance&&now-battleLastAdvance<400)return;
 if((b.guarding||b.heroClock>b.enemyClock)&&b.chargeName&&b.chargeRemainingMs>0)return;
 battleLastAdvance=now;const rows=b.log.length;stepExpeditionBattle();if(b.log.length>rows)showBattleFeedback(b.log.at(-1));
}
function useExpeditionSkill(){syncExpeditionEffects();const b=expeditionState.lastBattle;if(!b||!castBattleSkill(b))return;expeditionBattleStep=b.log.length;combatSound('hero');if(b.outcome!=='ongoing')settleExpeditionBattle(b);renderExpeditionBattle();if(typeof triggerExpeditionCutIn==='function')triggerExpeditionCutIn(b.weapon);}
function settleExpeditionBattle(b){
 if(!b||b.resolved||b.outcome==='ongoing')return;stopExpeditionPlayback();b.resolved=true;b.guarding=false;b.guardRemainingMs=0;b.chargeName=null;b.chargeRemainingMs=0;
 if(b.outcome==='win'&&!expeditionCleared(b.stage)){
  b.gold=Math.round(b.monster.gold*(1+medalBonuses().expeditionGold+(typeof contractBonuses==='function'?contractBonuses().expeditionGold||0:0)));b.loot=b.stage<20?{k:'bp',id:b.stage}:null;coins+=b.gold;earned+=b.gold;dEarn+=b.gold;expeditionState.victories++;expeditionState.wonToday.push(b.stage);if(b.stage<20){expeditionState.cleared.push(b.stage);grantBlueprintItem(b.stage);}else expeditionState.endless=Math.max(expeditionState.endless||0,b.stage-19);expeditionState.unlocked=b.stage+1;
 }else if(b.outcome==='lose'&&!sandboxSession)lives=Math.max(0,lives-1);
 syncAchievementMedals();if(lives<=0)removeSave(runId);saveHi();render();saveNow();
 reviewMetrics.battles.push({stage:b.stage+1,result:b.outcome==='win'?'勝利':b.outcome==='lose'?'生命歸零':'回合上限或撤退',supplies:b.foodUsed||0});reviewMetrics.battles=reviewMetrics.battles.slice(-50);saveReviewProgress();
}
function stopExpeditionPlayback(){stopExpeditionFeedbackClock();clearBattleFeedback();if(expeditionTimer!==null){clearInterval(expeditionTimer);expeditionTimer=null;}if(expeditionAdvanceTimer!==null){clearTimeout(expeditionAdvanceTimer);expeditionAdvanceTimer=null;}}
function finishExpeditionPlayback(){
 const b=expeditionState.lastBattle;if(!b||b.resolved)return;while(b.outcome==='ongoing'){primeExpeditionCharge(b);advanceExpeditionEffects(b,420+(b.heroClock>b.enemyClock?b.chargeRemainingMs||0:0));battleTick(b);}expeditionBattleStep=b.log.length;settleExpeditionBattle(b);renderExpeditionBattle();
}
function showExpeditionSetup(){stopExpeditionPlayback();expeditionFoodSelected=null;$('expeditionSetup').hidden=false;$('expeditionBattle').hidden=true;renderExpedition();$('expeditionSetup').scrollIntoView?.({block:'start'});}
function openExpedition(){
 syncExpeditionDay();const b=expeditionState.lastBattle;
 if(b&&b.outcome==='ongoing'&&!b.resolved){$('expeditionP').style.display='flex';$('expeditionSetup').hidden=true;$('expeditionBattle').hidden=false;renderExpeditionBattle();if(expeditionTimer===null)expeditionTimer=setInterval(advanceExpeditionBattle,420);startExpeditionFeedbackClock();return;}
 expeditionStage=sandboxSession?Math.max(0,expeditionLab.stage-1):expeditionState.unlocked;saveNow();$('expeditionP').style.display='flex';showExpeditionSetup();
}
function closeExpedition(){
 const b=expeditionState.lastBattle;if(b?.outcome==='ongoing'&&!b.resolved){b.outcome='draw';settleExpeditionBattle(b);}stopExpeditionPlayback();$('expeditionP').style.display='none';if(lives<=0)gameOver('遠征落敗，最後一顆愛心已用完。');
}
