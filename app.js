// ---- Settings: your Google Developer profile link ----
const DEV_URL = 'https://g.dev/satyamshukla';
// -------------------------------------------------------
const games=[
 {t:'Classic Chess',d:'Two players, or play the computer.',i:'♞',f:'games/chess.html'},
 {t:'Carom',d:'Flick the striker and pocket your coins.',i:'⚪',f:'games/carom.html'},
 {t:'Math Rush',d:'60 seconds. Solve as many sums as you can.',i:'➗',f:'games/mathrush.html'},
 {t:'Memory Match',d:'Flip cards and find every pair.',i:'🃏',f:'games/memory.html'},
 {t:'Tic-Tac-Toe',d:'Two players, or beat the computer.',i:'✖',f:'games/tictactoe.html'},
 {t:'Music',d:'Play calm music or your own songs in the background.',i:'🎵',music:1}];
const THEMES=[
 {n:'Classic Brown',bg:'#1d130c',bg2:'#3a2515',panel:'#2a1c11',ink:'#f1e4c8',mute:'#b79d73',gold:'#d4a84b',b1:'#7a5230',b2:'#53351c',bd:'#9a7040',sel:'#1b110a',bar:'#150d07'},
 {n:'Neo Dark',bg:'#0a0c12',bg2:'#182033',panel:'#141a26',ink:'#e8ecf4',mute:'#8a93a6',gold:'#38d6c4',b1:'#2a3347',b2:'#1a2133',bd:'#3d4a66',sel:'#0d111a',bar:'#070910'},
 {n:'Ghost Neo Dark',bg:'#0d0d0f',bg2:'#222226',panel:'#1a1a1e',ink:'#f2f2f4',mute:'#8e8e96',gold:'#d6dae3',b1:'#3a3a41',b2:'#26262b',bd:'#5a5a63',sel:'#121214',bar:'#09090a'},
 {n:'Phantom Purple',bg:'#120a1f',bg2:'#2d1655',panel:'#1d1032',ink:'#efe6ff',mute:'#a58fc9',gold:'#b980ff',b1:'#5d2f9c',b2:'#3b1d66',bd:'#8a5bd1',sel:'#150b26',bar:'#0c0615'},
 {n:'Daylight',light:1,bg:'#f1ece0',bg2:'#ffffff',panel:'#ffffff',ink:'#27231b',mute:'#6f695b',gold:'#a8620f',b1:'#f0dfbd',b2:'#dcc496',bd:'#b89a63',sel:'#faf6ec',bar:'#e6dfcd'},
 {n:'Green Niche',bg:'#07130c',bg2:'#15361f',panel:'#0e2216',ink:'#e3f5e8',mute:'#8db89a',gold:'#5fd68a',b1:'#2d7d4a',b2:'#1b5233',bd:'#4fb273',sel:'#0a1a10',bar:'#050e08'}];
const $=id=>document.getElementById(id),au=$('au'),frames={};
let S={theme:0,sfx:1,dim:45,bg:null};
try{Object.assign(S,JSON.parse(localStorage.getItem('gr_set')||'{}'));S.bg=localStorage.getItem('gr_bg')}catch(e){}
$('dev').href=$('dev2').href=DEV_URL;
function save(){try{localStorage.setItem('gr_set',JSON.stringify({theme:S.theme,sfx:S.sfx,dim:S.dim}))}catch(e){}}
function cfg(){const T=THEMES[S.theme],v={'--bg':T.bg,'--bg2':T.bg2,'--panel':T.panel,'--ink':T.ink,'--mute':T.mute,'--gold':T.gold,'--btn1':T.b1,'--btn2':T.b2,'--bd':T.bd,'--sel':T.sel,'--bar':T.bar};
 const o=T.light?'255,255,255':'0,0,0';
 v['--bgfull']=S.bg?`linear-gradient(rgba(${o},${S.dim/100}),rgba(${o},${S.dim/100})),url(${S.bg}) center/cover fixed`:`radial-gradient(ellipse at top,${T.bg2},${T.bg} 70%) fixed`;return v}
function apply(){const v=cfg();for(const k in v)document.documentElement.style.setProperty(k,v[k]);document.querySelector('meta[name=theme-color]').content=THEMES[S.theme].bar;
 const m={type:'cfg',vars:v,mute:!S.sfx};for(const u in frames)try{frames[u].contentWindow.postMessage(m,'*')}catch(e){}
 $('themes').innerHTML=THEMES.map((t,k)=>`<button class="th ${k===S.theme?'on':''}" data-k="${k}"><i style="background:linear-gradient(135deg,${t.bg2},${t.gold})"></i>${t.n}</button>`).join('');
 $('sfx').textContent=S.sfx?'On':'Off';$('sfx').setAttribute('aria-pressed',!!S.sfx);$('dim').value=S.dim}
addEventListener('message',e=>{if(e.data&&e.data.type==='ready')e.source.postMessage({type:'cfg',vars:cfg(),mute:!S.sfx},'*')});
function grid(){$('grid').innerHTML=games.map((g,k)=>`<button class="card" data-k="${k}"><div class="ic">${g.i}</div><h2>${g.t}</h2><p>${g.d}</p>${frames[g.f]?'<b class="rs">In progress: tap to resume</b>':''}${g.music&&playing?'<b class="rs">Playing in background</b>':''}</button>`).join('')}
function openGame(k){const g=games[k];
 if(g.music){$('music').classList.add('on');if(cur<0)play(0);return}
 if(!frames[g.f]){const f=document.createElement('iframe');f.src=g.f;f.title=g.t;$('frames').appendChild(f);frames[g.f]=f}
 for(const u in frames)frames[u].hidden=u!==g.f;
 $('gt').textContent=g.t;$('stage').classList.add('on')}
