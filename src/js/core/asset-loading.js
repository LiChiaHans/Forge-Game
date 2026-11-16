// Keep encoded media in memory for this page; persistent cache is an optional acceleration.
// Do not cache HTML/JS or game saves, and do not revoke URLs on pagehide (bfcache restores them).
const gameAssetLoading={active:true,complete:false,running:null,entries:null,loaded:new Set(),failed:[],cache:null,networkFailures:0,objectURLs:new Map(),inert:[]};
function collectGameAssets(){
 const groups={REVIEW_MONSTER_ART,SEASON_MUSIC_DATA,ULTIMATE_ART,GEMINI_TOWN_ART,WORKSHOP_ART,COZY_ITEM_ART,TOWN_GUEST_ART,GREENHOUSE_ART,PREP_BOARD_ART};
 return Object.values(groups).flatMap(group=>Object.entries(group).map(([id,url])=>({group,id,url,audio:group===SEASON_MUSIC_DATA})));
}
function paintGameAssetProgress(){
 const state=gameAssetLoading,total=state.entries.length,done=state.loaded.size;
 $('assetLoadProgress').max=total;$('assetLoadProgress').value=done;$('assetLoadCount').textContent=Math.floor(done/total*100)+'% · '+done+' / '+total+' 項';
}
async function openGameAssetCache(){try{return await window.caches?.open('forge-master-media-v1')||null;}catch(e){return null;}}
async function decodeGameAssetImage(url){
 const image=new Image();image.decoding='async';
 if(typeof image.decode==='function'){image.src=url;await image.decode();}
 else await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('image'));image.src=url;});
}
async function fetchGameAsset(entry){
 const state=gameAssetLoading;if(state.networkFailures>=6)throw new Error('connection');
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),entry.audio?60000:20000);
 try{const response=await fetch(entry.url,{signal:controller.signal});if(!response.ok)throw new Error('http');state.networkFailures=0;return response;}
 catch(error){state.networkFailures++;throw error;}finally{clearTimeout(timer);}
}
async function loadGameAsset(entry){
 const state=gameAssetLoading;if(state.loaded.has(entry))return;
 if(entry.url.startsWith('data:')){if(!entry.audio)await decodeGameAssetImage(entry.url);state.loaded.add(entry);paintGameAssetProgress();return;}
 let response=null,fromCache=false;
 try{response=await state.cache?.match(entry.url);fromCache=!!response;}catch(e){}
 for(let attempt=0;attempt<2;attempt++){
  if(!response)response=await fetchGameAsset(entry);
  let objectURL;
  try{
   const blob=await response.clone().blob();if(!blob.size)throw new Error('empty');
   const mime=response.headers.get('content-type')||blob.type;if(entry.audio&&!/audio\//i.test(mime))throw new Error('audio');
   objectURL=URL.createObjectURL(blob);if(!entry.audio)await decodeGameAssetImage(objectURL);
   if(!fromCache&&state.cache)try{await state.cache.put(entry.url,response);}catch(e){state.cache=null;}
   state.objectURLs.set(entry.url,objectURL);entry.group[entry.id]=objectURL;state.loaded.add(entry);paintGameAssetProgress();return;
  }catch(error){
   if(objectURL)URL.revokeObjectURL(objectURL);
   if(!fromCache)throw error;
   try{await state.cache?.delete(entry.url);}catch(e){}response=null;fromCache=false;
  }
 }
 throw new Error('asset');
}
async function pruneGameAssetCache(){
 const state=gameAssetLoading;if(!state.cache)return;
 try{const keep=new Set(state.entries.filter(e=>!e.url.startsWith('data:')).map(e=>new URL(e.url,document.baseURI).href)),prefix=new URL('assets/',document.baseURI).href;
  for(const request of await state.cache.keys())if(request.url.startsWith(prefix)&&!keep.has(request.url))await state.cache.delete(request);
 }catch(e){}
}
function finishGameAssetLoading(complete){
 const state=gameAssetLoading;if(state.running||!state.active)return;state.active=false;state.complete=complete;
 // Some home artwork was drawn while the script initialized; switch it to the same local URLs.
 for(const el of document.querySelectorAll('img[src],image[href],audio[src],source[src]')){const key=el.hasAttribute('href')?'href':'src',url=state.objectURLs.get(el.getAttribute(key));if(url)el.setAttribute(key,url);}
 for(const [el,inert]of state.inert)el.inert=inert;state.inert=[];
 $('assetLoader').hidden=true;$('assetLoader').setAttribute('aria-busy','false');
 if($('title').style.display!=='none')performSceneTransition('遊戲首頁',()=>{},true);
}
function beginGameAssetLoading(){
 const state=gameAssetLoading;if(state.running)return state.running;if(!state.active)return Promise.resolve();
 if(!state.entries){state.entries=collectGameAssets();for(const el of document.body.children)if(el!==$('assetLoader')&&!['SCRIPT','STYLE'].includes(el.tagName)){state.inert.push([el,!!el.inert]);el.inert=true;}}
 $('assetLoadActions').hidden=true;$('assetLoadTitle').textContent='正在準備鍛造小鎮';$('assetLoadStatus').textContent='載入四季場景、物品、人物與音樂…';$('assetLoader').setAttribute('aria-busy','true');state.networkFailures=0;paintGameAssetProgress();
 const job=(async()=>{
  state.cache=await openGameAssetCache();const pending=state.entries.filter(e=>!state.loaded.has(e));state.failed=[];let next=0;
  async function worker(){while(next<pending.length){const entry=pending[next++];try{await loadGameAsset(entry);}catch(e){state.failed.push(entry);}}}
  await Promise.all(Array.from({length:Math.min(6,pending.length)},worker));
  if(!state.failed.length)await pruneGameAssetCache();
 })();state.running=job;
 return job.then(()=>{
  state.running=null;
  if(state.failed.length){$('assetLoadTitle').textContent='部分素材尚未載入';$('assetLoadStatus').textContent='還有 '+state.failed.length+' 項未完成。請檢查網路後重試；先進入遊戲可能仍須等待圖片。';$('assetLoadActions').hidden=false;$('assetLoader').setAttribute('aria-busy','false');$('assetLoadRetry').focus?.();}
  else{$('assetLoadStatus').textContent='完整素材已備妥';finishGameAssetLoading(true);}
 }).catch(()=>{state.running=null;$('assetLoadTitle').textContent='載入暫時中斷';$('assetLoadStatus').textContent='請重試；已完成的素材會保留。';$('assetLoadActions').hidden=false;$('assetLoader').setAttribute('aria-busy','false');});
}
$('assetLoadRetry').onclick=beginGameAssetLoading;
$('assetLoadContinue').onclick=()=>finishGameAssetLoading(false);
window.addEventListener('load',beginGameAssetLoading,{once:true});
