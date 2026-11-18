

/* 拖曳預覽：只讀取棋盤，不消耗材料 */
let drag=null;
const at=(x,y,sel)=>{
  const el=document.elementFromPoint(x,y);
  return el&&el.closest(sel);
};
function clearPrediction(){
  document.querySelectorAll(".pv-use,.pv-forge,.pv-target,.pv-bad,.pv-sale").forEach(el=>{
    el.classList.remove("pv-use","pv-forge","pv-target","pv-bad","pv-sale");
  });
  document.querySelectorAll(".forge-preview-label").forEach(el=>el.remove());
  $("prediction").hidden=true;
}
function showPrediction(title,detail,bad=false){
  const box=$("prediction");
  box.hidden=false;box.classList.toggle("bad",bad);
  box.innerHTML="<b>"+esc(title)+"</b>"+esc(detail);
}
function markPrediction(i,cls){
  const el=$("grid").children[i];
  if(el)el.classList.add(cls);
}
function predictMold(i,s){
  const mat=moldMaterials(i);
  if(!mat)return null;
  const board=g.map(x=>x?{...x}:null);
  const mm=mat.cells.reduce((a,j)=>a+(board[j].m||0),0)
    +(magicSet.has(i)?5:0);
  mat.cells.forEach(j=>board[j]=null);
  board[i]=s===3?{k:'d',t:mat.t,m:mm}:{k:'p',t:mat.t,s,m:mm};
  const path=s===3?null:forgePath(i,board),weapons=[],gems=[];
  if(path){
    const tris=Array.from({length:path.length-2},(_,k)=>path.slice(k,k+3));
    const info=tris.map(cells=>({
      k:'w',
      c:COMBO.indexOf(cells.map(j=>board[j].s).sort().join("")),
      t:Math.floor(cells.reduce((a,j)=>a+board[j].t,0)/3),
      m:cells.reduce((a,j)=>a+(board[j].m||0),0),
      cs:cells.map(j=>board[j].t).sort((x,y)=>y-x),
      parts:cells.map(j=>({s:board[j].s,t:board[j].t})),
      b:0,cells
    }));
    path.forEach(j=>board[j]=null);
    info.forEach((w,k)=>{
      [...new Set(w.cells.flatMap(nb))]
        .filter(j=>board[j]&&board[j].k==='d')
        .slice(0,3).forEach(j=>{
          (w.dts||(w.dts=[])).push(board[j].t);w.b+=.3*(board[j].t+1);
          w.m+=board[j].m||0;gems.push(j);board[j]=null;
        });
      w.target=workshopRecipeWindows(path,i)[k].target;applyWeaponElement(w,w.target);weapons.push(w);
      board[path.length===3?i:path[k+1]]=w;
    });
  }
  return {mat,mm,path,weapons,gems};
}
function mv(e){
  if(!drag)return;
  drag.distance=Math.max(drag.distance||0,Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY));
  drag.gh.style.left=e.clientX+"px";
  drag.gh.style.top=e.clientY+"px";
  document.querySelectorAll(".hl,.hl2").forEach(o=>o.classList.remove("hl","hl2"));
  clearPrediction();
  const k=drag.kind;
  if(k==="hand"&&hand?.k==="bp"){blueprintDragPreview(e);return;}

  if(k==="w"||k==="p"||(k==="hand"&&hand&&hand.k==='w')){
    const w=k==="w"?g[drag.i]:k==="p"?pack[drag.i]:hand;
    const od=at(e.clientX,e.clientY,".od");
    if(od&&w){
      const o=orders[+od.dataset.k];
      const why=w.protected?'這把武器已受保護':o.c!==null&&o.c!==w.c
        ?"需要"+WN[o.c]+"，這把是"+WN[w.c]
        :w.t<o.t?"需要"+NM[o.t]+"級以上，這把是"+NM[w.t]+"級":"";
      od.classList.add(why?"pv-bad":"pv-sale");
      showPrediction(
        why?"無法出售":"放開成交：+"+salePrice(w,o)+" 金幣",
        why||(materialNote(w)+" · 分數 +"+salePrice(w,o)*10+" · 已包含材料、鑽石、魔法與商人加成"+seasonSaleNote(w)),
        !!why
      );
      return;
    }
    if(at(e.clientX,e.clientY,'#pack')){
      const full=!pack.slice(0,packCap()).some(x=>!x),locked=!packCap();
      showPrediction(locked?'武器箱尚未解鎖':full?'武器箱已滿':'放開收進武器箱',locked?'升級武器箱技能即可解鎖':full?'請先取出箱內武器':'點擊箱子可取到手持欄，再放回棋盤',locked||full);
    }else if(k==='hand'){
      const cell=at(e.clientX,e.clientY,'.c');
      if(cell){const i=+cell.dataset.i,why=isOff(i)?'這格尚未開放':cellBlock(i)|| (g[i]?'這格已有物件':heat[i]>0?'這格仍在過熱':'');markPrediction(i,why?'pv-bad':'pv-target');showPrediction(why?'無法放置':'放開放回棋盤',why||'保留武器的品質、鑽石與魔法加成',!!why);}
      else showPrediction('拖到棋盤、客人或武器箱','空格可放置；客人可出售；箱子可收納');
    }else showPrediction('拖到客人或武器箱','客人可出售；箱子可收納');
    return;
  }

  const d=at(e.clientX,e.clientY,".c");
  if(!d){
    showPrediction("拖到棋盤查看放置結果","金框＝消耗材料；紫框＝參與鍛造；綠框＝放置位置");
    return;
  }
  const i=+d.dataset.i,h=k==="hand"?hand:null;
  let why=isOff(i)?"這格尚未在教學中開放":cellBlock(i);
  if(h&&h.k==='ess'){const blocked=isOff(i)||frozen.has(i)||leaves.has(i)||elementTiles.get(i)===h.element;markPrediction(i,blocked?'pv-bad':'pv-target');showPrediction(blocked?'無法附魔':'放開設置'+elementName(h.element)+'屬性附魔格',blocked?'冰凍、落葉與同屬性格不能使用；精華會保留。':'當天有效，藍圖不會蓋掉效果，武器在此生成時取得屬性。',blocked);return;}
  if(h&&h.k==='l'){
    markPrediction(i,lives>=3?"pv-bad":"pv-target");
    showPrediction(lives>=3?"愛心已滿":"放開使用生命藥水",lives>=3?"生命藥水不會消耗":"恢復一顆愛心，不消耗步數",lives>=3);return;
  }
  if(h&&h.k==='z'){
    markPrediction(i,"pv-target");
    showPrediction("放開施放暴風雪","消耗 1 個暴風雪，將全盤過熱步數歸零；不清除棋盤上的物品，也不消耗步數。");
    return;
  }

  if(!why&&h&&h.k==='f'){
    why=g[i]?.k==='w'?"焚燒工具不能焚燒武器":g[i]?"":"這裡沒有可焚燒的物件";
    markPrediction(i,why?"pv-bad":"pv-target");
    showPrediction(
      why?"無法使用":"放開焚燒這個物件",
      why||"會消耗 1 個焚燒工具；原有過熱步數不變",
      !!why
    );
    return;
  }
  if(!why&&h&&h.k==='u'){
    why=!g[i]||g[i].k!=='o'?"請選擇礦石"
      :g[i].t>=4?"已經是最高階礦石":"";
    markPrediction(i,why?"pv-bad":"pv-target");
    showPrediction(
      why?"無法升級":"放開升級："+NM[g[i].t]+" → "+NM[g[i].t+1],
      why||"升級後可能觸發連鎖合成",!!why
    );
    return;
  }
  if(!why)why=g[i]?"這格已有物件"
    :heat[i]>0?"過熱中，還要 "+heat[i]+" 步才能放置":"";
  if(why){
    markPrediction(i,"pv-bad");
    showPrediction("無法放置",why,true);return;
  }

  if(k==="mold"||h&&h.k==='m'){
    const s=k==="mold"?MQ[0]:h.s,r=predictMold(i,s);
    if(!r){
      markPrediction(i,"pv-bad");
      showPrediction("無法製胚","附近至少需要兩顆同階礦石",true);return;
    }
    r.mat.cells.forEach(j=>markPrediction(j,"pv-use"));
    (r.path||[]).forEach(j=>markPrediction(j,"pv-forge"));
    r.gems.forEach(j=>markPrediction(j,"pv-use"));
    markPrediction(i,"pv-target");
    const detail="消耗 "+r.mat.cells.length+" 顆"+NM[r.mat.t]
      +"礦 → "+NM[r.mat.t]+(s===3?"鑽石":TY[s]+"胚");
    if(r.weapons.length){
      markForgeOutputs(r.weapons);
      const names=r.weapons.map(w=>NM[w.t]+"級"+WN[w.c]+"（"+materialNote(w)+"）"
        +(w.b?"（鑽石 +"+Math.round(w.b*100)+"%）":"")
        +(w.m?"（魔法 +"+w.m+"）":"")).join("、");
      showPrediction(
        "放開鍛造 "+r.weapons.length+" 把："+names,
        detail+"。參與鍛造的胚格將過熱 "+hotSteps()+" 步；鑽石格立即空出，另隨機掉落礦石。"
      );
    }else{
      showPrediction(
        "放開製作"+(s===3?"鑽石":"胚"),
        detail+(r.mm?" · 魔法累積 +"+r.mm+" 金幣":"")+"。"
        +(s===3?"貼著胚，鍛造時會自動鑲嵌。":"尚未連成三個胚，不會鍛造。")
      );
    }
    return;
  }
  markPrediction(i,"pv-target");
  showPrediction(
    "放開放置"+itemName(h||{k:"o",t:Q[0]}),
    h?.k==='d'?"貼著胚，鍛造時自動鑲嵌；售價加成 "+30*(h.t+1)+"%。"
      :h?.k==='w'?"舊存檔保留的武器，可放回空格後出售。"
      :h?.k==='p'?"舊存檔保留的胚，放置後可能觸發鍛造。"
      :"相鄰同階礦石可能觸發合成。"
  );
}
function startDrag(e,kind,i,html,src){
  const gh=document.createElement("div");
  gh.className="drag";gh.innerHTML=html;document.body.appendChild(gh);
  drag={kind,i,gh,startX:e.clientX,startY:e.clientY,distance:0};src.style.opacity=.35;mv(e);
  document.addEventListener("pointermove",mv);
  document.addEventListener("pointerup",up);
  document.addEventListener("pointercancel",up);
}
function dropOn(kind,x,y){
  const d=at(x,y,".c");
  if(!d){render();return}
  const i=+d.dataset.i;
  if(kind==="hand"&&hand?.k==="bp"){placeBlueprint(i);return;}
  if(kind==="hand"&&hand?.k==='ess'){useEssence(i);return;}
  if(kind==="hand"&&hand.k==='l'){useLifePotion();return;}
  if(kind==="hand"&&hand.k==='z'){
    castForgeBlizzard();return;
  }
  if(isOff(i)){render();return}
  if(cellBlock(i)){say(cellBlock(i));render();return;}
  if(kind==="hand"&&hand.k==='f'){
    if(!g[i]){say("要拖到有東西的格子上");render();return}
    if(g[i].k==='w'){say("焚燒工具不能焚燒武器，道具保留。");render();return;}
    g[i]=null;hand=null;say("🔥 燒掉了一個物件");settle();return;
  }
  if(kind==="hand"&&hand.k==='u'){
    if(!g[i]||g[i].k!=='o'){say("要拖到礦石上");render();return}
    if(g[i].t>=4){say("已是最高階礦石");render();return}
    g[i].t++;hand=null;fresh=i;say("⬆️ 礦石升了一階！");
    thud();auto(i);settle();return;
  }
  if(g[i]){say("要放在空格上");render();return}
  if(heat[i]>0){say("過熱中，還要 "+heat[i]+" 步才能放置");render();return}
  if(kind==="mold"||(kind==="hand"&&hand.k==='m')){
    const hm=kind==="hand";
    if(!place(i,hm?hand.s:undefined)){render();return}
    if(hm)hand=null;
    cool();
  }else{
    const h=hand;
    g[i]=h.k==='d'?{k:'d',t:h.t}:h.k==='o'?{k:'o',t:h.t}:{...h};
    hand=null;fresh=i;say("");magicAt(i);
    if(h.k==='o'){thud();auto(i)}
    else if(h.k==='p')forge(i);
    cool();
  }
  settle();
}
function up(e){
  if(!drag)return;
  const {kind,i,gh,distance}=drag;drag=null;gh.remove();clearPrediction();
  document.querySelectorAll(".hl,.hl2").forEach(o=>o.classList.remove("hl","hl2"));
  document.removeEventListener("pointermove",mv);
  document.removeEventListener("pointerup",up);
  document.removeEventListener("pointercancel",up);
  if(e.type!=="pointerup"){render();return}
  const x=e.clientX,y=e.clientY;
  if(kind==="w"||kind==="p"||(kind==="hand"&&hand&&hand.k==='w')){
    const w=kind==="w"?g[i]:kind==="p"?pack[i]:hand;
    if(!w){render();return}
    if(kind==="w"&&(distance||0)<=8){const cell=at(x,y,".c");if(cell&&+cell.dataset.i===i){render();openCraftedWeapon(w,"棋盤上的武器");return;}}
    const clr=kind==="w"?()=>{g[i]=null}:kind==="p"?()=>{pack[i]=null}:()=>{hand=null};
    const bpCell=at(x,y,".c");if(bpCell&&blueprintSlotAt(+bpCell.dataset.i)){fillBlueprint(+bpCell.dataset.i,w,clr);return;}
    const od=at(x,y,".od");
    if(od){
      if(sellW(w,+od.dataset.k,clr))settle();else render();
      return;
    }
    if(kind!=='p'&&at(x,y,'#pack')){storeWeapon(w,clr);return;}
    if(kind==='hand'){dropOn(kind,x,y);return;}
    render();return;
  }
  dropOn(kind,x,y);
}

