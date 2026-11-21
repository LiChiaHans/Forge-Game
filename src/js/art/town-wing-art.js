/* ==========================================================================
   Bespoke Pixel-Art SVGs for West & East Town Wings:
   - 16 Unique Seasonal/Day-Night Pixel Fish (24x24)
   - 12 Unique Ancient Relic Pixel Artifacts (24x24)
   - 6 Thematic Illustrated Scene Headers (320x96) for all Wing Modals
   ========================================================================== */

const PIXEL_FISH_SPECS={
 spring_trout:{shape:'trout',c1:'#4b9c8e',c2:'#7ed4be',c3:'#e6f9f0',fin:'#347068',acc:'#f5a87a'},
 sakura_carp:{shape:'koi',c1:'#f28ea8',c2:'#ffc9d8',c3:'#fff6f8',fin:'#d95d7e',acc:'#ffe37d'},
 spring_eel:{shape:'eel',c1:'#385a8f',c2:'#6799db',c3:'#c7e6ff',fin:'#263d66',acc:'#fff08a'},
 moon_koi:{shape:'koi',c1:'#7566c9',c2:'#b4a7ff',c3:'#f4f0ff',fin:'#4c3f99',acc:'#ffe87c',glow:1},
 sun_perch:{shape:'perch',c1:'#e87b43',c2:'#ffb469',c3:'#fff1cf',fin:'#b54a24',acc:'#5ce0d0'},
 summer_crab:{shape:'crab',c1:'#d4522a',c2:'#f59a3d',c3:'#ffe28a',fin:'#8f2c14',acc:'#fff4b8'},
 tide_squid:{shape:'squid',c1:'#4d46a8',c2:'#867ce8',c3:'#d8d4ff',fin:'#2d2770',acc:'#6fffe8'},
 sun_marlin:{shape:'marlin',c1:'#1d6fa3',c2:'#4cb8e8',c3:'#d6f7ff',fin:'#12476b',acc:'#ffd95c',glow:1},
 maple_salmon:{shape:'trout',c1:'#c94c2c',c2:'#f0824a',c3:'#ffdcc2',fin:'#8a2c16',acc:'#ffe074'},
 amber_catfish:{shape:'catfish',c1:'#8f5722',c2:'#cc8739',c3:'#f5cf82',fin:'#5c3512',acc:'#ffe999'},
 harvest_shrimp:{shape:'shrimp',c1:'#d46b24',c2:'#f5a742',c3:'#ffe69c',fin:'#944110',acc:'#fff7cc'},
 golden_sturgeon:{shape:'sturgeon',c1:'#b87e1a',c2:'#f2be3d',c3:'#fff1a8',fin:'#7a4f0a',acc:'#ffffff',glow:1},
 frost_smelt:{shape:'trout',c1:'#6fa8cc',c2:'#a8daf2',c3:'#f0fbff',fin:'#447494',acc:'#d9f8ff'},
 snow_pike:{shape:'marlin',c1:'#5d89ab',c2:'#9bc4e0',c3:'#eaf7ff',fin:'#3b5e7a',acc:'#9ef7ff'},
 crystal_jelly:{shape:'jelly',c1:'#5d78d6',c2:'#9eb8ff',c3:'#e6f2ff',fin:'#3c4f99',acc:'#8effec'},
 aurora_dragonfish:{shape:'dragon',c1:'#338c99',c2:'#6be6d6',c3:'#e0fffb',fin:'#8d63d4',acc:'#ffe97a',glow:1}
};

