/**
 * Username/handler profanity check for Login page.
 * Uses Null-X-Team/badwordfilter → containsBadWords()
 */
(function () {
  var LIB = "https://cdn.jsdelivr.net/gh/Null-X-Team/badwordfilter@main/badword.js";

  function ensureLib(done) {
    if (typeof window.containsBadWords === "function") {
      done(true);
      return;
    }
    var s = document.createElement("script");
    s.src = LIB;
    s.onload = function () { done(typeof window.containsBadWords === "function"); };
    s.onerror = function () { done(false); };
    (document.head || document.documentElement).appendChild(s);
  }

  function nameIsClean(text) {
    if (!text) return true;
    // Strip leading @ for handler checks
    var t = String(text).replace(/^@+/, "").trim();
    if (!t) return true;
    if (typeof window.containsBadWords !== "function") return true;
    try {
      return !window.containsBadWords(t) && !window.containsBadWords(text);
    } catch (e) {
      return true;
    }
  }

  window.nxUsernameIsClean = nameIsClean;

  // Attach live filter to inputs once library is ready
  ensureLib(function (ok) {
    if (!ok) console.warn("[username-filter] badword library failed to load");
    ["username", "handler"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && typeof window.attachFilterToInput === "function") {
        try { window.attachFilterToInput(el); } catch (e) {}
      }
    });
  });
})();
