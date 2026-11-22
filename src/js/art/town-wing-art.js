/* ==========================================================================
   Gemini Pixel-Art Illustrated Assets for Town Wings, Contracts, Trials & Skills:
   - 6 Panoramic Illustrated Modal Scene Headers (fishing, excavate, museum, caravan, tavern, depot)
   - 16 Stardew-Style Pixel Fish Icons (4x4 Sprite Sheet)
   - 12 Stardew-Style Ancient Relic Icons (4x3 Sprite Sheet)
   - 16 Wing Item / Dig / Caravan / Trade Route Icons (4x4 Sprite Sheet)
   - 12 Workshop Contract & Trial Mode Wax-Seal Emblems (4x3 Sprite Sheet)
   - 16 Training Hall Forge & Kitchen Skill Icons (4x4 Sprite Sheet)
   ========================================================================== */

const WING_MODAL_ART={
 "fishing":"assets/wings/fishing.160d3fd090b1.jpg",
 "excavate":"assets/wings/excavate.97ebe635984f.jpg",
 "museum":"assets/wings/museum.e6779d1ef72e.jpg",
 "caravan":"assets/wings/caravan.9a0ee157ea80.jpg",
 "tavern":"assets/wings/tavern.cb98c1458ddf.jpg",
 "depot":"assets/wings/depot.f752e6367723.jpg",
 "fish_sheet":"assets/wings/fish_sheet.95f1d30773f0.jpg",
 "relic_sheet":"assets/wings/relic_sheet.1f4b69c4ffe9.jpg",
 "items_sheet":"assets/wings/items_sheet.08bd92ae2efb.jpg",
 "emblems_sheet":"assets/wings/emblems_sheet.d6afa68412e4.jpg",
 "skills_sheet":"assets/wings/skills_sheet.fc003bafe774.jpg"
};

const FISH_SHEET_INDEX={
 spring_trout:0,sakura_carp:1,spring_eel:2,moon_koi:3,
 sun_perch:4,summer_crab:5,tide_squid:6,sun_marlin:7,
 maple_salmon:8,amber_catfish:9,harvest_shrimp:10,golden_sturgeon:11,
 frost_smelt:12,snow_pike:13,crystal_jelly:14,aurora_dragonfish:15
};

const RELIC_SHEET_INDEX={
 old_tongs:0,clay_pot:1,bronze_coin:2,ember_fossil:3,
 spice_mortar:4,rune_tablet:5,star_compass:6,crystal_lens:7,
 dwarf_hammer:8,royal_cookbook:9,dragon_scale:10,crown_seal:11
};

const WING_ITEM_SHEET_INDEX={
 worm:0,star:1,magnet:2,cross:3,
 rock:4,gold:5,chest:6,seed:7,
 local:8,harbor:9,imperial:10,spice:11,
 whetstone:12,frost:13,elixir:14,royal_chest:15,
 // Caravan shop item IDs
 spice_pack:11,fresh_ice:13,kitchen_fever:14,spice_rare:11,
 forge_upg:12,forge_blizz:13,forge_fever:14,dwarf_diamond:12,
 seed_pack:7,ess_bottle:14,dual_fever:14,elf_bundle:7,
 royal_burn:12,royal_upg:12,royal_prep:11,royal_chest_item:15
};

const EMBLEM_SHEET_INDEX={
 coin:0,forge:1,kitchen:2,fever:3,
 expedition:4,rush:5,garden:6,contract:7,
 ironman:8,glass:9,sprint9:10,landmark:11,
 normal:7,iron_forge:8,gourmet_blitz:2
};

const SKILL_SHEET_INDEX={
 mm:0,mn:1,gc:2,mg:3,mc:4,wb:6,cd:7,
 merge:8,purchase:9,spice:10,patience:11,cool:12,fresh:13,pack:14
};

function _spriteCell(sheetUrl,idx,cols,rows,cls){
 const col=idx%cols,row=Math.floor(idx/cols);
 const x=(col/(cols-1)*100).toFixed(3)+'%',y=(row/(rows-1)*100).toFixed(3)+'%';
 return '<span class="px-sprite '+cls+'" style="background-image:url(\''+sheetUrl+'\');background-position:'+x+' '+y+'" aria-hidden="true"></span>';
}

function pixelFishArt(id,locked=false){
 return _spriteCell(WING_MODAL_ART.fish_sheet,FISH_SHEET_INDEX[id]??0,4,4,'is-fish'+(locked?' is-locked':''));
}

function pixelRelicArt(id,locked=false){
 return _spriteCell(WING_MODAL_ART.relic_sheet,RELIC_SHEET_INDEX[id]??0,4,3,'is-relic'+(locked?' is-locked':''));
}

function pixelWingItemArt(id){
 return _spriteCell(WING_MODAL_ART.items_sheet,WING_ITEM_SHEET_INDEX[id]??6,4,4,'is-item');
}

function pixelEmblemArt(id,fallback=''){
 let idx=EMBLEM_SHEET_INDEX[id];
 if(idx===undefined){
  const s=String(id||fallback||'');
  if(/forge|冶煉|鍛|錘/.test(s))idx=1;
  else if(/kitchen|廚|餐|料/.test(s))idx=2;
  else if(/fever|狂熱|火/.test(s))idx=3;
  else if(/exp|遠征|戰|劍/.test(s))idx=4;
  else if(/rush|速|急|時|sprint/.test(s))idx=5;
  else if(/seed|花|溫室|植/.test(s))idx=6;
  else if(/iron|鐵人|硬派/.test(s))idx=8;
  else if(/glass|脆|風險/.test(s))idx=9;
  else if(/gold|金|商|財/.test(s))idx=0;
  else idx=7;
 }
 return _spriteCell(WING_MODAL_ART.emblems_sheet,idx,4,3,'is-emblem');
}

function pixelSkillArt(key){
 const idx=SKILL_SHEET_INDEX[key];
 if(idx===undefined)return '';
 return _spriteCell(WING_MODAL_ART.skills_sheet,idx,4,4,'is-skill');
}

function wingModalSceneArt(mode,night=false){
 const url=WING_MODAL_ART[mode]||WING_MODAL_ART.fishing;
 const outdoor=mode==='fishing'||mode==='excavate'||mode==='caravan'||mode==='depot';
 const timeAttr=night&&outdoor?'night':'day';
 return '<div class="tw-scene-banner" data-scene="'+mode+'" data-time="'+timeAttr+'"><img src="'+url+'" alt="" decoding="async"></div>';
}
