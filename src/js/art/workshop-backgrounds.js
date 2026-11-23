
const WORKSHOP_ART={"forge":"assets/interiors/forge.4296ba06a3b2.webp","kitchen":"assets/interiors/kitchen.957bd2e9fd2b.webp"};
function syncWorkshopLook(){
 syncCozyItemLook();const enabled=expandedGameEnabled()&&day>0,app=$('app'),screen=$('kitchenP');
 const si=typeof townVisualSeason==='function'?townVisualSeason():0,sId=typeof SEASONS!=='undefined'&&SEASONS[si]?SEASONS[si].id:'spring';
 const tMode=typeof isSandboxNight==='function'&&isSandboxNight()?'night':'day';
 app.dataset.workshop=enabled?'forge':'';screen.dataset.workshop=enabled?'kitchen':'';document.body.classList.toggle('workshop-backend',enabled);
 if(enabled){
  app.dataset.season=sId;app.dataset.time=tMode;screen.dataset.season=sId;screen.dataset.time=tMode;
  if(app.dataset.wallArt!=='forge17'){app.style.setProperty('--workshop-wall','url("'+WORKSHOP_ART.forge+'")');app.dataset.wallArt='forge17';}
  if(screen.dataset.wallArt!=='kitchen17'){screen.style.setProperty('--workshop-wall','url("'+WORKSHOP_ART.kitchen+'")');screen.dataset.wallArt='kitchen17';}
 }else{
  app.dataset.season='';app.dataset.time='';screen.dataset.season='';screen.dataset.time='';
  app.style.setProperty('--workshop-wall','none');screen.style.setProperty('--workshop-wall','none');app.dataset.wallArt='';screen.dataset.wallArt='';
 }
}