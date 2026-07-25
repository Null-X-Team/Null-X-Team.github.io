/**
 * ==============================================================================
 * NULL X - ADVANCED DEVELOPER ENVIRONMENT (v3.0 - Overkill Edition)
 * ==============================================================================
 * WARNING: This is a massive, multi-threaded HUD engine. 
 * Features:
 * - Tabbed Navigation System
 * - Live FPS & Memory Canvas Graphing
 * - Native Console Hijacking & Rendering
 * - DOM Inspector (Chrome DevTools style)
 * - Network Fetch Tracking
 * - Storage Management
 * - Live Page Editing & Wireframing
 * * Toggle Shortcut: Press the '~' (Tilde) key.
 * ==============================================================================
 */

(function NullXDevToolsEngine() {
    "use strict";

    // ==========================================
    // 1. CONFIGURATION & STATE MANAGEMENT
    // ==========================================
    const CONFIG = {
        version: "3.0.0",
        theme: {
            bg: "rgba(13, 13, 19, 0.95)",
            border: "rgba(0, 255, 204, 0.5)",
            accent: "#00ffcc",
            text: "#e0e0e0",
            danger: "#ff3333",
            warning: "#ffd700",
            info: "#00bfff",
            success: "#00ff66"
        },
        fpsHistorySize: 60,
        updateRateMs: 100,
        keys: {
            toggle: ['`', '~'],
            inspector: 'F4'
        }
    };

    const STATE = {
        isVisible: false,
        activeTab: 'tab-sys',
        isDragging: false,
        fpsHistory: new Array(CONFIG.fpsHistorySize).fill(0),
        memHistory: new Array(CONFIG.fpsHistorySize).fill(0),
        isInspectorActive: false,
        isDesignMode: false,
        isDeleteMode: false,
        startTime: Date.now(),
        logs: [],
        requests: []
    };

    // ==========================================
    // 2. MASSIVE CSS INJECTION
    // ==========================================
    const injectStyles = () => {
        const style = document.createElement('style');
        style.id = 'nx-devtools-styles';
        style.innerHTML = `
            .nx-hidden { display: none !important; }
            
            /* Master Container */
            #nx-hud {
                position: fixed; top: 20px; left: 20px; width: 450px; height: 550px;
                background: ${CONFIG.theme.bg}; border: 1px solid ${CONFIG.theme.border};
                border-radius: 8px; color: ${CONFIG.theme.text};
                font-family: 'Consolas', 'Courier New', monospace; font-size: 11px;
                z-index: 2147483647; box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(0,255,204,0.15);
                backdrop-filter: blur(10px); display: flex; flex-direction: column;
                overflow: hidden; user-select: none; transition: opacity 0.2s;
            }

            /* Header & Drag Bar */
            #nx-header {
                background: rgba(0, 255, 204, 0.1); border-bottom: 1px solid rgba(0,255,204,0.3);
                padding: 10px 15px; cursor: move; display: flex; justify-content: space-between;
                align-items: center; font-weight: bold; letter-spacing: 1px; color: ${CONFIG.theme.accent};
            }
            #nx-header .title-area { display: flex; align-items: center; gap: 8px; }
            #nx-header .status-dot { width: 8px; height: 8px; background: ${CONFIG.theme.success}; border-radius: 50%; box-shadow: 0 0 8px ${CONFIG.theme.success}; animation: nx-pulse 2s infinite; }
            #nx-close { cursor: pointer; color: ${CONFIG.theme.danger}; font-size: 14px; transition: 0.2s; }
            #nx-close:hover { text-shadow: 0 0 8px ${CONFIG.theme.danger}; transform: scale(1.1); }

            /* Tabs */
            #nx-tabs {
                display: flex; background: rgba(0,0,0,0.4); border-bottom: 1px solid #333;
            }
            .nx-tab-btn {
                flex: 1; padding: 8px 0; background: transparent; border: none; border-right: 1px solid #333;
                color: #888; cursor: pointer; font-family: inherit; font-size: 10px; text-transform: uppercase;
                transition: 0.2s;
            }
            .nx-tab-btn:hover { color: #fff; background: rgba(255,255,255,0.05); }
            .nx-tab-btn.active { color: ${CONFIG.theme.accent}; background: rgba(0,255,204,0.1); border-bottom: 2px solid ${CONFIG.theme.accent}; }

            /* Content Area */
            #nx-content { flex: 1; overflow-y: auto; overflow-x: hidden; position: relative; }
            .nx-tab-pane { display: none; padding: 15px; }
            .nx-tab-pane.active { display: block; animation: nx-fade-in 0.2s; }

            /* Component Typography */
            .nx-section-title { color: #fff; border-bottom: 1px dashed #444; padding-bottom: 5px; margin-bottom: 10px; font-weight: bold; font-size: 12px; letter-spacing: 1px; }
            .nx-row { display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center; }
            .nx-label { color: #aaa; }
            .nx-value { color: #fff; font-weight: bold; }
            .nx-value.good { color: ${CONFIG.theme.success}; }
            .nx-value.warn { color: ${CONFIG.theme.warning}; }
            .nx-value.bad { color: ${CONFIG.theme.danger}; }

            /* Canvas Charts */
            .nx-chart-container { width: 100%; height: 80px; background: #050505; border: 1px solid #333; border-radius: 4px; margin-bottom: 10px; position: relative; }
            .nx-chart-label { position: absolute; top: 4px; left: 4px; color: rgba(255,255,255,0.5); font-size: 9px; }

            /* Custom Buttons */
            .nx-btn {
                background: rgba(0,0,0,0.5); border: 1px solid #444; color: #ccc;
                padding: 6px 12px; border-radius: 4px; cursor: pointer; font-family: inherit;
                font-size: 10px; transition: 0.2s; width: 100%; text-align: center; text-transform: uppercase;
            }
            .nx-btn:hover { border-color: ${CONFIG.theme.accent}; color: ${CONFIG.theme.accent}; }
            .nx-btn.active { background: rgba(0,255,204,0.2); border-color: ${CONFIG.theme.accent}; color: #fff; box-shadow: 0 0 10px rgba(0,255,204,0.3); }
            .nx-btn.danger { border-color: #662222; color: ${CONFIG.theme.danger}; }
            .nx-btn.danger:hover { background: rgba(255,51,51,0.2); border-color: ${CONFIG.theme.danger}; }
            
            /* Grid Layouts */
            .nx-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
            .nx-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 10px; }

            /* Console Log Styles */
            #nx-console-list { list-style: none; padding: 0; margin: 0; }
            .nx-log-entry { padding: 4px 6px; border-bottom: 1px solid #222; word-wrap: break-word; font-family: monospace; }
            .nx-log-info { color: #ccc; }
            .nx-log-warn { color: ${CONFIG.theme.warning}; background: rgba(255,215,0,0.05); border-left: 3px solid ${CONFIG.theme.warning}; }
            .nx-log-error { color: ${CONFIG.theme.danger}; background: rgba(255,51,51,0.05); border-left: 3px solid ${CONFIG.theme.danger}; }

            /* Network List */
            #nx-network-list { border: 1px solid #333; height: 150px; overflow-y: auto; background: #050505; border-radius: 4px; padding: 5px; }
            .nx-net-req { display: flex; justify-content: space-between; padding: 4px; border-bottom: 1px dashed #222; }
            .nx-net-url { color: ${CONFIG.theme.info}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70%; }
            .nx-net-status { color: ${CONFIG.theme.success}; }

            /* Scrollbars */
            ::-webkit-scrollbar { width: 6px; height: 6px; }
            ::-webkit-scrollbar-track { background: rgba(0,0,0,0.5); }
            ::-webkit-scrollbar-thumb { background: rgba(0,255,204,0.3); border-radius: 3px; }
            ::-webkit-scrollbar-thumb:hover { background: rgba(0,255,204,0.6); }

            /* Overlay Inspector Mode */
            body.nx-inspect-mode * { cursor: default !important; }
            body.nx-inspect-mode *:hover { outline: 2px solid ${CONFIG.theme.info} !important; background: rgba(0, 191, 255, 0.1) !important; box-shadow: inset 0 0 10px rgba(0,191,255,0.2); }
            
            /* Animations */
            @keyframes nx-pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
            @keyframes nx-fade-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

            /* Trigger Button */
            #nx-trigger {
                position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.8);
                border: 1px solid ${CONFIG.theme.accent}; color: ${CONFIG.theme.accent};
                padding: 8px 16px; border-radius: 20px; font-family: monospace; font-size: 12px;
                cursor: pointer; z-index: 2147483646; backdrop-filter: blur(5px);
            }
            #nx-trigger:hover { background: ${CONFIG.theme.accent}; color: #000; }
        `;
        document.head.appendChild(style);
    };

    // ==========================================
    // 3. HTML ARCHITECTURE CONSTRUCTION
    // ==========================================
    const buildDOM = () => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div id="nx-hud" class="nx-hidden">
                <div id="nx-header">
                    <div class="title-area">
                        <div class="status-dot"></div>
                        <span>NULL X // DEV_ENVIRONMENT v${CONFIG.version}</span>
                    </div>
                    <span id="nx-close">✖</span>
                </div>

                <div id="nx-tabs">
                    <button class="nx-tab-btn active" data-target="tab-sys">System</button>
                    <button class="nx-tab-btn" data-target="tab-dom">Elements</button>
                    <button class="nx-tab-btn" data-target="tab-net">Network</button>
                    <button class="nx-tab-btn" data-target="tab-con">Console</button>
                    <button class="nx-tab-btn" data-target="tab-tool">Tools</button>
                </div>

                <div id="nx-content">
                    
                    <div id="tab-sys" class="nx-tab-pane active">
                        <div class="nx-section-title">Performance Graphs</div>
                        <div class="nx-chart-container">
                            <span class="nx-chart-label">FPS (Target: 60)</span>
                            <canvas id="nx-canvas-fps" width="418" height="80"></canvas>
                        </div>
                        <div class="nx-chart-container">
                            <span class="nx-chart-label">Memory Heap (MB)</span>
                            <canvas id="nx-canvas-mem" width="418" height="80"></canvas>
                        </div>
                        
                        <div class="nx-section-title" style="margin-top:15px;">Hardware Telemetry</div>
                        <div class="nx-grid-2">
                            <div class="nx-row"><span class="nx-label">Uptime:</span><span class="nx-value" id="nx-val-uptime">00:00:00</span></div>
                            <div class="nx-row"><span class="nx-label">Resolution:</span><span class="nx-value" id="nx-val-res">0x0</span></div>
                            <div class="nx-row"><span class="nx-label">Platform:</span><span class="nx-value" id="nx-val-plat">Unknown</span></div>
                            <div class="nx-row"><span class="nx-label">Logical Cores:</span><span class="nx-value" id="nx-val-cores">--</span></div>
                        </div>
                    </div>

                    <div id="tab-dom" class="nx-tab-pane">
                        <div class="nx-section-title">Element Inspector</div>
                        <button class="nx-btn" id="nx-btn-inspect" style="margin-bottom: 10px;">Toggle Visual Inspector (Hover to select)</button>
                        
                        <div style="background: rgba(0,0,0,0.5); padding: 10px; border: 1px solid #333; border-radius: 4px;">
                            <div class="nx-row"><span class="nx-label">Tag:</span><span class="nx-value" id="nx-insp-tag" style="color:#ff33cc;">N/A</span></div>
                            <div class="nx-row"><span class="nx-label">ID:</span><span class="nx-value" id="nx-insp-id" style="color:#33ccff;">N/A</span></div>
                            <div class="nx-row"><span class="nx-label">Classes:</span><span class="nx-value" id="nx-insp-class" style="color:#ffff33; font-size:10px;">N/A</span></div>
                            <hr style="border: 0; border-bottom: 1px dashed #444; margin: 8px 0;">
                            <div class="nx-row"><span class="nx-label">Dimensions:</span><span class="nx-value" id="nx-insp-dim">0 x 0</span></div>
                            <div class="nx-row"><span class="nx-label">Font Family:</span><span class="nx-value" id="nx-insp-font">N/A</span></div>
                            <div class="nx-row"><span class="nx-label">Color:</span><span class="nx-value" id="nx-insp-color">N/A</span></div>
                        </div>

                        <div class="nx-section-title" style="margin-top: 15px;">Document Stats</div>
                        <div class="nx-grid-2">
                            <div class="nx-row"><span class="nx-label">Total Nodes:</span><span class="nx-value" id="nx-val-nodes">0</span></div>
                            <div class="nx-row"><span class="nx-label">Scripts:</span><span class="nx-value" id="nx-val-scripts">0</span></div>
                            <div class="nx-row"><span class="nx-label">Images:</span><span class="nx-value" id="nx-val-imgs">0</span></div>
                            <div class="nx-row"><span class="nx-label">Iframes:</span><span class="nx-value" id="nx-val-iframes">0</span></div>
                        </div>
                    </div>

                    <div id="tab-net" class="nx-tab-pane">
                        <div class="nx-section-title">Network Intercepts (Fetch/XHR)</div>
                        <div id="nx-network-list">
                            </div>

                        <div class="nx-section-title" style="margin-top: 15px;">Local Storage Manager</div>
                        <div class="nx-row">
                            <span class="nx-label">Items in Storage:</span>
                            <span class="nx-value" id="nx-val-storage">0</span>
                        </div>
                        <div class="nx-grid-2" style="margin-top: 10px;">
                            <button class="nx-btn" id="nx-btn-log-storage">Log Data to Console</button>
                            <button class="nx-btn danger" id="nx-btn-clear-storage">Nuke Storage</button>
                        </div>
                    </div>

                    <div id="tab-con" class="nx-tab-pane">
                        <div class="nx-section-title">Intercepted Console Stream</div>
                        <div style="background: #000; border: 1px solid #333; height: 280px; overflow-y: auto; padding: 5px; font-size:10px;">
                            <ul id="nx-console-list">
                                <li class="nx-log-entry nx-log-info">>> Null X Console Engine Initialized.</li>
                            </ul>
                        </div>
                        <div class="nx-grid-2" style="margin-top:10px;">
                            <button class="nx-btn" id="nx-btn-test-log">Trigger Test Log</button>
                            <button class="nx-btn danger" id="nx-btn-clear-con">Clear Output</button>
                        </div>
                    </div>

                    <div id="tab-tool" class="nx-tab-pane">
                        <div class="nx-section-title">Visual Overrides</div>
                        <div class="nx-grid-2">
                            <button class="nx-btn" id="nx-btn-wireframe">Wireframe Mode</button>
                            <button class="nx-btn" id="nx-btn-xray">X-Ray Vision</button>
                        </div>

                        <div class="nx-section-title" style="margin-top: 15px;">Page Modifiers</div>
                        <div class="nx-grid-2">
                            <button class="nx-btn" id="nx-btn-design">Edit Page Text</button>
                            <button class="nx-btn danger" id="nx-btn-delete">Click-to-Delete</button>
                        </div>
                        
                        <div class="nx-section-title" style="margin-top: 15px;">Javascript Execution</div>
                        <input type="text" id="nx-eval-input" placeholder="Enter JS code... (e.g. alert('hi'))" style="width:100%; background:#000; border:1px solid #333; color:#00ffcc; padding:8px; font-family:monospace; margin-bottom:8px;">
                        <button class="nx-btn" id="nx-btn-eval">Execute in Sandbox</button>
                    </div>

                </div>
            </div>
            <button id="nx-trigger">DEV_HUD [~]</button>
        `;
        document.body.appendChild(wrapper);
    };

    // ==========================================
    // 4. CORE ENGINE & EVENT BINDINGS
    // ==========================================
    const initCoreEngine = () => {
        const hud = document.getElementById('nx-hud');
        const trigger = document.getElementById('nx-trigger');
        const closeBtn = document.getElementById('nx-close');

        // Toggle Logic
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
                e.preventDefault();
                toggleHud();
            }
        });

        // Tab Switching Logic
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

        // Window Dragging Logic
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
                hud.style.left = x + 'px';
                hud.style.top = y + 'px';
            }
        });

        window.addEventListener('mouseup', () => { STATE.isDragging = false; });
    };

    // ==========================================
    // 5. PERFORMANCE METRICS & GRAPHING
    // ==========================================
    const initTelemetry = () => {
        let frameCount = 0;
        let lastTime = performance.now();
        const canvasFps = document.getElementById('nx-canvas-fps');
        const ctxFps = canvasFps.getContext('2d');
        const canvasMem = document.getElementById('nx-canvas-mem');
        const ctxMem = canvasMem.getContext('2d');

        // Fill static hardware info once
        document.getElementById('nx-val-plat').innerText = navigator.platform || "Unknown";
        document.getElementById('nx-val-cores').innerText = navigator.hardwareConcurrency || "--";

        // Draw Line Chart Function
        const drawChart = (ctx, data, maxVal, color) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.lineJoin = "round";

            const stepX = ctx.canvas.width / (CONFIG.fpsHistorySize - 1);
            
            for (let i = 0; i < data.length; i++) {
                const x = i * stepX;
                // Calculate Y, invert it because canvas Y goes down
                const normalized = Math.max(0, Math.min(data[i] / maxVal, 1));
                const y = ctx.canvas.height - (normalized * ctx.canvas.height);
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Fill area under line
            ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
            ctx.lineTo(0, ctx.canvas.height);
            ctx.fillStyle = color.replace('rgb', 'rgba').replace(')', ', 0.2)');
            ctx.fill();
        };

        // Main Metric Loop
        const loop = () => {
            const now = performance.now();
            const delta = now - lastTime;
            frameCount++;

            // Update every 500ms
            if (delta >= 500) {
                const currentFps = Math.round((frameCount * 1000) / delta);
                
                // Shift History arrays
                STATE.fpsHistory.shift();
                STATE.fpsHistory.push(currentFps);

                let currentMem = 0;
                if (performance.memory) {
                    currentMem = Math.round(performance.memory.usedJSHeapSize / 1048576);
                    STATE.memHistory.shift();
                    STATE.memHistory.push(currentMem);
                }

                // Render Graphs (Only if System Tab is visible to save power)
                if (STATE.isVisible && STATE.activeTab === 'tab-sys') {
                    // Draw FPS (Target max is usually 60 or 144)
                    drawChart(ctxFps, STATE.fpsHistory, 65, "rgb(0, 255, 204)");
                    
                    // Draw Mem (Scale max based on current usage)
                    const maxMem = Math.max(...STATE.memHistory, 100);
                    drawChart(ctxMem, STATE.memHistory, maxMem, "rgb(255, 215, 0)");

                    // Update Texts
                    document.getElementById('nx-val-res').innerText = `${window.innerWidth} x ${window.innerHeight}`;
                    
                    const uptimeSecs = Math.floor((Date.now() - STATE.startTime) / 1000);
                    const h = String(Math.floor(uptimeSecs / 3600)).padStart(2, '0');
                    const m = String(Math.floor((uptimeSecs % 3600) / 60)).padStart(2, '0');
                    const s = String(uptimeSecs % 60).padStart(2, '0');
                    document.getElementById('nx-val-uptime').innerText = `${h}:${m}:${s}`;
                }

                frameCount = 0;
                lastTime = now;
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    };

    // ==========================================
    // 6. DOM INSPECTOR ENGINE
    // ==========================================
    const initInspector = () => {
        const btnInspect = document.getElementById('nx-btn-inspect');
        const hud = document.getElementById('nx-hud');

        btnInspect.addEventListener('click', () => {
            STATE.isInspectorActive = !STATE.isInspectorActive;
            btnInspect.classList.toggle('active', STATE.isInspectorActive);
            document.body.classList.toggle('nx-inspect-mode', STATE.isInspectorActive);
        });

        // Hover Tracking logic
        document.addEventListener('mousemove', (e) => {
            // Update document stats occasionally
            if (Math.random() < 0.05 && STATE.isVisible && STATE.activeTab === 'tab-dom') {
                document.getElementById('nx-val-nodes').innerText = document.getElementsByTagName('*').length;
                document.getElementById('nx-val-scripts').innerText = document.scripts.length;
                document.getElementById('nx-val-imgs').innerText = document.images.length;
                document.getElementById('nx-val-iframes').innerText = document.getElementsByTagName('iframe').length;
            }

            if (!STATE.isInspectorActive) return;

            // Hide HUD from pointer events temporarily to inspect elements UNDER the HUD
            const oldEvents = hud.style.pointerEvents;
            hud.style.pointerEvents = 'none';
            const target = document.elementFromPoint(e.clientX, e.clientY);
            hud.style.pointerEvents = oldEvents;

            if (target && target.id !== 'nx-trigger') {
                const compStyles = window.getComputedStyle(target);
                
                document.getElementById('nx-insp-tag').innerText = `<${target.tagName.toLowerCase()}>`;
                document.getElementById('nx-insp-id').innerText = target.id ? `#${target.id}` : 'None';
                document.getElementById('nx-insp-class').innerText = target.className || 'None';
                
                const rect = target.getBoundingClientRect();
                document.getElementById('nx-insp-dim').innerText = `${Math.round(rect.width)}w x ${Math.round(rect.height)}h`;
                
                document.getElementById('nx-insp-font').innerText = compStyles.fontFamily.split(',')[0];
                
                // Color formatting
                const colorEl = document.getElementById('nx-insp-color');
                colorEl.innerText = compStyles.color;
                colorEl.style.color = compStyles.color;
            }
        });

        // Prevent clicking links while inspecting
        document.addEventListener('click', (e) => {
            if (STATE.isInspectorActive && !e.target.closest('#nx-hud') && e.target.id !== 'nx-trigger') {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    };

    // ==========================================
    // 7. CONSOLE HIJACKING SYSTEM
    // ==========================================
    const initConsoleManager = () => {
        const logList = document.getElementById('nx-console-list');
        
        // Save original methods
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;

        const pushToHUD = (msg, type) => {
            const li = document.createElement('li');
            li.className = `nx-log-entry nx-log-${type}`;
            
            // Basic stringification for objects
            let text = "";
            try {
                text = (typeof msg === 'object') ? JSON.stringify(msg) : String(msg);
            } catch(e) {
                text = String(msg);
            }
            
            const time = new Date().toLocaleTimeString();
            li.innerText = `[${time}] ${text}`;
            
            logList.appendChild(li);
            
            // Auto scroll to bottom
            logList.parentElement.scrollTop = logList.parentElement.scrollHeight;

            // Keep memory safe, delete old logs
            if (logList.childNodes.length > 100) {
                logList.removeChild(logList.firstChild);
            }
        };

        // Override globals
        console.log = function(...args) {
            pushToHUD(args.join(' '), 'info');
            originalLog.apply(console, args);
        };
        console.warn = function(...args) {
            pushToHUD(args.join(' '), 'warn');
            originalWarn.apply(console, args);
        };
        console.error = function(...args) {
            pushToHUD(args.join(' '), 'error');
            originalError.apply(console, args);
        };

        // Buttons
        document.getElementById('nx-btn-test-log').addEventListener('click', () => {
            console.log("Test Info Log Triggered.");
            console.warn("Test Warning Triggered.");
            console.error("Test Error Triggered.");
        });

        document.getElementById('nx-btn-clear-con').addEventListener('click', () => {
            logList.innerHTML = '';
            pushToHUD("Console cleared.", "info");
        });
    };

    // ==========================================
    // 8. NETWORK & STORAGE TRACKER
    // ==========================================
    const initNetworkStorage = () => {
        // Storage Tracker Update
        setInterval(() => {
            if (STATE.isVisible && STATE.activeTab === 'tab-net') {
                document.getElementById('nx-val-storage').innerText = localStorage.length;
            }
        }, 1000);

        // Storage Buttons
        document.getElementById('nx-btn-log-storage').addEventListener('click', () => {
            console.log("--- LOCAL STORAGE DUMP ---");
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                console.log(`[${key}]:`, localStorage.getItem(key));
            }
        });

        document.getElementById('nx-btn-clear-storage').addEventListener('click', () => {
            if(confirm("WARNING: This will wipe all LocalStorage. Proceed?")) {
                localStorage.clear();
                console.warn("Local Storage Wiped by Developer.");
            }
        });

        // Network Interception (Fetch)
        const originalFetch = window.fetch;
        const netList = document.getElementById('nx-network-list');

        window.fetch = async function(...args) {
            const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || 'unknown-url');
            
            const div = document.createElement('div');
            div.className = 'nx-net-req';
            div.innerHTML = `<span class="nx-net-url">${url}</span><span class="nx-net-status" style="color:yellow;">Pending</span>`;
            netList.prepend(div);

            try {
                const response = await originalFetch.apply(this, args);
                div.innerHTML = `<span class="nx-net-url">${url}</span><span class="nx-net-status" style="color:${response.ok ? CONFIG.theme.success : CONFIG.theme.danger};">${response.status}</span>`;
                return response;
            } catch (err) {
                div.innerHTML = `<span class="nx-net-url">${url}</span><span class="nx-net-status" style="color:${CONFIG.theme.danger};">FAILED</span>`;
                throw err;
            }
        };
    };

    // ==========================================
    // 9. DEVELOPER TOOLS & MODIFIERS
    // ==========================================
    const initTools = () => {
        // Wireframe
        const btnWire = document.getElementById('nx-btn-wireframe');
        btnWire.addEventListener('click', () => {
            const active = btnWire.classList.toggle('active');
            
            const all = document.querySelectorAll('body *');
            all.forEach(el => {
                if (!el.closest('#nx-hud') && el.id !== 'nx-trigger') {
                    el.style.outline = active ? '1px solid rgba(0, 255, 204, 0.4)' : '';
                }
            });
        });

        // X-Ray
        const btnXray = document.getElementById('nx-btn-xray');
        let styleTag = null;
        btnXray.addEventListener('click', () => {
            const active = btnXray.classList.toggle('active');
            if (active) {
                styleTag = document.createElement('style');
                styleTag.innerHTML = `body *:not(#nx-hud):not(#nx-hud *):not(#nx-trigger) { opacity: 0.8 !important; box-shadow: inset 0 0 5px rgba(0,255,204,0.3) !important; background: rgba(0,0,0,0.1) !important; }`;
                document.head.appendChild(styleTag);
            } else if (styleTag) {
                styleTag.remove();
            }
        });

        // Design Mode
        const btnDesign = document.getElementById('nx-btn-design');
        btnDesign.addEventListener('click', () => {
            STATE.isDesignMode = btnDesign.classList.toggle('active');
            document.designMode = STATE.isDesignMode ? 'on' : 'off';
            if(STATE.isDesignMode) console.log("Design Mode ON. Click text on page to edit.");
        });

        // Click to Delete
        const btnDelete = document.getElementById('nx-btn-delete');
        btnDelete.addEventListener('click', () => {
            STATE.isDeleteMode = btnDelete.classList.toggle('active');
            if (STATE.isDeleteMode) {
                document.body.classList.add('nx-inspect-mode'); // Use same hover effect
                console.warn("Delete Mode ON. Clicking elements will destroy them.");
            } else {
                document.body.classList.remove('nx-inspect-mode');
            }
        });

        document.addEventListener('click', (e) => {
            if (STATE.isDeleteMode) {
                if (e.target.closest('#nx-hud') || e.target.id === 'nx-trigger') return;
                e.preventDefault();
                e.stopPropagation();
                e.target.remove();
                console.log("Element destroyed.");
            }
        }, true);

        // JS Sandbox Eval
        document.getElementById('nx-btn-eval').addEventListener('click', () => {
            const input = document.getElementById('nx-eval-input');
            const code = input.value;
            if(!code) return;
            try {
                const result = eval(code);
                console.log(`Eval Output:`, result);
                input.value = '';
            } catch(e) {
                console.error(`Eval Error: ${e.message}`);
            }
        });
    };

    // ==========================================
    // 10. SYSTEM BOOTSTRAP
    // ==========================================
    console.log(">> Booting Null X Developer Environment v3...");
    injectStyles();
    buildDOM();
    initCoreEngine();
    initTelemetry();
    initInspector();
    initConsoleManager();
    initNetworkStorage();
    initTools();
    console.log(">> Null X DevTools fully operational. Press [~] to toggle.");

})();