function pixelFishArt(id,locked=false){
 const s=PIXEL_FISH_SPECS[id]||PIXEL_FISH_SPECS.spring_trout;
 let body='';
 if(s.shape==='crab'){
  body=`<path fill="#1b1512" d="M3 7h4v3h2V8h6v2h2V7h4v5h-2v2h2v3h-2v2h-2v-2h-2v2H9v-2H7v2H5v-2H3v-3h2v-2H3z"/>`
   +`<path fill="${s.c1}" d="M4 8h2v3h2v-1h8v1h2V8h2v3h-2v2h2v3h-2v1h-2v-1H8v1H6v-1H4v-3h2v-2H4z"/>`
   +`<rect x="7" y="10" width="10" height="5" fill="${s.c2}"/><rect x="8" y="11" width="8" height="2" fill="${s.c3}"/>`
   +`<rect x="4" y="8" width="2" height="2" fill="${s.acc}"/><rect x="18" y="8" width="2" height="2" fill="${s.acc}"/>`
   +`<rect x="9" y="9" width="1.5" height="1.5" fill="#1b1512"/><rect x="13.5" y="9" width="1.5" height="1.5" fill="#1b1512"/>`;
 }else if(s.shape==='squid'){
  body=`<path fill="#1b1512" d="M9 3h6v2h2v7h-1v3h2v4h-2v-2h-1v4h-2v-4h-2v4H9v-4H8v2H6v-4h2v-3H7V5h2z"/>`
   +`<path fill="${s.c1}" d="M10 4h4v2h2v6h-2v3h2v3h-1v-2h-1v4h-1v-4h-2v4h-1v-4H9v2H8v-3h2v-3H8V6h2z"/>`
   +`<rect x="10" y="5" width="4" height="5" fill="${s.c2}"/><rect x="11" y="6" width="2" height="2" fill="${s.c3}"/>`
   +`<rect x="9" y="11" width="2" height="2" fill="${s.acc}"/><rect x="13" y="11" width="2" height="2" fill="${s.acc}"/>`
   +`<rect x="10" y="11" width="1" height="1" fill="#1b1512"/><rect x="13" y="11" width="1" height="1" fill="#1b1512"/>`;
 }else if(s.shape==='jelly'){
  body=`<path fill="#1b1512" d="M7 4h10v2h2v6h-2v2h1v6h-2v-5h-2v6h-2v-6h-2v6H8v-6H6v5H5v-6h2v-2H5V6h2z"/>`
   +`<path fill="${s.c1}" d="M8 5h8v2h2v4H6V7h2z"/><rect x="8" y="6" width="8" height="4" fill="${s.c2}"/>`
   +`<rect x="9" y="6" width="4" height="2" fill="${s.c3}"/>`
   +`<path fill="${s.acc}" d="M7 12h1v6H7zm3 0h1v7h-1zm3 0h1v7h-1zm3 0h1v6h-1z"/>`;
 }else if(s.shape==='eel'||s.shape==='dragon'){
  body=`<path fill="#1b1512" d="M3 13h3v-3h3V7h5v3h3v3h4v3h-3v2h-5v-3h-3v-3H8v3H4v2H2v-3z"/>`
   +`<path fill="${s.c1}" d="M4 14h3v-3h3V8h3v3h3v3h4v2h-3v1h-3v-3h-3v-3H7v3H4z"/>`
   +`<path fill="${s.c2}" d="M10 9h3v2h3v3h3v1h-4v-3h-3V9z"/><rect x="15" y="12" width="3" height="2" fill="${s.c3}"/>`
   +`<rect x="17" y="12" width="1.5" height="1.5" fill="#1b1512"/><rect x="11" y="7" width="2" height="2" fill="${s.acc}"/>`
   +(s.shape==='dragon'?`<path fill="${s.fin}" d="M18 10h2v2h-2zM13 6h2v2h-2zM7 8h2v2H7z"/>`:`<rect x="8" y="10" width="2" height="1.5" fill="${s.acc}"/>`);
 }else if(s.shape==='shrimp'){
  body=`<path fill="#1b1512" d="M7 5h6v2h3v3h2v5h-3v3h-4v-2h-2v-3h3v-2h-1V9H8v2H5V7h2z"/>`
   +`<path fill="${s.c1}" d="M8 6h4v2h3v3h2v3h-3v3h-2v-2h2v-2h-1v-2h-2V9H8V8H6V7h2z"/>`
   +`<path fill="${s.c2}" d="M9 7h3v2h3v3h-2v-2h-2V8H9z"/><rect x="10" y="7" width="2" height="1.5" fill="${s.c3}"/>`
   +`<rect x="6" y="7" width="1.5" height="1.5" fill="#1b1512"/><path fill="${s.acc}" d="M4 6h2v1H4zM3 8h2v1H3z"/>`;
 }else if(s.shape==='marlin'){
  body=`<path fill="#1b1512" d="M2 12h4v-2h3V6h4v3h5v2h4v2h-4v2h-5v2H9v-2H6v2H3v-3H2z"/>`
   +`<path fill="${s.c1}" d="M3 12h4v-1h3V9h8v2h3v1h-3v2h-8v-1H7v1H4z"/>`
   +`<path fill="${s.fin}" d="M10 7h3v3h-3zM4 9h2v2H4zM4 14h2v2H4z"/>`
   +`<rect x="9" y="10" width="8" height="2" fill="${s.c2}"/><rect x="10" y="12" width="6" height="1.5" fill="${s.c3}"/>`
   +`<rect x="17" y="10.5" width="1.5" height="1.5" fill="#1b1512"/><rect x="18" y="11" width="4" height="1" fill="${s.acc}"/>`;
 }else if(s.shape==='sturgeon'||s.shape==='catfish'){
  body=`<path fill="#1b1512" d="M2 10h3v2h2V9h4V7h4v2h4v2h2v3h-3v2h-9v-1H6v2H3v-3H2z"/>`
   +`<path fill="${s.c1}" d="M3 11h2v2h2v-3h10v2h3v2h-3v1H7v-1H5v1H3z"/>`
   +`<rect x="8" y="10" width="9" height="3" fill="${s.c2}"/><rect x="9" y="12" width="7" height="2" fill="${s.c3}"/>`
   +`<path fill="${s.acc}" d="M11 8h2v2h-2zm3 0h2v2h-2zM18 14h3v1h-3z"/>`
   +`<rect x="16" y="11" width="1.5" height="1.5" fill="#1b1512"/>`;
 }else{
  // trout / koi / perch classic plump Stardew pixel fish
  body=`<path fill="#1b1512" d="M3 8h3v2h2V8h3V6h4v2h3v2h2v4h-2v2h-3v2h-4v-2H8v-2H6v2H3v-3h1v-2H3z"/>`
   +`<path fill="${s.fin}" d="M4 9h2v2H4zM4 13h2v2H4zM11 7h3v2h-3zM11 15h3v2h-3z"/>`
   +`<path fill="${s.c1}" d="M7 10h2V9h8v2h2v2h-2v2H9v-1H7z"/>`
   +`<rect x="9" y="10" width="8" height="3" fill="${s.c2}"/><rect x="10" y="12" width="6" height="2" fill="${s.c3}"/>`
   +`<rect x="11" y="10" width="2" height="2" fill="${s.acc}"/><rect x="14" y="11" width="1.5" height="1.5" fill="${s.acc}"/>`
   +`<rect x="16.5" y="10.5" width="1.5" height="1.5" fill="#1b1512"/>`;
 }
 const aura=s.glow&&!locked?`<circle cx="12" cy="12" r="10" fill="${s.acc}" opacity=".22"/><rect x="4" y="4" width="1.5" height="1.5" fill="${s.acc}"/><rect x="19" y="5" width="1.5" height="1.5" fill="#fff"/>`:'';
 const cls=locked?'px-art is-locked':'px-art';
 return `<svg class="${cls}" viewBox="0 0 24 24" shape-rendering="crispEdges" aria-hidden="true">${aura}${body}</svg>`;
}

