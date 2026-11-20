function workshopSoundProfile(kind,phase){
 if(kind==='kitchen')return phase==='gather'?[{type:'sine',hz:240,end:130,delay:0,time:.07,volume:.04},{type:'triangle',hz:320,end:190,delay:.055,time:.055,volume:.025}]:[{type:'triangle',hz:330,end:250,delay:0,time:.09,volume:.035},{type:'sine',hz:720,end:920,delay:.04,time:.16,volume:.025},{type:'sine',hz:1080,end:1080,delay:.07,time:.12,volume:.012}];
 return phase==='gather'?[{type:'triangle',hz:1050,end:820,delay:0,time:.09,volume:.027},{type:'sine',hz:1480,end:1220,delay:.045,time:.1,volume:.02}]:[{type:'sine',hz:155,end:62,delay:0,time:.09,volume:.055},{type:'triangle',hz:1850,end:1720,delay:.015,time:.2,volume:.027},{type:'sine',hz:2620,end:2490,delay:.025,time:.17,volume:.013}];
}
function workshopMergeSound(kind,phase='complete'){
 if(muted)return;const a=actx();if(!a||a.state!=='running')return;
 for(const voice of workshopSoundProfile(kind,phase)){const oscillator=a.createOscillator(),gain=a.createGain(),at=a.currentTime+voice.delay;oscillator.type=voice.type;oscillator.frequency.setValueAtTime(voice.hz,at);oscillator.frequency.exponentialRampToValueAtTime(voice.end,at+voice.time);gain.gain.setValueAtTime(.0001,at);gain.gain.linearRampToValueAtTime(voice.volume,at+.006);gain.gain.exponentialRampToValueAtTime(.0001,at+voice.time);oscillator.connect(gain);gain.connect(a.destination);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};oscillator.start(at);oscillator.stop(at+voice.time+.015);}
}
function workshopToolSound(kind){
 if(muted)return;const a=actx();if(!a||a.state!=='running')return;
 const profiles={
  blizzard:[{type:'sawtooth',hz:460,end:150,delay:0,time:.45,volume:.022},{type:'sine',hz:1480,end:2200,delay:.06,time:.24,volume:.02},{type:'triangle',hz:1960,end:1280,delay:.18,time:.32,volume:.018},{type:'sine',hz:2640,end:1760,delay:.32,time:.26,volume:.014}],
  icebucket:[{type:'triangle',hz:620,end:220,delay:0,time:.22,volume:.032},{type:'sine',hz:1180,end:1760,delay:.05,time:.18,volume:.024},{type:'sine',hz:1760,end:1320,delay:.14,time:.2,volume:.018}],
  burn:[{type:'sawtooth',hz:180,end:52,delay:0,time:.26,volume:.048},{type:'triangle',hz:420,end:110,delay:.03,time:.22,volume:.032},{type:'sawtooth',hz:740,end:260,delay:.07,time:.15,volume:.018}],
  clean:[{type:'sine',hz:660,end:1180,delay:0,time:.12,volume:.028},{type:'triangle',hz:980,end:1560,delay:.06,time:.14,volume:.024},{type:'sine',hz:1480,end:1980,delay:.12,time:.16,volume:.018}],
  upgrade:[{type:'triangle',hz:523,end:523,delay:0,time:.1,volume:.03},{type:'triangle',hz:659,end:659,delay:.065,time:.1,volume:.032},{type:'triangle',hz:784,end:784,delay:.13,time:.12,volume:.034},{type:'sine',hz:1046,end:1318,delay:.195,time:.24,volume:.036}],
  heal:[{type:'sine',hz:440,end:440,delay:0,time:.18,volume:.028},{type:'sine',hz:554,end:554,delay:.07,time:.2,volume:.03},{type:'sine',hz:659,end:659,delay:.14,time:.22,volume:.032},{type:'triangle',hz:880,end:1108,delay:.21,time:.3,volume:.026}],
  essence:[{type:'sine',hz:620,end:930,delay:0,time:.18,volume:.028},{type:'triangle',hz:930,end:1395,delay:.06,time:.22,volume:.024},{type:'sine',hz:1395,end:1860,delay:.13,time:.22,volume:.018}],
  spice:[{type:'triangle',hz:580,end:880,delay:0,time:.14,volume:.026},{type:'sine',hz:880,end:1320,delay:.06,time:.18,volume:.022},{type:'sine',hz:1174,end:1568,delay:.12,time:.18,volume:.016}],
  combo:[{type:'triangle',hz:587,end:587,delay:0,time:.08,volume:.03},{type:'triangle',hz:880,end:880,delay:.055,time:.1,volume:.034},{type:'sine',hz:1174,end:1480,delay:.11,time:.18,volume:.032}],
  fever:[{type:'sawtooth',hz:261,end:523,delay:0,time:.16,volume:.025},{type:'triangle',hz:523,end:784,delay:.07,time:.18,volume:.032},{type:'triangle',hz:784,end:1046,delay:.14,time:.22,volume:.036},{type:'sine',hz:1046,end:1568,delay:.21,time:.32,volume:.034}]
 };
 for(const v of (profiles[kind]||[])){const osc=a.createOscillator(),g=a.createGain(),at=a.currentTime+v.delay;osc.type=v.type;osc.frequency.setValueAtTime(v.hz,at);osc.frequency.exponentialRampToValueAtTime(v.end,at+v.time);g.gain.setValueAtTime(.0001,at);g.gain.linearRampToValueAtTime(v.volume,at+.008);g.gain.exponentialRampToValueAtTime(.0001,at+v.time);osc.connect(g);g.connect(a.destination);osc.onended=()=>{osc.disconnect();g.disconnect();};osc.start(at);osc.stop(at+v.time+.02);}
}
