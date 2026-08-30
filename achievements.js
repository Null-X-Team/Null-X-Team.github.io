/**
 * Null X Achievements runtime - catalog from achievements-data.js
 */
(function () {
  "use strict";
  var STORAGE_KEY = "nx_achievements";
  var CATALOG = window.__NX_ACH_CATALOG || [];
  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { unlocked: {}, unlockedAt: {}, meta: {} };
      var parsed = JSON.parse(raw);
      return { unlocked: parsed.unlocked || {}, unlockedAt: parsed.unlockedAt || {}, meta: parsed.meta || {} };
    } catch (e) { return { unlocked: {}, unlockedAt: {}, meta: {} }; }
  }
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ unlocked: state.unlocked, unlockedAt: state.unlockedAt, meta: state.meta }));
    } catch (e) {}
  }
  var state = loadState();
  if (!state.meta) state.meta = {};
  if (!state.meta.sections) state.meta.sections = {};
  if (!state.meta.playCount) state.meta.playCount = 0;
  if (!state.meta.randomCount) state.meta.randomCount = 0;
  if (!state.meta.favoriteIds) state.meta.favoriteIds = {};
  if (!state.meta.themeSwaps) state.meta.themeSwaps = 0;
  if (!state.meta.calcCount) state.meta.calcCount = 0;
  function isUnlocked(id) { return !!state.unlocked[id]; }
  function unlock(id, silent) {
    if (!id || isUnlocked(id)) return false;
    var found = false;
    for (var i = 0; i < CATALOG.length; i++) { if (CATALOG[i].id === id) { found = true; break; } }
    if (!found) return false;
    state.unlocked[id] = true;
    state.unlockedAt[id] = Date.now();
    saveState();
    renderList();
    updateBadge();
    if (!silent) showToast(id);
    checkMetaAchievements();
    return true;
  }
  function countUnlocked() {
    var n = 0;
    CATALOG.forEach(function (a) { if (isUnlocked(a.id)) n++; });
    return n;
  }
  function checkMetaAchievements() {
    var n = countUnlocked();
    if (n >= 15) unlock("power_user", true);
    if (n >= 25) unlock("power_user_25", true);
    if (n >= 40) unlock("power_user_40", true);
    if (n >= Math.ceil(CATALOG.length / 2)) unlock("completionist_half", true);
    var nonSecret = 0, nonSecretUnlocked = 0, secretsUnlocked = 0;
    for (var i = 0; i < CATALOG.length; i++) {
      var a = CATALOG[i];
      if (a.secret) { if (isUnlocked(a.id)) secretsUnlocked++; }
      else { nonSecret++; if (isUnlocked(a.id)) nonSecretUnlocked++; }
    }
    if (nonSecret > 0 && nonSecretUnlocked >= nonSecret) unlock("completionist_full", true);
    if (secretsUnlocked >= 10) unlock("egg_all_secrets", true);
  }
  function ensureStyles() {
    if (document.getElementById("nx-achievements-style")) return;
    var s = document.createElement("style");
    s.id = "nx-achievements-style";
    s.textContent = "#nx-ach-modal{position:fixed;inset:0;z-index:10000040;display:none;align-items:center;justify-content:center;background:rgba(8,2,16,0.82);backdrop-filter:blur(8px)}#nx-ach-modal.open{display:flex}#nx-ach-modal .nx-ach-panel{width:min(520px,92vw);max-height:min(78vh,640px);overflow:hidden;display:flex;flex-direction:column;background:#12091c;border:1px solid #8b00ff;border-radius:14px;box-shadow:0 0 40px rgba(139,0,255,0.35);color:#fff;font-family:system-ui,sans-serif}#nx-ach-modal .nx-ach-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid rgba(139,0,255,0.25)}#nx-ach-modal .nx-ach-head h2{margin:0;font-size:1.15rem}#nx-ach-modal .nx-ach-sub{color:#a88;font-size:0.78rem;margin-top:4px}#nx-ach-modal .nx-ach-close{background:transparent;border:none;color:#aaa;font-size:1.3rem;cursor:pointer}#nx-ach-modal .nx-ach-body{overflow:auto;padding:12px 14px 18px;display:flex;flex-direction:column;gap:10px}.nx-ach-card{display:flex;gap:12px;align-items:flex-start;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.03)}.nx-ach-card.unlocked{border-color:rgba(0,255,102,0.35);background:rgba(0,255,102,0.06)}.nx-ach-card.locked.secret{border-style:dashed;opacity:0.85}.nx-ach-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:rgba(139,0,255,0.15);color:#b056ff;flex-shrink:0}.nx-ach-card.unlocked .nx-ach-icon{background:rgba(0,255,102,0.12);color:#00ff66}.nx-ach-card.locked .nx-ach-icon{color:#666}.nx-ach-title{font-weight:700;font-size:0.92rem;margin:0 0 4px}.nx-ach-desc{margin:0;color:#aaa;font-size:0.8rem;line-height:1.35}.nx-ach-tag{display:inline-block;margin-top:6px;font-size:0.65rem;text-transform:uppercase;letter-spacing:0.6px;color:#b056ff;border:1px solid rgba(139,0,255,0.35);padding:2px 6px;border-radius:4px}.nx-ach-tag.egg{color:#ffb020;border-color:rgba(255,176,32,0.4)}#nx-ach-toast{position:fixed;right:18px;bottom:18px;z-index:10000060;display:none;min-width:220px;max-width:320px;padding:12px 14px;background:#12091c;border:1px solid #00ff66;border-radius:10px;color:#fff}#nx-ach-toast.show{display:block}#nx-ach-toast strong{color:#00ff66}#achievementsBtn .nx-ach-badge{margin-left:auto;background:#8b00ff;color:#fff;font-size:0.7rem;font-weight:700;min-width:18px;height:18px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;padding:0 5px}";
    document.head.appendChild(s);
  }
  function ensureModal() {
    if (document.getElementById("nx-ach-modal")) return;
    var modal = document.createElement("div");
    modal.id = "nx-ach-modal";
    modal.innerHTML = '<div class="nx-ach-panel" role="dialog"><div class="nx-ach-head"><div><h2><i class="fas fa-trophy" style="margin-right:8px;color:#b056ff"></i>Achievements</h2><div class="nx-ach-sub" id="nx-ach-progress"></div></div><button type="button" class="nx-ach-close" id="nx-ach-close">&times;</button></div><div class="nx-ach-body" id="nx-ach-list"></div></div>';
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
      card.innerHTML = '<div class="nx-ach-icon"><i class="fas ' + iconClass + '"></i></div><div class="nx-ach-meta"><p class="nx-ach-title">' + title + '</p><p class="nx-ach-desc">' + desc + '</p>' + (a.secret ? '<span class="nx-ach-tag egg">' + (unlocked ? "Easter Egg" : "Secret") + '</span>' : unlocked ? '<span class="nx-ach-tag">Unlocked</span>' : '') + '</div>';
      list.appendChild(card);
    });
  }
  function updateBadge() {
    var btn = document.getElementById("achievementsBtn") || document.getElementById("start-tour-btn");
    if (!btn) return;
    var badge = btn.querySelector(".nx-ach-badge");
    if (!badge) { badge = document.createElement("span"); badge.className = "nx-ach-badge"; btn.appendChild(badge); }
    badge.textContent = String(countUnlocked());
  }
  function showToast(id) {
    var a = null;
    for (var i = 0; i < CATALOG.length; i++) { if (CATALOG[i].id === id) { a = CATALOG[i]; break; } }
    if (!a) return;
    var toast = document.getElementById("nx-ach-toast");
    if (!toast) return;
    toast.innerHTML = "<strong>Achievement unlocked</strong><br>" + a.title + (a.secret ? ' <span style="color:#ffb020;font-size:0.75rem">(Easter Egg)</span>' : "");
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
  function markSection(id) {
    state.meta.sections[id] = true;
    saveState();
    var keys = Object.keys(state.meta.sections);
    if (keys.length >= 4) unlock("multi_section");
    if (keys.length >= 7) unlock("multi_section_all");
  }
  function wireUiHooks() {
    var achBtn = document.getElementById("achievementsBtn");
    if (achBtn) achBtn.addEventListener("click", function (e) { e.preventDefault(); openModal(); });
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.closest("#gameGrid .game-card, .game-card, .game-item")) {
        unlock("gamer");
        state.meta.playCount++;
        saveState();
        if (state.meta.playCount >= 5) unlock("play_x5");
        if (state.meta.playCount >= 10) unlock("play_x10");
        if (state.meta.playCount >= 25) unlock("play_x25");
      }
      if (t.closest("#ctx-favorite")) {
        unlock("collector");
        state.meta.favoriteIds["f" + Date.now()] = true;
        saveState();
        var favN = Object.keys(state.meta.favoriteIds).length;
        if (favN >= 2) unlock("double_favorite");
        if (favN >= 5) unlock("favorite_x5");
      }
      if (t.closest("#randomBtn")) {
        unlock("lucky");
        state.meta.randomCount++;
        saveState();
        if (state.meta.randomCount >= 3) unlock("random_x3");
        if (state.meta.randomCount >= 10) unlock("random_x10");
      }
      if (t.closest("#settingsBtn, a[href*='Settings']")) { unlock("tuned"); markSection("settings"); }
      if (t.closest("#stealthOpener")) {
        unlock("ghost");
        state.meta.stealthCount = (state.meta.stealthCount || 0) + 1;
        saveState();
        if (state.meta.stealthCount >= 2) unlock("stealth_x2");
      }
      if (t.closest("#nav-communications")) unlock("social");
      if (t.closest("#nav-profile")) unlock("identity");
      if (t.closest("#nav-unblockers")) unlock("proxy");
      if (t.closest("#nav-games")) { unlock("games_nav"); markSection("games"); }
      if (t.closest("#nav-favorites")) { unlock("favorites_nav"); markSection("favorites"); }
      if (t.closest(".theme-card, [data-theme]")) {
        unlock("theme_change");
        state.meta.themeSwaps++;
        saveState();
        if (state.meta.themeSwaps >= 3) unlock("theme_x3");
        if (state.meta.themeSwaps >= 5) unlock("egg_rainbow");
        if (t.closest('[data-theme="matrix"]')) unlock("egg_matrix");
      }
      if (t.closest("#featuredPlay, .featured-play")) unlock("featured_play");
      if (t.closest("#signInBtn")) unlock("signin_click");
      if (t.closest("a[href*='About']")) unlock("about_page");
      if (t.closest("a[href*='TOS']")) unlock("tos_view");
      if (t.closest("a[href*='crosshair']")) unlock("custom_crosshair");
    }, true);
    var search = document.getElementById("searchBar");
    if (search) {
      var searchCount = 0;
      search.addEventListener("input", function () {
        var v = (search.value || "").trim();
        if (v.length >= 2) { unlock("searcher"); searchCount++; if (searchCount >= 5) unlock("search_x5"); }
        if (v.length >= 40) unlock("egg_long_search");
        var low = v.toLowerCase();
        if (low === "null") unlock("egg_null");
        if (low === "nullx" || low === "null x" || low === "null-x") unlock("egg_secret_word");
        if (v === "" && search.dataset.hadValue === "1") unlock("search_empty");
        search.dataset.hadValue = v ? "1" : "0";
      });
    }
    var seq = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], idx = 0;
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === seq[idx]) {
        idx++;
        if (idx === seq.length) {
          idx = 0;
          if (isUnlocked("egg_konami")) unlock("egg_konami_twice"); else unlock("egg_konami");
        }
      } else idx = e.keyCode === seq[0] ? 1 : 0;
      if (e.key === "F11") unlock("egg_fullscreen_attempt");
      if (e.key.indexOf("Arrow") === 0) unlock("keyboard_nav");
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) unlock("egg_print");
      if ((e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "A")) unlock("egg_select_all");
    });
    var logoClicks = 0, logoTimer = null, lastLogoClick = 0;
    var logo = document.querySelector(".site-logo, .left-nav .logo img, .left-nav .logo");
    if (logo) {
      logo.style.cursor = "pointer";
      logo.addEventListener("click", function () {
        var now = Date.now();
        if (now - lastLogoClick < 400) unlock("egg_double_click_logo");
        lastLogoClick = now;
        logoClicks++;
        clearTimeout(logoTimer);
        logoTimer = setTimeout(function () { logoClicks = 0; }, 2500);
        if (logoClicks >= 7) unlock("egg_logo");
        if (logoClicks >= 20) { logoClicks = 0; unlock("egg_logo_20"); }
      });
    }
    try {
      var h = new Date().getHours(), d = new Date().getDay();
      if (h >= 0 && h < 4) unlock("egg_night", true);
      if (h >= 22) unlock("dark_hours", true);
      if (h >= 5 && h < 8) unlock("morning_user", true);
      if (d === 0 || d === 6) unlock("weekend_warrior", true);
      if (localStorage.getItem("selectedTheme") === "matrix") unlock("egg_matrix", true);
    } catch (e) {}
    var welcome = document.getElementById("welcome-text");
    if (welcome) welcome.addEventListener("click", function (e) { if (e.detail >= 3) unlock("egg_title"); });
    var news = document.getElementById("newsFeed") || document.querySelector(".news-feed");
    if (news) news.addEventListener("scroll", function () {
      if (news.scrollTop + news.clientHeight >= news.scrollHeight - 24) unlock("egg_news");
    });
    var main = document.querySelector(".main-content");
    if (main) main.addEventListener("scroll", function () {
      if (main.scrollTop + main.clientHeight >= main.scrollHeight - 40) unlock("egg_scroll_bottom");
    });
    var consoleInput = document.getElementById("console-input");
    if (consoleInput) consoleInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (consoleInput.value || "").trim()) {
        unlock("egg_console");
        if ((consoleInput.value || "").toLowerCase().indexOf("hello") === 0) unlock("egg_hello_console");
      }
    });
    document.addEventListener("copy", function () { unlock("egg_copy"); });
    document.addEventListener("paste", function () { unlock("egg_paste"); });
    document.addEventListener("contextmenu", function () { unlock("egg_inspect"); });
    document.addEventListener("auxclick", function (e) { if (e.button === 1) unlock("egg_middle_click"); });
    document.addEventListener("dragstart", function () { unlock("egg_drag"); });
    window.addEventListener("message", function (ev) {
      var d = ev.data;
      if (!d || d.source !== "nullx-calculator") return;
      if (d.type === "ready") unlock("calc_open");
      if (d.type === "error") unlock("first_error");
      if (d.type === "calculate") {
        unlock("calc_use");
        state.meta.calcCount++;
        saveState();
        if (state.meta.calcCount >= 10) unlock("calc_ops_10");
        var expr = String((d.data && d.data.expression) || "").toLowerCase();
        var result = d.data && d.data.result;
        if (expr.indexOf("pi") !== -1 || String(result).indexOf("3.141") === 0) unlock("egg_pi");
        if (/\be\b/.test(expr)) unlock("egg_calc_e");
        if (expr.indexOf("tau") !== -1) unlock("egg_calc_tau");
        if (expr.indexOf("sqrt") !== -1) unlock("calc_sqrt");
        if (/\b(sin|cos|tan)\b/.test(expr)) unlock("calc_trig");
        if (expr === "42" || result === 42) unlock("egg_42");
        if (expr === "1337" || result === 1337) unlock("egg_1337");
        if (/\/\s*0\b/.test(expr) || expr.indexOf("/0") !== -1) unlock("egg_zero_div");
        if (expr === "help") unlock("calculator_help");
        if (expr === "clear") unlock("calculator_clear");
      }
    });
    document.addEventListener("focusin", function (e) {
      var id = e.target && e.target.id;
      if (id === "panicShortcut" || id === "panicKeyInput" || id === "panicLink") unlock("egg_panic_key");
    });
    var clickBurst = 0, clickBurstTimer = null;
    document.addEventListener("click", function () {
      clickBurst++;
      clearTimeout(clickBurstTimer);
      clickBurstTimer = setTimeout(function () { clickBurst = 0; }, 800);
      if (clickBurst >= 12) { clickBurst = 0; unlock("egg_rapid_click"); }
    });
    var spaceCount = 0, spaceTimer = null, escBurst = 0, escTimer = null;
    document.addEventListener("keydown", function (e) {
      if (e.code === "Space" || e.key === " ") {
        spaceCount++;
        clearTimeout(spaceTimer);
        spaceTimer = setTimeout(function () { spaceCount = 0; }, 1200);
        if (spaceCount >= 15) { spaceCount = 0; unlock("egg_spacebar"); }
      }
      if (e.key === "Escape") {
        escBurst++;
        clearTimeout(escTimer);
        escTimer = setTimeout(function () { escBurst = 0; }, 900);
        if (escBurst >= 3) { escBurst = 0; unlock("egg_triple_escape"); }
      }
    });
    window.addEventListener("resize", function () {
      unlock("resize_window");
      if (window.innerWidth < 600) unlock("mobile_view");
    });
    if (window.innerWidth < 600) unlock("mobile_view", true);
    window.addEventListener("blur", function () { state.meta.blurAt = Date.now(); });
    window.addEventListener("focus", function () {
      if (state.meta.blurAt && Date.now() - state.meta.blurAt < 8000) unlock("egg_tab_blur");
    });
    var idleTimer = setTimeout(function () { unlock("egg_idle"); }, 90000);
    ["mousemove", "keydown", "click", "scroll"].forEach(function (ev) {
      document.addEventListener(ev, function () {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(function () { unlock("egg_idle"); }, 90000);
      }, { passive: true });
    });
    setTimeout(function () { unlock("session_5m"); }, 5 * 60 * 1000);
    setTimeout(function () { unlock("session_15m"); }, 15 * 60 * 1000);
    setTimeout(function () { unlock("session_30m"); }, 30 * 60 * 1000);
    setTimeout(function () { unlock("session_60m"); }, 60 * 60 * 1000);
    if (location.hash && location.hash.length > 1) unlock("egg_hash_nav", true);
    window.addEventListener("hashchange", function () { unlock("egg_hash_nav"); });
    try {
      var first = null;
      for (var k in state.unlockedAt) { if (!first || state.unlockedAt[k] < first) first = state.unlockedAt[k]; }
      if (first && Date.now() - first > 86400000) unlock("egg_uptime_day", true);
    } catch (e) {}
  }
  function boot() {
    migrateTourButton();
    ensureStyles();
    ensureModal();
    unlock("welcome", true);
    updateBadge();
    wireUiHooks();
    checkMetaAchievements();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  window.NullXAchievements = { unlock: unlock, open: openModal, close: closeModal, list: function () { return CATALOG.slice(); } };
})();
