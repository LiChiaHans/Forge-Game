const MEDAL_DEFS=[
 ...FESTIVAL_BADGE_NAMES.map((name,i)=>({id:'season-'+i,name,max:3,season:i})),
 ...[5,10,15,20].map((stage,i)=>({id:'exp-'+stage,name:['初征勇士章','屠龍英雄章','破界征服章','終極遠征章'][i],max:1,stage})),
 {id:'gold',name:'黃金鑄匠章',max:3,goals:[1,5,10],unit:'把',text:'製作金級武器',tier:3,kind:'weapon'},
 {id:'mithril',name:'秘銀神匠章',max:3,goals:[1,3,5],unit:'把',text:'製作秘銀級武器',tier:4,kind:'weapon'},
 {id:'chef4',name:'星饌主廚章',max:3,goals:[1,5,10],unit:'道',text:'製作四階料理',tier:3,kind:'dish'},
 {id:'chef5',name:'巔峰美饌章',max:3,goals:[1,3,5],unit:'道',text:'製作五階料理',tier:4,kind:'dish'},
 {id:'decor',name:'小鎮造景章',max:3,goals:[10,20,30],unit:'件',text:'擁有裝飾品'},
 {id:'garden',name:'花園培育章',max:3,goals:[5,10,15],unit:'朵',text:'種植並收成花朵'}
];
function medalDefinition(id){return MEDAL_DEFS.find(d=>d.id===id);}
function cleanMedalAchievements(raw){const stars={};for(const d of MEDAL_DEFS.filter(d=>d.season===undefined))stars[d.id]=Math.max(0,Math.min(d.max,Math.floor(Number(raw?.stars?.[d.id])||0)));return {harvests:Math.max(0,Math.min(1000000,Math.floor(Number(raw?.harvests)||0))),stars};}
function medalProgress(d,state=null){
 const k=state?state.restaurant?.kitchen:kitchen;
 if(d.stage){const cleared=(state?state.expedition:expeditionState)?.cleared;return Array.isArray(cleared)&&cleared.includes(d.stage-1)?1:0;}
 if(d.kind==='weapon'){const counts=state?state.weaponMastery?.counts:[...weaponMastery];return (Array.isArray(counts)?counts:[]).filter(row=>Array.isArray(row)&&row.length===2&&typeof row[0]==='string').reduce((sum,[key,n])=>sum+(/^n:[0-9]:[0-4]$/.test(key)&&Number(key.at(-1))===d.tier&&Number.isSafeInteger(n)&&n>0?n:0),0);}
 if(d.kind==='dish')return Object.entries(k?.xp||{}).reduce((sum,[key,n])=>sum+(/^[0-9]:[0-4]$/.test(key)&&Number(key.at(-1))===d.tier&&Number.isSafeInteger(n)&&n>0?n:0),0);
 if(d.id==='decor')return Object.entries((state?state.city:cityState)?.owned||{}).reduce((sum,[id,n])=>sum+(DECOR_BY_ID.has(id)&&Number.isSafeInteger(n)&&n>0?n:0),0);
 if(d.id==='garden')return k?.achievements?.harvests||0;return 0;
}
function stateMedalStars(state=null){
 const k=state?state.restaurant?.kitchen:kitchen,result={};for(const d of MEDAL_DEFS){
  if(d.season!==undefined){result[d.id]=Math.max((k?.festivals?.badges||[]).includes(d.season)?1:0,Math.max(0,Math.min(3,Math.floor(Number(k?.festivals?.badgeStars?.[d.season])||0))));continue;}
  const p=medalProgress(d,state),earned=Math.max(0,Math.min(d.max,Math.floor(Number(k?.achievements?.stars?.[d.id])||0)));result[d.id]=Math.max(earned,d.stage?p:d.goals.filter(n=>p>=n).length);
 }return result;
}
function readMedalCollection(){let raw={};try{raw=JSON.parse(localStorage.getItem('forgeMedalCollectionV2')||'{}');}catch{}const all={};for(const d of MEDAL_DEFS)all[d.id]=Math.max(0,Math.min(d.max,Math.floor(Number(raw?.[d.id])||0)));for(const i of readFestivalBadgeCollection())all['season-'+i]=Math.max(1,all['season-'+i]);return all;}
function persistMedalCollection(onlyFestivals=false){if(sandboxSession||testRun||booting||day<1)return;const all=readMedalCollection(),current=stateMedalStars();for(const d of MEDAL_DEFS)if(!onlyFestivals||d.season!==undefined)all[d.id]=Math.max(all[d.id],current[d.id]);try{localStorage.setItem('forgeMedalCollectionV2',JSON.stringify(all));}catch{}}
function syncAchievementMedals(announce=true){
 if(!kitchen||day<1||booting)return;if(!kitchen.achievements)kitchen.achievements=cleanMedalAchievements(null);const stars=stateMedalStars();for(const d of MEDAL_DEFS.filter(d=>d.season===undefined))if(stars[d.id]>(kitchen.achievements.stars[d.id]||0)){kitchen.achievements.stars[d.id]=stars[d.id];if(announce)toast('🏅 '+d.name+' '+(d.max===1?'已取得':stars[d.id]+'星達成')+'！可到圖鑑館查看。');}persistMedalCollection();
}
function recordMedalHarvest(){if(!kitchen||day<1)return;if(!kitchen.achievements)kitchen.achievements=cleanMedalAchievements(null);kitchen.achievements.harvests=Math.min(1000000,kitchen.achievements.harvests+1);syncAchievementMedals();}
function albumMedalStars(){if(!albumFromHome)return stateMedalStars();const all=readMedalCollection(),merge=s=>{for(const d of MEDAL_DEFS)all[d.id]=Math.max(all[d.id],s[d.id]||0);};if(!sandboxSession){for(const entry of saves)merge(stateMedalStars(entry.state));if(!testRun)merge(stateMedalStars());}return all;}
function medalStarsHTML(level,max=3){return max===1?'<span class="medal-completion">'+(level?'已通關':'尚未通關')+'</span>':'<span class="medal-stars" aria-label="'+level+'星，共'+max+'星"><b>'+'★'.repeat(level)+'</b><i>'+'☆'.repeat(max-level)+'</i></span>';}
function medalSummary(d,level){if(albumFromHome)return level?(d.max===1?'已取得':'最高 '+level+' 星'):'尚未取得';if(d.season!==undefined)return (level===3?'三星已完成':(level+1)+'星：原目標 ×'+(level+1))+' · 三天內完成';if(d.stage)return '打贏遠征第 '+d.stage+' 關';return d.text+' '+Math.min(medalProgress(d),d.goals.at(-1))+'/'+d.goals[Math.min(level,2)]+d.unit;}
function inspectMedal(id){
 const d=medalDefinition(id);if(!d)return;const level=albumMedalStars()[id]||0;$('festivalBadgeTitle').textContent=d.name;let body='';
 if(d.season!==undefined){const f=SEASON_FESTIVALS[d.season];body='<p>'+f.name+' · 每次該季三天內完成兩項目標，第三天領獎取得星級。</p><div class="medal-goals">'+[1,2,3].map(t=>'<p class="'+(level>=t?'earned':'')+'">'+t+'星：'+f.goals.map(g=>g.text+' ×'+g.n*t).join('、')+'</p>').join('')+'</div><p>完成一星後，下次該季挑戰二星；再完成後挑戰三星。失敗維持原難度，三星後維持三倍目標。</p>';}
 else if(d.stage)body='<p>在本局遠征打贏第 '+d.stage+' 關，即可自動取得通關紀念章。</p><p>此章為單次通關成就，沒有二星、三星。</p>';
 else{body='<div class="medal-goals">'+d.goals.map((n,i)=>'<p class="'+(level>i?'earned':'')+'">'+(i+1)+'星：'+d.text+' '+n+d.unit+'</p>').join('')+'</div><p>'+(albumFromHome?'首頁保存歷來最高星級；以下數量需在同一局內累計。':'本局累計：'+medalProgress(d)+d.unit+'。')+'</p><p>'+(d.kind==='weapon'?'只計指定階級的一般武器，合成完成即計數，不必售出；各種武器可一起累計。':d.kind==='dish'?'只計指定階級的完成料理，合成完成即計數，不必售出；各種料理可一起累計。':d.id==='decor'?'計算已擁有的裝飾總件數，包含收藏與已放置、不同季節與日夜款。同款多件各計一件。':'每盆親自種植並收成的成熟花朵計一朵；春天雙倍精華仍只計一朵，寶箱精華不計。')+'</p>';}
 $('festivalBadgeBody').innerHTML='<div class="festival-badge-large '+(level?'collected':'uncollected')+'">'+medalArt(id)+'</div>'+medalStarsHTML(level,d.max)+'<p>'+(level?'已取得':'尚未取得')+'</p>'+body;$('festivalBadgeP').style.display='flex';
}
function medalArt(id){
 const d=medalDefinition(id);if(!d)return '';if(d.season!==undefined)return festivalBadgeArt(d.season);let symbol='',colors=['#68556f','#d3a6b2'];
 if(d.stage){const i=[5,10,15,20].indexOf(d.stage);colors=[['#576d54','#a8ca85'],['#764e42','#e9a35f'],['#53648a','#a3c8eb'],['#624876','#e4b9f0']][i];symbol='<path fill="#2f3140" d="M18 16h7v-5h5v9h5v-9h5v5h7v30H18z"/><path fill="#d8bf83" d="M20 19h24v25H20zM20 15h4v8h-4zM29 13h5v10h-5zM40 15h4v8h-4z"/><path fill="#665449" d="M29 32h7v12h-7zM23 25h4v5h-4zM38 25h4v5h-4z"/><path fill="'+['#a5ca83','#f4ae5e','#a9d9ed','#e8b9ee'][i]+'" d="M28 23h9v7h-9z"/><path fill="#fff1c1" d="M30 24h4v3h-4z"/>';
  if(i>=1)symbol+='<path fill="#f2d38b" d="M13 41h6v7h26v-7h6v12H13z"/>';if(i>=2)symbol+='<path fill="#d7eafa" d="M11 18h4v19h-4zM49 18h4v19h-4z"/>';if(i===3)symbol+='<path fill="#fff1b2" d="M29 4h6v5h5v4h-5v5h-6v-5h-5V9h5z"/>';
 }else if(d.kind==='weapon'){const myth=d.id==='mithril';colors=myth?['#405b7d','#b4e9ee']:['#795c32','#f6d782'];symbol='<path fill="#343747" d="M29 9h7v29h9v6h-9v11h-7V44h-9v-6h9z"/><path fill="'+(myth?'#a4e4ec':'#e7b857')+'" d="M31 11h3v25h-3zM23 39h19v3H23z"/><path fill="'+(myth?'#e7ffff':'#fff0a0')+'" d="M31 11h1v22h-1z"/><path fill="#98664b" d="M31 44h3v8h-3z"/><path fill="'+(myth?'#bc8ee7':'#ef865a')+'" d="M29 37h7v6h-7z"/><path fill="#fff2b9" d="M31 38h3v2h-3z"/>';
  symbol+='<path fill="'+(myth?'#a1cee9':'#e0aa50')+'" d="M16 19h7v5h-7zM12 23h15v7H12zM15 30h10v4H15zM43 24h6v4h-6zM40 28h12v8H40zM43 36h7v3h-7z"/>';
 }else if(d.kind==='dish'){const top=d.id==='chef5';colors=top?['#6d4b67','#e9b5c3']:['#665b40','#dec797'];symbol='<path fill="#383c42" d="M12 34h40v11h-5v5H17v-5h-5z"/><path fill="#f1e3bb" d="M14 34h36v9h-5v4H19v-4h-5z"/><path fill="#bd9c76" d="M18 42h28v3H18z"/><path fill="#c18554" d="M19 25h25v14H19z"/><path fill="#edb764" d="M22 23h19v5H22zM19 29h25v5H19z"/><path fill="#63844f" d="M17 32h7v6h-7zM40 31h7v7h-7z"/><path fill="#db6b4f" d="M28 27h8v6h-8z"/><path fill="#e8e2c5" d="M23 14h3v7h-3zM32 10h3v9h-3zM41 14h3v7h-3z"/>';
  if(top)symbol+='<path fill="#e4c16e" d="M21 8h5v5h4v-5h5v5h4V8h5v9H21z"/><path fill="#fff0b9" d="M29 35h8v3h-8z"/>';
 }else if(d.id==='decor'){colors=['#526d63','#c1d9af'];symbol='<path fill="#423b35" d="M14 27h4v-5h5v-5h9v-5h5v5h6v5h5v5h4v6h-5v20H19V33h-5z"/><path fill="#b16d58" d="M17 28h5v-5h6v-5h9v5h6v5h6v3H17z"/><path fill="#e0c68e" d="M22 33h22v17H22z"/><path fill="#6b5747" d="M30 38h7v12h-7z"/><path fill="#8db9b2" d="M24 36h4v7h-4zM39 36h3v7h-3z"/><path fill="#78a45d" d="M10 40h8v9h-8zM47 39h9v10h-9z"/><path fill="#dda15b" d="M11 48h7v5h-7zM48 48h7v5h-7z"/>';
 }else{colors=['#516447','#bddb92'];symbol='<path fill="#365343" d="M30 19h4v28h-4zM21 30h9v5h-9zM34 35h10v5H34z"/><path fill="#98bc6d" d="M20 28h8v4h-8zM36 33h8v4h-8z"/><path fill="#d689ab" d="M27 9h10v6h7v10h-7v6H27v-6h-7V15h7z"/><path fill="#f1b8be" d="M29 11h6v7h7v5h-7v6h-6v-6h-7v-5h7z"/><path fill="#ffe3a0" d="M28 18h9v7h-9z"/><path fill="#8b513d" d="M20 44h25v6h-3v6H23v-6h-3z"/><path fill="#c68b5f" d="M22 45h21v3H22zM25 49h14v5H25z"/>';}
 return pixelMedalArt(d.name,colors,symbol);
}
