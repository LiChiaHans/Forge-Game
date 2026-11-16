

const legendBlueprints=new Set(),legendCollection=new Set(),legendDemoBlueprints=new Set(),legendDemoCollection=new Set();
let legendForgeId=0,legendSelection=[];
function validLegendId(id){return Number.isInteger(id)&&id>=0&&id<LEGENDS.length;}
function isLegend(w){return !!w&&validLegendId(w.legendId)&&w.legendCore&&['atk','def','spd'].every(k=>Number.isFinite(w.legendCore[k])&&w.legendCore[k]>0);}
function readLegendSet(key,set){try{const a=JSON.parse(gameStorage.getItem(key)||'[]');if(Array.isArray(a))a.forEach(id=>{if(validLegendId(id))set.add(id)});}catch(e){}}
readLegendSet('forgeLegendBlueprintsV1',legendBlueprints);readLegendSet('forgeLegendCollectionV1',legendCollection);
function persistLegendSets(){if(testRun)return;try{gameStorage.setItem('forgeLegendBlueprintsV1',JSON.stringify([...legendBlueprints].sort((a,b)=>a-b)));gameStorage.setItem('forgeLegendCollectionV1',JSON.stringify([...legendCollection].sort((a,b)=>a-b)));}catch(e){}}
function hasLegendBlueprint(id){return testRun?legendDemoBlueprints.has(id):runLegendBlueprints.has(id);}
function hasLegendCollection(id){return testRun?legendDemoCollection.has(id):runLegendCollection.has(id);}
function unlockLegendBlueprint(id){if(!validLegendId(id))return;if(testRun){legendDemoBlueprints.add(id);return;}runLegendBlueprints.add(id);if(!legendBlueprints.has(id)){legendBlueprints.add(id);persistLegendSets();}}
function importLegendProgress(){if(sandboxSession)return;
 let changed=false;const unlock=id=>{if(validLegendId(id)&&!legendBlueprints.has(id)){legendBlueprints.add(id);changed=true;}};
 const scan=w=>{if(w?.k==='bp')unlock(w.id);if(isLegend(w)){unlock(w.legendId);if(!legendCollection.has(w.legendId)){legendCollection.add(w.legendId);changed=true;}}};
 const state=s=>{if(!s)return;(s.collections?.blueprints||[]).forEach(unlock);(s.collections?.legends||[]).forEach(id=>{if(validLegendId(id)){unlock(id);if(!legendCollection.has(id)){legendCollection.add(id);changed=true}}});(s.expedition?.cleared||[]).forEach(unlock);(s.legendProjects||[]).forEach(p=>{unlock(p.id);(p.filled||[]).forEach(scan)});[...(s.best||[]),...(s.g||[]),...(s.pack||[]),...(s.bag||[]),s.hand].forEach(scan);};
 saves.forEach(x=>state(x.state));recs.forEach(r=>(r.best||[]).forEach(scan));
 if(!testRun&&day>0){(expeditionState.cleared||[]).forEach(unlock);state({best,g,pack,bag,hand,legendProjects});}
 if(changed)persistLegendSets();
}
function legendSample(id,t=LEGENDS[id].tier){const l=LEGENDS[id];return {k:'w',c:l.c,t,parts:COMBO[l.c].split('').map(s=>({s:+s,t})),cs:[t,t,t],m:0,b:0,dts:[]};}
function legendaryWeapon(id,ingredients){
 if(id>=10)return ultimateWeapon(id,ingredients);
 const l=LEGENDS[id],t=Math.floor(ingredients.reduce((a,w)=>a+w.t,0)/ingredients.length),ref=weaponStats(legendSample(id,t)),values=ingredients.map(weaponStats),core={};
 ['atk','def','spd'].forEach(k=>{const avg=values.reduce((a,s)=>a+s[k],0)/values.length;core[k]=Math.round(Math.max(ref[k]*1.4,(ref[k]*.65+avg*.35)*l.scale)*(LEGEND_BONUS[id][k]||1));});
 const dts=ingredients.flatMap(w=>w.dts||[]).sort((a,b)=>b-a).slice(0,3);
 const price=Math.ceil(ingredients.reduce((a,w)=>a+wp(w),0)*l.price);
 return {k:'w',c:l.c,t,cs:[t,t,t],legendId:id,legendCore:core,legendPrice:price,legendIngredients:JSON.parse(JSON.stringify(ingredients)),m:ingredients.reduce((a,w)=>a+(w.m||0),0)+l.magic,dts,b:dts.reduce((a,x)=>a+.3*(x+1),0),statVersion:1};
}