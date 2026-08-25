// Master Dynamic Theme Switcher Engine
// Keeps data-theme, theme-* body classes, and storage keys in sync.
window.applyTheme = function(themeName) {
  const name = themeName || 'default';

  // Remove previous theme-* classes
  const classesToRemove = Array.from(document.body.classList).filter(cls =>
    cls.startsWith('theme-')
  );
  classesToRemove.forEach(cls => document.body.classList.remove(cls));

  // Apply class for themes.css selectors that use body.theme-*
  if (name && name !== 'default') {
    document.body.classList.add(`theme-${name}`);
  }

  // Apply data-theme for themes.css selectors that use [data-theme="..."]
  document.documentElement.setAttribute('data-theme', name);
  document.body.setAttribute('data-theme', name);

  // Keep all historical storage keys in sync so settings/debug/newsettings agree
  localStorage.setItem('nullx-theme', name);
  localStorage.setItem('selectedTheme', name);
  localStorage.setItem('nxos_theme', name);
};

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme =
    localStorage.getItem('selectedTheme') ||
    localStorage.getItem('nullx-theme') ||
    localStorage.getItem('nxos_theme') ||
    'default';

  window.applyTheme(savedTheme);

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.theme-card, .theme-option');
    if (card) {
      const selectedTheme = card.getAttribute('data-theme') || card.dataset.theme;
      if (selectedTheme) window.applyTheme(selectedTheme);
    }
  });

  // Replace Terminal sidebar entry with Calculator (no Terminal pages)
  const navTerm = document.getElementById('nav-terminal');
  if (navTerm) {
    navTerm.id = 'nav-calculator';
    navTerm.innerHTML = '<i class="fas fa-calculator" style="margin-right: 8px;"></i>Calculator';
    navTerm.onclick = function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (typeof clearAllViews === 'function') clearAllViews();
      if (typeof updateNavActiveState === 'function') updateNavActiveState('nav-calculator');
      else {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        navTerm.classList.add('active');
      }
      let sec = document.getElementById('calculatorSection') || document.getElementById('terminalSection');
      if (sec) {
        sec.id = 'calculatorSection';
        sec.style.setProperty('display', 'block', 'important');
        sec.innerHTML =
          '<h2 style="margin-top:0;color:#fff;font-family:sans-serif;">Calculator</h2>' +
          '<iframe src="calculator/index.html" title="Calculator" ' +
          'style="width:100%;height:calc(100vh - 160px);min-height:520px;border:1px solid rgba(139,0,255,0.35);' +
          'border-radius:8px;background:#000;"></iframe>';
      }
    };
  }
});


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
