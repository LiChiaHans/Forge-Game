

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
 ['深淵苔皇','潮汐深林','slime','#4f9f8b',950,90,60,45,3400],
 ['雷嵐獵王','碎雷海岸','wolf','#81c7e5',1200,110,75,58,4100],
 ['玄晶巨像','玄晶礦脈','golem','#a39ed5',1500,130,95,52,4900],
 ['永夜劍侯','暗影王道','knight','#b38ebf',1800,150,105,70,5800],
 ['極寒霜后','冰海王庭','knight','#b5e7ef',2150,170,120,74,6800],
 ['熔日龍王','赤日熔城','dragon','#ef9d72',2600,190,135,78,7900],
 ['虛空追獵者','斷星天梯','wolf','#aa8fe2',3100,215,150,98,9100],
 ['界門鎮守者','世界裂隙','golem','#d9b67c',3650,245,175,85,10500],
 ['星噬古龍','終夜星海','dragon','#b6a0eb',4250,275,190,106,12200],
 ['終焉星冕王','終焉王座','knight','#f0d7a2',5000,310,220,115,15000]
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

function monsterArt(m){if(!expandedGameEnabled())return stage21_monsterArt(m);const id=monsterSpriteIndex(m);return '<svg viewBox="0 0 64 64" role="img" aria-label="'+esc(m.name)+'" data-monster-art="'+id+'"><image href="'+REVIEW_MONSTER_ART[id]+'" width="64" height="64" preserveAspectRatio="xMidYMid meet" style="image-rendering:pixelated"/></svg>';}
function bossRule(m){return m.kind==='dragon'?'巨龍循環：蓄力 → 雙倍重擊 → 普通攻擊。蓄力時不造成傷害，可準備防禦或延緩技能。':m.kind==='golem'?'魔像每第三次行動後硬化，下一次受到的物理傷害減少 60%；奧術與主動技能不受影響。':m.kind==='wolf'?'狼王每第三次行動使用兩段連擊，每段為 60% 攻擊；防禦分別抵擋兩段傷害。':'以普通攻擊交戰，速度決定出手頻率。';}
function bossIntent(b){const next=(b.enemyTurns||0)+1,m=b.monster;if(m.kind==='dragon')return ['蓄力（本次不攻擊）','蓄力重擊 ×2','普通攻擊'][(next-1)%3];if(m.kind==='wolf'&&next%3===0)return '雙段連擊（各 60%）';if(m.kind==='golem'&&next%3===0)return '攻擊後硬化';return '普通攻擊';}
function guardBattle(b){if(!b||b.resolved||b.outcome!=='ongoing'||b.guardUsed)return false;b.guardUsed=true;b.guarding=true;return true;}
function useExpeditionGuard(){if(guardBattle(expeditionState.lastBattle))renderExpeditionBattle();}
function expeditionBattleState(w,monster){
 const stats=weaponStats(w),hpMax=100+stats.def*2;
 return {weapon:JSON.parse(JSON.stringify(w)),monster:JSON.parse(JSON.stringify(monster)),stats,hpMax,hp:hpMax,shield:stats.ward,enemyHp:monster.hp,heroClock:1000/Math.max(1,stats.spd),enemyClock:1000/Math.max(1,monster.spd),enemyDef:monster.def,skillUsed:false,guardUsed:false,guarding:false,enemyTurns:0,bossHardened:false,outcome:'ongoing',resolved:false,log:[]};
}
function battleTick(b){
 if(!expandedGameEnabled())return stage20_battleTick(b);const start=b.log.length,attack=b.stats.atk,boost=b.foodAttackTurns>0?b.foodAttack||0:0;
 try{if(boost)b.stats.atk=Math.round(attack*(1+boost));stage20_battleTick(b);}finally{b.stats.atk=attack;}
 const row=b.log.length>start?b.log.at(-1):null;if(row?.actor==='hero'){if(b.foodCooldown>0)b.foodCooldown--;if(b.foodAttackTurns>0){b.foodAttackTurns--;row.foodBoost=boost;if(boost)row.text+=' · 料理增幅';if(!b.foodAttackTurns)b.foodAttack=0;}}
}

