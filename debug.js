/**
 * Null X - Advanced Interactive HUD Debug Menu Engine v2.0
 * Toggle Shortcut: Press the '~' (Tilde) key or click the debug trigger.
 */
(function() {
    const startTime = Date.now();

    // 1. Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .debug-hidden { display: none !important; }

        /* Floating Trigger Button */
        #debug-toggle-btn {
            position: fixed; bottom: 15px; right: 15px;
            background: rgba(13, 13, 19, 0.85); border: 1px solid #00ffcc;
            color: #00ffcc; font-family: monospace; font-size: 11px;
            padding: 6px 12px; border-radius: 4px; cursor: pointer;
            z-index: 2147483646; box-shadow: 0 0 10px rgba(0, 255, 204, 0.3);
            backdrop-filter: blur(4px); transition: all 0.2s ease;
        }
        #debug-toggle-btn:hover { background: #00ffcc; color: #0d0d13; box-shadow: 0 0 15px #00ffcc; }

        /* Debug Menu Window */
        #debug-menu {
            position: fixed; top: 20px; left: 20px; width: 320px;
            background: rgba(10, 10, 16, 0.95); border: 1px solid rgba(0, 255, 204, 0.5);
            border-radius: 6px; color: #00ffcc; font-family: 'Courier New', Courier, monospace;
            font-size: 11px; z-index: 2147483646;
            box-shadow: 0 0 25px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 255, 204, 0.2);
            backdrop-filter: blur(8px); user-select: none;
        }

        /* Header / Drag Bar */
        .debug-header {
            padding: 8px 12px; background: rgba(0, 255, 204, 0.15);
            border-bottom: 1px solid rgba(0, 255, 204, 0.4);
            cursor: move; display: flex; justify-content: space-between;
            align-items: center; font-weight: bold; letter-spacing: 1px;
        }
        .debug-header .controls span { cursor: pointer; margin-left: 8px; color: #ff3333; transition: 0.2s; }
        .debug-header .controls span:hover { color: #ff6666; text-shadow: 0 0 5px #ff3333; }

        /* Content Sections */
        .debug-content { padding: 10px; max-height: 450px; overflow-y: auto; }
        .debug-section { margin-bottom: 12px; border-bottom: 1px dashed rgba(0, 255, 204, 0.2); padding-bottom: 10px; }
        .debug-section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

        .debug-title { color: #ffd700; font-size: 10px; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px; }

        /* Stat Grid */
        .debug-stat { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .debug-stat-val { color: #ffffff; font-weight: bold; text-align: right; max-width: 60%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* Controls / Toggles */
        .debug-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .debug-btn {
            background: rgba(0, 255, 204, 0.1); border: 1px solid #00ffcc;
            color: #00ffcc; font-family: monospace; font-size: 10px;
            padding: 4px 8px; border-radius: 3px; cursor: pointer; transition: all 0.1s ease;
        }
        .debug-btn:hover { background: #00ffcc; color: #000; }
        .debug-btn.active { background: #ffd700; border-color: #ffd700; color: #000; box-shadow: 0 0 8px rgba(255, 215, 0, 0.4); }
        .debug-btn.danger { border-color: #ff3333; color: #ff3333; }
        .debug-btn.danger:hover { background: #ff3333; color: #fff; }
        .debug-btn.danger.active { background: #ff3333; color: #fff; box-shadow: 0 0 8px rgba(255, 51, 51, 0.4); }

        /* Global Delete Mode Cursor */
        body.debug-delete-mode * { cursor: crosshair !important; }
        body.debug-delete-mode *:hover { outline: 2px dashed #ff3333 !important; background: rgba(255, 51, 51, 0.2) !important; }

        /* X-Ray Mode */
        body.debug-xray-mode * { opacity: 0.8 !important; box-shadow: inset 0 0 4px rgba(0,255,204,0.2) !important; }

        /* Custom Scrollbar */
        .debug-content::-webkit-scrollbar { width: 5px; }
        .debug-content::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
        .debug-content::-webkit-scrollbar-thumb { background: rgba(0, 255, 204, 0.4); border-radius: 3px; }
        .debug-content::-webkit-scrollbar-thumb:hover { background: #00ffcc; }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML Structure
    const menu = document.createElement('div');
    menu.id = 'debug-menu';
    menu.className = 'debug-hidden';
    menu.innerHTML = `
        <div class="debug-header" id="debug-drag">
            <span>// NULL_X ADV_DEBUGGER</span>
            <div class="controls"><span id="debug-close">[X]</span></div>
        </div>
        <div class="debug-content">
            
            <div class="debug-section">
                <div class="debug-title">System Telemetry</div>
                <div class="debug-stat"><span>FPS:</span><span class="debug-stat-val" id="dbg-fps">--</span></div>
                <div class="debug-stat"><span>Frame Time:</span><span class="debug-stat-val" id="dbg-ft">-- ms</span></div>
                <div class="debug-stat"><span>JS Heap:</span><span class="debug-stat-val" id="dbg-mem">N/A</span></div>
                <div class="debug-stat"><span>Session Uptime:</span><span class="debug-stat-val" id="dbg-uptime">00:00</span></div>
            </div>

            <div class="debug-section">
                <div class="debug-title">DOM & Network</div>
                <div class="debug-stat"><span>Total Elements:</span><span class="debug-stat-val" id="dbg-dom">--</span></div>
                <div class="debug-stat"><span>Local Storage:</span><span class="debug-stat-val" id="dbg-ls">-- items</span></div>
                <div class="debug-row" style="margin-top: 8px;">
                    <span>Est. Server Ping:</span>
                    <button class="debug-btn" id="btn-ping">Test Ping</button>
                </div>
            </div>

            <div class="debug-section">
                <div class="debug-title">Viewport Inspector</div>
                <div class="debug-stat"><span>Resolution:</span><span class="debug-stat-val" id="dbg-res">--</span></div>
                <div class="debug-stat"><span>Pointer Pos:</span><span class="debug-stat-val" id="dbg-pos">0, 0</span></div>
                <div class="debug-stat"><span>Hover Target:</span><span class="debug-stat-val" id="dbg-target" style="color: #00ffcc;">None</span></div>
            </div>

            <div class="debug-section">
                <div class="debug-title">Visual Overrides</div>
                <div class="debug-row">
                    <span>Wireframe Mode</span><button class="debug-btn" id="btn-wireframe">OFF</button>
                </div>
                <div class="debug-row">
                    <span>X-Ray Vision</span><button class="debug-btn" id="btn-xray">OFF</button>
                </div>
            </div>

            <div class="debug-section">
                <div class="debug-title">Developer Actions</div>
                <div class="debug-row">
                    <span style="color:#ffd700;">Edit Page Text</span>
                    <button class="debug-btn" id="btn-design-mode">OFF</button>
                </div>
                <div class="debug-row">
                    <span style="color:#ff3333;">Click-to-Delete Tool</span>
                    <button class="debug-btn danger" id="btn-delete-mode">OFF</button>
                </div>
                <button class="debug-btn" id="btn-clear-console" style="width: 100%; margin-top: 5px;">Clear JS Console</button>
            </div>

        </div>
    `;

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'debug-toggle-btn';
    toggleBtn.innerText = 'DEBUG [~]';

    document.body.appendChild(menu);
    document.body.appendChild(toggleBtn);

    // 3. Telemetry Engine (FPS, Time, Memory, DOM)
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;

    function updateMetrics() {
        const now = performance.now();
        const delta = now - lastTime;
        frameCount++;

        if (delta >= 500) {
            fps = Math.round((frameCount * 1000) / delta);
            document.getElementById('dbg-fps').innerText = fps;
            document.getElementById('dbg-ft').innerText = (delta / frameCount).toFixed(1) + ' ms';
            
            // Colors based on performance
            const fpsEl = document.getElementById('dbg-fps');
            fpsEl.style.color = fps >= 55 ? '#00ffcc' : fps >= 30 ? '#ffd700' : '#ff3333';

            // Uptime
            const upSeconds = Math.floor((Date.now() - startTime) / 1000);
            const m = String(Math.floor(upSeconds / 60)).padStart(2, '0');
            const s = String(upSeconds % 60).padStart(2, '0');
            document.getElementById('dbg-uptime').innerText = `${m}:${s}`;

            // Memory
            if (performance.memory) {
                const memMB = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
                document.getElementById('dbg-mem').innerText = memMB + ' MB';
            }

            // DOM Count & Storage
            document.getElementById('dbg-dom').innerText = document.getElementsByTagName('*').length;
            document.getElementById('dbg-ls').innerText = localStorage.length + ' items';

            frameCount = 0;
            lastTime = now;
        }
        requestAnimationFrame(updateMetrics);
    }
    requestAnimationFrame(updateMetrics);

    // 4. Viewport & Mouse Tracker
    document.getElementById('dbg-res').innerText = `${window.innerWidth}x${window.innerHeight}`;
    window.addEventListener('resize', () => {
        document.getElementById('dbg-res').innerText = `${window.innerWidth}x${window.innerHeight}`;
    });

    window.addEventListener('mousemove', (e) => {
        document.getElementById('dbg-pos').innerText = `${e.clientX}, ${e.clientY}`;
        
        // Hide menu from element detection so we see what's *behind* it if needed
        const oldPointer = menu.style.pointerEvents;
        menu.style.pointerEvents = 'none';
        const target = document.elementFromPoint(e.clientX, e.clientY);
        menu.style.pointerEvents = oldPointer;

        if (target) {
            const tag = target.tagName.toLowerCase();
            const id = target.id ? `#${target.id}` : '';
            const cls = target.className && typeof target.className === 'string' ? `.${target.className.split(' ')[0]}` : '';
            document.getElementById('dbg-target').innerText = `${tag}${id}${cls}`.slice(0, 22);
        }
    });

    // 5. Interactive Debug Toggles & Tools

    // Server Ping Tester
    document.getElementById('btn-ping').addEventListener('click', async (e) => {
        const btn = e.target;
        btn.innerText = "Pinging...";
        const start = performance.now();
        try {
            await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' });
            const ping = Math.round(performance.now() - start);
            btn.innerText = `${ping} ms`;
        } catch (err) {
            btn.innerText = "Error";
        }
        setTimeout(() => btn.innerText = "Test Ping", 2000);
    });

    // Wireframe Mode
    const wireframeBtn = document.getElementById('btn-wireframe');
    wireframeBtn.addEventListener('click', () => {
        const active = wireframeBtn.classList.toggle('active');
        wireframeBtn.innerText = active ? 'ON' : 'OFF';
        
        const all = document.querySelectorAll('body *');
        all.forEach(el => {
            if (el.id !== 'debug-menu' && !el.closest('#debug-menu') && el.id !== 'debug-toggle-btn') {
                el.style.outline = active ? '1px solid rgba(0, 255, 204, 0.4)' : '';
            }
        });
    });

    // X-Ray Mode
    const xrayBtn = document.getElementById('btn-xray');
    xrayBtn.addEventListener('click', () => {
        const active = xrayBtn.classList.toggle('active');
        xrayBtn.innerText = active ? 'ON' : 'OFF';
        document.body.classList.toggle('debug-xray-mode', active);
    });

    // Design Mode (Edit Page Text)
    const designBtn = document.getElementById('btn-design-mode');
    designBtn.addEventListener('click', () => {
        const active = designBtn.classList.toggle('active');
        designBtn.innerText = active ? 'ON' : 'OFF';
        document.designMode = active ? 'on' : 'off';
    });

    // Element Deleter Mode (Click to destroy)
    const deleteBtn = document.getElementById('btn-delete-mode');
    let isDeleteMode = false;
    deleteBtn.addEventListener('click', () => {
        isDeleteMode = deleteBtn.classList.toggle('active');
        deleteBtn.innerText = isDeleteMode ? 'ACTIVE' : 'OFF';
        document.body.classList.toggle('debug-delete-mode', isDeleteMode);
    });

    // Intercept clicks when Delete Mode is ON
    document.addEventListener('click', (e) => {
        if (isDeleteMode) {
            // Protect the debug menu itself from being deleted!
            if (e.target.closest('#debug-menu') || e.target.id === 'debug-toggle-btn') return;
            
            e.preventDefault();
            e.stopPropagation();
            e.target.remove();
        }
    }, true);

    // Clear Console
    document.getElementById('btn-clear-console').addEventListener('click', () => {
        console.clear();
        console.log('%c[DEBUG] Console cleared via Debug Menu Engine v2.', 'color: #00ffcc; font-size: 14px; font-weight: bold;');
    });

    // 6. Menu Visibility Toggles (Button + '~' Key)
    const toggleMenu = () => menu.classList.toggle('debug-hidden');
    toggleBtn.addEventListener('click', toggleMenu);
    document.getElementById('debug-close').addEventListener('click', toggleMenu);

    window.addEventListener('keydown', (e) => {
        if (e.key === '`' || e.key === '~') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // 7. Draggable Window Logic with screen bounds
    const dragHeader = document.getElementById('debug-drag');
    let isDragging = false, offsetX = 0, offsetY = 0;

    dragHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - menu.offsetLeft;
        offsetY = e.clientY - menu.offsetTop;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;
            
            // Keep menu on screen
            newX = Math.max(0, Math.min(newX, window.innerWidth - menu.offsetWidth));
            newY = Math.max(0, Math.min(newY, window.innerHeight - menu.offsetHeight));

            menu.style.left = `${newX}px`;
            menu.style.top = `${newY}px`;
        }
    });

    window.addEventListener('mouseup', () => isDragging = false);
})();
