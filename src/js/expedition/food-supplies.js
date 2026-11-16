
let expeditionFoodOpen=false,expeditionFoodSelected=null;
const DISH_SUPPLY_BASE=[[.30,0,0],[.23,.10,0],[.23,0,.08],[.18,.16,0],[.24,.08,.06],[.22,0,.12],[.14,.20,0],[.20,.12,.06],[.26,0,.08],[.18,0,.18]];
function dishSupplyEffect(w){
 const base=DISH_SUPPLY_BASE[w.c],stars=kitchenStars(w),tier=Math.max(0,Math.min(4,w.t||0));if(!base)return null;
 return {heal:Math.min(.5,base[0]+tier*.025+stars*.01+(w.spice==='milk'?.03:0)),attack:base[1]?Math.min(.35,base[1]+tier*.02+stars*.01+(w.spice==='spicy'?.03:0)):0,shield:base[2]?Math.min(.3,base[2]+tier*.015+stars*.01+(w.spice==='herb'?.03:0)):0};
}
function dishSupplyDescription(w){const e=dishSupplyEffect(w);if(!e)return '';return '恢復 '+Math.round(e.heal*100)+'% 本場生命'+(e.attack?' · 下兩次普通攻擊 +'+Math.round(e.attack*100)+'%':'')+(e.shield?' · 獲得 '+Math.round(e.shield*100)+'% 生命上限護盾':'');}
function expeditionFoodOptions(){return expandedGameEnabled()&&kitchenLevel('pack')>0?kitchen.pack.map((w,index)=>({w,index})).filter(x=>x.w?.k==='w'&&Number.isFinite(x.w.fresh)&&x.w.fresh>0&&DISH_SUPPLY_BASE[x.w.c]):[];}
function expeditionFoodReady(b){return !!(b&&b.foodChoice&&b.outcome==='ongoing'&&!b.resolved&&b.hp>0&&b.enemyHp>0&&(b.foodUsed||0)<1);}
function selectExpeditionFood(index){
 if($('expeditionSetup').hidden)return false;if(index===-1)expeditionFoodSelected=null;else{const option=expeditionFoodOptions().find(x=>x.index===index);if(!option)return false;expeditionFoodSelected=option.w;}
 renderExpeditionFoodSetup();return true;
}
function renderExpeditionFoodSetup(){
 const panel=$('expeditionFoodSetup');panel.hidden=!expandedGameEnabled();if(panel.hidden)return;const options=expeditionFoodOptions();if(!options.some(x=>x.w===expeditionFoodSelected))expeditionFoodSelected=null;
 panel.innerHTML='<h3>🍱 戰前料理 · 每場限一份</h3><p class="exp-note">進入戰鬥前選定一份，戰鬥中自行決定使用時機，不能更換或追加。使用才消耗，未使用會留在冰箱。</p><button class="exp-wide" data-exp-food-choice="-1" aria-pressed="'+(!expeditionFoodSelected)+'" onclick="selectExpeditionFood(-1)">不攜帶料理</button>'+(options.length?'<div class="exp-food-list food-loadout">'+options.map(({w,index})=>'<button data-exp-food-choice="'+index+'" aria-pressed="'+(w===expeditionFoodSelected)+'" onclick="selectExpeditionFood('+index+')">'+kitchenArt(w)+'<span><b>'+esc(kitchenItemName(w))+'</b>'+foodTags(w)+'<small>'+dishSupplyDescription(w)+'</small></span></button>').join('')+'</div>':'<p class="exp-note">'+(kitchenLevel('pack')?'冰箱沒有可用料理。':'在訓練所解鎖冰箱，將料理存入後即可攜帶。')+'</p>');
}
function renderExpeditionFood(){
 const panel=$('expeditionFood');panel.hidden=!expandedGameEnabled();if(panel.hidden)return;const b=expeditionState.lastBattle,w=b?.foodChoice,option=expeditionFoodOptions().find(x=>x.w===w);
 if(!w){panel.innerHTML='<p class="exp-note">🍱 本場未攜帶料理；戰鬥中不能追加。</p>';return;}
 if(b.foodUsed){panel.innerHTML='<p class="exp-note">🍱 本場料理已使用：'+esc(kitchenItemName(w))+' · 1/1</p>';return;}
 const effect=dishSupplyEffect(w),full=b.hp>=b.hpMax&&!effect.attack&&!effect.shield,ready=!!option&&expeditionFoodReady(b)&&!full;
 panel.innerHTML='<h3>🍱 本場攜帶料理 · 0/1</h3><div class="exp-food-list"><button data-exp-food="'+(option?.index??-1)+'" onclick="useExpeditionFood('+(option?.index??-1)+')" '+(!ready?'disabled':'')+'>'+kitchenArt(w)+'<span><b>使用 '+esc(kitchenItemName(w))+'</b>'+foodTags(w)+'<small>'+dishSupplyDescription(w)+'</small></span></button></div><p class="exp-note">'+(full?'目前生命全滿，受傷後才可使用這份回血料理。':!option?'這份料理已不在冰箱，無法使用。':'只能使用戰前選定的這一份；不恢復經營愛心。')+'</p>';
}
function toggleExpeditionFood(){expeditionFoodOpen=false;renderExpeditionFood();}
function useExpeditionFood(index){const food=kitchen?.pack[index],b=expeditionState.lastBattle;if(!food||food!==b?.foodChoice||!expeditionFoodReady(b))return false;const ok=stage21_useExpeditionFood(index);if(ok){reviewMetrics.supplies++;const key=food.c+':'+food.t;reviewMetrics.supplyTypes[key]=(reviewMetrics.supplyTypes[key]||0)+1;saveNow();if(sandboxSession)saveReviewProgress();}return ok;}
