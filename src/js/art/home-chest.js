const HOME_ART={"welcome":"assets/home/welcome.7a5efc768b9e.webp"};
function syncHomeArt(){$('title').style.setProperty('--home-art','url("'+HOME_ART.welcome+'")');}
function workshopChestSVG(open=false){
 const shadow='<ellipse cx="40" cy="68" rx="31" ry="6" fill="#0f1d1b" opacity=".46"/>';
 const glow=open
  ?'<g class="town-chest-light">'
   +'<defs><radialGradient id="chest-aura" cx="50%" cy="62%" r="55%"><stop offset="0%" stop-color="#fff8c9" stop-opacity=".95"/><stop offset="45%" stop-color="#ffd56b" stop-opacity=".48"/><stop offset="100%" stop-color="#ffb83d" stop-opacity="0"/></radialGradient></defs>'
   +'<ellipse cx="40" cy="34" rx="35" ry="26" fill="url(#chest-aura)"/>'
   +'<path fill="#ffe899" opacity=".55" d="M21 38L10 8l17 16L40 2l13 22L70 8 59 38z"/>'
   +'<path fill="#fffbe0" d="M18 14h2v6h-2zM16 16h6v2h-6zM60 12h2v6h-2zM58 14h6v2h-6zM39 5h2v7h-2zM36 8h8v2h-8z"/>'
   +'</g>'
  :'<g class="town-chest-shimmer" opacity=".75"><path fill="#ffe9a3" d="M14 39h52v2H14z"/></g>';
 const lidClosed='<g class="town-chest-lid">'
  +'<path fill="#271d18" d="M9 39V24h3v-6h5v-5h46v5h5v6h3v15z"/>'
  +'<path fill="#9d6438" d="M12 37V25h3v-5h4v-4h42v4h4v5h3v12z"/>'
  +'<path fill="#bd7d47" d="M15 24h50v6H15zM18 18h44v5H18z"/>'
  +'<path fill="#d99d5c" d="M20 17h40v3H20zM16 25h48v2H16z"/>'
  +'<path fill="#7c4b28" d="M12 31h56v2H12zM16 22h48v1H16zM12 36h56v2H12z"/>'
  +'<path fill="#533d28" d="M12 24h7v14h-7zM61 24h7v14h-7zM25 16h6v22h-6zM49 16h6v22h-6z"/>'
  +'<path fill="#d8a84e" d="M13 25h5v12h-5zM62 25h5v12h-5zM26 16h4v21h-4zM50 16h4v21h-4zM10 36h60v4H10z"/>'
  +'<path fill="#fae08c" d="M14 26h2v10h-2zM63 26h2v10h-2zM27 17h2v19h-2zM51 17h2v19h-2zM12 37h56v1H12z"/>'
  +'<path fill="#fff3c4" d="M14 28h2v2h-2zM64 28h2v2h-2zM27 21h2v2h-2zM51 21h2v2h-2z"/>'
  +'</g>';
 const lidOpen='<g class="town-chest-lid is-open">'
  +'<path fill="#271d18" d="M11 31V11h4V7h50v4h4v20z"/>'
  +'<path fill="#734525" d="M14 29V13h3v-3h46v3h3v16z"/>'
  +'<path fill="#4b2a1c" d="M16 14h48v15H16z"/>'
  +'<path fill="#8f5830" d="M16 11h48v3H16z"/>'
  +'<path fill="#d8a84e" d="M13 11h4v18h-4zM63 11h4v18h-4zM26 10h4v19h-4zM50 10h4v19h-4zM12 9h56v3H12z"/>'
  +'<path fill="#fae08c" d="M14 10h52v1H14z"/>'
  +'<path fill="#251a16" d="M13 30h54v11H13z"/>'
  +'<path fill="#d99a2e" d="M17 38v-5h6v-3h9v-2h16v2h9v3h6v5z"/>'
  +'<path fill="#f7cf63" d="M19 37v-4h5v-2h8v-2h16v2h8v2h5v4z"/>'
  +'<path fill="#fff3b5" d="M24 33h4v3h-4zM35 30h5v4h-5zM47 32h4v3h-4zM55 34h3v2h-3z"/>'
  +'<path fill="#5ee0b0" d="M31 32h4v4h-4z"/><path fill="#ff7c98" d="M44 33h4v4h-4z"/><path fill="#7fd8ff" d="M38 34h4v3h-4z"/>'
  +'</g>';
 const body='<path fill="#271d18" d="M10 38h60v29H10z"/>'
  +'<path fill="#8e5830" d="M13 40h54v24H13z"/>'
  +'<path fill="#a96c3c" d="M15 41h50v7H15zM15 51h50v7H15z"/>'
  +'<path fill="#714323" d="M13 48h54v2H13zM13 58h54v2H13z"/>'
  +'<path fill="#c4874d" d="M18 42h14v1H18zM46 43h14v1H46zM20 53h12v1H20zM48 54h13v1H48z"/>'
  +'<path fill="#533d28" d="M12 39h7v26h-7zM61 39h7v26h-7zM25 39h6v26h-6zM49 39h6v26h-6z"/>'
  +'<path fill="#d8a84e" d="M13 40h5v24h-5zM62 40h5v24h-5zM26 40h4v24h-4zM50 40h4v24h-4zM11 61h58v5H11zM11 39h58v3H11z"/>'
  +'<path fill="#f7dc84" d="M14 41h2v22h-2zM63 41h2v22h-2zM27 41h2v21h-2zM51 41h2v21h-2zM13 62h54v1H13z"/>'
  +'<path fill="#fff3c4" d="M14 44h2v2h-2zM64 44h2v2h-2zM14 56h2v2h-2zM64 56h2v2h-2z"/>'
  +'<path fill="#382c21" d="M33 36h14v17l-7 4-7-4z"/>'
  +'<path fill="#e3b558" d="M35 38h10v13l-5 3-5-3z"/>'
  +'<path fill="#fff0b0" d="M36 39h8v2h-8z"/>'
  +'<path fill="#2d6e5c" d="M37 42h6v7l-3 2-3-2z"/>'
  +'<path fill="#7ee8bc" d="M38 43h4v4h-4z"/>'
  +'<path fill="#e0fff0" d="M38 43h2v2h-2z"/>';
 return '<svg viewBox="0 0 80 76" shape-rendering="crispEdges" aria-hidden="true" data-chest-art="cozy-oak">'+shadow+glow+(open?lidOpen:lidClosed)+body+'</svg>';
}
syncHomeArt();
