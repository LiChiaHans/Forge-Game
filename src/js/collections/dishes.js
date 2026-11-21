
let archiveCategory='weapons';
function setArchiveCategory(category){if(!expandedGameEnabled()||!['weapons','dishes','badges','museum'].includes(category)||albumTier===-2)return;archiveCategory=category;albumTier=-1;renderWeaponAlbum();}
function renderMuseumAlbum(){
 const mus=typeof loadTownMuseum==='function'?loadTownMuseum():{fish:[],relics:[],fishMax:{}};
 const fishList=typeof FISH_CATALOG!=='undefined'?FISH_CATALOG:[],relicList=typeof RELIC_CATALOG!=='undefined'?RELIC_CATALOG:[];
 const tot=mus.fish.length+mus.relics.length,maxTot=fishList.length+relicList.length,bonusPct=Math.min(14,Math.floor(tot/4)*2);
 $('albumProgress').textContent='跨局博物收藏 · '+tot+'/'+maxTot+' 件（永久全工坊售價 +'+bonusPct+'%）';
 $('albumWeapons').innerHTML='<section class="album-section museum-album-section"><h3>🐟 星露魚類圖鑑 <small>'+mus.fish.length+'/'+fishList.length+'</small></h3><div class="tw-grid">'
  +fishList.map(f=>{const got=mus.fish.includes(f.id),maxCm=mus.fishMax?.[f.id];return '<div class="tw-item'+(got?' is-got':'')+'"><div class="tw-px-frame">'+(typeof pixelFishArt==='function'?pixelFishArt(f.id,!got):f.icon)+'</div><b>'+(got?f.name:'？？？')+'</b><small>'+SEASONS[f.season].icon+(f.night?'🌙 夜':'☀ 日')+' · '+'★'.repeat(f.rarity+1)+(got&&maxCm?' · '+maxCm+'cm':'')+'</small></div>';}).join('')
  +'</div></section><section class="album-section museum-album-section"><h3>🏺 古代文物館藏 <small>'+mus.relics.length+'/'+relicList.length+'</small></h3><div class="tw-list">'
  +relicList.map(r=>{const got=mus.relics.includes(r.id);return '<div class="tw-row'+(got?' is-got-row':'')+'"><div class="tw-px-badge">'+(typeof pixelRelicArt==='function'?pixelRelicArt(r.id,!got):r.icon)+'</div><div class="tw-info"><b>'+(got?r.name:'未出土古物')+' <small class="tw-role">'+'★'.repeat(r.rarity+1)+'</small></b><small>'+(got?r.desc:'在西側古物遺跡營地探勘有機會出土。')+'</small></div></div>';}).join('')
  +'</div></section>';
}
function renderDishAlbum(){
 $('albumProgress').textContent=(albumFromHome?'跨局料理收藏 · ':'本局料理收藏 · ')+KITCHEN_NAMES.reduce((n,_,c)=>n+KITCHEN_GRADES.filter((_,t)=>(albumFromHome?dishAlbum.has(c+':'+t):(kitchen?.xp[c+':'+t]||0)>0)).length,0)+'/50';
 $('albumWeapons').innerHTML=KITCHEN_GRADES.map((name,t)=>'<section class="album-section dish-album-section"><h3>'+kitchenGradeName(t)+' '+archiveTierPriceHTML('dishes',t)+' <small>'+KITCHEN_NAMES.filter((_,c)=>(albumFromHome?dishAlbum.has(c+':'+t):(kitchen?.xp[c+':'+t]||0)>0)).length+'/10</small></h3><div class="album-grid">'+archiveOrder('dishes',t).map(c=>{const name=KITCHEN_NAMES[c],found=(albumFromHome?dishAlbum.has(c+':'+t):(kitchen?.xp[c+':'+t]||0)>0);return '<button class="album-card '+(found?'collected':'uncollected')+'" data-album-dish="'+c+'" data-tier="'+t+'" aria-label="'+kitchenGradeName(t)+name+'，'+(found?'已製作':'未製作')+'">'+archiveSortValueHTML('dishes',c,t)+'<span class="album-art">'+kitchenArt({k:'w',c,t})+'</span><b>'+name+'</b><small>'+(found?'已製作':'未製作')+'</small></button>';}).join('')+'</div></section>').join('');
}
function inspectArchiveDish(c,t){if(!expandedGameEnabled()||!Number.isInteger(c)||!Number.isInteger(t)||c<0||c>=10||t<0||t>=5)return;inspectKitchenDish({k:'w',c,t});}