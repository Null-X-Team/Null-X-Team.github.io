/**
 * Null X - Interactive HUD Debug Menu Engine
 * Toggle Shortcut: Press the '~' (Tilde) key or click the debug trigger.
 */
(function() {
    // 1. Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hidden class */
        .debug-hidden { display: none !important; }

        /* Floating Trigger Button */
        #debug-toggle-btn {
            position: fixed;
            bottom: 15px;
            right: 15px;
            background: rgba(13, 13, 19, 0.85);
            border: 1px solid #00ffcc;
            color: #00ffcc;
            font-family: monospace;
            font-size: 11px;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            z-index: 2147483646;
            box-shadow: 0 0 10px rgba(0, 255, 204, 0.3);
            backdrop-filter: blur(4px);
            transition: all 0.2s ease;
        }
        #debug-toggle-btn:hover {
            background: #00ffcc;
            color: #0d0d13;
            box-shadow: 0 0 15px #00ffcc;
        }

        /* Debug Menu Window */
        #debug-menu {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 300px;
            background: rgba(10, 10, 16, 0.92);
            border: 1px solid rgba(0, 255, 204, 0.5);
            border-radius: 6px;
            color: #00ffcc;
            font-family: 'Courier New', Courier, monospace;
            font-size: 12px;
            z-index: 2147483646;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 255, 204, 0.2);
            backdrop-filter: blur(6px);
            user-select: none;
        }

        /* Header / Drag Bar */
        .debug-header {
            padding: 8px 12px;
            background: rgba(0, 255, 204, 0.1);
            border-bottom: 1px solid rgba(0, 255, 204, 0.3);
            cursor: move;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            letter-spacing: 1px;
        }
        .debug-header .controls span {
            cursor: pointer;
            margin-left: 8px;
            color: #ff3333;
        }

        /* Content Sections */
        .debug-content {
            padding: 10px;
            max-height: 400px;
            overflow-y: auto;
        }
        .debug-section {
            margin-bottom: 12px;
            border-bottom: 1px dashed rgba(0, 255, 204, 0.2);
            padding-bottom: 8px;
        }
        .debug-section:last-child { border-bottom: none; }

        .debug-title {
            color: #ffd700;
            font-size: 10px;
            text-transform: uppercase;
            margin-bottom: 6px;
            letter-spacing: 1px;
        }

        /* Stat Grid */
        .debug-stat {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
        }
        .debug-stat-val { color: #ffffff; font-weight: bold; }

        /* Controls / Toggles */
        .debug-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
        }
        .debug-btn {
            background: rgba(0, 255, 204, 0.15);
            border: 1px solid #00ffcc;
            color: #00ffcc;
            font-family: monospace;
            font-size: 10px;
            padding: 3px 8px;
            border-radius: 3px;
            cursor: pointer;
            transition: all 0.1s ease;
        }
        .debug-btn:hover { background: #00ffcc; color: #000; }
        .debug-btn.active { background: #ffd700; border-color: #ffd700; color: #000; }

        /* Custom Scrollbar for Debug Panel */
        .debug-content::-webkit-scrollbar { width: 4px; }
        .debug-content::-webkit-scrollbar-thumb { background: rgba(0, 255, 204, 0.4); }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML Structure
    const menu = document.createElement('div');
    menu.id = 'debug-menu';
    menu.className = 'debug-hidden';
    menu.innerHTML = `
        <div class="debug-header" id="debug-drag">
            <span>// NULL_X DEBUGGER</span>
            <div class="controls">
                <span id="debug-close">[X]</span>
            </div>
        </div>
        <div class="debug-content">
            <div class="debug-section">
                <div class="debug-title">Performance Metrics</div>
                <div class="debug-stat"><span>FPS:</span><span class="debug-stat-val" id="dbg-fps">--</span></div>
                <div class="debug-stat"><span>Frame Time:</span><span class="debug-stat-val" id="dbg-ft">-- ms</span></div>
                <div class="debug-stat"><span>JS Heap:</span><span class="debug-stat-val" id="dbg-mem">N/A</span></div>
            </div>

            <div class="debug-section">
                <div class="debug-title">Viewport & Cursor</div>
                <div class="debug-stat"><span>Resolution:</span><span class="debug-stat-val" id="dbg-res">--</span></div>
                <div class="debug-stat"><span>Mouse Position:</span><span class="debug-stat-val" id="dbg-pos">0, 0</span></div>
                <div class="debug-stat"><span>Hovered Element:</span><span class="debug-stat-val" id="dbg-target">None</span></div>
            </div>

            <div class="debug-section">
                <div class="debug-title">State Overrides</div>
                <div class="debug-row">
                    <span>Force Target State</span>
                    <button class="debug-btn" id="btn-force-target">OFF</button>
                </div>
                <div class="debug-row">
                    <span>Force Text State</span>
                    <button class="debug-btn" id="btn-force-text">OFF</button>
                </div>
                <div class="debug-row">
                    <span>Wireframe Mode</span>
                    <button class="debug-btn" id="btn-wireframe">OFF</button>
                </div>
            </div>

            <div class="debug-section">
                <div class="debug-title">Actions</div>
                <button class="debug-btn" id="btn-trigger-recoil" style="width: 100%; margin-bottom: 4px;">Fire Recoil Flare</button>
                <button class="debug-btn" id="btn-clear-console" style="width: 100%;">Clear JS Console</button>
            </div>
        </div>
    `;

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'debug-toggle-btn';
    toggleBtn.innerText = 'DEBUG [~]';

    document.body.appendChild(menu);
    document.body.appendChild(toggleBtn);

    // 3. Performance Tracker (FPS & Frame Time)
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

            // FPS color indicator
            const fpsEl = document.getElementById('dbg-fps');
            fpsEl.style.color = fps >= 55 ? '#00ffcc' : fps >= 30 ? '#ffd700' : '#ff3333';

            frameCount = 0;
            lastTime = now;
        }

        // Memory Usage (If supported by browser)
        if (performance.memory) {
            const memMB = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
            document.getElementById('dbg-mem').innerText = memMB + ' MB';
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
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target) {
            const tag = target.tagName.toLowerCase();
            const id = target.id ? `#${target.id}` : '';
            const cls = target.className && typeof target.className === 'string' ? `.${target.className.split(' ')[0]}` : '';
            document.getElementById('dbg-target').innerText = `${tag}${id}${cls}`.slice(0, 18);
        }
    });

    // 5. Interactive Debug Buttons & Overrides
    const xhair = document.getElementById('unique-crosshair');

    // Force Crosshair Target Mode
    const targetBtn = document.getElementById('btn-force-target');
    targetBtn.addEventListener('click', () => {
        const active = targetBtn.classList.toggle('active');
        targetBtn.innerText = active ? 'ON' : 'OFF';
        if (xhair) xhair.classList.toggle('targeting', active);
    });

    // Force Crosshair Text Mode
    const textBtn = document.getElementById('btn-force-text');
    textBtn.addEventListener('click', () => {
        const active = textBtn.classList.toggle('active');
        textBtn.innerText = active ? 'ON' : 'OFF';
        if (xhair) xhair.classList.toggle('text-input', active);
    });

    // Wireframe Mode
    const wireframeBtn = document.getElementById('btn-wireframe');
    wireframeBtn.addEventListener('click', () => {
        const active = wireframeBtn.classList.toggle('active');
        wireframeBtn.innerText = active ? 'ON' : 'OFF';
        document.body.style.outline = active ? '1px solid #00ffcc' : 'none';
        
        const all = document.querySelectorAll('body *');
        all.forEach(el => {
            if (el.id !== 'debug-menu' && !el.closest('#debug-menu')) {
                el.style.outline = active ? '1px solid rgba(0, 255, 204, 0.3)' : '';
            }
        });
    });

    // Trigger Crosshair Recoil Flare
    document.getElementById('btn-trigger-recoil').addEventListener('click', () => {
        if (xhair) {
            xhair.classList.add('clicking');
            setTimeout(() => xhair.classList.remove('clicking'), 200);
        }
    });

    // Clear Console
    document.getElementById('btn-clear-console').addEventListener('click', () => {
        console.clear();
        console.log('%c[DEBUG] Console cleared via Debug Menu.', 'color: #00ffcc;');
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

    // 7. Make Menu Draggable
    const dragHeader = document.getElementById('debug-drag');
    let isDragging = false, offsetX = 0, offsetY = 0;

    dragHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - menu.offsetLeft;
        offsetY = e.clientY - menu.offsetTop;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            menu.style.left = `${e.clientX - offsetX}px`;
            menu.style.top = `${e.clientY - offsetY}px`;
        }
    });

    window.addEventListener('mouseup', () => isDragging = false);
})();
