let workshopFinishTimer=null;const kitchenLevelUps=new WeakSet();
function clearWorkshopMilestone(){if(workshopFinishTimer!==null)clearTimeout(workshopFinishTimer);workshopFinishTimer=null;$('workshopFinish').hidden=true;$('workshopFinish').innerHTML='';}
function showWorkshopMilestone(kind,w,count=1,leveled=false){
 if(kind==='kitchen'?$('kitchenP').hidden:$('title').style.display!=='none'||$('townP').style.display==='flex')return;
 clearWorkshopMilestone();const box=$('workshopFinish'),food=kind==='kitchen',values=food?kitchenDishStats(w):weaponStats(w),price=food?kitchenPrice(w):wp(w)+(w.m||0),name=food?kitchenItemName(w):itemName(w);
 box.dataset.kind=kind;box.dataset.raised=String(leveled);box.innerHTML='<span class="finish-art">'+(food?kitchenArt(w):hex(w.c,bands(w),'',w.t,w))+'</span><span><small>'+(leveled?'工藝升星':count>1?'連作完成 ×'+count:'製作完成')+'</small><b>'+esc(name)+'</b><small>'+(food?'滋味 '+values.taste+' · 飽足 '+values.fullness+' · 香氣 '+values.aroma:'攻 '+values.atk+' · 防 '+values.def+' · 速 '+values.spd)+' · '+price+' 金幣</small></span>';box.hidden=false;
 if(!lowEffects)box.animate?.([{opacity:0,transform:'translate(-50%,8px)'},{opacity:1,transform:'translate(-50%,0)'}],{duration:180,easing:'ease-out'});
 workshopFinishTimer=gameTimeout(clearWorkshopMilestone,leveled?1800:1100);
}
function presentKitchenResults(outputs){
 const live=outputs.filter(x=>x.item?.k==='w'&&kitchen.g[x.index]===x.item);if(!live.length)return;const chosen=live.find(x=>kitchenLevelUps.has(x.item))||live.reduce((a,b)=>a.item.t>=b.item.t?a:b),raised=kitchenLevelUps.has(chosen.item);
 for(const {item,index}of live){const cell=$('kitchenGrid').children[index];cell?.classList.add('kitchen-complete');if(raised)cell?.classList.add('kitchen-star-complete');gameTimeout(()=>{const current=$('kitchenGrid').children[index];if(kitchen.g[index]===item)current?.classList.remove('kitchen-complete','kitchen-star-complete');},700);kitchenLevelUps.delete(item);}
 showWorkshopMilestone('kitchen',chosen.item,live.length,raised);
}
