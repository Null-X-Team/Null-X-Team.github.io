(function NullXDevTools() {
  "use strict";

  if (window.__NULLX_DEVTOOLS__) {
    window.__NULLX_DEVTOOLS__.toggle();
    return;
  }

  const CONFIG = {
    version: "10.0.0",
    maxLogs: 350,
    maxRequests: 250,
    theme: {
      bg: "rgba(5, 5, 10, 0.985)",
      panel: "rgba(20, 12, 31, 0.96)",
      border: "#8b00ff",
      accent: "#00ffcc",
      text: "#eeeeee",
      muted: "#9691a1",
      danger: "#ff3b63",
      warning: "#ffba49",
      success: "#38e58c"
    }
  };

  const STATE = {
    visible: false,
    activeTab: "overview",
    startTime: Date.now(),
    logs: [],
    requests: [],
    errors: [],
    fps: 0,
    frames: 0,
    lastFpsTime: performance.now(),
    observer: null,
    selectedElement: null,
    networkPatched: false,
    consolePatched: false,
    isDragging: false,
    dragX: 0,
    dragY: 0,
    refreshTimer: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const escapeHTML = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const bytes = (value) => {
    if (!Number.isFinite(value) || value < 0) return "N/A";
    const units = ["B", "KB", "MB", "GB"];
    let index = 0;
    let amount = value;
    while (amount >= 1024 && index < units.length - 1) {
      amount /= 1024;
      index++;
    }
    return `${amount.toFixed(index ? 2 : 0)} ${units[index]}`;
  };

  const duration = (ms) => {
    if (!Number.isFinite(ms)) return "N/A";
    if (ms < 1000) return `${Math.round(ms)} ms`;
    return `${(ms / 1000).toFixed(2)} s`;
  };

  const time = (value = Date.now()) =>
    new Date(value).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

  const safeJSON = (value) => {
    try {
      return typeof value === "string" ? value : JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  };

  const css = `
    :root {
      --nx-bg: ${CONFIG.theme.bg};
      --nx-panel: ${CONFIG.theme.panel};
      --nx-border: ${CONFIG.theme.border};
      --nx-accent: ${CONFIG.theme.accent};
      --nx-text: ${CONFIG.theme.text};
      --nx-muted: ${CONFIG.theme.muted};
      --nx-danger: ${CONFIG.theme.danger};
      --nx-warning: ${CONFIG.theme.warning};
      --nx-success: ${CONFIG.theme.success};
    }

    .nx-hidden { display: none !important; }

    #nx-hud,
    #nx-trigger,
    #nx-inspector-overlay {
      box-sizing: border-box;
      font-family: Consolas, "Cascadia Code", "SFMono-Regular", monospace;
    }

    #nx-hud {
      position: fixed;
      top: 18px;
      left: 18px;
      width: min(880px, calc(100vw - 36px));
      height: min(690px, calc(100vh - 36px));
      min-height: 420px;
      background: var(--nx-bg);
      border: 1px solid var(--nx-border);
      border-radius: 12px;
      color: var(--nx-text);
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 0 0 1px rgba(139,0,255,.2), 0 20px 65px rgba(0,0,0,.72), 0 0 35px rgba(139,0,255,.28);
      backdrop-filter: blur(16px);
      resize: both;
    }

    #nx-header {
      min-height: 46px;
      padding: 0 14px;
      background: linear-gradient(90deg, rgba(139,0,255,.18), rgba(0,255,204,.05));
      border-bottom: 1px solid rgba(139,0,255,.55);
      cursor: move;
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;
    }

    .nx-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .nx-status-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--nx-success);
      box-shadow: 0 0 12px var(--nx-success);
      flex: none;
    }

    .nx-brand-title {
      color: var(--nx-accent);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 1px;
      white-space: nowrap;
    }

    .nx-brand-version {
      color: var(--nx-muted);
      font-size: 10px;
      white-space: nowrap;
    }

    .nx-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nx-icon-btn {
      width: 27px;
      height: 27px;
      border: 1px solid rgba(255,255,255,.16);
      background: rgba(0,0,0,.35);
      color: var(--nx-text);
      border-radius: 6px;
      cursor: pointer;
      font: inherit;
      line-height: 1;
    }

    .nx-icon-btn:hover {
      border-color: var(--nx-accent);
      color: var(--nx-accent);
    }

    #nx-close:hover {
      border-color: var(--nx-danger);
      color: var(--nx-danger);
    }

    #nx-tabs {
      display: flex;
      gap: 3px;
      overflow-x: auto;
      padding: 8px 8px 0;
      background: rgba(0,0,0,.4);
      border-bottom: 1px solid rgba(255,255,255,.09);
      scrollbar-width: thin;
    }

    .nx-tab-btn {
      border: 1px solid transparent;
      border-bottom: none;
      padding: 9px 12px;
      background: transparent;
      color: var(--nx-muted);
      border-radius: 7px 7px 0 0;
      cursor: pointer;
      font: inherit;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: .25px;
      white-space: nowrap;
    }

    .nx-tab-btn:hover {
      color: var(--nx-text);
      background: rgba(255,255,255,.05);
    }

    .nx-tab-btn.active {
      color: var(--nx-accent);
      background: var(--nx-panel);
      border-color: rgba(139,0,255,.6);
      box-shadow: inset 0 2px 0 var(--nx-border);
    }

    #nx-content {
      flex: 1;
      overflow: auto;
      padding: 12px;
      background:
        radial-gradient(circle at 100% 0%, rgba(139,0,255,.11), transparent 34%),
        rgba(4,4,8,.8);
    }

    .nx-tab-pane { display: none; }
    .nx-tab-pane.active { display: block; }

    .nx-grid {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 10px;
    }

    .nx-card {
      grid-column: span 4;
      min-width: 0;
      border: 1px solid rgba(255,255,255,.11);
      border-radius: 8px;
      padding: 10px;
      background: var(--nx-panel);
    }

    .nx-card.wide { grid-column: span 8; }
    .nx-card.full { grid-column: 1 / -1; }

    .nx-card-title,
    .nx-title {
      margin: 0 0 9px;
      color: var(--nx-border);
      font-size: 10px;
      font-weight: 900;
      letter-spacing: .9px;
      text-transform: uppercase;
    }

    .nx-stat {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .nx-stat-label {
      color: var(--nx-muted);
      font-size: 10px;
      text-transform: uppercase;
    }

    .nx-stat-value {
      color: #fff;
      font-size: 17px;
      font-weight: 900;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .nx-stat-value.good { color: var(--nx-success); }
    .nx-stat-value.warn { color: var(--nx-warning); }
    .nx-stat-value.bad { color: var(--nx-danger); }

    .nx-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 7px 8px;
      margin-bottom: 5px;
      border-radius: 5px;
      background: rgba(255,255,255,.035);
      font-size: 10px;
    }

    .nx-row span:first-child {
      color: var(--nx-muted);
      min-width: 0;
    }

    .nx-row span:last-child {
      color: #fff;
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .nx-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 7px;
    }

    .nx-btn {
      min-height: 33px;
      padding: 8px 10px;
      border: 1px solid rgba(255,255,255,.16);
      border-radius: 6px;
      background: rgba(0,0,0,.48);
      color: var(--nx-text);
      cursor: pointer;
      font: inherit;
      font-size: 10px;
      font-weight: 800;
      text-align: left;
      text-transform: uppercase;
    }

    .nx-btn:hover {
      color: var(--nx-accent);
      border-color: var(--nx-accent);
      background: rgba(0,255,204,.06);
    }

    .nx-btn.danger:hover {
      color: var(--nx-danger);
      border-color: var(--nx-danger);
      background: rgba(255,0,85,.08);
    }

    .nx-btn.warning:hover {
      color: var(--nx-warning);
      border-color: var(--nx-warning);
      background: rgba(255,186,73,.08);
    }

    .nx-input,
    .nx-select,
    .nx-textarea {
      width: 100%;
      border: 1px solid rgba(255,255,255,.16);
      border-radius: 6px;
      box-sizing: border-box;
      padding: 8px;
      background: rgba(0,0,0,.52);
      color: #fff;
      outline: none;
      font: inherit;
      font-size: 10px;
    }

    .nx-input:focus,
    .nx-select:focus,
    .nx-textarea:focus {
      border-color: var(--nx-accent);
      box-shadow: 0 0 0 2px rgba(0,255,204,.1);
    }

    .nx-textarea {
      min-height: 130px;
      resize: vertical;
      line-height: 1.45;
    }

    .nx-toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      align-items: center;
      margin-bottom: 10px;
    }

    .nx-toolbar .nx-input {
      flex: 1 1 190px;
    }

    .nx-log,
    .nx-code {
      max-height: 340px;
      overflow: auto;
      padding: 8px;
      border: 1px solid rgba(255,255,255,.11);
      border-radius: 7px;
      background: rgba(0,0,0,.52);
      color: #c9c6d1;
      font-size: 10px;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .nx-log-entry {
      display: grid;
      grid-template-columns: 70px 58px minmax(0, 1fr);
      gap: 8px;
      padding: 5px 2px;
      border-bottom: 1px solid rgba(255,255,255,.05);
    }

    .nx-log-entry:last-child { border-bottom: none; }
    .nx-log-time { color: var(--nx-muted); }
    .nx-log-type { font-weight: 900; }
    .nx-log-message { min-width: 0; color: #e8e6eb; }
    .nx-log-entry.error .nx-log-type { color: var(--nx-danger); }
    .nx-log-entry.warn .nx-log-type { color: var(--nx-warning); }
    .nx-log-entry.info .nx-log-type { color: var(--nx-accent); }
    .nx-log-entry.log .nx-log-type { color: var(--nx-success); }

    .nx-table {
      width: 100%;
      min-width: 620px;
      border-collapse: collapse;
      font-size: 10px;
    }

    .nx-table th {
      position: sticky;
      top: 0;
      z-index: 1;
      padding: 8px;
      background: #15101d;
      color: var(--nx-accent);
      text-align: left;
      text-transform: uppercase;
      font-size: 9px;
    }

    .nx-table td {
      max-width: 320px;
      padding: 7px 8px;
      border-bottom: 1px solid rgba(255,255,255,.07);
      color: #ddd;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .nx-table tr:hover td {
      background: rgba(139,0,255,.08);
    }

    .nx-scroll {
      overflow: auto;
      border: 1px solid rgba(255,255,255,.11);
      border-radius: 7px;
    }

    .nx-pill {
      display: inline-flex;
      align-items: center;
      border: 1px solid rgba(255,255,255,.15);
      border-radius: 999px;
      padding: 3px 7px;
      font-size: 9px;
      font-weight: 900;
    }

    .nx-pill.good { color: var(--nx-success); border-color: rgba(56,229,140,.45); }
    .nx-pill.warn { color: var(--nx-warning); border-color: rgba(255,186,73,.45); }
    .nx-pill.bad { color: var(--nx-danger); border-color: rgba(255,59,99,.45); }
    .nx-pill.info { color: var(--nx-accent); border-color: rgba(0,255,204,.45); }

    .nx-kv {
      display: grid;
      grid-template-columns: 145px minmax(0, 1fr);
      gap: 7px;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid rgba(255,255,255,.06);
      font-size: 10px;
    }

    .nx-kv:last-child { border-bottom: none; }
    .nx-kv-key { color: var(--nx-muted); }
    .nx-kv-value { color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    .nx-toast-wrap {
      position: fixed;
      right: 16px;
      bottom: 70px;
      display: flex;
      flex-direction: column;
      gap: 7px;
      z-index: 2147483647;
      pointer-events: none;
    }

    .nx-toast {
      min-width: 220px;
      max-width: 340px;
      padding: 10px 12px;
      border: 1px solid var(--nx-border);
      border-radius: 7px;
      background: rgba(9,6,15,.95);
      color: #fff;
      box-shadow: 0 12px 35px rgba(0,0,0,.55);
      font: 11px Consolas, monospace;
    }

    .nx-toast.success { border-color: var(--nx-success); }
    .nx-toast.error { border-color: var(--nx-danger); }
    .nx-toast.warn { border-color: var(--nx-warning); }

    #nx-trigger {
      position: fixed;
      right: 15px;
      bottom: 15px;
      z-index: 2147483646;
      padding: 10px 13px;
      border: 1px solid var(--nx-border);
      border-radius: 7px;
      background: rgba(0,0,0,.92);
      color: var(--nx-accent);
      cursor: pointer;
      font: 900 11px Consolas, monospace;
      box-shadow: 0 0 20px rgba(139,0,255,.24);
    }

    #nx-trigger:hover {
      background: var(--nx-border);
      color: #fff;
    }

    #nx-inspector-overlay {
      position: fixed;
      z-index: 2147483645;
      display: none;
      pointer-events: none;
      border: 2px solid var(--nx-accent);
      background: rgba(0,255,204,.08);
      box-shadow: 0 0 20px rgba(0,255,204,.28);
    }

    @media (max-width: 680px) {
      #nx-hud {
        top: 8px;
        left: 8px;
        width: calc(100vw - 16px);
        height: calc(100vh - 16px);
        resize: none;
      }

      .nx-card,
      .nx-card.wide {
        grid-column: 1 / -1;
      }

      .nx-log-entry {
        grid-template-columns: 62px 48px minmax(0, 1fr);
      }
    }
  `;

  function injectStyles() {
    if ($("#nx-v10-styles")) return;
    const style = document.createElement("style");
    style.id = "nx-v10-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildDOM() {
    if ($("#nx-hud")) return;

    const root = document.createElement("div");

    root.innerHTML = `
      <div id="nx-hud" class="nx-hidden">
        <div id="nx-header">
          <div class="nx-brand">
            <span class="nx-status-dot"></span>
            <span class="nx-brand-title">NULL X // DEVELOPER ENVIRONMENT</span>
            <span class="nx-brand-version">v${CONFIG.version}</span>
          </div>
          <div class="nx-header-actions">
            <button class="nx-icon-btn" id="nx-minimize" title="Minimize">—</button>
            <button class="nx-icon-btn" id="nx-close" title="Close">×</button>
          </div>
        </div>

        <div id="nx-tabs">
          <button class="nx-tab-btn active" data-tab="overview">Overview</button>
          <button class="nx-tab-btn" data-tab="performance">Performance</button>
          <button class="nx-tab-btn" data-tab="network">Network</button>
          <button class="nx-tab-btn" data-tab="storage">Storage</button>
          <button class="nx-tab-btn" data-tab="console">Console</button>
          <button class="nx-tab-btn" data-tab="inspector">Inspector</button>
          <button class="nx-tab-btn" data-tab="tools">Tools</button>
        </div>

        <div id="nx-content">
          <section id="nx-tab-overview" class="nx-tab-pane active">
            <div class="nx-grid">
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">Uptime</span>
                  <span class="nx-stat-value" id="nx-up">00:00:00</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">FPS</span>
                  <span class="nx-stat-value" id="nx-fps">0</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">DOM Nodes</span>
                  <span class="nx-stat-value" id="nx-dom-count">0</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">Load Time</span>
                  <span class="nx-stat-value" id="nx-load-time">N/A</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">Resources</span>
                  <span class="nx-stat-value" id="nx-resource-count">0</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">Errors</span>
                  <span class="nx-stat-value" id="nx-error-count">0</span>
                </div>
              </div>

              <div class="nx-card wide">
                <div class="nx-card-title">Runtime</div>
                <div class="nx-row"><span>Viewport</span><span id="nx-viewport">-</span></div>
                <div class="nx-row"><span>Page URL</span><span id="nx-url">-</span></div>
                <div class="nx-row"><span>Document state</span><span id="nx-ready-state">-</span></div>
                <div class="nx-row"><span>Online</span><span id="nx-online">-</span></div>
                <div class="nx-row"><span>Language</span><span id="nx-language">-</span></div>
                <div class="nx-row"><span>Timezone</span><span id="nx-timezone">-</span></div>
              </div>

              <div class="nx-card">
                <div class="nx-card-title">Quick Actions</div>
                <div class="nx-buttons">
                  <button class="nx-btn" id="nx-copy-url">Copy URL</button>
                  <button class="nx-btn" id="nx-copy-stats">Copy Stats</button>
                  <button class="nx-btn" id="nx-refresh">Reload Page</button>
                  <button class="nx-btn" id="nx-open-tour">Start Site Tour</button>
                </div>
              </div>

              <div class="nx-card full">
                <div class="nx-card-title">Browser</div>
                <div class="nx-row"><span>User agent</span><span id="nx-ua">-</span></div>
                <div class="nx-row"><span>Platform</span><span id="nx-platform">-</span></div>
                <div class="nx-row"><span>Cookies enabled</span><span id="nx-cookies">-</span></div>
                <div class="nx-row"><span>Hardware concurrency</span><span id="nx-cores">-</span></div>
              </div>
            </div>
          </section>

          <section id="nx-tab-performance" class="nx-tab-pane">
            <div class="nx-grid">
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">First Paint</span>
                  <span class="nx-stat-value" id="nx-fp">N/A</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">First Contentful Paint</span>
                  <span class="nx-stat-value" id="nx-fcp">N/A</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">DOM Interactive</span>
                  <span class="nx-stat-value" id="nx-dom-interactive">N/A</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">Transfer Size</span>
                  <span class="nx-stat-value" id="nx-transfer-size">N/A</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">JS Heap</span>
                  <span class="nx-stat-value" id="nx-heap">N/A</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">Long Tasks</span>
                  <span class="nx-stat-value" id="nx-longtasks">0</span>
                </div>
              </div>

              <div class="nx-card full">
                <div class="nx-card-title">Navigation Timing</div>
                <div id="nx-nav-timing"></div>
              </div>

              <div class="nx-card full">
                <div class="nx-toolbar">
                  <span class="nx-title" style="margin:0;flex:1">Slowest Resources</span>
                  <button class="nx-btn" id="nx-refresh-resources">Refresh</button>
                  <button class="nx-btn" id="nx-export-resources">Export JSON</button>
                </div>
                <div class="nx-scroll">
                  <table class="nx-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Resource</th>
                        <th>Duration</th>
                        <th>Transfer</th>
                      </tr>
                    </thead>
                    <tbody id="nx-resource-table"></tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section id="nx-tab-network" class="nx-tab-pane">
            <div class="nx-toolbar">
              <input id="nx-request-filter" class="nx-input" placeholder="Filter URL, method, or status">
              <button class="nx-btn" id="nx-clear-requests">Clear</button>
              <button class="nx-btn" id="nx-export-requests">Export JSON</button>
            </div>
            <div class="nx-scroll">
              <table class="nx-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Duration</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody id="nx-request-table"></tbody>
              </table>
            </div>
          </section>

          <section id="nx-tab-storage" class="nx-tab-pane">
            <div class="nx-grid">
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">LocalStorage Keys</span>
                  <span class="nx-stat-value" id="nx-ls-count">0</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">SessionStorage Keys</span>
                  <span class="nx-stat-value" id="nx-ss-count">0</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">Estimated Usage</span>
                  <span class="nx-stat-value" id="nx-storage-usage">N/A</span>
                </div>
              </div>
              <div class="nx-card">
                <div class="nx-stat">
                  <span class="nx-stat-label">Service Workers</span>
                  <span class="nx-stat-value" id="nx-sw-count">N/A</span>
                </div>
              </div>

              <div class="nx-card full">
                <div class="nx-toolbar">
                  <span class="nx-title" style="margin:0;flex:1">LocalStorage</span>
                  <button class="nx-btn" id="nx-ls-refresh">Refresh</button>
                  <button class="nx-btn" id="nx-ls-export">Export</button>
                  <button class="nx-btn" id="nx-ls-import">Import</button>
                  <button class="nx-btn danger" id="nx-ls-clear">Clear</button>
                </div>
                <div class="nx-scroll">
                  <table class="nx-table">
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Value</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody id="nx-ls-table"></tbody>
                  </table>
                </div>
              </div>

              <div class="nx-card full">
                <div class="nx-card-title">Storage and Cache Tools</div>
                <div class="nx-buttons">
                  <button class="nx-btn" id="nx-copy-storage">Copy Storage JSON</button>
                  <button class="nx-btn warning" id="nx-clear-cookies">Clear Site Cookies</button>
                  <button class="nx-btn warning" id="nx-clear-caches">Clear Cache Storage</button>
                  <button class="nx-btn danger" id="nx-clear-sw">Unregister Service Workers</button>
                </div>
              </div>
            </div>
          </section>

          <section id="nx-tab-console" class="nx-tab-pane">
            <div class="nx-toolbar">
              <select class="nx-select" id="nx-log-filter" style="max-width:135px">
                <option value="all">All logs</option>
                <option value="log">Logs</option>
                <option value="info">Info</option>
                <option value="warn">Warnings</option>
                <option value="error">Errors</option>
              </select>
              <button class="nx-btn" id="nx-clear-logs">Clear</button>
              <button class="nx-btn" id="nx-export-logs">Export JSON</button>
            </div>
            <div class="nx-log" id="nx-log-output"></div>
            <div class="nx-toolbar" style="margin-top:10px">
              <input id="nx-console-input" class="nx-input" placeholder="Run a JavaScript expression in this page">
              <button class="nx-btn" id="nx-console-run">Run</button>
            </div>
          </section>

          <section id="nx-tab-inspector" class="nx-tab-pane">
            <div class="nx-grid">
              <div class="nx-card full">
                <div class="nx-toolbar">
                  <button class="nx-btn" id="nx-inspect-toggle">Start Element Picker</button>
                  <button class="nx-btn" id="nx-copy-selector">Copy Selector</button>
                  <button class="nx-btn" id="nx-copy-html">Copy Outer HTML</button>
                </div>
                <div class="nx-row"><span>Selected element</span><span id="nx-selected-tag">None</span></div>
                <div class="nx-row"><span>CSS selector</span><span id="nx-selected-selector">None</span></div>
              </div>

              <div class="nx-card full">
                <div class="nx-card-title">Element Details</div>
                <div class="nx-code" id="nx-inspector-details">Start the element picker, then click anything on the page.</div>
              </div>
            </div>
          </section>

          <section id="nx-tab-tools" class="nx-tab-pane">
            <div class="nx-grid">
              <div class="nx-card wide">
                <div class="nx-card-title">Site Actions</div>
                <div class="nx-buttons">
                  <button class="nx-btn" id="nx-hard-reload">Hard Reload</button>
                  <button class="nx-btn" id="nx-force-guest">Force Guest Mode</button>
                  <button class="nx-btn" id="nx-cycle-theme">Cycle Theme</button>
                  <button class="nx-btn" id="nx-version">Show Version</button>
                  <button class="nx-btn" id="nx-calculator">Open Calculator</button>
                  <button class="nx-btn" id="nx-scroll-top">Scroll to Top</button>
                  <button class="nx-btn" id="nx-scroll-bottom">Scroll to Bottom</button>
                  <button class="nx-btn" id="nx-toggle-fullscreen">Toggle Fullscreen</button>
                </div>
              </div>

              <div class="nx-card">
                <div class="nx-card-title">Page Utilities</div>
                <div class="nx-buttons">
                  <button class="nx-btn" id="nx-copy-title">Copy Title</button>
                  <button class="nx-btn" id="nx-copy-html-page">Copy Page HTML</button>
                  <button class="nx-btn" id="nx-download-html">Download HTML</button>
                  <button class="nx-btn" id="nx-reset-tour">Reset Site Tour</button>
                </div>
              </div>

              <div class="nx-card full">
                <div class="nx-card-title">Custom Command</div>
                <textarea id="nx-command-input" class="nx-textarea" placeholder="Example: document.body.dataset.debug = 'true'"></textarea>
                <div class="nx-toolbar" style="margin:8px 0 0">
                  <button class="nx-btn" id="nx-command-run">Run Command</button>
                  <button class="nx-btn" id="nx-command-clear">Clear</button>
                </div>
                <div class="nx-code" id="nx-command-output">Ready.</div>
              </div>

              <div class="nx-card full">
                <div class="nx-card-title" style="color:var(--nx-danger)">Danger Zone</div>
                <div class="nx-buttons">
                  <button class="nx-btn danger" id="nx-emergency-reload">Emergency Reload</button>
                  <button class="nx-btn danger" id="nx-remove-site-caches">Clear Caches and Reload</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <button id="nx-trigger">DEBUG [~]</button>
      <div id="nx-inspector-overlay"></div>
      <div class="nx-toast-wrap" id="nx-toast-wrap"></div>
    `;

    document.body.appendChild(root);
  }

  function toast(message, type = "info") {
    const wrap = $("#nx-toast-wrap");
    if (!wrap) return;

    const item = document.createElement("div");
    item.className = `nx-toast ${type}`;
    item.textContent = message;
    wrap.appendChild(item);

    setTimeout(() => {
      item.remove();
    }, 3200);
  }

  function download(filename, value, mime = "application/json") {
    const blob = new Blob([value], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  async function copy(value, success = "Copied to clipboard") {
    try {
      await navigator.clipboard.writeText(String(value));
      toast(success, "success");
    } catch {
      window.prompt("Copy this value", String(value));
    }
  }

  function addLog(type, args) {
    const message = args
      .map((value) => {
        if (value instanceof Error) return value.stack || value.message;
        if (typeof value === "object") return safeJSON(value);
        return String(value);
      })
      .join(" ");

    STATE.logs.push({
      time: Date.now(),
      type,
      message
    });

    if (STATE.logs.length > CONFIG.maxLogs) STATE.logs.shift();

    if (type === "error") {
      STATE.errors.push({
        time: Date.now(),
        message
      });

      if (STATE.errors.length > CONFIG.maxLogs) STATE.errors.shift();
    }

    renderLogs();
    updateOverview();
  }

  function patchConsole() {
    if (STATE.consolePatched) return;
    STATE.consolePatched = true;

    ["log", "info", "warn", "error"].forEach((type) => {
      const original = console[type].bind(console);

      console[type] = (...args) => {
        original(...args);
        addLog(type, args);
      };
    });

    window.addEventListener("error", (event) => {
      addLog("error", [
        `${event.message || "Unhandled error"} at ${event.filename || "unknown"}:${event.lineno || 0}:${event.colno || 0}`
      ]);
    });

    window.addEventListener("unhandledrejection", (event) => {
      addLog("error", [
        `Unhandled promise rejection: ${
          event.reason?.stack || event.reason?.message || String(event.reason)
        }`
      ]);
    });
  }

  function addRequest(entry) {
    STATE.requests.unshift(entry);
    if (STATE.requests.length > CONFIG.maxRequests) STATE.requests.pop();
    renderRequests();
  }

  function patchNetwork() {
    if (STATE.networkPatched) return;
    STATE.networkPatched = true;

    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const started = performance.now();
      const request = args[0];
      const options = args[1] || {};
      const url = typeof request === "string" ? request : request?.url || "Unknown request";
      const method = options.method || request?.method || "GET";

      try {
        const response = await originalFetch(...args);

        addRequest({
          time: Date.now(),
          method: String(method).toUpperCase(),
          status: response.status,
          duration: performance.now() - started,
          url
        });

        return response;
      } catch (error) {
        addRequest({
          time: Date.now(),
          method: String(method).toUpperCase(),
          status: "ERR",
          duration: performance.now() - started,
          url
        });

        throw error;
      }
    };

    const OriginalXHR = window.XMLHttpRequest;

    function TrackedXHR() {
      const xhr = new OriginalXHR();
      let method = "GET";
      let url = "";

      const originalOpen = xhr.open;

      xhr.open = function (requestMethod, requestUrl, ...rest) {
        method = requestMethod || "GET";
        url = requestUrl || "";
        return originalOpen.call(this, requestMethod, requestUrl, ...rest);
      };

      xhr.addEventListener("loadstart", () => {
        xhr.__nxStarted = performance.now();
      });

      xhr.addEventListener("loadend", () => {
        addRequest({
          time: Date.now(),
          method: String(method).toUpperCase(),
          status: xhr.status || "ERR",
          duration: performance.now() - (xhr.__nxStarted || performance.now()),
          url
        });
      });

      return xhr;
    }

    TrackedXHR.prototype = OriginalXHR.prototype;
    window.XMLHttpRequest = TrackedXHR;
  }

  function updateFPS() {
    STATE.frames++;

    const now = performance.now();

    if (now - STATE.lastFpsTime >= 1000) {
      STATE.fps = Math.round((STATE.frames * 1000) / (now - STATE.lastFpsTime));
      STATE.frames = 0;
      STATE.lastFpsTime = now;
    }

    requestAnimationFrame(updateFPS);
  }

  function formatUptime() {
    const seconds = Math.floor((Date.now() - STATE.startTime) / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remaining = seconds % 60;

    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(remaining).padStart(2, "0")
    ].join(":");
  }

  function getNavigation() {
    return performance.getEntriesByType("navigation")[0] || null;
  }

  function getPaint(name) {
    const entry = performance.getEntriesByName(name)[0];
    return entry ? entry.startTime : null;
  }

  function getHeap() {
    const memory = performance.memory;
    if (!memory) return null;

    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit
    };
  }

  function setValue(id, value, className = "") {
    const element = document.getElementById(id);
    if (!element) return;
    element.textContent = value;
    element.className = `nx-stat-value ${className}`.trim();
  }

  async function updateStorageStats() {
    $("#nx-ls-count").textContent = String(localStorage.length);
    $("#nx-ss-count").textContent = String(sessionStorage.length);

    try {
      if (navigator.storage?.estimate) {
        const estimate = await navigator.storage.estimate();
        $("#nx-storage-usage").textContent = `${bytes(estimate.usage || 0)} / ${bytes(estimate.quota || 0)}`;
      } else {
        $("#nx-storage-usage").textContent = "Unsupported";
      }
    } catch {
      $("#nx-storage-usage").textContent = "Unavailable";
    }

    try {
      if (navigator.serviceWorker?.getRegistrations) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        $("#nx-sw-count").textContent = String(registrations.length);
      } else {
        $("#nx-sw-count").textContent = "Unsupported";
      }
    } catch {
      $("#nx-sw-count").textContent = "Unavailable";
    }
  }

  function updateOverview() {
    const navigation = getNavigation();
    const heap = getHeap();
    const resourceCount = performance.getEntriesByType("resource").length;
    const loadTime = navigation?.loadEventEnd ? navigation.loadEventEnd : navigation?.duration;

    $("#nx-up").textContent = formatUptime();
    setValue("nx-fps", String(STATE.fps), STATE.fps >= 50 ? "good" : STATE.fps >= 25 ? "warn" : "bad");
    $("#nx-dom-count").textContent = String(document.getElementsByTagName("*").length);
    $("#nx-load-time").textContent = duration(loadTime);
    $("#nx-resource-count").textContent = String(resourceCount);
    setValue("nx-error-count", String(STATE.errors.length), STATE.errors.length ? "bad" : "good");

    $("#nx-viewport").textContent = `${window.innerWidth} × ${window.innerHeight}`;
    $("#nx-url").textContent = location.href;
    $("#nx-ready-state").textContent = document.readyState;
    $("#nx-online").innerHTML = navigator.onLine
      ? '<span class="nx-pill good">ONLINE</span>'
      : '<span class="nx-pill bad">OFFLINE</span>';
    $("#nx-language").textContent = navigator.language || "Unknown";
    $("#nx-timezone").textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";

    $("#nx-ua").textContent = navigator.userAgent;
    $("#nx-platform").textContent = navigator.platform || "Unknown";
    $("#nx-cookies").textContent = navigator.cookieEnabled ? "Enabled" : "Disabled";
    $("#nx-cores").textContent = navigator.hardwareConcurrency || "Unknown";

    $("#nx-fp").textContent = duration(getPaint("first-paint"));
    $("#nx-fcp").textContent = duration(getPaint("first-contentful-paint"));
    $("#nx-dom-interactive").textContent = duration(navigation?.domInteractive);
    $("#nx-transfer-size").textContent = bytes(navigation?.transferSize);
    $("#nx-heap").textContent = heap ? `${bytes(heap.used)} / ${bytes(heap.limit)}` : "Unsupported";
    $("#nx-longtasks").textContent = String(performance.getEntriesByType("longtask").length);

    renderNavigationTiming();
  }

  function renderNavigationTiming() {
    const container = $("#nx-nav-timing");
    const nav = getNavigation();

    if (!container) return;

    if (!nav) {
      container.innerHTML = '<div class="nx-row"><span>Navigation Timing</span><span>Unavailable</span></div>';
      return;
    }

    const rows = [
      ["Type", nav.type || "navigate"],
      ["Redirects", nav.redirectCount ?? 0],
      ["DNS", duration(nav.domainLookupEnd - nav.domainLookupStart)],
      ["TCP", duration(nav.connectEnd - nav.connectStart)],
      ["TLS", duration(nav.connectEnd - nav.secureConnectionStart)],
      ["Request", duration(nav.responseStart - nav.requestStart)],
      ["Response", duration(nav.responseEnd - nav.responseStart)],
      ["DOM processing", duration(nav.domComplete - nav.domInteractive)],
      ["DOM complete", duration(nav.domComplete)],
      ["Load event", duration(nav.loadEventEnd || nav.duration)]
    ];

    container.innerHTML = rows
      .map(([key, value]) => `<div class="nx-row"><span>${escapeHTML(key)}</span><span>${escapeHTML(value)}</span></div>`)
      .join("");
  }

  function resourceRows() {
    return performance
      .getEntriesByType("resource")
      .slice()
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 100)
      .map((entry) => ({
        type: entry.initiatorType || "other",
        name: entry.name,
        duration: entry.duration,
        transferSize: entry.transferSize
      }));
  }

  function renderResources() {
    const table = $("#nx-resource-table");
    if (!table) return;

    const rows = resourceRows();

    table.innerHTML = rows.length
      ? rows
          .map(
            (entry) => `
              <tr>
                <td>${escapeHTML(entry.type)}</td>
                <td title="${escapeHTML(entry.name)}">${escapeHTML(entry.name)}</td>
                <td>${escapeHTML(duration(entry.duration))}</td>
                <td>${escapeHTML(bytes(entry.transferSize))}</td>
              </tr>
            `
          )
          .join("")
      : '<tr><td colspan="4">No resource timing entries available.</td></tr>';
  }

  function renderRequests() {
    const table = $("#nx-request-table");
    const filter = ($("#nx-request-filter")?.value || "").toLowerCase();

    if (!table) return;

    const rows = STATE.requests.filter((entry) =>
      `${entry.method} ${entry.status} ${entry.url}`.toLowerCase().includes(filter)
    );

    table.innerHTML = rows.length
      ? rows
          .map((entry) => {
            const statusClass =
              entry.status === "ERR" || Number(entry.status) >= 400
                ? "bad"
                : Number(entry.status) >= 300
                  ? "warn"
                  : "good";

            return `
              <tr>
                <td>${escapeHTML(time(entry.time))}</td>
                <td>${escapeHTML(entry.method)}</td>
                <td><span class="nx-pill ${statusClass}">${escapeHTML(entry.status)}</span></td>
                <td>${escapeHTML(duration(entry.duration))}</td>
                <td title="${escapeHTML(entry.url)}">${escapeHTML(entry.url)}</td>
              </tr>
            `;
          })
          .join("")
      : '<tr><td colspan="5">No tracked requests yet.</td></tr>';
  }

  function getStorageEntries(storage) {
    const entries = [];

    for (let index = 0; index < storage.length; index++) {
      const key = storage.key(index);
      entries.push([key, storage.getItem(key)]);
    }

    return entries.sort(([a], [b]) => a.localeCompare(b));
  }

  function storageAsObject(storage = localStorage) {
    return Object.fromEntries(getStorageEntries(storage));
  }

  function renderLocalStorage() {
    const table = $("#nx-ls-table");
    if (!table) return;

    const entries = getStorageEntries(localStorage);

    table.innerHTML = entries.length
      ? entries
          .map(
            ([key, value]) => `
              <tr>
                <td title="${escapeHTML(key)}">${escapeHTML(key)}</td>
                <td title="${escapeHTML(value)}">${escapeHTML(value)}</td>
                <td><button class="nx-btn danger nx-delete-ls" data-key="${escapeHTML(encodeURIComponent(key))}">Delete</button></td>
              </tr>
            `
          )
          .join("")
      : '<tr><td colspan="3">LocalStorage is empty.</td></tr>';

    $$(".nx-delete-ls").forEach((button) => {
      button.addEventListener("click", () => {
        const key = decodeURIComponent(button.dataset.key);

        if (!confirm(`Delete localStorage key "${key}"?`)) return;

        localStorage.removeItem(key);
        renderLocalStorage();
        updateStorageStats();
        toast(`Deleted ${key}`, "success");
      });
    });
  }

  function renderLogs() {
    const output = $("#nx-log-output");
    if (!output) return;

    const filter = $("#nx-log-filter")?.value || "all";
    const logs = STATE.logs.filter((entry) => filter === "all" || entry.type === filter);

    output.innerHTML = logs.length
      ? logs
          .map(
            (entry) => `
              <div class="nx-log-entry ${escapeHTML(entry.type)}">
                <span class="nx-log-time">${escapeHTML(time(entry.time))}</span>
                <span class="nx-log-type">${escapeHTML(entry.type.toUpperCase())}</span>
                <span class="nx-log-message">${escapeHTML(entry.message)}</span>
              </div>
            `
          )
          .join("")
      : "No captured logs.";

    output.scrollTop = output.scrollHeight;
  }

  function selectorFor(element) {
    if (!element || element.nodeType !== 1) return "";

    if (element.id) return `#${CSS.escape(element.id)}`;

    const parts = [];

    while (element && element.nodeType === 1 && element !== document.body) {
      let part = element.tagName.toLowerCase();

      if (element.classList.length) {
        part += `.${[...element.classList].slice(0, 2).map(CSS.escape).join(".")}`;
      }

      const siblings = [...element.parentElement?.children || []].filter(
        (child) => child.tagName === element.tagName
      );

      if (siblings.length > 1) {
        part += `:nth-of-type(${siblings.indexOf(element) + 1})`;
      }

      parts.unshift(part);
      const result = parts.join(" > ");

      try {
        if (document.querySelectorAll(result).length === 1) return result;
      } catch {}

      element = element.parentElement;
    }

    return `body > ${parts.join(" > ")}`;
  }

  function inspectElement(element) {
    if (!element || element.id === "nx-hud" || element.closest("#nx-hud, #nx-trigger, #nx-toast-wrap")) return;

    STATE.selectedElement = element;

    const selector = selectorFor(element);
    const styles = getComputedStyle(element);
    const attributes = [...element.attributes]
      .map((attribute) => `${attribute.name}="${attribute.value}"`)
      .join(" ");

    $("#nx-selected-tag").textContent = `<${element.tagName.toLowerCase()}>`;
    $("#nx-selected-selector").textContent = selector || "Unavailable";

    $("#nx-inspector-details").textContent = [
      `Tag: ${element.tagName.toLowerCase()}`,
      `ID: ${element.id || "(none)"}`,
      `Classes: ${element.className || "(none)"}`,
      `Selector: ${selector || "(unavailable)"}`,
      `Size: ${Math.round(element.getBoundingClientRect().width)} × ${Math.round(element.getBoundingClientRect().height)}`,
      `Position: ${styles.position}`,
      `Display: ${styles.display}`,
      `Visibility: ${styles.visibility}`,
      `Color: ${styles.color}`,
      `Background: ${styles.backgroundColor}`,
      `Attributes: ${attributes || "(none)"}`,
      "",
      element.outerHTML.slice(0, 5000)
    ].join("\n");

    $("#nx-inspector-overlay").style.display = "none";
    toast("Element selected", "success");
  }

  function setPicker(active) {
    const overlay = $("#nx-inspector-overlay");
    const button = $("#nx-inspect-toggle");

    if (!active) {
      STATE.selectedElement = STATE.selectedElement;
      document.body.classList.remove("nx-picker-active");
      overlay.style.display = "none";
      button.textContent = "Start Element Picker";
      return;
    }

    document.body.classList.add("nx-picker-active");
    button.textContent = "Stop Element Picker";

    const move = (event) => {
      if (!document.body.classList.contains("nx-picker-active")) return;

      const target = document.elementFromPoint(event.clientX, event.clientY);

      if (!target || target.closest("#nx-hud, #nx-trigger, #nx-toast-wrap")) {
        overlay.style.display = "none";
        return;
      }

      const rect = target.getBoundingClientRect();

      Object.assign(overlay.style, {
        display: "block",
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`
      });
    };

    const select = (event) => {
      if (!document.body.classList.contains("nx-picker-active")) return;

      const target = document.elementFromPoint(event.clientX, event.clientY);

      if (!target || target.closest("#nx-hud, #nx-trigger, #nx-toast-wrap")) return;

      event.preventDefault();
      event.stopPropagation();
      setPicker(false);
      inspectElement(target);
    };

    const stop = () => {
      document.removeEventListener("mousemove", move, true);
      document.removeEventListener("click", select, true);
      document.removeEventListener("keydown", escape, true);
    };

    const escape = (event) => {
      if (event.key !== "Escape") return;
      setPicker(false);
      stop();
    };

    document.addEventListener("mousemove", move, true);
    document.addEventListener("click", select, true);
    document.addEventListener("keydown", escape, true);

    const currentSetPicker = setPicker;

    setPicker = function patchedSetPicker(next) {
      if (!next) stop();
      return currentSetPicker(next);
    };
  }

  function togglePanel(force) {
    const hud = $("#nx-hud");
    const trigger = $("#nx-trigger");

    STATE.visible = typeof force === "boolean" ? force : !STATE.visible;
    hud.classList.toggle("nx-hidden", !STATE.visible);
    trigger.classList.toggle("nx-hidden", STATE.visible);

    if (STATE.visible) {
      updateAll();
      $("#nx-console-input")?.focus();
    }
  }

  function switchTab(tab) {
    STATE.activeTab = tab;

    $$(".nx-tab-btn").forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === tab);
    });

    $$(".nx-tab-pane").forEach((pane) => {
      pane.classList.toggle("active", pane.id === `nx-tab-${tab}`);
    });

    updateAll();
  }

  function updateAll() {
    updateOverview();
    updateStorageStats();
    renderResources();
    renderRequests();
    renderLocalStorage();
    renderLogs();
  }

  function exportResources() {
    const data = resourceRows().map((entry) => ({
      type: entry.type,
      url: entry.name,
      durationMs: Number(entry.duration.toFixed(2)),
      transferSize: entry.transferSize
    }));

    download("nullx-resources.json", JSON.stringify(data, null, 2));
    toast("Resource data exported", "success");
  }

  async function clearCaches() {
    if (!("caches" in window)) {
      toast("Cache Storage is unsupported", "warn");
      return;
    }

    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    toast(`Cleared ${keys.length} cache store(s)`, "success");
  }

  async function unregisterWorkers() {
    if (!navigator.serviceWorker?.getRegistrations) {
      toast("Service workers are unsupported", "warn");
      return;
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
    toast(`Unregistered ${registrations.length} worker(s)`, "success");
    updateStorageStats();
  }

  function initEvents() {
    const hud = $("#nx-hud");
    const trigger = $("#nx-trigger");
    const header = $("#nx-header");

    trigger.addEventListener("click", () => togglePanel());
    $("#nx-close").addEventListener("click", () => togglePanel(false));
    $("#nx-minimize").addEventListener("click", () => togglePanel(false));

    window.addEventListener("keydown", (event) => {
      if ((event.key === "`" || event.key === "~") && !event.ctrlKey && !event.metaKey) {
        const tag = document.activeElement?.tagName?.toLowerCase();

        if (tag === "input" || tag === "textarea" || tag === "select") return;

        event.preventDefault();
        togglePanel();
      }
    });

    $$(".nx-tab-btn").forEach((button) => {
      button.addEventListener("click", () => switchTab(button.dataset.tab));
    });

    header.addEventListener("mousedown", (event) => {
      if (event.target.closest("button")) return;

      STATE.isDragging = true;
      STATE.dragX = event.clientX - hud.offsetLeft;
      STATE.dragY = event.clientY - hud.offsetTop;
    });

    window.addEventListener("mousemove", (event) => {
      if (!STATE.isDragging) return;

      const left = Math.max(0, Math.min(window.innerWidth - 160, event.clientX - STATE.dragX));
      const top = Math.max(0, Math.min(window.innerHeight - 50, event.clientY - STATE.dragY));

      hud.style.left = `${left}px`;
      hud.style.top = `${top}px`;
    });

    window.addEventListener("mouseup", () => {
      STATE.isDragging = false;
    });

    $("#nx-copy-url").addEventListener("click", () => copy(location.href));
    $("#nx-copy-title").addEventListener("click", () => copy(document.title || "", "Title copied"));
    $("#nx-refresh").addEventListener("click", () => location.reload());
    $("#nx-hard-reload").addEventListener("click", () => location.reload());
    $("#nx-emergency-reload").addEventListener("click", () => location.reload());

    $("#nx-copy-stats").addEventListener("click", () => {
      const nav = getNavigation();

      copy([
        `URL: ${location.href}`,
        `Viewport: ${window.innerWidth}x${window.innerHeight}`,
        `FPS: ${STATE.fps}`,
        `DOM nodes: ${document.getElementsByTagName("*").length}`,
        `Resources: ${performance.getEntriesByType("resource").length}`,
        `Load time: ${duration(nav?.loadEventEnd || nav?.duration)}`,
        `Errors: ${STATE.errors.length}`,
        `LocalStorage keys: ${localStorage.length}`,
        `SessionStorage keys: ${sessionStorage.length}`
      ].join("\n"), "Stats copied");
    });

    $("#nx-open-tour").addEventListener("click", () => {
      $("#start-tour-btn")?.click();
      toast("Site Tour started", "success");
    });

    $("#nx-refresh-resources").addEventListener("click", renderResources);
    $("#nx-export-resources").addEventListener("click", exportResources);

    $("#nx-request-filter").addEventListener("input", renderRequests);
    $("#nx-clear-requests").addEventListener("click", () => {
      STATE.requests = [];
      renderRequests();
      toast("Request log cleared", "success");
    });

    $("#nx-export-requests").addEventListener("click", () => {
      download("nullx-network-log.json", JSON.stringify(STATE.requests, null, 2));
      toast("Network log exported", "success");
    });

    $("#nx-ls-refresh").addEventListener("click", () => {
      renderLocalStorage();
      updateStorageStats();
    });

    $("#nx-ls-export").addEventListener("click", () => {
      download("nullx-localstorage.json", JSON.stringify(storageAsObject(), null, 2));
      toast("LocalStorage exported", "success");
    });

    $("#nx-ls-import").addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json,.json";

      input.addEventListener("change", async () => {
        const file = input.files?.[0];
        if (!file) return;

        try {
          const data = JSON.parse(await file.text());

          if (!data || Array.isArray(data) || typeof data !== "object") {
            throw new Error("Expected a JSON object");
          }

          Object.entries(data).forEach(([key, value]) => {
            localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
          });

          renderLocalStorage();
          updateStorageStats();
          toast("LocalStorage imported", "success");
        } catch (error) {
          toast(`Import failed: ${error.message}`, "error");
        }
      });

      input.click();
    });

    $("#nx-ls-clear").addEventListener("click", () => {
      if (!confirm("Clear all localStorage for this site?")) return;

      localStorage.clear();
      renderLocalStorage();
      updateStorageStats();
      toast("LocalStorage cleared", "success");
    });

    $("#nx-copy-storage").addEventListener("click", () => {
      copy(JSON.stringify(storageAsObject(), null, 2), "Storage JSON copied");
    });

    $("#nx-clear-cookies").addEventListener("click", () => {
      if (!confirm("Clear cookies accessible to this page?")) return;

      document.cookie.split(";").forEach((item) => {
        const key = item.split("=")[0]?.trim();
        if (!key) return;

        document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });

      toast("Accessible cookies cleared", "success");
    });

    $("#nx-clear-caches").addEventListener("click", async () => {
      if (!confirm("Clear Cache Storage for this site?")) return;
      await clearCaches();
    });

    $("#nx-clear-sw").addEventListener("click", async () => {
      if (!confirm("Unregister all service workers for this site?")) return;
      await unregisterWorkers();
    });

    $("#nx-log-filter").addEventListener("change", renderLogs);

    $("#nx-clear-logs").addEventListener("click", () => {
      STATE.logs = [];
      STATE.errors = [];
      renderLogs();
      updateOverview();
      toast("Console log cleared", "success");
    });

    $("#nx-export-logs").addEventListener("click", () => {
      download("nullx-console-log.json", JSON.stringify(STATE.logs, null, 2));
      toast("Console log exported", "success");
    });

    const runConsole = () => {
      const input = $("#nx-console-input");
      const source = input.value.trim();
      if (!source) return;

      addLog("info", [`> ${source}`]);

      try {
        const result = Function(`"use strict"; return (${source})`)();
        if (result !== undefined) addLog("log", [result]);
      } catch (expressionError) {
        try {
          const result = Function(`"use strict"; ${source}`)();
          if (result !== undefined) addLog("log", [result]);
        } catch (statementError) {
          addLog("error", [statementError]);
        }
      }

      input.value = "";
    };

    $("#nx-console-run").addEventListener("click", runConsole);
    $("#nx-console-input").addEventListener("keydown", (event) => {
      if (event.key === "Enter") runConsole();
    });

    $("#nx-inspect-toggle").addEventListener("click", () => {
      const active = !document.body.classList.contains("nx-picker-active");
      setPicker(active);
    });

    $("#nx-copy-selector").addEventListener("click", () => {
      if (!STATE.selectedElement) {
        toast("Select an element first", "warn");
        return;
      }

      copy(selectorFor(STATE.selectedElement), "Selector copied");
    });

    $("#nx-copy-html").addEventListener("click", () => {
      if (!STATE.selectedElement) {
        toast("Select an element first", "warn");
        return;
      }

      copy(STATE.selectedElement.outerHTML, "Outer HTML copied");
    });

    $("#nx-force-guest").addEventListener("click", () => {
      if (!confirm("Remove the local signed-in user and reload?")) return;

      localStorage.removeItem("chatUser");
      localStorage.removeItem("username");
      location.reload();
    });

    $("#nx-cycle-theme").addEventListener("click", () => {
      const themes = ["default", "dark", "light", "neon", "matrix", "purple"];
      const current = localStorage.getItem("nullx-theme") || localStorage.getItem("selectedTheme") || "default";
      const index = themes.indexOf(current);
      const next = themes[(index + 1) % themes.length];

      localStorage.setItem("nullx-theme", next);
      localStorage.setItem("selectedTheme", next);

      if (typeof window.applyTheme === "function") window.applyTheme(next);

      document.documentElement.setAttribute("data-theme", next);
      document.body.setAttribute("data-theme", next);
      toast(`Theme: ${next}`, "success");
    });

    $("#nx-version").addEventListener("click", async () => {
      try {
        const response = await fetch("version.json", { cache: "no-store" });
        const data = await response.json();
        alert(`Version: ${data.version || JSON.stringify(data)}`);
      } catch {
        toast("Could not load version.json", "error");
      }
    });

    $("#nx-calculator").addEventListener("click", () => {
      const nav = $("#nav-calculator") || $("#nav-terminal");

      if (nav) {
        nav.click();
        toast("Calculator opened", "success");
      } else {
        location.href = "calculator/index.html";
      }
    });

    $("#nx-scroll-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    $("#nx-scroll-bottom").addEventListener("click", () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));

    $("#nx-toggle-fullscreen").addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else {
          await document.documentElement.requestFullscreen();
        }
      } catch {
        toast("Fullscreen was blocked or unsupported", "warn");
      }
    });

    $("#nx-copy-html-page").addEventListener("click", () => copy(document.documentElement.outerHTML, "Page HTML copied"));

    $("#nx-download-html").addEventListener("click", () => {
      download("nullx-page-snapshot.html", document.documentElement.outerHTML, "text/html");
      toast("HTML snapshot downloaded", "success");
    });

    $("#nx-reset-tour").addEventListener("click", () => {
      localStorage.removeItem("hasSeenNullXTour");
      toast("Site Tour reset", "success");
    });

    const runCommand = () => {
      const source = $("#nx-command-input").value.trim();
      const output = $("#nx-command-output");

      if (!source) {
        output.textContent = "Enter a command first.";
        return;
      }

      try {
        const result = Function(`"use strict"; ${source}`)();
        output.textContent = result === undefined ? "Command completed." : safeJSON(result);
        addLog("info", [`Custom command ran: ${source}`]);
      } catch (error) {
        output.textContent = `${error.name}: ${error.message}`;
        addLog("error", [error]);
      }
    };

    $("#nx-command-run").addEventListener("click", runCommand);
    $("#nx-command-clear").addEventListener("click", () => {
      $("#nx-command-input").value = "";
      $("#nx-command-output").textContent = "Ready.";
    });

    $("#nx-remove-site-caches").addEventListener("click", async () => {
      if (!confirm("Clear Cache Storage, unregister workers, then reload?")) return;

      await clearCaches();
      await unregisterWorkers();
      location.reload();
    });
  }

  function initLongTaskObserver() {
    if (!("PerformanceObserver" in window)) return;

    try {
      STATE.observer = new PerformanceObserver(() => updateOverview());
      STATE.observer.observe({ entryTypes: ["longtask", "resource", "paint", "navigation"] });
    } catch {}
  }

  function init() {
    injectStyles();
    buildDOM();
    patchConsole();
    patchNetwork();
    initEvents();
    initLongTaskObserver();
    updateFPS();
    updateAll();

    STATE.refreshTimer = setInterval(() => {
      if (STATE.visible) updateAll();
    }, 1000);

    window.__NULLX_DEVTOOLS__ = {
      version: CONFIG.version,
      toggle: () => togglePanel(),
      show: () => togglePanel(true),
      hide: () => togglePanel(false),
      refresh: updateAll,
      log: (...args) => addLog("info", args),
      inspect: inspectElement,
      state: STATE
    };

    console.info(`NULL X DevTools v${CONFIG.version} online.`);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