function pixelRelicArt(id,locked=false){
 let body='';
 switch(id){
  case 'old_tongs':
   body=`<path fill="#1b1512" d="M6 4h3v4h2v2h2V8h2V4h3v5h-2v3h-2v2l3 5h-3l-2-4-2 4H7l3-5v-2H8V9H6z"/>`
    +`<path fill="#8c6239" d="M7 5h1v4h2v3h4V9h2V5h1v4h-2v3h-2v2l2.5 4h-1.5L12 14l-2 4H8.5L11 14v-2H9V9H7z"/>`
    +`<rect x="10" y="10" width="4" height="2" fill="#d9a86c"/><rect x="11" y="10" width="2" height="1" fill="#ffe6b3"/>`;
   break;
  case 'clay_pot':
   body=`<path fill="#1b1512" d="M8 4h8v3h-1v2h3v3h1v6h-2v2H7v-2H5v-6h1V9h3V7H8z"/>`
    +`<path fill="#b8603a" d="M9 5h6v1h-2v3h4v2h1v6h-2v2H8v-2H6v-6h1V9h4V6H9z"/>`
    +`<rect x="7" y="11" width="10" height="3" fill="#e6b065"/><path fill="#523024" d="M8 12h2v1H8zm4 0h2v1h-2zm3 0h1v1h-1z"/>`
    +`<rect x="8" y="10" width="3" height="1" fill="#ffd9a0"/>`;
   break;
  case 'bronze_coin':
   body=`<path fill="#1b1512" d="M7 4h10v2h2v2h1v8h-1v2h-2v2H7v-2H5v-2H4V8h1V6h2z"/>`
    +`<path fill="#8fa0b0" d="M8 5h8v2h2v2h1v6h-1v2h-2v2H8v-2H6v-2H5V9h1V7h2z"/>`
    +`<rect x="7" y="7" width="10" height="10" fill="#c7d8e6"/><path fill="#ffe27a" d="M11 8h2v2h2v2h-2v3h-2v-3H9v-2h2z"/>`
    +`<rect x="8" y="7" width="3" height="1" fill="#ffffff"/>`;
   break;
  case 'ember_fossil':
   body=`<path fill="#1b1512" d="M6 5h10v2h3v4h1v5h-2v3H6v-2H4v-5h1V7h1z"/>`
    +`<path fill="#574e4a" d="M7 6h8v2h3v3h1v4h-2v3H7v-2H5v-4h1V8h1z"/>`
    +`<path fill="#e8682c" d="M9 9h6v6H9z"/><path fill="#ffc94d" d="M10 10h4v4h-4z"/><rect x="11" y="11" width="2" height="2" fill="#fff7b2"/>`;
   break;
  case 'spice_mortar':
   body=`<path fill="#1b1512" d="M14 4h4v3h-2v3h3v4h-1v4h-2v2H8v-2H6v-4H5v-4h7V7h2z"/>`
    +`<path fill="#948e87" d="M6 11h12v3h-1v3h-2v2H9v-2H7v-3H6z"/><rect x="7" y="12" width="10" height="2" fill="#c7c1ba"/>`
    +`<path fill="#b8844c" d="M14 5h3v2h-2v4h-2V7h1z"/><path fill="#5dc96e" d="M8 10h3v1H8z"/><rect x="11" y="9" width="2" height="2" fill="#f06848"/>`;
   break;
  case 'rune_tablet':
   body=`<path fill="#1b1512" d="M6 3h11v2h2v15h-2v1H6v-2H5V5h1z"/>`
    +`<path fill="#5e6d7a" d="M7 4h9v2h2v13H6V5h1z"/><rect x="7" y="5" width="9" height="13" fill="#7c8f9e"/>`
    +`<path fill="#6ef7d2" d="M9 7h6v1H9zm2 2h2v6h-2zm-2 3h6v1H9zm1 4h4v1h-4z"/>`;
   break;
  case 'star_compass':
   body=`<path fill="#1b1512" d="M9 3h6v2h3v3h2v8h-2v3h-3v2H9v-2H6v-3H4V8h2V5h3z"/>`
    +`<path fill="#d49c37" d="M10 4h4v2h3v3h2v6h-2v3h-3v2h-4v-2H7v-3H5V9h2V6h3z"/>`
    +`<rect x="7" y="7" width="10" height="10" fill="#1d3547"/><path fill="#ff6659" d="M11 7h2v5h-2z"/><path fill="#d9f2ff" d="M11 12h2v5h-2z"/>`
    +`<rect x="11" y="11" width="2" height="2" fill="#ffe680"/>`;
   break;
  case 'crystal_lens':
   body=`<path fill="#1b1512" d="M8 4h8v2h2v2h1v6h-1v2h-2v2H8v-2H6v-2H5V8h1V6h2z"/>`
    +`<path fill="#6e57b8" d="M9 5h6v2h2v2h1v4h-1v2h-2v2H9v-2H7v-2H6V9h1V7h2z"/>`
    +`<rect x="8" y="7" width="8" height="8" fill="#a894ff"/><rect x="9" y="8" width="4" height="4" fill="#e6e0ff"/><rect x="10" y="8" width="2" height="2" fill="#fff"/>`;
   break;
  case 'dwarf_hammer':
   body=`<path fill="#1b1512" d="M5 4h14v7h-5v9h-4v-9H5z"/>`
    +`<rect x="6" y="5" width="12" height="5" fill="#7ec2e6"/><rect x="7" y="6" width="10" height="2" fill="#d6f4ff"/>`
    +`<rect x="11" y="10" width="2" height="9" fill="#9c6334"/><rect x="10" y="17" width="4" height="2" fill="#f0c44d"/>`
    +`<rect x="11" y="6" width="2" height="3" fill="#ffe47a"/>`;
   break;
  case 'royal_cookbook':
   body=`<path fill="#1b1512" d="M5 4h13v2h1v14H6v-1H5z"/>`
    +`<rect x="6" y="5" width="11" height="13" fill="#9e2a38"/><rect x="7" y="6" width="9" height="11" fill="#c73c4c"/>`
    +`<rect x="6" y="17" width="12" height="2" fill="#f7eed2"/><path fill="#f5cf62" d="M9 8h6v1H9zm1 2h4v4h-4zm-2-5h1v12H8z"/>`;
   break;
  case 'dragon_scale':
   body=`<path fill="#1b1512" d="M9 3h6v2h3v4h1v6h-2v3h-3v2h-4v-2H7v-3H5V9h1V5h3z"/>`
    +`<path fill="#b82924" d="M10 4h4v2h3v4h1v4h-2v3h-3v2h-2v-2H8v-3H6v-4h1V6h3z"/>`
    +`<path fill="#f26730" d="M9 7h6v8H9z"/><path fill="#ffd154" d="M10 9h4v4h-4z"/><rect x="11" y="10" width="2" height="2" fill="#fff8c4"/>`;
   break;
  default: // crown_seal
   body=`<path fill="#1b1512" d="M4 7h3v3h2V6h2V4h2v2h2v4h2V7h3v10h-2v2H6v-2H4z"/>`
    +`<path fill="#e3aa29" d="M5 8h2v4h3V7h1V5h2v2h1v5h3V8h2v8H5z"/>`
    +`<rect x="6" y="13" width="12" height="3" fill="#ffe27a"/><rect x="7" y="16" width="10" height="2" fill="#b87616"/>`
    +`<rect x="11" y="13" width="2" height="2" fill="#ff4d6d"/><rect x="7" y="13" width="2" height="2" fill="#52e5ff"/><rect x="15" y="13" width="2" height="2" fill="#6effb8"/>`;
 }
 const cls=locked?'px-art is-locked':'px-art';
 return `<svg class="${cls}" viewBox="0 0 24 24" shape-rendering="crispEdges" aria-hidden="true">${body}</svg>`;
}

