
const KITCHEN_PREP_ART={"0-0":"assets/prepared/0-0.f0f3a8b1c337.webp","0-1":"assets/prepared/0-1.7774b3543bd5.webp","0-2":"assets/prepared/0-2.a6dc53e38445.webp","0-3":"assets/prepared/0-3.948b1ee64247.webp","0-4":"assets/prepared/0-4.92ec1bb49f0f.webp","1-0":"assets/prepared/1-0.50b8cafb33c5.webp","1-1":"assets/prepared/1-1.f08e5a07f395.webp","1-2":"assets/prepared/1-2.8b857bd785b4.webp","1-3":"assets/prepared/1-3.99e8866e9554.webp","1-4":"assets/prepared/1-4.a9446b8f082a.webp","2-0":"assets/prepared/2-0.a652c2a86125.webp","2-1":"assets/prepared/2-1.98e490de971f.webp","2-2":"assets/prepared/2-2.6782859e5e67.webp","2-3":"assets/prepared/2-3.26904435b85f.webp","2-4":"assets/prepared/2-4.1dacb206cb0a.webp"};
const kitchenMergeQueue=[],kitchenMergeJobs=new Set();let kitchenMergeEpoch=0,kitchenGuestSerial=0;
const KITCHEN_WASTE_FEE=50;
function kitchenShelfLife(w){return ({o:14,p:24,w:32}[w?.k]||0)+6*kitchenLevel('fresh');}
function kitchenFreshen(w){if(!w||!['o','p','w'].includes(w.k))return w;w.fresh=kitchenShelfLife(w);w.born=kitchen.turn+1;return w;}
function kitchenEnsureFresh(w){if(w&&['o','p','w'].includes(w.k)&&!Number.isFinite(w.fresh))kitchenFreshen(w);return w;}
function kitchenWasteArt(){return kitchenSVG('<path fill="#30372e" d="M10 24h44v29H10z"/><path fill="#7c7758" d="M13 26h38v24H13z"/><path fill="#b2a277" d="M15 28h34v5H15z"/><path fill="#52613b" d="M18 23h13v15H18zM36 25h11v15H36z"/><path fill="#897345" d="M26 22h13v17H26z"/><path fill="#a18a54" d="M20 29h7v5h-7zM34 29h7v6h-7z"/><path fill="#c4c6a1" d="M22 24h4v3h-4zM38 27h4v3h-4z"/><path fill="#9baf8a" d="M23 13h3v6h-3zM33 9h3v8h-3zM41 15h3v5h-3z"/><path fill="#443f30" d="M16 43h32v4H16z"/>');}
function kitchenFridgeArt(){return '<svg viewBox="0 0 48 56" shape-rendering="crispEdges" aria-hidden="true"><path fill="#263f43" d="M7 3h34v48H7zM10 51h5v3h-5zM34 51h5v3h-5z"/><path fill="#a6c6c7" d="M9 5h30v43H9z"/><path fill="#e3efe3" d="M11 7h26v15H11zM11 25h26v20H11z"/><path fill="#c1dcda" d="M13 9h3v11h-3zM13 27h3v16h-3z"/><path fill="#718f92" d="M30 12h3v7h-3zM30 29h3v10h-3zM10 22h28v3H10z"/><path fill="#6faeb9" d="M21 11h2v8h-2zM18 14h8v2h-8zM19 12h2v2h-2zM23 16h2v2h-2z"/></svg>';}
function kitchenWastePrompt(i){if(kitchen.g[i]?.k!=='waste')return; kitchenModal('♻ 廚餘清理','<div class="kitchen-waste-preview">'+kitchenWasteArt()+'</div><p>食物已超過保鮮期，不能再使用或出餐。</p><p>每格清理費用為 <b>'+kitchenWasteFee()+' 金幣</b>，清理會推進一步。</p><p>前三天每格15金幣，第4–6天30金幣，之後50金幣。每天回收首份備料或料理廚餘可得一包堆肥。請珍惜食物，適量備料，及時出餐；料理可放進冰箱暫停保鮮倒數。</p><button class="pri kitchen-wide" onclick="clearKitchenWaste('+i+')">花費 '+kitchenWasteFee()+' 金幣清理</button>');}
function kitchenPayWasteFee(){if(sandboxSession)return true;if(coins<kitchenWasteFee()){toast('金幣不足，清理一格廚餘需要 '+kitchenWasteFee()+' 金幣。');return false;}coins-=kitchenWasteFee();return true;}
function clearKitchenWaste(i){
 if(!expandedGameEnabled()||!kitchen||kitchen.g[i]?.k!=='waste')return false;
 if(!kitchenPayWasteFee())return false;
 const compost=earnKitchenCompost(kitchen.g[i]);clearKitchenMerges();kitchen.g[i]=null;$('kitchenModal').hidden=true;kitchen.message='廚餘已清理。請愛護食物，適量備料、及時出餐。';if(compost)kitchen.message+=' 已回收一包溫室堆肥。';if(!kitchen.done)kitchenStep();renderKitchen();return true;
}
function kitchenTickFreshness(){
 const expired=[];kitchen.g.forEach((w,i)=>{if(!w||!['o','p','w'].includes(w.k))return;kitchenEnsureFresh(w);if(w.born<kitchen.turn&&w.fresh>0)w.fresh--;if(w.fresh<=0){expired.push(i);kitchen.g[i]={k:'waste',fromKind:w.k,fromName:kitchenItemName(w)};}});
 if(expired.length){reviewMetrics.spoiled+=expired.length;kitchen.message+=' '+expired.length+' 份食物腐壞成廚餘；請珍惜食物，清理每格需 '+kitchenWasteFee()+' 金幣。';toast('食物腐壞了！請愛護食物，適量備料並善用冰箱。');}
}
function kitchenCreateOrders(){
 kitchenGuestSerial22=0;const total=day<=3?day+2:5+rnd(4),candidates=Array.from({length:total},(_,i)=>i),generics=new Set();for(let i=0;i<Math.min(2,total);i++)generics.add(candidates.splice(rnd(candidates.length),1)[0]);
 const counts=[0,0,0,0,0],caps=[Infinity,Infinity,3,2,1],list=Array.from({length:total},(_,i)=>{const o=kitchenOrder(generics.has(i));while(o.t>0&&counts[o.t]>=caps[o.t])o.t--;counts[o.t]++;o.max=o.wait=kitchenOrderPatience(o.t);return o;});
 kitchen.total=total;kitchen.orders=list.splice(0,3);kitchen.queue=list;kitchen.orders.forEach((o,i)=>{o.slot=i;o.enteredAt=Date.now()+i*90;});
}
function kitchenOrderPatience(t){return 100+60*t+8*kitchenLevel('patience')-(kitchen.challenge===0&&day>3?10:0);}
function kitchenEntryStyle(o){const elapsed=Date.now()-(o.enteredAt||0);return 'grid-column:'+((o.slot??0)+1)+';'+(elapsed<480&&!lowEffects?'animation:kitchen-guest-enter 480ms cubic-bezier(.2,.8,.3,1) both;animation-delay:'+(-elapsed)+'ms;':'');}
function kitchenRecordMerge(cells,parts,dest,target=dest[0]){
 if(!expandedGameEnabled()||$('kitchenP').hidden||lowEffects||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
 const rects=cells.map(i=>$('kitchenGrid').children[i]?.getBoundingClientRect());if(rects.some(r=>!r?.width))return;
 kitchenMergeQueue.push({target,center:$('kitchenGrid').children[target]?.getBoundingClientRect(),cells:cells.slice(),parts:parts.map(w=>({...w})),rects:rects.map(r=>({left:r.left,top:r.top,width:r.width,height:r.height})),dest:dest.map(i=>({index:i,item:kitchen.g[i],rect:$('kitchenGrid').children[i].getBoundingClientRect()}))});
}
function clearKitchenMerges(){kitchenMergeEpoch++;kitchenMergeQueue.length=0;for(const job of [...kitchenMergeJobs]){job.cancelled=true;for(const n of job.nodes){n.animation?.cancel?.();n.remove();}}kitchenMergeJobs.clear();syncKitchenFlightTargets();}
function kitchenMergeNode(w,rect,job){const n=document.createElement('div');n.className='kitchen-merge-flight';n.setAttribute('aria-hidden','true');n.innerHTML=kitchenArt(w);n.style.cssText='left:'+rect.left+'px;top:'+rect.top+'px;width:'+rect.width+'px;height:'+rect.height+'px;';document.body.appendChild(n);job.nodes.push(n);return n;}
function kitchenAnimateNode(n,frames,options){return new Promise(resolve=>{if(!n.animate){resolve();return;}n.animation=n.animate(frames,options);n.animation.onfinish=resolve;n.animation.oncancel=resolve;});}
function playKitchenMerges(launch=null,placed=-1){
 if(!kitchenMergeQueue.length)return false;const batches=kitchenMergeQueue.splice(0);
 if(lowEffects||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||$('kitchenP').hidden)return false;
 clearKitchenIngredientFlights();const job={nodes:[],outputs:batches.flatMap(b=>b.dest),cancelled:false,epoch:kitchenMergeEpoch};kitchenMergeJobs.add(job);syncKitchenFlightTargets();
 (async()=>{try{for(let bi=0;bi<batches.length;bi++){
  if(job.cancelled||job.epoch!==kitchenMergeEpoch)break;const b=batches[bi],cx=b.center.left+b.center.width/2,cy=b.center.top+b.center.height/2;
  const inputs=b.parts.map((w,k)=>{let rect=b.rects[k];if(bi===0&&b.cells[k]===placed&&launch?.rect)rect=launch.rect;const n=kitchenMergeNode(w,rect,job),dx=cx-rect.left-rect.width/2,dy=cy-rect.top-rect.height/2;return {n,rect,dx,dy};});
  await Promise.all(inputs.map(({n,dx,dy})=>kitchenAnimateNode(n,[{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate('+dx+'px,'+dy+'px) scale(.22)',opacity:.35}],{duration:300,easing:'cubic-bezier(.35,.05,.65,1)',fill:'forwards'})));inputs.forEach(({n})=>n.remove());
  if(job.cancelled||job.epoch!==kitchenMergeEpoch)break;
  await Promise.all(b.dest.map(d=>{const r=d.rect,n=kitchenMergeNode(d.item,r,job),dx=cx-r.left-r.width/2,dy=cy-r.top-r.height/2;return kitchenAnimateNode(n,[{transform:'translate('+dx+'px,'+dy+'px) scale(.25)',opacity:.2,filter:'brightness(1.8)'},{transform:'translate('+dx+'px,'+(dy-10)+'px) scale(1.1)',opacity:1,filter:'brightness(1.2)',offset:.42},{transform:'translate(0,0) scale(1)',opacity:1,filter:'brightness(1)'}],{duration:330,easing:'cubic-bezier(.2,.7,.35,1)',fill:'forwards'}).then(()=>n.remove());}));
 }}finally{job.nodes.forEach(n=>n.remove());kitchenMergeJobs.delete(job);syncKitchenFlightTargets();}})();return true;
}

function kitchenTriples(at,board=kitchen.g){
 const remaining=board.slice(),result=[],starts=[at,...board.map((_,i)=>i)];
 for(const start of starts){
  if(remaining[start]?.k!=='p')continue;const path=forgePath(start,remaining);if(!path)continue;
  // Match embryo forging: ABC, BCD, CDE are three recipes on a five-cell chain.
  // A fork is never treated as one chain. Claim each chain's inputs once, but
  // take every recipe from the original material snapshot before writing dishes.
  path.forEach(i=>remaining[i]=null);
  for(let k=0;k<path.length-2;k++){const cells=path.slice(k,k+3),middle=cells[1];result.push({cells,middle,path,target:path.length===3?start:middle});}
 }if(result.length>1)result.forEach(t=>t.target=t.middle);return result;
}
