
function preview_decorSVG(id,season=seasonIndex(),uid='preview'){
 const d=DECOR_BY_ID.get(id);if(!d)return '';if(d.night)return nightDecorationSVG(d,season,uid);const type=d.art,p=TOWN_SEASONS[season],winter=season===3;if(type==='icearch')return iceCrystalArchArt();
 const O='#273740',wood='#85613e',gold='#e7c47a',cream='#f4dfac',green=season===2?'#ca763c':winter?'#5f8894':'#6f9c68',leaf=season===2?'#edb057':winter?'#c6e3e4':'#a6c582',pink='#e7a3b4',blue='#80b8d1';
 const path=(c,s)=>'<path fill="'+c+'" d="'+s+'"/>',box=(x,y,w,h,c)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+c+'"/>',gem=(x,y,c)=>'<path fill="'+c+'" stroke="'+O+'" d="M'+x+' '+(y-9)+'l7 9-7 13-7-13z"/>';
 const bloom=(x,y,c)=>path(c,'M'+(x-3)+' '+(y-9)+'h6v5h5v6h-5v5h-6V'+(y+2)+'h-5v-6h5z')+box(x-2,y-3,4,4,gold);
 const flower=(x,y,c)=>box(x-1,y,2,18,'#58795a')+path(green,'M'+(x-1)+' '+(y+10)+'l-8-5v6l8 4zM'+(x+1)+' '+(y+7)+'l8-6v6l-8 4z')+bloom(x,y,c);
 const star=(x,y,c)=>'<polygon fill="'+c+'" stroke="'+O+'" points="'+[[0,-10],[3,-3],[10,-3],[5,2],[7,10],[0,6],[-7,10],[-5,2],[-10,-3],[-3,-3]].map(([dx,dy])=>(x+dx)+','+(y+dy)).join(' ')+'"/>';
 const lantern=(color=gold,shape='normal')=>{
  const key='decor-glow-'+uid.replace(/[^\w-]/g,'');
  return '<defs><radialGradient id="'+key+'"><stop stop-color="'+color+'" stop-opacity=".8"/><stop offset="1" stop-color="'+color+'" stop-opacity="0"/></radialGradient></defs><g class="town-lamp-glow"><circle cx="32" cy="21" r="25" fill="url(#'+key+')"/></g>'+path(O,'M27 59h10v4H27zM30 31h4v28h-4zM20 10h24v25H20z')+path('#617776','M28 56h8v3h-8zM31 35h1v20h-1z')+box(23,14,18,17,color)+box(26,16,5,12,cream)+path(O,'M30 14h3v17h-3zM18 9h28v4H18zM18 33h28v3H18zM26 5h12v4H26z')+(shape==='star'?star(32,10,color):shape==='sun'?bloom(32,8,'#f5c56e'):shape==='flower'?bloom(32,9,pink):'');
 };
 const planter=()=>path(O,'M6 47h52v14H6z')+path(wood,'M8 49h48v10H8z')+box(8,48,48,3,'#d7b77e');
 let s='';
 if(['tree','cherry','maple','snowpine'].includes(type)){
  s=path('#20382e55','M8 57h49v5H8z')+path(wood,'M27 23h10v38H27zM20 31h9v8h-9zM36 28h9v6h-9z')+box(28,32,3,26,'#b38f59');
  if(type==='snowpine')s+=path('#365c63','M32 0l-9 16h4L13 34h7L5 53h54L45 34h7L38 16h4z')+path('#e0f0e7','M32 0l-9 16h17l-5-6zM22 22L13 34h36l-5-5H30zM16 41L5 53h54l-5-6H27z')+path('#a5ced0','M19 51h13v3H19zM28 15h8v2h-8z');
  else{const c=type==='cherry'?'#d891a7':type==='maple'?'#c36a38':green,hi=type==='cherry'?'#f0b9c7':type==='maple'?'#e8a452':leaf;s+=path(O,'M14 6h11V1h19v7h10v8h7v23h-7v8H39v6H22v-6H8V35H3V18h7v-8h4z')+path(c,'M15 9h12V4h15v8h11v9h5v15h-7v8H38v6H23v-7H11V32H6V20h7z')+path(hi,'M16 10h12V5h12v8h10v7H38v6H17v-6H9v-3h7z')+box(12,30,8,5,hi)+box(41,34,9,4,hi);if(winter)s+=path('#e0f0e7','M14 8h12V2h17v7h11v6H39v-4H24v7H10v-4h4z');if(type==='cherry')for(const [x,y]of [[18,15],[41,20],[25,35],[45,36]])s+=bloom(x,y,'#f5d2cf');} 
 }else if(type==='fountain')return townFountainArt();
 else if(['lamp','blossomlamp','sunlamp','amberlamp','starlamp'].includes(type))s=lantern(type==='amberlamp'?'#e9ac62':type==='blossomlamp'?pink:gold,type==='blossomlamp'?'flower':type==='sunlamp'?'sun':type==='starlamp'?'star':'normal');
 else if(['cat','dog'].includes(type))return petArt(type);
 else if(['bench','acornbench'].includes(type)){
  s=path(O,'M8 18h4v37H8zM52 18h4v37h-4zM12 44h4v15h-4zM48 44h4v15h-4z')+path(wood,'M12 16h40v18H12zM5 36h53v10H5z')+path('#d4b178','M13 17h38v5H13zM13 26h38v5H13zM7 37h49v4H7z')+path('#657770','M5 32h6v9H5zM52 32h6v9h-6z');if(type==='acornbench')s+=path('#9c6e3e','M16 9h10v11H16zM39 9h10v11H39z')+path('#d2a368','M14 7h14v6H14zM37 7h14v6H37z');
 }else if(type==='fence')s=path(wood,'M3 25h58v6H3zM3 43h58v6H3zM10 15l5-6 5 6v45H10zM43 15l5-6 5 6v45H43z')+path('#c8a46b','M11 16h3v42h-3zM44 16h3v42h-3zM2 24h60v2H2z');
 else if(['flowers','tulips','daisy','sunflowers'].includes(type)){
  if(type!=='flowers')s=planter();const c=type==='sunflowers'?'#edc866':type==='tulips'?'#e598a6':cream;for(const [x,y]of [[14,33],[31,25],[49,34]])s+=flower(x,y,type==='flowers'?(x===31?pink:cream):c);if(type==='daisy')s+=box(18,49,28,12,'#ad7960');
 }else if(['flowerarch','icearch'].includes(type)){
  const c=type==='icearch'?blue:wood;s=path(O,'M4 63V20h6V11h9V5h26v6h9v9h6v43H49V23h-5v-7H20v7h-5v40z')+path(c,'M7 61V22h6V14h8V8h22v6h8v8h6v39h-5V22h-6v-9H18v9h-6v39z');for(const [x,y]of [[12,27],[19,13],[34,9],[49,20],[54,42]])s+=type==='icearch'?gem(x,y,'#d1f4ef'):bloom(x,y,x%2?cream:pink);
 }else if(type==='rabbit')s=path(O,'M18 15V1h9v17h9V1h9v18l6 8v16l-7 6v10H15V46l-6-6V28z')+path('#d8d6ba','M21 4h4v21h14V4h4v21h5v15l-7 6v11H18V45l-6-6V29h9z')+box(21,6,3,11,pink)+box(39,6,3,11,pink)+box(23,30,3,4,O)+box(38,30,3,4,O)+box(30,37,4,3,pink)+box(14,58,35,4,'#879e8c');
 else if(type==='picnic'){
  s=path('#324b4944','M1 31h61v28H1z')+path('#c87975','M3 28h57v27H3z');for(let y=29;y<54;y+=8)for(let x=4;x<59;x+=9)if((x+y)%2)s+=box(x,y,8,7,'#edc8ae');s+=box(12,16,22,21,wood)+box(14,13,18,5,'#d4ac74')+path('#d2af72','M16 12V5h13v7h-3V8h-7v4z')+bloom(47,39,cream);
 }else if(type==='windmill')s=path('#485e61','M25 17h14l8 45H17z')+path('#d2c4a0','M28 20h7l7 39H22z')+box(29,47,7,14,O)+'<g class="decor-windmill">'+path(wood,'M30 4h5v39h-5zM13 20h39v5H13z')+path(cream,'M33 3h12v11H33zM40 23h13v12H40zM20 31h12v13H20zM11 10h12v12H11z')+box(29,19,7,7,gold)+'</g>';
 else if(type==='birdhouse')s=box(30,29,4,33,wood)+path('#6596a0','M18 15h28v28H18z')+path('#c4ac74','M13 17L32 2l19 15z')+box(20,17,25,3,cream)+box(27,23,10,12,O)+box(22,37,20,3,wood)+path('#dea57c','M40 36h9v-5h5v9H40z');
 else if(type==='clover')s=path('#7c9990','M9 31l9-12 28 2 11 17-9 20H18L7 46z')+path('#b6c5a6','M16 25h29l8 12H12z')+path('#5c9465','M30 37V25h-8v-9h9v5h4v-5h9v9h-8v11h8v9h-9v-6h-4v6h-9v-9h8z')+box(31,39,3,14,green);
 else if(type==='palm')s=path(wood,'M29 22h9l-5 40H23z')+path('#b69964','M30 28h4l-1 6h-4zM27 42h5v6h-6zM25 54h6v4h-6z')+path('#5a9268','M31 22L13 8 2 13l13 4 10 9-15 1L1 39l17-5 13-5 8 6 6 16 5-15-10-13 17 6 6-6-15-8-13 3 5-12-6-6-4 19z')+path('#a1bf7d','M8 13l8-1 13 12-2 2-14-9zM36 22l18-2 4 3-19 2z');
 else if(type==='deckchair')s=path(O,'M10 55l9-37h6L17 55zM47 55L31 20h6l17 35zM14 40h39v6H14z')+path('#6b9fae','M22 15h16l11 26H15z')+path(cream,'M26 15h6l9 26h-7z')+path(wood,'M18 11h24v5H18zM12 42h43v4H12z');
 else if(type==='parasol')s=box(30,20,4,41,wood)+path('#cbb884','M21 58h23v4H21z')+path(O,'M1 24L31 2l31 22v7H1z')+path('#6ba7be','M4 24L31 5l28 19-9 4-9-4-10 4-10-4-10 4z')+path(cream,'M31 5l-7 19 7 4 8-4z');
 else if(['melonstall','cocoastall'].includes(type)){
  const c=type==='melonstall'?'#71a079':'#9b7364';s=path(wood,'M7 13h4v48H7zM53 13h4v48h-4zM9 41h46v20H9z')+path(c,'M2 13L9 3h46l7 10v12H2z')+path(cream,'M8 4h8v20H8zM25 4h8v20h-8zM43 4h8v20h-8z')+box(8,40,48,4,'#d6b57b');for(const x of [19,34,47])s+=type==='melonstall'?path('#6c9d5e','M'+(x-6)+' 33v-7h12v10h-12z')+box(x-2,26,2,9,'#b5c179'):box(x-5,29,9,10,cream)+box(x+4,31,3,5,wood);s+=box(13,48,36,3,'#c49c68');
 }else if(type==='surf')s=path(wood,'M6 49h50v5H6zM10 53h4v9h-4zM49 53h4v9h-4z')+path(blue,'M13 6l6-5 6 5v48H13z')+path(cream,'M18 4h3v47h-3z')+path('#df9d7d','M35 9l6-6 7 6v45H35z')+path('#e7c976','M39 8h4v44h-4z');
 else if(type==='sandcastle')s=path('#be9c66','M7 27h12V13h9v13h10V10h11v17h8v35H7z')+path('#e3c68a','M10 30h44v28H10zM20 15h6v12h-6zM39 12h8v15h-8z')+path('#9a8059','M27 45h10v15H27z')+path(cream,'M9 28h8v5H9zM23 28h8v5h-8zM37 28h8v5h-8zM51 28h6v5h-6z')+box(43,1,2,9,wood)+box(45,1,9,5,'#c78c7d');
 else if(type==='pond')s=path('#657f7b','M11 25h12v-7h24v7h10v9h5v17h-8v8H14v-7H3V35h8z')+path('#87b7bd','M14 28h11v-6h20v7h10v8h4v11h-8v7H17v-6H7V37h7z')+path('#b7ded3','M11 38h15v2H11zM38 49h14v2H38z')+path('#68996e','M15 34h13v9H15zM37 29h12v9H37z')+bloom(23,34,pink)+bloom(44,28,cream);
 else if(type==='tiki')s=path(O,'M20 2h24v59H20z')+box(23,4,18,56,'#b68c53')+path('#6f5b3c','M26 13h5v5h-5zM35 13h5v5h-5zM27 27h12v12H27zM24 47h17v4H24z')+path('#d3bb7b','M25 8h16v3H25zM29 28h8v3h-8zM26 55h13v3H26z');
 else if(type==='pumpkins')for(const [x,y,r]of [[19,43,12],[42,40,14],[31,24,10]])s+=path('#b16b35','M'+(x-r)+' '+(y-r+4)+'h4v-4h'+(r*2-8)+'v4h4v'+(r*2-8)+'h-4v4h-'+(r*2-8)+'v-4h-4z')+box(x-2,y-r+3,3,r*2-5,'#e2a04f')+box(x-2,y-r-5,4,6,green);
 else if(type==='scarecrow')s=box(30,17,4,45,wood)+path('#a48c5b','M6 27h52v5H6z')+path('#b47659','M22 25h20v22l-10-4-10 4z')+path('#dec68c','M24 9h17v15H24z')+path('#77623e','M18 8h30v5H18zM25 2h16v8H25z')+box(27,15,2,3,O)+box(36,15,2,3,O)+box(29,21,7,1,O)+path('#d6b871','M7 25h3v10H7zM55 25h3v10h-3z');
 else if(type==='haycart')s=path(wood,'M5 37h46v18H5zM49 40h14v4H49z')+path('#c4a66b','M8 22h18v18H8zM28 17h20v23H28zM16 6h25v15H16z')+path('#e3c281','M9 23h16v3H9zM29 18h18v3H29zM17 7h23v3H17z')+path('#967a50','M16 25h3v14h-3zM36 20h3v20h-3zM28 9h3v11h-3z')+path(O,'M10 49h11v13H10zM38 49h11v13H38z')+box(13,53,5,5,'#b3a079')+box(41,53,5,5,'#b3a079');
 else if(type==='mushrooms')for(const [x,y,r]of [[14,43,10],[34,27,13],[50,45,9]])s+=box(x-3,y,6,14,cream)+path('#b96f64','M'+(x-r)+' '+y+'v-7h5v-5h'+(r*2-10)+'v5h5v7z')+box(x-6,y-5,4,3,'#ebd9a5');
 else if(type==='basket')s=path(wood,'M9 29h46l-5 29H14z')+path('#c8a26a','M11 29h42v5H11zM16 42h33v3H16zM18 52h29v3H18z')+path('#b58756','M18 28V12h27v16h-4V16H22v12z')+bloom(22,30,'#c87b56')+bloom(38,28,'#d7b76b')+path(green,'M39 21l9-9v9l-9 5z');
 else if(type==='leafpile')for(let i=0;i<12;i++)s+=path(['#b46a36','#d99b48','#e8ba68'][i%3],'M'+(6+(i*17)%45)+' '+(32+(i*7)%22)+'l8-7 8 5-5 8h-9z');
 else if(type==='owl')s=path('#829889','M15 12h8V4l9 7 10-7v8h7v34l-8 11H23L15 46z')+path('#bdc4a0','M20 18h24v27l-7 9H27l-7-9z')+box(21,21,8,10,O)+box(35,21,8,10,O)+box(24,24,3,5,gold)+box(37,24,3,5,gold)+path('#d3b572','M29 34h7l-4 7z')+path('#5e7c75','M19 37l9 6-7 7zM45 37l-9 6 7 7z')+box(12,58,40,5,'#6d857a');
 else if(type==='snowman')s=path('#9dbfc7','M16 30h32v8h7v16h-7v7H16v-7H9V38h7zM20 10h24v21H20z')+path('#e1eee1','M17 32h29v8h6v12h-7v6H18v-6h-6V40h5zM22 12h20v17H22z')+path(O,'M17 9h29v4H17zM23 0h17v9H23z')+box(25,17,3,3,O)+box(36,17,3,3,O)+path('#d99860','M31 22h13l-13 4z')+box(20,29,26,4,'#b36f6a')+box(38,32,6,13,'#b36f6a')+box(30,40,3,3,O)+box(30,49,3,3,O);
 else if(type==='icecrystal')s=gem(30,28,'#a3dce4')+gem(15,43,'#84bdcf')+gem(48,40,'#c8edef')+path('#eef9eb','M30 18h2v26h-2zM15 36h2v17h-2zM48 34h2v17h-2z')+box(8,57,48,4,'#7aa4b4');
 else if(type==='gifts')for(const [x,y,w,c]of [[5,36,23,'#b6787f'],[30,27,28,'#729c99'],[15,9,23,'#7897b6']])s+=box(x,y,w,22,c)+box(x-1,y-3,w+2,5,cream)+box(x+Math.floor(w/2)-2,y-4,4,26,gold)+path(gold,'M'+(x+w/2)+' '+(y-3)+'l-9-8v6h18v-6z');
 else if(type==='sleigh')s=path('#7e4d4c','M5 22h10v18h35V17h8v27H11z')+path('#b67d6b','M15 34h35v8H15z')+path(gold,'M8 50h46l7-8v9l-6 5H8l-6-6v-5zM15 43h4v8h-4zM44 43h4v8h-4z')+box(15,23,35,10,'#a1b4ab')+bloom(32,20,'#d7b87b');
 else if(type==='reindeer')s=path('#986f52','M13 28h35v20H13zM39 15h15v20H39zM14 44h5v17h-5zM39 44h5v17h-5z')+path('#c9a77a','M17 30h16v10H17zM43 17h8v11h-8z')+path('#8c8264','M41 16V4h-7V0h3v7h6v8h4V6h7V1h3v8h-7v7z')+box(47,22,3,3,O)+box(51,28,5,4,'#ba7b73')+path('#708d7b','M39 32h14v5H39z')+box(43,34,5,6,gold);
 else if(type==='snowbanner')s=box(11,1,4,61,'#7c8f8f')+path('#6693af','M15 7h36v36l-17-7-19 7z')+path('#c2e3df','M32 13h4v18h-4zM25 20h18v4H25zM27 15l15 14-2 2-15-14zM40 15l2 2-15 14-2-2z')+box(5,59,17,4,'#a8c8c5');
 if(!s)s=box(14,16,36,39,wood)+bloom(32,28,pink);
 return '<svg viewBox="0 0 64 64" aria-hidden="true" shape-rendering="crispEdges">'+s+'</svg>';
}