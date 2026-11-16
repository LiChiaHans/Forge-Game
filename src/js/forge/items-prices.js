

const pat=()=>1;
const cozyLegacySvg=(c,t=0)=>`<svg viewBox="0 0 48 48" shape-rendering="crispEdges"><image href="${UNITY_ART['weapon'+c+'_'+t]}" width="48" height="48" style="image-rendering:pixelated"/></svg>`;
const svg=(c,t=0)=>expandedGameEnabled()?cozySpriteSVG('weapon-'+c+'-'+t,48):cozyLegacySvg(c,t);
const hex=(c,bg,cls="",t=0,w=null)=>`<div class="hxo ${cls}${isLegend(w)?" legendary":""}"><div class="hxi" style="background:${bg}">${isLegend(w)?legendWeaponSVG(w.legendId):svg(c,t)}</div>${weaponStarsHTML(w)}${w?.protected?'<span class="weapon-protected" aria-label="受保護武器">🔒</span>':''}${validElement(w?.element)?'<span class="weapon-element-icon" style="--element:'+ELEMENTS[w.element].color+'" aria-label="'+ELEMENTS[w.element].name+'屬性">'+elementIcon(w.element)+'</span>':''}</div>`;
const price=(t,c)=>Math.round(PR[t]*MUL[c]);
const cozyLegacyTok=(bg,tx,b)=>`<div class="${b?"t o":"q"}" style="background-color:${bg}">${tx}</div>`;
const tok=(bg,tx,b)=>expandedGameEnabled()&&C.includes(bg)?cozyOreMarkup(C.indexOf(bg),b):cozyLegacyTok(bg,tx,b);
const itemH=(h,b)=>h.k==='ess'?'<span class="essence-icon">'+essenceArt(h.element)+'</span>':h.k==='seed'?'<span class="seed-icon">'+seedPacketArt(h.element)+'</span>':h.k==='bp'?'<span class="bp-item-icon">'+legendBlueprintSVG(h.id)+'</span>':h.k==='m'?mold(h.s,"","f")
  :h.k==='d'?gem(h.t,"f")
  :h.k==='f'?tok("#c0392b","🔥",b)
  :h.k==='u'?tok("#2f7de1","⬆️",b)
  :h.k==='z'?tok("#54a4cc","❄️",b)
  :h.k==='l'?tok("#b94568","🧪",b)
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
const stage21_salePrice=(w,o)=>Math.round(
  (wp(w)*(o.c===null?1:1.3)*pat(o)+(w.m||0))*(1+.1*sk('mc'))*(1+seasonSaleBonus(w))
);
const salePrice=(w,o)=>Math.round(stage21_salePrice(w,o)*(1+guestPreferenceBonus(w,o,false)));

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