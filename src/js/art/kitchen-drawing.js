

function kitchenTierPalette(t){return [{rim:'#b58b60',light:'#e4c398',dark:'#79583f',plate:'#e4d8bb'},{rim:'#619f8f',light:'#c0ddbb',dark:'#386960',plate:'#e7eee0'},{rim:'#73a9d0',light:'#d2e9f0',dark:'#3f637f',plate:'#eef3e6'},{rim:'#d4ab4f',light:'#ffedb0',dark:'#8b6634',plate:'#fff2d6'},{rim:'#b493d3',light:'#f6dfef',dark:'#5c4a83',plate:'#f3e9f6'}][t];}
function kitchenTierMark(t){const p=kitchenTierPalette(t);return '<g class="kitchen-tier-mark" data-grade="'+t+'"><path fill="#202d35" d="M2 2h14v14H2z"/><path fill="'+p.rim+'" d="M3 3h12v12H3z"/><path fill="'+p.light+'" d="M4 4h10v2H4z"/><text x="9" y="13" fill="#172a32" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">'+(t+1)+'</text></g>';}
function kitchenIngredientArt(t){return cozySpriteSVG('ingredient-'+t,64,kitchenTierMark(t),'data-ingredient-grade="'+t+'"',9);}
function kitchenDishArt(c,t){return cozySpriteSVG('dish-'+c+'-'+t,64,kitchenTierMark(t),'data-dish="'+c+'" data-grade="'+t+'"');}
const KITCHEN_TOOL_INFO={
 z:{name:'冰水桶',price:500,text:'放到棋盤任意格，全盤爐火餘熱立即歸零；不會清除物品。'},
 f:{name:'清潔工具',price:200,text:'清除指定格的一包食材或一份備料；不能清除完成料理。'},
 u:{name:'精選食材券',price:500,text:'指定一包食材升一階，並觸發相連合成；頂級食材不能再升。'}
};
function kitchenGradeName(t){return (t+1)+'階・'+KITCHEN_GRADES[t];}
function kitchenSpiceBonus(){return 10+5*kitchenLevel('spice');}
function kitchenItemEffect(w){
 if(KITCHEN_TOOL_INFO[w.k])return KITCHEN_TOOL_INFO[w.k].text;
 if(w.k==='spice'){const spice=KITCHEN_SPICES[w.spice];return '在空白且無餘熱的格子建立'+spice.name+'調味格；本晚有效。在這格完成的料理'+spice.effect+'，售價 +'+kitchenSpiceBonus()+'%。每格保留最後使用的一種調味。';}
 if(w.k==='o')return kitchenGradeName(w.t)+'食材；不會腐壞，可保留到需要備料時使用。';
 if(w.k==='m')return '搭配空格附近至少兩包同階食材（相連同階會一起消耗），製作一份'+KITCHEN_TYPES[w.s]+'備料。';
 return '';
}
function kitchenDishStats(w,baseOnly=false){
 const trio=COMBO[w.c].split(''),mult=baseOnly?1:1+[0,.05,.1,.2][kitchenStars(w)],raw={taste:10+8*w.t+trio.filter(s=>s==='1').length*5,fullness:8+6*w.t+trio.filter(s=>s==='0').length*6,aroma:8+7*w.t+trio.filter(s=>s==='2').length*5};
 const boost=baseOnly?undefined:KITCHEN_SPICES[w.spice]?.stat;return Object.fromEntries(Object.entries(raw).map(([key,value])=>[key,Math.round(value*mult*(boost===key?1.2:1))]));
}
function kitchenRecipeStrip(c,labels=false){if(c===null)return '<small class="kitchen-any-recipe">任意三份備料</small>';return '<div class="kitchen-recipe-strip" aria-label="配方：'+COMBO[c].split('').map(s=>KITCHEN_TYPES[+s]).join('＋')+'">'+COMBO[c].split('').map((s,i)=>(i?'<em>＋</em>':'')+'<span>'+kitchenProcessArt(+s)+(labels?'<small>'+KITCHEN_TYPES[+s]+'</small>':'')+'</span>').join('')+'</div>';}
