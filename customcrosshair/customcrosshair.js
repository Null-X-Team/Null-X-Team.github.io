/**
 * Ultimate Unique Cyberpunk Crosshair Engine for UBG Hubs
 * Self-contained file that dynamically injects high-end tracking visuals.
 */
(function() {
    // 1. Inject the custom UI styling
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hide the default boring desktop pointer everywhere */
        body, a, button, iframe, .game-card, .clickable {
            cursor: none !important;
        }

        /* Root element wrapper setup */
        #unique-crosshair {
            position: fixed;
            width: 50px;
            height: 50px;
            pointer-events: none;
            z-index: 999999;
            transform: translate(-50%, -50%);
            transition: opacity 0.2s ease, width 0.15s ease, height 0.15s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Auto-hide when the pointer leaves the screen bounds */
        .crosshair-hidden {
            opacity: 0 !important;
        }

        /* Laser Core Diamond Center */
        .crosshair-core {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #00ffcc;
            transform: rotate(45deg);
            box-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc;
            transition: transform 0.1s ease, background 0.2s ease;
        }

        /* Rotating Animated Outer Tactical Ring */
        .crosshair-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px dashed rgba(0, 255, 204, 0.4);
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(0, 255, 204, 0.2);
            animation: crosshairSpin 8s linear infinite;
            transition: border 0.2s ease;
        }

        /* Futuristic Bracket Corners */
        .crosshair-bracket {
            position: absolute;
            width: 8px;
            height: 8px;
            border: 2px solid #00ffcc;
            filter: drop-shadow(0 0 4px #00ffcc);
            transition: all 0.15s ease;
        }
        .bracket-tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .bracket-tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .bracket-bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .bracket-br { bottom: 0; right: 0; border-left: none; border-top: none; }

        /* Continuous rotation animation for the outer elements */
        @keyframes crosshairSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* ========================================= */
        /* INTERACTIVE STATE MODIFIERS               */
        /* ========================================= */

        /* 1. MOUSE CLICKING STATE: Brackets snap inward tight onto the core, color shifts to hot pink */
        #unique-crosshair.clicking {
            width: 30px;
            height: 30px;
        }
        #unique-crosshair.clicking .crosshair-core {
            background: #ff0055;
            transform: rotate(135deg) scale(1.4);
            box-shadow: 0 0 12px #ff0055, 0 0 25px #ff0055;
        }
        #unique-crosshair.clicking .crosshair-ring {
            border-color: rgba(255, 0, 85, 0.7);
        }
        #unique-crosshair.clicking .crosshair-bracket {
            border-color: #ff0055;
            filter: drop-shadow(0 0 6px #ff0055);
        }

        /* 2. HOVERING OVER GAME/BUTTON STATE: Brackets expand wide out to indicate "Ready to Lock" */
        #unique-crosshair.targeting {
            width: 65px;
            height: 65px;
        }
        #unique-crosshair.targeting .crosshair-bracket {
            width: 12px;
            height: 12px;
            border-color: #ffff00;
            filter: drop-shadow(0 0 5px #ffff00);
        }
        #unique-crosshair.targeting .crosshair-core {
            background: #ffff00;
            box-shadow: 0 0 10px #ffff00;
        }
        #unique-crosshair.targeting .crosshair-ring {
            border: 2px solid rgba(255, 255, 0, 0.15);
            border-style: dotted;
        }
    `;
    document.head.appendChild(style);

    // 2. Build the structural overlay elements completely dynamically
    const crosshair = document.createElement('div');
    crosshair.id = 'unique-crosshair';
    crosshair.className = 'crosshair-hidden';
    crosshair.innerHTML = `
        <div class="crosshair-core"></div>
        <div class="crosshair-ring"></div>
        <div class="crosshair-bracket bracket-tl"></div>
        <div class="crosshair-bracket bracket-tr"></div>
        <div class="crosshair-bracket bracket-bl"></div>
        <div class="crosshair-bracket bracket-br"></div>
    `;
    document.body.appendChild(crosshair);

    // 3. Automation tracking & state triggers
    window.addEventListener('mousemove', (e) => {
        crosshair.style.left = e.clientX + 'px';
        crosshair.style.top = e.clientY + 'px';
        crosshair.classList.remove('crosshair-hidden');
        
        // Dynamic detection: If the user passes their mouse over a button, link, or game container, activate target tracking mode!
        const targetTag = e.target.tagName.toLowerCase();
        if (targetTag === 'a' || targetTag === 'button' || e.target.classList.contains('game-card') || targetTag === 'iframe') {
            crosshair.classList.add('targeting');
        } else {
            crosshair.classList.remove('targeting');
        }
    });

    // Auto-hiding configurations
    document.addEventListener('mouseleave', () => crosshair.classList.add('crosshair-hidden'));
    document.addEventListener('mouseenter', () => crosshair.classList.remove('crosshair-hidden'));

    // Handle mouse click hold mechanics
    window.addEventListener('mousedown', () => crosshair.classList.add('clicking'));
    window.addEventListener('mouseup', () => crosshair.classList.remove('clicking'));
})();
