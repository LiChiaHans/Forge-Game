

function kitchenTierPalette(t){return [{rim:'#b58b60',light:'#e4c398',dark:'#79583f',plate:'#e4d8bb'},{rim:'#619f8f',light:'#c0ddbb',dark:'#386960',plate:'#e7eee0'},{rim:'#73a9d0',light:'#d2e9f0',dark:'#3f637f',plate:'#eef3e6'},{rim:'#d4ab4f',light:'#ffedb0',dark:'#8b6634',plate:'#fff2d6'},{rim:'#b493d3',light:'#f6dfef',dark:'#5c4a83',plate:'#f3e9f6'}][t];}
function kitchenTierMark(t){const p=kitchenTierPalette(t);return '<g class="kitchen-tier-mark" data-grade="'+t+'"><path fill="#202d35" d="M2 2h14v14H2z"/><path fill="'+p.rim+'" d="M3 3h12v12H3z"/><path fill="'+p.light+'" d="M4 4h10v2H4z"/><text x="9" y="13" fill="#172a32" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">'+(t+1)+'</text></g>';}
function kitchenIngredientArt(t){return expandedGameEnabled()?cozySpriteSVG('ingredient-'+t,64,kitchenTierMark(t),'data-ingredient-grade="'+t+'"',9):cozyLegacy_kitchenIngredientArt(t);}
function kitchenRice(t){let s='<path fill="#cbb98a" d="M18 34h29v11H18zM22 28h21v7H22z"/><path fill="#f4e6ba" d="M19 33h27v9H19zM23 27h18v9H23z"/><path fill="#fff6d8" d="M23 30h4v2h-4zM30 28h4v2h-4zM37 31h4v2h-4zM21 36h3v2h-3zM29 34h3v2h-3zM37 37h4v2h-4z"/>';
 if(t>=1)s+='<path fill="#b5a36f" d="M25 39h2v2h-2zM40 34h2v2h-2z"/>';if(t>=2)s+='<path fill="#57935a" d="M28 29h2v2h-2zM34 36h2v2h-2zM23 35h2v2h-2z"/>';return s;}
function kitchenMeat(t){let s='<path fill="#693e31" d="M17 29h6v-4h20v4h5v14h-7v4H21v-4h-4z"/><path fill="#b86d43" d="M20 29h22v12H20zM24 26h16v4H24z"/><path fill="#de9d67" d="M22 29h5v3h-5zM28 27h9v2h-9zM40 31h3v7h-3z"/><path fill="#653b2c" d="M24 33h16v2H24zM25 39h13v2H25z"/>';
 if(t>=1)s+='<path fill="#e7b278" d="M28 30h2v11h-2zM34 30h2v11h-2z"/>';if(t>=2)s+='<path fill="#f2d298" d="M34 27h6v4h-6z"/><path fill="#fff0b6" d="M35 27h3v2h-3z"/>';if(t>=3)s+='<path fill="#965039" d="M18 43h6v2h-6zM42 43h7v2h-7z"/>';return s;}
function kitchenVegetables(t){let s='<path fill="#41673e" d="M13 30h10v-5h9v8h-8v11H13zM39 30h12v15H39z"/><path fill="#83b561" d="M14 30h8v-3h7v5h-7v7h-8zM41 31h8v5h-8z"/><path fill="#bdce79" d="M17 32h3v3h-3zM42 33h3v2h-3z"/><path fill="#cf7e3e" d="M27 37h5v9h-5zM44 40h4v6h-4z"/>';
 if(t>=1)s+='<path fill="#d87d58" d="M33 34h6v6h-6z"/><path fill="#f2bc77" d="M35 35h2v2h-2z"/>';if(t>=2)s+='<path fill="#edcf76" d="M23 32h4v3h-4zM36 42h4v3h-4z"/>';return s;}
function kitchenDishArt(c,t){return expandedGameEnabled()?cozySpriteSVG('dish-'+c+'-'+t,64,kitchenTierMark(t),'data-dish="'+c+'" data-grade="'+t+'"'):cozyLegacy_kitchenDishArt(c,t);}
const KITCHEN_TOOL_INFO={
 z:{name:'冰水桶',price:500,text:'放到棋盤任意格，全盤爐火餘熱立即歸零；不會清除物品。'},
 f:{name:'清潔工具',price:200,text:'清除指定格的一包食材或一份備料；不能清除完成料理。'},
 u:{name:'精選食材券',price:500,text:'指定一包食材升一階，恢復完整保鮮步數，並觸發相連合成；頂級食材不能再升。'}
};
function kitchenGradeName(t){return (t+1)+'階・'+KITCHEN_GRADES[t];}
function kitchenSpiceBonus(){return 10+5*kitchenLevel('spice');}
function kitchenItemEffect(w){
 if(KITCHEN_TOOL_INFO[w.k])return KITCHEN_TOOL_INFO[w.k].text;
 if(w.k==='spice'){const spice=KITCHEN_SPICES[w.spice];return '在空白且無餘熱的格子建立'+spice.name+'調味格；本晚有效。在這格完成的料理'+spice.effect+'，售價 +'+kitchenSpiceBonus()+'%。每格保留最後使用的一種調味。';}
 if(w.k==='o')return kitchenGradeName(w.t)+'食材；保鮮 '+(14+6*kitchenLevel('fresh'))+' 步，久放會降一階。';
 if(w.k==='m')return '搭配空格附近至少兩包同階食材（相連同階會一起消耗），製作一份'+KITCHEN_TYPES[w.s]+'備料。';
 return '';
}
function kitchenDishStats(w,baseOnly=false){
 const trio=COMBO[w.c].split(''),mult=baseOnly?1:1+[0,.05,.1,.2][kitchenStars(w)],raw={taste:10+8*w.t+trio.filter(s=>s==='1').length*5,fullness:8+6*w.t+trio.filter(s=>s==='0').length*6,aroma:8+7*w.t+trio.filter(s=>s==='2').length*5};
 const boost=baseOnly?undefined:KITCHEN_SPICES[w.spice]?.stat;return Object.fromEntries(Object.entries(raw).map(([key,value])=>[key,Math.round(value*mult*(boost===key?1.2:1))]));
}
function kitchenRecipeStrip(c,labels=false){if(c===null)return '<small class="kitchen-any-recipe">任意三份備料</small>';return '<div class="kitchen-recipe-strip" aria-label="配方：'+COMBO[c].split('').map(s=>KITCHEN_TYPES[+s]).join('＋')+'">'+COMBO[c].split('').map((s,i)=>(i?'<em>＋</em>':'')+'<span>'+kitchenProcessArt(+s)+(labels?'<small>'+KITCHEN_TYPES[+s]+'</small>':'')+'</span>').join('')+'</div>';}