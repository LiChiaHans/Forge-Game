const WEAPON_ROLES=[
 {name:'疾爪',stats:{atk:.9,spd:1.35},scale:{third:[.2,.25,.3,.35,.4,.45,.5]}},
 {name:'重斬',stats:{},scale:{third:[.3,.35,.4,.45,.5,.55,.65]}},
 {name:'迴旋護刃',stats:{},scale:{gain:[.08,.1,.12,.14,.16,.18,.2],cap:[.4,.5,.6,.7,.8,.9,1]}},
 {name:'穿刺',stats:{},scale:{first:[.5,.55,.6,.65,.7,.75,.8],after:[.1,.15,.2,.25,.3,.35,.4]}},
 {name:'堅甲',stats:{atk:.85,def:1.25},scale:{reduce:[.08,.1,.12,.15,.18,.21,.25]}},
 {name:'震擊',stats:{atk:1.6,def:.75},scale:{third:[.25,.3,.35,.4,.45,.5,.6],delay:[.35,.45,.5,.6,.7,.8,.9]}},
 {name:'靈能杖',stats:{},scale:{arcane:[.15,.2,.25,.3,.35,.4,.45]}},
 {name:'開拓者',stats:{atk:1.2},scale:{heal:[.04,.05,.06,.08,.1,.12,.14]}},
 {name:'裂甲',stats:{atk:2,def:.65,spd:.9},scale:{step:[.04,.05,.06,.07,.08,.09,.1],cap:[.3,.35,.4,.45,.5,.55,.6]}},
 {name:'盾返',stats:{},scale:{gain:[.25,.3,.35,.4,.45,.5,.6],cap:[.8,.9,1,1.15,1.3,1.45,1.6]}}
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
function weaponTraitTier(w){
 if(isUltimate(w))return 6;
 const raw=isLegend(w)?(LEGENDS[w.legendId]?.tier??w?.t):w?.t;
 const base=Math.max(0,Math.min(4,Math.floor(Number(raw)||0)));
 return isLegend(w)?Math.min(5,base+1):base;
}
function weaponTraitTierLabel(w){
 if(isUltimate(w))return '終極';
 const raw=isLegend(w)?(LEGENDS[w.legendId]?.tier??w?.t):w?.t;
 const base=Math.max(0,Math.min(4,Math.floor(Number(raw)||0)));
 return NM[base]+'級'+(isLegend(w)?'傳說':'');
}
function weaponTraitValues(w){
 const role=weaponTrait(w),tier=weaponTraitTier(w),out={tier};
 for(const [key,arr]of Object.entries(role.scale))out[key]=arr[Math.min(arr.length-1,tier)];
 return out;
}
function weaponTraitText(w){
 const c=w?.c??1,v=weaponTraitValues(w),pct=n=>Math.round(n*100)+'%';
 if(c===0||c===1)return '每第三次普通攻擊傷害提高 '+pct(v.third)+'。';
 if(c===2)return '每次普通命中獲得防禦 '+pct(v.gain)+' 的護盾；此效果累計最多防禦 '+pct(v.cap)+'。';
 if(c===3)return '首次普通攻擊忽略 '+pct(v.first)+' 防禦，之後忽略 '+pct(v.after)+'。';
 if(c===4)return '受到的怪物攻擊傷害再減少 '+pct(v.reduce)+'。';
 if(c===5)return '每第三次普通攻擊傷害提高 '+pct(v.third)+'，並延緩敵方 '+v.delay+' 個行動週期。';
 if(c===6)return '每次普通攻擊額外造成速度 '+pct(v.arcane)+' 的奧術傷害。';
 if(c===7)return '每次普通命中回復防禦 '+pct(v.heal)+' 的生命，至少 1 點。';
 if(c===8)return '每次普通命中降低敵方初始防禦 '+pct(v.step)+'，累計最多 '+pct(v.cap)+'。';
 return '防禦架勢每次抵擋攻擊累積防禦 '+pct(v.gain)+' 的反擊傷害，最多防禦 '+pct(v.cap)+'；下一次普通攻擊釋放。';
}
function weaponTraitHTML(w){const t=weaponTrait(w);return '<div class="weapon-trait"><b>武器特性 · '+t.name+'（'+weaponTraitTierLabel(w)+'）</b><span>'+weaponTraitText(w)+'</span></div>';}
function bossTraitIndex(m){const i=Number.isInteger(m.traitIndex)?m.traitIndex:EXPEDITIONS.findIndex(x=>x.name===m.name);return i<0?-1:i%10;}
function bossRule(m){const i=bossTraitIndex(m);return baseBossRule(m)+(i<0?'':' 特性【'+BOSS_TRAITS[i][0]+'】：'+BOSS_TRAITS[i][1]);}
function initCombatTraits(b){if(bossTraitIndex(b.monster)===4)b.enemyWard=Math.round(b.monster.hp*.1);return b;}
function weaponAttackProfile(b){
 b.heroTurns=(b.heroTurns||0)+1;const n=b.heroTurns,c=b.weapon.c,third=n%3===0,v=weaponTraitValues(b.weapon);
 return {power:third&&[0,1,5].includes(c)?1+v.third:1,ignore:c===3?(n===1?v.first:v.after):0,arcane:c===6?Math.max(1,Math.round(b.stats.spd*v.arcane)):0,counter:c===9?(b.counterBonus||0):0,text:third&&[0,1,5].includes(c)?weaponTrait(b.weapon).name:c===3&&n===1?'穿刺':c===6?'靈能':c===9&&b.counterBonus?'盾返':''};
}
function bossPhysicalFactor(b){const id=bossTraitIndex(b.monster);return id===0&&(b.heroTurns||0)===1?.8:id===6&&(b.heroTurns||0)%3===0?.75:1;}
function applyHeroExtra(b,row){
 const c=b.weapon.c,s=b.stats,v=weaponTraitValues(b.weapon);if(c===9)b.counterBonus=0;
 if(c===2){const max=Math.round(s.def*v.cap),gain=Math.min(Math.round(s.def*v.gain),Math.max(0,max-(b.bladeWardGained||0)));b.shield+=gain;b.bladeWardGained=(b.bladeWardGained||0)+gain;if(gain)row.text+=' · 護刃 +'+gain+'盾';}
 if(c===5&&b.heroTurns%3===0)b.enemyClock+=v.delay*1000/Math.max(1,b.monster.spd);
 if(c===7){const healed=Math.min(b.hpMax-b.hp,Math.max(1,Math.round(s.def*v.heal)));b.hp+=healed;if(healed)row.text+=' · 回復 '+healed;}
 if(c===8&&b.enemyHp>0){const base=b.monster.def,broken=(b.axeBreak||0)<v.cap,extra=bossTraitIndex(b.monster)===2?.03:0;b.axeBreak=Math.min(v.cap,(b.axeBreak||0)+v.step);if(broken){const normal=Math.round(base*b.axeBreak)-(b.axeBreakDamage||0);b.axeBreakDamage=Math.round(base*b.axeBreak);b.enemyDef=Math.max(0,b.enemyDef-normal-Math.round(base*extra));row.text+=' · 裂甲';}}
 if(b.enemyHp>0&&bossTraitIndex(b.monster)===3&&b.heroTurns%4===0){const raw=Math.max(1,Math.round(b.monster.atk*.2)),block=Math.min(b.shield,raw);b.shield-=block;const damage=Math.min(b.hp,raw-block);b.hp-=damage;b.foodRecovered=Math.max(0,(b.foodRecovered||0)-damage);row.text+=' · 遭反擊 '+damage;}
}
function bossAttackPower(b){const id=bossTraitIndex(b.monster);let n=1;if(id===1&&!(b.enemyAttacks||0))n*=1.2;if(id===5)n*=1.1;if(id===8&&b.enemyHp<b.monster.hp*.5)n*=1.15;if(id===9&&!b.royalUsed&&b.enemyHp<b.monster.hp*.25){n*=1.25;b.royalUsed=true;}return n;}
function weaponIncoming(b,raw){const v=weaponTraitValues(b.weapon);if(b.weapon.c===4)raw=Math.max(1,Math.ceil(raw*(1-v.reduce)));if(b.guarding&&b.weapon.c===9)b.counterBonus=Math.min(Math.round(b.stats.def*v.cap),(b.counterBonus||0)+Math.max(1,Math.round(b.stats.def*v.gain)));return raw;}
function applyBossAfterAction(b,row){if(bossTraitIndex(b.monster)===7&&b.enemyTurns%3===0&&b.enemyHp>0){const heal=Math.min(b.monster.hp-b.enemyHp,Math.round(b.monster.hp*.02));b.enemyHp+=heal;if(heal)row.text+=' · 遺跡修復 '+heal;}}
