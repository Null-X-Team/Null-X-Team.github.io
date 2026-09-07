// Temporary force fix for blank / under-UI content
(function() {
  function forceShow() {
    try {
      const hero = document.getElementById('heroSection') || document.querySelector('section.hero');
      const title = document.getElementById('hero-title');
      const desc = document.getElementById('hero-desc');
      const grid = document.getElementById('gameGrid');
      const random = document.querySelector('.random-section');

      if (hero) {
        hero.style.display = 'flex';
        hero.style.visibility = 'visible';
        hero.style.opacity = '1';
        hero.style.zIndex = '10';
        hero.style.position = 'relative';
      }
      if (random) {
        random.style.display = 'block';
        random.style.visibility = 'visible';
        random.style.zIndex = '5';
      }
      if (grid) {
        // keep hidden on home, but make sure it is not covering
        grid.style.zIndex = '1';
      }

      // Force featured text if still Loading
      if (title && (title.textContent === 'Loading...' || !title.textContent.trim())) {
        if (typeof _0xData !== 'undefined' && _0xData && _0xData.length) {
          const g = _0xData[Math.floor(Math.random() * _0xData.length)];
          title.textContent = g.title || 'Featured Game';
          if (desc) desc.textContent = g.desc || '';
        } else {
          title.textContent = 'Featured Game';
          if (desc) desc.textContent = 'Click Play Now or open Games tab';
        }
      }

      // Make sure main content area is not buried
      const main = document.querySelector('main') || document.querySelector('.main-content') || document.querySelector('#content');
      if (main) {
        main.style.zIndex = '5';
        main.style.position = 'relative';
      }
    } catch (e) {
      console.warn('force-home-fix error', e);
    }
  }

  // Run immediately and on load / after short delays
  forceShow();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceShow);
  }
  setTimeout(forceShow, 300);
  setTimeout(forceShow, 1000);
  setTimeout(forceShow, 2500);
})();
