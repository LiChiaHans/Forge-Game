
function renderForgeSkillList(){
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
function openSkills(end){if(day===0){skMode=end?"end":"menu";renderSk();$("sk").style.display="flex";return;}if($('townP').style.display!=='flex'||!$('kitchenP').hidden){openLearnedForgeSkills();return;}trainingReadOnly=false;trainingBranch='forge';skMode='training';renderSk();$('sk').style.display='flex';}
function renderSk(){if(day===0){$('trainingTabs').hidden=true;$('trainingTitle').textContent='🌟 技能';$('sk').classList.remove('training-readonly');renderForgeSkillList();return;}$('sk').classList.toggle('training-readonly',trainingReadOnly);$('trainingTabs').hidden=trainingReadOnly;$('trainingTitle').textContent=trainingReadOnly?'⚒ 已學冶煉技能':'🌟 訓練所';$('trainingForge').setAttribute('aria-pressed',String(trainingBranch==='forge'));$('trainingKitchen').setAttribute('aria-pressed',String(trainingBranch==='kitchen'));if(trainingReadOnly){const known=Object.keys(SK).filter(k=>skills[k]>0);$('skp').textContent='到城鎮的訓練所提升技能。';$('skc').innerHTML=known.length?known.map(k=>'<div class="skr"><b>'+SK[k].i+' '+SK[k].n+' Lv'+skills[k]+'/3</b><br>'+SK[k].d.slice(0,skills[k]).map((d,i)=>'<small>✓ Lv'+(i+1)+'：'+d+'</small><br>').join('')+'</div>').join(''):'<p>尚未學習冶煉技能。</p>';$('skb').hidden=true;return;}if(trainingBranch==='kitchen')return renderKitchenTraining();renderForgeSkillList();}
$("skc").onclick=e=>{
  if(day>0){if(trainingReadOnly||$("sk").style.display!=="flex"||$("townP").style.display!=="flex")return;const kitchenButton=e.target.closest("[data-kitchen-skill]");if(trainingBranch==="kitchen"){if(kitchenButton&&!kitchenButton.disabled)upgradeKitchenSkill(kitchenButton.dataset.kitchenSkill);return;}}
  const b=e.target.closest("button");
  if(!b||b.disabled)return;
  skills[b.dataset.k]++;if(b.dataset.k==='cd')heat=heat.map(h=>Math.max(0,h-10));sp--;spentToday++;
  const surplus=convertWorkshopSurplus('forge');if(surplus)toast('冶煉技能已滿，多餘技能點轉換 '+surplus+' 金幣。');
  syncPack();renderSk();render();if($("townP").style.display==="flex")renderTown();saveNow();
};
$("skb").onclick=()=>{
  $("sk").style.display="none";
  if($("rw").style.display==="flex"&&spentToday>0)skillDone=true;
  renderRw();
};
