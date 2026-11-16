

const KITCHEN_NAMES=['鹽味飯糰','肉醬燴飯','蔬菜炊飯','豪華肉丼','主廚套餐','田園拌飯','香煎肉排','蔬菜燉肉','鄉村濃湯','田園沙拉'];
const KITCHEN_GRADES=['家常','新鮮','精選','特級','頂級'],KITCHEN_TYPES=['主食','主菜','配菜'],KITCHEN_PROCESS=['炊煮卡','煎烤卡','切拌卡'];
const KITCHEN_SKILLS={merge:{name:'料理大師',icon:'🥣',desc:['解鎖食材合成升階；推出食材 2% 為2階，料理返還原階機率10%','推出食材 4% 為2階、2% 為3階；料理返還原階機率25%','推出食材 6% 為2階、4% 為3階、2% 為4階；料理返還原階機率50%']},cool:{name:'火候掌控',icon:'🔥',desc:['爐火餘熱減少 2 步','減少 4 步','減少 6 步']},fresh:{name:'保鮮專家',icon:'🧊',desc:['食材、備料及料理保鮮多 6 步','多 12 步','多 18 步']},spice:{name:'調味學',icon:'🌿',desc:['調味售價加成提高至 15%','提高至 20%','提高至 25%']},pack:{name:'冰箱管理',icon:'🧊',desc:['冰箱開啟 2 格','開啟 4 格','開啟 6 格']},patience:{name:'主廚口碑',icon:'👨‍🍳',desc:['客人耐心多 8 步','多 16 步','多 24 步']}};
const KITCHEN_CHALLENGES=[{name:'晚餐尖峰',icon:'⏱',goal:6,text:'服務本晚全部客人，且沒有任何超時訂單。',kind:'rush'},{name:'蔬食餐會',icon:'🥬',goal:3,text:'售出三道含兩份以上配菜的料理。',kind:'vegetable'},{name:'嚴格食評',icon:'⭐',goal:3,text:'售出三道精選級以上，或至少一星的料理。',kind:'critic'}];
const KITCHEN_SPICES={herb:{name:'香草',icon:'葉',color:'#8fd5a0',stat:'aroma',effect:'香氣 +20%'},spicy:{name:'辛香',icon:'辣',color:'#f49b6e',stat:'taste',effect:'滋味 +20%'},milk:{name:'奶香',icon:'乳',color:'#ffe6ab',stat:'fullness',effect:'飽足 +20%'}};
let sandboxNight=false,kitchen=null,kitchenDrag=null,kitchenSuppressClick=0;
function freshKitchen(){return {day:0,g:Array(30).fill(null),heat:Array(30).fill(0),tiles:{},q:Array(5).fill(0),mq:[0,1,2],hand:null,useHeld:false,bag:[],pack:[],skills:{merge:0,cool:0,fresh:0,spice:0,pack:0,patience:0},sp:0,xp:{},orders:[],queue:[],served:0,missed:0,cancelled:0,earned:0,crafted:0,turn:0,challenge:0,progress:0,mode:'ore',done:false,lastRewarded:0,stock:{m:0,tool:0,o:0},message:'先放食材，再把第一張工序卡拖到附近的空格。',justHeated:new Set()};}
function kitchenLevel(key){return kitchen?.skills[key]||0;}
function kitchenFood(t=0){return {k:'o',t,fresh:14+6*kitchenLevel('fresh'),born:kitchen.turn+1};}
function kitchenOrder(generic=false){const mx=Math.max(0,Math.min(4,Math.floor((day-1)/3))),t=mx>0?(Math.random()<.4?mx:rnd(mx)):0,wait=kitchenOrderPatience(t);return {guest:guestForOrder22(kitchenGuestSerial22++,true),c:generic?null:rnd(10),t,max:wait,wait,uid:++kitchenGuestSerial};}
function startKitchenNight(force=false){
 if(!expandedGameEnabled())return;if(!kitchen)kitchen=freshKitchen();if(kitchen.day===day&&!force)return;
 clearKitchenIngredientFlights();clearKitchenMerges();clearKitchenDepartures();kitchen.day=day;kitchen.heat.fill(0);kitchen.tiles={};kitchen.q=Array.from({length:5},()=>kitchenRollFood());kitchen.mq=[0,1,2];kitchen.served=0;kitchen.missed=0;kitchen.cancelled=0;kitchen.earned=0;kitchen.progress=0;kitchen.done=false;kitchen.settlement=null;kitchen.stock={m:0,tool:0,o:0};kitchen.challenge=day<=3?0:day<=6?rnd(2):rnd(3);kitchen.mode='ore';kitchen.useHeld=false;
 kitchenCreateOrders();kitchen.message='晚餐營業開始！點空格放食材，拖曳工序卡備料，第三份工序相連就會自動完成料理。';
}
function kitchenRollFood(){const table=[[],[[1,2]],[[1,4],[2,2]],[[1,6],[2,4],[3,2]]][kitchenLevel('merge')],roll=Math.random()*100;let cumulative=0;for(const [tier,chance]of table){cumulative+=chance;if(roll<cumulative)return tier;}return 0;}
function openKitchen(){if(day<1)return;if(!sandboxNight){toast('現在是白天；冶煉廠營業結束後，會開啟同一天的晚餐時段。');return;}$('sk').style.display='none';startKitchenNight();$('kitchenP').hidden=false;renderKitchen();saveNow();if(kitchen.done){renderKitchenSettlement();return;}if(!kitchen.helpSeen){kitchen.helpSeen=true;kitchenHelp();saveNow();}}
function closeKitchen(){cancelKitchenDrag();clearKitchenDepartures();$('kitchenP').hidden=true;$('kitchenModal').hidden=true;showTown();}
function kitchenNeighbors(i){return nb(i);}
function kitchenGroup(i){const item=kitchen.g[i];if(!item)return [];const out=[i];for(let k=0;k<out.length;k++)for(const n of nb(out[k]))if(!out.includes(n)&&kitchen.g[n]?.k===item.k&&(item.k==='p'||kitchen.g[n].t===item.t))out.push(n);return out;}
function kitchenAuto(i){
 if(!kitchenLevel('merge'))return false;
 let changed=false,queue=[i],guard=0;
 while(queue.length&&guard++<30){const at=queue.shift(),item=kitchen.g[at];if(item?.k!=='o'||item.t>=4)continue;const group=kitchenGroup(at);if(group.length<3)continue;const n=group.length>=5?5:group.length===4?4:3,cells=group.slice(0,n),tier=Math.min(4,item.t+(n===5?2:1)),dest=n===4?[at,cells.find(j=>j!==at)]:[at];const parts=cells.map(j=>({...kitchen.g[j]}));cells.forEach(j=>kitchen.g[j]=null);dest.forEach(j=>{kitchen.g[j]=kitchenFood(tier);queue.push(j)});kitchenRecordMerge(cells,parts,dest,at);changed=true;kitchen.message=n===5?'五包相連！在落點升兩階。':'食材合成升階！';
 }return changed;
}
function kitchenPrepare(i,source='auto'){
 if(kitchen.g[i]||kitchen.heat[i]>0){kitchen.message='工序卡要放在可用的空格。';return false;}
 const mat=moldMaterials(i,kitchen.g);if(!mat){kitchen.message='空格附近需要至少兩包相連的同階食材。';return false;}
 const held=source!=='queue'&&kitchen.hand?.k==='m',s=held?kitchen.hand.s:kitchen.mq[0];const ingredientParts=mat.cells.map(j=>({...kitchen.g[j]}));mat.cells.forEach(j=>kitchen.g[j]=null);kitchen.g[i]=kitchenFreshen({k:'p',s,t:mat.t});
 kitchenRecordMerge(mat.cells,ingredientParts,[i],i);if(held){kitchen.hand=null;kitchen.useHeld=false;}else{kitchen.mq.shift();kitchen.mq.push(rnd(3));}kitchen.mode='ore';
 kitchen.message='已備好'+KITCHEN_GRADES[mat.t]+KITCHEN_TYPES[s]+'。連成三份工序時會自動完成料理。';kitchenCraft(i,true);return true;
}
function kitchenStars(w){return Math.min(3,Math.floor((kitchen?.xp?.[w.c+':'+w.t]||0)/3));}
function kitchenPrice(w){const quality=Array.isArray(w.cs)?w.cs.reduce((sum,t)=>sum+[35,65,105,160,235][t],0)/3:[35,65,105,160,235][w.t];return Math.round(quality*(1+[0,.05,.1,.2][kitchenStars(w)])*(w.spice?1.1+.05*kitchenLevel('spice'):1));}
function kitchenCraft(at,silent=false){const old=kitchen.crafted,result=stage21_kitchenCraft(at,silent);reviewMetrics.crafted+=kitchen.crafted-old;return result;}
function kitchenStep(){
 kitchen.turn++;kitchen.heat=kitchen.heat.map((h,i)=>h>0&&!kitchen.justHeated.has(i)?h-1:h);kitchen.justHeated.clear();
 kitchenTickFreshness();
 const expired=[];kitchen.orders.forEach((o,i)=>{if(--o.wait<=0)expired.push(i);});kitchen.missed+=expired.length;
 for(let k=expired.length-1;k>=0;k--)kitchenRemoveOrder(expired[k]);
 if(expired.length){lives=Math.max(sandboxSession?1:0,lives-expired.length);kitchen.message+=' 訂單超時，生命 -'+expired.length+'。';if(lives<=0){saveHi();gameOver('晚餐訂單超時，最後一顆愛心已用完。');return;}}
 if(!kitchen.orders.length&&!kitchen.queue.length)completeKitchenNight();
}
function kitchenUseHand(i){
 const item=kitchen.hand;if(!item)return false;if(item.k==='m')return kitchenPrepare(i,'hand');
 if(item.k==='z'){kitchen.heat.fill(0);kitchen.hand=null;kitchen.useHeld=false;kitchen.message='冰水桶：全盤餘熱歸零。';return true;}
 if(item.k==='f'){if(kitchen.g[i]?.k==='waste'){kitchen.message='廚餘需要支付清理費，不能用清潔工具清除。';kitchenWastePrompt(i);return false;}if(!kitchen.g[i]||kitchen.g[i].k==='w'){kitchen.message='清潔工具只清除食材或備料，不能丟掉料理。';return false;}kitchen.message='已清除'+kitchenItemName(kitchen.g[i])+'，完成料理不受影響。';kitchen.g[i]=null;kitchen.hand=null;kitchen.useHeld=false;return true;}
 if(item.k==='u'){const cell=kitchen.g[i];if(cell?.k!=='o'||cell.t>=4){kitchen.message='請選一包可升階的食材。';return false;}cell.t++;cell.fresh=14+6*kitchenLevel('fresh');kitchen.message='食材升為'+kitchenGradeName(cell.t)+'，並恢復 '+cell.fresh+' 步保鮮。';kitchen.hand=null;kitchen.useHeld=false;kitchenAuto(i);return true;}
 if(kitchen.g[i]||kitchen.heat[i]>0){kitchen.message='這格正在使用或仍有餘熱。';return false;}
 if(item.k==='spice'){kitchen.tiles[i]=item.spice;kitchen.message=KITCHEN_SPICES[item.spice].name+'調味格：'+KITCHEN_SPICES[item.spice].effect+'，售價 +'+kitchenSpiceBonus()+'%，本晚有效。';}else kitchen.g[i]=item.k==='o'?{...item,fresh:14+6*kitchenLevel('fresh'),born:kitchen.turn+1}:item;
 kitchen.hand=null;kitchen.useHeld=false;if(item.k==='o')kitchenAuto(i);return true;
}
function kitchenClick(i){
 if(!expandedGameEnabled()||!kitchen||Date.now()<kitchenSuppressClick)return;if(kitchen.done){if(kitchen.g[i]?.k==='w')inspectKitchenDish(kitchen.g[i]);else if(kitchen.g[i]?.k==='waste')kitchenWastePrompt(i);else if(!kitchen.g[i]&&kitchen.hand?.k==='w'){kitchen.g[i]=kitchen.hand;kitchen.hand=null;kitchen.useHeld=false;renderKitchen();}return;}
 clearKitchenMerges();if(kitchen.g[i]?.k==='waste'){kitchenWastePrompt(i);return;}const usingHand=!!(kitchen.useHeld&&kitchen.hand),launch=kitchenIngredientLaunch(i),organizing=usingHand&&kitchen.hand.k==='w';let used=false;
 if(usingHand)used=kitchenUseHand(i);else if(kitchen.mode==='prep')used=kitchenPrepare(i,'queue');else if(kitchen.g[i]?.k==='w'){inspectKitchenDish(kitchen.g[i]);return;}else if(kitchen.g[i]?.k==='p')used=kitchenCraft(i);else if(kitchen.g[i]?.k==='o'){used=kitchenAuto(i);if(!used)kitchen.message=kitchenLevel('merge')?'相連同階食材達三包可合成，五包可在落點升兩階。':'到訓練所學習「料理大師」後，就能合成食材升階。';}else if(kitchen.heat[i]>0)kitchen.message='餘熱還有 '+kitchen.heat[i]+' 步。';else{kitchen.g[i]=kitchenFood(kitchen.q.shift());kitchen.q.push(kitchenRollFood());kitchenAuto(i);used=true;}
 if(used&&!organizing)kitchenStep();renderKitchen();if(!playKitchenMerges(launch,i)&&used&&launch)flyKitchenIngredient(i,launch);
}
function kitchenSell(w,index,clear){
 if(!expandedGameEnabled()||!kitchen||kitchen.done)return false;const order=kitchen.orders[index];if(!order||w?.k!=='w')return false;if(order.c!==null&&order.c!==w.c){kitchen.message='這位客人需要'+KITCHEN_NAMES[order.c]+'。';return false;}if(w.t<order.t){kitchen.message='品質需要'+KITCHEN_GRADES[order.t]+'級以上。';return false;}
 const like=guestPreferenceBonus(w,order,true),price=Math.round(kitchenPrice(w)*(1+like));coins+=price;earned+=price;dEarn+=price;all++;kitchen.earned+=price;kitchen.served++;reviewMetrics.served++;if(kitchen.challenge===1&&COMBO[w.c].split('').filter(s=>s==='2').length>=2)kitchen.progress++;if(kitchen.challenge===2&&(w.t>=2||kitchenStars(w)>=1))kitchen.progress++;
 clear();kitchenRemoveOrder(index);kitchen.message='出餐成功！'+KITCHEN_NAMES[w.c]+' +'+price+' 金幣'+(like?' · 喜好 +10%':'');if(!kitchen.orders.length&&!kitchen.queue.length)completeKitchenNight();else kitchenStep();saveHi();renderKitchen();saveNow();return true;
}
function completeKitchenNight(){const fresh=kitchen&&!kitchen.done;const result=stage21_completeKitchenNight();if(fresh&&kitchen.done){reviewMetrics.nights++;reviewMetrics.nightTurns+=kitchen.turn;saveReviewProgress();}return result;}
function renderKitchenSettlement(){const r=kitchen?.settlement;if(!r)return;const c=KITCHEN_CHALLENGES[r.challenge];kitchenModal('晚餐營業完成','<p>出餐 '+r.served+' 位 · 超時 '+r.missed+' 位 · 取消 '+(r.cancelled||0)+' 位</p><p>料理收入 '+r.earned+' 金幣</p><p>'+c.icon+c.name+'：'+(r.passed?'挑戰成功':'下次再挑戰')+'</p><p>營業獎勵 '+r.bonus+' 金幣 · 廚房技能點 '+r.points+' · 調味包 '+r.spice+'</p><button class="kitchen-wide" onclick="openKitchenOrganize()">先整理料理進冰箱</button><button class="pri kitchen-wide" onclick="finishKitchenNight()">結束夜晚，進入隔天</button>');}
function finishKitchenNight(){if(day<1||!sandboxNight||!kitchen?.done||kitchen.day!==day||lives<=0)return;$('kitchenModal').hidden=true;$('kitchenP').hidden=true;setSandboxNight(false);newDay();saveNow();}