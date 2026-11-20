

const pat=()=>1;
const svg=(c,t=0)=>cozySpriteSVG('weapon-'+c+'-'+t,48);
const hex=(c,bg,cls="",t=0,w=null)=>`<div class="hxo ${cls}${isLegend(w)?" legendary":""}"><div class="hxi" style="background:${bg}">${isLegend(w)?legendWeaponSVG(w.legendId):svg(c,t)}</div>${weaponStarsHTML(w)}${w?.protected?'<span class="weapon-protected" aria-label="受保護武器">🔒</span>':''}${validElement(w?.element)?'<span class="weapon-element-icon" style="--element:'+ELEMENTS[w.element].color+'" aria-label="'+ELEMENTS[w.element].name+'屬性">'+elementIcon(w.element)+'</span>':''}</div>`;
const price=(t,c)=>Math.round(PR[t]*MUL[c]);
const tok=(bg,tx,b)=>C.includes(bg)?cozyOreMarkup(C.indexOf(bg),b):`<div class="${b?"t o":"q"}" style="background-color:${bg}">${tx}</div>`;
function forgeToolArt(k){
 const wrap=body=>'<svg viewBox="0 0 64 64" shape-rendering="crispEdges" aria-hidden="true">'+body+'</svg>';
 if(k==='f')return wrap('<path fill="#271718" d="M27 5h10v6h5v6h5v7h5v17h-5v9H40v6H24v-6h-7v-9h-5V24h5v-7h5v-6h5z"/><path fill="#b8341c" d="M29 9h6v6h5v6h5v6h3v13h-4v7h-6v5H26v-5h-6v-7h-4V27h3v-6h5v-6h5z"/><path fill="#eb7a28" d="M29 16h6v6h5v6h3v11h-4v6h-5v4H30v-4h-5v-6h-4V28h3v-6h5z"/><path fill="#ffe47a" d="M29 25h6v5h4v9h-4v5h-6v-5h-4v-9h4z"/><path fill="#fffbe0" d="M30 31h4v8h-4z"/><path fill="#5d422d" d="M15 47h34v7H15z"/><path fill="#d8a852" d="M17 49h30v3H17z"/><path fill="#fff0b8" d="M20 49h8v2h-8zM47 13h3v3h-3zM14 17h3v3h-3z"/>');
 if(k==='u')return wrap('<path fill="#1e2230" d="M28 4h8v6h6v6h6v6h6v9H42v25H22V31H10v-9h6v-6h6v-6h6z"/><path fill="#3168b8" d="M30 8h4v6h6v6h6v5h4v3H38v24H26V28H14v-3h4v-5h6v-6h6z"/><path fill="#66b0f5" d="M30 11h4v6h5v5h5v3H36v23h-8V25h-8v-3h5v-5h5z"/><path fill="#ffe37a" d="M30 14h4v12h4v19h-4v-7h-4v7h-4V26h4z"/><path fill="#fff8d6" d="M31 15h2v14h-2zM13 10h2v6h-2zM11 12h6v2h-6zM50 38h2v6h-2zM48 40h6v2h-6z"/>');
 if(k==='z')return wrap('<path fill="#162838" d="M27 5h10v8h7v4h8v9h-6v12h6v9h-8v4h-7v8H27v-8h-7v-4h-8v-9h6V26h-6v-9h8v-4h7z"/><path fill="#489fd4" d="M29 8h6v10h6v-4h7v7h-6v6h6v10h-6v6h6v7h-7v-4h-6v10h-6V46h-6v4h-7v-7h6v-6h-6V27h6v-6h-6v-7h7v4h6z"/><path fill="#9ee5ff" d="M30 10h4v18h14v4H34v22h-4V32H16v-4h14z"/><path fill="#9ee5ff" d="M20 18h5v5h-5zM39 18h5v5h-5zM20 41h5v5h-5zM39 41h5v5h-5z"/><path fill="#ffffff" d="M29 27h6v10h-6zM27 29h10v6H27zM31 12h2v10h-2zM31 42h2v10h-2zM14 31h10v2H14zM40 31h10v2H40z"/>');
 if(k==='l')return wrap('<path fill="#271620" d="M24 6h16v9h-3v6h6v4h7v7h3v15h-4v7h-7v4H22v-4h-7v-7h-4V32h3v-7h7v-4h6v-6h-3z"/><path fill="#9d6d42" d="M27 8h10v6H27z"/><path fill="#d8ab72" d="M28 9h5v4h-5z"/><path fill="#bfe4ee" d="M27 15h10v7H27zM18 25h28v25H18z"/><path fill="#cf3058" d="M16 32h32v15h-4v6H20v-6h-4z"/><path fill="#f25e84" d="M18 33h28v10H18zM22 29h8v5h-8zM34 29h8v5h-8z"/><path fill="#ffb3c8" d="M21 35h5v6h-5zM28 17h3v5h-3z"/><path fill="#fff3f7" d="M22 36h3v3h-3zM29 18h2v2h-2z"/><path fill="#ffd978" d="M25 21h14v3H25z"/>');
 return '';
}
const itemH=(h,b)=>h.k==='ess'?'<span class="essence-icon">'+essenceArt(h.element)+'</span>':h.k==='seed'?'<span class="seed-icon">'+seedPacketArt(h.element)+'</span>':h.k==='bp'?'<span class="bp-item-icon">'+legendBlueprintSVG(h.id)+'</span>':h.k==='m'?mold(h.s,"","f")
  :h.k==='d'?gem(h.t,"f")
  :h.k==='f'||h.k==='u'||h.k==='z'||h.k==='l'?'<span class="forge-tool-icon" data-tool="'+h.k+'">'+forgeToolArt(h.k)+'</span>'
  :h.k==='p'?mold(h.s,C[h.t],"f")
  :h.k==='w'?hex(h.c,bands(h),"",h.t,h)
  :tok(C[h.t],NM[h.t],b);
