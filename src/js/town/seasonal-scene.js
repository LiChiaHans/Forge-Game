
const GEMINI_TOWN_ART=["assets/town/0.ce3ce9d639bb.webp","assets/town/1.e66463ca4058.webp","assets/town/2.0a73b8a46fbe.webp","assets/town/3.ff18b8000d82.webp"];
const GEMINI_TOWN_BUILDINGS=[
 {id:'townExpedition',kind:'expedition',name:'遠征城堡',label:'遠征城堡，挑戰怪物',box:[.005,.01,.445,.245],sign:[.13,.58,.69,.17],angle:-2},
 {id:'townArchive',kind:'archive',name:'星頁圖鑑館',label:'星頁圖鑑館，查看武器收藏',box:[0,.25,.385,.205],sign:[.18,.44,.78,.19],angle:-5},
 {id:'townKitchen',kind:'kitchen',name:'暖爐餐廳',label:'暖爐餐廳，晚間料理營業',box:[.63,.085,.37,.245],sign:[.055,.48,.82,.16],angle:5},
 {id:'townGreenhouse',kind:'greenhouse',name:'晨露溫室',label:'晨露溫室，種植與收成',box:[.015,.465,.345,.195],sign:[.09,.42,.85,.20],angle:5},
 {id:'townForge',kind:'forge',name:'鐵火冶煉廠',label:'鐵火冶煉廠，進入鍛造棋盤',box:[.605,.465,.395,.205],sign:[.08,.38,.82,.19],angle:-5},
 {id:'townDecorShop',kind:'decor',name:'彩匠裝飾行',label:'彩匠裝飾行，購買城鎮裝飾',box:[.015,.675,.37,.225],sign:[.055,.40,.88,.18],angle:-5},
 {id:'townTraining',kind:'training',name:'星盾訓練所',label:'星盾訓練所，提升技能',box:[.61,.695,.39,.24],sign:[.13,.39,.82,.17],angle:5}
];
function geminiTownSignArt(kind,name,tier=0){
 const colors={expedition:['#343e53','#8297ae','#d7c68c'],archive:['#42384e','#967d9f','#ead8a4'],kitchen:['#734332','#c48b55','#ffe0a0'],greenhouse:['#28564b','#6b9b73','#e8dd9c'],forge:['#333e45','#899ca0','#e9bd72'],decor:['#5b425e','#aa87a3','#f4dba4'],training:['#2e4b63','#799fb8','#edd080']};
 let [wood,rim,gold]=colors[kind];
 if(tier===1){rim='#b9c9d4';gold='#ffe49c';}
 else if(tier===2){rim='#deb34e';gold='#fff0b5';}
 else if(tier>=3){rim='#f2c757';gold='#fff7cf';}
 const icons={expedition:'<path stroke="#e8e5ce" stroke-width="3" d="M20 14l19 21M38 14L20 35"/><path stroke="#e0ad56" stroke-width="3" d="M17 28l9-7M32 29l9-7"/>',archive:'<path fill="#f1e3b5" d="M17 15l11 3v20l-11-4zM30 18l12-3v19l-12 4z"/><path stroke="#9c8153" d="M20 20l6 2M20 25l6 2M32 22l7-2M32 27l7-2"/>',kitchen:'<path stroke="#f4dfad" stroke-width="3" d="M21 13v25M17 13v10h8V13M36 26v12"/><ellipse fill="#f4dfad" cx="36" cy="19" rx="5" ry="8"/>',greenhouse:'<path stroke="#d8d799" stroke-width="3" d="M29 38V21l-8-5M29 28l9-9"/><path fill="#98be79" d="M15 13h9v10h-9zM32 13h12v10H32z"/><path fill="#d4df96" d="M18 14h3v7h-3zM35 14h4v7h-4z"/>',forge:'<path fill="#b3c2bd" d="M16 17h26v8H16zM23 25h12v6H23zM20 31h18v6H20z"/><path fill="#f2c982" d="M16 17h26v3H16z"/>',decor:'<path fill="#e9c590" d="M16 14h25v22H16z"/><path fill="#b26878" d="M19 17h8v7h-8z"/><path fill="#71a58c" d="M30 17h8v7h-8z"/><path fill="#7c9cc1" d="M19 27h8v6h-8z"/><path fill="#e0b557" d="M30 27h8v6h-8z"/>',training:'<path fill="#7796af" stroke="#e8cd83" stroke-width="2" d="M17 13h24v18l-12 9-12-9z"/><path fill="#f5d978" d="M27 17h4v5h6l-4 5 2 6-6-4-5 4 1-6-4-5h6z"/>'};
 const innerTrim=tier>=3?'<path fill="#9c2934" d="M12 12h156v3H12zM12 36h156v3H12z"/><path fill="'+gold+'" d="M12 15h156v1H12zM12 35h156v1H12z"/>':tier===2?'<path fill="'+gold+'" opacity=".65" d="M12 12h156v2H12zM12 37h156v2H12z"/>':'';
 const stars=tier>0?'<rect x="'+(169-tier*11)+'" y="2" width="'+(tier*11+4)+'" height="12" fill="#222a2e" rx="2"/><text x="169" y="11.5" text-anchor="end" font-size="10" font-weight="900" fill="'+gold+'">'+('★'.repeat(Math.min(3,tier)))+'</text>':'';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50" aria-hidden="true" shape-rendering="crispEdges" data-sign-kind="'+kind+'" data-sign-tier="'+tier+'"><path fill="#20292b" d="M8 2h164v5h6v36h-6v5H8v-5H2V7h6z"/><path fill="'+rim+'" d="M9 5h162v5h4v30h-4v5H9v-5H5V10h4z"/><path fill="'+gold+'" d="M11 7h158v3H11zM8 11h3v27H8z"/><path fill="'+wood+'" d="M12 12h156v27H12z"/>'+innerTrim+'<path stroke="'+rim+'" opacity=".4" d="M51 17h110M51 34h110"/><path fill="#1d303b" d="M15 11h29v29H15z"/>'+icons[kind]+'<path fill="'+gold+'" d="M9 10h3v3H9zM168 10h3v3h-3zM9 37h3v3H9zM168 37h3v3h-3z"/><text x="106" y="33" text-anchor="middle" font-size="'+(name.length>4?20:22)+'" font-weight="900" font-family="Noto Sans TC,Microsoft JhengHei,sans-serif" fill="#fff0c8" stroke="#20282a" stroke-width="1.5" paint-order="stroke">'+name+'</text>'+stars+'</svg>';
}
function townBuildingUpgradeParts(kind,tier){
 if(!tier||tier<1)return {arch:'',glow:''};
 const t2=tier>=2,t3=tier>=3;
 let arch='',glow='';
 if(kind==='expedition'){
  // Lv1: gilded turret finials, royal gate crest, glowing gate braziers
  arch+='<g data-upgrade-kind="expedition" data-upgrade-tier="'+tier+'">'
   +'<path fill="#2a211b" d="M125 26h6v10h-6zM98 86h6v10h-6zM222 66h6v10h-6z"/>'
   +'<path fill="#e8be59" d="M126 27h4v8h-4zM99 87h4v8h-4zM223 67h4v8h-4z"/>'
   +'<path fill="#fff1b8" d="M127 25h2v4h-2zM100 85h2v4h-2zM224 65h2v4h-2z"/>'
   +'<path fill="#2a211b" d="M160 156h16v14l-8 6-8-6z"/><path fill="#b8323c" d="M162 158h12v11l-6 4-6-4z"/><path fill="#f5d272" d="M166 160h4v9h-4zM164 163h8v3h-8z"/>';
  glow+='<ellipse cx="158" cy="222" rx="14" ry="18" fill="url(#tu-gold-glow)" opacity=".7"/><ellipse cx="224" cy="214" rx="14" ry="18" fill="url(#tu-gold-glow)" opacity=".7"/>';
  // Lv2: gold parapet trim, rich crimson-gold banners, crowned keep finial
  if(t2){
   arch+='<path fill="#2a211b" d="M90 116h80v6H90z"/><path fill="#d8ab49" d="M92 117h76v4H92z"/><path fill="#fff0b6" d="M94 117h12v2H94zM122 117h14v2h-14zM152 117h12v2h-12z"/>'
    +'<path fill="#2a211b" d="M132 174h14v28l-7-5-7 5zM192 166h14v28l-7-5-7 5z"/>'
    +'<path fill="#b72d38" d="M134 176h10v22l-5-4-5 4zM194 168h10v22l-5-4-5 4z"/>'
    +'<path fill="#f5cf67" d="M134 176h10v3h-10zM138 179h2v14h-2zM194 168h10v3h-10zM198 171h2v14h-2z"/>'
    +'<path fill="#2a211b" d="M126 6h4v22h-4zM130 8h28l-6 7 6 7h-28z"/><path fill="#c4303a" d="M130 10h24l-5 5 5 5h-24z"/><path fill="#f7d572" d="M130 10h24v2h-24zM130 18h24v2h-24zM134 13h6v4h-6z"/>';
  }
  // Lv3: radiant paladin star crown + delicate golden motes
  if(t3){
   arch+='<path fill="#2a211b" d="M126 1h4v10h-4zM122 4h12v4h-12z"/><path fill="#fff2b5" d="M127 2h2v8h-2zM123 5h10v2h-10z"/>';
   glow+='<circle class="tu-halo" cx="128" cy="14" r="26" fill="url(#tu-gold-glow)"/>'
    +'<rect class="tu-spark" x="98" y="64" width="3" height="3" fill="#fff2b8"/><rect class="tu-spark" x="224" y="48" width="3" height="3" fill="#fff2b8"/><rect class="tu-spark" x="168" y="142" width="3" height="3" fill="#ffe285"/>';
  }
  arch+='</g>';
 }else if(kind==='kitchen'){
  // Lv1: brass chimney cap + warm festoon string-lights along front eaves
  arch+='<g data-upgrade-kind="kitchen" data-upgrade-tier="'+tier+'">'
   +'<path fill="#2a211b" d="M482 120h26v9h-26zM486 115h18v6h-18z"/><path fill="#c98e3d" d="M484 122h22v5h-22z"/><path fill="#f5d276" d="M488 117h14v3h-14zM484 122h22v2h-22z"/>'
   +'<path fill="none" stroke="#2b211a" stroke-width="2" d="M366 205q52 22 108 30"/>'
   +'<rect x="378" y="211" width="4" height="4" fill="#ffe180"/><rect x="398" y="219" width="4" height="4" fill="#ffe180"/><rect x="420" y="226" width="4" height="4" fill="#ffe180"/><rect x="442" y="231" width="4" height="4" fill="#ffe180"/><rect x="462" y="234" width="4" height="4" fill="#ffe180"/>';
  glow+='<ellipse cx="420" cy="228" rx="48" ry="18" fill="url(#tu-gold-glow)" opacity=".55"/>';
  // Lv2: copper gourmet cupola + crimson-cream striped bistro porch awning + patio lanterns
  if(t2){
   arch+='<path fill="#1b171455" d="M430 128h32v6h-32z"/>'
    +'<path fill="#2a211b" d="M434 114h24v16h-24zM430 112l16-12 16 12v4h-32z"/><path fill="#9d5836" d="M436 115h20v13h-20z"/><path fill="#c77242" d="M434 112l12-9 12 9z"/>'
    +'<path fill="#f6d170" d="M442 118h8v8h-8zM445 96h2v6h-2z"/><path fill="#fff3c0" d="M444 120h4v4h-4z"/>'
    +'<path fill="#2a211b" d="M388 220h60l6 14h-72z"/><path fill="#b83838" d="M390 222h56l5 10h-66z"/>'
    +'<path fill="#f5e7c6" d="M398 222h8l-1 10h-8zM414 222h8v10h-8zM430 222h8l1 10h-8z"/>'
    +'<path fill="#2a211b" d="M384 282h6v10h-6zM462 310h6v10h-6z"/><rect x="385" y="284" width="4" height="5" fill="#ffe07c"/><rect x="463" y="312" width="4" height="5" fill="#ffe07c"/>';
   glow+='<ellipse cx="387" cy="286" rx="14" ry="14" fill="url(#tu-gold-glow)" opacity=".65"/><ellipse cx="465" cy="314" rx="14" ry="14" fill="url(#tu-gold-glow)" opacity=".65"/>';
  }
  // Lv3: 3-star gourmet gable medallion + warm hearth shimmer
  if(t3){
   arch+='<path fill="#2a211b" d="M405 156h24v10h-24z"/><path fill="#9c2c34" d="M407 158h20v6h-20z"/><path fill="#ffe892" d="M410 159h3v4h-3zM416 159h3v4h-3zM422 159h3v4h-3z"/>';
   glow+='<circle class="tu-halo" cx="446" cy="112" r="24" fill="url(#tu-gold-glow)"/>'
    +'<rect class="tu-spark" x="492" y="96" width="3" height="3" fill="#fff1b8"/><rect class="tu-spark" x="444" y="88" width="3" height="3" fill="#ffe285"/><rect class="tu-spark" x="418" y="146" width="3" height="3" fill="#fff2be"/>';
  }
  arch+='</g>';
 }else if(kind==='archive'){
  // Lv1: gilded roof ridge finials + stained-glass rose medallion on front gable
  arch+='<g data-upgrade-kind="archive" data-upgrade-tier="'+tier+'">'
   +'<path fill="#2a211b" d="M68 248h6v10h-6zM168 278h6v10h-6z"/><path fill="#e7be58" d="M69 249h4v8h-4zM169 279h4v8h-4z"/>'
   +'<path fill="#2a211b" d="M161 307h14v14h-14z"/><path fill="#38649b" d="M163 309h10v10h-10z"/><path fill="#f5d16e" d="M167 309h2v10h-2zM163 313h10v2h-10z"/><rect x="167" y="313" width="2" height="2" fill="#fff4c4"/>';
  glow+='<circle cx="168" cy="314" r="14" fill="url(#tu-blue-glow)" opacity=".55"/>';
  // Lv2: pixel-art Brass & Sapphire Celestial Observatory Dome on the burgundy roof ridge
  if(t2){
   arch+='<path fill="#1b171466" d="M90 274h58v6H90z"/>'
    +'<path fill="#2a211b" d="M94 264h50v12H94z"/><path fill="#8e6c45" d="M96 266h46v8H96z"/><path fill="#e7be5b" d="M94 264h50v3H94zM94 273h50v2H94z"/>'
    +'<path fill="#2a211b" d="M96 264c0-20 10-30 23-30s23 10 23 30z"/>'
    +'<path fill="#2f5686" d="M99 263c0-17 9-26 20-26s20 9 20 26z"/>'
    +'<path fill="#4c7db8" d="M103 261c1-13 7-20 15-21-5 5-8 12-8 21z"/>'
    +'<path fill="#e8be59" d="M118 236h2v28h-2zM108 242h2v22h-2zM128 242h2v22h-2zM98 254h42v2H98z"/>'
    +'<path fill="#2a211b" d="M132 238l16-10 4 6-16 10z"/><path fill="#e8bf5c" d="M133 240l14-9 2 3-14 9z"/><path fill="#fff2bb" d="M146 230l3-2 2 3-3 2z"/>'
    +'<path fill="#2a211b" d="M117 227h4v9h-4z"/><rect x="118" y="228" width="2" height="7" fill="#fff0b3"/>';
  }
  // Lv3: celestial astrolabe shimmer + starlight motes
  if(t3){
   arch+='<ellipse cx="119" cy="233" rx="18" ry="4" fill="none" stroke="#f7d87c" stroke-width="1.8" transform="rotate(-12 119 233)"/>';
   glow+='<circle class="tu-halo" cx="119" cy="242" r="28" fill="url(#tu-blue-glow)"/>'
    +'<rect class="tu-spark" x="94" y="226" width="3" height="3" fill="#fff2b8"/><rect class="tu-spark" x="148" y="220" width="3" height="3" fill="#b4e0ff"/><rect class="tu-spark" x="118" y="214" width="3" height="3" fill="#ffe68c"/>';
  }
  arch+='</g>';
 }else if(kind==='greenhouse'){
  // Lv1: gilded wrought-iron ridge cresting + emerald fairy lanterns at doorway
  arch+='<g data-upgrade-kind="greenhouse" data-upgrade-tier="'+tier+'">'
   +'<path fill="none" stroke="#243026" stroke-width="4" d="M68 468l116 52"/>'
   +'<path fill="none" stroke="#e8c362" stroke-width="2" d="M68 468l116 52"/>'
   +'<path fill="#243026" d="M65 460h6v8h-6zM181 512h6v8h-6z"/><path fill="#8af0be" d="M67 462h2v4h-2zM183 514h2v4h-2z"/>'
   +'<path fill="#243026" d="M144 558h6v8h-6zM180 572h6v8h-6z"/><rect x="145" y="560" width="4" height="4" fill="#8cf5c2"/><rect x="181" y="574" width="4" height="4" fill="#8cf5c2"/>';
  glow+='<circle cx="147" cy="562" r="12" fill="url(#tu-mana-glow)" opacity=".65"/><circle cx="183" cy="576" r="12" fill="url(#tu-mana-glow)" opacity=".65"/>';
  // Lv2: Victorian Glass-and-Gold Ridge Lantern Cupola seated cleanly on the roof spine
  if(t2){
   arch+='<path fill="#18241d55" d="M98 486l52 22-4 6-52-22z"/>'
    +'<path fill="#233028" d="M102 470h48v24h-48zM98 470l28-18 28 18v4H98z"/>'
    +'<path fill="#45aa7f" d="M105 473h42v19h-42z"/><path fill="#8deec0" d="M107 475h12v15h-12zM123 475h10v15h-10zM137 475h8v15h-8z"/>'
    +'<path fill="#66c99b" d="M104 470l22-14 22 14z"/>'
    +'<path fill="#edc662" d="M102 470h48v3h-48zM102 491h48v3h-48zM120 472h2v20h-2zM134 472h2v20h-2zM125 446h2v10h-2z"/>'
    +'<rect x="124" y="444" width="4" height="4" fill="#fff2b5"/>';
  }
  // Lv3: bioluminescent mana radiance + drifting firefly motes
  if(t3){
   glow+='<circle class="tu-halo" cx="126" cy="476" r="32" fill="url(#tu-mana-glow)"/>'
    +'<rect class="tu-spark" x="96" y="454" width="3" height="3" fill="#b4ffd8"/><rect class="tu-spark" x="156" y="462" width="3" height="3" fill="#ffe996"/><rect class="tu-spark" x="126" y="438" width="3" height="3" fill="#d9ffec"/>';
  }
  arch+='</g>';
 }else if(kind==='forge'){
  // Lv1: gilded slate-roof ridge ornaments + guild anvil crest above gable
  arch+='<g data-upgrade-kind="forge" data-upgrade-tier="'+tier+'">'
   +'<path fill="none" stroke="#241c18" stroke-width="4" d="M418 512l84-30"/>'
   +'<path fill="none" stroke="#e4b752" stroke-width="2" d="M418 512l84-30"/>'
   +'<path fill="#241c18" d="M405 530h18v14h-18z"/><path fill="#a92f34" d="M407 532h14v10h-14z"/><path fill="#f5ce66" d="M409 535h10v3h-10zM412 538h4v3h-4z"/>';
  glow+='<ellipse cx="526" cy="624" rx="22" ry="16" fill="url(#tu-ember-glow)" opacity=".55"/>';
  // Lv2: heavy iron & brass Dragon-Ember Chimney Crown + crimson smithy banner
  if(t2){
   arch+='<path fill="#1a151266" d="M498 484h44v5h-44z"/>'
    +'<path fill="#241c18" d="M500 462h40v24h-40zM496 476h48v8h-48z"/>'
    +'<path fill="#4b535e" d="M502 464h36v20h-36z"/><path fill="#6d7682" d="M504 466h10v16h-10z"/>'
    +'<path fill="#d8a746" d="M498 478h44v4h-44zM502 462h6v6h-6zM532 462h6v6h-6zM516 462h8v5h-8z"/>'
    +'<path fill="#ff6a26" d="M509 462c2-7 8-10 11-10s9 3 11 10z"/><path fill="#ffe37c" d="M514 462c1-4 4-6 6-6s5 2 6 6z"/>'
    +'<path fill="#241c18" d="M380 564h14v32l-7-5-7 5z"/><path fill="#b22c34" d="M382 566h10v26l-5-4-5 4z"/><path fill="#f5ce66" d="M382 566h10v3h-10zM385 573h4v6h-4z"/>';
  }
  // Lv3: molten dragonfire chimney radiance + rising ember sparks
  if(t3){
   glow+='<circle class="tu-halo" cx="520" cy="462" r="28" fill="url(#tu-ember-glow)"/>'
    +'<rect class="tu-spark" x="510" y="440" width="3" height="3" fill="#ffe47a"/><rect class="tu-spark" x="530" y="446" width="3" height="3" fill="#ff9840"/><rect class="tu-spark" x="520" y="430" width="3" height="3" fill="#fff0a8"/>';
  }
  arch+='</g>';
 }else if(kind==='decor'){
  // Lv1: pixel-art festival bunting pennants + brass corner lanterns
  arch+='<g data-upgrade-kind="decor" data-upgrade-tier="'+tier+'">'
   +'<path fill="none" stroke="#2a211b" stroke-width="2" d="M36 786q76 14 152-18"/>'
   +'<path fill="#d84b65" d="M48 788h8l-4 8z"/><path fill="#48b288" d="M74 791h8l-4 8z"/><path fill="#4c8bd4" d="M102 790h8l-4 8z"/><path fill="#f0c44d" d="M130 785h8l-4 8z"/><path fill="#d84b65" d="M158 776h8l-4 8z"/>'
   +'<path fill="#2a211b" d="M30 796h6v9h-6zM192 778h6v9h-6z"/><rect x="31" y="798" width="4" height="5" fill="#ffe180"/><rect x="193" y="780" width="4" height="5" fill="#ffe180"/>';
  glow+='<circle cx="33" cy="800" r="12" fill="url(#tu-gold-glow)" opacity=".6"/><circle cx="195" cy="782" r="12" fill="url(#tu-gold-glow)" opacity=".6"/>';
  // Lv2: Stained-Glass Artisan Dormer Arch seated cleanly on the patchwork roof ridge
  if(t2){
   arch+='<path fill="#1b171455" d="M84 722h52v6H84z"/>'
    +'<path fill="#2a211b" d="M86 704c0-14 11-22 24-22s24 8 24 22v20H86z"/>'
    +'<path fill="#5d426a" d="M89 704c0-11 9-18 21-18s21 7 21 18v17H89z"/>'
    +'<path fill="#e9bf5c" d="M84 720h52v4H84zM109 676h2v8h-2z"/>'
    +'<circle cx="110" cy="705" r="11" fill="#2a211b"/><circle cx="110" cy="705" r="9" fill="#e65c78"/>'
    +'<path fill="#57c89c" d="M110 696a9 9 0 0 1 9 9h-9z"/><path fill="#5e9ce8" d="M110 705h9a9 9 0 0 1-9 9z"/><path fill="#f5d266" d="M101 705a9 9 0 0 1 9-9v9z"/>'
    +'<path fill="#f5d266" d="M109 696h2v18h-2zM101 704h18v2h-18z"/>';
  }
  // Lv3: prismatic gallery glow + delicate rainbow-gold motes
  if(t3){
   glow+='<circle class="tu-halo" cx="110" cy="705" r="28" fill="url(#tu-gold-glow)"/>'
    +'<rect class="tu-spark" x="82" y="684" width="3" height="3" fill="#ffe580"/><rect class="tu-spark" x="138" y="682" width="3" height="3" fill="#8cf5cf"/><rect class="tu-spark" x="110" y="670" width="3" height="3" fill="#ff9eb8"/>';
  }
  arch+='</g>';
 }else if(kind==='training'){
  // Lv1: gilded roof finials + enhanced golden Star-Shield gable crest + twin stair pennants
  arch+='<g data-upgrade-kind="training" data-upgrade-tier="'+tier+'">'
   +'<path fill="#202833" d="M412 722h6v10h-6zM512 758h6v10h-6z"/><path fill="#e9bf5c" d="M413 723h4v8h-4zM513 759h4v8h-4z"/>'
   +'<path fill="#202833" d="M390 830h4v26h-4zM464 852h4v26h-4z"/><path fill="#38689e" d="M394 832h14l-4 5 4 5h-14zM468 854h14l-4 5 4 5h-14z"/><path fill="#f5d16b" d="M394 832h14v2h-14zM468 854h14v2h-14z"/>';
  glow+='<circle cx="428" cy="788" r="16" fill="url(#tu-gold-glow)" opacity=".5"/>';
  // Lv2: pixel-art Star-Shield Clock & Bell Tower Turret seated cleanly on the blue roof ridge
  if(t2){
   arch+='<path fill="#1b1f2666" d="M442 748h52v6h-52z"/>'
    +'<path fill="#202833" d="M448 714h40v36h-40z"/><path fill="#d8cbb0" d="M451 717h34v30h-34z"/><path fill="#b8aa8f" d="M475 717h10v30h-10z"/>'
    +'<path fill="#202833" d="M458 722h20v20h-20z"/><path fill="#1f3149" d="M460 724h16v18h-16z"/>'
    +'<path fill="#e8be56" d="M464 734c0-5 2-7 4-7s4 2 4 7h2v3h-12v-3z"/><rect x="467" y="737" width="2" height="3" fill="#fff2b5"/>'
    +'<path fill="#202833" d="M442 714l26-22 26 22v4h-52z"/><path fill="#315887" d="M446 714l22-18 22 18z"/><path fill="#4c7cb2" d="M449 712l19-15v15z"/>'
    +'<path fill="#e9bf5c" d="M446 713h44v3h-44zM467 682h2v10h-2z"/><path fill="#fff1b3" d="M465 680h6v4h-6z"/>';
  }
  // Lv3: starlight belfry halo + twinkling golden star motes
  if(t3){
   glow+='<circle class="tu-halo" cx="468" cy="712" r="30" fill="url(#tu-gold-glow)"/>'
    +'<rect class="tu-spark" x="442" y="692" width="3" height="3" fill="#fff2b8"/><rect class="tu-spark" x="494" y="694" width="3" height="3" fill="#ffe68a"/><rect class="tu-spark" x="467" y="672" width="3" height="3" fill="#fff6cc"/>';
  }
  arch+='</g>';
 }
 return {arch,glow};
}
function geminiTownUpgradesArt(){
 let archAll='',glowAll='',any=false;
 for(const b of GEMINI_TOWN_BUILDINGS){
  const tier=typeof buildingLandmarkTier==='function'?buildingLandmarkTier(b.kind):0;
  if(tier>0){
   any=true;
   const parts=townBuildingUpgradeParts(b.kind,tier);
   archAll+=parts.arch;
   glowAll+=parts.glow;
  }
 }
 if(!any)return '';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 572 1024" preserveAspectRatio="none" aria-hidden="true" shape-rendering="crispEdges">'
  +'<defs>'
  +'<radialGradient id="tu-gold-glow"><stop stop-color="#ffe99e" stop-opacity=".75"/><stop offset=".45" stop-color="#f6be52" stop-opacity=".28"/><stop offset="1" stop-color="#f6be52" stop-opacity="0"/></radialGradient>'
  +'<radialGradient id="tu-blue-glow"><stop stop-color="#a8dcff" stop-opacity=".72"/><stop offset=".45" stop-color="#4e8cd6" stop-opacity=".26"/><stop offset="1" stop-color="#4e8cd6" stop-opacity="0"/></radialGradient>'
  +'<radialGradient id="tu-mana-glow"><stop stop-color="#9effd2" stop-opacity=".72"/><stop offset=".45" stop-color="#47c48b" stop-opacity=".25"/><stop offset="1" stop-color="#47c48b" stop-opacity="0"/></radialGradient>'
  +'<radialGradient id="tu-ember-glow"><stop stop-color="#ffbe5c" stop-opacity=".78"/><stop offset=".45" stop-color="#f26724" stop-opacity=".3"/><stop offset="1" stop-color="#f26724" stop-opacity="0"/></radialGradient>'
  +'</defs>'
  +'<g class="tu-arch-layer">'+archAll+'</g>'
  +'<g class="tu-glow-layer" shape-rendering="auto">'+glowAll+'</g>'
  +'</svg>';
}
function geminiTownNightArt(){
 const windows=[[.445,.212,.020,.027],[.743,.255,.027,.028],[.829,.263,.022,.026],[.91,.252,.026,.025],[.883,.608,.028,.035],[.842,.632,.040,.028],[.434,.832,.018,.025],[.725,.827,.025,.025],[.868,.826,.032,.028],[.892,.87,.022,.020],[.265,.816,.035,.030],[.248,.345,.025,.033],[.287,.366,.023,.026]],lamps=[[.274,.242],[.385,.244],[.711,.31],[.581,.868],[.425,.919]];
 return '<svg viewBox="0 0 572 1024" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="geminiTownNightFilter" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="'+TOWN_NIGHT_COLOR_MATRIX+'"/></filter><radialGradient id="gemini-lamp"><stop stop-color="#ffdf9a" stop-opacity=".8"/><stop offset=".25" stop-color="#ffbe60" stop-opacity=".32"/><stop offset="1" stop-color="#f6af53" stop-opacity="0"/></radialGradient></defs><path fill="#cfe5ef" opacity=".7" d="M494 17h8v3h-5v6h-3z"/><path fill="#c9deea" opacity=".6" d="M344 13h2v2h-2zM390 24h2v2h-2zM452 9h2v2h-2zM537 36h2v2h-2z"/><g class="gemini-window-light">'+windows.map(([x,y,w,h])=>'<ellipse fill="url(#gemini-lamp)" cx="'+x*572+'" cy="'+y*1024+'" rx="'+w*850+'" ry="'+h*1300+'"/>').join('')+'</g>'+lamps.map(([x,y],i)=>'<ellipse class="gemini-lamp-light" style="animation-delay:-'+i+'s" fill="url(#gemini-lamp)" cx="'+x*572+'" cy="'+y*1024+'" rx="22" ry="37"/>').join('')+'</svg>';
}
function geminiTownEffects(){
 return '<div class="gemini-sea-shimmer" aria-hidden="true"></div><div class="gemini-town-upgrades" aria-hidden="true"></div><div class="gemini-night-lights">'+geminiTownNightArt()+'</div><div class="gemini-fountain-water" aria-hidden="true"><i></i><i></i><i></i></div><div class="gemini-chimney-smoke" aria-hidden="true"><i></i><i></i><i></i></div><i class="gemini-forge-fire" aria-hidden="true"></i>';
}
function renderGeminiTown(){
 if(!expandedGameEnabled())return;const si=townVisualSeason(),night=isSandboxNight(),p=$('townP'),image=$('geminiTownImage');p.dataset.geminiTown='true';
 const key=String(si);if(image.dataset.art!==key){image.src=GEMINI_TOWN_ART[si];image.dataset.art=key;image.alt=SEASONS[si].name+'鍛造小鎮';}
 $('geminiTownScene').dataset.season=SEASONS[si].id;$('geminiTownScene').dataset.time=night?'night':'day';
 const rear=$('townDecorBack');if(!rear.dataset.geminiMask){const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="none"><rect width="1000" height="1000" fill="white"/>'+GEMINI_TOWN_BUILDINGS.map(b=>'<rect x="'+b.box[0]*1000+'" y="'+b.box[1]*1000+'" width="'+b.box[2]*1000+'" height="'+b.box[3]*1000+'" fill="black"/>').join('')+'</svg>';rear.style.maskImage='url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';rear.style.maskSize='100% 100%';rear.style.maskMode='luminance';rear.dataset.geminiMask='true';}
 if(!$('geminiTownEffects').dataset.built){$('geminiTownEffects').innerHTML=geminiTownEffects();$('geminiTownEffects').dataset.built='1';}
 const tierSig=GEMINI_TOWN_BUILDINGS.map(b=>typeof buildingLandmarkTier==='function'?buildingLandmarkTier(b.kind):0).join(',');
 const upLayer=$('geminiTownEffects').querySelector?.('.gemini-town-upgrades');
 if(upLayer&&upLayer.dataset.tierSig!==tierSig){upLayer.dataset.tierSig=tierSig;upLayer.innerHTML=geminiTownUpgradesArt();}
 GEMINI_TOWN_BUILDINGS.forEach(b=>{const el=$(b.id),[x,y,w,h]=b.box,tier=typeof buildingLandmarkTier==='function'?buildingLandmarkTier(b.kind):0,tierKey=String(tier);
  el.style.left=x*100+'%';el.style.top=y*100+'%';el.style.width=w*100+'%';el.style.height=h*100+'%';el.setAttribute('aria-label',b.label+(tier?'（建築階級 Lv '+tier+'）':''));el.title=b.name+(tier?' · Lv '+tier:'');el.dataset.landmarkTier=tierKey;
  const [sx,sy,sw,sh]=b.sign,signEl=el.querySelector?.('.gemini-building-sign');
  if(!signEl){el.innerHTML+='<span class="gemini-building-sign" data-gemini-sign="true" data-sign-tier="'+tierKey+'" style="left:'+sx*100+'%;top:'+sy*100+'%;width:'+sw*100+'%;height:'+sh*100+'%;--sign-angle:'+b.angle+'deg">'+geminiTownSignArt(b.kind,b.name,tier)+'</span>';}
  else if(signEl.dataset.signTier!==tierKey){signEl.dataset.signTier=tierKey;signEl.innerHTML=geminiTownSignArt(b.kind,b.name,tier);}
 });
}
function clearGeminiTown(){
 $('townP').dataset.geminiTown='false';geminiSnapshotAssets.clear();const rear=$('townDecorBack');rear.style.maskImage='';rear.dataset.geminiMask='';GEMINI_TOWN_BUILDINGS.forEach(b=>{const el=$(b.id);for(const key of ['left','top','width','height'])el.style[key]='';el.title='';el.dataset.landmarkTier='0';});
}
function geminiTownGuestPoint(i,night){
 // Coordinates mark the visitor's feet, aligned with the painted doorstep/paths.
 const line=night?[[263,199],[250,209],[237,220],[226,233],[217,247],[215,263],[229,279],[241,294]]:[[263,402],[248,406],[233,411],[218,418],[204,428],[192,441],[184,456],[181,472]];
 return line[i]||[177,Math.min(600,514+(i-line.length)*18)];
}
function geminiTownGuestRoute(i,night){const line=Array.from({length:Math.max(8,i+1)},(_,j)=>geminiTownGuestPoint(j,night));return [[177,650],[177,500],...(night?[[177,362],[218,335],[235,313]]:[]),...line.slice(i).reverse()];}
function townBackgroundFountainBlocked(x,y){return expandedGameEnabled()&&((x-180)/44)**2+((y-293)/36)**2<=1;}
function geminiTownSnapshot(items,si,savedHeight){
 const rect=$('townMap').getBoundingClientRect(),H=Number.isFinite(savedHeight)&&savedHeight>=360&&savedHeight<=1000?savedHeight:rect.width>100&&rect.height>200?Math.max(360,Math.min(1000,360*rect.height/rect.width)):620,night=isSandboxNight();
 let out='<image href="'+(geminiSnapshotAssets.get(si)||GEMINI_TOWN_ART[si])+'" width="360" height="'+H+'" preserveAspectRatio="none"'+(night?' filter="url(#gemini-snapshot-night)"':'')+'/>';
 const upArt=geminiTownUpgradesArt();
 if(upArt)out+=snapshotNestedSVG(upArt,0,0,360,H);
 const decor=z=>items.filter(i=>i.z===z).slice().sort((a,b)=>a.y-b.y).map((i,k)=>{const d=DECOR_BY_ID.get(i.id);return !d?'':'<g transform="translate('+i.x*3.6+' '+i.y*H/100+') rotate('+i.r+') scale('+(i.fx?-i.s:i.s)+' '+(i.fy?-i.s:i.s)+')">'+snapshotNestedSVG(kitchenSnapshotDecorSVG(decorSVG(i.id,si,'gemini-snapshot-'+z+'-'+k),d),-d.w/2,-d.h,d.w,d.h)+'</g>';}).join('');
 out+='<g mask="url(#gemini-snapshot-buildings)">'+decor(0)+'</g>';
 for(const b of GEMINI_TOWN_BUILDINGS){const [x,y,w,h]=b.box,[sx,sy,sw,sh]=b.sign,tier=typeof buildingLandmarkTier==='function'?buildingLandmarkTier(b.kind):0;out+=snapshotNestedSVG(geminiTownSignArt(b.kind,b.name,tier),(x+w*sx)*360,(y+h*sy)*H,w*sw*360,h*sh*H);}
 if(night)out+=snapshotNestedSVG(geminiTownNightArt(),0,0,360,H);out+=decor(1);
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 '+H+'" width="360" height="'+H+'"><defs><filter id="gemini-snapshot-night" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="'+TOWN_NIGHT_COLOR_MATRIX+'"/></filter><mask id="gemini-snapshot-buildings" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="white"/>'+GEMINI_TOWN_BUILDINGS.map(b=>'<rect x="'+b.box[0]+'" y="'+b.box[1]+'" width="'+b.box[2]+'" height="'+b.box[3]+'" fill="black"/>').join('')+'</mask></defs>'+out+'</svg>';
}
const geminiSnapshotAssets=new Map(),geminiSnapshotRequests=new Map();
async function prepareGeminiSnapshot(si){
 if(GEMINI_TOWN_ART[si].startsWith('data:')||geminiSnapshotAssets.has(si))return;
 if(geminiSnapshotRequests.has(si))return geminiSnapshotRequests.get(si);
 const epoch=sandboxEpoch,job=(async()=>{const response=await fetch(GEMINI_TOWN_ART[si]);if(!response.ok)throw new Error('Town background unavailable');const blob=await response.blob(),data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Town image unreadable'));reader.readAsDataURL(blob);});if(expandedGameEnabled()&&epoch===sandboxEpoch)geminiSnapshotAssets.set(si,data);})();
 geminiSnapshotRequests.set(si,job);try{await job;}finally{geminiSnapshotRequests.delete(si);}
}