function hide(){$('stage').classList.remove('on');$('music').classList.remove('on');grid()}
$('grid').onclick=e=>{const c=e.target.closest('.card');if(c)openGame(c.dataset.k)};
$('back').onclick=$('mback').onclick=hide;
$('quit').onclick=()=>{const f=Object.entries(frames).find(([u,x])=>!x.hidden);if(f&&confirm('Quit this game? Your progress in it will be lost.')){f[1].remove();delete frames[f[0]];hide()}};
addEventListener('beforeunload',e=>{if(Object.keys(frames).length){e.preventDefault();e.returnValue=''}});
$('fs').onclick=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()};
let ip;addEventListener('beforeinstallprompt',e=>{e.preventDefault();ip=e;$('inst').hidden=false});
$('inst').onclick=()=>{ip&&ip.prompt();$('inst').hidden=true};
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
// ---- Settings sheet ----
$('set').onclick=$('set2').onclick=()=>$('settings').classList.add('show');
$('sclose').onclick=()=>$('settings').classList.remove('show');
$('themes').onclick=e=>{const b=e.target.closest('.th');if(b){S.theme=+b.dataset.k;save();apply()}};
$('sfx').onclick=()=>{S.sfx=S.sfx?0:1;save();apply()};
$('dim').oninput=e=>{S.dim=+e.target.value;save();apply()};
$('bgx').onclick=()=>{S.bg=null;try{localStorage.removeItem('gr_bg')}catch(e){}apply()};
$('bgf').onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{const k=Math.min(1,1280/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);
 S.bg=c.toDataURL('image/jpeg',.75);try{localStorage.setItem('gr_bg',S.bg)}catch(x){}apply();URL.revokeObjectURL(im.src)};im.src=URL.createObjectURL(f);e.target.value=''};
// ---- Music ----
const tracks=[{name:'Calm ambience (built-in)',synth:true}];let cur=-1,playing=false,shuf=false,AC,sg,sy,vol=.6;
try{vol=+localStorage.getItem('gr_vol')||.6}catch(e){}$('vol').value=vol;
const ch=[[220,261.6,329.6],[174.6,220,261.6],[130.8,196,261.6],[196,246.9,293.7]];
function synthStart(){AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume();sg=AC.createGain();sg.gain.value=vol*.8;sg.connect(AC.destination);let k=0;
 const tick=()=>{ch[k++%4].forEach(f=>{const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.45,t+1.5);g.gain.linearRampToValueAtTime(0,t+4.5);o.connect(g).connect(sg);o.start(t);o.stop(t+4.6)})};tick();sy=setInterval(tick,4000)}
function synthStop(){clearInterval(sy);if(sg){sg.disconnect();sg=null}}
function play(i){au.pause();synthStop();cur=i;const t=tracks[i];if(t.synth)synthStart();else{au.src=t.url;au.volume=vol;au.play().catch(()=>{})}playing=true;ui()}
function toggle(){if(cur<0)return play(0);if(playing){au.pause();synthStop();playing=false}else{tracks[cur].synth?synthStart():au.play();playing=true}ui()}
function step(d){play(shuf&&tracks.length>1?(cur+1+Math.floor(Math.random()*(tracks.length-1)))%tracks.length:(cur+d+tracks.length)%tracks.length)}
const fm=s=>isFinite(s)?Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'):'0:00';
function ui(){$('pp').textContent=playing?'⏸':'▶';$('chipB').textContent=playing?'⏸':'▶';$('chip').hidden=cur<0;
 $('now').textContent=cur<0?'Nothing playing':(playing?'Now playing: ':'Paused: ')+tracks[cur].name;$('chipT').textContent='♪ '+(cur<0?'':tracks[cur].name);
 $('list').innerHTML=tracks.map((t,k)=>`<button data-k="${k}" class="${k===cur?'cur':''}">${t.name}</button>`).join('');grid()}
au.onended=()=>step(1);
au.ontimeupdate=()=>{$('seek').value=au.duration?au.currentTime/au.duration*100:0;$('tt').textContent=fm(au.currentTime)+' / '+fm(au.duration)};
$('seek').oninput=e=>{if(au.duration&&cur>=0&&!tracks[cur].synth)au.currentTime=e.target.value/100*au.duration};
$('pp').onclick=$('chipB').onclick=toggle;$('prev').onclick=()=>step(-1);$('next').onclick=()=>step(1);
$('shuf').onclick=e=>{shuf=!shuf;e.target.textContent='Shuffle: '+(shuf?'on':'off');e.target.setAttribute('aria-pressed',shuf)};
$('vol').oninput=e=>{vol=+e.target.value;au.volume=vol;if(sg)sg.gain.value=vol*.8;try{localStorage.setItem('gr_vol',vol)}catch(x){}};
$('list').onclick=e=>{const b=e.target.closest('button');if(b)play(+b.dataset.k)};
$('file').onchange=e=>{const n=tracks.length;for(const f of e.target.files)tracks.push({name:f.name.replace(/\.[^.]+$/,''),url:URL.createObjectURL(f)});if(tracks.length>n)play(n);else ui();e.target.value=''};
$('enter').onclick=()=>$('welcome').classList.remove('show');
apply();ui();
