/**
 * ==============================================================================
 * NULL X - DEVELOPER ENVIRONMENT
 * ==============================================================================
 * WARNING: The ultimate diagnostic and manipulation engine.
 * Includes 30 Advanced Tools, Hardware Telemetry, and Base-Level DOM Control.
 * Toggle Shortcut: Press the '~' (Tilde) key.
 * ==============================================================================
 */

(function NullXDevToolsEngineV5() {
    "use strict";

    // ==========================================
    // 1. STATE & CONFIGURATION
    // ==========================================
    const CONFIG = {
        version: "5.0.0",
        build: "GOD_MODE",
        theme: {
            bg: "rgba(5, 5, 8, 0.98)", border: "#8b00ff", accent: "#00ffcc",
            text: "#eee", danger: "#ff0055", warning: "#ffaa00", success: "#00ffaa"
        },
        keys: { toggle: ['`', '~'] }
    };

    const STATE = {
        isVisible: false, activeTab: 'tab-sys', isDragging: false,
        fps: Array(60).fill(0), mem: Array(60).fill(0), ping: Array(60).fill(0),
        inspectActive: false, startTime: Date.now(), lastPing: 0,
        fontScale: 1, autoScrollInt: null,
        tools: {} // Dynamic tool states
    };

    // ==========================================
    // 2. MASSIVE CSS INJECTION
    // ==========================================
    const injectStyles = () => {
        const style = document.createElement('style');
        style.id = 'nx-v5-styles';
        style.innerHTML = `
            .nx-hidden { display: none !important; }
            #nx-hud { position: fixed; top: 10px; left: 10px; width: 540px; height: 680px; background: ${CONFIG.theme.bg}; border: 2px solid ${CONFIG.theme.border}; border-radius: 6px; color: ${CONFIG.theme.text}; font-family: 'Consolas', monospace; font-size: 11px; z-index: 2147483647; box-shadow: 0 0 50px rgba(139,0,255,0.4); display: flex; flex-direction: column; overflow: hidden; user-select: none; }
            #nx-header { background: linear-gradient(90deg, rgba(139,0,255,0.2), transparent); border-bottom: 1px solid ${CONFIG.theme.border}; padding: 10px 15px; cursor: move; display: flex; justify-content: space-between; font-weight: bold; color: ${CONFIG.theme.accent}; }
            #nx-header .status { width: 10px; height: 10px; background: ${CONFIG.theme.success}; border-radius: 50%; box-shadow: 0 0 10px ${CONFIG.theme.success}; animation: nx-pulse 1s infinite; }
            #nx-close { cursor: pointer; color: ${CONFIG.theme.danger}; font-size: 16px; }
            #nx-tabs { display: flex; background: #000; border-bottom: 1px solid #333; }
            .nx-tab-btn { flex: 1; padding: 10px 0; background: 0 0; border: none; border-right: 1px solid #333; color: #888; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: bold; transition: 0.2s; }
            .nx-tab-btn.active { color: #fff; background: rgba(139,0,255,0.2); border-bottom: 2px solid ${CONFIG.theme.border}; }
            #nx-content { flex: 1; overflow-y: auto; padding: 15px; position: relative; }
            .nx-tab-pane { display: none; } .nx-tab-pane.active { display: block; animation: nx-fade-in 0.2s; }
            .nx-title { color: #fff; border-bottom: 1px dashed #555; padding-bottom: 5px; margin-bottom: 10px; font-size: 13px; font-weight: bold; text-transform: uppercase; color: ${CONFIG.theme.border}; }
            .nx-row { display: flex; justify-content: space-between; padding: 4px 6px; background: rgba(255,255,255,0.03); margin-bottom: 4px; border-radius: 3px; }
            .nx-val { font-weight: bold; color: #fff; }
            .nx-chart { width: 100%; height: 60px; background: #000; border: 1px solid #333; margin-bottom: 10px; position: relative; }
            .nx-chart span { position: absolute; top: 2px; left: 4px; font-size: 9px; color: #aaa; }
            .nx-btn { background: rgba(0,0,0,0.8); border: 1px solid #444; color: #ccc; padding: 8px; border-radius: 3px; cursor: pointer; font-family: inherit; font-size: 10px; transition: 0.2s; text-transform: uppercase; }
            .nx-btn:hover { border-color: ${CONFIG.theme.accent}; color: ${CONFIG.theme.accent}; }
            .nx-btn.active { background: ${CONFIG.theme.accent}; color: #000; border-color: ${CONFIG.theme.accent}; }
            .nx-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; }
            .nx-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 15px; }
            .nx-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 15px; }
            
            /* Tool Effects */
            body.nx-tool-links a { outline: 2px solid #f0f !important; background: rgba(255,0,255,0.3) !important; color: #fff !important; }
            body.nx-tool-noimg img { opacity: 0 !important; }
            body.nx-tool-cb { filter: grayscale(100%) !important; }
            body.nx-tool-inv { filter: invert(100%) hue-rotate(180deg) !important; }
            body.nx-tool-blur { filter: blur(5px) !important; }
            body.nx-tool-rot { transform: rotate(180deg) !important; }
            body.nx-tool-noclick { pointer-events: none !important; }
            body.nx-tool-noclick #nx-hud, body.nx-tool-noclick #nx-trigger { pointer-events: auto !important; }
            body.nx-tool-rainbow * { animation: nx-rbw 2s linear infinite !important; }
            body.nx-tool-shake { animation: nx-shake 0.1s infinite !important; }
            body.nx-tool-divs div { outline: 1px solid rgba(0,255,204,0.5) !important; }
            
            @keyframes nx-pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
            @keyframes nx-fade-in { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
            @keyframes nx-rbw { 0%{color:#f00} 33%{color:#0f0} 66%{color:#00f} 100%{color:#f00} }
            @keyframes nx-shake { 0%{transform:translate(2px,1px) rotate(0deg)} 50%{transform:translate(-1px,2px) rotate(-1deg)} 100%{transform:translate(1px,-2px) rotate(1deg)} }
            
            body.nx-inspect-mode * { cursor: crosshair !important; }
            body.nx-inspect-mode *:hover { outline: 2px solid #00bfff !important; background: rgba(0,191,255,0.2) !important; }
            
            #nx-trigger { position: fixed; bottom: 15px; right: 15px; background: #000; border: 2px solid ${CONFIG.theme.border}; color: ${CONFIG.theme.border}; padding: 10px 15px; cursor: pointer; z-index: 2147483646; font-family: monospace; font-weight: bold; border-radius: 4px; }
            #nx-trigger:hover { background: ${CONFIG.theme.border}; color: #000; }
        `;
        document.head.appendChild(style);
    };

    // ==========================================
    // 3. DOM CONSTRUCTION
    // ==========================================
    const buildDOM = () => {
        const w = document.createElement('div');
        w.innerHTML = `
            <div id="nx-hud" class="nx-hidden">
                <div id="nx-header">
                    <div style="display:flex; align-items:center; gap:8px;"><div class="status"></div><span>NULL X // v${CONFIG.version} [${CONFIG.build}]</span></div>
                    <span id="nx-close">X</span>
                </div>
                <div id="nx-tabs">
                    <button class="nx-tab-btn active" data-target="tab-sys">System</button>
                    <button class="nx-tab-btn" data-target="tab-dom">DOM</button>
                    <button class="nx-tab-btn" data-target="tab-net">Network</button>
                    <button class="nx-tab-btn" data-target="tab-act">Actions</button>
                    <button class="nx-tab-btn" data-target="tab-fun">Chaos</button>
                </div>
                <div id="nx-content">
                    
                    <div id="tab-sys" class="nx-tab-pane active">
                        <div class="nx-title">Live Telemetry</div>
                        <div class="nx-chart"><span style="color:#0fc">FPS</span><canvas id="cvs-fps" width="500" height="60"></canvas></div>
                        <div class="nx-chart"><span style="color:#f90">Memory (MB)</span><canvas id="cvs-mem" width="500" height="60"></canvas></div>
                        <div class="nx-chart"><span style="color:#0cf">Server Ping (ms)</span><canvas id="cvs-ping" width="500" height="60"></canvas></div>
                        
                        <div class="nx-title">Hardware Insights</div>
                        <div class="nx-grid-2">
                            <div class="nx-row"><span>Battery:</span><span class="nx-val" id="val-bat">Checking...</span></div>
                            <div class="nx-row"><span>Connection:</span><span class="nx-val" id="val-net">Checking...</span></div>
                            <div class="nx-row"><span>Uptime:</span><span class="nx-val" id="val-up">00:00:00</span></div>
                            <div class="nx-row"><span>Resolution:</span><span class="nx-val" id="val-res">0x0</span></div>
                        </div>
                    </div>

                    <div id="tab-dom" class="nx-tab-pane">
                        <div class="nx-title">Element Inspector</div>
                        <button class="nx-btn" id="btn-inspect" style="width:100%; margin-bottom:10px;">Toggle Visual Scanner</button>
                        <div style="background:#000; padding:10px; border:1px solid #333; margin-bottom:15px;">
                            <div class="nx-row"><span>Target:</span><span class="nx-val" id="insp-tag" style="color:#f0f;">N/A</span></div>
                            <div class="nx-row"><span>ID / Class:</span><span class="nx-val" id="insp-cls" style="color:#ff0;">N/A</span></div>
                            <div class="nx-row"><span>Size & Pos:</span><span class="nx-val" id="insp-geo">N/A</span></div>
                        </div>
                        
                        <div class="nx-title">Live Node Search</div>
                        <div style="display:flex; gap:5px; margin-bottom:15px;">
                            <input type="text" id="dom-search" placeholder="e.g. .game-card, img, div" style="flex:1; background:#000; border:1px solid #444; color:#0fc; padding:5px; font-family:inherit;">
                            <button class="nx-btn" id="btn-search">Count</button>
                        </div>
                        <div class="nx-row"><span>Elements Found:</span><span class="nx-val" id="val-search">0</span></div>

                        <div class="nx-title">Page Stats</div>
                        <div class="nx-grid-2">
                            <div class="nx-row"><span>Nodes:</span><span class="nx-val" id="val-nodes">0</span></div>
                            <div class="nx-row"><span>Scripts:</span><span class="nx-val" id="val-scripts">0</span></div>
                        </div>
                    </div>

                    <div id="tab-net" class="nx-tab-pane">
                        <div class="nx-title">Console Output</div>
                        <div id="con-log" style="height:180px; background:#000; border:1px solid #333; overflow-y:auto; padding:5px; margin-bottom:10px;"></div>
                        <button class="nx-btn" id="btn-clr-con" style="width:100%; margin-bottom:15px;">Clear Console</button>
                        
                        <div class="nx-title">Storage Managers</div>
                        <div class="nx-grid-2">
                            <div class="nx-row"><span>Local DB:</span><span class="nx-val" id="val-ls">0 items</span></div>
                            <div class="nx-row"><span>Cookies:</span><span class="nx-val" id="val-ck">0 items</span></div>
                        </div>
                        <div class="nx-grid-2">
                            <button class="nx-btn" id="btn-ls-dump">Dump LocalStorage</button>
                            <button class="nx-btn" id="btn-ck-clr" style="color:#f05;">Nuke Cookies</button>
                        </div>
                    </div>

                    <div id="tab-act" class="nx-tab-pane">
                        <div class="nx-title">Visual Overrides</div>
                        <div class="nx-grid-3">
                            <button class="nx-btn" id="a-wire">1. Wireframe</button>
                            <button class="nx-btn" id="a-xray">2. X-Ray</button>
                            <button class="nx-btn" id="a-css">3. Strip CSS</button>
                            <button class="nx-btn" id="a-img">4. Hide Images</button>
                            <button class="nx-btn" id="a-lnk">5. Glow Links</button>
                            <button class="nx-btn" id="a-hid">6. Show Hidden</button>
                            <button class="nx-btn" id="a-div">7. Outline Divs</button>
                            <button class="nx-btn" id="a-inv">8. Invert</button>
                            <button class="nx-btn" id="a-cb">9. Grayscale</button>
                        </div>
                        <div class="nx-title">Utility & Extractors</div>
                        <div class="nx-grid-3">
                            <button class="nx-btn" id="a-pass">10. Reveal Pass</button>
                            <button class="nx-btn" id="a-exlnk">11. Log Links</button>
                            <button class="nx-btn" id="a-eximg">12. Log Images</button>
                            <button class="nx-btn" id="a-fs-up">13. Font +</button>
                            <button class="nx-btn" id="a-fs-dn">14. Font -</button>
                            <button class="nx-btn" id="a-dump">15. Dump DOM</button>
                        </div>
                        <div class="nx-title">Media Controls</div>
                        <div class="nx-grid-3">
                            <button class="nx-btn" id="a-mpause">16. Pause All</button>
                            <button class="nx-btn" id="a-mfast">17. Speed 2x</button>
                            <button class="nx-btn" id="a-mslow">18. Speed 0.5x</button>
                        </div>
                    </div>

                    <div id="tab-fun" class="nx-tab-pane">
                        <div class="nx-title">Modifiers</div>
                        <div class="nx-grid-3">
                            <button class="nx-btn" id="a-trail">19. Mouse Trail</button>
                            <button class="nx-btn" id="a-ascrl">20. Auto-Scroll</button>
                            <button class="nx-btn" id="a-noclk">21. Block Clicks</button>
                            <button class="nx-btn" id="a-rbw">22. Rainbow Text</button>
                            <button class="nx-btn" id="a-blur">23. Blur Page</button>
                            <button class="nx-btn" id="a-rot">24. Rotate 180°</button>
                            <button class="nx-btn" id="a-shake">25. Earthquake</button>
                        </div>
                        <div class="nx-title" style="color:#f05;">Danger Zone</div>
                        <div class="nx-grid-2">
                            <button class="nx-btn" id="a-lag" style="color:#fa0;">26. Sim Lag (3s)</button>
                            <button class="nx-btn" id="a-bsod" style="color:#0cf;">27. Fake BSOD</button>
                            <button class="nx-btn" id="a-nuke" style="color:#f05;">28. Nuke Body</button>
                            <button class="nx-btn" id="a-tilt" style="color:#f0f;">29. Break Layout</button>
                        </div>
                        <button class="nx-btn" id="a-reset" style="width:100%; border-color:#0fc; margin-top:10px;">30. EMERGENCY RESET</button>
                    </div>

                </div>
            </div>
            <button id="nx-trigger">Debug [~]</button>
        `;
        document.body.appendChild(w);
    };

    // ==========================================
    // 4. TELEMETRY, HARDWARE & CHARTS
    // ==========================================
    const initTelemetry = () => {
        const cFps = document.getElementById('cvs-fps').getContext('2d');
        const cMem = document.getElementById('cvs-mem').getContext('2d');
        const cPng = document.getElementById('cvs-ping').getContext('2d');
        
        // Battery
        if (navigator.getBattery) {
            navigator.getBattery().then(b => {
                const upBat = () => document.getElementById('val-bat').innerText = `${Math.round(b.level*100)}% ${b.charging?'(Plugged)':'(Bat)'}`;
                upBat(); b.onlevelchange = upBat; b.onchargingchange = upBat;
            });
        } else { document.getElementById('val-bat').innerText = "Not Supported"; }

        // Connection
        if (navigator.connection) {
            const upNet = () => document.getElementById('val-net').innerText = `${navigator.connection.effectiveType.toUpperCase()} (${navigator.connection.downlink}Mbps)`;
            upNet(); navigator.connection.onchange = upNet;
        } else { document.getElementById('val-net').innerText = "Not Supported"; }

        document.getElementById('val-res').innerText = `${window.innerWidth}x${window.innerHeight}`;

        const drawChart = (ctx, data, max, color) => {
            ctx.clearRect(0,0,500,60); ctx.beginPath(); ctx.strokeStyle=color; ctx.lineWidth=1.5;
            const step = 500/59;
            for(let i=0; i<60; i++) {
                const y = 60 - (Math.min(data[i]/max, 1)*60);
                if(i===0) ctx.moveTo(i*step, y); else ctx.lineTo(i*step, y);
            }
            ctx.stroke(); ctx.lineTo(500,60); ctx.lineTo(0,60);
            ctx.fillStyle = color.replace('rgb','rgba').replace(')',',0.2)'); ctx.fill();
        };

        // Live Ping
        setInterval(async () => {
            const s = performance.now();
            try { await fetch(location.href, {method:'HEAD', cache:'no-store'}); STATE.lastPing = Math.round(performance.now()-s); } 
            catch { STATE.lastPing = 999; }
            STATE.ping.shift(); STATE.ping.push(STATE.lastPing);
        }, 2000);

        // Loop
        let f=0, lT=performance.now();
        const loop = () => {
            const now = performance.now(); f++;
            if (now - lT >= 500) {
                STATE.fps.shift(); STATE.fps.push(Math.round((f*1000)/(now-lT)));
                if(performance.memory) { STATE.mem.shift(); STATE.mem.push(Math.round(performance.memory.usedJSHeapSize/1048576)); }
                
                if (STATE.isVisible && STATE.activeTab === 'tab-sys') {
                    drawChart(cFps, STATE.fps, 65, "rgb(0,255,204)");
                    drawChart(cMem, STATE.mem, Math.max(...STATE.mem, 50), "rgb(255,170,0)");
                    drawChart(cPng, STATE.ping, Math.max(...STATE.ping, 100), "rgb(0,204,255)");
                    
                    const up = Math.floor((Date.now()-STATE.startTime)/1000);
                    document.getElementById('val-up').innerText = `${String(Math.floor(up/3600)).padStart(2,'0')}:${String(Math.floor((up%3600)/60)).padStart(2,'0')}:${String(up%60).padStart(2,'0')}`;
                }
                f=0; lT=now;
            }
            requestAnimationFrame(loop);
        }; requestAnimationFrame(loop);
    };

    // ==========================================
    // 5. INSPECTOR & CONSOLE
    // ==========================================
    const initInspector = () => {
        const btn = document.getElementById('btn-inspect');
        btn.onclick = () => { STATE.inspectActive = !STATE.inspectActive; document.body.classList.toggle('nx-inspect-mode'); btn.innerText = STATE.inspectActive ? "Scanner Active" : "Toggle Visual Scanner"; };
        
        document.onmousemove = e => {
            if(!STATE.inspectActive) return;
            const hud = document.getElementById('nx-hud');
            const p = hud.style.pointerEvents; hud.style.pointerEvents = 'none';
            const t = document.elementFromPoint(e.clientX, e.clientY);
            hud.style.pointerEvents = p;
            
            if(t && t.id !== 'nx-trigger') {
                document.getElementById('insp-tag').innerText = `<${t.tagName.toLowerCase()}>`;
                document.getElementById('insp-cls').innerText = `${t.id?'#'+t.id:''} ${t.className||''}`;
                const r = t.getBoundingClientRect();
                document.getElementById('insp-geo').innerText = `${Math.round(r.width)}x${Math.round(r.height)} @ ${Math.round(r.left)},${Math.round(r.top)}`;
            }
        };
        document.addEventListener('click', e => { if(STATE.inspectActive && !e.target.closest('#nx-hud') && e.target.id!=='nx-trigger') { e.preventDefault(); e.stopPropagation(); } }, true);

        // DOM Search
        document.getElementById('btn-search').onclick = () => {
            const q = document.getElementById('dom-search').value;
            try { document.getElementById('val-search').innerText = document.querySelectorAll(q).length; } 
            catch { document.getElementById('val-search').innerText = "Invalid"; }
        };

        // Console Hook
        const logBox = document.getElementById('con-log');
        const oL=console.log, oW=console.warn, oE=console.error;
        const push = (m, c) => { const d=document.createElement('div'); d.style.color=c; d.innerText=`> ${m}`; logBox.appendChild(d); logBox.scrollTop=logBox.scrollHeight; };
        console.log = (...a) => { push(a.join(' '), '#aaa'); oL(...a); };
        console.warn = (...a) => { push(a.join(' '), '#fa0'); oW(...a); };
        console.error = (...a) => { push(a.join(' '), '#f05'); oE(...a); };
        document.getElementById('btn-clr-con').onclick = () => logBox.innerHTML='';
        
        setInterval(() => {
            if(STATE.isVisible && (STATE.activeTab==='tab-dom'||STATE.activeTab==='tab-net')) {
                document.getElementById('val-nodes').innerText = document.getElementsByTagName('*').length;
                document.getElementById('val-scripts').innerText = document.scripts.length;
                document.getElementById('val-ls').innerText = localStorage.length;
                document.getElementById('val-ck').innerText = document.cookie.split(';').length;
            }
        }, 1000);
    };

    // ==========================================
    // 6. THE 30 GOD-MODE ACTIONS
    // ==========================================
    const initActions = () => {
        const tog = (id, cls, state) => { document.getElementById(id).onclick = (e) => { STATE.tools[state] = !STATE.tools[state]; e.target.classList.toggle('active', STATE.tools[state]); document.body.classList.toggle(cls, STATE.tools[state]); }; };
        
        // Visuals
        tog('a-wire', 'none', 'wire'); document.getElementById('a-wire').addEventListener('click', () => { document.querySelectorAll('body *').forEach(e => { if(!e.closest('#nx-hud')) e.style.outline = STATE.tools.wire ? '1px solid #0fc' : ''; }); });
        tog('a-xray', 'none', 'xray'); let xs; document.getElementById('a-xray').addEventListener('click', () => { if(STATE.tools.xray){ xs=document.createElement('style'); xs.innerHTML=`body *:not(#nx-hud):not(#nx-hud *){opacity:0.7!important;background:rgba(0,0,0,0.1)!important}`; document.head.appendChild(xs);} else if(xs) xs.remove(); });
        tog('a-css', 'none', 'css'); document.getElementById('a-css').addEventListener('click', () => document.querySelectorAll('link[rel=stylesheet],style:not(#nx-v5-styles)').forEach(e=>e.disabled=STATE.tools.css));
        tog('a-img', 'nx-tool-noimg', 'noimg');
        tog('a-lnk', 'nx-tool-links', 'glowlnk');
        tog('a-hid', 'none', 'showhid'); document.getElementById('a-hid').addEventListener('click', () => document.querySelectorAll('*').forEach(e => { if(getComputedStyle(e).display==='none'&&!e.closest('#nx-hud')){ e.style.display=STATE.tools.showhid?'block':''; e.style.border='1px dashed red'; } }));
        tog('a-div', 'nx-tool-divs', 'divs');
        tog('a-inv', 'nx-tool-inv', 'inv');
        tog('a-cb', 'nx-tool-cb', 'cb');

        // Utils
        document.getElementById('a-pass').onclick = () => document.querySelectorAll('input[type=password]').forEach(i=>i.type='text');
        document.getElementById('a-exlnk').onclick = () => { console.log("--- LINKS ---"); document.querySelectorAll('a').forEach(a=>console.log(a.href)); };
        document.getElementById('a-eximg').onclick = () => { console.log("--- IMAGES ---"); document.querySelectorAll('img').forEach(i=>console.log(i.src)); };
        document.getElementById('a-fs-up').onclick = () => { STATE.fontScale+=0.2; document.body.style.transform = `scale(${STATE.fontScale})`; document.body.style.transformOrigin = '0 0'; };
        document.getElementById('a-fs-dn').onclick = () => { STATE.fontScale-=0.2; document.body.style.transform = `scale(${STATE.fontScale})`; document.body.style.transformOrigin = '0 0'; };
        document.getElementById('a-dump').onclick = () => console.log(document.documentElement.outerHTML.substring(0, 3000) + "...");
        
        // Media
        document.getElementById('a-mpause').onclick = () => document.querySelectorAll('video,audio').forEach(m=>m.pause());
        document.getElementById('a-mfast').onclick = () => document.querySelectorAll('video,audio').forEach(m=>m.playbackRate=2.0);
        document.getElementById('a-mslow').onclick = () => document.querySelectorAll('video,audio').forEach(m=>m.playbackRate=0.5);

        // Chaos
        const trailFn = e => { const t=document.createElement('div'); t.className='nx-cursor-trail'; t.style.position='fixed'; t.style.left=e.clientX+'px'; t.style.top=e.clientY+'px'; t.style.width='8px'; t.style.height='8px'; t.style.background='#0fc'; t.style.borderRadius='50%'; t.style.pointerEvents='none'; t.style.zIndex=999999; document.body.appendChild(t); setTimeout(()=>t.remove(), 200); };
        document.getElementById('a-trail').onclick = (e) => { STATE.tools.trail = !STATE.tools.trail; e.target.classList.toggle('active', STATE.tools.trail); if(STATE.tools.trail) window.addEventListener('mousemove', trailFn); else window.removeEventListener('mousemove', trailFn); };
        document.getElementById('a-ascrl').onclick = (e) => { STATE.tools.ascrl = !STATE.tools.ascrl; e.target.classList.toggle('active'); if(STATE.tools.ascrl) STATE.autoScrollInt=setInterval(()=>window.scrollBy(0,2), 20); else clearInterval(STATE.autoScrollInt); };
        tog('a-noclk', 'nx-tool-noclick', 'noclk');
        tog('a-rbw', 'nx-tool-rainbow', 'rbw');
        tog('a-blur', 'nx-tool-blur', 'blur');
        tog('a-rot', 'nx-tool-rot', 'rot');
        tog('a-shake', 'nx-tool-shake', 'shake');

        // Danger
        document.getElementById('a-lag').onclick = () => { const s=Date.now(); while(Date.now()-s<3000){} console.error("Lag over."); };
        document.getElementById('a-bsod').onclick = () => { document.body.innerHTML=`<div style="background:#0000aa;color:#fff;font-family:monospace;height:100vh;width:100vw;position:fixed;top:0;left:0;z-index:9999999;padding:50px;font-size:20px;">A problem has been detected and Windows has been shut down.<br><br>ERR_NULL_X_GOD_MODE_OVERLOAD<br><br>Press F5 to restart.</div>`; };
        document.getElementById('a-nuke').onclick = () => { if(confirm("NUKE?")) { const h=document.getElementById('nx-hud'), t=document.getElementById('nx-trigger'); document.body.innerHTML=''; document.body.append(h,t); } };
        document.getElementById('a-tilt').onclick = () => document.querySelectorAll('div').forEach(d=>d.style.transform=`rotate(${(Math.random()*10)-5}deg)`);
        
        document.getElementById('a-reset').onclick = () => location.reload();
        
        // Extra Tools
        document.getElementById('btn-ls-dump').onclick = () => { for(let i=0;i<localStorage.length;i++) console.log(`[LS] ${localStorage.key(i)}:`, localStorage.getItem(localStorage.key(i))); };
        document.getElementById('btn-ck-clr').onclick = () => { document.cookie.split(";").forEach(c => document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)); console.log("Cookies cleared."); };
    };

    // ==========================================
    // 7. CORE INIT & UI TABS
    // ==========================================
    const initCore = () => {
        const hud = document.getElementById('nx-hud'), trg = document.getElementById('nx-trigger'), cls = document.getElementById('nx-close');
        const tog = () => { STATE.isVisible=!STATE.isVisible; hud.classList.toggle('nx-hidden', !STATE.isVisible); trg.classList.toggle('nx-hidden', STATE.isVisible); };
        trg.onclick=tog; cls.onclick=tog; window.addEventListener('keydown', e => { if(CONFIG.keys.toggle.includes(e.key)){e.preventDefault();tog();} });
        
        document.querySelectorAll('.nx-tab-btn').forEach(b => b.onclick = (e) => {
            document.querySelectorAll('.nx-tab-btn').forEach(t=>t.classList.remove('active'));
            document.querySelectorAll('.nx-tab-pane').forEach(p=>p.classList.remove('active'));
            e.target.classList.add('active');
            const tId = e.target.getAttribute('data-target');
            document.getElementById(tId).classList.add('active');
            STATE.activeTab = tId;
        });

        const hdr = document.getElementById('nx-header'); let dx=0, dy=0;
        hdr.onmousedown = e => { STATE.isDragging=true; dx=e.clientX-hud.offsetLeft; dy=e.clientY-hud.offsetTop; };
        window.onmousemove = e => { if(STATE.isDragging) { hud.style.left=Math.max(0,Math.min(e.clientX-dx,window.innerWidth-hud.offsetWidth))+'px'; hud.style.top=Math.max(0,Math.min(e.clientY-dy,window.innerHeight-hud.offsetHeight))+'px'; } };
        window.onmouseup = () => STATE.isDragging=false;
    };

    // BOOT
    injectStyles(); buildDOM(); initCore(); initTelemetry(); initInspector(); initActions();
    console.log(`>> Null X DevTools v${CONFIG.version} ONLINE.`);

})();
