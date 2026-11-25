
const LEADERBOARD_ORIGIN='https://forge-master-leaderboard.adeption.chatgpt.site';
const LB_PROFILE_KEY='forgeOnlinePlayerV1',LB_PENDING_KEY='forgeOnlinePendingV1';
let onlinePlayer=null,onlineRows=[],onlineMine=null,onlineBusy=false,onlineTimer=null,onlineNameCallback=null;
let onlineRequestVersion=0,onlineNameRequestVersion=0,onlineLastUpload=0,leaderboardSearchQuery='';
function readOnline(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'null')||fallback;}catch{return fallback;}}
function onlineNameKey(name){return String(name||'').normalize('NFKC').trim().replace(/\s+/g,' ').toLowerCase();}
function onlineAllowed(){return !sandboxSession&&!testRun&&!booting&&day>0&&onlinePlayer&&onlineNameKey(playerName)===onlineNameKey(onlinePlayer.name);}
function loadOnlinePlayer(){const p=readOnline(LB_PROFILE_KEY,null);onlinePlayer=p&&typeof p.id==='string'&&typeof p.name==='string'&&/^[a-f0-9]{64}$/.test(p.key)?p:null;}
loadOnlinePlayer();
async function onlineAPI(route,{method='GET',body,profile=onlinePlayer,signal}={}){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
 const abort=()=>controller.abort();signal?.addEventListener('abort',abort,{once:true});
 try{
  const headers={};if(body!==undefined)headers['Content-Type']='application/json';if(profile?.key)headers.Authorization='Bearer '+profile.key;
  const response=await fetch(LEADERBOARD_ORIGIN+'/api/'+route,{method,headers,body:body===undefined?undefined:JSON.stringify(body),signal:controller.signal,credentials:'omit',cache:'no-store',keepalive:route==='submit'});
  const data=await response.json();if(!response.ok)throw Object.assign(new Error(data.error||'排行榜暫時無法使用'),{status:response.status});return data;
 }catch(e){if(e.name==='AbortError')throw new Error('連線逾時，請確認網路後重試');throw e;}
 finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);}
}
function createOnlineKey(){if(!globalThis.crypto?.getRandomValues)throw new Error('此瀏覽器無法建立玩家識別碼');return Array.from(crypto.getRandomValues(new Uint8Array(32)),n=>n.toString(16).padStart(2,'0')).join('');}
function storeOnlinePlayer(p,key){onlinePlayer={id:p.id,name:p.name,key};localStorage.setItem(LB_PROFILE_KEY,JSON.stringify(onlinePlayer));onlineMine=null;renderOnlineAccount();}
async function claimOnlineName(name){
 if(sandboxSession||testRun)throw new Error('後台與教學不使用排行榜身份');
 if(onlinePlayer){if(onlineNameKey(name)!==onlineNameKey(onlinePlayer.name))throw new Error('目前使用「'+onlinePlayer.name+'」。若是另一位玩家，請先在排行榜選擇「切換玩家」。');return onlinePlayer;}
 let draft=readOnline('forgeOnlineClaimV1',null);
 if(draft&&onlineNameKey(draft.name)===onlineNameKey(name)){try{const own=await onlineAPI('me',{profile:{key:draft.key}});storeOnlinePlayer(own.player,draft.key);localStorage.removeItem('forgeOnlineClaimV1');return onlinePlayer;}catch(e){if(e.status!==401)throw e;}}
 const checking=await onlineAPI('name-check?name='+encodeURIComponent(name),{profile:null});if(!checking.available)throw new Error('這個名稱已被使用，請換一個名稱；若是你本人，可用玩家識別碼取回。');
 // Persist an unlisted claim key before the request so an interrupted response can be retried safely.
 if(!draft||onlineNameKey(draft.name)!==onlineNameKey(checking.name)){draft={name:checking.name,key:createOnlineKey()};localStorage.setItem('forgeOnlineClaimV1',JSON.stringify(draft));}
 const result=await onlineAPI('register',{method:'POST',body:{name:draft.name,ownerKey:draft.key},profile:null});storeOnlinePlayer(result.player,draft.key);localStorage.removeItem('forgeOnlineClaimV1');return onlinePlayer;
}
function onlineWeapon(w,c){if(!w)return null;const out={k:'w',c,t:w.t,m:w.m||0,b:w.b||0};for(const k of ['cs','parts','dts','element','legendId','legendCore','legendPrice','stars','starXp'])if(w[k]!==undefined)out[k]=JSON.parse(JSON.stringify(w[k]));return out;}
function captureOnlineRecord(){
 if(!onlineAllowed()||score()<=0)return null;
 return {mode:'normal',runMode:typeof activeRunMode==='function'?activeRunMode():'normal',runScope:typeof activeRunScope==='function'?activeRunScope():'both',testRun:false,sandbox:false,runId:String(runId),score:score(),earned,magic,day,served:all,quests:qDone,expedition:expeditionState.cleared.length,avatar:normalizeAvatar(playerAvatar),weapons:best.map((w,c)=>onlineWeapon(w,c)),skills:{...skills}};
}
function historicalOnlineRecord(r){
 if(!onlinePlayer||onlineNameKey(r.name)!==onlineNameKey(onlinePlayer.name)||!Number.isSafeInteger(r.score)||r.score<=0)return null;
 const legacy=!Number.isSafeInteger(r.earned)||!Number.isSafeInteger(r.magic);
 return {mode:'normal',runMode:r.runMode||'normal',runScope:r.runScope||'both',testRun:false,sandbox:false,legacy,runId:String(r.id),score:r.score,earned:legacy?0:r.earned,magic:legacy?0:r.magic,day:legacy?0:r.day,served:r.served||0,quests:r.quests||0,expedition:r.expedition||0,avatar:normalizeAvatar(r.avatar||AVATAR_DEFAULT),weapons:Array.from({length:10},(_,c)=>onlineWeapon(r.best?.[c],c)),skills:r.skills||{}};
}
function queueOnlineRecord(immediate=false){
 if(sandboxSession||testRun||booting||!onlinePlayer)return;
 const record=[captureOnlineRecord(),...recs.map(historicalOnlineRecord)].filter(Boolean).sort((a,b)=>b.score-a.score)[0];if(!record)return;
 const records=readOnline(LB_PENDING_KEY,{}),previous=records[onlinePlayer.id];if(onlineMine&&record.score<=onlineMine.score&&!previous)return;
 if(!previous||record.score>previous.score){records[onlinePlayer.id]=record;localStorage.setItem(LB_PENDING_KEY,JSON.stringify(records));}
 if(onlineTimer!==null)clearTimeout(onlineTimer);onlineTimer=setTimeout(()=>{onlineTimer=null;flushOnlineRecord(false);},immediate?0:Math.max(1800,15000-(Date.now()-onlineLastUpload)));
}
async function flushOnlineRecord(manual=false){
 if(sandboxSession||testRun||!onlinePlayer||onlineBusy)return false;
 const profile={...onlinePlayer},pending=readOnline(LB_PENDING_KEY,{})[profile.id];
 if(!pending){if(manual)$('leaderboardStatus').textContent=onlineMine?'目前已是最高紀錄。':'還沒有可上傳的正式遊戲成績。';return false;}
 onlineBusy=true;if(manual)$('leaderboardStatus').textContent='正在同步最高紀錄…';
 try{
  const result=await onlineAPI('submit',{method:'POST',body:pending,profile});
  const records=readOnline(LB_PENDING_KEY,{});if(records[profile.id]?.score<=pending.score){delete records[profile.id];localStorage.setItem(LB_PENDING_KEY,JSON.stringify(records));}
  if(onlinePlayer?.id===profile.id){onlineMine=result.best;if($('leaderboardP').style.display==='flex'){renderOnlineAccount();$('leaderboardStatus').textContent=result.improved?'最高紀錄已更新！':'已同步，保留原本較高的成績。';}}
  onlineLastUpload=Date.now();return true;
 }catch(e){if(manual)$('leaderboardStatus').textContent=e.message+'；紀錄已保留，連線後可重試。';return false;}
 finally{onlineBusy=false;}
}
function renderOnlineAccount(){
 const p=onlinePlayer;
 const pending=p?readOnline(LB_PENDING_KEY,{})[p.id]:null;
 const pendingNote=pending?'（待同步 '+pending.score.toLocaleString()+' 分）':'';
 $('leaderboardIdentity').innerHTML=p?pxIcon('trophy')+' 玩家：<b>'+esc(p.name)+'</b> · '+(onlineMine?'目前第 <b>'+onlineMine.rank+'</b> 名 · 最高 <b>'+onlineMine.score.toLocaleString()+'</b> 分':'尚未上傳成績')+pendingNote:'建立唯一玩家名稱，即可加入排行榜。';
 $('leaderboardRegisterForm').hidden=!!p;$('leaderboardAccountActions').hidden=!p;$('leaderboardKeyBox').hidden=true;
 $('leaderboardSwitch').hidden=!p;$('leaderboardSync').disabled=!p||sandboxSession||testRun;
 $('leaderboardLocalOnly').hidden=!(sandboxSession||testRun);
}
async function openLeaderboard(){
 const version=++onlineRequestVersion;$('leaderboardP').style.display='flex';renderOnlineAccount();$('leaderboardStatus').textContent='讀取排行榜中…';$('leaderboardList').innerHTML='';
 try{
  const data=await onlineAPI('leaderboard',{profile:null});if(version!==onlineRequestVersion)return;onlineRows=data.entries;
  $('leaderboardTotal').textContent='共 '+data.total+' 位玩家 · 顯示前 100 名';renderLeaderboardRows();
  if(onlinePlayer&&!sandboxSession&&!testRun){try{const profileId=onlinePlayer.id,mine=await onlineAPI('me');if(version===onlineRequestVersion&&onlinePlayer?.id===profileId){onlineMine=mine.best;renderOnlineAccount();}}catch(e){if(version===onlineRequestVersion)$('leaderboardStatus').textContent=e.message;return;}}
  if(version===onlineRequestVersion)$('leaderboardStatus').textContent='每位玩家只保留最高分，點擊紀錄可查看最佳武器。';
 }catch(e){if(version===onlineRequestVersion)$('leaderboardStatus').textContent='無法讀取排行榜：'+e.message+'，請稍後重新整理。';}
}
function leaderboardModeLabel(r){
 if(!r)return '';
 const scope=r.runScope&&typeof RUN_SCOPES!=='undefined'?RUN_SCOPES[r.runScope]?.name:'';
 const mode=r.runMode&&r.runMode!=='normal'&&typeof RUN_MODES!=='undefined'?RUN_MODES[r.runMode]?.name:'';
 return [scope,mode].filter(Boolean).join(' · ');
}
function jumpToMyLeaderboardRank(){
 const me=$('leaderboardList')?.querySelector('.leaderboard-row.is-me');
 if(!me){toast('目前前 100 名榜單中尚未找到你的紀錄。');return;}
 me.scrollIntoView({behavior:'smooth',block:'center'});
 me.classList.remove('is-pulse');void me.offsetWidth;me.classList.add('is-pulse');
}
function renderLeaderboardRows(){
 const list=$('leaderboardList');if(!list)return;
 if(!onlineRows.length){
  list.innerHTML='<div class="lb-empty">第一個傳奇故事，等待你來寫下。<p>目前還沒有上傳的紀錄。</p></div>';
  return;
 }
 const q=onlineNameKey(leaderboardSearchQuery);
 const indexed=onlineRows.map((r,i)=>({r,i})).filter(({r})=>!q||onlineNameKey(r.name).includes(q));
 const hasMe=onlineRows.some(r=>r.playerId===onlinePlayer?.id);
 const toolbar='<div class="lb-toolbar"><input id="leaderboardSearchInput" type="search" maxlength="20" placeholder="搜尋玩家名稱…" value="'+esc(leaderboardSearchQuery)+'" aria-label="搜尋排行榜玩家">'+(hasMe?'<button type="button" class="lb-jump-me" onclick="jumpToMyLeaderboardRank()">定位我的名次</button>':'')+'</div>';
 const rowsHtml=indexed.length?indexed.map(({r,i})=>{
  const rankCls=r.rank===1?' is-top1':r.rank===2?' is-top2':r.rank===3?' is-top3':'';
  const rankBadge=r.rank<=3?pxIcon('trophy'):'#'+r.rank;
  const modeTag=leaderboardModeLabel(r);
  const sub=r.day?'第 '+r.day+' 天 · 遠征 '+r.expedition+'/20'+(modeTag?' · '+modeTag:''):'舊版最高紀錄';
  return '<button class="leaderboard-row'+(r.playerId===onlinePlayer?.id?' is-me':'')+rankCls+'" data-online-row="'+i+'"><b class="lb-rank">'+rankBadge+'</b><span class="lb-avatar">'+avatarSVG(normalizeAvatar(r.avatar))+'</span><span class="lb-name"><em>'+esc(r.name)+'</em><small>'+esc(sub)+'</small></span><strong>'+r.score.toLocaleString()+'<small>分</small></strong></button>';
 }).join(''):'<div class="lb-empty">找不到符合「'+esc(leaderboardSearchQuery)+'」的玩家。</div>';
 list.innerHTML=toolbar+rowsHtml;
 const inp=$('leaderboardSearchInput');
 if(inp){
  inp.oninput=e=>{
   leaderboardSearchQuery=e.target.value||'';
   const pos=e.target.selectionStart||leaderboardSearchQuery.length;
   renderLeaderboardRows();
   const next=$('leaderboardSearchInput');
   if(next){next.focus();try{next.setSelectionRange(pos,pos);}catch{}}
  };
 }
}
function openLeaderboardRecord(index){
 const r=onlineRows[index];if(!r)return;
 const modeTag=leaderboardModeLabel(r);
 $('leaderboardDetailTitle').textContent='第 '+r.rank+' 名 · '+r.name;
 $('leaderboardDetailProfile').innerHTML='<span class="lb-detail-avatar">'+avatarSVG(normalizeAvatar(r.avatar))+'</span><div><strong>'+r.score.toLocaleString()+' 分</strong>'+(modeTag?'<p class="lb-detail-mode">'+esc(modeTag)+'</p>':'')+'<p>'+(r.day?'第 '+r.day+' 天':'天數未記錄')+' · 服務 '+r.served+' 位客人 · 完成 '+r.quests+' 個任務</p><p>'+(r.day?'遠征 '+r.expedition+'/20':'舊版紀錄，未保存遠征與技能資訊')+' · '+new Date(r.updatedAt).toLocaleString('zh-TW')+'</p></div>';
 $('leaderboardDetailWeapons').innerHTML=r.weapons.map((w,c)=>'<button class="lb-weapon" data-online-weapon="'+c+'" '+(!w?'disabled':'')+'>'+(w?hex(c,bands(w),'',w.t,w):'<span class="lb-unknown">?</span>')+'<small>'+esc(w?itemName(w):WN[c])+'</small></button>').join('');
 $('leaderboardDetailSkills').textContent='技能：'+(Object.keys(SK).filter(k=>r.skills[k]).map(k=>SK[k].n+' Lv'+r.skills[k]).join('、')||'無記錄');
 $('leaderboardDetailP').dataset.row=String(index);$('leaderboardDetailP').style.display='flex';
}
async function registerLeaderboardPlayer(){
 if(sandboxSession||testRun)return;$('leaderboardRegister').disabled=true;
 try{await claimOnlineName($('leaderboardName').value);$('leaderboardStatus').textContent='玩家名稱已建立。請保管玩家識別碼，換手機時可用它取回身份。';$('leaderboardKeyBox').hidden=false;$('leaderboardKey').value=onlinePlayer.key;queueOnlineRecord(true);}
 catch(e){$('leaderboardStatus').textContent=e.message;}finally{$('leaderboardRegister').disabled=false;}
}
async function restoreLeaderboardPlayer(){
 if(sandboxSession||testRun)return;const key=$('leaderboardRestoreKey').value.trim().toLowerCase();if(!/^[a-f0-9]{64}$/.test(key)){$('leaderboardStatus').textContent='請貼上完整的玩家識別碼。';return;}
 $('leaderboardRestore').disabled=true;try{const result=await onlineAPI('me',{profile:{key}});storeOnlinePlayer(result.player,key);onlineMine=result.best;$('leaderboardRestoreKey').value='';renderOnlineAccount();$('leaderboardStatus').textContent='已取回「'+onlinePlayer.name+'」的排行榜身份。';queueOnlineRecord(true);}catch(e){$('leaderboardStatus').textContent=e.message;}finally{$('leaderboardRestore').disabled=false;}
}
function switchLeaderboardPlayer(){
 confirmBox('切換排行榜玩家','請先保管目前玩家的識別碼。切換後，雲端最高紀錄仍會保留；可以建立新玩家，或用識別碼取回原玩家。','切換玩家',()=>{onlinePlayer=null;onlineMine=null;localStorage.removeItem(LB_PROFILE_KEY);renderOnlineAccount();$('leaderboardName').value='';$('leaderboardStatus').textContent='請建立另一位玩家，或貼上識別碼取回身份。';});
}
async function syncLeaderboardNow(){queueOnlineRecord(false);if(await flushOnlineRecord(true)){await openLeaderboard();$('leaderboardStatus').textContent='最高紀錄已同步。';}}
function installLeaderboard(){
 $('leaderboardList').onclick=e=>{const b=e.target.closest('[data-online-row]');if(b)openLeaderboardRecord(+b.dataset.onlineRow);};
 $('leaderboardDetailWeapons').onclick=e=>{const b=e.target.closest('[data-online-weapon]'),r=onlineRows[+$('leaderboardDetailP').dataset.row],w=r?.weapons[+b?.dataset.onlineWeapon];if(w)openCraftedWeapon(w,'排行榜 · '+r.name);};
 addEventListener('online',()=>{if(!sandboxSession&&!testRun)flushOnlineRecord(false);});
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&onlineAllowed()){queueOnlineRecord(true);}});
 setTimeout(()=>{if(onlinePlayer&&!sandboxSession&&!testRun)flushOnlineRecord(false);},1500);
}

document.body.classList.toggle("low-effects",lowEffects);
installLeaderboard();
installCityControls();importLegendProgress();start();fit();booting=false;render();installTownMotionObserver();installSeasonMusic();