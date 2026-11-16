
const BLUEPRINT_SHAPES=[[[0,0],[0,1],[1,1]],[[0,0],[0,1],[0,2]],[[0,0],[1,0],[1,1]],[[0,0],[1,0],[2,0],[1,1]],[[0,0],[1,0],[0,1],[1,1]],[[0,0],[1,0],[0,1]],[[1,0],[2,0],[0,1],[1,1]],[[0,0],[0,1],[0,2],[1,2]],[[0,0],[1,0],[0,1],[1,1],[0,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]]];
const BLUEPRINT_TIERS=[[0,0,0],[0,0,0],[1,0,0],[1,0,0,1],[2,2,1,0],[2,2,2],[3,2,2,1],[3,2,2,1],[4,3,3,2,2],[4,3,3,4,2]];
ULTIMATES.forEach((u,i)=>{BLUEPRINT_SHAPES.push(i<5?[[0,0],[1,0]]:[[0,0],[0,1],[1,1]]);BLUEPRINT_TIERS.push(u.recipe.map(()=>4));});
let legendProjects=[],blueprintSequence=0,blueprintInspectId=0,blueprintRotation=0,blueprintProjectId='';
function blueprintShape(id,rotation=0){
 let a=BLUEPRINT_SHAPES[id].map(p=>[...p]);for(let i=0;i<((rotation%4)+4)%4;i++)a=a.map(([x,y])=>[-y,x]);
 const minX=Math.min(...a.map(p=>p[0])),minY=Math.min(...a.map(p=>p[1]));a=a.map(([x,y])=>[x-minX,y-minY]);
 return {cells:a,w:Math.max(...a.map(p=>p[0]))+1,h:Math.max(...a.map(p=>p[1]))+1};
}
function blueprintRequirement(id,k){if(id>=10){const legendId=LEGENDS[id].recipe[k];return {legendId,c:LEGENDS[legendId].c,tier:LEGENDS[legendId].tier};}return {c:LEGENDS[id].recipe[k],tier:BLUEPRINT_TIERS[id][k]};}
function blueprintAccepts(id,k,w){const r=blueprintRequirement(id,k);return !!w&&w.k==='w'&&(r.legendId!==undefined?isLegend(w)&&w.legendId===r.legendId:!isLegend(w)&&w.c===r.c&&w.t===r.tier);}
function blueprintSlotAt(i){for(const project of legendProjects){const slot=project.cells.indexOf(i);if(slot>=0)return {project,slot};}return null;}
function hasBlueprintItem(id){return hasLegendBlueprint(id);}
function grantBlueprintItem(id){unlockLegendBlueprint(id);}
function ensureBlueprintInventory(){bag=bag.filter(x=>x.k!=='bp');if(hand?.k==='bp'&&!hasLegendBlueprint(hand.id))hand=null;}

function blueprintShapeHTML(id,rotation=0){
 const s=blueprintShape(id,rotation);let a='';for(let y=0;y<s.h;y++)for(let x=0;x<s.w;x++){const k=s.cells.findIndex(p=>p[0]===x&&p[1]===y);if(k<0)a+='<span class="bp-shape-gap"></span>';else{const r=blueprintRequirement(id,k);a+='<span class="bp-shape-tile"><span class="bp-ghost">'+requirementArt(r)+'</span><b>'+(k+1)+'</b></span>';}}
 return '<span class="bp-shape" style="--bp-cols:'+s.w+';--bp-rows:'+s.h+';--bp-max:'+Math.max(s.w,s.h)+'">'+a+'</span>';
}
function legendAlbumSection(){
 return [0,10].map(start=>{const list=LEGENDS.slice(start,start+10),count=list.filter((_,i)=>albumHasBlueprint(start+i)).length;return '<section class="album-section legend-album-section '+(start?'legend-ultimate':'')+'"><h3>'+(start?'終極藍圖 · 二周目':'傳說藍圖 · 一周目')+' <small>'+count+'/10</small></h3><div class="album-grid">'+archiveLegendOrder(start).map(id=>{const l=LEGENDS[id];return '<button class="album-card '+(albumHasLegend(id)?'collected':albumHasBlueprint(id)?'blueprint-known':'uncollected')+'" data-legend="'+id+'">'+archiveSortValueHTML('weapons',id,null,true)+'<span class="album-art">'+(albumHasLegend(id)?legendWeaponSVG(id):legendBlueprintSVG(id))+(albumHasLegend(id)&&!albumFromHome?weaponStarsHTML(masterySample({k:'w',c:l.c,t:l.tier,legendId:id,legendCore:{atk:1,def:1,spd:1}})):'')+'</span><b>'+l.name+'</b><small>'+(albumHasLegend(id)?'已鍛造':albumHasBlueprint(id)?'藍圖已取得':'第 '+(id+1)+' 關')+'</small></button>';}).join('')+'</div></section>';}).join('');
}

