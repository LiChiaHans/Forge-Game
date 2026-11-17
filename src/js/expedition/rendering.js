
function renderExpeditionBattle(){
 const b=expeditionState.lastBattle;if(!b)return;syncExpeditionEffects();updateBattlePace();renderExpeditionFood();const m=b.monster||{...EXPEDITIONS[b.stage],element:'none'},done=b.resolved;
 $('expeditionArena').innerHTML='<div class="exp-fighter"><div>'+hex(b.weapon.c,bands(b.weapon),'',b.weapon.t,b.weapon)+'</div><b>'+itemName(b.weapon)+'</b><small>♥ '+b.hp+' / '+b.hpMax+'</small>'+expeditionHealthHTML(b)+'</div><strong>VS</strong><div class="exp-fighter"><div>'+monsterArt(m)+elementBadge(m.element,'battle-element')+'</div><b>'+m.name+'</b><small>♥ '+b.enemyHp+' / '+m.hp+'</small><progress max="'+m.hp+'" value="'+b.enemyHp+'" aria-label="怪物生命值"></progress><span class="exp-health-key exp-monster-key" aria-hidden="true"></span></div>';
 $('expeditionLog').innerHTML=(done?b.log:b.log.slice(-5)).map(x=>'<p class="'+x.actor+(x.skill?' skill-hit':'')+'">'+esc(x.text)+'</p>').join('')||'<p>武器已投入遠征；可在戰鬥中施放終極武器技能。</p>';
 $('expeditionLog').dataset.complete=String(done);$('expeditionGuard').hidden=done;$('expeditionIntent').textContent=done?'本次戰鬥已結束':('敵方下次：'+bossIntent(b)+(b.bossHardened?' · 現正硬化':'')+(b.guarding?' · 防禦中（停止攻擊、減傷60%）':''));if(!done&&expandedGameEnabled()&&b.foodAttackTurns>0)$('expeditionIntent').textContent+=' · 🍖 攻擊 +'+Math.round((b.foodAttack||0)*100)+'%（剩 '+b.foodAttackTurns+' 次）';$('expeditionGuard').disabled=done||b.guardUsed;$('expeditionGuard').textContent=b.guardUsed?'🛡 已使用防禦架勢':'🛡 防禦3秒 · 停止攻擊、減傷60%（每場一次）';const skill=ultimateSkill(b.weapon);$('expeditionSkill').hidden=done||!skill;$('expeditionSkill').disabled=done||b.skillUsed||b.guarding;$('expeditionSkill').textContent=skill?(b.skillUsed?'✓ 已施放 '+skill.name:'✦ 施放 '+skill.name):'';
 $('expeditionResult').innerHTML=done?'<h3>'+({win:'🏆 遠征勝利',lose:'遠征落敗',draw:'已撤退'}[b.outcome])+'</h3><p>'+(b.outcome==='win'?'獲得 '+b.gold+' 金幣'+(b.loot?'＋'+itemName(b.loot):'')+'。':b.outcome==='lose'?'失去一顆愛心，剩餘 '+lives+' 顆。':'未獲得獎勵，出戰武器已消耗。')+'</p>'+(b.outcome==='win'&&b.stage>=10&&b.stage<20?'<button class="ultimate-unlocked" onclick="openUltimateArt('+b.stage+')">'+ultimatePixelArt(b.stage)+'<span>終極藍圖已解鎖 · 查看高清美術 ↗</span></button>':''):'';
 $('expeditionAgain').textContent=lives<=0?'結束旅程':'返回遠征';$('expeditionSkip').hidden=done;$('expeditionAgain').hidden=!done;
}

