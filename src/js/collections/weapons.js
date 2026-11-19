
const justHeated=new Set();
const $=id=>document.getElementById(id),rnd=n=>Math.floor(Math.random()*n);
// Permanent collection records exact weapon/tier discoveries independently of runs.
const weaponAlbum=new Set();let albumTier=-1,inspectedWeapon=0,inspectedTier=0;
try{const stored=JSON.parse(gameStorage.getItem('forgeWeaponAlbumV1')||'[]');if(Array.isArray(stored))stored.forEach(k=>{if(typeof k==='string'&&/^[0-9]:[0-4]$/.test(k))weaponAlbum.add(k);});}catch(e){}
const runWeaponAlbum=new Set(),runLegendBlueprints=new Set(),runLegendCollection=new Set();
const validAlbumKey=k=>typeof k==='string'&&/^[0-9]:[0-4]$/.test(k);
function albumWeapons(){return albumFromHome?weaponAlbum:runWeaponAlbum;}
function albumHasBlueprint(id){return albumFromHome?legendBlueprints.has(id):hasLegendBlueprint(id);}
function albumHasLegend(id){return albumFromHome?legendCollection.has(id):hasLegendCollection(id);}
function resetRunCollections(){runWeaponAlbum.clear();runLegendBlueprints.clear();runLegendCollection.clear();}
function snapshotRunCollections(){return {version:1,weapons:[...runWeaponAlbum],blueprints:[...runLegendBlueprints],legends:[...runLegendCollection]};}
function restoreRunCollections(raw){
 resetRunCollections();const saved=raw.collections||{};
 (saved.weapons||[]).filter(validAlbumKey).forEach(k=>runWeaponAlbum.add(k));
 (saved.blueprints||[]).filter(validLegendId).forEach(id=>runLegendBlueprints.add(id));
 (saved.legends||[]).filter(validLegendId).forEach(id=>{runLegendCollection.add(id);runLegendBlueprints.add(id)});
 (raw.expedition?.cleared||[]).filter(validLegendId).forEach(id=>runLegendBlueprints.add(id));
 (raw.legendProjects||[]).forEach(p=>{if(validLegendId(p?.id))runLegendBlueprints.add(p.id)});
 const scan=w=>{if(w?.k!=='w')return;rememberWeapon(w,false);if(isLegend(w)){runLegendBlueprints.add(w.legendId);runLegendCollection.add(w.legendId)}};
 (raw.best||[]).forEach((w,c)=>{if(w)scan({...w,k:'w',c})});
 [...g,...pack,...bag,hand,...legendProjects.flatMap(p=>p.filled)].forEach(scan);
 runWeaponAlbum.forEach(k=>weaponAlbum.add(k));runLegendBlueprints.forEach(id=>legendBlueprints.add(id));runLegendCollection.forEach(id=>legendCollection.add(id));
 persistWeaponAlbum();persistLegendSets();ensureBlueprintInventory();
}
function recordLegendForge(id){
 unlockLegendBlueprint(id);if(testRun){legendDemoCollection.add(id);return;}
 runLegendCollection.add(id);legendCollection.add(id);persistLegendSets();
}
function baseAlbumWeapon(c,t){return {k:'w',c,t,parts:COMBO[c].split('').map(s=>({s:+s,t})),cs:[t,t,t],m:0,b:0,dts:[],statVersion:1};}
function baseLegendWeapon(id){return legendaryWeapon(id,LEGENDS[id].recipe.map((c,k)=>id>=10?baseLegendWeapon(c):baseAlbumWeapon(c,BLUEPRINT_TIERS[id][k])));}

