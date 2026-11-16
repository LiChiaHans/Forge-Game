

const PET_BLOCKS=[[0,174,139,331],[204,166,360,343],[0,337,112,454],[0,481,151,620],[205,487,360,620],[270,356,360,451]];
const townPetAnimations=new Set();let petNavigation=null;
const townPets={cat:{kind:'cat',point:[178,558],anim:null,timer:null},dog:{kind:'dog',point:[178,222],anim:null,timer:null}};
function petGround(x,y){
 if(x<20||x>340||y<174||y>607)return false;
 if(townBackgroundFountainBlocked(x,y))return false;
 const blocks=expandedGameEnabled()?townMasterBlocks():PET_BLOCKS;
 if(blocks.some(([x0,y0,x1,y1])=>x>=x0-8&&x<=x1+8&&y>=y0-7&&y<=y1+7))return false;
 if(cityObstacleAt(x,y))return false;
 
 return true;
}
function petDepthScale(y){return Math.max(.62,Math.min(1.35,.55+y/800));}
function petArt(kind){
 const cat=kind==='cat',fur=cat?'#d99a57':'#b2865d',light=cat?'#f5d4a0':'#e4c69a',dark=cat?'#96603c':'#75523d';
 return '<svg class="town-pet-art" viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true"><ellipse cx="16" cy="29" rx="13" ry="2" fill="#20372f" opacity=".25"/><g class="pet-body"><path fill="'+dark+'" d="M24 15h5v-5h2v9h-5z"/><path fill="'+fur+'" d="M7 13h17v4h3v10H6V16h1z"/><path fill="'+light+'" d="M10 18h11v8H10z"/><g class="pet-feet"><path fill="'+dark+'" d="M7 25h5v5H7zM21 25h5v5h-5z"/><path fill="'+light+'" d="M7 28h5v2H7zM21 28h5v2h-5z"/></g>'+(cat?'<path fill="'+dark+'" d="M6 11V3h5l5 4 5-4h5v16H6z"/><path fill="'+fur+'" d="M8 5h3v5h10V5h3v13H8z"/><path fill="#dc9a91" d="M9 6h2v4H9zM21 6h2v4h-2z"/>':'<path fill="'+dark+'" d="M7 5h18v5h4v11h-6v-6H9v6H3V10h4z"/><path fill="'+fur+'" d="M9 6h14v15H9z"/><path fill="'+light+'" d="M13 7h6v13h-6z"/>')+'<path fill="#25343b" d="M10 12h3v3h-3zM20 12h3v3h-3z"/><path fill="#fff0ce" d="M10 12h1v1h-1zM20 12h1v1h-1z"/><path fill="'+light+'" d="M12 16h9v6h-9z"/><path fill="#5b3e3c" d="M15 16h4v3h-4zM16 20h2v2h-2z"/>'+(cat?'<path fill="'+dark+'" d="M3 17h7v1H3zM23 17h7v1h-7zM15 7h2v4h-2z"/>':'<path fill="#cf8790" d="M17 21h3v4h-3z"/>')+'<path fill="#6f8790" d="M10 23h13v3H10z"/><path fill="#e9c674" d="M16 24h3v4h-3z"/></g></svg>';
}
function petTransform(point,rect){return 'translate3d('+(point[0]*(rect.width||360)/360-20)+'px,'+(point[1]*(rect.height||620)/620-40)+'px,0) scale('+petDepthScale(point[1])+')';}
function buildPetNavigation(){
 const nodes=new Map();for(let j=0;j<37;j++)for(let i=0;i<27;i++){const x=22+i*12,y=174+j*12;if(petGround(x,y))nodes.set(i+','+j,[x,y]);}return nodes;
}
function petRoute(start){
 petNavigation=petNavigation||buildPetNavigation();const keys=[...petNavigation.keys()];if(!keys.length)return [];let first=keys[0],dist=Infinity;for(const k of keys){const p=petNavigation.get(k),d=Math.hypot(p[0]-start[0],p[1]-start[1]);if(d<dist){dist=d;first=k;}}
 const parents=new Map([[first,null]]),queue=[first],directions=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
 for(let n=0;n<queue.length;n++){const k=queue[n],[i,j]=k.split(',').map(Number);for(const [di,dj]of directions){const next=(i+di)+','+(j+dj);if(!petNavigation.has(next)||parents.has(next))continue;if(di&&dj&&(!petNavigation.has((i+di)+','+j)||!petNavigation.has(i+','+(j+dj))))continue;if(!cityPetSegmentClear(petNavigation.get(k),petNavigation.get(next)))continue;parents.set(next,k);queue.push(next);}}
 const choices=queue.filter(k=>{const p=petNavigation.get(k);return Math.hypot(p[0]-start[0],p[1]-start[1])>85});let last=(choices.length?choices:queue)[rnd((choices.length?choices:queue).length)],route=[];while(last!==null){route.push(petNavigation.get(last));last=parents.get(last);}route.reverse();
 // Only omit collinear points, retaining exact collision-free routes around the buildings.
 const smooth=[];for(let i=0;i<route.length;i++){const a=route[i-1],b=route[i],c=route[i+1];if(!a||!c||(b[0]-a[0])*(c[1]-b[1])!==(b[1]-a[1])*(c[0]-b[0]))smooth.push(b);}return smooth;
}
function initTownPets(){
 const el=$('townPets');if(!el.dataset.built){el.dataset.built='1';el.innerHTML=Object.values(townPets).map(p=>'<button id="townPet-'+p.kind+'" class="town-pet" onclick="petLove(\''+p.kind+'\')" aria-label="'+(p.kind==='cat'?'摸摸小貓':'摸摸小狗')+'">'+petArt(p.kind)+'</button>').join('');const rect=$('townMap').getBoundingClientRect();Object.values(townPets).forEach(p=>$('townPet-'+p.kind).style.transform=petTransform(p.point,rect));}ensureTownPetsMoving();
}
function ensureTownPetsMoving(){if(townMotionPaused||$('townP').style.display!=='flex'||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;Object.values(townPets).forEach(p=>{if(!p.anim&&!p.timer&&$('townPets').dataset.built)moveTownPet(p);});}
function moveTownPet(p){
 if(lowEffects)return;
 const el=$('townPet-'+p.kind),rect=$('townMap').getBoundingClientRect(),route=petRoute(p.point);if(route.length<2)return;p.point=route[0];const distances=[0];for(let i=1;i<route.length;i++)distances.push(distances[i-1]+Math.hypot(route[i][0]-route[i-1][0],route[i][1]-route[i-1][1]));const length=distances.at(-1),end=route.at(-1);
 el.querySelector('.town-pet-art').style.transform=end[0]<p.point[0]?'scaleX(-1)':'';el.style.transform=petTransform(end,rect);el.classList.add('pet-walking');
 const a=el.animate(route.map((point,i)=>({transform:petTransform(point,rect),offset:distances[i]/length})),{duration:Math.max(3500,Math.min(20000,length/(25+rnd(7))*1000)),easing:'linear'});p.anim=a;townPetAnimations.add(a);
 a.onfinish=()=>{p.point=end;p.anim=null;townPetAnimations.delete(a);el.classList.remove('pet-walking');p.timer=gameTimeout(()=>{p.timer=null;if(!townMotionPaused&&$('townP').style.display==='flex')moveTownPet(p);},1200+rnd(2200));};
 if(townMotionPaused)a.pause?.();
}
function petLove(kind){
 const el=$('townPet-'+kind);if(!el)return;el.querySelector('.pet-love')?.remove();const bubble=document.createElement('span');bubble.className='pet-love';bubble.setAttribute('aria-label','愛心');bubble.innerHTML='<svg viewBox="0 0 52 30" shape-rendering="crispEdges" aria-hidden="true"><path fill="#263a40" d="M5 1h42v4h4v17h-4v4H30v4h-7v-4H5v-4H1V5h4z"/><path fill="#f4e9c8" d="M6 4h40v3h2v13h-3v3H28v4h-3v-4H6v-3H4V7h2z"/><path fill="#df8491" d="M10 9h5v3h3V9h5v8h-3v3h-4v-3h-3v-3h-3zM29 9h5v3h3V9h5v8h-3v3h-4v-3h-3v-3h-3z"/><path fill="#f8b9b9" d="M11 10h3v2h-3zM30 10h3v2h-3z"/></svg>';el.appendChild(bubble);gameTimeout(()=>bubble.remove(),1800);
}
