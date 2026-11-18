
const kitchenDepartures=new Set();
function clearKitchenDepartures(){clearWorkshopMilestone();for(const d of kitchenDepartures){d.animation?.cancel?.();d.node.remove();}kitchenDepartures.clear();}
function kitchenGuestExit(index){
 const card=$('kitchenOrders').querySelector('[data-ko="'+index+'"]'),ghost=card?.cloneNode?.(true);if(!ghost)return;
 const rect=card.getBoundingClientRect();if(!rect.width||!rect.height)return;
 ghost.removeAttribute?.('onclick');ghost.removeAttribute?.('data-ko');ghost.onclick=null;ghost.tabIndex=-1;ghost.inert=true;ghost.classList.add('kitchen-customer-exit');ghost.setAttribute('aria-hidden','true');
 ghost.style.cssText='position:fixed;left:'+rect.left+'px;top:'+rect.top+'px;width:'+rect.width+'px;height:'+rect.height+'px;margin:0;z-index:90;pointer-events:none;transform-origin:center center;';document.body.appendChild(ghost);
 const reduced=lowEffects||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,entry={node:ghost,animation:null};kitchenDepartures.add(entry);
 const finish=()=>{ghost.remove();kitchenDepartures.delete(entry);};
 if(ghost.animate){entry.animation=ghost.animate(reduced?[{opacity:1},{opacity:0}]:[{transform:'scale(1)',opacity:1},{transform:'scale(.65)',opacity:.8,offset:.45},{transform:'scale(.05)',opacity:0}],{duration:reduced?100:600,easing:'ease-in',fill:'forwards'});entry.animation.onfinish=finish;entry.animation.oncancel=finish;}else gameTimeout(finish,600);
 steps();
}
function kitchenRemoveOrder(index){
 if(!kitchen.orders[index])return;kitchenGuestExit(index);
 if(kitchen.queue.length){const slot=kitchen.orders[index].slot??index;kitchen.orders[index]=kitchen.queue.shift();kitchen.orders[index].slot=slot;kitchen.orders[index].enteredAt=Date.now()+420;}else kitchen.orders.splice(index,1);
}
function kitchenTownRoads(){return [
 {id:'north',w:22,p:[[188,355],[188,232],[105,162],[105,143]]},
 {id:'south',w:23,p:[[188,451],[188,620]]},
 {id:'archive',w:15,p:[[152,365],townMasterDoor('townArchive')]},
 {id:'kitchen',w:16,p:[[188,252],[224,228],townMasterDoor('townKitchen')]},
 {id:'forge',w:17,p:[[236,405],townMasterDoor('townForge')]},
 {id:'greenhouse',w:14,p:[[142,429],townMasterDoor('townGreenhouse')]},
 {id:'decor',w:15,p:[[188,574],[152,601],townMasterDoor('townDecorShop')]},
 {id:'training',w:15,p:[[188,574],[225,604],townMasterDoor('townTraining')]}
];}
function kitchenTownGuestPoint(i,night=isSandboxNight()){
 if(expandedGameEnabled())return geminiTownGuestPoint(i,night);const line=night?[[264,224],[246,229],[228,234],[208,246],[188,264],[188,286],[188,308],[188,330]]:[[264,440],[246,450],[226,462],[205,475],[188,493],[188,514],[188,535],[188,556]];
 return i<line.length?line[i]:[174+(i%2)*22,500+Math.floor((i-8)/2)*20];
}
function kitchenSnapshotPlazaSVG(svg){return isSandboxNight()?svg.replace('<svg ','<svg style="filter:brightness(.66) saturate(.76)" '):svg;}
function kitchenSnapshotDecorSVG(svg,d){return isSandboxNight()&&d.art==='fountain'&&!svg.includes('data-night-palette="3"')?svg.replace('<svg ','<svg style="filter:brightness(.58) saturate(.8)" '):svg;}