/**
 * Profanity guard for Null-X chat
 * Uses Null-X-Team/badwordfilter (containsBadWords).
 * chat.js incorrectly calls filterBadWords — we polyfill that and block submit.
 */
(function () {
  var LIB_SRCS = [
    "https://cdn.jsdelivr.net/gh/Null-X-Team/badwordfilter@main/badword.js",
    "https://cdn.jsdelivr.net/gh/Null-X-Team/badwordfilter@master/badword.js"
  ];

  function hasFilter() {
    return typeof window.containsBadWords === "function";
  }

  function isBlocked(text) {
    if (!text || typeof text !== "string") return false;
    if (text.indexOf("[[IMG]]") === 0) return false;
    if (!hasFilter()) return false;
    try {
      return !!window.containsBadWords(text);
    } catch (e) {
      console.warn("[profanity-guard] filter error", e);
      return false;
    }
  }

  // Compatibility for chat.js which expects filterBadWords(text)
  window.filterBadWords = function (text) {
    if (isBlocked(text)) return "\0BLOCKED\0";
    return text;
  };

  function loadLib(i, done) {
    if (hasFilter()) {
      done(true);
      return;
    }
    if (i >= LIB_SRCS.length) {
      console.error("[profanity-guard] could not load badwordfilter");
      done(false);
      return;
    }
    var s = document.createElement("script");
    s.src = LIB_SRCS[i];
    s.async = false;
    s.onload = function () {
      if (hasFilter()) done(true);
      else loadLib(i + 1, done);
    };
    s.onerror = function () {
      loadLib(i + 1, done);
    };
    (document.head || document.documentElement).appendChild(s);
  }

  function blockAlert() {
    alert("Message blocked by filter! Please remove inappropriate language before sending.");
  }

  function wireInputs() {
    ["message-input", "pm-message-input", "broadcast-text"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (typeof window.attachFilterToInput === "function") {
        try { window.attachFilterToInput(el); } catch (e) {}
      }
    });
    if (typeof window.attachFilterToAllInputs === "function") {
      try { window.attachFilterToAllInputs(); } catch (e) {}
    }
  }

  document.addEventListener(
    "submit",
    function (e) {
      var form = e.target;
      if (!form || !form.id) return;
      if (form.id !== "chat-form" && form.id !== "pm-thread-form") return;

      var input =
        form.querySelector("#message-input") ||
        form.querySelector("#pm-message-input") ||
        form.querySelector('input[type="text"]');
      if (!input) return;

      var val = (input.value || "").trim();
      if (!val) return;

      if (isBlocked(val)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        blockAlert();
        input.focus();
      }
    },
    true
  );

  function boot() {
    loadLib(0, function () {
      wireInputs();
      var n = 0;
      var t = setInterval(function () {
        wireInputs();
        if (++n > 20) clearInterval(t);
      }, 500);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
