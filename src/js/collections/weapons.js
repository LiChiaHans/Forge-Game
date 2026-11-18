
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
function renderWeaponAlbum(){renderArchiveSort();const categories=$('archiveCategories');categories.hidden=!expandedGameEnabled()||albumTier===-2;if(!expandedGameEnabled()||albumTier===-2)return stage20_renderWeaponAlbum();albumTier=-1;$('archiveWeapons').setAttribute('aria-pressed',String(archiveCategory==='weapons'));$('archiveDishes').setAttribute('aria-pressed',String(archiveCategory==='dishes'));$('archiveBadges').setAttribute('aria-pressed',String(archiveCategory==='badges'));if(archiveCategory==='badges')renderFestivalBadgeAlbum();else if(archiveCategory==='dishes')renderDishAlbum();else stage20_renderWeaponAlbum();$('weaponAlbumP').querySelector('h2').textContent='📚 圖鑑館';$('albumTabs').style.display='none';}
$('albumTabs').onclick=e=>{const b=e.target.closest('[data-album-tier]');if(!b)return;albumTier=+b.dataset.albumTier;renderWeaponAlbum();};
$('albumWeapons').onclick=e=>{const dish=e.target.closest('[data-album-dish]');if(dish){inspectArchiveDish(+dish.dataset.albumDish,+dish.dataset.tier);return;}const legend=e.target.closest('[data-legend]');if(legend){openLegendBlueprint(+legend.dataset.legend,albumFromHome);return;}const b=e.target.closest('[data-album-weapon]');if(!b)return;showWeaponDetail(+b.dataset.albumWeapon,+b.dataset.tier);};
function showWeaponDetail(c,t){
  inspectedWeapon=c;inspectedTier=t;const found=albumWeapons().has(albumKey(c,t)),sample=galleryWeapon(c,t);
  $('inspectName').textContent=NM[t]+'級'+WN[c];$('inspectArt').className=found?'collected':'uncollected';$('inspectArt').innerHTML=hex(c,C[t],'',t,sample);
  $('inspectStats').innerHTML='<p class="exp-note">基礎能力 · 未附魔</p>'+statsHTML(sample);
  $('inspectState').textContent=found?'已蒐集 · '+NM[t]+'級工藝':'尚未蒐集 · 鍛造這個階級的武器即可點亮';
  $('inspectPrev').disabled=t===0;$('inspectNext').disabled=t===NM.length-1;$('weaponInspectP').style.display='flex';
}
$('inspectPrev').onclick=()=>{if(inspectedTier>0)showWeaponDetail(inspectedWeapon,inspectedTier-1);};
$('inspectNext').onclick=()=>{if(inspectedTier<NM.length-1)showWeaponDetail(inspectedWeapon,inspectedTier+1);};