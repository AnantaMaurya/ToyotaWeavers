/* ════════════════════════════════════════════════
   TOYOTA WEAVERS — INDEX-SPECIFIC SCRIPTS
   ════════════════════════════════════════════════ */

/* ── Hero load & parallax ───────────────────── */
(function () {
  const hero = document.getElementById('hero');
  if (hero) hero.classList.add('loaded');

  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  function updateHeroParallax() {
    const scrolled = window.scrollY;
    const rate = Math.max(0, scrolled / 3);
    heroBg.style.transform = `scale(1.05) translateY(${rate}px)`;
  }
  window.addEventListener('scroll', updateHeroParallax);
  updateHeroParallax();
})();

/* ── Collection card slider ─────────────────── */
(function () {
  const track = document.getElementById('cardsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!track || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.querySelectorAll('.card'));
  if (cards.length < 2) return;

  let currentIndex = 0;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w < 768) return 1;
    if (w < 1024) return 2;
    return 3;
  }

  function getScrollStep() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 24; // matches CSS gap
    return cardWidth + gap;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  function updateButtons() {
    const maxIndex = getMaxIndex();
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  function slideTo(index) {
    const maxIndex = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const step = getScrollStep();
    track.style.transform = `translateX(-${currentIndex * step}px)`;
    updateButtons();
  }

  prevBtn.addEventListener('click', () => slideTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => slideTo(currentIndex + 1));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => slideTo(currentIndex), 150);
  });

  updateButtons();
})();