$("grid").addEventListener("pointerdown",e=>{
  if(busy||e.button>0)return;
  const d=e.target.closest(".c");if(!d)return;
  const i=+d.dataset.i,c=g[i];
  if(!c||c.k!=='w')return;
  e.preventDefault();
  startDrag(e,"w",i,hex(c.c,bands(c),"",c.t,c),d);
});
$("side").addEventListener("pointerdown",e=>{
  if(busy||e.button>0)return;
  const t=e.target.closest("[data-drag]");if(!t)return;
  e.preventDefault();const kind=t.dataset.drag;
  startDrag(e,kind,null,kind==="mold"?mold(MQ[0],"","f"):itemH(hand,1),t);
});
$("shop").onclick=e=>{
  const button=e.target.closest('button');if(!button||button.disabled)return;
  const d=button.dataset;let it,cost,category,diamond=-1;
  if(d.m!==undefined){it={k:'m',s:+d.m};cost=MPR;category='m';}
  else if(d.f!==undefined){it={k:'f'};cost=FIREP;category='tool';}
  else if(d.u!==undefined){it={k:'u'};cost=UPGP;category='tool';}
  else if(d.z!==undefined){it={k:'z'};cost=BLIZZP;category='tool';}
  else if(d.l!==undefined){it={k:'l'};cost=LIFEP;category='tool';}
  else if(d.o!==undefined){it={k:'o',t:+d.o};cost=OP[+d.o];category='o';}
  else if(d.d!==undefined){diamond=+d.d;if(!sk('gc')||shopD[diamond]==null)return;it={k:'d',t:shopD[diamond]};cost=DP[it.t];}
  else return;
  if(coins<cost){say('金幣不足');return;}
  if(category&&!shopRemaining(category)){say('這類商品今日已達購買上限，明天補貨。');render();return;}
  coins-=cost;if(category)shopBought[category]=(shopBought[category]||0)+1;
  if(diamond>=0)shopD[diamond]=null;
  bag.push(it);say('已放入道具箱：'+itemName(it));render();saveNow();
};
$("bagC").onclick=e=>{
  const b=e.target.closest("button");if(!b)return;
  const idx=bag.findIndex(x=>itemKey(x)===b.dataset.k);
  if(idx<0)return;
  if(bag[idx].k==='bp'){openLegendBlueprint(bag[idx].id);return;}
  if(hand!==null)bag.push(hand);
  hand=bag.splice(idx,1)[0];closeP("bagP");
  say("已拿到手持欄："+itemName(hand)+"，拖到棋盤上使用");render();
};
