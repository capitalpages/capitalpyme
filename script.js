/* ============================================
   CAPITAL PYME — Shared JS
   ============================================ */

// Sticky nav blur
const nav = document.querySelector('nav.top');
if (nav) {
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Reveal on scroll (IntersectionObserver)
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));

// Card spotlight effect (sigue al mouse)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});

// Form handler (default si existe)
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = document.getElementById('formSuccess');
    const btn = leadForm.querySelector('button[type=submit]');
    if (ok) ok.classList.add('show');
    if (btn) { btn.textContent = 'Mensaje enviado ✓'; btn.disabled = true; }
    // TODO: conectar con Formspree / Netlify / backend real
  });
}

// Año dinámico
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
