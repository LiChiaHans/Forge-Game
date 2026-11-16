
function cozyLegacy_kitchenIngredientArt(t){
 const p=kitchenTierPalette(t),dark='#293237';let s='';
 // Each grade has a different silhouette, closure and ingredient arrangement.
 if(t===0)s='<path fill="'+dark+'" d="M13 23h38v31H13zM20 16h24v10H20z"/><path fill="#b58b60" d="M15 26h34v25H15zM21 18h22v10H21z"/><path fill="#e3c597" d="M18 29h28v3H18zM19 33h3v15h-3z"/><path fill="#7f5d41" d="M16 46h32v6H16zM24 22h16v4H24z"/><path fill="#e7d6a6" d="M23 35h18v9H23z"/><path fill="#b0864b" d="M27 37h10v2H27zM31 34h2v11h-2z"/>';
 if(t===1)s='<path fill="'+dark+'" d="M14 27h38v26H14zM19 18h27v4H19zM16 22h4v10h-4zM45 22h4v10h-4z"/><path fill="#b88a4e" d="M16 29h34v22H16z"/><path fill="#e0bc7d" d="M16 30h34v4H16zM18 39h30v3H18zM20 47h26v3H20zM23 32h3v18h-3zM36 32h3v18h-3z"/><path fill="#467d50" d="M16 24h5v-7h6v-5h5v12h-6v8H16zM33 20h5v-8h6v5h6v15H33z"/><path fill="#91bb62" d="M19 22h5v-6h5v10H19zM37 21h5v-5h3v11h-8z"/><path fill="#e29a4e" d="M28 25h7v14h-4v5h-3z"/>';
 if(t===2)s='<path fill="'+dark+'" d="M10 22h44v32H10z"/><path fill="#95704a" d="M12 26h40v26H12z"/><path fill="#ceaa71" d="M12 25h40v5H12zM12 46h40v5H12zM15 29h5v18h-5zM43 29h5v18h-5z"/><path fill="#536c7b" d="M11 23h6v5h-6zM47 23h6v5h-6zM12 48h5v5h-5zM47 48h5v5h-5z"/><path fill="#f2e3b6" d="M22 29h20v16H22z"/><path fill="#9c4f40" d="M23 22h17v17H23z"/><path fill="#d57e62" d="M25 23h13v12H25z"/><path fill="#f0c39b" d="M26 24h4v8h-4zM33 25h3v7h-3z"/><path fill="#629552" d="M20 17h5v9h-5zM38 16h5v11h-5z"/>';
 if(t===3)s='<path fill="'+dark+'" d="M10 24h44v30H10zM15 15h34v11H15z"/><path fill="#e5e8dc" d="M12 27h40v23H12zM17 17h30v9H17z"/><path fill="#80b4bf" d="M13 37h38v11H13zM17 18h30v3H17z"/><path fill="#d2b166" d="M13 28h4v23h-4zM47 28h4v23h-4zM12 48h40v4H12z"/><path fill="#527d8b" d="M19 29h19v6H19zM38 27h5v10h-5z"/><path fill="#c5dfda" d="M21 29h14v2H21z"/><path fill="#283c48" d="M22 31h2v2h-2z"/><path fill="#e69a76" d="M28 37h14v8H28z"/><path fill="#fbd0a0" d="M30 38h2v6h-2zM35 38h2v6h-2zM40 38h2v6h-2z"/><path fill="#eff4e1" d="M17 39h7v7h-7z"/>';
 if(t===4)s='<path fill="'+dark+'" d="M9 25h46v30H9zM15 17h34v10H15zM20 12h24v5H20z"/><path fill="#5c4a75" d="M11 28h42v24H11z"/><path fill="#b69cc1" d="M13 31h38v16H13z"/><path fill="#dfbf73" d="M10 27h44v4H10zM10 49h44v4H10zM13 28h4v24h-4zM47 28h4v24h-4zM25 49v-5h14v5z"/><path fill="#f4e8bf" d="M20 20h8v17h-8zM35 18h8v19h-8z"/><path fill="#9d6550" d="M17 21h14v6H17zM32 18h14v7H32z"/><path fill="#e4b965" d="M20 22h7v2h-7zM35 19h7v2h-7z"/><path fill="#6f9f65" d="M25 31h13v8H25z"/><path fill="#d77853" d="M25 36h14v7H25z"/><path fill="#f4dc85" d="M28 38h3v3h-3zM34 38h3v3h-3z"/><path fill="#fff2bb" d="M49 11h2v6h-2zM47 13h6v2h-6z"/>';
 return kitchenSVG('<ellipse fill="#101b24" opacity=".45" cx="32" cy="55" rx="23" ry="4"/>'+s+kitchenTierMark(t));
}
function cozyLegacy_kitchenDishArt(c,t){
 const p=kitchenTierPalette(t),dark='#26343d';let ware='',food='';
 // Wood, glazed earthenware, porcelain, gold service and a cut-crystal banquet tray.
 if(t===0)ware='<path fill="'+dark+'" d="M7 39h50v13H7zM13 35h38v5H13z"/><path fill="'+p.rim+'" d="M9 39h46v10H9z"/><path fill="'+p.plate+'" d="M13 36h38v10H13z"/><path fill="'+p.dark+'" d="M13 49h38v3H13z"/>';
 if(t===1)ware='<path fill="'+dark+'" d="M6 37h52v12h-5v5H11v-5H6z"/><path fill="'+p.rim+'" d="M8 38h48v10h-6v4H14v-4H8z"/><path fill="'+p.plate+'" d="M12 35h40v9H12z"/><path fill="'+p.light+'" d="M13 46h38v2H13z"/>';
 if(t===2)ware='<path fill="'+dark+'" d="M5 36h54v13h-5v5H10v-5H5z"/><path fill="'+p.rim+'" d="M7 37h50v10h-5v5H12v-5H7z"/><path fill="'+p.plate+'" d="M10 34h44v11H10z"/><path fill="'+p.light+'" d="M12 47h40v3H12z"/><path fill="'+p.dark+'" d="M13 48h3v2h-3zM23 48h3v2h-3zM34 48h3v2h-3zM45 48h3v2h-3z"/>';
 if(t===3)ware='<path fill="'+dark+'" d="M4 34h56v17h-6v4H10v-4H4z"/><path fill="#a77d3f" d="M6 37h52v12h-6v4H12v-4H6z"/><path fill="'+p.light+'" d="M7 35h50v4H7zM12 49h40v2H12z"/><path fill="'+p.plate+'" d="M11 36h42v10H11z"/><path fill="#b78a43" d="M9 39h3v5H9zM52 39h3v5h-3z"/>';
 if(t===4)ware='<path fill="'+dark+'" d="M2 34h60v15h-5v7H7v-7H2z"/><path fill="#80719f" d="M4 36h56v11h-5v7H9v-7H4z"/><path fill="#e9c981" d="M5 34h54v3H5zM9 51h46v3H9z"/><path fill="'+p.plate+'" d="M9 35h46v10H9z"/><path fill="#d5bddc" d="M11 46h5v3h-5zM22 46h5v3h-5zM34 46h5v3h-5zM47 46h5v3h-5z"/><path fill="#fff1c6" d="M6 38h2v6H6zM56 38h2v6h-2z"/>';
 if(c===0){food='<path fill="#bdb58d" d="M11 42v-6h3v-7h4v-6h5v6h4v7h3v6zM32 42v-7h3v-7h4v-5h5v7h4v6h4v6z"/><path fill="#fff0ca" d="M13 40v-5h3v-7h4v-4h2v6h4v10zM34 40v-5h3v-6h4v-5h2v6h4v10z"/><path fill="#254e40" d="M17 35h8v9h-8zM38 35h8v9h-8z"/><path fill="#d6c493" d="M18 31h2v2h-2zM40 30h2v2h-2z"/>';if(t>=1)food+='<path fill="#d97d61" d="M21 29h4v3h-4zM44 29h4v3h-4z"/>';if(t>=3)food+='<path fill="#cfa755" d="M12 43h3v2h-3zM48 42h3v2h-3z"/>';}
 else if(c===1)food=kitchenRice(t)+'<path fill="#78442f" d="M15 36h15v9H15zM34 30h13v9H34z"/><path fill="#b67544" d="M17 36h6v3h-6zM24 39h4v4h-4zM36 31h8v4h-8z"/><path fill="#dbad68" d="M18 37h2v2h-2zM38 32h3v2h-3z"/>';
 else if(c===2)food=kitchenRice(t)+'<path fill="#699453" d="M15 33h5v6h-5zM34 29h6v5h-6zM39 38h5v4h-5z"/><path fill="#df9d4f" d="M23 35h4v4h-4zM31 40h4v4h-4z"/><path fill="#c7a05d" d="M29 32h3v3h-3z"/>';
 else if(c===3)food=kitchenRice(t)+'<g transform="translate(0 -2)">'+kitchenMeat(t)+'</g>';
 else if(c===4){ware='<path fill="#23333a" d="M5 17h54v37H5z"/><path fill="'+p.dark+'" d="M7 19h50v33H7z"/><path fill="'+p.rim+'" d="M9 21h46v29H9z"/><path fill="'+p.plate+'" d="M11 23h17v24H11zM31 23h21v11H31zM31 37h21v10H31z"/><path fill="'+p.light+'" d="M8 19h48v2H8zM8 50h48v2H8z"/>';food='<path fill="#e7d8ac" d="M13 27h13v17H13z"/><path fill="#fff1cc" d="M15 25h10v17H15z"/><path fill="#d4bf8a" d="M17 29h3v2h-3zM22 35h2v2h-2z"/><path fill="#7e4935" d="M33 25h16v7H33z"/><path fill="#d1975f" d="M34 25h3v5h-3zM40 25h3v5h-3zM46 25h3v5h-3z"/><path fill="#638d4b" d="M33 39h16v6H33z"/><path fill="#d78c4d" d="M39 39h4v5h-4z"/>';if(t>=2)food+='<path fill="#d77859" d="M19 27h4v4h-4z"/><path fill="#acc578" d="M34 39h3v3h-3z"/>';if(t>=3)food+='<path fill="#f4d98b" d="M50 23h2v4h-2zM49 47h3v2h-3z"/>';}
 else if(c===5)food=kitchenRice(t)+kitchenVegetables(t);
 else if(c===6)food=kitchenMeat(t)+'<path fill="#72914f" d="M10 37h6v7h-6zM49 35h5v10h-5z"/><path fill="#e1be60" d="M48 29h7v5h-7z"/>';
 else if(c===7){ware+='<path fill="#273b40" d="M11 26h42v21H11zM5 29h8v5H5zM51 29h8v5h-8z"/><path fill="#6b8583" d="M13 27h38v3H13z"/><path fill="#9f6842" d="M15 30h34v13H15z"/>';food='<path fill="#bc784c" d="M19 31h9v7h-9zM35 35h10v7H35z"/><path fill="#e5b275" d="M20 31h4v2h-4zM37 35h4v2h-4z"/><path fill="#80a45b" d="M31 30h6v6h-6zM17 39h6v5h-6z"/><path fill="#dda05a" d="M27 38h5v6h-5z"/>';}
 else if(c===8){ware+='<path fill="'+p.dark+'" d="M12 26h40v20h-6v5H18v-5h-6z"/><path fill="'+p.rim+'" d="M14 28h36v15h-5v5H19v-5h-5z"/><path fill="#efcf8d" d="M15 26h34v13H15z"/><path fill="#f9e9ba" d="M17 27h30v8H17z"/>';food='<path fill="#729855" d="M21 29h4v3h-4zM35 32h4v3h-4z"/><path fill="#d59852" d="M29 29h4v3h-4zM23 34h3v2h-3z"/><path fill="#fff2d1" d="M38 28h4v2h-4z"/>';}
 else food=kitchenVegetables(t)+'<path fill="#cf6651" d="M23 28h7v6h-7zM33 40h7v5h-7z"/><path fill="#f3ce78" d="M27 35h5v4h-5z"/>';
 let finish='';
 // Recipe-specific upgrades retain the dish silhouette while making higher service visibly richer.
 if(t>=2){
  if(c===0)finish+='<path fill="#d87b48" d="M17 25h6v3h-6zM39 25h6v3h-6z"/><path fill="#f5c282" d="M18 25h2v2h-2zM42 25h2v2h-2z"/>';
  if(c===1)finish+='<path fill="#527d43" d="M14 30h3v-4h4v9h-7z"/><path fill="#e7b26b" d="M36 39h9v3h-9z"/>';
  if(c===2)finish+='<path fill="#6d4a32" d="M19 27h7v4h-7zM39 32h8v3h-8z"/><path fill="#d1af77" d="M21 31h3v4h-3zM41 35h3v4h-3z"/>';
  if(c===3)finish+='<path fill="#ffefcb" d="M43 31h8v10h-8z"/><path fill="#e6ad4c" d="M45 33h5v5h-5z"/>';
  if(c===4)finish+='<path fill="#6a9b59" d="M23 23h3v4h-3z"/><path fill="#dfb45c" d="M34 38h3v3h-3zM44 40h3v3h-3z"/>';
  if(c===5)finish+='<path fill="#a26040" d="M33 26h8v4h-8z"/><path fill="#f2d3a1" d="M35 30h3v6h-3z"/>';
  if(c===6)finish+='<path fill="#5b382e" d="M32 29h2v13h-2zM38 31h2v11h-2z"/><path fill="#e2a170" d="M30 29h2v11h-2zM36 30h2v12h-2z"/>';
  if(c===7)finish+='<path fill="#4c7b48" d="M27 27h7v6h-7z"/><path fill="#e3ad65" d="M40 29h6v5h-6zM19 39h5v3h-5z"/>';
  if(c===8)finish+='<path fill="#f7eccb" d="M25 30h12v2H25zM23 32h3v3h-3zM35 33h3v3h-3zM27 35h8v2h-8z"/>';
  if(c===9)finish+='<path fill="#c6dc91" d="M34 24h5v8h-5zM42 28h5v7h-5z"/><path fill="#faf0ca" d="M19 37h4v4h-4zM37 35h4v4h-4z"/>';
 }
 if(t>=3){
  if(c===0)finish+='<path fill="#fff0c8" d="M28 39v-6h3v-6h3v6h3v6z"/><path fill="#2f5542" d="M30 35h5v7h-5z"/>';
  if(c===1||c===2||c===5)finish+='<path fill="#e9bb63" d="M44 37h7v6h-7z"/><path fill="#fff0bc" d="M46 38h3v3h-3z"/>';
  if(c===3||c===6)finish+='<path fill="#53854a" d="M17 25h5v-5h3v10h-8z"/><path fill="#b9ce7c" d="M18 23h3v3h-3z"/>';
  if(c===4)finish+='<path fill="#b96849" d="M33 29h16v2H33z"/><path fill="#f1c382" d="M35 25h2v3h-2zM42 25h2v3h-2z"/>';
  if(c===7)finish+='<path fill="#e3d5b2" d="M28 32h6v4h-6z"/><path fill="#a46f43" d="M29 31h5v2h-5z"/>';
  if(c===8)finish+='<path fill="#668f52" d="M29 25h2v7h-2zM31 27h3v2h-3z"/>';
  if(c===9)finish+='<path fill="#b87c45" d="M28 23h7v4h-7z"/><path fill="#edd2a2" d="M30 27h3v6h-3z"/>';
 }
 if(t===4){
  if(c===0)finish+='<path fill="#bd674c" d="M16 26h10v3H16zM37 26h11v3H37z"/><path fill="#f3b571" d="M17 25h2v2h-2zM22 25h2v2h-2zM39 25h2v2h-2zM44 25h2v2h-2z"/>';
  if(c===1||c===3||c===6)finish+='<path fill="#73412e" d="M24 32h15v2H24zM28 37h15v2H28z"/><path fill="#efbc7b" d="M24 31h6v1h-6zM33 36h7v1h-7z"/><path fill="#eed886" d="M33 26h4v3h-4z"/>';
  if(c===2||c===5||c===9)finish+='<path fill="#65974e" d="M29 24h4v-5h3v10h-7z"/><path fill="#d9e7ad" d="M30 21h2v4h-2z"/><path fill="#f6e4b6" d="M23 39h3v3h-3zM38 38h3v3h-3z"/>';
  if(c===4)finish+='<path fill="#a05239" d="M33 38h6v6h-6z"/><path fill="#f3d79e" d="M34 38h3v2h-3z"/><path fill="#f0c765" d="M18 30h4v2h-4z"/>';
  if(c===7)finish+='<path fill="#e4d7b2" d="M17 28h6v5h-6zM37 37h6v4h-6z"/><path fill="#875f3d" d="M18 27h5v2h-5z"/><path fill="#cbd99c" d="M31 26h3v3h-3z"/>';
  if(c===8)finish+='<path fill="#fff4d8" d="M20 28h3v2h-3zM39 31h3v2h-3zM28 34h3v2h-3z"/><path fill="#c89558" d="M45 34h6v7h-6z"/><path fill="#f0d29b" d="M46 34h4v2h-4z"/>';
 }
 if(t>=1)finish+='<path fill="#4e814b" d="M13 43h3v-4h2v4h3v2h-8z"/>';
 if(t>=2)finish+='<path fill="#e4c06b" d="M45 43h7v2h-7z"/><path fill="#a36a43" d="M46 45h6v2h-6z"/>';
 if(t>=3)finish+='<path fill="#f2e2ad" d="M27 23h2v3h-2zM33 25h2v2h-2zM42 28h2v2h-2z"/><path fill="#e49e5c" d="M7 42h3v4H7z"/>';
 if(t===4)finish+='<path fill="#86558e" d="M49 25h4v-4h3v4h4v3h-4v4h-3v-4h-4z"/><path fill="#ffe5a3" d="M53 25h3v3h-3z"/><path fill="#f0d074" d="M31 23h3v2h-3zM39 26h2v2h-2z"/><path fill="#fff6cf" d="M55 12h2v6h-2zM53 14h6v2h-6z"/>';
 const steam=t>=2&&c!==9?'<g fill="#ece4ce" opacity=".38"><path d="M25 21v-5h2v-5h2v5h-2v5zM36 19v-5h2v-5h2v5h-2v5z"/></g>':'';
 return kitchenSVG('<g data-dish="'+c+'" data-grade="'+t+'"><ellipse fill="#101d28" opacity=".4" cx="32" cy="55" rx="26" ry="4"/>'+ware+food+finish+steam+kitchenTierMark(t)+'</g>');
}