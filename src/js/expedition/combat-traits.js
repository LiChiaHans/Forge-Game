const WEAPON_ROLES=[
 {name:'疾爪',stats:{atk:.9,spd:1.35},text:'每第三次普通攻擊傷害提高30%。'},
 {name:'重斬',stats:{},text:'每第三次普通攻擊傷害提高40%。'},
 {name:'迴旋護刃',stats:{},text:'每次普通命中獲得防禦12%的護盾；此效果累計最多防禦60%。'},
 {name:'穿刺',stats:{},text:'首次普通攻擊忽略60%防禦，之後忽略15%。'},
 {name:'堅甲',stats:{atk:.85,def:1.25},text:'受到的怪物攻擊傷害再減少12%。'},
 {name:'震擊',stats:{atk:1.6,def:.75},text:'每第三次普通攻擊傷害提高35%，並延緩敵方半個行動週期。'},
 {name:'靈能杖',stats:{},text:'每次普通攻擊額外造成速度20%的奧術傷害。'},
 {name:'開拓者',stats:{atk:1.2},text:'每次普通命中回復防禦6%的生命，至少1點。'},
 {name:'裂甲',stats:{atk:2,def:.65,spd:.9},text:'每次普通命中降低敵方初始防禦6%，累計最多40%。'},
 {name:'盾返',stats:{},text:'防禦架勢每次抵擋攻擊累積防禦35%的反擊傷害，最多防禦100%；下一次普通攻擊釋放。'}
];
const BOSS_TRAITS=[
 ['黏液外殼','首次受到的普通物理傷害減少20%；奧術與主動技能不受影響。'],
 ['獵手先機','第一次攻擊傷害提高20%；提前防禦可降低壓力。'],
 ['岩甲裂隙','被破甲時額外降低初始防禦3%；適合裂甲武器。'],
 ['戰術反擊','每受到四次普通攻擊，反擊20%攻擊傷害；可用重擊減少出手次數。'],
 ['寒霜屏障','開戰具有最大生命10%的護盾；破盾後不再恢復。'],
 ['灼熱吐息','普通攻擊額外提高10%傷害；適合護盾與堅甲。'],
 ['影步','每第三次受到的普通物理傷害減少25%；奧術與主動技能不受影響。'],
 ['遺跡修復','每第三次行動回復最大生命2%；需要集中輸出。'],
 ['龍血狂熱','生命低於一半時，攻擊傷害提高15%。'],
 ['王者決意','生命低於四分之一時，下次攻擊傷害提高25%，每場一次。']
];
function weaponTrait(w){return WEAPON_ROLES[w?.c]||WEAPON_ROLES[1];}
function weaponTraitHTML(w){const t=weaponTrait(w);return '<div class="weapon-trait"><b>武器特性 · '+t.name+'</b><span>'+t.text+'</span></div>';}
function bossTraitIndex(m){const i=Number.isInteger(m.traitIndex)?m.traitIndex:EXPEDITIONS.findIndex(x=>x.name===m.name);return i<0?-1:i%10;}
function bossRule(m){const i=bossTraitIndex(m);return baseBossRule(m)+(i<0?'':' 特性【'+BOSS_TRAITS[i][0]+'】：'+BOSS_TRAITS[i][1]);}
function initCombatTraits(b){if(bossTraitIndex(b.monster)===4)b.enemyWard=Math.round(b.monster.hp*.1);return b;}
function weaponAttackProfile(b){
 b.heroTurns=(b.heroTurns||0)+1;const n=b.heroTurns,c=b.weapon.c,third=n%3===0;
 return {power:third?(c===0?1.3:c===1?1.4:c===5?1.35:1):1,ignore:c===3?(n===1?.6:.15):0,arcane:c===6?Math.max(1,Math.round(b.stats.spd*.2)):0,counter:c===9?(b.counterBonus||0):0,text:third&&[0,1,5].includes(c)?weaponTrait(b.weapon).name:c===3&&n===1?'穿刺':c===6?'靈能':c===9&&b.counterBonus?'盾返':''};
}
function bossPhysicalFactor(b){const id=bossTraitIndex(b.monster);return id===0&&(b.heroTurns||0)===1?.8:id===6&&(b.heroTurns||0)%3===0?.75:1;}
function applyHeroExtra(b,row){
 const c=b.weapon.c,s=b.stats;if(c===9)b.counterBonus=0;
 if(c===2){const max=Math.round(s.def*.6),gain=Math.min(Math.round(s.def*.12),Math.max(0,max-(b.bladeWardGained||0)));b.shield+=gain;b.bladeWardGained=(b.bladeWardGained||0)+gain;if(gain)row.text+=' · 護刃 +'+gain+'盾';}
 if(c===5&&b.heroTurns%3===0)b.enemyClock+=.5*1000/Math.max(1,b.monster.spd);
 if(c===7){const healed=Math.min(b.hpMax-b.hp,Math.max(1,Math.round(s.def*.06)));b.hp+=healed;if(healed)row.text+=' · 回復 '+healed;}
 if(c===8&&b.enemyHp>0){const base=b.monster.def,broken=(b.axeBreak||0)<.4,extra=bossTraitIndex(b.monster)===2?.03:0;b.axeBreak=Math.min(.4,(b.axeBreak||0)+.06);if(broken){const normal=Math.round(base*b.axeBreak)-(b.axeBreakDamage||0);b.axeBreakDamage=Math.round(base*b.axeBreak);b.enemyDef=Math.max(0,b.enemyDef-normal-Math.round(base*extra));row.text+=' · 裂甲';}}
 if(b.enemyHp>0&&bossTraitIndex(b.monster)===3&&b.heroTurns%4===0){const raw=Math.max(1,Math.round(b.monster.atk*.2)),block=Math.min(b.shield,raw);b.shield-=block;const damage=Math.min(b.hp,raw-block);b.hp-=damage;b.foodRecovered=Math.max(0,(b.foodRecovered||0)-damage);row.text+=' · 遭反擊 '+damage;}
}
function bossAttackPower(b){const id=bossTraitIndex(b.monster);let n=1;if(id===1&&!(b.enemyAttacks||0))n*=1.2;if(id===5)n*=1.1;if(id===8&&b.enemyHp<b.monster.hp*.5)n*=1.15;if(id===9&&!b.royalUsed&&b.enemyHp<b.monster.hp*.25){n*=1.25;b.royalUsed=true;}return n;}
function weaponIncoming(b,raw){if(b.weapon.c===4)raw=Math.max(1,Math.ceil(raw*.88));if(b.guarding&&b.weapon.c===9)b.counterBonus=Math.min(Math.round(b.stats.def),(b.counterBonus||0)+Math.max(1,Math.round(b.stats.def*.35)));return raw;}
function applyBossAfterAction(b,row){if(bossTraitIndex(b.monster)===7&&b.enemyTurns%3===0&&b.enemyHp>0){const heal=Math.min(b.monster.hp-b.enemyHp,Math.round(b.monster.hp*.02));b.enemyHp+=heal;if(heal)row.text+=' · 遺跡修復 '+heal;}}
