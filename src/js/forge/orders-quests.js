
function capDailyOrders(list){
 const used={2:0,3:0,4:0},caps={2:3,3:2,4:1};
 for(const o of list){let t=o.t;while(t>=2&&used[t]>=caps[t])t--;if(t>=2)used[t]++;if(t!==o.t){o.t=t;if(o.c!==null){o.max=100+60*t;o.wait=Math.min(o.wait,o.max);}}}
 return list;
}
function renderHarvestAlert(){
 const el=$('townGreenhouse'),count=greenhouseBeds.filter(p=>p&&plantAge(p)>=3).length;
 const key=el.dataset.artSeason+':'+count;if(el.dataset.harvestKey===key)return;el.dataset.harvestKey=key;el.dataset.harvestCount=String(count);el.querySelector('.greenhouse-ready')?.remove();
 if(count){const b=document.createElement('span');b.className='greenhouse-ready';b.setAttribute('aria-label',count+' 盆花已成熟，可收成');b.innerHTML='<svg viewBox="0 0 32 40" shape-rendering="crispEdges" aria-hidden="true"><path fill="#3d3431" d="M5 1h22v4h4v26h-4v4h-6v5h-6v-5H5v-4H1V5h4z"/><path fill="#f2ce65" d="M6 4h20v4h2v20h-4v4h-6v4h-1v-4H6v-4H4V8h2z"/><path fill="#fff0b0" d="M7 5h17v3H7z"/><path fill="#81512f" d="M13 9h7v13h-7zM13 25h7v6h-7z"/></svg>';el.appendChild(b);}
}

function mkOrder(gn){
  const mx=Math.max(0,Math.min(4,Math.floor((day-1)/3)));
  const t=mx>0?(Math.random()<.4?mx:rnd(mx)):0;
  const fp=typeof landmarkBonuses==='function'?(landmarkBonuses().fountainPatience||0):0;
  const w=100+60*t+fp,W2=gn?1e9:w;
  return {guest:expandedGameEnabled()?guestForOrder22(forgeGuestSerial22++,false):undefined,c:gn?null:rnd(10),t,max:W2,wait:W2};
}

/* ===== 礦石佇列：第一顆飛走後，後面的往上推 ===== */
const qRects=()=>[...document.querySelectorAll("#q .q")].map(e=>e.getBoundingClientRect());
function animateQ(old){
  [...document.querySelectorAll("#q .q")].forEach((el,k)=>{
    const n=el.getBoundingClientRect(),o=old[k+1];
    const opt={duration:260,delay:130,easing:"cubic-bezier(.2,.8,.25,1)",fill:"backwards"};
    if(o){
      const dx=o.left+o.width/2-n.left-n.width/2,dy=o.top+o.height/2-n.top-n.height/2;
      el.animate([{transform:`translate(${dx}px,${dy}px) scale(${o.width/n.width})`},{transform:"none"}],opt);
    }else{
      el.animate([{transform:"translateY(28px) scale(.4)",opacity:0},{transform:"none",opacity:1}],opt);
    }
  });
}

