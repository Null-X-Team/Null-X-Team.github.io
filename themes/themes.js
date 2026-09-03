// Master Dynamic Theme Switcher Engine
// Keeps data-theme, theme-* body classes, and storage keys in sync.
// Also guards against debug.js leaking --nx-* vars onto :root.

function nxScopeDebugStyles() {
  const style = document.getElementById('nx-v102-styles');
  if (!style || !style.textContent) return;
  if (style.dataset.nxScoped === '1') return;
  // Debug menu used to inject :root{--nx-accent:...} which overwrote site theme colors.
  // Scope those variables to the debug UI only.
  style.textContent = style.textContent.replace(
    /:root\s*\{(--nx-[^}]+)\}/,
    '#nx-hud,#nx-trigger,#nx-inspector-overlay,#nx-toast-wrap,#nx-matrix-canvas,.nx-toast-wrap{$1}'
  );
  style.dataset.nxScoped = '1';
  // Clear any leaked inline/custom props on the document root
  const root = document.documentElement;
  ['--nx-bg','--nx-panel','--nx-border','--nx-accent','--nx-text','--nx-muted','--nx-danger','--nx-warning','--nx-success'].forEach(function (v) {
    root.style.removeProperty(v);
  });
}

window.applyTheme = function(themeName) {
  const name = themeName || 'default';

  nxScopeDebugStyles();

  // Remove previous theme-* classes
  const classesToRemove = Array.from(document.body.classList).filter(cls =>
    cls.startsWith('theme-')
  );
  classesToRemove.forEach(cls => document.body.classList.remove(cls));

  // Apply class for themes.css selectors that use body.theme-*
  if (name && name !== 'default') {
    document.body.classList.add('theme-' + name);
  }

  // Apply data-theme for themes.css selectors that use [data-theme="..."]
  document.documentElement.setAttribute('data-theme', name);
  document.body.setAttribute('data-theme', name);

  try {
    localStorage.setItem('selectedTheme', name);
    localStorage.setItem('nxos_theme', name);
  } catch (e) {}
};

// Restore theme on load
(function restoreTheme() {
  try {
    var saved = localStorage.getItem('nxos_theme') || localStorage.getItem('selectedTheme') || 'default';
    if (typeof window.applyTheme === 'function') window.applyTheme(saved);
  } catch (e) {}
})();

// Load full lockscreen hook (Alt+L / Ctrl+L -> Lockscreen/Lockscreen.html)
(function loadNxLockHook() {
  if (document.querySelector('script[data-nx-lock-hook]')) return;
  var s = document.createElement('script');
  s.src = (function () {
    try {
      return new URL('/JS/nx-lock-hook.js', window.location.origin).href;
    } catch (e) {
      return '/JS/nx-lock-hook.js';
    }
  })();
  s.setAttribute('data-nx-lock-hook', '1');
  (document.head || document.documentElement).appendChild(s);
})();

// Load background music player + settings mute/volume wiring
(function loadNxMusic() {
  if (document.querySelector('script[data-nx-music]')) return;
  var s = document.createElement('script');
  s.src = (function () {
    try { return new URL('/JS/music.js', window.location.origin).href; }
    catch (e) { return '/JS/music.js'; }
  })();
  s.setAttribute('data-nx-music', '1');
  (document.head || document.documentElement).appendChild(s);
})();

// Homescreen preference (classic vs Newhomepage) + redirect
(function loadNxHomescreenPref() {
  if (document.querySelector('script[data-nx-homescreen]')) return;
  var s = document.createElement('script');
  s.src = (function () {
    try { return new URL('/Settings/homescreen-pref.js', window.location.origin).href; }
    catch (e) { return '/Settings/homescreen-pref.js'; }
  })();
  s.setAttribute('data-nx-homescreen', '1');
  (document.head || document.documentElement).appendChild(s);
})();

// UX pack: recently played, search ranking, lazy images, toast, mobile CSS
(function loadNxUx() {
  if (document.querySelector('link[data-nx-ux-css]')) return;
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = (function () {
    try { return new URL('/CSS/nx-ux.css', window.location.origin).href; }
    catch (e) { return '/CSS/nx-ux.css'; }
  })();
  css.setAttribute('data-nx-ux-css', '1');
  (document.head || document.documentElement).appendChild(css);

  if (document.querySelector('script[data-nx-ux]')) return;
  var s = document.createElement('script');
  s.src = (function () {
    try { return new URL('/JS/nx-ux.js', window.location.origin).href; }
    catch (e) { return '/JS/nx-ux.js'; }
  })();
  s.setAttribute('data-nx-ux', '1');
  (document.head || document.documentElement).appendChild(s);
})();
