# 最小專案背景

- HTML／CSS／原生 JavaScript 遊戲，GitHub Pages 靜態發布。以直式版面為主，電腦仍維持直式；改功能時不要順手改尺寸或美術。
- 白天經營冶煉廠，夜晚經營餐廳，晚餐完成才進入隔日。白天完成先在冶煉廠顯示結算，按「結束白天營業，進入晚上」才切同日夜晚城鎮。kitchen.forgeSettlement保存白天摘要，lastCompletedDay先提交避免重領；關閉回城鎮，再點冶煉廠可重開（略過未用技能點提醒），新一天清除摘要。餐廳首次不自動開教學，仍有「？」按鈕。每季三天；冬季維持一格結冰。
- 冶煉：礦石、模具、胚料、武器；五個相連在最後落點升兩階。武器有攻防速、屬性、附魔與每款3／6／9把升1／2／3星。
- 餐廳：食材→工序備料→三份配方料理。只有最終料理有32步保鮮（技能每級+6），棋盤與手持會倒數，冰箱暫停。食材／備料無保鮮且會清掉舊欄位；完成料理腐壞仍成廚餘。工序、調味、冰箱、料理補給與獨立技能樹沿用。
- 餐廳新局技能與點數為零，只推出一階食材；首晚後第一點只能料理大師。料理大師解鎖食材升階合成，二／三級返還原階食材機率25%／50%；新技能採買大師獨立增加高階食材推出機率（沿用冶煉採礦表）。舊存檔新技能預設零級。零級仍能備料、完成一階料理。
- 點餐廳客人可取消訂單並扣一心，同一訂單不能重複取消。手持道具不強迫立即使用，仍可放食材；點手持物或直接拖曳才使用。
- 正式營業入口requireWorkshopTraining依店檢查未用點數，還有可分配點數時顯示townSkillP且不可略過；openRequiredTraining直接開對應分頁。完成白天／夜晚的結算不受剛取得點數阻擋，後台／教學免限制，全技能已滿的舊剩餘點數沿用1000兌換防死鎖。正式技能只能在訓練所花對應點數升級；遊戲內技能鈕只查看已學內容。
- 城鎮含季節／夜景、溫室、圖鑑、建築師與裝飾、營業寶箱、遠征；每局收藏與首頁跨局收藏分開。每次完成冶煉／餐廳各給該分支1點技能點及1個可累積寶箱，挑戰不額外加技能點；該分支全滿則當次固定換1000金幣（不計分）。完成旗標先提交防重領；舊有多餘技能點在點滿或換日時依每點1000兌換一次。寶箱一半抽冶煉獎池、一半抽廚房獎池，送各自道具箱，種子仍進溫室。
- 首頁入口為「圖鑑館」；武器／料理各記住本次開啟期間的排序選擇，依基礎數值在每個階級框架內排序，維持5×2。傳說與終極各自一組；武器箱的純藍圖收藏不排序。排序縮圖有數值徽章；普通武器／料理基礎售價寫在階級標題，傳說／終極價錢排序逐件顯示。料理移除價錢排序，改加恢復生命／額外護盾／額外攻擊，採無星級及調味的百分比，依戰鬥武器換算實際量。排序不含星級／附魔／調味。
- 溫室室內背景及三種砧板備料素材在art/garden-workshop.js；盆栽七元素×四階段、廚餘木桶維持原生像素SVG。首頁暖燈工坊背景和橡木黃銅寶箱SVG在art/home-chest.js，移除舊首頁內嵌PNG，按鈕尺寸維持。原始食材圖縮至64px畫布內46px，等級標記不縮；成品料理沿用原50張圖。原15張備料托盤圖保留供舊開啟頁面使用，不再列入目前素材表。
- core/asset-loading.js改成非阻擋背景下載：首頁立即操作，800ms後逐步準備10組259項素材，最多2個低優先請求、每次下載後讓出350ms，首頁與常用場景先、音樂／原畫後；已在快取或單檔data URI內的素材不刻意延遲。隱藏或離線時暫停，恢復時續抓缺項；失敗稍後重試，永遠不鎖住遊戲。首頁右上角小字不占版面空間。CacheStorage沿用forge-master-media-v1，完整成功後只清理本遊戲assets/下過期素材。
- src/workers/media-cache.js由建置工具獨立輸出根目錄media-cache.js，非主腳本片段。Service Worker只攔截同遊戲assets/內帶12位內容指紋的GET webp/jpg/mp3，先讀同一素材快取，再抓網路並存入；前景請求不排背景隊列，相同URL合併下載。HTML／JS／CSS／排行榜及Range請求完全不攔截；updateViaCache:none避免worker程式過期。安全環境以外或被拒絕時退回原記憶體blob快取，下載版內嵌素材不註冊worker。不要在pagehide撤銷blob URL，避免破壞瀏覽器返回恢復。
- 遠征有20關及無限模式，投入武器會消耗；解鎖藍圖以固定階級原料在棋盤合成。冰箱料理戰前選一份，戰中僅能手動使用這份一次；未用不扣庫存，不可更換或追加。
- 遠征結果不自動切頁，保留全紀錄與獎勵，按返回遠征才選下一關。防禦每場一次，3秒內全次攻擊減傷60%；timing-feedback.js以50ms更新顯示，巨龍重擊／狼連擊／魔像硬化攻擊先有1.5秒蓄力並阻擋提早出手，暫停／隱藏同步凍結。顯示戰果用虛擬經過時間避免防禦永久有效。補血剩餘量淺紅、護盾灰色，受傷依實際扣除；結算先標resolved防重領。
- 冶煉／餐廳共用kitchen/message.js的一行跑馬燈，冶煉34px、餐廳29px；forgeMessageText從dataset讀單份原文，追加魔法／寶石／任務文字不能讀含重複輪播副本的textContent。exp-fighter共用5列格線，名稱最多兩行，生命文字與12px血條始終對齊，護盾數字在下方圖例。
- audio/workshop-sounds.js使用WebAudio提供冶煉金屬／餐廳木作與盤聲，與共用合成播放器的集合／落地對齊，低特效直接完成仍播一次；保留靜音，無新增下載。
- 正式遊戲使用有限金錢、限購、愛心。後台有獨立資源與跳日，測試成果不影響正式存檔、首頁紀錄／圖鑑或排行榜。
- 裝飾實際目錄由contexts.js把舊48件展成四季日夜各自ID，再加12件夜光，共156件，沿用素材。sourceId用來找舊圖片，所有夜版偏暗、只有燈具發光；decorSVG以夜間palette3原生SVG feColorMatrix群組套用TOWN_NIGHT_COLOR_MATRIX，與實際背景／截圖共用相同RGB變換，移除圖片原先brightness(.52/.72)及palette2疊加；新版噴水池不再重複加亮度濾鏡。包含物件／水光／光暈及替代SVG。儲存版型帶artVersion=3，舊夜間縮圖會重繪，白天縮圖仍沿用；不再有all類。cityState.version=2，layouts/nightLayouts各四季空白，舊版持有數與擺設一次轉換，夜晚不隱式複製白天。cityEditDraft保存原擺設，snapshotCity在未按✅前輸出原樣，購買品保留；保存／載入／分享限當季時段，版型每情境10個、合計80。預設版型items=[]。
- online/friends.js以既有玩家識別碼認證，只在正式玩家使用；好友單向加入（無訊息或對方確認），100人上限，讀最高分及頭像。版型經手動分享確認才上傳ID／位置／變換與頭像，不送截圖或完整存檔，最多每情境10個。好友只能讀已加入者的當季時段版型；套用缺品可補齊，但仍是建築師草稿，按✅才保存。後台／教學不連好友服務。
- 排行榜服務已獨立部署，前端沿用 `src/js/online/leaderboard.js` 的原目的地。好友與分享服務新增friends及city_layouts兩表，保留players／records；不要新增測試玩家到正式服務。
- 正常存檔主要為 `forgeSaves`，餐廳保存於 `state.restaurant`；後台獨立 `forgeBackendProgressV1`。保留舊存檔與備份相容。
- core/workshop-plans.js共用合成計畫：原料3件最後落格+1，4件依ABC／BCD在B／C各+1，5件（可交叉）在最後落格+2。模胚／備料3件直接成品於最後落格，4件在B／C成品，5件須直線或不分岔彎線，在B／C／D依序成品（六件仍4組）。四件T形採最後格為C的穩定排序，確保兩組各自連通；五件分岔不當完整五連線。各組從原料快照計算，清來源一次再寫全部輸出，保留混料、魔法、配方、星級及每條一次返還。
- ui/workshop-animation.js為兩棋盤唯一合成播放器：原物件半透明，260ms抬起集合、210ms成品落下、40ms間隔，重疊組逐組播放；礦石飛入150ms、合成前等待150ms，食材飛入180–270ms、合成前等待270ms；遮住預先計算的最終棋盤，用快照顯示每一階段。Promise完成才解鎖操作，避免下一次點擊取消餐廳動畫；取消／離場／resize清理遮罩、節點及鎖定。低特效或無完整動畫API直接呈現結果。料理全盤掃描，當次新增三件組仍在最後落格，其他三件組在各自中間格。第一晚不提示冰箱整理。
- 城鎮客人以腳底定位於白天冶煉廠／晚上餐廳門前。背景噴水池有固定尋路禁區；日夜首次進城有季節／天數／早晚文字動畫，同時段回城不重播。
- 首頁及城鎮／餐廳／冶煉廠切換由ui/scene-transitions.js提供全暗中點切換與「進入OO」文字。短暫擋輸入、防重複下一天；低動態或不支援動畫API時立即切換。不要在過場期間另做遊戲步數或時間扣減。
- JS原始片段按 `src/build-order.json` 合成單一腳本，維持原共享變數、包裝函式與初始化順序。不要直接將它們各自掛成script或改成ES modules。
- 修改前先用 `docs/function-index.tsv` 定位；不需閱讀完整生成檔、大型素材資料或歷史副本。建置／檢查方式見README。


