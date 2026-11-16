

let blueprintGoalId=null,inspectedLiveWeapon=null,plannerRows=[];
function liveWeapons(){const a=[];[['棋盤',g],['武器箱',pack],['道具箱',bag]].forEach(([source,list])=>list.forEach(w=>{if(w?.k==='w')a.push({w,source});}));if(hand?.k==='w')a.push({w:hand,source:'手持'});return a;}
function toggleWeaponProtection(){
 const w=inspectedLiveWeapon;if(!w||!liveWeapons().some(x=>x.w===w))return;w.protected=!w.protected;openCraftedWeapon(w,'武器管理');render();saveNow();if($('blueprintGoalP').style.display==='flex')renderBlueprintGoal();
}
function setBlueprintGoal(id){if(!validLegendId(id))return;blueprintGoalId=id;['legendBlueprintP','weaponAlbumP','chestP'].forEach(closeP);openBlueprintGoal();saveNow();}
function clearBlueprintGoal(){blueprintGoalId=null;renderBlueprintGoal();render();saveNow();}
function planBlueprint(id){
 const entries=liveWeapons(),used=new Set(),active=legendProjects.find(p=>p.id===id);
 function allocate(r){const held=entries.find(x=>!used.has(x.w)&&(r.legendId!==undefined?isLegend(x.w)&&x.w.legendId===r.legendId:!isLegend(x.w)&&x.w.c===r.c&&x.w.t===r.tier));if(held){used.add(held.w);return {r,ready:true,held,children:[]};}const children=r.legendId!==undefined?LEGENDS[r.legendId].recipe.map((_,k)=>allocate(blueprintRequirement(r.legendId,k))):[];return {r,ready:false,children};}
 return LEGENDS[id].recipe.map((_,k)=>active?.filled[k]?{r:blueprintRequirement(id,k),ready:true,invested:true,children:[]}:allocate(blueprintRequirement(id,k)));
}
function openBlueprintGoal(){closeP('chestP');renderBlueprintGoal();$('blueprintGoalP').style.display='flex';}
function renderBlueprintGoal(){
 $('blueprintGoalClear').hidden=blueprintGoalId===null;plannerRows=[];
 if(!validLegendId(blueprintGoalId)){$('blueprintGoalTitle').textContent='📋 藍圖製作計畫';$('blueprintGoalInfo').innerHTML='<p>到武器箱的藍圖收藏，打開想製作的藍圖，再按「設為製作目標」。</p>';$('blueprintGoalTree').innerHTML='';return;}
 const id=blueprintGoalId,rows=planBlueprint(id),ready=rows.filter(x=>x.ready).length;$('blueprintGoalTitle').textContent='📋 '+LEGENDS[id].name;$('blueprintGoalInfo').innerHTML='<p>原料 '+ready+' / '+rows.length+' 已備妥'+(hasLegendBlueprint(id)?'':' · 藍圖尚未解鎖，需通過第 '+(id+1)+' 關')+'</p><button onclick="openLegendBlueprint('+id+')">查看藍圖與放置樣式</button><p class="exp-note">受保護的原料必須先取消保護，才能投入。展開傳說原料可查看其普通武器需求；同一件武器只會計算一次。</p>';
 function rowHTML(row){const index=plannerRows.push(row)-1,body='<div class="plan-row '+(row.ready?'ready':'')+'"><span>'+requirementArt(row.r)+'</span><div><b>'+(row.invested?'✓ 已投入':row.ready?'✓ 已備妥':'○ 尚缺')+' '+requirementName(row.r)+'</b>'+(row.held?'<small>'+row.held.source+(row.held.w.protected?' · 🔒 受保護':'')+'</small><button data-plan-inspect="'+index+'">查看／保護</button>':'')+'</div></div>';return row.children.length?'<details open><summary>'+body+'</summary><div class="plan-children">'+row.children.map(rowHTML).join('')+'</div></details>':body;}
 $('blueprintGoalTree').innerHTML=rows.map(rowHTML).join('');
}
function inspectPlannerWeapon(index){const row=plannerRows[index];if(row?.held)openCraftedWeapon(row.held.w,row.held.source);}