
const ELEMENTS={
 wind:{name:'風',color:'#8fd7b2',dark:'#315d4d',price:350},fire:{name:'火',color:'#f19465',dark:'#773e32',price:350},thunder:{name:'雷',color:'#e2c96e',dark:'#6c566f',price:350},water:{name:'水',color:'#7cc9e8',dark:'#34566f',price:350},stone:{name:'石',color:'#c6b08a',dark:'#625b4c',price:350},light:{name:'光',color:'#fff0aa',dark:'#8a713f',price:350},dark:{name:'闇',color:'#c49ae4',dark:'#503763',price:350}
};
const ELEMENT_IDS=Object.keys(ELEMENTS),ELEMENT_CYCLE=['wind','thunder','stone','water','fire'];
let greenhouseBeds=Array(6).fill(null),seedStock={},elementTiles=new Map(),monsterElementDay=-1,monsterElements=[],selectedPlantBed=-1;
const validElement=e=>Object.hasOwn(ELEMENTS,e);
const elementOf=w=>validElement(w?.element)?w.element:'none';
const elementName=e=>validElement(e)?ELEMENTS[e].name:'無';
function elementMultiplier(attack,defend){
 const a=validElement(attack)?attack:'none',d=validElement(defend)?defend:'none';if(a==='none'&&d==='none')return 1;if(d==='none')return 1.5;if(a==='none')return .75;
 if((a==='light'&&d==='dark')||(a==='dark'&&d==='light'))return 2;
 if(ELEMENT_CYCLE.includes(a)&&ELEMENT_CYCLE[(ELEMENT_CYCLE.indexOf(a)+1)%5]===d)return 2;
 if(ELEMENT_CYCLE.includes(d)&&ELEMENT_CYCLE[(ELEMENT_CYCLE.indexOf(d)+1)%5]===a)return .5;return 1;
}
function resetEcology(){greenhouseBeds=Array(6).fill(null);seedStock={};elementTiles=new Map();monsterElementDay=-1;monsterElements=[];selectedPlantBed=-1;$('greenhouseP').style.display='none';$('seedP').style.display='none';}
function snapshotEcology(){return {version:1,beds:greenhouseBeds,seeds:seedStock,tiles:[...elementTiles],elementDay:day,monsterDay:monsterElementDay,monsters:monsterElements};}
function restoreEcology(raw){
 const r=raw&&typeof raw==='object'?raw:{};
 greenhouseBeds=Array.from({length:6},(_,i)=>{const p=r.beds?.[i];return p&&validElement(p.element)&&Number.isInteger(p.plantedDay)&&p.plantedDay>=1&&p.plantedDay<=day?{element:p.element,plantedDay:p.plantedDay,...(expandedGameEnabled()&&p.growthBoost===1?{growthBoost:1}:{})}:null});
 seedStock={};ELEMENT_IDS.forEach(e=>seedStock[e]=Math.max(0,Math.floor(Number(r.seeds?.[e])||0)));
 elementTiles=new Map((Array.isArray(r.tiles)&&r.elementDay===day?r.tiles:[]).filter(x=>Array.isArray(x)&&Number.isInteger(x[0])&&x[0]>=0&&x[0]<W*H&&validElement(x[1])));
 monsterElementDay=Number.isInteger(r.monsterDay)?r.monsterDay:-1;monsterElements=Array.isArray(r.monsters)?r.monsters.map(e=>validElement(e)?e:'none'):[];selectedPlantBed=-1;
 bag=bag.filter(it=>{if(it.k==='seed'&&validElement(it.element)){seedStock[it.element]++;return false;}return true;});
 syncMonsterElements();
}
function syncMonsterElements(){
 if(monsterElementDay===day&&monsterElements.length===EXPEDITIONS.length)return;
 const choices=['none',...ELEMENT_IDS];monsterElementDay=day;monsterElements=EXPEDITIONS.map(()=>day>0?choices[rnd(choices.length)]:'none');
}
function expeditionMonster(id){syncMonsterElements();return id>=20?endlessMonster(id):{...EXPEDITIONS[id],element:monsterElements[id]||'none'};}
function applyWeaponElement(w,i){const e=elementTiles.get(i);if(validElement(e))w.element=e;return w;}
function elementBadge(e,cls=''){const color=validElement(e)?ELEMENTS[e].color:'#b8c3c9';return '<span class="element-badge '+cls+'" style="--element:'+color+'" aria-label="'+elementName(e)+'屬性">'+elementIcon(e)+'<b>'+elementName(e)+'</b></span>';}
function elementWeaponHTML(w){const e=elementOf(w);return e==='none'?'<p class="element-weapon-note">無屬性</p>':'<div class="element-weapon-note">'+elementBadge(e)+'<span>屬性附魔 · 武器售價 +20%</span></div>';}
function plantAge(p){return Math.max(0,Math.min(3,day-p.plantedDay+(expandedGameEnabled()?(p.growthBoost||0):0)));}
function renderGreenhousePanel(){
 $('greenhouseP').querySelector('.greenhouse-panel').style.setProperty('--greenhouse-art','url("'+GREENHOUSE_ART.interior+'")');
 $('greenhouseSeeds').innerHTML='<h3>種子庫存</h3><div class="seed-stock">'+ELEMENT_IDS.map(e=>'<span style="--element:'+ELEMENTS[e].color+'">'+elementIcon(e)+'<b>'+ELEMENTS[e].name+'</b><small>×'+(seedStock[e]||0)+'</small></span>').join('')+'</div>';
 $('greenhouseBeds').innerHTML=greenhouseBeds.map((p,i)=>{const age=p?plantAge(p):0,label=p?ELEMENTS[p.element].name+'之花':'種植區 '+(i+1),stage=p?['種子 · 還有3天','發芽 · 還有2天','屬性葉 · 還有1天','已開花 · 收成 ×'+harvestYield()][age]:'點擊播種';return '<button data-plant-bed="'+i+'" class="'+(p&&age===3?'ripe':'')+'" aria-pressed="'+(selectedPlantBed===i)+'" onclick="selectGreenhouseBed('+i+')" aria-label="第'+(i+1)+'格，'+label+'，'+stage+'"><span class="plant-bed-art">'+plantArt(p?.element,age)+'</span><b>'+label+'</b><small>'+stage+'</small></button>'}).join('');
 renderKitchenCompost();renderHarvestAlert();$('greenhouseDetail').textContent='播種後經過三天即可收成精華。精華可製作當天有效的屬性附魔格。'+(seasonIndex()===0?' 春日豐收：每盆成熟花朵收成 2 份精華。':'');
}
function selectGreenhouseBed(i){
 if(!Number.isInteger(i)||i<0||i>=6||day<1)return;selectedPlantBed=i;const p=greenhouseBeds[i];
 if(!p){renderSeedPicker();$('seedP').style.display='flex';return;}
 if(plantAge(p)>=3){const e=p.element,yieldCount=harvestYield();greenhouseBeds[i]=null;for(let n=0;n<yieldCount;n++)bag.push({k:'ess',element:e});selectedPlantBed=-1;renderGreenhousePanel();saveNow();$('greenhouseDetail').textContent='已收成 '+ELEMENTS[e].name+'之精華 ×'+yieldCount+(yieldCount===2?'（春日豐收）':'')+'，放入道具箱。盆栽可重新播種。';return;}
 renderGreenhousePanel();$('greenhouseDetail').textContent='第 '+(i+1)+' 格 · '+ELEMENTS[p.element].name+'之花，將在第 '+(p.plantedDay+3-(expandedGameEnabled()?(p.growthBoost||0):0))+' 天開花。';
}
function renderSeedPicker(){
 $('seedTitle').textContent='第 '+(selectedPlantBed+1)+' 格 · 選擇花種';
 $('seedChoices').innerHTML=ELEMENT_IDS.map(e=>{const n=seedStock[e]||0,p=ELEMENTS[e];return '<button data-sow="'+e+'" onclick="sowSeed(\''+e+'\')" '+(!n&&coins<p.price?'disabled':'')+'>'+seedPacketArt(e)+'<span><b>'+p.name+'之花</b><small>'+(n?'庫存 '+n+' 顆 · 免費播種':'購買並播種 · '+p.price+' 金幣')+'</small></span></button>'}).join('');
 $('seedCoins').textContent='持有 '+coins+' 金幣 · 優先使用庫存種子';
}
function sowSeed(e){
 const i=selectedPlantBed;if(day<1||!validElement(e)||!Number.isInteger(i)||i<0||i>=6||greenhouseBeds[i])return false;
 const cost=(seedStock[e]||0)>0?0:ELEMENTS[e].price;if(coins<cost)return false;
 if(cost)coins-=cost;else seedStock[e]--;greenhouseBeds[i]={element:e,plantedDay:day};selectedPlantBed=-1;closeP('seedP');render();renderGreenhousePanel();saveNow();$('greenhouseDetail').textContent='已播下'+ELEMENTS[e].name+'之花種子，第 '+(day+3)+' 天可收成。';return true;
}
function grantGardenLoot(it){if(it.k==='seed'&&validElement(it.element))seedStock[it.element]=(seedStock[it.element]||0)+1;else bag.push({...it});}
function useEssence(i){
 if(hand?.k!=='ess'||!validElement(hand.element)||!Number.isInteger(i)||i<0||i>=W*H)return false;
 if(isOff(i)||frozen.has(i)||leaves.has(i)){say('冰凍、落葉或尚未開放的格子無法附魔。');render();return false;}
 const e=hand.element;if(elementTiles.get(i)===e){say('這格已經是'+ELEMENTS[e].name+'屬性附魔格，精華保留。');render();return false;}
 elementTiles.set(i,e);hand=null;render();saveNow();say('已設置'+ELEMENTS[e].name+'屬性附魔格，當天有效；在此生成的武器會取得屬性附魔。');return true;
}
function renderElementTiles(){
 elementTiles.forEach((e,i)=>{const el=$('grid').children[i];if(!el||!validElement(e))return;el.classList.add('element-cell');el.style.setProperty('--element',ELEMENTS[e].color);el.setAttribute('data-element',e);const badge=document.createElement('span');badge.className='element-cell-mark';badge.setAttribute('aria-label',ELEMENTS[e].name+'屬性附魔格');badge.innerHTML=elementIcon(e);el.appendChild(badge);});
}
function elementMatchupHTML(w,m){const e=elementOf(w),a=elementMultiplier(e,m.element),d=elementMultiplier(m.element,e);return '<div class="element-matchup"><span>我方 '+elementName(e)+' → '+elementName(m.element)+'：攻擊 ×'+a.toFixed(2)+'</span><span>怪物 '+elementName(m.element)+' → '+elementName(e)+'：攻擊 ×'+d.toFixed(2)+'</span></div>';}