function renderLegendAlbum(){$('albumWeapons').innerHTML=legendAlbumSection();}
function openLegendRecipes(){albumFromHome=false;importLegendProgress();ensureBlueprintInventory();albumTier=-2;renderWeaponAlbum();$('weaponAlbumP').style.display='flex';}
function openLegendBlueprint(id,readOnly=false){
 blueprintReadOnly=!!readOnly;
 if(!validLegendId(id))return;blueprintInspectId=id;blueprintRotation=hand?.k==='bp'&&hand.id===id?(hand.rot||0):0;
 renderBlueprintPreview();$('legendBlueprintP').style.display='flex';
}
function renderBlueprintPreview(){
 const id=blueprintInspectId,l=LEGENDS[id];$('legendBlueprintTitle').textContent=l.name+'・'+legendKind(id)+'藍圖';$('legendBlueprintArt').innerHTML=blueprintShapeHTML(id,blueprintRotation);
 $('legendBlueprintState').textContent=blueprintReadOnly?'首頁圖鑑僅供欣賞；進入遊戲後，可從武器箱的藍圖收藏使用藍圖。':hasLegendBlueprint(id)?'將藍圖移到手持欄，再拖曳到棋盤放置。':'第 '+(id+1)+' 關「'+EXPEDITIONS[id].name+'」首次勝利取得';
 const sample=blueprintReadOnly?baseLegendWeapon(id):masterySample(baseLegendWeapon(id));$('legendBlueprintStats').innerHTML='<p class="exp-note">'+legendKind(id)+'武器基礎能力 · 未附魔</p>'+statsHTML(sample)+ultimateSkillHTML(sample)+ultimateArtHTML(id)+(id>=10?'<p class="exp-note">售價為原料合計的 '+(LEGENDS[id].price*100)+'%。'+(firstUltimateReward(id)?'本局首次打造另得 '+firstUltimateReward(id)+' 金幣（不計分）。':'本局首次打造獎金已領取。')+'</p>':'');
 $('legendBlueprintRecipe').innerHTML='<div class="bp-requirements">'+l.recipe.map((c,k)=>{const r=blueprintRequirement(id,k);return '<div><b>'+(k+1)+'</b>'+requirementArt(r)+'<span>'+requirementName(r)+'</span></div>';}).join('')+'</div><p class="exp-note">'+(id>=10?'每格只接受上方指定名稱的一周目傳說武器；普通武器、其他傳說或終極武器都不能替代。':'每格需要指定種類與固定階級的普通武器，更高或更低階都不能放入。')+'原料會消耗，最後一件放入的位置產生成品。</p><p class="exp-note">'+l.trait+' 完成後藍圖回到收藏，可重複使用。點擊黃色格可撤回藍圖與已投入原料。</p>';
 $('blueprintGoalSet').hidden=blueprintReadOnly;const active=legendProjects.some(p=>p.id===id);$('legendBlueprintForge').hidden=blueprintReadOnly;$('legendBlueprintForge').disabled=!hasLegendBlueprint(id)||active;$('legendBlueprintForge').textContent=active?'這張藍圖已放在棋盤':'確認放置 · 移到手持欄';
}

