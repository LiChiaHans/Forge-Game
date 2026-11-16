let sceneTransitionCurrent='遊戲首頁',sceneTransitionRun=null,sceneTransitionApplying=false;
function finishSceneTransition(run){
 if(sceneTransitionRun!==run)return;sceneTransitionRun=null;clearTimeout(run.timer);for(const animation of run.animations){animation.onfinish=null;animation.oncancel=null;animation.cancel?.();}
 const cover=$('sceneTransition');cover.hidden=true;cover.style.opacity='';cover.removeAttribute?.('aria-busy');
 if(run.next)performSceneTransition(run.next.name,run.next.action,run.next.force);
}
function performSceneTransition(name,action,force=false){
 const cover=$('sceneTransition'),reduced=lowEffects||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 // Shared gameplay functions stay usable on browsers without the full animation API.
 if(booting||sceneTransitionApplying||reduced||typeof cover.animate!=='function'||typeof cover.getAnimations!=='function'||!force&&!sceneTransitionRun&&sceneTransitionCurrent===name){const result=action();sceneTransitionCurrent=name;return result;}
 if(sceneTransitionRun){if(sceneTransitionRun.name!==name)sceneTransitionRun.next={name,action,force};return;}
 const run={name,animations:[],timer:null,next:null,switched:false};sceneTransitionRun=run;cover.textContent='進入'+name;cover.hidden=false;cover.style.opacity='0';cover.setAttribute('aria-busy','true');cover.focus?.({preventScroll:true});
 const dark=cover.animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-in',fill:'forwards'});run.animations.push(dark);
 dark.onfinish=()=>{
  if(sceneTransitionRun!==run||run.switched)return;run.switched=true;sceneTransitionApplying=true;
  try{action();sceneTransitionCurrent=name;}catch(error){finishSceneTransition(run);throw error;}finally{sceneTransitionApplying=false;}
  run.timer=setTimeout(()=>{if(sceneTransitionRun!==run)return;const light=cover.animate([{opacity:1},{opacity:0}],{duration:280,easing:'ease-out',fill:'forwards'});run.animations.push(light);light.onfinish=()=>finishSceneTransition(run);light.oncancel=()=>finishSceneTransition(run);},170);
 };
 dark.oncancel=()=>finishSceneTransition(run);
}
window.addEventListener('load',()=>{if($('title').style.display!=='none')performSceneTransition('遊戲首頁',()=>{},true);});
window.addEventListener('pagehide',()=>{if(sceneTransitionRun){sceneTransitionRun.next=null;finishSceneTransition(sceneTransitionRun);}});
