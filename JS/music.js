/**
 * Null_X site music player
 * Library tracks from /audio + optional user-uploaded MP3 (IndexedDB).
 * Settings IDs: nx-music-enable, nx-music-mute, nx-music-volume, nx-music-track, nx-music-upload
 */
(function () {
  var STORAGE_MUTE = "nx_music_muted";
  var STORAGE_VOL = "nx_music_volume";
  var STORAGE_ENABLED = "nx_music_enabled";
  var STORAGE_TRACK = "nx_music_track";
  var IDB_NAME = "nx_music_db";
  var IDB_STORE = "tracks";
  var IDB_KEY = "custom_mp3";

  var LIBRARY = [
    { id: "american-girl", src: "audio/01 An American Girl.mp3", title: "An American Girl" },
    { id: "refugee", src: "audio/05 Refugee.mp3", title: "Refugee" },
    { id: "dont-stand", src: "audio/_05 Don`t Stand So Close to Me.mp3", title: "Don't Stand So Close to Me" },
    { id: "evil-metal", src: "audio/emmraan-evil-heavy-metal-261243.mp3", title: "Evil Heavy Metal" }
  ];

  var audio = null;
  var unlocked = false;
  var enabled = localStorage.getItem(STORAGE_ENABLED) !== "false";
  var muted = localStorage.getItem(STORAGE_MUTE) === "true";
  var volume = parseFloat(localStorage.getItem(STORAGE_VOL));
  if (isNaN(volume)) volume = 0.35;
  volume = Math.min(1, Math.max(0, volume));
  var trackId = localStorage.getItem(STORAGE_TRACK) || LIBRARY[0].id;
  var customObjectUrl = null;
  var customTitle = localStorage.getItem("nx_music_custom_title") || "Uploaded track";

  function resolveSrc(path) {
    try {
      if (!path) return path;
      if (path.indexOf("blob:") === 0 || path.indexOf("data:") === 0 || path.indexOf("http") === 0) return path;
      var p = window.location.pathname || "";
      if (
        p.indexOf("/Settings/") >= 0 ||
        p.indexOf("/Login/") >= 0 ||
        p.indexOf("/chat/") >= 0 ||
        p.indexOf("/Newhomepage/") >= 0 ||
        p.indexOf("/profile/") >= 0
      ) {
        return "../" + path.replace(/^\//, "");
      }
      return "/" + path.replace(/^\//, "");
    } catch (e) {
      return path;
    }
  }

  function openIdb() {
    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) {
        reject(new Error("No IndexedDB"));
        return;
      }
      var req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function idbPut(blob) {
    return openIdb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).put(blob, IDB_KEY);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }

  function idbGet() {
    return openIdb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(IDB_STORE, "readonly");
        var req = tx.objectStore(IDB_STORE).get(IDB_KEY);
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  function getLibraryTrack(id) {
    for (var i = 0; i < LIBRARY.length; i++) {
      if (LIBRARY[i].id === id) return LIBRARY[i];
    }
    return LIBRARY[0];
  }

  function createAudio() {
    if (audio) return audio;
    audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = muted ? 0 : volume;
    audio.addEventListener("ended", function () {
      if (enabled && !muted) {
        audio.currentTime = 0;
        audio.play().catch(function () {});
      }
    });
    return audio;
  }

  function applySrc(src) {
    createAudio();
    audio.src = resolveSrc(src);
  }

  function loadCurrentTrack() {
    return new Promise(function (resolve) {
      createAudio();
      if (trackId === "custom") {
        idbGet()
          .then(function (blob) {
            if (blob) {
              if (customObjectUrl) {
                try { URL.revokeObjectURL(customObjectUrl); } catch (e) {}
              }
              customObjectUrl = URL.createObjectURL(blob);
              applySrc(customObjectUrl);
            } else {
              trackId = LIBRARY[0].id;
              localStorage.setItem(STORAGE_TRACK, trackId);
              applySrc(getLibraryTrack(trackId).src);
            }
            resolve();
          })
          .catch(function () {
            trackId = LIBRARY[0].id;
            applySrc(getLibraryTrack(trackId).src);
            resolve();
          });
      } else {
        applySrc(getLibraryTrack(trackId).src);
        resolve();
      }
    });
  }

  function tryPlay() {
    if (!enabled || muted) return;
    loadCurrentTrack().then(function () {
      var p = audio.play();
      if (p && p.then) {
        p.then(function () { unlocked = true; }).catch(function () {});
      }
    });
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
    } else if (!muted) tryPlay();
    syncSettingsUI();
  }

  function setTrack(id) {
    trackId = id || LIBRARY[0].id;
    localStorage.setItem(STORAGE_TRACK, trackId);
    loadCurrentTrack().then(function () {
      if (enabled && !muted) tryPlay();
    });
    syncSettingsUI();
  }

  function uploadMp3(file) {
    return new Promise(function (resolve, reject) {
      if (!file) {
        reject(new Error("No file"));
        return;
      }
      var name = (file.name || "").toLowerCase();
      var type = (file.type || "").toLowerCase();
      if (!(type === "audio/mpeg" || type === "audio/mp3" || name.endsWith(".mp3"))) {
        reject(new Error("Only MP3 files are allowed."));
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        reject(new Error("File too large (max ~15MB)."));
        return;
      }
      idbPut(file)
        .then(function () {
          customTitle = file.name.replace(/\.mp3$/i, "") || "Uploaded track";
          localStorage.setItem("nx_music_custom_title", customTitle);
          setTrack("custom");
          resolve(customTitle);
        })
        .catch(function (err) {
          reject(err || new Error("Could not save upload."));
        });
    });
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

  function fillTrackSelect(sel) {
    if (!sel) return;
    sel.innerHTML = "";
    LIBRARY.forEach(function (t) {
      var opt = document.createElement("option");
      opt.value = t.id;
      opt.textContent = t.title;
      sel.appendChild(opt);
    });
    var customOpt = document.createElement("option");
    customOpt.value = "custom";
    customOpt.textContent = "Uploaded: " + customTitle;
    sel.appendChild(customOpt);
    sel.value = trackId;
  }

  function syncSettingsUI() {
    var enableEl = document.getElementById("nx-music-enable");
    var muteEl = document.getElementById("nx-music-mute");
    var volEl = document.getElementById("nx-music-volume");
    var volLabel = document.getElementById("nx-music-volume-label");
    var trackEl = document.getElementById("nx-music-track");
    if (enableEl) enableEl.checked = enabled;
    if (muteEl) muteEl.checked = muted;
    if (volEl) volEl.value = String(Math.round(volume * 100));
    if (volLabel) volLabel.textContent = Math.round(volume * 100) + "%";
    if (trackEl) {
      fillTrackSelect(trackEl);
      trackEl.value = trackId;
    }
  }

  function wireSettingsUI() {
    var enableEl = document.getElementById("nx-music-enable");
    var muteEl = document.getElementById("nx-music-mute");
    var volEl = document.getElementById("nx-music-volume");
    var volLabel = document.getElementById("nx-music-volume-label");
    var trackEl = document.getElementById("nx-music-track");
    var uploadEl = document.getElementById("nx-music-upload");
    var statusEl = document.getElementById("nx-music-upload-status");
    if (!enableEl && !muteEl && !volEl && !trackEl) return false;

    if (enableEl && !enableEl.dataset.nxWired) {
      enableEl.dataset.nxWired = "1";
      enableEl.checked = enabled;
      enableEl.addEventListener("change", function () {
        setEnabled(enableEl.checked);
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
    if (trackEl && !trackEl.dataset.nxWired) {
      trackEl.dataset.nxWired = "1";
      fillTrackSelect(trackEl);
      trackEl.addEventListener("change", function () {
        setTrack(trackEl.value);
      });
    }
    if (uploadEl && !uploadEl.dataset.nxWired) {
      uploadEl.dataset.nxWired = "1";
      uploadEl.accept = "audio/mpeg,audio/mp3,.mp3";
      uploadEl.addEventListener("change", function () {
        var file = uploadEl.files && uploadEl.files[0];
        if (!file) return;
        if (statusEl) statusEl.textContent = "Saving…";
        uploadMp3(file)
          .then(function (title) {
            if (statusEl) statusEl.textContent = "Playing: " + title;
            syncSettingsUI();
          })
          .catch(function (err) {
            if (statusEl) statusEl.textContent = (err && err.message) || "Upload failed";
          });
        uploadEl.value = "";
      });
    }
    return true;
  }

  function observeSettings() {
    if (!window.MutationObserver) return;
    var obs = new MutationObserver(function () {
      if (
        document.getElementById("nx-music-mute") ||
        document.getElementById("nx-music-volume") ||
        document.getElementById("nx-music-track")
      ) {
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
    setTrack: setTrack,
    uploadMp3: uploadMp3,
    getLibrary: function () { return LIBRARY.slice(); },
    wireSettingsUI: wireSettingsUI,
    getState: function () {
      return {
        enabled: enabled,
        muted: muted,
        volume: volume,
        unlocked: unlocked,
        trackId: trackId,
        customTitle: customTitle
      };
    }
  };

  function boot() {
    injectButton();
    wireSettingsUI();
    observeSettings();
    createAudio();
    loadCurrentTrack();
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
