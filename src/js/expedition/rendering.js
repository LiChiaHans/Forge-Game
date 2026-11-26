
const EXPEDITION_ARENA_ART={
 forest:'assets/arena/arena_forest.5528812724e2.jpg',
 magma:'assets/arena/arena_magma.3f8c6a56711e.jpg',
 frost:'assets/arena/arena_frost.28c4121b2cef.jpg',
 sanctum:'assets/arena/arena_sanctum.d4060a08cb02.jpg'
};
const WORKSHOP_FAMILIAR_ART={
 forge:'assets/arena/forge_familiar.e183ae1722af.png',
 kitchen:'assets/arena/kitchen_familiar.169e28c0ed42.png',
 hero:'assets/arena/expedition_hero.5c3b4c17bbe7.png',
 crest:'assets/arena/legend_anvil_crest.0c9710eeecad.png'
};
function expeditionArenaTheme(stage){
 const s=Math.max(0,Number(stage)||0);
 if(s>=15)return 'sanctum';
 if(s>=10)return 'frost';
 if(s>=5)return 'magma';
 return 'forest';
}

function renderExpeditionBattle(){
 const b=expeditionState.lastBattle;if(!b)return;syncExpeditionEffects();updateBattlePace();renderExpeditionFood();const m=b.monster||{...EXPEDITIONS[b.stage],element:'none'},done=b.resolved;
 const arena=$('expeditionArena'),theme=expeditionArenaTheme(b.stage);
 if(arena){arena.dataset.arena=theme;arena.style.setProperty('--arena-bg','url("'+EXPEDITION_ARENA_ART[theme]+'")');}
 const enemyPct=Math.max(0,Math.min(100,(b.enemyHp/Math.max(1,m.hp))*100)).toFixed(2);
 const prevEnemyPct=(typeof b._lastEnemyPct==='number'?b._lastEnemyPct:100).toFixed(2);
 b._lastEnemyPct=Number(enemyPct);
 const offhandBadge=b.offhand?'<span class="exp-offhand-pill" title="副武器：'+esc(itemName(b.offhand))+'">🔄 副：'+esc(itemName(b.offhand))+'</span>':'';
 arena.innerHTML='<div class="exp-stage-fx" aria-hidden="true"><span></span><span></span><span></span><span></span></div><div class="exp-fighter is-hero"><div class="exp-hero-rig"><img class="exp-hero-sprite" src="'+WORKSHOP_FAMILIAR_ART.hero+'" alt="鍛造冒險者" decoding="async"><span class="exp-held-weapon">'+hex(b.weapon.c,bands(b.weapon),'',b.weapon.t,b.weapon)+'</span></div><b>'+itemName(b.weapon)+'</b>'+offhandBadge+'<small>♥ '+b.hp+' / '+b.hpMax+'</small>'+expeditionHealthHTML(b)+'</div><strong>VS</strong><div class="exp-fighter is-enemy"><div><span class="exp-rune-ring" aria-hidden="true"></span>'+monsterArt(m)+'</div><div class="exp-enemy-title"><b>'+m.name+'</b>'+elementBadge(m.element,'battle-element')+'</div><small>♥ '+b.enemyHp+' / '+m.hp+'</small><div class="exp-enemy-hpwrap"><span class="exp-hp-ghost" style="width:'+prevEnemyPct+'%"></span><progress max="'+m.hp+'" value="'+b.enemyHp+'" aria-label="怪物生命值"></progress></div><span class="exp-health-key exp-monster-key" aria-hidden="true"></span></div>';
 const ghost=arena.querySelector('.exp-hp-ghost');
 if(ghost)requestAnimationFrame(()=>{ghost.style.width=enemyPct+'%';});
 $('expeditionLog').innerHTML=(done?b.log:b.log.slice(-5)).map(x=>'<p class="'+x.actor+(x.skill?' skill-hit':'')+'">'+esc(x.text)+'</p>').join('')||'<p>武器已投入遠征；可在戰鬥中施放終極武器技能或換手連攜。</p>';
 $('expeditionLog').dataset.complete=String(done);$('expeditionGuard').hidden=done;$('expeditionIntent').textContent=done?'本次戰鬥已結束':('敵方下次：'+bossIntent(b)+(b.bossStunned>0?' · 💫 暈眩中':'')+(b.bossHardened?' · 現正硬化':'')+(b.guarding?' · 防禦中（停止攻擊、減傷60%）':''));if(!done&&expandedGameEnabled()&&b.foodAttackTurns>0)$('expeditionIntent').textContent+=' · 🍖 攻擊 +'+Math.round((b.foodAttack||0)*100)+'%（剩 '+b.foodAttackTurns+' 次）';if(!done&&b.enemyWard)$('expeditionIntent').textContent+=' · 怪物護盾 '+b.enemyWard;$('expeditionGuard').disabled=done||b.guardUsed;$('expeditionGuard').textContent=b.guardUsed?'🛡 已使用防禦架勢':'🛡 防禦3秒 · 停止攻擊、減傷60%（每場一次）';
 const tagBtn=$('expeditionTag');
 if(tagBtn){
  tagBtn.hidden=done||!b.offhand;
  if(!tagBtn.hidden){
   const cd=b.tagCooldown||0;
   tagBtn.disabled=done||!!b.guarding||cd>0;
   tagBtn.textContent=cd>0?('🔄 換手冷卻（還需 '+cd+' 次攻擊）'):('🔄 換手連攜：'+itemName(b.offhand)+(b.chargeName&&b.chargeRemainingMs>0?' ⚡可打斷蓄力':''));
  }
 }
 const skill=ultimateSkill(b.weapon);$('expeditionSkill').hidden=done||!skill;$('expeditionSkill').disabled=done||b.skillUsed||b.guarding;$('expeditionSkill').textContent=skill?(b.skillUsed?'✓ 已施放 '+skill.name:'✦ 施放 '+skill.name):'';
 $('expeditionResult').innerHTML=done?'<h3>'+({win:'🏆 遠征勝利',lose:'遠征落敗',draw:'已撤退'}[b.outcome])+'</h3><p>'+(b.outcome==='win'?'獲得 '+b.gold+' 金幣'+(b.loot?'＋'+itemName(b.loot):'')+'。':b.outcome==='lose'?'失去一顆愛心，剩餘 '+lives+' 顆。':'未獲得獎勵，出戰武器已消耗。')+'</p>'+(b.outcome==='win'&&b.stage>=10&&b.stage<20?'<button class="ultimate-unlocked" onclick="openUltimateArt('+b.stage+')">'+ultimatePixelArt(b.stage)+'<span>終極藍圖已解鎖 · 查看高清美術 ↗</span></button>':''):'';
 $('expeditionAgain').textContent=lives<=0?'結束旅程':'返回遠征';$('expeditionSkip').hidden=done;$('expeditionAgain').hidden=!done;
}

