
function snapshotForgeReview(){  const st={
    g,coins,earned,all,day,dTot,dServed,dEarn,dLeft,orders,dq,best,Q,MQ,
    heat,hand,shopD,magic,magicSet:[...magicSet],dMagic,dSold,lives,
    skills,pack,sp,bag,gachaUsed,skillDone,spentToday,phase,quests,qDone,dLv,pendingChests,lastCompletedDay,expedition:expeditionState,legendProjects,blueprintGoalId,collections:snapshotRunCollections(),ecology:snapshotEcology(),orderCapVersion:1,city:snapshotCity(),avatar:normalizeAvatar(playerAvatar),
    shopBought,leaves:[...leaves],frozen:[...frozen],seasonVersion:1,seasonNoticePending,seasonCraft:{day,charges:autumnForgeCharges},weaponMastery:snapshotWeaponMastery()
  };return JSON.parse(JSON.stringify(st));}
function hydrateReviewForge(e){  clearForgeFeedback();
  const t=resizeSaveBoard(e.state);
  runId=e.id;playerName=e.name;runDate=e.date;runTime=e.time;
  playerAvatar=normalizeAvatar(t.avatar||e.avatar);pendingNewAvatar=null;avatarCreatorMode="";avatarComplete=null;
  testRun=true;cheat.m=true;cheat.s=true;
  restoreCity(t.city);
  g=t.g;coins=t.coins;earned=t.earned;all=t.all;day=t.day;
  dTot=t.dTot;dServed=t.dServed;dEarn=t.dEarn;dLeft=t.dLeft;
  orders=t.orders;dq=t.dq;if(!t.orderCapVersion)capDailyOrders([...orders,...dq]);best=t.best;Q=t.Q;MQ=t.MQ;
  heat=t.heat;hand=t.hand;shopD=t.shopD;magic=t.magic;
  magicSet=new Set(t.magicSet);dMagic=t.dMagic;dSold=t.dSold;
  lives=t.lives;skills={mm:0,gc:0,mg:0,wb:0,mc:0,mn:0,cd:0,...t.skills};pack=t.pack;sp=t.sp;bag=t.bag;
  blueprintGoalId=validLegendId(t.blueprintGoalId)?t.blueprintGoalId:null;inspectedLiveWeapon=null;restoreEcology(t.ecology);restoreBlueprintProjects(t.legendProjects);
  stopExpeditionPlayback();expeditionState=restoreExpeditionState(t.expedition);syncExpeditionDay();expeditionSelected="";expeditionStage=expeditionState.unlocked;restoreRunCollections(t);importLegendProgress();ensureBlueprintInventory();
  gachaUsed=t.gachaUsed;skillDone=t.skillDone;spentToday=t.spentToday;
  shopBought={m:0,tool:0,o:0,...t.shopBought};
  leaves=new Set((t.leaves||[]).filter(i=>i>=0&&i<W*H&&!g[i]));
  frozen=new Set((t.frozen||[]).filter(i=>i>=0&&i<W*H&&!g[i]));
  seasonEffects=new Map();seasonNoticePending=!!t.seasonNoticePending;
  legendProjects.forEach(p=>p.cells.forEach(i=>{leaves.delete(i);frozen.delete(i)}));
  if(!t.seasonVersion){
    if(seasonIndex()===2)addSeasonCells(leaves,3,'leaf',false);

    seasonNoticePending=day>0;
  }
  normalizeWinterCells(false);restoreSeasonBenefits(t.seasonCraft);
  phase=t.phase||"play";
  quests=t.quests||[];qDone=t.qDone||0;dLv=t.dLv!=null?t.dLv:lives;
  stepSales=0;justHeated.clear();ensureQuests();
  tool=-1;fresh=-1;fx=[];hold=new Set();pop=new Set();shown=new Map();
  enter.clear();busy=false;tutP2=false;lead=0;flyI=-1;exitMs=0;active=false;
  ["ov","cf","sk","rw","gcP","svP","recP","help","seasonP","townLootP","townSkillP","expeditionP","weaponStatsP","legendBlueprintP","blueprintProjectP","avatarCreatorP","greenhouseP","seedP"].forEach(x=>$(x).style.display="none");
  $("title").style.display="none";clearPrediction();render();
  restoreWeaponMastery(t.weaponMastery);render();
  restoreTownProgress(t);
  showPendingSeasonNotice();
}