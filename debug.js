/**
 * ==============================================================================
 * NULL X - DEVELOPER ENVIRONMENT (v4.0 - ULTIMATE EDITION)
 * ==============================================================================
 * WARNING: This is an extremely heavy, multi-threaded diagnostic HUD.
 * * NEW FEATURES:
 * - Live Ping Tracker (Constant background latency monitoring)
 * - 14+ Advanced Developer Actions
 * - Expanded Graphing Utilities
 * - Base-level DOM Manipulation Engine
 * ==============================================================================
 */

(function NullXDevToolsEngineV4() {
    "use strict";

    // ==========================================
    // 1. EXTENSIVE CONFIGURATION & THEME STATE
    // ==========================================
    const CONFIG = {
        version: "4.0.0",
        build: "ULTIMATE_OMEGA",
        theme: {
            bg: "rgba(10, 10, 15, 0.96)",
            border: "rgba(0, 255, 204, 0.4)",
            accent: "#00ffcc",
            text: "#e0e0e0",
            danger: "#ff3333",
            warning: "#ffd700",
            info: "#00bfff",
            success: "#00ff66",
            panel: "rgba(0,0,0,0.6)",
            highlight: "rgba(0, 255, 204, 0.2)"
        },
        metrics: {
            historySize: 60,
            updateRateMs: 100,
            pingIntervalMs: 2000 
        },
        keys: {
            toggle: ['`', '~']
        }
    };

    const STATE = {
        isVisible: false,
        activeTab: 'tab-sys',
        isDragging: false,
        fpsHistory: new Array(CONFIG.metrics.historySize).fill(0),
        memHistory: new Array(CONFIG.metrics.historySize).fill(0),
        pingHistory: new Array(CONFIG.metrics.historySize).fill(0),
        isInspectorActive: false,
        startTime: Date.now(),
        lastPing: 0,
        logs: [],
        networkRequests: [],
        intervals: {},
        tools: {
            cssDisabled: false,
            linksHighlighted: false,
            matrixActive: false,
            imagesHidden: false,
            colorblind: false,
            invert: false,
            hiddenShown: false,
            cursorTrail: false
        }
    };

    // ==========================================
    // 2. MASSIVE CSS INJECTION ENGINE
    // ==========================================
    const injectStyles = () => {
        const style = document.createElement('style');
        style.id = 'nx-devtools-styles';
        style.innerHTML = `
            .nx-hidden { display: none !important; }
            
            /* Master Container */
            #nx-hud {
                position: fixed; top: 20px; left: 20px; width: 500px; height: 650px;
                background: ${CONFIG.theme.bg}; border: 1px solid ${CONFIG.theme.border};
                border-radius: 8px; color: ${CONFIG.theme.text};
                font-family: 'Consolas', 'Courier New', monospace; font-size: 11px;
                z-index: 2147483647; box-shadow: 0 10px 50px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,255,204,0.05);
                backdrop-filter: blur(12px); display: flex; flex-direction: column;
                overflow: hidden; user-select: none; transition: opacity 0.2s;
            }

            /* Header & Drag Bar */
            #nx-header {
                background: rgba(0, 255, 204, 0.1); border-bottom: 1px solid rgba(0,255,204,0.3);
                padding: 12px 15px; cursor: move; display: flex; justify-content: space-between;
                align-items: center; font-weight: bold; letter-spacing: 1px; color: ${CONFIG.theme.accent};
            }
            #nx-header .status-dot { width: 8px; height: 8px; background: ${CONFIG.theme.success}; border-radius: 50%; box-shadow: 0 0 10px ${CONFIG.theme.success}; animation: nx-pulse 2s infinite; }
            #nx-close { cursor: pointer; color: ${CONFIG.theme.danger}; font-size: 16px; transition: 0.2s; }
            #nx-close:hover { text-shadow: 0 0 10px ${CONFIG.theme.danger}; transform: scale(1.2); }

            /* Tabs */
            #nx-tabs { display: flex; background: rgba(0,0,0,0.5); border-bottom: 1px solid #333; }
            .nx-tab-btn {
                flex: 1; padding: 10px 0; background: transparent; border: none; border-right: 1px solid #333;
                color: #888; cursor: pointer; font-family: inherit; font-size: 11px; text-transform: uppercase;
                transition: 0.2s; font-weight: bold;
            }
            .nx-tab-btn:hover { color: #fff; background: rgba(255,255,255,0.05); }
            .nx-tab-btn.active { color: ${CONFIG.theme.accent}; background: rgba(0,255,204,0.1); border-bottom: 2px solid ${CONFIG.theme.accent}; }

            /* Content Area */
            #nx-content { flex: 1; overflow-y: auto; overflow-x: hidden; position: relative; padding: 15px; }
            .nx-tab-pane { display: none; }
            .nx-tab-pane.active { display: block; animation: nx-fade-in 0.3s; }

            /* Component Typography */
            .nx-section-title { color: #fff; border-bottom: 1px dashed #444; padding-bottom: 6px; margin-bottom: 12px; font-weight: bold; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;}
            .nx-row { display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center; padding: 4px; background: rgba(0,0,0,0.3); border-radius: 3px; }
            .nx-label { color: #aaa; }
            .nx-value { color: #fff; font-weight: bold; text-align: right;}

            /* Canvas Charts */
            .nx-chart-container { width: 100%; height: 75px; background: #050505; border: 1px solid #333; border-radius: 4px; margin-bottom: 15px; position: relative; }
            .nx-chart-label { position: absolute; top: 4px; left: 6px; color: rgba(255,255,255,0.7); font-size: 10px; z-index: 10; font-weight: bold; text-shadow: 1px 1px 2px #000; }

            /* Custom Buttons */
            .nx-btn {
                background: rgba(0,0,0,0.6); border: 1px solid #444; color: #ccc;
                padding: 8px 10px; border-radius: 4px; cursor: pointer; font-family: inherit;
                font-size: 10px; transition: 0.2s; width: 100%; text-align: center; text-transform: uppercase;
                box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
            }
            .nx-btn:hover { border-color: ${CONFIG.theme.accent}; color: ${CONFIG.theme.accent}; background: rgba(0,255,204,0.05); }
            .nx-btn.active { background: rgba(0,255,204,0.2); border-color: ${CONFIG.theme.accent}; color: #fff; box-shadow: 0 0 10px rgba(0,255,204,0.3); }
            .nx-btn.danger { border-color: #662222; color: ${CONFIG.theme.danger}; }
            .nx-btn.danger:hover { background: rgba(255,51,51,0.2); border-color: ${CONFIG.theme.danger}; }
            
            /* Grid Layouts */
            .nx-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
            .nx-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 15px; }

            /* Action Grid specific for Tools */
            .nx-action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }

            /* Console & Network */
            .nx-log-box { border: 1px solid #333; height: 350px; overflow-y: auto; background: #050505; border-radius: 4px; padding: 5px; font-size: 11px;}
            .nx-log-entry { padding: 5px 8px; border-bottom: 1px solid #222; word-wrap: break-word; }
            .nx-log-info { color: #ccc; }
            .nx-log-warn { color: ${CONFIG.theme.warning}; background: rgba(255,215,0,0.05); border-left: 3px solid ${CONFIG.theme.warning}; }
            .nx-log-error { color: ${CONFIG.theme.danger}; background: rgba(255,51,51,0.05); border-left: 3px solid ${CONFIG.theme.danger}; }

            /* Scrollbars */
            ::-webkit-scrollbar { width: 6px; height: 6px; }
            ::-webkit-scrollbar-track { background: rgba(0,0,0,0.5); }
            ::-webkit-scrollbar-thumb { background: rgba(0,255,204,0.3); border-radius: 3px; }
            ::-webkit-scrollbar-thumb:hover { background: rgba(0,255,204,0.6); }

            /* TOOL EFFECTS */
            body.nx-tool-links a { outline: 2px solid #ff00ff !important; background: rgba(255,0,255,0.2) !important; color: #fff !important; }
            body.nx-tool-images img { opacity: 0 !important; pointer-events: none !important; }
            body.nx-tool-colorblind { filter: grayscale(100%) contrast(120%) !important; }
            body.nx-tool-invert { filter: invert(100%) hue-rotate(180deg) !important; background: #fff !important; }
            body.nx-tool-hidden .nx-was-hidden { display: block !important; opacity: 1 !important; visibility: visible !important; border: 2px dashed red !important; }
            
            #nx-matrix-canvas { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 2147483640; pointer-events: none; opacity: 0.3; }
            .nx-cursor-trail { position: fixed; width: 6px; height: 6px; background: #00ffcc; border-radius: 50%; pointer-events: none; z-index: 2147483645; transition: 0.1s linear; box-shadow: 0 0 8px #00ffcc;}

            /* Overlay Inspector Mode */
            body.nx-inspect-mode * { cursor: crosshair !important; }
            body.nx-inspect-mode *:hover { outline: 2px solid ${CONFIG.theme.info} !important; background: rgba(0, 191, 255, 0.1) !important; box-shadow: inset 0 0 10px rgba(0,191,255,0.2); }
            
            @keyframes nx-pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
            @keyframes nx-fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

            #nx-trigger {
                position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.9);
                border: 1px solid ${CONFIG.theme.accent}; color: ${CONFIG.theme.accent};
                padding: 10px 20px; border-radius: 4px; font-family: monospace; font-size: 13px; font-weight: bold;
                cursor: pointer; z-index: 2147483646; box-shadow: 0 0 15px rgba(0,255,204,0.2);
            }
        `;
        document.head.appendChild(style);
    };

    // ==========================================
    // 3. MASSIVE DOM CONSTRUCTION
    // ==========================================
    const buildDOM = () => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div id="nx-hud" class="nx-hidden">
                <div id="nx-header">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div class="status-dot"></div>
                        <span>NULL X // OMEGA_HUD v${CONFIG.version}</span>
                    </div>
                    <span id="nx-close">✖</span>
                </div>

                <div id="nx-tabs">
                    <button class="nx-tab-btn active" data-target="tab-sys">Telemetry</button>
                    <button class="nx-tab-btn" data-target="tab-dom">Elements</button>
                    <button class="nx-tab-btn" data-target="tab-net">Network</button>
                    <button class="nx-tab-btn" data-target="tab-tool">Actions Engine</button>
                </div>

                <div id="nx-content">
                    
                    <div id="tab-sys" class="nx-tab-pane active">
                        <div class="nx-section-title">Live Diagnostics</div>
                        <div class="nx-chart-container">
                            <span class="nx-chart-label">FPS (Performance)</span>
                            <canvas id="nx-canvas-fps" width="468" height="75"></canvas>
                        </div>
                        <div class="nx-chart-container">
                            <span class="nx-chart-label">Memory Heap (MB)</span>
                            <canvas id="nx-canvas-mem" width="468" height="75"></canvas>
                        </div>
                        <div class="nx-chart-container">
                            <span class="nx-chart-label">Live Server Latency (Ping ms)</span>
                            <canvas id="nx-canvas-ping" width="468" height="75"></canvas>
                        </div>
                        
                        <div class="nx-section-title">Hardware & Session</div>
                        <div class="nx-grid-2">
                            <div class="nx-row"><span class="nx-label">Live Ping:</span><span class="nx-value" id="nx-val-liveping" style="color:#00ffcc;">-- ms</span></div>
                            <div class="nx-row"><span class="nx-label">Uptime:</span><span class="nx-value" id="nx-val-uptime">00:00:00</span></div>
                            <div class="nx-row"><span class="nx-label">Resolution:</span><span class="nx-value" id="nx-val-res">0x0</span></div>
                            <div class="nx-row"><span class="nx-label">Platform:</span><span class="nx-value" id="nx-val-plat">Unknown</span></div>
                            <div class="nx-row"><span class="nx-label">Cores:</span><span class="nx-value" id="nx-val-cores">--</span></div>
                            <div class="nx-row"><span class="nx-label">User Agent:</span><span class="nx-value" id="nx-val-ua" style="font-size:9px; max-width:80px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">--</span></div>
                        </div>
                    </div>

                    <div id="tab-dom" class="nx-tab-pane">
                        <div class="nx-section-title">Visual DOM Inspector</div>
                        <button class="nx-btn" id="nx-btn-inspect" style="margin-bottom: 15px; padding: 12px; font-size: 12px; font-weight:bold;">Activate Element Scanner</button>
                        
                        <div style="background: rgba(0,0,0,0.5); padding: 12px; border: 1px solid #333; border-radius: 4px;">
                            <div class="nx-row"><span class="nx-label">Tag:</span><span class="nx-value" id="nx-insp-tag" style="color:#ff33cc;">N/A</span></div>
                            <div class="nx-row"><span class="nx-label">ID:</span><span class="nx-value" id="nx-insp-id" style="color:#33ccff;">N/A</span></div>
                            <div class="nx-row"><span class="nx-label">Classes:</span><span class="nx-value" id="nx-insp-class" style="color:#ffff33; font-size:10px;">N/A</span></div>
                            <hr style="border: 0; border-bottom: 1px dashed #444; margin: 10px 0;">
                            <div class="nx-row"><span class="nx-label">Dimensions:</span><span class="nx-value" id="nx-insp-dim">0 x 0</span></div>
                            <div class="nx-row"><span class="nx-label">Position (X,Y):</span><span class="nx-value" id="nx-insp-pos">0, 0</span></div>
                            <div class="nx-row"><span class="nx-label">Font Family:</span><span class="nx-value" id="nx-insp-font">N/A</span></div>
                            <div class="nx-row"><span class="nx-label">Color:</span><span class="nx-value" id="nx-insp-color">N/A</span></div>
                            <div class="nx-row"><span class="nx-label">Background:</span><span class="nx-value" id="nx-insp-bg" style="font-size:9px;">N/A</span></div>
                        </div>

                        <div class="nx-section-title" style="margin-top: 15px;">DOM Statistics</div>
                        <div class="nx-grid-2">
                            <div class="nx-row"><span class="nx-label">Total Nodes:</span><span class="nx-value" id="nx-val-nodes">0</span></div>
                            <div class="nx-row"><span class="nx-label">Scripts:</span><span class="nx-value" id="nx-val-scripts">0</span></div>
                            <div class="nx-row"><span class="nx-label">Images:</span><span class="nx-value" id="nx-val-imgs">0</span></div>
                            <div class="nx-row"><span class="nx-label">Iframes:</span><span class="nx-value" id="nx-val-iframes">0</span></div>
                        </div>
                    </div>

                    <div id="tab-net" class="nx-tab-pane">
                        <div class="nx-section-title">Console & Intercepts</div>
                        <div id="nx-console-list" class="nx-log-box" style="height: 250px; list-style:none; margin:0;">
                            <div class="nx-log-entry nx-log-info">>> Network & Console Initialized.</div>
                        </div>
                        <div class="nx-grid-2" style="margin-top:10px;">
                            <button class="nx-btn" id="nx-btn-ping">Run Manual Ping Test</button>
                            <button class="nx-btn danger" id="nx-btn-clear-con">Clear Terminal</button>
                        </div>
                        
                        <div class="nx-section-title" style="margin-top: 20px;">Storage Management</div>
                        <div class="nx-grid-2">
                            <div class="nx-row"><span class="nx-label">Local Storage:</span><span class="nx-value" id="nx-val-ls">0</span></div>
                            <div class="nx-row"><span class="nx-label">Session Storage:</span><span class="nx-value" id="nx-val-ss">0</span></div>
                        </div>
                        <div class="nx-grid-2">
                            <button class="nx-btn" id="nx-btn-backup-ls">Backup Storage (JSON)</button>
                            <button class="nx-btn danger" id="nx-btn-clear-cookies">Clear All Cookies</button>
                        </div>
                    </div>

                    <div id="tab-tool" class="nx-tab-pane">
                        <div class="nx-section-title">Visual Overrides</div>
                        <div class="nx-action-grid">
                            <button class="nx-btn" id="act-wireframe">1. Wireframe Mode</button>
                            <button class="nx-btn" id="act-xray">2. X-Ray Vision</button>
                            <button class="nx-btn" id="act-links">3. Highlight Links</button>
                            <button class="nx-btn" id="act-hidden">4. Show Hidden Elements</button>
                            <button class="nx-btn" id="act-nocss">5. Disable All CSS</button>
                            <button class="nx-btn" id="act-noimg">6. Hide All Images</button>
                            <button class="nx-btn" id="act-colorblind">7. Colorblind Sim</button>
                            <button class="nx-btn" id="act-invert">8. Invert Colors</button>
                        </div>

                        <div class="nx-section-title">Functional Actions</div>
                        <div class="nx-action-grid">
                            <button class="nx-btn" id="act-pause">9. Pause All Media</button>
                            <button class="nx-btn" id="act-matrix">10. Matrix Overlay</button>
                            <button class="nx-btn" id="act-trail">11. Cursor Trail</button>
                            <button class="nx-btn" id="act-dump">12. Dump DOM to Console</button>
                        </div>

                        <div class="nx-section-title" style="color:#ff3333;">Stress Tests (Danger)</div>
                        <div class="nx-grid-2">
                            <button class="nx-btn danger" id="act-lag">13. Simulate Lag</button>
                            <button class="nx-btn danger" id="act-nuke">14. Nuke Page Body</button>
                        </div>
                    </div>

                </div>
            </div>
            <button id="nx-trigger">Debug [~]</button>
        `;
        document.body.appendChild(wrapper);
    };

    // ==========================================
    // 4. CORE ENGINE & UI BINDINGS
    // ==========================================
    const initCoreEngine = () => {
        const hud = document.getElementById('nx-hud');
        const trigger = document.getElementById('nx-trigger');
        const closeBtn = document.getElementById('nx-close');

        const toggleHud = () => {
            STATE.isVisible = !STATE.isVisible;
            if (STATE.isVisible) {
                hud.classList.remove('nx-hidden');
                trigger.classList.add('nx-hidden');
            } else {
                hud.classList.add('nx-hidden');
                trigger.classList.remove('nx-hidden');
            }
        };

        trigger.addEventListener('click', toggleHud);
        closeBtn.addEventListener('click', toggleHud);
        window.addEventListener('keydown', (e) => {
            if (CONFIG.keys.toggle.includes(e.key)) {
                e.preventDefault(); toggleHud();
            }
        });

        // Tabs
        const tabs = document.querySelectorAll('.nx-tab-btn');
        const panes = document.querySelectorAll('.nx-tab-pane');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabs.forEach(t => t.classList.remove('active'));
                panes.forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
                const targetId = e.target.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
                STATE.activeTab = targetId;
            });
        });

        // Dragging
        const header = document.getElementById('nx-header');
        let offsetX = 0, offsetY = 0;
        header.addEventListener('mousedown', (e) => {
            STATE.isDragging = true;
            offsetX = e.clientX - hud.offsetLeft;
            offsetY = e.clientY - hud.offsetTop;
        });
        window.addEventListener('mousemove', (e) => {
            if (STATE.isDragging) {
                let x = e.clientX - offsetX;
                let y = e.clientY - offsetY;
                x = Math.max(0, Math.min(x, window.innerWidth - hud.offsetWidth));
                y = Math.max(0, Math.min(y, window.innerHeight - hud.offsetHeight));
                hud.style.left = x + 'px'; hud.style.top = y + 'px';
            }
        });
        window.addEventListener('mouseup', () => { STATE.isDragging = false; });
    };

    // ==========================================
    // 5. TELEMETRY, PING & GRAPHING ENGINE
    // ==========================================
    const initTelemetry = () => {
        const ctxFps = document.getElementById('nx-canvas-fps').getContext('2d');
        const ctxMem = document.getElementById('nx-canvas-mem').getContext('2d');
        const ctxPing = document.getElementById('nx-canvas-ping').getContext('2d');
        
        document.getElementById('nx-val-plat').innerText = navigator.platform;
        document.getElementById('nx-val-cores').innerText = navigator.hardwareConcurrency;
        document.getElementById('nx-val-ua').innerText = navigator.userAgent;

        const drawChart = (ctx, data, maxVal, color) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.lineJoin = "round";

            const stepX = ctx.canvas.width / (CONFIG.metrics.historySize - 1);
            for (let i = 0; i < data.length; i++) {
                const x = i * stepX;
                const normalized = Math.max(0, Math.min(data[i] / maxVal, 1));
                const y = ctx.canvas.height - (normalized * ctx.canvas.height);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
            ctx.lineTo(0, ctx.canvas.height);
            ctx.fillStyle = color.replace('rgb', 'rgba').replace(')', ', 0.2)');
            ctx.fill();
        };

        // BACKGROUND LIVE PING SYSTEM
        const pingServer = async () => {
            const start = performance.now();
            try {
                await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' });
                STATE.lastPing = Math.round(performance.now() - start);
            } catch(e) {
                STATE.lastPing = 999; // Error fallback
            }
            STATE.pingHistory.shift();
            STATE.pingHistory.push(STATE.lastPing);
            
            const pingEl = document.getElementById('nx-val-liveping');
            if(pingEl) {
                pingEl.innerText = `${STATE.lastPing} ms`;
                pingEl.style.color = STATE.lastPing < 100 ? CONFIG.theme.success : STATE.lastPing < 300 ? CONFIG.theme.warning : CONFIG.theme.danger;
            }
        };
        setInterval(pingServer, CONFIG.metrics.pingIntervalMs);

        // MAIN LOOP
        let frameCount = 0;
        let lastTime = performance.now();
        
        const loop = () => {
            const now = performance.now();
            const delta = now - lastTime;
            frameCount++;

            if (delta >= 500) {
                const currentFps = Math.round((frameCount * 1000) / delta);
                STATE.fpsHistory.shift(); STATE.fpsHistory.push(currentFps);

                let currentMem = 0;
                if (performance.memory) {
                    currentMem = Math.round(performance.memory.usedJSHeapSize / 1048576);
                    STATE.memHistory.shift(); STATE.memHistory.push(currentMem);
                }

                if (STATE.isVisible && STATE.activeTab === 'tab-sys') {
                    drawChart(ctxFps, STATE.fpsHistory, 65, "rgb(0, 255, 204)");
                    drawChart(ctxMem, STATE.memHistory, Math.max(...STATE.memHistory, 100), "rgb(255, 215, 0)");
                    drawChart(ctxPing, STATE.pingHistory, Math.max(...STATE.pingHistory, 200), "rgb(0, 191, 255)");
                    
                    document.getElementById('nx-val-res').innerText = `${window.innerWidth} x ${window.innerHeight}`;
                    const up = Math.floor((Date.now() - STATE.startTime) / 1000);
                    document.getElementById('nx-val-uptime').innerText = `${String(Math.floor(up/3600)).padStart(2,'0')}:${String(Math.floor((up%3600)/60)).padStart(2,'0')}:${String(up%60).padStart(2,'0')}`;
                }
                frameCount = 0; lastTime = now;
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    };

    // ==========================================
    // 6. DOM INSPECTOR & CONSOLE HIJACK
    // ==========================================
    const initInspectorAndConsole = () => {
        // INSPECTOR
        const btnInspect = document.getElementById('nx-btn-inspect');
        const hud = document.getElementById('nx-hud');

        btnInspect.addEventListener('click', () => {
            STATE.isInspectorActive = !STATE.isInspectorActive;
            btnInspect.classList.toggle('active', STATE.isInspectorActive);
            document.body.classList.toggle('nx-inspect-mode', STATE.isInspectorActive);
        });

        document.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.1 && STATE.isVisible && STATE.activeTab === 'tab-dom') {
                document.getElementById('nx-val-nodes').innerText = document.getElementsByTagName('*').length;
                document.getElementById('nx-val-scripts').innerText = document.scripts.length;
                document.getElementById('nx-val-imgs').innerText = document.images.length;
                document.getElementById('nx-val-iframes').innerText = document.getElementsByTagName('iframe').length;
            }

            if (!STATE.isInspectorActive) return;

            const oldEvents = hud.style.pointerEvents;
            hud.style.pointerEvents = 'none';
            const target = document.elementFromPoint(e.clientX, e.clientY);
            hud.style.pointerEvents = oldEvents;

            if (target && target.id !== 'nx-trigger') {
                const cs = window.getComputedStyle(target);
                const rect = target.getBoundingClientRect();
                
                document.getElementById('nx-insp-tag').innerText = `<${target.tagName.toLowerCase()}>`;
                document.getElementById('nx-insp-id').innerText = target.id ? `#${target.id}` : 'None';
                document.getElementById('nx-insp-class').innerText = target.className || 'None';
                document.getElementById('nx-insp-dim').innerText = `${Math.round(rect.width)}w x ${Math.round(rect.height)}h`;
                document.getElementById('nx-insp-pos').innerText = `${Math.round(rect.left)}x, ${Math.round(rect.top)}y`;
                document.getElementById('nx-insp-font').innerText = cs.fontFamily.split(',')[0];
                document.getElementById('nx-insp-color').innerText = cs.color;
                document.getElementById('nx-insp-bg').innerText = cs.backgroundColor;
            }
        });

        document.addEventListener('click', (e) => {
            if (STATE.isInspectorActive && !e.target.closest('#nx-hud') && e.target.id !== 'nx-trigger') {
                e.preventDefault(); e.stopPropagation();
            }
        }, true);

        // CONSOLE
        const logList = document.getElementById('nx-console-list');
        const origLog = console.log; const origWarn = console.warn; const origErr = console.error;

        const pushToHUD = (msg, type) => {
            const div = document.createElement('div');
            div.className = `nx-log-entry nx-log-${type}`;
            div.innerText = `[${new Date().toLocaleTimeString()}] ${typeof msg === 'object' ? JSON.stringify(msg) : String(msg)}`;
            logList.appendChild(div);
            logList.scrollTop = logList.scrollHeight;
            if (logList.childNodes.length > 100) logList.removeChild(logList.firstChild);
        };

        console.log = function(...args) { pushToHUD(args.join(' '), 'info'); origLog.apply(console, args); };
        console.warn = function(...args) { pushToHUD(args.join(' '), 'warn'); origWarn.apply(console, args); };
        console.error = function(...args) { pushToHUD(args.join(' '), 'error'); origErr.apply(console, args); };

        document.getElementById('nx-btn-clear-con').addEventListener('click', () => logList.innerHTML = '');
    };

    // ==========================================
    // 7. NETWORK, STORAGE & MANUAL PING
    // ==========================================
    const initNetworkStorage = () => {
        // Storage Intervals
        setInterval(() => {
            if (STATE.isVisible && STATE.activeTab === 'tab-net') {
                document.getElementById('nx-val-ls').innerText = localStorage.length;
                document.getElementById('nx-val-ss').innerText = sessionStorage.length;
            }
        }, 1000);

        // Fetch Intercept
        const origFetch = window.fetch;
        window.fetch = async function(...args) {
            const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || 'unknown');
            console.log(`[NET] Fetch Init: ${url.substring(0,40)}...`);
            return origFetch.apply(this, args);
        };

        // Manual Ping Tester
        document.getElementById('nx-btn-ping').addEventListener('click', async (e) => {
            const btn = e.target;
            btn.innerText = "Pinging...";
            const start = performance.now();
            try {
                await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' });
                const ping = Math.round(performance.now() - start);
                console.log(`Manual Ping Test: ${ping}ms`);
                btn.innerText = `Result: ${ping} ms`;
            } catch (err) {
                btn.innerText = "Ping Failed";
                console.error("Manual Ping Failed");
            }
            setTimeout(() => btn.innerText = "Run Manual Ping Test", 3000);
        });

        // Backup Storage Action
        document.getElementById('nx-btn-backup-ls').addEventListener('click', () => {
            const dump = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                dump[key] = localStorage.getItem(key);
            }
            const blob = new Blob([JSON.stringify(dump, null, 2)], {type: "application/json"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = "localstorage_backup.json";
            a.click();
            console.log("Local Storage backed up as JSON.");
        });

        // Clear Cookies Action
        document.getElementById('nx-btn-clear-cookies').addEventListener('click', () => {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            }
            console.warn("All cookies cleared.");
        });
    };

    // ==========================================
    // 8. THE 14+ DEVELOPER ACTIONS ENGINE
    // ==========================================
    const initActions = () => {
        const toggleClass = (btnId, className, stateKey, logMsg) => {
            const btn = document.getElementById(btnId);
            btn.addEventListener('click', () => {
                STATE.tools[stateKey] = btn.classList.toggle('active');
                document.body.classList.toggle(className, STATE.tools[stateKey]);
                console.log(`${logMsg}: ${STATE.tools[stateKey] ? 'ON' : 'OFF'}`);
            });
        };

        // 1. Wireframe
        const wireBtn = document.getElementById('act-wireframe');
        wireBtn.addEventListener('click', () => {
            const active = wireBtn.classList.toggle('active');
            document.querySelectorAll('body *').forEach(el => {
                if (!el.closest('#nx-hud') && el.id !== 'nx-trigger') {
                    el.style.outline = active ? '1px solid rgba(0,255,204,0.5)' : '';
                }
            });
        });

        // 2. X-Ray
        let xrayStyle = null;
        const xrayBtn = document.getElementById('act-xray');
        xrayBtn.addEventListener('click', () => {
            const active = xrayBtn.classList.toggle('active');
            if (active) {
                xrayStyle = document.createElement('style');
                xrayStyle.innerHTML = `body *:not(#nx-hud):not(#nx-hud *):not(#nx-trigger) { opacity: 0.7 !important; box-shadow: inset 0 0 5px rgba(0,255,204,0.3) !important; background: rgba(0,0,0,0.1) !important; }`;
                document.head.appendChild(xrayStyle);
            } else if (xrayStyle) xrayStyle.remove();
        });

        // 3. Links
        toggleClass('act-links', 'nx-tool-links', 'linksHighlighted', "Link Highlighting");
        
        // 4. Show Hidden
        const hiddenBtn = document.getElementById('act-hidden');
        hiddenBtn.addEventListener('click', () => {
            STATE.tools.hiddenShown = hiddenBtn.classList.toggle('active');
            document.querySelectorAll('*').forEach(el => {
                if (window.getComputedStyle(el).display === 'none' && !el.closest('#nx-hud')) {
                    if (STATE.tools.hiddenShown) el.classList.add('nx-was-hidden');
                    else el.classList.remove('nx-was-hidden');
                }
            });
            document.body.classList.toggle('nx-tool-hidden', STATE.tools.hiddenShown);
        });

        // 5. Disable CSS
        const cssBtn = document.getElementById('act-nocss');
        cssBtn.addEventListener('click', () => {
            STATE.tools.cssDisabled = cssBtn.classList.toggle('active');
            document.querySelectorAll('link[rel="stylesheet"], style:not(#nx-devtools-styles)').forEach(el => {
                el.disabled = STATE.tools.cssDisabled;
            });
            console.warn(`CSS Disabled: ${STATE.tools.cssDisabled}`);
        });

        // 6. Hide Images
        toggleClass('act-noimg', 'nx-tool-images', 'imagesHidden', "Image Hiding");

        // 7. Colorblind
        toggleClass('act-colorblind', 'nx-tool-colorblind', 'colorblind', "Colorblind Sim");

        // 8. Invert
        toggleClass('act-invert', 'nx-tool-invert', 'invert', "Color Inversion");

        // 9. Pause Media
        document.getElementById('act-pause').addEventListener('click', () => {
            document.querySelectorAll('video, audio').forEach(m => m.pause());
            console.log("All media playback paused.");
        });

        // 10. Matrix Overlay
        let matrixInterval;
        const matrixBtn = document.getElementById('act-matrix');
        matrixBtn.addEventListener('click', () => {
            STATE.tools.matrixActive = matrixBtn.classList.toggle('active');
            let cvs = document.getElementById('nx-matrix-canvas');
            
            if (STATE.tools.matrixActive) {
                if (!cvs) {
                    cvs = document.createElement('canvas');
                    cvs.id = 'nx-matrix-canvas';
                    document.body.appendChild(cvs);
                }
                const ctx = cvs.getContext('2d');
                cvs.width = window.innerWidth; cvs.height = window.innerHeight;
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*".split("");
                const font = 12; const cols = cvs.width/font; const drops = [];
                for(let i=0; i<cols; i++) drops[i] = 1;
                
                matrixInterval = setInterval(() => {
                    ctx.fillStyle = "rgba(0,0,0,0.05)";
                    ctx.fillRect(0,0,cvs.width,cvs.height);
                    ctx.fillStyle = "#0F0";
                    ctx.font = font + "px monospace";
                    for(let i=0; i<drops.length; i++) {
                        const text = chars[Math.floor(Math.random()*chars.length)];
                        ctx.fillText(text, i*font, drops[i]*font);
                        if(drops[i]*font > cvs.height && Math.random() > 0.975) drops[i] = 0;
                        drops[i]++;
                    }
                }, 33);
            } else {
                clearInterval(matrixInterval);
                if (cvs) cvs.remove();
            }
        });

        // 11. Cursor Trail
        const trailBtn = document.getElementById('act-trail');
        const trails = [];
        const updateTrails = (e) => {
            if(!STATE.tools.cursorTrail) return;
            const t = document.createElement('div');
            t.className = 'nx-cursor-trail';
            t.style.left = e.clientX + 'px';
            t.style.top = e.clientY + 'px';
            document.body.appendChild(t);
            setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'scale(3)'; }, 50);
            setTimeout(() => t.remove(), 200);
        };
        trailBtn.addEventListener('click', () => {
            STATE.tools.cursorTrail = trailBtn.classList.toggle('active');
            if(STATE.tools.cursorTrail) window.addEventListener('mousemove', updateTrails);
            else window.removeEventListener('mousemove', updateTrails);
        });

        // 12. Dump DOM
        document.getElementById('act-dump').addEventListener('click', () => {
            console.log("--- DOM EXPORT ---");
            console.log(document.documentElement.outerHTML.substring(0, 5000) + "\n... [TRUNCATED FOR CONSOLE] ...");
        });

        // 13. Simulate Lag
        document.getElementById('act-lag').addEventListener('click', () => {
            console.warn("Simulating 3 seconds of extreme main-thread lag...");
            const start = Date.now();
            while(Date.now() - start < 3000) { /* BLOCK MAIN THREAD */ }
            console.log("Lag simulation finished.");
        });

        // 14. Nuke Page
        document.getElementById('act-nuke').addEventListener('click', () => {
            if(confirm("DANGER: This will delete the entire page body except the HUD. Are you sure?")) {
                const hud = document.getElementById('nx-hud');
                const trigger = document.getElementById('nx-trigger');
                document.body.innerHTML = '';
                document.body.appendChild(hud);
                document.body.appendChild(trigger);
                document.body.style.background = "#000";
                console.error("PAGE NUKED.");
            }
        });
    };

    // ==========================================
    // 9. SYSTEM INITIALIZATION
    // ==========================================
    console.log(`>> Booting Null X Developer Environment v${CONFIG.version} [${CONFIG.build}]...`);
    injectStyles();
    buildDOM();
    initCoreEngine();
    initTelemetry();
    initInspectorAndConsole();
    initNetworkStorage();
    initActions();
    console.log(">> Null X DevTools fully operational. Press [~] to toggle.");

})();
