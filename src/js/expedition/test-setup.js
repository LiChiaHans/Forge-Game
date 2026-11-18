

let expeditionLab={weapon:'n0',tier:4,stacks:0,element:'none',stage:1};
function expeditionCleared(stage){return stage<20?expeditionState.cleared.includes(stage):stage<20+(expeditionState.endless||0);}
function endlessMonster(stage){
 const wave=Math.max(1,Math.floor(stage)-19),kind=['dragon','golem','wolf','knight'][(wave-1)%4],names={dragon:'星海古龍',golem:'界域巨像',wolf:'虛空獵王',knight:'不朽王鎧'},choices=['none',...ELEMENT_IDS];
 return {name:names[kind]+' · '+wave,area:'無限試煉',kind,color:['#dbacdc','#9bd5d2','#c3a7ee','#e7cf91'][(wave-1)%4],hp:5000+900*wave+90*wave*wave,atk:310+28*wave+2*wave*wave,def:220+16*wave+wave*wave,spd:Math.floor(115+6*wave+.25*wave*wave),gold:2200+300*wave+25*wave*wave,element:choices[((stage*17+Math.max(1,day)*13)>>>0)%choices.length],endless:wave};
}
function labWeapon(){
 if(!sandboxSession)return null;const t=expeditionLab.tier,key=expeditionLab.weapon;let w;
 if(key[0]==='n')w=baseAlbumWeapon(Number(key.slice(1)),t);
 else{const id=Number(key.slice(1));w=id<10?legendaryWeapon(id,LEGENDS[id].recipe.map(c=>baseAlbumWeapon(c,t))):legendaryWeapon(id,LEGENDS[id].recipe.map(parent=>legendaryWeapon(parent,LEGENDS[parent].recipe.map(c=>baseAlbumWeapon(c,t)))));}
 w.stars=Math.max(0,Math.min(3,Number(expeditionLab.stars)||0));w.starXp=w.stars*3;w.m=expeditionLab.stacks*5;if(validElement(expeditionLab.element))w.element=expeditionLab.element;else delete w.element;return w;
}
function updateExpeditionLab(){
 if(!sandboxSession)return;expeditionLab={weapon:$('labWeapon').value,stars:Math.max(0,Math.min(3,Number($('labStars').value)||0)),tier:Math.max(0,Math.min(4,Number($('labTier').value)||0)),stacks:Math.max(0,Math.min(20,Math.floor(Number($('labStacks').value)||0))),element:$('labElement').value,stage:Math.max(1,Math.min(1000000,Math.floor(Number($('labStage').value)||1)))};
 expeditionStage=expeditionLab.stage-1;expeditionSelected='lab';renderExpedition();
}
function renderExpeditionLab(){
 const el=$('expeditionLab');el.hidden=!sandboxSession;if(!sandboxSession)return;renderLabFood();
 if(!$('labWeapon').innerHTML){$('labWeapon').innerHTML='<optgroup label="普通武器">'+WN.map((n,c)=>'<option value="n'+c+'">'+n+'</option>').join('')+'</optgroup><optgroup label="傳說武器">'+LEGENDS.slice(0,10).map((l,id)=>'<option value="l'+id+'">'+l.name+'</option>').join('')+'</optgroup><optgroup label="終極武器">'+LEGENDS.slice(10).map((l,i)=>'<option value="l'+(i+10)+'">'+l.name+'</option>').join('')+'</optgroup>';$('labTier').innerHTML=NM.map((n,t)=>'<option value="'+t+'">'+n+'級</option>').join('');$('labElement').innerHTML='<option value="none">無屬性</option>'+ELEMENT_IDS.map(e=>'<option value="'+e+'">'+elementName(e)+'</option>').join('');}
 $('labStars').value=String(expeditionLab.stars||0);$('labWeapon').value=expeditionLab.weapon;$('labTier').value=String(expeditionLab.tier);$('labStacks').value=String(expeditionLab.stacks);$('labElement').value=expeditionLab.element;$('labStage').value=String(expeditionStage+1);
}
let expeditionLabFood=null;
function updateLabFood(){
 if(!sandboxSession||!$('expeditionBattle').hidden)return false;
 const id=Number($('labFood').value),tier=Math.max(0,Math.min(4,Math.trunc(Number($('labFoodTier').value)||0))),stars=Math.max(0,Math.min(3,Math.trunc(Number($('labFoodStars').value)||0))),spice=$('labFoodSpice').value;
 expeditionLabFood=Number.isInteger(id)&&id>=0&&id<10?{k:'w',c:id,t:tier,fresh:999,testStars:stars,...(Object.hasOwn(KITCHEN_SPICES,spice)?{spice}:{} )}:null;
 expeditionFoodSelected=expeditionLabFood;renderExpeditionFoodSetup();return true;
}
function renderLabFood(){
 if(!sandboxSession)return;
 if(!$('labFood').innerHTML){$('labFood').innerHTML='<option value="-1">不使用測試料理</option>'+KITCHEN_NAMES.map((n,c)=>'<option value="'+c+'">'+n+'</option>').join('');$('labFoodTier').innerHTML=KITCHEN_GRADES.map((n,t)=>'<option value="'+t+'">'+n+'</option>').join('');}
 $('labFood').value=String(expeditionLabFood?.c??-1);$('labFoodTier').value=String(expeditionLabFood?.t??0);$('labFoodStars').value=String(expeditionLabFood?.testStars||0);$('labFoodSpice').value=expeditionLabFood?.spice||'';
}
