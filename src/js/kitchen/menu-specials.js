const KITCHEN_STAT_NAMES={taste:'滋味',fullness:'飽足',aroma:'香氣'};
function kitchenSpecial(){if(!kitchen.special||kitchen.special.day!==day)kitchen.special={day,recipe:null,locked:kitchen.turn>0,sold:0};return kitchen.special;}
function openKitchenSpecial(){
 const special=kitchenSpecial(),editable=!kitchen.done&&!special.locked&&kitchen.turn===0;
 kitchenModal('今晚主打菜','<p>主打菜成交價額外 +20%；選擇後會有一張指定主打訂單。第一步前可更換，開始營業後固定。'+(editable?'':'本晚已開始，明晚可重新選擇。')+'</p><div class="kitchen-recipe-list">'+KITCHEN_NAMES.map((name,c)=>'<button '+(!editable?'disabled':'')+' aria-pressed="'+(special.recipe===c)+'" onclick="chooseKitchenSpecial('+c+')">'+kitchenArt({k:'w',c,t:0})+'<b>'+name+'</b>'+kitchenRecipeStrip(c)+'</button>').join('')+'</div>');
}
function chooseKitchenSpecial(recipe){
 const special=kitchenSpecial();if(!Number.isInteger(recipe)||recipe<0||recipe>9||special.locked||kitchen.turn>0||kitchen.done)return false;
 special.recipe=recipe;const list=[...kitchen.orders,...kitchen.queue],o=list.find(x=>x.specialOrder)||list.find(x=>x.c!==null&&!x.need);
 if(o){o.c=recipe;o.specialOrder=true;}
 $('kitchenModal').hidden=true;kitchen.message='今晚主打：'+KITCHEN_NAMES[recipe]+'，成交額外 +20%。開始第一步後固定。';renderKitchen();saveNow();return true;
}
function kitchenSpecialLabel(){const s=kitchenSpecial();return s.recipe===null?'主打未選':('主打 '+KITCHEN_NAMES[s.recipe]);}
function assignKitchenStatOrder(list){
 if(day<4)return;const o=list.find(x=>x.c===null);if(!o)return;const key=['taste','fullness','aroma'][(day-4)%3];o.need={key,value:{taste:15+8*o.t,fullness:20+6*o.t,aroma:18+7*o.t}[key]};
}
function kitchenNeedText(o){return o?.need?KITCHEN_STAT_NAMES[o.need.key]+' ≥'+o.need.value:'';}
function kitchenRequirementFailure(w,o){if(!o?.need)return '';const value=kitchenDishStats(w)[o.need.key];return value<o.need.value?'這位客人需要'+kitchenNeedText(o)+'，目前為 '+value+'。':'';}
function kitchenOrderRecipeHTML(o){return o.need?'<small class="kitchen-stat-need">'+kitchenNeedText(o)+' · 合格訂單額外 +10%</small>':kitchenRecipeStrip(o.c);}
function kitchenMenuBonus(w){return kitchenSpecial().recipe===w.c?.2:0;}
function validateKitchenMenu(k){
 const s=k.special;k.special=s&&s.day===k.day&&(s.recipe===null||Number.isInteger(s.recipe)&&s.recipe>=0&&s.recipe<10)?{day:s.day,recipe:s.recipe,locked:!!s.locked||k.turn>0,sold:Number.isSafeInteger(s.sold)&&s.sold>=0?s.sold:0}:{day:k.day,recipe:null,locked:k.turn>0,sold:0};
 for(const o of [...k.orders,...k.queue])if(o.need&&(!Object.hasOwn(KITCHEN_STAT_NAMES,o.need.key)||!Number.isSafeInteger(o.need.value)||o.need.value<1||o.need.value>300))throw new Error('餐廳狀態需求錯誤');return k;
}

function kitchenProcessWeights(){const weights=[1,1,1];for(const o of kitchen?.orders||[]){if(o.c!==null)for(const s of COMBO[o.c])weights[+s]++;else if(o.need)weights[{fullness:0,taste:1,aroma:2}[o.need.key]]+=2;}return weights;}
function kitchenRollProcess(){const weights=kitchenProcessWeights();let value=Math.random()*weights.reduce((a,b)=>a+b,0);for(let s=0;s<3;s++){value-=weights[s];if(value<0)return s;}return 2;}
