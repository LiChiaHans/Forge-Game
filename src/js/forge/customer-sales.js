
function removeOrder(k){
  const card=document.querySelector('.od[data-k="'+k+'"]');
  const r=card&&card.getBoundingClientRect(),gh=card&&card.cloneNode(true);
  dServed++;
  if(dLeft>0){
    orders[k]=dq.shift();dLeft--;
    enter.set(k,Date.now()+600);gameTimeout(bell,600);
  }else{
    orders.splice(k,1);exitMs=900;
  }
  if(gh)leave(gh,r);
}
function checkWait(){
  let n=0;
  for(let k=orders.length-1;k>=0;k--){
    if(orders[k].wait<=0){removeOrder(k);n++}
  }
  if(n){qEach('safe',q=>q.failed=true);lives-=n;say("客人等太久離開了！生命 -"+n)}
}
function gameOver(why){active=false;cancelKitchenDrag();clearKitchenIngredientFlights();clearKitchenDepartures();$("kitchenP").hidden=true;$("kitchenModal").hidden=true;
  stopExpeditionPlayback();$("expeditionP").style.display="none";$("weaponStatsP").style.display="none";
  $("townP").style.display="none";
  saveHi();removeSave(runId);
  if(day===0){
    ov("格子滿了","教學卡住了，重新試一次吧！","重做教學",()=>start("tut"));
    return;
  }
  ov("遊戲結束",why+"第 "+day+" 天，累計分數 "+score()+"。服務 "+all+" 位客人、完成 "+qDone+" 個任務。歷史最高 "+hi+"。"+rec(),"再來一局",beginNewCharacter);
}
function cancelOrder(k){
  if(!orders[k])return;
  qEach('safe',q=>q.failed=true);lives--;say("已取消訂單，生命 -1");removeOrder(k);render();
  const T=exitMs;exitMs=0;
  gameTimeout(()=>{
    if(lives<=0)gameOver("生命用完了。");
    else if(!orders.length)endDay();
  },T);
}
function dropGem(t){
  const em=[];
  g.forEach((x,j)=>{if(!x&&heat[j]<=0&&!cellBlock(j))em.push(j)});
  if(!em.length)return;
  const j=em[rnd(em.length)];
  g[j]={k:'d',t,m:0};fresh=j;
  say(forgeMessageText()+" 💎 掉落一顆"+NM[t]+"鑽！");
}
function sellW(c,k,clear){
  if(c?.protected){toast('這把武器已受保護，請先取消保護');return false;}const o=orders[k];
  if(o.c!==null&&o.c!==c.c){say("這位客人要的是"+WN[o.c]);return false}
  if(c.t<o.t){say("品質不夠，這位客人需要"+NM[o.t]+"級以上");return false}
  const mg=c.m||0,p=salePrice(c,o);
  coins+=p;earned+=p;dEarn+=p;dMagic+=mg*10;
  clear();all++;dSold++;saveHi();
  const magicGold=mg?p-salePrice({...c,m:0},o):0;
  say("成交！+"+p+" 金幣"+(mg?"（附魔 "+weaponStats(c).stacks+" 層 · 額外金幣 +"+magicGold+"）":"")
    +(sk("mc")?"，大商人 +"+10*sk("mc")+"%":"")+seasonSaleNote(c)+(guestPreferenceBonus(c,o,false)?'，喜好 +10%':''));
  qOnSale(c,p);recordFestival('weapon',c);
  if(c.dts&&c.dts.length&&sk('gc')>=2&&Math.random()<.25)
    dropGem(sk('gc')>=3?Math.max(...c.dts):0);
  removeOrder(k);
  return true;
}
const sellTo=(i,k)=>sellW(g[i],k,()=>{g[i]=null});
function over(){
  if(legendProjects.length)return false;
  if(!g.every((c,i)=>c||heat[i]>0||isOff(i)||cellBlock(i)))return false;
  // 有可用的暴風雪（或買得起）時，保留解除過熱死局的機會。
  if(heat.some((h,i)=>h>0&&!g[i]&&!cellBlock(i))&&
    ((hand&&hand.k==='z')||bag.some(it=>it.k==='z')||(coins>=BLIZZP&&shopRemaining('tool')>0)))return false;
  if(pack.some(w=>w&&sellable(w)))return false;
  return !g.some((c,i)=>c&&(
    c.k==='w'?(sellable(c)||pack.includes(null))
    :c.k==='d'?false
    :c.k==='o'&&!sk('mm')?false
    :!(c.k==='o'&&c.t>=4)&&group(i).length>=3
  ));
}
