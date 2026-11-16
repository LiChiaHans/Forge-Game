

function playFx(evs){
  const D=380,L0=lead,pr=$("play").getBoundingClientRect();
  const cells=$("grid").children;
  let T=0;
  evs.forEach(ev=>{
    T=Math.max(T,ev.step*(D+100)+D+L0);
    const go=()=>{
      if(ev.step||L0){
        ev.from.forEach(f=>shown.delete(f.i));render();
      }
      const rs=ev.from.map(f=>cells[f.i].getBoundingClientRect());
      const tr=cells[ev.tg].getBoundingClientRect();
      const cx=tr.left+tr.width/2,cy=tr.top+tr.height/2;
      ev.from.forEach((f,k)=>{
        const r=rs[k],el=document.createElement("div");
        el.className="gh";el.innerHTML=f.h;
        el.style.cssText=`left:${r.left-pr.left}px;top:${r.top-pr.top}px;width:${r.width}px;height:${r.height}px`;
        $("fx").appendChild(el);
        const dx=cx-r.left-r.width/2,dy=cy-r.top-r.height/2;
        el.animate([
          {transform:"translate(0,0) scale(1)",opacity:1},
          {transform:"translate(0,-14px) scale(1.1)",opacity:1,offset:.35},
          {transform:`translate(${dx}px,${dy-6}px) scale(.95)`,opacity:1,offset:.75},
          {transform:`translate(${dx}px,${dy}px) scale(.3)`,opacity:0}
        ],{duration:D,easing:"ease-in-out"}).onfinish=()=>el.remove();
      });
      gameTimeout(()=>{
        ev.to.forEach(j=>{
          const lDest=evs.some(e=>e.step>ev.step&&e.to.includes(j));
          const lSrc=evs.some(e=>e.step>ev.step&&e.from.some(f=>f.i===j));
          if(!lDest)hold.delete(j);
          if(lSrc&&ev.res[j])shown.set(j,ev.res[j]);
          else if(!lDest)pop.add(j);
        });
        render();if(ev.forged)presentForgeResults(ev.forged);
      },D-40);
    };
    ev.step||L0?gameTimeout(go,ev.step*(D+100)+L0):go();
  });
  return T+60;
}
$("grid").onclick=e=>{
  const d=e.target.closest(".c");
  if(!d||busy)return;
  const i=+d.dataset.i,c=g[i];
  if(isOff(i))return;
  const bp=blueprintSlotAt(i);if(bp){openBlueprintProject(bp.project.uid);return;}
  if(cellBlock(i)){say(cellBlock(i));return;}
  if(!c){
    if(heat[i]>0)say("過熱中，還要 "+heat[i]+" 步才能放置");
    else{
      qFlip=qRects();flyIn(i,Q[0]);thud(.2);flyI=i;lead=210;
      g[i]={k:'o',t:Q.shift(),m:0};Q.push(rollOre());
      fresh=i;say("");magicAt(i);auto(i);cool();
    }
  }else if(c.k==='w'){openCraftedWeapon(c,"棋盤上的武器");return;}
  else if(c.k==='d')say("鑽石會在鍛造時自動加裝到旁邊的武器");
  else merge(i);
  settle();
};
function settle(){
  burnLeaves();
  justHeated.clear();
  checkWait();
  const evs=fx;fx=[];
  hold=new Set(evs.flatMap(e=>e.to));shown=new Map();
  evs.forEach(e=>{
    if(e.step>0||lead>0)e.from.forEach(f=>{
      if(!hold.has(f.i))shown.set(f.i,f.h);
    });
  });
  render();
  const T=Math.max(evs.length?playFx(evs):0,exitMs);
  exitMs=0;lead=0;
  if(T)busy=true;
  gameTimeout(()=>{
    busy=false;saveNow();
    if(hold.size||shown.size){hold=new Set();shown=new Map();render()}
    if(lives<=0)gameOver("生命用完了。");
    else if(!orders.length)endDay();
    else if(over())gameOver("棋盤已無法操作。");
  },T);
}
function magicAt(i){
  if(!magicSet.has(i)||!g[i])return;
  g[i].m=(g[i].m||0)+5;
  say($("msg").textContent+" ✨魔法 +5💰（賣出時結算）");
}