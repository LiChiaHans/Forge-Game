
// Native orientation lock is best-effort; unsupported browsers retain the portrait canvas under a landscape guard.
let portraitLockPending=false,portraitLockDone=false;
function phoneLandscape(width,height,coarse){return !!coarse&&width>height&&Math.min(width,height)<=600;}
function requestPortraitLock(){
 const orientation=window.screen?.orientation;
 if(!orientation?.lock||portraitLockPending||portraitLockDone)return;
 portraitLockPending=true;
 try{Promise.resolve(orientation.lock('portrait')).then(()=>{portraitLockDone=true;},()=>{}).finally(()=>{portraitLockPending=false;});}catch(e){portraitLockPending=false;}
}
function syncPortraitGuard(){
 const vv=window.visualViewport,w=Math.round(vv?.width||window.innerWidth),h=Math.round(vv?.height||window.innerHeight),coarse=window.matchMedia?.('(pointer: coarse)').matches;
 // Keyboard opening in portrait must not trigger the landscape guard.
 const type=window.screen?.orientation?.type,angle=window.orientation;
 const physicallyPortrait=type?.startsWith('portrait')||(typeof angle==='number'&&angle%180===0);
 const guarded=phoneLandscape(w,h,coarse)&&!physicallyPortrait;
 const guard=$('portraitGuard');guard.hidden=!guarded;guard.setAttribute('aria-hidden',String(!guarded));
 document.documentElement.classList.toggle('portrait-guarded',guarded);
 if(!guarded&&w<=h)document.documentElement.style.setProperty('--portrait-canvas-width',w+'px');
 syncTownMotion();
}
window.addEventListener('resize',syncPortraitGuard);
window.addEventListener('orientationchange',()=>{portraitLockDone=false;syncPortraitGuard();requestPortraitLock();});
document.addEventListener('fullscreenchange',()=>{portraitLockDone=false;requestPortraitLock();syncPortraitGuard();});
document.addEventListener('pointerup',requestPortraitLock,{passive:true});
if(window.visualViewport)window.visualViewport.addEventListener('resize',syncPortraitGuard);
// The public catalog is unchanged. Preview-only decorations live inside sandbox sessions.
const PUBLIC_DECOR_CATALOG=DECOR_CATALOG.slice();
function installKitchenPreviewCatalog(){const rows=PUBLIC_DECOR_CATALOG.concat(NIGHT_DECOR_ROWS.map(([id,name,price,season,art,w,h])=>({id,name,price,season,art,w,h,night:true})));DECOR_CATALOG.splice(0,DECOR_CATALOG.length,...rows);DECOR_BY_ID.clear();DECOR_CATALOG.forEach(d=>DECOR_BY_ID.set(d.id,d));}
function clearKitchenPreviewScene(){
 trainingReadOnly=false;trainingBranch='forge';$('sk').classList.remove('training-readonly');cozyItemSnapshotAssets.clear();clearKitchenIngredientFlights();syncWorkshopLook();cancelKitchenDrag();clearKitchenDepartures();for(const id of ['townKitchen','sandboxNightToggle','kitchenP','kitchenModal'])$(id).hidden=true;
 $('townP').dataset.previewKitchen='false';$('townP').dataset.time='day';$('townNightSky').innerHTML='';$('townNightSky').dataset.key='';
 $('townScenery').dataset.season='';$('townWeather').dataset.season='';$('townQueue').dataset.visitors='';$('townDecorFront').dataset.key='';
 for(const id of ['townArchive','townForge','townShop','townTraining','townDecorShop','townGreenhouse']){const el=$(id);el.dataset.artSeason='';el.dataset.greenhouseArt='';el.dataset.harvestKey='';el.querySelector('.night-house-glow')?.remove();}
}

window.addEventListener('resize',clearKitchenIngredientFlights);
installKitchenPreviewCatalog(true);
installKitchenControls();window.addEventListener('resize',()=>{if(!$('kitchenP').hidden)requestAnimationFrame(fitKitchen);});
syncPortraitGuard();requestPortraitLock();