function checkBattleOutcome(b){b.outcome=b.enemyHp<=0?'win':b.hp<=0?'lose':b.log.length>=120?'draw':'ongoing';return b.outcome;}
function castBattleSkill(b){
 const skill=ultimateSkill(b.weapon);if(!skill||b.skillUsed||b.outcome!=='ongoing')return false;
 b.skillUsed=true;const mult=elementMultiplier(elementOf(b.weapon),elementOf(b.monster)),damage=Math.min(b.enemyHp,Math.max(1,Math.round(b.stats.atk*skill.power*mult)+b.stats.arcane));b.enemyHp-=damage;
 const healed=Math.min(b.hpMax-b.hp,Math.round(b.hpMax*(skill.heal||0)));b.hp+=healed;
 const addedShield=Math.round(b.stats.def*(skill.shield||0));b.shield+=addedShield;
 b.enemyDef=Math.round(b.enemyDef*(1-(skill.break||0)));b.enemyClock+=(skill.delay||0)*1000/Math.max(1,b.monster.spd);
 b.log.push({actor:'hero',skill:true,damage,hp:b.hp,shield:b.shield,enemyHp:b.enemyHp,text:'✦ '+skill.name+'！'+damage+' 傷害'+(healed?' · 回復 '+healed:'')+(addedShield?' · 護盾 +'+addedShield:'')+(skill.break?' · 破甲':'')+(skill.delay?' · 延緩敵方':'')});checkBattleOutcome(b);return true;
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
 const b=expeditionBattleState(chosen.w,expeditionMonster(expeditionStage));if(!consumeExpeditionWeapon(chosen))return;
 battleUserPaused=false;battleLastAdvance=0;expeditionFoodOpen=false;stopExpeditionPlayback();expeditionState.attempts++;expeditionState.lastBattle={...b,stage:expeditionStage,gold:0,loot:null,first:true,day};expeditionSelected='';expeditionBattleStep=0;
 // Save the consumed weapon before the first action. Reload/exit never refunds it or grants an unearned reward.
 saveNow();if(sandboxSession)saveReviewProgress();render();$('expeditionSetup').hidden=true;$('expeditionBattle').hidden=false;renderExpeditionBattle();
 expeditionTimer=setInterval(advanceExpeditionBattle,420);
}
function advanceExpeditionBattle(){if(!expandedGameEnabled())return stage21_advanceExpeditionBattle();const b=expeditionState.lastBattle;if(!b||b.resolved||b.outcome!=='ongoing')return stage21_advanceExpeditionBattle();const now=Date.now(),pace=expeditionFoodOpen?840:420;if(battleUserPaused||battleLastAdvance&&now-battleLastAdvance<pace-20)return;battleLastAdvance=now;const rows=b.log.length;stage21_advanceExpeditionBattle();if(b.log.length>rows)showBattleFeedback(b.log.at(-1));}
function useExpeditionSkill(){const b=expeditionState.lastBattle;if(!b||!castBattleSkill(b))return;expeditionBattleStep=b.log.length;combatSound('hero');if(b.outcome!=='ongoing')settleExpeditionBattle(b);renderExpeditionBattle();}
function settleExpeditionBattle(b){const fresh=b&&!b.resolved&&b.outcome!=='ongoing';const result=stage21_settleExpeditionBattle(b);if(fresh){reviewMetrics.battles.push({stage:b.stage+1,result:b.outcome==='win'?'勝利':b.outcome==='lose'?'生命歸零':'回合上限或撤退',supplies:b.foodUsed||0});reviewMetrics.battles=reviewMetrics.battles.slice(-50);saveReviewProgress();}return result;}
function stopExpeditionPlayback(){clearBattleFeedback();if(expeditionTimer!==null){clearInterval(expeditionTimer);expeditionTimer=null;}if(expeditionAdvanceTimer!==null){clearTimeout(expeditionAdvanceTimer);expeditionAdvanceTimer=null;}}
function finishExpeditionPlayback(){
 const b=expeditionState.lastBattle;if(!b||b.resolved)return;while(b.outcome==='ongoing')battleTick(b);expeditionBattleStep=b.log.length;settleExpeditionBattle(b);renderExpeditionBattle();
}
function showExpeditionSetup(){stopExpeditionPlayback();$('expeditionSetup').hidden=false;$('expeditionBattle').hidden=true;renderExpedition();$('expeditionSetup').scrollIntoView?.({block:'start'});}
function openExpedition(){
 syncExpeditionDay();const b=expeditionState.lastBattle;
 if(b&&b.outcome==='ongoing'&&!b.resolved){$('expeditionP').style.display='flex';$('expeditionSetup').hidden=true;$('expeditionBattle').hidden=false;renderExpeditionBattle();if(expeditionTimer===null)expeditionTimer=setInterval(advanceExpeditionBattle,420);return;}
 expeditionStage=sandboxSession?Math.max(0,expeditionLab.stage-1):expeditionState.unlocked;saveNow();$('expeditionP').style.display='flex';showExpeditionSetup();
}
function closeExpedition(){
 const b=expeditionState.lastBattle;if(b?.outcome==='ongoing'&&!b.resolved){b.outcome='draw';settleExpeditionBattle(b);}stopExpeditionPlayback();$('expeditionP').style.display='none';if(lives<=0)gameOver('遠征落敗，最後一顆愛心已用完。');
}