

const TOWN_STREETS=[
 {id:'north',w:25,p:[[182,151],[182,217],[182,285],[184,336]]},
 {id:'south',w:27,p:[[188,470],[188,532],[188,625]]},
 {id:'archive',w:16,p:[[145,355],[125,333],[92,320],[73,311]]},
 {id:'forge',w:18,p:[[232,352],[251,338],[280,325]]},
 {id:'greenhouse',w:15,p:[[121,414],[103,433],[59,440]]},
 {id:'shop',w:15,p:[[188,590],[152,607],[78,607]]},
 {id:'training',w:15,p:[[188,590],[230,614],[289,613]]},
 {id:'decor',w:13,p:[[248,414],[279,430],[311,440]]}
];
const TOWN_TREES=[[26,130,.72],[331,137,.68],[14,316,.34],[342,431,.48],[343,359,.38]];
function summerTownScene(p,streets,stones){
 let sparkles='';for(let k=0;k<3;k++){let marks='';for(let i=0;i<10;i++){const x=(i*41+k*17)%360,y=87+(i*13+k*11)%67;marks+='<path d="M'+x+' '+y+'h'+(2+i%4)+'v1h-'+(2+i%4)+'z"/>'; }sparkles+='<g class="coast-glitter" style="--glitter-delay:-'+k*1.4+'s" fill="'+['#f4fff5','#b3f4ed','#e3f9ff'][k]+'">'+marks+'</g>';}
 const coast='<path fill="#d4b778" d="M0 141l23 10 33 4 24-6 33 5 29-6 38 8 31-4 33 4 31-7 24 4 36-9 25-2v20H0z"/><path fill="#f8e8b5" d="M0 137l24 10 32 4 24-6 33 5 29-6 39 8 30-4 33 4 31-7 25 4 35-9 25-2v7l-24 2-36 9-25-4-31 7-33-4-31 4-39-8-29 6-33-5-24 6-32-4-24-10z"/>';
 return '<svg viewBox="0 0 360 620" preserveAspectRatio="none" aria-hidden="true" shape-rendering="crispEdges" data-summer-coast="1"><rect width="360" height="620" fill="'+p.ground+'"/><rect width="360" height="155" fill="#91d6e9"/><path fill="#c1e8eb" d="M0 60h360v24H0z"/>'+townClouds()+'<rect y="83" width="360" height="73" fill="#247b9e"/><rect y="94" width="360" height="62" fill="#329db5"/><path fill="#4db9c4" d="M0 117h360v39H0z"/><path fill="#81d5ce" d="M0 134h360v22H0z"/><path fill="#64988d" d="M4 83l18-12 13-2 20 14zM288 83l15-9 8 2 7-5 19 12z"/><path fill="#91b4a1" d="M15 77l9-5 12 1 14 10H22zM302 77l8 1 6-4 15 9h-21z"/><g class="coast-wave" fill="#b4eee1"><path d="M0 108h37v2H0zM48 105h28v2H48zM93 110h43v2H93zM157 107h35v2h-35zM218 109h47v2h-47zM287 105h48v2h-48zM338 111h22v2h-22z"/></g><g class="coast-wave coast-wave-near" fill="#ddf8e6"><path d="M0 128h29v2H0zM43 131h42v2H43zM100 127h28v2h-28zM151 132h53v2h-53zM221 129h31v2h-31zM270 130h46v2h-46zM330 126h30v2h-30z"/></g>'+sparkles+coast+'<g fill="#cfb479" opacity=".6">'+Array.from({length:36},(_,i)=>'<path d="M'+(8+i*67%343)+' '+(177+i*47%435)+'h3v1h-3z"/>').join('')+'</g><g fill="none" stroke-linecap="round" stroke-linejoin="round">'+streets+'</g>'+stones+townCastle(p)+'</svg>';
}
function iceCrystalArchArt(){
 const f=(c,d)=>'<path fill="'+c+'" d="'+d+'"/>';
 return '<svg viewBox="0 0 64 64" shape-rendering="crispEdges" aria-label="冰晶拱門">'+f('#233e5444','M0 59h64v5H0z')+f('#294d69','M3 60V23h4V14h7V8h9V3h18v5h9v6h7v9h4v37H47V27h-4v-7H21v7h-4v33z')+f('#679fb9','M5 58V24h4v-9h7v-5h9V5h14v5h9v5h7v9h4v34H49V26h-4v-8H19v8h-4v32z')+f('#a0dce8','M6 24h8v32H6zM50 24h8v32h-8zM11 16h7v8h-7zM17 11h9v7h-9zM25 6h13v11H25zM38 11h9v7h-9zM47 16h6v8h-6z')+f('#def8f6','M6 25h3v28H6zM11 17h3v6h-3zM18 12h7v2h-7zM26 7h4v9h-4zM39 12h7v2h-7zM51 25h2v28h-2z')+f('#4c82a3','M12 26h2v30h-2zM56 26h2v30h-2zM17 18h3v6h-3zM43 18h3v6h-3zM31 7h5v9h-5z')+f('#bdebf0','M2 54h16v5H2zM46 54h16v5H46zM1 59h18v3H1zM45 59h18v3H45z')+f('#ecffff','M2 54h15v2H2zM47 54h14v2H47z')+f('#4e8cab','M25 4l7-4 7 4-7 11zM5 34l6-5 5 6-5 12zM49 35l5-6 6 6-6 12z')+f('#b3f0f2','M27 4l5-3 4 3-4 8zM7 35l4-4 3 4-3 9zM51 35l3-4 4 4-4 9z')+f('#f3ffff','M29 4h3v5h-1zM8 35h2v6H8zM52 35h2v6h-2z')+f('#c9f3f3','M19 19h4v8l-2 6-2-6zM29 18h4v5l-2 5-2-5zM40 19h3v8l-1 5-2-5z')+'<g class="ice-arch-glint">'+f('#fffef5','M20 5h1v7h-1zM17 8h7v1h-7zM56 17h1v7h-1zM53 20h7v1h-7zM3 46h1v5H3zM1 48h5v1H1z')+'</g></svg>';
}

