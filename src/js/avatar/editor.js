

const AVATAR_OPTIONS={
 skin:[{n:'暖白',c:'#f2d4b7',s:'#c59374',h:'#ffe8cf'},{n:'桃膚',c:'#eab998',s:'#b77f64',h:'#f8d7b6'},{n:'米膚',c:'#dca77d',s:'#a47253',h:'#edc69a'},{n:'蜂蜜',c:'#c28e5b',s:'#8d5f3e',h:'#ddb382'},{n:'暖棕',c:'#ad7750',s:'#784c34',h:'#cd986c'},{n:'紅棕',c:'#986347',s:'#693f2f',h:'#b98764'},{n:'深棕',c:'#79503b',s:'#513329',h:'#9d7052'},{n:'烏棕',c:'#583c30',s:'#352720',h:'#7e5742'}],
 hairStyle:['短髮','側分','齊瀏海','刺蝟頭','捲髮','長髮','馬尾','光頭'],
 hairColor:[{n:'深黑',c:'#303039',s:'#171b24',h:'#54515b'},{n:'栗棕',c:'#73503a',s:'#3e302a',h:'#9c7352'},{n:'淺棕',c:'#ac7a4b',s:'#694d35',h:'#d4aa70'},{n:'金色',c:'#d7af60',s:'#98753b',h:'#f0d591'},{n:'銀白',c:'#cad6d4',s:'#84969b',h:'#f1f3de'},{n:'赤紅',c:'#b45f46',s:'#71382f',h:'#da8e62'},{n:'海藍',c:'#527d9b',s:'#334d67',h:'#84b2c0'},{n:'苔綠',c:'#6f8b58',s:'#405841',h:'#a2b67a'},{n:'紫羅蘭',c:'#8c699c',s:'#503f6c',h:'#b599c9'},{n:'粉紅',c:'#c884a0',s:'#87506d',h:'#e9b6c6'}],
 brows:['平眉','上揚眉','柔弧眉','濃眉','短眉','無眉'],
 eyes:['圓眼','杏眼','細眼','銳眼','笑眼','平視'],
 eyeColor:[{n:'墨黑',c:'#292a35'},{n:'棕色',c:'#815836'},{n:'琥珀',c:'#b68b3d'},{n:'湖藍',c:'#447f9d'},{n:'森林綠',c:'#548063'},{n:'紫色',c:'#806299'},{n:'灰色',c:'#839797'},{n:'玫瑰',c:'#a25c72'}],
 nose:['小鼻','直鼻','圓鼻','寬鼻','短鼻'],mouth:['微笑','平口','開朗','小嘴','堅毅','露齒笑']
};
const AVATAR_DEFAULT={skin:1,hairStyle:0,hairColor:1,brows:0,eyes:0,eyeColor:1,nose:0,mouth:0};
let playerAvatar={...AVATAR_DEFAULT},avatarDraft={...AVATAR_DEFAULT},pendingNewAvatar=null,avatarCreatorMode='',avatarComplete=null,albumFromHome=false,blueprintReadOnly=false;
function normalizeAvatar(raw){
 const r=raw&&typeof raw==='object'?raw:{},a={};Object.keys(AVATAR_DEFAULT).forEach(k=>a[k]=Number.isInteger(r[k])&&r[k]>=0&&r[k]<AVATAR_OPTIONS[k].length?r[k]:AVATAR_DEFAULT[k]);return a;
}
function avatarSVG(raw){
 const a=normalizeAvatar(raw),skin=AVATAR_OPTIONS.skin[a.skin],hair=AVATAR_OPTIONS.hairColor[a.hairColor],iris=AVATAR_OPTIONS.eyeColor[a.eyeColor].c;
 const rect=(x,y,w,h,c)=>'<path fill="'+c+'" d="M'+x+' '+y+'h'+w+'v'+h+'h-'+w+'z"/>';
 let back='';if(a.hairStyle===5)back='<path fill="'+hair.s+'" d="M16 15h32v7h4v33H12V22h4z"/><path fill="'+hair.c+'" d="M14 24h5v27h-5zM45 22h5v30h-5z"/>';
 if(a.hairStyle===6)back='<path fill="'+hair.s+'" d="M45 18h8v8h4v21h-5v9h-7V39h4V25h-4z"/><path fill="'+hair.c+'" d="M49 26h5v18h-3v8h-4V40h2z"/>';
 if(a.hairStyle===4)back='<path fill="'+hair.s+'" d="M16 15h30v4h5v6h3v16h-5v7H15v-6h-5V25h3v-6h3z"/>';
 const fringe=[
  '<path d="M16 23V15h4v-4h23v4h5v13h-5v-7H23v4z"/><path d="M18 18h9v5h-9z"/>',
  '<path d="M16 27V16h4v-5h25v5h4v11h-7V17h-9v5h-9v6z"/>',
  '<path d="M16 27V16h4v-5h24v5h5v13h-5v-6h-6v4h-5v-4h-5v4h-5v-4h-3v4z"/>',
  '<path d="M16 25V14h6V7h5v6h5V5h5v7h6V9h4v12h-5v-3h-8v3H23v5z"/>',
  '<path d="M13 27v-8h4v-6h7V9h15v3h8v6h5v9h-8v-5h-6v3h-6v-4h-6v5h-6v3z"/>',
  '<path d="M16 29V17h3v-5h25v5h5v11h-5V17h-9v6h-8v5h-5v5h-4z"/>',
  '<path d="M16 26V16h4v-5h24v5h5v12h-6V18H23v7z"/><path d="M47 21h6v5h-6z"/>',''
 ][a.hairStyle];
 const brows=[
  '<path d="M22 27h7v2h-7zM35 27h7v2h-7z"/>',
  '<path d="M22 28h3v-2h5v2h-3v2h-5zM34 26h5v2h3v2h-5v-2h-3z"/>',
  '<path d="M22 28v-2h6v1h2v2h-3v-1zM34 29v-2h2v-1h6v2h-5v1z"/>',
  '<path d="M21 26h9v3h-9zM34 26h9v3h-9z"/>',
  '<path d="M24 27h5v2h-5zM35 27h5v2h-5z"/>',''
 ][a.brows];
 let eyes='';
 for(const x of [22,35]){
  if(a.eyes===4){eyes+=rect(x,32,2,2,hair.s)+rect(x+2,30,3,2,hair.s)+rect(x+5,32,2,2,hair.s);continue;}
  const height=a.eyes===2?2:a.eyes===5?3:4,y=a.eyes===2?32:30;
  eyes+=rect(x,y,7,height+2,'#483e3c')+rect(x+1,y+1,5,height,'#f2e7cc')+rect(x+3,y+1,3,height,iris)+rect(x+4,y+2,1,Math.max(1,height-1),'#222b34')+rect(x+3,y+1,1,1,'#fff8dc');
  if(a.eyes===1)eyes+=rect(x,y,2,2,skin.c)+rect(x+6,y+height,1,2,skin.c);
  if(a.eyes===3)eyes+=rect(x,y,2,2,hair.s)+rect(x+2,y+1,5,1,hair.s);
 }
 const noses=[rect(31,36,2,4,skin.s)+rect(33,39,2,1,skin.h),rect(31,34,2,6,skin.s)+rect(33,38,2,2,skin.h),rect(30,37,5,3,skin.s)+rect(31,36,3,2,skin.h),rect(29,38,7,2,skin.s)+rect(31,36,3,3,skin.h),rect(31,38,3,2,skin.s)];
 const lip=a.skin>=5?'#c58a70':'#915e50',mouths=[
  rect(27,43,2,2,lip)+rect(29,45,6,2,lip)+rect(35,43,2,2,lip),
  rect(27,44,10,2,lip),
  rect(27,43,10,5,'#5c3c37')+rect(29,43,6,2,'#fff0d7')+rect(30,47,4,1,'#bd7866'),
  rect(30,44,5,2,lip),rect(27,44,10,2,lip)+rect(27,43,3,1,lip),
  rect(26,43,12,4,'#6b4840')+rect(28,43,8,2,'#fff3d5')+rect(29,46,6,1,lip)
 ];
 return '<svg viewBox="0 0 64 64" shape-rendering="crispEdges" role="img" aria-label="玩家像素頭像"><path fill="#172431" d="M5 1h54v4h4v54h-4v4H5v-4H1V5h4z"/><path fill="#d7bd7a" d="M6 3h52v3h3v52h-3v3H6v-3H3V6h3z"/><path fill="#3d5b68" d="M7 7h50v50H7z"/><path fill="#496e77" d="M7 7h50v22H7z"/><path fill="#597d7c" opacity=".7" d="M9 11h12v3H9zM43 17h10v3H43z"/>'+back+'<path fill="#263847" d="M21 48h22v3h8v6h6v4H7v-4h6v-6h8z"/><path fill="#4d6878" d="M18 51h28v10H18z"/><path fill="#bc9a61" d="M20 51h5v10h-5zM39 51h5v10h-5z"/><path fill="'+skin.s+'" d="M26 43h12v11H26z"/><path fill="'+skin.c+'" d="M28 44h8v9h-8z"/><path fill="#ede2bc" d="M24 51l8 7 8-7v5l-8 5-8-5z"/><path fill="'+skin.s+'" d="M20 15h24v5h4v9h3v10h-5v8h-5v5H23v-5h-5v-8h-5V29h4v-9h3z"/><path fill="'+skin.c+'" d="M22 18h20v4h3v19h-3v6h-5v3H26v-4h-5V23h1z"/><path fill="'+skin.h+'" d="M22 23h3v17h-3zM25 20h15v2H25zM26 40h3v2h-3z"/>'+rect(14,31,4,6,skin.c)+rect(47,31,3,6,skin.c)+eyes+'<g fill="'+hair.s+'">'+brows+'</g>'+noses[a.nose]+mouths[a.mouth]+'<g fill="'+hair.c+'">'+fringe+'</g>'+(a.hairStyle===7?'':'<path fill="'+hair.h+'" d="M22 14h11v2H22zM19 17h5v2h-5z" opacity=".8"/>')+'<path fill="#f0dba2" d="M7 7h3v3H7zM54 54h3v3h-3z"/></svg>';
}
function renderAvatarBadges(){
 const key=JSON.stringify(playerAvatar);['townAvatar','expeditionAvatar'].forEach(id=>{const el=$(id);if(el.dataset.avatarKey!==key){el.innerHTML=avatarSVG(playerAvatar);el.dataset.avatarKey=key;}});
 $('townAvatar').setAttribute('aria-label',playerName+'的頭像，點擊調整外觀');$('expeditionAvatar').setAttribute('aria-label',playerName+'的頭像');
}
function openAvatarCreator(mode='new',done=null){
 avatarCreatorMode=mode;avatarComplete=done;
 let preset=null;try{preset=JSON.parse(gameStorage.getItem('forgeAvatarPresetV1')||'null')}catch(e){}
 avatarDraft=normalizeAvatar(mode==='edit'?playerAvatar:preset||playerAvatar);
 $('avatarCreatorTitle').textContent=mode==='new'?'設計你的角色':'調整角色外觀';$('avatarCreatorName').textContent=playerName||'鍛造師';
 $('avatarCreatorConfirm').textContent=mode==='new'?'完成角色，開始遊戲':'儲存外觀';renderAvatarEditor();$('avatarCreatorP').style.display='flex';
}
function renderAvatarEditor(){
 $('avatarPreview').innerHTML=avatarSVG(avatarDraft);
 const palettes={skin:'膚色',hairColor:'頭髮顏色',eyeColor:'眼睛顏色'},styles={hairStyle:'髮型',brows:'眉毛樣式',eyes:'眼睛樣式',nose:'鼻子樣式',mouth:'嘴巴樣式'};
 $('avatarControls').innerHTML=Object.entries(palettes).map(([k,label])=>'<section class="avatar-palette"><h3>'+label+'</h3><div role="group" aria-label="'+label+'">'+AVATAR_OPTIONS[k].map((x,i)=>'<button type="button" class="avatar-swatch" data-avatar-field="'+k+'" data-avatar-value="'+i+'" aria-label="'+x.n+'" aria-pressed="'+(avatarDraft[k]===i)+'" title="'+x.n+'" style="--swatch:'+x.c+'"><span>'+(avatarDraft[k]===i?'✓':'')+'</span></button>').join('')+'</div></section>').join('')+'<div class="avatar-style-grid">'+Object.entries(styles).map(([k,label])=>'<section class="avatar-style"><span>'+label+'</span><div class="avatar-stepper" role="group" aria-label="'+label+'"><button type="button" data-avatar-step="-1" data-avatar-field="'+k+'" aria-label="上一個'+label+'">◀</button><output aria-live="polite">'+AVATAR_OPTIONS[k][avatarDraft[k]]+'</output><button type="button" data-avatar-step="1" data-avatar-field="'+k+'" aria-label="下一個'+label+'">▶</button></div></section>').join('')+'</div>';
}
function updateAvatarField(k,value){if(!Object.hasOwn(AVATAR_DEFAULT,k))return;avatarDraft=normalizeAvatar({...avatarDraft,[k]:Number(value)});renderAvatarEditor();}
function randomizeAvatar(){const a={};Object.keys(AVATAR_DEFAULT).forEach(k=>a[k]=Math.floor(Math.random()*AVATAR_OPTIONS[k].length));avatarDraft=a;renderAvatarEditor();}
function confirmAvatar(){
 if(!avatarCreatorMode)return;const mode=avatarCreatorMode,done=avatarComplete,chosen=normalizeAvatar(avatarDraft);avatarCreatorMode='';avatarComplete=null;$('avatarCreatorP').style.display='none';
 try{gameStorage.setItem('forgeAvatarPresetV1',JSON.stringify(chosen))}catch(e){}
 if(mode==='new'){pendingNewAvatar=chosen;done?.();}
 else{playerAvatar=chosen;renderAvatarBadges();saveHi();saveNow();}
}
function cancelAvatar(){const mode=avatarCreatorMode;avatarCreatorMode='';avatarComplete=null;$('avatarCreatorP').style.display='none';if(mode==='new'){$('title').style.display='flex';pendingNewAvatar=null;}}
function beginNewCharacter(){saveNow();active=false;pendingNewAvatar=null;askName(()=>openAvatarCreator('new',newGameFlow));}
$('avatarControls').onclick=e=>{const b=e.target.closest('button[data-avatar-field]');if(b){const k=b.dataset.avatarField,n=AVATAR_OPTIONS[k].length;updateAvatarField(k,b.dataset.avatarStep?(avatarDraft[k]+Number(b.dataset.avatarStep)+n)%n:b.dataset.avatarValue);}};
$('avatarControls').onchange=e=>{const s=e.target.closest('select[data-avatar-field]');if(s)updateAvatarField(s.dataset.avatarField,s.value);};