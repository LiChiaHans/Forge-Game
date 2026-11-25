
function renderForgeSkillList(){
 const tot=Object.values(skills).reduce((a,b)=>a+b,0);
 $("skp").textContent="冶煉技能點：⭐ "+(sandboxSession?"∞":sp)+(tot===0?" · 第一點只能學習「合成大師」，解鎖後即可自由修習三大流派。":" · 點擊技能節點查看各級效果，或直接升級。");
 $("skc").innerHTML=renderSkillTree('forge',{points:sp,infinite:!!sandboxSession,readOnly:false});
 $("skb").hidden=skMode!=="end";
 $("skb").textContent=skMode==="end"?"進入第 "+(day+1)+" 天":"關閉";
}
function updateTrainingTabBadges(){
 const forgeMax=Object.keys(SK).every(k=>(skills[k]||0)>=3);
 const kitchenMax=!!kitchen&&Object.keys(KITCHEN_SKILLS).every(k=>kitchenLevel(k)>=3);
 const fSp=sandboxSession?'∞':sp,kSp=kitchen?kitchen.sp:0;
 $('trainingForge').innerHTML='<span>⚒ 冶煉廠</span><em class="st-tab-pill'+(forgeMax?' is-max':sp>0?' is-sp':'')+'">'+(forgeMax?'已滿':'⭐ '+fSp)+'</em>';
 $('trainingKitchen').innerHTML='<span>🍲 餐廳</span><em class="st-tab-pill'+(kitchenMax?' is-max':kSp>0?' is-sp':'')+'">'+(kitchenMax?'已滿':'⭐ '+kSp)+'</em>';
}
function openSkills(end){if(!skills.mm)trainingSelected.forge='mm';if(day===0){skMode=end?"end":"menu";renderSk();$("sk").style.display="flex";return;}if($('townP').style.display!=='flex'||!$('kitchenP').hidden){openLearnedForgeSkills();return;}trainingReadOnly=false;trainingBranch=(typeof isForgeEnabled==='function'&&!isForgeEnabled())?'kitchen':'forge';skMode='training';renderSk();$('sk').style.display='flex';}
function renderSk(){
 if(day===0){
  $('trainingTabs').hidden=true;
  $('trainingTitle').textContent='🌟 技能樹';
  $('sk').classList.remove('training-readonly');
  renderForgeSkillList();
  return;
 }
 const forgeOn=typeof isForgeEnabled!=='function'||isForgeEnabled();
 const kitchenOn=typeof isKitchenEnabled!=='function'||isKitchenEnabled();
 if($('trainingForge'))$('trainingForge').hidden=!forgeOn;
 if($('trainingKitchen'))$('trainingKitchen').hidden=!kitchenOn;
 if(!forgeOn&&trainingBranch==='forge')trainingBranch='kitchen';
 if(!kitchenOn&&trainingBranch==='kitchen')trainingBranch='forge';
 $('sk').classList.toggle('training-readonly',trainingReadOnly);
 $('trainingTabs').hidden=trainingReadOnly||!forgeOn||!kitchenOn;
 $('trainingTitle').textContent=trainingReadOnly?'⚒ 已學冶煉技能':'🛡 星盾訓練所';
 $('trainingForge').setAttribute('aria-pressed',String(trainingBranch==='forge'));
 $('trainingKitchen').setAttribute('aria-pressed',String(trainingBranch==='kitchen'));
 if(!trainingReadOnly)updateTrainingTabBadges();
 if(trainingReadOnly){
  const tot=Object.values(skills).reduce((a,b)=>a+b,0);
  $('skp').textContent=tot>0?'已修習 '+tot+' / '+(Object.keys(SK).length*3)+' 級 · 點擊節點查看詳細效果，到城鎮的星盾訓練所可升級技能。':'尚未學習冶煉技能。返回城鎮的星盾訓練所消耗技能點解鎖「合成大師」。';
  $('skc').innerHTML=renderSkillTree('forge',{points:0,infinite:false,readOnly:true});
  $('skb').hidden=true;
  return;
 }
 if(trainingBranch==='kitchen')return renderKitchenTraining();
 renderForgeSkillList();
}
$("skc").onclick=e=>{
 const sel=e.target.closest("[data-skill-select]");
 if(sel){
  const activeBranch=(day>0&&!trainingReadOnly&&trainingBranch==="kitchen")?"kitchen":"forge";
  trainingSelected[activeBranch]=sel.dataset.skillSelect;
  renderSk();
  return;
 }
 if(day>0){
  if(trainingReadOnly||$("sk").style.display!=="flex"||$("townP").style.display!=="flex")return;
  if(trainingBranch==="kitchen"){
   const kitchenButton=e.target.closest("[data-kitchen-skill],[data-tree-upgrade]");
   if(kitchenButton&&!kitchenButton.disabled){
    const key=kitchenButton.dataset.kitchenSkill||kitchenButton.dataset.treeUpgrade;
    trainingSelected.kitchen=key;
    trainingFlash={branch:'kitchen',key};
    upgradeKitchenSkill(key);
   }
   return;
  }
 }
 const b=e.target.closest("[data-k],[data-tree-upgrade]");
 if(!b||b.disabled)return;
 const key=b.dataset.k||b.dataset.treeUpgrade;
 const tot=Object.values(skills).reduce((a,c)=>a+c,0);
 if(!SK[key]||skills[key]>=3||sp<1||(tot===0&&key!=="mm"))return;
 trainingSelected.forge=key;
 trainingFlash={branch:'forge',key};
 skills[key]++;if(key==='cd')heat=heat.map(h=>Math.max(0,h-10));sp--;spentToday++;
 const surplus=convertWorkshopSurplus('forge');if(surplus)toast('冶煉技能已滿，多餘技能點轉換 '+surplus+' 金幣。');
 syncPack();renderSk();render();if($("townP").style.display==="flex")renderTown();saveNow();
};
$("skb").onclick=()=>{
 $("sk").style.display="none";
 if($("rw").style.display==="flex"&&spentToday>0)skillDone=true;
 renderRw();
};