function rotateBlueprint(){blueprintRotation=(blueprintRotation+1)%4;renderBlueprintPreview();}
function prepareBlueprintHand(){
 if(blueprintReadOnly)return;
 const id=blueprintInspectId;if(!hasLegendBlueprint(id)||legendProjects.some(p=>p.id===id))return;
 if(hand?.k==='bp'&&hand.id===id)hand.rot=blueprintRotation;
 else{if(hand&&hand.k!=='bp')bag.push(hand);hand={k:'bp',id,rot:blueprintRotation};}
 ['legendBlueprintP','bagP','weaponAlbumP','chestP'].forEach(id=>$(id).style.display='none');render();saveNow();say('傳說藍圖已移到手持欄，拖到棋盤空位放置。');
}
function stowHand(e){
 e?.stopPropagation();if(hand===null||busy||drag)return;
 const item=hand;if(item.k!=='bp')bag.push(item);hand=null;clearPrediction();render();saveNow();say((item.k==='bp'?'已收回藍圖收藏：':'已收回道具箱：')+itemName(item));
}
function blueprintFootprint(id,rotation,origin){
 if(!validLegendId(id)||!Number.isInteger(origin)||!Number.isInteger(rotation))return [-1];
 const s=blueprintShape(id,rotation),x=origin%W,y=Math.floor(origin/W);return s.cells.map(([dx,dy])=>x+dx>=W||y+dy>=H||origin<0||origin>=W*H?-1:(y+dy)*W+x+dx);
}
function blueprintPlacement(id,rotation,origin){
 const cells=blueprintFootprint(id,rotation,origin);if(cells.some(i=>i<0))return {cells,why:'藍圖超出棋盤邊界'};
 for(const i of cells){if(isOff(i))return {cells,why:'藍圖包含尚未開放的格子'};if(g[i])return {cells,why:'藍圖需要完整的空格區域'};if(blueprintSlotAt(i))return {cells,why:'不能重疊其他藍圖'};if(frozen.has(i)||leaves.has(i))return {cells,why:'不能放在結冰或落葉格'};if(heat[i]>0)return {cells,why:'不能放在過熱格'};}
 return {cells,why:''};
}
function placeBlueprint(origin){
 if(hand?.k!=='bp'||!validLegendId(hand.id))return false;const bp=hand,r=blueprintPlacement(bp.id,bp.rot||0,origin);
 if(r.why){toast(r.why);say(r.why);render();return false;}
 legendProjects.push({uid:'bp-'+Date.now()+'-'+(++blueprintSequence),id:bp.id,rot:bp.rot||0,origin,cells:r.cells,filled:r.cells.map(()=>null)});hand=null;
 cool();say('黃色藍圖已放置，將指定武器拖到對應的暗色圖樣上。');settle();saveNow();return true;
}
function renderBlueprintCells(){
 $('app').classList.toggle('blueprint-mode',legendProjects.length>0);
 legendProjects.forEach(p=>p.cells.forEach((i,k)=>{const el=$('grid').children[i];if(!el)return;const r=blueprintRequirement(p.id,k),w=p.filled[k];el.classList.add('blueprint-cell');if(w)el.classList.add('blueprint-filled');
  el.innerHTML='<div class="bp-board-art '+(w?'':'bp-ghost')+'">'+(w?hex(w.c,bands(w),'',w.t,w):requirementArt(r))+'</div><small class="bp-board-need">'+(w?'✓ 已放入':requirementName(r))+'</small><span class="bp-board-index">'+(k+1)+'</span>';
 }));
}
function fillBlueprint(i,w,clear){
 if(w?.protected){toast('原料武器已受保護，請先取消保護');return false;}const target=blueprintSlotAt(i);if(!target)return false;const {project:p,slot:k}=target,r=blueprintRequirement(p.id,k);
 if(p.filled[k]){toast('這格原料已放入');render();return false;}
 if(!blueprintAccepts(p.id,k,w)){toast('無法放入：此格只接受'+requirementName(r));say('無法放入，原料種類與階級都必須完全符合，更高階也不能替代。');render();return false;}
 let completed=null;
 const value=JSON.parse(JSON.stringify(w));clear();p.filled[k]=value;
 if(p.filled.every(Boolean)){
  const result=applyWeaponElement(legendaryWeapon(p.id,p.filled),i);completed=result;recordWeaponCraft(result);const emberGold=consumeAutumnForgeReward();if(emberGold)toast('🍂 落葉餘燼：鍛造獎金 +100 金幣（不計分）');legendProjects=legendProjects.filter(x=>x!==p);g[i]=result;if(blueprintGoalId===p.id){blueprintGoalId=null;toast("製作計畫完成！");}
  p.cells.forEach(j=>{heat[j]=hotSteps();justHeated.add(j)});const debutReward=firstUltimateReward(p.id);recordLegendForge(p.id);if(debutReward){coins+=debutReward;toast("首次打造獎金 +"+debutReward+" 金幣（不計分）");}
  if(!testRun){legendBlueprints.add(p.id);persistLegendSets();rememberWeapon(result);}
  if(rankOf(result)>rankOf(best[result.c]))best[result.c]=JSON.parse(JSON.stringify(result));qOnForgeStats(result);grantBlueprintItem(p.id);burnLeaves();saveHi();
  say('🌟 '+LEGENDS[p.id].name+' 已在最後放入的位置鍛造完成！藍圖已回到藍圖收藏。');
 }else say('已放入原料 '+p.filled.filter(Boolean).length+' / '+p.cells.length+'，繼續完成藍圖。');
 render();if(completed)presentForgeResults([{w:completed,i}]);saveNow();return true;
}
function openBlueprintProject(uid){
 const p=legendProjects.find(x=>x.uid===uid);if(!p)return;blueprintProjectId=uid;$('blueprintProjectTitle').textContent=LEGENDS[p.id].name+'・進行中';
 $('blueprintProjectInfo').innerHTML='<p>已投入 '+p.filled.filter(Boolean).length+' / '+p.cells.length+' 把武器</p><div class="bp-requirements">'+p.filled.map((w,k)=>{const r=blueprintRequirement(p.id,k);return '<div><b>'+(k+1)+'</b>'+requirementArt(r)+'<span>'+(w?'✓ '+itemName(w):'等待 '+requirementName(r))+'</span></div>';}).join('')+'</div><p class="exp-note">撤回後，原料武器退回道具箱，藍圖保留在武器箱的藍圖收藏。</p>';
 $('blueprintProjectP').style.display='flex';
}
function cancelBlueprintProject(){
 const p=legendProjects.find(x=>x.uid===blueprintProjectId);if(!p)return;legendProjects=legendProjects.filter(x=>x!==p);bag.push(...p.filled.filter(Boolean));grantBlueprintItem(p.id);
 $('blueprintProjectP').style.display='none';render();saveNow();say('已撤回藍圖，原料完整退回道具箱。');
}
function restoreBlueprintProjects(raw){
 legendProjects=[];if(!Array.isArray(raw))return;const occupied=new Set();
 for(const p of raw){if(!p||!validLegendId(p.id))continue;const cells=blueprintFootprint(p.id,p.rot||0,p.origin),filled=Array.isArray(p.filled)?p.filled.map((w,k)=>{if(w&&k<cells.length&&!blueprintAccepts(p.id,k,w)){bag.push(w);return null;}return w;}):[];
  const good=Number.isInteger(p.origin)&&cells.every(i=>i>=0&&!g[i]&&!occupied.has(i))&&filled.length===cells.length&&filled.every((w,k)=>!w||blueprintAccepts(p.id,k,w))&&!filled.every(Boolean);
  if(!good){bag.push(...filled.filter(Boolean));continue;}
  const project={uid:'bp-'+Date.now()+'-'+(++blueprintSequence),id:p.id,rot:((p.rot||0)%4+4)%4,origin:p.origin,cells,filled};legendProjects.push(project);cells.forEach(i=>occupied.add(i));
 }
}
function blueprintDragPreview(e){
 const cell=at(e.clientX,e.clientY,'.c');if(!cell){showPrediction('拖曳整張藍圖到棋盤','需要相連的空格區域，可先在藍圖預覽旋轉。');return;}
 const origin=+cell.dataset.i,r=blueprintPlacement(hand.id,hand.rot||0,origin),shape=blueprintShape(hand.id,hand.rot||0),rect=cell.getBoundingClientRect(),gap=parseFloat(getComputedStyle($('grid')).columnGap)||4;
 drag.gh.classList.add('blueprint-drag');drag.gh.innerHTML=blueprintShapeHTML(hand.id,hand.rot||0);drag.gh.style.width=(rect.width*shape.w+gap*(shape.w-1))+'px';drag.gh.style.height=(rect.height*shape.h+gap*(shape.h-1))+'px';drag.gh.style.left=rect.left+'px';drag.gh.style.top=rect.top+'px';
 drag.gh.style.setProperty('--bp-tile-size',rect.width+'px');drag.gh.style.setProperty('--bp-grid-gap',gap+'px');
 r.cells.filter(i=>i>=0).forEach(i=>markPrediction(i,r.why?'pv-bad':'pv-target'));showPrediction(r.why||'放開部署 '+LEGENDS[hand.id].name,r.why||'依黃色格的暗色圖樣投入武器，最後一件的位置產生成品。',!!r.why);
}
function autumnLeafArt(){return '<svg viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true"><path fill="#70432b" d="M14 2h4v7h3V6h5v7h4v5h-5v4h-6v6h-3v3h-3v-5H8v-4H3v-5H1v-5h6V7h4v4h3z"/><path fill="#d97835" d="M15 5h2v8h5v-4h2v6h4v2h-6v4h-5v6h-2v-3h-5v-4H5v-4H3v-2h6v-4h1v5h5z"/><path fill="#eeaa4e" d="M15 6h2v9h6v2h-6v7h-2v-7H9v-2h6zM6 16h3v2H6z"/><path fill="#9d4c2c" d="M16 17h2v8h-2zM10 18h4v2h-4zM20 18h4v2h-4z"/><path fill="#f4c672" d="M15 7h1v8h-1z"/></svg>';}
EXPEDITIONS.forEach((m,id)=>m.loot={k:'bp',id});