## 2026-11-18 defense, item feedback and guests
- Guard lasts 3 seconds and blocks all player offense, including ultimate skills. Skipped normal attack turns advance their clocks without damage, sound or saved-up strikes. Enemy actions and special windups continue normally.
- Forge magic badges display floor(m/5) layers with a pixel orb. Raw m remains the additive sale value. Inspection shows base extra coins; sale messages show the actual rounded marginal coin gain after merchant/season/preference multipliers. No price formula changes.
- Protected weapon locks sit at bottom right. Blizzard consumes once, locks input during a 780 ms outward swirl, then clears heat without a step. Navigation/reset cleanup completes the committed clear and removes particles/timers.
- Restaurant bag groups identical item fields and shows quantity, but still retrieves/consumes one original item. Different grades/processes/spices remain separate.
- Enlarged album art has proportional stars. Order cards render the same guest sprite ID as the town queue. New arriving guests scale from 1.65 to 1, feet anchored; reduced-motion skips the effect.
- Added tests/defense-items-guests.cjs; local mobile and desktop visual checks recorded outside the publish tree in progression/39-defense-items-guests.

## 2026-11-19 ordered updates
- Home four weapon icons are password shortcuts to isolated sandbox. Test is now an ordinary player name, never an admin bypass. Existing password unchanged.
- Sandbox expedition adds ten dishes × five grades, stars and spices as virtual one-meal options (index -2); never writes or consumes formal/fridge inventory. Lab meal identity is stable for a battle and cleared on sandbox exit. testStars is honored only in sandbox.
- Stage1: ranger checks handle molds, monk checks shield molds. Gold quests appear day4+, sale goals30/60/90 in days1–3, multi/gold capped to daily customer count; old early quests migrated without rewards. Safe quest records actual timeout/cancel even if later healed. Forge and kitchen previews name grade/quantity/output cells without consuming RNG/resources.
- Stage2: ten weapon-type roles/passives apply in real/simulated battles and appear in inspection/archive/setup. Ordinary stats have role multipliers before gems/stars (claws faster, armor defensive, hammer/axe offensive). Saved legendCore remains intact; new legends derive from corrected normal roles. Ten Boss traits cover both journeys and repeat in endless; physical shields/counters/repair are deterministic, no RNG. Guard still suppresses all hero offense.
- Stage3: choose tonight signature dish in Recipes or Challenge before first step; +20% sale, one guaranteed named order, locked at first step, no order/queue/quality rerolls. Day4+ one generic guest has deterministic taste/fullness/aroma threshold and +10% sale. Requirements checked before consumption/sale. Menu state and needs survive validated saves; old ongoing nights have no signature and remain locked. No extra tutorial popup.
- Stage4: stage-specific embryo/prep and finished-item rims with explicit stage text; existing dimensions unchanged. Normal forge/kitchen completion gets a short nonblocking lower-screen art/stat/price ribbon; kitchen sequential merge waits for final drop, highlights star milestones once, and cancels cleanly on leaving. Legend/ultimate existing large reveals remain. Battle hit labels show named weapon procs. No new media downloads.
- Stage5: restaurant process rolls use forge-style base weights1/1/1 plus each active named recipe component, plus2 for the component meeting a generic stat need. Initial0/1/2 preview remains; only replenished cards are weighted. Shared read-only forecastMaterials simulates all raw merge cascades without RNG and labels final outputs in both boards. First forge ore now draggable for phone preview; desktop empty-cell hover previews next ore. Click placement remains. Held magic provenance retained.
- Stage6: fixed four seasonal festivals, each three-day season accumulates two reachable tasks (spring sow1/veggie dishes3; summer iron weapons3/aroma20 dishes3; autumn burn3/two-veggie dishes3; winter steel weapons3/fullness26 dishes3). Claim on day3+, gold400/600/800/1000 plus seasonal decoration and per-run badge. All sale/plant/burn hooks run only after valid action. Next season goal preview via town season row or season notice; no layout row added. Completed unclaimed rewards retained8 seasons, claim flag set before payout. Owned gift at placement cap converts price to coins. Saved in validated restaurant state, reset per run and sandbox isolated; no retroactive progress on old saves.

