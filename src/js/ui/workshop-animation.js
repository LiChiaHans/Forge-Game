const workshopMergeJobs=new Set(),WORKSHOP_MERGE_TIME={gather:400,drop:320,pause:70};
function syncWorkshopMergeMasks(kind){
 const grid=$(kind==='forge'?'grid':'kitchenGrid');for(let i=0;i<grid.children.length;i++)grid.children[i].classList.toggle('workshop-merge-masked',[...workshopMergeJobs].some(j=>j.kind===kind&&j.mask.has(i)));
}
function cancelWorkshopMerges(kind){for(const job of [...workshopMergeJobs])if(!kind||job.kind===kind){job.cancel();if(job.kind==='forge')busy=false;}}
function workshopAnimationNode(html,rect,job,role){
 const node=document.createElement('div');node.className='workshop-merge-node '+role;node.setAttribute('aria-hidden','true');node.innerHTML=html;node.style.cssText='left:'+rect.left+'px;top:'+rect.top+'px;width:'+rect.width+'px;height:'+rect.height+'px;';document.body.appendChild(node);job.nodes.add(node);return node;
}
function workshopAnimate(node,frames,duration,job){return new Promise(resolve=>{
 if(job.cancelled){resolve();return;}const animation=node.animate(frames,{duration,easing:'cubic-bezier(.25,.65,.35,1)',fill:'forwards'});job.animations.add(animation);animation.onfinish=()=>{job.animations.delete(animation);resolve();};animation.oncancel=()=>{job.animations.delete(animation);resolve();};
});}
function workshopAnimationWait(ms,job){return new Promise(resolve=>{const wait={resolve,timer:null};wait.timer=setTimeout(()=>{job.waits.delete(wait);resolve();},ms);job.waits.add(wait);});}
function startWorkshopMerge(kind,events,delay=0,onLand=null){
 const grid=$(kind==='forge'?'grid':'kitchenGrid');if(!events.length||lowEffects||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||typeof grid.getAnimations!=='function'||typeof document.createElement('div').animate!=='function')return null;
 const touched=new Set(events.flatMap(e=>[...e.from.map(f=>f.i),...e.to])),rects=new Map([...touched].map(i=>[i,grid.children[i]?.getBoundingClientRect()]));if([...rects.values()].some(r=>!r?.width))return null;
 const job={kind,mask:touched,nodes:new Set(),animations:new Set(),waits:new Set(),cancelled:false,promise:null};workshopMergeJobs.add(job);grid.dataset.merging='true';grid.dataset.mergeCount=String(events.length);syncWorkshopMergeMasks(kind);
 const previews=new Map(),results=new Map(),lastUse=new Map(),firstOutput=new Map();events.forEach((e,k)=>{e.to.forEach(i=>{if(!firstOutput.has(i))firstOutput.set(i,k)});e.from.forEach(f=>lastUse.set(f.i+'|'+(f.key||''),k));});
 events.forEach((e,k)=>e.from.forEach(f=>{if(!previews.has(f.i)&&(!firstOutput.has(f.i)||k<=firstOutput.get(f.i))){previews.set(f.i,workshopAnimationNode(f.h,rects.get(f.i),job,'merge-preview'));}}));
 const cleanup=()=>{for(const wait of job.waits){clearTimeout(wait.timer);wait.resolve();}job.waits.clear();for(const a of [...job.animations])a.cancel();job.animations.clear();for(const n of job.nodes)n.remove();job.nodes.clear();workshopMergeJobs.delete(job);syncWorkshopMergeMasks(kind);if(![...workshopMergeJobs].some(j=>j.kind===kind)){delete grid.dataset.merging;delete grid.dataset.mergeStep;delete grid.dataset.mergePhase;}};
 job.cancel=()=>{job.cancelled=true;cleanup();};
 job.promise=(async()=>{try{
  if(delay)await workshopAnimationWait(delay,job);
  for(let k=0;k<events.length&&!job.cancelled;k++){
   const e=events[k],center=rects.get(e.tg),cx=center.left+center.width/2,cy=center.top+center.height/2;grid.dataset.mergeStep=String(k+1);grid.dataset.mergePhase='gather';workshopMergeSound(kind,'gather');
   const inputs=e.from.map(f=>{const old=results.get(f.i);if(old&&f.key&&old.key===f.key){old.node.remove();results.delete(f.i);if(!previews.has(f.i))previews.set(f.i,workshopAnimationNode(f.h,rects.get(f.i),job,'merge-preview'));}const rect=rects.get(f.i),node=workshopAnimationNode(f.h,rect,job,'merge-input');return {node,dx:cx-rect.left-rect.width/2,dy:cy-rect.top-rect.height/2};});
   await Promise.all(inputs.map(({node,dx,dy})=>workshopAnimate(node,[{transform:'translate(0,0) scale(1)',opacity:.38},{transform:'translate(0,-14px) scale(1.06)',opacity:.9,offset:.32},{transform:'translate('+dx+'px,'+(dy-12)+'px) scale(.8)',opacity:.9,offset:.82},{transform:'translate('+dx+'px,'+(dy-8)+'px) scale(.18)',opacity:0}],WORKSHOP_MERGE_TIME.gather,job)));inputs.forEach(({node})=>node.remove());
   if(job.cancelled)break;e.from.forEach(f=>{if(lastUse.get(f.i+'|'+(f.key||''))===k){previews.get(f.i)?.remove();previews.delete(f.i);}});grid.dataset.mergePhase='drop';
   await Promise.all(e.to.filter(i=>e.res[i]).map(i=>{results.get(i)?.node.remove();const node=workshopAnimationNode(e.res[i],rects.get(i),job,'merge-result');results.set(i,{node,key:e.keys?.[i]});return workshopAnimate(node,[{transform:'translateY(-12px) scale(.22)',opacity:0,filter:'brightness(1.8)'},{transform:'translateY(-15px) scale(1.1)',opacity:1,filter:'brightness(1.18)',offset:.5},{transform:'translateY(0) scale(1)',opacity:1,filter:'brightness(1)'}],WORKSHOP_MERGE_TIME.drop,job);}));
   if(job.cancelled)break;workshopMergeSound(kind,'complete');onLand?.(e);await workshopAnimationWait(WORKSHOP_MERGE_TIME.pause,job);
  }
 }finally{cleanup();}})();return job;
}
window.addEventListener('resize',()=>cancelWorkshopMerges('forge'));
