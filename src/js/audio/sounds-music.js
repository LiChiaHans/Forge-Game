

let muted=false;
try{muted=gameStorage.getItem("forgeMute")==="1"}catch(e){}
const enter=new Map();
let exitMs=0,ac=null;

const SEASON_MUSIC_DATA={"home":"assets/music/home.eb2413bfbaed.mp3","spring":"assets/music/spring.0b5a6ee3a097.mp3","summer":"assets/music/summer.21c0e5ecb503.mp3","autumn":"assets/music/autumn.410f304ae451.mp3","winter":"assets/music/winter.e3da5cc9a782.mp3"};
/* Decode only the current season. Normalize its faded PCM peak without re-encoding MP3. */
const seasonMusic={wanted:null,pending:null,version:0,voice:null,master:null,cached:null,failed:null};
function seasonMusicRamp(param,value,seconds){
 const t=ac.currentTime;
 if(param.cancelAndHoldAtTime)param.cancelAndHoldAtTime(t);
 else{const held=param.value;param.cancelScheduledValues(t);param.setValueAtTime(held,t);}
 param.linearRampToValueAtTime(value,t+seconds);
}
function retireSeasonMusic(seconds=1.2){
 const voice=seasonMusic.voice;if(!voice)return;
 seasonMusic.voice=null;seasonMusicRamp(voice.gain.gain,0,seconds);
 voice.source.stop(ac.currentTime+seconds+.02);
}
async function decodeSeasonMusic(id,a){
 if(seasonMusic.cached?.id===id)return seasonMusic.cached.buffer;
 const response=await fetch(SEASON_MUSIC_DATA[id]);
 const buffer=await a.decodeAudioData(await response.arrayBuffer());
 // Detect leading silence so Home BGM starts immediately on the first audible note.
 let startSample=0;
 if(buffer.numberOfChannels>0){
  const ch0=buffer.getChannelData(0),limit=Math.min(ch0.length,Math.floor(buffer.sampleRate*8));
  for(let i=0;i<limit;i++){if(Math.abs(ch0[i])>0.014){startSample=Math.max(0,i-Math.floor(buffer.sampleRate*0.03));break;}}
 }
 buffer.trimStart=startSample/buffer.sampleRate;
 const fadeSec=id==='home'?0.18:Math.min(2,buffer.duration/4);
 const fade=Math.max(1,fadeSec*buffer.sampleRate);
 let peak=0;
 // Bake both fades into the loop so they still work in background tabs.
 for(let channel=0;channel<buffer.numberOfChannels;channel++){
  const pcm=buffer.getChannelData(channel);
  for(let i=0;i<pcm.length;i++){
   const rel=Math.max(0,i-startSample);
   pcm[i]*=Math.min(1,rel/fade,(pcm.length-1-i)/fade);
   peak=Math.max(peak,Math.abs(pcm[i]));
  }
 }
 const scale=peak>0?.32/peak:1;
 for(let channel=0;channel<buffer.numberOfChannels;channel++){
  const pcm=buffer.getChannelData(channel);for(let i=0;i<pcm.length;i++)pcm[i]*=scale;
 }
 return buffer;
}
function syncSeasonMusic(){
 const id=$('title').style.display==='none'?SEASONS[seasonIndex()].id:'home';
 if(id!==seasonMusic.wanted){seasonMusic.wanted=id;seasonMusic.version++;seasonMusic.pending=null;seasonMusic.failed=null;}
 if(seasonMusic.master)seasonMusicRamp(seasonMusic.master.gain,muted?0:1,.08);
 if(!id){retireSeasonMusic();return;}
 if(seasonMusic.voice?.id===id||seasonMusic.pending===id||seasonMusic.failed===id)return;
 const a=actx();if(!a)return;
 if(!seasonMusic.master){seasonMusic.master=a.createGain();seasonMusic.master.gain.value=muted?0:1;seasonMusic.master.connect(a.destination);}
 const version=seasonMusic.version;seasonMusic.pending=id;
 decodeSeasonMusic(id,a).then(buffer=>{
  if(version!==seasonMusic.version||seasonMusic.wanted!==id)return;
  seasonMusic.cached={id,buffer};
  const source=a.createBufferSource(),gain=a.createGain();
  const offset=buffer.trimStart||0;
  source.buffer=buffer;source.loop=true;if(offset>0)source.loopStart=offset;
  gain.gain.value=0;
  source.connect(gain);gain.connect(seasonMusic.master);
  source.onended=()=>{source.disconnect();gain.disconnect();};
  retireSeasonMusic();
  seasonMusic.voice={id,source,gain};source.start(0,offset);seasonMusicRamp(gain.gain,1,id==='home'?.15:1.2);
 }).catch(error=>{
  if(version===seasonMusic.version){seasonMusic.failed=id;retireSeasonMusic();console.warn('Season music could not load; will retry on the next interaction.',error);}
 }).finally(()=>{
  // An older request must not clear a newer request for the same season.
  if(version===seasonMusic.version&&seasonMusic.pending===id)seasonMusic.pending=null;
 });
}
function installSeasonMusic(){
 if(typeof MutationObserver!=='undefined')new MutationObserver(syncSeasonMusic).observe($('title'),{attributes:true,attributeFilter:['style']});
 const unlock=()=>{
  seasonMusic.failed=null;const a=actx();if(a?.state==='suspended')a.resume().catch(()=>{});syncSeasonMusic();
 };
 document.addEventListener('pointerdown',unlock);document.addEventListener('keydown',unlock);
 syncSeasonMusic();
}

