/**
 * Bootstrap: load last known-good main.js, then pointer-lock launcher override.
 */
(function () {
  function loadScript(src, isModule) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      if (isModule) s.type = 'module';
      s.src = src;
      s.async = false;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      (document.body || document.documentElement).appendChild(s);
    });
  }

  var base = 'JS/';
  try {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || '';
      if (src.indexOf('main.js') !== -1) {
        base = src.replace(/main\.js(\?.*)?$/, '');
        break;
      }
    }
  } catch (e) {}

  var goodMain =
    'https://cdn.jsdelivr.net/gh/GLAXYIAS/glaxyias.github.io@d0a9b94886f721222c29d80082fb7698dc4e8701/JS/main.js';
  var overrideSrc = base + 'game-pointer-lock.js';

  loadScript(goodMain, false)
    .catch(function () {
      return loadScript(
        'https://cdn.jsdelivr.net/gh/GLAXYIAS/glaxyias.github.io@d0a9b948/JS/main.js',
        false
      );
    })
    .then(function () {
      return loadScript(overrideSrc, false);
    })
    .catch(function (err) {
      console.error('[Null_X] main bootstrap failed:', err);
    });
})();
