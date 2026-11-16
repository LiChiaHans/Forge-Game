

const LEGENDS=[
 {name:'苔冠獵爪',c:0,tier:0,recipe:[0,1,6],scale:1.5,price:1.15,magic:10,color:'#80d79b',trait:'翠刃工藝：攻擊額外提升 12%。'},
 {name:'逐風長矛',c:3,tier:0,recipe:[3,6,1],scale:1.5,price:1.17,magic:10,color:'#81d9eb',trait:'逐風工藝：速度額外提升 15%。'},
 {name:'岩心大盾',c:9,tier:1,recipe:[9,2,4],scale:1.55,price:1.19,magic:15,color:'#c4bd85',trait:'岩心工藝：防禦額外提升 15%。'},
 {name:'竊影大劍',c:1,tier:1,recipe:[1,0,3,8],scale:1.6,price:1.21,magic:20,color:'#c4a1ef',trait:'影刃工藝：攻擊與速度額外提升 8%。'},
 {name:'霜衛聖鎧',c:4,tier:2,recipe:[4,9,2,5],scale:1.6,price:1.23,magic:25,color:'#b6ecf1',trait:'霜衛工藝：防禦額外提升 15%。'},
 {name:'熔核戰錘',c:5,tier:2,recipe:[5,8,1],scale:1.65,price:1.25,magic:30,color:'#f3a06a',trait:'熔核工藝：攻擊額外提升 15%。'},
 {name:'夜行長棍',c:6,tier:3,recipe:[6,3,0,2],scale:1.7,price:1.27,magic:35,color:'#ba9ce7',trait:'夜行工藝：速度額外提升 18%。'},
 {name:'遺跡破城鏟',c:7,tier:3,recipe:[7,5,9,4],scale:1.7,price:1.29,magic:40,color:'#e9cb83',trait:'破城工藝：攻擊與防禦額外提升 10%。'},
 {name:'龍焰巨斧',c:8,tier:4,recipe:[8,1,5,3,4],scale:1.75,price:1.32,magic:45,color:'#f2b477',trait:'龍焰工藝：攻擊額外提升 18%。'},
 {name:'星隕盾刃',c:2,tier:4,recipe:[2,9,1,0,6],scale:1.8,price:1.35,magic:50,color:'#e9d4ff',trait:'星隕工藝：攻擊、防禦、速度額外提升 8%。'}
];
const LEGEND_BONUS=[{atk:1.12},{spd:1.15},{def:1.15},{atk:1.08,spd:1.08},{def:1.15},{atk:1.15},{spd:1.18},{atk:1.1,def:1.1},{atk:1.18},{atk:1.08,def:1.08,spd:1.08}];
// The second journey uses exactly named first-journey legends as ingredients.
const ULTIMATE_ART=["assets/ultimate/0.9ffd61a6ed70.jpg","assets/ultimate/1.dfe50648d0f3.jpg","assets/ultimate/2.01b0f2c37981.jpg","assets/ultimate/3.bef7b35d37e7.jpg","assets/ultimate/4.1c5c214e9a34.jpg","assets/ultimate/5.a6ed0adc72d4.jpg","assets/ultimate/6.30c9ced58943.jpg","assets/ultimate/7.1da0b99ac4a9.jpg","assets/ultimate/8.49b26f45cb33.jpg","assets/ultimate/9.dffb97620ad4.jpg"];
const ULTIMATES=[
 {name:'翠嵐龍牙',c:3,recipe:[0,1],color:'#88f1c6',skill:{name:'翠嵐連牙',power:3.2,heal:.18,desc:'造成 320% 攻擊傷害，回復 18% 最大生命。'}},
 {name:'玄岩夜裁',c:1,recipe:[2,3],color:'#b6a2fb',skill:{name:'碎岩裁決',power:3.6,break:.45,desc:'造成 360% 攻擊傷害，敵方防禦永久降低 45%。'}},
 {name:'熔霜聖錘',c:5,recipe:[4,5],color:'#9de9ef',skill:{name:'熔霜聖域',power:3,shield:1.2,desc:'造成 300% 攻擊傷害，獲得防禦 ×120% 的護盾。'}},
 {name:'夜行破城杖',c:6,recipe:[6,7],color:'#e0b5ff',skill:{name:'夜幕破城',power:3.3,delay:2,desc:'造成 330% 攻擊傷害，延緩敵方兩個行動週期。'}},
 {name:'星焰龍皇斧',c:8,recipe:[8,9],color:'#ffce84',skill:{name:'龍皇星墜',power:4.5,desc:'造成 450% 攻擊傷害，無視敵方防禦。'}},
 {name:'萬象天穹槍',c:3,recipe:[0,1,2],color:'#a1f5dd',skill:{name:'萬象天穹',power:4.5,heal:.3,break:.35,desc:'造成 450% 攻擊傷害，回復 30% 最大生命，敵方防禦降低 35%。'}},
 {name:'永夜霜王刃',c:1,recipe:[3,4,6],color:'#c1b7ff',skill:{name:'永夜霜封',power:4.8,delay:3,shield:1,desc:'造成 480% 攻擊傷害，延緩敵方三個行動週期，獲得防禦等量護盾。'}},
 {name:'熔星鎮界錘',c:5,recipe:[5,7,9],color:'#ffb985',skill:{name:'鎮界熔星',power:5.2,break:.5,desc:'造成 520% 攻擊傷害，敵方防禦永久降低 50%。'}},
 {name:'龍魂翠影爪',c:0,recipe:[0,3,8],color:'#b5ee93',skill:{name:'龍魂追獵',power:5.5,heal:.25,delay:2,desc:'造成 550% 攻擊傷害，回復 25% 最大生命，延緩敵方兩個行動週期。'}},
 {name:'終焉星冕盾刃',c:2,recipe:[9,1,4],color:'#f6e5ad',skill:{name:'終焉星冕',power:6.5,heal:.35,shield:1.5,break:.5,desc:'造成 650% 攻擊傷害，回復 35% 最大生命、獲得防禦 ×150% 護盾，敵方防禦降低 50%。'}}
];
ULTIMATES.forEach((u,i)=>{LEGENDS.push({...u,tier:4,ultimate:true,scale:1,price:i<5?1.8:2.2,magic:i<5?80:120,trait:u.skill.name+'：'+u.skill.desc+' 每場戰鬥限施放一次，無視防禦並計算屬性倍率。'});LEGEND_BONUS.push({});});