

const NIGHT_DECOR_ROWS=[
 ['night-sp-jar','螢火蟲玻璃燈',420,'spring','night-jar',38,54],['night-sp-petal','櫻花夜燈',460,'spring','night-flower',40,64],['night-sp-moon','月見花圃',380,'spring','night-garden',54,34],
 ['night-su-jelly','水母浮光燈',500,'summer','night-jelly',38,61],['night-su-shell','貝殼燈串',460,'summer','night-garland',67,47],['night-su-star','星沙路標',400,'summer','night-star',42,59],
 ['night-au-pumpkin','南瓜燈',420,'autumn','night-pumpkin',43,44],['night-au-maple','楓葉燈籠',460,'autumn','night-lantern',37,62],['night-au-harvest','豐收燭台',480,'autumn','night-candle',47,53],
 ['night-wi-ice','冰晶提燈',480,'winter','night-crystal',38,58],['night-wi-snow','雪花燈串',460,'winter','night-garland',67,47],['night-wi-aurora','極光晶簇',560,'winter','night-aurora',53,54]
];
function isSandboxNight(){return day>0&&sandboxNight;}
function setSandboxNight(value){
 if(!expandedGameEnabled())return;discardCityEdit();cancelCityPresetSave();sandboxNight=!!value;if(sandboxNight)startKitchenNight();$('townScenery').dataset.season='';$('townWeather').dataset.season='';$('townDecorFront').dataset.key='';$('townQueue').dataset.visitors='';cityRevision++;clearForgeFeedback();
}
function toggleSandboxNight(){if(!sandboxSession)return;cancelKitchenDrag();$('kitchenP').hidden=true;$('kitchenModal').hidden=true;setSandboxNight(!sandboxNight);render();showTown();}
function sandboxEndForgeDay(){
 if(lastCompletedDay>=day||orders.length||dq.length)return;lastCompletedDay=day;grantDailyWorkshopSkill('forge');pendingChests++;gachaUsed=false;skillDone=false;spentToday=0;setSandboxNight(true);showTown();toast('白天營業結束！同一天的晚餐時段開始，前往廚房餐廳。');
}
function nightTownPalette(p){if(!isSandboxNight())return p;const colors=[['#182944','#354c43','#817c68'],['#122d46','#777267','#99917b'],['#25253e','#534735','#988574'],['#152641','#718694','#8298ae']][townVisualSeason()];return {...p,sky:colors[0],ground:colors[1],road:colors[2],tree:'#314a4c',light:'#617b6f'};}
function nightSkyArt(si){
 const moon=['#fff0bf','#d3eef1','#f8d5a1','#d8edff'][si];let stars='';for(let i=0;i<18;i++){const x=12+(i*67)%339,y=8+(i*17)%93;if(x>90&&x<260)continue;stars+='<path fill="'+(i%3?moon:'#90b6cd')+'" opacity="'+(.4+(i%3)*.2)+'" d="M'+x+' '+y+'h2v2h-2z"/>';}
 return '<svg viewBox="0 0 360 620" preserveAspectRatio="none" aria-hidden="true"><g shape-rendering="crispEdges">'+stars+'<path fill="'+moon+'" d="M306 11h15v4h5v7h4v14h-4v6h-6v4h-15v-4h-6v-7h-4V22h4v-6h7z"/><path fill="'+(si===1?'#7199ad':'#c5b68b')+'" opacity=".4" d="M310 18h5v5h-5zM319 30h6v6h-6zM303 33h4v4h-4z"/></g></svg>';
}
function renderTownNight(){
 
 $('townReviewSave22').hidden=day<1;$('townReviewSave22').setAttribute('aria-label',sandboxSession?'後台測試進度':'遊戲進度與備份');const night=isSandboxNight(),si=townVisualSeason();$('townP').dataset.time=night?'night':'day';$('sandboxNightToggle').hidden=!sandboxSession;$('sandboxNightToggle').innerHTML=night?pxIcon('sun')+' 白天':pxIcon('moon')+' 夜晚';const kitchenOn=typeof isKitchenEnabled!=='function'||isKitchenEnabled();$('townKitchen').hidden=false;$('townKitchen').classList.toggle('is-mode-disabled',!kitchenOn);$('townKitchen').disabled=!kitchenOn;$('townKitchen').setAttribute('aria-disabled',String(!kitchenOn));if($('townKitchen').dataset.built!==String(si)){$('townKitchen').innerHTML=kitchenHouseArt();$('townKitchen').dataset.built=String(si);}$('townKitchen').setAttribute('aria-label',night?'廚房餐廳，開始晚餐營業':'廚房餐廳，晚間營業');
 const key=si+':'+night;if($('townNightSky').dataset.key!==key){$('townNightSky').innerHTML=night?nightSkyArt(si):'';$('townNightSky').dataset.key=key;}$('townSeason').innerHTML=pxSeasonIcon(si)+' '+SEASONS[si].name+' · 第'+day+'天'+(night?'黑夜 · 餐廳營業':'白天 · 冶煉廠營業');
 for(const id of ['townArchive','townForge','townShop','townTraining','townDecorShop','townGreenhouse']){const el=$(id),existing=el.querySelector('.night-house-glow');if(!night)existing?.remove();else if(!existing){const glow=document.createElement('span');glow.className='night-house-glow';el.appendChild(glow);}}
}
function ensureNightCityLayout(si){if(!cityState)cityState=freshCity();const key=DECOR_SEASONS[si];if(!cityState.nightLayouts)cityState.nightLayouts={};if(!cityState.nightLayouts[key])cityState.nightLayouts[key]=[];return cityState.nightLayouts[key];}
function cityLayoutStore(){if(isSandboxNight()){ensureNightCityLayout(townVisualSeason());return cityState.nightLayouts;}return cityState.layouts;}
function nightDecorationSVG(d,si,uid){
 const color=['#d6b7e6','#8ee2e7','#ffbc68','#b0deff'][si],wood='#4b4140',edge='#283541';let shape='';
 if(d.art==='night-garland')shape='<path fill="none" stroke="'+wood+'" stroke-width="3" d="M4 28q28 24 56 0"/>'+[12,25,39,52].map((x,i)=>'<path fill="'+color+'" d="M'+x+' '+(32+(i===1||i===2?8:0))+'h7v10h-7z"/>').join('');
 else if(d.art==='night-garden')shape='<path fill="'+wood+'" d="M4 60h56v12H4z"/>'+[12,28,45].map(x=>'<path stroke="#6e9c80" stroke-width="3" d="M'+x+' 64V38"/><path fill="'+color+'" d="M'+(x-5)+' 34h4v-5h4v5h5v6h-5v5h-4v-5h-4z"/>').join('');
 else if(d.art==='night-pumpkin')shape='<path fill="#744c32" d="M29 22h7v12h-7z"/><path fill="#cc843c" d="M12 38h7v-6h28v6h7v24h-7v6H18v-6h-6z"/><path fill="'+color+'" d="M21 43h7v8h-7zM38 43h7v8h-7zM24 57h18v5H24z"/>';
 else if(d.art==='night-crystal'||d.art==='night-aurora')shape='<path fill="'+edge+'" d="M8 67h48v8H8z"/><path fill="'+color+'" d="M12 63V35l8-12 9 15v27zM28 64V14l9-11 10 14v47zM45 64V41l7-9 7 12v20z"/><path fill="#f0f4e0" d="M32 22h4v32h-4zM15 40h3v17h-3z"/>';
 else if(d.art==='night-jelly')shape='<path fill="'+color+'" d="M14 35v-9h7v-7h22v7h7v17H14z"/><path fill="none" stroke="'+color+'" stroke-width="3" d="M20 43v15l-4 7M32 43v22M43 43v15l4 7"/><path fill="#e4f7ec" d="M21 29h5v6h-5z"/>';
 else if(d.art==='night-star')shape='<path fill="'+wood+'" d="M29 35h6v39h-6z"/><path fill="'+color+'" d="M28 7h8v10h12v8H39v10H24V25H14v-8h14z"/>';
 else if(d.art==='night-flower')shape='<path fill="'+wood+'" d="M29 26h6v48h-6z"/><path fill="'+color+'" d="M25 12h14v9h9v12h-9v10H25V33H16V21h9z"/><path fill="#f8eec0" d="M27 22h10v10H27z"/>';
 else if(d.art==='night-candle')shape='<path fill="'+wood+'" d="M10 64h45v9H10zM29 34h7v34h-7zM15 29h5v35h-5zM46 29h5v35h-5z"/>'+[17,32,48].map((x,i)=>'<path fill="'+color+'" d="M'+(x-3)+' '+(i===1?15:10)+'h6v12h-6z"/>').join('');
 else shape='<path fill="'+wood+'" d="M28 14h8v14h-8zM13 30h38v37H13zM10 68h44v6H10z"/><path fill="'+color+'" d="M19 35h26v26H19z"/><path fill="#f3edd2" d="M23 37h4v15h-4z"/><path fill="'+wood+'" d="M29 31h5v34h-5z"/>';
 const filter='night-glow-'+String(uid).replace(/[^a-zA-Z0-9_-]/g,'');return '<svg viewBox="0 0 64 80" shape-rendering="crispEdges" aria-hidden="true"><defs><filter id="'+filter+'" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g class="night-decor-halo" filter="url(#'+filter+')" style="--night-color:'+color+'"><path fill="'+color+'" opacity=".12" d="M8 20h48v48H8z"/>'+shape+'</g></svg>';
}