/**
 * Tour removed — this file now bootstraps Achievements so existing
 * index.html script tags keep working without a full HTML rewrite.
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

  function loadAchievements() {
    migrateButton();
    if (window.NullXAchievements) return;
    var existing = document.querySelector('script[src="achievements.js"]');
    if (existing) return;
    var s = document.createElement("script");
    s.src = "achievements.js";
    s.async = false;
    document.body.appendChild(s);
  }

  // Neutralize any leftover tour API
  window.startNullXTour = function () {};
  window.clearNullXTourBarrier = function () {};

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadAchievements);
  } else {
    loadAchievements();
  }
})();
