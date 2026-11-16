
let fitQueued=false;
function fit(){
  if(fitQueued)return;
  fitQueued=true;
  requestAnimationFrame(()=>{
    fitQueued=false;
    if(document.documentElement.classList.contains("portrait-guarded"))return;
    const ap=$("app"),pl=$("play"),wb=$("workbench");
    const vv=window.visualViewport;
    if(!vv||Math.abs(vv.scale-1)<.05){
      const h=Math.round(Math.max(window.innerHeight,document.documentElement.clientHeight,vv?vv.height:0));
      const value=h+"px";
      if(document.documentElement.style.getPropertyValue("--viewport-height")!==value)
        document.documentElement.style.setProperty("--viewport-height",value);
    }
    const style=getComputedStyle(ap);
    const usableHeight=ap.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom);
    const compact=usableHeight<720?"true":"false";
    if(ap.dataset.compact!==compact)ap.dataset.compact=compact;
    const cell=Math.max(24,Math.min((pl.clientWidth-64-6-36)/5,(pl.clientHeight-40)/6));
    ap.style.setProperty("--cs",cell+"px");
    ap.style.setProperty("--ch",cell+"px");
    ap.dataset.boardOverflow=Math.max(wb.offsetHeight,$("q").offsetHeight)>pl.clientHeight+1?"true":"false";
  });
}
// Keep the saved web app at a fixed page scale while preserving single-finger play.
for(const eventName of ["gesturestart","gesturechange","gestureend"])
  document.addEventListener(eventName,e=>e.preventDefault(),{passive:false});
document.addEventListener("touchmove",e=>{if(e.touches.length>1)e.preventDefault()},{passive:false});
// Block Safari double-tap zoom while preserving the second game/button tap.
let lastPageTap=null,pageTapStart=null;
document.addEventListener('touchstart',e=>{
  if(e.touches.length!==1){pageTapStart=null;lastPageTap=null;return;}
  const t=e.touches[0];pageTapStart={x:t.clientX,y:t.clientY};
},{passive:true});
document.addEventListener('touchmove',e=>{
  if(!pageTapStart||e.touches.length!==1){pageTapStart=null;return;}
  const t=e.touches[0];if(Math.hypot(t.clientX-pageTapStart.x,t.clientY-pageTapStart.y)>10)pageTapStart=null;
},{passive:true});
document.addEventListener('touchend',e=>{
  if(!pageTapStart||e.touches.length||!e.changedTouches.length){pageTapStart=null;return;}
  pageTapStart=null;const t=e.changedTouches[0],now=performance.now();
  const doubleTap=lastPageTap&&now-lastPageTap.time<320&&Math.hypot(t.clientX-lastPageTap.x,t.clientY-lastPageTap.y)<24;
  lastPageTap={time:now,x:t.clientX,y:t.clientY};
  if(!doubleTap)return;
  const target=e.target instanceof Element?e.target:null;
  if(target&&target.closest('input,textarea,[contenteditable="true"]'))return;
  e.preventDefault();
  const action=target&&target.closest('button,a,.c,.qc');
  if(action&&!action.closest('[data-drag]')&&!action.classList.contains('wc'))action.click();
},{passive:false});
document.addEventListener('dblclick',e=>{if(!(e.target instanceof Element)||!e.target.closest('input,textarea,[contenteditable="true"]'))e.preventDefault();},{passive:false});
window.addEventListener("resize",fit);
window.addEventListener("load",fit);
window.addEventListener("orientationchange",fit);
if(window.visualViewport){visualViewport.addEventListener("resize",fit);visualViewport.addEventListener("scroll",fit);}
window.addEventListener("pageshow",fit);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
try{
  const ro=new ResizeObserver(fit);
  ro.observe($("play"));ro.observe($("app"));
}catch(e){}
$("tl").innerHTML=[0,1,4,9].map((c,k)=>hex(c,C[k+1],"",k+1)).join("");
setInterval(()=>{if(!busy)saveNow()},3000);
addEventListener("pagehide",saveNow);
document.addEventListener("visibilitychange",()=>{
  if(document.hidden)saveNow();
});
(()=>{
  const t=document.createElement("div");t.className="emw";$("title").appendChild(t);
  for(let i=0;i<16;i++){
    const e=document.createElement("i");e.className="em2";
    e.style.cssText=`left:${Math.random()*100}%;--d:${5+Math.random()*6}s;--s:${2+Math.random()*3}px;animation-delay:-${Math.random()*8}s`;
    t.appendChild(e);
  }
})();