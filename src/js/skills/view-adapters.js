
function stage19_openSkills(end){
  if(day>0&&!testRun&&$("townP").style.display!=="flex"){toast("請回城鎮，在訓練所提升技能");return;}
  skMode=end?"end":"menu";renderSk();$("sk").style.display="flex";
}
function stage19_renderSk(){
  const tot=Object.values(skills).reduce((a,b)=>a+b,0);
  $("skp").textContent="技能點：⭐ "+(sandboxSession?"∞":sp)+(tot===0?"（第一次只能選「合成大師」）":"");
  $("skc").innerHTML=Object.keys(SK).map(k=>{
    const L=skills[k],lock=tot===0&&k!=="mm",mx=L>=3;
    return `<div class="skr"><div><b>${SK[k].i} ${SK[k].n}</b> ${"●".repeat(L)}${"○".repeat(3-L)}<br>
    ${SK[k].tip?`<small class="tp">${SK[k].tip}</small><br>`:""}
    ${SK[k].d.map((x,j)=>`<small class="${j<L?"gy":j===L?"nx":"ft"}">${j<L?"✓ ":j===L?"▶ ":""}Lv${j+1}：${x}</small><br>`).join("")}
    </div><button data-k="${k}" ${(sp<1||mx||lock)?"disabled":""}>升級</button></div>`;
  }).join("");
  $("skb").hidden=skMode!=="end";
  $("skb").textContent=skMode==="end"?"進入第 "+(day+1)+" 天":"關閉";
}
function stage19_visitTrainingFromGame(){if(day<=0){openSkills(false);return;}showTown();}
function stage19_openKitchenSkills(){kitchenModal('👨‍🍳 廚房技能樹','<p>廚房技能點：'+(sandboxSession?'∞':kitchen.sp)+'。與冶煉廠技能獨立。</p>'+Object.entries(KITCHEN_SKILLS).map(([key,s])=>'<div class="kitchen-skill"><span><b>'+s.icon+s.name+' Lv'+kitchenLevel(key)+'/3</b><small>'+s.desc[Math.min(2,kitchenLevel(key))]+'</small></span><button onclick="upgradeKitchenSkill(\''+key+'\')" '+(kitchenLevel(key)>=3?'disabled':'')+'>'+(kitchenLevel(key)>=3?'已滿':'升級')+'</button></div>').join(''));}
function stage19_walkCityPet(w){
 if(lowEffects)return;
 if(architect.active||townMotionPaused||w.epoch!==cityArtEpoch)return;const route=petRoute(w.point);if(route.length<2)return;const rect=$('townMap').getBoundingClientRect(),dist=[0];for(let i=1;i<route.length;i++)dist.push(dist[i-1]+Math.hypot(route[i][0]-route[i-1][0],route[i][1]-route[i-1][1]));const total=dist.at(-1),tf=p=>'translate3d('+((p[0]-w.origin[0])*rect.width/360)+'px,'+((p[1]-w.origin[1])*rect.height/620)+'px,0) scale('+(petDepthScale(p[1])/petDepthScale(w.origin[1]))+')';
 const end=route.at(-1);w.el.style.transform=tf(end);w.el.classList.add('decor-walking');const a=w.el.animate(route.map((p,i)=>({transform:tf(p),offset:dist[i]/total})),{duration:Math.max(3500,Math.min(22000,total/27*1000)),easing:'linear'});w.anim=a;townDecorAnimations.add(a);a.onfinish=()=>{w.anim=null;w.el.classList.remove('decor-walking');townDecorAnimations.delete(a);w.point=end;if(w.epoch!==cityArtEpoch)return;w.timer=gameTimeout(()=>{w.timer=null;walkCityPet(w);},1400+rnd(1800));};
}