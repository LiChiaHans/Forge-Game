
function cozySpriteSVG(key,size=64,extra='',attributes='',inset=0){
 const src=cozyItemURL(key);return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+size+' '+size+'" shape-rendering="crispEdges" data-cozy-item="'+key+'" '+attributes+'><image href="'+src+'" x="'+inset+'" y="'+inset+'" width="'+(size-2*inset)+'" height="'+(size-2*inset)+'" preserveAspectRatio="xMidYMid meet" style="image-rendering:pixelated"/>'+extra+'</svg>';
}
function cozyItemURL(key){return cozyItemSnapshotAssets.get(key)||COZY_ITEM_ART[key]||'';}
function syncCozyItemLook(){document.body.classList.toggle('cozy-items',expandedGameEnabled());}
function cozyOreClass(){return expandedGameEnabled()?' cozy-ore':'';}
function cozyOreAttributes(t){return expandedGameEnabled()?' data-cozy-ore="'+t+'" data-ore-name="'+NM[t]+'"':'';}
function cozyOreStyle(t){return expandedGameEnabled()?"--cozy-ore-art:url('"+cozyItemURL('ore-'+t)+"');":'';}
function cozyOreMarkup(t,b=0,fill=false){return '<div class="'+(b?'t o':'q')+' cozy-ore"'+cozyOreAttributes(t)+' style="background-color:'+C[t]+';'+cozyOreStyle(t)+(fill?'width:100%;height:100%;':'')+'">'+NM[t]+'</div>';}
function cozyPreparedSVG(item){
 const badge=kitchenProcessArt(item.s).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,''),palette=kitchenTierPalette(item.t),detail=item.t>0?'<path fill="'+palette.rim+'" d="M8 39h5v2H8z"/>'+(item.t>=2?'<path fill="'+palette.light+'" d="M51 11h2v5h-2zM49 13h6v1h-6z"/>':''):'';
 return '<svg viewBox="0 0 64 64" shape-rendering="crispEdges" role="img" aria-label="'+kitchenItemName(item)+'，砧板上的'+KITCHEN_PROCESS[item.s]+'備料" data-cozy-prepared="'+item.s+'" data-prep-board="true" data-prepared-grade="'+item.t+'"><image href="'+PREP_BOARD_ART[item.s]+'" x="1" y="10" width="62" height="44" preserveAspectRatio="xMidYMid meet" style="image-rendering:pixelated"/>'+detail+kitchenTierMark(item.t)+'<g data-prep-badge="'+item.s+'" transform="translate(43 43) scale(.3125)">'+badge+'</g></svg>';
}
function cozyDecorKey(id,si){if(id==='tree'||id==='lamp')return 'decor-'+id+'-'+si;if(id==='flowers'&&si>=2)return 'decor-flowers-'+si;return 'decor-'+id;}
function cozyDecorSVG(id,season=seasonIndex(),uid='preview'){
 const d=DECOR_BY_ID.get(id),key=cozyDecorKey(id,season);if(!d||!COZY_ITEM_ART[key])return preview_decorSVG(id,season,uid);
 const lamp=d.night||/lamp|lantern|candle|garland/.test(d.art),fountain=d.art==='fountain',w=d.w,h=d.h,glow=season===3?'#c7ebff':season===0?'#f5d5b0':'#ffd18c',name='cozy-glow-'+String(uid).replace(/[^a-zA-Z0-9_-]/g,'');
 const halo=lamp?'<defs><radialGradient id="'+name+'"><stop stop-color="'+glow+'" stop-opacity=".35"/><stop offset="1" stop-color="'+glow+'" stop-opacity="0"/></radialGradient></defs><ellipse class="cozy-decor-halo" cx="'+w*.5+'" cy="'+h*.32+'" rx="'+w*.46+'" ry="'+h*.3+'" fill="url(#'+name+')"/>':'';
 const water=fountain?'<g class="cozy-fountain-water"><ellipse cx="'+w*.5+'" cy="'+h*.7+'" rx="'+w*.23+'" ry="'+h*.055+'" fill="none" stroke="#bbf5ed" stroke-width=".9"/><path fill="#e4fffa" d="M'+w*.38+' '+h*.54+'h1v3h-1zM'+w*.64+' '+h*.53+'h1v3h-1z"/></g>':'';
 const pet=['cat','dog'].includes(id);return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" data-cozy-decor="'+id+'" aria-hidden="true">'+halo+(pet?'<g class="pet-facing" data-facing="left">':'')+'<g'+(['cat','dog'].includes(id)?' class="pet-body"':'')+'><image href="'+cozyItemURL(key)+'" width="'+w+'" height="'+h+'" preserveAspectRatio="xMidYMax meet" style="image-rendering:pixelated"/></g>'+(pet?'</g>':'')+water+'</svg>';
}
const cozyItemSnapshotAssets=new Map(),cozyItemSnapshotRequests=new Map();
async function prepareCozyItemSnapshot(items,si){
 const keys=[...new Set(items.map(i=>cozyDecorKey(i.id,si)).filter(k=>COZY_ITEM_ART[k]))],epoch=sandboxEpoch;
 await Promise.all(keys.map(async key=>{const src=COZY_ITEM_ART[key];if(src.startsWith('data:')||cozyItemSnapshotAssets.has(key))return;const token=epoch+':'+key;if(cozyItemSnapshotRequests.has(token))return cozyItemSnapshotRequests.get(token);
  const job=(async()=>{const response=await fetch(src);if(!response.ok)throw new Error('Decoration art unavailable');const blob=await response.blob(),data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Decoration art unreadable'));reader.readAsDataURL(blob);});if(expandedGameEnabled()&&sandboxEpoch===epoch)cozyItemSnapshotAssets.set(key,data);})();
  cozyItemSnapshotRequests.set(token,job);try{await job;}finally{cozyItemSnapshotRequests.delete(token);}
 }));
}