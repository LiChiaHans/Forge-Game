

const DECOR_SEASONS=['spring','summer','autumn','winter'];
const TOWN_NIGHT_COLOR_MATRIX='.30 0 0 0 .015 0 .40 0 0 .025 0 0 .64 0 .065 0 0 0 1 0';
const DECOR_CATALOG=[
 ['tree','庭園樹',150,'all','tree',48,66],['lamp','暖光路燈',220,'all','lamp',30,56],['bench','木製長椅',180,'all','bench',44,28],['fountain','石造噴水池',850,'all','fountain',116,116],['flowers','小花叢',80,'all','flowers',25,22],['fence','木柵欄',100,'all','fence',52,28],['cat','小貓',600,'all','cat',26,26],['dog','小狗',600,'all','dog',28,28],
 ['sp-cherry','櫻花樹',650,'spring','cherry',58,72],['sp-tulips','鬱金香花圃',200,'spring','tulips',40,32],['sp-daisy','雛菊花盆',160,'spring','daisy',29,34],['sp-arch','蝴蝶花拱門',750,'spring','flowerarch',70,76],['sp-rabbit','白兔石像',380,'spring','rabbit',34,42],['sp-picnic','春日野餐',420,'spring','picnic',58,34],['sp-windmill','花園風車',520,'spring','windmill',42,70],['sp-birdhouse','小鳥屋',280,'spring','birdhouse',32,58],['sp-clover','幸運草石',240,'spring','clover',34,31],['sp-lantern','花瓣燈',360,'spring','blossomlamp',31,55],
 ['su-palm','夏日棕櫚',500,'summer','palm',58,76],['su-chair','躺椅',240,'summer','deckchair',48,38],['su-parasol','海藍陽傘',420,'summer','parasol',64,65],['su-watermelon','西瓜攤',550,'summer','melonstall',59,53],['su-surf','衝浪板架',280,'summer','surf',40,57],['su-castle','沙堡',360,'summer','sandcastle',56,48],['su-sunlamp','太陽燈',400,'summer','sunlamp',36,62],['su-pond','荷花池',650,'summer','pond',63,42],['su-sunflowers','向日葵花圃',260,'summer','sunflowers',44,49],['su-tiki','熱帶圖騰',450,'summer','tiki',28,62],
 ['au-maple','紅楓樹',650,'autumn','maple',58,74],['au-pumpkin','南瓜堆',220,'autumn','pumpkins',43,32],['au-scarecrow','稻草人',380,'autumn','scarecrow',46,63],['au-cart','豐收草車',550,'autumn','haycart',62,47],['au-mushrooms','蘑菇圈',260,'autumn','mushrooms',49,31],['au-basket','豐收果籃',200,'autumn','basket',34,30],['au-leaves','落葉小丘',100,'autumn','leafpile',46,26],['au-acornbench','橡實長椅',420,'autumn','acornbench',50,35],['au-owl','貓頭鷹石像',400,'autumn','owl',32,43],['au-lantern','琥珀燈',360,'autumn','amberlamp',31,58],
 ['wi-pine','積雪松樹',550,'winter','snowpine',52,76],['wi-snowman','雪人',220,'winter','snowman',37,52],['wi-crystal','冰晶叢',380,'winter','icecrystal',43,47],['wi-gifts','禮物堆',300,'winter','gifts',44,37],['wi-sleigh','冬日雪橇',500,'winter','sleigh',64,41],['wi-reindeer','小麋鹿',650,'winter','reindeer',47,52],['wi-cocoa','熱可可攤',600,'winter','cocoastall',58,54],['wi-arch','冰晶拱門',800,'winter','icearch',67,77],['wi-banner','雪花旗',260,'winter','snowbanner',37,61],['wi-starlamp','星光燈',450,'winter','starlamp',36,64]
].map(([id,name,price,season,art,w,h])=>({id,name,price,season,art,w,h}));
const DECOR_BY_ID=new Map(DECOR_CATALOG.map(d=>[d.id,d]));
function decorSVG(id,season=seasonIndex(),uid='preview'){
 const svg=cozyDecorSVG(...arguments);
 if(!DECOR_BY_ID.get(id)?.night)return svg;
 const filter='decor-moonlight-'+String(id+'-'+uid).replace(/[^a-zA-Z0-9_-]/g,'');
 return svg.replace(/<svg\b([^>]*)>/,'<svg$1 data-night-palette="3"><defs><filter id="'+filter+'" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="'+TOWN_NIGHT_COLOR_MATRIX+'"/></filter></defs><g filter="url(#'+filter+')">').replace(/<\/svg>\s*$/,'</g></svg>');
}
