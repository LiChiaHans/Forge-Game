
let trainingBranch='forge',trainingReadOnly=false,trainingSelected={forge:'mm',kitchen:'merge'},trainingFlash=null;
const TRAINING_TREES={
 forge:{
  root:'mm',
  rootTag:'核心起點',
  rootName:'合成大師',
  branches:[
   {id:'mine',name:'採礦散熱',icon:'⛏️',accent:'amber',nodes:['mn','cd']},
   {id:'arcane',name:'寶石附魔',icon:'💎',accent:'violet',nodes:['gc','mg']},
   {id:'trade',name:'商貿倉儲',icon:'💰',accent:'emerald',nodes:['mc','wb']}
  ],
  tags:{mm:'升階＋返礦',mn:'高階礦機率',cd:'縮短過熱',gc:'鑽石鑲嵌',mg:'魔法格加價',mc:'售價加乘',wb:'擴充暫存格'}
 },
 kitchen:{
  root:'merge',
  rootTag:'核心起點',
  rootName:'料理大師',
  branches:[
   {id:'prep',name:'採買火候',icon:'🔥',accent:'coral',nodes:['purchase','cool']},
   {id:'cold',name:'保鮮儲藏',icon:'🧊',accent:'cyan',nodes:['fresh','pack']},
   {id:'fame',name:'風味口碑',icon:'🌿',accent:'emerald',nodes:['spice','patience']}
  ],
  tags:{merge:'升階＋返料',purchase:'高階食材率',cool:'縮短餘熱',fresh:'延長保鮮期',pack:'擴充冰箱格',spice:'調味加價',patience:'延長耐心'}
 }
};
function trainingSkillMeta(branch,key){
 if(branch==='kitchen'){
  const s=KITCHEN_SKILLS[key];
  return {key,name:s.name,icon:s.icon,tip:'',desc:s.desc,level:kitchenLevel(key),tag:TRAINING_TREES.kitchen.tags[key]||''};
 }
 const s=SK[key];
 return {key,name:s.n,icon:s.i,tip:s.tip||'',desc:s.d,level:skills[key]||0,tag:TRAINING_TREES.forge.tags[key]||''};
}
function trainingBranchOf(branch,key){
 const cfg=TRAINING_TREES[branch];
 if(key===cfg.root)return {name:'核心基礎',icon:branch==='kitchen'?'🥣':'⚒️',accent:'gold'};
 return cfg.branches.find(b=>b.nodes.includes(key))||{name:'專精流派',icon:'✦',accent:'gold'};
}
function trainingPipsHtml(level){
 let out='<span class="st-pips" aria-label="等級 '+level+' / 3">';
 for(let i=0;i<3;i++)out+='<i class="st-pip'+(i<level?' is-on':'')+'"></i>';
 return out+'</span>';
}
function ensureTrainingSelection(branch){
 const cfg=TRAINING_TREES[branch];
 const allKeys=[cfg.root,...cfg.branches.flatMap(b=>b.nodes)];
 if(!allKeys.includes(trainingSelected[branch]))trainingSelected[branch]=cfg.root;
 return trainingSelected[branch];
}
function renderTrainingNode(branch,key,opts){
 const m=trainingSkillMeta(branch,key),cfg=TRAINING_TREES[branch];
 const isRoot=key===cfg.root,locked=!isRoot&&!opts.rootUnlocked,maxed=m.level>=3;
 const canUp=!opts.readOnly&&!locked&&!maxed&&opts.points>=1;
 const selected=opts.selectedKey===key;
 const flashed=trainingFlash&&trainingFlash.branch===branch&&trainingFlash.key===key;
 const stateClass=maxed?'is-max':locked?'is-locked':canUp?'is-ready':m.level>0?'is-learned':'is-idle';
 const badgeHtml=maxed?'<span class="st-badge is-max">MAX</span>':locked?'<span class="st-badge is-lock">🔒</span>':canUp?'<span class="st-badge is-up">⭐</span>':'<span class="st-badge is-lv">Lv'+m.level+'</span>';
 const attr=branch==='kitchen'?'data-kitchen-skill="'+key+'"':'data-k="'+key+'"';
 const btnLabel=locked?'🔒 未解鎖':maxed?'✦ 已滿級':canUp?'＋ 升級':opts.points<1?'點數不足':'升級';
 const btnHtml=opts.readOnly
  ?'<div class="st-node-ro">'+(m.level>0?'已學 Lv'+m.level+'/3':'未修習')+'</div>'
  :'<button type="button" class="st-node-btn'+(canUp?' is-up':'')+(maxed?' is-max':'')+'" '+attr+(canUp?'':' disabled')+'>'+btnLabel+'</button>';
 return '<div class="st-node'+(isRoot?' is-root':'')+' '+stateClass+(selected?' is-selected':'')+(flashed?' is-flash':'')+'" data-accent="'+(opts.accent||'gold')+'">'
  +'<button type="button" class="st-node-hit" data-skill-select="'+key+'" aria-pressed="'+selected+'">'
  +(isRoot?'<span class="st-root-kicker">'+cfg.rootTag+'</span>':'')
  +badgeHtml
  +'<span class="st-node-head"><span class="st-icon">'+m.icon+'</span><b class="st-name">'+m.name+'</b></span>'
  +'<span class="st-tag">'+m.tag+'</span>'
  +trainingPipsHtml(m.level)
  +'</button>'
  +btnHtml
  +'</div>';
}
function renderTrainingInspector(branch,key,opts){
 const m=trainingSkillMeta(branch,key),cfg=TRAINING_TREES[branch],group=trainingBranchOf(branch,key);
 const isRoot=key===cfg.root,locked=!isRoot&&!opts.rootUnlocked,maxed=m.level>=3;
 const canUp=!opts.readOnly&&!locked&&!maxed&&opts.points>=1;
 const tiersHtml=m.desc.map((txt,i)=>{
  const cls=i<m.level?'is-done':i===m.level&&!locked?'is-next':'is-future';
  const mark=i<m.level?'✓ 已生效':i===m.level?(locked?'🔒 待解鎖':'▶ 下一級'):'未來階段';
  return '<div class="st-tier '+cls+'"><span class="st-tier-lv">Lv'+(i+1)+'</span><span class="st-tier-text">'+txt+'</span><span class="st-tier-tag">'+mark+'</span></div>';
 }).join('');
 let footerHtml='';
 if(opts.readOnly){
  footerHtml='<div class="st-ro-note">返回城鎮的「星盾訓練所」即可消耗技能點升級此技能。</div>';
 }else{
  const ctaText=locked?'🔒 請先學習「'+cfg.rootName+'」Lv 1 以解鎖'
   :maxed?'✦ 此技能已修煉至滿級（Lv 3/3）'
   :canUp?'⭐ 消耗 1 點 · 升級「'+m.name+'」至 Lv '+(m.level+1)
   :'⭐ 技能點不足（完成營業即可獲得）';
  footerHtml='<button type="button" class="st-cta'+(canUp?' is-up':'')+(maxed?' is-max':'')+'" data-tree-upgrade="'+key+'"'+(canUp?'':' disabled')+'>'+ctaText+'</button>';
 }
 return '<section class="st-inspector" data-accent="'+group.accent+'">'
  +'<div class="st-ins-head">'
  +'<span class="st-ins-crest">'+m.icon+'</span>'
  +'<div class="st-ins-title"><div class="st-ins-row"><b>'+m.name+'</b><span class="st-ins-branch">'+group.icon+' '+group.name+'</span></div><div class="st-ins-sub">'+trainingPipsHtml(m.level)+'<span>Lv '+m.level+' / 3 · '+m.tag+'</span></div></div>'
  +'</div>'
  +(m.tip?'<div class="st-tip">💡 '+m.tip+'</div>':'')
  +'<div class="st-tiers">'+tiersHtml+'</div>'
  +footerHtml
  +'</section>';
}
function renderSkillTree(branch,opts){
 const cfg=TRAINING_TREES[branch];
 const allKeys=[cfg.root,...cfg.branches.flatMap(b=>b.nodes)];
 const levels=Object.fromEntries(allKeys.map(k=>[k,trainingSkillMeta(branch,k).level]));
 const totalLv=allKeys.reduce((a,k)=>a+levels[k],0),maxLv=allKeys.length*3;
 const rootUnlocked=levels[cfg.root]>0;
 const selectedKey=ensureTrainingSelection(branch,rootUnlocked);
 const pct=Math.round((totalLv/maxLv)*100);
 const branchStates=cfg.branches.map(b=>b.nodes.some(k=>levels[k]>0)?'active':rootUnlocked?'open':'locked');
 const strokeFor=st=>st==='active'?'#ffe28a':st==='open'?'#b89152':'#4b5c54';
 const dashFor=st=>st==='locked'?' stroke-dasharray="4 4"':'';
 const trunkSvg='<div class="st-connectors'+(rootUnlocked?' is-open':' is-locked')+'">'
  +'<svg viewBox="0 0 360 36" preserveAspectRatio="none" aria-hidden="true">'
  +'<path d="M180 0 V15" stroke="'+(rootUnlocked?'#f0c971':'#4b5c54')+'" stroke-width="2.5" fill="none"'+dashFor(rootUnlocked?'open':'locked')+'/>'
  +'<path d="M58 15 H180" stroke="'+strokeFor(branchStates[0])+'" stroke-width="2.2" fill="none"'+dashFor(branchStates[0])+'/>'
  +'<path d="M180 15 H302" stroke="'+strokeFor(branchStates[2])+'" stroke-width="2.2" fill="none"'+dashFor(branchStates[2])+'/>'
  +'<path d="M58 15 V36" stroke="'+strokeFor(branchStates[0])+'" stroke-width="2.2" fill="none"'+dashFor(branchStates[0])+'/>'
  +'<path d="M180 15 V36" stroke="'+strokeFor(branchStates[1])+'" stroke-width="2.2" fill="none"'+dashFor(branchStates[1])+'/>'
  +'<path d="M302 15 V36" stroke="'+strokeFor(branchStates[2])+'" stroke-width="2.2" fill="none"'+dashFor(branchStates[2])+'/>'
  +'<circle cx="180" cy="15" r="3.2" fill="'+(rootUnlocked?'#ffe596':'#55685f')+'"/>'
  +'<circle cx="58" cy="15" r="2.6" fill="'+strokeFor(branchStates[0])+'"/>'
  +'<circle cx="302" cy="15" r="2.6" fill="'+strokeFor(branchStates[2])+'"/>'
  +'</svg>'
  +(rootUnlocked?'':'<span class="st-lock-pill">🔒 先學「'+cfg.rootName+'」解鎖三大流派</span>')
  +'</div>';
 const branchesHtml=cfg.branches.map((b,idx)=>{
  const st=branchStates[idx],n1=b.nodes[0],n2=b.nodes[1];
  const linkActive=levels[n1]>0&&levels[n2]>0;
  return '<div class="st-branch is-'+st+'" data-accent="'+b.accent+'">'
   +'<div class="st-branch-tag"><span>'+b.icon+'</span><b>'+b.name+'</b></div>'
   +renderTrainingNode(branch,n1,{...opts,rootUnlocked,selectedKey,accent:b.accent})
   +'<div class="st-branch-link'+(linkActive?' is-lit':rootUnlocked?' is-open':'')+'" aria-hidden="true"></div>'
   +renderTrainingNode(branch,n2,{...opts,rootUnlocked,selectedKey,accent:b.accent})
   +'</div>';
 }).join('');
 const pointsLabel=opts.readOnly?'唯讀檢視':(opts.infinite?'∞':opts.points);
 const summaryHtml='<div class="st-summary">'
  +'<div class="st-summary-row">'
  +'<span class="st-kpi is-sp"><em>'+(opts.readOnly?'修習狀態':'可用技能點')+'</em><strong>'+(opts.readOnly?'已學 '+totalLv+' 級':'⭐ '+pointsLabel)+'</strong></span>'
  +'<span class="st-kpi"><em>流派修煉度</em><strong>'+totalLv+'<small> / '+maxLv+'</small></strong></span>'
  +'</div>'
  +'<div class="st-prog-track"><i style="width:'+pct+'%"></i></div>'
  +'</div>';
 const html='<div class="st-wrap" data-branch="'+branch+'">'
  +summaryHtml
  +'<div class="st-canvas">'
  +'<div class="st-root-row">'+renderTrainingNode(branch,cfg.root,{...opts,rootUnlocked:true,selectedKey,accent:'gold'})+'</div>'
  +trunkSvg
  +'<div class="st-branches">'+branchesHtml+'</div>'
  +'</div>'
  +renderTrainingInspector(branch,selectedKey,{...opts,rootUnlocked})
  +'</div>';
 trainingFlash=null;
 return html;
}
function openLearnedForgeSkills(){trainingReadOnly=true;skMode='inspect';renderSk();$('sk').style.display='flex';}
function renderLearnedKitchenSkills(){
 const known=Object.entries(KITCHEN_SKILLS).filter(([k])=>kitchenLevel(k)>0);
 kitchenModal('👨‍🍳 已學餐廳技能',known.length?known.map(([k,s])=>'<div class="kitchen-skill"><span><b>'+s.icon+' '+s.name+' Lv'+kitchenLevel(k)+'/3</b><small>'+s.desc[kitchenLevel(k)-1]+'</small></span></div>').join(''):'<p>尚未學習餐廳技能。完成第一天晚餐後取得技能點，再到城鎮的訓練所提升。</p>');
}
function switchTrainingBranch(branch){if(!expandedGameEnabled()||trainingReadOnly||!$('kitchenP').hidden||$('townP').style.display!=='flex'||$('sk').style.display!=='flex'||!['forge','kitchen'].includes(branch))return;trainingBranch=branch;if(branch==='kitchen'&&!kitchenLevel('merge'))trainingSelected.kitchen='merge';if(branch==='forge'&&!skills.mm)trainingSelected.forge='mm';renderSk();}
function renderKitchenTraining(){
 const tot=Object.values(kitchen.skills).reduce((a,b)=>a+b,0);
 $('skp').textContent='餐廳技能點：⭐ '+kitchen.sp+' · 完成晚餐營業獲得，與冶煉廠分開計算。'+(tot===0?' 第一點只能學習「料理大師」。':' 點擊技能節點查看詳情，或直接升級。');
 $('skc').innerHTML=renderSkillTree('kitchen',{points:kitchen.sp,infinite:false,readOnly:false});
 $('skb').hidden=true;
}