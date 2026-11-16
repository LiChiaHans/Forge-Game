let townDayBannerKey='',townDayBannerAnimation=null,townDayBannerTimer=null;
function showTownDayBanner(){
 const key=runId+':'+day+':'+isSandboxNight();if(day<1||townDayBannerKey===key)return;townDayBannerKey=key;
 const banner=$('townDayBanner'),season=SEASONS[seasonIndex()];townDayBannerAnimation?.cancel?.();if(townDayBannerTimer!==null)clearTimeout(townDayBannerTimer);
 banner.textContent=season.icon+' '+season.name+' · 第 '+day+' 天 · '+(isSandboxNight()?'晚上':'早上');banner.hidden=false;
 const hide=()=>{banner.hidden=true;townDayBannerAnimation=null;townDayBannerTimer=null;};
 if(lowEffects||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){townDayBannerTimer=gameTimeout(hide,1800);return;}
 townDayBannerAnimation=banner.animate([{opacity:0,transform:'translate(-50%,14px)'},{opacity:1,transform:'translate(-50%,0)',offset:.14},{opacity:1,transform:'translate(-50%,0)',offset:.78},{opacity:0,transform:'translate(-50%,-10px)'}],{duration:2700,easing:'ease-out'});townDayBannerAnimation.onfinish=hide;
}
