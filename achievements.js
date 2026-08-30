/**
 * Null X Achievements
 * Progress stored in localStorage (nx_achievements).
 * Easter-egg entries stay cryptic until unlocked.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "nx_achievements";

  var CATALOG = [
    { id: "welcome", title: "Welcome Aboard", desc: "Open Null X for the first time (this session counts).", icon: "fa-rocket" },
    { id: "trophy_case", title: "Trophy Case", desc: "Open the Achievements panel.", icon: "fa-trophy" },
    { id: "gamer", title: "Boot Sequence", desc: "Click a game card to launch something.", icon: "fa-gamepad" },
    { id: "collector", title: "Collector", desc: "Favorite a game.", icon: "fa-star" },
    { id: "lucky", title: "Feeling Lucky", desc: "Use Random Game.", icon: "fa-shuffle" },
    { id: "tuned", title: "System Preferences", desc: "Open Settings.", icon: "fa-gear" },
    { id: "ghost", title: "Ghost Protocol", desc: "Open Stealth Mode.", icon: "fa-mask" },
    { id: "social", title: "Comms Online", desc: "Open Communications / Chat.", icon: "fa-comments" },
    { id: "identity", title: "Identity Check", desc: "Open your Profile.", icon: "fa-user" },
    { id: "proxy", title: "Bypass Engineer", desc: "Open Unblockers.", icon: "fa-shield-halved" },
    { id: "searcher", title: "Query Runner", desc: "Search for a game.", icon: "fa-magnifying-glass" },
    { id: "egg_konami", title: "Classic Input", desc: "You entered a sequence older than most of this site.", icon: "fa-keyboard", secret: true, hint: "An old console code still works somewhere on this page." },
    { id: "egg_logo", title: "Persistent Clicker", desc: "The logo finally admitted you exist.", icon: "fa-hand-pointer", secret: true, hint: "Something in the sidebar rewards patience." },
    { id: "egg_night", title: "Night Shift", desc: "You showed up while the rest of the world slept.", icon: "fa-moon", secret: true, hint: "Time of day matters." },
    { id: "egg_console", title: "Under the Hood", desc: "You talked to the site console.", icon: "fa-terminal", secret: true, hint: "There is a console on this page. Say hello." },
    { id: "egg_title", title: "Triple Tap", desc: "The greeting noticed your enthusiasm.", icon: "fa-hand-point-up", secret: true, hint: "The welcome text is more interactive than it looks." },
    { id: "egg_news", title: "Archive Diver", desc: "You scrolled deep into System News.", icon: "fa-newspaper", secret: true, hint: "History lives in the right rail." },
    { id: "egg_matrix", title: "Follow the White Rabbit", desc: "You found the green path.", icon: "fa-code", secret: true, hint: "A theme shares its name with a certain rain." }
  ];

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { unlocked: {}, unlockedAt: {} };
      var parsed = JSON.parse(raw);
      return { unlocked: parsed.unlocked || {}, unlockedAt: parsed.unlockedAt || {} };
    } catch (e) {
      return { unlocked: {}, unlockedAt: {} };
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  var state = loadState();

  function isUnlocked(id) {
    return !!state.unlocked[id];
  }

  function unlock(id, silent) {
    if (!id || isUnlocked(id)) return false;
    var found = CATALOG.some(function (a) { return a.id === id; });
    if (!found) return false;
    state.unlocked[id] = true;
    state.unlockedAt[id] = Date.now();
    saveState(state);
    renderList();
    updateBadge();
    if (!silent) showToast(id);
    return true;
  }

  function countUnlocked() {
    var n = 0;
    CATALOG.forEach(function (a) { if (isUnlocked(a.id)) n++; });
    return n;
  }

  function ensureStyles() {
    if (document.getElementById("nx-achievements-style")) return;
    var s = document.createElement("style");
    s.id = "nx-achievements-style";
    s.textContent = [
      "#achievementsBtn.tour-trigger-btn { gap: 8px; }",
      "#nx-ach-modal { position:fixed; inset:0; z-index:10000040; display:none; align-items:center; justify-content:center; background:rgba(8,2,16,0.82); backdrop-filter:blur(8px); }",
      "#nx-ach-modal.open { display:flex; }",
      "#nx-ach-modal .nx-ach-panel { width:min(520px,92vw); max-height:min(78vh,640px); overflow:hidden; display:flex; flex-direction:column; background:#12091c; border:1px solid #8b00ff; border-radius:14px; box-shadow:0 0 40px rgba(139,0,255,0.35); color:#fff; font-family:system-ui,-apple-system,sans-serif; }",
      "#nx-ach-modal .nx-ach-head { display:flex; align-items:center; justify-content:space-between; padding:16px 18px; border-bottom:1px solid rgba(139,0,255,0.25); }",
      "#nx-ach-modal .nx-ach-head h2 { margin:0; font-size:1.15rem; letter-spacing:0.3px; }",
      "#nx-ach-modal .nx-ach-sub { color:#a88; font-size:0.78rem; margin-top:4px; }",
      "#nx-ach-modal .nx-ach-close { background:transparent; border:none; color:#aaa; font-size:1.3rem; cursor:pointer; line-height:1; padding:4px 8px; }",
      "#nx-ach-modal .nx-ach-close:hover { color:#fff; }",
      "#nx-ach-modal .nx-ach-body { overflow:auto; padding:12px 14px 18px; display:flex; flex-direction:column; gap:10px; }",
      ".nx-ach-card { display:flex; gap:12px; align-items:flex-start; padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.03); }",
      ".nx-ach-card.unlocked { border-color:rgba(0,255,102,0.35); background:rgba(0,255,102,0.06); }",
      ".nx-ach-card.locked.secret { border-style:dashed; opacity:0.85; }",
      ".nx-ach-icon { width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; background:rgba(139,0,255,0.15); color:#b056ff; flex-shrink:0; }",
      ".nx-ach-card.unlocked .nx-ach-icon { background:rgba(0,255,102,0.12); color:#00ff66; }",
      ".nx-ach-card.locked .nx-ach-icon { color:#666; background:rgba(255,255,255,0.04); }",
      ".nx-ach-meta { flex:1; min-width:0; }",
      ".nx-ach-title { font-weight:700; font-size:0.92rem; margin:0 0 4px; }",
      ".nx-ach-desc { margin:0; color:#aaa; font-size:0.8rem; line-height:1.35; }",
      ".nx-ach-tag { display:inline-block; margin-top:6px; font-size:0.65rem; text-transform:uppercase; letter-spacing:0.6px; color:#b056ff; border:1px solid rgba(139,0,255,0.35); padding:2px 6px; border-radius:4px; }",
      ".nx-ach-tag.egg { color:#ffb020; border-color:rgba(255,176,32,0.4); }",
      "#nx-ach-toast { position:fixed; right:18px; bottom:18px; z-index:10000060; display:none; min-width:220px; max-width:320px; padding:12px 14px; background:#12091c; border:1px solid #00ff66; border-radius:10px; box-shadow:0 8px 28px rgba(0,0,0,0.45); color:#fff; font-family:system-ui,sans-serif; }",
      "#nx-ach-toast.show { display:block; animation:nxAchIn 0.25s ease; }",
      "@keyframes nxAchIn { from { transform:translateY(10px); opacity:0; } to { transform:none; opacity:1; } }",
      "#nx-ach-toast strong { color:#00ff66; }",
      "#achievementsBtn .nx-ach-badge { margin-left:auto; background:#8b00ff; color:#fff; font-size:0.7rem; font-weight:700; min-width:18px; height:18px; border-radius:9px; display:inline-flex; align-items:center; justify-content:center; padding:0 5px; }"
    ].join("\n");
    document.head.appendChild(s);
  }

  function ensureModal() {
    if (document.getElementById("nx-ach-modal")) return;
    var modal = document.createElement("div");
    modal.id = "nx-ach-modal";
    modal.innerHTML =
      '<div class="nx-ach-panel" role="dialog" aria-modal="true" aria-labelledby="nx-ach-title">' +
      '<div class="nx-ach-head">' +
      '<div><h2 id="nx-ach-title"><i class="fas fa-trophy" style="margin-right:8px;color:#b056ff"></i>Achievements</h2>' +
      '<div class="nx-ach-sub" id="nx-ach-progress"></div></div>' +
      '<button type="button" class="nx-ach-close" id="nx-ach-close" aria-label="Close">&times;</button>' +
      "</div>" +
      '<div class="nx-ach-body" id="nx-ach-list"></div>' +
      "</div>";
    document.body.appendChild(modal);
    var toast = document.createElement("div");
    toast.id = "nx-ach-toast";
    document.body.appendChild(toast);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    document.getElementById("nx-ach-close").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  }

  function openModal() {
    ensureStyles();
    ensureModal();
    renderList();
    document.getElementById("nx-ach-modal").classList.add("open");
    unlock("trophy_case");
  }

  function closeModal() {
    var m = document.getElementById("nx-ach-modal");
    if (m) m.classList.remove("open");
  }

  function renderList() {
    var list = document.getElementById("nx-ach-list");
    var progress = document.getElementById("nx-ach-progress");
    if (!list) return;
    var unlockedN = countUnlocked();
    if (progress) progress.textContent = unlockedN + " / " + CATALOG.length + " unlocked";
    list.innerHTML = "";
    CATALOG.forEach(function (a) {
      var unlocked = isUnlocked(a.id);
      var card = document.createElement("div");
      card.className = "nx-ach-card " + (unlocked ? "unlocked" : "locked") + (a.secret ? " secret" : "");
      var title = unlocked ? a.title : a.secret ? "???" : a.title;
      var desc = unlocked ? a.desc : a.secret ? (a.hint || "A hidden achievement. Explore the site.") : a.desc;
      var iconClass = unlocked ? a.icon : a.secret ? "fa-question" : a.icon;
      card.innerHTML =
        '<div class="nx-ach-icon"><i class="fas ' + iconClass + '"></i></div>' +
        '<div class="nx-ach-meta">' +
        '<p class="nx-ach-title">' + title + "</p>" +
        '<p class="nx-ach-desc">' + desc + "</p>" +
        (a.secret
          ? '<span class="nx-ach-tag egg">' + (unlocked ? "Easter Egg" : "Secret") + "</span>"
          : unlocked
            ? '<span class="nx-ach-tag">Unlocked</span>'
            : "") +
        "</div>";
      list.appendChild(card);
    });
  }

  function updateBadge() {
    var btn = document.getElementById("achievementsBtn") || document.getElementById("start-tour-btn");
    if (!btn) return;
    var badge = btn.querySelector(".nx-ach-badge");
    var n = countUnlocked();
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "nx-ach-badge";
      btn.appendChild(badge);
    }
    badge.textContent = String(n);
  }

  function showToast(id) {
    var a = null;
    for (var i = 0; i < CATALOG.length; i++) {
      if (CATALOG[i].id === id) { a = CATALOG[i]; break; }
    }
    if (!a) return;
    var toast = document.getElementById("nx-ach-toast");
    if (!toast) return;
    toast.innerHTML =
      "<strong>Achievement unlocked</strong><br>" +
      a.title +
      (a.secret ? ' <span style="color:#ffb020;font-size:0.75rem">(Easter Egg)</span>' : "");
    toast.classList.add("show");
    setTimeout(function () { toast.classList.remove("show"); }, 3200);
  }

  function migrateTourButton() {
    var oldBtn = document.getElementById("start-tour-btn");
    if (oldBtn && !document.getElementById("achievementsBtn")) {
      oldBtn.id = "achievementsBtn";
      oldBtn.type = "button";
      oldBtn.innerHTML = '<i class="fas fa-trophy" aria-hidden="true"></i> Achievements';
    }
  }

  function wireUiHooks() {
    var achBtn = document.getElementById("achievementsBtn");
    if (achBtn) {
      achBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    }

    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.closest("#gameGrid .game-card, #gameGrid .game-item, .game-card, .game-item")) unlock("gamer");
      if (t.closest("#ctx-favorite")) unlock("collector");
      if (t.closest("#randomBtn")) unlock("lucky");
      if (t.closest("#settingsBtn")) unlock("tuned");
      if (t.closest("#stealthOpener")) unlock("ghost");
      if (t.closest("#nav-communications")) unlock("social");
      if (t.closest("#nav-profile")) unlock("identity");
      if (t.closest("#nav-unblockers")) unlock("proxy");
    }, true);

    var search = document.getElementById("searchBar");
    if (search) {
      search.addEventListener("input", function () {
        if ((search.value || "").trim().length >= 2) unlock("searcher");
      });
    }

    var seq = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var idx = 0;
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === seq[idx]) {
        idx++;
        if (idx === seq.length) { idx = 0; unlock("egg_konami"); }
      } else {
        idx = e.keyCode === seq[0] ? 1 : 0;
      }
    });

    var logoClicks = 0;
    var logoTimer = null;
    var logo = document.querySelector(".site-logo, .left-nav .logo img, .left-nav .logo");
    if (logo) {
      logo.style.cursor = "pointer";
      logo.addEventListener("click", function () {
        logoClicks++;
        clearTimeout(logoTimer);
        logoTimer = setTimeout(function () { logoClicks = 0; }, 2500);
        if (logoClicks >= 7) { logoClicks = 0; unlock("egg_logo"); }
      });
    }

    try {
      var h = new Date().getHours();
      if (h >= 0 && h < 4) unlock("egg_night", true);
    } catch (e) {}

    var welcome = document.getElementById("welcome-text");
    if (welcome) {
      welcome.addEventListener("click", function (e) {
        if (e.detail >= 3) unlock("egg_title");
      });
    }

    var news = document.getElementById("newsFeed") || document.querySelector(".news-feed");
    if (news) {
      news.addEventListener("scroll", function () {
        if (news.scrollTop + news.clientHeight >= news.scrollHeight - 24) unlock("egg_news");
      });
    }

    var consoleInput = document.getElementById("console-input");
    if (consoleInput) {
      consoleInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && (consoleInput.value || "").trim().length > 0) unlock("egg_console");
      });
    }

    document.addEventListener("click", function (e) {
      var card = e.target && e.target.closest && e.target.closest('.theme-card[data-theme="matrix"]');
      if (card) unlock("egg_matrix");
    });
    try {
      if (localStorage.getItem("selectedTheme") === "matrix") unlock("egg_matrix", true);
    } catch (e) {}
  }

  function boot() {
    migrateTourButton();
    ensureStyles();
    ensureModal();
    unlock("welcome", true);
    updateBadge();
    wireUiHooks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.NullXAchievements = {
    unlock: unlock,
    open: openModal,
    close: closeModal,
    list: function () { return CATALOG.slice(); }
  };
})();
