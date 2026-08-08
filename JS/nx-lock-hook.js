(function () {
  var STORAGE_KEY = "nxos_user_pin";
  var LOCK_ID = "pin-lock-overlay";

  function getLockscreenUrl() {
    try {
      return new URL("/Lockscreen/Lockscreen.html", window.location.origin).href;
    } catch (e) {
      return "/Lockscreen/Lockscreen.html";
    }
  }

  function removeLockOverlay() {
    var el = document.getElementById(LOCK_ID);
    if (el) el.remove();
  }

  function createFullLockOverlay() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, "1234");
    }
    removeLockOverlay();

    var overlay = document.createElement("div");
    overlay.id = LOCK_ID;
    overlay.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999999;" +
      "background:linear-gradient(135deg,#1a0033,#590099,#0a001a);margin:0;padding:0;border:none;";

    var loading = document.createElement("div");
    loading.id = "nx-lock-loading";
    loading.style.cssText =
      "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;" +
      "color:#fff;font-family:Segoe UI,system-ui,sans-serif;font-size:1.1rem;opacity:0.8;pointer-events:none;";
    loading.textContent = "Locking...";
    overlay.appendChild(loading);

    var iframe = document.createElement("iframe");
    iframe.src = getLockscreenUrl();
    iframe.title = "Lock Screen";
    iframe.setAttribute("allow", "autoplay");
    iframe.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;background:transparent;";

    iframe.addEventListener("load", function () {
      var tip = document.getElementById("nx-lock-loading");
      if (tip) tip.remove();
    });
    iframe.addEventListener("error", function () {
      var tip = document.getElementById("nx-lock-loading");
      if (tip) {
        tip.textContent = "Could not load lock screen. Try hard refresh.";
        tip.style.color = "#ff8888";
      }
    });

    overlay.appendChild(iframe);
    document.body.appendChild(overlay);
  }

  window.addEventListener(
    "keydown",
    function (e) {
      if ((e.ctrlKey || e.altKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        e.stopPropagation();
        createFullLockOverlay();
      }
    },
    true
  );

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