function actx(){
  if(!ac){try{ac=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}
  if(ac&&ac.state==="suspended")ac.resume();
  return ac;
}
document.addEventListener("pointerdown",()=>actx());
function steps(){
  if(muted)return;
  const a=actx();if(!a||a.state!=="running")return;
  const t0=a.currentTime;
  for(let k=0;k<6;k++){
    const t=t0+k*.2,v=.22*Math.pow(.6,k);
    const o=a.createOscillator(),g1=a.createGain();
    o.type="sine";o.frequency.setValueAtTime(120-k*6,t);
    o.frequency.exponentialRampToValueAtTime(50,t+.09);
    g1.gain.setValueAtTime(v,t);
    g1.gain.exponentialRampToValueAtTime(.0001,t+.12);
    o.connect(g1);g1.connect(a.destination);o.start(t);o.stop(t+.14);
    const buf=a.createBuffer(1,Math.floor(a.sampleRate*.05),a.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
    const n=a.createBufferSource(),f=a.createBiquadFilter(),g2=a.createGain();
    n.buffer=buf;f.type="lowpass";f.frequency.value=900;g2.gain.value=v*1.5;
    n.connect(f);f.connect(g2);g2.connect(a.destination);n.start(t);
  }
}
function thud(dl=.09){
  if(muted)return;
  const a=actx();if(!a||a.state!=="running")return;
  const t=a.currentTime+dl,o=a.createOscillator(),g1=a.createGain();
  o.type="sine";o.frequency.setValueAtTime(150,t);
  o.frequency.exponentialRampToValueAtTime(46,t+.12);
  g1.gain.setValueAtTime(.5,t);
  g1.gain.exponentialRampToValueAtTime(.0001,t+.2);
  o.connect(g1);g1.connect(a.destination);o.start(t);o.stop(t+.22);
  const buf=a.createBuffer(1,Math.floor(a.sampleRate*.05),a.sampleRate);
  const d=buf.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
  const n=a.createBufferSource(),f=a.createBiquadFilter(),g2=a.createGain();
  n.buffer=buf;f.type="lowpass";f.frequency.value=520;g2.gain.value=.3;
  n.connect(f);f.connect(g2);g2.connect(a.destination);n.start(t);
}
function flyIn(i,t){
  const src=document.querySelector("#q .q.first"),dst=$("grid").children[i];
  if(!src||!dst)return;
  const a=src.getBoundingClientRect(),b=dst.getBoundingClientRect(),pr=$("play").getBoundingClientRect();
  const el=document.createElement("div");el.className="gh";
  el.innerHTML=expandedGameEnabled()?cozyOreMarkup(t,0,true):`<div class="q" style="width:100%;height:100%;font-size:13px;background-color:${C[t]}">${NM[t]}</div>`;
  el.style.cssText=`left:${a.left-pr.left}px;top:${a.top-pr.top}px;width:${a.width}px;height:${a.height}px`;
  $("fx").appendChild(el);
  /* 只改圓球大小，不用 scale，文字大小全程不變 */
  const tw=b.width*.72,th=b.height*.72;
  const dx=b.left+b.width/2-a.left-tw/2,dy=b.top+b.height/2-a.top-th/2;
  el.animate([
    {width:a.width+"px",height:a.height+"px",transform:"translate(0,0)"},
    {width:tw+"px",height:th+"px",transform:`translate(${dx}px,${dy}px)`}
  ],{duration:150,easing:"cubic-bezier(.4,0,.6,1)"}).onfinish=()=>el.remove();
}
function bell(){} // Customer entrance is silent.
let combatNoiseBuffer=null,combatNoiseContext=null;
function combatSound(actor){
 if(muted)return;const a=actx();if(!a||a.state!=='running')return;const hero=actor==='hero',t=a.currentTime;
 if(combatNoiseContext!==a){combatNoiseContext=a;combatNoiseBuffer=a.createBuffer(1,Math.floor(a.sampleRate*.18),a.sampleRate);const data=combatNoiseBuffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*(1-i/data.length);}
 const noise=a.createBufferSource(),filter=a.createBiquadFilter(),gain=a.createGain();noise.buffer=combatNoiseBuffer;filter.type=hero?'bandpass':'lowpass';filter.Q.value=hero?.8:.6;
 filter.frequency.setValueAtTime(hero?2300:500,t);filter.frequency.exponentialRampToValueAtTime(hero?650:170,t+.13);
 gain.gain.setValueAtTime(.0001,t);gain.gain.linearRampToValueAtTime(hero?.38:.5,t+.012);gain.gain.exponentialRampToValueAtTime(.0001,t+.17);
 noise.connect(filter);filter.connect(gain);gain.connect(a.destination);noise.start(t);noise.stop(t+.18);
 const tone=a.createOscillator(),toneGain=a.createGain();tone.type=hero?'triangle':'sine';tone.frequency.setValueAtTime(hero?820:155,t);tone.frequency.exponentialRampToValueAtTime(hero?310:48,t+(hero?.1:.16));toneGain.gain.setValueAtTime(hero?.075:.34,t);toneGain.gain.exponentialRampToValueAtTime(.0001,t+.19);tone.connect(toneGain);toneGain.connect(a.destination);tone.start(t);tone.stop(t+.2);
}

function leave(gh,r){
  gh.classList.remove("hl","in");
  gh.style.cssText=`position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;margin:0;z-index:40;pointer-events:none`;
  document.body.appendChild(gh);steps();
  gh.animate([
    {transform:"scale(1)",opacity:1},
    {transform:"scale(.05)",opacity:0}
  ],{duration:600,easing:"ease-in"}).onfinish=()=>gh.remove();
}
const gem=(t,x="")=>`<svg class="gm ${x}" viewBox="0 0 24 24" shape-rendering="crispEdges"><path fill="#10202c" d="M6 1h12v3h3v3h2v6h-3v3h-3v3h-3v3h-4v-3H7v-3H4v-3H1V7h2V4h3z"/><path fill="${C[t]}" d="M6 3h12v3h3v6h-3v3h-3v3h-3v3h-1v-3H8v-3H5v-3H3V7h3z"/><path fill="#fff" opacity=".6" d="M7 4h10v3H7zM4 8h5v4H4z"/><path fill="#fff" opacity=".3" d="M10 8h4v8h-4z"/><path fill="#000" opacity=".2" d="M17 7h3v5h-3v3h-3v3h-2v-3h2v-3h3z"/><path class="sp" fill="#fff5d7" d="M6 5h2v2h2v2H8v2H6V9H4V7h2z"/></svg>`;