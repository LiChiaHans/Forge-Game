
let archiveCategory='weapons';
function setArchiveCategory(category){if(!expandedGameEnabled()||!['weapons','dishes','badges','museum'].includes(category)||albumTier===-2)return;archiveCategory=category;albumTier=-1;renderWeaponAlbum();}
function renderMuseumAlbum(){
 const mus=typeof loadTownMuseum==='function'?loadTownMuseum():{fish:[],relics:[],fishCounts:{},relicShards:{},fishMax:{}};
 const fishList=typeof FISH_CATALOG!=='undefined'?FISH_CATALOG:[],relicList=typeof RELIC_CATALOG!=='undefined'?RELIC_CATALOG:[];
 const fishB=typeof museumFishKitchenBonus==='function'?museumFishKitchenBonus(mus):{stars:0,bonus:0};
 const relicB=typeof museumRelicForgeBonus==='function'?museumRelicForgeBonus(mus):{count:0,bonus:0};
 $('albumProgress').textContent='本局博物典藏 · 魚類 '+mus.fish.length+'/'+fishList.length+'（🍲+'+(fishB.bonus*100).toFixed(1)+'%）· 古物 '+mus.relics.length+'/'+relicList.length+'（⚒+'+(relicB.bonus*100).toFixed(1)+'%）';
 $('albumWeapons').innerHTML='<section class="album-section museum-album-section"><h3>🐟 星露魚類圖鑑（廚房加成） <small>'+fishB.stars+' ★</small></h3><div class="tw-grid">'
  +fishList.map(f=>{const cnt=mus.fishCounts?.[f.id]||0,got=cnt>0||mus.fish.includes(f.id),st=typeof fishStarLevel==='function'?fishStarLevel(cnt):0;return '<button type="button" class="tw-item is-click'+(got?' is-got':'')+'" data-stars="'+st+'" onclick="openMuseumInspect(\'fish\',\''+f.id+'\')"><div class="tw-px-frame">'+(typeof pixelFishArt==='function'?pixelFishArt(f.id,!got):f.icon)+'</div><b>'+(got?f.name:'？？？')+'</b><small>'+(got?'★'.repeat(st)+'☆'.repeat(3-st)+' · '+cnt+'隻':SEASONS[f.season].icon+(f.night?'🌙 夜':'☀ 日'))+'</small></button>';}).join('')
  +'</div></section><section class="album-section museum-album-section"><h3>🏺 古代文物館藏（冶煉加成） <small>'+mus.relics.length+'/'+relicList.length+'</small></h3><div class="tw-list">'
  +relicList.map(r=>{const sh=Math.min(9,mus.relicShards?.[r.id]||0),done=mus.relics.includes(r.id),seen=done||sh>0,canPuz=!done&&sh>=9;return '<button type="button" class="tw-row is-click'+(done?' is-got-row':canPuz?' is-ready-row':'')+'" onclick="openMuseumInspect(\'relic\',\''+r.id+'\')"><div class="tw-px-badge">'+(typeof pixelRelicArt==='function'?pixelRelicArt(r.id,!seen):r.icon)+'</div><div class="tw-info"><b>'+(seen?r.name:'未出土古物')+' <small class="tw-role">'+(done?'✓ 已修復':canPuz?'🧩 可拼圖！':'碎片 '+sh+'/9')+'</small></b><small>'+(seen?r.desc:'在西側古物遺跡營地探勘收集 9 片碎片。')+'</small></div></button>';}).join('')
  +'</div></section>';
}
function renderDishAlbum(){
 $('albumProgress').textContent=(albumFromHome?'跨局料理收藏 · ':'本局料理收藏 · ')+KITCHEN_NAMES.reduce((n,_,c)=>n+KITCHEN_GRADES.filter((_,t)=>(albumFromHome?dishAlbum.has(c+':'+t):(kitchen?.xp[c+':'+t]||0)>0)).length,0)+'/50';
 $('albumWeapons').innerHTML=KITCHEN_GRADES.map((name,t)=>'<section class="album-section dish-album-section"><h3>'+kitchenGradeName(t)+' '+archiveTierPriceHTML('dishes',t)+' <small>'+KITCHEN_NAMES.filter((_,c)=>(albumFromHome?dishAlbum.has(c+':'+t):(kitchen?.xp[c+':'+t]||0)>0)).length+'/10</small></h3><div class="album-grid">'+archiveOrder('dishes',t).map(c=>{const name=KITCHEN_NAMES[c],found=(albumFromHome?dishAlbum.has(c+':'+t):(kitchen?.xp[c+':'+t]||0)>0);return '<button class="album-card '+(found?'collected':'uncollected')+'" data-album-dish="'+c+'" data-tier="'+t+'" aria-label="'+kitchenGradeName(t)+name+'，'+(found?'已製作':'未製作')+'">'+archiveSortValueHTML('dishes',c,t)+'<span class="album-art">'+kitchenArt({k:'w',c,t})+'</span><b>'+name+'</b><small>'+(found?'已製作':'未製作')+'</small></button>';}).join('')+'</div></section>').join('');
}
function inspectArchiveDish(c,t){if(!expandedGameEnabled()||!Number.isInteger(c)||!Number.isInteger(t)||c<0||c>=10||t<0||t>=5)return;inspectKitchenDish({k:'w',c,t});}
