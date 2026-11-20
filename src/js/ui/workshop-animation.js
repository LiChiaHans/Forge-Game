const workshopMergeJobs=new Set(),WORKSHOP_MERGE_TIME={gather:260,drop:210,pause:40};
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
function playWorkshopToolFX(boardId,kind,opts={}){
 workshopToolSound(kind);
 const board=$(boardId);
 if(!board||typeof board.getBoundingClientRect!=='function')return;
 const rect=board.getBoundingClientRect();
 if(!rect||rect.width<=0||rect.height<=0)return;
 const reduced=!!lowEffects||!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const layer=document.createElement('div');
 layer.className='wfx-layer is-'+kind+(reduced?' is-reduced':'');
 layer.setAttribute('aria-hidden','true');
 layer.style.left=rect.left+'px';layer.style.top=rect.top+'px';
 layer.style.width=rect.width+'px';layer.style.height=rect.height+'px';
 if(opts.color)layer.style.setProperty('--wfx-color',opts.color);
 const cellPos=idx=>({x:((idx%5)+.5)*20,y:(Math.floor(idx/5)+.5)*(100/6)});
 let html='',dur=reduced?280:760;
 if(kind==='blizzard'||kind==='icebucket'){
  dur=reduced?280:kind==='blizzard'?960:860;
  const flakes=Array.from({length:reduced?6:18},(_,k)=>{
   const x=(7+(k*29)%86).toFixed(1),y=(5+(k*19)%86).toFixed(1),d=(k%6*55)+'ms',sz=(12+(k%3)*5)+'px';
   return '<span class="wfx-flake" style="left:'+x+'%;top:'+y+'%;font-size:'+sz+';animation-delay:'+d+'">'+(kind==='blizzard'?(k%3?'❄':'✦'):(k%2?'💧':'❄'))+'</span>';
  }).join('');
  const streaks=reduced?'':Array.from({length:8},(_,k)=>'<i class="wfx-gust" style="top:'+(8+k*11.5)+'%;animation-delay:'+(k*48)+'ms"></i>').join('');
  const quenches=(opts.cells||[]).slice(0,30).map((idx,k)=>{
   const p=cellPos(idx);
   return '<span class="wfx-quench" style="left:'+p.x.toFixed(2)+'%;top:'+p.y.toFixed(2)+'%;animation-delay:'+(90+(k%6)*38)+'ms"><i></i><b>❄</b></span>';
  }).join('');
  html='<div class="wfx-frost-veil"></div><div class="wfx-gusts">'+streaks+'</div>'+flakes+quenches;
  if(!reduced){board.classList.remove('wfx-chill');void board.offsetWidth;board.classList.add('wfx-chill');setTimeout(()=>board.classList.remove('wfx-chill'),480);}
 }else if(kind==='burn'){
  dur=reduced?280:720;
  const p=cellPos(opts.cell||0);
  const sparks=Array.from({length:reduced?4:12},(_,k)=>{
   const a=(k/12)*Math.PI*2+.2,dist=28+(k%3)*18,dx=(Math.cos(a)*dist).toFixed(1),dy=(Math.sin(a)*dist-18).toFixed(1);
   return '<i class="wfx-spark" style="--dx:'+dx+'px;--dy:'+dy+'px;animation-delay:'+(k%4*28)+'ms"></i>';
  }).join('');
  const flame='<svg class="wfx-flame-svg" viewBox="0 0 48 56" shape-rendering="crispEdges"><path fill="#d9381e" d="M22 4h5v8h5v6h6v12h4v12h-4v8H10v-8H6V30h4V18h6v-6h6z"/><path fill="#ff8d2b" d="M22 12h4v8h6v8h4v12h-4v6H16v-6h-4V28h4v-8h6z"/><path fill="#fff3ad" d="M21 24h6v6h4v10h-4v4h-6v-4h-4V30h4z"/></svg>';
  html='<div class="wfx-anchor" style="left:'+p.x.toFixed(2)+'%;top:'+p.y.toFixed(2)+'%">'
   +'<span class="wfx-ring is-burn"></span><span class="wfx-ring is-burn-outer"></span>'
   +flame+sparks+'</div>';
  if(!reduced){board.classList.remove('wfx-shake');void board.offsetWidth;board.classList.add('wfx-shake');setTimeout(()=>board.classList.remove('wfx-shake'),280);}
 }else if(kind==='clean'){
  dur=reduced?260:660;
  const p=cellPos(opts.cell||0);
  const bubbles=Array.from({length:reduced?4:10},(_,k)=>{
   const a=(k/10)*Math.PI*2,dist=24+(k%3)*14,dx=(Math.cos(a)*dist).toFixed(1),dy=(Math.sin(a)*dist-14).toFixed(1);
   return '<span class="wfx-bubble" style="--dx:'+dx+'px;--dy:'+dy+'px;animation-delay:'+(k%4*32)+'ms">'+(k%2?'✦':'○')+'</span>';
  }).join('');
  html='<div class="wfx-anchor" style="left:'+p.x.toFixed(2)+'%;top:'+p.y.toFixed(2)+'%">'
   +'<span class="wfx-ring is-clean"></span><span class="wfx-sweep"></span>'+bubbles+'</div>';
 }else if(kind==='upgrade'){
  dur=reduced?280:780;
  const p=cellPos(opts.cell||0);
  const arrows=Array.from({length:reduced?3:8},(_,k)=>{
   const dx=((k-3.5)*11).toFixed(1),d=(k%4*45)+'ms';
   return '<span class="wfx-rise" style="--dx:'+dx+'px;animation-delay:'+d+'">'+(k%2?'▲':'✦')+'</span>';
  }).join('');
  html='<div class="wfx-anchor" style="left:'+p.x.toFixed(2)+'%;top:'+p.y.toFixed(2)+'%">'
   +'<span class="wfx-pillar"></span><span class="wfx-ring is-upgrade"></span><span class="wfx-ring is-upgrade-2"></span>'+arrows+'</div>';
 }else if(kind==='heal'){
  dur=reduced?280:860;
  const hearts=Array.from({length:reduced?4:10},(_,k)=>{
   const x=(12+(k*19)%76).toFixed(1),y=(24+(k*23)%56).toFixed(1),d=(k%5*55)+'ms';
   return '<span class="wfx-heart" style="left:'+x+'%;top:'+y+'%;animation-delay:'+d+'">'+(k%3?'♥':'✦')+'</span>';
  }).join('');
  html='<div class="wfx-heal-veil"></div>'+hearts;
  const lv=$('lv');
  if(!reduced&&lv){lv.classList.remove('wfx-heart-pop');void lv.offsetWidth;lv.classList.add('wfx-heart-pop');setTimeout(()=>lv.classList.remove('wfx-heart-pop'),620);}
 }else if(kind==='essence'||kind==='spice'){
  dur=reduced?260:720;
  const p=cellPos(opts.cell||0);
  const motes=Array.from({length:reduced?4:10},(_,k)=>{
   const a=(k/10)*Math.PI*2,dist=26+(k%3)*13,dx=(Math.cos(a)*dist).toFixed(1),dy=(Math.sin(a)*dist-10).toFixed(1);
   return '<span class="wfx-mote" style="--dx:'+dx+'px;--dy:'+dy+'px;animation-delay:'+(k%4*32)+'ms">✦</span>';
  }).join('');
  html='<div class="wfx-anchor" style="left:'+p.x.toFixed(2)+'%;top:'+p.y.toFixed(2)+'%">'
   +'<span class="wfx-ring is-sigil"></span><span class="wfx-core-flash"></span>'+motes+'</div>';
 }
 layer.innerHTML=html;
 document.body.appendChild(layer);
 setTimeout(()=>layer.remove(),dur);
}
