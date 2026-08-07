(function () {
  var THEME_KEY = 'nxos_theme';
  var THEME_BG_KEY = 'nxos_theme_bg';
  var THEME_ACCENT_KEY = 'nxos_theme_accent';
  var BG_IMAGE_KEY = 'nxos_bg_image';
  var INTERACTIVE_BG_KEY = 'nxos_interactive_bg';
  var ANIM_KEY = 'nxos_ui_anim';

  var DEFS = {
    crimson: ['#0d0606', '#ff3b3b'], purple: ['#0b0813', '#8b00ff'], cyan: ['#041018', '#00f2ff'],
    emerald: ['#04140c', '#00ff88'], midnight: ['#000000', '#888888'], ocean: ['#051425', '#0088ff'],
    amber: ['#1a1005', '#ffb020'], rose: ['#1a0a12', '#ff5ca8'], vampire: ['#0d0202', '#ff0000'],
    forest: ['#030c05', '#00cc44'], cyberpunk: ['#1c0024', '#fcee0a'], toxic: ['#0f1402', '#a3ff00'],
    solar: ['#140700', '#ff5500'], ice: ['#0f191c', '#00f3ff'], arcade: ['#120421', '#ff007f'],
    royal: ['#0f0314', '#ffd700'], ghost: ['#11161a', '#708090'], copper: ['#140d0a', '#b87333'],
    moonlight: ['#080a0f', '#7b92b5'], neon: ['#020005', '#00ffef']
  };

  // Inject theme CSS if missing
  if (!document.querySelector('link[href*="theme-overrides"]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = (document.currentScript && document.currentScript.src
      ? document.currentScript.src.replace(/[^/]+$/, 'theme-overrides.css')
      : 'theme-overrides.css');
    document.head.appendChild(link);
  }

  function apply() {
    var theme = localStorage.getItem(THEME_KEY) || 'crimson';
    var bg = localStorage.getItem(THEME_BG_KEY);
    var accent = localStorage.getItem(THEME_ACCENT_KEY);
    if (DEFS[theme]) {
      if (!bg) bg = DEFS[theme][0];
      if (!accent) accent = DEFS[theme][1];
    }
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

    // custom bg image
    var dataUrl = localStorage.getItem(BG_IMAGE_KEY);
    if (dataUrl && document.body) {
      var layer = document.getElementById('nx-custom-bg');
      if (!layer) {
        layer = document.createElement('div');
        layer.id = 'nx-custom-bg';
        layer.setAttribute('aria-hidden', 'true');
        document.body.insertBefore(layer, document.body.firstChild);
      }
      layer.style.backgroundImage = 'url(' + dataUrl + ')';
      document.body.classList.add('has-custom-bg');
    }

    // mesh / anim flags
    var interactive = localStorage.getItem(INTERACTIVE_BG_KEY);
    var interactiveOn = interactive === null ? true : interactive === 'true';
    var anim = localStorage.getItem(ANIM_KEY);
    var animOn = anim === null ? true : anim === 'true';
    var meshOn = interactiveOn && animOn;
    if (document.body) {
      document.body.classList.toggle('no-interactive-bg', !meshOn);
      document.body.classList.toggle('no-ui-anim', !animOn);
    }
    var canvas = document.getElementById('animated-background-canvas');
    if (canvas && !meshOn) canvas.style.display = 'none';

    window.NxHomeTheme = window.NxHomeTheme || {};
    window.NxHomeTheme.meshShouldRun = function () { return meshOn; };
  }

  // early as possible
  try { apply(); } catch (e) {}
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  }
})();
