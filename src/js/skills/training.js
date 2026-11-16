
let trainingBranch='forge',trainingReadOnly=false;
function openLearnedForgeSkills(){trainingReadOnly=true;skMode='inspect';renderSk();$('sk').style.display='flex';}
function renderLearnedKitchenSkills(){
 const known=Object.entries(KITCHEN_SKILLS).filter(([k])=>kitchenLevel(k)>0);
 kitchenModal('👨‍🍳 已學餐廳技能',known.length?known.map(([k,s])=>'<div class="kitchen-skill"><span><b>'+s.icon+s.name+' Lv'+kitchenLevel(k)+'/3</b><small>'+s.desc[kitchenLevel(k)-1]+'</small></span></div>').join(''):'<p>尚未學習餐廳技能。完成第一天晚餐後取得技能點，再到城鎮的訓練所提升。</p>');
}
function switchTrainingBranch(branch){if(!expandedGameEnabled()||trainingReadOnly||!$('kitchenP').hidden||$('townP').style.display!=='flex'||$('sk').style.display!=='flex'||!['forge','kitchen'].includes(branch))return;trainingBranch=branch;renderSk();}
function renderKitchenTraining(){
 $('skp').textContent='餐廳技能點：⭐ '+kitchen.sp+' · 完成晚餐營業獲得，與冶煉廠分開計算。'+(Object.values(kitchen.skills).every(n=>!n)?' 第一點只能學習「料理大師」。':'');
 $('skc').innerHTML=Object.entries(KITCHEN_SKILLS).map(([key,s])=>{const level=kitchenLevel(key);return '<div class="skr"><div><b>'+s.icon+' '+s.name+'</b> '+('●'.repeat(level))+('○'.repeat(3-level))+'<br>'+s.desc.map((d,i)=>'<small class="'+(i<level?'gy':i===level?'nx':'ft')+'">'+(i<level?'✓ ':i===level?'▶ ':'')+'Lv'+(i+1)+'：'+d+'</small><br>').join('')+'</div><button data-kitchen-skill="'+key+'" '+(level>=3||kitchen.sp<1||Object.values(kitchen.skills).every(n=>!n)&&key!=='merge'?'disabled':'')+'>升級</button></div>';}).join('');$('skb').hidden=true;
}