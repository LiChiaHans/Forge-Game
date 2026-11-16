
let kitchenCancelTarget=null;
function selectKitchenIngredients(){if(!kitchen||kitchen.done)return;kitchen.useHeld=false;kitchen.mode='ore';kitchen.message=kitchen.hand?'放食材模式：手持物品保留，拖曳手持物品才使用。':'放食材模式：點空格或拖曳第一包食材。';renderKitchen();}
function selectKitchenProcess(){if(!kitchen||kitchen.done)return;kitchen.useHeld=false;kitchen.mode=kitchen.mode==='prep'?'ore':'prep';renderKitchen();}
function selectKitchenHeld(){if(!kitchen?.hand)return;kitchen.useHeld=true;kitchen.mode='ore';kitchen.message='已選取'+kitchenItemName(kitchen.hand)+'：點棋盤使用，或直接拖曳。點接下來的食材可繼續放食材。';renderKitchen();}
function cancelKitchenOrder(index){
 const order=kitchen?.orders[index];if(!order||order!==kitchenCancelTarget||kitchenMergeJobs.size||kitchen.done||lives<=0)return false;kitchenCancelTarget=null;lives=Math.max(0,lives-1);kitchen.cancelled=(kitchen.cancelled||0)+1;$('kitchenModal').hidden=true;kitchenRemoveOrder(index);kitchen.message='已取消訂單，生命 -1。';
 if(lives<=0){renderKitchen();gameOver('取消晚餐訂單，最後一顆愛心已用完。');return true;}if(!kitchen.orders.length&&!kitchen.queue.length)completeKitchenNight();renderKitchen();saveNow();return true;
}