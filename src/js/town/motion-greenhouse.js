
const TOWN_SEASONS=[
 {sky:'#bad9dc',ground:'#6f914f',road:'#d5c18c',tree:'#426b41',light:'#8fba60',roof:'#7b586d',snow:false},
 {sky:'#91d6e9',ground:'#e7d39c',road:'#d3b77c',tree:'#346642',light:'#83ae52',roof:'#9b654a',snow:false},
 {sky:'#d8c6ae',ground:'#998049',road:'#d9b77f',tree:'#974e36',light:'#e6a34e',roof:'#85554e',snow:false},
 {sky:'#afc9dc',ground:'#d1e2e6',road:'#a6bbc7',tree:'#506d75',light:'#8faeb0',roof:'#637b91',snow:true}
];
function townChimney(){
 const puffs=Array.from({length:4},(_,i)=>`<g class="forge-smoke" style="--smoke-delay:-${i*1.3}s"><path fill="#ccd7d1" d="M142-1v-5h-4v-7h4v-4h11v4h5v8h-5v4z"/><path fill="#ecedda" opacity=".65" d="M142-12h5v-3h6v5h-5v5h-6z"/></g>`).join('');
 return `<g><path fill="#343f49" d="M140 4h19v60l-19-3z"/><path fill="#69777d" d="M140 4h6v55h-6z"/><path fill="#9b9f93" d="M137 2h25v8h-25z"/><path stroke="#3d4b52" stroke-width="2" d="M141 18h17M141 29h17M141 40h17M141 51h17M149 10v8M149 29v11"/>${puffs}<path fill="#263a43" d="M140 1h18v3h-18z"/><path fill="#bac0ad" d="M137 1h25v2h-25z"/></g>`;
}
function townClouds(){
 return [22,44,69].map((y,i)=>`<g class="town-cloud" style="--cloud-time:${78+i*23}s;--cloud-delay:-${[18,67,42][i]}s" opacity="${[.86,.6,.4][i]}"><g transform="translate(0 ${y}) scale(${[1,.8,.6][i]})"><path fill="#e5e9d6" d="M0 11h8V5h13V0h18v5h15v5h10v8H0z"/><path fill="#fff2d6" d="M8 10h14V4h15v5h15v5H8z"/><path fill="#cbd6cc" d="M4 17h56v3H4z"/></g></g>`).join('');
}
let townBirdTimer=null;
function scheduleTownBirds(){
 if(lowEffects)return;
 if(townBirdTimer!==null)return;
 townBirdTimer=gameTimeout(()=>{
  townBirdTimer=null;if($('townP').style.display!=='flex')return;if(townMotionPaused){scheduleTownBirds();return;}
  const flock=document.createElement('div'),count=2+rnd(3),duration=7+rnd(4),reverse=Math.random()<.5;
  flock.className='town-bird-flight'+(reverse?' reverse':'');flock.style.setProperty('--bird-time',duration+'s');flock.style.top=(6+rnd(16))+'%';
  flock.innerHTML='<svg viewBox="0 0 80 42" shape-rendering="crispEdges">'+Array.from({length:count},(_,i)=>`<g transform="translate(${i*19} ${[13,4,22,11][i]})"><g class="town-bird-wings" style="animation-delay:-${i*.14}s"><path fill="#354a59" d="M0 0h4v2h3v3h3V2h3V0h4v3h-3v3h-3v3H6V6H3V3H0z"/><path fill="#e1dac2" d="M7 6h3v2H7z"/></g></g>`).join('')+'</svg>';
  $('townBirds').appendChild(flock);gameTimeout(()=>flock.remove(),duration*1000+100);scheduleTownBirds();
 },9000+rnd(15000));
}
function townExpeditionSign(){
 return `<span class="town-expedition-sign"><svg viewBox="0 0 180 46" aria-hidden="true" shape-rendering="crispEdges"><path fill="#263238" d="M7 11h166v5h5v23h-5v5H7v-5H2V16h5z"/><path fill="#ba9552" d="M9 13h162v5h4v18h-4v5H9v-5H5V18h4z"/><path fill="#694b35" d="M12 17h156v19H12z"/><path fill="#865e3b" d="M15 19h150v5H15z"/><path stroke="#a87945" d="M15 28h148M16 34h146"/><path fill="#e5ca82" d="M12 17h4v4h-4zM164 17h4v4h-4zM12 32h4v4h-4zM164 32h4v4h-4z"/><path fill="#2c3b48" stroke="#d6b36a" d="M25 15h21v16l-10 8-11-8z"/><path stroke="#e6e3c8" stroke-width="2" d="M29 19l14 14M43 19L29 33"/><path stroke="#c9a35b" stroke-width="2" d="M27 28l7-7M38 21l7 7"/><text x="106" y="33" text-anchor="middle" font-size="20" font-weight="900" font-family="sans-serif" fill="#fff0bf" style="paint-order:stroke;stroke:#2a3030;stroke-width:2px">遠征</text></svg></span>`;
}

