/**
 * Pointer-lock game launcher override.
 * Does NOT modify main.js — waits for launchGame, then replaces it.
 * Load this after JS/main.js (or anytime; it polls until ready).
 */
(function () {
  function install() {
    if (typeof window.launchGame !== 'function' || typeof _0xData === 'undefined') {
      return false;
    }

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

      const lockStyles = `
        .lock-hint {
          position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%);
          z-index: 99999998; background: rgba(10,10,10,0.85); color: #e0e0e0;
          border: 1px solid #8b00ff; padding: 8px 16px; border-radius: 8px;
          font-family: system-ui, sans-serif; font-size: 13px; pointer-events: none;
          transition: opacity 0.4s ease; opacity: 1;
        }
        .lock-hint.hidden { opacity: 0; }
        body.pointer-locked, body.pointer-locked * { cursor: none !important; }
        body.pointer-locked .back-btn { cursor: pointer !important; }
      `;

      const lockScript = `
        <div class="lock-hint" id="lockHint">Click the game to lock cursor · Esc to unlock</div>
        <script>
        (function() {
          var hint = document.getElementById('lockHint');
          var frame = document.querySelector('iframe');
          function isLocked() {
            return !!(document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
          }
          function updateHint() {
            if (!hint) return;
            if (isLocked()) {
              hint.textContent = 'Cursor locked · Esc to unlock';
              hint.classList.add('hidden');
              document.body.classList.add('pointer-locked');
              setTimeout(function(){ if (hint) hint.style.display = 'none'; }, 500);
            } else {
              document.body.classList.remove('pointer-locked');
              if (hint) {
                hint.style.display = '';
                hint.classList.remove('hidden');
                hint.textContent = 'Click the game to lock cursor · Esc to unlock';
              }
            }
          }
          function requestLock(el) {
            if (!el) el = document.body;
            var req = el.requestPointerLock || el.mozRequestPointerLock || el.webkitRequestPointerLock;
            if (req) { try { req.call(el); } catch (e) {} }
            try { if (frame) frame.focus(); } catch (e) {}
          }
          document.addEventListener('pointerlockchange', updateHint);
          document.addEventListener('mozpointerlockchange', updateHint);
          document.addEventListener('webkitpointerlockchange', updateHint);
          document.addEventListener('pointerlockerror', function() {
            if (hint) {
              hint.textContent = 'Click again inside the game to lock cursor';
              hint.classList.remove('hidden');
              hint.style.display = '';
            }
          });
          document.addEventListener('click', function(e) {
            if (e.target && e.target.closest && e.target.closest('.back-btn')) return;
            if (!isLocked()) requestLock(document.body);
          }, true);
          setTimeout(function() {
            try { if (frame) frame.focus(); } catch (e) {}
            updateHint();
          }, 200);
        })();
        <\/script>
      `;

      const iframeAttrs =
        'sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-modals" allow="pointer-lock; fullscreen; gamepad; autoplay"';

      if (game.isEmbedCode) {
        gameTab.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>${game.title}</title>
            <style>
              body, html { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#000; color:#fff; }
              iframe { width:100%; height:100vh; display:block; border:none; }
              .back-btn {
                position: fixed; top: 15px; left: 15px; z-index: 99999999;
                background: #0a0a0a; color: #8b00ff; border: 2px solid #8b00ff;
                padding: 8px 14px; font-weight: bold; border-radius: 6px;
                cursor: pointer; box-shadow: 0 0 10px rgba(139,0,255,0.5);
                font-family: sans-serif; text-decoration: none; display: inline-block;
              }
              ${lockStyles}
            </style>
          </head>
          <body>
            <a href="https://glaxyias.github.io/" class="back-btn">← Back To Home</a>
            <iframe src="${game.jsbin}" ${iframeAttrs}></iframe>
            ${lockScript}
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
            <style>
              body, html { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#000; }
              iframe { width:100%; height:100%; border:none; display:block; }
              .back-btn {
                position: fixed; top: 15px; left: 15px; z-index: 99999999;
                background: #0a0a0a; color: #8b00ff; border: 2px solid #8b00ff;
                padding: 8px 14px; font-weight: bold; border-radius: 6px;
                cursor: pointer; box-shadow: 0 0 10px rgba(139,0,255,0.5);
                font-family: sans-serif; text-decoration: none; display: inline-block;
              }
              ${lockStyles}
            </style>
          </head>
          <body>
            <a href="https://glaxyias.github.io/" class="back-btn">← Back To Home</a>
            <iframe src="${gameFullUrl}" ${iframeAttrs}></iframe>
            ${lockScript}
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

    console.log('[Null_X] Pointer-lock launcher installed');
    return true;
  }

  var tries = 0;
  var timer = setInterval(function () {
    tries++;
    if (install() || tries > 100) clearInterval(timer);
  }, 50);
})();
