// Background preparation never blocks navigation. Reuse the previous release's media cache.
const gameAssetLoading={active:false,complete:false,running:null,entries:null,loaded:new Set(),failed:[],cache:null,networkFailures:0,objectURLs:new Map(),retryTimer:null};
function collectGameAssets(){
 const groups={REVIEW_MONSTER_ART,SEASON_MUSIC_DATA,ULTIMATE_ART,GEMINI_TOWN_ART,TOWN_BUILDING_ART,TOWN_WING_ART,WORKSHOP_ART,COZY_ITEM_ART,TOWN_GUEST_ART,GREENHOUSE_ART,PREP_BOARD_ART,HOME_ART};
 return Object.values(groups).flatMap(group=>Object.entries(group).map(([id,url])=>({group,id,url,audio:group===SEASON_MUSIC_DATA})));
}
function gameAssetPriority(entry){
 if(entry.group===HOME_ART)return -1;
 if(entry.group===GEMINI_TOWN_ART&&(+entry.id%4)===seasonIndex())return 0;
 if(entry.group===TOWN_BUILDING_ART&&/_0$/.test(entry.id))return 0;
 if(entry.group===TOWN_BUILDING_ART)return 4;
 if(entry.group===WORKSHOP_ART)return 1;
 if(entry.group===COZY_ITEM_ART&&/^(ore|ingredient)-/.test(entry.id))return 2;
 if(entry.group===PREP_BOARD_ART||entry.group===GREENHOUSE_ART)return 3;
 if(entry.audio)return 90;
 if(entry.group===ULTIMATE_ART)return 80;
 if(entry.group===REVIEW_MONSTER_ART)return 60;
 return 10;
}
function paintGameAssetProgress(){
 const s=gameAssetLoading,total=s.entries?.length||0,done=s.loaded.size,percent=total?Math.floor(done/total*100):0;
 document.documentElement.dataset.assetCacheLoaded=String(done);document.documentElement.dataset.assetCacheTotal=String(total);
 document.documentElement.dataset.assetCacheState=s.complete?'complete':s.active?'background':'paused';
 $('assetCacheStatus').textContent=s.complete?'✓ 素材已備妥':s.active?'背景準備素材 · '+percent+'%':'素材稍後會繼續準備';
}
async function openGameAssetCache(){try{return await window.caches?.open('forge-master-media-v1')||null;}catch(e){return null;}}
async function decodeGameAssetImage(url){
 const image=new Image();image.decoding='async';
 if(typeof image.decode==='function'){image.src=url;await image.decode();}
 else await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('image'));image.src=url;});
}
async function fetchGameAsset(entry){
 const s=gameAssetLoading;if(s.networkFailures>=4)throw new Error('connection');
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),entry.audio?60000:20000);
 try{const response=await fetch(entry.url,{signal:controller.signal,priority:'low'});if(!response.ok)throw new Error('http');s.networkFailures=0;return response;}
 catch(error){s.networkFailures++;throw error;}finally{clearTimeout(timer);}
}
async function loadGameAsset(entry){
 const s=gameAssetLoading;if(s.loaded.has(entry))return false;
 // Downloadable single files already contain everything; no eager image decoding needed.
 if(entry.url.startsWith('data:')){s.loaded.add(entry);paintGameAssetProgress();return false;}
 let response=null,fromCache=false;try{response=await s.cache?.match(entry.url);fromCache=!!response;}catch(e){}
 for(let attempt=0;attempt<2;attempt++){
  if(!response)response=await fetchGameAsset(entry);let objectURL;
  try{
   const blob=await response.clone().blob();if(!blob.size)throw new Error('empty');
   const mime=response.headers.get('content-type')||blob.type;if(entry.audio&&!/audio\//i.test(mime))throw new Error('audio');
   objectURL=URL.createObjectURL(blob);if(!entry.audio)await decodeGameAssetImage(objectURL);
   if(!fromCache&&s.cache)try{await s.cache.put(entry.url,response);}catch(e){s.cache=null;}
   s.objectURLs.set(entry.url,objectURL);entry.group[entry.id]=objectURL;s.loaded.add(entry);paintGameAssetProgress();return !fromCache;
  }catch(error){if(objectURL)URL.revokeObjectURL(objectURL);if(!fromCache)throw error;try{await s.cache?.delete(entry.url);}catch(e){}response=null;fromCache=false;}
 }
 throw new Error('asset');
}
async function pruneGameAssetCache(){
 const s=gameAssetLoading;
 try{
  if(typeof window.caches?.keys==='function'){
   for(const name of await window.caches.keys())if(name.startsWith('forge-master-')&&name!=='forge-master-media-v1')await window.caches.delete(name);
  }
 }catch(e){}
 if(!s.cache)return;
 try{const keep=new Set(s.entries.filter(e=>!e.url.startsWith('data:')).map(e=>new URL(e.url,document.baseURI).href)),prefix=new URL('assets/',document.baseURI).href;
  for(const request of await s.cache.keys())if(request.url.startsWith(prefix)&&!keep.has(request.url))await s.cache.delete(request);
 }catch(e){}
}
function gameAssetYield(){return new Promise(resolve=>setTimeout(resolve,350));}
function beginGameAssetLoading(){
 const s=gameAssetLoading;if(s.running)return s.running;if(s.complete)return Promise.resolve();
 clearTimeout(s.retryTimer);s.retryTimer=null;s.entries=s.entries||collectGameAssets();s.active=true;s.failed=[];s.networkFailures=0;paintGameAssetProgress();
 const job=(async()=>{
  s.cache=await openGameAssetCache();
  await pruneGameAssetCache();
  const pending=s.entries.filter(e=>!s.loaded.has(e));
  async function worker(){while(pending.length&&!document.hidden&&window.navigator?.onLine!==false&&s.networkFailures<4){
   pending.sort((a,b)=>gameAssetPriority(a)-gameAssetPriority(b));const entry=pending.shift();
   let downloaded=true;try{downloaded=await loadGameAsset(entry);}catch(e){s.failed.push(entry);}
   if(downloaded)await gameAssetYield();
  }}
  await Promise.all(Array.from({length:Math.min(2,pending.length)},worker));
  s.complete=s.loaded.size===s.entries.length;if(s.complete)await pruneGameAssetCache();
 })();s.running=job;
 return job.catch(()=>{}).finally(()=>{s.running=null;s.active=false;paintGameAssetProgress();
  if(!s.complete&&!document.hidden&&window.navigator?.onLine!==false)s.retryTimer=setTimeout(beginGameAssetLoading,30000);
 });
}
function installGameMediaCache(){
 const sw=window.navigator?.serviceWorker;
 // The worker only handles hashed media. HTML, scripts, saves and leaderboard stay untouched.
 if(!sw||!window.isSecureContext||collectGameAssets().every(e=>e.url.startsWith('data:')))return;
 const status=()=>{document.documentElement.dataset.mediaCacheWorker=sw.controller?'active':'starting';};status();sw.addEventListener?.('controllerchange',status);
 sw.register(new URL('media-cache.js',document.baseURI).href,{scope:new URL('./',document.baseURI).href,updateViaCache:'none'}).then(reg=>{reg?.update?.().catch?.(()=>{});status();}).catch(()=>{document.documentElement.dataset.mediaCacheWorker='unavailable';});
}
installGameMediaCache();
window.addEventListener('load',()=>setTimeout(beginGameAssetLoading,800),{once:true});
window.addEventListener('online',beginGameAssetLoading);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)beginGameAssetLoading();});
