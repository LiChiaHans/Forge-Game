
function workshopOreHTML(t,extra='',magic=0){return '<div class="t o '+extra+' cozy-ore"'+cozyOreAttributes(t)+' style="background-color:'+C[t]+';'+cozyOreStyle(t)+'">'+NM[t]+mb({m:magic})+'</div>';}
function workshopPieceHTML(w){return '<div class="t2'+(w.k==='d'?' dg':'')+'">'+(w.k==='d'?gem(w.t):mold(w.s,C[w.t]))+mb(w)+'</div>';}
