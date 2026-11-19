let friendsRequestVersion=0,friendsRows=[],friendLayouts=[],mySharedLayouts=[],friendsSelected=null,friendsMutating=false;
function socialAllowed(){return !!onlinePlayer&&!sandboxSession&&!testRun&&!booting;}
function friendCanApply(){return active&&day>0&&lives>0&&$('townP').style.display==='flex'&&$('title').style.display==='none';}
function friendCityPreset(id){return friendLayouts.find(p=>p.id===id)||null;}
function socialStatus(text){$('friendsStatus').textContent=text;}
function socialStillCurrent(profile,version){return onlinePlayer?.id===profile.id&&version===friendsRequestVersion;}
async function openFriends(){
 const version=++friendsRequestVersion;friendsRows=[];friendLayouts=[];friendsSelected=null;mySharedLayouts=[];$('friendsP').style.display='flex';$('friendLayoutsSection').hidden=true;
 $('friendsIdentity').textContent=onlinePlayer?'玩家：'+onlinePlayer.name:'先建立或取回排行榜玩家身份，即可使用好友。';$('friendName').disabled=!socialAllowed();$('friendAdd').disabled=!socialAllowed();$('friendsAccount').hidden=!!onlinePlayer;$('friendsList').innerHTML='';$('mySharedLayouts').innerHTML='';
 if(!socialAllowed()){socialStatus(sandboxSession||testRun?'後台與教學不會讀寫好友或分享造景。':'好友清單會跟隨你的玩家身份保存。');return;}
 const profile={...onlinePlayer};socialStatus('正在讀取好友…');
 try{const [data,shared]=await Promise.all([onlineAPI('friends',{profile}),onlineAPI('layouts/mine',{profile})]);if(!socialStillCurrent(profile,version))return;friendsRows=data.friends;mySharedLayouts=shared.layouts;renderFriends();socialStatus('以完整玩家名稱加入好友；每位好友只顯示個人最高成績。');}
 catch(e){if(socialStillCurrent(profile,version))socialStatus(e.status===404?'好友服務尚待更新，請稍後再試。':e.message);}
}
function renderFriends(){
 $('friendsList').innerHTML=friendsRows.length?friendsRows.map((f,i)=>'<article class="friend-row"><span class="player-avatar">'+avatarSVG(normalizeAvatar(f.best?.avatar||AVATAR_DEFAULT))+'</span><div><b>'+esc(f.name)+'</b><small>'+(f.best?'最高 '+f.best.score.toLocaleString()+' 分 · 第 '+f.best.day+' 天':'尚未上傳成績')+'</small></div><button data-friend-layouts="'+i+'">造景</button><button data-friend-remove="'+i+'" aria-label="移除好友'+esc(f.name)+'">×</button></article>').join(''):'<p class="city-note">還沒有好友，輸入玩家名稱來加入。</p>';
 $('mySharedLayouts').innerHTML='<h3>我分享的造景</h3>'+(mySharedLayouts.length?mySharedLayouts.map(p=>'<div class="friend-shared-row"><span>'+esc(p.name)+'<small>'+cityContextLabel(DECOR_SEASONS.indexOf(p.season),p.night)+'</small></span><button data-unshare-layout="'+esc(p.id)+'">取消分享</button></div>').join(''):'<p class="city-note">在建築師的城鎮版型中，按「分享給好友」即可分享；不會自動上傳。</p>');
}
async function addFriendByName(){
 if(!socialAllowed()||friendsMutating)return;const profile={...onlinePlayer},name=$('friendName').value.trim();if(!name){socialStatus('請輸入好友的完整玩家名稱。');return;}friendsMutating=true;$('friendAdd').disabled=true;
 try{await onlineAPI('friends/add',{method:'POST',body:{name},profile});if(onlinePlayer?.id!==profile.id)return;$('friendName').value='';await openFriends();socialStatus('已加入好友「'+name+'」。');}catch(e){socialStatus(e.message);}finally{friendsMutating=false;$('friendAdd').disabled=!socialAllowed();}
}
async function removeFriend(index){
 const friend=friendsRows[index];if(!socialAllowed()||!friend||friendsMutating)return;const profile={...onlinePlayer};friendsMutating=true;
 try{await onlineAPI('friends/remove',{method:'POST',body:{friendId:friend.playerId},profile});if(onlinePlayer?.id===profile.id){await openFriends();socialStatus('已移除好友。');}}catch(e){socialStatus(e.message);}finally{friendsMutating=false;}
}
async function openFriendLayouts(index){
 const friend=friendsRows[index];if(!socialAllowed()||!friend)return;const profile={...onlinePlayer},version=++friendsRequestVersion,season=DECOR_SEASONS[seasonIndex()],night=isSandboxNight();friendsSelected=friend;friendLayouts=[];$('friendLayoutsSection').hidden=false;$('friendLayoutsTitle').textContent=friend.name+' · '+cityContextLabel()+'造景';$('friendLayoutsList').innerHTML='';$('friendLayoutsNote').textContent='正在讀取好友分享的版型…';
 try{const data=await onlineAPI('friends/layouts?friendId='+encodeURIComponent(friend.playerId)+'&season='+season+'&night='+(night?'1':'0'),{profile});if(!socialStillCurrent(profile,version)||season!==DECOR_SEASONS[seasonIndex()]||night!==isSandboxNight())return;
  friendLayouts=data.layouts.map(p=>({...p,id:'friend-'+friend.playerId+'-'+p.id,sourceId:p.id,authorName:friend.name}));$('friendLayoutsNote').textContent='僅顯示目前季節與時段。缺少的裝飾可補齊；套用後仍需按建築師 ✅ 確認儲存。';
  $('friendLayoutsList').innerHTML=friendLayouts.length?friendLayouts.map(p=>{const q=quoteCityPreset(p);return '<article class="friend-layout-card"><b>'+esc(p.name)+'</b><small>'+p.items.length+' 件裝飾 · '+(q.cost?'缺少裝飾共 '+q.cost+' 金幣':'裝飾已備齊')+'</small><button data-friend-preview-layout="'+esc(p.id)+'">預覽造景</button><button class="pri" data-friend-apply-layout="'+esc(p.id)+'" '+(!q.valid||!friendCanApply()||coins<q.cost?'disabled':'')+'>'+(q.cost?'補齊並套用':'套用造景')+'</button></article>';}).join(''):'<p>好友還沒有分享這個季節與時段的造景。</p>';
 }catch(e){if(socialStillCurrent(profile,version))$('friendLayoutsNote').textContent=e.message;}
}
function applyFriendCityLayout(id){
 const p=friendCityPreset(id);if(!socialAllowed()||!friendCanApply()||!p||p.season!==DECOR_SEASONS[seasonIndex()]||!!p.night!==isSandboxNight())return false;
 if(!architect.active){beginCityEdit();renderTown();}const result=applyCityLayout(id,true);if(result)closeP('friendsP');return result;
}
function shareCityPreset(id){
 const p=readCityPresets().find(p=>p.id===id);if(!p)return;if(!socialAllowed()||onlineNameKey(playerName)!==onlineNameKey(onlinePlayer.name)){toast('請使用這局玩家的排行榜身份；後台與教學不分享造景。');return;}
 if(!cityContextEditable()||p.season!==DECOR_SEASONS[seasonIndex()]||!!p.night!==isSandboxNight()){toast('只能分享目前季節與時段的版型。');return;}
 confirmBox('分享造景給好友？','會上傳「'+p.name+'」的擺設、玩家名稱與頭像；加入你為好友的玩家即可預覽及套用。','分享',()=>publishCityPreset(p));
}
async function publishCityPreset(p){
 if(!socialAllowed()||!cityContextEditable()||p.season!==DECOR_SEASONS[seasonIndex()]||!!p.night!==isSandboxNight())return false;const profile={...onlinePlayer};
 try{await onlineAPI('layouts/share',{method:'POST',body:{id:p.id,name:p.name,season:p.season,night:!!p.night,items:p.items,avatar:normalizeAvatar(playerAvatar)},profile});if(onlinePlayer?.id===profile.id)toast('已分享造景；好友可在對應季節與時段套用。');return true;}catch(e){toast('分享未完成：'+e.message);return false;}
}
async function unshareCityPreset(id){if(!socialAllowed())return;const profile={...onlinePlayer};try{await onlineAPI('layouts/remove',{method:'POST',body:{id},profile});if(onlinePlayer?.id===profile.id){await openFriends();socialStatus('已取消分享，自己的儲存版型仍保留。');}}catch(e){socialStatus(e.message);}}
function installFriendsControls(){
 $('friendsList').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;if(b.dataset.friendLayouts!==undefined)openFriendLayouts(+b.dataset.friendLayouts);else if(b.dataset.friendRemove!==undefined)removeFriend(+b.dataset.friendRemove);};
 $('mySharedLayouts').onclick=e=>{const b=e.target.closest('[data-unshare-layout]');if(b&&!b.disabled)unshareCityPreset(b.dataset.unshareLayout);};
 $('friendLayoutsList').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;if(b.dataset.friendPreviewLayout)openCityLayoutPreview(b.dataset.friendPreviewLayout).catch(()=>toast('暫時無法產生預覽，請再試一次。'));else if(b.dataset.friendApplyLayout)applyFriendCityLayout(b.dataset.friendApplyLayout);};
}
installFriendsControls();
