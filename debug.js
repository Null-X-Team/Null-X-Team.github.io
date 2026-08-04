/**
 * ============================================================
 *  NULL X - DEVELOPER ENVIRONMENT v6.0.0
 *  Toggle: press ~ (tilde) or click Debug button
 * ============================================================
 */
(function NullXDevTools() {
  "use strict";
  const CONFIG = {
    version: "6.0.0",
    theme: { bg: "rgba(5,5,8,0.98)", border: "#8b00ff", accent: "#00ffcc", text: "#eee", danger: "#ff0055" }
  };
  const STATE = { isVisible: false, activeTab: "tab-sys", tools: {}, startTime: Date.now() };

  const css = `
    .nx-hidden{display:none!important}
    #nx-hud{position:fixed;top:10px;left:10px;width:520px;max-height:90vh;background:${CONFIG.theme.bg};border:2px solid ${CONFIG.theme.border};border-radius:6px;color:${CONFIG.theme.text};font-family:Consolas,monospace;font-size:11px;z-index:2147483647;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 0 40px rgba(139,0,255,.35)}
    #nx-header{padding:10px 14px;cursor:move;display:flex;justify-content:space-between;color:${CONFIG.theme.accent};border-bottom:1px solid ${CONFIG.theme.border};font-weight:bold}
    #nx-close{cursor:pointer;color:${CONFIG.theme.danger}}
    #nx-tabs{display:flex;background:#000;border-bottom:1px solid #333}
    .nx-tab-btn{flex:1;padding:8px 0;background:0;border:none;border-right:1px solid #333;color:#888;cursor:pointer;font:inherit;font-weight:bold}
    .nx-tab-btn.active{color:#fff;background:rgba(139,0,255,.2);border-bottom:2px solid ${CONFIG.theme.border}}
    #nx-content{flex:1;overflow-y:auto;padding:12px}
    .nx-tab-pane{display:none}.nx-tab-pane.active{display:block}
    .nx-title{color:${CONFIG.theme.border};border-bottom:1px dashed #555;padding-bottom:4px;margin:10px 0 8px;font-size:12px;text-transform:uppercase;font-weight:bold}
    .nx-row{display:flex;justify-content:space-between;padding:4px 6px;background:rgba(255,255,255,.03);margin-bottom:4px;border-radius:3px}
    .nx-val{font-weight:bold;color:#fff}
    .nx-btn{background:rgba(0,0,0,.8);border:1px solid #444;color:#ccc;padding:8px;border-radius:3px;cursor:pointer;font:inherit;font-size:10px;text-transform:uppercase}
    .nx-btn:hover{border-color:${CONFIG.theme.accent};color:${CONFIG.theme.accent}}
    .nx-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px}
    .nx-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px}
    #nx-trigger{position:fixed;bottom:15px;right:15px;background:#000;border:2px solid ${CONFIG.theme.border};color:${CONFIG.theme.border};padding:10px 14px;cursor:pointer;z-index:2147483646;font-family:monospace;font-weight:bold;border-radius:4px}
    #nx-trigger:hover{background:${CONFIG.theme.border};color:#000}
  `;

  function injectStyles() {
    if (document.getElementById("nx-v5-styles")) return;
    const s = document.createElement("style");
    s.id = "nx-v5-styles";
    s.textContent = css;
    document.head.appendChild(s);
  }

  function buildDOM() {
    if (document.getElementById("nx-hud")) return;
    const w = document.createElement("div");
    w.innerHTML = `
      <div id="nx-hud" class="nx-hidden">
        <div id="nx-header"><span>NULL X // v${CONFIG.version}</span><span id="nx-close">X</span></div>
        <div id="nx-tabs">
          <button class="nx-tab-btn active" data-target="tab-sys">System</button>
          <button class="nx-tab-btn" data-target="tab-net">Storage</button>
          <button class="nx-tab-btn" data-target="tab-act">Actions</button>
        </div>
        <div id="nx-content">
          <div id="tab-sys" class="nx-tab-pane active">
            <div class="nx-title">System</div>
            <div class="nx-row"><span>Uptime</span><span class="nx-val" id="val-up">00:00:00</span></div>
            <div class="nx-row"><span>Resolution</span><span class="nx-val" id="val-res">0x0</span></div>
            <div class="nx-row"><span>LocalStorage</span><span class="nx-val" id="val-ls">0</span></div>
            <div class="nx-row"><span>URL</span><span class="nx-val" id="val-url" style="max-width:280px;overflow:hidden;text-overflow:ellipsis">-</span></div>
          </div>
          <div id="tab-net" class="nx-tab-pane">
            <div class="nx-title">Storage</div>
            <div class="nx-grid-2">
              <button class="nx-btn" id="btn-ls-dump">Dump LocalStorage</button>
              <button class="nx-btn" id="btn-ls-export">Export LS JSON</button>
              <button class="nx-btn" id="btn-ls-import">Import LS JSON</button>
              <button class="nx-btn" id="btn-ls-clear" style="color:#f05">Clear LocalStorage</button>
              <button class="nx-btn" id="btn-ck-clr" style="color:#f05">Nuke Cookies</button>
              <button class="nx-btn" id="btn-sw-clr">Clear SW + Cache</button>
            </div>
          </div>
          <div id="tab-act" class="nx-tab-pane">
            <div class="nx-title">Site Tools</div>
            <div class="nx-grid-3">
              <button class="nx-btn" id="a-hreload">Hard Reload</button>
              <button class="nx-btn" id="a-copyurl">Copy URL</button>
              <button class="nx-btn" id="a-guest">Force Guest</button>
              <button class="nx-btn" id="a-theme">Cycle Theme</button>
              <button class="nx-btn" id="a-ver">Show Version</button>
              <button class="nx-btn" id="a-calc">Open Calculator</button>
            </div>
            <div class="nx-title" style="color:#f05">Danger</div>
            <div class="nx-grid-2">
              <button class="nx-btn" id="a-reset" style="border-color:#0fc">Emergency Reload</button>
              <button class="nx-btn" id="a-nuke" style="color:#f05">Nuke Body</button>
            </div>
          </div>
        </div>
      </div>
      <button id="nx-trigger">Debug [~]</button>`;
    document.body.appendChild(w);
  }

  function tick() {
    if (!STATE.isVisible) return;
    const up = Math.floor((Date.now() - STATE.startTime) / 1000);
    const el = document.getElementById("val-up");
    if (el) el.textContent = String(Math.floor(up / 3600)).padStart(2, "0") + ":" + String(Math.floor((up % 3600) / 60)).padStart(2, "0") + ":" + String(up % 60).padStart(2, "0");
    const ls = document.getElementById("val-ls");
    if (ls) ls.textContent = String(localStorage.length);
  }

  function initUI() {
    const hud = document.getElementById("nx-hud");
    const trg = document.getElementById("nx-trigger");
    const toggle = () => {
      STATE.isVisible = !STATE.isVisible;
      hud.classList.toggle("nx-hidden", !STATE.isVisible);
      trg.classList.toggle("nx-hidden", STATE.isVisible);
    };
    trg.onclick = toggle;
    document.getElementById("nx-close").onclick = toggle;
    window.addEventListener("keydown", (e) => {
      if (e.key === "`" || e.key === "~") { e.preventDefault(); toggle(); }
    });
    document.querySelectorAll(".nx-tab-btn").forEach((b) => {
      b.onclick = (e) => {
        document.querySelectorAll(".nx-tab-btn").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".nx-tab-pane").forEach((p) => p.classList.remove("active"));
        e.target.classList.add("active");
        document.getElementById(e.target.getAttribute("data-target")).classList.add("active");
      };
    });
    document.getElementById("val-res").textContent = window.innerWidth + "x" + window.innerHeight;
    document.getElementById("val-url").textContent = location.href;
    setInterval(tick, 1000);

    // Drag
    const hdr = document.getElementById("nx-header");
    let drag = false, dx = 0, dy = 0;
    hdr.onmousedown = (e) => { drag = true; dx = e.clientX - hud.offsetLeft; dy = e.clientY - hud.offsetTop; };
    window.onmousemove = (e) => {
      if (!drag) return;
      hud.style.left = Math.max(0, e.clientX - dx) + "px";
      hud.style.top = Math.max(0, e.clientY - dy) + "px";
    };
    window.onmouseup = () => { drag = false; };

    // Storage actions
    document.getElementById("btn-ls-dump").onclick = () => {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        console.log("[LS]", k, localStorage.getItem(k));
      }
    };
    document.getElementById("btn-ls-export").onclick = () => {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        data[k] = localStorage.getItem(k);
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
      a.download = "nullx-localstorage.json";
      a.click();
    };
    document.getElementById("btn-ls-import").onclick = () => {
      const inp = document.createElement("input");
      inp.type = "file";
      inp.accept = "application/json,.json";
      inp.onchange = async () => {
        try {
          const data = JSON.parse(await inp.files[0].text());
          Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, v));
          location.reload();
        } catch (e) { console.error(e); }
      };
      inp.click();
    };
    document.getElementById("btn-ls-clear").onclick = () => {
      if (confirm("Clear ALL localStorage?")) { localStorage.clear(); location.reload(); }
    };
    document.getElementById("btn-ck-clr").onclick = () => {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      console.log("Cookies cleared");
    };
    document.getElementById("btn-sw-clr").onclick = async () => {
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
      location.reload();
    };

    // Site tools (no audio player controls)
    document.getElementById("a-hreload").onclick = () => location.reload(true);
    document.getElementById("a-copyurl").onclick = () => {
      navigator.clipboard.writeText(location.href).then(() => console.log("URL copied")).catch(() => prompt("Copy URL", location.href));
    };
    document.getElementById("a-guest").onclick = () => {
      localStorage.removeItem("chatUser");
      localStorage.removeItem("username");
      location.reload();
    };
    document.getElementById("a-theme").onclick = () => {
      const themes = ["default", "dark", "light", "neon", "matrix", "purple"];
      const cur = localStorage.getItem("nullx-theme") || localStorage.getItem("selectedTheme") || "default";
      const next = themes[(themes.indexOf(cur) + 1) % themes.length];
      localStorage.setItem("nullx-theme", next);
      localStorage.setItem("selectedTheme", next);
      if (typeof window.applyTheme === "function") window.applyTheme(next);
      document.documentElement.setAttribute("data-theme", next);
      document.body.setAttribute("data-theme", next);
      console.log("Theme ->", next);
    };
    document.getElementById("a-ver").onclick = async () => {
      try {
        const j = await (await fetch("version.json", { cache: "no-store" })).json();
        alert("Version: " + (j.version || JSON.stringify(j)));
      } catch (e) { alert("Could not load version.json"); }
    };
    document.getElementById("a-calc").onclick = () => {
      const nav = document.getElementById("nav-calculator") || document.getElementById("nav-terminal");
      if (nav) nav.click();
      else location.href = "calculator/index.html";
    };
    document.getElementById("a-reset").onclick = () => location.reload();
    document.getElementById("a-nuke").onclick = () => {
      if (!confirm("NUKE body?")) return;
      const h = document.getElementById("nx-hud");
      const t = document.getElementById("nx-trigger");
      document.body.innerHTML = "";
      document.body.append(h, t);
    };
  }

  injectStyles();
  buildDOM();
  initUI();
  console.log(">> Null X DevTools v" + CONFIG.version + " ONLINE.");
})();
