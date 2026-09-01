/**
 * Null_X site music player
 * HTML5 Audio + files in /audio. Settings: #nx-music-enable, #nx-music-mute, #nx-music-volume
 */
(function () {
  const STORAGE_MUTE = "nx_music_muted";
  const STORAGE_VOL = "nx_music_volume";
  const STORAGE_ENABLED = "nx_music_enabled";

  const TRACKS = [
    {
      src: "audio/emmraan-evil-heavy-metal-261243.mp3",
      title: "Evil Heavy Metal"
    }
  ];

  let audio = null;
  let trackIndex = 0;
  let unlocked = false;
  let enabled = localStorage.getItem(STORAGE_ENABLED) !== "false";
  let muted = localStorage.getItem(STORAGE_MUTE) === "true";
  let volume = parseFloat(localStorage.getItem(STORAGE_VOL));
  if (isNaN(volume)) volume = 0.35;
  volume = Math.min(1, Math.max(0, volume));

  function resolveSrc(path) {
    try {
      if (path.startsWith("http")) return path;
      var p = window.location.pathname || "";
      if (
        p.indexOf("/Settings/") >= 0 ||
        p.indexOf("/Login/") >= 0 ||
        p.indexOf("/chat/") >= 0 ||
        p.indexOf("/Newhomepage/") >= 0 ||
        p.indexOf("/profile/") >= 0
      ) {
        return "../" + path;
      }
      return "/" + path.replace(/^\//, "");
    } catch (e) {
      return path;
    }
  }

  function createAudio() {
    if (audio) return audio;
    audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = muted ? 0 : volume;
    loadTrack(trackIndex);
    audio.addEventListener("ended", function () {
      if (enabled && !muted) {
        audio.currentTime = 0;
        audio.play().catch(function () {});
      }
    });
    audio.addEventListener("error", function () {
      if (TRACKS.length > 1) {
        trackIndex = (trackIndex + 1) % TRACKS.length;
        loadTrack(trackIndex);
        if (enabled && unlocked && !muted) {
          audio.play().catch(function () {});
        }
      }
    });
    return audio;
  }

  function loadTrack(i) {
    if (!TRACKS.length) return;
    trackIndex = ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
    var t = TRACKS[trackIndex];
    audio.src = resolveSrc(t.src);
  }

  function tryPlay() {
    if (!enabled || muted) return;
    createAudio();
    var p = audio.play();
    if (p && p.then) {
      p.then(function () {
        unlocked = true;
      }).catch(function () {});
    }
  }

  function setMuted(m) {
    muted = !!m;
    localStorage.setItem(STORAGE_MUTE, muted ? "true" : "false");
    if (audio) audio.volume = muted ? 0 : volume;
    if (!muted && enabled) tryPlay();
    else if (audio && muted) {
      try { audio.pause(); } catch (e) {}
    }
    updateMuteBtn();
    syncSettingsUI();
  }

  function setVolume(v) {
    volume = Math.min(1, Math.max(0, v));
    localStorage.setItem(STORAGE_VOL, String(volume));
    if (audio && !muted) audio.volume = volume;
    syncSettingsUI();
  }

  function setEnabled(on) {
    enabled = !!on;
    localStorage.setItem(STORAGE_ENABLED, enabled ? "true" : "false");
    if (!enabled) {
      if (audio) {
        try { audio.pause(); } catch (e) {}
      }
    } else if (!muted) {
      tryPlay();
    }
    syncSettingsUI();
  }

  function toggleMute() {
    setMuted(!muted);
  }

  function unlockOnGesture() {
    if (unlocked) return;
    unlocked = true;
    if (enabled && !muted) tryPlay();
  }

  function injectStyles() {
    if (document.getElementById("nx-music-style")) return;
    var s = document.createElement("style");
    s.id = "nx-music-style";
    s.textContent =
      "#nx-music-btn{position:fixed;bottom:16px;right:16px;z-index:99990;" +
      "width:44px;height:44px;border-radius:50%;border:1px solid rgba(139,0,255,0.5);" +
      "background:rgba(18,9,28,0.9);color:#c084fc;cursor:pointer;font-size:18px;" +
      "box-shadow:0 4px 16px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;}" +
      "#nx-music-btn:hover{background:rgba(139,0,255,0.25);}";
    document.head.appendChild(s);
  }

  function updateMuteBtn() {
    var btn = document.getElementById("nx-music-btn");
    if (!btn) return;
    btn.textContent = muted || !enabled ? "\uD83D\uDD07" : "\uD83D\uDD0A";
    btn.title = muted || !enabled ? "Unmute music" : "Mute music";
  }

  function injectButton() {
    if (document.getElementById("nx-music-btn")) return;
    injectStyles();
    var btn = document.createElement("button");
    btn.id = "nx-music-btn";
    btn.type = "button";
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      unlockOnGesture();
      toggleMute();
    });
    document.body.appendChild(btn);
    updateMuteBtn();
  }

  function syncSettingsUI() {
    var enableEl = document.getElementById("nx-music-enable");
    var muteEl = document.getElementById("nx-music-mute");
    var volEl = document.getElementById("nx-music-volume");
    var volLabel = document.getElementById("nx-music-volume-label");
    if (enableEl) enableEl.checked = enabled;
    if (muteEl) muteEl.checked = muted;
    if (volEl) volEl.value = String(Math.round(volume * 100));
    if (volLabel) volLabel.textContent = Math.round(volume * 100) + "%";
  }

  function wireSettingsUI() {
    var enableEl = document.getElementById("nx-music-enable");
    var muteEl = document.getElementById("nx-music-mute");
    var volEl = document.getElementById("nx-music-volume");
    var volLabel = document.getElementById("nx-music-volume-label");
    if (!enableEl && !muteEl && !volEl) return false;

    if (enableEl && !enableEl.dataset.nxWired) {
      enableEl.dataset.nxWired = "1";
      enableEl.checked = enabled;
      enableEl.addEventListener("change", function () {
        setEnabled(enableEl.checked);
        if (muteEl) muteEl.checked = muted;
      });
    }
    if (muteEl && !muteEl.dataset.nxWired) {
      muteEl.dataset.nxWired = "1";
      muteEl.checked = muted;
      muteEl.addEventListener("change", function () {
        setMuted(muteEl.checked);
      });
    }
    if (volEl && !volEl.dataset.nxWired) {
      volEl.dataset.nxWired = "1";
      volEl.value = String(Math.round(volume * 100));
      if (volLabel) volLabel.textContent = Math.round(volume * 100) + "%";
      volEl.addEventListener("input", function () {
        var v = (parseInt(volEl.value, 10) || 0) / 100;
        setVolume(v);
        if (volLabel) volLabel.textContent = Math.round(v * 100) + "%";
      });
    }
    return true;
  }

  function observeSettings() {
    if (!window.MutationObserver) return;
    var obs = new MutationObserver(function () {
      if (document.getElementById("nx-music-mute") || document.getElementById("nx-music-volume")) {
        wireSettingsUI();
      }
    });
    function start() {
      if (document.body) obs.observe(document.body, { childList: true, subtree: true });
    }
    if (document.body) start();
    else document.addEventListener("DOMContentLoaded", start);
  }

  window.NullXMusic = {
    play: tryPlay,
    mute: function () { setMuted(true); },
    unmute: function () { setMuted(false); },
    toggleMute: toggleMute,
    setVolume: setVolume,
    setEnabled: setEnabled,
    wireSettingsUI: wireSettingsUI,
    getState: function () {
      return {
        enabled: enabled,
        muted: muted,
        volume: volume,
        unlocked: unlocked,
        track: TRACKS[trackIndex] ? TRACKS[trackIndex].title : null
      };
    }
  };

  function boot() {
    injectButton();
    wireSettingsUI();
    observeSettings();
    createAudio();
    document.addEventListener("click", unlockOnGesture, true);
    document.addEventListener("keydown", unlockOnGesture, true);
    document.addEventListener("touchstart", unlockOnGesture, true);
    if (enabled && !muted) tryPlay();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
