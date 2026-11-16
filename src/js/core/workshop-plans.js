function workshopChain(cells){
 const set=new Set(cells),adj=i=>nb(i).filter(j=>set.has(j)),ends=cells.filter(i=>adj(i).length===1).sort((a,b)=>a-b);
 if(cells.length<3||ends.length!==2||cells.some(i=>adj(i).length>2))return null;
 const path=[ends[0]];while(path.length<cells.length){const next=adj(path.at(-1)).find(i=>!path.includes(i));if(next===undefined)return null;path.push(next);}return path;
}
function workshopRecipeWindows(path,last){return Array.from({length:path.length-2},(_,k)=>({cells:path.slice(k,k+3),target:path.length===3?last:path[k+1]}));}
function workshopFour(cells,last){
 const line=workshopChain(cells);if(line)return line;if(cells.length!==4)return null;
 const connected=trio=>{const seen=[trio[0]];for(let k=0;k<seen.length;k++)for(const n of nb(seen[k]))if(trio.includes(n)&&!seen.includes(n))seen.push(n);return seen.length===3;};
 for(const b of nb(last).filter(i=>cells.includes(i)).sort((a,b)=>a-b)){const rest=cells.filter(i=>i!==last&&i!==b).sort((a,b)=>a-b),path=[rest[0],b,last,rest[1]];if(connected(path.slice(0,3))&&connected(path.slice(1)))return path;}return null;
}
function workshopMaterialPlan(at,board){
 const w=board[at];if(w?.k!=='o'||w.t>=4)return null;const connected=group(at,board);if(connected.length<3)return null;
 if(connected.length>=5){const cells=connected.slice(0,5);return {cells,groups:[{cells,target:at,tier:Math.min(4,w.t+2)}]};}
 const line=connected.length===4?workshopFour(connected,at):workshopChain(connected),cells=line||connected.slice(0,3),groups=workshopRecipeWindows(cells,at).map(g=>({...g,tier:w.t+1}));return {cells,groups};
}
function workshopItemKey(w){return w?[w.k,w.t,w.s,w.c,w.m||0,w.b||0,w.element||'',w.spice||'',w.legendId??''].join(':'):'';}
function workshopItemHTML(w){return w.k==='o'?oreH(w.t,'',w.m||0):w.k==='p'||w.k==='d'?workshopPieceHTML(w):'<div class="t2">'+hex(w.c,bands(w),'',w.t,w)+mb(w)+'</div>';}
