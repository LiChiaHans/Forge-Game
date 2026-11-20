
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
function cozyDecorKey(id,si){id=DECOR_BY_ID.get(id)?.sourceId||id;if(id==='tree'||id==='lamp')return 'decor-'+id+'-'+si;if(id==='flowers'&&si>=2)return 'decor-flowers-'+si;return 'decor-'+id;}
function decorIsLighted(d){return !!d&&(!!d.lighted||/lamp|lantern|candle|garland/.test(d.art));}
function decorGlowSpec(d,season){
 const map={
  'night-jar':{c:'#d6f078',core:'#fffbd6',cx:.5,cy:.45,rx:.82,ry:.66,g:.92},
  'night-flower':{c:'#f5a6c8',core:'#ffedf5',cx:.5,cy:.34,rx:.84,ry:.62,g:.92},
  'night-garden':{c:'#cbbaf5',core:'#f5efff',cx:.5,cy:.48,rx:.9,ry:.68,g:.86},
  'night-jelly':{c:'#68dff0',core:'#e2fbff',cx:.5,cy:.38,rx:.86,ry:.66,g:.92},
  'night-garland':{c:season===3?'#a8dcfa':'#8ae8e0',core:'#edfaff',cx:.5,cy:.48,rx:.94,ry:.62,g:.88},
  'night-star':{c:'#f7d872',core:'#fff8d6',cx:.5,cy:.3,rx:.84,ry:.6,g:.92},
  'night-pumpkin':{c:'#f28c32',core:'#ffe699',cx:.5,cy:.56,rx:.88,ry:.68,g:.88},
  'night-lantern':{c:'#f5a242',core:'#ffecc0',cx:.5,cy:.38,rx:.86,ry:.64,g:.92},
  'night-candle':{c:'#f5c25b',core:'#fff3c9',cx:.5,cy:.36,rx:.86,ry:.64,g:.9},
  'night-crystal':{c:'#82d9f7',core:'#e8faff',cx:.5,cy:.44,rx:.86,ry:.66,g:.9},
  'night-aurora':{c:'#76ebd2',core:'#e2fff8',cx:.5,cy:.44,rx:.92,ry:.68,g:.88},
  lamp:{c:'#f5be60',core:'#fff0bd',cx:.5,cy:.27,rx:.88,ry:.58,g:.93},
  blossomlamp:{c:'#f5aec8',core:'#ffecf3',cx:.5,cy:.27,rx:.88,ry:.58,g:.93},
  sunlamp:{c:'#f5be52',core:'#fff2be',cx:.5,cy:.25,rx:.88,ry:.58,g:.93},
  amberlamp:{c:'#f29c3d',core:'#ffe9b3',cx:.5,cy:.27,rx:.88,ry:.58,g:.93},
  starlamp:{c:'#f5db82',core:'#eef8ff',cx:.5,cy:.25,rx:.88,ry:.58,g:.93}
 };
 return map[d.art]||{c:season===3?'#a8dcfa':season===0?'#f0c99e':'#f5c072',core:'#fff2c8',cx:.5,cy:.36,rx:.84,ry:.6,g:.92};
}
function cozyDecorSVG(id,season=seasonIndex(),uid='preview'){
 const d=DECOR_BY_ID.get(id),key=cozyDecorKey(id,season);if(!d||!COZY_ITEM_ART[key])return fallbackDecorSVG(id,season,uid);
 const lamp=decorIsLighted(d),nightGlow=!!d.night&&lamp,fountain=d.art==='fountain',w=d.w,h=d.h;
 const spec=lamp?decorGlowSpec(d,season):null,name='cozy-glow-'+String(id+'-'+uid).replace(/[^a-zA-Z0-9_-]/g,'');
 let defs='',halo='',bloom='',bodyFilter='';
 if(lamp){
  const cx=(w*spec.cx).toFixed(1),cy=(h*spec.cy).toFixed(1);
  if(nightGlow){
   const shade=d.lighted?'.84 0 0 0 .01 0 .85 0 0 .015 0 0 .93 0 .03 0 0 0 1 0':'.64 0 0 0 .015 0 .68 0 0 .02 0 0 .82 0 .045 0 0 0 1 0';
   defs='<defs>'
    +'<radialGradient id="'+name+'"><stop offset="0%" stop-color="'+spec.core+'" stop-opacity=".42"/><stop offset="22%" stop-color="'+spec.c+'" stop-opacity=".25"/><stop offset="48%" stop-color="'+spec.c+'" stop-opacity=".11"/><stop offset="74%" stop-color="'+spec.c+'" stop-opacity=".03"/><stop offset="100%" stop-color="'+spec.c+'" stop-opacity="0"/></radialGradient>'
    +'<radialGradient id="'+name+'-g"><stop offset="0%" stop-color="'+spec.c+'" stop-opacity=".24"/><stop offset="45%" stop-color="'+spec.c+'" stop-opacity=".09"/><stop offset="100%" stop-color="'+spec.c+'" stop-opacity="0"/></radialGradient>'
    +'<radialGradient id="'+name+'-b"><stop offset="0%" stop-color="'+spec.core+'" stop-opacity=".46"/><stop offset="42%" stop-color="'+spec.c+'" stop-opacity=".16"/><stop offset="100%" stop-color="'+spec.c+'" stop-opacity="0"/></radialGradient>'
    +'<filter id="'+name+'-t" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="'+shade+'"/></filter>'
    +'</defs>';
   halo='<ellipse class="cozy-decor-ground" cx="'+(w*.5).toFixed(1)+'" cy="'+(h*spec.g).toFixed(1)+'" rx="'+(w*1.02).toFixed(1)+'" ry="'+(h*.22).toFixed(1)+'" fill="url(#'+name+'-g)"/>'
    +'<ellipse class="cozy-decor-halo is-night" cx="'+cx+'" cy="'+cy+'" rx="'+(w*spec.rx).toFixed(1)+'" ry="'+(h*spec.ry).toFixed(1)+'" fill="url(#'+name+')"/>';
   bloom='<ellipse class="cozy-decor-bloom" cx="'+cx+'" cy="'+cy+'" rx="'+(w*.32).toFixed(1)+'" ry="'+(h*.24).toFixed(1)+'" fill="url(#'+name+'-b)"/>';
   bodyFilter=' filter="url(#'+name+'-t)"';
  }else{
   defs='<defs><radialGradient id="'+name+'"><stop stop-color="'+spec.c+'" stop-opacity=".32"/><stop offset="1" stop-color="'+spec.c+'" stop-opacity="0"/></radialGradient></defs>';
   halo='<ellipse class="cozy-decor-halo" cx="'+cx+'" cy="'+cy+'" rx="'+(w*.46).toFixed(1)+'" ry="'+(h*.3).toFixed(1)+'" fill="url(#'+name+')"/>';
  }
 }
 const water=fountain?'<g class="cozy-fountain-water"><ellipse cx="'+w*.5+'" cy="'+h*.7+'" rx="'+w*.23+'" ry="'+h*.055+'" fill="none" stroke="#bbf5ed" stroke-width=".9"/><path fill="#e4fffa" d="M'+w*.38+' '+h*.54+'h1v3h-1zM'+w*.64+' '+h*.53+'h1v3h-1z"/></g>':'';
 const pet=['cat','dog'].includes(d.art);
 const glowAttr=nightGlow?' data-night-glow="true" style="--decor-glow:'+spec.c+'"':'';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" data-cozy-decor="'+id+'"'+glowAttr+' aria-hidden="true">'+defs+halo+(pet?'<g class="pet-facing" data-facing="left">':'')+'<g'+(pet?' class="pet-body"':'')+bodyFilter+'><image href="'+cozyItemURL(key)+'" width="'+w+'" height="'+h+'" preserveAspectRatio="xMidYMax meet" style="image-rendering:pixelated;"/></g>'+(pet?'</g>':'')+bloom+water+'</svg>';
}
const cozyItemSnapshotAssets=new Map(),cozyItemSnapshotRequests=new Map();
async function prepareCozyItemSnapshot(items,si){
 const keys=[...new Set(items.map(i=>cozyDecorKey(i.id,si)).filter(k=>COZY_ITEM_ART[k]))],epoch=sandboxEpoch;
 await Promise.all(keys.map(async key=>{const src=COZY_ITEM_ART[key];if(src.startsWith('data:')||cozyItemSnapshotAssets.has(key))return;const token=epoch+':'+key;if(cozyItemSnapshotRequests.has(token))return cozyItemSnapshotRequests.get(token);
  const job=(async()=>{const response=await fetch(src);if(!response.ok)throw new Error('Decoration art unavailable');const blob=await response.blob(),data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Decoration art unreadable'));reader.readAsDataURL(blob);});if(expandedGameEnabled()&&sandboxEpoch===epoch)cozyItemSnapshotAssets.set(key,data);})();
  cozyItemSnapshotRequests.set(token,job);try{await job;}finally{cozyItemSnapshotRequests.delete(token);}
 }));
}