function renderExpedition(){
 renderExpeditionFoodSetup();syncExpeditionDay();renderExpeditionLab();const options=expeditionWeapons().filter(x=>!x.w.protected);if(!options.some(x=>x.key===expeditionSelected))expeditionSelected=options[0]?.key||'';if(expeditionOffhand===expeditionSelected||!options.some(x=>x.key===expeditionOffhand))expeditionOffhand='';
 const chosen=options.find(x=>x.key===expeditionSelected),offChosen=options.find(x=>x.key===expeditionOffhand),m=expeditionMonster(expeditionStage),cleared=(!sandboxSession&&expeditionCleared(expeditionStage));
 const expEl=$('expeditionP');if(expEl?.dataset)expEl.dataset.cycle=expeditionStage>=20?'3':expeditionStage>=10?'2':'1';
 $('expeditionAttempts').textContent=(expeditionStage>=20?'無限模式 · 第 '+(expeditionStage-19)+' 隻':expeditionStage>=10?'二周目':'一周目')+' · 第 '+day+' 天 · 累計勝利 '+expeditionState.victories+' 場 · 無限通關 '+(expeditionState.endless||0)+' 隻';
 $('expeditionStages').innerHTML=EXPEDITIONS.map((x,i)=>{const isCleared=expeditionState.cleared.includes(i),isLocked=!sandboxSession&&i>expeditionState.unlocked;return '<button data-exp-stage="'+i+'" data-cycle="'+(i>=10?2:1)+'"'+(isCleared?' data-cleared="true"':'')+(isLocked?' data-locked="true"':'')+' '+(!sandboxSession&&(i>expeditionState.unlocked||expeditionCleared(i))?'disabled':'')+' aria-label="第 '+(i+1)+' 關 '+x.name+'" aria-pressed="'+(i===expeditionStage)+'">'+(isCleared?'✓':i>expeditionState.unlocked?'·':'⚑')+(i+1)+'</button>';}).join('')+((sandboxSession||expeditionState.cleared.includes(19))?'<button data-exp-stage="'+(20+(expeditionState.endless||0))+'" data-cycle="3" aria-pressed="'+(expeditionStage>=20)+'">∞ '+((expeditionState.endless||0)+1)+'</button>':'');
 $('expeditionMonster').innerHTML='<div class="exp-monster-art">'+monsterArt(m)+'</div><div class="exp-monster-info"><div class="exp-monster-head"><small>第 '+(expeditionStage+1)+' 關 · '+m.area+'</small>'+elementBadge(m.element,'monster-element')+'</div><h3>'+m.name+'</h3><div class="exp-monster-stats"><span class="exp-stat-pill is-hp">♥ '+m.hp+'</span><span class="exp-stat-pill is-atk">⚔ '+m.atk+'</span><span class="exp-stat-pill is-def">🛡 '+m.def+'</span><span class="exp-stat-pill is-spd">💨 '+m.spd+'</span></div></div>';
 const mb=medalBonuses(),cb=typeof contractBonuses==='function'?contractBonuses():{battleAtk:0,battleDef:0,expeditionGold:0},expGold=Math.round(m.gold*(1+mb.expeditionGold+(cb.expeditionGold||0))),buffParts=[];
 if(mb.battleAtk+cb.battleAtk)buffParts.push('攻 +'+Math.round((mb.battleAtk+cb.battleAtk)*100)+'%');if(mb.battleDef+cb.battleDef)buffParts.push('防 +'+Math.round((mb.battleDef+cb.battleDef)*100)+'%');if(mb.battleSpd)buffParts.push('速 +'+Math.round(mb.battleSpd*100)+'%');if(mb.enchantExtra)buffParts.push('附魔每層 +'+mb.enchantExtra+'傷/盾');if(mb.battleStartShield)buffParts.push('開戰 +'+Math.round(mb.battleStartShield*100)+'%生命盾');if(mb.supplyBoost)buffParts.push('料理補給 +'+Math.round(mb.supplyBoost*100)+'%');
 $('expeditionBossRule').textContent=bossRule(m);$('expeditionReward').textContent=cleared?'已通關'+(expeditionStage===19?'，二周目全部完成！':'，請前往下一關。'):(expeditionStage>=20?'無限勝利：'+expGold+' 金幣':'首次勝利：'+expGold+' 金幣＋'+itemName(m.loot)+(expeditionStage>=10?' · 解鎖高清武器美術':''));
 $('expeditionWeapons').innerHTML=options.length?options.map(x=>{const isMain=x.key===expeditionSelected,isOff=x.key===expeditionOffhand;return '<div class="exp-weapon-wrap"><button class="exp-weapon '+(isMain?'selected':isOff?'is-offhand':'')+'" data-exp-weapon="'+x.key+'"><span class="exp-weapon-art">'+hex(x.w.c,bands(x.w),'',x.w.t,x.w)+'</span><span><b>'+(isMain?'[主] ':isOff?'[副] ':'')+esc(itemName(x.w))+'</b><small>'+x.source+' · ⚔'+weaponStats(x.w).atk+' 🛡'+weaponStats(x.w).def+' 💨'+weaponStats(x.w).spd+'</small></span></button>'+(options.length>=2&&!isMain?'<button type="button" class="exp-offhand-btn'+(isOff?' is-on':'')+'" data-exp-offhand="'+x.key+'">'+(isOff?'✓ 副武器':'+ 設副手')+'</button>':'')+'</div>';}).join(''):'<div class="exp-empty">沒有未受保護的可出戰武器。請先在冶煉廠鍛造武器；每次出戰都會消耗一把。</div>';
 const resonanceNote=(chosen&&offChosen)?(()=>{const e1=elementOf(chosen.w),e2=elementOf(offChosen.w),res=e1!=='none'&&e2!=='none'&&e1!==e2;return '<div class="exp-dual-banner"><b>🔄 雙兵連攜：'+esc(itemName(chosen.w))+' ＋ '+esc(itemName(offChosen.w))+'</b><small>戰鬥中可切換武器發動連攜攻擊並打斷 Boss 蓄力'+(res?' · ✨ 不同屬性觸發元素共鳴 ×1.55！':'')+'</small></div>';})():'';
 $('expeditionSelectedStats').innerHTML=chosen?resonanceNote+statsHTML(chosen.w)+weaponEnchantHTML(chosen.w)+ultimateSkillHTML(chosen.w)+elementMatchupHTML(chosen.w,m)+(buffParts.length?'<p class="exp-note">🏅 紀念章戰鬥加成（出戰生效）：'+buffParts.join(' · ')+'</p>':'')+'<p class="exp-note">⚠ 出戰後消耗所選武器（主／副手），勝利、失敗或撤退都不退回。</p>':'';
 if(!$('elementChart').innerHTML)$('elementChart').innerHTML=elementChartHTML();
 $('expeditionFight').disabled=!chosen||lives<=0||cleared;$('expeditionFight').textContent='消耗武器 · 開始挑戰';
 $('expeditionLast').textContent=expeditionState.lastBattle?'上次遠征：'+(expeditionState.lastBattle.monster||expeditionMonster(expeditionState.lastBattle.stage)).name+' · '+({win:'勝利',lose:'落敗',draw:'撤退',ongoing:'戰鬥中'}[expeditionState.lastBattle.outcome]):'';
}

