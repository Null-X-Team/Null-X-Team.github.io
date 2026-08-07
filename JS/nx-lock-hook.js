(function () {
  var STORAGE_KEY = "nxos_user_pin";
  function getLockscreenUrl() {
    try {
      return new URL("/Lockscreen/Lockscreen.html", window.location.origin).href;
    } catch (e) {
      return "Lockscreen/Lockscreen.html";
    }
  }
  function removeLockOverlay() {
    var el = document.getElementById("pin-lock-overlay");
    if (el) el.remove();
  }
  function createFullLockOverlay() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, "1234");
    }
    removeLockOverlay();
    var overlay = document.createElement("div");
    overlay.id = "pin-lock-overlay";
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999999;background:#000;margin:0;padding:0;border:none;";
    var iframe = document.createElement("iframe");
    iframe.src = getLockscreenUrl();
    iframe.title = "Lock Screen";
    iframe.style.cssText = "width:100%;height:100%;border:none;display:block;background:#000;";
    overlay.appendChild(iframe);
    document.body.appendChild(overlay);
  }
  window.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.altKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      e.stopPropagation();
      createFullLockOverlay();
    }
  }, true);
  window.addEventListener("message", function (event) {
    if (event.data && event.data.type === "nxos-unlock") {
      removeLockOverlay();
    }
  });
  var obs = new MutationObserver(function () {
    if (document.querySelector("#pin-lock-overlay .pin-box")) {
      createFullLockOverlay();
    }
  });
  function startObs() {
    if (document.body) obs.observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) startObs();
  else document.addEventListener("DOMContentLoaded", startObs);
})();
