
/* UNITY_ART_END */
const C=['#c8773a','#7c8aa0','#4f7cc0','#d9a81e','#9a5bd6'];
const NM=['銅','鐵','鋼','金','秘銀'];
const TY=['刃','柄','盾'];
const PR=[30,55,90,140,210],OP=[60,110,180,280,420],DP=[25,50,90,150,240];
let MPR=200,FIREP=500,UPGP=500,BLIZZP=750,LIFEP=3000,gw=null;
const DEF={PR:PR.slice(),OP:OP.slice(),DP:DP.slice(),MPR:200,FIREP:500,UPGP:500,BLIZZP:750,LIFEP:3000};

const COMBO=["000","001","002","011","012","022","111","112","122","222"];
const WN=['利爪','大劍','盾刃','長矛','盔甲','大錘','長棍','鏟子','大斧','大盾'];
const MUL=[1,1,1,1,1,1,1,1,1,1];

/* Gemini 武器圖示 */
const WP_PAL=[
  {m:"#e8a87c",dk:"#6b3a1e",hi:"#ffd1b3",gem:"#d9663b",fl:"#ff9d66"},
  {m:"#cbd5e1",dk:"#334155",hi:"#f8fafc",gem:"#94a3b8",fl:"#64748b"},
  {m:"#93c5fd",dk:"#1e3a8a",hi:"#eff6ff",gem:"#38bdf8",fl:"#2563eb"},
  {m:"#fde047",dk:"#713f12",hi:"#fef9c3",gem:"#ef4444",fl:"#eab308"},
  {m:"#e9d5ff",dk:"#4c1d95",hi:"#faf5ff",gem:"#c084fc",fl:"#a855f7"}
];
function getWeaponSVG(c,t){
  t=Math.max(0,Math.min(4,t||0));
  const p=WP_PAL[t];
  const gl=t===4?`filter="drop-shadow(0 0 2px ${p.gem})"`:"";
  const deco=t>=3?`<polygon points="12,12 13.5,14 12,16 10.5,14" fill="${p.gem}" stroke="${p.hi}" stroke-width="0.3"/>`:"";
  switch(c){
    case 0:
      return `<g ${gl}>
      <path d="M5,18 C4,13 5,6 9,2 C10,7 9.5,13 9,18 Z" fill="${p.m}" stroke="${p.dk}" stroke-width="0.8"/>
      <path d="M10.5,18 C10,12 11,5 15,1 C16,6.5 14.8,12 13.8,18 Z" fill="${p.hi}" stroke="${p.dk}" stroke-width="0.8"/>
      <path d="M15,18 C15.5,12 17,7 21,3 C21,8.5 19.5,13 17.5,18 Z" fill="${p.m}" stroke="${p.dk}" stroke-width="0.8"/>
      <path d="M4,17.5 L20,17.5 C21,17.5 21,22 20,22 L4,22 C3,22 3,17.5 4,17.5 Z" fill="${p.dk}" stroke="${p.hi}" stroke-width="0.6"/>
      <line x1="6.5" y1="18" x2="6.5" y2="21.5" stroke="${p.gem}" stroke-width="0.8"/>
      <line x1="12" y1="18" x2="12" y2="21.5" stroke="${p.gem}" stroke-width="0.8"/>
      <line x1="17.5" y1="18" x2="17.5" y2="21.5" stroke="${p.gem}" stroke-width="0.8"/>
      ${t>=2?`<polygon points="12,8 13.5,11 12,13 10.5,11" fill="${p.gem}"/>`:''}
      </g>`;
    case 1:
      return `<g ${gl}>
      <path d="M12,1.5 L15,5 L14.2,15.5 L9.8,15.5 L9,5 Z" fill="${p.m}" stroke="${p.dk}" stroke-width="0.8"/>
      <path d="M12,1.5 L14.2,5 L13.6,15.5 L12,15.5 Z" fill="${p.hi}" opacity="0.65"/>
      <line x1="12" y1="2" x2="12" y2="15.5" stroke="${p.dk}" stroke-width="0.6"/>
      <path d="${t>=3?'M6,14.5 L12,16 L18,14.5 L17,17.5 L12,16.8 L7,17.5 Z':'M6.5,15.5 L17.5,15.5 L16.5,17.5 L7.5,17.5 Z'}" fill="${p.dk}" stroke="${p.hi}" stroke-width="0.5"/>
      <rect x="11" y="17.5" width="2" height="4" fill="${p.dk}" rx="0.5"/>
      <circle cx="12" cy="22" r="1.3" fill="${p.m}" stroke="${p.dk}" stroke-width="0.5"/>
      ${deco}</g>`;
    case 2:
      return `<g ${gl}>
      <circle cx="12" cy="12" r="9.5" fill="${p.dk}" stroke="${p.hi}" stroke-width="0.5"/>
      <polygon points="12,2 14,5 12,6" fill="${p.hi}"/>
      <polygon points="19,5 19,8 17,7" fill="${p.m}"/>
      <polygon points="22,12 19,14 18,12" fill="${p.hi}"/>
      <polygon points="19,19 16,19 17,17" fill="${p.m}"/>
      <polygon points="12,22 10,19 12,18" fill="${p.hi}"/>
      <polygon points="5,19 5,16 7,17" fill="${p.m}"/>
      <polygon points="2,12 5,10 6,12" fill="${p.hi}"/>
      <polygon points="5,5 8,5 7,7" fill="${p.m}"/>
      <circle cx="12" cy="12" r="6.2" fill="${p.m}" stroke="${p.dk}" stroke-width="0.8"/>
      <circle cx="12" cy="12" r="3.2" fill="${p.gem}" stroke="${p.hi}" stroke-width="0.6"/>
      <circle cx="12" cy="12" r="1.2" fill="${p.hi}"/>
      </g>`;
    case 3:
      return `<g ${gl}>
      <line x1="12" y1="7" x2="12" y2="23" stroke="${p.dk}" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="12" y1="7" x2="12" y2="23" stroke="${p.m}" stroke-width="1"/>
      <path d="M12,1.2 L15.5,7.5 L12,9 L8.5,7.5 Z" fill="${p.m}" stroke="${p.dk}" stroke-width="0.7"/>
      <path d="M12,1.2 L15.5,7.5 L12,8.5 Z" fill="${p.hi}" opacity="0.6"/>
      <rect x="10.2" y="8.5" width="3.6" height="2" fill="${p.gem}" rx="0.5"/>
      <path d="M9.5,12.5 L12,14.5 L14.5,12.5" fill="none" stroke="${p.dk}" stroke-width="0.9"/>
      ${t>=2?`<polygon points="12,4.5 13.5,6.5 12,7.5 10.5,6.5" fill="${p.gem}"/>`:''}
      </g>`;
    case 4:
      return `<g ${gl}>
      <path d="M6,3.5 Q12,7 18,3.5 L20,11 L18.5,21.5 L5.5,21.5 L4,11 Z" fill="${p.m}" stroke="${p.dk}" stroke-width="0.9"/>
      <path d="M8,4.5 Q12,7.5 16,4.5 L17.5,11 L12,15 L6.5,11 Z" fill="${p.hi}" opacity="0.45"/>
      <circle cx="4.5" cy="6.5" r="2.8" fill="${p.dk}" stroke="${p.hi}" stroke-width="0.6"/>
      <circle cx="19.5" cy="6.5" r="2.8" fill="${p.dk}" stroke="${p.hi}" stroke-width="0.6"/>
      <path d="M7,16 Q12,18.5 17,16" fill="none" stroke="${p.dk}" stroke-width="1.1"/>
      <path d="M8,19 Q12,21.5 16,19" fill="none" stroke="${p.dk}" stroke-width="1.1"/>
      ${t>=2?`<polygon points="12,8.5 13.8,11 12,13 10.2,11" fill="${p.gem}" stroke="${p.hi}" stroke-width="0.4"/>`:''}
      </g>`;
    case 5:
      return `<g ${gl}>
      <line x1="12" y1="10" x2="12" y2="23" stroke="${p.dk}" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="12" y1="11" x2="12" y2="23" stroke="${p.m}" stroke-width="1.2"/>
      <rect x="3.5" y="3.5" width="17" height="8" rx="1.8" fill="${p.m}" stroke="${p.dk}" stroke-width="0.9"/>
      <rect x="5" y="4.5" width="14" height="3" fill="${p.hi}" opacity="0.5"/>
      <rect x="10.2" y="3.2" width="3.6" height="8.6" fill="${p.dk}" rx="0.5"/>
      <line x1="4.5" y1="7.5" x2="19.5" y2="7.5" stroke="${p.dk}" stroke-width="0.6"/>
      ${t>=2?`<polygon points="12,5.5 13.5,7.5 12,9.5 10.5,7.5" fill="${p.gem}"/>`:''}
      </g>`;
    case 6:
      return `<g ${gl}>
      <line x1="19.5" y1="3" x2="4.5" y2="21" stroke="${p.dk}" stroke-width="2.6" stroke-linecap="round"/>
      <line x1="19.5" y1="3" x2="4.5" y2="21" stroke="${p.m}" stroke-width="1.4"/>
      <circle cx="19.5" cy="3" r="2.2" fill="${p.hi}" stroke="${p.dk}" stroke-width="0.7"/>
      <circle cx="4.5" cy="21" r="1.6" fill="${p.dk}"/>
      <line x1="14.5" y1="8" x2="17.5" y2="10" stroke="${p.gem}" stroke-width="1.2"/>
      <line x1="11" y1="12" x2="14" y2="14" stroke="${p.gem}" stroke-width="1.2"/>
      <line x1="7.5" y1="16" x2="10.5" y2="18" stroke="${p.gem}" stroke-width="1.2"/>
      ${t>=3?`<circle cx="19.5" cy="3" r="3.8" fill="none" stroke="${p.gem}" stroke-width="0.8" opacity="0.8"/>`:''}
      </g>`;
    case 7:
      return `<g ${gl}>
      <line x1="12" y1="3" x2="12" y2="14" stroke="${p.dk}" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="12" y1="3" x2="12" y2="14" stroke="${p.m}" stroke-width="1"/>
      <rect x="9" y="1.8" width="6" height="1.8" rx="0.5" fill="${p.dk}"/>
      <path d="M7,13 L17,13 L16,18 L12,23 L8,18 Z" fill="${p.m}" stroke="${p.dk}" stroke-width="0.9"/>
      <path d="M8,13.8 L12,13.8 L12,21.5 L9,17.5 Z" fill="${p.hi}" opacity="0.5"/>
      <line x1="12" y1="14" x2="12" y2="21.5" stroke="${p.dk}" stroke-width="0.6"/>
      ${t>=2?`<polygon points="12,15 13.5,17 12,19 10.5,17" fill="${p.gem}"/>`:''}
      </g>`;
    case 8:
      return `<g ${gl}>
      <line x1="13.2" y1="5.5" x2="16.5" y2="22.5" stroke="${p.dk}" stroke-width="2" stroke-linecap="round"/>
      <line x1="13.2" y1="5.5" x2="16.5" y2="22.5" stroke="${p.m}" stroke-width="1.1"/>
      <circle cx="16.5" cy="22.5" r="1.3" fill="${p.dk}"/>
      <polygon points="12.5,0.8 14,4 11,4" fill="${p.hi}" stroke="${p.dk}" stroke-width="0.6"/>
      <path d="M12,4.5 C7.5,5 3.5,7.8 3,12 C4,16.5 8,18.8 12.5,19 C11,16.5 11,8 12,4.5 Z" fill="${p.m}" stroke="${p.dk}" stroke-width="0.8"/>
      <path d="M11,5.5 C8,6.5 5,8.8 4.2,12 C5.2,15.5 8.5,17.2 11.5,17.8 C10.8,15.5 10.8,9 11,5.5 Z" fill="${p.hi}" opacity="0.6"/>
      <path d="M14,6.5 C16.5,7 19.5,8 20.5,10 C19,11.5 17,11.5 14.5,11 Z" fill="${p.m}" stroke="${p.dk}" stroke-width="0.7"/>
      <rect x="11.5" y="4.5" width="3" height="7.5" fill="${p.dk}" rx="0.4"/>
      <line x1="11.5" y1="6.8" x2="14.5" y2="6.8" stroke="${p.hi}" stroke-width="0.6"/>
      <line x1="11.5" y1="9.8" x2="14.5" y2="9.8" stroke="${p.hi}" stroke-width="0.6"/>
      ${t>=2?`<polygon points="13,7.5 14,8.5 13,9.5 12,8.5" fill="${p.gem}"/>`:''}
      </g>`;
    case 9:
      return `<g ${gl}>
      <path d="M12,1.8 L20.5,4.5 L19,14 C18.5,19 15,22.2 12,23.5 C9,22.2 5.5,19 5,14 L3.5,4.5 Z" fill="${p.m}" stroke="${p.dk}" stroke-width="0.9"/>
      <path d="M12,3.5 L18.5,5.5 L17.5,13.5 C17,17.5 14.5,19.8 12,21.5 Z" fill="${p.hi}" opacity="0.45"/>
      <circle cx="12" cy="11.5" r="3.2" fill="${p.dk}" stroke="${p.hi}" stroke-width="0.6"/>
      <circle cx="12" cy="11.5" r="1.3" fill="${p.gem}"/>
      <line x1="12" y1="4" x2="12" y2="20.5" stroke="${p.dk}" stroke-width="0.7"/>
      </g>`;
  }
  return '';
}

