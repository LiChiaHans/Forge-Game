
const townVisitorAnimations=new Set();
function renderTownVisitors(remaining){
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
  const frames=route.map(([px,py],k)=>({transform:`translate3d(${(px-x)*sx}px,${(py-y)*sy}px,0) scale(${prior?1:(1+.65*(1-distances[k]/length)).toFixed(3)})`,offset:distances[k]/length}));
  const a=n.animate(frames,{duration:prior?500:Math.min(8000,Math.max(3800,length*9))+i*70,delay:prior?0:i*300,easing:'linear',fill:'backwards'});townVisitorAnimations.add(a);n.classList.add('arriving');
  a.onfinish=()=>{n.classList.remove('arriving');townVisitorAnimations.delete(a)};
  if(townMotionPaused)a.pause?.();
 });
}
