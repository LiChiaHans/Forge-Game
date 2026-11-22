/* ==========================================================================
   Gemini Pixel-Art Illustrated Assets for West & East Town Wings:
   - 6 Panoramic Illustrated Modal Scene Headers (fishing, excavate, museum, caravan, tavern, depot)
   - 16 Stardew-Style Pixel Fish Icons (4x4 Sprite Sheet)
   - 12 Stardew-Style Ancient Relic Icons (4x3 Sprite Sheet)
   ========================================================================== */

const WING_MODAL_ART={"fishing":"assets/wings/fishing.160d3fd090b1.jpg","excavate":"assets/wings/excavate.97ebe635984f.jpg","museum":"assets/wings/museum.e6779d1ef72e.jpg","caravan":"assets/wings/caravan.9a0ee157ea80.jpg","tavern":"assets/wings/tavern.cb98c1458ddf.jpg","depot":"assets/wings/depot.f752e6367723.jpg","fish_sheet":"assets/wings/fish_sheet.95f1d30773f0.jpg","relic_sheet":"assets/wings/relic_sheet.1f4b69c4ffe9.jpg"};

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

function pixelFishArt(id,locked=false){
 const idx=FISH_SHEET_INDEX[id]??0;
 const col=idx%4,row=Math.floor(idx/4);
 const x=(col/3*100).toFixed(3)+'%',y=(row/3*100).toFixed(3)+'%';
 const cls='px-sprite is-fish'+(locked?' is-locked':'');
 return '<span class="'+cls+'" style="background-image:url(\''+WING_MODAL_ART.fish_sheet+'\');background-position:'+x+' '+y+'" aria-hidden="true"></span>';
}

function pixelRelicArt(id,locked=false){
 const idx=RELIC_SHEET_INDEX[id]??0;
 const col=idx%4,row=Math.floor(idx/4);
 const x=(col/3*100).toFixed(3)+'%',y=(row/2*100).toFixed(3)+'%';
 const cls='px-sprite is-relic'+(locked?' is-locked':'');
 return '<span class="'+cls+'" style="background-image:url(\''+WING_MODAL_ART.relic_sheet+'\');background-position:'+x+' '+y+'" aria-hidden="true"></span>';
}

function wingModalSceneArt(mode,night=false){
 const url=WING_MODAL_ART[mode]||WING_MODAL_ART.fishing;
 const outdoor=mode==='fishing'||mode==='excavate'||mode==='caravan'||mode==='depot';
 const timeAttr=night&&outdoor?'night':'day';
 return '<div class="tw-scene-banner" data-scene="'+mode+'" data-time="'+timeAttr+'"><img src="'+url+'" alt="" decoding="async"></div>';
}
