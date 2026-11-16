
const kitchenIngredientFlights=new Set();
let kitchenIngredientFlightEpoch=0;
function clearKitchenIngredientFlights(){
 clearKitchenMerges();kitchenIngredientFlightEpoch++;for(const entry of [...kitchenIngredientFlights]){entry.animation?.cancel?.();entry.node.remove();}kitchenIngredientFlights.clear();syncKitchenFlightTargets();
}
function syncKitchenFlightTargets(){
 const cells=$('kitchenGrid').children;for(let i=0;i<cells.length;i++){const hidden=[...kitchenIngredientFlights].some(f=>f.index===i&&f.item&&kitchen?.g[i]===f.item)||[...kitchenMergeJobs].some(j=>j.outputs.some(d=>d.index===i&&kitchen?.g[i]===d.item));cells[i].classList.toggle('kitchen-flight-target',hidden);}syncWorkshopMergeMasks('kitchen');
}
function kitchenIngredientLaunch(i){
 if(!expandedGameEnabled()||!kitchen||kitchen.done||kitchen.g[i]||kitchen.heat[i])return null;const held=kitchen.useHeld?kitchen.hand:null;if(held&&held.k!=='o'||!held&&kitchen.mode==='prep')return null;const source=held?$('kitchenHand').querySelector('[data-kdrag="hand"]'):$('kitchenQueue').querySelector('.kitchen-next');return source?{item:held?{...held}:{k:'o',t:kitchen.q[0]},rect:source.getBoundingClientRect()}:null;
}
function kitchenDraggedIngredientLaunch(d,e){
 if(!d?.moved||!(d.kind==='ore'||d.kind==='hand'&&d.w.k==='o'))return null;
 return {item:{...d.w},rect:{left:e.clientX-30,top:e.clientY-30,width:60,height:60}};
}
function flyKitchenIngredient(i,launch){
 if(!expandedGameEnabled()||!kitchen||$('kitchenP').hidden||!launch||lowEffects||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return false;
 const dst=$('kitchenGrid').children[i],a=launch.rect,b=dst?.getBoundingClientRect();if(!b||a.width<=0||b.width<=0||!Number.isFinite(a.left+b.left))return false;
 while(kitchenIngredientFlights.size>=8){const oldest=kitchenIngredientFlights.values().next().value;oldest.animation?.cancel?.();oldest.node.remove();kitchenIngredientFlights.delete(oldest);}
 const size=Math.min(b.width,b.height)*.94,x=b.left+(b.width-size)/2,y=b.top+(b.height-size)/2,dx=x-a.left,dy=y-a.top,lift=Math.min(80,18+Math.hypot(dx,dy)*.2),node=document.createElement('div');
 node.className='kitchen-ingredient-flight';node.setAttribute('aria-hidden','true');node.innerHTML=kitchenArt(launch.item);node.style.cssText='left:'+a.left+'px;top:'+a.top+'px;width:'+a.width+'px;height:'+a.height+'px;';document.body.appendChild(node);
 const epoch=kitchenIngredientFlightEpoch,entry={node,index:i,item:kitchen.g[i],animation:null};kitchenIngredientFlights.add(entry);syncKitchenFlightTargets();
 const finish=(land=false)=>{node.remove();kitchenIngredientFlights.delete(entry);if(epoch!==kitchenIngredientFlightEpoch)return;syncKitchenFlightTargets();const cell=$('kitchenGrid').children[i];if(land&&kitchen?.g[i]===entry.item&&cell){cell.classList.remove('kitchen-ingredient-land');cell.classList.add('kitchen-ingredient-land');}};
 if(!node.animate){finish();return false;}
 entry.animation=node.animate([{width:a.width+'px',height:a.height+'px',transform:'translate(0,0) rotate(-6deg)',opacity:.9},{width:Math.max(size,a.width)*1.08+'px',height:Math.max(size,a.height)*1.08+'px',transform:'translate('+dx*.5+'px,'+(dy*.5-lift)+'px) rotate(5deg)',opacity:1,offset:.5},{width:size+'px',height:size+'px',transform:'translate('+dx+'px,'+dy+'px) rotate(0deg)',opacity:1}],{duration:Math.min(420,280+Math.hypot(dx,dy)*.18),easing:'cubic-bezier(.22,.65,.38,1)',fill:'forwards'});
 entry.animation.onfinish=()=>finish(true);entry.animation.oncancel=()=>finish();return true;
}