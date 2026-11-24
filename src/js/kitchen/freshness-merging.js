
const kitchenMergeQueue=[],kitchenMergeJobs=new Set();let kitchenMergeEpoch=0,kitchenGuestSerial=0;
const KITCHEN_WASTE_FEE=50;
const KITCHEN_FRESH_WARNING_STEPS=10;
function kitchenShelfLife(w){const extra=typeof contractBonuses==='function'?(contractBonuses().kitchenFreshBonus||0):0;return w?.k==='w'?32+6*kitchenLevel('fresh')+medalBonuses().dishFreshBonus+extra:0;}
function kitchenFreshen(w){if(!w)return w;if(w.k==='o'||w.k==='p'){delete w.fresh;delete w.born;}else if(w.k==='w'){w.fresh=kitchenShelfLife(w);w.born=kitchen.turn+1;}return w;}
function kitchenEnsureFresh(w){if(w?.k==='o'||w?.k==='p')return kitchenFreshen(w);if(w?.k==='w'&&!Number.isFinite(w.fresh))kitchenFreshen(w);return w;}
function kitchenWasteArt(){return gardenWasteSVG();}
function kitchenFridgeArt(){return '<svg viewBox="0 0 48 56" shape-rendering="crispEdges" aria-hidden="true"><path fill="#263f43" d="M7 3h34v48H7zM10 51h5v3h-5zM34 51h5v3h-5z"/><path fill="#a6c6c7" d="M9 5h30v43H9z"/><path fill="#e3efe3" d="M11 7h26v15H11zM11 25h26v20H11z"/><path fill="#c1dcda" d="M13 9h3v11h-3zM13 27h3v16h-3z"/><path fill="#718f92" d="M30 12h3v7h-3zM30 29h3v10h-3zM10 22h28v3H10z"/><path fill="#6faeb9" d="M21 11h2v8h-2zM18 14h8v2h-8zM19 12h2v2h-2zM23 16h2v2h-2z"/></svg>';}
function kitchenWastePrompt(i){if(kitchen.g[i]?.k!=='waste')return; kitchenModal('♻ 廚餘清理','<div class="kitchen-waste-preview">'+kitchenWasteArt()+'</div><p>食物已超過保鮮期，不能再使用或出餐。</p><p>每格清理費用為 <b>'+kitchenWasteFee()+' 金幣</b>，清理會推進一步。</p><p>前三天每格15金幣，第4–6天30金幣，之後50金幣。每天回收首份料理廚餘可得一包堆肥。請珍惜食物，適量備料，及時出餐；料理可放進冰箱暫停保鮮倒數。</p><button class="pri kitchen-wide" onclick="clearKitchenWaste('+i+')">花費 '+kitchenWasteFee()+' 金幣清理</button>');}
function kitchenPayWasteFee(){if(sandboxSession)return true;if(coins<kitchenWasteFee()){toast('金幣不足，清理一格廚餘需要 '+kitchenWasteFee()+' 金幣。');return false;}coins-=kitchenWasteFee();return true;}
function clearKitchenWaste(i){
 if(!expandedGameEnabled()||!kitchen||kitchen.g[i]?.k!=='waste')return false;
 if(!kitchenPayWasteFee())return false;
 const compost=earnKitchenCompost(kitchen.g[i]);clearKitchenMerges();kitchen.g[i]=null;$('kitchenModal').hidden=true;kitchen.message='廚餘已清理。請愛護食物，適量備料、及時出餐。';if(compost)kitchen.message+=' 已回收一包溫室堆肥。';if(!kitchen.done)kitchenStep();renderKitchen();return true;
}
function kitchenTickFreshness(){
 let expiring=0;
 const expired=[],tick=(w,replace)=>{
  if(!w)return;
  kitchenEnsureFresh(w);
  if(w.k!=='w')return;
  if(w.born<kitchen.turn&&w.fresh>0){
   w.fresh--;
   if(w.fresh===KITCHEN_FRESH_WARNING_STEPS)expiring++;
  }
  if(w.fresh<=0){expired.push(w);replace({k:'waste',fromKind:'w',fromName:kitchenItemName(w)});}
 };
 kitchen.g.forEach((w,i)=>tick(w,v=>kitchen.g[i]=v));tick(kitchen.hand,v=>kitchen.hand=v);
 if(expiring){
  const warning=expiring+' 份料理只剩 '+KITCHEN_FRESH_WARNING_STEPS+' 步保鮮，記得放進冰箱或趕快出餐。';
  kitchen.message+=' '+warning;
  toast('⏳ '+warning);
 }
 if(expired.length){reviewMetrics.spoiled+=expired.length;kitchen.message+=' '+expired.length+' 份食物腐壞成廚餘；請珍惜食物，清理每格需 '+kitchenWasteFee()+' 金幣。';toast('食物腐壞了！請愛護食物，適量備料並善用冰箱。');}
}
function kitchenCreateOrders(){
 kitchenGuestSerial22=0;const total=day<=3?day+2:5+rnd(4),candidates=Array.from({length:total},(_,i)=>i),generics=new Set();for(let i=0;i<Math.min(2,total);i++)generics.add(candidates.splice(rnd(candidates.length),1)[0]);
 const counts=[0,0,0,0,0],caps=[Infinity,Infinity,3,2,1],list=Array.from({length:total},(_,i)=>{const o=kitchenOrder(generics.has(i));while(o.t>0&&counts[o.t]>=caps[o.t])o.t--;counts[o.t]++;o.max=o.wait=kitchenOrderPatience(o.t);return o;});
 assignKitchenStatOrder(list);kitchen.total=total;kitchen.orders=list.splice(0,3);kitchen.queue=list;kitchen.orders.forEach((o,i)=>{o.slot=i;o.enteredAt=Date.now()+i*90;});
}
function kitchenOrderPatience(t){const fp=typeof landmarkBonuses==='function'?(landmarkBonuses().fountainPatience||0):0;return 100+60*t+8*kitchenLevel('patience')+medalBonuses().kitchenPatienceBonus+fp-(kitchen.challenge===0&&day>3?10:0);}
function kitchenEntryStyle(o){const elapsed=Date.now()-(o.enteredAt||0);return 'grid-column:'+((o.slot??0)+1)+';'+(elapsed<480&&!lowEffects?'animation:kitchen-guest-enter 480ms cubic-bezier(.2,.8,.3,1) both;animation-delay:'+(-elapsed)+'ms;':'');}
function kitchenRecordMerge(cells,parts,dest,target=dest[0]){
 if(!expandedGameEnabled()||$('kitchenP').hidden)return;
 const rects=cells.map(i=>$('kitchenGrid').children[i]?.getBoundingClientRect());if(rects.some(r=>!r?.width))return;
 kitchenMergeQueue.push({target,center:$('kitchenGrid').children[target]?.getBoundingClientRect(),cells:cells.slice(),parts:parts.map(w=>({...w})),rects:rects.map(r=>({left:r.left,top:r.top,width:r.width,height:r.height})),dest:dest.map(i=>({index:i,item:kitchen.g[i],rect:$('kitchenGrid').children[i].getBoundingClientRect()}))});
}
function clearKitchenMerges(){kitchenMergeEpoch++;kitchenMergeQueue.length=0;for(const job of [...kitchenMergeJobs]){job.cancel();}kitchenMergeJobs.clear();syncKitchenFlightTargets();}
function playKitchenMerges(launch=null,placed=-1){
 if(!kitchenMergeQueue.length)return false;const batches=kitchenMergeQueue.splice(0);if($('kitchenP').hidden)return false;
 clearKitchenIngredientFlights();const events=batches.map(b=>({tg:b.target,from:b.cells.map((i,k)=>({i,h:kitchenArt(b.parts[k]),key:workshopItemKey(b.parts[k])})),to:b.dest.map(d=>d.index),res:Object.fromEntries(b.dest.map(d=>[d.index,kitchenArt(d.item)])),keys:Object.fromEntries(b.dest.map(d=>[d.index,workshopItemKey(d.item)]))}));
 const delay=launch&&batches[0].cells.includes(placed)&&flyKitchenIngredient(placed,launch)?270:0;
 const job=startWorkshopMerge('kitchen',events,delay);if(!job){workshopMergeSound('kitchen','complete');presentKitchenResults(batches.flatMap(b=>b.dest));return false;}job.outputs=batches.flatMap(b=>b.dest);kitchenMergeJobs.add(job);syncKitchenFlightTargets();job.promise.finally(()=>{if(!job.cancelled)presentKitchenResults(batches.flatMap(b=>b.dest));kitchenMergeJobs.delete(job);syncKitchenFlightTargets();});return true;
}
function kitchenTriples(at,board=kitchen.g){
 const remaining=board.slice(),result=[],starts=[at,...board.map((_,i)=>i)];
 for(const start of starts){
  if(remaining[start]?.k!=='p')continue;const path=forgePath(start,remaining);if(!path)continue;
  // Match embryo forging: ABC, BCD, CDE are three recipes on a five-cell chain.
  // A fork is never treated as one chain. Claim each chain's inputs once, but
  // take every recipe from the original material snapshot before writing dishes.
  path.forEach(i=>remaining[i]=null);
  for(let k=0;k<path.length-2;k++){const cells=path.slice(k,k+3),middle=cells[1];result.push({cells,middle,path,target:path.length===3&&path.includes(at)?at:middle});}
 }return result;
}
