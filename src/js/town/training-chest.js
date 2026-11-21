


function townSkillStar(){const points=sp+(kitchen?.sp||0);
 return '<span class="town-skill-star '+(points>0?'has-points':'')+'" aria-label="剩餘 '+(sandboxSession?'∞':points)+' 點技能點"><svg viewBox="0 0 64 64" aria-hidden="true" shape-rendering="crispEdges"><path fill="#73502e" d="M27 1h10v10h5v8h19v12h-7v6h-7v8h4v16H39v-5h-7v-4h-7v4h-8v5H9V45h4v-8H6v-6H1V19h20v-8h6z"/><path fill="#d89b35" d="M29 5h6v10h5v8h17v6h-7v6h-7v10h4v10h-6v-5h-9v-4h-9v5h-8v4h-2v-9h4V35h-7v-6H5v-6h19v-8h5z"/><path fill="#f8d976" d="M29 7h6v13h5v7h12l-13 12 3 11-11-7-11 7 3-13-12-10h14v-7h4z"/><path fill="#fff0aa" d="M29 8h4v14h-5v8H16v-3h10V17h3z"/></svg><b>'+(sandboxSession?'∞':points)+'</b></span>';
}
function townChestArt(open=false){return workshopChestSVG(open);}
function renderTownChest(){
 const el=$('townChest');el.hidden=pendingChests<=0;if(el.dataset.count===String(pendingChests))return;el.dataset.count=String(pendingChests);
 el.innerHTML=townChestArt()+'<span class="town-chest-count">'+pendingChests+'</span>';
 el.setAttribute('aria-label','營業寶箱，剩餘 '+pendingChests+' 次');
}
function syncTownLootAllBtn(){
 const allBtn=$('townLootOpenAll');
 if(!allBtn)return;
 allBtn.hidden=pendingChests<2;
 allBtn.disabled=chestOpening||pendingChests<2;
 allBtn.textContent='✨ 一鍵全開（×'+pendingChests+'）';
}
function openTownChest(){
 if(pendingChests<=0||chestOpening)return;
 $('townLootArt').innerHTML=townChestArt();$('townLootName').textContent='營業完成的贈禮';
 $('townLootRemaining').textContent='累積 '+pendingChests+' 次，每次可獲得 1 個冶煉廠或餐廳道具。';
 $('townLootOpen').textContent='開啟寶箱';$('townLootOpen').disabled=false;
 $('townLootClose').textContent='稍後再開';$('townLootClose').disabled=false;
 syncTownLootAllBtn();
 $('townLootP').style.display='flex';
}
function claimTownChest(){
 if(chestOpening||pendingChests<=0)return;
 chestOpening=true;const reward=drawTownChestReward(),item=reward.item;pendingChests--;grantTownChestReward(reward);
 // Commit the item and counter together before animation so reloads cannot lose or duplicate a reward.
 saveNow();renderTown();
 $('townLootOpen').disabled=true;$('townLootClose').disabled=true;syncTownLootAllBtn();
 $('townLootArt').innerHTML=townChestArt(true);$('townLootName').textContent='寶箱開啟中…';
 gameTimeout(()=>{
   $('townLootArt').innerHTML='<div class="town-loot-item">'+(reward.workshop==='kitchen'?kitchenArt(item):itemH(item))+'</div>';
   $('townLootName').textContent=(reward.workshop==='kitchen'?'餐廳 · ':'冶煉廠 · ')+(reward.workshop==='kitchen'?kitchenItemName(item):itemName(item));$('townLootRemaining').textContent=(item.k==='seed'?'種子已送入溫室':reward.workshop==='kitchen'?'已放入廚房道具箱':'已放入冶煉廠道具箱')+' · 還有 '+pendingChests+' 次';
   $('townLootOpen').textContent='再開一個';$('townLootOpen').disabled=pendingChests<=0;
   $('townLootClose').textContent='收下';$('townLootClose').disabled=false;chestOpening=false;syncTownLootAllBtn();
 },700);
}
function claimAllTownChests(){
 if(chestOpening||pendingChests<=0)return;
 chestOpening=true;const total=pendingChests,rewards=[];
 while(pendingChests>0){const r=drawTownChestReward();pendingChests--;grantTownChestReward(r);rewards.push(r);}
 saveNow();renderTown();
 $('townLootOpen').disabled=true;$('townLootClose').disabled=true;syncTownLootAllBtn();
 $('townLootArt').innerHTML=townChestArt(true);$('townLootName').textContent='正在開啟全部 '+total+' 個寶箱…';
 gameTimeout(()=>{
  const summary=new Map();
  rewards.forEach(r=>{
   const name=(r.workshop==='kitchen'?'餐廳 · ':'冶煉廠 · ')+(r.workshop==='kitchen'?kitchenItemName(r.item):itemName(r.item));
   const cur=summary.get(name)||{r,name,n:0};cur.n++;summary.set(name,cur);
  });
  $('townLootArt').innerHTML='<div class="town-loot-batch">'+[...summary.values()].map(x=>'<div class="town-loot-batch-item"><span class="tlb-art">'+(x.r.workshop==='kitchen'?kitchenArt(x.r.item):itemH(x.r.item))+'</span><b>'+esc(x.name)+(x.n>1?' ×'+x.n:'')+'</b></div>').join('')+'</div>';
  $('townLootName').textContent='🎉 已一鍵開啟全部 '+total+' 個寶箱！';
  $('townLootRemaining').textContent='全部道具與種子已自動送入對應道具箱與溫室 · 還有 0 次';
  $('townLootOpen').textContent='已全數開啟';$('townLootOpen').disabled=true;
  $('townLootClose').textContent='收下';$('townLootClose').disabled=false;chestOpening=false;syncTownLootAllBtn();
 },550);
}
let townSkillBranch='forge';
function requireWorkshopTraining(branch){
 if(day<1||sandboxSession)return false;const points=branch==='kitchen'?kitchen.sp:sp;if(points<=0)return false;
 if(workshopSkillsMaxed(branch)){convertWorkshopSurplus(branch);saveNow();render();return false;}
 remindTownSkills(branch);return true;
}
function remindTownSkills(branch='forge'){
 townSkillBranch=branch;const name=branch==='kitchen'?'餐廳':'冶煉廠',points=branch==='kitchen'?kitchen.sp:sp;
 $('townSkillCount').textContent=name+'還有 '+points+' 點技能點尚未使用。請先到訓練所分配完畢，才能進入'+name+'營業。';
 $('townSkillP').style.display='flex';
}
function openRequiredTraining(){closeP('townSkillP');return performSceneTransition('城鎮',()=>{$('kitchenP').hidden=true;showTown();openSkills(false);trainingBranch=townSkillBranch;renderSk();});}
function openTownForgeBoard(){
 if(isSandboxNight()){toast('現在是晚餐時段，前往廚房餐廳營業。');return;}
 if(requireWorkshopTraining('forge'))return;
 $('townSkillP').style.display='none';phase='play';$('townP').style.display='none';render();saveNow();showPendingSeasonNotice();
}
function startTownForge(){
 if(forgeSettlementPending()){renderForgeSettlement();return;}
 if(isSandboxNight()){openTownForgeBoard();return;}
 if(requireWorkshopTraining('forge'))return;
 return performSceneTransition('冶煉廠',openTownForgeBoard);
}
function restoreTownProgress(t){
 pendingChests=Math.max(0,Math.floor(Number(t.pendingChests)||0));
 lastCompletedDay=Math.max(0,Math.floor(Number(t.lastCompletedDay)||0));
 if(t.phase==='reward'){
   // Old saves already received their skill point; only carry over the unclaimed daily item.
   if(!t.gachaUsed)pendingChests++;
   lastCompletedDay=Math.max(lastCompletedDay,day);newDay();return;
 }
 if(day>0)showTown();
}
