
function renderKitchenMessage(text){
 renderWorkshopMessage($('kitchenMessage'),text,layoutKitchenMessage);
}
function renderForgeMessage(text){renderWorkshopMessage($('msg'),text,layoutForgeMessage);}
function forgeMessageText(){return $('msg').dataset.message??$('msg').textContent;}
function renderWorkshopMessage(el,text,layout){
 text=String(text||'');el.setAttribute('aria-label',text);el.title=text;
 if(el.dataset.message!==text){el.dataset.message=text;el.innerHTML='<span class="kitchen-message-track"><span class="kitchen-message-copy">'+esc(text)+'</span></span>';el.dataset.measured='';}
 requestAnimationFrame(layout);
}
function layoutKitchenMessage(){layoutWorkshopMessage($('kitchenMessage'));}
function layoutForgeMessage(){layoutWorkshopMessage($('msg'));}
function layoutWorkshopMessage(el){
 const track=el.querySelector('.kitchen-message-track'),copy=track?.querySelector('.kitchen-message-copy');if(!copy||!el.clientWidth)return;
 const width=copy.scrollWidth||copy.getBoundingClientRect().width,available=el.clientWidth-16,overflow=width>available+1,key=width+':'+available;
 if(el.dataset.measured===key)return;el.dataset.measured=key;el.classList.toggle('scrolling-message',overflow);track.querySelector('.kitchen-message-repeat')?.remove();
 if(overflow){const repeat=document.createElement('span');repeat.className='kitchen-message-repeat';repeat.setAttribute('aria-hidden','true');repeat.textContent=el.dataset.message;track.appendChild(repeat);track.style.setProperty('--message-distance',-(width+40)+'px');track.style.setProperty('--message-duration',Math.max(10,(width+40)/28)+'s');}
}
window.addEventListener('resize',()=>{requestAnimationFrame(layoutKitchenMessage);requestAnimationFrame(layoutForgeMessage);});
