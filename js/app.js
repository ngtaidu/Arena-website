// ===== Mobile menu toggle =====
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', ()=>{
  const open = nav.classList.toggle('nav--open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

// ===== Submenu (mobile: tap to open) =====
const itemsWithSub = document.querySelectorAll('.menu .has-sub > a');
itemsWithSub.forEach(a => {
  a.addEventListener('click', (e)=>{
    // Only intercept on mobile (when toggle button is visible)
    const isMobile = getComputedStyle(menuBtn).display !== 'none';
    if(!isMobile) return; // desktop uses hover via CSS
    e.preventDefault();
    const li = a.parentElement;
    const expanded = li.classList.toggle('open');
    a.setAttribute('aria-expanded', String(expanded));
  });
});

// ===== Simple slider autoplay + dots =====
const slides = document.getElementById('slides');
const dotsWrap = document.getElementById('dots');
if (slides && dotsWrap){
  const total = slides.children.length;
  let idx = 0;
  function renderDots(){
    dotsWrap.innerHTML = '';
    for(let i=0;i<total;i++){
      const d = document.createElement('button');
      d.className = 'dot';
      d.setAttribute('aria-label', 'Chuyển đến slide ' + (i+1));
      d.addEventListener('click', ()=>go(i));
      dotsWrap.appendChild(d);
    }
  }
  function go(i){
    idx = (i+total)%total;
    slides.style.transform = `translateX(${-idx*100}%)`;
    [...dotsWrap.children].forEach((el, k)=> el.setAttribute('aria-current', String(k===idx)) );
  }
  renderDots();
  go(0);
  let timer = setInterval(()=>go(idx+1), 4000);
  slides.addEventListener('pointerdown', ()=>{clearInterval(timer)}); // pause on drag/tap
}
