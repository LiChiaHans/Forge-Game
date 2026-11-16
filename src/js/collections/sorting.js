const ARCHIVE_SORT_FIELDS={weapons:{atk:'攻擊力',def:'防禦力',spd:'速度',price:'基礎價錢'},dishes:{taste:'滋味',fullness:'飽足',aroma:'香氣',price:'基礎價錢'}};
const archiveSortState={weapons:'default',dishes:'default'};
function setArchiveSort(category,value){
 if(albumTier===-2||!Object.hasOwn(ARCHIVE_SORT_FIELDS,category))return false;const [key,direction]=String(value).split(':');
 if(value!=='default'&&(!Object.hasOwn(ARCHIVE_SORT_FIELDS[category],key)||!['asc','desc'].includes(direction)||value!==key+':'+direction))return false;
 archiveSortState[category]=value;renderWeaponAlbum();return true;
}
function sortArchiveIds(category,ids,valueFor){
 const value=archiveSortState[category];if(value==='default')return ids.slice();const [key,direction]=value.split(':'),factor=direction==='asc'?1:-1,values=new Map(ids.map(id=>[id,valueFor(id,key)]));
 return ids.slice().sort((a,b)=>factor*(values.get(a)-values.get(b))||a-b);
}
function archiveWeaponSortValue(weapon,key){return key==='price'?wp(weapon):weaponStats(weapon)[key];}
function archiveOrder(category,tier){
 return sortArchiveIds(category,Array.from({length:10},(_,i)=>i),(id,key)=>category==='weapons'?archiveWeaponSortValue(baseAlbumWeapon(id,tier),key):key==='price'?kitchenPrice({k:'w',c:id,t:tier},true):kitchenDishStats({k:'w',c:id,t:tier},true)[key]);
}
function archiveLegendOrder(start){const ids=Array.from({length:10},(_,i)=>start+i);return albumTier===-2?ids:sortArchiveIds('weapons',ids,(id,key)=>archiveWeaponSortValue(baseLegendWeapon(id),key));}
function renderArchiveSort(){
 const panel=$('archiveSort');panel.hidden=!expandedGameEnabled()||albumTier===-2;if(panel.hidden)return;const category=archiveCategory,select=$('archiveSortSelect');
 $('archiveSortLabel').textContent=category==='weapons'?'武器排序':'料理排序';select.setAttribute('aria-label',category==='weapons'?'武器排序':'料理排序');
 select.innerHTML='<option value="default">原始順序</option>'+Object.entries(ARCHIVE_SORT_FIELDS[category]).flatMap(([key,label])=>[['desc','高到低'],['asc','低到高']].map(([direction,text])=>'<option value="'+key+':'+direction+'">'+label+' · '+text+'</option>')).join('');select.value=archiveSortState[category];
}
