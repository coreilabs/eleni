const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); menuButton.setAttribute('aria-label', 'Abrir menu'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
// Convenção de compatibilidade solicitada: remove somente o nono dígito móvel após o DDD.
function whatsappBrazil(nationalNumber) { const digits = nationalNumber.replace(/\D/g, ''); if (/^\d{2}9\d{8}$/.test(digits)) return `https://wa.me/55${digits.slice(0, 2)}${digits.slice(3)}`; if (/^\d{10}$/.test(digits)) return `https://wa.me/55${digits}`; return null; }
const whatsapp = whatsappBrazil('62994033634');
if (whatsapp) document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsapp; });
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } }); }, { threshold: 0.08 }); document.querySelectorAll('.about-content, .care-row, .process-intro, .steps li, .faq>div, .contact h2').forEach(element => { element.classList.add('reveal-ready'); observer.observe(element); }); }
// Gentle depth on devices with a precise pointer; no motion on touch or reduced-motion settings.
const bloomScene = document.querySelector('.bloom-scene');
const bloomHero = document.querySelector('.hero-bloom');
const bloomMotion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
if (bloomScene && bloomHero) {
  bloomHero.addEventListener('pointermove', event => {
    if (!bloomMotion.matches) return;
    const bounds = bloomHero.getBoundingClientRect();
    bloomScene.style.setProperty('--scene-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 12}px`);
    bloomScene.style.setProperty('--scene-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 8}px`);
  });
  const resetBloom = () => { bloomScene.style.setProperty('--scene-x', '0px'); bloomScene.style.setProperty('--scene-y', '0px'); };
  bloomHero.addEventListener('pointerleave', resetBloom);
  bloomMotion.addEventListener('change', resetBloom);
}
