

const WEAPON_STAR_THRESHOLDS=[0,3,6,9],WEAPON_STAR_BONUSES=[0,.05,.1,.2];
let weaponMastery=new Map();
const forgeLevelUps=new WeakSet();
function weaponMasteryKey(w){
 if(isLegend(w))return 'l:'+w.legendId;
 return w&&Number.isInteger(w.c)&&w.c>=0&&w.c<10&&Number.isInteger(w.t)&&w.t>=0&&w.t<5?'n:'+w.c+':'+w.t:null;
}
function validMasteryKey(key){return typeof key==='string'&&(/^(?:n:[0-9]:[0-4]|l:(?:[0-9]|1[0-9]))$/).test(key);}
function weaponStarLevel(w){return Number.isInteger(w?.stars)?Math.max(0,Math.min(3,w.stars)):0;}
function weaponStarBonus(w){return WEAPON_STAR_BONUSES[weaponStarLevel(w)];}
function weaponStarXp(w){return Math.max(WEAPON_STAR_THRESHOLDS[weaponStarLevel(w)],Math.min(1000000,Math.floor(Number(w?.starXp)||0)));}
function weaponStarsHTML(w,large=false){
 if(!weaponMasteryKey(w))return '';const level=weaponStarLevel(w);
 return '<span class="weapon-stars'+(large?' stars-large':'')+'" role="img" aria-label="'+level+' 星"><span>'+('★'.repeat(level))+'</span><i>'+('☆'.repeat(3-level))+'</i></span>';
}
function weaponMasteryHTML(w){
 if(!weaponMasteryKey(w))return '';const level=weaponStarLevel(w),xp=weaponStarXp(w),next=WEAPON_STAR_THRESHOLDS[level+1];
 return '<div class="weapon-mastery">'+weaponStarsHTML(w,true)+'<b>'+level+' 星 · 鍛造經驗 '+xp+' 把</b><small>'+(level===3?'已達三星':('累計 '+next+' 把升到 '+(level+1)+' 星，還差 '+Math.max(0,next-xp)+' 把'))+'</small><small>基礎售價、攻擊、防禦、速度 +'+Math.round(weaponStarBonus(w)*100)+'% · 附魔效果另計</small><span>同名稱、同階級獨立累計；每局重新成長。</span></div>';
}
function masterySample(w){const count=weaponMastery.get(weaponMasteryKey(w))||0;return {...w,stars:Math.min(3,Math.floor(count/3)),starXp:count};}
function galleryWeapon(c,t){const w=baseAlbumWeapon(c,t);return albumFromHome?w:masterySample(w);}
function syncMasteryWeapons(key){
 const count=weaponMastery.get(key)||0,level=Math.min(3,Math.floor(count/3));
 [...g,...pack,...bag,hand].forEach(w=>{if(w?.k==='w'&&weaponMasteryKey(w)===key){w.stars=level;w.starXp=count;}});
 best.forEach((w,c)=>{if(w&&weaponMasteryKey({...w,c})===key){w.stars=level;w.starXp=count;}});
}
function recordWeaponCraft(w){
 const key=weaponMasteryKey(w);if(day<1||!key)return 0;
 const previous=weaponMastery.get(key)||0,count=Math.min(1000000,previous+1),level=Math.min(3,Math.floor(count/3));weaponMastery.set(key,count);syncMasteryWeapons(key);w.stars=level;w.starXp=count;
 if(level>Math.min(3,Math.floor(previous/3))){forgeLevelUps.add(w);toast(itemName(w)+' 升至 '+('★'.repeat(level))+'！售價與攻防速 +'+Math.round(weaponStarBonus(w)*100)+'%');}
 return level;
}
function snapshotWeaponMastery(){return {version:1,counts:[...weaponMastery]};}
function restoreWeaponMastery(raw){
 weaponMastery=new Map();if(raw?.version===1&&Array.isArray(raw.counts))for(const row of raw.counts.slice(0,70))if(Array.isArray(row)&&validMasteryKey(row[0])&&Number.isSafeInteger(row[1])&&row[1]>=0&&row[1]<=1000000)weaponMastery.set(row[0],Math.max(weaponMastery.get(row[0])||0,row[1]));
 // Legacy weapons keep their existing snapshots. Loading never awards craft XP.
 for(const key of weaponMastery.keys())syncMasteryWeapons(key);
}