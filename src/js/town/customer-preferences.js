
let forgeGuestSerial22=0,kitchenGuestSerial22=0;
function guestForOrder22(index,night){const id=((Math.floor(runId/1000)%16)+(day-1)*7+(night?3:0)+index)%16;return {id,role:TOWN_GUEST_ROLES[Math.floor(id/2)],gender:id%2?'女':'男'};}
function guestPreferenceText(o,food){
 const role=o?.guest?.role;if(!role)return '';const text=food?{劍士:'兩份以上主菜',法師:'有調味加成',遊俠:'兩份以上配菜',僧侶:'濃湯或兩份配菜',盜賊:'耐心剩一半以上',吟遊詩人:'香氣至少25',商人:'耐心剩一半以上',饕客:'高於需求一階或有星級'}:{劍士:'兩份以上刃胚',法師:'有魔法、屬性或寶石',遊俠:'兩份以上柄胚',僧侶:'兩份以上盾胚',盜賊:'利爪或盾刃',吟遊詩人:'有魔法或寶石',商人:'耐心剩一半以上',饕客:'高於需求一階'};return role+'喜好：'+text[role]+'；符合時成交價 +10%，其他合格商品仍可交付。';
}
function guestPreferenceBonus(w,o,food){
 if(!expandedGameEnabled()||!o?.guest||!w)return 0;const role=o.guest.role,parts=COMBO[w.c]?.split('')||[],count=s=>parts.filter(x=>x===s).length,fast=o.wait>=o.max*.5,enchanted=(w.m||0)>0||(w.b||0)>0||elementOf(w)!=='none';let yes=false;
 if(food){yes=({劍士:()=>count('1')>=2,法師:()=>!!w.spice,遊俠:()=>count('2')>=2,僧侶:()=>w.c===8||count('2')>=2,盜賊:()=>fast,吟遊詩人:()=>kitchenDishStats(w).aroma>=25,商人:()=>fast,饕客:()=>w.t>o.t||kitchenStars(w)>0}[role]||(()=>false))();}
 else yes=({劍士:()=>count('0')>=2,法師:()=>enchanted,遊俠:()=>count('2')>=2,僧侶:()=>count('1')>=2,盜賊:()=>[0,2].includes(w.c),吟遊詩人:()=>(w.m||0)>0||(w.b||0)>0,商人:()=>fast,饕客:()=>w.t>o.t}[role]||(()=>false))();return yes?.1:0;
}
function guestBadge22(o,food){return expandedGameEnabled()&&o?.guest?'<em class="guest-like22" title="'+esc(guestPreferenceText(o,food))+'">♥10%</em>':'';}
function orderGuestHTML(o){const guest=o?.guest;return expandedGameEnabled()&&guest&&TOWN_GUEST_ART[guest.id]?'<span class="order-guest" role="img" aria-label="'+esc(guest.gender+guest.role)+'">'+townGuestArt(guest.id)+'</span>':'';}
function ensureOrderGuests22(){[orders.concat(dq),[...(kitchen?.orders||[]),...(kitchen?.queue||[])]].forEach((list,night)=>list.forEach((o,i)=>{if(!o.guest)o.guest=guestForOrder22(i,!!night);}));}
