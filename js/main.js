/* ---------- EDIT HERE ----------
   Photos go in the photos/ folder, named like Ali.png, Khazar.png, Rasul.png
   Logo goes next to index.html as logo.png
------------------------------- */
const players = [
  {name:"Khazar",   pos:"Goalkeeper", num:1,  x:300,y:700},
  {name:"Javad",    pos:"Defence",    num:20, x:130,y:545},
  {name:"Onur",     pos:"Defence",    num:11, x:300,y:565},
  {name:"Kanan",    pos:"Defence",    num:5,  x:470,y:545},
  {name:"Artoghrul",pos:"Midfield",   num:7,  x:300,y:385},
  {name:"Fateh",    pos:"Attack",     num:27, x:300,y:200},
  {name:"Ali",      pos:"Substitute", num:"",  sub:true}
];

/* Hero title letters, glow, parallax */
document.getElementById('htitle').innerHTML = [...'RAVEL'].map((c,i)=>`<span><i style="--i:${i}">${c}</i></span>`).join('');
const glow=document.getElementById('glow'), ht=document.getElementById('htitle');
document.querySelector('.hero').addEventListener('pointermove',e=>{glow.style.setProperty('--x',e.clientX+'px');glow.style.setProperty('--y',e.clientY+'px');});

/* Ticker */
document.getElementById('mq').innerHTML = Array(10).fill('<span>Ravel FC</span><i></i><span>2026</span><i></i>').join('');

/* Squad cards */
const grid = document.getElementById('grid');
players.forEach(p=>{
  const c = document.createElement('article');
  c.className = 'card';
  c.dataset.photo = p.name;
  c.dataset.alt = p.name;
  c.tabIndex = 0;
  c.innerHTML = `<div class="num">${p.num||p.name[0]}</div><div class="info"><div><h3>${p.name}</h3><small>${p.pos}</small></div>${p.num?`<b>#${p.num}</b>`:''}</div>`;
  grid.appendChild(c);
});

/* Photo loader: photos/<Name>.png, then jpg, jpeg, webp, then lowercase name. Nothing found = outlined number stays. */
document.querySelectorAll('[data-photo]').forEach(el=>{
  const n = el.dataset.photo, files = [];
  [n, n.toLowerCase()].forEach(b=>['png','jpg','jpeg','webp'].forEach(e=>files.push(`photos/${b}.${e}`)));
  let i = 0;
  const img = new Image();
  img.alt = el.dataset.alt || '';
  img.onload = ()=>{ el.insertBefore(img, el.firstChild); el.classList.add('has-photo'); };
  img.onerror = ()=>{ if(++i<files.length) img.src = files[i]; };
  img.src = files[0];
});

/* Squad reveal */
const io = new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return;
  const idx = [...grid.children].indexOf(e.target);
  setTimeout(()=>e.target.classList.add('in'), (idx%4)*90);
  io.unobserve(e.target);
}),{threshold:.15});
[...grid.children].forEach(c=>io.observe(c));

/* Pitch draws itself, then players appear */
const pitch = document.getElementById('pitch');
new IntersectionObserver((es,o)=>es.forEach(e=>{ if(e.isIntersecting){ pitch.classList.add('in'); o.disconnect(); } }),{threshold:.25}).observe(pitch);

/* Player full view */
const md = document.getElementById('modal');
let cur = 0;
function show(i){
  cur = (i+players.length)%players.length;
  const p = players[cur], im = grid.children[cur].querySelector('img');
  document.getElementById('mph').innerHTML = im ? `<img src="${im.src}" alt="${p.name}">` : '';
  document.getElementById('mnum').textContent = p.num||p.name[0];
  document.getElementById('mname').textContent = p.name;
  document.getElementById('mpos').textContent = p.pos;
  md.classList.add('open'); document.body.style.overflow='hidden';
}
function hide(){ md.classList.remove('open'); document.body.style.overflow=''; }
[...grid.children].forEach((c,i)=>{ c.onclick=()=>show(i); c.onkeydown=e=>{ if(e.key==='Enter') show(i); }; });
document.getElementById('mclose').onclick = hide;
document.getElementById('mprev').onclick = ()=>show(cur-1);
document.getElementById('mnext').onclick = ()=>show(cur+1);
md.onclick = e=>{ if(e.target===md) hide(); };
addEventListener('keydown',e=>{
  if(!md.classList.contains('open')) return;
  if(e.key==='Escape') hide();
  if(e.key==='ArrowLeft') show(cur-1);
  if(e.key==='ArrowRight') show(cur+1);
});

/* Lineup on pitch */
let k = 0;
document.getElementById('pl').innerHTML = players.map((p,i)=>p.sub?'':
  `<g transform="translate(${p.x},${p.y})"><g class="pl" tabindex="0" data-i="${i}" style="--k:${k++}"><circle r="30"/><text class="n">${p.num}</text><text class="nm" y="58">${p.name}</text></g></g>`).join('');
document.querySelectorAll('.pl').forEach(g=>{
  g.onclick=()=>show(+g.dataset.i);
  g.onkeydown=e=>{ if(e.key==='Enter') show(+g.dataset.i); };
});

/* Bench */
document.getElementById('bench').innerHTML = players.map((p,i)=>p.sub?`<button data-i="${i}">${p.num?`<b>#${p.num}</b>`:''}${p.name}</button>`:'').join('');
document.querySelectorAll('#bench button').forEach(b=>b.onclick=()=>show(+b.dataset.i));

/* Scroll progress */
const prog = document.getElementById('prog');
addEventListener('scroll',()=>{ prog.style.width = (scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%'; },{passive:true});
document.getElementById('yr').textContent = new Date().getFullYear();
