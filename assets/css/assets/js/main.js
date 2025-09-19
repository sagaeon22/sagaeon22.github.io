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
// ---------- SFX CLICK ----------
const SFX_PATH = "assets/sfx/click.mp3";
let sfxEnabled = localStorage.getItem("sfxMuted") !== "true"; // default ON
let clickAudio;

function loadSfx() {
  clickAudio = new Audio(SFX_PATH);
  clickAudio.preload = "auto";
  clickAudio.volume = 0.35;     // <- adjust loudness
  clickAudio.playbackRate = 1;  // <- 1.1 = snappier
}
loadSfx();

function playClick() {
  if (!sfxEnabled || !clickAudio) return;
  // restart from start for rapid clicks
  clickAudio.currentTime = 0;
  clickAudio.play().catch(()=>{ /* ignore autoplay block */ });
}

// Play on links & buttons
document.addEventListener("click", (e) => {
  const t = e.target.closest("a, button, .btn, .card-link");
  if (!t) return;
  // Don't play for middle/ctrl clicks that open new tabs
  if (e.button === 1 || e.metaKey || e.ctrlKey) return;
  playClick();
});

// ---------- MUTE TOGGLE UI (in nav) ----------
function addSfxToggle() {
  const navWrap = document.querySelector(".nav-wrap nav") || document.querySelector(".site-header .nav-wrap");
  if (!navWrap) return;

  const btn = document.createElement("button");
  btn.className = "sfx-toggle";
  btn.type = "button";
  updateToggleText(btn);

  btn.addEventListener("click", () => {
    sfxEnabled = !sfxEnabled;
    localStorage.setItem("sfxMuted", (!sfxEnabled).toString());
    updateToggleText(btn);
    // tiny feedback
    if (sfxEnabled) playClick();
  });

  navWrap.appendChild(btn);
}

function updateToggleText(btn){
  btn.setAttribute("aria-pressed", sfxEnabled ? "false" : "true");
  btn.title = sfxEnabled ? "Sound: on (click to mute)" : "Sound: off (click to unmute)";
  btn.textContent = sfxEnabled ? "🔊 SFX" : "🔇 SFX";
}

addSfxToggle();

// Respect reduced motion/sound-ish preference: if reduced motion, start muted
try {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced && localStorage.getItem("sfxMuted") === null) {
    sfxEnabled = false;
    localStorage.setItem("sfxMuted", "true");
  }
} catch {}

