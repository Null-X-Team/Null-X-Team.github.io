// Master Dynamic Theme Switcher Engine
window.applyTheme = function(themeName) {
  const classesToRemove = Array.from(document.body.classList).filter(cls =>
    cls.startsWith('theme-')
  );
  classesToRemove.forEach(cls => document.body.classList.remove(cls));
  if (themeName && themeName !== 'default') {
    document.body.classList.add(`theme-${themeName}`);
  }
  localStorage.setItem('nullx-theme', themeName);
};

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('nullx-theme') || 'default';
  window.applyTheme(savedTheme);

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.theme-card');
    if (card) {
      const selectedTheme = card.getAttribute('data-theme');
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