function elementIcon(e){
 const p=ELEMENTS[e],c=p?.color||'#b8c3c9';
 const shapes={wind:'M4 8h13V5h4v7H4zM8 14h17v4H8zM4 21h13v-2h4v6H4z',fire:'M14 2h4v7h4v5h4v12h-4v4H8v-4H4V16h4v-5h4v8h4V9h-2z',thunder:'M17 1h10l-9 12h7L9 31l4-13H6z',water:'M14 2h4v5h4v5h4v14h-4v4H10v-4H6V14h4V8h4z',stone:'M8 5h13v4h6v17h-5v4H6v-5H2V12h6z',light:'M13 1h6v7h6v5h6v6h-6v5h-6v7h-6v-7H7v-5H1v-6h6V8h6z',dark:'M13 2h10v4h-7v5h-4v10h4v5h8v4H11v-4H6V10h4V5h3z'};
 return '<svg viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true">'+(shapes[e]?'<path fill="'+c+'" stroke="#172c35" stroke-width="1" d="'+shapes[e]+'"/>':'<path fill="none" stroke="'+c+'" stroke-width="3" d="M9 5h14v4h4v14h-4v4H9v-4H5V9h4z"/>')+'</svg>';
}
function seedPacketArt(e){const p=ELEMENTS[e];return '<svg viewBox="0 0 64 64" shape-rendering="crispEdges" aria-hidden="true"><path fill="#26362f" d="M9 5h46v54H9z"/><path fill="#d8c291" d="M12 8h40v48H12z"/><path fill="#f0ddb0" d="M14 10h36v9H14z"/><path fill="'+p.dark+'" d="M16 23h32v24H16z"/><svg x="20" y="20" width="26" height="29" viewBox="0 0 32 32">'+elementIcon(e).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')+'</svg><path fill="#a17d4d" d="M16 50h32v3H16z"/><path fill="'+p.color+'" d="M13 17h38v4H13z"/></svg>';}
function essenceArt(e){const p=ELEMENTS[e];return '<svg viewBox="0 0 64 64" shape-rendering="crispEdges" aria-hidden="true"><path fill="#1a2b39" d="M23 3h18v14h5v6h7v30h-6v6H17v-6h-6V23h7v-6h5z"/><path fill="#aecdce" d="M26 7h12v13h6v6h5v25h-5v4H20v-4h-5V26h5v-6h6z"/><path fill="'+p.dark+'" d="M18 30h28v19h-4v4H22v-4h-4z"/><path fill="'+p.color+'" d="M20 32h24v13H20z"/><path fill="#f4e4b7" d="M23 4h18v7H23z"/><path fill="#88704d" d="M25 4h14v3H25z"/><path fill="#e3f3e5" opacity=".8" d="M19 27h4v15h-4zM25 19h3v5h-3z"/><svg x="23" y="29" width="20" height="21" viewBox="0 0 32 32">'+elementIcon(e).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')+'</svg></svg>';}
function plantArt(e,age=0){return gardenPlantSVG(e,age);}
function elementChartHTML(){
 const points=ELEMENT_CYCLE.map((e,i)=>{const angle=(-90+i*72)*Math.PI/180;return {e,x:128+85*Math.cos(angle),y:115+85*Math.sin(angle)}});
 let s='';points.forEach((p,i)=>{const q=points[(i+1)%5],dx=q.x-p.x,dy=q.y-p.y,len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len;s+='<path stroke="#7c978c" stroke-width="2" d="M'+(p.x+ux*27)+' '+(p.y+uy*27)+'L'+(q.x-ux*27)+' '+(q.y-uy*27)+'"/><text fill="#e6d39b" font-size="24" text-anchor="middle" dominant-baseline="central" transform="translate('+((p.x+q.x)/2)+' '+((p.y+q.y)/2)+') rotate('+(Math.atan2(dy,dx)*180/Math.PI)+')">&gt;</text>';});
 points.forEach(p=>s+='<circle cx="'+p.x+'" cy="'+p.y+'" r="25" fill="'+ELEMENTS[p.e].dark+'" stroke="'+ELEMENTS[p.e].color+'" stroke-width="2"/><text x="'+p.x+'" y="'+(p.y+7)+'" text-anchor="middle" fill="'+ELEMENTS[p.e].color+'" font-size="22" font-weight="bold">'+ELEMENTS[p.e].name+'</text>');
 for(const [e,y]of [['light',65],['dark',165]])s+='<circle cx="299" cy="'+y+'" r="25" fill="'+ELEMENTS[e].dark+'" stroke="'+ELEMENTS[e].color+'" stroke-width="2"/><text x="299" y="'+(y+7)+'" text-anchor="middle" fill="'+ELEMENTS[e].color+'" font-size="22" font-weight="bold">'+ELEMENTS[e].name+'</text>';
 return '<svg class="element-chart" viewBox="0 0 350 230" role="img" aria-label="風剋雷、雷剋石、石剋水、水剋火、火剋風；光闇互剋">'+s+'<text x="299" y="125" text-anchor="middle" fill="#e6d39b" font-size="33">↕</text></svg><p class="element-rule-key">剋制 ×2.0 · 被剋制 ×0.5<br>有屬性 → 無屬性 ×1.5<br>無屬性 → 有屬性 ×0.75 · 其餘 ×1.0</p>';
}