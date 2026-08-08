(function () {
  var STORAGE_KEY = "nxos_user_pin";
  var LOCKED_KEY = "nxos_locked";
  var LOCK_ID = "pin-lock-overlay";
  var clockTimer = null;

  function hasPin() {
    try {
      var p = localStorage.getItem(STORAGE_KEY);
      return !!(p && String(p).length > 0);
    } catch (e) {
      return false;
    }
  }

  function getPin() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function setPin(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  function isLocked() {
    try {
      return localStorage.getItem(LOCKED_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function setLocked(on) {
    try {
      if (on) localStorage.setItem(LOCKED_KEY, "1");
      else localStorage.removeItem(LOCKED_KEY);
    } catch (e) {}
  }

  function removeLockOverlay() {
    if (clockTimer) {
      clearInterval(clockTimer);
      clockTimer = null;
    }
    var el = document.getElementById(LOCK_ID);
    if (el) el.remove();
    var style = document.getElementById("nx-lock-inline-style");
    if (style) style.remove();
  }

  function injectStyles() {
    if (document.getElementById("nx-lock-inline-style")) return;
    var style = document.createElement("style");
    style.id = "nx-lock-inline-style";
    style.textContent = [
      "#" + LOCK_ID + "{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999999;",
      "background:linear-gradient(135deg,#1a0033,#590099,#0a001a);margin:0;padding:0;border:none;",
      "font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#fff;user-select:none;overflow:hidden;}",
      "#" + LOCK_ID + " .nx-lock-screen{width:100%;height:100%;position:relative;",
      "display:flex;flex-direction:column;justify-content:center;align-items:center;}",
      "#" + LOCK_ID + " .nx-time-view{position:absolute;bottom:12%;left:5%;right:5%;cursor:pointer;",
      "transition:transform .6s ease,opacity .4s ease;}",
      "#" + LOCK_ID + " .nx-time-view.slide-up{transform:translateY(-100vh);opacity:0;pointer-events:none;}",
      "#" + LOCK_ID + " .nx-clock{font-size:clamp(3.5rem,12vw,7rem);font-weight:200;margin:0;line-height:1;",
      "text-shadow:0 2px 24px rgba(0,0,0,.45);}",
      "#" + LOCK_ID + " .nx-date{font-size:clamp(1.1rem,3vw,1.6rem);font-weight:300;margin-top:12px;",
      "text-shadow:0 1px 12px rgba(0,0,0,.4);}",
      "#" + LOCK_ID + " .nx-hint{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);",
      "font-size:1rem;opacity:.75;animation:nxLockPulse 2s infinite;cursor:pointer;white-space:nowrap;}",
      "@keyframes nxLockPulse{0%,100%{opacity:.35}50%{opacity:1}}",
      "#" + LOCK_ID + " .nx-login{display:flex;flex-direction:column;align-items:center;opacity:0;",
      "transform:scale(.92);transition:all .45s ease;pointer-events:none;width:100%;}",
      "#" + LOCK_ID + " .nx-login.active{opacity:1;transform:scale(1);pointer-events:all;}",
      "#" + LOCK_ID + " .nx-user-icon{width:110px;height:110px;background:rgba(255,255,255,.08);",
      "border-radius:50%;padding:18px;margin-bottom:18px;box-shadow:0 4px 20px rgba(0,0,0,.35);",
      "box-sizing:border-box;}",
      "#" + LOCK_ID + " .nx-user-name{font-size:1.7rem;font-weight:400;margin-bottom:18px;}",
      "#" + LOCK_ID + " .nx-input-group{display:flex;align-items:center;background:rgba(0,0,0,.55);",
      "border:2px solid rgba(255,255,255,.25);border-radius:6px;overflow:hidden;transition:border-color .2s;}",
      "#" + LOCK_ID + " .nx-input-group:focus-within{border-color:#b533ff;}",
      "#" + LOCK_ID + " .nx-input-group input{background:transparent;border:none;color:#fff;",
      "padding:14px 16px;font-size:1.05rem;width:210px;outline:none;font-family:inherit;}",
      "#" + LOCK_ID + " .nx-submit{background:transparent;border:none;color:#fff;padding:0 16px;",
      "cursor:pointer;display:flex;align-items:center;}",
      "#" + LOCK_ID + " .nx-submit:hover{color:#b533ff;}",
      "@keyframes nxLockShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}",
      "#" + LOCK_ID + " .nx-error-shake{animation:nxLockShake .4s ease;}",
      "#" + LOCK_ID + " .nx-status{margin-top:14px;font-size:.95rem;min-height:22px;text-align:center;}",
      /* Create-password card */
      "#" + LOCK_ID + " .nx-create-wrap{display:flex;align-items:center;justify-content:center;width:100%;height:100%;padding:20px;box-sizing:border-box;}",
      "#" + LOCK_ID + " .nx-create-card{background:rgba(18,9,28,0.95);border:1px solid rgba(139,0,255,0.45);",
      "border-radius:14px;padding:28px 26px;max-width:380px;width:100%;box-shadow:0 12px 40px rgba(0,0,0,0.55);",
      "text-align:center;}",
      "#" + LOCK_ID + " .nx-create-card h2{margin:0 0 10px;font-size:1.35rem;color:#c084fc;font-weight:600;}",
      "#" + LOCK_ID + " .nx-create-card p{margin:0 0 12px;font-size:0.9rem;color:#c4b5d4;line-height:1.45;}",
      "#" + LOCK_ID + " .nx-create-warn{background:rgba(255,68,68,0.12);border:1px solid rgba(255,68,68,0.4);",
      "border-radius:8px;padding:12px 14px;margin:14px 0 18px;font-size:0.85rem;color:#ffb4b4;line-height:1.45;text-align:left;}",
      "#" + LOCK_ID + " .nx-create-field{display:flex;flex-direction:column;gap:6px;text-align:left;margin-bottom:12px;}",
      "#" + LOCK_ID + " .nx-create-field label{font-size:0.8rem;color:#b056ff;font-weight:600;}",
      "#" + LOCK_ID + " .nx-create-field input{background:rgba(255,255,255,0.05);border:1px solid rgba(139,0,255,0.35);",
      "border-radius:6px;padding:11px 12px;color:#fff;font-size:1rem;outline:none;font-family:inherit;width:100%;box-sizing:border-box;}",
      "#" + LOCK_ID + " .nx-create-field input:focus{border-color:#8b00ff;box-shadow:0 0 8px rgba(139,0,255,0.35);}",
      "#" + LOCK_ID + " .nx-create-btn{width:100%;padding:12px;margin-top:8px;background:#8b00ff;color:#fff;border:none;",
      "border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;font-family:inherit;}",
      "#" + LOCK_ID + " .nx-create-btn:hover{background:#a033ff;}",
      "#" + LOCK_ID + " .nx-create-err{margin-top:10px;font-size:0.85rem;color:#ff6b6b;min-height:18px;}"
    ].join("");
    document.head.appendChild(style);
  }

  function createSetPasswordPopup() {
    removeLockOverlay();
    injectStyles();

    var overlay = document.createElement("div");
    overlay.id = LOCK_ID;
    overlay.innerHTML =
      '<div class="nx-create-wrap">' +
      '  <div class="nx-create-card">' +
      "    <h2>Create Security Password</h2>" +
      "    <p>Set a password to lock your dashboard with Alt+L or Ctrl+L.</p>" +
      '    <div class="nx-create-warn">' +
      "      <strong>Write this password down.</strong> It cannot be reset. " +
      "If you forget it, the only way to unlock is to clear site data in your browser." +
      "    </div>" +
      '    <div class="nx-create-field">' +
      '      <label for="nx-new-pin">Password</label>' +
      '      <input type="password" id="nx-new-pin" placeholder="Enter a password" autocomplete="new-password">' +
      "    </div>" +
      '    <div class="nx-create-field">' +
      '      <label for="nx-confirm-pin">Confirm password</label>' +
      '      <input type="password" id="nx-confirm-pin" placeholder="Confirm password" autocomplete="new-password">' +
      "    </div>" +
      '    <button type="button" class="nx-create-btn" id="nx-save-pin">Save Password</button>' +
      '    <div class="nx-create-err" id="nx-create-err"></div>' +
      "  </div>" +
      "</div>";

    document.body.appendChild(overlay);

    var newPin = document.getElementById("nx-new-pin");
    var confirmPin = document.getElementById("nx-confirm-pin");
    var errEl = document.getElementById("nx-create-err");
    var saveBtn = document.getElementById("nx-save-pin");

    function showErr(msg) {
      if (errEl) errEl.textContent = msg || "";
    }

    function save() {
      var a = (newPin && newPin.value) || "";
      var b = (confirmPin && confirmPin.value) || "";
      if (!a) {
        showErr("Please enter a password.");
        return;
      }
      if (a.length < 4) {
        showErr("Password must be at least 4 characters.");
        return;
      }
      if (a !== b) {
        showErr("Passwords do not match.");
        return;
      }
      if (!setPin(a)) {
        showErr("Could not save password (storage blocked).");
        return;
      }
      showErr("");
      removeLockOverlay();
      // Immediately show lock screen so they can practice unlock
      createLockScreen();
    }

    if (saveBtn) saveBtn.addEventListener("click", save);
    function onEnter(e) {
      if (e.key === "Enter") save();
    }
    if (newPin) {
      newPin.addEventListener("keydown", onEnter);
      setTimeout(function () { newPin.focus(); }, 50);
    }
    if (confirmPin) confirmPin.addEventListener("keydown", onEnter);
  }

  function createLockScreen() {
    removeLockOverlay();
    injectStyles();
    setLocked(true);

    var overlay = document.createElement("div");
    overlay.id = LOCK_ID;
    overlay.innerHTML =
      '<div class="nx-lock-screen" id="nx-screen-root">' +
      '  <div class="nx-time-view" id="nx-time-view">' +
      '    <div class="nx-clock" id="nx-clock">12:00</div>' +
      '    <div class="nx-date" id="nx-date">Monday, January 1</div>' +
      "  </div>" +
      '  <div class="nx-hint" id="nx-hint">Click anywhere to unlock</div>' +
      '  <div class="nx-login" id="nx-login">' +
      '    <svg class="nx-user-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">' +
      '      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>' +
      '      <circle cx="12" cy="7" r="4"/>' +
      "    </svg>" +
      '    <div class="nx-user-name">Guest User</div>' +
      '    <div class="nx-input-group" id="nx-input-group">' +
      '      <input type="password" id="nx-password" placeholder="Password" autocomplete="off">' +
      '      <button type="button" class="nx-submit" id="nx-submit" aria-label="Submit">' +
      '        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">' +
      '          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>' +
      "        </svg>" +
      "      </button>" +
      "    </div>" +
      '    <div class="nx-status" id="nx-status"></div>' +
      "  </div>" +
      "</div>";

    function attach() {
      if (!document.body) {
        document.addEventListener("DOMContentLoaded", attach);
        return;
      }
      document.body.appendChild(overlay);
      wireLockScreen();
    }

    function wireLockScreen() {
      var timeView = document.getElementById("nx-time-view");
      var loginView = document.getElementById("nx-login");
      var clickHint = document.getElementById("nx-hint");
      var passwordInput = document.getElementById("nx-password");
      var statusMessage = document.getElementById("nx-status");
      var inputGroup = document.getElementById("nx-input-group");
      var screenRoot = document.getElementById("nx-screen-root");
      var clockEl = document.getElementById("nx-clock");
      var dateEl = document.getElementById("nx-date");

      function updateClock() {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        h = h < 10 ? "0" + h : String(h);
        m = m < 10 ? "0" + m : String(m);
        if (clockEl) clockEl.textContent = h + ":" + m;
        if (dateEl) {
          dateEl.textContent = now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
          });
        }
      }

      function showLogin() {
        if (timeView) timeView.classList.add("slide-up");
        if (clickHint) clickHint.style.display = "none";
        setTimeout(function () {
          if (loginView) loginView.classList.add("active");
          if (passwordInput) passwordInput.focus();
        }, 280);
      }

      function hideLogin() {
        if (loginView) loginView.classList.remove("active");
        if (timeView) timeView.classList.remove("slide-up");
        if (clickHint) clickHint.style.display = "block";
        if (passwordInput) passwordInput.value = "";
        if (statusMessage) statusMessage.textContent = "";
      }

      function submitPasscode() {
        if (!passwordInput) return;
        var entered = passwordInput.value;
        if (!entered) return;
        if (entered === getPin()) {
          if (statusMessage) {
            statusMessage.style.color = "#00ff88";
            statusMessage.textContent = "Welcome...";
          }
          setLocked(false);
          setTimeout(function () {
            removeLockOverlay();
          }, 450);
        } else {
          if (statusMessage) {
            statusMessage.style.color = "#ff6b6b";
            statusMessage.textContent = "The password is incorrect. Try again.";
          }
          passwordInput.value = "";
          if (inputGroup) inputGroup.classList.add("nx-error-shake");
          setTimeout(function () {
            if (inputGroup) inputGroup.classList.remove("nx-error-shake");
            passwordInput.focus();
          }, 400);
        }
      }

      if (timeView) timeView.addEventListener("click", showLogin);
      if (clickHint) clickHint.addEventListener("click", showLogin);
      if (screenRoot) {
        screenRoot.addEventListener("click", function (e) {
          if (e.target === screenRoot && loginView && !loginView.classList.contains("active")) {
            showLogin();
          }
        });
      }
      var submitBtn = document.getElementById("nx-submit");
      if (submitBtn) submitBtn.addEventListener("click", submitPasscode);
      if (passwordInput) {
        passwordInput.addEventListener("keydown", function (e) {
          if (e.key === "Enter") submitPasscode();
          else if (e.key === "Escape") hideLogin();
        });
      }

      updateClock();
      clockTimer = setInterval(updateClock, 1000);
    }

    attach();
  }

  function handleLockRequest() {
    if (!hasPin()) {
      createSetPasswordPopup();
    } else {
      createLockScreen();
    }
  }

  // Restore lock after reload / hard refresh if still locked
  function restoreIfLocked() {
    if (isLocked() && hasPin()) {
      createLockScreen();
    } else if (isLocked() && !hasPin()) {
      // PIN was cleared while locked — drop the flag
      setLocked(false);
    }
  }

  function tryRestore() {
    if (document.body) {
      restoreIfLocked();
    } else {
      document.addEventListener("DOMContentLoaded", restoreIfLocked);
    }
  }

  // Run as early as possible
  tryRestore();

  window.addEventListener(
    "keydown",
    function (e) {
      if ((e.ctrlKey || e.altKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        e.stopPropagation();
        handleLockRequest();
      }
    },
    true
  );

  // If idle timer creates the old PIN box, route through our flow
  var obs = new MutationObserver(function () {
    if (document.querySelector("#pin-lock-overlay .pin-box")) {
      handleLockRequest();
    }
  });
  function startObs() {
    if (document.body) obs.observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) startObs();
  else document.addEventListener("DOMContentLoaded", startObs);
})();
