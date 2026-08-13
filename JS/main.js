/**
 * Temporary bootstrap: load the last known-good main.js, then the pointer-lock override.
 * (Replaces an accidental PLACEHOLDER overwrite.)
 */
(function () {
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      (document.body || document.documentElement).appendChild(s);
    });
  }

  var goodMain =
    'https://cdn.jsdelivr.net/gh/GLAXYIAS/glaxyias.github.io@d0a9b94886f721222c29d80082fb7698dc4e8701/JS/main.js';
  var pointerLock = new URL('game-pointer-lock.js', import.meta.url || document.currentScript.src).href;

  // import.meta may not exist in classic scripts; fall back to relative path
  var overrideSrc = 'JS/game-pointer-lock.js';
  try {
    if (document.currentScript && document.currentScript.src) {
      overrideSrc = document.currentScript.src.replace(/main\.js(\?.*)?$/, 'game-pointer-lock.js');
    }
  } catch (e) {}

  loadScript(goodMain)
    .then(function () { return loadScript(overrideSrc); })
    .catch(function (err) {
      console.error('[Null_X] main bootstrap failed:', err);
      // Last resort: try raw.githubusercontent
      return loadScript(
        'https://raw.githubusercontent.com/GLAXYIAS/glaxyias.github.io/d0a9b94886f721222c29d80082fb7698dc4e8701/JS/main.js'
      ).then(function () { return loadScript(overrideSrc); });
    });
})();
