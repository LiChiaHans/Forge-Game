
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
  'night-jar':{c:'#e8ff82',core:'#fffce0',cx:.5,cy:.44,rx:.78,ry:.64},
  'night-flower':{c:'#ffb6d6',core:'#fff0f7',cx:.5,cy:.34,rx:.78,ry:.6},
  'night-garden':{c:'#dfd0ff',core:'#f9f4ff',cx:.5,cy:.44,rx:.84,ry:.68},
  'night-jelly':{c:'#74f2ff',core:'#e8ffff',cx:.5,cy:.38,rx:.82,ry:.64},
  'night-garland':{c:season===3?'#bfeaff':'#9ef6ee',core:'#f4ffff',cx:.5,cy:.46,rx:.88,ry:.64},
  'night-star':{c:'#ffe682',core:'#fffbe0',cx:.5,cy:.3,rx:.8,ry:.58},
  'night-pumpkin':{c:'#ff9c3b',core:'#fff0a8',cx:.5,cy:.55,rx:.82,ry:.66},
  'night-lantern':{c:'#ffb34d',core:'#fff2c2',cx:.5,cy:.4,rx:.8,ry:.62},
  'night-candle':{c:'#ffd26a',core:'#fff8d6',cx:.5,cy:.36,rx:.8,ry:.62},
  'night-crystal':{c:'#96e8ff',core:'#eefcff',cx:.5,cy:.42,rx:.82,ry:.64},
  'night-aurora':{c:'#84fae0',core:'#ebfff9',cx:.5,cy:.42,rx:.86,ry:.66},
  lamp:{c:'#ffd170',core:'#fff6cc',cx:.5,cy:.28,rx:.84,ry:.56},
  blossomlamp:{c:'#ffc0d8',core:'#fff2f7',cx:.5,cy:.28,rx:.84,ry:.56},
  sunlamp:{c:'#ffcf60',core:'#fff7cc',cx:.5,cy:.26,rx:.84,ry:.56},
  amberlamp:{c:'#ffac48',core:'#fff0c2',cx:.5,cy:.28,rx:.84,ry:.56},
  starlamp:{c:'#ffe896',core:'#f2faff',cx:.5,cy:.26,rx:.84,ry:.56}
 };
 return map[d.art]||{c:season===3?'#bfeaff':season===0?'#f5d5b0':'#ffd18c',core:'#fff7d4',cx:.5,cy:.36,rx:.78,ry:.58};
}
function cozyDecorSVG(id,season=seasonIndex(),uid='preview'){
 const d=DECOR_BY_ID.get(id),key=cozyDecorKey(id,season);if(!d||!COZY_ITEM_ART[key])return fallbackDecorSVG(id,season,uid);
 const lamp=decorIsLighted(d),nightGlow=!!d.night&&lamp,fountain=d.art==='fountain',w=d.w,h=d.h;
 const spec=lamp?decorGlowSpec(d,season):null,name='cozy-glow-'+String(id+'-'+uid).replace(/[^a-zA-Z0-9_-]/g,'');
 let halo='',bloom='';
 if(lamp){
  const cx=(w*spec.cx).toFixed(1),cy=(h*spec.cy).toFixed(1);
  if(nightGlow){
   halo='<defs><radialGradient id="'+name+'"><stop offset="0%" stop-color="'+spec.core+'" stop-opacity=".92"/><stop offset="34%" stop-color="'+spec.c+'" stop-opacity=".68"/><stop offset="68%" stop-color="'+spec.c+'" stop-opacity=".26"/><stop offset="100%" stop-color="'+spec.c+'" stop-opacity="0"/></radialGradient><radialGradient id="'+name+'-b"><stop offset="0%" stop-color="'+spec.core+'" stop-opacity=".52"/><stop offset="48%" stop-color="'+spec.c+'" stop-opacity=".24"/><stop offset="100%" stop-color="'+spec.c+'" stop-opacity="0"/></radialGradient></defs><ellipse class="cozy-decor-halo is-night" cx="'+cx+'" cy="'+cy+'" rx="'+(w*spec.rx).toFixed(1)+'" ry="'+(h*spec.ry).toFixed(1)+'" fill="url(#'+name+')"/>';
   bloom='<ellipse class="cozy-decor-bloom" cx="'+cx+'" cy="'+cy+'" rx="'+(w*spec.rx*.62).toFixed(1)+'" ry="'+(h*spec.ry*.62).toFixed(1)+'" fill="url(#'+name+'-b)"/>';
  }else{
   halo='<defs><radialGradient id="'+name+'"><stop stop-color="'+spec.c+'" stop-opacity=".35"/><stop offset="1" stop-color="'+spec.c+'" stop-opacity="0"/></radialGradient></defs><ellipse class="cozy-decor-halo" cx="'+cx+'" cy="'+cy+'" rx="'+(w*.46).toFixed(1)+'" ry="'+(h*.3).toFixed(1)+'" fill="url(#'+name+')"/>';
  }
 }
 const water=fountain?'<g class="cozy-fountain-water"><ellipse cx="'+w*.5+'" cy="'+h*.7+'" rx="'+w*.23+'" ry="'+h*.055+'" fill="none" stroke="#bbf5ed" stroke-width=".9"/><path fill="#e4fffa" d="M'+w*.38+' '+h*.54+'h1v3h-1zM'+w*.64+' '+h*.53+'h1v3h-1z"/></g>':'';
 const pet=['cat','dog'].includes(d.art);
 const glowAttr=nightGlow?' data-night-glow="true" style="--decor-glow:'+spec.c+'"':'';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" data-cozy-decor="'+id+'"'+glowAttr+' aria-hidden="true">'+halo+(pet?'<g class="pet-facing" data-facing="left">':'')+'<g'+(pet?' class="pet-body"':'')+'><image href="'+cozyItemURL(key)+'" width="'+w+'" height="'+h+'" preserveAspectRatio="xMidYMax meet" style="image-rendering:pixelated;"/></g>'+(pet?'</g>':'')+bloom+water+'</svg>';
}
const cozyItemSnapshotAssets=new Map(),cozyItemSnapshotRequests=new Map();
async function prepareCozyItemSnapshot(items,si){
 const keys=[...new Set(items.map(i=>cozyDecorKey(i.id,si)).filter(k=>COZY_ITEM_ART[k]))],epoch=sandboxEpoch;
 await Promise.all(keys.map(async key=>{const src=COZY_ITEM_ART[key];if(src.startsWith('data:')||cozyItemSnapshotAssets.has(key))return;const token=epoch+':'+key;if(cozyItemSnapshotRequests.has(token))return cozyItemSnapshotRequests.get(token);
  const job=(async()=>{const response=await fetch(src);if(!response.ok)throw new Error('Decoration art unavailable');const blob=await response.blob(),data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Decoration art unreadable'));reader.readAsDataURL(blob);});if(expandedGameEnabled()&&sandboxEpoch===epoch)cozyItemSnapshotAssets.set(key,data);})();
  cozyItemSnapshotRequests.set(token,job);try{await job;}finally{cozyItemSnapshotRequests.delete(token);}
 }));
}