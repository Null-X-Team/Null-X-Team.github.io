(function NullXDevTools() {
  "use strict";
  if (window.__NULLX_DEVTOOLS__) {
    window.__NULLX_DEVTOOLS__.toggle();
    return;
  }
  const CONFIG = { version: "10.2.1-minimal" };
  const STATE = { visible: false };

  const css = `
    #nx-trigger{position:fixed;right:15px;bottom:15px;z-index:2147483646;padding:10px 13px;
      border:1px solid #8b00ff;border-radius:7px;background:rgba(0,0,0,.92);color:#00ffcc;
      cursor:pointer;font:900 11px Consolas,monospace;box-shadow:0 0 20px rgba(139,0,255,.24)}
    #nx-trigger:hover{background:#8b00ff;color:#fff}
    #nx-hud{position:fixed;top:18px;left:18px;width:min(640px,calc(100vw - 36px));height:min(420px,calc(100vh - 36px));
      background:rgba(5,5,10,.98);border:1px solid #8b00ff;border-radius:12px;color:#eee;z-index:2147483647;
      display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 65px rgba(0,0,0,.72)}
    #nx-hud.nx-hidden{display:none!important}
    #nx-header{padding:12px 14px;background:linear-gradient(90deg,rgba(139,0,255,.18),rgba(0,255,204,.05));
      border-bottom:1px solid rgba(139,0,255,.55);display:flex;justify-content:space-between;align-items:center}
    #nx-header span{color:#00ffcc;font:900 12px Consolas,monospace}
    #nx-content{flex:1;padding:16px;overflow:auto;font:12px Consolas,monospace;color:#ccc}
    .nx-icon-btn{width:28px;height:28px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.4);
      color:#eee;border-radius:6px;cursor:pointer;font-size:16px}
    .nx-icon-btn:hover{border-color:#ff3b63;color:#ff3b63}
  `;

  function inject() {
    if (document.getElementById("nx-v102-styles")) return;
    const s = document.createElement("style");
    s.id = "nx-v102-styles";
    s.textContent = css;
    document.head.appendChild(s);
  }

  function build() {
    if (document.getElementById("nx-trigger")) return;
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div id="nx-hud" class="nx-hidden">
        <div id="nx-header">
          <span>NULL X // DEVELOPER ENVIRONMENT v${CONFIG.version}</span>
          <button class="nx-icon-btn" id="nx-close">×</button>
        </div>
        <div id="nx-content">
          <p>Minimal debug panel is online.</p>
          <p>Press <b>~</b> or click DEBUG to toggle.</p>
          <p style="color:#888;margin-top:12px">Full panel was truncated by a bad deploy. Replace <code>debug.js</code> with the complete file from artifacts to restore all tabs.</p>
        </div>
      </div>
      <button id="nx-trigger">DEBUG [~]</button>
    `;
    document.body.appendChild(wrap);
  }

  function toggle() {
    const hud = document.getElementById("nx-hud");
    if (!hud) return;
    STATE.visible = !STATE.visible;
    hud.classList.toggle("nx-hidden", !STATE.visible);
  }

  function init() {
    inject();
    build();
    document.getElementById("nx-trigger")?.addEventListener("click", toggle);
    document.getElementById("nx-close")?.addEventListener("click", () => { if (STATE.visible) toggle(); });
    document.addEventListener("keydown", (e) => {
      if ((e.key === "`" || e.key === "~") && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape" && STATE.visible) toggle();
    });
    window.__NULLX_DEVTOOLS__ = {
      version: CONFIG.version,
      toggle,
      show: () => { if (!STATE.visible) toggle(); },
      hide: () => { if (STATE.visible) toggle(); }
    };
    console.info("NULL X DevTools " + CONFIG.version + " online. Press ~ or click DEBUG.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
