

const rollM=()=>{
  if(Math.random()<.12&&sk('gc')>0)return 3;
  const w=[1,1,1];
  (orders||[]).forEach(o=>{
    if(o.c!==null)COMBO[o.c].split("").forEach(d=>w[+d]+=1);
  });
  let r=Math.random()*(w[0]+w[1]+w[2]);
  for(let k=0;k<3;k++){r-=w[k];if(r<0)return k}
  return 2;
};
const packCap=()=>[0,2,4,6][sk('wb')];
const syncPack=()=>{while(pack.length<packCap())pack.push(null)};
function packHTML(){const cap=packCap();return Array.from({length:6},(_,k)=>{
  const locked=k>=cap,w=locked?null:pack[k];
  return `<button class="chest-slot${locked?' locked':''}" data-take="${k}" ${locked||!w?'disabled':''} aria-label="${locked?'尚未解鎖':w?'取出'+itemName(w):'空格'}">${locked?'🔒':w?'<div class="chest-weapon">'+hex(w.c,bands(w),'',w.t,w)+mb(w)+'</div><small>'+itemName(w)+'</small>':'<span>空</span>'}</button>`;
}).join('');}
function openChest(){render();$('chestP').style.display='flex';}
function storeWeapon(w,clear){
  syncPack();const cap=packCap(),slot=pack.findIndex((x,i)=>i<cap&&!x);
  if(slot<0){toast(cap?'📦 武器箱已滿':'🔒 請先升級武器箱技能');render();return false;}
  pack[slot]=w;clear();say('📦 武器已收納，點擊箱子可取到手持欄');settle();return true;
}
$('chestItems').onclick=e=>{
  const button=e.target.closest('[data-take]');if(!button||button.disabled||busy)return;
  const i=+button.dataset.take,w=pack[i];if(i>=packCap()||!w)return;
  if(hand!==null){toast('請先清空手持欄，再取出武器');return;}
  hand=w;pack[i]=null;closeP('chestP');say('已拿起'+itemName(w)+'，拖到棋盤空格或客人身上');render();saveNow();
};
const sellable=w=>orders.some(o=>(o.c===null||o.c===w.c)&&w.t>=o.t);
function rollOre(){
  const T=[[],[[1,2]],[[1,4],[2,2]],[[1,6],[2,4],[3,2]]][sk('mn')];
  const r=Math.random()*100;let a=0;
  for(const [t,pc] of T){a+=pc;if(r<a)return t}
  return 0;
}
const SK={
  mm:{
    n:"合成大師",i:"⚒️",
    d:["可以將礦石合成升階",
       "合成武器後掉落的礦石，有 25% 是材料礦石之一，其餘為銅礦",
       "掉落材料礦石的機率提高到 50%"]
  },
  cd:{n:"冷卻大師",i:"❄️",tip:"縮短所有鍛造過熱時間；升級時現有過熱也會減少 10 步。",d:["過熱減少 10 步：一般 40／夏天 50 步","過熱減少 20 步：一般 30／夏天 40 步","過熱減少 30 步：一般 20／夏天 30 步"]},
  gc:{
    n:"寶石匠",i:"💎",
    tip:"胚旁邊的鑽石最多鑲嵌三顆，每顆加價 30%×（階級＋1）。",
    d:["鑽石模具與鑽石商品開始出現",
       "賣出帶鑽石武器，25% 機率掉落銅鑽",
       "賣出帶鑽石武器，25% 機率掉落武器上最高階鑽石"]
  },
  mg:{
    n:"魔法師",i:"🔮",
    tip:"在魔法格放置物品累積 +5💰，隨合成保留，賣出時結算。",
    d:["解鎖 1 格魔法格","解鎖 2 格魔法格","解鎖 3 格魔法格"]
  },
  wb:{
    n:"武器箱",i:"🧰",
    d:["解鎖 2 格武器箱，可取到手持欄再放回棋盤","武器箱增加到 4 格","武器箱增加到 6 格（全部解鎖）"]
  },
  mc:{
    n:"大商人",i:"💰",
    d:["最終賣出價（含鑽石、魔法）+10%",
       "最終賣出價（含鑽石、魔法）+20%",
       "最終賣出價（含鑽石、魔法）+30%"]
  },
  mn:{
    n:"專業礦工",i:"⛏️",
    d:["推出的礦石有 2% 是鐵礦",
       "4% 是鐵礦、2% 是鋼礦",
       "6% 是鐵礦、4% 是鋼礦、2% 是金礦"]
  }
};

const cool=()=>{
  burnLeaves();
  /* 剛鍛造的格子，本步不扣；夏天 60 步，其餘季節 50 步。 */
  heat=heat.map((h,j)=>h>0&&!justHeated.has(j)?h-1:h);
  justHeated.clear();stepSales=0;
  quests.forEach(q=>{if(q&&q.s==='a'&&q.t==='multi')q.p=0});
  orders.forEach(o=>o.wait--);
};
const hu=o=>{
  const r=Math.max(0,Math.min(1,o.wait/o.max));
  return r>=.5?55+(r-.5)/.5*65:r>=.25?28+(r-.25)/.25*27:28*r/.25;
};