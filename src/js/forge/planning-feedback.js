function markForgeOutputs(weapons){
 weapons.forEach((w,k)=>{const el=$('grid').children[w.target];if(!el)return;el.classList.add('pv-target');const label=document.createElement('span');label.className='forge-preview-label';label.textContent=(k+1)+' · '+NM[w.t]+'級'+WN[w.c];el.appendChild(label);});
}
