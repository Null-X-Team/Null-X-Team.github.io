/**
 * Auto pointer-lock for game launches.
 * Loaded via main.js link (or index). No button — locks on first click in the game.
 * Rebinds game cards so module-scoped launchGame is replaced by this launcher.
 */
(function () {
  function install() {
    if (typeof _0xData === 'undefined') return false;
    if (window.__nxPointerLockInstalled) return true;
    window.__nxPointerLockInstalled = true;

    window.launchGame = function (gameId) {
      const game = _0xData.find(g => g.id === gameId);
      if (!game) return;

      const rootUrl = 'https://glaxyias.github.io/';
      const gameTab = window.open('about:blank', '_blank');

      if (!gameTab) {
        alert('Pop-up blocked! Please allow popup permissions to play games.');
        return;
      }

      gameTab.document.title = 'Google Docs';
      gameTab.document.open();

      const autoLockBoot = `
        <script>
        (function () {
          var frame = document.querySelector('iframe');

          function tryReq(el) {
            if (!el) return false;
            var req = el.requestPointerLock || el.mozRequestPointerLock || el.webkitRequestPointerLock;
            if (!req) return false;
            try {
              var r = req.call(el);
              if (r && typeof r.catch === 'function') r.catch(function () {});
              return true;
            } catch (e) { return false; }
          }

          function lockTarget(doc) {
            if (!doc) return false;
            var canvas = doc.querySelector('canvas');
            if (canvas && tryReq(canvas)) return true;
            if (tryReq(doc.body)) return true;
            if (tryReq(doc.documentElement)) return true;
            return false;
          }

          function autoLock() {
            try {
              var doc = frame && (frame.contentDocument || (frame.contentWindow && frame.contentWindow.document));
              if (lockTarget(doc)) return;
            } catch (e) {}
            tryReq(document.body);
            tryReq(frame);
            try { if (frame) frame.focus(); } catch (e) {}
          }

          function injectIntoGame() {
            try {
              var doc = frame && (frame.contentDocument || frame.contentWindow.document);
              if (!doc || doc.getElementById('nx-auto-pl')) return;
              var s = doc.createElement('script');
              s.id = 'nx-auto-pl';
              s.textContent = [
                '(function(){',
                'function lock(){',
                '  var c=document.querySelector("canvas")||document.body;',
                '  var r=c&&(c.requestPointerLock||c.mozRequestPointerLock||c.webkitRequestPointerLock);',
                '  if(r)try{var p=r.call(c);if(p&&p.catch)p.catch(function(){})}catch(e){}',
                '}',
                'function onInteract(e){',
                '  if(e.target&&e.target.closest&&e.target.closest("a,button,.back-btn"))return;',
                '  if(!document.pointerLockElement)lock();',
                '}',
                'document.addEventListener("pointerdown",onInteract,true);',
                'document.addEventListener("click",onInteract,true);',
                '})();'
              ].join('');
              (doc.head || doc.documentElement).appendChild(s);
            } catch (e) {}
          }

          function shellInteract(e) {
            if (e.target && e.target.closest && e.target.closest('.back-btn')) return;
            autoLock();
            injectIntoGame();
          }
          document.addEventListener('pointerdown', shellInteract, true);
          document.addEventListener('click', shellInteract, true);

          if (frame) {
            frame.addEventListener('load', function () {
              injectIntoGame();
              try { frame.focus(); } catch (e) {}
            });
            setTimeout(injectIntoGame, 300);
            setTimeout(injectIntoGame, 1000);
            setTimeout(injectIntoGame, 2500);
          }
        })();
        <\/script>
      `;

      const styles = `
        html, body { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#000; }
        iframe { width:100%; height:100%; border:none; display:block; }
        .back-btn {
          position: fixed; top: 15px; left: 15px; z-index: 99999999;
          background: #0a0a0a; color: #8b00ff; border: 2px solid #8b00ff;
          padding: 8px 14px; font-weight: bold; border-radius: 6px;
          cursor: pointer; box-shadow: 0 0 10px rgba(139,0,255,0.5);
          font-family: sans-serif; text-decoration: none; display: inline-block;
        }
      `;

      const iframeAttrs =
        'sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-modals" allow="pointer-lock *; fullscreen *; gamepad *; autoplay *"';

      if (game.isEmbedCode) {
        gameTab.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>${game.title}</title>
            <style>${styles}</style>
          </head>
          <body>
            <a href="https://glaxyias.github.io/" class="back-btn">← Back To Home</a>
            <iframe src="${game.jsbin}" ${iframeAttrs}></iframe>
            ${autoLockBoot}
          </body>
          </html>
        `);
      } else {
        const gameFullUrl = rootUrl + game.url.replace(/^\.\.\//, '');
        gameTab.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>${game.title}</title>
            <style>${styles}</style>
          </head>
          <body>
            <a href="https://glaxyias.github.io/" class="back-btn">← Back To Home</a>
            <iframe src="${gameFullUrl}" ${iframeAttrs}></iframe>
            ${autoLockBoot}
          </body>
          </html>
        `);
      }

      gameTab.document.close();

      function attemptCloseOriginalTab() {
        try {
          const selfWin = window.open(window.location.href, '_self');
          if (selfWin) selfWin.close();
        } catch (e) {}
        try { window.close(); } catch (e) {}
        try {
          if (window.top && window.top !== window) window.top.close();
        } catch (e) {}
        try {
          window.open('', '_self');
          window.close();
        } catch (e) {}
      }
      attemptCloseOriginalTab();
      setTimeout(attemptCloseOriginalTab, 30);
      setTimeout(function () {
        try {
          window.location.replace('https://www.google.com');
        } catch (e) {
          window.location.href = 'https://www.google.com';
        }
      }, 120);
    };

    function rebindGameCards() {
      document.querySelectorAll('.game-card[data-game-id]').forEach(function (card) {
        var id = card.getAttribute('data-game-id');
        card.onclick = function () { window.launchGame(id); };
      });
      var rnd = document.getElementById('randomBtn');
      if (rnd) {
        rnd.onclick = function () {
          if (!_0xData.length) return;
          window.launchGame(_0xData[Math.floor(Math.random() * _0xData.length)].id);
        };
      }
    }
    rebindGameCards();
    setInterval(rebindGameCards, 1500);

    console.log('[Null_X] Auto pointer-lock active (no button)');
    return true;
  }

  var tries = 0;
  var timer = setInterval(function () {
    tries++;
    if (install() || tries > 200) clearInterval(timer);
  }, 40);
})();
