/**
 * Tour removed - bootstraps Achievements (catalog data + runtime).
 */
(function () {
  try {
    localStorage.setItem("hasSeenNullXTour", "true");
  } catch (e) {}

  function migrateButton() {
    var oldBtn = document.getElementById("start-tour-btn");
    if (oldBtn && !document.getElementById("achievementsBtn")) {
      oldBtn.id = "achievementsBtn";
      oldBtn.type = "button";
      oldBtn.className = "tour-trigger-btn";
      oldBtn.innerHTML =
        '<i class="fas fa-trophy" aria-hidden="true"></i> Achievements';
    }
  }

  function loadScript(src, cb) {
    var existing = document.querySelector('script[src="' + src + '"]');
    if (existing) {
      if (cb) cb();
      return;
    }
    var s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = function () { if (cb) cb(); };
    s.onerror = function () { if (cb) cb(); };
    document.body.appendChild(s);
  }

  function loadAchievements() {
    migrateButton();
    if (window.NullXAchievements) return;
    loadScript("achievements-data.js", function () {
      loadScript("achievements.js");
    });
  }

  window.startNullXTour = function () {};
  window.clearNullXTourBarrier = function () {};

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadAchievements);
  } else {
    loadAchievements();
  }
})();
