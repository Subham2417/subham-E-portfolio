
const overlay = document.querySelector('.transition-overlay');

function smoothNavigate(url){
  if(!overlay){ window.location.href=url; return; }
  overlay.classList.remove('active');
  void overlay.offsetWidth;
  overlay.classList.add('active');
  setTimeout(()=>window.location.href=url, 480);
}

document.querySelectorAll('a[data-nav]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(!href || href.startsWith('#')) return;
    e.preventDefault();
    smoothNavigate(href);
  });
});

const menu=document.querySelector('.menu');
const links=document.querySelector('.nav-links');
if(menu) menu.addEventListener('click',()=>links.classList.toggle('open'));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')})
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('[data-copy]').forEach(btn=>{
  btn.addEventListener('click',async()=>{
    const value=btn.dataset.copy;
    try{
      await navigator.clipboard.writeText(value);
      const old=btn.textContent; btn.textContent='Copied ✓';
      setTimeout(()=>btn.textContent=old,1500);
    }catch{}
  });
});
