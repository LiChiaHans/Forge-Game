

const BACKUP_KEYS=['forgeSaves','forgeRecs','forgeHi','forgeName','forgeAvatarPresetV1','forgeWeaponAlbumV1','forgeLegendBlueprintsV1','forgeLegendCollectionV1','forgeTownLayoutsV1','forgeDishAlbumV1','forgeFestivalBadgesV1'];
let pendingBackup=null,lowEffects=localStorage.getItem('forgeLowEffectsV1')==='1';
function captureBackup(){
 if(sandboxSession||testRun)throw new Error('後台測試資料不會匯出，請先回到首頁');saveNow();return {format:'ForgeMasterBackup',version:1,exportedAt:new Date().toISOString(),data:Object.fromEntries(BACKUP_KEYS.map(k=>[k,localStorage.getItem(k)]))};
}
function validateBackup(text){
 if(typeof text!=='string'||text.length>8000000)throw new Error('備份檔過大或格式錯誤');let v;try{v=JSON.parse(text);}catch{throw new Error('檔案不是有效的 JSON 備份');}
 if(v?.format!=='ForgeMasterBackup'||v.version!==1||!v.data||typeof v.data!=='object'||Array.isArray(v.data))throw new Error('這不是支援的 Forge Master 備份');
 if(Object.keys(v.data).some(k=>!BACKUP_KEYS.includes(k)))throw new Error('備份含有不支援的欄位');
 if(!Object.hasOwn(v.data,'forgeFestivalBadgesV1'))v.data.forgeFestivalBadgesV1=null;if(!Object.hasOwn(v.data,'forgeDishAlbumV1'))v.data.forgeDishAlbumV1=null;for(const key of BACKUP_KEYS)if(v.data[key]!==null&&typeof v.data[key]!=='string')throw new Error('備份欄位不完整：'+key);
 const number=(n,min=0,max=1e15)=>typeof n==='number'&&Number.isFinite(n)&&n>=min&&n<=max;
 const item=w=>{if(w===null)return true;if(!w||typeof w!=='object')return false;if(w.k==='w')return (!('stars'in w)||Number.isInteger(w.stars)&&w.stars>=0&&w.stars<=3)&&(!('starXp'in w)||Number.isSafeInteger(w.starXp)&&w.starXp>=0&&w.starXp<=1000000)&&Number.isInteger(w.c)&&w.c>=0&&w.c<10&&Number.isInteger(w.t)&&w.t>=0&&w.t<5&&(!('legendId'in w)||validLegendId(w.legendId)&&w.legendCore&&['atk','def','spd'].every(k=>number(w.legendCore[k],1,1e9)));if(w.k==='o'||w.k==='d')return Number.isInteger(w.t)&&w.t>=0&&w.t<5;if(w.k==='p')return Number.isInteger(w.s)&&w.s>=0&&w.s<3&&Number.isInteger(w.t)&&w.t>=0&&w.t<5;if(w.k==='m')return Number.isInteger(w.s)&&w.s>=0&&w.s<=3;if(['f','u','z','l'].includes(w.k))return true;if(w.k==='seed'||w.k==='ess')return validElement(w.element);return w.k==='bp'&&validLegendId(w.id);};
 const parse=(key,fallback)=>{try{return v.data[key]===null?fallback:JSON.parse(v.data[key]);}catch{throw new Error('備份內容損壞：'+key);}};
 const saves=parse('forgeSaves',[]),records=parse('forgeRecs',[]);if(!Array.isArray(saves)||saves.length>3||!Array.isArray(records)||records.length>5)throw new Error('存檔或歷史紀錄數量不符');
 const ids=new Set();for(const save of saves){const s=save?.state;if(s?.restaurant)validateRestaurant(s.restaurant,s.day);if(!s||!number(save.id)||ids.has(save.id)||typeof save.name!=='string'||save.name.length>100)throw new Error('存檔格式錯誤');ids.add(save.id);
  for(const key of ['coins','earned','all','dTot','dServed','dEarn','dLeft','magic','dMagic','dSold'])if(!number(s[key]))throw new Error('存檔數值錯誤：'+key);
  if(!Number.isInteger(s.day)||s.day<1||!Number.isInteger(s.lives)||s.lives<1||s.lives>3||!s.skills||typeof s.skills!=='object'||Object.keys(SK).some(k=>s.skills[k]!==undefined&&(!Number.isInteger(s.skills[k])||s.skills[k]<0||s.skills[k]>3)))throw new Error('存檔日期、生命或技能不符');
  if(!Array.isArray(s.g)||s.g.length<30||s.g.length>42||!s.g.every(item)||!Array.isArray(s.heat)||s.heat.length<30||!s.heat.every(n=>number(n,0,100000)))throw new Error('棋盤內容錯誤');
  for(const key of ['pack','bag'])if(!Array.isArray(s[key])||s[key].length>10000||!s[key].every(item))throw new Error('物品欄內容錯誤');
  if(!item(s.hand)||!Array.isArray(s.best)||s.best.length!==10||!s.best.every((w,c)=>!w||item({...w,k:'w',c})))throw new Error('武器內容錯誤');
  if(!Array.isArray(s.Q)||s.Q.length!==5||!s.Q.every(t=>Number.isInteger(t)&&t>=0&&t<5)||!Array.isArray(s.MQ)||s.MQ.length<1||s.MQ.length>3||!s.MQ.every(t=>Number.isInteger(t)&&t>=0&&t<4))throw new Error('佇列內容錯誤');
  for(const key of ['orders','dq'])if(!Array.isArray(s[key])||s[key].length>20||!s[key].every(o=>o&&number(o.t,0,4)&&(o.c===null||Number.isInteger(o.c)&&o.c>=0&&o.c<10)&&number(o.wait)&&number(o.max)))throw new Error('訂單內容錯誤');
  if(s.legendProjects&&(!Array.isArray(s.legendProjects)||s.legendProjects.length>10||!s.legendProjects.every(p=>validLegendId(p.id)&&Array.isArray(p.filled)&&p.filled.every(item))))throw new Error('藍圖內容錯誤');
 }
 if(records.some(r=>!r||!number(r.score)||typeof r.name!=='string'||!Array.isArray(r.best)||r.best.length!==10||!r.best.every((w,c)=>!w||item({...w,k:'w',c}))))throw new Error('歷史紀錄內容錯誤');
 if(v.data.forgeHi!==null&&!/^\d+(?:\.\d+)?$/.test(v.data.forgeHi))throw new Error('最高分格式錯誤');
 for(const key of ['forgeWeaponAlbumV1','forgeLegendBlueprintsV1','forgeLegendCollectionV1','forgeTownLayoutsV1'])if(!Array.isArray(parse(key,[])))throw new Error('收藏內容錯誤');
 const medals=parse('forgeFestivalBadgesV1',[]);if(!Array.isArray(medals)||medals.some(i=>!Number.isInteger(i)||i<0||i>3))throw new Error('紀念章收藏內容錯誤');
 const dishes=parse('forgeDishAlbumV1',[]);if(!Array.isArray(dishes)||dishes.some(k=>!validAlbumKey(k)))throw new Error('料理收藏內容錯誤');if(parse('forgeTownLayoutsV1',[]).length>40)throw new Error('版型數量過多');return {value:v,saves:saves.length,records:records.length};
}
function downloadBackup(){
 try{const backup=captureBackup(),url=URL.createObjectURL(new Blob([JSON.stringify(backup)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='Forge_Master_備份_'+new Date().toISOString().replace(/[:.]/g,'-')+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('backupStatus').textContent='已下載備份。請妥善保存；排行榜身份識別碼需另外保管。';}catch(e){$('backupStatus').textContent=e.message;}
}
async function readBackupFile(input){
 pendingBackup=null;$('backupRestore').disabled=true;const file=input.files?.[0];if(!file)return;
 try{if(file.size>8000000)throw new Error('備份檔超過 8 MB');const checked=validateBackup(await file.text());pendingBackup=checked.value;$('backupStatus').textContent='備份可還原：'+checked.saves+' 個存檔、'+checked.records+' 筆紀錄。匯出日期：'+checked.value.exportedAt;$('backupRestore').disabled=sandboxSession||testRun;}catch(e){$('backupStatus').textContent=e.message;}
}
function applyBackup(backup){
 if(sandboxSession||testRun)throw new Error('後台模式不能還原正式資料');const checked=validateBackup(JSON.stringify(backup)),previous=Object.fromEntries(BACKUP_KEYS.map(k=>[k,localStorage.getItem(k)]));
 try{for(const key of BACKUP_KEYS){const value=checked.value.data[key];if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,value);}}
 catch(e){for(const key of BACKUP_KEYS)localStorage.removeItem(key);for(const key of BACKUP_KEYS)if(previous[key]!==null)localStorage.setItem(key,previous[key]);throw new Error('儲存空間不足，已保留原有資料');}
 active=false;location.reload();return true;
}
function confirmBackupRestore(){
 if(!pendingBackup||sandboxSession||testRun)return;confirmBox('還原這份備份？','這會替換本機存檔、歷史紀錄與收藏。建議先下載目前備份；排行榜身份與雲端最高分不會被替換。','還原備份',()=>{try{applyBackup(pendingBackup);}catch(e){$('backupStatus').textContent=e.message;}});
}
function setLowEffects(value){lowEffects=!!value;gameStorage.setItem('forgeLowEffectsV1',lowEffects?'1':'0');document.body.classList.toggle('low-effects',lowEffects);$('lowEffectsToggle').checked=lowEffects;syncTownMotion();if(!lowEffects&&$('townP').style.display==='flex')renderTown();}
function openBackup(){pendingBackup=null;$('backupRestore').disabled=true;$('backupDownload').disabled=sandboxSession||testRun;$('backupFile').disabled=sandboxSession||testRun;$('backupStatus').textContent=sandboxSession||testRun?'後台測試不能匯出或還原正式資料。':'備份包含存檔、無限遠征進度、城鎮、收藏與版型，不包含排行榜身份識別碼。';$('lowEffectsToggle').checked=lowEffects;closeP('svP');closeP('help');$('backupP').style.display='flex';}