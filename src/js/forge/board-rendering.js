

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

  $("coin").innerHTML=(testRun?pxIcon('test')+" ":pxIcon('coin')+" ")+(sandboxSession?"∞":coins);
  $("ctn").innerHTML=pxIcon('play')+" 繼續遊戲"+(saves.length?"（"+saves.length+"）":"");
  $("ctn").disabled=!saves.length;
  $("lv").innerHTML=pxHearts(lives,3,true);
  $("mu").innerHTML=pxIcon(muted?'sound_off':'sound_on');$("townMute").innerHTML=pxIcon(muted?'sound_off':'sound_on');$("townMute").setAttribute("aria-label",muted?"開啟音效":"關閉音效");
  $("spb").hidden=false;
  $("spb").innerHTML=pxIcon('skill')+"技能";
  if(day===0){
    $("tut").style.display="flex";
    $("tutt").textContent=tutMsg();
  }else $("tut").style.display="none";
  $("sc").innerHTML=pxIcon('star')+" "+score()+" · "+pxIcon('trophy')+" "+hi;
  $("hs").innerHTML=pxIcon('trophy')+" 歷史最高分："+hi;
  $("srv").innerHTML=`<span class="season-info">${pxSeasonIcon(currentSeason.id)}${currentSeason.name}${seasonIndex()===2&&autumnForgeCharges?'<sup class="season-charge">'+pxIcon('flame')+autumnForgeCharges+'</sup>':''}</span><span class="day-info">${day===0?"教學":"第 "+day+" 天"} · 客人 ${dServed}/${dTot}</span>`;
  renderQ();

  const readyW=[...g,hand].filter(w=>w?.k==='w'&&!w.protected);
  $("orders").classList.toggle("is-tutorial",day===0);
  $("orders").innerHTML=orders.map((o,k)=>{
    const dl=enter.has(k)?enter.get(k)-Date.now():null;
    if(dl!==null&&dl<=-600)enter.delete(k);
    const an=dl!==null&&dl>-600;
    const matched=readyW.filter(w=>(o.c===null||o.c===w.c)&&w.t>=o.t);
    const matchCls=matched.length?(matched.some(w=>guestPreferenceBonus(w,o,false)>0)?' is-match is-pref-match':' is-match'):'';
    const openOrder=o.c===null;
    const grade=(openOrder?'':'≥')+NM[o.t]+'級';
    const item=openOrder?'道具':WN[o.c];
    const icon=openOrder?workshopAnyOrderIcon(C[o.t]):hex(o.c,C[o.t],"",o.t);
    const recipe=openOrder?'<small>配方不限</small>':COMBO[o.c].split('').map(s=>mold(+s,'','s')).join('');
    const wait=openOrder?'∞':Math.max(0,o.wait);
    return `<div class="od workshop-order${an?' in':''}${matchCls}"${an?` style="animation-delay:${dl}ms"`:''} data-k="${k}">${workshopOrderContent(o,{wait,grade,item,icon,recipe})}</div>`;
  }).join("")+(()=>{
    /* 補上看不見的空位，讓外框大小固定；客人全部離開後顯示打烊字樣 */
    let h="";
    for(let i=orders.length;i<(day===0?1:3);i++)
      h+='<div class="od odg" aria-hidden="true"></div>';
    return h+(orders.length?"":`<div id="closed">${pxIcon('moon')} 今日已打烊</div>`);
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
    return `<div class="c${c&&c.k==='w'?" wc":""}${forgeFlashes.get(i)===c?" forge-complete":""}${magicSet.has(i)?" mg":""}${isOff(i)?" off":""}${leaves.has(i)?" has-leaf":""}${frozen.has(i)?" is-frozen":""}${heat[i]>0?" is-overheated":""}"
      style="${heat[i]>0?workshopHeatStyle(heat[i]):""}${magicSet.has(i)?`animation-delay:-${Date.now()%1400}ms`:""}"
      data-i="${i}" data-piece-kind="${c?.k||'empty'}">${h}${c?.k==='p'?'<span class="piece-stage">'+NM[c.t]+'胚</span>':''}${c?.k==='w'&&!hold.has(i)&&!shown.has(i)?forgeCellLabel(c):''}${seasonCellHTML(i)}${heat[i]>0?`<span class="ht">${heat[i]}</span>`:""}${magicSet.has(i)?`<span class="mgs" style="animation-delay:-${Date.now()%1800}ms">✦</span>`:""}</div>`;
  }).join("");

  renderBlueprintCells();renderElementTiles();if(typeof renderWorkshopMomentumBars==='function')renderWorkshopMomentumBars();if($('greenhouseP').style.display==='flex')renderGreenhousePanel();
  $("tools").innerHTML=`<div class="tl2">模具</div>
    <span class="dm" data-drag="mold">${mold(MQ[0],"","f")}</span>
    <div class="mq">${MQ.slice(1,3).map(m=>mold(m,"","")).join("")}</div>`;
  const pouchSvg='<svg class="workshop-pouch-svg" viewBox="0 0 64 64" shape-rendering="crispEdges" aria-hidden="true"><path fill="#1e1510" d="M22 10h20v6h6v8h6v26h-6v6H16v-6h-6V24h6v-8h6z"/><path fill="#7a4c2a" d="M24 14h16v6h8v28H16V20h8z"/><path fill="#a66c3e" d="M18 22h28v10H18zM26 14h12v4H26z"/><path fill="#54331b" d="M18 32h28v4H18zM18 46h28v4H18z"/><path fill="#e6be62" d="M28 29h8v9h-8z"/><path fill="#fff1b8" d="M30 31h4v3h-4z"/><path fill="#c49458" d="M22 20h4v4h-4zM38 20h4v4h-4z"/></svg>';
  $("handSlot").innerHTML=hand!==null?
    '<div class="tl2">手持</div>'+`<span class="dm" data-drag="hand">${hand.k==='bp'?blueprintShapeHTML(hand.id,hand.rot||0):itemH(hand,1)}</span>`
    +'<button class="hand-stow" onclick="stowHand(event)" aria-label="收回手持物品" title="收回">×</button>'
    :'<div class="tl2">道具箱</div><button class="dm hand-bag" onclick="openHandBag()" aria-label="開啟道具箱" title="道具箱">'+pouchSvg+'</button>';

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
    +'<div class="sg">'+[0,1,2].map(m=>'<button class="si" data-m="'+m+'" '+(coins<MPR||!shopRemaining('m')?'disabled':'')+'>'+mold(m,'','f')+'<small>'+TY[m]+'模 '+pxIcon('coin')+MPR+'</small></button>').join('')+'</div>'
    +'<div class="sh">工具<span class="shop-stock">今日剩餘 '+shopRemaining('tool')+'/1</span></div>'
    +'<div class="sg sg-tools">'+toolItems.map(it=>'<button class="si si-tool" data-'+it.key+'="1" '+(coins<it.price||!shopRemaining('tool')?'disabled':'')+'><span class="forge-tool-icon" data-tool="'+it.key+'">'+forgeToolArt(it.key)+'</span><small>'+it.name+' '+pxIcon('coin')+it.price+'</small><span class="tool-desc">'+it.description+'</span></button>').join('')+'</div>'
    +'<div class="sh">礦石<span class="shop-stock">今日剩餘 '+shopRemaining('o')+'/3</span></div>'
    +'<div class="sg sg5">'+[0,1,2,3,4].map(t=>'<button class="si" data-o="'+t+'" '+(coins<OP[t]||!shopRemaining('o')?'disabled':'')+'><div class="q" style="background-color:'+C[t]+'">'+NM[t]+'</div><small>'+pxIcon('coin')+OP[t]+'</small></button>').join('')+'</div>'
    +'<div class="sh">鑽石（每日庫存，各限購一個）</div>'
    +(sk('gc')
      ?'<div class="sg">'+shopD.map((t,k)=>t===null?'<button class="si" disabled>已售完</button>':'<button class="si" data-d="'+k+'" '+(coins<DP[t]?'disabled':'')+'>'+gem(t,'f')+'<small>'+NM[t]+'鑽 '+pxIcon('coin')+DP[t]+'</small></button>').join('')+'</div>'
      :'<div class="shop-locked-note">'+pxIcon('lock')+' 學習訓練所「寶石匠」後開放購買鑽石</div>');

  syncPack();
  $("pack").className=packCap()?"":"all-locked";
  $("pack").innerHTML=`<span class="chest-icon">${pxIcon('chest')}</span><small>${pack.filter(Boolean).length}/${packCap()}</small>`;
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
