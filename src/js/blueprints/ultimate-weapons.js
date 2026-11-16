
function isUltimate(w){return isLegend(w)&&w.legendId>=10;}
function ultimateSkill(w){return isUltimate(w)?ULTIMATES[w.legendId-10].skill:null;}
function legendKind(id){return id>=10?'終極':'傳說';}
function requirementName(r){return r.legendId!==undefined?LEGENDS[r.legendId].name:NM[r.tier]+'級'+WN[r.c];}
function requirementArt(r){return r.legendId!==undefined?legendWeaponSVG(r.legendId):hex(r.c,C[r.tier],'',r.tier);}
function ultimateSaleQuote(w){
 const l=LEGENDS[w.legendId],ingredients=Array.isArray(w.legendIngredients)&&w.legendIngredients.length===l.recipe.length?w.legendIngredients:l.recipe.map(id=>baseLegendWeapon(id));
 return Math.ceil(ingredients.reduce((sum,x)=>sum+wp(x),0)*l.price);
}
function firstUltimateReward(id){return id>=10&&!hasLegendCollection(id)?(LEGENDS[id].recipe.length===2?2500:4500):0;}
function ultimateWeapon(id,ingredients){
 const u=LEGENDS[id],values=ingredients.map(weaponStats),three=ingredients.length===3,core={};
 // Two/three legends contribute every stat. Floors keep early copper recipes useful in NG+.
 const band=id-10,floor=three?{atk:320+(band-5)*40,def:260+(band-5)*30,spd:180+(band-5)*18}:{atk:165+band*18,def:140+band*15,spd:95+band*8};
 ['atk','def','spd'].forEach(k=>core[k]=Math.round(Math.max(floor[k],values.reduce((n,s)=>n+s[k],0)*(three?1.25:1.5))));
 if(u.c===3||u.c===6)core.spd=Math.round(core.spd*1.2);
 else if(u.c===2)core.def=Math.round(core.def*1.2);
 else core.atk=Math.round(core.atk*1.2);
 return {k:'w',c:u.c,t:4,cs:[4,4,4],legendId:id,legendCore:core,legendPrice:Math.ceil(ingredients.reduce((n,w)=>n+wp(w),0)*u.price),legendIngredients:JSON.parse(JSON.stringify(ingredients)),m:ingredients.reduce((n,w)=>n+(w.m||0),0)+u.magic,dts:ingredients.flatMap(w=>w.dts||[]).sort((a,b)=>b-a).slice(0,3),b:0,statVersion:2};
}
function ultimateSkillHTML(w){const skill=ultimateSkill(w);return skill?'<section class="ultimate-skill"><b>✦ 主動技能 · '+skill.name+'</b><p>'+skill.desc+'</p><small>每場限一次 · 技能傷害無視防禦，套用屬性相剋</small></section>':'';}
function ultimatePixelArt(id){
 const u=LEGENDS[id],i=id-10,c=u.color;
 const metal=['#4b4a73','#b5bdd8','#f4f4e6'],gold=['#80603b','#dab76b','#fff0b3'];
 let shape='';
 if(u.c===3||u.c===6){shape='<path fill="'+metal[0]+'" d="M29 24h7v35h-7zM23 18l9-16 10 16-8 12z"/><path fill="'+metal[1]+'" d="M31 25h3v32h-3zM26 18l6-13 6 13-5 8z"/><path fill="'+metal[2]+'" d="M32 6v18l-5-6z"/><path fill="'+gold[1]+'" d="M21 26l-7-8 3 14 13 6v-8zM42 26l7-8-3 14-12 6v-8zM27 45h11v4H27zM27 53h11v4H27z"/>';}
 else if(u.c===5){shape='<path fill="'+metal[0]+'" d="M8 8h47v23H8zM29 29h8v29h-8z"/><path fill="'+metal[1]+'" d="M10 10h40v17H10zM31 31h3v23h-3z"/><path fill="'+gold[1]+'" d="M6 12h8v14H6zM49 9h8v20h-8zM24 6h16v25H24zM27 52h12v7H27z"/><path fill="'+c+'" d="M28 10h8v16h-8z"/>';}
 else if(u.c===8){shape='<path fill="'+metal[0]+'" d="M28 6h8v54h-8zM27 13L9 5v10L2 22l7 12 19-10M36 13l18-8v10l7 7-7 12-18-10"/><path fill="'+metal[1]+'" d="M27 16L11 9v8l-5 6 5 7 16-9M37 16l15-7v8l5 6-5 7-15-9"/><path fill="'+gold[1]+'" d="M30 7h4v49h-4zM25 35h14v4H25zM25 49h14v4H25z"/>';}
 else if(u.c===0){shape='<path fill="'+gold[0]+'" d="M12 34h41v22H12z"/><path fill="'+metal[0]+'" d="M14 36L8 8l12 6 7 25M28 36L27 2l10 11v26M41 36l9-31 9 15-12 23"/><path fill="'+metal[1]+'" d="M17 34L12 13l5 4 7 20M31 35l-1-28 4 8v21M44 36l7-25 4 10-10 18"/><path fill="'+gold[1]+'" d="M14 38h37v14H14zM18 53h29v6H18z"/>';}
 else{shape='<path fill="'+metal[0]+'" d="M25 5l8-4 8 5v29l-8 9-8-9zM29 41h8v18h-8z"/><path fill="'+metal[1]+'" d="M28 8l5-4 5 4v26l-5 7-5-7z"/><path fill="'+metal[2]+'" d="M32 6v32l-3-5V9z"/><path fill="'+gold[1]+'" d="M17 34l9 5h15l8-5-3 11-10-2v12h-7V43l-9 2zM27 55h12v5H27z"/>';
  if(u.c===2)shape='<path fill="#4b4a73" d="M8 17l15-9 19 8v24L24 55 8 42z"/><path fill="#b5bdd8" d="M11 19l13-7 15 7v19L24 50 11 40z"/><path fill="'+gold[1]+'" d="M15 22l9-5 10 5v14L24 44 15 37z"/>'+shape;
 }
 let spark='';for(const [x,y]of [[9,42],[52,43],[17,7],[46,8],[8,28],[54,31]])spark+='<path fill="'+c+'" d="M'+x+' '+y+'h2v2h-2z"/>';
 return '<svg viewBox="0 0 64 64" role="img" aria-label="'+u.name+'" shape-rendering="crispEdges"><path fill="#211f3c" d="M22 0h21l16 14v35L43 63H21L4 48V15z" opacity=".45"/>'+spark+shape+'<path fill="'+c+'" d="M28 19l5-5 5 5-5 7z"/><path fill="#fffbed" d="M31 17h3v4h-3zM10 45h2v6h-2zM8 47h6v2H8zM51 12h2v6h-2zM49 14h6v2h-6z"/></svg>';
}
function ultimateArtHTML(id){
 if(id<10||!(albumHasBlueprint(id)||hasLegendBlueprint(id)))return '';
 return '<button class="ultimate-art-button" onclick="openUltimateArt('+id+')">'+ultimatePixelArt(id)+'<span>查看高清寫實武器美術 ↗</span></button>';
}
function openUltimateArt(id){
 if(id<10||!validLegendId(id)||!(albumHasBlueprint(id)||hasLegendBlueprint(id)))return;
 $('ultimateArtTitle').textContent=LEGENDS[id].name+' · 終極武器';$('ultimateArtImage').src=ULTIMATE_ART[id-10];$('ultimateArtImage').alt=LEGENDS[id].name+'高清寫實武器美術';$('ultimateArtInfo').textContent=LEGENDS[id].trait;$('ultimateArtP').style.display='flex';
}