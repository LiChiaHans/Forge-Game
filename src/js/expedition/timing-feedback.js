const EXPEDITION_GUARD_MS=3000,EXPEDITION_CHARGE_MS=1500;let expeditionFeedbackTimer=null;
function expeditionBossAbility(b){
 const turn=(b.enemyTurns||0)+1,kind=(b.monster||expeditionMonster(b.stage||0)).kind;
 return kind==='dragon'&&(turn-1)%3===1?'蓄力重擊 ×2':kind==='wolf'&&turn%3===0?'雙段連擊':kind==='golem'&&turn%3===0?'硬化攻擊':null;
}
function primeExpeditionCharge(b){
 if(b.resolved||b.outcome!=='ongoing'){b.chargeRemainingMs=0;b.chargeName=null;b.chargeTurn=0;return;}
 const ability=expeditionBossAbility(b),turn=(b.enemyTurns||0)+1;
 if(!ability){b.chargeRemainingMs=0;b.chargeName=null;b.chargeTurn=0;return;}
 if(b.chargeTurn!==turn){b.chargeTurn=turn;b.chargeRemainingMs=EXPEDITION_CHARGE_MS;}b.chargeName=ability;
}
function advanceExpeditionEffects(b,elapsed){
 if(!b||b.resolved||b.outcome!=='ongoing')return;const dt=Math.max(0,elapsed||0);
 b.guardRemainingMs=Math.max(0,(b.guardRemainingMs||0)-dt);b.guarding=b.guardRemainingMs>0;
 if(b.chargeName)b.chargeRemainingMs=Math.max(0,(b.chargeRemainingMs||0)-dt);
}
function syncExpeditionEffects(now=Date.now()){
 const b=expeditionState.lastBattle;if(!b)return;const elapsed=b.effectStamp?Math.max(0,now-b.effectStamp):0;b.effectStamp=now;
 if(!battleUserPaused&&!document.hidden&&!$('expeditionBattle').hidden&&$('expeditionP').style.display!=='none')advanceExpeditionEffects(b,elapsed);
 primeExpeditionCharge(b);renderExpeditionProgress();
}
function renderExpeditionProgress(){
 const b=expeditionState.lastBattle,ongoing=b&&!b.resolved&&b.outcome==='ongoing',guard=ongoing&&(b.guardRemainingMs||0)>0,charge=ongoing&&!!b.chargeName;
 $('expeditionGuardMeter').hidden=!guard;$('expeditionBossCharge').hidden=!charge;
 if(guard){$('expeditionGuardProgress').max=EXPEDITION_GUARD_MS;$('expeditionGuardProgress').value=b.guardRemainingMs;$('expeditionGuardTime').textContent=(b.guardRemainingMs/1000).toFixed(1)+' 秒'+(battleUserPaused?' · 暫停':'');}
 if(charge){$('expeditionChargeProgress').max=EXPEDITION_CHARGE_MS;$('expeditionChargeProgress').value=EXPEDITION_CHARGE_MS-b.chargeRemainingMs;$('expeditionChargeName').textContent=(b.monster||expeditionMonster(b.stage||0)).name+' · '+b.chargeName;$('expeditionChargeTime').textContent=battleUserPaused?'已暫停':b.chargeRemainingMs>0?'蓄力 '+(b.chargeRemainingMs/1000).toFixed(1)+' 秒':'蓄力完成';}
}
function startExpeditionFeedbackClock(){
 if(expeditionFeedbackTimer!==null)return;const b=expeditionState.lastBattle;if(b)b.effectStamp=Date.now();syncExpeditionEffects();expeditionFeedbackTimer=setInterval(syncExpeditionEffects,50);
}
function stopExpeditionFeedbackClock(){if(expeditionFeedbackTimer!==null)clearInterval(expeditionFeedbackTimer);expeditionFeedbackTimer=null;}
function expeditionHealthHTML(b){
 const hp=Math.max(0,b.hp),shield=Math.max(0,b.shield||0),healed=Math.min(hp,Math.max(0,b.foodRecovered||0));b.healthShieldCapacity=Math.max(shield,b.healthShieldCapacity||0);const scale=Math.max(1,b.hpMax+b.healthShieldCapacity),width=n=>(Math.max(0,n)/scale*100).toFixed(3)+'%';
 return '<div class="exp-health-meter" role="img" aria-label="生命 '+hp+' / '+b.hpMax+'，料理恢復剩餘 '+healed+'，護盾 '+shield+'"><span class="exp-health-base" style="width:'+width(hp-healed)+'"></span><span class="exp-health-food" style="width:'+width(healed)+'"></span><span class="exp-health-shield" style="width:'+width(shield)+'"></span></div><span class="exp-health-key"><i>生命</i><i>料理回復</i><i>護盾'+(shield?' '+shield:'')+'</i></span>';
}
document.addEventListener('visibilitychange',()=>{const b=expeditionState.lastBattle;if(b)b.effectStamp=Date.now();battleLastAdvance=Date.now();});
