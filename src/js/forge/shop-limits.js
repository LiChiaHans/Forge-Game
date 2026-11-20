
const SHOP_LIMIT={m:3,tool:1,o:3};
function shopRemaining(type){return Math.max(0,SHOP_LIMIT[type]-(shopBought[type]||0));}
function useLifePotion(){
  if(lives>=3){toast('❤️ 愛心已滿，不能使用生命藥水。');say('❤️ 愛心已滿，不能使用生命藥水，藥水未消耗。');render();return;}
  lives=Math.min(3,lives+1);hand=null;say('🧪 生命藥水！恢復一顆愛心。');render();playWorkshopToolFX('grid','heal');saveNow();
}