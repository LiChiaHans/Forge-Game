
const GEMINI_TOWN_ART=["assets/town/0.a20b5ac9ee46.jpg","assets/town/1.ada009ad48ab.jpg","assets/town/2.5cd7840d6b3e.jpg","assets/town/3.5c7363e81561.jpg","assets/town/4.fbb597b8d879.jpg","assets/town/5.3d4a1bbfd1fe.jpg","assets/town/6.71b68468ba4f.jpg","assets/town/7.c957c51c346a.jpg"];
const TOWN_BUILDING_ART={"expedition_0":"assets/town/b_expedition_0.0506bf97d57f.png","expedition_1":"assets/town/b_expedition_1.1d76412b13af.png","expedition_2":"assets/town/b_expedition_2.619f50daa4a4.png","expedition_3":"assets/town/b_expedition_3.833260a81b16.png","archive_0":"assets/town/b_archive_0.ced4022f3724.png","archive_1":"assets/town/b_archive_1.f004bf8faca1.png","archive_2":"assets/town/b_archive_2.e56de9a4ddd8.png","archive_3":"assets/town/b_archive_3.bb2941135828.png","kitchen_0":"assets/town/b_kitchen_0.efae53c5535b.png","kitchen_1":"assets/town/b_kitchen_1.a048ca744953.png","kitchen_2":"assets/town/b_kitchen_2.1a3bb640f7fc.png","kitchen_3":"assets/town/b_kitchen_3.7a4593f6f93b.png","greenhouse_0":"assets/town/b_greenhouse_0.d71ef7739fc4.png","greenhouse_1":"assets/town/b_greenhouse_1.a6ccdd27c41e.png","greenhouse_2":"assets/town/b_greenhouse_2.4a0b5cdf802a.png","greenhouse_3":"assets/town/b_greenhouse_3.4e8b3aa5c536.png","forge_0":"assets/town/b_forge_0.17c93ade9991.png","forge_1":"assets/town/b_forge_1.51dbc438b671.png","forge_2":"assets/town/b_forge_2.28077a8ef05c.png","forge_3":"assets/town/b_forge_3.2bd2399c49ab.png","decor_0":"assets/town/b_decor_0.ebe59411ec00.png","decor_1":"assets/town/b_decor_1.52b36564d6b8.png","decor_2":"assets/town/b_decor_2.ee1f9262d133.png","decor_3":"assets/town/b_decor_3.c83e66da4d68.png","training_0":"assets/town/b_training_0.2fe7302370ca.png","training_1":"assets/town/b_training_1.0be1ae0010fb.png","training_2":"assets/town/b_training_2.271911a3e6e4.png","training_3":"assets/town/b_training_3.99c236c2a24b.png","fountain_0":"assets/town/b_fountain_0.e421f94af38d.png","fountain_1":"assets/town/b_fountain_1.a5d7f2dc4044.png","fountain_2":"assets/town/b_fountain_2.cab35cd29645.png","fountain_3":"assets/town/b_fountain_3.e299c7e0b49a.png"};
const GEMINI_TOWN_BUILDINGS=[
 {id:'townExpedition',kind:'expedition',name:'遠征城堡',label:'遠征城堡，挑戰怪物',box:[.005,.02,.455,.238],sign:[.13,.66,.70,.17],angle:-2},
 {id:'townArchive',kind:'archive',name:'星頁圖鑑館',label:'星頁圖鑑館，查看武器收藏',box:[0,.246,.415,.214],sign:[.14,.64,.78,.19],angle:-5},
 {id:'townKitchen',kind:'kitchen',name:'暖爐餐廳',label:'暖爐餐廳，晚間料理營業',box:[.58,.09,.42,.248],sign:[.07,.65,.82,.16],angle:5},
 {id:'townGreenhouse',kind:'greenhouse',name:'晨露溫室',label:'晨露溫室，種植與收成',box:[.005,.464,.398,.20],sign:[.08,.62,.84,.20],angle:5},
 {id:'townForge',kind:'forge',name:'鐵火冶煉廠',label:'鐵火冶煉廠，進入鍛造棋盤',box:[.58,.466,.42,.218],sign:[.08,.62,.82,.19],angle:-5},
 {id:'townDecorShop',kind:'decor',name:'彩匠裝飾行',label:'彩匠裝飾行，購買城鎮裝飾',box:[0,.68,.412,.226],sign:[.06,.62,.88,.18],angle:-5},
 {id:'townTraining',kind:'training',name:'星盾訓練所',label:'星盾訓練所，提升技能',box:[.582,.69,.418,.226],sign:[.12,.64,.82,.17],angle:5}
];
const GEMINI_FOUNTAIN_BOX=[.386,.390,.228,.124];
function townBuildingSpriteUrl(kind,tier=0){
 const lv=Math.max(0,Math.min(3,Math.floor(Number(tier)||0)));
 return TOWN_BUILDING_ART[kind+'_'+lv]||TOWN_BUILDING_ART[kind+'_0']||'';
}
function geminiTownSignArt(kind,name,tier=0){
 const colors={expedition:['#343e53','#8297ae','#d7c68c'],archive:['#42384e','#967d9f','#ead8a4'],kitchen:['#734332','#c48b55','#ffe0a0'],greenhouse:['#28564b','#6b9b73','#e8dd9c'],forge:['#333e45','#899ca0','#e9bd72'],decor:['#5b425e','#aa87a3','#f4dba4'],training:['#2e4b63','#799fb8','#edd080']};
 let [wood,rim,gold]=colors[kind];
 if(tier===1){rim='#b9c9d4';gold='#ffe49c';}
 else if(tier===2){rim='#deb34e';gold='#fff0b5';}
 else if(tier>=3){rim='#f2c757';gold='#fff7cf';}
 const icons={expedition:'<path stroke="#e8e5ce" stroke-width="3" d="M20 14l19 21M38 14L20 35"/><path stroke="#e0ad56" stroke-width="3" d="M17 28l9-7M32 29l9-7"/>',archive:'<path fill="#f1e3b5" d="M17 15l11 3v20l-11-4zM30 18l12-3v19l-12 4z"/><path stroke="#9c8153" d="M20 20l6 2M20 25l6 2M32 22l7-2M32 27l7-2"/>',kitchen:'<path stroke="#f4dfad" stroke-width="3" d="M21 13v25M17 13v10h8V13M36 26v12"/><ellipse fill="#f4dfad" cx="36" cy="19" rx="5" ry="8"/>',greenhouse:'<path stroke="#d8d799" stroke-width="3" d="M29 38V21l-8-5M29 28l9-9"/><path fill="#98be79" d="M15 13h9v10h-9zM32 13h12v10H32z"/><path fill="#d4df96" d="M18 14h3v7h-3zM35 14h4v7h-4z"/>',forge:'<path fill="#b3c2bd" d="M16 17h26v8H16zM23 25h12v6H23zM20 31h18v6H20z"/><path fill="#f2c982" d="M16 17h26v3H16z"/>',decor:'<path fill="#e9c590" d="M16 14h25v22H16z"/><path fill="#b26878" d="M19 17h8v7h-8z"/><path fill="#71a58c" d="M30 17h8v7h-8z"/><path fill="#7c9cc1" d="M19 27h8v6h-8z"/><path fill="#e0b557" d="M30 27h8v6h-8z"/>',training:'<path fill="#7796af" stroke="#e8cd83" stroke-width="2" d="M17 13h24v18l-12 9-12-9z"/><path fill="#f5d978" d="M27 17h4v5h6l-4 5 2 6-6-4-5 4 1-6-4-5h6z"/>'};
 const innerTrim=tier>=3?'<path fill="#9c2934" d="M12 12h156v3H12zM12 36h156v3H12z"/><path fill="'+gold+'" d="M12 15h156v1H12zM12 35h156v1H12z"/>':tier===2?'<path fill="'+gold+'" opacity=".65" d="M12 12h156v2H12zM12 37h156v2H12z"/>':'';
 const stars=tier>0?'<rect x="'+(169-tier*11)+'" y="2" width="'+(tier*11+4)+'" height="12" fill="#222a2e" rx="2"/><text x="169" y="11.5" text-anchor="end" font-size="10" font-weight="900" fill="'+gold+'">'+('★'.repeat(Math.min(3,tier)))+'</text>':'';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50" aria-hidden="true" shape-rendering="crispEdges" data-sign-kind="'+kind+'" data-sign-tier="'+tier+'"><path fill="#20292b" d="M8 2h164v5h6v36h-6v5H8v-5H2V7h6z"/><path fill="'+rim+'" d="M9 5h162v5h4v30h-4v5H9v-5H5V10h4z"/><path fill="'+gold+'" d="M11 7h158v3H11zM8 11h3v27H8z"/><path fill="'+wood+'" d="M12 12h156v27H12z"/>'+innerTrim+'<path stroke="'+rim+'" opacity=".4" d="M51 17h110M51 34h110"/><path fill="#1d303b" d="M15 11h29v29H15z"/>'+icons[kind]+'<path fill="'+gold+'" d="M9 10h3v3H9zM168 10h3v3h-3zM9 37h3v3H9zM168 37h3v3h-3z"/><text x="106" y="33" text-anchor="middle" font-size="'+(name.length>4?20:22)+'" font-weight="900" font-family="Noto Sans TC,Microsoft JhengHei,sans-serif" fill="#fff0c8" stroke="#20282a" stroke-width="1.5" paint-order="stroke">'+name+'</text>'+stars+'</svg>';
}
function geminiTownNightArt(){
 const lamps=[[.711,.31],[.581,.868],[.425,.919]];
 return '<svg viewBox="0 0 572 1024" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="geminiTownNightFilter" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="'+TOWN_NIGHT_COLOR_MATRIX+'"/></filter><radialGradient id="gemini-lamp"><stop stop-color="#ffdf9a" stop-opacity=".68"/><stop offset=".3" stop-color="#ffbe60" stop-opacity=".24"/><stop offset="1" stop-color="#f6af53" stop-opacity="0"/></radialGradient></defs>'+lamps.map(([x,y],i)=>'<ellipse class="gemini-lamp-light" style="animation-delay:-'+i+'s" fill="url(#gemini-lamp)" cx="'+x*572+'" cy="'+y*1024+'" rx="22" ry="34"/>').join('')+'</svg>';
}
function geminiFountainFXHTML(tier){
 const spr='<img class="gemini-fountain-sprite" data-fountain-lv="'+tier+'" src="'+townBuildingSpriteUrl('fountain',tier)+'" alt="" decoding="async">';
 const ripples=tier>=1?'<span class="f-ripple"></span><span class="f-ripple f-ripple-2"></span>':'';
 const jets=tier>=2?'<span class="f-jet f-jet-l"></span><span class="f-jet f-jet-r"></span>':'';
 const stars=tier>=3?'<span class="f-halo"></span><span class="f-star f-s1">✦</span><span class="f-star f-s2">✦</span><span class="f-star f-s3">✦</span><span class="f-star f-s4">✦</span>':'';
 return spr+'<div class="gemini-fountain-water" data-fountain-tier="'+tier+'" aria-hidden="true">'+ripples+jets+'<i></i><i></i><i></i>'+(tier>=1?'<i></i><i></i>':'')+stars+'</div>';
}
function geminiTownEffects(){
 return '<div class="gemini-sea-shimmer" aria-hidden="true"></div><div class="gemini-night-lights">'+geminiTownNightArt()+'</div><div class="gemini-fountain-stage" data-fountain-tier="0" aria-hidden="true">'+geminiFountainFXHTML(0)+'</div><div class="gemini-chimney-smoke" aria-hidden="true"><i></i><i></i><i></i></div><i class="gemini-forge-fire" aria-hidden="true"></i>';
}
function renderGeminiTown(){
 if(!expandedGameEnabled())return;const si=townVisualSeason(),night=isSandboxNight(),p=$('townP'),image=$('geminiTownImage');p.dataset.geminiTown='true';
 const mapIdx=si+(night?4:0),key=String(mapIdx);
 if(image.dataset.art!==key){image.src=GEMINI_TOWN_ART[mapIdx]||GEMINI_TOWN_ART[si];image.dataset.art=key;image.alt=SEASONS[si].name+(night?'夜晚':'白天')+'鍛造小鎮';}
 $('geminiTownScene').dataset.season=SEASONS[si].id;$('geminiTownScene').dataset.time=night?'night':'day';
 const rear=$('townDecorBack');if(rear.dataset.geminiMask){rear.style.maskImage='';rear.dataset.geminiMask='';}
 if(!$('geminiTownEffects').dataset.built){$('geminiTownEffects').innerHTML=geminiTownEffects();$('geminiTownEffects').dataset.built='1';}
 const fTier=typeof buildingLandmarkTier==='function'?buildingLandmarkTier('fountain'):0,fStage=$('geminiTownEffects').querySelector?.('.gemini-fountain-stage');
 if(fStage&&fStage.dataset.fountainTier!==String(fTier)){fStage.dataset.fountainTier=String(fTier);fStage.innerHTML=geminiFountainFXHTML(fTier);}
 GEMINI_TOWN_BUILDINGS.forEach(b=>{const el=$(b.id),[x,y,w,h]=b.box,tier=typeof buildingLandmarkTier==='function'?buildingLandmarkTier(b.kind):0,tierKey=String(tier),sprUrl=townBuildingSpriteUrl(b.kind,tier);
  el.style.left=x*100+'%';el.style.top=y*100+'%';el.style.width=w*100+'%';el.style.height=h*100+'%';el.setAttribute('aria-label',b.label+(tier?'（建築階級 Lv '+tier+'）':''));el.title=b.name+(tier?' · Lv '+tier:'');el.dataset.landmarkTier=tierKey;
  let sprEl=el.querySelector?.('.gemini-building-sprite');
  if(!sprEl&&typeof document.createElement==='function'){sprEl=document.createElement('img');sprEl.className='gemini-building-sprite';sprEl.alt='';sprEl.setAttribute('aria-hidden','true');sprEl.decoding='async';el.prepend?el.prepend(sprEl):el.appendChild(sprEl);}
  if(sprEl&&sprEl.dataset.spriteKey!==b.kind+'_'+tierKey){sprEl.dataset.spriteKey=b.kind+'_'+tierKey;sprEl.src=sprUrl;}
  const [sx,sy,sw,sh]=b.sign,signEl=el.querySelector?.('.gemini-building-sign');
  if(!signEl){el.innerHTML+='<span class="gemini-building-sign" data-gemini-sign="true" data-sign-tier="'+tierKey+'" style="left:'+sx*100+'%;top:'+sy*100+'%;width:'+sw*100+'%;height:'+sh*100+'%;--sign-angle:'+b.angle+'deg">'+geminiTownSignArt(b.kind,b.name,tier)+'</span>';}
  else if(signEl.dataset.signTier!==tierKey){signEl.dataset.signTier=tierKey;signEl.innerHTML=geminiTownSignArt(b.kind,b.name,tier);}
 });
}
function clearGeminiTown(){
 $('townP').dataset.geminiTown='false';geminiSnapshotAssets.clear();const rear=$('townDecorBack');rear.style.maskImage='';rear.dataset.geminiMask='';GEMINI_TOWN_BUILDINGS.forEach(b=>{const el=$(b.id);for(const key of ['left','top','width','height'])el.style[key]='';el.title='';el.dataset.landmarkTier='0';el.querySelector?.('.gemini-building-sprite')?.remove();});
}
function geminiTownGuestPoint(i,night){
 // Coordinates mark the visitor's feet, stepped back cleanly from the Forge & Kitchen doorways.
 const line=night?[[255,207],[242,218],[230,230],[220,243],[215,258],[222,274],[234,289],[238,304]]:[[253,407],[238,412],[223,418],[209,426],[196,438],[187,452],[182,468],[179,484]];
 return line[i]||[177,Math.min(600,514+(i-line.length)*18)];
}
function geminiTownGuestRoute(i,night){const line=Array.from({length:Math.max(8,i+1)},(_,j)=>geminiTownGuestPoint(j,night));return [[177,650],[177,500],...(night?[[177,362],[218,335],[235,313]]:[]),...line.slice(i).reverse()];}
function townBackgroundFountainBlocked(x,y){return expandedGameEnabled()&&((x-180)/44)**2+((y-293)/36)**2<=1;}
function geminiTownSnapshot(items,si,savedHeight){
 const rect=$('townMap').getBoundingClientRect(),H=Number.isFinite(savedHeight)&&savedHeight>=360&&savedHeight<=1000?savedHeight:rect.width>100&&rect.height>200?Math.max(360,Math.min(1000,360*rect.height/rect.width)):620,night=isSandboxNight(),mapIdx=si+(night?4:0);
 let out='<image href="'+(geminiSnapshotAssets.get('map_'+mapIdx)||GEMINI_TOWN_ART[mapIdx]||GEMINI_TOWN_ART[si])+'" width="360" height="'+H+'" preserveAspectRatio="none"/>';
 const decor=z=>items.filter(i=>i.z===z).slice().sort((a,b)=>a.y-b.y).map((i,k)=>{const d=DECOR_BY_ID.get(i.id);return !d?'':'<g transform="translate('+i.x*3.6+' '+i.y*H/100+') rotate('+i.r+') scale('+(i.fx?-i.s:i.s)+' '+(i.fy?-i.s:i.s)+')">'+snapshotNestedSVG(kitchenSnapshotDecorSVG(decorSVG(i.id,si,'gemini-snapshot-'+z+'-'+k),d),-d.w/2,-d.h,d.w,d.h)+'</g>';}).join('');
 out+='<g>'+decor(0)+'</g>';
 const fTier=typeof buildingLandmarkTier==='function'?buildingLandmarkTier('fountain'):0;
 {const [fx,fy,fw,fh]=GEMINI_FOUNTAIN_BOX,fHref=geminiSnapshotAssets.get('b_fountain_'+fTier)||townBuildingSpriteUrl('fountain',fTier);if(fHref)out+='<image href="'+fHref+'" x="'+fx*360+'" y="'+fy*H+'" width="'+fw*360+'" height="'+fh*H+'" preserveAspectRatio="'+(fTier===0?'xMidYMid meet':'xMidYMax meet')+'"'+(night?' filter="url(#gemini-snapshot-building-night)"':'')+'/>';}
 for(const b of GEMINI_TOWN_BUILDINGS){
  const [x,y,w,h]=b.box,[sx,sy,sw,sh]=b.sign,tier=typeof buildingLandmarkTier==='function'?buildingLandmarkTier(b.kind):0,sKey=b.kind+'_'+tier,href=geminiSnapshotAssets.get('b_'+sKey)||townBuildingSpriteUrl(b.kind,tier);
  if(href)out+='<image href="'+href+'" x="'+x*360+'" y="'+y*H+'" width="'+w*360+'" height="'+h*H+'" preserveAspectRatio="xMidYMax meet"'+(night?' filter="url(#gemini-snapshot-building-night)"':'')+'/>';
  out+=snapshotNestedSVG(geminiTownSignArt(b.kind,b.name,tier),(x+w*sx)*360,(y+h*sy)*H,w*sw*360,h*sh*H);
 }
 out+=decor(1);
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 '+H+'" width="360" height="'+H+'"><defs><filter id="gemini-snapshot-building-night" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.78 0 0 0 0 0 0.80 0 0 0 0 0 0.88 0 0.03 0 0 0 1 0"/></filter></defs>'+out+'</svg>';
}
const geminiSnapshotAssets=new Map(),geminiSnapshotRequests=new Map();
async function cacheSnapshotUrl(cacheKey,url){
 if(!url||url.startsWith('data:')||geminiSnapshotAssets.has(cacheKey))return;
 if(geminiSnapshotRequests.has(cacheKey))return geminiSnapshotRequests.get(cacheKey);
 const epoch=sandboxEpoch,job=(async()=>{const response=await fetch(url);if(!response.ok)throw new Error('Town asset unavailable');const blob=await response.blob(),data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Town asset unreadable'));reader.readAsDataURL(blob);});if(expandedGameEnabled()&&epoch===sandboxEpoch)geminiSnapshotAssets.set(cacheKey,data);})();
 geminiSnapshotRequests.set(cacheKey,job);try{await job;}finally{geminiSnapshotRequests.delete(cacheKey);}
}
async function prepareGeminiSnapshot(si){
 const night=isSandboxNight(),mapIdx=si+(night?4:0),jobs=[cacheSnapshotUrl('map_'+mapIdx,GEMINI_TOWN_ART[mapIdx]||GEMINI_TOWN_ART[si])];
 const fTier=typeof buildingLandmarkTier==='function'?buildingLandmarkTier('fountain'):0;
 jobs.push(cacheSnapshotUrl('b_fountain_'+fTier,townBuildingSpriteUrl('fountain',fTier)));
 for(const b of GEMINI_TOWN_BUILDINGS){const tier=typeof buildingLandmarkTier==='function'?buildingLandmarkTier(b.kind):0;jobs.push(cacheSnapshotUrl('b_'+b.kind+'_'+tier,townBuildingSpriteUrl(b.kind,tier)));}
 await Promise.all(jobs);
}
