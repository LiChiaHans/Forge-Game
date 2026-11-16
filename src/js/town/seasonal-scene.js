
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
function geminiTownSignArt(kind,name){
 const colors={expedition:['#343e53','#8297ae','#d7c68c'],archive:['#42384e','#967d9f','#ead8a4'],kitchen:['#734332','#c48b55','#ffe0a0'],greenhouse:['#28564b','#6b9b73','#e8dd9c'],forge:['#333e45','#899ca0','#e9bd72'],decor:['#5b425e','#aa87a3','#f4dba4'],training:['#2e4b63','#799fb8','#edd080']},[wood,rim,gold]=colors[kind];
 const icons={expedition:'<path stroke="#e8e5ce" stroke-width="3" d="M20 14l19 21M38 14L20 35"/><path stroke="#e0ad56" stroke-width="3" d="M17 28l9-7M32 29l9-7"/>',archive:'<path fill="#f1e3b5" d="M17 15l11 3v20l-11-4zM30 18l12-3v19l-12 4z"/><path stroke="#9c8153" d="M20 20l6 2M20 25l6 2M32 22l7-2M32 27l7-2"/>',kitchen:'<path stroke="#f4dfad" stroke-width="3" d="M21 13v25M17 13v10h8V13M36 26v12"/><ellipse fill="#f4dfad" cx="36" cy="19" rx="5" ry="8"/>',greenhouse:'<path stroke="#d8d799" stroke-width="3" d="M29 38V21l-8-5M29 28l9-9"/><path fill="#98be79" d="M15 13h9v10h-9zM32 13h12v10H32z"/><path fill="#d4df96" d="M18 14h3v7h-3zM35 14h4v7h-4z"/>',forge:'<path fill="#b3c2bd" d="M16 17h26v8H16zM23 25h12v6H23zM20 31h18v6H20z"/><path fill="#f2c982" d="M16 17h26v3H16z"/>',decor:'<path fill="#e9c590" d="M16 14h25v22H16z"/><path fill="#b26878" d="M19 17h8v7h-8z"/><path fill="#71a58c" d="M30 17h8v7h-8z"/><path fill="#7c9cc1" d="M19 27h8v6h-8z"/><path fill="#e0b557" d="M30 27h8v6h-8z"/>',training:'<path fill="#7796af" stroke="#e8cd83" stroke-width="2" d="M17 13h24v18l-12 9-12-9z"/><path fill="#f5d978" d="M27 17h4v5h6l-4 5 2 6-6-4-5 4 1-6-4-5h6z"/>'};
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50" aria-hidden="true" shape-rendering="crispEdges" data-sign-kind="'+kind+'"><path fill="#20292b" d="M8 2h164v5h6v36h-6v5H8v-5H2V7h6z"/><path fill="'+rim+'" d="M9 5h162v5h4v30h-4v5H9v-5H5V10h4z"/><path fill="'+gold+'" d="M11 7h158v3H11zM8 11h3v27H8z"/><path fill="'+wood+'" d="M12 12h156v27H12z"/><path stroke="'+rim+'" opacity=".45" d="M51 17h110M51 34h110"/><path fill="#1d303b" d="M15 11h29v29H15z"/>'+icons[kind]+'<path fill="'+gold+'" d="M9 10h3v3H9zM168 10h3v3h-3zM9 37h3v3H9zM168 37h3v3h-3z"/><text x="106" y="33" text-anchor="middle" font-size="'+(name.length>4?21:23)+'" font-weight="900" font-family="Noto Sans TC,Microsoft JhengHei,sans-serif" fill="#fff0c8" stroke="#20282a" stroke-width="1.5" paint-order="stroke">'+name+'</text></svg>';
}
function geminiTownNightArt(){
 const windows=[[.445,.212,.020,.027],[.743,.255,.027,.028],[.829,.263,.022,.026],[.91,.252,.026,.025],[.883,.608,.028,.035],[.842,.632,.040,.028],[.434,.832,.018,.025],[.725,.827,.025,.025],[.868,.826,.032,.028],[.892,.87,.022,.020],[.265,.816,.035,.030],[.248,.345,.025,.033],[.287,.366,.023,.026]],lamps=[[.274,.242],[.385,.244],[.711,.31],[.581,.868],[.425,.919]];
 return '<svg viewBox="0 0 572 1024" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="geminiTownNightFilter" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".30 0 0 0 .015 0 .40 0 0 .025 0 0 .64 0 .065 0 0 0 1 0"/></filter><radialGradient id="gemini-lamp"><stop stop-color="#ffdf9a" stop-opacity=".8"/><stop offset=".25" stop-color="#ffbe60" stop-opacity=".32"/><stop offset="1" stop-color="#f6af53" stop-opacity="0"/></radialGradient></defs><path fill="#cfe5ef" opacity=".7" d="M494 17h8v3h-5v6h-3z"/><path fill="#c9deea" opacity=".6" d="M344 13h2v2h-2zM390 24h2v2h-2zM452 9h2v2h-2zM537 36h2v2h-2z"/><g class="gemini-window-light">'+windows.map(([x,y,w,h])=>'<ellipse fill="url(#gemini-lamp)" cx="'+x*572+'" cy="'+y*1024+'" rx="'+w*850+'" ry="'+h*1300+'"/>').join('')+'</g>'+lamps.map(([x,y],i)=>'<ellipse class="gemini-lamp-light" style="animation-delay:-'+i+'s" fill="url(#gemini-lamp)" cx="'+x*572+'" cy="'+y*1024+'" rx="22" ry="37"/>').join('')+'</svg>';
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
 GEMINI_TOWN_BUILDINGS.forEach(b=>{const el=$(b.id),[x,y,w,h]=b.box;el.style.left=x*100+'%';el.style.top=y*100+'%';el.style.width=w*100+'%';el.style.height=h*100+'%';el.setAttribute('aria-label',b.label);el.title=b.name;
  if(!el.innerHTML.includes('data-gemini-sign="true"')){const [sx,sy,sw,sh]=b.sign;el.innerHTML+='<span class="gemini-building-sign" data-gemini-sign="true" style="left:'+sx*100+'%;top:'+sy*100+'%;width:'+sw*100+'%;height:'+sh*100+'%;--sign-angle:'+b.angle+'deg">'+geminiTownSignArt(b.kind,b.name)+'</span>';}
 });
}
function clearGeminiTown(){
 $('townP').dataset.geminiTown='false';geminiSnapshotAssets.clear();const rear=$('townDecorBack');rear.style.maskImage='';rear.dataset.geminiMask='';GEMINI_TOWN_BUILDINGS.forEach(b=>{const el=$(b.id);for(const key of ['left','top','width','height'])el.style[key]='';el.title='';});
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
 for(const b of GEMINI_TOWN_BUILDINGS){const [x,y,w,h]=b.box,[sx,sy,sw,sh]=b.sign;out+=snapshotNestedSVG(geminiTownSignArt(b.kind,b.name),(x+w*sx)*360,(y+h*sy)*H,w*sw*360,h*sh*H);}
 if(night)out+=snapshotNestedSVG(geminiTownNightArt(),0,0,360,H);out+=decor(1);
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 '+H+'" width="360" height="'+H+'"><defs><filter id="gemini-snapshot-night" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".34 0 0 0 .01 0 .41 0 0 .02 0 0 .62 0 .04 0 0 0 1 0"/></filter><mask id="gemini-snapshot-buildings" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="white"/>'+GEMINI_TOWN_BUILDINGS.map(b=>'<rect x="'+b.box[0]+'" y="'+b.box[1]+'" width="'+b.box[2]+'" height="'+b.box[3]+'" fill="black"/>').join('')+'</mask></defs>'+out+'</svg>';
}
const geminiSnapshotAssets=new Map(),geminiSnapshotRequests=new Map();
async function prepareGeminiSnapshot(si){
 if(GEMINI_TOWN_ART[si].startsWith('data:')||geminiSnapshotAssets.has(si))return;
 if(geminiSnapshotRequests.has(si))return geminiSnapshotRequests.get(si);
 const epoch=sandboxEpoch,job=(async()=>{const response=await fetch(GEMINI_TOWN_ART[si]);if(!response.ok)throw new Error('Town background unavailable');const blob=await response.blob(),data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Town image unreadable'));reader.readAsDataURL(blob);});if(expandedGameEnabled()&&epoch===sandboxEpoch)geminiSnapshotAssets.set(si,data);})();
 geminiSnapshotRequests.set(si,job);try{await job;}finally{geminiSnapshotRequests.delete(si);}
}
