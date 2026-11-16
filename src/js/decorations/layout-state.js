

let cityState=null,cityRevision=0,architect={active:false,season:0,selected:null,placing:null,drag:null},decorShopSeason=0,cityArtEpoch=0;
const townDecorAnimations=new Set(),cityWalkers=new Map();
function freshCity(){if(!expandedGameEnabled())return public_freshCity();return {version:1,owned:{},layouts:Object.fromEntries(DECOR_SEASONS.map(s=>[s,[]])),next:1};}
function public_freshCity(){
 const positions=[['fountain',188,431,1,1],...[[26,177,.72],[331,183,.68],[14,346,.42],[338,479,.45],[343,344,.38]].map(([x,y,s])=>['tree',x,y,s,0]),...[[158,272],[205,302],[144,462],[220,492],[163,557]].map(([x,y])=>['lamp',x,y,1,1]),['bench',288,473,1,1],['bench',109,475,1,1],['cat',178,558,1,1],['dog',178,222,.8,1],['fence',31,619,1,1],['fence',333,619,1,1],...[[27,155],[65,163],[324,352],[299,434],[270,452],[112,482],[140,525],[165,581],[29,461],[327,467]].map(([x,y])=>['flowers',x,y,.72,1])];
 const owned={};positions.forEach(([id])=>owned[id]=(owned[id]||0)+1);
 const layouts={};for(const season of DECOR_SEASONS)layouts[season]=positions.map(([id,x,y,s,z],i)=>({uid:'base-'+i,id,x:x/360*100,y:y/620*100,s,fx:false,fy:false,r:0,z,roam:id==='cat'||id==='dog'}));
 return {version:1,owned,layouts,next:1};
}
function cleanCityItem(raw){
 if(!raw||!DECOR_BY_ID.has(raw.id))return null;
 const finite=(v,f)=>Number.isFinite(+v)?+v:f,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 return {uid:typeof raw.uid==='string'&&/^[\w-]{1,60}$/.test(raw.uid)?raw.uid:'d-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),id:raw.id,x:clamp(finite(raw.x,50),0,100),y:clamp(finite(raw.y,70),5,100),s:clamp(finite(raw.s,1),.3,2),fx:!!raw.fx,fy:!!raw.fy,r:finite(raw.r,0)===360?360:((finite(raw.r,0)%360)+360)%360,z:raw.z===0?0:1,roam:['cat','dog'].includes(raw.id)&&!!raw.roam};
}
function resetCity(){cancelCityPresetSave();stopCityAnimals();cityState=freshCity();cityRevision++;architect={active:false,season:0,selected:null,placing:null,drag:null};closeCityPanels();}
function restoreCity(raw){
 cancelCityPresetSave();stopCityAnimals();architect={active:false,season:seasonIndex(),selected:null,placing:null,drag:null};closeCityPanels();
 const base=freshCity();if(!raw||raw.version!==1){cityState=base;cityRevision++;return;}
 const owned={};for(const d of DECOR_CATALOG)owned[d.id]=Math.max(0,Math.min(9999,Math.floor(Number(raw.owned?.[d.id])||0)));
 const layouts={};for(const key of DECOR_SEASONS){const used={},uids=new Set();layouts[key]=(Array.isArray(raw.layouts?.[key])?raw.layouts[key]:base.layouts[key]).slice(0,100).map(cleanCityItem).filter(i=>{if(!i||uids.has(i.uid)||(used[i.id]||0)>=(owned[i.id]||0))return false;uids.add(i.uid);used[i.id]=(used[i.id]||0)+1;return true;});}
 const nightLayouts={};for(const key of DECOR_SEASONS){const used={},uids=new Set();nightLayouts[key]=(Array.isArray(raw.nightLayouts?.[key])?raw.nightLayouts[key]:layouts[key]).slice(0,100).map(cleanCityItem).filter(i=>{if(!i||uids.has(i.uid)||(used[i.id]||0)>=(owned[i.id]||0))return false;uids.add(i.uid);used[i.id]=(used[i.id]||0)+1;return true;});}cityState={version:1,owned,layouts,nightLayouts,next:Number.isFinite(+raw.next)?Math.max(1,Math.floor(+raw.next)):1};cityRevision++;
}
function snapshotCity(){return JSON.parse(JSON.stringify(cityState||freshCity()));}
function townVisualSeason(){return architect.active?architect.season:seasonIndex();}
function cityLayout(){return expandedGameEnabled()?preview_cityLayout(...arguments):stable_cityLayout(...arguments);}
function stable_cityLayout(si=townVisualSeason()){if(!cityState)cityState=freshCity();return cityState.layouts[DECOR_SEASONS[si]];}
function preview_cityLayout(si=townVisualSeason()){if(!cityState)cityState=freshCity();return isSandboxNight()?ensureNightCityLayout(si):cityState.layouts[DECOR_SEASONS[si]];}
function cityAvailable(id,si=townVisualSeason()){return Math.max(0,Math.min(cityState?.owned[id]||0,expandedGameEnabled()?cityPlacementLimit(id):Infinity)-cityLayout(si).filter(i=>i.id===id).length);}
function commitCity(){cityRevision++;petNavigation=null;renderCityDecor();renderArchitect();saveNow();}
function closeCityPanels(){for(const id of ['decorShopP','decorInventoryP','cityLayoutsP','cityLayoutPreviewP'])$(id).style.display='none';$('architectPanel').hidden=true;}
function stickerTransform(i){return 'rotate('+i.r+'deg) scale('+(i.fx?-i.s:i.s)+','+(i.fy?-i.s:i.s)+')';}