/**
 * Homescreen preference: classic (index.html) vs Newhomepage (NXOS)
 * Works on Settings page and when Settings HTML is injected into a modal.
 */
(function () {
  var KEY = "nx_homescreen";

  function isNew() {
    try {
      return localStorage.getItem(KEY) === "new";
    } catch (e) {
      return false;
    }
  }

  function homeUrl(val) {
    if (val === "new") return "/Newhomepage/index.html";
    return "/index.html";
  }

  function injectUI(root) {
    root = root || document;
    if (document.getElementById("homescreen-select")) return;

    var divider =
      document.querySelector(".settings-divider") ||
      document.querySelector("hr");
    var parent = divider && divider.parentNode;
    if (!parent) {
      parent =
        document.getElementById("modal-settings-content") ||
        document.querySelector(".settings-standalone-container");
      if (!parent) return;
    }

    var section = document.createElement("div");
    section.className = "setting-section";
    section.id = "nx-homescreen-section";
    section.style.marginBottom = "35px";
    section.innerHTML =
      '<h3 style="color:#a033ff;margin-bottom:12px;font-size:1.2rem;"><i class="fas fa-home" style="margin-right:8px;"></i>Homescreen</h3>' +
      '<p class="setting-label" style="color:#ccc;font-size:0.9rem;margin-bottom:12px;">Choose which homepage to use. The new homescreen is the NXOS UI under <code>/Newhomepage</code>.</p>' +
      '<label for="homescreen-select" class="setting-label" style="display:block;color:#ccc;font-size:0.95rem;margin-bottom:8px;">Active Homescreen:</label>' +
      '<select id="homescreen-select" class="settings-input" style="width:100%;max-width:350px;padding:10px;background:rgba(0,0,0,0.3);border:1px solid rgba(139,0,255,0.3);color:white;border-radius:6px;cursor:pointer;">' +
      '<option value="classic">Classic Dashboard</option>' +
      '<option value="new">New Homescreen (NXOS)</option>' +
      "</select>" +
      '<p style="color:#888;font-size:0.8rem;margin-top:8px;">Saved in this browser. Changing this loads the selected homescreen.</p>';

    if (divider && divider.parentNode === parent) {
      parent.insertBefore(section, divider.nextSibling);
    } else {
      var firstSection = parent.querySelector(".setting-section");
      if (firstSection) parent.insertBefore(section, firstSection);
      else parent.insertBefore(section, parent.firstChild);
    }
  }

  function wireSelect() {
    injectUI();
    var select = document.getElementById("homescreen-select");
    if (!select || select.dataset.nxWired) return;
    select.dataset.nxWired = "1";
    var saved = isNew() ? "new" : "classic";
    select.value = saved;
    select.addEventListener("change", function () {
      var val = select.value === "new" ? "new" : "classic";
      try {
        localStorage.setItem(KEY, val);
      } catch (e) {}
      window.location.href = homeUrl(val);
    });

    var returnBtn =
      document.getElementById("return-home-btn") ||
      document.querySelector('a[href*="index.html"]');
    if (returnBtn) {
      returnBtn.href = homeUrl(saved);
    }
  }

  function observe() {
    if (!window.MutationObserver) return;
    var obs = new MutationObserver(function () {
      if (
        document.querySelector(".setting-section") ||
        document.getElementById("modal-settings-content")
      ) {
        wireSelect();
      }
    });
    function start() {
      if (document.body) obs.observe(document.body, { childList: true, subtree: true });
    }
    if (document.body) start();
    else document.addEventListener("DOMContentLoaded", start);
  }

  function boot() {
    wireSelect();
    observe();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  // Root redirect when user prefers Newhomepage
  try {
    var path = window.location.pathname || "";
    var onClassicRoot =
      path === "/" ||
      path === "/index.html" ||
      /\/Null-X-Team\.github\.io\/?$/.test(path) ||
      /\/Null-X-Team\.github\.io\/index\.html$/.test(path);
    if (onClassicRoot && isNew() && !window.__nxHomescreenRedirected) {
      window.__nxHomescreenRedirected = true;
      window.location.replace("/Newhomepage/index.html");
    }
  } catch (e) {}
})();
