
const TOWN_GUEST_ROLES=['劍士','法師','遊俠','僧侶','盜賊','吟遊詩人','商人','饕客'];
function townGuestIdentity(i){if(expandedGameEnabled()){const list=isSandboxNight()?[...(kitchen?.orders||[]),...(kitchen?.queue||[])]:orders.concat(dq);if(list[i]?.guest)return list[i].guest;}return guestForOrder22(i,isSandboxNight());}
function townGuestArt(id){return '<svg viewBox="0 0 32 52" shape-rendering="crispEdges" aria-hidden="true" data-town-guest-art="'+id+'"><image href="'+TOWN_GUEST_ART[id]+'" x="0" y="0" width="32" height="52" preserveAspectRatio="xMidYMax meet" style="image-rendering:pixelated"/></svg>';}