function startExpeditionDemo(){
 $('title').style.display='none';cheat.m=false;cheat.s=false;start('normal',{test:true});
 $('seasonP').style.display='none';seasonNoticePending=false;
 const make=(c,t,m=0)=>({k:'w',c,t,cs:[t,t,t],parts:COMBO[c].split('').map(s=>({s:+s,t})),m,b:0,dts:[]});
 g=Array(W*H).fill(null);g[11]=make(0,0);g[12]=make(6,0);g[13]=make(9,1);g[16]=make(1,1,20);g[17]=make(4,2);g[18]=make(8,3,50);
 best=Array(10).fill(null);g.forEach(w=>{if(w)best[w.c]={...w};});
 quests=['atk','def','spd'].map(k=>({t:'stat_'+k,s:'a',p:0,n:1,x:{atk:30,def:28,spd:24}[k],r:230}));
 coins=600;sp=1;pendingChests=1;render();showTown();openExpedition();
}
$('expeditionStages').onclick=e=>{const b=e.target.closest('[data-exp-stage]');if(!b||b.disabled)return;expeditionStage=+b.dataset.expStage;if(sandboxSession)expeditionLab.stage=expeditionStage+1;renderExpedition();};
$('expeditionWeapons').onclick=e=>{
 const offBtn=e.target.closest('[data-exp-offhand]');
 if(offBtn){expeditionOffhand=expeditionOffhand===offBtn.dataset.expOffhand?'':offBtn.dataset.expOffhand;renderExpedition();return;}
 const b=e.target.closest('[data-exp-weapon]');if(!b)return;
 expeditionSelected=b.dataset.expWeapon;if(expeditionOffhand===expeditionSelected)expeditionOffhand='';renderExpedition();
};
$('expeditionAgain').onclick=()=>{if(lives<=0){closeExpedition();return;}if(expeditionState.lastBattle?.outcome==='win')expeditionStage=expeditionState.unlocked;showExpeditionSetup();};
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-record-weapon]')){e.preventDefault();e.target.click();}});
document.addEventListener('click',e=>{
 const item=e.target.closest('[data-record-weapon]');if(!item)return;
 const c=+item.dataset.recordWeapon,record=item.closest('[data-record-index]');const w=record?recs[+record.dataset.recordIndex]?.best?.[c]:best[c];
 if(w)openCraftedWeapon({...w,k:'w',c},record?'歷史紀錄':'本次最佳作品');
});
