

let hi=0;
try{hi=+gameStorage.getItem("forgeHi")||0}catch(e){}
const score=()=>earned*10+magic;
let recs=[],runId=0,runDate="",runTime="",playerName="",saves=[];
let active=false,booting=true,testRun=false,phase="play";
const cheat={m:false,s:false};
try{saves=JSON.parse(gameStorage.getItem("forgeSaves")||"[]")||[]}catch(e){}
try{
  recs=JSON.parse(gameStorage.getItem("forgeRecs")||"[]")||[];
  playerName=gameStorage.getItem("forgeName")||"";
}catch(e){}
const timeStr=()=>{
  const d=new Date();
  return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
};
const todayStr=()=>{
  const d=new Date();
  return d.getFullYear()+"/"+String(d.getMonth()+1).padStart(2,"0")+"/"+String(d.getDate()).padStart(2,"0");
};
const esc=t=>String(t).replace(/[&<>"']/g,c=>({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[c]));
const rankOf=w=>w?(isUltimate(w)?2e12:isLegend(w)?1e12:0)+(w.cs||[w.t,w.t,w.t]).reduce((a,x)=>a+x,0)*1e6+Math.round((w.b||0)*100)*1e3+(w.m||0)+(validElement(w.element)?500:0)+weaponStarLevel(w)*100000:-1;
const saveHi=()=>{
  if(day===0||testRun)return;
  const sc=score();
  if(sc>hi){
    hi=sc;
    try{gameStorage.setItem("forgeHi",hi)}catch(e){}
  }
  if(sc<=0)return;
  const e={
    id:runId,name:playerName||"玩家",date:runDate,
    score:sc,served:all,quests:qDone,best:JSON.parse(JSON.stringify(best)),day,earned,magic,expedition:expeditionState.cleared.length,avatar:normalizeAvatar(playerAvatar),skills:{...skills}
  };
  const i=recs.findIndex(r=>r.id===runId);
  if(i>=0)recs[i]=e;else recs.push(e);
  recs.sort((a,b)=>b.score-a.score);recs=recs.slice(0,5);
  try{gameStorage.setItem("forgeRecs",JSON.stringify(recs))}catch(e){}
  try{queueOnlineRecord();}catch(e){}
};


function colHTML(B){
  return WN.map((n,c)=>{
    const r=B&&B[c],w=r?{...r,c}:null;
    const gems=r&&(r.dts||[]).length?r.dts.length:r&&r.b?1:0;
    const badges=r?(r.m?'<span class="best-magic">✨+'+r.m+'</span>':'')
      +(gems?'<span class="best-gems">💎'+gems+' · +'+Math.round((r.b||0)*100)+'%</span>':''):'';
    const amount=w?wp(w)+(w.m||0):0;
    return '<div class="sl"'+(r?' data-record-weapon="'+c+'" role="button" tabindex="0" aria-label="查看'+n+'的能力"':'')+'><div class="best-art">'+hex(c,r?bands(r):'var(--line)',r?'':'dim',r?r.t:0,w)+badges+'</div><b>'+(isLegend(w)?LEGENDS[w.legendId].name:n)+'</b>'+(isLegend(w)?'<span class="best-legend">傳說</span>':recipe(c))
      +(r?'<small class="best-price" title="含鑽石與魔法，未含訂單與商人加成">'+amount+' 金幣</small>':'')+'</div>';
  }).join('');
}
const rec=()=>earned>0&&score()>=hi?"🎉 新紀錄！":"";