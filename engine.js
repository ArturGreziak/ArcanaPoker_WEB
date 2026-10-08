/* Original Arcana Poker rules. No dependencies; usable from Node for tests. */
(function(root){
const NAMES=['Wysoka karta','Para','Dwie pary','Trójka','Strit','Kolor','Full','Kareta','Poker'];
const BASE=[[5,1],[10,2],[20,2],[30,3],[30,4],[35,4],[40,4],[60,7],[100,8]];
const ARCANA=[
['spark','Iskra','+4 do mnożnika.',5],['anvil','Kowadło','+50 żetonów.',5],
['twins','Bliźnięta','+12 do mnożnika, gdy układ ma parę.',6],['trinity','Trójca','+20 do mnożnika za trójkę, full lub karetę.',7],
['river','Rzeka','Mnożnik ×2 za strit lub poker.',7],['prism','Pryzmat','Mnożnik ×2 za kolor lub poker.',7],
['heart','Serce','+5 mnożnika za każde punktujące serce.',6],['spade','Ostrze','+20 żetonów za każdy punktujący pik.',5],
['crown','Korona','+8 mnożnika za każdą punktującą figurę.',7],['echo','Echo','Pierwsza punktująca karta daje drugi raz żetony.',5],
['last','Ostatni akt','Mnożnik ×3 przy ostatniej ręce.',7],['gold','Alchemik','+2 monety za zagraną rękę.',6],
['lone','Samotnik','+18 mnożnika za wysoką kartę.',5],['economy','Skarbiec','+1 mnożnika na każde 3 posiadane monety.',6],
['growth','Kiełek','+2 mnożnika za każdą wygraną rundę.',6],['low','Małe kroki','+6 mnożnika za każdą punktującą kartę 2–5.',5]
].map(([id,name,desc,cost])=>({id,name,desc,cost}));
const TARGETS=[250,600,1200,2000,3400,5500,9000,15000];
function evaluate(cards){
 if(!cards.length)return null;
 const ranks=cards.map(c=>c.r).sort((a,b)=>a-b), groups={}; cards.forEach(c=>(groups[c.r]??=[]).push(c));
 const sets=Object.values(groups).sort((a,b)=>b.length-a.length||b[0].r-a[0].r);
 const flush=cards.length===5&&cards.every(c=>c.s===cards[0].s);
 const straight=cards.length===5&&new Set(ranks).size===5&&((ranks[4]-ranks[0]===4)||ranks.join(',')==='2,3,4,5,14');
 let type=0,scoring=[];
 if(straight&&flush){type=8;scoring=cards;} else if(sets[0].length===4){type=7;scoring=sets[0];}
 else if(sets[0].length===3&&sets[1]?.length===2){type=6;scoring=cards;}
 else if(flush){type=5;scoring=cards;} else if(straight){type=4;scoring=cards;}
 else if(sets[0].length===3){type=3;scoring=sets[0];}
 else if(sets[0].length===2&&sets[1]?.length===2){type=2;scoring=sets[0].concat(sets[1]);}
 else if(sets[0].length===2){type=1;scoring=sets[0];} else {scoring=[sets[0][0]];}
 return {type,name:NAMES[type],scoring};
}
const value=c=>c.r===14?11:Math.min(c.r,10);
function preview(g,cards){
 const e=evaluate(cards);if(!e)return null;
 const lv=g.levels[e.type]-1;let chips=BASE[e.type][0]+lv*15+e.scoring.reduce((a,c)=>a+value(c),0),mult=BASE[e.type][1]+lv;
 if(g.round===2)mult=Math.max(1,mult-2);
 if(g.round===5)chips=Math.max(1,chips-20);
 const effects=[];
 g.arcana.forEach(id=>{let a=0,b=0,x=1;switch(id){
 case 'spark':b=4;break;case 'anvil':a=50;break;case 'twins':if([1,2,6,7].includes(e.type))b=12;break;
 case 'trinity':if([3,6,7].includes(e.type))b=20;break;case 'river':if([4,8].includes(e.type))x=2;break;
 case 'prism':if([5,8].includes(e.type))x=2;break;case 'heart':b=e.scoring.filter(c=>c.s===0).length*5;break;
 case 'spade':a=e.scoring.filter(c=>c.s===3).length*20;break;case 'crown':b=e.scoring.filter(c=>c.r>=11&&c.r<=13).length*8;break;
 case 'echo':a=value(e.scoring[0]);break;case 'last':if(g.hands===1)x=3;break;
 case 'lone':if(e.type===0)b=18;break;case 'economy':b=Math.floor(g.money/3);break;
 case 'growth':b=g.round*2;break;case 'low':b=e.scoring.filter(c=>c.r<=5).length*6;break;
 }chips+=a;mult=(mult+b)*x;if(a||b||x!==1)effects.push(ARCANA.find(j=>j.id===id).name);});
 return {...e,chips,mult,total:Math.floor(chips*mult),effects};
}
function deck(){const d=[];for(let s=0;s<4;s++)for(let r=2;r<=14;r++)d.push({r,s});for(let i=d.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]];}return d;}
function startRound(g){g.phase='play';g.deck=deck();g.hand=g.deck.splice(0,8);g.score=0;g.hands=4;g.discards=3;g.selected=[];g.revived=false;g.log='Wybierz od 1 do 5 kart. Cel: '+TARGETS[g.round]+' punktów.';}
function newGame(){let g={version:1,round:0,money:5,arcana:[],levels:Array(9).fill(1),bestHand:0,shop:[],refreshes:0};startRound(g);return g;}
function offer(g){g.shop=ARCANA.filter(a=>!g.arcana.includes(a.id)).sort(()=>Math.random()-.5).slice(0,3).map(a=>a.id);g.planet=Math.floor(Math.random()*9);}
function play(g){if(g.phase!=='play'||!g.selected.length)return false;const cs=g.selected.map(i=>g.hand[i]),p=preview(g,cs);g.score+=p.total;g.bestHand=Math.max(g.bestHand,p.total);g.hands--;if(g.arcana.includes('gold'))g.money+=2;
 g.hand=g.hand.filter((_,i)=>!g.selected.includes(i));g.hand.push(...g.deck.splice(0,Math.min(8-g.hand.length,g.deck.length)));g.selected=[];
 g.log=p.name+': '+p.chips+' × '+p.mult+' = '+p.total+(p.effects.length?' • '+p.effects.join(', '):'');
 if(g.score>=TARGETS[g.round]){g.money+=5+g.hands+Math.min(5,Math.floor(g.money/5));g.phase=g.round===7?'win':'shop';g.refreshes=0;if(g.phase==='shop')offer(g);}
 else if(g.hands===0||g.hand.length===0)g.phase='lost';return true;}
