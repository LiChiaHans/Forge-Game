
function stage20_battleTick(b){
 if(b.outcome!=='ongoing')return;const s=b.stats,m=b.monster,heroElement=elementOf(b.weapon),enemyElement=elementOf(m);let row;
 if(b.heroClock<=b.enemyClock){
  // Time still passes while guarding, but a missed attack is never banked for later.
  if(b.guarding){b.heroClock+=1000/Math.max(1,s.spd);return;}
  const profile=weaponAttackProfile(b),mult=elementMultiplier(heroElement,enemyElement),base=Math.max(1,Math.round(s.atk*mult*profile.power)-Math.floor(b.enemyDef*(1-profile.ignore)*.6)),physical=Math.max(1,Math.round(base*(b.bossHardened?.4:1)*bossPhysicalFactor(b))),hardened=!!b.bossHardened,raw=physical+s.arcane+profile.arcane+profile.counter,absorbed=Math.min(b.enemyWard||0,raw),damage=Math.min(b.enemyHp,raw-absorbed);b.enemyWard=Math.max(0,(b.enemyWard||0)-absorbed);b.bossHardened=false;b.enemyHp-=damage;b.heroClock+=1000/Math.max(1,s.spd);
  row={actor:'hero',damage,effect:profile.text,element:heroElement,multiplier:mult,text:elementName(heroElement)+'屬性命中 '+damage+' 傷害（×'+mult.toFixed(2)+'）'+(hardened?' · 硬化抵擋部分物理傷害':'')+(profile.text?' · '+profile.text:'')+(absorbed?' · 敵盾吸收 '+absorbed:'')};applyHeroExtra(b,row);
 }else{
  b.enemyTurns=(b.enemyTurns||0)+1;const turn=b.enemyTurns,phase=(turn-1)%3,mult=elementMultiplier(enemyElement,heroElement),charge=m.kind==='dragon'&&phase===0,heavy=m.kind==='dragon'&&phase===1,hits=m.kind==='wolf'&&turn%3===0?2:1,power=heavy?2:hits===2?.6:1;
  let damage=0,absorbed=0;const traitPower=charge?1:bossAttackPower(b);
  if(!charge){for(let k=0;k<hits;k++){let raw=Math.max(1,Math.round(m.atk*mult*power*traitPower)-Math.floor(s.def*.6));raw=weaponIncoming(b,raw);if(b.guarding)raw=Math.max(1,Math.ceil(raw*.4));const block=Math.min(b.shield,raw);b.shield-=block;absorbed+=block;const hit=Math.min(b.hp,raw-block);b.hp-=hit;damage+=hit;}b.enemyAttacks=(b.enemyAttacks||0)+1;const defended=b.guarding;b.foodRecovered=Math.max(0,(b.foodRecovered||0)-damage);row={actor:'enemy',damage,absorbed,element:enemyElement,multiplier:mult,text:m.name+(heavy?' 蓄力重擊':hits===2?' 雙段連擊':'攻擊')+'造成 '+damage+' 傷害'+(defended?' · 防禦架勢減傷 60%':'')+(absorbed?' · 護盾吸收 '+absorbed:'')};}
  else row={actor:'enemy',damage:0,absorbed:0,charge:true,text:m.name+' 正在蓄力，下一次將使用雙倍重擊！'};
  if(m.kind==='golem'&&turn%3===0){b.bossHardened=true;row.text+=' · 進入硬化';}
  b.enemyClock+=1000/Math.max(1,m.spd);applyBossAfterAction(b,row);
 }
 b.log.push({...row,hp:b.hp,shield:b.shield,enemyHp:b.enemyHp});checkBattleOutcome(b);
}
function stage20_renderWeaponAlbum(){
  const blueprintOnly=albumTier===-2;
  $('weaponAlbumP').querySelector('h2').textContent=blueprintOnly?'🌟 藍圖收藏':'📖 武器圖鑑';
  $('albumTabs').style.display=blueprintOnly?'none':'grid';
  if(blueprintOnly){$('albumProgress').textContent='藍圖 '+LEGENDS.filter((_,id)=>albumHasBlueprint(id)).length+'/20 · 珍藏 '+LEGENDS.filter((_,id)=>albumHasLegend(id)).length+'/20';renderLegendAlbum();return;}
  $('albumProgress').textContent=(albumFromHome?'跨局累計 · ':'本局收藏 · ')+'普通 '+albumWeapons().size+'/50 · 藍圖 '+LEGENDS.filter((_,id)=>albumHasBlueprint(id)).length+'/20 · 珍藏 '+LEGENDS.filter((_,id)=>albumHasLegend(id)).length+'/20';
  $('albumTabs').innerHTML=[-1,0,1,2,3,4].map(t=>'<button data-album-tier="'+t+'" aria-pressed="'+(t===albumTier)+'">'+(t===-2?'🌟 傳說藍圖':t<0?'全部':NM[t]+'級')+'</button>').join('');
  $('albumWeapons').innerHTML=NM.map((name,t)=>{
    if(albumTier!==-1&&albumTier!==t)return '';
    const total=WN.filter((_,c)=>albumWeapons().has(albumKey(c,t))).length;
    return '<section class="album-section"><h3 style="color:'+C[t]+'">'+name+'級 '+archiveTierPriceHTML('weapons',t)+' <small>'+total+'/10</small></h3><div class="album-grid">'+archiveOrder('weapons',t).map(c=>{const n=WN[c];
      const found=albumWeapons().has(albumKey(c,t));
      return '<button class="album-card '+(found?'collected':'uncollected')+'" data-album-weapon="'+c+'" data-tier="'+t+'" aria-label="'+name+'級'+n+'，'+(found?'已蒐集':'未蒐集')+'">'+archiveSortValueHTML('weapons',c,t)+'<span class="album-art">'+hex(c,C[t],'',t,galleryWeapon(c,t))+'</span><b>'+n+'</b><small>'+(found?'已蒐集':'未蒐集')+'</small></button>';
    }).join('')+'</div></section>';
  }).join('')+legendAlbumSection();
}
