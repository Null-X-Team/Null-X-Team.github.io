/**
 * New homepage boot: themes, custom background image, settings sync
 */
(function () {
  const THEME_KEY = 'nxos_theme';
  const THEME_BG_KEY = 'nxos_theme_bg';
  const THEME_ACCENT_KEY = 'nxos_theme_accent';
  const BG_IMAGE_KEY = 'nxos_bg_image';
  const INTERACTIVE_BG_KEY = 'nxos_interactive_bg';
  const ANIM_KEY = 'nxos_ui_anim';

  const THEME_DEFAULTS = {
    crimson:   { bg: '#0d0606', accent: '#ff3b3b' },
    purple:    { bg: '#0b0813', accent: '#8b00ff' },
    cyan:      { bg: '#041018', accent: '#00f2ff' },
    emerald:   { bg: '#04140c', accent: '#00ff88' },
    midnight:  { bg: '#000000', accent: '#888888' },
    ocean:     { bg: '#051425', accent: '#0088ff' },
    amber:     { bg: '#1a1005', accent: '#ffb020' },
    rose:      { bg: '#1a0a12', accent: '#ff5ca8' },
    vampire:   { bg: '#0d0202', accent: '#ff0000' },
    forest:    { bg: '#030c05', accent: '#00cc44' },
    cyberpunk: { bg: '#1c0024', accent: '#fcee0a' },
    toxic:     { bg: '#0f1402', accent: '#a3ff00' },
    solar:     { bg: '#140700', accent: '#ff5500' },
    ice:       { bg: '#0f191c', accent: '#00f3ff' },
    arcade:    { bg: '#120421', accent: '#ff007f' },
    royal:     { bg: '#0f0314', accent: '#ffd700' },
    ghost:     { bg: '#11161a', accent: '#708090' },
    copper:    { bg: '#140d0a', accent: '#b87333' },
    moonlight: { bg: '#080a0f', accent: '#7b92b5' },
    neon:      { bg: '#020005', accent: '#00ffef' }
  };

  function applyTheme() {
    const theme = localStorage.getItem(THEME_KEY) || 'crimson';
    let bg = localStorage.getItem(THEME_BG_KEY);
    let accent = localStorage.getItem(THEME_ACCENT_KEY);
    const def = THEME_DEFAULTS[theme];
    if (!bg && def) bg = def.bg;
    if (!accent && def) accent = def.accent;

    document.documentElement.setAttribute('data-theme', theme);
    if (document.body) document.body.setAttribute('data-theme', theme);

    if (bg) {
      document.documentElement.style.setProperty('--nx-page-bg', bg);
      if (document.body) {
        document.body.style.setProperty('--nx-page-bg', bg);
        document.body.style.backgroundColor = bg;
      }
    }
    if (accent) {
      document.documentElement.style.setProperty('--nx-accent', accent);
      if (document.body) document.body.style.setProperty('--nx-accent', accent);
    }
  }

  function applyBackgroundImage() {
    if (!document.body) return;
    let layer = document.getElementById('nx-custom-bg');
    const dataUrl = localStorage.getItem(BG_IMAGE_KEY);

    if (!dataUrl) {
      if (layer) layer.remove();
      document.body.classList.remove('has-custom-bg');
      return;
    }

    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'nx-custom-bg';
      layer.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(layer, document.body.firstChild);
    }

    layer.style.backgroundImage = 'url(' + dataUrl + ')';
    document.body.classList.add('has-custom-bg');
  }

  function meshShouldRun() {
    const interactive = localStorage.getItem(INTERACTIVE_BG_KEY);
    const interactiveOn = interactive === null ? true : interactive === 'true';
    const anim = localStorage.getItem(ANIM_KEY);
    const animOn = anim === null ? true : anim === 'true';
    return interactiveOn && animOn;
  }

  function applyInteractiveFlag() {
    if (!document.body) return;
    const enabled = meshShouldRun();
    document.body.classList.toggle('no-interactive-bg', !enabled);
    document.body.classList.toggle('no-ui-anim', localStorage.getItem(ANIM_KEY) === 'false');
    const canvas = document.getElementById('animated-background-canvas');
    if (canvas) canvas.style.display = enabled ? '' : 'none';
  }

  function boot() {
    applyTheme();
    applyBackgroundImage();
    applyInteractiveFlag();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.NxHomeTheme = { applyTheme, applyBackgroundImage, applyInteractiveFlag, meshShouldRun };
})();

document.addEventListener("DOMContentLoaded", () => {
  const navTabs = document.querySelectorAll(".nav-tab-item");
  const contentSections = document.querySelectorAll(".content-section");
  navTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      navTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const targetTab = tab.getAttribute("data-tab");
      contentSections.forEach(section => section.classList.remove("active"));
      const targetSection = document.getElementById(targetTab + "-section");
      if (targetSection) targetSection.classList.add("active");
    });
  });
});