const MP=[
  '<polygon points="12,1 16,7 15,23 9,23 8,7"/>',
  '<rect x="7" y="3" width="10" height="18" rx="1"/>',
  '<polygon points="12,2 20.7,7 20.7,17 12,22 3.3,17 3.3,7"/>',
  '<polygon points="6,3 18,3 23,9 12,22 1,9"/>'
];
const mold=(s,f,x="")=>{const cuts=['M12 3L15 7V20H9V7Z','M8 4h8v16H8z','M11 3h2v1h3v2h3v2h1v8h-1v2h-3v2h-3v1h-2v-1H8v-2H5v-2H4V8h1V6h3V4h3z','M7 4h10v2h3v3h1v3h-3v3h-3v3h-2v3h-2v-3H9v-3H6v-3H3V9h1V6h3z'];const cut=cuts[s];return `<svg class="mo ${x}" viewBox="0 0 24 24" shape-rendering="crispEdges"><path fill="#5a452e" d="M2 0h20v2h2v20h-2v2H2v-2H0V2h2z"/><path fill="#cdb27a" d="M2 2h20v20H2z"/><path fill="#f3dfaa" d="M2 2h20v2H4v16H2z"/><path fill="#967442" d="M4 20h16V4h2v18H4z"/><path fill="#e4cb92" d="M4 4h16v16H4z"/><path d="${cut}" fill="#f6e3b1" transform="translate(0 1)"/><path d="${cut}" fill="#806340"/><path d="${cut}" fill="${f||'#352a20'}" stroke="#4d3827" stroke-width="1"/><path fill="#fff1c9" opacity=".6" d="M3 3h2v1H3zM19 3h2v1h-2zM3 19h1v2H3zM20 19h1v2h-1z"/>${f?'<path fill="#ffffff" opacity=".35" d="M10 7h1v10h-1z"/>':'<path fill="#1d1815" opacity=".65" d="M10 7h1v10h-1z"/>'}</svg>`;};
const magicOrbHTML=()=>'<svg class="magic-orb" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true"><path fill="#392858" d="M5 1h6v1h2v2h1v7h-2v2H4v-1H2V4h1V2h2z"/><path fill="#9973e5" d="M5 3h6v1h1v6h-2v2H5v-1H4V5h1z"/><path fill="#ded7ff" d="M5 4h4v2H6v3H4V5h1z"/><path fill="#624bb2" d="M10 7h2v3h-2v2H6v-2h4z"/><path fill="#ffe7a1" d="M7 0h2v3H7zM0 7h3v2H0zM13 12h3v2h-3z"/></svg>';
const mb=c=>c.m?'<span class="mb" aria-label="附魔 '+Math.floor(c.m/5)+' 層">+'+Math.floor(c.m/5)+magicOrbHTML()+'</span>':'';
const stage20_oreH=(t,x="",m=0)=>`<div class="t o ${x}" style="background-color:${C[t]}">${NM[t]}${mb({m})}</div>`;
const oreH=(t,x="",m=0)=>expandedGameEnabled()?workshopOreHTML(t,x,m):stage20_oreH(t,x,m);
const bands=w=>w.cs&&new Set(w.cs).size>1
  ?`linear-gradient(to bottom,${C[w.cs[0]]} 0 33.33%,${C[w.cs[1]]} 33.33% 66.66%,${C[w.cs[2]]} 66.66% 100%)`
  :C[w.t];
