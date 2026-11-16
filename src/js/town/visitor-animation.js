
const townVisitorAnimations=new Set();
function renderTownVisitors(){return expandedGameEnabled()?preview_renderTownVisitors(...arguments):stable_renderTownVisitors(...arguments);}
function stable_renderTownVisitors(remaining){
 const el=$('townQueue'),key=runId+':'+day;
 if(el.dataset.visitors===key&&el.dataset.remaining===String(remaining))return;
 if(el.dataset.visitors===key&&remaining<Number(el.dataset.remaining)){
  [...el.querySelectorAll('.town-visitor')].slice(0,Number(el.dataset.remaining)-remaining).forEach(n=>{(n.getAnimations?.()||[]).forEach(a=>{a.cancel();townVisitorAnimations.delete(a)});n.remove()});el.dataset.remaining=String(remaining);return;
 }
 townVisitorAnimations.forEach(a=>a.cancel?.());townVisitorAnimations.clear();el.dataset.visitors=key;el.dataset.remaining=String(remaining);
 el.innerHTML=Array.from({length:remaining},(_,i)=>{
  const col=['#b85653','#4e8191','#a88c4c','#716891'][i%4],x=248+(i%4)*15,y=327+Math.floor(i/4)*24;
  return `<span class="town-visitor" style="left:${x/360*100}%;top:${y/620*100}%" data-guest="${i}" aria-label="排隊客人 ${i+1}"><svg viewBox="0 0 16 26" shape-rendering="crispEdges" aria-hidden="true"><ellipse cx="8" cy="24" rx="8" ry="2" fill="#24382b" opacity=".3"/><path fill="#26343c" d="M4 20h4v5H4zM9 20h4v5H9z"/><path fill="${col}" d="M4 11h8v3h3v7H2v-7h2z"/><path fill="#e0b586" d="M4 3h8v8H4zM1 14h2v5H1zM14 14h2v5h-2z"/><path fill="#55433b" d="M3 1h10v4H3zM3 5h2v3H3z"/><path fill="#26343c" d="M6 6h1v2H6zM10 6h1v2h-1z"/></svg></span>`;
 }).join('');
 const rect=$('townMap').getBoundingClientRect(),sx=(rect.width||360)/360,sy=(rect.height||620)/620;
 [...el.querySelectorAll('.town-visitor')].forEach((n,i)=>{
  const x=248+(i%4)*15,y=327+Math.floor(i/4)*24,route=[[188,650],[188,535],[188,471],[236,451],[256,403],[236,355],[x,y]];
  const frames=route.map(([px,py],k)=>({transform:`translate3d(${(px-x)*sx}px,${(py-y)*sy}px,0)`,offset:[0,.25,.43,.6,.74,.87,1][k]}));
  const a=n.animate(frames,{duration:4700+i*110,delay:i*300,easing:'linear',fill:'backwards'});townVisitorAnimations.add(a);n.classList.add('arriving');
  a.onfinish=()=>{n.classList.remove('arriving');townVisitorAnimations.delete(a)};
  if(townMotionPaused)a.pause?.();
 });
}
function preview_renderTownVisitors(remaining){
 const el=$('townQueue'),key=runId+':'+day+':'+isSandboxNight();
 if(el.dataset.visitors===key&&el.dataset.remaining===String(remaining))return;
 const rect=$('townMap').getBoundingClientRect(),sx=(rect.width||360)/360,sy=(rect.height||620)/620,previous=new Map();
 if(el.dataset.visitors===key)for(const n of el.querySelectorAll('.town-visitor')){const r=n.getBoundingClientRect();previous.set(n.dataset.visitorId,[(r.left+r.width/2-rect.left)/sx,(r.bottom-rect.top)/sy]);}
 townVisitorAnimations.forEach(a=>a.cancel?.());townVisitorAnimations.clear();el.dataset.visitors=key;el.dataset.remaining=String(remaining);
 el.innerHTML=Array.from({length:remaining},(_,i)=>{
  const guest=townGuestIdentity(i),[x,y]=kitchenTownGuestPoint(i);
  return '<span class="town-visitor" style="left:'+x/360*100+'%;top:'+y/620*100+'%" data-guest-feet="true" data-visitor-id="'+guest.id+'" data-guest="'+i+'" data-guest-role="'+guest.role+'" data-guest-gender="'+guest.gender+'" aria-label="排隊客人 '+(i+1)+' · '+guest.gender+guest.role+'">'+townGuestArt(guest.id)+'</span>';
 }).join('');
 if(lowEffects||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
 [...el.querySelectorAll('.town-visitor')].forEach((n,i)=>{
  const [x,y]=kitchenTownGuestPoint(i),prior=previous.get(n.dataset.visitorId),route=prior?[prior,[x,y]]:townGuestRoute(i);let length=0;const distances=route.map((point,k)=>{if(k)length+=Math.hypot(point[0]-route[k-1][0],point[1]-route[k-1][1]);return length;});if(length<1)return;
  const frames=route.map(([px,py],k)=>({transform:`translate3d(${(px-x)*sx}px,${(py-y)*sy}px,0)`,offset:distances[k]/length}));
  const a=n.animate(frames,{duration:prior?500:Math.min(8000,Math.max(3800,length*9))+i*70,delay:prior?0:i*300,easing:'linear',fill:'backwards'});townVisitorAnimations.add(a);n.classList.add('arriving');
  a.onfinish=()=>{n.classList.remove('arriving');townVisitorAnimations.delete(a)};
  if(townMotionPaused)a.pause?.();
 });
}
