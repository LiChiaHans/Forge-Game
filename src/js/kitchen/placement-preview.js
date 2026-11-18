
let kitchenPreviewPlan=null;
function kitchenConnected(board,at,kind){if(board[at]?.k!==kind)return [];const cells=[at];for(let i=0;i<cells.length;i++)for(const j of nb(cells[i]))if(!cells.includes(j)&&board[j]?.k===kind&&(kind==='p'||board[j].t===board[at].t))cells.push(j);return cells;}
function kitchenPlanAt(at,item){
 const invalid=text=>({valid:false,at,consumed:[],groups:[],text});if(!kitchen||kitchen.done)return null;if(kitchen.g[at]||kitchen.heat[at])return invalid(kitchen.heat[at]?'這格仍有餘熱，不能放置。':'這格已有物品，不能放置。');
 const board=kitchen.g.map(w=>w?{...w}:null),groups=[];let consumed=[];
 if(item.k==='m'){
  const mat=moldMaterials(at,board);if(!mat)return invalid('這格附近需要至少兩包相連的同階食材。');consumed=mat.cells.slice();consumed.forEach(i=>board[i]=null);board[at]={k:'p',s:item.s,t:mat.t};
  for(const t of kitchenTriples(at,board)){const parts=t.cells.map(i=>board[i]),recipe=COMBO.indexOf(parts.map(w=>w.s).sort().join(''));groups.push({cells:t.cells,target:t.target,recipe,tier:Math.floor(parts.reduce((s,w)=>s+w.t,0)/3)});}
  const used=new Set(groups.flatMap(g=>g.cells));return {valid:true,at,consumed,groups,leftovers:board.flatMap((w,i)=>w?.k==='p'&&!used.has(i)?[i]:[]),text:'消耗 '+consumed.length+' 包食材 → '+KITCHEN_TYPES[item.s]+'備料'+(groups.length?'；全盤檢定：'+groups.map((g,i)=>(i+1)+'組 '+kitchenGradeName(g.tier)+KITCHEN_NAMES[g.recipe]+' → 第'+(g.target+1)+'格').join('、'):'；未達三份，先保留備料')+'。放開後確認。'};
 }
 if(item.k==='o'){if(!kitchenLevel('merge'))return {valid:true,at,consumed:[],groups:[],text:'放置'+KITCHEN_GRADES[item.t]+'食材；學習「料理大師」後才能合成升階。'};
  board[at]={k:'o',t:item.t};const plan=workshopMaterialPlan(at,board);if(!plan)return {valid:true,at,consumed:[],groups:[],text:'放置'+KITCHEN_GRADES[item.t]+'食材；尚未達升階條件。'};return {valid:true,at,consumed:plan.cells,groups:plan.groups.map(g=>({...g,recipe:null})),text:plan.cells.length+' 包食材合成：'+plan.groups.map(g=>'第'+(g.target+1)+'格升至'+kitchenGradeName(g.tier)).join('、')+'。放開後確認。'};
 }return null;
}
function clearKitchenPreview(restore=true){kitchenPreviewPlan=null;for(const cell of $('kitchenGrid').children){cell.classList.remove('preview-source','preview-target','preview-leftover','preview-invalid');cell.querySelectorAll?.('.preview-label').forEach(n=>n.remove());cell.style?.removeProperty?.('--preview-color');}if(restore&&kitchen)renderKitchenMessage(kitchen.message);}
function showKitchenPreview(at,item){
 clearKitchenPreview(false);const plan=kitchenPlanAt(at,item);kitchenPreviewPlan=plan;if(!plan)return;const cells=$('kitchenGrid').children,target=cells[at];if(!target)return;if(!plan.valid){target.classList.add('preview-invalid');renderKitchenMessage(plan.text);return;}
 plan.consumed.forEach(i=>cells[i]?.classList.add('preview-source'));const label=(i,text,color)=>{const cell=cells[i];if(!cell)return;cell.style.setProperty('--preview-color',color);cell.classList.add('preview-target');const s=cell.querySelector('.preview-label')||document.createElement('span');s.className='preview-label';s.textContent=text;cell.appendChild(s);};
 label(at,'備料／落點','#e7cc77');plan.groups.forEach((g,i)=>{const color=['#83e4bd','#dab2ff','#f5b67a','#8ed5fa'][i%4];g.cells.forEach(j=>{cells[j]?.classList.add('preview-source');cells[j]?.style.setProperty('--preview-color',color);});label(g.target,(i+1)+' · '+(g.recipe===null?kitchenGradeName(g.tier):kitchenGradeName(g.tier)+KITCHEN_NAMES[g.recipe]),color);});(plan.leftovers||[]).filter(i=>i!==at).forEach(i=>cells[i]?.classList.add('preview-leftover'));renderKitchenMessage(plan.text);
}
function updateKitchenDragPreview(e){const d=kitchenDrag;if(!d?.moved||kitchen.done)return;const cell=document.elementFromPoint(e.clientX,e.clientY)?.closest('.kc');if(!cell){clearKitchenPreview();return;}showKitchenPreview(+cell.dataset.ki,d.w);}
function kitchenHoverPreview(e){if(kitchenDrag||kitchen?.done)return;const hand=kitchen.useHeld&&kitchen.hand?.k==='m';if(!hand&&kitchen.mode!=='prep')return;const cell=e.target.closest('.kc');if(cell)showKitchenPreview(+cell.dataset.ki,hand?kitchen.hand:{k:'m',s:kitchen.mq[0]});}
