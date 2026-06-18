// Stil 02 — reveal, sayaç animasyonu, hero parallax
(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== Mobil menü (hamburger) =====
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primaryNav');
  if(navToggle && nav && primaryNav){
    const setMenu = (open) => {
      nav.classList.toggle('menu-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('menu-open')));
    primaryNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false); });
  }

  // ===== Marquee — her ekranda kesintisiz döngü =====
  const marquee = document.querySelector('.marquee');
  const mTrack = marquee && marquee.querySelector('.marquee-track');
  if(mTrack){
    const group = mTrack.querySelector('.marquee-group');
    const baseItems = Array.from(group.children).map(n => n.cloneNode(true));
    const buildMarquee = () => {
      // tek grubu ekran genişliğini aşana kadar doldur
      const needW = Math.max(marquee.offsetWidth, window.innerWidth) * 1.2;
      let guard = 0;
      while(group.scrollWidth < needW && guard < 40){
        baseItems.forEach(n => group.appendChild(n.cloneNode(true)));
        guard++;
      }
      // ikinci (birebir) kopya — %50 kaydırınca dikişsiz birleşir
      mTrack.querySelectorAll('.marquee-group').forEach((g, i) => { if(i > 0) g.remove(); });
      const clone = group.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      mTrack.appendChild(clone);
      // sabit hız: ~80px/sn
      if(!reduceMotion){
        mTrack.style.animationDuration = (group.scrollWidth / 80) + 's';
      }
    };
    buildMarquee();
    let rT;
    window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(buildMarquee, 250); }, { passive:true });
  }

  const reveals = document.querySelectorAll('.intro, .reel-card, .rail-card, .service-card, .about-img, .about-text, .cta');
  reveals.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(el => io.observe(el));

  // Hero parallax — slow downward motion on bg image
  const heroImg = document.querySelector('.hero-bg img');
  if(heroImg && !reduceMotion){
    let ticking = false;
    window.addEventListener('scroll', () => {
      if(!ticking){
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if(y < window.innerHeight * 1.2){
            heroImg.style.transform = `translateY(${y * 0.35}px) scale(1.08)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive:true });
  }

  // Stat counter animation
  const stats = document.querySelectorAll('.stat .num');
  const animateNum = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target);
      if(t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){ animateNum(e.target); statIO.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => statIO.observe(s));

  // Reel play button (placeholder — wire up to real video later)
  document.querySelectorAll('.big-play, .reel-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // future: open lightbox with embedded vimeo/youtube
      if(btn.classList.contains('big-play')){
        e.preventDefault();
        alert('Showreel buraya yüklenecek. (YouTube/Vimeo embed önerilir.)');
      }
    });
  });

  // ===== Fiyat Al modal =====
  const overlay = document.getElementById('quoteOverlay');
  const openModal = () => { if(overlay){ overlay.hidden = false; document.body.style.overflow = 'hidden'; } };
  const closeModal = () => { if(overlay){ overlay.hidden = true; document.body.style.overflow = ''; } };
  document.querySelectorAll('[data-open-quote]').forEach(b => b.addEventListener('click', openModal));
  document.querySelectorAll('[data-close-quote]').forEach(b => b.addEventListener('click', closeModal));
  if(overlay){
    overlay.addEventListener('click', e => { if(e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape' && !overlay.hidden) closeModal(); });
  }

  // Form gönderimi — FormSubmit ile mail at (info@ulucreativemedia.com)
  const quoteForm = document.getElementById('quoteForm');
  const quoteStatus = document.getElementById('quoteStatus');
  if(quoteForm){
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('.quote-submit');
      submitBtn.disabled = true;
      quoteStatus.className = 'quote-status';
      quoteStatus.textContent = 'Gönderiliyor…';
      try {
        const res = await fetch('https://formsubmit.co/ajax/emreatak_164_@hotmail.com', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(quoteForm)
        });
        if(!res.ok) throw new Error('fail');
        quoteForm.reset();
        quoteStatus.textContent = 'Teşekkürler! Talebiniz alındı, en kısa sürede dönüş yapacağız.';
        quoteStatus.classList.add('ok');
      } catch(err){
        quoteStatus.textContent = 'Bir sorun oluştu. Lütfen tekrar deneyin ya da info@ulucreativemedia.com adresine yazın.';
        quoteStatus.classList.add('err');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
})();