function wingModalSceneArt(mode,night=false){
 let bg='';
 if(mode==='fishing'){
  const sky=night?'#13223b':'#5ea6d6',sky2=night?'#1e3a5f':'#9ad4eb',water=night?'#183f5e':'#2b7ea6',foam='#d8ffff';
  bg=`<rect width="320" height="96" fill="${sky}"/><rect y="28" width="320" height="24" fill="${sky2}"/>`
   +(night?`<circle cx="268" cy="18" r="9" fill="#fff4bd"/><rect x="42" y="12" width="2" height="2" fill="#fff"/><rect x="128" y="8" width="2" height="2" fill="#fff"/><rect x="210" y="16" width="2" height="2" fill="#fff"/>`:`<circle cx="268" cy="18" r="10" fill="#ffe98c"/>`)
   +`<path fill="${night?'#1f3a36':'#3d7849'}" d="M0 44h110v16H0zm180 4h140v12H180z"/>`
   +`<rect x="110" y="34" width="70" height="26" fill="${night?'#304252':'#6c7e8c'}"/>`
   +`<rect x="124" y="34" width="42" height="28" fill="#63d1f0"/><rect x="132" y="34" width="8" height="28" fill="${foam}" opacity=".8"/><rect x="150" y="34" width="6" height="28" fill="${foam}" opacity=".7"/>`
   +`<rect y="58" width="320" height="38" fill="${water}"/><ellipse cx="145" cy="64" rx="30" ry="6" fill="${foam}" opacity=".65"/>`
   +`<rect x="0" y="72" width="112" height="10" fill="#6b4426"/><rect x="0" y="70" width="112" height="3" fill="#9c683d"/>`
   +`<rect x="96" y="48" width="6" height="28" fill="#4f311b"/><rect x="93" y="44" width="12" height="9" fill="#ffe17d"/><circle cx="99" cy="48" r="16" fill="#ffe17d" opacity=".2"/>`
   +`<path fill="#7ee8ff" opacity=".45" d="M180 74h34v2h-34zm52 8h28v2h-28zm-92 6h40v2h-40z"/>`;
 }else if(mode==='excavate'){
  const sky=night?'#192036':'#6d8fa8';
  bg=`<rect width="320" height="96" fill="${sky}"/><path fill="${night?'#23332c':'#4a6e4c'}" d="M0 40h320v20H0z"/>`
   +`<rect y="58" width="320" height="38" fill="#593f2a"/><rect y="74" width="320" height="22" fill="#422d1e"/>`
   +`<rect x="34" y="22" width="22" height="40" fill="#7c8791"/><rect x="30" y="18" width="30" height="6" fill="#9eaab5"/><rect x="41" y="32" width="8" height="18" fill="#6ef7d2" opacity=".8"/>`
   +`<rect x="256" y="28" width="20" height="34" fill="#6d7882"/><rect x="252" y="24" width="28" height="6" fill="#8f9ba6"/><rect x="262" y="38" width="8" height="12" fill="#6ef7d2" opacity=".7"/>`
   +`<path fill="#c48a47" d="M114 58l28-28 28 28z"/><path fill="#e3af68" d="M126 58l16-24 16 24z"/><rect x="137" y="44" width="10" height="14" fill="#2b1e16"/>`
   +`<circle cx="142" cy="50" r="14" fill="#ffdf80" opacity=".22"/><path fill="#d4b27c" opacity=".5" d="M68 68h22v4H68zm142 8h26v4h-26zm-96 6h18v4h-18z"/>`;
 }else if(mode==='museum'){
  bg=`<rect width="320" height="96" fill="#2c221b"/><rect y="64" width="320" height="32" fill="#4f3622"/><rect y="62" width="320" height="3" fill="#cfa557"/>`
   +`<rect x="120" y="8" width="80" height="38" fill="#1e3c4c" stroke="#cfa557" stroke-width="2"/><path fill="#88e5ff" opacity=".25" d="M122 10h76v34h-76z"/><rect x="158" y="8" width="4" height="38" fill="#cfa557"/>`
   +`<rect x="28" y="32" width="52" height="44" fill="#3a281d" stroke="#b88c44" stroke-width="2"/><rect x="34" y="38" width="40" height="24" fill="#1c353d"/><rect x="44" y="44" width="20" height="12" fill="#7be8d0" opacity=".75"/>`
   +`<rect x="240" y="32" width="52" height="44" fill="#3a281d" stroke="#b88c44" stroke-width="2"/><rect x="246" y="38" width="40" height="24" fill="#2b1f2e"/><rect x="256" y="44" width="20" height="12" fill="#ffe17d" opacity=".8"/>`
   +`<circle cx="54" cy="24" r="14" fill="#ffe694" opacity=".2"/><circle cx="266" cy="24" r="14" fill="#ffe694" opacity=".2"/>`;
 }else if(mode==='caravan'){
  const sky=night?'#1a223b':'#5e8ec4';
  bg=`<rect width="320" height="96" fill="${sky}"/><rect y="58" width="320" height="38" fill="#8a6c49"/><rect y="74" width="320" height="22" fill="#6b5134"/>`
   +`<rect x="46" y="28" width="228" height="42" fill="#523320" stroke="#e6be67" stroke-width="2"/>`
   +`<path fill="#c93c46" d="M36 16h32v18H36zm64 0h32v18h-32zm64 0h32v18h-32zm64 0h32v18h-32z"/>`
   +`<path fill="#f5e7c4" d="M68 16h32v18H68zm64 0h32v18h-32zm64 0h32v18h-32zm64 0h24v18h-24z"/>`
   +`<circle cx="72" cy="72" r="13" fill="#3a2415" stroke="#d49e4c" stroke-width="3"/><circle cx="248" cy="72" r="13" fill="#3a2415" stroke="#d49e4c" stroke-width="3"/>`
   +`<rect x="96" y="42" width="28" height="20" fill="#e69d3e"/><rect x="136" y="46" width="32" height="16" fill="#46a87c"/><rect x="180" y="40" width="34" height="22" fill="#9c56c7"/>`
   +`<circle cx="110" cy="36" r="12" fill="#ffe484" opacity=".24"/><circle cx="206" cy="36" r="12" fill="#ffe484" opacity=".24"/>`;
 }else if(mode==='tavern'){
  bg=`<rect width="320" height="96" fill="#2b1b14"/><rect y="60" width="320" height="36" fill="#4d2f1c"/><rect y="58" width="320" height="4" fill="#b87e3c"/>`
   +`<rect x="122" y="16" width="76" height="44" fill="#524640" stroke="#241914" stroke-width="2"/><rect x="136" y="30" width="48" height="30" fill="#1c110c"/>`
   +`<path fill="#f06824" d="M144 58c0-14 8-22 16-24 8 2 16 10 16 24z"/><path fill="#ffcf4d" d="M150 58c0-9 5-14 10-16 5 2 10 7 10 16z"/>`
   +`<circle cx="160" cy="46" r="34" fill="#ffae42" opacity=".18"/>`
   +`<rect x="24" y="22" width="74" height="6" fill="#6b4226"/><rect x="32" y="12" width="10" height="10" fill="#d99a38"/><rect x="48" y="10" width="10" height="12" fill="#4d9e6b"/><rect x="64" y="13" width="10" height="9" fill="#c94b4b"/>`
   +`<rect x="222" y="22" width="74" height="6" fill="#6b4226"/><rect x="234" y="11" width="12" height="11" fill="#e6b84c"/><rect x="256" y="12" width="10" height="10" fill="#d97236"/>`;
 }else{ // depot
  const sky=night?'#14243b':'#5fa4d6';
  bg=`<rect width="320" height="96" fill="${sky}"/><rect y="56" width="320" height="40" fill="${night?'#163752':'#286e96'}"/>`
   +`<path fill="#7a4e2a" d="M168 58h96l-14 16h-68z"/><rect x="212" y="14" width="5" height="44" fill="#5c3a1e"/>`
   +`<path fill="#f7edd2" d="M217 18l38 14-38 18z"/><path fill="#d44a4a" d="M217 14h16l-4 5 4 5h-16z"/>`
   +`<rect x="0" y="64" width="142" height="32" fill="#6b4528"/><rect x="0" y="62" width="142" height="4" fill="#a36f43"/>`
   +`<rect x="24" y="42" width="26" height="22" fill="#c78b3c" stroke="#472d18" stroke-width="2"/><rect x="54" y="48" width="24" height="16" fill="#9c642c" stroke="#472d18" stroke-width="2"/>`
   +`<path fill="#8ee6ff" opacity=".4" d="M158 78h42v2h-42zm64 8h36v2h-36z"/>`;
 }
 return `<div class="tw-scene-banner" data-scene="${mode}"><svg viewBox="0 0 320 96" preserveAspectRatio="xMidYMid slice" shape-rendering="crispEdges" aria-hidden="true">${bg}</svg></div>`;
}