/* ===== 任務系統 ===== */
const QD={
  mag:{i:"🔮",w:3,ok:()=>sk('mg')>0,
    mk:()=>{const n=1+Math.floor(Math.pow(Math.random(),1.6)*10);return{n,r:100*n}},
    tx:q=>`賣出一把同時包含 ${q.n} 個魔法附魔的武器`,sh:q=>`附魔×${q.n}`,
    tip:"魔法格每放一次物品 +5💰 算 1 個附魔，會隨合成保留。"},
  dia:{i:"💎",w:3,ok:()=>sk('gc')>0,
    mk:()=>{const n=1+Math.floor(Math.pow(Math.random(),1.3)*3);return{n,r:[150,300,550][n-1]}},
    tx:q=>`賣出一把同時鑲有 ${q.n} 顆鑽石的武器`,sh:q=>`鑲鑽×${q.n}`,
    tip:"一把武器最多鑲 3 顆鑽石。"},
  diaT:{i:"💠",w:2,day:true,ok:()=>sk('gc')>0,
    mk:()=>{const n=4+rnd(2);return{n,r:[500,700][n-4]}},
    tx:q=>`在 1 天中，賣出的武器累計鑲有 ${q.n} 顆鑽石`,sh:q=>`累計鑽×${q.n}`,
    tip:"當天賣出的所有武器，鑲嵌的鑽石加總。"},
  multi:{i:"⚡",w:3,ok:()=>true,
    mk:()=>{const n=Math.min(dTot||3,3+rnd(3));return{n,r:[250,450,750][n-3]}},
    tx:q=>`在 1 步內，同時將武器賣給 ${q.n} 位客人`,sh:q=>`一步賣${q.n}位`,
    tip:"放礦石、模具、鑽石算 1 步；賣武器不算步數，先備好武器再連續賣。"},
  gold:{i:"🥇",w:3,day:true,ok:()=>day>=4&&sk('mm')>0,
    mk:()=>{const n=Math.min(dTot||3,3+rnd(3));return{n,r:[300,500,800][n-3]}},
    tx:q=>`在 1 天中，賣出 ${q.n} 把金級以上的武器`,sh:q=>`金級×${q.n}`,
    tip:"金級與秘銀級武器都算。"},
  big:{i:"💰",w:2,ok:()=>true,
    mk:()=>{if(day<=3){const k=day===1?0:rnd(3);return {n:1,x:[30,60,90][k],r:[25,50,75][k]};}const k=rnd(Math.min(4,Math.floor(day/2))+1);return{n:1,x:[120,200,300,450,600][k],r:[100,180,300,500,750][k]}},
    tx:q=>`賣出一把成交價達 ${q.x} 金幣的武器`,sh:q=>`單筆≥${q.x}`,
    tip:"成交價含鑽石、魔法與大商人加成。"},
  spec:{i:"🗡️",w:2,ok:()=>true,
    mk:()=>{const n=2+rnd(2);return{n,c:rnd(10),r:[200,350][n-2]}},
    tx:q=>`賣出 ${q.n} 把${WN[q.c]}`,sh:q=>`${WN[q.c]}×${q.n}`},
  forge2:{i:"🔨",w:2,ok:()=>true,
    mk:()=>{const n=2+rnd(2);return{n,r:[200,450][n-2]}},
    tx:q=>`一次鍛造出 ${q.n} 把武器`,sh:q=>`一鍛${q.n}把`,
    tip:"4 個胚連成一線可同時鍛 2 把，5 個胚可鍛 3 把。"},
  chain:{i:"🔗",w:2,ok:()=>sk('mm')>0,
    mk:()=>{const n=2+rnd(3);return{n,r:[150,300,550][n-2]}},
    tx:q=>`一次操作連鎖合成礦石 ${q.n} 次`,sh:q=>`連鎖×${q.n}`,
    tip:"合成出的礦石又接著合成，算連鎖。"},
  safe:{i:"🛡️",w:1,day:true,ok:()=>true,
    mk:()=>({n:1,r:120}),
    tx:()=>"在 1 天中，沒有客人離開，也沒有取消訂單",sh:()=>"零失誤",
    tip:"每天結算時判定。"}
};
function genQuest(taken){
  let ks=Object.keys(QD).filter(k=>QD[k].ok());
  const fr=ks.filter(k=>!taken.includes(k));if(fr.length)ks=fr;
  let r=Math.random()*ks.reduce((a,k)=>a+QD[k].w,0),t=ks[0];
  for(const k of ks){r-=QD[k].w;if(r<0){t=k;break}}
  return {t,s:'a',p:0,n:1,...QD[t].mk()};
}
function ensureQuests(){
  if(day<1){quests=[];return}
  if(!Array.isArray(quests))quests=[];
  quests=quests.map(q=>q?.s==='a'&&q.t==='gold'&&day<4?null:q);
  for(const q of quests)if(q?.s==='a'&&q.t==='big'&&day<=3&&q.x>90){q.x=day===1?30:60;q.r=day===1?25:50;}
  for(const q of quests)if(q?.s==='a'&&q.t==='multi'&&q.n>dTot){q.n=dTot;q.r=[250,450,750][Math.max(0,dTot-3)];}
  for(const q of quests)if(q?.s==='a'&&q.t==='gold'&&q.n>dTot){q.n=dTot;q.r=[300,500,800][Math.max(0,dTot-3)];}
  const taken=quests.filter(q=>q&&q.s==='a').map(q=>q.t);
  for(let k=0;k<3;k++){
    if(!quests[k]||quests[k].s!=='a'){
      const q=genQuest(taken);quests[k]=q;taken.push(q.t);
    }
  }
}
const qEach=(t,fn)=>quests.forEach(q=>{if(q&&q.s==='a'&&q.t===t)fn(q)});
function toast(h){
  const el=document.createElement("div");el.className="toast";el.setAttribute("role","status");el.title="點擊關閉訊息";
  el.innerHTML='<span class="toast-body">'+h+'</span><span class="toast-x" aria-hidden="true">✕</span>';
  let done=false,t1=0,t2=0;
  const dismiss=()=>{if(done)return;done=true;clearTimeout(t1);clearTimeout(t2);el.classList.add("out");t2=setTimeout(()=>el.remove(),260);};
  el.addEventListener("click",dismiss);
  $("toasts").appendChild(el);
  t1=setTimeout(dismiss,3600);
}
function qFinish(q){
  q.s='d';q.p=q.n;qDone++;
  const reward=Math.round(q.r*(1+medalBonuses().questGold));
  coins+=reward;earned+=reward;dEarn+=reward;
  toast("🎉 任務完成："+QD[q.t].tx(q)+"<br>獎勵 +"+reward+" 💰　分數 +"+reward*10);
  bell();saveHi();
}
function qProg(q,p){
  q.p=Math.max(0,Math.min(q.n,p));
  if(q.p>=q.n)qFinish(q);
}
function qOnSale(w,price){
  if(!quests.length)return;
  stepSales++;
  const notes=[],mg=Math.floor((w.m||0)/5),dn=(w.dts||[]).length;
  const bump=(q,p)=>{
    if(p<=q.p)return;
    qProg(q,p);
    if(q.s==='a')notes.push(QD[q.t].sh(q)+" "+q.p+"/"+q.n);
  };
  quests.forEach(q=>{
    if(!q||q.s!=='a')return;
    switch(q.t){
      case'mag':if(mg>=q.n)qProg(q,q.n);break;
      case'dia':if(dn>=q.n)qProg(q,q.n);break;
      case'diaT':if(dn)bump(q,q.p+dn);break;
      case'multi':bump(q,stepSales);break;
      case'gold':if(w.t>=3)bump(q,q.p+1);break;
      case'big':if(price>=q.x)qProg(q,q.n);break;
      case'spec':if(w.c===q.c)bump(q,q.p+1);break;
    }
  });
  if(notes.length)say(forgeMessageText()+" 📋 "+notes.join("、"));
}
function renderQ(){
  const bar=$("qbar"),btn=$("questBtn");
  if(day<1||!quests.length){
    bar.style.display="none";
    if(btn)btn.hidden=true;
    return;
  }
  bar.style.display="flex";
  if(btn){
    const doneCnt=quests.filter(q=>q&&q.s==='d').length;
    btn.hidden=false;
    btn.textContent=doneCnt>=quests.length?"✅任務":"📋任務"+(doneCnt?" "+doneCnt+"/"+quests.length:"");
    btn.classList.toggle("is-all-done",doneCnt>=quests.length);
  }
  const pg=q=>q.s==='d'?100:q.s==='x'?0:Math.round(q.p/q.n*100);
  bar.innerHTML=quests.map((q,k)=>{
    const d=QD[q.t];
    return `<div class="qc${q.s==='d'?" d":q.s==='x'?" x":""}"><b>${d.i} ${esc(d.sh(q))}</b><small><span>${q.s==='d'?"✅ 完成":q.s==='x'?"已放棄":q.p+"/"+q.n}</span><span>💰${q.r}</span></small><u style="--pg:${pg(q)}%"></u></div>`;
  }).join("");
  $("qS").textContent="累計服務 "+all+" 位客人 · 已完成 "+qDone+" 個任務";
  $("qC").innerHTML=quests.map((q,k)=>{
    const d=QD[q.t];
    return `<div class="qr${q.s==='d'?" d":q.s==='x'?" x":""}">
    <div><b>${d.i} 任務 ${k+1}</b>　<span style="color:#ffd77e">💰 ${q.r}（分數 +${q.r*10}）</span></div>
    <div>${esc(d.tx(q))}</div>
    ${d.tip?`<small>${esc(d.tip)}</small>`:""}${d.day?"<small>每天重新計算進度</small>":""}
    <div class="qb"><i style="width:${pg(q)}%"></i></div>
    <div class="qa"><span>${q.s==='d'?"✅ 已完成，明天換新任務":q.s==='x'?"已放棄，明天換新任務":"進度 "+q.p+" / "+q.n}</span>${q.s==='a'?`<button data-k="${k}">放棄任務</button>`:""}</div></div>`;
  }).join("");
}
$("qbar").onclick=()=>openP('qP');
$("qC").onclick=e=>{
  const b=e.target.closest("button");if(!b)return;
  const q=quests[+b.dataset.k];if(!q||q.s!=='a')return;
  confirmBox("放棄這個任務？","放棄後這格任務會在明天換成新任務。","放棄",()=>{q.s='x';render();saveNow()});
};