function albumKey(c,t){return c+':'+t;}
function rememberWeapon(w,persist=true,collectRun=true){
 if(testRun){if(!w||!validAlbumKey(w.c+':'+w.t))return false;const k=w.c+':'+w.t,changed=!runWeaponAlbum.has(k);if(collectRun)runWeaponAlbum.add(k);return changed;}
 if(!w||!Number.isInteger(w.c)||w.c<0||w.c>=WN.length||!Number.isInteger(w.t)||w.t<0||w.t>=NM.length)return false;
 const key=albumKey(w.c,w.t),changed=!weaponAlbum.has(key);if(collectRun)runWeaponAlbum.add(key);weaponAlbum.add(key);if(changed&&persist&&!testRun)persistWeaponAlbum();return changed;
}
function persistWeaponAlbum(){if(testRun)return;try{gameStorage.setItem('forgeWeaponAlbumV1',JSON.stringify([...weaponAlbum].sort()));}catch(e){}}
function importWeaponAlbum(){if(sandboxSession)return;
  let changed=false;
  const scanBest=b=>{if(Array.isArray(b))b.forEach((w,c)=>{if(w)changed=rememberWeapon({...w,c},false,false)||changed;});};
  const scanState=s=>{if(!s)return;(s.collections?.weapons||[]).filter(validAlbumKey).forEach(k=>{if(!weaponAlbum.has(k)){weaponAlbum.add(k);changed=true}});scanBest(s.best);[...(s.g||[]),...(s.pack||[]),...(s.bag||[]),s.hand].forEach(w=>{if(w&&w.k==='w')changed=rememberWeapon(w,false,false)||changed;});};
  recs.forEach(r=>scanBest(r.best));saves.forEach(s=>scanState(s.state));
  if(!testRun&&day>0){scanBest(best);scanState({g,pack,bag,hand});}
  if(changed)persistWeaponAlbum();
}
function openWeaponAlbum(){if(!sandboxSession)dishAlbum=readDishAlbum();archiveCategory='weapons';albumFromHome=$("title").style.display!=="none";importLegendProgress();importWeaponAlbum();albumTier=-1;renderWeaponAlbum();$('weaponAlbumP').style.display='flex';}
function renderWeaponAlbumGrid(){
  const blueprintOnly=albumTier===-2;
  $('weaponAlbumP').querySelector('h2').textContent=blueprintOnly?'🌟 藍圖收藏':'📖 武器圖鑑';
  $('albumTabs').style.display=blueprintOnly?'none':'grid';
  if(blueprintOnly){$('albumProgress').textContent='藍圖 '+LEGENDS.filter((_,id)=>albumHasBlueprint(id)).length+'/20 · 珍藏 '+LEGENDS.filter((_,id)=>albumHasLegend(id)).length+'/20';renderLegendAlbum();return;}
  $('albumProgress').textContent=(albumFromHome?'跨局累計 · ':'本局收藏 · ')+'普通 '+albumWeapons().size+'/50 · 藍圖 '+LEGENDS.filter((_,id)=>albumHasBlueprint(id)).length+'/20 · 珍藏 '+LEGENDS.filter((_,id)=>albumHasLegend(id)).length+'/20';
  $('albumTabs').innerHTML=[-1,0,1,2,3,4].map(t=>'<button data-album-tier="'+t+'" aria-pressed="'+(t===albumTier)+'">'+(t===-2?'🌟 傳說藍圖':t<0?'全部':NM[t]+'級')+'</button>').join('');
  $('albumWeapons').innerHTML=NM.map((name,t)=>{
    if(albumTier!==-1&&albumTier!==t)return '';
    const total=WN.filter((_,c)=>albumWeapons().has(albumKey(c,t))).length;
    return '<section class="album-section"><h3 style="color:'+C[t]+'">'+name+'級 '+archiveTierPriceHTML('weapons',t)+' <small>'+total+'/10</small></h3><div class="album-grid">'+archiveOrder('weapons',t).map(c=>{const n=WN[c];
      const found=albumWeapons().has(albumKey(c,t));
      return '<button class="album-card '+(found?'collected':'uncollected')+'" data-album-weapon="'+c+'" data-tier="'+t+'" aria-label="'+name+'級'+n+'，'+(found?'已蒐集':'未蒐集')+'">'+archiveSortValueHTML('weapons',c,t)+'<span class="album-art">'+hex(c,C[t],'',t,galleryWeapon(c,t))+'</span><b>'+n+'</b><small>'+(found?'已蒐集':'未蒐集')+'</small></button>';
    }).join('')+'</div></section>';
  }).join('')+legendAlbumSection();
}
function renderWeaponAlbum(){renderArchiveSort();const albumEl=$('weaponAlbumP');if(albumEl?.dataset)albumEl.dataset.category=albumTier===-2?'blueprints':archiveCategory;const categories=$('archiveCategories');categories.hidden=albumTier===-2;if(albumTier===-2)return renderWeaponAlbumGrid();albumTier=-1;$('archiveWeapons').setAttribute('aria-pressed',String(archiveCategory==='weapons'));$('archiveDishes').setAttribute('aria-pressed',String(archiveCategory==='dishes'));$('archiveBadges').setAttribute('aria-pressed',String(archiveCategory==='badges'));if(archiveCategory==='badges')renderFestivalBadgeAlbum();else if(archiveCategory==='dishes')renderDishAlbum();else renderWeaponAlbumGrid();$('weaponAlbumP').querySelector('h2').textContent='📚 圖鑑館';$('albumTabs').style.display='none';}
$('albumTabs').onclick=e=>{const b=e.target.closest('[data-album-tier]');if(!b)return;albumTier=+b.dataset.albumTier;renderWeaponAlbum();};
$('albumWeapons').onclick=e=>{const medal=e.target.closest('[data-medal-id]');if(medal){inspectMedal(medal.dataset.medalId);return;}const dish=e.target.closest('[data-album-dish]');if(dish){inspectArchiveDish(+dish.dataset.albumDish,+dish.dataset.tier);return;}const legend=e.target.closest('[data-legend]');if(legend){openLegendBlueprint(+legend.dataset.legend,albumFromHome);return;}const b=e.target.closest('[data-album-weapon]');if(!b)return;showWeaponDetail(+b.dataset.albumWeapon,+b.dataset.tier);};
function showWeaponDetail(c,t){
  inspectedWeapon=c;inspectedTier=t;const found=albumWeapons().has(albumKey(c,t)),sample=galleryWeapon(c,t);
  $('inspectName').textContent=NM[t]+'級'+WN[c];$('inspectArt').className=found?'collected':'uncollected';$('inspectArt').innerHTML=hex(c,C[t],'',t,sample);
  $('inspectStats').innerHTML='<p class="exp-note">基礎能力 · 未附魔</p>'+statsHTML(sample);
  $('inspectState').textContent=found?'已蒐集 · '+NM[t]+'級工藝':'尚未蒐集 · 鍛造這個階級的武器即可點亮';
  $('inspectPrev').disabled=t===0;$('inspectNext').disabled=t===NM.length-1;$('weaponInspectP').style.display='flex';
}
$('inspectPrev').onclick=()=>{if(inspectedTier>0)showWeaponDetail(inspectedWeapon,inspectedTier-1);};
$('inspectNext').onclick=()=>{if(inspectedTier<NM.length-1)showWeaponDetail(inspectedWeapon,inspectedTier+1);};