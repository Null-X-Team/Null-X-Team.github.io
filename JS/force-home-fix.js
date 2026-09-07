// One-shot cloak killer only. Do NOT force home view (that fights Games/Profile nav).
(function () {
  function killCloak() {
    var cloak = document.getElementById('educational-cloak');
    if (!cloak) return;
    cloak.style.cssText = 'display:none!important;height:0!important;width:0!important;overflow:hidden!important;';
    try { cloak.remove(); } catch (e) {}
  }

  killCloak();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', killCloak, { once: true });
  }
  window.addEventListener('load', killCloak, { once: true });
})();
