/**
 * Pointer-lock game launcher override.
 * Does NOT modify main.js — waits for launchGame, then replaces it.
 *
 * Fix: clicks inside the iframe never bubble to the parent, so we use a
 * full-screen overlay to capture the user gesture, then request pointer
 * lock on the shell and (if same-origin) on the game canvas/document.
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

      // Shell page script: overlay captures first click (user gesture),
      // then locks pointer on shell + tries same-origin iframe canvas.
      const lockScript = `
        <div id="lockOverlay" style="
          position:fixed; inset:0; z-index:99999990;
          background:rgba(0,0,0,0.55); display:flex;
          align-items:center; justify-content:center;
          cursor:pointer; font-family:system-ui,sans-serif;
        ">
          <div style="
            background:#12091c; border:2px solid #8b00ff; border-radius:14px;
            padding:28px 36px; text-align:center; color:#fff; max-width:360px;
            box-shadow:0 0 40px rgba(139,0,255,0.45);
          ">
            <div style="font-size:2rem; margin-bottom:10px;">🖱️</div>
            <div style="font-size:1.15rem; font-weight:700; margin-bottom:8px;">Click to lock cursor</div>
            <div style="font-size:0.85rem; color:#aaa; line-height:1.4;">
              Required for mouse look / aiming.<br>Press <b>Esc</b> anytime to unlock.
            </div>
          </div>
        </div>
        <div class="lock-hint" id="lockHint" style="
          position:fixed; bottom:18px; left:50%; transform:translateX(-50%);
          z-index:99999998; background:rgba(10,10,10,0.85); color:#e0e0e0;
          border:1px solid #8b00ff; padding:8px 16px; border-radius:8px;
          font-family:system-ui,sans-serif; font-size:13px; pointer-events:none;
          display:none;
        ">Cursor locked · Esc to unlock</div>
        <script>
        (function () {
          var overlay = document.getElementById('lockOverlay');
          var hint = document.getElementById('lockHint');
          var frame = document.querySelector('iframe');

          function isLocked() {
            return !!(document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
          }

          function tryReq(el) {
            if (!el) return false;
            var req = el.requestPointerLock || el.mozRequestPointerLock || el.webkitRequestPointerLock;
            if (!req) return false;
            try {
              var ret = req.call(el);
              // some browsers return a Promise
              if (ret && typeof ret.catch === 'function') ret.catch(function () {});
              return true;
            } catch (e) {
              return false;
            }
          }

          function lockInsideFrame() {
            if (!frame) return false;
            try {
              var doc = frame.contentDocument || (frame.contentWindow && frame.contentWindow.document);
              if (!doc) return false;
              // Prefer canvas (Unity / WebGL games), then body/html
              var canvas = doc.querySelector('canvas');
              if (canvas && tryReq(canvas)) return true;
              if (tryReq(doc.body)) return true;
              if (tryReq(doc.documentElement)) return true;
            } catch (e) {
              // cross-origin embed — cannot reach inside
            }
            return false;
          }

          function requestLock() {
            // 1) lock inside game if same-origin
            if (lockInsideFrame()) return;
            // 2) lock shell body
            tryReq(document.body);
            // 3) also try the iframe element itself
            tryReq(frame);
            try { if (frame) frame.focus(); } catch (e) {}
          }

          function onLockChange() {
            if (isLocked()) {
              if (overlay) overlay.style.display = 'none';
              if (hint) {
                hint.style.display = 'block';
                hint.textContent = 'Cursor locked · Esc to unlock';
                setTimeout(function () {
                  if (hint) hint.style.display = 'none';
                }, 2000);
              }
              document.body.style.cursor = 'none';
            } else {
              document.body.style.cursor = '';
              // Show a small re-lock button after unlock (not full overlay every time)
              if (hint) {
                hint.style.display = 'block';
                hint.textContent = 'Click game to re-lock cursor · Esc unlocks';
                hint.style.pointerEvents = 'auto';
                hint.style.cursor = 'pointer';
              }
            }
          }

          document.addEventListener('pointerlockchange', onLockChange);
          document.addEventListener('mozpointerlockchange', onLockChange);
          document.addEventListener('webkitpointerlockchange', onLockChange);

          document.addEventListener('pointerlockerror', function () {
            if (hint) {
              hint.style.display = 'block';
              hint.textContent = 'Lock failed — click the purple button again';
            }
            if (overlay) overlay.style.display = 'flex';
          });

          function onFirstClick(e) {
            if (e.target && e.target.closest && e.target.closest('.back-btn')) return;
            e.preventDefault();
            e.stopPropagation();
            requestLock();
            // Keep overlay until we confirm lock; hide optimistically after short wait
            setTimeout(function () {
              if (overlay) overlay.style.display = 'none';
              try { if (frame) frame.focus(); } catch (err) {}
              // Inject click-to-lock helper into same-origin game so later clicks work too
              try {
                var doc = frame && (frame.contentDocument || frame.contentWindow.document);
                if (doc && !doc.getElementById('nx-pl-hook')) {
                  var s = doc.createElement('script');
                  s.id = 'nx-pl-hook';
                  s.textContent = (
                    '(function(){' +
                    'function lock(){' +
                    'var c=document.querySelector("canvas")||document.body;' +
                    'var r=c&&(c.requestPointerLock||c.mozRequestPointerLock||c.webkitRequestPointerLock);' +
                    'if(r)try{r.call(c);}catch(e){}' +
                    '}' +
                    'document.addEventListener("click",function(){if(!document.pointerLockElement)lock();},true);' +
                    '})();'
                  );
                  (doc.head || doc.documentElement).appendChild(s);
                }
              } catch (err) {}
            }, 100);
          }

          if (overlay) {
            overlay.addEventListener('click', onFirstClick, true);
          }

          // Re-lock from hint banner after Esc
          if (hint) {
            hint.addEventListener('click', function (e) {
              e.preventDefault();
              requestLock();
            });
          }

          // When iframe loads, try to prep (cannot lock without gesture)
          if (frame) {
            frame.addEventListener('load', function () {
              try { frame.focus(); } catch (e) {}
            });
          }
        })();
        <\/script>
      `;

      const lockStyles = `
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
        'sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-modals allow-pointer-lock" allow="pointer-lock *; fullscreen *; gamepad *; autoplay *"';

      if (game.isEmbedCode) {
        gameTab.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>${game.title}</title>
            <style>${lockStyles}</style>
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
            <style>${lockStyles}</style>
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

    console.log('[Null_X] Pointer-lock launcher installed (overlay fix)');
    return true;
  }

  var tries = 0;
  var timer = setInterval(function () {
    tries++;
    if (install() || tries > 100) clearInterval(timer);
  }, 50);
})();
