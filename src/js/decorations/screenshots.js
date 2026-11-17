

const cityThumbnailCache=new Map();
const cityPreviewCache=new Map();let cityPreviewRequest=0;
const CITY_DEFAULT_TIMESTAMP='2026-11-13T02:01:05.684Z';
const CITY_PRESET_ART_VERSION=2;
function cityPresetSavedThumbnail(p){return !p.night||p.artVersion===CITY_PRESET_ART_VERSION?safeCityThumbnail(p.thumbnail):'';}
function defaultCityPreset(){return expandedGameEnabled()?preview_defaultCityPreset(...arguments):stable_defaultCityPreset(...arguments);}
function stable_defaultCityPreset(si){const season=DECOR_SEASONS[si];return {id:'default-'+season,name:'預設版型 · '+SEASONS[si].name,season,builtin:true,authorName:'Forge Master',avatar:normalizeAvatar(AVATAR_DEFAULT),createdAt:CITY_DEFAULT_TIMESTAMP,items:freshCity().layouts[season]};}
function preview_defaultCityPreset(si){const season=DECOR_SEASONS[si],night=isSandboxNight();return {id:'default-'+(night?'night-':'')+season,name:'預設版型 · '+SEASONS[si].name+(night?'夜間':'白天'),season,night,builtin:true,authorName:'Forge Master',avatar:normalizeAvatar(AVATAR_DEFAULT),createdAt:CITY_DEFAULT_TIMESTAMP,items:[]};}
function findCityPreset(){return expandedGameEnabled()?preview_findCityPreset(...arguments):stable_findCityPreset(...arguments);}
function stable_findCityPreset(id){const i=DECOR_SEASONS.findIndex(s=>id==='default-'+s);return i>=0?{...defaultCityPreset(i),night:id.startsWith('default-night-')}:readCityPresets().find(p=>p.id===id)||friendCityPreset(id);}
function preview_findCityPreset(id){const i=DECOR_SEASONS.findIndex(s=>id==='default-'+s||id==='default-night-'+s);return i>=0?(i===seasonIndex()&&id.startsWith('default-night-')===isSandboxNight()?defaultCityPreset(i):null):readCityPresets().find(p=>p.id===id)||friendCityPreset(id);}
function snapshotNestedSVG(svg,x,y,w,h){
 if(!svg)return '';return svg.replace(/^<svg\b([^>]*)>/,(_,attrs)=>'<svg'+attrs.replace(/\s(?:x|y|width|height)="[^"]*"/g,'')+' x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'">');
}
function citySnapshotSVG(){return expandedGameEnabled()?preview_citySnapshotSVG(...arguments):stable_citySnapshotSVG(...arguments);}
function stable_citySnapshotSVG(items,si,savedHeight){
 const rect=$('townMap').getBoundingClientRect(),W=360,H=Number.isFinite(savedHeight)&&savedHeight>=360&&savedHeight<=1000?savedHeight:rect.width>100&&rect.height>200?Math.max(360,Math.min(1000,360*rect.height/rect.width)):620,p=TOWN_SEASONS[si];
 const parts=[snapshotNestedSVG(townScene(p),0,0,W,H)];
 function decorLayer(z){return items.filter(i=>i.z===z).slice().sort((a,b)=>a.y-b.y).map((i,k)=>{const d=DECOR_BY_ID.get(i.id);if(!d)return '';return '<g transform="translate('+(i.x*3.6)+' '+(i.y*H/100)+') rotate('+i.r+') scale('+(i.fx?-i.s:i.s)+' '+(i.fy?-i.s:i.s)+')">'+snapshotNestedSVG(decorSVG(i.id,si,'snapshot-'+k+'-'+i.uid),-d.w/2,-d.h,d.w,d.h)+'</g>';}).join('');}
 parts.push(decorLayer(0));
 const plaza=$('townPlaza').querySelector('svg');if(plaza)parts.push(snapshotNestedSVG(plaza.outerHTML,360*.5222-360*.19,H*(.65-.1097),360*.38,H*.2194));
 const buildings=[['townArchive','archive',0,.26,.37,.27],['townForge','forge',.58,.25,.42,.29],['townShop','shop',-.03,.76,.44,.23],['townTraining','training',.57,.77,.43,.23],['townGreenhouse',null,0,.54,.3,.18],['townDecorShop','decor',.76,.55,.24,.18]];
 for(const [id,kind,x,y,w,h]of buildings){const el=$(id),box=el.getBoundingClientRect(),valid=rect.width>100&&box.width>0;let art=kind?townHouse(kind,p):el.querySelector('svg')?.outerHTML||'';parts.push(snapshotNestedSVG(art,valid?(box.left-rect.left)/rect.width*360:x*360,valid?(box.top-rect.top)/rect.height*H:y*H,valid?box.width/rect.width*360:w*360,valid?box.height/rect.height*H:h*H));}
 const sign=townExpeditionSign().match(/<svg[\s\S]*?<\/svg>/)?.[0];if(sign)parts.push(snapshotNestedSVG(sign,360*.26+360*.48*.14,H*(.03+.25*.83),360*.48*.72,H*.048));
 parts.push(decorLayer(1));
 return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'"><style>image{image-rendering:pixelated}.town-lamp-glow{opacity:.55}.forge-smoke{opacity:.45}.town-house-sign text{font-family:sans-serif}</style>'+parts.join('')+'</svg>';
}
function preview_citySnapshotSVG(items,si,savedHeight){return geminiTownSnapshot(items,si,savedHeight);}
function geminiOriginalCaptureCityLayout(items,si,options={}){
 const svg=citySnapshotSVG(items,si,options.worldHeight),fallback='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg),canvas=document.createElement('canvas');
 if(typeof window.Image!=='function'||typeof canvas.getContext!=='function')return Promise.resolve(fallback);
 return new Promise(resolve=>{
  const ctx=canvas.getContext('2d');if(!ctx){resolve(fallback);return;}
  const image=new window.Image();let settled=false;const finish=value=>{if(settled)return;settled=true;window.clearTimeout(timeout);resolve(value);},timeout=window.setTimeout(()=>finish(fallback),5000);
  image.onload=()=>{try{
   if(options.preview){const width=Math.max(1080,Math.min(1440,Math.round((window.innerWidth||430)*Math.min(3,window.devicePixelRatio||2))));canvas.width=width;canvas.height=Math.round(width*image.height/image.width);ctx.imageSmoothingEnabled=false;ctx.drawImage(image,0,0,canvas.width,canvas.height);finish(canvas.toDataURL('image/png'));canvas.width=canvas.height=1;return;}
   let result='';for(const width of [320,280,240,200]){canvas.width=width;canvas.height=Math.max(width,Math.min(850,Math.round(width*image.height/image.width)));ctx.imageSmoothingEnabled=false;ctx.drawImage(image,0,0,canvas.width,canvas.height);result=canvas.toDataURL('image/webp',width===320?.92:.9);if(!result.startsWith('data:image/webp;'))result=canvas.toDataURL('image/jpeg',.92);if(result.length<=50000)break;}finish(result);
  }catch(e){finish(fallback);}};image.onerror=()=>finish(fallback);image.src=fallback;
 });
}
async function captureCityLayout(items,si,options={}){if(expandedGameEnabled()){await prepareGeminiSnapshot(si);await prepareCozyItemSnapshot(items,si);}return geminiOriginalCaptureCityLayout(items,si,options);}
function safeCityThumbnail(value){return typeof value==='string'&&/^data:image\/(?:png|webp|jpeg);base64,/.test(value)||typeof value==='string'&&value.startsWith('data:image/svg+xml;charset=utf-8,')?value:'';}
async function cityPresetThumbnail(p){
 const saved=cityPresetSavedThumbnail(p);if(saved)return saved;
 const key=p.id+':'+p.season+':'+JSON.stringify(p.items),cached=cityThumbnailCache.get(key);if(cached)return await cached;
 const promise=captureCityLayout(p.items.map(cleanCityItem).filter(Boolean),DECOR_SEASONS.indexOf(p.season));cityThumbnailCache.set(key,promise);const result=await promise;cityThumbnailCache.set(key,result);return result;
}
function hydrateCityThumbnails(list){for(const p of list)cityPresetThumbnail(p).then(src=>{document.querySelectorAll('#cityLayoutsList [data-layout-thumb]').forEach(img=>{if(img.dataset.layoutThumb===p.id){img.setAttribute('src',src);img.setAttribute('alt',p.name+'的城鎮截圖');}});}).catch(()=>{});}
function cityPresetDate(p){const d=new Date(p.createdAt||0);return p.createdAt&&Number.isFinite(d.getTime())?d.toLocaleString('zh-TW',{hour12:false}):'時間未記錄';}
async function cityPresetPreview(p){
 const si=DECOR_SEASONS.indexOf(p.season),items=p.items.map(cleanCityItem).filter(Boolean),key=p.id+':'+p.season+':'+JSON.stringify(items),cached=cityPreviewCache.get(key);if(cached)return await cached;
 const thumb=[...document.querySelectorAll('#cityLayoutsList [data-layout-thumb]')].find(el=>el.dataset.layoutThumb===p.id),worldHeight=thumb?.naturalWidth>0?360*thumb.naturalHeight/thumb.naturalWidth:undefined;
 const image=captureCityLayout(items,si,{preview:true,worldHeight});cityPreviewCache.set(key,image);while(cityPreviewCache.size>4)cityPreviewCache.delete(cityPreviewCache.keys().next().value);return await image;
}
async function openCityLayoutPreview(id){
 const p=findCityPreset(id);if(!p||p.season!==DECOR_SEASONS[seasonIndex()]||!!p.night!==isSandboxNight())return;const run=runId,epoch=sandboxEpoch,request=++cityPreviewRequest;
 const img=$('cityLayoutPreviewImage');img.hidden=true;$('cityLayoutPreviewStatus').textContent='正在繪製清晰預覽…';$('cityLayoutPreviewStatus').hidden=false;
 $('cityLayoutPreviewTitle').textContent=p.name;img.setAttribute('alt',p.name+'的城鎮截圖');$('cityLayoutPreviewMeta').textContent=(p.authorName||'舊版版型')+' · '+cityPresetDate(p);$('cityLayoutPreviewP').style.display='flex';syncTownMotion();
 const src=await cityPresetPreview(p);if(runId!==run||sandboxEpoch!==epoch||request!==cityPreviewRequest||$('cityLayoutPreviewP').style.display!=='flex')return;
 img.setAttribute('src',src);img.hidden=false;$('cityLayoutPreviewStatus').hidden=true;
}
