

const KITCHEN_NAMES=['鹽味飯糰','肉醬燴飯','蔬菜炊飯','豪華肉丼','主廚套餐','田園拌飯','香煎肉排','蔬菜燉肉','鄉村濃湯','田園沙拉'];
const KITCHEN_GRADES=['家常','新鮮','精選','特級','頂級'],KITCHEN_TYPES=['主食','主菜','配菜'],KITCHEN_PROCESS=['炊煮卡','煎烤卡','切拌卡'];
const KITCHEN_SKILLS={merge:{name:'料理大師',icon:'🥣',desc:['解鎖食材合成升階','合成料理後返還的食材，有 25% 是原材料食材之一，其餘為一階','返還原材料食材的機率提高至 50%']},purchase:{name:'採買大師',icon:'🧺',desc:['推出食材有 2% 為二階，其餘一階','推出食材有 4% 為二階、2% 為三階','推出食材有 6% 為二階、4% 為三階、2% 為四階']},cool:{name:'火候掌控',icon:'🔥',desc:['爐火餘熱減少 2 步','減少 4 步','減少 6 步']},fresh:{name:'保鮮專家',icon:'🧊',desc:['料理保鮮多 6 步','多 12 步','多 18 步']},spice:{name:'調味學',icon:'🌿',desc:['調味售價加成提高至 15%','提高至 20%','提高至 25%']},pack:{name:'冰箱管理',icon:'🧊',desc:['冰箱開啟 2 格','開啟 4 格','開啟 6 格']},patience:{name:'主廚口碑',icon:'👨‍🍳',desc:['客人耐心多 8 步','多 16 步','多 24 步']}};
const KITCHEN_CHALLENGES=[{name:'晚餐尖峰',icon:'⏱',goal:6,text:'服務本晚全部客人，且沒有任何超時訂單。',kind:'rush'},{name:'蔬食餐會',icon:'🥬',goal:3,text:'售出三道含兩份以上配菜的料理。',kind:'vegetable'},{name:'嚴格食評',icon:'⭐',goal:3,text:'售出三道精選級以上，或至少一星的料理。',kind:'critic'}];
const KITCHEN_SPICES={herb:{name:'香草',icon:'葉',color:'#8fd5a0',stat:'aroma',effect:'香氣 +20%'},spicy:{name:'辛香',icon:'辣',color:'#f49b6e',stat:'taste',effect:'滋味 +20%'},milk:{name:'奶香',icon:'乳',color:'#ffe6ab',stat:'fullness',effect:'飽足 +20%'}};
let sandboxNight=false,kitchen=null,kitchenDrag=null,kitchenSuppressClick=0;
function freshKitchen(){return {achievements:{harvests:0,stars:{}},day:0,g:Array(30).fill(null),heat:Array(30).fill(0),tiles:{},q:Array(5).fill(0),mq:[0,1,2],hand:null,useHeld:false,bag:[],pack:[],skills:{merge:0,purchase:0,cool:0,fresh:0,spice:0,pack:0,patience:0},sp:0,xp:{},orders:[],queue:[],served:0,missed:0,cancelled:0,earned:0,crafted:0,turn:0,challenge:0,progress:0,mode:'ore',done:false,lastRewarded:0,forgeSettlement:null,stock:{m:0,tool:0,o:0},message:'先放食材，再把第一張工序卡拖到附近的空格。',justHeated:new Set()};}
function kitchenLevel(key){return kitchen?.skills[key]||0;}
function kitchenFood(t=0){return {k:'o',t};}
function kitchenOrder(generic=false){const mx=Math.max(0,Math.min(4,Math.floor((day-1)/3))),t=mx>0?(Math.random()<.4?mx:rnd(mx)):0,wait=kitchenOrderPatience(t);return {guest:guestForOrder22(kitchenGuestSerial22++,true),c:generic?null:rnd(10),t,max:wait,wait,uid:++kitchenGuestSerial};}
function startKitchenNight(force=false){
 if(!expandedGameEnabled())return;if(!kitchen)kitchen=freshKitchen();if(kitchen.day===day&&!force)return;
 clearKitchenIngredientFlights();clearKitchenMerges();clearKitchenDepartures();kitchen.day=day;kitchen.special={day,recipe:null,locked:false,sold:0};kitchen.heat.fill(0);kitchen.tiles={};kitchen.q=Array.from({length:5},()=>kitchenRollFood());kitchen.mq=[0,1,2];kitchen.served=0;kitchen.missed=0;kitchen.cancelled=0;kitchen.earned=0;kitchen.progress=0;kitchen.done=false;kitchen.settlement=null;kitchen.stock={m:0,tool:0,o:0};kitchen.challenge=day<=3?0:day<=6?rnd(2):rnd(3);kitchen.mode='ore';kitchen.useHeld=false;
 kitchenCreateOrders();kitchen.message='晚餐營業開始！點空格放食材，拖曳工序卡備料，第三份工序相連就會自動完成料理。';
}
function kitchenRollFood(){const table=[[],[[1,2]],[[1,4],[2,2]],[[1,6],[2,4],[3,2]]][kitchenLevel('purchase')],roll=Math.random()*100;let cumulative=0;for(const [tier,chance]of table){cumulative+=chance;if(roll<cumulative)return tier;}return 0;}
function openKitchen(){if(day<1)return;if(typeof isKitchenEnabled==='function'&&!isKitchenEnabled()){toast('冶煉廠模式未開放餐廳。');return;}if(!sandboxNight){toast('現在是白天；冶煉廠營業結束後，會開啟同一天的晚餐時段。');return;}if(!kitchen?.done&&requireWorkshopTraining('kitchen'))return;return performSceneTransition('餐廳',()=>{if(!kitchen?.done&&requireWorkshopTraining('kitchen'))return;$('sk').style.display='none';startKitchenNight();if(typeof checkNightlyFishKitchenSupply==='function')checkNightlyFishKitchenSupply();$('kitchenP').hidden=false;renderKitchen();saveNow();if(kitchen.done){renderKitchenSettlement();return;}});}
function closeKitchen(){return performSceneTransition('城鎮',()=>{cancelKitchenDrag();clearKitchenIngredientFlights();clearKitchenDepartures();$('kitchenP').hidden=true;$('kitchenModal').hidden=true;showTown();});}
function kitchenNeighbors(i){return nb(i);}
function kitchenGroup(i){const item=kitchen.g[i];if(!item)return [];const out=[i];for(let k=0;k<out.length;k++)for(const n of nb(out[k]))if(!out.includes(n)&&kitchen.g[n]?.k===item.k&&(item.k==='p'||kitchen.g[n].t===item.t))out.push(n);return out;}
function kitchenAuto(i){
 if(!kitchenLevel('merge'))return false;let changed=false,queue=[i],guard=0;
 while(queue.length&&guard++<30){const at=queue.shift(),plan=workshopMaterialPlan(at,kitchen.g);if(!plan)continue;
  const source=new Map(plan.cells.map(j=>[j,{...kitchen.g[j]}]));plan.cells.forEach(j=>kitchen.g[j]=null);
  for(const batch of plan.groups){kitchen.g[batch.target]=kitchenFood(batch.tier);queue.push(batch.target);kitchenRecordMerge(batch.cells,batch.cells.map(j=>source.get(j)),[batch.target],batch.target);}
  changed=true;kitchen.message=plan.cells.length===5?'五包相連！在落點升兩階。':'食材合成升階！';
 }return changed;
}
function kitchenPrepare(i,source='auto'){
 if(kitchen.g[i]||kitchen.heat[i]>0){kitchen.message='工序卡要放在可用的空格。';return false;}
 const mat=moldMaterials(i,kitchen.g);if(!mat){kitchen.message='空格附近需要至少兩包相連的同階食材。';return false;}
 const held=source!=='queue'&&kitchen.hand?.k==='m',s=held?kitchen.hand.s:kitchen.mq[0];const ingredientParts=mat.cells.map(j=>({...kitchen.g[j]}));mat.cells.forEach(j=>kitchen.g[j]=null);kitchen.g[i]=kitchenFreshen({k:'p',s,t:mat.t});
 kitchenRecordMerge(mat.cells,ingredientParts,[i],i);if(held){kitchen.hand=null;kitchen.useHeld=false;}else{kitchen.mq.shift();kitchen.mq.push(kitchenRollProcess());}kitchen.mode='ore';
 kitchen.message='已備好'+KITCHEN_GRADES[mat.t]+KITCHEN_TYPES[s]+'。連成三份工序時會自動完成料理。';kitchenCraft(i,true);return true;
}
function kitchenStars(w){return sandboxSession&&Number.isInteger(w.testStars)?Math.max(0,Math.min(3,w.testStars)):Math.min(3,Math.floor((kitchen?.xp?.[w.c+':'+w.t]||0)/3));}
function kitchenPrice(w,baseOnly=false){const quality=Array.isArray(w.cs)?w.cs.reduce((sum,t)=>sum+[35,65,105,160,235][t],0)/3:[35,65,105,160,235][w.t];return baseOnly?Math.round(quality):Math.round(quality*(1+[0,.05,.1,.2][kitchenStars(w)])*(w.spice?1.1+.05*kitchenLevel('spice'):1));}
function kitchenCraft(at,silent=false){
 const triples=kitchenTriples(at);if(!triples.length){if(!silent)kitchen.message='三份備料需要排成直線或彎線。';return false;}
 const old=kitchen.crafted,batches=triples.map(t=>({...t,parts:t.cells.map(i=>({...kitchen.g[i]}))})),made=[],paths=new Map();
 for(const batch of batches){const key=batch.path.join(',');if(!paths.has(key))paths.set(key,{cells:batch.path,parts:batch.path.map(i=>({...kitchen.g[i]}))});}
 const cb=typeof contractBonuses==='function'?contractBonuses():{};
 const consumed=new Set(batches.flatMap(batch=>batch.cells));
 const hadHotBatch=batches.map(batch=>batch.cells.some(i=>nb(i).some(n=>!consumed.has(n)&&kitchen.heat[n]>0)));
 const baseHeat=Math.max(2,baseWorkshopHeatSteps()-2*kitchenLevel('cool')-(cb.kitchenHeatDelta||0));
 const stoveHeat=typeof isWorkshopFever==='function'&&isWorkshopFever('kitchen')?Math.max(1,Math.ceil(baseHeat/2)):baseHeat;
 for(const i of consumed){kitchen.g[i]=null;kitchen.heat[i]=stoveHeat;kitchen.justHeated.add(i);}
 for(let bi=0;bi<batches.length;bi++){const batch=batches[bi],trio=batch.parts,c=COMBO.indexOf(trio.map(p=>p.s).sort().join('')),t=Math.floor(trio.reduce((sum,p)=>sum+p.t,0)/3);if(c<0)continue;
  const target=batch.target,w=kitchenFreshen({k:'w',c,t,cs:trio.map(p=>p.t),spice:kitchen.tiles[target]||null,...(batches.length>=2?{chainBonus:true}:{}),...(cb.emberTemper&&hadHotBatch[bi]?{emberDish:true}:{})});kitchen.g[target]=w;
  const key=c+':'+t,prev=kitchen.xp[key]||0;kitchen.xp[key]=prev+1;kitchen.crafted++;rememberDish(w);(kitchen.forgedAt||(kitchen.forgedAt={}))[target]=Date.now();made.push(KITCHEN_NAMES[c]);
  if(Math.floor((prev+1)/3)>Math.floor(prev/3)&&prev<9){kitchenLevelUps.add(w);toast(KITCHEN_NAMES[c]+' 升星！');}kitchenRecordMerge(batch.cells,trio,[target],target);
 }
 if(typeof addWorkshopFever==='function'&&made.length){
  addWorkshopFever('kitchen',16*made.length+(made.length>=2&&cb.twinCraft?20:0));
  if(made.length>=2)triggerChainComboFX('kitchenGrid',made.length,'🔥 CHAIN ×'+made.length+' 連續上菜！');
 }
 // Return one ingredient per consumed chain, as in embryo forging; never overwrite a dish.
 for(const path of paths.values()){const free=path.cells.filter(i=>!kitchen.g[i]);if(!free.length)continue;const target=free[rnd(free.length)],chance=[0,0,.25,.5][kitchenLevel('merge')],tier=Math.random()<chance?path.parts[rnd(path.parts.length)].t:0;kitchen.g[target]=kitchenFood(tier);kitchenAuto(target);}
 syncAchievementMedals();reviewMetrics.crafted+=kitchen.crafted-old;kitchen.message='料理完成：'+made.join('、')+'！拖曳到客人即可出餐。';return true;
}
function kitchenStep(){
 const feverOn=typeof isWorkshopFever==='function'&&isWorkshopFever('kitchen');
 kitchenSpecial().locked=true;kitchen.turn++;kitchen.heat=kitchen.heat.map((h,i)=>h>0&&!kitchen.justHeated.has(i)?h-1:h);kitchen.justHeated.clear();
 if(!feverOn)kitchenTickFreshness();
 const expired=[];if(!feverOn)kitchen.orders.forEach((o,i)=>{if(--o.wait<=0)expired.push(i);});kitchen.missed+=expired.length;
 if(typeof tickWorkshopFever==='function')tickWorkshopFever('kitchen');
 for(let k=expired.length-1;k>=0;k--)kitchenRemoveOrder(expired[k]);
 if(expired.length){lives=Math.max(sandboxSession?1:0,lives-expired.length);kitchen.message+=' 訂單超時，生命 -'+expired.length+'。';if(lives<=0){saveHi();gameOver('晚餐訂單超時，最後一顆愛心已用完。');return;}}
 if(!kitchen.orders.length&&!kitchen.queue.length)completeKitchenNight();
}
function kitchenUseHand(i){
 const item=kitchen.hand;if(!item)return false;if(item.k==='m')return kitchenPrepare(i,'hand');
 if(item.k==='z'){const hotCells=kitchen.heat.map((h,idx)=>h>0?idx:-1).filter(idx=>idx>=0);kitchen.heat.fill(0);kitchen.hand=null;kitchen.useHeld=false;kitchen.message='冰水桶：全盤餘熱歸零。';playWorkshopToolFX('kitchenGrid','icebucket',{cells:hotCells});return true;}
 if(item.k==='f'){if(kitchen.g[i]?.k==='waste'){kitchen.message='廚餘需要支付清理費，不能用清潔工具清除。';kitchenWastePrompt(i);return false;}if(!kitchen.g[i]||kitchen.g[i].k==='w'){kitchen.message='清潔工具只清除食材或備料，不能丟掉料理。';return false;}kitchen.message='已清除'+kitchenItemName(kitchen.g[i])+'，完成料理不受影響。';kitchen.g[i]=null;kitchen.hand=null;kitchen.useHeld=false;playWorkshopToolFX('kitchenGrid','clean',{cell:i});return true;}
 if(item.k==='u'){const cell=kitchen.g[i];if(cell?.k!=='o'||cell.t>=4){kitchen.message='請選一包可升階的食材。';return false;}cell.t++;kitchenEnsureFresh(cell);kitchen.message='食材升為'+kitchenGradeName(cell.t)+'。';kitchen.hand=null;kitchen.useHeld=false;playWorkshopToolFX('kitchenGrid','upgrade',{cell:i});kitchenAuto(i);return true;}
 if(kitchen.g[i]||kitchen.heat[i]>0){kitchen.message='這格正在使用或仍有餘熱。';return false;}
 if(item.k==='spice'){kitchen.tiles[i]=item.spice;kitchen.message=KITCHEN_SPICES[item.spice].name+'調味格：'+KITCHEN_SPICES[item.spice].effect+'，售價 +'+kitchenSpiceBonus()+'%，本晚有效。';playWorkshopToolFX('kitchenGrid','spice',{cell:i,color:KITCHEN_SPICES[item.spice].color});}else kitchen.g[i]=item.k==='o'?kitchenEnsureFresh({...item}):item;
 kitchen.hand=null;kitchen.useHeld=false;if(item.k==='o')kitchenAuto(i);return true;
}
function kitchenClick(i){
 if(!expandedGameEnabled()||!kitchen||kitchenMergeJobs.size||Date.now()<kitchenSuppressClick)return;if(kitchen.done){if(kitchen.g[i]?.k==='w')inspectKitchenDish(kitchen.g[i]);else if(kitchen.g[i]?.k==='waste')kitchenWastePrompt(i);else if(!kitchen.g[i]&&kitchen.hand?.k==='w'){kitchen.g[i]=kitchen.hand;kitchen.hand=null;kitchen.useHeld=false;renderKitchen();}return;}
 clearKitchenMerges();if(kitchen.g[i]?.k==='waste'){kitchenWastePrompt(i);return;}const usingHand=!!(kitchen.useHeld&&kitchen.hand),launch=kitchenIngredientLaunch(i),organizing=usingHand&&kitchen.hand.k==='w';let used=false;
 if(usingHand)used=kitchenUseHand(i);else if(kitchen.mode==='prep')used=kitchenPrepare(i,'queue');else if(kitchen.g[i]?.k==='w'){inspectKitchenDish(kitchen.g[i]);return;}else if(kitchen.g[i]?.k==='p')used=kitchenCraft(i);else if(kitchen.g[i]?.k==='o'){used=kitchenAuto(i);if(!used)kitchen.message=kitchenLevel('merge')?'相連同階食材達三包可合成，五包可在落點升兩階。':'到訓練所學習「料理大師」後，就能合成食材升階。';}else if(kitchen.heat[i]>0)kitchen.message='餘熱還有 '+kitchen.heat[i]+' 步。';else{kitchen.g[i]=kitchenFood(kitchen.q.shift());kitchen.q.push(kitchenRollFood());kitchenAuto(i);used=true;}
 if(used&&!organizing)kitchenStep();renderKitchen();if(!playKitchenMerges(launch,i)&&used&&launch)flyKitchenIngredient(i,launch);
}
function kitchenSell(w,index,clear){
 if(!expandedGameEnabled()||!kitchen||kitchen.done)return false;const order=kitchen.orders[index];if(!order||w?.k!=='w')return false;if(order.c!==null&&order.c!==w.c){kitchen.message='這位客人需要'+KITCHEN_NAMES[order.c]+'。';return false;}if(w.t<order.t){kitchen.message='品質需要'+KITCHEN_GRADES[order.t]+'級以上。';return false;}
 const failed=kitchenRequirementFailure(w,order);if(failed){kitchen.message=failed;return false;}const menuBonus=kitchenMenuBonus(w),statBonus=order.need?.1:0,like=guestPreferenceBonus(w,order,true),medalBonus=medalBonuses().dishSale,momBonus=typeof kitchenSaleMomentumBonus==='function'?kitchenSaleMomentumBonus(w,order):0,price=Math.round(kitchenPrice(w)*(1+like)*(1+menuBonus)*(1+statBonus)*(1+medalBonus)*(1+momBonus));if(menuBonus)kitchenSpecial().sold++;coins+=price;earned+=price;dEarn+=price;all++;kitchen.earned+=price;kitchen.served++;reviewMetrics.served++;if(kitchen.challenge===1&&COMBO[w.c].split('').filter(s=>s==='2').length>=2)kitchen.progress++;if(kitchen.challenge===2&&(w.t>=2||kitchenStars(w)>=1))kitchen.progress++;
 if(typeof addWorkshopFever==='function')addWorkshopFever('kitchen',18+(contractBonuses().saleFever||0));
 recordFestival('food',w);clear();kitchenRemoveOrder(index);kitchen.message='出餐成功！'+KITCHEN_NAMES[w.c]+' +'+price+' 金幣'+(like?' · 喜好 +10%':'')+(menuBonus?' · 主打 +20%':'')+(statBonus?' · 狀態訂單 +10%':'')+(medalBonus?' · 紀念章 +'+Math.round(medalBonus*100)+'%':'')+(momBonus?' · 契約／狂熱 +'+Math.round(momBonus*100)+'%':'');if(!kitchen.orders.length&&!kitchen.queue.length)completeKitchenNight();else kitchenStep();saveHi();renderKitchen();saveNow();return true;
}
function completeKitchenNight(){
 if(!kitchen||kitchen.done)return;kitchen.done=true;const c=KITCHEN_CHALLENGES[kitchen.challenge],passed=c.kind==='rush'?kitchen.served>=kitchen.total&&kitchen.missed===0:kitchen.progress>=c.goal,paid=kitchen.lastRewarded!==day;
 const bonus=paid?120+kitchen.served*20+(passed?150:0):0;let pointReward={points:0,gold:0};if(paid){kitchen.lastRewarded=day;coins+=bonus;earned+=bonus;dEarn+=bonus;pointReward=grantDailyWorkshopSkill('kitchen');pendingChests++;kitchen.bag.push({k:'spice',spice:passed?'milk':'herb'});}
 kitchen.settlement={served:kitchen.served,missed:kitchen.missed,cancelled:kitchen.cancelled||0,earned:kitchen.earned,challenge:kitchen.challenge,passed,bonus,points:pointReward.points,skillGold:pointReward.gold,spice:paid?1:0};renderKitchenSettlement();
 reviewMetrics.nights++;reviewMetrics.nightTurns+=kitchen.turn;saveReviewProgress();
}
function renderKitchenSettlement(){const r=kitchen?.settlement;if(!r)return;const c=KITCHEN_CHALLENGES[r.challenge],organize=kitchenLevel('pack')>0&&day>1,isSprintEnd=typeof activeRunMode==='function'&&activeRunMode()==='sprint9'&&day>=9&&!ensureWorkshopMomentum().sprintDone; kitchenModal('晚餐營業完成','<p>出餐 '+r.served+' 位 · 超時 '+r.missed+' 位 · 取消 '+(r.cancelled||0)+' 位</p><p>料理收入 '+r.earned+' 金幣</p><p>'+c.icon+c.name+'：'+(r.passed?'挑戰成功':'下次再挑戰')+'</p><p>營業獎勵 '+r.bonus+' 金幣 · '+(r.skillGold?'技能已滿轉換 '+r.skillGold+' 金幣':'廚房技能點 '+r.points)+' · 調味包 '+r.spice+'</p>'+(typeof settlementNextHookHTML==='function'?settlementNextHookHTML('kitchen'):'')+(organize?'<button class="kitchen-wide" onclick="openKitchenOrganize()">先整理料理進冰箱</button>':'')+'<button class="pri kitchen-wide" onclick="finishKitchenNight()">'+(isSprintEnd?'🏆 查看 9 天衝分總結算':'結束夜晚，進入隔天')+'</button>');}
function finishKitchenNight(){if(day<1||!sandboxNight||!kitchen?.done||kitchen.day!==day||lives<=0)return;if(typeof activeRunMode==='function'&&activeRunMode()==='sprint9'&&day>=9&&!ensureWorkshopMomentum().sprintDone){ensureWorkshopMomentum().sprintDone=true;$('kitchenModal').hidden=true;saveHi();saveNow();ov('🏆 9 天極速衝分完成！','最終總分：⭐ '+score()+' · 總金幣：💰 '+coins+' · 累計服務 '+all+' 位客人 · 遠征勝利 '+expeditionState.victories+' 場！可繼續無盡經營或回首頁再挑戰新高分！','繼續經營第 10 天',()=>{performSceneTransition('城鎮',()=>{$('kitchenP').hidden=true;setSandboxNight(false);newDay();saveNow();});});return;}return performSceneTransition('城鎮',()=>{if(!sandboxNight||!kitchen?.done||kitchen.day!==day||lives<=0)return;$('kitchenModal').hidden=true;$('kitchenP').hidden=true;setSandboxNight(false);newDay();saveNow();});}
