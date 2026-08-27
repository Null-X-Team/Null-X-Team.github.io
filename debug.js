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
      bgFallback: "rgba(5,5,10,.985)",
      panelFallback: "rgba(20,12,31,.96)",
      borderFallback: "#8b00ff",
      accentFallback: "#00ffcc",
      textFallback: "#eeeeee",
      mutedFallback: "#9691a1",
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
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;")
    .replace(/'/g, "&#" + "039;");
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
    #nx-hud,#nx-trigger,#nx-inspector-overlay,#nx-toast-wrap,#nx-matrix-canvas,.nx-toast-wrap{
      --nx-bg:var(--bg-dashboard, ${CONFIG.theme.bgFallback});
      --nx-panel:var(--bg-sidebar, ${CONFIG.theme.panelFallback});
      --nx-border:var(--border-color, ${CONFIG.theme.borderFallback});
      --nx-accent:var(--accent-color, ${CONFIG.theme.accentFallback});
      --nx-text:var(--text-main, ${CONFIG.theme.textFallback});
      --nx-muted:var(--text-muted, ${CONFIG.theme.mutedFallback});
      --nx-danger:${CONFIG.theme.danger};
      --nx-warning:${CONFIG.theme.warning};
      --nx-success:${CONFIG.theme.success}
    }
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
    #nx-matrix-canvas{position:fixed;inset:0;z-index:2147483000;pointer-events:none;opacity:.42;mix-blend-mode:screen}.nx-fun-grayscale{filter:grayscale(1)!important}.nx-fun-blur{filter:blur(3px)!important}.nx-fun-invert{filter:invert(1) hue-rotate(180deg)!important}.nx-fun-shake{animation:nx-shake .14s linear infinite!important}.nx-fun-spin{animation:nx-spin 4s linear infinite!important;transform-origin:center!important}.nx-fun-hide-images img,.nx-fun-hide-images video,.nx-fun-hide-images canvas:not(#nx-matrix-canvas){visibility:hidden!important}.nx-fun-disco{animation:nx-disco 1s linear infinite!important}
    .nx-fun-vhs{filter:contrast(1.3) saturate(0.8);animation:nx-vhs-warp .12s linear infinite!important}
    .nx-fun-earthquake{animation:nx-quake .08s linear infinite!important}
    .nx-fun-pixel{image-rendering:pixelated!important;filter:blur(1px)!important}
    .nx-fun-rainbow{animation:nx-rainbow 3s linear infinite!important}
    .nx-fun-tilt{transform:rotate(1.5deg)!important}
    .nx-fun-ghost{opacity:.35!important}
    .nx-fun-mega-blur{filter:blur(8px)!important}
    .nx-fun-freeze *{animation:none!important;transition:none!important}
    .nx-fun-flip{transform:scaleX(-1)!important}
    .nx-fun-zoom{transform:scale(1.2)!important}
    .nx-fun-glow *{outline:1px solid #00ffcc!important;box-shadow:0 0 12px #8b00ff!important}
    .nx-fun-wire *{background:transparent!important;border:1px solid rgba(255,255,255,.2)!important}
    .nx-fun-vignette{box-shadow:inset 0 0 120px rgba(0,0,0,.9)!important}
    .nx-fun-darkroom{filter:brightness(.4) contrast(1.4)!important}
    .nx-fun-hologram{filter:hue-rotate(180deg) saturate(2) contrast(1.2)!important}
    .nx-fun-glitch{animation:nx-glitch .18s linear infinite!important}
    .nx-fun-lines{background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px);background-size:100% 3px}
    .nx-fun-grid{background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);background-size:40px 40px}
    @keyframes nx-shake{0%,100%{transform:translate(0)}25%{transform:translate(4px,-3px)}50%{transform:translate(-4px,3px)}75%{transform:translate(3px,4px)}}
    @keyframes nx-spin{from{transform:rotate(0deg) scale(.96)}to{transform:rotate(360deg) scale(.96)}}
    @keyframes nx-disco{0%{filter:hue-rotate(0) saturate(1.2)}50%{filter:hue-rotate(180deg) saturate(2.1)}100%{filter:hue-rotate(360deg) saturate(1.2)}}
    @keyframes nx-vhs-warp{0%{transform:translateX(0)}50%{transform:translateX(-2px)}100%{transform:translateX(0)}}
    @keyframes nx-quake{0%{transform:translate(0,0)}25%{transform:translate(5px,-3px)}50%{transform:translate(-4px,4px)}75%{transform:translate(3px,5px)}100%{transform:translate(0,0)}}
    @keyframes nx-rainbow{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}
    @keyframes nx-glitch{0%{transform:translate(0,0)}20%{transform:translate(-2px,1px)}40%{transform:translate(3px,-2px)}60%{transform:translate(-1px,2px)}80%{transform:translate(2px,-1px)}100%{transform:translate(0,0)}}
    @media(max-width:680px){#nx-hud{top:8px;left:8px;width:calc(100vw - 16px);height:calc(100vh - 16px);resize:none}.nx-card,.nx-card.wide{grid-column:1/-1}.nx-log-entry{grid-template-columns:62px 48px minmax(0,1fr)}}
  `;

  function syncThemeFromSite() {
    try {
      const styles = getComputedStyle(document.documentElement);
      const bg = (styles.getPropertyValue("--bg-dashboard") || CONFIG.theme.bgFallback).trim();
      const panel = (styles.getPropertyValue("--bg-sidebar") || CONFIG.theme.panelFallback).trim();
      const border = (styles.getPropertyValue("--border-color") || CONFIG.theme.borderFallback).trim();
      const accent = (styles.getPropertyValue("--accent-color") || CONFIG.theme.accentFallback).trim();
      const text = (styles.getPropertyValue("--text-main") || CONFIG.theme.textFallback).trim();
      const muted = (styles.getPropertyValue("--text-muted") || CONFIG.theme.mutedFallback).trim();
      // Apply only to debug UI nodes so site theme is never overwritten
      ["#nx-hud", "#nx-trigger", "#nx-inspector-overlay", "#nx-toast-wrap"].forEach((sel) => {
        const el = $(sel);
        if (!el) return;
        el.style.setProperty("--nx-bg", bg);
        el.style.setProperty("--nx-panel", panel);
        el.style.setProperty("--nx-border", border);
        el.style.setProperty("--nx-accent", accent);
        el.style.setProperty("--nx-text", text);
        el.style.setProperty("--nx-muted", muted);
      });
    } catch {}
  }

  function injectStyles() {
    if ($("#nx-v102-styles")) return;
    const style = document.createElement("style");
    style.id = "nx-v102-styles";
    style.textContent = css;
    document.head.appendChild(style);
    syncThemeFromSite();
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
          <section id="nx-tab-tools" class="nx-tab-pane"><div class="nx-grid">
            <div class="nx-card wide"><div class="nx-card-title">Site Actions</div><div class="nx-buttons">
              <button class="nx-btn" id="nx-hard-reload">Hard Reload</button>
              <button class="nx-btn" id="nx-force-guest">Force Guest</button>
              <button class="nx-btn" id="nx-cycle-theme">Cycle Theme</button>
              <button class="nx-btn" id="nx-version">Show Version</button>
              <button class="nx-btn" id="nx-calculator">Calculator</button>
              <button class="nx-btn" id="nx-scroll-top">Scroll Top</button>
              <button class="nx-btn" id="nx-scroll-bottom">Scroll Bottom</button>
              <button class="nx-btn" id="nx-toggle-fullscreen">Fullscreen</button>
            </div></div>
            <div class="nx-card"><div class="nx-card-title">Page Utilities</div><div class="nx-buttons">
              <button class="nx-btn" id="nx-copy-title">Copy Title</button>
              <button class="nx-btn" id="nx-copy-html-page">Copy HTML</button>
              <button class="nx-btn" id="nx-download-html">Download HTML</button>
              <button class="nx-btn" id="nx-reset-tour">Reset Tour</button>
            </div></div>
            <div class="nx-card full"><div class="nx-card-title">Fun Page Utilities</div><div class="nx-buttons">
              <button class="nx-btn warning" id="nx-lag-toggle">Simulate Lag: Off</button>
              <button class="nx-btn warning" id="nx-css-nuke">Nuke CSS</button>
              <button class="nx-btn" id="nx-grayscale">Grayscale</button>
              <button class="nx-btn" id="nx-blur-page">Blur</button>
              <button class="nx-btn" id="nx-invert-page">Invert</button>
              <button class="nx-btn" id="nx-shake-page">Shake</button>
              <button class="nx-btn" id="nx-spin-page">Spin</button>
              <button class="nx-btn" id="nx-hide-images">Hide Images</button>
              <button class="nx-btn" id="nx-disco-page">Disco Mode</button>
              <button class="nx-btn" id="nx-matrix-rain">Matrix Rain</button>
              <button class="nx-btn" id="nx-random-colors">Random Colors</button>
              <button class="nx-btn" id="nx-vhs">VHS Mode</button>
              <button class="nx-btn" id="nx-earthquake">Earthquake</button>
              <button class="nx-btn" id="nx-pixel">Pixelate</button>
              <button class="nx-btn" id="nx-rainbow">Rainbow Pulse</button>
              <button class="nx-btn" id="nx-tilt">Tilt</button>
              <button class="nx-btn" id="nx-ghost">Ghost Mode</button>
              <button class="nx-btn" id="nx-mega-blur">Mega Blur</button>
              <button class="nx-btn" id="nx-freeze">Freeze</button>
              <button class="nx-btn" id="nx-flip">Flip</button>
              <button class="nx-btn" id="nx-zoom">Zoom</button>
              <button class="nx-btn" id="nx-glow">Glow</button>
              <button class="nx-btn" id="nx-wire">Wireframe</button>
              <button class="nx-btn" id="nx-vignette">Vignette</button>
              <button class="nx-btn" id="nx-darkroom">Darkroom</button>
              <button class="nx-btn" id="nx-hologram">Hologram</button>
              <button class="nx-btn" id="nx-glitch">Glitch</button>
              <button class="nx-btn" id="nx-lines">Scanlines</button>
              <button class="nx-btn" id="nx-grid">Grid Overlay</button>
              <button class="nx-btn danger" id="nx-reset-fun">Reset Effects</button>
            </div><div class="nx-row" style="margin-top:10px"><span>Lag amount</span><span><input id="nx-lag-range" type="range" min="25" max="1000" step="25" value="180" style="width:170px;accent-color:#8b00ff"><span id="nx-lag-value">180 ms</span></span></div></div>
            <div class="nx-card full"><div class="nx-card-title">Custom Command</div><textarea id="nx-command-input" class="nx-textarea" placeholder="Example: document.body.dataset.debug = 'true'"></textarea><div class="nx-toolbar" style="margin:8px 0 0"><button class="nx-btn" id="nx-command-run">Run Command</button><button class="nx-btn" id="nx-command-clear">Clear</button></div><div class="nx-code" id="nx-command-output">Ready.</div></div>
            <div class="nx-card full"><div class="nx-card-title" style="color:var(--nx-danger)">Danger Zone</div><div class="nx-buttons"><button class="nx-btn danger" id="nx-emergency-reload">Emergency Reload</button><button class="nx-btn danger" id="nx-remove-site-caches">Clear Caches + Reload</button></div></div>
          </div></section>
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
    const nav = navigationEntry();
    const container = $("#nx-nav-timing");
    if (!container || !nav) return;
    const entries = [
      ["Start", 0],
      ["DOM Interactive", nav.domInteractive],
      ["DOM Complete", nav.domComplete],
      ["Load Event End", nav.loadEventEnd],
      ["Duration", nav.duration]
    ];
    container.innerHTML = entries.map(([label, value]) => {
      return `<div class="nx-row"><span>${escapeHTML(label)}</span><span>${duration(value)}</span></div>`;
    }).join("");
  }

  function renderResources() {
    const tbody = $("#nx-resource-table");
    if (!tbody) return;
    const resources = performance.getEntriesByType("resource")
      .slice()
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 40);
    tbody.innerHTML = resources.map((entry) => {
      return `<tr>
        <td>${escapeHTML(entry.initiatorType || "other")}</td>
        <td title="${escapeHTML(entry.name)}">${escapeHTML(entry.name)}</td>
        <td>${duration(entry.duration)}</td>
        <td>${bytes(entry.transferSize || 0)}</td>
      </tr>`;
    }).join("");
  }

  function renderRequests() {
    const tbody = $("#nx-request-table");
    if (!tbody) return;
    const filter = ($("#nx-request-filter")?.value || "").toLowerCase();
    const rows = STATE.requests.filter((req) => {
      if (!filter) return true;
      return (
        String(req.method).toLowerCase().includes(filter) ||
        String(req.status).toLowerCase().includes(filter) ||
        String(req.url).toLowerCase().includes(filter)
      );
    }).map((req) => {
      return `<tr>
        <td>${clock(req.time)}</td>
        <td>${escapeHTML(req.method)}</td>
        <td>${escapeHTML(req.status)}</td>
        <td>${duration(req.duration)}</td>
        <td title="${escapeHTML(req.url)}">${escapeHTML(req.url)}</td>
      </tr>`;
    }).join("");
    tbody.innerHTML = rows || `<tr><td colspan="5">No requests captured yet.</td></tr>`;
  }

  function renderLogs() {
    const output = $("#nx-log-output");
    if (!output) return;
    const filter = $("#nx-log-filter")?.value || "all";
    const entries = STATE.logs.filter((entry) => filter === "all" || entry.type === filter);
    output.innerHTML = entries.map((entry) => {
      return `<div class="nx-log-entry ${escapeHTML(entry.type)}">
        <span class="nx-log-time">${clock(entry.time)}</span>
        <span class="nx-log-type">${entry.type.toUpperCase()}</span>
        <span>${escapeHTML(entry.message)}</span>
      </div>`;
    }).join("") || "No logs captured yet.";
  }

  function renderLocalStorage() {
    const tbody = $("#nx-ls-table");
    if (!tbody) return;
    const rows = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      rows.push(`<tr>
        <td>${escapeHTML(key)}</td>
        <td>${escapeHTML(value)}</td>
        <td><button class="nx-btn" data-ls-key="${escapeHTML(key)}">Copy</button></td>
      </tr>`);
    }
    tbody.innerHTML = rows.join("") || `<tr><td colspan="3">LocalStorage is empty.</td></tr>`;
    $$("button[data-ls-key]", tbody).forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-ls-key");
        copy(localStorage.getItem(key) ?? "", `Copied value for "${key}"`);
      });
    });
  }

  function exportLocalStorage() {
    const data = storageObject(localStorage);
    download(`localStorage-${Date.now()}.json`, JSON.stringify(data, null, 2));
    toast("Exported LocalStorage to JSON.", "success");
  }

  function importLocalStorage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(String(reader.result));
          Object.keys(json).forEach((key) => {
            localStorage.setItem(key, json[key]);
          });
          toast("Imported LocalStorage from file.", "success");
          renderLocalStorage();
          updateStorageStats();
        } catch {
          toast("Failed to import LocalStorage JSON.", "error");
        }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  function clearLocalStorage() {
    if (!confirm("Clear ALL LocalStorage keys for this origin?")) return;
    localStorage.clear();
    renderLocalStorage();
    updateStorageStats();
    toast("LocalStorage cleared.", "warn");
  }

  function clearCookies() {
    const cookies = document.cookie.split(";").map((c) => c.trim()).filter(Boolean);
    cookies.forEach((cookie) => {
      const eq = cookie.indexOf("=");
      const name = eq > -1 ? cookie.slice(0, eq) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    toast("Cookies cleared for this origin.", "warn");
  }

  async function clearCaches() {
    try {
      if (window.caches?.keys) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
      toast("Caches cleared.", "success");
    } catch {
      toast("Failed to clear caches.", "error");
    }
  }

  async function unregisterServiceWorkers() {
    try {
      const regs = await navigator.serviceWorker?.getRegistrations?.();
      if (regs && regs.length) {
        await Promise.all(regs.map((reg) => reg.unregister()));
        toast("Service workers unregistered.", "success");
      } else {
        toast("No service workers registered.", "info");
      }
    } catch {
      toast("Failed to unregister service workers.", "error");
    }
  }

  function runConsoleInput() {
    const input = $("#nx-console-input");
    const output = $("#nx-log-output");
    if (!input || !output) return;
    const code = input.value;
    if (!code.trim()) return;
    try {
      const result = eval(code);
      addLog("info", [`> ${code}`, result]);
    } catch (err) {
      addLog("error", [`Error running console input: ${err.message}`]);
    }
  }

  function runCustomCommand() {
    const input = $("#nx-command-input");
    const output = $("#nx-command-output");
    if (!input || !output) return;
    const code = input.value;
    if (!code.trim()) {
      output.textContent = "No command entered.";
      return;
    }
    try {
      const result = eval(code);
      output.textContent = `OK: ${safeJSON(result)}`;
    } catch (err) {
      output.textContent = `ERROR: ${err.message}`;
    }
  }

  function clearCustomCommand() {
    const input = $("#nx-command-input");
    const output = $("#nx-command-output");
    if (input) input.value = "";
    if (output) output.textContent = "Ready.";
  }

  function toggleHUD() {
    const hud = $("#nx-hud");
    if (!hud) return;
    STATE.visible = !STATE.visible;
    hud.classList.toggle("nx-hidden", !STATE.visible);
    if (STATE.visible) {
      syncThemeFromSite();
      updateOverview();
      renderResources();
      renderRequests();
      renderLogs();
      renderLocalStorage();
      updateStorageStats();
    }
  }

  function setActiveTab(name) {
    STATE.activeTab = name;
    $$("#nx-tabs .nx-tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === name);
    });
    $$("#nx-content .nx-tab-pane").forEach((pane) => {
      pane.classList.toggle("active", pane.id === `nx-tab-${name}`);
    });
  }

  function installTabs() {
    $$("#nx-tabs .nx-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setActiveTab(btn.dataset.tab || "overview");
      });
    });
  }

  function installHeaderDrag() {
    const header = $("#nx-header");
    const hud = $("#nx-hud");
    if (!header || !hud) return;
    header.addEventListener("mousedown", (event) => {
      STATE.isDragging = true;
      STATE.dragX = event.clientX - hud.offsetLeft;
      STATE.dragY = event.clientY - hud.offsetTop;
      document.addEventListener("mousemove", onDragMove);
      document.addEventListener("mouseup", onDragEnd);
    });
  }

  function onDragMove(event) {
    if (!STATE.isDragging) return;
    const hud = $("#nx-hud");
    if (!hud) return;
    hud.style.left = `${event.clientX - STATE.dragX}px`;
    hud.style.top = `${event.clientY - STATE.dragY}px`;
  }

  function onDragEnd() {
    STATE.isDragging = false;
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);
  }

  function installOverviewActions() {
    $("#nx-copy-url")?.addEventListener("click", () => copy(location.href, "Page URL copied."));
    $("#nx-copy-stats")?.addEventListener("click", () => {
      const stats = {
        url: location.href,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        ua: navigator.userAgent,
        platform: navigator.platform,
        cores: navigator.hardwareConcurrency,
        time: clock()
      };
      copy(JSON.stringify(stats, null, 2), "Stats copied.");
    });
    $("#nx-refresh")?.addEventListener("click", () => location.reload());
    $("#nx-open-tour")?.addEventListener("click", () => toast("Tour not implemented yet.", "info"));
  }

  function installPerformanceActions() {
    $("#nx-refresh-resources")?.addEventListener("click", () => renderResources());
    $("#nx-export-resources")?.addEventListener("click", () => {
      const resources = performance.getEntriesByType("resource");
      download(`resources-${Date.now()}.json`, JSON.stringify(resources, null, 2));
      toast("Exported resource timing.", "success");
    });
  }

  function installNetworkActions() {
    $("#nx-request-filter")?.addEventListener("input", () => renderRequests());
    $("#nx-clear-requests")?.addEventListener("click", () => {
      STATE.requests = [];
      renderRequests();
    });
    $("#nx-export-requests")?.addEventListener("click", () => {
      download(`requests-${Date.now()}.json`, JSON.stringify(STATE.requests, null, 2));
      toast("Exported captured requests.", "success");
    });
  }

  function installStorageActions() {
    $("#nx-ls-refresh")?.addEventListener("click", () => renderLocalStorage());
    $("#nx-ls-export")?.addEventListener("click", exportLocalStorage);
    $("#nx-ls-import")?.addEventListener("click", importLocalStorage);
    $("#nx-ls-clear")?.addEventListener("click", clearLocalStorage);
    $("#nx-copy-storage")?.addEventListener("click", () => {
      const data = {
        localStorage: storageObject(localStorage),
        sessionStorage: storageObject(sessionStorage)
      };
      copy(JSON.stringify(data, null, 2), "Storage snapshot copied.");
    });
    $("#nx-clear-cookies")?.addEventListener("click", clearCookies);
    $("#nx-clear-caches")?.addEventListener("click", clearCaches);
    $("#nx-clear-sw")?.addEventListener("click", unregisterServiceWorkers);
  }

  function installConsoleActions() {
    $("#nx-log-filter")?.addEventListener("change", renderLogs);
    $("#nx-clear-logs")?.addEventListener("click", () => {
      STATE.logs = [];
      STATE.errors = [];
      renderLogs();
      updateOverview();
    });
    $("#nx-export-logs")?.addEventListener("click", () => {
      download(`logs-${Date.now()}.json`, JSON.stringify(STATE.logs, null, 2));
      toast("Exported logs.", "success");
    });
    $("#nx-console-run")?.addEventListener("click", runConsoleInput);
  }


  function installInspectorActions() {
    const overlay = $("#nx-inspector-overlay");
    const toggleBtn = $("#nx-inspect-toggle");
    if (!overlay || !toggleBtn) return;

    function onHover(event) {
      const target = event.target;
      if (!target || target === overlay || target.closest("#nx-hud") || target.id === "nx-trigger") return;
      const rect = target.getBoundingClientRect();
      overlay.style.display = "block";
      overlay.style.left = rect.left + "px";
      overlay.style.top = rect.top + "px";
      overlay.style.width = rect.width + "px";
      overlay.style.height = rect.height + "px";
    }

    function onPick(event) {
      event.preventDefault();
      event.stopPropagation();
      const target = event.target;
      if (!target || target.closest("#nx-hud") || target.id === "nx-trigger") return;
      STATE.selectedElement = target;
      const tag = target.tagName.toLowerCase();
      const id = target.id ? "#" + target.id : "";
      const cls = target.className && typeof target.className === "string"
        ? "." + target.className.trim().split(/\s+/).join(".")
        : "";
      const selector = tag + id + cls;
      $("#nx-selected-tag").textContent = "<" + tag + ">";
      $("#nx-selected-selector").textContent = selector;
      $("#nx-inspector-details").textContent =
        "Tag: " + tag + "\n" +
        "ID: " + (target.id || "(none)") + "\n" +
        "Classes: " + (target.className || "(none)") + "\n" +
        "Outer HTML (trimmed):\n" + (target.outerHTML || "").slice(0, 1200);
      stopPicker();
      toast("Element selected.", "success");
    }

    function stopPicker() {
      STATE.pickerActive = false;
      document.removeEventListener("mousemove", onHover, true);
      document.removeEventListener("click", onPick, true);
      overlay.style.display = "none";
      toggleBtn.textContent = "Start Element Picker";
    }

    function startPicker() {
      STATE.pickerActive = true;
      document.addEventListener("mousemove", onHover, true);
      document.addEventListener("click", onPick, true);
      toggleBtn.textContent = "Stop Element Picker";
      toast("Element picker active. Click any element.", "info");
    }

    toggleBtn.addEventListener("click", () => {
      if (STATE.pickerActive) stopPicker();
      else startPicker();
    });

    $("#nx-copy-selector")?.addEventListener("click", () => {
      const text = $("#nx-selected-selector")?.textContent || "";
      if (!text || text === "None") return toast("No selector selected.", "warn");
      copy(text, "Selector copied.");
    });
    $("#nx-copy-html")?.addEventListener("click", () => {
      if (!STATE.selectedElement) return toast("No element selected.", "warn");
      copy(STATE.selectedElement.outerHTML || "", "Outer HTML copied.");
    });
  }

  function toggleBodyClass(name) {
    document.body.classList.toggle(name);
  }

  function updateFunButtons() {
    const lagBtn = $("#nx-lag-toggle");
    if (lagBtn) lagBtn.textContent = "Simulate Lag: " + (STATE.fun.lagEnabled ? "On" : "Off");
    const nukeBtn = $("#nx-css-nuke");
    if (nukeBtn) nukeBtn.textContent = STATE.fun.cssNuked ? "Restore CSS" : "Nuke CSS";
  }

  function busyWait(ms) {
    const end = performance.now() + ms;
    while (performance.now() < end) Math.sqrt(Math.random() * 999999);
  }

  function toggleLag() {
    STATE.fun.lagEnabled = !STATE.fun.lagEnabled;
    clearInterval(STATE.fun.lagTimer);
    STATE.fun.lagTimer = null;
    if (STATE.fun.lagEnabled) {
      STATE.fun.lagTimer = setInterval(() => busyWait(STATE.fun.lagMs), 260);
      toast("Lag simulation enabled: " + STATE.fun.lagMs + " ms", "warn");
    } else {
      toast("Lag simulation disabled", "success");
    }
    updateFunButtons();
  }

  function toggleNukeCSS() {
    const protectedIds = new Set(["nx-v102-styles", "nx-fun-runtime-styles"]);
    if (!STATE.fun.cssNuked) {
      STATE.fun.sheetStates = [...document.styleSheets]
        .map((sheet) => ({ sheet, disabled: sheet.disabled, id: sheet.ownerNode?.id || "" }))
        .filter((item) => !protectedIds.has(item.id));
      STATE.fun.sheetStates.forEach((item) => {
        try { item.sheet.disabled = true; } catch {}
      });
      STATE.fun.cssNuked = true;
      toast("Site CSS disabled. Debug UI remains active.", "warn");
    } else {
      STATE.fun.sheetStates.forEach((item) => {
        try { item.sheet.disabled = item.disabled; } catch {}
      });
      STATE.fun.sheetStates = [];
      STATE.fun.cssNuked = false;
      toast("Site CSS restored", "success");
    }
    updateFunButtons();
  }

  function randomColors() {
    if (!STATE.fun.randomStyle) {
      STATE.fun.randomStyle = document.createElement("style");
      STATE.fun.randomStyle.id = "nx-fun-runtime-styles";
      document.head.appendChild(STATE.fun.randomStyle);
    }
    const hue = Math.floor(Math.random() * 360);
    const hue2 = (hue + 130) % 360;
    STATE.fun.randomStyle.textContent =
      "body{background:radial-gradient(circle at 20% 20%,hsl(" + hue + " 95% 26%),transparent 38%),radial-gradient(circle at 80% 70%,hsl(" + hue2 + " 95% 24%),transparent 42%),#050509!important}" +
      "body *:not(#nx-hud):not(#nx-hud *):not(#nx-trigger){border-color:hsl(" + hue + " 95% 55%)!important}";
    toast("Random color blast applied", "success");
  }

  function stopMatrixRain(silent) {
    cancelAnimationFrame(STATE.fun.matrixFrame);
    if (STATE.fun.matrixResize) window.removeEventListener("resize", STATE.fun.matrixResize);
    STATE.fun.matrixCanvas?.remove();
    STATE.fun.matrixEnabled = false;
    STATE.fun.matrixCanvas = null;
    STATE.fun.matrixFrame = null;
    STATE.fun.matrixResize = null;
    if (!silent) toast("Matrix rain disabled", "success");
  }

  function toggleMatrixRain() {
    if (STATE.fun.matrixEnabled) {
      stopMatrixRain(false);
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.id = "nx-matrix-canvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const size = 16;
    let drops = [];
    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      drops = Array(Math.ceil(canvas.width / size)).fill(1);
    };
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff77";
      ctx.font = size + "px monospace";
      drops.forEach((drop, index) => {
        ctx.fillText(String.fromCharCode(0x30A0 + Math.random() * 96), index * size, drop * size);
        if (drop * size > canvas.height && Math.random() > 0.975) drops[index] = 0;
        drops[index]++;
      });
      STATE.fun.matrixFrame = requestAnimationFrame(draw);
    };
    resize();
    STATE.fun.matrixCanvas = canvas;
    STATE.fun.matrixResize = resize;
    STATE.fun.matrixEnabled = true;
    window.addEventListener("resize", resize);
    draw();
    toast("Matrix rain enabled", "success");
  }

  function resetFunEffects() {
    clearInterval(STATE.fun.lagTimer);
    STATE.fun.lagTimer = null;
    STATE.fun.lagEnabled = false;
    if (STATE.fun.matrixEnabled) stopMatrixRain(true);
    if (STATE.fun.cssNuked) {
      STATE.fun.sheetStates.forEach((item) => {
        try { item.sheet.disabled = item.disabled; } catch {}
      });
      STATE.fun.sheetStates = [];
      STATE.fun.cssNuked = false;
    }
    [
      "nx-fun-grayscale", "nx-fun-blur", "nx-fun-invert", "nx-fun-shake", "nx-fun-spin",
      "nx-fun-hide-images", "nx-fun-disco", "nx-fun-vhs", "nx-fun-earthquake", "nx-fun-pixel",
      "nx-fun-rainbow", "nx-fun-tilt", "nx-fun-ghost", "nx-fun-mega-blur", "nx-fun-freeze",
      "nx-fun-flip", "nx-fun-zoom", "nx-fun-glow", "nx-fun-wire", "nx-fun-vignette",
      "nx-fun-darkroom", "nx-fun-hologram", "nx-fun-glitch", "nx-fun-lines", "nx-fun-grid"
    ].forEach((name) => document.body.classList.remove(name));
    if (STATE.fun.randomStyle) STATE.fun.randomStyle.textContent = "";
    updateFunButtons();
    toast("All fun effects reset", "success");
  }

  function installToolsActions() {
    $("#nx-hard-reload")?.addEventListener("click", () => location.reload());
    $("#nx-emergency-reload")?.addEventListener("click", () => location.reload());
    $("#nx-force-guest")?.addEventListener("click", () => {
      if (!confirm("Remove local signed-in user and reload?")) return;
      localStorage.removeItem("chatUser");
      localStorage.removeItem("username");
      location.reload();
    });
    $("#nx-cycle-theme")?.addEventListener("click", () => {
      const themes = [
        "default", "midnight", "vampire", "ocean", "forest", "cyberpunk", "toxic", "solar",
        "ice", "arcade", "bubblegum", "desert", "royal", "ghost", "espresso", "copper",
        "eclipse", "cotton", "rgb", "matrix", "neon", "moonlight", "amber"
      ];
      const current =
        localStorage.getItem("selectedTheme") ||
        localStorage.getItem("nullx-theme") ||
        localStorage.getItem("nxos_theme") ||
        "default";
      const idx = themes.indexOf(current);
      const next = themes[(idx >= 0 ? idx + 1 : 0) % themes.length];
      localStorage.setItem("selectedTheme", next);
      localStorage.setItem("nullx-theme", next);
      localStorage.setItem("nxos_theme", next);
      document.documentElement.setAttribute("data-theme", next);
      document.body.setAttribute("data-theme", next);
      Array.from(document.body.classList).filter((c) => c.startsWith("theme-")).forEach((c) => document.body.classList.remove(c));
      if (next && next !== "default") document.body.classList.add("theme-" + next);
      if (typeof window.applyTheme === "function") window.applyTheme(next);
      syncThemeFromSite();
      toast("Theme: " + next, "success");
    });
    $("#nx-version")?.addEventListener("click", async () => {
      try {
        const data = await (await fetch("version.json", { cache: "no-store" })).json();
        alert("Version: " + (data.version || JSON.stringify(data)));
      } catch {
        toast("Could not load version.json", "error");
      }
    });
    $("#nx-calculator")?.addEventListener("click", () => {
      const nav = $("#nav-calculator") || $("#nav-terminal");
      if (nav) {
        nav.click();
        toast("Calculator opened", "success");
      } else {
        location.href = "calculator/index.html";
      }
    });
    $("#nx-scroll-top")?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
    $("#nx-scroll-bottom")?.addEventListener("click", () => scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
    $("#nx-toggle-fullscreen")?.addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch {
        toast("Fullscreen blocked or unsupported", "warn");
      }
    });
    $("#nx-copy-title")?.addEventListener("click", () => copy(document.title, "Title copied"));
    $("#nx-copy-html-page")?.addEventListener("click", () => copy(document.documentElement.outerHTML, "Page HTML copied"));
    $("#nx-download-html")?.addEventListener("click", () => {
      download("nullx-page-snapshot.html", document.documentElement.outerHTML, "text/html");
      toast("HTML snapshot downloaded", "success");
    });
    $("#nx-reset-tour")?.addEventListener("click", () => {
      localStorage.removeItem("hasSeenNullXTour");
      toast("Site Tour reset", "success");
    });
    $("#nx-lag-toggle")?.addEventListener("click", toggleLag);
    $("#nx-lag-range")?.addEventListener("input", (event) => {
      STATE.fun.lagMs = Number(event.target.value);
      const label = $("#nx-lag-value");
      if (label) label.textContent = STATE.fun.lagMs + " ms";
      if (STATE.fun.lagEnabled) {
        clearInterval(STATE.fun.lagTimer);
        STATE.fun.lagTimer = setInterval(() => busyWait(STATE.fun.lagMs), 260);
      }
    });
    $("#nx-css-nuke")?.addEventListener("click", toggleNukeCSS);
    const funMap = {
      "nx-grayscale": "nx-fun-grayscale",
      "nx-blur-page": "nx-fun-blur",
      "nx-invert-page": "nx-fun-invert",
      "nx-shake-page": "nx-fun-shake",
      "nx-spin-page": "nx-fun-spin",
      "nx-hide-images": "nx-fun-hide-images",
      "nx-disco-page": "nx-fun-disco",
      "nx-vhs": "nx-fun-vhs",
      "nx-earthquake": "nx-fun-earthquake",
      "nx-pixel": "nx-fun-pixel",
      "nx-rainbow": "nx-fun-rainbow",
      "nx-tilt": "nx-fun-tilt",
      "nx-ghost": "nx-fun-ghost",
      "nx-mega-blur": "nx-fun-mega-blur",
      "nx-freeze": "nx-fun-freeze",
      "nx-flip": "nx-fun-flip",
      "nx-zoom": "nx-fun-zoom",
      "nx-glow": "nx-fun-glow",
      "nx-wire": "nx-fun-wire",
      "nx-vignette": "nx-fun-vignette",
      "nx-darkroom": "nx-fun-darkroom",
      "nx-hologram": "nx-fun-hologram",
      "nx-glitch": "nx-fun-glitch",
      "nx-lines": "nx-fun-lines",
      "nx-grid": "nx-fun-grid"
    };
    Object.keys(funMap).forEach((id) => {
      $("#" + id)?.addEventListener("click", () => toggleBodyClass(funMap[id]));
    });
    $("#nx-random-colors")?.addEventListener("click", randomColors);
    $("#nx-matrix-rain")?.addEventListener("click", toggleMatrixRain);
    $("#nx-reset-fun")?.addEventListener("click", resetFunEffects);
    $("#nx-command-run")?.addEventListener("click", runCustomCommand);
    $("#nx-command-clear")?.addEventListener("click", clearCustomCommand);
    $("#nx-remove-site-caches")?.addEventListener("click", async () => {
      if (!confirm("Clear caches, unregister workers, then reload?")) return;
      await clearCaches();
      await unregisterServiceWorkers();
      location.reload();
    });
  }

  function installCloseButtons() {
    $("#nx-close")?.addEventListener("click", () => {
      STATE.visible = true;
      toggleHUD();
    });
    $("#nx-minimize")?.addEventListener("click", () => {
      STATE.visible = true;
      toggleHUD();
    });
    $("#nx-trigger")?.addEventListener("click", () => toggleHUD());
  }

  function installHotkey() {
    window.addEventListener("keydown", (event) => {
      if ((event.key === "`" || event.key === "~") && !event.ctrlKey && !event.metaKey) {
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (["input", "textarea", "select"].includes(tag)) return;
        event.preventDefault();
        toggleHUD();
      }
    });
  }

  function init() {
    injectStyles();
    buildDOM();
    patchConsole();
    patchNetwork();
    installTabs();
    installHeaderDrag();
    installOverviewActions();
    installPerformanceActions();
    installNetworkActions();
    installStorageActions();
    installConsoleActions();
    installInspectorActions();
    installToolsActions();
    installCloseButtons();
    installHotkey();
    updateFPS();
    updateOverview();
    updateFunButtons();
    setInterval(() => {
      if (STATE.visible) {
        updateOverview();
        updateStorageStats();
      }
    }, 1000);
    window.__NULLX_DEVTOOLS__ = {
      version: CONFIG.version,
      toggle: () => toggleHUD(),
      show: () => { if (!STATE.visible) toggleHUD(); },
      hide: () => { if (STATE.visible) toggleHUD(); },
      refresh: updateOverview,
      log: (...args) => addLog("info", args),
      state: STATE
    };
    console.info("NULL X DevTools v" + CONFIG.version + " online. Press ~ or click DEBUG.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
