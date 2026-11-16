

/* 合成與預覽共用的材料、路徑判定 */
function moldMaterials(i,board=g){
  const ore=j=>board[j]&&board[j].k==='o'?board[j].t:-1;
  for(let t=4;t>=0;t--){
    const seen=new Set(),cells=[];
    nb(i).forEach(j=>{
      if(ore(j)===t&&!seen.has(j)){seen.add(j);cells.push(j)}
    });
    for(let k=0;k<cells.length;k++)nb(cells[k]).forEach(j=>{
      if(j!==i&&ore(j)===t&&!seen.has(j)){seen.add(j);cells.push(j)}
    });
    if(cells.length>=2)return {t,cells};
  }
  return null;
}
function forgePath(i,board=g){
  const gr=group(i,board);
  if(gr.length<3)return null;
  for(let n=Math.min(5,gr.length);n>=3;n--){
    const S=gr.slice(0,n);
    const adj=j=>nb(j).filter(x=>S.includes(x));
    const ends=S.filter(j=>adj(j).length===1);
    if(ends.length===2&&S.every(j=>adj(j).length<=2)){
      const path=[ends[0]];
      while(path.length<n)
        path.push(adj(path[path.length-1]).find(x=>!path.includes(x)));
      return path;
    }
  }
  return null;
}