let townMotionPaused=false;
function renderCachedTownHouse(id,kind,label,p,season){
 const el=$(id),artKey=expandedGameEnabled()?season+':studio15':season;el.setAttribute('aria-label',label);
 if(el.dataset.artSeason!==artKey){el.innerHTML=townHouse(kind,p)+(kind==='training'?'<span class="town-counter">'+townSkillStar()+'</span>':'');el.dataset.artSeason=artKey;el.dataset.points=String(sp+(kitchen?.sp||0));}
 else if(kind==='training'&&el.dataset.points!==String(sp+(kitchen?.sp||0))){el.querySelector('.town-counter').innerHTML=townSkillStar();el.dataset.points=String(sp+(kitchen?.sp||0));}
}
function townGreenhouseArt(p,si=townVisualSeason()){const art=public_townGreenhouseArt(p,si);if(!expandedGameEnabled())return art;return art.replace(/<g fill="#826649" stroke="#4d5a46"[\s\S]*?<\/g><path fill="[^"]*" d="M19 142[^"]*"\/>/,'').replace('<svg ','<svg data-building-identity="glasshouse" ').replace('</svg>','<g data-roof-vent="open"><path fill="#4b746b" stroke="#c8b77f" stroke-width="2" d="M84 49l14-14 25 6-14 15z"/><path fill="#b7d9c2" d="M89 48l10-10 18 5-10 10z"/><path fill="#e6edcc" d="M92 46l8-7 5 2-8 7z"/><path stroke="#789a80" stroke-width="2" d="M84 49v7M109 56v7"/></g></svg>');}
function public_townGreenhouseArt(p,si=townVisualSeason()){
 const snow=p.snow,frame='#b2a16d',light='#e1d4a0',dark='#3c5d55',glass=snow?'#7babb8':'#8ebdb4',glint=snow?'#e0f6ee':'#c9e7d2',leaf=si===2?'#bd9b54':'#659b65',flower=['#e9b1c0','#e6d489','#dcac6d','#c3e3e1'][si];
 const pts=a=>a.map(p=>p.map(Math.round).join(',')).join(' '),A=[13,76],B=[65,22],C=[160,45],D=[119,103],at=(u,v)=>[A[0]*(1-u)*(1-v)+B[0]*u*(1-v)+C[0]*u*v+D[0]*(1-u)*v,A[1]*(1-u)*(1-v)+B[1]*u*(1-v)+C[1]*u*v+D[1]*(1-u)*v];
 let roof='';for(let r=0;r<5;r++)for(let k=0;k<5;k++){const u=r/5,v=k/5;roof+='<polygon points="'+pts([at(u,v),at(u+.2,v),at(u+.2,v+.2),at(u,v+.2)])+'" fill="'+[(r+k)%3?'#8fbfb7':'#b5d6c4',glass][(r+k)%2]+'" stroke="'+frame+'" stroke-width="2"/>';if((r+k)%3===0)roof+='<path d="M'+pts([at(u+.03,v+.025),at(u+.03,v+.16)]).replace(' ','L')+'" stroke="'+glint+'" stroke-width="2"/>';}
 let frontFrames='';for(let x=27;x<=112;x+=22){const y=86+(x-24)*.24;frontFrames+='<path stroke="'+frame+'" stroke-width="3" d="M'+x+' '+y+'v55"/><path stroke="'+light+'" d="M'+(x+1)+' '+(y+1)+'v52"/>';}
 let sideFrames='';for(let x=128;x<180;x+=16){const y=104-(x-121)*.26;sideFrames+='<path stroke="'+frame+'" stroke-width="3" d="M'+x+' '+y+'v52"/>';}
 const plant=(x,y,n)=>'<g transform="translate('+x+' '+y+')"><path fill="#826346" d="M-6-1H6v9H-6z"/><path fill="#bf9b65" d="M-7-2H7v3H-7z"/><path stroke="#4e7652" stroke-width="2" d="M0-2v-22M0-10l-8-8M0-8l9-12"/><path fill="'+leaf+'" d="M-10-21h7v8h-7zM4-24h8v7H4zM-3-30h7v10h-7z"/><path fill="'+flower+'" d="M-2-'+(32+n)+'h5v5h-5z"/></g>';
 return '<svg viewBox="0 -28 192 212" data-greenhouse-depth="2" aria-hidden="true" shape-rendering="crispEdges"><defs><clipPath id="gh-roof-depth"><polygon points="'+pts([A,B,C,D])+'"/></clipPath><clipPath id="gh-front-depth"><path d="M24 85l91 22v58l-91-22z"/></clipPath><clipPath id="gh-side-depth"><path d="M121 106l57-15v58l-57 16z"/></clipPath></defs><g transform="translate(192 0) scale(-1 1)"><path fill="#243b30" opacity=".28" d="M8 147l112 31 69-24v9l-69 25L8 157z"/><path fill="#626d60" d="M16 142l103 27 66-22v12l-66 24-103-28z"/><path fill="#bcb492" d="M16 142l103 27 66-22-8-4-58 19-96-25z"/><path fill="#435a52" d="M119 169l66-22v12l-66 24z"/><path fill="'+dark+'" stroke="#324c46" stroke-width="3" d="M20 77l98 22 64-15v69l-64 19-98-25z"/><path fill="'+glass+'" d="M24 85l91 22v58l-91-22z"/><path fill="#648f8c" d="M121 106l57-15v58l-57 16z"/><g clip-path="url(#gh-front-depth)"><path fill="#729e8c" d="M24 128l92 23v20l-92-22z"/>'+plant(39,137,1)+plant(61,143,3)+plant(101,154,0)+'<path stroke="'+glint+'" stroke-width="4" opacity=".7" d="M29 116l20-19M35 124l29-25M82 149l26-25"/><path fill="#daf1d4" opacity=".2" d="M26 88l24 6v52l-24-6z"/></g><g clip-path="url(#gh-side-depth)">'+plant(135,151,2)+plant(164,143,1)+'<path stroke="#b7d9cc" stroke-width="3" opacity=".5" d="M128 136l17-20M153 136l18-19"/></g>'+frontFrames+sideFrames+'<path stroke="'+frame+'" stroke-width="3" fill="none" d="M24 113l91 23M121 132l57-15M24 141l91 23 63-18"/><path stroke="'+light+'" fill="none" d="M25 110l89 22M123 128l53-14"/><path fill="#719c96" stroke="'+frame+'" stroke-width="3" d="M77 124l24 6v35l-24-6z"/><path fill="'+glint+'" opacity=".6" d="M80 130l8 2v16l-8-2z"/><path stroke="'+light+'" stroke-width="2" d="M89 128v31M78 149l22 5"/><path fill="#6d6044" d="M95 147h3v4h-3z"/><path fill="#7da9a2" stroke="'+dark+'" stroke-width="3" d="M118 101l42-56 27 42z"/><path stroke="'+frame+'" stroke-width="3" fill="none" d="M160 47v43M140 73l36 9M149 61l27 23"/><path stroke="'+glint+'" d="M158 54l-15 21"/><polygon points="'+pts([A,B,C,D])+'" fill="'+dark+'" stroke="#38534b" stroke-width="5"/><g clip-path="url(#gh-roof-depth)">'+roof+'</g><path fill="'+light+'" d="M61 21l5-3 95 24 3 4-4 3-95-24z"/><path fill="'+dark+'" d="M10 75l109 27v6L10 81zM119 102l42-58 4 3-44 61z"/><path fill="'+light+'" d="M13 75l104 26v2L13 77z"/><path fill="#68867a" d="M74 161l29 7 7 5-32-7z"/><path fill="#cfc49b" d="M77 159l24 6v3l-24-6z"/>'+(snow?'<path fill="#eef8ed" d="M13 76l52-54 95 23-5 6-90-22-45 48zM20 139l99 25 61-17v6l-61 18-99-25zM45 67l14-15 18 4-7 8-16-1-5 7zM104 96l9-10 15 4-9 13-11-3z"/>':'')+townHouseSign('greenhouse')+'<g fill="#826649" stroke="#4d5a46" stroke-width="2"><path d="M17 148h12v14H17zM168 152h12v15h-12z"/></g><path fill="'+leaf+'" d="M19 142h7v8h-7zM170 145h8v9h-8z"/></g></svg>';
}
function renderGreenhouse(p,season){
 const el=$('townGreenhouse'),key=season+':depth2'+(expandedGameEnabled()?':studio15':'');if(el.dataset.greenhouseArt===key)return;el.dataset.greenhouseArt=key;el.dataset.artSeason=season;el.dataset.harvestKey='';el.innerHTML=townGreenhouseArt(p,Math.max(0,DECOR_SEASONS.indexOf(season)));
}