function townScene(p){return townMasterScene(p);}
function renderTownPlaza(p,season){
 const el=$('townPlaza'),key=season+':'+isSandboxNight();if(el.dataset.season===key)return;el.dataset.season=key;
 el.innerHTML=townMasterPlazaArt(p);$('townFurniture').innerHTML='';
}
function renderTownWeather(si){
 const el=$('townWeather'),key=si+':'+isSandboxNight();if(el.dataset.season===key)return;el.dataset.season=key;
 let particles='';
 if(si===3||si===2){const count=si===3?14:8;for(let i=0;i<count;i++)particles+=`<i class="town-weather-particle ${si===3?'town-snow':'town-leaf'}" style="left:${(i*37+13)%100}%;top:-16px;animation-duration:${si===3?11+i%7:13+i%6}s;animation-delay:-${(i*2.7)%19}s;${si===2?'background:'+['#db9741','#c96a36','#e8b756'][i%3]+';':''}scale:${si===3?.55+(i%3)*.25:.7+(i%3)*.2}"></i>`;}
 else if(isSandboxNight()){particles=Array.from({length:10},(_,i)=>'<i class="night-firefly" style="left:'+((i*37+7)%100)+'%;top:'+((i*23+15)%80)+'%;animation-delay:-'+i+'s"></i>').join('');}
 else if(si===1){for(let i=0;i<3;i++)particles+=`<i class="town-weather-particle town-sunray" style="left:${15+i*23}%;animation-delay:-${i%2?7:1}s;animation-duration:${13+i%2*3}s;width:${10+i%3*5}%"></i>`;}
 else particles='';
 el.innerHTML=particles;
}