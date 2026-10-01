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


const processData={
  idea:{number:'01',label:'IDEA',title:'Start with a reason.',copy:'Unique Melodies started with a question about making music more accessible. MAXOUT started with a brand idea I wanted to turn into something people could actually wear.',example:'UNIQUE MELODIES + MAXOUT'},
  plan:{number:'02',label:'PLAN',title:'Make the idea executable.',copy:'Ideas become real when they turn into tasks, timelines, responsibilities, and decisions. I like figuring out what has to happen next — and who needs to be involved.',example:'PROGRAMS + PRODUCTS + PEOPLE'},
  numbers:{number:'03',label:'NUMBERS',title:'See what is actually realistic.',copy:'This is where accounting becomes part of the build: costs, pricing, budgets, margins, and whether the idea can keep working after the excitement of launching it.',example:'PRICING + BUDGETS + MARGINS'},
  brand:{number:'04',label:'BRAND',title:'Make it recognizable.',copy:'A good idea still needs a clear identity. Websites, visuals, messaging, apparel, and event experiences help people understand what they are joining.',example:'MAXOUT + UNIQUE MELODIES'},
  launch:{number:'05',label:'LAUNCH',title:'Let real people react.',copy:'I would rather put something real into the world than keep polishing an idea forever. Launching creates feedback you cannot get while something is still hypothetical.',example:'EVENTS + E-COMMERCE + PROGRAMS'},
  improve:{number:'06',label:'IMPROVE',title:'Use the feedback.',copy:'The first version is rarely the final version. I look at what worked, what people responded to, what the numbers say, and what needs to change next.',example:'TEST + LEARN + REBUILD'}
};

const processDisplay=document.querySelector('.process-display');
const processSteps=[...document.querySelectorAll('.process-step')];
const updateProcess=(stage)=>{
  const d=processData[stage];
  if(!d||!processDisplay) return;
  processSteps.forEach(step=>step.classList.toggle('active',step.dataset.stage===stage));
  processDisplay.classList.add('switching');
  setTimeout(()=>{
    document.querySelector('#process-number').textContent=d.number;
    document.querySelector('#process-label').textContent=d.label;
    document.querySelector('#process-title').textContent=d.title;
    document.querySelector('#process-copy').textContent=d.copy;
    document.querySelector('#process-example').textContent=d.example;
    processDisplay.classList.remove('switching');
  },170);
};

processSteps.forEach(step=>{
  step.addEventListener('mouseenter',()=>updateProcess(step.dataset.stage));
  step.addEventListener('focus',()=>updateProcess(step.dataset.stage));
  step.addEventListener('click',()=>updateProcess(step.dataset.stage));
});

if(processSteps.length){
  const processObserver=new IntersectionObserver(entries=>{
    const visible=entries
      .filter(entry=>entry.isIntersecting)
      .sort((a,b)=>Math.abs(a.boundingClientRect.top-window.innerHeight*.45)-Math.abs(b.boundingClientRect.top-window.innerHeight*.45));
    if(visible[0]) updateProcess(visible[0].target.dataset.stage);
  },{rootMargin:'-30% 0px -45% 0px',threshold:.05});
  processSteps.forEach(step=>processObserver.observe(step));
}
