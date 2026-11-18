const SEASON_FESTIVALS=[
 {name:'春芽市集',goals:[{text:'播種一盆屬性花',n:1},{text:'售出含配菜的料理',n:3}],gold:400,gift:'sp-tulips',hint:'準備350金幣或庫存種子，料理配方保留至少一份配菜。'},
 {name:'海風祭',goals:[{text:'售出鐵級以上武器',n:3},{text:'售出香氣20以上料理',n:3}],gold:600,gift:'su-parasol',hint:'預留鐵礦與高香氣料理；配菜、香草或升階都能提高香氣。'},
 {name:'豐收工藝展',goals:[{text:'燒掉落葉格',n:3},{text:'售出含兩份以上配菜的料理',n:3}],gold:800,gift:'au-basket',hint:'預留鍛造空間燒葉，餐廳可準備田園拌飯、濃湯或沙拉。'},
 {name:'暖爐慶典',goals:[{text:'售出鋼級以上武器',n:3},{text:'售出飽足26以上料理',n:3}],gold:1000,gift:'wi-starlamp',hint:'預先合成鋼級材料，並準備主食較多的料理或奶香調味。'}
];
function cleanFestivalState(raw,currentDay=day){
 const row=x=>{if(!x||!Number.isSafeInteger(x.start)||x.start<1||x.start>currentDay||(x.start-1)%3!==0||x.season!==seasonIndex(x.start))return null;const defs=SEASON_FESTIVALS[x.season];return {start:x.start,season:x.season,progress:[0,1].map(i=>Math.max(0,Math.min(defs.goals[i].n,(Number.isFinite(Number(x.progress?.[i]))?Math.floor(Number(x.progress[i])):0)))),claimed:!!x.claimed,notified:!!x.notified};};
 return {active:row(raw?.active),past:(Array.isArray(raw?.past)?raw.past:[]).map(row).filter(Boolean).filter((x,i,a)=>a.findIndex(y=>y.start===x.start)===i).slice(-8),badges:[...new Set((Array.isArray(raw?.badges)?raw.badges:[]).filter(x=>Number.isInteger(x)&&x>=0&&x<4))]};
}
function syncFestival(){
 if(day<1||!kitchen)return null;if(!kitchen.festivals)kitchen.festivals={active:null,past:[],badges:[]};const state=kitchen.festivals,start=day-seasonDay()+1;
 if(state.active?.start!==start){if(state.active){state.past=state.past.filter(x=>x.start!==state.active.start);state.past.push(state.active);state.past=state.past.slice(-8);}state.active={start,season:seasonIndex(),progress:[0,0],claimed:false,notified:false};}return state;
}
function festivalComplete(row){return SEASON_FESTIVALS[row.season].goals.every((g,i)=>(row.progress[i]||0)>=g.n);}
function recordFestival(event,item=null,count=1){
 const state=syncFestival();if(!state)return;const row=state.active;if(row.claimed)return;let goal=-1;const parts=item?.c!==undefined?(COMBO[item.c]||'').split(''):[];
 if(row.season===0){if(event==='sow')goal=0;if(event==='food'&&parts.includes('2'))goal=1;}
 if(row.season===1){if(event==='weapon'&&item.t>=1)goal=0;if(event==='food'&&kitchenDishStats(item).aroma>=20)goal=1;}
 if(row.season===2){if(event==='burn')goal=0;if(event==='food'&&parts.filter(s=>s==='2').length>=2)goal=1;}
 if(row.season===3){if(event==='weapon'&&item.t>=2)goal=0;if(event==='food'&&kitchenDishStats(item).fullness>=26)goal=1;}
 if(goal>=0)row.progress[goal]=Math.min(SEASON_FESTIVALS[row.season].goals[goal].n,row.progress[goal]+Math.max(0,Math.floor(count)));
 if(festivalComplete(row)&&!row.notified){row.notified=true;toast('🎪 '+SEASON_FESTIVALS[row.season].name+'目標完成！'+(day>=row.start+2?'可從城鎮季節資訊領獎。':'第 '+(row.start+2)+' 天開放領獎。'));}
}
function festivalRewardText(season){const f=SEASON_FESTIVALS[season],d=DECOR_BY_ID.get(f.gift);return f.gold+' 金幣＋'+(d?.name||'節慶裝飾')+'＋本局紀念章';}
function claimFestival(start){
 const state=syncFestival();if(!state)return false;const row=[state.active,...state.past].find(x=>x.start===start);if(!row||row.claimed||day<row.start+2||!festivalComplete(row))return false;
 row.claimed=true;const f=SEASON_FESTIVALS[row.season],d=DECOR_BY_ID.get(f.gift);let gold=f.gold;if(!cityState)cityState=freshCity();const owned=cityState.owned[f.gift]||0;if(d&&owned<cityPlacementLimit(f.gift))cityState.owned[f.gift]=owned+1;else if(d)gold+=d.price;
 if(!state.badges.includes(row.season))state.badges.push(row.season);coins+=gold;earned+=gold;dEarn+=gold;cityRevision++;saveHi();saveNow();renderFestival();if($('townP').style.display==='flex')renderTown();toast('🎪 '+f.name+'獎勵已收下：'+gold+' 金幣，裝飾已加入收藏（同款已足量時折算金幣）。');return true;
}
function festivalRowHTML(row){const f=SEASON_FESTIVALS[row.season],ready=festivalComplete(row),claimable=ready&&!row.claimed&&day>=row.start+2;
 return '<section class="festival-card"><h3>'+SEASONS[row.season].icon+' '+f.name+' · 第 '+(row.start+2)+' 天</h3>'+f.goals.map((g,i)=>'<label>'+g.text+' <b>'+row.progress[i]+'/'+g.n+'</b><progress max="'+g.n+'" value="'+row.progress[i]+'"></progress></label>').join('')+'<p>'+festivalRewardText(row.season)+'</p><button class="exp-wide" '+(!claimable?'disabled':'')+' onclick="claimFestival('+row.start+')">'+(row.claimed?'已領取':claimable?'領取節慶獎勵':ready?'第 '+(row.start+2)+' 天開放領獎':'目標尚未完成')+'</button></section>';
}
function renderFestival(){
 const state=syncFestival();if(!state)return;const row=state.active,next=(row.season+1)%4,f=SEASON_FESTIVALS[next];$('festivalTitle').textContent='四季節慶與預告';$('festivalBody').innerHTML=festivalRowHTML(row)+'<section class="festival-next"><h3>下一季預告 · '+f.name+'</h3><p>第 '+(row.start+3)+' 天開始準備，第 '+(row.start+5)+' 天領獎。</p><p>'+f.goals.map(g=>g.text+' ×'+g.n).join('；')+'</p><p>'+f.hint+'</p><p>獎勵：'+festivalRewardText(next)+'</p></section><p>本局紀念章：'+(state.badges.map(i=>SEASONS[i].name).join('、')||'尚未取得')+'。未完成不扣愛心，已完成獎勵保留最近8季可補領。</p>'+state.past.filter(x=>festivalComplete(x)&&!x.claimed).map(festivalRowHTML).join('');
}
function openFestival(){if(day<1)return;closeP('seasonP');renderFestival();$('festivalP').style.display='flex';syncTownMotion();}
function renderFestivalNotice(){const state=syncFestival();if(!state)return;const row=state.active,next=(row.season+1)%4;$('festivalNotice').textContent='本季：'+SEASON_FESTIVALS[row.season].name+'（第 '+(row.start+2)+' 天領獎）；下一季：'+SEASON_FESTIVALS[next].name+'。';}
