// ------------- Neon Text Flicker Animation -------------
const style = document.createElement("style");
style.textContent = `
  @keyframes flick {
    0% { filter:none; }
    50% { filter:brightness(1.3); }
    100% { filter:none; }
  }
`;
document.head.appendChild(style);

// ------------- SFX CLICK -------------
const SFX_PATH = "assets/191576214-vhs-glitch-transition-01.wav";
let sfxEnabled = localStorage.getItem("sfxMuted") !== "true"; // default ON
let clickAudio;

function loadSfx() {
  clickAudio = new Audio(SFX_PATH);
  clickAudio.preload = "auto";
  clickAudio.volume = 0.35;  // adjust loudness
  clickAudio.playbackRate = 1;
}
loadSfx();

function playClick() {
  if (!sfxEnabled || !clickAudio) return;
  clickAudio.currentTime = 0; // restart for rapid clicks
  clickAudio.play().catch(()=>{ /* ignore autoplay block */ });
}

// Play sound on links & buttons
document.addEventListener("click", (e) => {
  const t = e.target.closest("a, button, .btn, .card-link");
  if (!t) return;
  if (e.button === 1 || e.metaKey || e.ctrlKey) return; // skip new tab clicks
  playClick();
});

// ------------- Toggle Button in Nav -------------
function addSfxToggle() {
  const navWrap = document.querySelector(".nav-wrap nav") || document.querySelector(".site-header .nav-wrap");
  if (!navWrap) return;

  const btn = document.createElement("button");
  btn.className = "sfx-toggle";
  btn.type = "button";
  btn.textContent = sfxEnabled ? "🔊 SFX" : "🔇 SFX";

  btn.addEventListener("click", () => {
    sfxEnabled = !sfxEnabled;
    localStorage.setItem("sfxMuted", !sfxEnabled);
    btn.textContent = sfxEnabled ? "🔊 SFX" : "🔇 SFX";
    if (sfxEnabled) playClick();
  });

  navWrap.appendChild(btn);
}
addSfxToggle();

