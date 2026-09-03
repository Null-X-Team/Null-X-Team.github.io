/**
 * Null-X UX enhancements
 * - Recently played
 * - Fuzzy-ish search boost
 * - Lazy-load game card images
 * - Changelog toast (version.json)
 * - Soft mobile tweaks via CSS class
 */
(function () {
  var RECENTS_KEY = "nx_recently_played";
  var MAX_RECENTS = 16;
  var VERSION_URL = "/version.json";

  function safeParse(raw, fallback) {
    try { return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
  }

  function getRecents() {
    var list = safeParse(localStorage.getItem(RECENTS_KEY), []);
    return Array.isArray(list) ? list : [];
  }

  function saveRecents(list) {
    try { localStorage.setItem(RECENTS_KEY, JSON.stringify(list.slice(0, MAX_RECENTS))); } catch (e) {}
  }

  function recordPlayed(gameId, title) {
    if (!gameId) return;
    var list = getRecents().filter(function (x) { return x.id !== gameId; });
    list.unshift({ id: gameId, title: title || gameId, t: Date.now() });
    saveRecents(list);
    renderRecents();
  }

  function scoreMatch(query, text) {
    if (!query) return 1;
    text = (text || "").toLowerCase();
    query = query.toLowerCase().trim();
    if (!query) return 1;
    if (text === query) return 100;
    if (text.startsWith(query)) return 80;
    if (text.indexOf(query) >= 0) return 60;
    var ti = 0, hits = 0;
    for (var qi = 0; qi < query.length; qi++) {
      var ch = query.charAt(qi);
      var found = false;
      while (ti < text.length) {
        if (text.charAt(ti++) === ch) { hits++; found = true; break; }
      }
      if (!found) return 0;
    }
    return 20 + hits;
  }

  function enhanceSearch() {
    var bar = document.getElementById("searchBar");
    if (!bar || bar.dataset.nxUxSearch) return;
    bar.dataset.nxUxSearch = "1";
    bar.setAttribute("placeholder", "Search games (fuzzy)…");

    bar.addEventListener("input", function () {
      var q = bar.value.trim();
      setTimeout(function () {
        var grid = document.getElementById("gameGrid");
        if (!grid) return;
        var cards = Array.prototype.slice.call(grid.querySelectorAll(".game-card"));
        if (!cards.length) return;
        cards.forEach(function (card) {
          var title = "";
          var h = card.querySelector("h3, .game-title, .app-label");
          if (h) title = h.textContent || "";
          var descEl = card.querySelector(".game-desc-overlay");
          var desc = descEl ? descEl.textContent || "" : "";
          var s = Math.max(scoreMatch(q, title), scoreMatch(q, desc) * 0.5);
          card.dataset.nxScore = String(s);
          card.style.display = (!q || s > 0) ? "" : "none";
        });
        if (q) {
          cards.sort(function (a, b) {
            return (parseFloat(b.dataset.nxScore) || 0) - (parseFloat(a.dataset.nxScore) || 0);
          });
          cards.forEach(function (c) { grid.appendChild(c); });
        }
      }, 0);
    });
  }

  function lazyImages() {
    var imgs = document.querySelectorAll(".game-card img.game-card-img, .game-card-img, .apps-grid img");
    imgs.forEach(function (img) {
      if (img.dataset.nxLazy) return;
      img.dataset.nxLazy = "1";
      if (!img.getAttribute("loading")) img.setAttribute("loading", "lazy");
      if (!img.getAttribute("decoding")) img.setAttribute("decoding", "async");
      img.addEventListener("error", function () {
        img.style.display = "none";
        var ph = img.parentElement && img.parentElement.querySelector(".game-card-img-placeholder");
        if (!ph && img.parentElement) {
          var d = document.createElement("div");
          d.className = "game-card-img-placeholder nx-img-fallback";
          d.innerHTML = "<span>No image</span>";
          img.parentElement.insertBefore(d, img);
        }
      });
    });
  }

  function observeGrid() {
    var grid = document.getElementById("gameGrid") || document.getElementById("favoritesGrid");
    if (!grid || grid.dataset.nxObs) return;
    grid.dataset.nxObs = "1";
    var obs = new MutationObserver(function () {
      lazyImages();
      wireCardClicks();
    });
    obs.observe(grid, { childList: true, subtree: true });
    lazyImages();
    wireCardClicks();
  }

  function wireCardClicks() {
    document.querySelectorAll(".game-card[data-game-id]").forEach(function (card) {
      if (card.dataset.nxClick) return;
      card.dataset.nxClick = "1";
      card.addEventListener("click", function () {
        var id = card.getAttribute("data-game-id");
        var titleEl = card.querySelector("h3, .game-title");
        recordPlayed(id, titleEl ? titleEl.textContent : id);
      }, true);
    });
  }

  function ensureRecentsMount() {
    var existing = document.getElementById("nx-recents");
    if (existing) return existing;

    var mount = document.createElement("section");
    mount.id = "nx-recents";
    mount.className = "nx-recents-section";
    mount.innerHTML =
      '<div class="nx-recents-head">' +
      "<h3>Recently Played</h3>" +
      '<button type="button" id="nx-recents-clear" class="nx-recents-clear">Clear</button>' +
      "</div>" +
      '<div id="nx-recents-row" class="nx-recents-row"></div>';

    var grid = document.getElementById("gameGrid");
    var hero = document.getElementById("heroSection");
    var random = document.querySelector(".random-section");
    var parent = (random && random.parentNode) || (hero && hero.parentNode) || (grid && grid.parentNode);
    if (!parent) return null;

    if (random && random.parentNode) {
      random.parentNode.insertBefore(mount, random.nextSibling);
    } else if (hero && hero.parentNode) {
      hero.parentNode.insertBefore(mount, hero.nextSibling);
    } else if (grid && grid.parentNode) {
      grid.parentNode.insertBefore(mount, grid);
    } else {
      parent.appendChild(mount);
    }

    var clearBtn = document.getElementById("nx-recents-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        saveRecents([]);
        renderRecents();
      });
    }
    return mount;
  }

  function renderRecents() {
    var mount = ensureRecentsMount();
    if (!mount) return;
    var row = document.getElementById("nx-recents-row");
    if (!row) return;
    var list = getRecents();
    if (!list.length) {
      mount.style.display = "none";
      row.innerHTML = "";
      return;
    }
    mount.style.display = "";
    row.innerHTML = "";
    list.forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nx-recent-chip";
      btn.textContent = item.title || item.id;
      btn.title = item.title || item.id;
      btn.addEventListener("click", function () {
        if (typeof window.launchGame === "function") {
          window.launchGame(item.id);
          recordPlayed(item.id, item.title);
        } else {
          var card = document.querySelector('.game-card[data-game-id="' + item.id + '"]');
          if (card) card.click();
        }
      });
      row.appendChild(btn);
    });
  }

  function injectReportLink() {
    if (document.getElementById("nx-report-broken")) return;
    var settingsLink = document.querySelector('a[href*="settings"], a.settings-btn');
    var bar = settingsLink && settingsLink.parentElement;
    var a = document.createElement("a");
    a.id = "nx-report-broken";
    a.className = "nx-report-link";
    a.href = "https://github.com/Null-X-Team/Null-X-Team.github.io/issues/new?title=Broken%20game%3A%20&body=Game%20name%3A%0AWhat%20happened%3A%0ADevice%2Fbrowser%3A";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "Report broken game";
    if (bar) bar.appendChild(a);
    else {
      a.style.cssText = "position:fixed;bottom:16px;left:16px;z-index:99980;font-size:12px;color:#a78bfa;";
      document.body.appendChild(a);
    }
  }

  function changelogToast() {
    fetch(VERSION_URL + "?t=" + Date.now())
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || data.version == null) return;
        var ver = String(data.version);
        var seen = localStorage.getItem("nx_seen_version");
        if (seen === ver) return;
        localStorage.setItem("nx_seen_version", ver);
        var notes = data.notes || data.changelog || "Site updated.";
        if (Array.isArray(notes)) notes = notes.join(" · ");
        showToast("Update " + ver, notes);
      })
      .catch(function () {});
  }

  function showToast(title, body) {
    if (document.getElementById("nx-ux-toast")) return;
    var t = document.createElement("div");
    t.id = "nx-ux-toast";
    t.className = "nx-ux-toast";
    t.innerHTML =
      '<div class="nx-ux-toast-title">' + title + "</div>" +
      '<div class="nx-ux-toast-body">' + body + "</div>" +
      '<button type="button" class="nx-ux-toast-x" aria-label="Dismiss">×</button>';
    document.body.appendChild(t);
    t.querySelector(".nx-ux-toast-x").onclick = function () { t.remove(); };
    setTimeout(function () { if (t.parentNode) t.remove(); }, 10000);
  }

  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    try {
      if (!location.hostname.includes("null-x-team.github.io") && location.hostname !== "localhost") return;
      navigator.serviceWorker.register("/sw.js").catch(function () {});
    } catch (e) {}
  }

  function markMobileClass() {
    document.documentElement.classList.add("nx-ux");
  }

  function hookLaunchGame() {
    if (typeof window.launchGame !== "function" || window.launchGame.__nxHooked) return;
    var orig = window.launchGame;
    window.launchGame = function (gameId) {
      try {
        var g = (window._0xData || []).find(function (x) { return x.id === gameId; });
        recordPlayed(gameId, g && g.title);
      } catch (e) {}
      return orig.apply(this, arguments);
    };
    window.launchGame.__nxHooked = true;
  }

  function boot() {
    markMobileClass();
    enhanceSearch();
    observeGrid();
    renderRecents();
    injectReportLink();
    changelogToast();
    registerSW();
    hookLaunchGame();
    var n = 0;
    var timer = setInterval(function () {
      hookLaunchGame();
      observeGrid();
      if (++n > 40) clearInterval(timer);
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.NullXUX = {
    recordPlayed: recordPlayed,
    getRecents: getRecents,
    renderRecents: renderRecents
  };
})();
