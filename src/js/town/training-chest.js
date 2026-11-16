


function townSkillStar(){const points=sp+(kitchen?.sp||0);
 return '<span class="town-skill-star '+(points>0?'has-points':'')+'" aria-label="剩餘 '+(sandboxSession?'∞':points)+' 點技能點"><svg viewBox="0 0 64 64" aria-hidden="true" shape-rendering="crispEdges"><path fill="#73502e" d="M27 1h10v10h5v8h19v12h-7v6h-7v8h4v16H39v-5h-7v-4h-7v4h-8v5H9V45h4v-8H6v-6H1V19h20v-8h6z"/><path fill="#d89b35" d="M29 5h6v10h5v8h17v6h-7v6h-7v10h4v10h-6v-5h-9v-4h-9v5h-8v4h-2v-9h4V35h-7v-6H5v-6h19v-8h5z"/><path fill="#f8d976" d="M29 7h6v13h5v7h12l-13 12 3 11-11-7-11 7 3-13-12-10h14v-7h4z"/><path fill="#fff0aa" d="M29 8h4v14h-5v8H16v-3h10V17h3z"/></svg><b>'+(sandboxSession?'∞':points)+'</b></span>';
}
function townChestArt(open=false){
 return '<svg viewBox="0 0 80 72" aria-hidden="true" shape-rendering="crispEdges"><path fill="#142333" opacity=".4" d="M7 61h65v7H7z"/><path fill="#322e32" d="M8 29h64v34H8z"/><path fill="#95613a" d="M12 33h56v26H12z"/><path fill="#67422d" d="M12 45h56v13H12z"/><path fill="#d19a4a" d="M12 33h7v26h-7zM60 33h8v26h-8zM12 57h56v4H12z"/><path stroke="#3f332a" stroke-width="2" d="M20 40h39M20 51h39"/><g class="town-chest-lid '+(open?'is-open':'')+'"><path fill="#322e32" d="M8 30V17h5v-5h53v5h6v16H8z"/><path fill="#a66d3e" d="M12 28V19h5v-3h45v3h6v9z"/><path fill="#dba94f" d="M12 21h7v9h-7zM60 20h8v10h-8zM16 16h48v4H16z"/><path fill="#edc16b" d="M17 16h44v3H17z"/><path fill="#69452e" d="M21 23h37v4H21z"/></g><path fill="#dca54c" d="M33 28h15v19H33z"/><path fill="#ffe39a" d="M35 30h11v5H35z"/><path fill="#4b3930" d="M39 36h4v8h-4z"/>'+(open?'<path fill="#ffe38d" d="M19 12h4v5h-4zM51 4h4v7h-4zM35 2h3v4h-3zM62 9h4v4h-4z"/>':'')+'</svg>';
}
function renderTownChest(){
 const el=$('townChest');el.hidden=pendingChests<=0;if(el.dataset.count===String(pendingChests))return;el.dataset.count=String(pendingChests);
 el.innerHTML=townChestArt()+'<span class="town-chest-count">'+pendingChests+'</span>';
 el.setAttribute('aria-label','每日寶箱，剩餘 '+pendingChests+' 次');
}
function openTownChest(){
 if(pendingChests<=0||chestOpening)return;
 $('townLootArt').innerHTML=townChestArt();$('townLootName').textContent='每日寶箱';
 $('townLootRemaining').textContent='累積 '+pendingChests+' 次，每次開啟可獲得 1 個道具。';
 $('townLootOpen').textContent='開啟寶箱';$('townLootOpen').disabled=false;
 $('townLootClose').textContent='稍後再開';$('townLootClose').disabled=false;
 $('townLootP').style.display='flex';
}
function claimTownChest(){
 if(chestOpening||pendingChests<=0)return;
 chestOpening=true;const item=drawItem();pendingChests--;grantGardenLoot(item);
 // Commit the item and counter together before animation so reloads cannot lose or duplicate a reward.
 saveNow();renderTown();
 $('townLootOpen').disabled=true;$('townLootClose').disabled=true;
 $('townLootArt').innerHTML=townChestArt(true);$('townLootName').textContent='寶箱開啟中…';
 gameTimeout(()=>{
   $('townLootArt').innerHTML='<div class="town-loot-item">'+itemH(item)+'</div>';
   $('townLootName').textContent=itemName(item);$('townLootRemaining').textContent=(item.k==='seed'?'種子已送入溫室':'已放入道具箱')+' · 還有 '+pendingChests+' 次';
   $('townLootOpen').textContent='再開一個';$('townLootOpen').disabled=pendingChests<=0;
   $('townLootClose').textContent='收下';$('townLootClose').disabled=false;chestOpening=false;
 },700);
}
function remindTownSkills(){
 $('townSkillCount').textContent='還有 '+sp+' 點技能點尚未使用。要先前往訓練所嗎？';
 $('townSkillP').style.display='flex';
}
function startTownForge(){if(isSandboxNight())return preview_startTownForge(...arguments);return performSceneTransition('冶煉廠',()=>preview_startTownForge());}
function stable_startTownForge(){
 $('townSkillP').style.display='none';phase='play';$('townP').style.display='none';render();saveNow();showPendingSeasonNotice();
}
function preview_startTownForge(){
 if(isSandboxNight()){toast('現在是晚餐時段，前往廚房餐廳營業。');return;}
 $('townSkillP').style.display='none';phase='play';$('townP').style.display='none';render();saveNow();showPendingSeasonNotice();
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
