(() => {
  const track = document.querySelector('[data-testimonial-track]');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.testimonial-card'));
  const section = document.querySelector('[data-carousel-section]') || track;
  const previous = document.querySelector('[data-carousel-previous]');
  const next = document.querySelector('[data-carousel-next]');
  const autoplayToggle = document.querySelector('[data-carousel-autoplay-toggle]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let isVisible = false;
  let isHovered = false;
  let hasFocus = false;
  let userPaused = false;
  let timer = null;

  const renderAutoplayToggle = () => {
    if (!autoplayToggle) return;

    const motionReduced = reducedMotion.matches;
    const paused = userPaused || motionReduced;
    autoplayToggle.disabled = motionReduced;
    autoplayToggle.setAttribute('aria-pressed', String(paused));

    if (motionReduced) {
      autoplayToggle.setAttribute('aria-label', 'Reproducción automática desactivada por preferencia de movimiento reducido');
    } else if (userPaused) {
      autoplayToggle.setAttribute('aria-label', 'Reanudar reproducción automática');
    } else {
      autoplayToggle.setAttribute('aria-label', 'Pausar reproducción automática');
    }
  };

  const render = () => {
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === cards.length - 1;
    renderAutoplayToggle();
  };

  const pauseAutoplay = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };

  const refreshAutoplay = () => {
    renderAutoplayToggle();
    const canPlay = isVisible && !isHovered && !hasFocus
      && !userPaused && document.visibilityState !== 'hidden' && !reducedMotion.matches && cards.length > 1;

    if (!canPlay) {
      pauseAutoplay();
    } else if (timer === null) {
      timer = setInterval(() => {
        goTo((activeIndex + 1) % cards.length);
      }, 6000);
    }
  };

  const goTo = (index, immediate = false) => {
    activeIndex = Math.max(0, Math.min(cards.length - 1, index));
    const card = cards[activeIndex];
    const cardLeft = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    const left = Math.max(0, cardLeft - (track.clientWidth - card.clientWidth) / 2);
    track.scrollTo({ left, behavior: immediate || reducedMotion.matches ? 'auto' : 'smooth' });
    render();

    refreshAutoplay();
  };

  previous.addEventListener('click', () => goTo(activeIndex - 1));
  next.addEventListener('click', () => goTo(activeIndex + 1));
  autoplayToggle?.addEventListener('click', () => {
    if (reducedMotion.matches) return;
    userPaused = !userPaused;
    if (!userPaused) {
      isHovered = false;
      hasFocus = false;
    }
    refreshAutoplay();
  });

  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  });

  track.addEventListener('scroll', () => {
    const center = track.getBoundingClientRect().left + track.clientWidth / 2;
    activeIndex = cards.reduce((closest, card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      const closestRect = cards[closest].getBoundingClientRect();
      const closestDistance = Math.abs(closestRect.left + closestRect.width / 2 - center);
      return distance < closestDistance ? index : closest;
    }, 0);
    render();
    refreshAutoplay();
  }, { passive: true });

  section.addEventListener('mouseenter', () => { isHovered = true; refreshAutoplay(); });
  section.addEventListener('mouseleave', () => { isHovered = false; refreshAutoplay(); });
  section.addEventListener('focusin', () => { hasFocus = true; refreshAutoplay(); });
  section.addEventListener('focusout', (event) => {
    if (event.relatedTarget && section.contains?.(event.relatedTarget)) return;
    hasFocus = false;
    refreshAutoplay();
  });

  document.addEventListener('visibilitychange', refreshAutoplay);

  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', refreshAutoplay);
  }

  if ('IntersectionObserver' in window) {
    const observer = new window.IntersectionObserver((entries) => {
      isVisible = entries.some((entry) => entry.isIntersecting);
      refreshAutoplay();
    });
    observer.observe(section);
  }

  render();
})();