function discard(g){if(g.phase!=='play'||!g.discards||!g.selected.length)return false;g.hand=g.hand.filter((_,i)=>!g.selected.includes(i));g.hand.push(...g.deck.splice(0,8-g.hand.length));g.selected=[];g.discards--;g.log='Karty wymienione. Każda karta talii występuje tylko raz na rundę.';if(!g.hand.length)g.phase='lost';return true;}
function buy(g,id){const a=ARCANA.find(a=>a.id===id);if(g.phase!=='shop'||!a||!g.shop.includes(id)||g.arcana.length>=5||g.money<a.cost)return false;g.money-=a.cost;g.arcana.push(id);g.shop=g.shop.filter(x=>x!==id);return true;}
function valid(g){const card=c=>c&&Number.isInteger(c.r)&&c.r>=2&&c.r<=14&&Number.isInteger(c.s)&&c.s>=0&&c.s<4;
 return !!(g&&g.version===1&&['play','shop','win','lost'].includes(g.phase)&&Number.isInteger(g.round)&&g.round>=0&&g.round<8&&Number.isFinite(g.money)&&g.money>=0&&Array.isArray(g.levels)&&g.levels.length===9&&g.levels.every(x=>Number.isInteger(x)&&x>=1&&x<=100)&&Array.isArray(g.arcana)&&g.arcana.length<=5&&g.arcana.every(x=>ARCANA.some(a=>a.id===x))&&new Set(g.arcana).size===g.arcana.length&&Array.isArray(g.hand)&&g.hand.length<=8&&g.hand.every(card)&&Array.isArray(g.deck)&&g.deck.length<=52&&g.deck.every(card)&&new Set([...g.hand,...g.deck].map(c=>c.s*13+c.r)).size===g.hand.length+g.deck.length&&Number.isInteger(g.hands)&&g.hands>=0&&g.hands<=4&&Number.isInteger(g.discards)&&g.discards>=0&&g.discards<=3&&Number.isFinite(g.score)&&g.score>=0&&Array.isArray(g.shop)&&g.shop.every(x=>ARCANA.some(a=>a.id===x))&&Array.isArray(g.selected)&&g.selected.length<=5&&g.selected.every(i=>Number.isInteger(i)&&i>=0&&i<g.hand.length)&&new Set(g.selected).size===g.selected.length&&Number.isFinite(g.bestHand)&&Number.isInteger(g.refreshes)&&g.refreshes>=0&&(g.planet===undefined||Number.isInteger(g.planet)&&g.planet>=0&&g.planet<9));}
const api={NAMES,BASE,ARCANA,TARGETS,evaluate,preview,newGame,startRound,play,discard,buy,offer,valid,value};if(typeof module!=='undefined')module.exports=api;else root.Arcana=api;
})(globalThis);
