

const W=5,H=6;
let g,coins,earned,all,day,dTot,dServed,dEarn,dLeft,orders,tool,fresh,best,Q,MQ,heat,hand,shopD;
let fx=[],hold=new Set(),pop=new Set(),shown=new Map(),busy=false;
let magic=0,magicSet=new Set(),dMagic=0,dSold=0,lives=3;
let skills={mm:0,gc:0,mg:0,wb:0,mc:0,mn:0,cd:0};
let pack=[],sp=0,dq=[],lead=0,flyI=-1,bag=[],gachaUsed=false,gcItems=[];
let pendingChests=0,lastCompletedDay=0,chestOpening=false;
let quests=[],qDone=0,stepSales=0,dLv=3,qFlip=null;
let shopBought={m:0,tool:0,o:0};
let leaves=new Set(),frozen=new Set(),seasonEffects=new Map(),seasonNoticePending=false;
let autumnForgeCharges=0;
function seasonBenefitText(){
 if(day<1)return '教學中維持原本規則';
 return ['春日豐收：成熟花朵每盆收成 2 份精華。','烈陽需求：火屬性武器成交價 +25%。','落葉餘燼：每燒掉 1 格落葉，下一把武器鍛造獎金 +100 金幣；最多儲存 3 次，當天有效。','冬日需求：水屬性武器成交價 +25%。'][seasonIndex()];
}
function seasonSaleBonus(w){return day>0&&((seasonIndex()===1&&w?.element==='fire')||(seasonIndex()===3&&w?.element==='water'))?.25:0;}
function seasonSaleNote(w){const bonus=seasonSaleBonus(w);return bonus?' · '+SEASONS[seasonIndex()].name+'需求 +25%':'';}
function harvestYield(){return day>0&&seasonIndex()===0?2:1;}
function restoreSeasonBenefits(raw){autumnForgeCharges=day>0&&seasonIndex()===2&&raw?.day===day?Math.max(0,Math.min(3,Math.floor(Number(raw.charges)||0))):0;}
function consumeAutumnForgeReward(){
 if(day<1||seasonIndex()!==2||autumnForgeCharges<=0)return 0;
 autumnForgeCharges--;coins+=100;return 100;
}