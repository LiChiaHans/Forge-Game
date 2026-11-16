

/* Stats v1: material provenance is independent of price and the quality gate. */
const ORE_POWER=[1,1.7,2.8,4.4,6.8];
const MOLD_STATS=[{atk:8,def:1,spd:2},{atk:2,def:2,spd:7},{atk:1,def:8,spd:1}];
const STAT_NAMES={atk:'攻擊力',def:'防禦力',spd:'速度'};
function weaponParts(w){
 if(Array.isArray(w.parts)&&w.parts.length===3&&w.parts.every(p=>Number.isInteger(p.s)&&p.s>=0&&p.s<3&&Number.isInteger(p.t)&&p.t>=0&&p.t<5))return w.parts.map(p=>({s:p.s,t:p.t}));
 const tiers=Array.isArray(w.cs)&&w.cs.length===3?w.cs:[w.t||0,w.t||0,w.t||0];
 return (COMBO[w.c]||'012').split('').map((s,i)=>({s:+s,t:Math.max(0,Math.min(4,Number(tiers[i])||0))}));
}
function weaponStats(w){
 const parts=weaponParts(w),v=isLegend(w)?{...w.legendCore}:{atk:5,def:3,spd:3};
 if(!isLegend(w))parts.forEach(p=>Object.keys(v).forEach(k=>v[k]+=MOLD_STATS[p.s][k]*ORE_POWER[p.t]));
 const gemPower=Array.isArray(w.dts)?w.dts.reduce((a,t)=>a+.05*(Math.max(0,Math.min(4,t))+1),0):Math.max(0,w.b||0)/6;
 if(!isLegend(w))Object.keys(v).forEach(k=>v[k]=Math.round(v[k]*(1+gemPower)));
 Object.keys(v).forEach(k=>v[k]=Math.round(v[k]*(1+weaponStarBonus(w))));
 const stacks=Math.max(0,Math.floor((w.m||0)/5)),effective=Math.min(20,stacks);
 return {...v,stacks,arcane:effective*2,ward:effective*3,estimated:!isLegend(w)&&!Array.isArray(w.parts)};
}
function statsHTML(w){
 const s=weaponStats(w);return '<div class="weapon-stats">'+Object.entries(STAT_NAMES).map(([k,n])=>'<div><small>'+({atk:'⚔',def:'🛡',spd:'💨'}[k])+' '+n+'</small><b>'+s[k]+'</b></div>').join('')+'</div>'+weaponMasteryHTML(w);
}
function weaponEnchantHTML(w){
 const s=weaponStats(w);return elementWeaponHTML(w)+'<div class="weapon-enchant"><b>✦ 奧術附魔 '+s.stacks+' 層</b><span>每次攻擊額外 '+s.arcane+' 奧術傷害 · 開戰護盾 '+s.ward+'</span><small>每層提供 2 傷害、3 護盾，戰鬥效果最多計算 20 層。</small></div>';
}
function openCraftedWeapon(w,source='鍛造作品'){
 if(!w||w.c==null)return;inspectedLiveWeapon=liveWeapons().some(x=>x.w===w)?w:null;$('weaponProtection').hidden=!inspectedLiveWeapon;$('weaponProtection').textContent=w.protected?'🔓 取消武器保護':'🔒 保護這把武器（防止賣出、出戰與投入藍圖）';
 $('weaponStatsTitle').textContent=isLegend(w)?LEGENDS[w.legendId].name+' · '+legendKind(w.legendId):NM[w.t]+'級'+WN[w.c];$('weaponStatsSource').textContent=source;
 $('weaponStatsArt').innerHTML=hex(w.c,bands(w),'',w.t,w);$('weaponStatsValues').innerHTML=statsHTML(w)+weaponEnchantHTML(w)+ultimateSkillHTML(w)+ (isUltimate(w)?ultimateArtHTML(w.legendId):'');
 $('weaponStatsParts').innerHTML=isLegend(w)?'<h3>消耗的原料武器</h3><div class="legend-ingredient-row">'+(w.legendIngredients||[]).map(x=>'<div>'+hex(x.c,bands(x),'',x.t,x)+'<span>'+itemName(x)+'</span></div>').join('')+'</div>':'<h3>製作材料</h3><div class="weapon-part-list">'+weaponParts(w).map(p=>'<div>'+mold(p.s,C[p.t],'s')+'<span>'+NM[p.t]+'・'+TY[p.s]+'胚</span></div>').join('')+'</div>';
 $('weaponStatsNote').textContent=isLegend(w)?LEGENDS[w.legendId].trait+' 加成已計入上方能力。':weaponStats(w).estimated?'舊版作品未記錄各胚的材料對應，能力值依原配方與材料估算。':'刃胚偏重攻擊、盾胚偏重防禦、柄胚偏重速度；高階材料會加強該胚的貢獻。';
 $('weaponStatsPrice').textContent=(wp(w)+(w.m||0))+' 金幣 · 不含指定訂單與商人加成'+seasonSaleNote(w);
 $('weaponStatsP').style.display='flex';
}
function qOnForgeStats(w){
 const s=weaponStats(w);
 ['atk','def','spd'].forEach(k=>qEach('stat_'+k,q=>{if(s[k]>=q.x)qProg(q,q.n)}));
}
function addStatQuests(){
 const thresholds={atk:[20,30,45,65,90],def:[18,28,42,62,85],spd:[16,24,36,52,72]};
 Object.keys(STAT_NAMES).forEach(k=>QD['stat_'+k]={
  i:{atk:'⚔️',def:'🛡️',spd:'💨'}[k],w:2,ok:()=>true,
  mk:()=>{const band=Math.max(0,Math.min(4,Math.floor((day-1)/3)));return {n:1,x:thresholds[k][band],r:[150,230,350,500,700][band]};},
  tx:q=>'鍛造一把'+STAT_NAMES[k]+'達 '+q.x+' 以上的武器',sh:q=>STAT_NAMES[k]+'≥'+q.x,
  tip:'完成鍛造時判定，不必賣出；混合材料與實際鑲嵌的鑽石都會計入。'
 });
 QD.mag.tip='每累積 +5 金幣魔法值算 1 層附魔；同時提供遠征的奧術傷害與開戰護盾。';
}
addStatQuests();