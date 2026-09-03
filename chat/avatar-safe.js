/**
 * Chat avatar safety net: broken/oversized PFPs → default → initials.
 * Loaded before chat.js; also listens for img error events.
 */
(function () {
  var DEFAULT_PFP = "https://null-x-team.github.io/imgs/download.jpeg";

  function initialsAvatar(name) {
    var raw = (name || "?").trim() || "?";
    var parts = raw.split(/[\s._-]+/).filter(Boolean);
    var initials = (parts.length >= 2 ? parts[0][0] + parts[1][0] : raw.slice(0, 2)).toUpperCase();
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#4c1d95"/><stop offset="55%" stop-color="#7c3aed"/>' +
      '<stop offset="100%" stop-color="#db2777"/></linearGradient></defs>' +
      '<rect width="128" height="128" fill="url(#g)"/>' +
      '<text x="64" y="72" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" font-weight="700" fill="#f5f3ff">' +
      initials +
      "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function resolvePfp(url, username) {
    var safe = url && String(url).trim();
    if (!safe || safe === "null" || safe === "undefined" || safe === "N/A") {
      return DEFAULT_PFP;
    }
    if (safe.indexOf("data:") === 0 && safe.length > 1200000) {
      return DEFAULT_PFP;
    }
    return safe;
  }

  window.nxResolvePfp = resolvePfp;
  window.nxInitialsAvatar = initialsAvatar;
  window.nxDefaultPfp = DEFAULT_PFP;

  function fixBrokenImg(img) {
    if (!img || img.tagName !== "IMG") return;
    if (img.dataset.nxAvatarHandled === "1") return;

    var isChatAvatar =
      img.classList.contains("chat-pfp") ||
      img.classList.contains("avatar") ||
      img.id === "current-user-avatar" ||
      (img.parentElement && img.parentElement.classList.contains("user-profile"));

    if (!isChatAvatar) return;
    if (img.classList.contains("chat-attached-image")) return;

    img.dataset.nxAvatarHandled = "1";
    var name =
      img.getAttribute("data-user") ||
      img.getAttribute("alt") ||
      (img.closest && img.closest("[data-username]") && img.closest("[data-username]").getAttribute("data-username")) ||
      "?";

    if (img.dataset.triedDefault !== "1") {
      img.dataset.triedDefault = "1";
      img.src = DEFAULT_PFP;
      img.dataset.nxAvatarHandled = "0";
      return;
    }
    img.src = initialsAvatar(name);
  }

  document.addEventListener(
    "error",
    function (e) {
      var t = e.target;
      if (t && t.tagName === "IMG") fixBrokenImg(t);
    },
    true
  );

  function sanitizeImg(img) {
    if (!img || img.tagName !== "IMG") return;
    if (img.classList.contains("chat-attached-image")) return;
    var isChatAvatar =
      img.classList.contains("chat-pfp") ||
      img.classList.contains("avatar") ||
      img.id === "current-user-avatar";
    if (!isChatAvatar) return;
    var src = img.getAttribute("src") || "";
    if (src.indexOf("data:") === 0 && src.length > 1200000) {
      img.src = DEFAULT_PFP;
    }
  }

  function scan(root) {
    (root || document).querySelectorAll("img.chat-pfp, img.avatar, #current-user-avatar").forEach(sanitizeImg);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { scan(document); });
  } else {
    scan(document);
  }

  try {
    var mo = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.tagName === "IMG") sanitizeImg(n);
          else if (n.querySelectorAll) scan(n);
        });
      });
    });
    function start() {
      if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    }
    if (document.body) start();
    else document.addEventListener("DOMContentLoaded", start);
  } catch (e) {}
})();
