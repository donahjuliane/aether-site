// Tiny interactivity: card hover spotlight + reveal-on-scroll.
// No framework. Lazy-init guarded so it can't blow up on older browsers.

(() => {
  // ---- card spotlight follow ----
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--mx', mx + '%');
      card.style.setProperty('--my', my + '%');
    });
  });

  // ---- reveal-on-scroll ----
  // Fades elements in once they enter viewport. IO with rootMargin so
  // they're already visible by the time you're looking at them.
  if (!('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.card, .feat-col, .faq details, .beta__notice, .beta__copy'
  );

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        // small stagger inside each section
        const sib = Array.from(en.target.parentElement.children)
          .indexOf(en.target);
        en.target.style.transitionDelay = (sib * 60) + 'ms';
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  targets.forEach(t => io.observe(t));

  // ---- "AETHER" wordmark click easter — count clicks, console msg ----
  // (harmless, just for fun if anyone pokes around)
  const wm = document.querySelector('.hero__wordmark');
  let n = 0;
  if (wm) wm.addEventListener('click', () => {
    n++;
    if (n === 5) {
      console.log('%c⌬  read the source — there is none on github yet',
        'color:#9673e6; font:600 14px/1.4 monospace');
    }
  });
})();
