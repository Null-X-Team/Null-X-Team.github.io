// Aggressive fix: remove educational-cloak and force main UI visible
(function () {
  function killCloakAndShowUI() {
    try {
      // 1. Destroy the educational cloak that has max z-index
      var cloak = document.getElementById('educational-cloak');
      if (cloak) {
        cloak.style.cssText = 'display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;z-index:-1!important;';
        cloak.classList.add('hidden');
        try { cloak.remove(); } catch (e) {}
      }

      // 2. Force hero / featured section visible
      var hero = document.getElementById('heroSection') || document.querySelector('section.hero');
      if (hero) {
        hero.style.display = 'flex';
        hero.style.visibility = 'visible';
        hero.style.opacity = '1';
        hero.style.zIndex = '10';
        hero.style.position = 'relative';
      }

      // 3. Force random section
      var random = document.querySelector('.random-section');
      if (random) {
        random.style.display = 'block';
        random.style.visibility = 'visible';
        random.style.zIndex = '5';
      }

      // 4. Make sure main content is not buried
      var main = document.querySelector('main.main-content') || document.querySelector('.main-content') || document.querySelector('main');
      if (main) {
        main.style.zIndex = '5';
        main.style.position = 'relative';
        main.style.visibility = 'visible';
        main.style.opacity = '1';
      }

      // 5. Force featured title if still stuck on Loading
      var title = document.getElementById('hero-title');
      var desc = document.getElementById('hero-desc');
      if (title && (title.textContent === 'Loading...' || !title.textContent.trim())) {
        if (typeof _0xData !== 'undefined' && _0xData && _0xData.length) {
          var g = _0xData[Math.floor(Math.random() * _0xData.length)];
          title.textContent = g.title || 'Featured Game';
          if (desc) desc.textContent = g.desc || '';
        } else {
          title.textContent = 'Featured Game';
          if (desc) desc.textContent = 'Open the Games tab to play';
        }
      }

      // 6. Hide any other full-screen overlays that might be stuck
      document.querySelectorAll('.modal-overlay, #warning-modal-overlay, .driver-overlay').forEach(function (el) {
        if (el && !el.classList.contains('hidden')) {
          // only hide if they look stuck (no interactivity)
        }
      });
    } catch (err) {
      console.warn('force-home-fix:', err);
    }
  }

  // Run as early and as often as needed
  killCloakAndShowUI();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', killCloakAndShowUI);
  }
  window.addEventListener('load', killCloakAndShowUI);
  setTimeout(killCloakAndShowUI, 200);
  setTimeout(killCloakAndShowUI, 800);
  setTimeout(killCloakAndShowUI, 2000);
  setTimeout(killCloakAndShowUI, 5000);
})();