const itemName=h=>h.k==='ess'?ELEMENTS[h.element].name+'之精華':h.k==='seed'?ELEMENTS[h.element].name+'之花種子':h.k==='m'?TY[h.s]+"模"
  :h.k==='f'?"焚燒工具"
  :h.k==='u'?"礦石升級"
  :h.k==='z'?"暴風雪"
  :h.k==='l'?"生命藥水"
  :h.k==='p'?NM[h.t]+TY[h.s]+"胚"
  :h.k==='bp'?legendKind(h.id)+'藍圖：'+LEGENDS[h.id].name
  :h.k==='w'?(isLegend(h)?LEGENDS[h.legendId].name:NM[h.t]+"級"+WN[h.c])
  :h.k==='o'?NM[h.t]+"礦":NM[h.t]+"鑽";
const itemKey=h=>h.k==='ess'||h.k==='seed'?h.k+':'+h.element:h.k==='bp'?'bp'+h.id:h.k==='w'||h.k==='p'?h.k+JSON.stringify(h):h.k+(h.s!==undefined?"s"+h.s:"")+(h.t!==undefined?"t"+h.t:"");
/* 品質門檻維持平均階級無條件捨去；售價另依實際材料計算。
   舊武器若缺少 cs，沿用原品質基價；不改動存檔結構。 */
const materialPrice=w=>{
  const base=price(w.t,w.c);
  if(!Array.isArray(w.cs)||w.cs.length!==3||
    !w.cs.every(t=>Number.isInteger(t)&&t>=0&&t<PR.length))return base;
  return Math.max(base,Math.round(w.cs.reduce((sum,t)=>sum+price(t,w.c),0)/3));
};
const materialGain=w=>materialPrice(w)-price(w.t,w.c);
const materialNote=w=>"材料基價 "+materialPrice(w)+" 金幣"
  +(materialGain(w)>0?"（混材 +"+materialGain(w)+"）":"");
const wp=w=>Math.round((isUltimate(w)?ultimateSaleQuote(w):isLegend(w)?Math.max(0,Math.round(w.legendPrice||0)):Math.round(materialPrice(w)*(1+(w.b||0))))*(validElement(w.element)?1.2:1)*(1+weaponStarBonus(w)));
const recipe=c=>COMBO[c].split("").map(x=>TY[x]).join("");
const oPrice=o=>o.c===null?PR[o.t]:Math.round(price(o.t,o.c)*1.3);
const medalWeaponSaleBonus=w=>{const b=medalBonuses();return b.weaponSale+(validElement(w?.element)?b.elementWeaponSale:0);};
const salePrice=(w,o)=>Math.round(
  Math.round((wp(w)*(o.c===null?1:1.3)*pat(o)+(w.m||0))*(1+.1*sk('mc'))*(1+seasonSaleBonus(w)))*(1+guestPreferenceBonus(w,o,false))*(1+medalWeaponSaleBonus(w))*(1+(typeof forgeSaleMomentumBonus==='function'?forgeSaleMomentumBonus(w,o):0))
);

function ov(t,p,b,f){
  $("ovt").textContent=t;$("ovp").textContent=p;$("ovb").textContent=b;
  $("ovb").onclick=()=>{$("ov").style.display="none";f()};
  $("ov").style.display="flex";
}
function nb(i){
  const x=i%W,r=[];
  if(i>=W)r.push(i-W);
  if(i<W*(H-1))r.push(i+W);
  if(x>0)r.push(i-1);
  if(x<W-1)r.push(i+1);
  return r;
}
function group(i,board=g){
  const c=board[i],seen=[i];
  for(let q=0;q<seen.length;q++)nb(seen[q]).forEach(j=>{
    const n=board[j];
    if(n&&!seen.includes(j)&&n.k===c.k&&
      (c.k==='p'||(n.t===c.t&&n.s===c.s)))seen.push(j);
  });
  return seen;
}