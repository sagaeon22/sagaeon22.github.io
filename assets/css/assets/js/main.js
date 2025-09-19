// Auto-update footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Neon flicker on hover (buttons + nav)
document.querySelectorAll('.btn-neon, .nav-link').forEach(el => {
  el.addEventListener('mouseenter', () => el.classList.add('flick'));
  el.addEventListener('animationend', () => el.classList.remove('flick'));
});

// Inject a tiny flicker animation
const style = document.createElement('style');
style.textContent = `
  .flick { animation: flick 250ms steps(2,end) 1; }
  @keyframes flick {
    0% { filter:none; } 50% { filter:brightness(1.3); } 100% { filter:none; }
  }
`;
document.head.appendChild(style);

