/**
 * New homepage boot: themes, custom background image, settings sync,
 * time-on-site tracker, and DevTools-style console.
 */
(function () {
  const THEME_KEY = 'nxos_theme';
  const THEME_BG_KEY = 'nxos_theme_bg';
  const THEME_ACCENT_KEY = 'nxos_theme_accent';
  const BG_IMAGE_KEY = 'nxos_bg_image';
  const INTERACTIVE_BG_KEY = 'nxos_interactive_bg';
  const ANIM_KEY = 'nxos_ui_anim';
  const TIME_KEY = 'nxos_total_time_ms';

  const THEME_DEFAULTS = {
    crimson:   { bg: '#0d0606', accent: '#ff3b3b' },
    purple:    { bg: '#0b0813', accent: '#8b00ff' },
    cyan:      { bg: '#041018', accent: '#00f2ff' },
    emerald:   { bg: '#04140c', accent: '#00ff88' },
    midnight:  { bg: '#000000', accent: '#888888' },
    ocean:     { bg: '#051425', accent: '#0088ff' },
    amber:     { bg: '#1a1005', accent: '#ffb020' },
    rose:      { bg: '#1a0a12', accent: '#ff5ca8' },
    vampire:   { bg: '#0d0202', accent: '#ff0000' },
    forest:    { bg: '#030c05', accent: '#00cc44' },
    cyberpunk: { bg: '#1c0024', accent: '#fcee0a' },
    toxic:     { bg: '#0f1402', accent: '#a3ff00' },
    solar:     { bg: '#140700', accent: '#ff5500' },
    ice:       { bg: '#0f191c', accent: '#00f3ff' },
    arcade:    { bg: '#120421', accent: '#ff007f' },
    royal:     { bg: '#0f0314', accent: '#ffd700' },
    ghost:     { bg: '#11161a', accent: '#708090' },
    copper:    { bg: '#140d0a', accent: '#b87333' },
    moonlight: { bg: '#080a0f', accent: '#7b92b5' },
    neon:      { bg: '#020005', accent: '#00ffef' }
  };

  function applyTheme() {
    const theme = localStorage.getItem(THEME_KEY) || 'crimson';
    let bg = localStorage.getItem(THEME_BG_KEY);
    let accent = localStorage.getItem(THEME_ACCENT_KEY);
    const def = THEME_DEFAULTS[theme];
    if (!bg && def) bg = def.bg;
    if (!accent && def) accent = def.accent;
    document.documentElement.setAttribute('data-theme', theme);
    if (document.body) document.body.setAttribute('data-theme', theme);
    if (bg) {
      document.documentElement.style.setProperty('--nx-page-bg', bg);
      if (document.body) {
        document.body.style.setProperty('--nx-page-bg', bg);
        document.body.style.backgroundColor = bg;
      }
    }
    if (accent) {
      document.documentElement.style.setProperty('--nx-accent', accent);
      if (document.body) document.body.style.setProperty('--nx-accent', accent);
    }
  }

  function applyBackgroundImage() {
    if (!document.body) return;
    let layer = document.getElementById('nx-custom-bg');
    const dataUrl = localStorage.getItem(BG_IMAGE_KEY);
    if (!dataUrl) {
      if (layer) layer.remove();
      document.body.classList.remove('has-custom-bg');
      return;
    }
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'nx-custom-bg';
      layer.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(layer, document.body.firstChild);
    }
    layer.style.backgroundImage = 'url(' + dataUrl + ')';
    document.body.classList.add('has-custom-bg');
  }

  function meshShouldRun() {
    const interactive = localStorage.getItem(INTERACTIVE_BG_KEY);
    const interactiveOn = interactive === null ? true : interactive === 'true';
    const anim = localStorage.getItem(ANIM_KEY);
    const animOn = anim === null ? true : anim === 'true';
    return interactiveOn && animOn;
  }

  function applyInteractiveFlag() {
    if (!document.body) return;
    const enabled = meshShouldRun();
    document.body.classList.toggle('no-interactive-bg', !enabled);
    document.body.classList.toggle('no-ui-anim', localStorage.getItem(ANIM_KEY) === 'false');
    const canvas = document.getElementById('animated-background-canvas');
    if (canvas) canvas.style.display = enabled ? '' : 'none';
    if (!enabled && window.__nxMeshBg && typeof window.__nxMeshBg.stop === 'function') {
      try { window.__nxMeshBg.stop(); } catch (e) {}
    }
  }

  let sessionStart = Date.now();
  let accumulated = parseInt(localStorage.getItem(TIME_KEY) || '0', 10) || 0;
  let lastFlush = Date.now();

  function formatDuration(ms) {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) return h + 'h ' + m + 'm ' + s + 's';
    if (m > 0) return m + 'm ' + s + 's';
    return s + 's';
  }

  function currentTotalMs() {
    return accumulated + (Date.now() - sessionStart);
  }

  function flushTime() {
    const now = Date.now();
    accumulated += now - lastFlush;
    lastFlush = now;
    sessionStart = now;
    try { localStorage.setItem(TIME_KEY, String(accumulated)); } catch (e) {}
  }

  function updateTimeDisplay() {
    const el = document.getElementById('time-on-site');
    if (el) el.textContent = 'Time on site: ' + formatDuration(currentTotalMs());
  }

  function startTimeTracker() {
    updateTimeDisplay();
    setInterval(function () {
      updateTimeDisplay();
      if (Date.now() - lastFlush > 15000) flushTime();
    }, 1000);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flushTime();
      else { sessionStart = Date.now(); lastFlush = Date.now(); }
    });
    window.addEventListener('pagehide', flushTime);
    window.addEventListener('beforeunload', flushTime);
  }

  const history = [];
  let historyIdx = -1;

  function appendLine(level, text) {
    const out = document.getElementById('nxConsoleOutput');
    if (!out) return;
    const line = document.createElement('div');
    line.className = 'nx-console-line ' + (level || 'log');
    const tag = level === 'cmd' ? '>' : (level || 'log');
    line.innerHTML = '<span class="lvl">' + tag + '</span><span class="msg"></span>';
    line.querySelector('.msg').textContent = text;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
  }

  function clearConsole() {
    const out = document.getElementById('nxConsoleOutput');
    if (out) out.innerHTML = '';
  }

  function runCommand(raw) {
    const line = (raw || '').trim();
    if (!line) return;
    history.push(line);
    historyIdx = history.length;
    appendLine('cmd', line);
    const parts = line.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        appendLine('info', 'Commands: help, clear, time, theme [name], mesh [on|off], status, echo <text>, version');
        break;
      case 'clear':
      case 'cls':
        clearConsole();
        break;
      case 'time':
        appendLine('ok', 'Total time on site: ' + formatDuration(currentTotalMs()));
        break;
      case 'theme': {
        if (!arg) {
          appendLine('info', 'Current: ' + (localStorage.getItem(THEME_KEY) || 'crimson'));
          appendLine('info', 'Available: ' + Object.keys(THEME_DEFAULTS).join(', '));
          break;
        }
        const id = arg.toLowerCase();
        if (!THEME_DEFAULTS[id]) {
          appendLine('error', 'Unknown theme: ' + arg);
          break;
        }
        localStorage.setItem(THEME_KEY, id);
        localStorage.setItem(THEME_BG_KEY, THEME_DEFAULTS[id].bg);
        localStorage.setItem(THEME_ACCENT_KEY, THEME_DEFAULTS[id].accent);
        applyTheme();
        appendLine('ok', 'Theme set to ' + id);
        break;
      }
      case 'mesh': {
        if (arg === 'on' || arg === 'off') {
          localStorage.setItem(INTERACTIVE_BG_KEY, arg === 'on' ? 'true' : 'false');
          applyInteractiveFlag();
          appendLine('ok', 'Interactive mesh ' + arg);
        } else {
          appendLine('info', 'mesh on | mesh off  (currently ' + (meshShouldRun() ? 'on' : 'off') + ')');
        }
        break;
      }
      case 'status':
        appendLine('info', 'theme=' + (localStorage.getItem(THEME_KEY) || 'crimson'));
        appendLine('info', 'mesh=' + (meshShouldRun() ? 'on' : 'off'));
        appendLine('info', 'anim=' + (localStorage.getItem(ANIM_KEY) !== 'false' ? 'on' : 'off'));
        appendLine('info', 'time=' + formatDuration(currentTotalMs()));
        break;
      case 'echo':
        appendLine('log', arg || '');
        break;
      case 'version':
        appendLine('info', 'NXOS Console v1 \u00b7 Newhomepage');
        break;
      default:
        appendLine('error', 'Unknown command: ' + cmd + ' (type help)');
    }
  }

  function initConsole() {
    const input = document.getElementById('nxConsoleInput');
    const clearBtn = document.getElementById('nxConsoleClear');
    if (!input) return;
    appendLine('info', 'NXOS Console ready. Type help for commands.');
    appendLine('ok', 'Session time tracking active.');
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        runCommand(input.value);
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length && historyIdx > 0) {
          historyIdx--;
          input.value = history[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx < history.length - 1) {
          historyIdx++;
          input.value = history[historyIdx];
        } else {
          historyIdx = history.length;
          input.value = '';
        }
      }
    });
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        clearConsole();
        appendLine('info', 'Console cleared.');
      });
    }
    window.NxConsole = { log: function (t) { appendLine('log', t); }, clear: clearConsole, run: runCommand };
  }

  function boot() {
    applyTheme();
    applyBackgroundImage();
    applyInteractiveFlag();
    startTimeTracker();
    initConsole();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.NxHomeTheme = { applyTheme, applyBackgroundImage, applyInteractiveFlag, meshShouldRun };
  window.NxTimeOnSite = { formatDuration, currentTotalMs, flushTime };
})();

document.addEventListener('DOMContentLoaded', () => {
  const navTabs = document.querySelectorAll('.nav-tab-item');
  const contentSections = document.querySelectorAll('.content-section');
  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetTab = tab.getAttribute('data-tab');
      contentSections.forEach(section => section.classList.remove('active'));
      const targetSection = document.getElementById(targetTab + '-section');
      if (targetSection) targetSection.classList.add('active');
    });
  });
});