function renderExpedition(){
 renderExpeditionFoodSetup();syncExpeditionDay();renderExpeditionLab();const options=expeditionWeapons().filter(x=>!x.w.protected);if(!options.some(x=>x.key===expeditionSelected))expeditionSelected=options[0]?.key||'';
 const chosen=options.find(x=>x.key===expeditionSelected),m=expeditionMonster(expeditionStage),cleared=(!sandboxSession&&expeditionCleared(expeditionStage));
 $('expeditionAttempts').textContent=(expeditionStage>=20?'無限模式 · 第 '+(expeditionStage-19)+' 隻':expeditionStage>=10?'二周目':'一周目')+' · 第 '+day+' 天 · 累計勝利 '+expeditionState.victories+' 場 · 無限通關 '+(expeditionState.endless||0)+' 隻';
 $('expeditionStages').innerHTML=EXPEDITIONS.map((x,i)=>'<button data-exp-stage="'+i+'" data-cycle="'+(i>=10?2:1)+'" '+(!sandboxSession&&(i>expeditionState.unlocked||expeditionCleared(i))?'disabled':'')+' aria-label="第 '+(i+1)+' 關 '+x.name+'" aria-pressed="'+(i===expeditionStage)+'">'+(expeditionState.cleared.includes(i)?'✓':i>expeditionState.unlocked?'·':'⚑')+(i+1)+'</button>').join('')+((sandboxSession||expeditionState.cleared.includes(19))?'<button data-exp-stage="'+(20+(expeditionState.endless||0))+'" data-cycle="3" aria-pressed="'+(expeditionStage>=20)+'">∞ '+((expeditionState.endless||0)+1)+'</button>':'');
 $('expeditionMonster').innerHTML='<div class="exp-monster-art">'+monsterArt(m)+elementBadge(m.element,'monster-element')+'</div><div><small>第 '+(expeditionStage+1)+' 關 · '+m.area+'</small><h3>'+m.name+'</h3><div class="exp-monster-stats">♥ '+m.hp+'　⚔ '+m.atk+'　🛡 '+m.def+'　💨 '+m.spd+'</div></div>';
 $('expeditionBossRule').textContent=bossRule(m);$('expeditionReward').textContent=cleared?'已通關'+(expeditionStage===19?'，二周目全部完成！':'，請前往下一關。'):(expeditionStage>=20?'無限勝利：'+m.gold+' 金幣':'首次勝利：'+m.gold+' 金幣＋'+itemName(m.loot)+(expeditionStage>=10?' · 解鎖高清武器美術':''));
 $('expeditionWeapons').innerHTML=options.length?options.map(x=>'<button class="exp-weapon '+(x.key===expeditionSelected?'selected':'')+'" data-exp-weapon="'+x.key+'"><span class="exp-weapon-art">'+hex(x.w.c,bands(x.w),'',x.w.t,x.w)+'</span><span><b>'+esc(itemName(x.w))+'</b><small>'+x.source+' · ⚔'+weaponStats(x.w).atk+' 🛡'+weaponStats(x.w).def+' 💨'+weaponStats(x.w).spd+'</small></span></button>').join(''):'<div class="exp-empty">沒有未受保護的可出戰武器。請先在冶煉廠鍛造武器；每次出戰都會消耗一把。</div>';
 $('expeditionSelectedStats').innerHTML=chosen?statsHTML(chosen.w)+weaponEnchantHTML(chosen.w)+ultimateSkillHTML(chosen.w)+elementMatchupHTML(chosen.w,m)+'<p class="exp-note">⚠ 出戰後消耗這把武器，勝利、失敗或撤退都不退回。</p>':'';
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
$('expeditionWeapons').onclick=e=>{const b=e.target.closest('[data-exp-weapon]');if(!b)return;expeditionSelected=b.dataset.expWeapon;renderExpedition();};
$('expeditionAgain').onclick=()=>{if(lives<=0){closeExpedition();return;}if(expeditionState.lastBattle?.outcome==='win')expeditionStage=expeditionState.unlocked;showExpeditionSetup();};
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-record-weapon]')){e.preventDefault();e.target.click();}});
document.addEventListener('click',e=>{
 const item=e.target.closest('[data-record-weapon]');if(!item)return;
 const c=+item.dataset.recordWeapon,record=item.closest('[data-record-index]');const w=record?recs[+record.dataset.recordIndex]?.best?.[c]:best[c];
 if(w)openCraftedWeapon({...w,k:'w',c},record?'歷史紀錄':'本次最佳作品');
});
