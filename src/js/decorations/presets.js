
const CITY_PRESET_CONTEXT_LIMIT=5,CITY_PRESET_TOTAL_LIMIT=40;
let cityPresetSaving=false,cityPresetSaveToken=0;
function cancelCityPresetSave(){cityPresetSaveToken++;cityPresetSaving=false;$('cityLayoutSave').disabled=false;$('cityLayoutSave').textContent='儲存目前版型';}
function readCityPresets(){try{const data=JSON.parse(gameStorage.getItem('forgeTownLayoutsV1')||'[]');return Array.isArray(data)?data.slice(0,CITY_PRESET_TOTAL_LIMIT).filter(p=>p&&typeof p.name==='string'&&DECOR_SEASONS.includes(p.season)&&Array.isArray(p.items)).map(p=>{const items=migrateCityItems(p.items,p.season,!!p.night);return {...p,night:!!p.night,items,thumbnail:items.some((i,k)=>i.id!==p.items[k]?.id)?undefined:p.thumbnail};}):[];}catch(e){return [];}}
function presetMissing(items){const needs={};for(const raw of items){const i=cleanCityItem(raw);if(!i)return [{id:'unknown',n:1}];needs[i.id]=(needs[i.id]||0)+1;}return Object.entries(needs).filter(([id,n])=>n>(cityState.owned[id]||0)).map(([id,n])=>({id,n:n-(cityState.owned[id]||0)}));}
function quoteCityPreset(p){
 if(!p||!DECOR_SEASONS.includes(p.season)||!Array.isArray(p.items)||p.items.length>100||p.items.some(i=>!cleanCityItem(i)))return {valid:false,missing:[],cost:0};
 if(p.items.some(i=>!decorMatchesContext(DECOR_BY_ID.get(i.id),DECOR_SEASONS.indexOf(p.season),!!p.night)))return {valid:false,missing:[],cost:0};
 if(cityItemsOverLimit(p.items).length)return {valid:false,missing:[],cost:0,limitExceeded:cityItemsOverLimit(p.items)};const missing=presetMissing(p.items);if(missing.some(i=>!DECOR_BY_ID.has(i.id)||(cityState.owned[i.id]||0)+i.n>9999))return {valid:false,missing:[],cost:0};
 return {valid:true,missing,cost:missing.reduce((total,i)=>total+DECOR_BY_ID.get(i.id).price*i.n,0)};
}
function openCityLayouts(){if(!architect.active)toggleArchitect();if(!cityContextEditable())return;$('cityLayoutName').value=SEASONS[townVisualSeason()].name+'小鎮';renderCityLayouts();$('cityLayoutsP').style.display='flex';syncTownMotion();}
function renderCityLayouts(){if(!cityContextEditable())return;
 const si=townVisualSeason(),season=DECOR_SEASONS[si],list=[defaultCityPreset(si),...readCityPresets().filter(p=>p.season===season&&!!p.night===isSandboxNight())];$('cityLayoutsTitle').textContent=SEASONS[si].name+(isSandboxNight()?'夜間':'白天')+' · 城鎮版型';
 $('cityLayoutsList').innerHTML=list.map(p=>{
  const q=quoteCityPreset(p),insufficient=!sandboxSession&&coins<q.cost,author=p.authorName||'舊版版型',missing=q.missing.map(x=>(DECOR_BY_ID.get(x.id)?.name||'未知裝飾')+'×'+x.n).join('、'),image=cityPresetSavedThumbnail(p);
  return '<article class="city-layout-card"><div class="city-layout-info"><b>'+esc(p.name)+(p.builtin?'<span class="city-layout-default">預設</span>':'')+'</b><div class="city-layout-author"><span class="player-avatar">'+avatarSVG(normalizeAvatar(p.avatar||AVATAR_DEFAULT))+'</span><span>'+esc(author)+'<small>'+esc(cityPresetDate(p))+'</small></span></div><small>'+p.items.length+' 件裝飾 · '+(!q.valid?(q.limitExceeded?'超過放置上限：'+q.limitExceeded.map(id=>DECOR_BY_ID.get(id).name).join('、'):'版型內容不完整'):q.missing.length?'尚缺：'+esc(missing)+'<br>補齊總價：💰 '+q.cost+(insufficient?'（還差 '+(q.cost-coins)+' 金幣）':''):'裝飾已備齊')+'</small><div class="city-layout-buttons"><button data-apply-layout="'+esc(p.id)+'" data-buy-missing="'+(q.cost>0?'1':'0')+'" '+(!q.valid||insufficient?'disabled':'')+'>'+(q.cost>0?'💰 '+q.cost+' 補齊並套用':p.builtin?'套用預設':'套用版型')+'</button>'+(p.builtin?'':'<button data-share-layout="'+esc(p.id)+'">分享給好友</button><button data-delete-layout="'+esc(p.id)+'">刪除</button>')+'</div></div><button class="city-layout-thumbnail" data-preview-layout="'+esc(p.id)+'" aria-label="放大查看'+esc(p.name)+'的截圖"><img data-layout-thumb="'+esc(p.id)+'" '+(image?'src="'+esc(image)+'"':'')+' alt="'+esc(p.name)+'的城鎮截圖"><span>點擊放大</span></button></article>';
 }).join('');hydrateCityThumbnails(list);
}
async function saveCityLayout(){
 if(!cityContextEditable()||cityPresetSaving)return false;const si=townVisualSeason(),season=DECOR_SEASONS[si],night=isSandboxNight(),name=$('cityLayoutName').value.trim().slice(0,28)||SEASONS[si].name+'小鎮',items=JSON.parse(JSON.stringify(cityLayout())),run=runId,epoch=sandboxEpoch,sandbox=sandboxSession,createdAt=new Date().toISOString(),authorName=playerName||'玩家',avatar=normalizeAvatar(playerAvatar);
 if(readCityPresets().filter(p=>p.season===season&&!!p.night===night).length>=CITY_PRESET_CONTEXT_LIMIT){toast('每個季節與時段最多保存 '+CITY_PRESET_CONTEXT_LIMIT+' 個版型，請先刪除不需要的版型。');return false;}
 const ticket=++cityPresetSaveToken;cityPresetSaving=true;$('cityLayoutSave').disabled=true;$('cityLayoutSave').textContent='截圖儲存中…';
 try{
  const thumbnail=await captureCityLayout(items,si);if(ticket!==cityPresetSaveToken||runId!==run||sandboxEpoch!==epoch||sandboxSession!==sandbox||!cityContextEditable()||!decorMatchesContext({season,night}))return false;
  const presets=readCityPresets();if(presets.filter(p=>p.season===season&&!!p.night===night).length>=CITY_PRESET_CONTEXT_LIMIT){toast('這個季節與時段的版型已滿。');return false;}
  presets.push({id:'layout-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),name,season,night,items,thumbnail,artVersion:CITY_PRESET_ART_VERSION,authorName,avatar,createdAt});gameStorage.setItem('forgeTownLayoutsV1',JSON.stringify(presets));renderCityLayouts();toast(sandboxSession?'版型與截圖已保存在後台獨立進度區。':'城鎮版型與截圖已儲存。');return true;
 }catch(e){toast('儲存空間不足，版型未保存。');return false;}
 finally{if(ticket===cityPresetSaveToken){cityPresetSaving=false;$('cityLayoutSave').disabled=false;$('cityLayoutSave').textContent='儲存目前版型';}}
}
function applyCityLayout(id,buyMissing=false){
 if(!cityContextEditable())return false;
 const p=findCityPreset(id);if(!p||p.season!==DECOR_SEASONS[townVisualSeason()])return false;if(!!p.night!==isSandboxNight())return false;const quote=quoteCityPreset(p);
 if(!quote.valid||quote.missing.length&&!buyMissing)return false;if(!sandboxSession&&coins<quote.cost){toast('金幣不足，版型與裝飾均未變更。');return false;}
 const owned={...cityState.owned};quote.missing.forEach(i=>owned[i.id]=(owned[i.id]||0)+i.n);let next=cityState.next;const items=p.items.map(raw=>({...cleanCityItem(raw),uid:'d-'+next++}));
 cityState.owned=owned;syncAchievementMedals();cityState.next=next;cityLayoutStore()[p.season]=items;if(!sandboxSession)coins-=quote.cost;architect.selected=null;architect.placing=null;architect.drag=null;commitCity();renderTown();closeP('cityLayoutsP');toast((quote.cost?'已補齊裝飾並':'已')+'套用「'+p.name+'」'+(quote.cost&&!sandboxSession?'，花費 '+quote.cost+' 金幣。':'。'));return true;
}
function deleteCityLayout(id){if(id.startsWith('default-'))return;try{gameStorage.setItem('forgeTownLayoutsV1',JSON.stringify(readCityPresets().filter(p=>p.id!==id)));}catch(e){return;}renderCityLayouts();}