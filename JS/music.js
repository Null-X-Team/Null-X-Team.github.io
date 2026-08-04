/**
 * Null_X site music player
 * Uses HTML5 Audio + files hosted in /audio (no iframes, no YouTube).
 * Tracks should be royalty-free / properly licensed for the site.
 */
(function () {
  const STORAGE_MUTE = 'nx_music_muted';
  const STORAGE_VOL = 'nx_music_volume';
  const STORAGE_ENABLED = 'nx_music_enabled';

  // Local licensed / royalty-free tracks already in the repo
  const TRACKS = [
    {
      src: 'audio/soul-serenity-sounds-clock-livingroom-soothing-hum-harmonizing-with-the-ticking_IaoowcM6.mp3',
      title: 'Soul Serenity (Ambient)'
    },
    {
      src: 'audio/soul_serenity_sounds-clock-livingroom-soothing-hum-harmonizing-with-the-ticking-344187.mp3',
      title: 'Soul Serenity Alt (Ambient)'
    }
  ];

  let audio = null;
  let trackIndex = 0;
  let unlocked = false;
  let enabled = localStorage.getItem(STORAGE_ENABLED) !== 'false';
  let muted = localStorage.getItem(STORAGE_MUTE) === 'true';
  let volume = parseFloat(localStorage.getItem(STORAGE_VOL));
  if (isNaN(volume)) volume = 0.35;
  volume = Math.min(1, Math.max(0, volume));

  function resolveSrc(path) {
    try {
      // Works from root index and from subpaths
      const base = document.querySelector('base')?.href || window.location.origin + '/';
      if (path.startsWith('http')) return path;
      // Prefer site-root relative when on github.io
      if (window.location.pathname.includes('/Settings/') ||
          window.location.pathname.includes('/Login/') ||
          window.location.pathname.includes('/chat/')) {
        return '../' + path;
      }
      return path;
    } catch (e) {
      return path;
    }
  }

  function createAudio() {
    if (audio) return audio;
    audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = muted ? 0 : volume;
    loadTrack(trackIndex);
    audio.addEventListener('ended', function () {
      // safety if loop fails on some browsers
      if (enabled && !muted) {
        audio.currentTime = 0;
        audio.play().catch(function () {});
      }
    });
    audio.addEventListener('error', function () {
      // try next track
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
    const t = TRACKS[trackIndex];
    createAudio();
    audio.src = resolveSrc(t.src);
    audio.load();
  }

  function tryPlay() {
    if (!enabled || muted) return;
    createAudio();
    audio.volume = volume;
    const p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(function () {
        unlocked = true;
        updateMuteBtn();
      }).catch(function () {
        // Autoplay blocked until user gesture
        unlocked = false;
        updateMuteBtn();
      });
    }
  }

  function unlockOnGesture() {
    if (unlocked) return;
    unlocked = true;
    createAudio();
    if (enabled && !muted) tryPlay();
    document.removeEventListener('click', unlockOnGesture, true);
    document.removeEventListener('keydown', unlockOnGesture, true);
    document.removeEventListener('touchstart', unlockOnGesture, true);
  }

  function setMuted(m) {
    muted = !!m;
    localStorage.setItem(STORAGE_MUTE, muted ? 'true' : 'false');
    createAudio();
    audio.volume = muted ? 0 : volume;
    if (!muted && enabled) tryPlay();
    else if (muted && audio) audio.pause();
    updateMuteBtn();
  }

  function setVolume(v) {
    volume = Math.min(1, Math.max(0, parseFloat(v) || 0));
    localStorage.setItem(STORAGE_VOL, String(volume));
    createAudio();
    if (!muted) audio.volume = volume;
  }

  function setEnabled(on) {
    enabled = !!on;
    localStorage.setItem(STORAGE_ENABLED, enabled ? 'true' : 'false');
    createAudio();
    if (enabled && !muted) tryPlay();
    else if (audio) audio.pause();
    updateMuteBtn();
  }

  function toggleMute() {
    if (!enabled) {
      setEnabled(true);
      setMuted(false);
      return;
    }
    setMuted(!muted);
  }

  function updateMuteBtn() {
    const btn = document.getElementById('nx-music-btn');
    if (!btn) return;
    if (!enabled || muted) {
      btn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
      btn.title = 'Music muted — click to play';
      btn.setAttribute('aria-label', 'Unmute music');
      btn.classList.add('nx-music-muted');
    } else {
      btn.innerHTML = '<i class="fas fa-volume-high"></i>';
      btn.title = 'Music on — click to mute';
      btn.setAttribute('aria-label', 'Mute music');
      btn.classList.remove('nx-music-muted');
    }
  }

  function injectStyles() {
    if (document.getElementById('nx-music-styles')) return;
    const s = document.createElement('style');
    s.id = 'nx-music-styles';
    s.textContent = `
      #nx-music-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 99990;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 1px solid rgba(139, 0, 255, 0.45);
        background: rgba(18, 9, 28, 0.92);
        color: #b056ff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        box-shadow: 0 4px 18px rgba(0,0,0,0.45), 0 0 12px rgba(139, 0, 255, 0.2);
        transition: background 0.2s, color 0.2s, transform 0.15s;
      }
      #nx-music-btn:hover {
        background: rgba(139, 0, 255, 0.25);
        color: #fff;
        transform: scale(1.06);
      }
      #nx-music-btn.nx-music-muted {
        color: #888;
        border-color: rgba(255,255,255,0.12);
      }
      @media (max-width: 640px) {
        #nx-music-btn { bottom: 14px; right: 14px; width: 40px; height: 40px; }
      }
    `;
    document.head.appendChild(s);
  }

  function injectButton() {
    if (document.getElementById('nx-music-btn')) return;
    injectStyles();
    const btn = document.createElement('button');
    btn.id = 'nx-music-btn';
    btn.type = 'button';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      unlockOnGesture();
      toggleMute();
    });
    document.body.appendChild(btn);
    updateMuteBtn();
  }

  function wireSettingsUI() {
    const enableEl = document.getElementById('nx-music-enable');
    const muteEl = document.getElementById('nx-music-mute');
    const volEl = document.getElementById('nx-music-volume');
    const volLabel = document.getElementById('nx-music-volume-label');

    if (enableEl) {
      enableEl.checked = enabled;
      enableEl.addEventListener('change', function () {
        setEnabled(enableEl.checked);
        if (muteEl) muteEl.checked = muted;
      });
    }
    if (muteEl) {
      muteEl.checked = muted;
      muteEl.addEventListener('change', function () {
        setMuted(muteEl.checked);
      });
    }
    if (volEl) {
      volEl.value = String(Math.round(volume * 100));
      if (volLabel) volLabel.textContent = Math.round(volume * 100) + '%';
      volEl.addEventListener('input', function () {
        const v = (parseInt(volEl.value, 10) || 0) / 100;
        setVolume(v);
        if (volLabel) volLabel.textContent = Math.round(v * 100) + '%';
      });
    }
  }

  // Public API
  window.NullXMusic = {
    play: tryPlay,
    mute: function () { setMuted(true); },
    unmute: function () { setMuted(false); },
    toggleMute: toggleMute,
    setVolume: setVolume,
    setEnabled: setEnabled,
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
    createAudio();
    // Browsers block autoplay with sound until a user gesture
    document.addEventListener('click', unlockOnGesture, true);
    document.addEventListener('keydown', unlockOnGesture, true);
    document.addEventListener('touchstart', unlockOnGesture, true);
    // If previously unmuted, attempt play (may still need gesture)
    if (enabled && !muted) tryPlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
