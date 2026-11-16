function workshopSoundProfile(kind,phase){
 if(kind==='kitchen')return phase==='gather'?[{type:'sine',hz:240,end:130,delay:0,time:.07,volume:.04},{type:'triangle',hz:320,end:190,delay:.055,time:.055,volume:.025}]:[{type:'triangle',hz:330,end:250,delay:0,time:.09,volume:.035},{type:'sine',hz:720,end:920,delay:.04,time:.16,volume:.025},{type:'sine',hz:1080,end:1080,delay:.07,time:.12,volume:.012}];
 return phase==='gather'?[{type:'triangle',hz:1050,end:820,delay:0,time:.09,volume:.027},{type:'sine',hz:1480,end:1220,delay:.045,time:.1,volume:.02}]:[{type:'sine',hz:155,end:62,delay:0,time:.09,volume:.055},{type:'triangle',hz:1850,end:1720,delay:.015,time:.2,volume:.027},{type:'sine',hz:2620,end:2490,delay:.025,time:.17,volume:.013}];
}
function workshopMergeSound(kind,phase='complete'){
 if(muted)return;const a=actx();if(!a||a.state!=='running')return;
 for(const voice of workshopSoundProfile(kind,phase)){const oscillator=a.createOscillator(),gain=a.createGain(),at=a.currentTime+voice.delay;oscillator.type=voice.type;oscillator.frequency.setValueAtTime(voice.hz,at);oscillator.frequency.exponentialRampToValueAtTime(voice.end,at+voice.time);gain.gain.setValueAtTime(.0001,at);gain.gain.linearRampToValueAtTime(voice.volume,at+.006);gain.gain.exponentialRampToValueAtTime(.0001,at+voice.time);oscillator.connect(gain);gain.connect(a.destination);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};oscillator.start(at);oscillator.stop(at+voice.time+.015);}
}
