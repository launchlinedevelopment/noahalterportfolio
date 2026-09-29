const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const btn=document.querySelector('.menu-btn'),links=document.querySelector('.nav-links');
btn?.addEventListener('click',()=>{const open=links.classList.toggle('open');btn.setAttribute('aria-expanded',open)});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

const progress=document.querySelector('.scroll-progress');
const updateProgress=()=>{
  const h=document.documentElement;
  const max=h.scrollHeight-h.clientHeight;
  const pct=max>0?(h.scrollTop/max)*100:0;
  if(progress) progress.style.width=pct+'%';
};
document.addEventListener('scroll',updateProgress,{passive:true});
updateProgress();

const words=['build','lead','serve','create'];
let wordIndex=0;
const cycle=document.querySelector('.cycle-word');
if(cycle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  setInterval(()=>{
    cycle.classList.add('swap');
    setTimeout(()=>{
      wordIndex=(wordIndex+1)%words.length;
      cycle.textContent=words[wordIndex];
      cycle.classList.remove('swap');
    },190);
  },2200);
}

const tiltCards=document.querySelectorAll('[data-tilt]');
if(!window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  tiltCards.forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
}

const parallaxEls=[...document.querySelectorAll('[data-parallax]')];
if(parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const parallax=()=>{
    const vh=window.innerHeight;
    parallaxEls.forEach(el=>{
      const r=el.getBoundingClientRect();
      if(r.bottom>0 && r.top<vh){
        const speed=parseFloat(el.dataset.parallax||'0.04');
        const offset=(r.top-vh/2)*speed;
        el.style.transform=`scale(1.04) translateY(${offset}px)`;
      }
    });
  };
  document.addEventListener('scroll',parallax,{passive:true});
  parallax();
}


const sectionCycles=[...document.querySelectorAll('.section-cycle')];
if(sectionCycles.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  sectionCycles.forEach((el,i)=>{
    const words=(el.dataset.words||'').split('|').filter(Boolean);
    if(words.length<2) return;
    let index=0;
    const delay=2600+(i%3)*320;
    setTimeout(()=>{
      setInterval(()=>{
        el.classList.add('swap');
        setTimeout(()=>{
          index=(index+1)%words.length;
          el.textContent=words[index];
          el.classList.remove('swap');
        },190);
      },delay);
    },i*180);
  });
}
