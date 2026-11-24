
function renderCityDecor(){
 enforceCityPlacementLimits();
 if(!cityState)cityState=freshCity();const si=townVisualSeason(),key=runId+':'+si+':'+cityRevision+':'+architect.active+':'+isSandboxNight();
 const back=$('townDecorBack'),front=$('townDecorFront');if(front.dataset.key===key){updateCitySelection();return;}
 stopCityAnimals();petNavigation=null;front.dataset.key=key;const nodes=[[],[]];
 cityLayout(si).slice().sort((a,b)=>a.y-b.y).forEach((i,k)=>{const d=DECOR_BY_ID.get(i.id);nodes[i.z].push('<button type="button" class="town-sticker'+(architect.active?' editable':'')+'" data-decor-uid="'+esc(i.uid)+'" data-decor-kind="'+esc(d.art)+'" aria-label="'+esc(d.name)+(architect.active?'，拖曳移動':'')+'" style="left:'+i.x+'%;top:'+i.y+'%;width:'+(d.w/360*100)+'%;aspect-ratio:'+d.w+'/'+d.h+';z-index:'+(k+1)+'"><span class="sticker-roamer"><span class="sticker-transform" style="transform:'+stickerTransform(i)+'">'+decorSVG(i.id,si,i.uid)+'</span></span></button>');});
 back.innerHTML=nodes[0].join('');front.innerHTML=nodes[1].join('');$('townP').classList.toggle('architect-editing',architect.active);updateCitySelection();ensureCityPetsMoving();
}
function updateCitySelection(){document.querySelectorAll('#townMap .town-sticker').forEach(n=>n.classList.toggle('selected',architect.active&&n.dataset.decorUid===architect.selected));}
function selectedCityItem(){return cityLayout().find(i=>i.uid===architect.selected)||null;}
function toggleArchitect(){if(architect.active){confirmCityEdit();return;}if(typeof townZone!=='undefined'&&townZone!=='center'){toast('🏗 建築師佈置模式僅限中央主城鎮使用，請先返回主城鎮。');return;}beginCityEdit();renderTown();renderArchitect();}
function setArchitectSeason(){if(architect.active)toast('只能編輯目前的'+cityContextLabel()+'造景。');}
function renderArchitect(){
 const selected=architect.active?selectedCityItem():null;
 $('townArchitectBtn').innerHTML=pxIcon(architect.active?'check':'architect');$('townArchitectBtn').setAttribute('aria-label',architect.active?'完成城鎮佈置':'開啟建築師');$('townArchitectBtn').setAttribute('aria-pressed',String(architect.active));$('architectBar').hidden=!architect.active;
 $('architectPanel').hidden=!selected||!!architect.drag?.moved;
 $('architectPanel').dataset.dock=selected&&selected.y>=50?'top':'bottom';
 const mapRect=$('townMap').getBoundingClientRect(),townRect=$('townP').getBoundingClientRect();$('architectPanel').style.setProperty('--architect-map-top',Math.max(0,mapRect.top-townRect.top)+'px');
 $('architectPlacementBar').hidden=!architect.active||!architect.placing;$('architectPlacementHint').textContent=architect.placing?'輕點地面放置「'+DECOR_BY_ID.get(architect.placing).name+'」':'';
 $('architectSeasonPrev').hidden=true;$('architectSeasonNext').hidden=true;$('architectSeasonName').textContent=cityContextLabel();
 if(!architect.active)return;
 $('architectSelected').textContent=selected?DECOR_BY_ID.get(selected.id).name:'';
 if(selected){$('architectScale').value=Math.round(selected.s*100);$('architectScaleValue').textContent=Math.round(selected.s*100)+'%';$('architectRotation').value=selected.r;$('architectRotationValue').textContent=selected.r+'°';$('architectRoam').hidden=!['cat','dog'].includes(DECOR_BY_ID.get(selected.id)?.art);$('architectRoam').textContent=selected.roam?'停止散步':'開始散步';$('architectDepth').textContent=selected.z?'移到建築後方':'移到建築前方';}
}
function openDecorInventory(){if(!architect.active)toggleArchitect();renderDecorInventory();$('decorInventoryP').style.display='flex';syncTownMotion();}
function renderDecorInventory(){
 const si=townVisualSeason();$('decorInventoryTitle').textContent='裝飾收藏 · '+cityContextLabel(si);
 $('decorReturnAll').disabled=cityLayout(si).length===0;
 $('decorInventoryGrid').innerHTML=DECOR_CATALOG.filter(d=>decorMatchesContext(d,si)&&(cityState.owned[d.id]||0)>0).map(d=>{const n=cityAvailable(d.id,si);return '<article class="decor-card"><div class="decor-thumb">'+decorSVG(d.id,si,'inventory-'+d.id)+'</div><b>'+d.name+'</b><small>擁有 '+cityState.owned[d.id]+' · 可放 '+n+(expandedGameEnabled()?' · 上限 '+cityPlacementLimit(d.id):'')+'</small><button data-place-decor="'+d.id+'" '+(!n?'disabled':'')+'>放置</button></article>';}).join('')||'<p>還沒有這個季節的裝飾，可以到裝飾行購買。</p>';
}
function chooseDecoration(id){if(!cityContextEditable()||!DECOR_BY_ID.has(id)||cityAvailable(id)<1)return false;architect.placing=id;architect.selected=null;closeP('decorInventoryP');renderArchitect();return true;}
function stowAllCityDecor(){if(!cityContextEditable())return 0;const key=DECOR_SEASONS[townVisualSeason()],count=cityLayout().length;cityLayoutStore()[key]=[];architect.selected=null;architect.placing=null;architect.drag=null;commitCity();renderDecorInventory();toast('已收回'+SEASONS[townVisualSeason()].name+'的 '+count+' 件裝飾。');return count;}
function placeDecoration(id,x,y){
 if(cityLayout().filter(i=>i.id===id).length>=cityPlacementLimit(id)){toast(cityPlacementLimit(id)===1?'每種動物最多放置一隻。':'每種裝飾最多放置三件。');return false;}if(!cityContextEditable()||cityAvailable(id)<1||cityLayout().length>=100){toast('裝飾數量不足，或已達 100 件擺設上限。');return false;}
 const item=cleanCityItem({uid:'d-'+cityState.next++,id,x,y,s:1,z:1});cityLayout().push(item);architect.selected=item.uid;architect.placing=null;commitCity();return true;
}
function cityTransform(action){if(!cityContextEditable())return;
 const i=selectedCityItem();if(!i)return;
 if(action==='stow'){cityLayoutStore()[DECOR_SEASONS[townVisualSeason()]]=cityLayout().filter(x=>x!==i);architect.selected=null;}
 if(action==='flip')i.fx=!i.fx;if(action==='flipY')i.fy=!i.fy;if(action==='rotate')i.r=(i.r+45)%360;if(action==='depth')i.z=i.z?0:1;
 if(action==='roam'){const x=i.x*3.6,y=i.y*6.2;if(!i.roam&&!petGround(x,y)){toast('請先把小動物移到沒有建築的地面，再開始散步。');return;}i.roam=!i.roam;}
 commitCity();
}
function decorPrice(d){const lmDisc=typeof landmarkBonuses==='function'?(landmarkBonuses().decorDiscount||0):0;return Math.max(1,Math.round((d?.price||0)*(1-medalBonuses().decorDiscount)*(1-lmDisc)));}
function openDecorationShop(){decorShopSeason=seasonIndex();decorShopNight=isSandboxNight();renderDecorationShop();$('decorShopP').style.display='flex';syncTownMotion();}
function renderDecorationShop(){
 const si=decorShopSeason,night=decorShopNight,canBuy=sandboxSession||si===seasonIndex()&&night===isSandboxNight(),disc=Math.round(medalBonuses().decorDiscount*100),lmDisc=typeof landmarkBonuses==='function'?Math.round((landmarkBonuses().decorDiscount||0)*100):0;
 const shopEl=$('decorShopP');if(shopEl?.dataset){shopEl.dataset.shopSeason=String(si);shopEl.dataset.shopNight=String(night);shopEl.dataset.canBuy=String(canBuy);}
 $('decorShopSummary').textContent=(sandboxSession?'🧪 無限金錢':'持有 '+coins+' 金幣')+' · '+cityContextLabel(si,night)+(disc?' · 🏅 造景章 -'+disc+'%':'')+(lmDisc?' · 🎨 工藝行 -'+lmDisc+'%':'');
 $('decorShopTabs').innerHTML=SEASONS.flatMap((s,i)=>[false,true].map(n=>'<button data-shop-season="'+i+'" data-shop-night="'+n+'" aria-pressed="'+(i===si&&n===night)+'">'+s.icon+s.name+' '+(n?'🌙 夜晚':'☀ 白天')+'</button>')).join('');
 $('decorShopNotice').textContent=canBuy?'此類裝飾只用於'+cityContextLabel(si,night)+'，購買後到建築師收藏放置。':'目前僅能購買'+cityContextLabel()+'的裝飾；可先欣賞其他時段。';
 $('decorShopGrid').innerHTML=DECOR_CATALOG.filter(d=>decorMatchesContext(d,si,night)).map(d=>{const p=decorPrice(d),owned=cityState.owned[d.id]||0;return '<article class="decor-card'+(owned>0?' is-owned':'')+'"><div class="decor-thumb">'+decorSVG(d.id,si,'shop-'+d.id)+'</div><b>'+d.name+'</b><small>擁有 '+owned+' · 最多放 '+cityPlacementLimit(d.id)+'</small><button data-buy-decor="'+d.id+'" '+(!canBuy||!sandboxSession&&coins<p?'disabled':'')+'>💰 '+p+' 購買</button></article>';}).join('');
}
function buyDecoration(id){
 const d=DECOR_BY_ID.get(id);if(!d||!sandboxSession&&!decorMatchesContext(d))return false;const cost=decorPrice(d);
 if(!sandboxSession&&coins<cost){toast('金幣不足。');return false;}if((cityState.owned[id]||0)>=9999)return false;
 if(!sandboxSession)coins-=cost;cityState.owned[id]=(cityState.owned[id]||0)+1;syncAchievementMedals();saveNow();render();renderDecorationShop();toast('已購買「'+d.name+'」，可到裝飾收藏放置。');return true;
}