function legendWeaponSVG(id){if(expandedGameEnabled())return cozySpriteSVG('legend-'+id,64,'','role="img" aria-label="'+LEGENDS[id].name+'"');if(id>=10)return ultimatePixelArt(id);return '<svg viewBox="0 0 64 64" role="img" aria-label="'+LEGENDS[id].name+'" shape-rendering="crispEdges"><image href="'+UNITY_ART['legend'+id]+'" width="64" height="64" style="image-rendering:pixelated"/></svg>';}
function legendBlueprintSVG(id){return '<svg viewBox="0 0 64 64" shape-rendering="crispEdges" aria-label="'+LEGENDS[id].name+'藍圖"><path fill="#263a51" d="M7 6h45v5h6v46H11v-5H5V12h2z"/><path fill="#4c7295" d="M11 10h37v5h6v37H15v-5h-4z"/><path stroke="#87b6cb" stroke-width="1" opacity=".35" d="M15 19h35M15 28h35M15 37h35M15 46h35M20 14v34M29 14v34M38 14v34M47 14v34"/><path fill="#e1cc90" d="M5 8h9v40H5zM12 48h43v9H12z"/><path fill="#fff0bd" d="M7 10h4v34H7zM15 50h37v3H15z"/><svg x="17" y="12" width="35" height="35" viewBox="0 0 64 64" style="filter:grayscale(1) brightness(1.6)">'+legendWeaponSVG(id).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')+'</svg><path fill="#e6c875" d="M43 46h11v9H43z"/></svg>';}