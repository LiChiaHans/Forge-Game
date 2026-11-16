
function cityPlacementLimit(id){return ['cat','dog','rabbit','owl','reindeer'].includes(DECOR_BY_ID.get(id)?.art)?1:3;}
function capCityItems(items){const counts=new Map();return items.filter(i=>{const n=(counts.get(i.id)||0)+1;counts.set(i.id,n);return n<=cityPlacementLimit(i.id);});}
function cityItemsOverLimit(items){const counts=new Map();for(const i of items)counts.set(i.id,(counts.get(i.id)||0)+1);return [...counts].filter(([id,n])=>n>cityPlacementLimit(id)).map(([id])=>id);}
function enforceCityPlacementLimits(){if(!expandedGameEnabled()||!cityState)return;let returned=0;for(const store of [cityState.layouts,cityState.nightLayouts])if(store)for(const key of Object.keys(store)){const current=store[key],next=capCityItems(current);returned+=current.length-next.length;store[key]=next;}if(returned){cityRevision++;toast('超出放置上限的 '+returned+' 件裝飾已收回收藏。');}}
const petVoiceLast=new Map();
function playPetVoice(kind){
 if(muted||!['cat','dog'].includes(kind))return false;const now=Date.now();if(now-(petVoiceLast.get(kind)||0)<700)return false;const a=actx();if(!a||a.state!=='running')return false;petVoiceLast.set(kind,now);const start=a.currentTime;
 if(kind==='cat'){
  const voice=a.createOscillator(),filter=a.createBiquadFilter(),gain=a.createGain();voice.type='sawtooth';voice.frequency.setValueAtTime(470,start);voice.frequency.exponentialRampToValueAtTime(820,start+.16);voice.frequency.exponentialRampToValueAtTime(340,start+.63);filter.type='bandpass';filter.Q.value=1.7;filter.frequency.setValueAtTime(1100,start);filter.frequency.linearRampToValueAtTime(1700,start+.19);filter.frequency.linearRampToValueAtTime(700,start+.65);gain.gain.setValueAtTime(.0001,start);gain.gain.linearRampToValueAtTime(.075,start+.06);gain.gain.exponentialRampToValueAtTime(.0001,start+.68);voice.connect(filter);filter.connect(gain);gain.connect(a.destination);voice.start(start);voice.stop(start+.7);
 }else for(let i=0;i<2;i++){
  const t=start+i*.25,voice=a.createOscillator(),filter=a.createBiquadFilter(),gain=a.createGain();voice.type='sawtooth';voice.frequency.setValueAtTime(165,t);voice.frequency.exponentialRampToValueAtTime(85,t+.17);filter.type='lowpass';filter.frequency.setValueAtTime(1550,t);filter.frequency.exponentialRampToValueAtTime(380,t+.18);gain.gain.setValueAtTime(.0001,t);gain.gain.linearRampToValueAtTime(.11,t+.018);gain.gain.exponentialRampToValueAtTime(.0001,t+.19);voice.connect(filter);filter.connect(gain);gain.connect(a.destination);voice.start(t);voice.stop(t+.2);
 }return true;
}
function cityPetAnimation(node,frames,options,w){return new Promise(resolve=>{if(!node?.animate){resolve(true);return;}const a=node.animate(frames,options);w.anim=a;townDecorAnimations.add(a);const finish=ok=>{townDecorAnimations.delete(a);if(w.anim===a)w.anim=null;resolve(ok);};a.onfinish=()=>finish(true);a.oncancel=()=>finish(false);});}
async function turnCityPet(w,dx){
 if(Math.abs(dx)<.5)return true;const node=w.el.querySelector('.pet-facing');if(!node)return true;const sign=(dx<0?1:-1)*(w.item.fx?-1:1),before=w.facing??1;w.facing=sign;node.dataset.facing=dx<0?'left':'right';node.style.transform='scaleX('+sign+')';if(sign===before||lowEffects||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return true;
 return cityPetAnimation(node,[{transform:'scaleX('+before+')'},{transform:'scaleX(0)',offset:.5},{transform:'scaleX('+sign+')'}],{duration:220,easing:'ease-in-out'},w);
}