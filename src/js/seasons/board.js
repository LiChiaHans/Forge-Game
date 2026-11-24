
const SEASONS=[
  {id:'spring',name:'春天',icon:'🌱',description:'春回大地！冶煉廠與餐廳的基礎過熱都是 50 步。春季持續 3 天。'},
  {id:'summer',name:'夏天',icon:'☀️',description:'盛夏高溫！冶煉廠與餐廳的基礎過熱由 50 步增加到 60 步。夏季持續 3 天。'},
  {id:'autumn',name:'秋天',icon:'🍂',description:'秋風吹落葉！每天隨機在 3 個空格落下落葉，落葉格無法放置物品。當上下左右相鄰的格子過熱時，落葉會燃燒消失。未燒掉的落葉保留到秋季結束。'},
  {id:'winter',name:'冬天',icon:'❄️',description:'寒冬結冰！整個冬季維持 1 格冰凍，不會逐日增加。冰凍格不能放置物品，相鄰的過熱格及暴風雪都不會使它融化，換季後解除。'}
];
function seasonIndex(d=day){if(d>0&&typeof activeRunMode==='function'&&activeRunMode()==='eternal_winter')return 3;return d>0?Math.floor((d-1)/3)%4:0;}
function seasonDay(d=day){return d>0?(d-1)%3+1:1;}
function baseWorkshopHeatSteps(){return seasonIndex()===1?60:50;}
function hotSteps(){const cb=typeof contractBonuses==='function'?contractBonuses():{forgeHeatDelta:0};const base=Math.max(5,baseWorkshopHeatSteps()-10*Math.max(0,Math.min(3,sk('cd')))-medalBonuses().forgeHeatReduce-(cb.forgeHeatDelta||0));return typeof isWorkshopFever==='function'&&isWorkshopFever('forge')?Math.max(3,Math.ceil(base/2)):base;}
function workshopHeatStyle(remaining){return '--heat-opacity:'+Math.min(1,.24+.76*remaining/baseWorkshopHeatSteps()).toFixed(2)+';';}
function cellBlock(i){return blueprintSlotAt(i)?'這是傳說藍圖格，請放入指定武器':frozen.has(i)?'這格已冰凍，換季後才能放置物品':leaves.has(i)?'這格有落葉，需要相鄰過熱格將它燒掉':'';}
function seasonEffect(i,type){
  const effect={type,start:Date.now(),duration:type==='burning'?800:900};
  const current=seasonEffects;current.set(i,effect);
  gameTimeout(()=>{if(seasonEffects===current&&current.get(i)===effect){current.delete(i);render();}},effect.duration+30);
}
function seasonCellHTML(i){
  const effect=seasonEffects.get(i),elapsed=effect?Date.now()-effect.start:0;
  const valid=effect&&elapsed<effect.duration;
  if(valid&&effect.type==='burning')return '<span class="season-cell burning" style="animation-delay:-'+elapsed+'ms">'+autumnLeafArt()+'<img alt="" src="'+UNITY_ART.fire0+'"></span>';
  if(frozen.has(i))return '<span class="season-cell ice" aria-label="冰凍格">❄</span>';
  if(leaves.has(i))return '<span class="season-cell leaf'+(valid?' falling':'')+'"'+(valid?' style="animation-delay:-'+elapsed+'ms"':'')+' aria-label="落葉格">'+autumnLeafArt()+'</span>';
  return '';
}
function burnLeaves(){
 let burned=0;for(const i of [...leaves])if(nb(i).some(j=>heat[j]>0)){leaves.delete(i);seasonEffect(i,'burning');burned++;}
 if(burned)recordFestival('burn',null,burned);
 if(day>0&&seasonIndex()===2&&burned){autumnForgeCharges=Math.min(3,autumnForgeCharges+burned);toast('🍂 落葉餘燼 ×'+autumnForgeCharges+'：接下來每把鍛造 +100 金幣（當天有效）');}
}
function addSeasonCells(target,count,type,animate=true){
  const candidates=[];for(let i=0;i<W*H;i++)if(!g[i]&&!leaves.has(i)&&!frozen.has(i)&&!blueprintSlotAt(i))candidates.push(i);
  while(count>0&&candidates.length){const i=candidates.splice(rnd(candidates.length),1)[0];target.add(i);if(animate&&type==='leaf')seasonEffect(i,'falling');count--;}
}
function normalizeWinterCells(animate=true){
 if(seasonIndex()!==3)return;
 const cap=(typeof activeRunMode==='function'&&activeRunMode()==='eternal_winter')?2:1;
 frozen=new Set([...frozen].filter(i=>Number.isInteger(i)&&i>=0&&i<W*H&&!g[i]&&!blueprintSlotAt(i)).slice(0,cap));
 addSeasonCells(frozen,Math.max(0,cap-frozen.size),'ice',animate);
}
function openHandBag(){if(hand!==null||busy||drag)return;openP('bagP');}
function prepareSeasonDay(previousDay){
  seasonEffects=new Map();autumnForgeCharges=0;
  if(day<1){leaves=new Set();frozen=new Set();seasonNoticePending=false;return;}
  const changed=previousDay<1||seasonIndex(previousDay)!==seasonIndex();
  if(changed){leaves=new Set();frozen=new Set();}
  if(seasonIndex()===2)addSeasonCells(leaves,3,'leaf');
  normalizeWinterCells();
  if(typeof syncWorkshopMomentumDay==='function')syncWorkshopMomentumDay(changed);
  seasonNoticePending=changed;
}
function showSeasonNotice(){
  if(day<1)return;const s=SEASONS[seasonIndex()];
  renderFestivalNotice();$('seasonTitle').textContent=s.icon+' '+s.name+'來了！';
  $('seasonDescription').textContent=s.description;
  $('seasonBenefit').textContent='季節好處 · '+seasonBenefitText()+(seasonIndex()===2?' 目前餘燼：'+autumnForgeCharges+' 次。':'');
  $('seasonP').querySelector('button:not(.modal-x)').textContent='知道了';
  $('seasonP').style.display='flex';seasonNoticePending=false;
}
function showPendingSeasonNotice(){if(seasonNoticePending&&$('title').style.display==='none')showSeasonNotice();}
