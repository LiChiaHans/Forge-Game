
let expeditionFoodOpen=false;
const DISH_SUPPLY_BASE=[[.30,0,0],[.23,.10,0],[.23,0,.08],[.18,.16,0],[.24,.08,.06],[.22,0,.12],[.14,.20,0],[.20,.12,.06],[.26,0,.08],[.18,0,.18]];
function dishSupplyEffect(w){
 const base=DISH_SUPPLY_BASE[w.c],stars=kitchenStars(w),tier=Math.max(0,Math.min(4,w.t||0));if(!base)return null;
 return {heal:Math.min(.5,base[0]+tier*.025+stars*.01+(w.spice==='milk'?.03:0)),attack:base[1]?Math.min(.35,base[1]+tier*.02+stars*.01+(w.spice==='spicy'?.03:0)):0,shield:base[2]?Math.min(.3,base[2]+tier*.015+stars*.01+(w.spice==='herb'?.03:0)):0};
}
function dishSupplyDescription(w){const e=dishSupplyEffect(w);if(!e)return '';return '恢復 '+Math.round(e.heal*100)+'% 本場生命'+(e.attack?' · 下兩次普通攻擊 +'+Math.round(e.attack*100)+'%':'')+(e.shield?' · 獲得 '+Math.round(e.shield*100)+'% 生命上限護盾':'');}
function expeditionFoodOptions(){return expandedGameEnabled()&&kitchenLevel('pack')>0?kitchen.pack.map((w,index)=>({w,index})).filter(x=>x.w?.k==='w'&&Number.isFinite(x.w.fresh)&&x.w.fresh>0&&DISH_SUPPLY_BASE[x.w.c]):[];}
function expeditionFoodReady(b){return !!(b&&b.outcome==='ongoing'&&!b.resolved&&b.hp>0&&b.enemyHp>0&&(b.foodUsed||0)<2&&!(b.foodCooldown>0));}
function renderExpeditionFood(){
 const panel=$('expeditionFood');panel.hidden=!expandedGameEnabled();if(!expandedGameEnabled())return;const b=expeditionState.lastBattle,food=sortedFoods(expeditionFoodOptions(),supplyFilter,supplySort),key=[supplyFilter,supplySort,expeditionFoodOpen,kitchenLevel('pack'),b?.outcome,b?.resolved,b?.foodUsed||0,b?.foodCooldown||0,food.map(x=>[x.index,x.w.c,x.w.t,x.w.spice,kitchenStars(x.w)].join(':')).join('|')].join(';');if(panel.dataset.foodKey===key)return;panel.dataset.foodKey=key;
 const status=!kitchenLevel('pack')?'先到訓練所解鎖冰箱，再把完成料理存入冰箱。':!food.length?'冰箱沒有可用料理。完成料理後，拖進冰箱即可帶往遠征。':(b?.foodUsed||0)>=2?'本場已使用兩份料理。':b?.foodCooldown>0?'再普通攻擊 '+b.foodCooldown+' 次可使用下一份。':'每場最多兩份，使用後間隔兩次普通攻擊。';
 panel.innerHTML='<button class="exp-wide food-toggle" onclick="toggleExpeditionFood()">🍱 冰箱補給 · '+(b?.foodUsed||0)+'/2 · '+food.length+' 份可用 '+(expeditionFoodOpen?'▴':'▾')+'</button><p class="exp-note">'+status+'</p>'+(expeditionFoodOpen?foodViewControls('supply',supplyFilter,supplySort)+'<div class="exp-food-list">'+food.map(({w,index})=>'<button data-exp-food="'+index+'" onclick="useExpeditionFood('+index+')" '+(!expeditionFoodReady(b)?'disabled':'')+'>'+kitchenArt(w)+'<span><b>'+esc(kitchenItemName(w))+'</b>'+foodTags(w)+'<small>'+dishSupplyDescription(w)+'</small></span></button>').join('')+'</div><p class="exp-note">只消耗發動的那一份；不回復經營愛心，戰鬥結束後不能使用。</p>':'');
}
function toggleExpeditionFood(){expeditionFoodOpen=!expeditionFoodOpen;renderExpeditionFood();}
function useExpeditionFood(index){const food=kitchen?.pack[index],ok=stage21_useExpeditionFood(index);if(ok){reviewMetrics.supplies++;if(food){const key=food.c+':'+food.t;reviewMetrics.supplyTypes[key]=(reviewMetrics.supplyTypes[key]||0)+1;}saveReviewProgress();}return ok;}