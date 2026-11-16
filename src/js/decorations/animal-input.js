

function cityObstacleAt(){return expandedGameEnabled()?preview_cityObstacleAt(...arguments):stable_cityObstacleAt(...arguments);}
function stable_cityObstacleAt(x,y){
 if(!cityState)return false;return cityLayout().some(i=>{const d=DECOR_BY_ID.get(i.id);if(!d||['cat','dog','flowers','fence'].includes(i.id))return false;const px=i.x*3.6,py=i.y*6.2,s=i.s;
  if(i.id==='fountain'||d.art==='pond')return ((x-px)/(d.w*.43*s+6))**2+((y-(py-d.h*.32*s))/(d.h*.32*s+6))**2<1;
  return Math.hypot(x-px,y-py)<Math.min(20,d.w*.2*s+5);
 });
}
function preview_cityObstacleAt(x,y){
 if(townBackgroundFountainBlocked(x,y))return true;
 if(expandedGameEnabled()&&townMasterBlocks().some(([x0,y0,x1,y1])=>x>=x0&&x<=x1&&y>=y0&&y<=y1))return true;
 if(!cityState)return false;return cityLayout().some(i=>{const d=DECOR_BY_ID.get(i.id);if(!d||['cat','dog','flowers','fence'].includes(i.id))return false;const px=i.x*3.6,py=i.y*6.2,s=i.s;
  if(i.id==='fountain'||d.art==='pond')return ((x-px)/(d.w*.43*s+6))**2+((y-(py-d.h*.32*s))/(d.h*.32*s+6))**2<1;
  return Math.hypot(x-px,y-py)<Math.min(20,d.w*.2*s+5);
 });
}
function cityPetSegmentClear(a,b){
 const key=a.join(',')+':'+b.join(',');petNavigation.segmentChecks=petNavigation.segmentChecks||new Map();if(petNavigation.segmentChecks.has(key))return petNavigation.segmentChecks.get(key);
 const n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/2);let good=true;for(let k=1;k<n;k++)if(!petGround(a[0]+(b[0]-a[0])*k/n,a[1]+(b[1]-a[1])*k/n)){good=false;break;}
 petNavigation.segmentChecks.set(key,good);petNavigation.segmentChecks.set(b.join(',')+':'+a.join(','),good);return good;
}
function stopCityAnimals(){cityArtEpoch++;townDecorAnimations.forEach(a=>a.cancel?.());townDecorAnimations.clear();cityWalkers.forEach(w=>{if(w.timer)clearTimeout(w.timer);});cityWalkers.clear();}
function ensureCityPetsMoving(){
 if(architect.active||townMotionPaused||$('townP').style.display!=='flex'||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
 for(const item of cityLayout()){if(!item.roam||!['cat','dog'].includes(item.id))continue;let w=cityWalkers.get(item.uid);if(!w){const el=document.querySelector('[data-decor-uid="'+item.uid+'"] .sticker-roamer');if(!el)continue;w={item,el,point:[item.x*3.6,item.y*6.2],origin:[item.x*3.6,item.y*6.2],anim:null,timer:null,epoch:cityArtEpoch};cityWalkers.set(item.uid,w);}if(!w.anim&&!w.timer&&!w.walking)walkCityPet(w);}
}
async function walkCityPet(w){
 if(!expandedGameEnabled())return stage19_walkCityPet(w);if(lowEffects||architect.active||townMotionPaused||w.walking||w.epoch!==cityArtEpoch)return;
 const route=petRoute(w.point);if(route.length<2)return;w.walking=true;const rect=$('townMap').getBoundingClientRect(),dist=route.slice(1).map((p,i)=>Math.hypot(p[0]-route[i][0],p[1]-route[i][1])),total=dist.reduce((a,b)=>a+b,0),duration=Math.max(3500,Math.min(22000,total/27*1000)),tf=p=>'translate3d('+((p[0]-w.origin[0])*rect.width/360)+'px,'+((p[1]-w.origin[1])*rect.height/620)+'px,0) scale('+(petDepthScale(p[1])/petDepthScale(w.origin[1]))+')';w.point=route[0];
 try{for(let i=1;i<route.length;i++){
  if(w.epoch!==cityArtEpoch||architect.active||townMotionPaused)break;const from=route[i-1],to=route[i];w.el.classList.remove('decor-walking');if(!await turnCityPet(w,to[0]-from[0])||w.epoch!==cityArtEpoch)break;
  w.el.classList.add('decor-walking');w.el.style.transform=tf(to);const ok=await cityPetAnimation(w.el,[{transform:tf(from)},{transform:tf(to)}],{duration:Math.max(40,duration*dist[i-1]/total),easing:'linear'},w);if(!ok||w.epoch!==cityArtEpoch)break;w.point=to;
 }}finally{w.walking=false;w.el.classList.remove('decor-walking');if(w.epoch===cityArtEpoch&&!architect.active&&!townMotionPaused)w.timer=gameTimeout(()=>{w.timer=null;walkCityPet(w);},1400+rnd(1800));}
}
function loveCityPet(node){if(expandedGameEnabled())playPetVoice(node.dataset.decorKind);const old=node.querySelector('.sticker-love');old?.remove();const b=document.createElement('span');b.className='sticker-love';b.setAttribute('aria-label','愛心');b.innerHTML='<svg viewBox="0 0 32 24" shape-rendering="crispEdges"><path fill="#fff0ce" stroke="#364b51" d="M2 1h28v18H19l-3 4-3-4H2z"/><path fill="#d88799" d="M8 6h6v3h4V6h6v7h-3v3h-3v2h-4v-2h-3v-3H8z"/></svg>';node.querySelector('.sticker-roamer').appendChild(b);gameTimeout(()=>b.remove(),1700);}
function installCityControls(){
 $('townArchitectBtn').onclick=toggleArchitect;$('architectInventoryTop').onclick=openDecorInventory;$('architectLayoutsTop').onclick=openCityLayouts;$('decorInventoryShop').onclick=()=>{closeP('decorInventoryP');openDecorationShop();};$('decorReturnAll').onclick=stowAllCityDecor;$('cityLayoutSave').onclick=saveCityLayout;
 $('architectCancelTop').onclick=()=>{architect.placing=null;renderArchitect();};
 $('architectSeasonPrev').onclick=()=>setArchitectSeason((architect.season+3)%4);$('architectSeasonNext').onclick=()=>setArchitectSeason((architect.season+1)%4);
 $('architectDeselect').onclick=()=>{architect.selected=null;renderArchitect();updateCitySelection();};
 $('architectActions').onclick=e=>{const b=e.target.closest('[data-city-action]');if(b)cityTransform(b.dataset.cityAction);};
 const preview=()=>{const i=selectedCityItem();if(!i)return;document.querySelector('[data-decor-uid="'+i.uid+'"] .sticker-transform')?.style.setProperty('transform',stickerTransform(i));};
 $('architectScale').oninput=e=>{const i=selectedCityItem();if(!i)return;i.s=Math.max(.3,Math.min(2,+e.target.value/100));preview();$('architectScaleValue').textContent=Math.round(i.s*100)+'%';};$('architectScale').onchange=()=>commitCity();
 $('architectRotation').oninput=e=>{const i=selectedCityItem();if(!i)return;i.r=Math.max(0,Math.min(360,+e.target.value||0));preview();$('architectRotationValue').textContent=i.r+'°';};$('architectRotation').onchange=()=>commitCity();
 $('decorInventoryGrid').onclick=e=>{const b=e.target.closest('[data-place-decor]');if(b)chooseDecoration(b.dataset.placeDecor);};
 $('decorShopTabs').onclick=e=>{const b=e.target.closest('[data-shop-season]');if(b){decorShopSeason=+b.dataset.shopSeason;renderDecorationShop();}};$('decorShopGrid').onclick=e=>{const b=e.target.closest('[data-buy-decor]');if(b&&!b.disabled)buyDecoration(b.dataset.buyDecor);};
 $('cityLayoutsList').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;if(b.dataset.previewLayout){openCityLayoutPreview(b.dataset.previewLayout).catch(()=>toast('暫時無法產生預覽，請再試一次。'));return;}if(b.dataset.applyLayout)applyCityLayout(b.dataset.applyLayout,b.dataset.buyMissing==='1');if(b.dataset.deleteLayout)deleteCityLayout(b.dataset.deleteLayout);};
 const map=$('townMap');
 map.addEventListener('pointerdown',e=>{
  if(!architect.active||e.button!==undefined&&e.button!==0||architect.drag&&architect.drag.pointer!==e.pointerId)return;
  const node=e.target.closest('.town-sticker');e.preventDefault();e.stopPropagation();
  if(architect.placing){const r=map.getBoundingClientRect();placeDecoration(architect.placing,(e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100);return;}
  architect.selected=node?.dataset.decorUid||null;architect.drag=null;if(node){const i=selectedCityItem();architect.drag={uid:i.uid,pointer:e.pointerId,cx:e.clientX,cy:e.clientY,x:i.x,y:i.y,moved:false};map.setPointerCapture?.(e.pointerId);}renderArchitect();updateCitySelection();
 });
 map.addEventListener('pointermove',e=>{
  const d=architect.drag;if(!d||d.pointer!==e.pointerId)return;e.preventDefault();if(!d.moved&&Math.hypot(e.clientX-d.cx,e.clientY-d.cy)<=4)return;
  if(!d.moved){d.moved=true;renderArchitect();}const r=map.getBoundingClientRect(),i=selectedCityItem();if(!i)return;i.x=Math.max(1,Math.min(99,d.x+(e.clientX-d.cx)/r.width*100));i.y=Math.max(12,Math.min(99,d.y+(e.clientY-d.cy)/r.height*100));const n=document.querySelector('[data-decor-uid="'+i.uid+'"]');if(n){n.style.left=i.x+'%';n.style.top=i.y+'%';}
 });
 const finish=(e,cancel)=>{const d=architect.drag;if(!d||d.pointer!==e.pointerId)return;const i=selectedCityItem();if(cancel&&i){i.x=d.x;i.y=d.y;}architect.drag=null;map.releasePointerCapture?.(e.pointerId);if(d.moved)commitCity();else{renderArchitect();updateCitySelection();}};
 map.addEventListener('pointerup',e=>finish(e,false));map.addEventListener('pointercancel',e=>finish(e,true));
 map.addEventListener('click',e=>{if(architect.active)return;const n=e.target.closest('.town-sticker');if(!n)return;const i=cityLayout().find(i=>i.uid===n.dataset.decorUid);if(i&&['cat','dog'].includes(i.id))loveCityPet(n);});
 window.addEventListener('resize',()=>{if(architect.active)requestAnimationFrame(renderArchitect);});
}