function place(i,s2){
  if(day===0&&tutStage===2&&i!==17){say('請把鑽石模具放在棋盤中央的提示格。');return false;}
  if(cellBlock(i)){say(cellBlock(i));return false;}
  const mat=moldMaterials(i);
  if(!mat){say("模具要放在兩顆相鄰同階礦石的旁邊");return}
  const t=mat.t;
  const mm=mat.cells.reduce((a,j)=>a+(g[j].m||0),0)+(magicSet.has(i)?5:0);
  const oreFrom=expandedGameEnabled()?mat.cells.map(j=>({i:j,h:oreH(g[j].t,'',g[j].m||0)})):null;mat.cells.forEach(j=>g[j]=null);
  const s=s2!==undefined?s2:MQ.shift();
  if(s2===undefined&&MQ.length<3)MQ.push(rollM());
  g[i]=s===3?{k:'d',t,m:mm}:{k:'p',t,s,m:mm};
  tool=-1;fresh=i;
  say((mat.cells.length>2?"一次消耗了 "+mat.cells.length+" 顆礦石！":"")
    +(magicSet.has(i)?" ✨ 魔法 +5💰（賣出時結算）":""));
  if(expandedGameEnabled()){const ev={step:0,tg:i,from:oreFrom,to:[i],res:{[i]:workshopPieceHTML(g[i])}};fx.push(ev);const begin=fx.length;if(s!==3)forge(i);fx.slice(begin).forEach(e=>e.step++);}else if(s!==3)forge(i);
  return true;
}
function mergeGroup(){return expandedGameEnabled()?preview_mergeGroup(...arguments):stable_mergeGroup(...arguments);}
function stable_mergeGroup(i,lvl=0){
  const t=g[i].t,gr=group(i);
  if(gr.length<3)return [];
  let path=null;
  for(let n=Math.min(5,gr.length);n>=3&&!path;n--){
    const S=gr.slice(0,n),adj=j=>nb(j).filter(x=>S.includes(x));
    const ends=S.filter(j=>adj(j).length===1);
    if(ends.length===2&&S.every(j=>adj(j).length<=2)){
      path=[ends[0]];
      while(path.length<n)
        path.push(adj(path[path.length-1]).find(x=>!path.includes(x)));
    }
  }
  if(!path)return [];
  const n=path.length,tris=[];
  for(let k=0;k<n-2;k++)tris.push(path.slice(k,k+3));
  const mt=tris.map(tr=>tr.reduce((a,j)=>a+(g[j].m||0),0));
  const ev={
    step:lvl,tg:i,
    from:path.map(j=>({i:j,h:oreH(t,"",g[j].m||0)})),
    to:[],res:{}
  };
  fx.push(ev);
  path.forEach(j=>g[j]=null);
  let spots,tiers,ms;
  if(n===3){
    spots=[i];tiers=[t+1];ms=[mt[0]];
  }else if(n===4){
    spots=[path[1],path[2]];tiers=[t+1,t+1];ms=[mt[0],mt[1]];
  }else if(t+2<=4){
    spots=[path[2]];tiers=[t+2];ms=[mt[0]+mt[1]+mt[2]];
  }else{
    spots=[path[1],path[2],path[3]];tiers=[t+1,t+1,t+1];ms=mt;
  }
  spots.forEach((j,k)=>{
    g[j]={k:'o',t:tiers[k],m:ms[k]};
    ev.res[j]=oreH(tiers[k],"new",ms[k]);
  });
  ev.to=spots;
  return spots;
}
function preview_mergeGroup(i,lvl=0){
  const t=g[i].t,gr=group(i);
  if(gr.length<3||t>=4)return [];
  if(gr.length>=5){
    const cells=gr.slice(0,5),magic=cells.reduce((sum,j)=>sum+(g[j].m||0),0),tier=Math.min(4,t+2);
    const ev={step:lvl,tg:i,from:cells.map(j=>({i:j,h:oreH(t,"",g[j].m||0)})),to:[i],res:{}};fx.push(ev);
    cells.forEach(j=>g[j]=null);g[i]={k:'o',t:tier,m:magic};ev.res[i]=oreH(tier,"new",magic);return [i];
  }
  let path=null;
  for(let n=Math.min(5,gr.length);n>=3&&!path;n--){
    const S=gr.slice(0,n),adj=j=>nb(j).filter(x=>S.includes(x));
    const ends=S.filter(j=>adj(j).length===1);
    if(ends.length===2&&S.every(j=>adj(j).length<=2)){
      path=[ends[0]];
      while(path.length<n)
        path.push(adj(path[path.length-1]).find(x=>!path.includes(x)));
    }
  }
  if(!path)return [];
  const n=path.length,tris=[];
  for(let k=0;k<n-2;k++)tris.push(path.slice(k,k+3));
  const mt=tris.map(tr=>tr.reduce((a,j)=>a+(g[j].m||0),0));
  const ev={
    step:lvl,tg:i,
    from:path.map(j=>({i:j,h:oreH(t,"",g[j].m||0)})),
    to:[],res:{}
  };
  fx.push(ev);
  path.forEach(j=>g[j]=null);
  let spots,tiers,ms;
  if(n===3){
    spots=[i];tiers=[t+1];ms=[mt[0]];
  }else if(n===4){
    spots=[path[1],path[2]];tiers=[t+1,t+1];ms=[mt[0],mt[1]];
  }else if(t+2<=4){
    spots=[path[2]];tiers=[t+2];ms=[mt[0]+mt[1]+mt[2]];
  }else{
    spots=[path[1],path[2],path[3]];tiers=[t+1,t+1,t+1];ms=mt;
  }
  spots.forEach((j,k)=>{
    g[j]={k:'o',t:tiers[k],m:ms[k]};
    ev.res[j]=oreH(tiers[k],"new",ms[k]);
  });
  ev.to=spots;
  return spots;
}
function auto(i,l0=0){
  if(!sk('mm'))return;
  let up=0,q=[[i,l0]];
  while(q.length){
    const [p,l]=q.shift();
    if(!g[p]||g[p].k!=='o'||g[p].t>=4)continue;
    const r=mergeGroup(p,l);
    if(r.length){up++;q.push(...r.map(x=>[x,l+1]))}
  }
  if(up){
    say(up>1?"連鎖升階 ×"+up+"！":"自動合成升階！");
    qEach('chain',q=>{if(up>=q.n)qProg(q,q.n)});
  }
}
function merge(i){
  const c=g[i];
  if(c.k==='o'&&c.t>=4){say("已是最高階礦石");return}
  const gr=group(i);
  if(gr.length<3){say("需要三個以上相連的同類");return}
  if(c.k==='o'){
    if(!sk('mm'))say("需要「合成大師」技能才能合成礦石");
    else auto(i);
    return;
  }
  if(!forge(i))say("胚需要排成直線或彎線才能合成");
}
function forge(i){
  const path=forgePath(i);
  if(!path)return false;
  const n=path.length,tris=[];
  for(let k=0;k<n-2;k++)tris.push(path.slice(k,k+3));
  const ev={
    step:0,tg:i,
    from:path.map(j=>({i:j,h:`<div class="t2">${mold(g[j].s,C[g[j].t])}${mb(g[j])}</div>`})),
    to:[],res:{}
  };
  fx.push(ev);
  const spots=n===3?[i]:tris.map((t,k)=>path[k+1]);
  const info=tris.map(t=>({
    w:COMBO.indexOf(t.map(j=>g[j].s).sort().join("")),
    wt:Math.floor(t.reduce((s,j)=>s+g[j].t,0)/3),
    cells:t,
    cs:t.map(j=>g[j].t).sort((x,y)=>y-x),
    parts:t.map(j=>({s:g[j].s,t:g[j].t})),
    mm:t.reduce((a,j)=>a+(g[j].m||0),0)
  }));
  const pt=path.map(j=>g[j].t);
  path.forEach(j=>{g[j]=null;heat[j]=hotSteps();justHeated.add(j)});
  const msgs=[];
  info.forEach((f,k)=>{
    let b=0,dm=0;const dts=[];
    [...new Set(f.cells.flatMap(nb))]
      .filter(j=>g[j]&&g[j].k==='d')
      .slice(0,3).forEach(j=>{
        b+=.3*(g[j].t+1);dm+=g[j].m||0;
        dts.push(g[j].t);g[j]=null;heat[j]=0;justHeated.delete(j);
      });
    g[spots[k]]={k:'w',t:f.wt,c:f.w,b,cs:f.cs,parts:f.parts,m:f.mm+dm,dts,statVersion:1};
    const wo=applyWeaponElement(g[spots[k]],spots[k]);recordWeaponCraft(wo);
    const emberGold=consumeAutumnForgeReward();if(emberGold)toast("🍂 落葉餘燼：鍛造獎金 +100 金幣（不計分）");
    (ev.forged||(ev.forged=[])).push({w:wo,i:spots[k]});
    if(day>0&&!testRun)rememberWeapon(wo);
    if(rankOf(wo)>rankOf(best[f.w]))
      best[f.w]={t:wo.t,cs:wo.cs,parts:wo.parts,b:wo.b,dts:wo.dts,m:wo.m,element:wo.element,stars:wo.stars,starXp:wo.starXp,statVersion:1};
    qOnForgeStats(wo);
    ev.to.push(spots[k]);
    msgs.push(NM[f.wt]+"級"+WN[f.w]+"（"+materialNote(wo)+"）"+(b?"（💎+"+Math.round(b*100)+"%）":""));
  });
  say("鍛造出 "+msgs.join("、")+"！");
  qEach('forge2',q=>{if(info.length>=q.n)qProg(q,q.n)});
  burnLeaves();
  const free=path.filter(j=>!spots.includes(j));
  if(free.length){
    const r=free[rnd(free.length)];
    const pr=sk('mm')>=3?.5:sk('mm')===2?.25:0;
    const dt=Math.random()<pr?pt[rnd(pt.length)]:0;
    g[r]={k:'o',t:dt};ev.to.push(r);
    ev.res[r]=oreH(dt,"new");auto(r,1);
  }
  saveHi();
  return true;
}