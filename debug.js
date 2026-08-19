(function NullXDevTools() {
  "use strict";

  if (window.__NULLX_DEVTOOLS__) {
    window.__NULLX_DEVTOOLS__.toggle();
    return;
  }

  const CONFIG = {
    version: "10.2.0",
    maxLogs: 300,
    maxRequests: 200,
    theme: {
      bg: "rgba(5,5,10,.985)",
      panel: "rgba(20,12,31,.96)",
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
    selectedElement: null,
    pickerActive: false,
    pickerHandlers: null,
    networkPatched: false,
    consolePatched: false,
    isDragging: false,
    dragX: 0,
    dragY: 0,
    fun: {
      lagEnabled: false,
      lagMs: 180,
      lagTimer: null,
      cssNuked: false,
      sheetStates: [],
      matrixEnabled: false,
      matrixCanvas: null,
      matrixFrame: null,
      matrixResize: null,
      randomStyle: null
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  const bytes = (value) => {
    if (!Number.isFinite(value) || value < 0) return "N/A";
    const units = ["B", "KB", "MB", "GB"];
    let amount = value;
    let index = 0;
    while (amount >= 1024 && index < units.length - 1) {
      amount /= 1024;
      index++;
    }
    return `${amount.toFixed(index ? 2 : 0)} ${units[index]}`;
  };
  const duration = (value) => !Number.isFinite(value) ? "N/A" : value < 1000 ? `${Math.round(value)} ms` : `${(value / 1000).toFixed(2)} s`;
  const clock = (value = Date.now()) => new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const safeJSON = (value) => {
    try { return typeof value === "string" ? value : JSON.stringify(value, null, 2); }
    catch { return String(value); }
  };

  const css = `
    :root{--nx-bg:${CONFIG.theme.bg};--nx-panel:${CONFIG.theme.panel};--nx-border:${CONFIG.theme.border};--nx-accent:${CONFIG.theme.accent};--nx-text:${CONFIG.theme.text};--nx-muted:${CONFIG.theme.muted};--nx-danger:${CONFIG.theme.danger};--nx-warning:${CONFIG.theme.warning};--nx-success:${CONFIG.theme.success}}
    .nx-hidden{display:none!important}
    #nx-hud,#nx-trigger,#nx-inspector-overlay{box-sizing:border-box;font-family:Consolas,"Cascadia Code",monospace}
    #nx-hud{position:fixed;top:18px;left:18px;width:min(880px,calc(100vw - 36px));height:min(690px,calc(100vh - 36px));min-height:420px;background:var(--nx-bg);border:1px solid var(--nx-border);border-radius:12px;color:var(--nx-text);z-index:2147483647;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 65px rgba(0,0,0,.72),0 0 35px rgba(139,0,255,.28);backdrop-filter:blur(16px);resize:both}
    #nx-header{min-height:46px;padding:0 14px;background:linear-gradient(90deg,rgba(139,0,255,.18),rgba(0,255,204,.05));border-bottom:1px solid rgba(139,0,255,.55);cursor:move;display:flex;align-items:center;justify-content:space-between;user-select:none}
    .nx-brand,.nx-header-actions{display:flex;align-items:center;gap:10px}.nx-brand-title{color:var(--nx-accent);font-size:12px;font-weight:900;letter-spacing:1px}.nx-brand-version,.nx-muted{color:var(--nx-muted);font-size:10px}.nx-status-dot{width:9px;height:9px;border-radius:50%;background:var(--nx-success);box-shadow:0 0 12px var(--nx-success)}
    .nx-icon-btn{width:27px;height:27px;border:1px solid rgba(255,255,255,.16);background:rgba(0,0,0,.35);color:var(--nx-text);border-radius:6px;cursor:pointer;font:inherit}.nx-icon-btn:hover{border-color:var(--nx-accent);color:var(--nx-accent)}#nx-close:hover{border-color:var(--nx-danger);color:var(--nx-danger)}
    #nx-tabs{display:flex;gap:3px;overflow-x:auto;padding:8px 8px 0;background:rgba(0,0,0,.4);border-bottom:1px solid rgba(255,255,255,.09)}.nx-tab-btn{border:1px solid transparent;border-bottom:none;padding:9px 12px;background:transparent;color:var(--nx-muted);border-radius:7px 7px 0 0;cursor:pointer;font:800 10px Consolas,monospace;white-space:nowrap}.nx-tab-btn:hover{color:#fff;background:rgba(255,255,255,.05)}.nx-tab-btn.active{color:var(--nx-accent);background:var(--nx-panel);border-color:rgba(139,0,255,.6);box-shadow:inset 0 2px 0 var(--nx-border)}
    #nx-content{flex:1;overflow:auto;padding:12px;background:radial-gradient(circle at 100% 0,rgba(139,0,255,.11),transparent 34%),rgba(4,4,8,.8)}.nx-tab-pane{display:none}.nx-tab-pane.active{display:block}.nx-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:10px}.nx-card{grid-column:span 4;min-width:0;border:1px solid rgba(255,255,255,.11);border-radius:8px;padding:10px;background:var(--nx-panel)}.nx-card.wide{grid-column:span 8}.nx-card.full{grid-column:1/-1}.nx-card-title,.nx-title{margin:0 0 9px;color:var(--nx-border);font-size:10px;font-weight:900;letter-spacing:.9px;text-transform:uppercase}.nx-stat{display:flex;flex-direction:column;gap:5px}.nx-stat-label{color:var(--nx-muted);font-size:10px;text-transform:uppercase}.nx-stat-value{color:#fff;font-size:17px;font-weight:900;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.good{color:var(--nx-success)!important}.warn{color:var(--nx-warning)!important}.bad{color:var(--nx-danger)!important}
    .nx-row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:7px 8px;margin-bottom:5px;border-radius:5px;background:rgba(255,255,255,.035);font-size:10px}.nx-row span:first-child{color:var(--nx-muted)}.nx-row span:last-child{color:#fff;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.nx-buttons{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:7px}.nx-btn{min-height:33px;padding:8px 10px;border:1px solid rgba(255,255,255,.16);border-radius:6px;background:rgba(0,0,0,.48);color:var(--nx-text);cursor:pointer;font:800 10px Consolas,monospace;text-align:left;text-transform:uppercase}.nx-btn:hover{color:var(--nx-accent);border-color:var(--nx-accent);background:rgba(0,255,204,.06)}.nx-btn.danger:hover{color:var(--nx-danger);border-color:var(--nx-danger)}.nx-btn.warning:hover{color:var(--nx-warning);border-color:var(--nx-warning)}
    .nx-input,.nx-select,.nx-textarea{width:100%;border:1px solid rgba(255,255,255,.16);border-radius:6px;box-sizing:border-box;padding:8px;background:rgba(0,0,0,.52);color:#fff;outline:none;font:10px Consolas,monospace}.nx-input:focus,.nx-select:focus,.nx-textarea:focus{border-color:var(--nx-accent)}.nx-textarea{min-height:120px;resize:vertical;line-height:1.45}.nx-toolbar{display:flex;flex-wrap:wrap;gap:7px;align-items:center;margin-bottom:10px}.nx-toolbar .nx-input{flex:1 1 190px}.nx-log,.nx-code{max-height:340px;overflow:auto;padding:8px;border:1px solid rgba(255,255,255,.11);border-radius:7px;background:rgba(0,0,0,.52);color:#c9c6d1;font:10px/1.5 Consolas,monospace;white-space:pre-wrap;word-break:break-word}.nx-log-entry{display:grid;grid-template-columns:70px 58px minmax(0,1fr);gap:8px;padding:5px 2px;border-bottom:1px solid rgba(255,255,255,.05)}.nx-log-time{color:var(--nx-muted)}.nx-log-type{font-weight:900}.nx-log-entry.error .nx-log-type{color:var(--nx-danger)}.nx-log-entry.warn .nx-log-type{color:var(--nx-warning)}.nx-log-entry.info .nx-log-type{color:var(--nx-accent)}.nx-log-entry.log .nx-log-type{color:var(--nx-success)}
    .nx-scroll{overflow:auto;border:1px solid rgba(255,255,255,.11);border-radius:7px}.nx-table{width:100%;min-width:620px;border-collapse:collapse;font-size:10px}.nx-table th{position:sticky;top:0;padding:8px;background:#15101d;color:var(--nx-accent);text-align:left;text-transform:uppercase;font-size:9px}.nx-table td{max-width:320px;padding:7px 8px;border-bottom:1px solid rgba(255,255,255,.07);color:#ddd;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.nx-pill{display:inline-flex;border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:3px 7px;font-size:9px;font-weight:900}.nx-pill.good{border-color:rgba(56,229,140,.45)}.nx-pill.warn{border-color:rgba(255,186,73,.45)}.nx-pill.bad{border-color:rgba(255,59,99,.45)}
    .nx-toast-wrap{position:fixed;right:16px;bottom:70px;display:flex;flex-direction:column;gap:7px;z-index:2147483647;pointer-events:none}.nx-toast{min-width:220px;max-width:340px;padding:10px 12px;border:1px solid var(--nx-border);border-radius:7px;background:rgba(9,6,15,.95);color:#fff;box-shadow:0 12px 35px rgba(0,0,0,.55);font:11px Consolas,monospace}.nx-toast.success{border-color:var(--nx-success)}.nx-toast.error{border-color:var(--nx-danger)}.nx-toast.warn{border-color:var(--nx-warning)}
    #nx-trigger{position:fixed;right:15px;bottom:15px;z-index:2147483646;padding:10px 13px;border:1px solid var(--nx-border);border-radius:7px;background:rgba(0,0,0,.92);color:var(--nx-accent);cursor:pointer;font:900 11px Consolas,monospace;box-shadow:0 0 20px rgba(139,0,255,.24)}#nx-trigger:hover{background:var(--nx-border);color:#fff}#nx-inspector-overlay{position:fixed;z-index:2147483645;display:none;pointer-events:none;border:2px solid var(--nx-accent);background:rgba(0,255,204,.08);box-shadow:0 0 20px rgba(0,255,204,.28)}
    #nx-matrix-canvas{position:fixed;inset:0;z-index:2147483000;pointer-events:none;opacity:.42;mix-blend-mode:screen}.nx-fun-grayscale{filter:grayscale(1)!important}.nx-fun-blur{filter:blur(3px)!important}.nx-fun-invert{filter:invert(1) hue-rotate(180deg)!important}.nx-fun-shake{animation:nx-shake .14s linear infinite!important}.nx-fun-spin{animation:nx-spin 4s linear infinite!important;transform-origin:center!important}.nx-fun-hide-images img,.nx-fun-hide-images video,.nx-fun-hide-images canvas:not(#nx-matrix-canvas){visibility:hidden!important}.nx-fun-disco{animation:nx-disco 1s linear infinite!important}@keyframes nx-shake{0%,100%{transform:translate(0)}25%{transform:translate(4px,-3px)}50%{transform:translate(-4px,3px)}75%{transform:translate(3px,4px)}}@keyframes nx-spin{from{transform:rotate(0deg) scale(.96)}to{transform:rotate(360deg) scale(.96)}}@keyframes nx-disco{0%{filter:hue-rotate(0) saturate(1.2)}50%{filter:hue-rotate(180deg) saturate(2.1)}100%{filter:hue-rotate(360deg) saturate(1.2)}}
    @media(max-width:680px){#nx-hud{top:8px;left:8px;width:calc(100vw - 16px);height:calc(100vh - 16px);resize:none}.nx-card,.nx-card.wide{grid-column:1/-1}.nx-log-entry{grid-template-columns:62px 48px minmax(0,1fr)}}
  `;

  function injectStyles() {
    if ($("#nx-v102-styles")) return;
    const style = document.createElement("style");
    style.id = "nx-v102-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildDOM() {
    if ($("#nx-hud")) return;
    const root = document.createElement("div");
    root.innerHTML = `
      <div id="nx-hud" class="nx-hidden">
        <div id="nx-header"><div class="nx-brand"><span class="nx-status-dot"></span><span class="nx-brand-title">NULL X // DEVELOPER ENVIRONMENT</span><span class="nx-brand-version">v${CONFIG.version}</span></div><div class="nx-header-actions"><button class="nx-icon-btn" id="nx-minimize">—</button><button class="nx-icon-btn" id="nx-close">×</button></div></div>
        <div id="nx-tabs"><button class="nx-tab-btn active" data-tab="overview">Overview</button><button class="nx-tab-btn" data-tab="performance">Performance</button><button class="nx-tab-btn" data-tab="network">Network</button><button class="nx-tab-btn" data-tab="storage">Storage</button><button class="nx-tab-btn" data-tab="console">Console</button><button class="nx-tab-btn" data-tab="inspector">Inspector</button><button class="nx-tab-btn" data-tab="tools">Tools</button></div>
        <div id="nx-content">
          <section id="nx-tab-overview" class="nx-tab-pane active"><div class="nx-grid">
            <div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">Uptime</span><span class="nx-stat-value" id="nx-up">00:00:00</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">FPS</span><span class="nx-stat-value" id="nx-fps">0</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">DOM Nodes</span><span class="nx-stat-value" id="nx-dom-count">0</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">Load Time</span><span class="nx-stat-value" id="nx-load-time">N/A</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">Resources</span><span class="nx-stat-value" id="nx-resource-count">0</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">Errors</span><span class="nx-stat-value" id="nx-error-count">0</span></div></div>
            <div class="nx-card wide"><div class="nx-card-title">Runtime</div><div class="nx-row"><span>Viewport</span><span id="nx-viewport">-</span></div><div class="nx-row"><span>Page URL</span><span id="nx-url">-</span></div><div class="nx-row"><span>State</span><span id="nx-ready-state">-</span></div><div class="nx-row"><span>Online</span><span id="nx-online">-</span></div><div class="nx-row"><span>Timezone</span><span id="nx-timezone">-</span></div></div>
            <div class="nx-card"><div class="nx-card-title">Quick Actions</div><div class="nx-buttons"><button class="nx-btn" id="nx-copy-url">Copy URL</button><button class="nx-btn" id="nx-copy-stats">Copy Stats</button><button class="nx-btn" id="nx-refresh">Reload</button><button class="nx-btn" id="nx-open-tour">Start Tour</button></div></div>
            <div class="nx-card full"><div class="nx-card-title">Browser</div><div class="nx-row"><span>User agent</span><span id="nx-ua">-</span></div><div class="nx-row"><span>Platform</span><span id="nx-platform">-</span></div><div class="nx-row"><span>Cookies</span><span id="nx-cookies">-</span></div><div class="nx-row"><span>CPU threads</span><span id="nx-cores">-</span></div></div>
          </div></section>
          <section id="nx-tab-performance" class="nx-tab-pane"><div class="nx-grid"><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">First Paint</span><span class="nx-stat-value" id="nx-fp">N/A</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">FCP</span><span class="nx-stat-value" id="nx-fcp">N/A</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">DOM Interactive</span><span class="nx-stat-value" id="nx-dom-interactive">N/A</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">Transfer</span><span class="nx-stat-value" id="nx-transfer-size">N/A</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">JS Heap</span><span class="nx-stat-value" id="nx-heap">N/A</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">Long Tasks</span><span class="nx-stat-value" id="nx-longtasks">0</span></div></div><div class="nx-card full"><div class="nx-card-title">Navigation Timing</div><div id="nx-nav-timing"></div></div><div class="nx-card full"><div class="nx-toolbar"><span class="nx-title" style="margin:0;flex:1">Slowest Resources</span><button class="nx-btn" id="nx-refresh-resources">Refresh</button><button class="nx-btn" id="nx-export-resources">Export</button></div><div class="nx-scroll"><table class="nx-table"><thead><tr><th>Type</th><th>Resource</th><th>Duration</th><th>Transfer</th></tr></thead><tbody id="nx-resource-table"></tbody></table></div></div></div></section>
          <section id="nx-tab-network" class="nx-tab-pane"><div class="nx-toolbar"><input id="nx-request-filter" class="nx-input" placeholder="Filter URL, method, or status"><button class="nx-btn" id="nx-clear-requests">Clear</button><button class="nx-btn" id="nx-export-requests">Export</button></div><div class="nx-scroll"><table class="nx-table"><thead><tr><th>Time</th><th>Method</th><th>Status</th><th>Duration</th><th>URL</th></tr></thead><tbody id="nx-request-table"></tbody></table></div></section>
          <section id="nx-tab-storage" class="nx-tab-pane"><div class="nx-grid"><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">LocalStorage</span><span class="nx-stat-value" id="nx-ls-count">0</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">SessionStorage</span><span class="nx-stat-value" id="nx-ss-count">0</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">Usage</span><span class="nx-stat-value" id="nx-storage-usage">N/A</span></div></div><div class="nx-card"><div class="nx-stat"><span class="nx-stat-label">Workers</span><span class="nx-stat-value" id="nx-sw-count">N/A</span></div></div><div class="nx-card full"><div class="nx-toolbar"><span class="nx-title" style="margin:0;flex:1">LocalStorage</span><button class="nx-btn" id="nx-ls-refresh">Refresh</button><button class="nx-btn" id="nx-ls-export">Export</button><button class="nx-btn" id="nx-ls-import">Import</button><button class="nx-btn danger" id="nx-ls-clear">Clear</button></div><div class="nx-scroll"><table class="nx-table"><thead><tr><th>Key</th><th>Value</th><th>Action</th></tr></thead><tbody id="nx-ls-table"></tbody></table></div></div><div class="nx-card full"><div class="nx-buttons"><button class="nx-btn" id="nx-copy-storage">Copy Storage</button><button class="nx-btn warning" id="nx-clear-cookies">Clear Cookies</button><button class="nx-btn warning" id="nx-clear-caches">Clear Caches</button><button class="nx-btn danger" id="nx-clear-sw">Unregister SW</button></div></div></div></section>
          <section id="nx-tab-console" class="nx-tab-pane"><div class="nx-toolbar"><select class="nx-select" id="nx-log-filter" style="max-width:135px"><option value="all">All logs</option><option value="log">Logs</option><option value="info">Info</option><option value="warn">Warnings</option><option value="error">Errors</option></select><button class="nx-btn" id="nx-clear-logs">Clear</button><button class="nx-btn" id="nx-export-logs">Export</button></div><div class="nx-log" id="nx-log-output"></div><div class="nx-toolbar" style="margin-top:10px"><input id="nx-console-input" class="nx-input" placeholder="Run JavaScript on this page"><button class="nx-btn" id="nx-console-run">Run</button></div></section>
          <section id="nx-tab-inspector" class="nx-tab-pane"><div class="nx-grid"><div class="nx-card full"><div class="nx-toolbar"><button class="nx-btn" id="nx-inspect-toggle">Start Element Picker</button><button class="nx-btn" id="nx-copy-selector">Copy Selector</button><button class="nx-btn" id="nx-copy-html">Copy Outer HTML</button></div><div class="nx-row"><span>Selected element</span><span id="nx-selected-tag">None</span></div><div class="nx-row"><span>CSS selector</span><span id="nx-selected-selector">None</span></div></div><div class="nx-card full"><div class="nx-card-title">Element Details</div><div class="nx-code" id="nx-inspector-details">Start the element picker, then click anything on the page.</div></div></div></section>
          <section id="nx-tab-tools" class="nx-tab-pane"><div class="nx-grid"><div class="nx-card wide"><div class="nx-card-title">Site Actions</div><div class="nx-buttons"><button class="nx-btn" id="nx-hard-reload">Hard Reload</button><button class="nx-btn" id="nx-force-guest">Force Guest</button><button class="nx-btn" id="nx-cycle-theme">Cycle Theme</button><button class="nx-btn" id="nx-version">Show Version</button><button class="nx-btn" id="nx-calculator">Calculator</button><button class="nx-btn" id="nx-scroll-top">Scroll Top</button><button class="nx-btn" id="nx-scroll-bottom">Scroll Bottom</button><button class="nx-btn" id="nx-toggle-fullscreen">Fullscreen</button></div></div><div class="nx-card"><div class="nx-card-title">Page Utilities</div><div class="nx-buttons"><button class="nx-btn" id="nx-copy-title">Copy Title</button><button class="nx-btn" id="nx-copy-html-page">Copy HTML</button><button class="nx-btn" id="nx-download-html">Download HTML</button><button class="nx-btn" id="nx-reset-tour">Reset Tour</button></div></div><div class="nx-card full"><div class="nx-card-title">Fun Page Utilities</div><div class="nx-buttons"><button class="nx-btn warning" id="nx-lag-toggle">Simulate Lag: Off</button><button class="nx-btn warning" id="nx-css-nuke">Nuke CSS</button><button class="nx-btn" id="nx-grayscale">Grayscale</button><button class="nx-btn" id="nx-blur-page">Blur</button><button class="nx-btn" id="nx-invert-page">Invert</button><button class="nx-btn" id="nx-shake-page">Shake</button><button class="nx-btn" id="nx-spin-page">Spin</button><button class="nx-btn" id="nx-hide-images">Hide Images</button><button class="nx-btn" id="nx-disco-page">Disco Mode</button><button class="nx-btn" id="nx-matrix-rain">Matrix Rain</button><button class="nx-btn" id="nx-random-colors">Random Colors</button><button class="nx-btn danger" id="nx-reset-fun">Reset Effects</button></div><div class="nx-row" style="margin-top:10px"><span>Lag amount</span><span><input id="nx-lag-range" type="range" min="25" max="1000" step="25" value="180" style="width:170px;accent-color:#8b00ff"><span id="nx-lag-value">180 ms</span></span></div></div><div class="nx-card full"><div class="nx-card-title">Custom Command</div><textarea id="nx-command-input" class="nx-textarea" placeholder="Example: document.body.dataset.debug = 'true'"></textarea><div class="nx-toolbar" style="margin:8px 0 0"><button class="nx-btn" id="nx-command-run">Run Command</button><button class="nx-btn" id="nx-command-clear">Clear</button></div><div class="nx-code" id="nx-command-output">Ready.</div></div><div class="nx-card full"><div class="nx-card-title" style="color:var(--nx-danger)">Danger Zone</div><div class="nx-buttons"><button class="nx-btn danger" id="nx-emergency-reload">Emergency Reload</button><button class="nx-btn danger" id="nx-remove-site-caches">Clear Caches + Reload</button></div></div></div></section>
        </div>
      </div><button id="nx-trigger">DEBUG [~]</button><div id="nx-inspector-overlay"></div><div class="nx-toast-wrap" id="nx-toast-wrap"></div>`;
    document.body.appendChild(root);
  }

  function toast(message, type = "info") {
    const wrap = $("#nx-toast-wrap");
    if (!wrap) return;
    const item = document.createElement("div");
    item.className = `nx-toast ${type}`;
    item.textContent = message;
    wrap.appendChild(item);
    setTimeout(() => item.remove(), 3200);
  }

  function download(name, data, mime = "application/json") {
    const url = URL.createObjectURL(new Blob([data], { type: mime }));
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  async function copy(value, message = "Copied to clipboard") {
    try { await navigator.clipboard.writeText(String(value)); toast(message, "success"); }
    catch { window.prompt("Copy this value", String(value)); }
  }

  function addLog(type, args) {
    const message = args.map((value) => value instanceof Error ? (value.stack || value.message) : typeof value === "object" ? safeJSON(value) : String(value)).join(" ");
    STATE.logs.push({ time: Date.now(), type, message });
    if (STATE.logs.length > CONFIG.maxLogs) STATE.logs.shift();
    if (type === "error") {
      STATE.errors.push({ time: Date.now(), message });
      if (STATE.errors.length > CONFIG.maxLogs) STATE.errors.shift();
    }
    renderLogs();
  }

  function patchConsole() {
    if (STATE.consolePatched) return;
    STATE.consolePatched = true;
    ["log", "info", "warn", "error"].forEach((type) => {
      const original = console[type].bind(console);
      console[type] = (...args) => { original(...args); addLog(type, args); };
    });
    window.addEventListener("error", (event) => addLog("error", [`${event.message || "Unhandled error"} at ${event.filename || "unknown"}:${event.lineno || 0}`]));
    window.addEventListener("unhandledrejection", (event) => addLog("error", [`Unhandled promise rejection: ${event.reason?.stack || event.reason?.message || String(event.reason)}`]));
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
        addRequest({ time: Date.now(), method: String(method).toUpperCase(), status: response.status, duration: performance.now() - started, url });
        return response;
      } catch (error) {
        addRequest({ time: Date.now(), method: String(method).toUpperCase(), status: "ERR", duration: performance.now() - started, url });
        throw error;
      }
    };
    const OriginalXHR = window.XMLHttpRequest;
    function TrackedXHR() {
      const xhr = new OriginalXHR();
      let method = "GET";
      let url = "";
      const open = xhr.open;
      xhr.open = function(requestMethod, requestURL, ...rest) { method = requestMethod || "GET"; url = requestURL || ""; return open.call(this, requestMethod, requestURL, ...rest); };
      xhr.addEventListener("loadstart", () => { xhr.__nxStarted = performance.now(); });
      xhr.addEventListener("loadend", () => addRequest({ time: Date.now(), method: String(method).toUpperCase(), status: xhr.status || "ERR", duration: performance.now() - (xhr.__nxStarted || performance.now()), url }));
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

  function navigationEntry() { return performance.getEntriesByType("navigation")[0] || null; }
  function paint(name) { return performance.getEntriesByName(name)[0]?.startTime ?? null; }
  function uptime() { const seconds = Math.floor((Date.now() - STATE.startTime) / 1000); return [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60].map((n) => String(n).padStart(2, "0")).join(":"); }
  function storageObject(storage = localStorage) { return Object.fromEntries([...Array(storage.length)].map((_, i) => { const key = storage.key(i); return [key, storage.getItem(key)]; })); }
  function setStat(id, value, className = "") { const element = $(`#${id}`); if (element) { element.textContent = value; element.className = `nx-stat-value ${className}`.trim(); } }

  async function updateStorageStats() {
    $("#nx-ls-count").textContent = String(localStorage.length);
    $("#nx-ss-count").textContent = String(sessionStorage.length);
    try {
      const estimate = await navigator.storage?.estimate?.();
      $("#nx-storage-usage").textContent = estimate ? `${bytes(estimate.usage || 0)} / ${bytes(estimate.quota || 0)}` : "Unsupported";
    } catch { $("#nx-storage-usage").textContent = "Unavailable"; }
    try {
      const registrations = await navigator.serviceWorker?.getRegistrations?.();
      $("#nx-sw-count").textContent = registrations ? String(registrations.length) : "Unsupported";
    } catch { $("#nx-sw-count").textContent = "Unavailable"; }
  }

  function updateOverview() {
    const nav = navigationEntry();
    const memory = performance.memory;
    const load = nav?.loadEventEnd || nav?.duration;
    $("#nx-up").textContent = uptime();
    setStat("nx-fps", String(STATE.fps), STATE.fps >= 50 ? "good" : STATE.fps >= 25 ? "warn" : "bad");
    $("#nx-dom-count").textContent = String(document.getElementsByTagName("*").length);
    $("#nx-load-time").textContent = duration(load);
    $("#nx-resource-count").textContent = String(performance.getEntriesByType("resource").length);
    setStat("nx-error-count", String(STATE.errors.length), STATE.errors.length ? "bad" : "good");
    $("#nx-viewport").textContent = `${window.innerWidth} × ${window.innerHeight}`;
    $("#nx-url").textContent = location.href;
    $("#nx-ready-state").textContent = document.readyState;
    $("#nx-online").innerHTML = navigator.onLine ? '<span class="nx-pill good">ONLINE</span>' : '<span class="nx-pill bad">OFFLINE</span>';
    $("#nx-timezone").textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
    $("#nx-ua").textContent = navigator.userAgent;
    $("#nx-platform").textContent = navigator.platform || "Unknown";
    $("#nx-cookies").textContent = navigator.cookieEnabled ? "Enabled" : "Disabled";
    $("#nx-cores").textContent = navigator.hardwareConcurrency || "Unknown";
    $("#nx-fp").textContent = duration(paint("first-paint"));
    $("#nx-fcp").textContent = duration(paint("first-contentful-paint"));
    $("#nx-dom-interactive").textContent = duration(nav?.domInteractive);
    $("#nx-transfer-size").textContent = bytes(nav?.transferSize);
    $("#nx-heap").textContent = memory ? `${bytes(memory.usedJSHeapSize)} / ${bytes(memory.jsHeapSizeLimit)}` : "Unsupported";
    $("#nx-longtasks").textContent = String(performance.getEntriesByType("longtask").length);
    renderNavigationTiming();
  }

  function renderNavigationTiming() {
    const target = $("#nx-nav-timing");
    const nav = navigationEntry();
    if (!nav) { target.innerHTML = '<div class="nx-row"><span>Navigation</span><span>Unavailable</span></div>'; return; }
    const rows = [["Type", nav.type || "navigate"], ["Redirects", nav.redirectCount ?? 0], ["DNS", duration(nav.domainLookupEnd - nav.domainLookupStart)], ["TCP", duration(nav.connectEnd - nav.connectStart)], ["Request", duration(nav.responseStart - nav.requestStart)], ["Response", duration(nav.responseEnd - nav.responseStart)], ["DOM complete", duration(nav.domComplete)], ["Load event", duration(nav.loadEventEnd || nav.duration)]];
    target.innerHTML = rows.map(([key, value]) => `<div class="nx-row"><span>${escapeHTML(key)}</span><span>${escapeHTML(value)}</span></div>`).join("");
  }

  function resourceRows() { return performance.getEntriesByType("resource").slice().sort((a,b) => b.duration - a.duration).slice(0,100).map((entry) => ({ type: entry.initiatorType || "other", name: entry.name, duration: entry.duration, transfer: entry.transferSize })); }
  function renderResources() { const target = $("#nx-resource-table"); const rows = resourceRows(); target.innerHTML = rows.length ? rows.map((entry) => `<tr><td>${escapeHTML(entry.type)}</td><td title="${escapeHTML(entry.name)}">${escapeHTML(entry.name)}</td><td>${duration(entry.duration)}</td><td>${bytes(entry.transfer)}</td></tr>`).join("") : '<tr><td colspan="4">No resource timing entries.</td></tr>'; }
  function renderRequests() { const target = $("#nx-request-table"); const filter = $("#nx-request-filter").value.toLowerCase(); const rows = STATE.requests.filter((entry) => `${entry.method} ${entry.status} ${entry.url}`.toLowerCase().includes(filter)); target.innerHTML = rows.length ? rows.map((entry) => { const style = entry.status === "ERR" || Number(entry.status) >= 400 ? "bad" : Number(entry.status) >= 300 ? "warn" : "good"; return `<tr><td>${clock(entry.time)}</td><td>${escapeHTML(entry.method)}</td><td><span class="nx-pill ${style}">${escapeHTML(entry.status)}</span></td><td>${duration(entry.duration)}</td><td title="${escapeHTML(entry.url)}">${escapeHTML(entry.url)}</td></tr>`; }).join("") : '<tr><td colspan="5">No tracked requests yet.</td></tr>'; }
  function renderLocalStorage() { const target = $("#nx-ls-table"); const entries = Object.entries(storageObject()).sort(([a],[b]) => a.localeCompare(b)); target.innerHTML = entries.length ? entries.map(([key,value]) => `<tr><td title="${escapeHTML(key)}">${escapeHTML(key)}</td><td title="${escapeHTML(value)}">${escapeHTML(value)}</td><td><button class="nx-btn danger nx-delete-ls" data-key="${encodeURIComponent(key)}">Delete</button></td></tr>`).join("") : '<tr><td colspan="3">LocalStorage is empty.</td></tr>'; $$(".nx-delete-ls").forEach((button) => button.addEventListener("click", () => { const key = decodeURIComponent(button.dataset.key); if (confirm(`Delete "${key}"?`)) { localStorage.removeItem(key); renderLocalStorage(); updateStorageStats(); } })); }
  function renderLogs() { const target = $("#nx-log-output"); const filter = $("#nx-log-filter").value; const rows = STATE.logs.filter((entry) => filter === "all" || entry.type === filter); target.innerHTML = rows.length ? rows.map((entry) => `<div class="nx-log-entry ${entry.type}"><span class="nx-log-time">${clock(entry.time)}</span><span class="nx-log-type">${entry.type.toUpperCase()}</span><span>${escapeHTML(entry.message)}</span></div>`).join("") : "No captured logs."; target.scrollTop = target.scrollHeight; }

  function selectorFor(element) {
    if (!element || element.nodeType !== 1) return "";
    if (element.id) return `#${CSS.escape(element.id)}`;
    const parts = [];
    let current = element;
    while (current && current.nodeType === 1 && current !== document.body) {
      let part = current.tagName.toLowerCase();
      if (current.classList.length) part += `.${[...current.classList].slice(0,2).map(CSS.escape).join(".")}`;
      const siblings = [...(current.parentElement?.children || [])].filter((child) => child.tagName === current.tagName);
      if (siblings.length > 1) part += `:nth-of-type(${siblings.indexOf(current)+1})`;
      parts.unshift(part);
      const result = parts.join(" > ");
      try { if (document.querySelectorAll(result).length === 1) return result; } catch {}
      current = current.parentElement;
    }
    return `body > ${parts.join(" > ")}`;
  }

  function inspectElement(element) {
    if (!element || element.closest("#nx-hud,#nx-trigger,#nx-toast-wrap")) return;
    STATE.selectedElement = element;
    const selector = selectorFor(element);
    const style = getComputedStyle(element);
    $("#nx-selected-tag").textContent = `<${element.tagName.toLowerCase()}>`;
    $("#nx-selected-selector").textContent = selector || "Unavailable";
    $("#nx-inspector-details").textContent = [`Tag: ${element.tagName.toLowerCase()}`, `ID: ${element.id || "(none)"}`, `Classes: ${element.className || "(none)"}`, `Selector: ${selector}`, `Size: ${Math.round(element.getBoundingClientRect().width)} × ${Math.round(element.getBoundingClientRect().height)}`, `Position: ${style.position}`, `Display: ${style.display}`, `Color: ${style.color}`, `Background: ${style.backgroundColor}`, "", element.outerHTML.slice(0,5000)].join("\n");
    toast("Element selected", "success");
  }

  function stopPicker() {
    if (!STATE.pickerHandlers) return;
    const { move, select, escape } = STATE.pickerHandlers;
    document.removeEventListener("mousemove", move, true);
    document.removeEventListener("click", select, true);
    document.removeEventListener("keydown", escape, true);
    STATE.pickerHandlers = null;
    STATE.pickerActive = false;
    $("#nx-inspector-overlay").style.display = "none";
    $("#nx-inspect-toggle").textContent = "Start Element Picker";
  }

  function togglePicker() {
    if (STATE.pickerActive) { stopPicker(); return; }
    STATE.pickerActive = true;
    $("#nx-inspect-toggle").textContent = "Stop Element Picker";
    const overlay = $("#nx-inspector-overlay");
    const move = (event) => {
      const target = document.elementFromPoint(event.clientX,event.clientY);
      if (!target || target.closest("#nx-hud,#nx-trigger,#nx-toast-wrap")) { overlay.style.display = "none"; return; }
      const rect = target.getBoundingClientRect();
      Object.assign(overlay.style,{display:"block",top:`${rect.top}px`,left:`${rect.left}px`,width:`${rect.width}px`,height:`${rect.height}px`});
    };
    const select = (event) => {
      const target = document.elementFromPoint(event.clientX,event.clientY);
      if (!target || target.closest("#nx-hud,#nx-trigger,#nx-toast-wrap")) return;
      event.preventDefault(); event.stopPropagation(); stopPicker(); inspectElement(target);
    };
    const escape = (event) => { if (event.key === "Escape") stopPicker(); };
    STATE.pickerHandlers = { move, select, escape };
    document.addEventListener("mousemove",move,true); document.addEventListener("click",select,true); document.addEventListener("keydown",escape,true);
  }

  function updateFunButtons() { $("#nx-lag-toggle").textContent = `Simulate Lag: ${STATE.fun.lagEnabled ? "On" : "Off"}`; $("#nx-css-nuke").textContent = STATE.fun.cssNuked ? "Restore CSS" : "Nuke CSS"; }
  function busyWait(ms) { const end = performance.now() + ms; while (performance.now() < end) Math.sqrt(Math.random()*999999); }
  function toggleLag() { STATE.fun.lagEnabled = !STATE.fun.lagEnabled; clearInterval(STATE.fun.lagTimer); STATE.fun.lagTimer = null; if (STATE.fun.lagEnabled) { STATE.fun.lagTimer = setInterval(() => busyWait(STATE.fun.lagMs),260); toast(`Lag simulation enabled: ${STATE.fun.lagMs} ms`,"warn"); } else toast("Lag simulation disabled","success"); updateFunButtons(); }
  function toggleNukeCSS() { const protectedIds = new Set(["nx-v102-styles","nx-fun-runtime-styles"]); if (!STATE.fun.cssNuked) { STATE.fun.sheetStates = [...document.styleSheets].map((sheet) => ({sheet,disabled:sheet.disabled,id:sheet.ownerNode?.id || ""})).filter((item) => !protectedIds.has(item.id)); STATE.fun.sheetStates.forEach((item) => { try { item.sheet.disabled = true; } catch {} }); STATE.fun.cssNuked = true; toast("Site CSS disabled. Debug UI remains active.","warn"); } else { STATE.fun.sheetStates.forEach((item) => { try { item.sheet.disabled = item.disabled; } catch {} }); STATE.fun.sheetStates = []; STATE.fun.cssNuked = false; toast("Site CSS restored","success"); } updateFunButtons(); }
  function toggleBodyClass(name) { document.body.classList.toggle(name); }
  function randomColors() { if (!STATE.fun.randomStyle) { STATE.fun.randomStyle = document.createElement("style"); STATE.fun.randomStyle.id = "nx-fun-runtime-styles"; document.head.appendChild(STATE.fun.randomStyle); } const hue = Math.floor(Math.random()*360); const hue2 = (hue+130)%360; STATE.fun.randomStyle.textContent = `body{background:radial-gradient(circle at 20% 20%,hsl(${hue} 95% 26%),transparent 38%),radial-gradient(circle at 80% 70%,hsl(${hue2} 95% 24%),transparent 42%),#050509!important}body *:not(#nx-hud):not(#nx-hud *){border-color:hsl(${hue} 95% 55%)!important}`; toast("Random color blast applied","success"); }
  function stopMatrixRain(silent = false) { cancelAnimationFrame(STATE.fun.matrixFrame); if (STATE.fun.matrixResize) window.removeEventListener("resize",STATE.fun.matrixResize); STATE.fun.matrixCanvas?.remove(); STATE.fun.matrixEnabled = false; STATE.fun.matrixCanvas = null; STATE.fun.matrixFrame = null; STATE.fun.matrixResize = null; if (!silent) toast("Matrix rain disabled","success"); }
  function toggleMatrixRain() { if (STATE.fun.matrixEnabled) { stopMatrixRain(); return; } const canvas = document.createElement("canvas"); canvas.id = "nx-matrix-canvas"; document.body.appendChild(canvas); const ctx = canvas.getContext("2d"); const size = 16; let drops = []; const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; drops = Array(Math.ceil(canvas.width / size)).fill(1); }; const draw = () => { ctx.fillStyle = "rgba(0,0,0,.08)"; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.fillStyle = "#00ff77"; ctx.font = `${size}px monospace`; drops.forEach((drop,index) => { ctx.fillText(String.fromCharCode(0x30A0 + Math.random()*96),index*size,drop*size); if (drop*size > canvas.height && Math.random() > .975) drops[index] = 0; drops[index]++; }); STATE.fun.matrixFrame = requestAnimationFrame(draw); }; resize(); STATE.fun.matrixCanvas = canvas; STATE.fun.matrixResize = resize; STATE.fun.matrixEnabled = true; window.addEventListener("resize",resize); draw(); toast("Matrix rain enabled","success"); }
  function resetFunEffects() { clearInterval(STATE.fun.lagTimer); STATE.fun.lagTimer = null; STATE.fun.lagEnabled = false; if (STATE.fun.matrixEnabled) stopMatrixRain(true); if (STATE.fun.cssNuked) { STATE.fun.sheetStates.forEach((item) => { try { item.sheet.disabled = item.disabled; } catch {} }); STATE.fun.sheetStates = []; STATE.fun.cssNuked = false; } ["nx-fun-grayscale","nx-fun-blur","nx-fun-invert","nx-fun-shake","nx-fun-spin","nx-fun-hide-images","nx-fun-disco"].forEach((name) => document.body.classList.remove(name)); if (STATE.fun.randomStyle) STATE.fun.randomStyle.textContent = ""; updateFunButtons(); toast("All fun effects reset","success"); }

  async function clearCaches() { if (!("caches" in window)) { toast("Cache Storage unsupported","warn"); return; } const keys = await caches.keys(); await Promise.all(keys.map((key) => caches.delete(key))); toast(`Cleared ${keys.length} cache store(s)`,"success"); }
  async function unregisterWorkers() { if (!navigator.serviceWorker?.getRegistrations) { toast("Service workers unsupported","warn"); return; } const workers = await navigator.serviceWorker.getRegistrations(); await Promise.all(workers.map((worker) => worker.unregister())); toast(`Unregistered ${workers.length} worker(s)`,"success"); updateStorageStats(); }

  function togglePanel(force) { STATE.visible = typeof force === "boolean" ? force : !STATE.visible; $("#nx-hud").classList.toggle("nx-hidden",!STATE.visible); $("#nx-trigger").classList.toggle("nx-hidden",STATE.visible); if (STATE.visible) updateAll(); }
  function switchTab(tab) { STATE.activeTab = tab; $$(".nx-tab-btn").forEach((button) => button.classList.toggle("active",button.dataset.tab === tab)); $$(".nx-tab-pane").forEach((pane) => pane.classList.toggle("active",pane.id === `nx-tab-${tab}`)); updateAll(); }
  function updateAll() { updateOverview(); updateStorageStats(); renderResources(); renderRequests(); renderLocalStorage(); renderLogs(); }

  function initEvents() {
    const hud = $("#nx-hud");
    $("#nx-trigger").addEventListener("click",() => togglePanel());
    $("#nx-close").addEventListener("click",() => togglePanel(false));
    $("#nx-minimize").addEventListener("click",() => togglePanel(false));
    window.addEventListener("keydown",(event) => { if ((event.key === "`" || event.key === "~") && !event.ctrlKey && !event.metaKey) { const tag = document.activeElement?.tagName?.toLowerCase(); if (["input","textarea","select"].includes(tag)) return; event.preventDefault(); togglePanel(); } });
    $$(".nx-tab-btn").forEach((button) => button.addEventListener("click",() => switchTab(button.dataset.tab)));
    $("#nx-header").addEventListener("mousedown",(event) => { if (event.target.closest("button")) return; STATE.isDragging = true; STATE.dragX = event.clientX - hud.offsetLeft; STATE.dragY = event.clientY - hud.offsetTop; });
    window.addEventListener("mousemove",(event) => { if (!STATE.isDragging) return; hud.style.left = `${Math.max(0,Math.min(innerWidth-160,event.clientX-STATE.dragX))}px`; hud.style.top = `${Math.max(0,Math.min(innerHeight-50,event.clientY-STATE.dragY))}px`; });
    window.addEventListener("mouseup",() => { STATE.isDragging = false; });
    $("#nx-copy-url").addEventListener("click",() => copy(location.href));
    $("#nx-copy-stats").addEventListener("click",() => copy(`URL: ${location.href}\nViewport: ${innerWidth}x${innerHeight}\nFPS: ${STATE.fps}\nDOM nodes: ${document.getElementsByTagName("*").length}\nResources: ${performance.getEntriesByType("resource").length}\nErrors: ${STATE.errors.length}\nLocalStorage: ${localStorage.length}`,"Stats copied"));
    $("#nx-refresh").addEventListener("click",() => location.reload());
    $("#nx-open-tour").addEventListener("click",() => { $("#start-tour-btn")?.click(); toast("Site Tour started","success"); });
    $("#nx-refresh-resources").addEventListener("click",renderResources);
    $("#nx-export-resources").addEventListener("click",() => { download("nullx-resources.json",JSON.stringify(resourceRows(),null,2)); toast("Resources exported","success"); });
    $("#nx-request-filter").addEventListener("input",renderRequests);
    $("#nx-clear-requests").addEventListener("click",() => { STATE.requests=[]; renderRequests(); toast("Request log cleared","success"); });
    $("#nx-export-requests").addEventListener("click",() => { download("nullx-network-log.json",JSON.stringify(STATE.requests,null,2)); toast("Network log exported","success"); });
    $("#nx-ls-refresh").addEventListener("click",() => { renderLocalStorage(); updateStorageStats(); });
    $("#nx-ls-export").addEventListener("click",() => { download("nullx-localstorage.json",JSON.stringify(storageObject(),null,2)); toast("LocalStorage exported","success"); });
    $("#nx-ls-import").addEventListener("click",() => { const input=document.createElement("input"); input.type="file"; input.accept="application/json,.json"; input.addEventListener("change",async () => { const file=input.files?.[0]; if(!file)return; try { const data=JSON.parse(await file.text()); if(!data || Array.isArray(data) || typeof data!=="object") throw new Error("Expected a JSON object"); Object.entries(data).forEach(([key,value]) => localStorage.setItem(key,typeof value==="string"?value:JSON.stringify(value))); renderLocalStorage(); updateStorageStats(); toast("LocalStorage imported","success"); } catch(error) { toast(`Import failed: ${error.message}`,"error"); } }); input.click(); });
    $("#nx-ls-clear").addEventListener("click",() => { if(confirm("Clear all localStorage for this site?")){ localStorage.clear(); renderLocalStorage(); updateStorageStats(); toast("LocalStorage cleared","success"); } });
    $("#nx-copy-storage").addEventListener("click",() => copy(JSON.stringify(storageObject(),null,2),"Storage copied"));
    $("#nx-clear-cookies").addEventListener("click",() => { if(!confirm("Clear accessible cookies?"))return; document.cookie.split(";").forEach((item) => { const key=item.split("=")[0]?.trim(); if(key) document.cookie=`${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`; }); toast("Accessible cookies cleared","success"); });
    $("#nx-clear-caches").addEventListener("click",async () => { if(confirm("Clear Cache Storage?")) await clearCaches(); });
    $("#nx-clear-sw").addEventListener("click",async () => { if(confirm("Unregister service workers?")) await unregisterWorkers(); });
    $("#nx-log-filter").addEventListener("change",renderLogs);
    $("#nx-clear-logs").addEventListener("click",() => { STATE.logs=[]; STATE.errors=[]; renderLogs(); toast("Logs cleared","success"); });
    $("#nx-export-logs").addEventListener("click",() => { download("nullx-console-log.json",JSON.stringify(STATE.logs,null,2)); toast("Logs exported","success"); });
    const runConsole=() => { const input=$("#nx-console-input"); const source=input.value.trim(); if(!source)return; addLog("info",[`> ${source}`]); try { const result=Function(`"use strict"; return (${source})`)(); if(result!==undefined)addLog("log",[result]); } catch { try { const result=Function(`"use strict"; ${source}`)(); if(result!==undefined)addLog("log",[result]); } catch(error) { addLog("error",[error]); } } input.value=""; };
    $("#nx-console-run").addEventListener("click",runConsole); $("#nx-console-input").addEventListener("keydown",(event) => { if(event.key === "Enter")runConsole(); });
    $("#nx-inspect-toggle").addEventListener("click",togglePicker);
    $("#nx-copy-selector").addEventListener("click",() => STATE.selectedElement ? copy(selectorFor(STATE.selectedElement),"Selector copied") : toast("Select an element first","warn"));
    $("#nx-copy-html").addEventListener("click",() => STATE.selectedElement ? copy(STATE.selectedElement.outerHTML,"Outer HTML copied") : toast("Select an element first","warn"));
    $("#nx-hard-reload").addEventListener("click",() => location.reload());
    $("#nx-emergency-reload").addEventListener("click",() => location.reload());
    $("#nx-force-guest").addEventListener("click",() => { if(confirm("Remove local signed-in user and reload?")){ localStorage.removeItem("chatUser"); localStorage.removeItem("username"); location.reload(); } });
    $("#nx-cycle-theme").addEventListener("click",() => { const themes=["default","dark","light","neon","matrix","purple"]; const current=localStorage.getItem("nullx-theme") || localStorage.getItem("selectedTheme") || "default"; const next=themes[(themes.indexOf(current)+1)%themes.length]; localStorage.setItem("nullx-theme",next); localStorage.setItem("selectedTheme",next); if(typeof window.applyTheme === "function")window.applyTheme(next); document.documentElement.setAttribute("data-theme",next); document.body.setAttribute("data-theme",next); toast(`Theme: ${next}`,"success"); });
    $("#nx-version").addEventListener("click",async () => { try { const data=await (await fetch("version.json",{cache:"no-store"})).json(); alert(`Version: ${data.version || JSON.stringify(data)}`); } catch { toast("Could not load version.json","error"); } });
    $("#nx-calculator").addEventListener("click",() => { const nav=$("#nav-calculator") || $("#nav-terminal"); if(nav){nav.click();toast("Calculator opened","success");}else location.href="calculator/index.html"; });
    $("#nx-scroll-top").addEventListener("click",() => scrollTo({top:0,behavior:"smooth"})); $("#nx-scroll-bottom").addEventListener("click",() => scrollTo({top:document.body.scrollHeight,behavior:"smooth"}));
    $("#nx-toggle-fullscreen").addEventListener("click",async () => { try { document.fullscreenElement ? await document.exitFullscreen() : await document.documentElement.requestFullscreen(); } catch { toast("Fullscreen blocked or unsupported","warn"); } });
    $("#nx-copy-title").addEventListener("click",() => copy(document.title,"Title copied"));
    $("#nx-copy-html-page").addEventListener("click",() => copy(document.documentElement.outerHTML,"Page HTML copied"));
    $("#nx-download-html").addEventListener("click",() => { download("nullx-page-snapshot.html",document.documentElement.outerHTML,"text/html"); toast("HTML snapshot downloaded","success"); });
    $("#nx-reset-tour").addEventListener("click",() => { localStorage.removeItem("hasSeenNullXTour"); toast("Site Tour reset","success"); });
    $("#nx-lag-toggle").addEventListener("click",toggleLag);
    $("#nx-lag-range").addEventListener("input",(event) => { STATE.fun.lagMs=Number(event.target.value); $("#nx-lag-value").textContent=`${STATE.fun.lagMs} ms`; if(STATE.fun.lagEnabled){clearInterval(STATE.fun.lagTimer);STATE.fun.lagTimer=setInterval(() => busyWait(STATE.fun.lagMs),260);} });
    $("#nx-css-nuke").addEventListener("click",toggleNukeCSS); $("#nx-grayscale").addEventListener("click",() => toggleBodyClass("nx-fun-grayscale")); $("#nx-blur-page").addEventListener("click",() => toggleBodyClass("nx-fun-blur")); $("#nx-invert-page").addEventListener("click",() => toggleBodyClass("nx-fun-invert")); $("#nx-shake-page").addEventListener("click",() => toggleBodyClass("nx-fun-shake")); $("#nx-spin-page").addEventListener("click",() => toggleBodyClass("nx-fun-spin")); $("#nx-hide-images").addEventListener("click",() => toggleBodyClass("nx-fun-hide-images")); $("#nx-disco-page").addEventListener("click",() => toggleBodyClass("nx-fun-disco")); $("#nx-random-colors").addEventListener("click",randomColors); $("#nx-matrix-rain").addEventListener("click",toggleMatrixRain); $("#nx-reset-fun").addEventListener("click",resetFunEffects);
    const runCommand=() => { const source=$("#nx-command-input").value.trim(); const output=$("#nx-command-output"); if(!source){output.textContent="Enter a command first.";return;} try{const result=Function(`"use strict"; ${source}`)();output.textContent=result===undefined?"Command completed.":safeJSON(result);addLog("info",[`Custom command ran: ${source}`]);}catch(error){output.textContent=`${error.name}: ${error.message}`;addLog("error",[error]);} };
    $("#nx-command-run").addEventListener("click",runCommand); $("#nx-command-clear").addEventListener("click",() => { $("#nx-command-input").value=""; $("#nx-command-output").textContent="Ready."; });
    $("#nx-remove-site-caches").addEventListener("click",async () => { if(!confirm("Clear caches, unregister workers, then reload?"))return; await clearCaches(); await unregisterWorkers(); location.reload(); });
  }

  function init() {
    injectStyles(); buildDOM(); patchConsole(); patchNetwork(); initEvents(); updateFPS(); updateAll();
    setInterval(() => { if(STATE.visible) updateAll(); },1000);
    window.__NULLX_DEVTOOLS__ = { version:CONFIG.version, toggle:() => togglePanel(), show:() => togglePanel(true), hide:() => togglePanel(false), refresh:updateAll, log:(...args) => addLog("info",args), state:STATE };
    console.info(`NULL X DevTools v${CONFIG.version} online.`);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",init,{once:true}); else init();
})();
