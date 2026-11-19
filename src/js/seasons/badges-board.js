const FESTIVAL_BADGE_NAMES=['春芽花冠章','海風珍貝章','豐收楓葉章','暖爐雪晶章'];
function festivalBadgeArt(si){
 const colors=[['#4f7744','#b9d68a','#6c394b','#c86e86'],['#2c6776','#9bd9d5','#254f63','#4f95a6'],['#8c472d','#f4b668','#683424','#b95d38'],['#3c5686','#b9def4','#354266','#637eb2']][si];if(!colors)return '';
 const symbols=[
 '<path fill="#416741" d="M30 27h4v22h-4zM23 36h7v5h-7zM34 40h7v5h-7z"/><path fill="#d985a4" d="M27 14h10v8h8v10h-8v8H27v-8h-8V22h8z"/><path fill="#f7c2c0" d="M28 16h7v8h8v6h-8v8h-6v-8h-8v-6h7z"/><path fill="#a96083" d="M28 31h9v6h-9z"/><path fill="#fff0a6" d="M28 24h9v9h-9z"/><path fill="#fff9d5" d="M29 25h4v4h-4z"/>',
 '<path fill="#eee0b3" d="M18 23h4v-5h7v-3h7v3h7v5h4v15h-4v5H22v-5h-4z"/><path fill="#c8a573" d="M22 35h21v7H22zM29 42h7v5h-7z"/><path fill="#fff3cb" d="M22 23h4v11h-4zM28 19h4v15h-4zM35 20h4v14h-4zM41 24h3v10h-3z"/><path fill="#a9805d" d="M25 28h2v9h-2zM32 23h2v14h-2zM39 28h2v9h-2z"/><path fill="#73b8c4" d="M17 46h10v2H17zM37 46h11v2H37z"/>',
 '<path fill="#78402d" d="M30 10h4v11h5v-5h4v11h8v5h-5v7H36v8h-4v6h-3V40H19v-7h-5v-5h8V17h5v5h3z"/><path fill="#e8863d" d="M31 14h2v11h6v-5h2v9h7v2h-5v6H33v10h-2V37H22v-6h-5v-1h8v-9h1v4h5z"/><path fill="#ffce71" d="M31 20h2v17h-2zM25 29h4v3h-4zM35 29h5v3h-5z"/>',
 '<path fill="#7499c5" d="M29 11h6v9h7v-4h5v8h-7v5h11v6H40v5h7v8h-5v-4h-7v9h-6v-9h-7v4h-5v-8h7v-5H13v-6h11v-5h-7v-8h5v4h7z"/><path fill="#e2f7ff" d="M31 13h2v14h5v-5h5v-3h2v3h-5v7H33v2h16v2H33v2h7v7h5v3h-2v-3h-5v-5h-5v14h-2V37h-5v5h-5v3h-2v-3h5v-7h7v-2H15v-2h16v-2h-7v-7h-5v-3h2v3h5v5h5z"/><path fill="#a6d7ef" d="M29 29h6v6h-6z"/>'
 ][si];
 return pixelMedalArt(FESTIVAL_BADGE_NAMES[si],colors,symbols);
}
function pixelMedalArt(name,colors,symbols){
 const rbDark=colors[2]||'#523d3c',rbMain=colors[3]||'#a8665d';
 return '<svg viewBox="0 0 64 72" shape-rendering="crispEdges" role="img" aria-label="'+name+'">'
  +'<path fill="#3b2d22" d="M27 0h10v5H27z"/><path fill="#e5be6d" d="M29 1h6v3h-6z"/><path fill="#fff0b6" d="M30 1h2v2h-2z"/>'
  +'<path fill="'+rbDark+'" d="M14 47h15v24l-7-5-8 5zM35 47h15v24l-8-5-7 5z"/>'
  +'<path fill="'+rbMain+'" d="M17 49h9v17l-4-3-5 3zM38 49h9v17l-5-3-4 3z"/>'
  +'<path fill="#fff0be" opacity=".28" d="M19 50h2v13h-2zM40 50h2v13h-2z"/>'
  +'<path fill="#e7c375" d="M17 61h9v2h-9zM38 61h9v2h-9z"/>'
  +'<path fill="#3d2f24" d="M17 3h30v4h8v7h5v33h-5v8h-8v5H17v-5H9v-8H4V14h5V7h8z"/>'
  +'<path fill="#c7954f" d="M18 5h28v4h8v6h3v30h-5v8h-8v4H20v-4h-8v-8H7V15h5V9h6z"/>'
  +'<path fill="#ffe599" d="M18 5h28v3H19v4h-6v6H9v24H7V15h5V9h6z"/>'
  +'<path fill="#855c34" d="M52 17h3v27h-5v7h-8v4H20v-3h22v-4h7v-6h3z"/>'
  +'<path fill="#3c2d22" d="M20 10h24v4h7v32h-7v5H20v-5h-7V14h7z"/>'
  +'<path fill="'+colors[0]+'" d="M21 12h22v4h7v29h-7v5H21v-5h-7V16h7z"/>'
  +'<path fill="'+colors[1]+'" opacity=".26" d="M21 13h22v4H19v24h-4V17h6z"/>'
  +'<path fill="#ffffff" opacity=".11" d="M23 13h6v3h-6zM19 17h5v4h-5zM16 21h4v5h-4z"/>'
  +symbols
  +'<path fill="#fff3bf" d="M12 12h3v3h-3zM49 12h3v3h-3zM15 48h3v3h-3zM46 48h3v3h-3z"/>'
  +'<path fill="#8e653a" d="M14 14h1v1h-1zM51 14h1v1h-1zM17 50h1v1h-1zM48 50h1v1h-1z"/>'
  +'</svg>';
}
function readFestivalBadgeCollection(){try{return new Set(JSON.parse(localStorage.getItem('forgeFestivalBadgesV1')||'[]').filter(i=>Number.isInteger(i)&&i>=0&&i<4));}catch{return new Set();}}
function persistFestivalBadges(){if(sandboxSession||testRun)return;const all=readFestivalBadgeCollection();for(const i of kitchen?.festivals?.badges||[])all.add(i);try{localStorage.setItem('forgeFestivalBadgesV1',JSON.stringify([...all].sort()));}catch{}persistMedalCollection(true);}
function albumFestivalBadges(){const stars=albumMedalStars();return new Set([0,1,2,3].filter(i=>stars['season-'+i]>0));}
function renderFestivalBadgeAlbum(){
 const stars=albumMedalStars(),found=MEDAL_DEFS.filter(d=>stars[d.id]>0).length,total=MEDAL_DEFS.reduce((n,d)=>n+(stars[d.id]||0),0),maxTotal=MEDAL_DEFS.reduce((n,d)=>n+d.max,0),pct=Math.round(total/maxTotal*100);
 $('albumProgress').textContent=(albumFromHome?'跨局紀念章收藏':'本局紀念章收藏')+' · '+found+'/14 · 星級 '+total+'/'+maxTotal;
 const groups=[['四季紀念章','🌿',MEDAL_DEFS.slice(0,4)],['遠征通關章','⚔',MEDAL_DEFS.slice(4,8)],['工藝與生活成就章','✦',MEDAL_DEFS.slice(8)]];
 const overview='<section class="medal-overview"><div class="medal-overview-top"><div class="medal-kpi"><span>已收藏</span><strong>'+found+'<small>/14</small></strong></div><div class="medal-kpi is-gold"><span>總星級</span><strong>★ '+total+'<small>/'+maxTotal+'</small></strong></div></div><div class="medal-progress-track" aria-hidden="true"><i style="width:'+pct+'%"></i></div><p class="medal-rules">四季與成就進度每局重新累計；首頁保留歷來最高星級。遠征通關章為單次成就。</p></section>';
 $('albumWeapons').innerHTML=overview+groups.map(([name,icon,defs])=>{
  const groupStars=defs.reduce((n,d)=>n+(stars[d.id]||0),0),groupMax=defs.reduce((n,d)=>n+d.max,0);
  return '<section class="medal-section"><header class="medal-section-head"><h3><span class="medal-section-icon" aria-hidden="true">'+icon+'</span>'+name+'</h3><span class="medal-section-count">★ '+groupStars+'/'+groupMax+'</span></header><div class="festival-badge-grid">'+defs.map(d=>{
   const level=stars[d.id]||0,maxed=level>=d.max,tier=d.max===1?(level?3:0):level;
   const meter=!albumFromHome&&d.goals?medalCardMeterHTML(d,level):'';
   return '<button class="festival-badge-card '+(level?'collected':'uncollected')+'" data-medal-id="'+d.id+'" data-medal-tier="'+tier+'" data-medal-maxed="'+maxed+'">'+(maxed?'<span class="medal-master-seal" aria-hidden="true">✦</span>':'')+'<span class="festival-badge-pedestal"><span class="festival-badge-art">'+medalArt(d.id)+'</span></span><b>'+d.name+'</b>'+medalStarsHTML(level,d.max)+meter+'<small>'+medalSummary(d,level)+'</small></button>';
  }).join('')+'</div></section>';
 }).join('');
}
function inspectFestivalBadge(i){if(Number.isInteger(i)&&i>=0&&i<4)inspectMedal('season-'+i);}
function openFestivalBadgeAlbum(){closeP('festivalP');openWeaponAlbum();setArchiveCategory('badges');}
function festivalBoardArt(){return '<svg viewBox="0 0 96 88" shape-rendering="crispEdges" aria-hidden="true"><ellipse cx="48" cy="82" rx="38" ry="4" fill="#1c372e" opacity=".3"/><path fill="#493727" d="M20 33h10v49H20zM68 33h10v49H68z"/><path fill="#9f7747" d="M23 36h4v44h-4zM71 36h4v44h-4z"/><path fill="#392e25" d="M5 4h86v6h4v49h-4v5H5v-5H1V10h4z"/><path fill="#aa7848" d="M7 7h82v51H7z"/><path fill="#e0b777" d="M7 7h82v4H11v43H7z"/><path fill="#705135" d="M11 54h74V12h4v46H11z"/><path fill="#425a49" d="M14 15h68v35H14z"/><path fill="#334637" d="M16 18h64v3H16zM16 45h64v3H16z"/><path fill="#f0cf87" d="M10 11h3v3h-3zM83 11h3v3h-3zM10 51h3v3h-3zM83 51h3v3h-3z"/><text x="48" y="32" font-size="13" font-family="serif" font-weight="bold" text-anchor="middle" fill="#ffe8ad">四季節慶</text><text x="48" y="46" font-size="11" font-family="serif" text-anchor="middle" fill="#f0ddb0">與預告</text><path fill="#b28d58" d="M22 68h3v11h-3zM70 63h3v16h-3z"/></svg>';}
function festivalBoardReminder(){const state=syncFestival();return !!state&&[1,3].includes(seasonDay())&&!(state.readDays||[]).includes(day);}
function renderFestivalBoard(){const board=$('townFestivalBoard');board.hidden=day<1;if(!board.dataset.built){board.innerHTML=festivalBoardArt()+'<span class="festival-board-alert" aria-hidden="true"><svg viewBox="0 0 24 30" shape-rendering="crispEdges"><path fill="#473329" d="M4 0h16v4h4v20h-7l-5 6-1-6H0V4h4z"/><path fill="#f7ce62" d="M5 3h14v3h2v15h-7l-2 4v-4H3V6h2z"/><path fill="#74472f" d="M10 7h5v8h-5zM10 17h5v3h-5z"/></svg></span>';board.dataset.built='true';}const unread=festivalBoardReminder(),kind=seasonDay()===3?'下一季預告':'本季目標';board.dataset.unread=String(unread);board.title=unread?'尚未閱讀：'+kind:'查看四季節慶與預告';board.setAttribute('aria-label','四季節慶與預告告示牌'+(unread?'，有新的'+kind:''));}
function markFestivalRead(){const state=syncFestival();if(!state)return;if(!state.readDays)state.readDays=[];if([1,3].includes(seasonDay())&&!state.readDays.includes(day)){state.readDays.push(day);state.readDays=state.readDays.slice(-24);saveNow();}renderFestivalBoard();}
