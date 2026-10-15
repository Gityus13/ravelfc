/* Ravel FC: GSAP layer (Lenis smooth scroll + ScrollTrigger). Skips itself if GSAP is missing or reduced motion is on. */
(()=>{
if(!window.gsap||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion:reduce)').matches) return;
gsap.registerPlugin(ScrollTrigger);
const $=s=>document.querySelectorAll(s), fine=matchMedia('(hover:hover)').matches;

/* Smooth scroll synced with ScrollTrigger */
if(window.Lenis){
  const lenis=new Lenis({lerp:.09});
  lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));
  gsap.ticker.lagSmoothing(0);
  $('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();lenis.scrollTo(t,{offset:0,duration:1.4});}}));
}

/* Hero: scroll parallax */
gsap.to('#htitle',{yPercent:25,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.crest',{yPercent:-30,rotate:8,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.swoosh',{yPercent:-18,opacity:.2,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

/* Section titles: masked rise */
$('h2').forEach(h=>gsap.fromTo(h,{clipPath:'inset(0 0 100% 0)',yPercent:60},{clipPath:'inset(0 0 0% 0)',yPercent:0,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:h,start:'top 88%'}}));

/* Squad cards: staggered clip + rise, photo settles from zoom */
$('.card').forEach(c=>c.classList.add('in'));
ScrollTrigger.batch('.card',{start:'top 92%',once:true,onEnter:b=>{
  gsap.fromTo(b,{opacity:0,y:70,clipPath:'inset(14% 0 0 0)'},{opacity:1,y:0,clipPath:'inset(0% 0 0 0)',duration:1.1,stagger:.1,ease:'expo.out',overwrite:true});
  gsap.fromTo(b.map(c=>c.querySelector('img')).filter(Boolean),{scale:1.25},{scale:1,duration:1.6,stagger:.1,ease:'expo.out'});
}});
gsap.set('.card',{opacity:0});

/* Card hover: photo and outlined number follow the mouse */
if(fine) $('.card').forEach(c=>{
  const n=c.querySelector('.num'), qx=gsap.quickTo(n,'x',{duration:.6,ease:'power3'}), qy=gsap.quickTo(n,'y',{duration:.6,ease:'power3'});
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();qx((e.clientX-r.left-r.width/2)*.12);qy((e.clientY-r.top-r.height/2)*.12);});
  c.addEventListener('pointerleave',()=>{qx(0);qy(0);});
});

/* Ticker: GSAP loop that speeds up with scroll velocity */
const tk=gsap.to('.ticker div',{xPercent:-50,repeat:-1,duration:30,ease:'none'});
ScrollTrigger.create({onUpdate:s=>{const v=Math.min(Math.abs(s.getVelocity())/250,8);gsap.to(tk,{timeScale:1+v,duration:.2,overwrite:true,onComplete:()=>gsap.to(tk,{timeScale:1,duration:1.2})});}});

/* Club statement: words light up as you scroll, stats count up */
gsap.fromTo('.statement .w',{opacity:.15},{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:'.statement',start:'top 80%',end:'bottom 45%',scrub:true}});
gsap.from('.stats div',{y:50,opacity:0,stagger:.12,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.stats',start:'top 88%'}});
$('.stats b[data-n]').forEach(b=>{const o={v:0},t=+b.dataset.n;gsap.to(o,{v:t,duration:1.8,ease:'power2.out',snap:{v:1},onUpdate:()=>b.textContent=o.v,scrollTrigger:{trigger:b,start:'top 90%',once:true}});});

/* Sponsors */
gsap.from('.stile',{opacity:0,y:40,stagger:.1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'.sgrid',start:'top 90%'}});

/* Manager portrait: reveal and parallax */
gsap.fromTo('.portrait',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1.4,ease:'expo.inOut',scrollTrigger:{trigger:'.pres',start:'top 75%'}});
gsap.fromTo('.pres > div:last-child > *',{y:50,opacity:0},{y:0,opacity:1,stagger:.12,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.pres',start:'top 70%'}});
gsap.to('.portrait',{yPercent:-6,ease:'none',scrollTrigger:{trigger:'.pres',scrub:true}});

/* Player pop-up animation */
const md=document.getElementById('modal');
new MutationObserver(()=>{if(md.classList.contains('open')){
  gsap.fromTo('.mbox',{y:50,opacity:0,scale:.96},{y:0,opacity:1,scale:1,duration:.7,ease:'expo.out'});
  gsap.fromTo('.mnum',{xPercent:30,opacity:0},{xPercent:0,opacity:1,duration:1,ease:'expo.out'});
  gsap.fromTo('#mname,#mpos',{y:30,opacity:0},{y:0,opacity:1,stagger:.08,delay:.15,duration:.7,ease:'power3.out'});
}}).observe(md,{attributes:true,attributeFilter:['class']});

/* Cursor + magnetic links */
if(fine){
  const cur=document.getElementById('cursor'), qx=gsap.quickTo(cur,'x',{duration:.25,ease:'power3'}), qy=gsap.quickTo(cur,'y',{duration:.25,ease:'power3'});
  addEventListener('pointermove',e=>{gsap.to(cur,{opacity:1,duration:.3});qx(e.clientX);qy(e.clientY);},{once:false});
  $('a,button,.card,.pl').forEach(el=>{
    el.addEventListener('pointerenter',()=>gsap.to(cur,{scale:3.2,duration:.4,ease:'power3'}));
    el.addEventListener('pointerleave',()=>gsap.to(cur,{scale:1,duration:.4,ease:'power3'}));
  });
  $('nav ul a,.bench button,.mnav button').forEach(el=>{
    const x=gsap.quickTo(el,'x',{duration:.5,ease:'power3'}), y=gsap.quickTo(el,'y',{duration:.5,ease:'power3'});
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();x((e.clientX-r.left-r.width/2)*.3);y((e.clientY-r.top-r.height/2)*.3);});
    el.addEventListener('pointerleave',()=>{x(0);y(0);});
  });
}
addEventListener('load',()=>ScrollTrigger.refresh());
})();