- Festival badges now have four native pixel SVG medals, a third album tab and enlarged inspection. Home album merges formal saved achievements with forgeFestivalBadgesV1; run album uses current run only; test/sandbox never write the global collection. Backup preserves the optional new key. Town festival noticeboard is fixed below the restaurant, day/night styled, not an architect decoration. Day1/day3 unread reminder keys are stored per day in validated festival state, shared across morning/night, read via any festival entrance clears the mark, new runs reset.

## 2026-11-19 fourteen medals and star progression
- collections/medal-achievements.js defines 14 medals (4 seasonal ×3 stars, 4 single-clear expedition, 6 production/life ×3 stars; total34). All normal exact-tier weapon types aggregate existing weaponMastery counts; dish tiers aggregate kitchen.xp. Gold1/5/10, mithril1/3/5, dish tier4 1/5/10, dish tier5 1/3/5. No sale requirement; legends excluded. Decor counts total valid owned copies, including stored/placed and day/night. Flower harvest counts one plant per successful mature harvest, never essence yield or loot.
- Per-run achievements live in kitchen.achievements {harvests,stars}, validated by cleanMedalAchievements and saved with restaurant. Craft/clear/decor legacy progress derives from existing ledgers; old harvests cannot be reconstructed and start0. Successful crafting/harvest/purchase/preset acquisition/settlement hooks sync awards; loading saved mastery syncs silently only after the correct run XP is restored.
- Festival rows store immutable tier1..3, goals base counts ×tier; min grade/stats and monetary gifts unchanged. Successful claim stores badgeStars[season]; next occurrence chooses min(3,current+1), failure retries same tier; three-day window and retained pending rewards unchanged. Old rows default tier1, old badges default one-star. No same-season claim ladder.
- forgeMedalCollectionV2 is an optional backup key, stores highest stars by whitelisted ID. Old forgeFestivalBadgesV1 remains compatible. Home merges formal saves/highest stars; run uses its own progress; test/sandbox never write global medals. Kitchen-first restoration persists only season stars to avoid reading previous run's weapon XP. No new media files or baseline layout size changes.
- tests/medal-achievements.cjs covers all tier boundaries, four seasonal cycles/retries, actual craft/battle/harvest/purchase hooks, isolation, legacy and backup migration.
