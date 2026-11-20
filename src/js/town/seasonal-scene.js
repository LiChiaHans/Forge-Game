
const GEMINI_TOWN_ART=["assets/town/0.ce3ce9d639bb.webp","assets/town/1.e66463ca4058.webp","assets/town/2.0a73b8a46fbe.webp","assets/town/3.ff18b8000d82.webp"];
const GEMINI_TOWN_BUILDINGS=[
 {id:'townExpedition',kind:'expedition',name:'遠征城堡',label:'遠征城堡，挑戰怪物',box:[.005,.01,.445,.245],sign:[.13,.58,.69,.17],angle:-2},
 {id:'townArchive',kind:'archive',name:'星頁圖鑑館',label:'星頁圖鑑館，查看武器收藏',box:[0,.25,.385,.205],sign:[.18,.44,.78,.19],angle:-5},
 {id:'townKitchen',kind:'kitchen',name:'暖爐餐廳',label:'暖爐餐廳，晚間料理營業',box:[.63,.085,.37,.245],sign:[.055,.48,.82,.16],angle:5},
 {id:'townGreenhouse',kind:'greenhouse',name:'晨露溫室',label:'晨露溫室，種植與收成',box:[.015,.465,.345,.195],sign:[.09,.42,.85,.20],angle:5},
 {id:'townForge',kind:'forge',name:'鐵火冶煉廠',label:'鐵火冶煉廠，進入鍛造棋盤',box:[.605,.465,.395,.205],sign:[.08,.38,.82,.19],angle:-5},
 {id:'townDecorShop',kind:'decor',name:'彩匠裝飾行',label:'彩匠裝飾行，購買城鎮裝飾',box:[.015,.675,.37,.225],sign:[.055,.40,.88,.18],angle:-5},
 {id:'townTraining',kind:'training',name:'星盾訓練所',label:'星盾訓練所，提升技能',box:[.61,.695,.39,.24],sign:[.13,.39,.82,.17],angle:5}
];
function geminiTownSignArt(kind,name,tier=0){
 const colors={expedition:['#343e53','#8297ae','#d7c68c'],archive:['#42384e','#967d9f','#ead8a4'],kitchen:['#734332','#c48b55','#ffe0a0'],greenhouse:['#28564b','#6b9b73','#e8dd9c'],forge:['#333e45','#899ca0','#e9bd72'],decor:['#5b425e','#aa87a3','#f4dba4'],training:['#2e4b63','#799fb8','#edd080']};
 let [wood,rim,gold]=colors[kind];
 if(tier===1){rim='#c9d5de';gold='#ffe49c';}
 else if(tier===2){rim='#e8be59';gold='#fff1b8';}
 else if(tier>=3){rim='#f7cf62';gold='#fff8d4';}
 const icons={expedition:'<path stroke="#e8e5ce" stroke-width="3" d="M20 14l19 21M38 14L20 35"/><path stroke="#e0ad56" stroke-width="3" d="M17 28l9-7M32 29l9-7"/>',archive:'<path fill="#f1e3b5" d="M17 15l11 3v20l-11-4zM30 18l12-3v19l-12 4z"/><path stroke="#9c8153" d="M20 20l6 2M20 25l6 2M32 22l7-2M32 27l7-2"/>',kitchen:'<path stroke="#f4dfad" stroke-width="3" d="M21 13v25M17 13v10h8V13M36 26v12"/><ellipse fill="#f4dfad" cx="36" cy="19" rx="5" ry="8"/>',greenhouse:'<path stroke="#d8d799" stroke-width="3" d="M29 38V21l-8-5M29 28l9-9"/><path fill="#98be79" d="M15 13h9v10h-9zM32 13h12v10H32z"/><path fill="#d4df96" d="M18 14h3v7h-3zM35 14h4v7h-4z"/>',forge:'<path fill="#b3c2bd" d="M16 17h26v8H16zM23 25h12v6H23zM20 31h18v6H20z"/><path fill="#f2c982" d="M16 17h26v3H16z"/>',decor:'<path fill="#e9c590" d="M16 14h25v22H16z"/><path fill="#b26878" d="M19 17h8v7h-8z"/><path fill="#71a58c" d="M30 17h8v7h-8z"/><path fill="#7c9cc1" d="M19 27h8v6h-8z"/><path fill="#e0b557" d="M30 27h8v6h-8z"/>',training:'<path fill="#7796af" stroke="#e8cd83" stroke-width="2" d="M17 13h24v18l-12 9-12-9z"/><path fill="#f5d978" d="M27 17h4v5h6l-4 5 2 6-6-4-5 4 1-6-4-5h6z"/>'};
 const crown=tier>=2?'<path fill="'+(tier>=3?'#c8343f':'#465878')+'" stroke="#20282a" stroke-width="1.5" d="M68 2h44l5 8H63z"/><path fill="'+gold+'" d="M74 0h4v4h-4zM88 -2h4v6h-4zM102 0h4v4h-4z"/>':'';
 const stars=tier>0?'<text x="167" y="13" text-anchor="end" font-size="11" font-weight="900" fill="'+gold+'" stroke="#20282a" stroke-width="2" paint-order="stroke">'+('★'.repeat(Math.min(3,tier)))+'</text>':'';
 const trim=tier>=3?'<path fill="#c8343f" d="M12 12h156v4H12z"/><path fill="'+gold+'" d="M12 15h156v2H12z"/>':'';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50" aria-hidden="true" shape-rendering="crispEdges" data-sign-kind="'+kind+'" data-sign-tier="'+tier+'">'+crown+'<path fill="#20292b" d="M8 2h164v5h6v36h-6v5H8v-5H2V7h6z"/><path fill="'+rim+'" d="M9 5h162v5h4v30h-4v5H9v-5H5V10h4z"/><path fill="'+gold+'" d="M11 7h158v3H11zM8 11h3v27H8z"/><path fill="'+wood+'" d="M12 12h156v27H12z"/>'+trim+'<path stroke="'+rim+'" opacity=".45" d="M51 17h110M51 34h110"/><path fill="#1d303b" d="M15 11h29v29H15z"/>'+icons[kind]+'<path fill="'+gold+'" d="M9 10h3v3H9zM168 10h3v3h-3zM9 37h3v3H9zM168 37h3v3h-3z"/><text x="106" y="33" text-anchor="middle" font-size="'+(name.length>4?21:23)+'" font-weight="900" font-family="Noto Sans TC,Microsoft JhengHei,sans-serif" fill="#fff0c8" stroke="#20282a" stroke-width="1.5" paint-order="stroke">'+name+'</text>'+stars+'</svg>';
}
function townBuildingUpgradeArt(kind,tier){
 if(!tier||tier<1)return '';
 const t2=tier>=2,t3=tier>=3;
 let body='';
 if(kind==='expedition'){
  body='<g class="tu-t1"><path fill="#f4cc62" stroke="#2b2119" stroke-width="2" d="M40 36h18v5H40zM146 38h18v5h-18z"/><path fill="#d43f48" stroke="#2b2119" stroke-width="1.5" d="M97 4h22l-6 6 6 6H97z"/><path fill="#ffe89e" d="M101 8h7v4h-7z"/><circle cx="78" cy="108" r="6" fill="#ffbe4f" opacity=".8"/><circle cx="122" cy="106" r="6" fill="#ffbe4f" opacity=".8"/></g>';
  if(t2)body+='<g class="tu-t2"><path fill="#2d4c7a" stroke="#241e1c" stroke-width="2.2" d="M84 36l14-26 14 26z"/><path fill="#f5cf64" stroke="#241e1c" stroke-width="2" d="M95 2h6v14h-6zM90 12h16v4H90z"/><path fill="#c6313d" stroke="#241e1c" stroke-width="2" d="M52 72h16v28l-8-6-8 6zM132 70h16v28l-8-6-8 6z"/><path fill="#f8dc82" d="M57 78h6v10h-6zM137 76h6v10h-6z"/></g>';
  if(t3)body+='<g class="tu-t3"><circle class="tu-halo" cx="98" cy="14" r="14" fill="#ffe794" opacity=".45"/><path fill="#fff4c4" d="M98 1l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/><circle class="tu-spark" cx="56" cy="24" r="3" fill="#fff1ae"/><circle class="tu-spark" cx="148" cy="26" r="3" fill="#fff1ae"/><circle class="tu-spark" cx="100" cy="52" r="2.6" fill="#ffd66e"/></g>';
 }else if(kind==='archive'){
  body='<g class="tu-t1"><path fill="#f3c95f" stroke="#2b211a" stroke-width="2" d="M44 26l8-10 8 10zM122 30l8-10 8 10z"/><circle cx="96" cy="54" r="7" fill="#4672a8" stroke="#f3cc65" stroke-width="2.5"/><path fill="#fff0b6" d="M96 49l1.8 3.6 3.7 1.4-3.7 1.4-1.8 3.6-1.8-3.6-3.7-1.4 3.7-1.4z"/></g>';
  if(t2)body+='<g class="tu-t2"><path fill="#375d8f" stroke="#241e1c" stroke-width="2.2" d="M68 42a28 24 0 0 1 56 0z"/><path fill="#5d8fc9" d="M76 40a20 17 0 0 1 28-14 18 15 0 0 0-16 14z"/><path fill="none" stroke="#f5ce66" stroke-width="2.5" d="M64 42h64M96 14v28"/><ellipse cx="96" cy="24" rx="22" ry="6" fill="none" stroke="#ffe597" stroke-width="2" transform="rotate(-14 96 24)"/><circle cx="96" cy="13" r="4.5" fill="#fff0b3" stroke="#241e1c" stroke-width="1.6"/></g>';
  if(t3)body+='<g class="tu-t3"><circle class="tu-halo" cx="96" cy="24" r="22" fill="#9cd2ff" opacity=".35"/><circle class="tu-spark" cx="62" cy="18" r="3" fill="#fff2b5"/><circle class="tu-spark" cx="132" cy="16" r="3.2" fill="#a8dcff"/><circle class="tu-spark" cx="100" cy="6" r="2.8" fill="#ffe891"/></g>';
 }else if(kind==='kitchen'){
  body='<g class="tu-t1"><path fill="#e3a64b" stroke="#2b1f18" stroke-width="2" d="M126 16h24v8h-24zM130 10h16v6h-16z"/><path fill="none" stroke="#ffe494" stroke-width="2" stroke-dasharray="4 5" d="M36 62q46 14 114-4"/><circle cx="52" cy="66" r="3.5" fill="#ffdf7a"/><circle cx="88" cy="69" r="3.5" fill="#ffdf7a"/><circle cx="126" cy="64" r="3.5" fill="#ffdf7a"/></g>';
  if(t2)body+='<g class="tu-t2"><path fill="#a93338" stroke="#261d17" stroke-width="2" d="M58 26l26-16 26 16v12H58z"/><path fill="#f5cf64" stroke="#261d17" stroke-width="1.8" d="M74 26h20v12H74z"/><path fill="#fff3c2" d="M84 22l2.5 5 5.5.8-4 3.8 1 5.4-5-2.6-5 2.6 1-5.4-4-3.8 5.5-.8z"/><path fill="#c83c3c" stroke="#261d17" stroke-width="1.8" d="M42 74h48l6 10H36z"/><path fill="#ffe8aa" d="M50 74h8v10h-8zM66 74h8v10h-8zM82 74h8v10h-8z"/></g>';
  if(t3)body+='<g class="tu-t3"><circle class="tu-halo" cx="84" cy="26" r="18" fill="#ffd978" opacity=".4"/><path class="tu-spark" fill="#fff4bd" d="M138 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><circle class="tu-spark" cx="62" cy="14" r="3" fill="#ffe794"/><circle class="tu-spark" cx="110" cy="12" r="3" fill="#ffe794"/></g>';
 }else if(kind==='greenhouse'){
  body='<g class="tu-t1"><path fill="none" stroke="#f0cd67" stroke-width="3" d="M30 28l72 28M30 28v8"/><circle cx="32" cy="28" r="4.5" fill="#7be8ad" stroke="#233328" stroke-width="1.6"/><circle cx="102" cy="56" r="4.5" fill="#7be8ad" stroke="#233328" stroke-width="1.6"/></g>';
  if(t2)body+='<g class="tu-t2"><path fill="#45b584" stroke="#1e2d25" stroke-width="2.2" d="M54 44c0-18 14-30 28-30s28 12 28 30z"/><path fill="#9df2c4" opacity=".75" d="M62 42c2-12 10-22 20-23-7 5-10 13-11 23z"/><path fill="none" stroke="#f6d570" stroke-width="2.2" d="M52 44h60M82 12v32M66 20l16 24 16-24"/><path fill="#fff3b5" stroke="#1e2d25" stroke-width="1.5" d="M82 3l5 9-5 4-5-4z"/></g>';
  if(t3)body+='<g class="tu-t3"><circle class="tu-halo" cx="82" cy="28" r="24" fill="#7ff5be" opacity=".35"/><circle class="tu-spark" cx="48" cy="20" r="3.2" fill="#a8ffd2"/><circle class="tu-spark" cx="118" cy="24" r="3.2" fill="#ffe999"/><circle class="tu-spark" cx="82" cy="6" r="3" fill="#d4ffea"/></g>';
 }else if(kind==='forge'){
  body='<g class="tu-t1"><path fill="#f0be56" stroke="#241c18" stroke-width="2" d="M136 14h28v8h-28z"/><path fill="#ff8234" d="M142 10h16v5h-16z"/><path fill="#f5cc64" stroke="#241c18" stroke-width="1.8" d="M80 42h24v6H80z"/></g>';
  if(t2)body+='<g class="tu-t2"><path fill="#3b434d" stroke="#1f1a18" stroke-width="2.2" d="M132 4h36v20h-36z"/><path fill="#f5c657" stroke="#1f1a18" stroke-width="1.8" d="M128 18h44v6h-44zM136 2h6v6h-6zM158 2h6v6h-6z"/><path fill="#ff6a24" d="M140 8c2-8 10-12 10-12s8 4 10 12c-4-2-6 2-10 2s-6-4-10-2z"/><path fill="#ffe887" d="M145 10c1-5 5-7 5-7s4 2 5 7z"/><path fill="#b82e35" stroke="#1f1a18" stroke-width="1.8" d="M58 58h18v26l-9-6-9 6z"/><path fill="#ffd973" d="M63 64h8v8h-8z"/></g>';
  if(t3)body+='<g class="tu-t3"><circle class="tu-halo" cx="150" cy="12" r="22" fill="#ff9438" opacity=".42"/><circle class="tu-spark" cx="140" cy="-2" r="3.4" fill="#ffe47a"/><circle class="tu-spark" cx="162" cy="2" r="3" fill="#ff9d47"/><circle class="tu-spark" cx="94" cy="30" r="2.8" fill="#ffd978"/></g>';
 }else if(kind==='decor'){
  body='<g class="tu-t1"><path fill="none" stroke="#f5ce66" stroke-width="2" d="M28 56q48 16 116-8"/><path fill="#e3566e" d="M44 60l7 10 6-9z"/><path fill="#4cb58a" d="M68 63l7 10 7-9z"/><path fill="#4f8ed6" d="M94 61l7 10 7-10z"/><path fill="#f4c752" d="M118 55l7 10 6-11z"/></g>';
  if(t2)body+='<g class="tu-t2"><path fill="#5d3f68" stroke="#241c21" stroke-width="2.2" d="M56 36a30 24 0 0 1 60 0z"/><path fill="#f5ce63" stroke="#241c21" stroke-width="1.8" d="M52 34h68v6H52z"/><circle cx="86" cy="24" r="10" fill="#ff748c" stroke="#ffe592" stroke-width="2"/><path fill="#5fd1a5" d="M86 14a10 10 0 0 1 10 10H86z"/><path fill="#66a7f0" d="M86 24h10a10 10 0 0 1-10 10z"/><path fill="#ffe27a" d="M76 24a10 10 0 0 1 10-10v10z"/></g>';
  if(t3)body+='<g class="tu-t3"><circle class="tu-halo" cx="86" cy="24" r="22" fill="#ffcfef" opacity=".36"/><circle class="tu-spark" cx="50" cy="18" r="3.2" fill="#ffe685"/><circle class="tu-spark" cx="124" cy="16" r="3.2" fill="#8cf5d0"/><circle class="tu-spark" cx="86" cy="4" r="3" fill="#ffb3d1"/></g>';
 }else if(kind==='training'){
  body='<g class="tu-t1"><path fill="#f4cb60" stroke="#202833" stroke-width="2" d="M54 34l8-8 8 8zM122 36l8-8 8 8z"/><path fill="#3f6e9e" stroke="#f4cc62" stroke-width="2.2" d="M78 44h24v16l-12 9-12-9z"/><path fill="#ffe88a" d="M90 47l2.5 5 5.5.8-4 3.8 1 5.4-5-2.6-5 2.6 1-5.4-4-3.8 5.5-.8z"/></g>';
  if(t2)body+='<g class="tu-t2"><path fill="#2d4f78" stroke="#1d222b" stroke-width="2.2" d="M74 36V12l16-12 16 12v24z"/><path fill="#f5ce63" stroke="#1d222b" stroke-width="1.8" d="M70 34h40v6H70zM87 -6h6v10h-6z"/><path fill="#1a2c44" d="M81 16h18v18H81z"/><path fill="#ffd966" stroke="#241e18" stroke-width="1.5" d="M85 28c0-6 2-9 5-9s5 3 5 9h2v3H83v-3z"/></g>';
  if(t3)body+='<g class="tu-t3"><circle class="tu-halo" cx="90" cy="14" r="22" fill="#ffe68c" opacity=".42"/><path class="tu-spark" fill="#fff5c4" d="M90 -10l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/><circle class="tu-spark" cx="58" cy="14" r="3" fill="#ffe68c"/><circle class="tu-spark" cx="122" cy="14" r="3" fill="#ffe68c"/></g>';
 }
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" preserveAspectRatio="none" aria-hidden="true" data-upgrade-kind="'+kind+'" data-upgrade-tier="'+tier+'">'+body+'</svg>';
}
function geminiTownNightArt(){
 const windows=[[.445,.212,.020,.027],[.743,.255,.027,.028],[.829,.263,.022,.026],[.91,.252,.026,.025],[.883,.608,.028,.035],[.842,.632,.040,.028],[.434,.832,.018,.025],[.725,.827,.025,.025],[.868,.826,.032,.028],[.892,.87,.022,.020],[.265,.816,.035,.030],[.248,.345,.025,.033],[.287,.366,.023,.026]],lamps=[[.274,.242],[.385,.244],[.711,.31],[.581,.868],[.425,.919]];
 return '<svg viewBox="0 0 572 1024" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="geminiTownNightFilter" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="'+TOWN_NIGHT_COLOR_MATRIX+'"/></filter><radialGradient id="gemini-lamp"><stop stop-color="#ffdf9a" stop-opacity=".8"/><stop offset=".25" stop-color="#ffbe60" stop-opacity=".32"/><stop offset="1" stop-color="#f6af53" stop-opacity="0"/></radialGradient></defs><path fill="#cfe5ef" opacity=".7" d="M494 17h8v3h-5v6h-3z"/><path fill="#c9deea" opacity=".6" d="M344 13h2v2h-2zM390 24h2v2h-2zM452 9h2v2h-2zM537 36h2v2h-2z"/><g class="gemini-window-light">'+windows.map(([x,y,w,h])=>'<ellipse fill="url(#gemini-lamp)" cx="'+x*572+'" cy="'+y*1024+'" rx="'+w*850+'" ry="'+h*1300+'"/>').join('')+'</g>'+lamps.map(([x,y],i)=>'<ellipse class="gemini-lamp-light" style="animation-delay:-'+i+'s" fill="url(#gemini-lamp)" cx="'+x*572+'" cy="'+y*1024+'" rx="22" ry="37"/>').join('')+'</svg>';
}
function geminiTownEffects(){
 return '<div class="gemini-sea-shimmer" aria-hidden="true"></div><div class="gemini-night-lights">'+geminiTownNightArt()+'</div><div class="gemini-fountain-water" aria-hidden="true"><i></i><i></i><i></i></div><div class="gemini-chimney-smoke" aria-hidden="true"><i></i><i></i><i></i></div><i class="gemini-forge-fire" aria-hidden="true"></i>';
}
function renderGeminiTown(){
 if(!expandedGameEnabled())return;const si=townVisualSeason(),night=isSandboxNight(),p=$('townP'),image=$('geminiTownImage');p.dataset.geminiTown='true';
 const key=String(si);if(image.dataset.art!==key){image.src=GEMINI_TOWN_ART[si];image.dataset.art=key;image.alt=SEASONS[si].name+'鍛造小鎮';}
 $('geminiTownScene').dataset.season=SEASONS[si].id;$('geminiTownScene').dataset.time=night?'night':'day';
 const rear=$('townDecorBack');if(!rear.dataset.geminiMask){const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="none"><rect width="1000" height="1000" fill="white"/>'+GEMINI_TOWN_BUILDINGS.map(b=>'<rect x="'+b.box[0]*1000+'" y="'+b.box[1]*1000+'" width="'+b.box[2]*1000+'" height="'+b.box[3]*1000+'" fill="black"/>').join('')+'</svg>';rear.style.maskImage='url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';rear.style.maskSize='100% 100%';rear.style.maskMode='luminance';rear.dataset.geminiMask='true';}
 if(!$('geminiTownEffects').dataset.built){$('geminiTownEffects').innerHTML=geminiTownEffects();$('geminiTownEffects').dataset.built='1';}
 GEMINI_TOWN_BUILDINGS.forEach(b=>{const el=$(b.id),[x,y,w,h]=b.box,tier=typeof buildingLandmarkTier==='function'?buildingLandmarkTier(b.kind):0,tierKey=String(tier);
  el.style.left=x*100+'%';el.style.top=y*100+'%';el.style.width=w*100+'%';el.style.height=h*100+'%';el.setAttribute('aria-label',b.label+(tier?'（建築階級 Lv '+tier+'）':''));el.title=b.name+(tier?' · Lv '+tier:'');el.dataset.landmarkTier=tierKey;
  const [sx,sy,sw,sh]=b.sign,signEl=el.querySelector?.('.gemini-building-sign');
  if(!signEl){el.innerHTML+='<span class="gemini-building-sign" data-gemini-sign="true" data-sign-tier="'+tierKey+'" style="left:'+sx*100+'%;top:'+sy*100+'%;width:'+sw*100+'%;height:'+sh*100+'%;--sign-angle:'+b.angle+'deg">'+geminiTownSignArt(b.kind,b.name,tier)+'</span>';}
  else if(signEl.dataset.signTier!==tierKey){signEl.dataset.signTier=tierKey;signEl.innerHTML=geminiTownSignArt(b.kind,b.name,tier);}
  const upEl=el.querySelector?.('.town-upgrade-art');
  if(tier>0){
   if(!upEl){const span=document.createElement('span');span.className='town-upgrade-art';span.dataset.townUpgrade='true';span.dataset.upgradeTier=tierKey;span.innerHTML=townBuildingUpgradeArt(b.kind,tier);el.appendChild(span);}
   else if(upEl.dataset.upgradeTier!==tierKey){upEl.dataset.upgradeTier=tierKey;upEl.innerHTML=townBuildingUpgradeArt(b.kind,tier);}
  }else if(upEl){upEl.remove();}
 });
}
function clearGeminiTown(){
 $('townP').dataset.geminiTown='false';geminiSnapshotAssets.clear();const rear=$('townDecorBack');rear.style.maskImage='';rear.dataset.geminiMask='';GEMINI_TOWN_BUILDINGS.forEach(b=>{const el=$(b.id);for(const key of ['left','top','width','height'])el.style[key]='';el.title='';el.dataset.landmarkTier='0';el.querySelector?.('.town-upgrade-art')?.remove();});
}
function geminiTownGuestPoint(i,night){
 // Coordinates mark the visitor's feet, aligned with the painted doorstep/paths.
 const line=night?[[263,199],[250,209],[237,220],[226,233],[217,247],[215,263],[229,279],[241,294]]:[[263,402],[248,406],[233,411],[218,418],[204,428],[192,441],[184,456],[181,472]];
 return line[i]||[177,Math.min(600,514+(i-line.length)*18)];
}
function geminiTownGuestRoute(i,night){const line=Array.from({length:Math.max(8,i+1)},(_,j)=>geminiTownGuestPoint(j,night));return [[177,650],[177,500],...(night?[[177,362],[218,335],[235,313]]:[]),...line.slice(i).reverse()];}
function townBackgroundFountainBlocked(x,y){return expandedGameEnabled()&&((x-180)/44)**2+((y-293)/36)**2<=1;}
function geminiTownSnapshot(items,si,savedHeight){
 const rect=$('townMap').getBoundingClientRect(),H=Number.isFinite(savedHeight)&&savedHeight>=360&&savedHeight<=1000?savedHeight:rect.width>100&&rect.height>200?Math.max(360,Math.min(1000,360*rect.height/rect.width)):620,night=isSandboxNight();
 let out='<image href="'+(geminiSnapshotAssets.get(si)||GEMINI_TOWN_ART[si])+'" width="360" height="'+H+'" preserveAspectRatio="none"'+(night?' filter="url(#gemini-snapshot-night)"':'')+'/>';
 const decor=z=>items.filter(i=>i.z===z).slice().sort((a,b)=>a.y-b.y).map((i,k)=>{const d=DECOR_BY_ID.get(i.id);return !d?'':'<g transform="translate('+i.x*3.6+' '+i.y*H/100+') rotate('+i.r+') scale('+(i.fx?-i.s:i.s)+' '+(i.fy?-i.s:i.s)+')">'+snapshotNestedSVG(kitchenSnapshotDecorSVG(decorSVG(i.id,si,'gemini-snapshot-'+z+'-'+k),d),-d.w/2,-d.h,d.w,d.h)+'</g>';}).join('');
 out+='<g mask="url(#gemini-snapshot-buildings)">'+decor(0)+'</g>';
 for(const b of GEMINI_TOWN_BUILDINGS){const [x,y,w,h]=b.box,[sx,sy,sw,sh]=b.sign,tier=typeof buildingLandmarkTier==='function'?buildingLandmarkTier(b.kind):0;if(tier>0)out+=snapshotNestedSVG(townBuildingUpgradeArt(b.kind,tier),x*360,y*H,w*360,h*H);out+=snapshotNestedSVG(geminiTownSignArt(b.kind,b.name,tier),(x+w*sx)*360,(y+h*sy)*H,w*sw*360,h*sh*H);}
 if(night)out+=snapshotNestedSVG(geminiTownNightArt(),0,0,360,H);out+=decor(1);
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 '+H+'" width="360" height="'+H+'"><defs><filter id="gemini-snapshot-night" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="'+TOWN_NIGHT_COLOR_MATRIX+'"/></filter><mask id="gemini-snapshot-buildings" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="white"/>'+GEMINI_TOWN_BUILDINGS.map(b=>'<rect x="'+b.box[0]+'" y="'+b.box[1]+'" width="'+b.box[2]+'" height="'+b.box[3]+'" fill="black"/>').join('')+'</mask></defs>'+out+'</svg>';
}
const geminiSnapshotAssets=new Map(),geminiSnapshotRequests=new Map();
async function prepareGeminiSnapshot(si){
 if(GEMINI_TOWN_ART[si].startsWith('data:')||geminiSnapshotAssets.has(si))return;
 if(geminiSnapshotRequests.has(si))return geminiSnapshotRequests.get(si);
 const epoch=sandboxEpoch,job=(async()=>{const response=await fetch(GEMINI_TOWN_ART[si]);if(!response.ok)throw new Error('Town background unavailable');const blob=await response.blob(),data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Town image unreadable'));reader.readAsDataURL(blob);});if(expandedGameEnabled()&&epoch===sandboxEpoch)geminiSnapshotAssets.set(si,data);})();
 geminiSnapshotRequests.set(si,job);try{await job;}finally{geminiSnapshotRequests.delete(si);}
}
