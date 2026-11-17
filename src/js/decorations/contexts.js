let cityEditDraft=null,decorShopNight=false;
function cityContextLabel(si=seasonIndex(),night=isSandboxNight()){return SEASONS[si].name+' · '+(night?'夜晚':'白天');}
function decorMatchesContext(d,si=seasonIndex(),night=isSandboxNight()){return !!d&&d.season===DECOR_SEASONS[si]&&!!d.night===!!night;}
function cityContextEditable(){return architect.active&&architect.season===seasonIndex()&&(!cityEditDraft||cityEditDraft.night===isSandboxNight()&&cityEditDraft.season===DECOR_SEASONS[seasonIndex()]);}
function buildContextDecorCatalog(base,nightRows){
 const rows=[];for(const season of DECOR_SEASONS)for(const night of [false,true])for(const d of base.filter(d=>d.season==='all'||d.season===season))rows.push({...d,id:d.season==='all'?(night?'night-':'')+season+'-'+d.id:(night?'night-':'')+d.id,sourceId:d.id,season,night,name:d.name+(night?'・夜色':''),lighted:false});
 for(const [id,name,price,season,art,w,h]of nightRows)rows.push({id,sourceId:id,name,price,season,art,w,h,night:true,lighted:true});return rows;
}
function decorVariantId(id,season,night){const direct=DECOR_BY_ID.get(id);if(direct&&direct.season===season&&!!direct.night===!!night)return id;return DECOR_CATALOG.find(d=>d.sourceId===id&&d.season===season&&!!d.night===!!night)?.id||null;}
function migrateCityItems(items,season,night){return (Array.isArray(items)?items:[]).slice(0,100).map(i=>{const id=decorVariantId(i?.id,season,night);return id?cleanCityItem({...i,id}):null;}).filter(Boolean);}
function beginCityEdit(){cityEditDraft={season:DECOR_SEASONS[seasonIndex()],night:isSandboxNight(),items:JSON.parse(JSON.stringify(cityLayout()))};architect.active=true;architect.season=seasonIndex();architect.selected=null;architect.placing=null;}
function finishCityEdit(save=true){
 cancelCityPresetSave();if(cityEditDraft&&!save){const store=cityEditDraft.night?cityState.nightLayouts:cityState.layouts;store[cityEditDraft.season]=JSON.parse(JSON.stringify(cityEditDraft.items));}
 cityEditDraft=null;architect.active=false;architect.selected=null;architect.placing=null;architect.drag=null;$('architectConfirmP').style.display='none';closeCityPanels();cityRevision++;renderTown();saveNow();
}
function discardCityEdit(){if(cityEditDraft)finishCityEdit(false);}
function confirmCityEdit(){if(!architect.active)return;$('architectConfirmText').textContent='是否儲存「'+cityContextLabel()+'」的造景修改？選擇維持原樣會還原擺設，已購買的裝飾仍保留在收藏。';$('architectConfirmP').style.display='flex';}
