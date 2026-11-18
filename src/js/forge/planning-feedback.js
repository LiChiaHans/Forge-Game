function markForgeOutputs(weapons){
 weapons.forEach((w,k)=>{const el=$('grid').children[w.target];if(!el)return;el.classList.add('pv-target');const label=document.createElement('span');label.className='forge-preview-label';label.textContent=(k+1)+' · '+NM[w.t]+'級'+WN[w.c];el.appendChild(label);});
}

function forecastMaterials(source,at,item){
 const board=source.map(x=>x?{...x}:null),queue=[at],steps=[],outputs=new Map(),consumed=new Set();board[at]={...item};
 while(queue.length&&steps.length<30){const i=queue.shift(),plan=workshopMaterialPlan(i,board);if(!plan)continue;const snapshots=plan.cells.map(j=>board[j]);steps.push(plan);for(const j of plan.cells){consumed.add(j);board[j]=null;outputs.delete(j);}for(const batch of plan.groups){const result={k:'o',t:batch.tier,m:batch.cells.reduce((n,j)=>n+(snapshots[plan.cells.indexOf(j)]?.m||0),0)};board[batch.target]=result;outputs.set(batch.target,{...batch,recipe:null});queue.push(batch.target);}}
 return {board,steps,consumed:[...consumed],groups:[...outputs.values()]};
}
function previewForgeMaterial(i,t){
 if(!sk('mm')){markPrediction(i,'pv-target');showPrediction('放置'+NM[t]+'礦','學習合成大師後可合成升階。');return;}
 const forecast=forecastMaterials(g,i,{k:'o',t,m:(hand?.k==='o'?hand.m||0:0)+(magicSet.has(i)?5:0)});forecast.consumed.forEach(j=>markPrediction(j,'pv-use'));forecast.groups.forEach((b,k)=>{const cell=$('grid').children[b.target];if(!cell)return;cell.classList.add('pv-target');const label=document.createElement('span');label.className='forge-preview-label';label.textContent=(k+1)+' · '+NM[b.tier]+'礦';cell.appendChild(label);});markPrediction(i,'pv-target');
 showPrediction(forecast.steps.length?'連鎖 '+forecast.steps.length+' 次 · 最後 '+forecast.groups.length+' 顆':'放置'+NM[t]+'礦',forecast.steps.length?forecast.groups.map(b=>NM[b.tier]+'礦 → 第'+(b.target+1)+'格').join('、'):'尚未達三顆相連。');
}
$('grid').addEventListener('pointerover',e=>{if(e.pointerType!=='mouse'||drag||busy)return;const cell=e.target.closest('.c');if(!cell)return;const i=+cell.dataset.i;if(!g[i]&&!heat[i]&&!cellBlock(i))previewForgeMaterial(i,Q[0]);});
$('grid').addEventListener('pointerleave',()=>{if(!drag)clearPrediction();});
$('q').addEventListener('pointerdown',e=>{if(busy||e.button>0)return;const node=e.target.closest('.q');if(!node||node.dataset.step!=='1')return;e.preventDefault();startDrag(e,'ore',null,oreH(Q[0]),node);});
