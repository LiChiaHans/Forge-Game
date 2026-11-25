function workshopSkillsMaxed(branch){const tree=branch==='kitchen'?KITCHEN_SKILLS:SK,levels=branch==='kitchen'?kitchen?.skills:skills;return Object.keys(tree).every(k=>(levels?.[k]||0)>=3);}
function convertWorkshopSurplus(branch){
 if(sandboxSession||!workshopSkillsMaxed(branch))return 0;const points=branch==='kitchen'?kitchen.sp:sp;if(!points)return 0;
 if(branch==='kitchen')kitchen.sp=0;else sp=0;const gold=points*1000;coins+=gold;return gold;
}
function grantDailyWorkshopSkill(branch){
 if(workshopSkillsMaxed(branch)){coins+=1000;return {points:0,gold:1000};}
 if(branch==='kitchen')kitchen.sp++;else sp++;return {points:1,gold:0};
}
function drawTownChestReward(){
 const forgeOn=typeof isForgeEnabled!=='function'||isForgeEnabled();
 const kitchenOn=typeof isKitchenEnabled!=='function'||isKitchenEnabled();
 if(forgeOn&&(!kitchenOn||Math.random()<.5))return {workshop:'forge',item:drawItem()};
 const pool=[...[0,1,2].map(s=>[{k:'m',s},200]),...[0,1,2,3,4].map(t=>[{k:'o',t},[50,90,145,220,330][t]]),...[['f',200],['u',500],['z',500]].map(([k,p])=>[{k},p]),...Object.keys(KITCHEN_SPICES).map(spice=>[{k:'spice',spice},200])];
 let value=Math.random()*pool.reduce((n,[,p])=>n+1/p,0);for(const [item,price]of pool){value-=1/price;if(value<0)return {workshop:'kitchen',item:{...item}};}return {workshop:'kitchen',item:{k:'m',s:0}};
}
function grantTownChestReward(reward){if(reward.workshop==='kitchen'){if(!kitchen)kitchen=freshKitchen();kitchen.bag.push({...reward.item});}else grantGardenLoot(reward.item);}
