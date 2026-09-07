// Force fix: content was pushed far below the fold
(function () {
  // 1. Inject critical CSS so it works even if the CSS file is not linked
  if (!document.getElementById('force-home-css')) {
    var s = document.createElement('style');
    s.id = 'force-home-css';
    s.textContent = `
      #educational-cloak { display:none!important; height:0!important; width:0!important; overflow:hidden!important; position:absolute!important; left:-9999px!important; }
      #heroSection, section.hero { display:flex!important; visibility:visible!important; opacity:1!important; position:relative!important; z-index:10!important; margin:20px!important; min-height:180px!important; }
      .random-section { display:block!important; visibility:visible!important; opacity:1!important; }
      .main-content { position:relative!important; z-index:5!important; visibility:visible!important; opacity:1!important; }
      .dashboard { position:relative!important; z-index:1!important; }
      .right-sidebar { position:sticky!important; top:0!important; z-index:50!important; align-self:start!important; }
      #calculatorSection[style*="display: none"],
      #unblockersSection[style*="display: none"],
      #profileSection[style*="display: none"] { height:0!important; min-height:0!important; overflow:hidden!important; margin:0!important; padding:0!important; }
    `;
    document.head.appendChild(s);
  }

  function forceShowHome() {
    try {
      // Kill cloak
      var cloak = document.getElementById('educational-cloak');
      if (cloak) {
        cloak.style.cssText = 'display:none!important;height:0!important;width:0!important;overflow:hidden!important;';
        try { cloak.remove(); } catch(e){}
      }

      // Force hero visible
      var hero = document.getElementById('heroSection') || document.querySelector('section.hero');
      if (hero) {
        hero.style.setProperty('display', 'flex', 'important');
        hero.style.visibility = 'visible';
        hero.style.opacity = '1';
        hero.style.position = 'relative';
        hero.style.zIndex = '10';
      }

      // Force random button section
      var random = document.querySelector('.random-section');
      if (random) {
        random.style.setProperty('display', 'block', 'important');
        random.style.visibility = 'visible';
      }

      // Hide other tall sections so they don't create scroll height
      ['gameGrid','favoritesGrid','unblockersSection','profileSection','calculatorSection','terminalSection','assistantSection'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el && (id === 'gameGrid' || el.style.display === 'none' || getComputedStyle(el).display === 'none')) {
          // keep gameGrid logic to JS, just collapse if hidden
          if (id !== 'gameGrid' || el.style.display === 'none') {
            el.style.height = '0';
            el.style.minHeight = '0';
            el.style.overflow = 'hidden';
            el.style.margin = '0';
            el.style.padding = '0';
          }
        }
      });

      // Call the real showHomeView if it exists
      if (typeof showHomeView === 'function') {
        showHomeView();
      } else if (typeof initFeaturedModule === 'function') {
        initFeaturedModule();
      }

      // Force featured text if still Loading
      var title = document.getElementById('hero-title');
      var desc = document.getElementById('hero-desc');
      if (title && (title.textContent === 'Loading...' || !title.textContent.trim())) {
        if (typeof _0xData !== 'undefined' && _0xData && _0xData.length) {
          var g = _0xData[Math.floor(Math.random() * _0xData.length)];
          title.textContent = g.title || 'Featured Game';
          if (desc) desc.textContent = g.desc || '';
        } else {
          title.textContent = 'Featured Game';
          if (desc) desc.textContent = 'Open the Games tab';
        }
      }

      // Scroll to top so user sees the content
      window.scrollTo(0, 0);
      var main = document.querySelector('.main-content');
      if (main) main.scrollTop = 0;
    } catch (err) {
      console.warn('force-home-fix error', err);
    }
  }

  // Run multiple times to beat race conditions / errors in main.js
  forceShowHome();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceShowHome);
  }
  window.addEventListener('load', forceShowHome);
  setTimeout(forceShowHome, 100);
  setTimeout(forceShowHome, 500);
  setTimeout(forceShowHome, 1500);
  setTimeout(forceShowHome, 3000);
})();
