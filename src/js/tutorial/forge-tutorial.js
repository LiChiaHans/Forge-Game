

const say=t=>renderForgeMessage(t);
const sk=id=>skills[id]||0;
const TG=[[11,12,13],[16,17,18],[21,22,23]];
let tutP2=false,tutStage=1;
const tutBase=new Set([11,12,13]),tutExt=new Set([16,17,18,21,22,23]);
const isOff=i=>day===0&&!(tutBase.has(i)||(tutP2&&tutExt.has(i)));

function tutSetup2(){
 tutStage=2;tutP2=true;g=Array(W*H).fill(null);heat=Array(W*H).fill(0);magicSet=new Set();hand=null;MQ=[3,2,0];Q=Array(5).fill(0);say('🎓 第二階段：合成中央鑽石！');
}
function tutSetup3(){
 if(tutStage!==2||g[17]?.k!=='d')return;
 // Preserve the exact diamond object at its original central cell.
 tutStage=3;g[13]={k:'p',t:0,s:0,m:0};g[18]={k:'p',t:0,s:1,m:0};
 magicSet=new Set([21]);hand=null;MQ=[2,0,1];Q=Array(5).fill(0);say('🎓 鑽石留在中央！接著學習魔法格並合成武器。');
}

function tutHints(){
  if(tutStage===2){
    const h={};[11,12].filter(i=>!g[i]).forEach(i=>h[i]=`<div class="gst">${oreH(0)}</div>`);
    if(g[11]&&g[12]&&!g[17])h[17]=`<div class="t2 gst">${mold(3,'')}</div>`;return h;
  }
  if(tutStage===3){
    const h={};if(g.some(x=>x?.k==='w'))return h;
    [21,22].forEach(i=>{if(!g[i])h[i]=`<div class="gst">${oreH(0)}</div>`});
    if(g[21]?.k==='o'&&g[22]?.k==='o'&&!g[23])h[23]=`<div class="t2 gst">${mold(MQ[0],'')}</div>`;
    return h;
  }

  const h={},np=g.filter(x=>x&&x.k==='p').length;
  if(np>=3||g.some(x=>x&&x.k==='w'))return h;
  const [a,b,m]=TG[np],miss=[a,b].filter(c=>!g[c]);
  if(miss.length)miss.forEach(c=>{h[c]=`<div class="gst">${oreH(0)}</div>`});
  else if(!g[m])h[m]=`<div class="t2 gst">${mold(MQ[0],"")}</div>`;
  return h;
}
const tutDone=()=>{try{return gameStorage.getItem("forgeTut")==="1"}catch(e){return false}};
const tutDoneSet=()=>{try{gameStorage.setItem("forgeTut","1")}catch(e){}};

function tutMsg(){
  const cnt=k=>g.filter(x=>x&&x.k===k).length;
  if(tutStage===2){
    if(!g[11]||!g[12])return '💎 先在提示格放兩顆銅礦，再用鑽石模具合成中央鑽石。';
    return '把鑽石模具拖到棋盤中央的提示格，合成鑽石！';
  }
  if(tutStage===3){
    if(cnt('w'))return '💎 鑽石強化能力與售價；✨ 魔法增加附魔。把武器拖給客人！';
    if(!g[21])return '💎 中央鑽石保留原位。點紫色格放銅礦，學習魔法附魔。';
    if(!g[22])return '✨ 紫色格讓材料帶有魔法。再在旁邊的提示格放一顆銅礦。';
    return '把模具拖到提示格，合成武器並吸收中央鑽石與魔法加成！';
  }

  if(cnt('w'))return "武器完成！🔥 格子過熱 50 步。把武器拖給上方客人出售！";
  const np=cnt('p');
  if(np>=3)return "讓三個胚緊貼在一起，就會自動合成武器。";
  const [a,b]=TG[np],miss=[a,b].filter(c=>!g[c]);
  const pre="第 "+(np+1)+"/3 個胚：";
  const intro=np===0?"先用 3 格學會基本流程。":np===1?"下方又亮起 6 格，繼續做第 2、3 個胚！":"";
  if(miss.length===2)return pre+"點兩個提示格放銅礦，再拖入模具。";
  if(miss.length===1)return pre+"再放一顆銅礦，放在半透明提示的格子。";
  return pre+"把框起來的模具拖到提示格。";
}
function skipTut(){tutDoneSet();goHome()}