

function render(){
  syncWorkshopLook();syncSeasonMusic();
  renderAvatarBadges();
  const currentSeason=SEASONS[seasonIndex()];
  $("app").dataset.season=currentSeason.id;
  $("srv").title=currentSeason.name+" · 季節第 "+seasonDay()+"/3 天 · "+seasonBenefitText()+(seasonIndex()===2?" 餘燼剩餘 "+autumnForgeCharges+" 次":"");
  if(day===0&&tutStage===1&&dServed>=1)tutSetup2();
  if(day===0&&tutStage===2&&g[17]?.k==='d')tutSetup3();
  if(cheat.m)coins=1e12;
  if(cheat.s)sp=9999;
  if(day===0&&!tutP2&&g.some(x=>x&&(x.k==='p'||x.k==='w')))tutP2=true;

  $("coin").textContent=(testRun?"🧪 ":"💰 ")+(sandboxSession?"∞":coins);
  $("ctn").textContent="▶ 繼續遊戲"+(saves.length?"（"+saves.length+"）":"");
  $("ctn").disabled=!saves.length;
  $("lv").textContent="❤️".repeat(Math.max(0,lives))+"🖤".repeat(3-Math.max(0,lives));
  $("mu").textContent=muted?"🔇":"🔊";$("townMute").textContent=muted?"🔇":"🔊";$("townMute").setAttribute("aria-label",muted?"開啟音效":"關閉音效");
  $("spb").hidden=false;
  $("spb").textContent="🌟技能";
  if(day===0){
    $("tut").style.display="flex";
    $("tutt").textContent=tutMsg();
  }else $("tut").style.display="none";
  $("sc").textContent="⭐ "+score()+" · 🏆 "+hi;
  $("hs").textContent="🏆 歷史最高分："+hi;
  $("srv").innerHTML=`<span class="season-info">${currentSeason.icon}${currentSeason.name}${seasonIndex()===2&&autumnForgeCharges?'<sup class="season-charge">🔥'+autumnForgeCharges+'</sup>':''}</span><span class="day-info">${day===0?"教學":"第 "+day+" 天"} · 客人 ${dServed}/${dTot}</span>`;
  renderQ();

  $("orders").innerHTML=orders.map((o,k)=>{
    const dl=enter.has(k)?enter.get(k)-Date.now():null;
    if(dl!==null&&dl<=-600)enter.delete(k);
    const an=dl!==null&&dl>-600;
    return `<div class="od${an?" in":""}" style="${an?`animation-delay:${dl}ms;`:""}background:linear-gradient(hsla(${hu(o).toFixed(0)},70%,52%,.42),hsla(${hu(o).toFixed(0)},70%,40%,.16)),#262e3b;border-color:hsl(${hu(o).toFixed(0)},60%,42%)" data-k="${k}">
    ${orderGuestHTML(o)}${guestBadge22(o,false)}<span class="wt">⏳${o.c===null?"∞":Math.max(0,o.wait)}</span>
    <span class="em">${o.wait<=o.max/4?"😡":o.wait<=o.max/2?"😒":""}</span>
    ${o.c===null?`<div class="hxo"><div class="hxi" style="background:${C[o.t]}"><b>任意</b></div></div>`:hex(o.c,C[o.t],"",o.t)}
    <div class="order-name">${o.c===null?"≥任意"+NM[o.t]+"級道具":"≥"+NM[o.t]+"級"+WN[o.c]}</div>
    <div class="rc">${o.c===null?"<small>任何配方</small>":COMBO[o.c].split("").map(s=>mold(+s,"","s")).join("")}</div>
    </div>`;
  }).join("")+(()=>{
    /* 補上看不見的空位，讓外框大小固定；客人全部離開後顯示打烊字樣 */
    let h="";
    for(let i=orders.length;i<(day===0?1:3);i++)
      h+=`<div class="od odg"><span class="wt">⏳0</span>${hex(0,C[0],"",0)}${WN[0]}<div class="rc">${COMBO[0].split("").map(s=>mold(+s,"","s")).join("")}</div></div>`;
    return h+(orders.length?"":`<div id="closed">🌙 今日已打烊</div>`);
  })();

  const th=day===0?tutHints():{};
  $("grid").innerHTML=g.map((c,i)=>{
    let h="";
    if(c){
      const nw=flyI===i?" land":(fresh===i||pop.has(i))?" new":"";
      if(c.k==='o')
        h=`<div class="t o${nw}${cozyOreClass()}"${cozyOreAttributes(c.t)} style="background-color:${C[c.t]};${cozyOreStyle(c.t)}">${NM[c.t]}${mb(c)}</div>`;
      else if(c.k==='p')
        h=`<div class="t2${nw}">${mold(c.s,C[c.t])}${mb(c)}</div>`;
      else if(c.k==='d')
        h=`<div class="t2 dg${nw}">${gem(c.t)}${mb(c)}</div>`;
      else
        h=`<div class="t2${nw}">${hex(c.c,bands(c),"",c.t,c)}${mb(c)}${c.b?`<span class="bd">💎+${Math.round(c.b*100)}%</span>`:""}</div>`;
    }
    if(!c&&th[i])h=th[i];
    if(shown.has(i))h=shown.get(i);
    else if(hold.has(i)&&h)
      h=`<div style="display:contents;visibility:hidden">${h}</div>`;
    return `<div class="c${c&&c.k==='w'?" wc":""}${forgeFlashes.get(i)===c?" forge-complete":""}${magicSet.has(i)?" mg":""}${isOff(i)?" off":""}${leaves.has(i)?" has-leaf":""}${frozen.has(i)?" is-frozen":""}"
      style="${heat[i]>0?`background:rgba(192,57,43,${(.12+.88*heat[i]/hotSteps()).toFixed(2)});`:""}${magicSet.has(i)?`animation-delay:-${Date.now()%1400}ms`:""}"
      data-i="${i}" data-piece-kind="${c?.k||'empty'}">${h}${c?.k==='p'?'<span class="piece-stage">'+NM[c.t]+'胚</span>':''}${c?.k==='w'&&!hold.has(i)&&!shown.has(i)?forgeCellLabel(c):''}${seasonCellHTML(i)}${heat[i]>0?`<span class="ht">${heat[i]}</span>`:""}${magicSet.has(i)?`<span class="mgs" style="animation-delay:-${Date.now()%1800}ms">✦</span>`:""}</div>`;
  }).join("");

  renderBlueprintCells();renderElementTiles();if($('greenhouseP').style.display==='flex')renderGreenhousePanel();
  $("tools").innerHTML=`<div class="tl2">模具</div>
    <span class="dm" data-drag="mold">${mold(MQ[0],"","f")}</span>
    <div class="mq">${MQ.slice(1,3).map(m=>mold(m,"","")).join("")}</div>`;
  $("handSlot").innerHTML=hand!==null?
    '<div class="tl2">手持</div>'+`<span class="dm" data-drag="hand">${hand.k==='bp'?blueprintShapeHTML(hand.id,hand.rot||0):itemH(hand,1)}</span>`
    +'<button class="hand-stow" onclick="stowHand(event)" aria-label="收回手持物品" title="收回">×</button>'
    :'<div class="tl2">道具箱</div><button class="dm hand-bag" onclick="openHandBag()" aria-label="開啟道具箱" title="道具箱"><span aria-hidden="true">🎒</span></button>';

  $("q").innerHTML="<small>接下來</small>"+Q.map((t,k)=>
    `<div class="q${k?"":" first"}${cozyOreClass()}"${cozyOreAttributes(t)} data-step="${k+1}" aria-label="第${k+1}顆：${NM[t]}礦" style="background-color:${C[t]};${cozyOreStyle(t)}">${NM[t]}</div>`
  ).join("");

  const toolItems=[
    {key:'f',icon:'🔥',color:'#c0392b',name:'焚燒工具',price:FIREP,description:'清除一個非武器物件，不能焚燒武器'},
    {key:'u',icon:'⬆️',color:'#2f7de1',name:'礦石升級',price:UPGP,description:'將一顆礦石提升一階'},
    {key:'z',icon:'❄️',color:'#54a4cc',name:'暴風雪',price:BLIZZP,description:'將全盤過熱步數歸零'},
    {key:'l',icon:'🧪',color:'#b94568',name:'生命藥水',price:LIFEP,description:'恢復一顆愛心'}
  ];
  $("shop").innerHTML=
    '<div class="sh">模具<span class="shop-stock">今日剩餘 '+shopRemaining('m')+'/3</span></div>'
    +'<div class="sg">'+[0,1,2].map(m=>'<button class="si" data-m="'+m+'" '+(coins<MPR||!shopRemaining('m')?'disabled':'')+'>'+mold(m,'','f')+'<small>'+TY[m]+'模 💰'+MPR+'</small></button>').join('')+'</div>'
    +'<div class="sh">工具<span class="shop-stock">今日剩餘 '+shopRemaining('tool')+'/1</span></div>'
    +'<div class="sg sg-tools">'+toolItems.map(it=>'<button class="si si-tool" data-'+it.key+'="1" '+(coins<it.price||!shopRemaining('tool')?'disabled':'')+'><span class="forge-tool-icon" data-tool="'+it.key+'">'+forgeToolArt(it.key)+'</span><small>'+it.name+' 💰'+it.price+'</small><span class="tool-desc">'+it.description+'</span></button>').join('')+'</div>'
    +'<div class="sh">礦石<span class="shop-stock">今日剩餘 '+shopRemaining('o')+'/3</span></div>'
    +'<div class="sg sg5">'+[0,1,2,3,4].map(t=>'<button class="si" data-o="'+t+'" '+(coins<OP[t]||!shopRemaining('o')?'disabled':'')+'><div class="q" style="background-color:'+C[t]+'">'+NM[t]+'</div><small>💰'+OP[t]+'</small></button>').join('')+'</div>'
    +'<div class="sh '+(sk('gc')?'':'nogc')+'">鑽石（每日庫存，各限購一個）</div>'
    +'<div class="sg '+(sk('gc')?'':'nogc')+'">'+shopD.map((t,k)=>t===null?'<button class="si" disabled>已售完</button>':'<button class="si" data-d="'+k+'" '+(coins<DP[t]?'disabled':'')+'>'+gem(t,'f')+'<small>'+NM[t]+'鑽 💰'+DP[t]+'</small></button>').join('')+'</div>';

  syncPack();
  $("pack").className=packCap()?"":"all-locked";
  $("pack").innerHTML=`<span class="chest-icon">📦</span><small>${pack.filter(Boolean).length}/${packCap()}</small>`;
  $("chestItems").innerHTML=packHTML();
  $("chestInfo").textContent=packCap()?"點擊武器取到手持欄，再拖到棋盤空格。":"升級武器箱技能後可收納武器（2／4／6 格）。";

  $("skl").innerHTML="<b>目前技能：</b>"+(
    Object.keys(SK).filter(k=>sk(k)).map(k=>SK[k].i+SK[k].n+" Lv"+sk(k)).join("　")||"尚無"
  );
  const grp={};
  bag.forEach(it=>{
    const k=itemKey(it);
    (grp[k]=grp[k]||{it,n:0}).n++;
  });
  $("bagC").innerHTML=Object.entries(grp).map(([k,v])=>
    `<button class="si" data-k="${esc(k)}"><span class="bag-item-art${v.it.k==='ess'?'':' bag-item-large'}">${itemH(v.it)}</span><small>${itemName(v.it)} ×${v.n}</small></button>`
  ).join("")||"<small>道具箱是空的</small>";

  $("lg").innerHTML=[0,1,2,3].map(s=>
    `<span>${mold(s,"","f")} ${s<3?TY[s]:"鑽石"}</span>`
  ).join("");
  $("col").innerHTML=colHTML(best);
  fresh=-1;pop=new Set();flyI=-1;fit();syncWorkshopMergeMasks('forge');
  if($("townP").style.display==="flex")renderTown();
  if(qFlip){const o=qFlip;qFlip=null;animateQ(o)}
}
