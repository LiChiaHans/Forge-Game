

let cityState=null,cityRevision=0,architect={active:false,season:0,selected:null,placing:null,drag:null},decorShopSeason=0,cityArtEpoch=0;
const townDecorAnimations=new Set(),cityWalkers=new Map();
function freshCity(){return {version:2,owned:{},layouts:Object.fromEntries(DECOR_SEASONS.map(s=>[s,[]])),nightLayouts:Object.fromEntries(DECOR_SEASONS.map(s=>[s,[]])),next:1};}
function cleanCityItem(raw){
 if(!raw||!DECOR_BY_ID.has(raw.id))return null;
 const finite=(v,f)=>Number.isFinite(+v)?+v:f,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 return {uid:typeof raw.uid==='string'&&/^[\w-]{1,60}$/.test(raw.uid)?raw.uid:'d-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),id:raw.id,x:clamp(finite(raw.x,50),0,100),y:clamp(finite(raw.y,70),5,100),s:clamp(finite(raw.s,1),.3,2),fx:!!raw.fx,fy:!!raw.fy,r:finite(raw.r,0)===360?360:((finite(raw.r,0)%360)+360)%360,z:raw.z===0?0:1,roam:['cat','dog'].includes(DECOR_BY_ID.get(raw.id)?.art)&&!!raw.roam};
}
function resetCity(){cityEditDraft=null;cancelCityPresetSave();stopCityAnimals();cityState=freshCity();cityRevision++;architect={active:false,season:0,selected:null,placing:null,drag:null};closeCityPanels();}
function restoreCity(raw){cityEditDraft=null;
 cancelCityPresetSave();stopCityAnimals();architect={active:false,season:seasonIndex(),selected:null,placing:null,drag:null};closeCityPanels();
 const base=freshCity();if(!raw||![1,2].includes(raw.version)){cityState=base;cityRevision++;return;}
 const legacy=raw.version===1,owned={};for(const d of DECOR_CATALOG)owned[d.id]=Math.max(0,Math.min(9999,Math.floor(Number(raw.owned?.[d.id]??(legacy?raw.owned?.[d.sourceId]:0))||0)));
 const read=(store,night)=>Object.fromEntries(DECOR_SEASONS.map((key,si)=>{const used={},uids=new Set();const items=legacy?migrateCityItems(store?.[key],key,night):(Array.isArray(store?.[key])?store[key]:[]).slice(0,100).map(cleanCityItem).filter(Boolean);return [key,items.filter(i=>{if(!decorMatchesContext(DECOR_BY_ID.get(i.id),si,night)||uids.has(i.uid)||(used[i.id]||0)>=Math.min(owned[i.id]||0,cityPlacementLimit(i.id)))return false;uids.add(i.uid);used[i.id]=(used[i.id]||0)+1;return true;})];}));
 cityState={version:2,owned,layouts:read(raw.layouts,false),nightLayouts:read(raw.nightLayouts,true),next:Number.isFinite(+raw.next)?Math.max(1,Math.floor(+raw.next)):1};cityRevision++;
}
function snapshotCity(){const copy=JSON.parse(JSON.stringify(cityState||freshCity()));if(cityEditDraft)(cityEditDraft.night?copy.nightLayouts:copy.layouts)[cityEditDraft.season]=JSON.parse(JSON.stringify(cityEditDraft.items));return copy;}
function townVisualSeason(){return seasonIndex();}
function cityLayout(si=townVisualSeason()){if(!cityState)cityState=freshCity();return isSandboxNight()?ensureNightCityLayout(si):cityState.layouts[DECOR_SEASONS[si]];}
function cityAvailable(id,si=townVisualSeason()){if(!decorMatchesContext(DECOR_BY_ID.get(id),si))return 0;return Math.max(0,Math.min(cityState?.owned[id]||0,cityPlacementLimit(id))-cityLayout(si).filter(i=>i.id===id).length);}
function commitCity(){cityRevision++;petNavigation=null;renderCityDecor();renderArchitect();saveNow();}
function closeCityPanels(){for(const id of ['architectConfirmP','decorShopP','decorInventoryP','cityLayoutsP','cityLayoutPreviewP'])$(id).style.display='none';$('architectPanel').hidden=true;}
function stickerTransform(i){return 'rotate('+i.r+'deg) scale('+(i.fx?-i.s:i.s)+','+(i.fy?-i.s:i.s)+')';}