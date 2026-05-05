/* ═══════════════════════════════════════════
   MINEMARKER — MAIN JS
   ═══════════════════════════════════════════ */
import './style.css';

// ─── CURSOR GLOW ───
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ─── NAV SCROLL ───
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── REVEAL ON SCROLL ───
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ─── TERMINAL ANIMATION ───
const terminalBody = document.getElementById('terminal-body');
let terminalAnimated = false;

const terminalObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !terminalAnimated) {
        terminalAnimated = true;
        const lines = terminalBody.querySelectorAll('.terminal-line');
        lines.forEach((line) => {
          const delay = parseInt(line.dataset.delay || '0', 10);
          setTimeout(() => line.classList.add('visible'), delay);
        });
      }
    });
  },
  { threshold: 0.3 }
);
if (terminalBody) terminalObserver.observe(terminalBody);

// ─── TILT EFFECT ON CARDS ───
document.querySelectorAll('[data-tilt]').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── SMOOTH SCROLL FOR NAV LINKS ───
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── PARALLAX HERO BG ───
const heroBgImg = document.querySelector('.hero-bg-img');
if (heroBgImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBgImg.style.transform = `scale(${1.1 + scrolled * 0.0003}) translateY(${scrolled * 0.3}px)`;
    }
  });
}

// ─── FADE SCROLL INDICATOR ON SCROLL ───
const scrollInd = document.getElementById('scroll-indicator');
if (scrollInd) {
  window.addEventListener('scroll', () => {
    scrollInd.style.opacity = Math.max(0, 1 - window.scrollY / 300);
  });
}

console.log('%c⛏ PixelCut Pro', 'color: #e8ff47; font-size: 20px; font-weight: bold;');
console.log('%cStop scrubbing. Start editing.', 'color: #5c5a55; font-size: 12px;');
